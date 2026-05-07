"use client";

/**
 * /dashboard/profile — Personal info, company info, search preferences.
 *
 * Single editable form per section (Personal / Company / Search). Save
 * button persists everything in one Firestore write. Email is read-only.
 */

import { useEffect, useMemo, useState } from "react";
import { useClient } from "@/lib/client-context";
import { updateClient } from "@/lib/firestore-client-dashboard";
import type { ClientProfileStatus } from "@/types/client";
import { trackEvent } from "@/lib/analytics";
import { BigRoleDropdown } from "@/components/big-role-dropdown";

// Company-only selects stay local — they're not shared with the
// wizard. The role list and the BigRoleDropdown live in shared
// modules (lib/roles.ts + components/big-role-dropdown.tsx) so the
// wizard's step-1 picker and this page stay in sync automatically.
const STAGE_OPTIONS = ["", "Idea", "Pre-seed", "Seed", "Series A", "Series B", "Series C+", "Growth", "Public"];
const SIZE_OPTIONS  = ["", "Just me (1)", "2–10", "11–50", "51–200", "201–500", "500+"];
const INDUSTRY_OPTIONS = ["", "Financial Services","Information Technology & Services","Internet","Computer Software","Marketing & Advertising","Health, Wellness & Fitness","Hospital & Health Care","Real Estate","Retail","Banking","Management Consulting","Other"];

const FIELD_LIGHT: React.CSSProperties = { background: "#fff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827" };

export default function ClientProfilePage() {
  const { uid, client, loading, refresh } = useClient();
  const [draft, setDraft] = useState({
    firstName         : "",
    lastName          : "",
    phone             : "",
    title             : "",
    location          : "",
    companyName       : "",
    companyIndustry   : "",
    companyStage      : "",
    companySize       : "",
    companyWebsite    : "",
    companyDescription: "",
    /** Selected role (matches the wizard's executive titles — CFO,
     *  CTO, …). Persisted to `preferences.role`. */
    prefRole          : "",
    /** Free-text "tell us a bit more" — matches the wizard's step-1
     *  textarea exactly. Persisted to `preferences.lookingFor`. */
    prefLookingFor    : "",
  });
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState("");

  // Hydrate the form whenever the client doc loads or refreshes.
  useEffect(() => {
    if (!client) return;
    setDraft({
      firstName         : client.firstName          || "",
      lastName          : client.lastName           || "",
      phone             : client.phone              || "",
      title             : client.title              || "",
      location          : client.location           || "",
      companyName       : client.companyName        || "",
      companyIndustry   : client.companyIndustry    || "",
      companyStage      : client.companyStage       || "",
      companySize       : client.companySize        || "",
      companyWebsite    : client.companyWebsite     || "",
      companyDescription: client.companyDescription || "",
      prefRole          : client.preferences?.role       || "",
      prefLookingFor    : client.preferences?.lookingFor || "",
    });
  }, [client]);

  function set<K extends keyof typeof draft>(k: K, v: typeof draft[K]) { setDraft((d) => ({ ...d, [k]: v })); }

  // Dirty-check — true when the draft has at least one field that
  // differs from the persisted `client` doc. Drives the Save button's
  // disabled state so the user gets a clear visual signal that there's
  // nothing to save (and we don't churn Firestore on no-op clicks).
  //
  // Strings are compared trimmed-against-raw because the save handler
  // calls .trim() before persisting — without trim normalization here,
  // typing then deleting a trailing space would mark the form dirty.
  const isDirty = useMemo(() => {
    if (!client) return false;
    const eqStr = (a: string, b: string | undefined | null) =>
      a.trim() === ((b ?? "") as string);
    if (!eqStr(draft.firstName,          client.firstName))           return true;
    if (!eqStr(draft.lastName,           client.lastName))            return true;
    if (!eqStr(draft.phone,              client.phone))               return true;
    if (!eqStr(draft.title,              client.title))               return true;
    if (!eqStr(draft.location,           client.location))            return true;
    if (!eqStr(draft.companyName,        client.companyName))         return true;
    if (!eqStr(draft.companyWebsite,     client.companyWebsite))      return true;
    if (!eqStr(draft.companyDescription, client.companyDescription))  return true;
    if (!eqStr(draft.prefLookingFor,     client.preferences?.lookingFor)) return true;
    // Selects don't get trimmed on save, so use a strict (string-typed) compare.
    if (draft.companyIndustry !== (client.companyIndustry || ""))     return true;
    if (draft.companyStage    !== (client.companyStage    || ""))     return true;
    if (draft.companySize     !== (client.companySize     || ""))     return true;
    if (draft.prefRole        !== (client.preferences?.role     || "")) return true;
    return false;
  }, [draft, client]);

  async function save() {
    if (!uid) return;
    setSaving(true); setSaved("");
    try {
      await updateClient(uid, {
        firstName         : draft.firstName.trim(),
        lastName          : draft.lastName.trim(),
        phone             : draft.phone.trim(),
        title             : draft.title.trim(),
        location          : draft.location.trim(),
        companyName       : draft.companyName.trim(),
        companyIndustry   : draft.companyIndustry,
        companyStage      : draft.companyStage,
        companySize       : draft.companySize,
        companyWebsite    : draft.companyWebsite.trim(),
        companyDescription: draft.companyDescription,
        preferences: {
          role       : draft.prefRole,
          // Free-text "tell us a bit more" — same field captured in
          // the wizard's step-1 textarea. Persisted alongside the
          // structured role so matching gets context, not just a label.
          lookingFor : draft.prefLookingFor.trim(),
          // Preserve any legacy values written by older versions of
          // the wizard so the doc shape stays consistent. The fields
          // are optional on ClientPreferences and no longer surfaced
          // in the UI here, but keeping them on writes prevents an
          // accidental wipe when an old user comes back to edit.
          industry   : client?.preferences?.industry    || "",
          companySize: client?.preferences?.companySize || "",
          challenges : client?.preferences?.challenges  || [],
        },
      });
      await refresh();
      // Fire AFTER the round-trip so we only count successful saves.
      // `looking_for_length` mirrors the wizard's step-1 GA event so
      // the funnel + dashboard can share the same segmentation
      // dimension if we wire one up.
      trackEvent("client_profile_saved", {
        profile_status     : client?.profileStatus || "unknown",
        looking_for_length : draft.prefLookingFor.trim().length,
      });
      setSaved("Saved");
      setTimeout(() => setSaved(""), 3000);
    } finally { setSaving(false); }
  }

  if (loading || !client) {
    return (
      <div className="grid place-items-center py-20">
        <div className="w-9 h-9 rounded-full border-[3px] border-gray-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  const initials = ((client.firstName?.[0] || "") + (client.lastName?.[0] || "")).toUpperCase() || "?";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight">My profile</h1>
          <p className="text-sm text-gray-500 mt-1">Keep your details up to date so we can match you with the right advisors.</p>
        </div>
        <button
          type="button"
          onClick={save}
          // Disabled while a save is in flight, OR when there are no
          // unsaved edits. The "Saved" toast also reads as a non-dirty
          // state so the button stays muted while the confirmation
          // shows. The hover style only applies when active.
          disabled={saving || (!isDirty && !saved)}
          className={[
            "text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors",
            (isDirty || saving)
              ? "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              : saved
                ? "bg-emerald-600 text-white"  // "Saved" confirmation tint
                : "bg-gray-200 text-gray-500 cursor-not-allowed",
          ].join(" ")}
        >
          {saving ? "Saving…" : saved || "Save changes"}
        </button>
      </div>

      {/* Hero */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-lg shrink-0">{initials}</div>
        <div className="min-w-0">
          <div className="flex items-center flex-wrap gap-2">
            <div className="text-[16px] font-bold">{[draft.firstName, draft.lastName].filter(Boolean).join(" ") || "Your name"}</div>
            <ProfileStatusTag status={client.profileStatus} />
          </div>
          <div className="text-[12.5px] text-gray-500">{client.email}</div>
        </div>
      </div>

      {/* Personal */}
      <Section title="Personal">
        <Row>
          <Field label="First name" value={draft.firstName} onChange={(v) => set("firstName", v)} />
          <Field label="Last name"  value={draft.lastName}  onChange={(v) => set("lastName", v)} />
        </Row>
        <Row>
          <Field
            label="Email"
            value={client.email || ""}
            onChange={() => {}}
            readOnly
            note="Used for sign-in"
          />
          <Field label="Phone" value={draft.phone} onChange={(v) => set("phone", v)} placeholder="+1 415 555 0100" />
        </Row>
        <Row>
          <Field label="Title"    value={draft.title}    onChange={(v) => set("title", v)}    placeholder="Founder & CEO" />
          <Field label="Location" value={draft.location} onChange={(v) => set("location", v)} placeholder="San Francisco, CA" />
        </Row>
      </Section>

      {/* Company */}
      <Section title="Company">
        <Row>
          <Field label="Company name" value={draft.companyName} onChange={(v) => set("companyName", v)} />
          <Field label="Website" value={draft.companyWebsite} onChange={(v) => set("companyWebsite", v)} placeholder="https://acme.com" />
        </Row>
        <Row>
          <Select label="Industry" value={draft.companyIndustry} onChange={(v) => set("companyIndustry", v)} options={INDUSTRY_OPTIONS} />
          <Select label="Stage"    value={draft.companyStage}    onChange={(v) => set("companyStage", v)}    options={STAGE_OPTIONS} />
        </Row>
        <Row>
          <Select label="Company size" value={draft.companySize} onChange={(v) => set("companySize", v)} options={SIZE_OPTIONS} />
          <span />
        </Row>
        <div className="mt-3">
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
          <textarea
            value={draft.companyDescription}
            onChange={(e) => set("companyDescription", e.target.value)}
            placeholder="What does your company do? Stage, traction, key metrics…"
            rows={4}
            style={FIELD_LIGHT}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 resize-y"
          />
        </div>
      </Section>

      {/* Preferences — mirrors the wizard's step-1 layout exactly:
          a BigRoleDropdown (executive titles with icons + descriptions)
          and a "Tell us a bit more" textarea. The two surfaces use the
          same shared roleOptions list (lib/roles.ts) so they can never
          drift. */}
      <Section title="Advisor search preferences">
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Role you are looking to hire?</label>
          <BigRoleDropdown
            value={draft.prefRole}
            onChange={(v) => set("prefRole", v)}
          />
        </div>
        <div className="mt-3">
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Tell us a bit more</label>
          <textarea
            value={draft.prefLookingFor}
            onChange={(e) => set("prefLookingFor", e.target.value)}
            placeholder="What's the situation? Stage, industry, what you've tried, what kind of executive would be a fit…"
            rows={4}
            style={FIELD_LIGHT}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 resize-y"
          />
          <p className="mt-1.5 text-[12px] text-gray-500">
            The more context you share, the better we can match you. Two or three sentences is plenty.
          </p>
        </div>
      </Section>
    </div>
  );
}

function ProfileStatusTag({ status }: { status?: ClientProfileStatus }) {
  if (!status) return null;
  const map: Record<ClientProfileStatus, { label: string; cls: string }> = {
    under_review: { label: "Under Review", cls: "bg-amber-50 text-amber-700 border-amber-200" },
    active      : { label: "Active",       cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    rejected    : { label: "Rejected",     cls: "bg-red-50 text-red-700 border-red-200" },
    deactivated : { label: "Deactivated",  cls: "bg-gray-100 text-gray-600 border-gray-200" },
  };
  const { label, cls } = map[status];
  return (
    <span className={["inline-flex items-center text-[10.5px] font-semibold uppercase tracking-wider px-2 py-[3px] rounded-full border", cls].join(" ")}>
      {label}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.07em] text-gray-600 mb-3">{title}</h2>
      {children}
    </div>
  );
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 last:mb-0">{children}</div>;
}
function Field({ label, value, onChange, placeholder, readOnly, note }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; readOnly?: boolean; note?: string }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
        {label}
        {note && <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-1.5 py-[1px] normal-case">{note}</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        style={readOnly ? { background: "#f9fafb", color: "#6b7280", colorScheme: "light", WebkitTextFillColor: "#6b7280" } : FIELD_LIGHT}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={FIELD_LIGHT}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500"
      >
        {options.map((o) => <option key={o || "_blank"} value={o}>{o || "—"}</option>)}
      </select>
    </div>
  );
}
