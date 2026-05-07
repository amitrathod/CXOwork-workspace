"use client";
import { useEffect, useMemo, useState } from "react";
import { useClient } from "@/lib/mock-context";

const STAGE_OPTIONS = ["", "Idea", "Pre-seed", "Seed", "Series A", "Series B", "Series C+", "Growth", "Public"];
const SIZE_OPTIONS  = ["", "Just me (1)", "2–10", "11–50", "51–200", "201–500", "500+"];
const INDUSTRY_OPTIONS = ["", "Financial Services","Information Technology & Services","Internet","Computer Software","Marketing & Advertising","Health, Wellness & Fitness","Hospital & Health Care","Real Estate","Retail","Banking","Management Consulting","Other"];
const ROLE_OPTIONS = ["", "CFO", "CTO", "CMO", "COO", "CPO", "CHRO", "CSO", "CRO", "Other"];
const FIELD_LIGHT: React.CSSProperties = { background: "#fff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827" };

export default function ClientProfilePage() {
  const { client, updateClientData } = useClient();
  const [draft, setDraft] = useState({ ...client, prefRole: client.preferences?.role || "", prefLookingFor: client.preferences?.lookingFor || "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    setDraft({ ...client, prefRole: client.preferences?.role || "", prefLookingFor: client.preferences?.lookingFor || "" });
  }, [client]);

  function set<K extends keyof typeof draft>(k: K, v: typeof draft[K]) { setDraft(d => ({ ...d, [k]: v })); }

  const isDirty = useMemo(() => {
    const keys: (keyof typeof client)[] = ["firstName","lastName","phone","title","location","companyName","companyIndustry","companyStage","companySize","companyWebsite","companyDescription"];
    for (const k of keys) { if ((draft[k as keyof typeof draft] as string)?.trim?.() !== ((client[k] as string) ?? "")) return true; }
    if (draft.prefRole !== (client.preferences?.role || "")) return true;
    if (draft.prefLookingFor.trim() !== (client.preferences?.lookingFor || "")) return true;
    return false;
  }, [draft, client]);

  async function save() {
    setSaving(true); setSaved("");
    await new Promise(r => setTimeout(r, 600));
    updateClientData({
      firstName: draft.firstName, lastName: draft.lastName, phone: draft.phone,
      title: draft.title, location: draft.location, companyName: draft.companyName,
      companyIndustry: draft.companyIndustry, companyStage: draft.companyStage,
      companySize: draft.companySize, companyWebsite: draft.companyWebsite,
      companyDescription: draft.companyDescription,
      preferences: { role: draft.prefRole, lookingFor: draft.prefLookingFor },
    });
    setSaving(false); setSaved("Saved");
    setTimeout(() => setSaved(""), 3000);
  }

  const initials = ((client.firstName?.[0] || "") + (client.lastName?.[0] || "")).toUpperCase() || "?";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">My profile</h1>
          <p className="text-sm text-gray-500 mt-1">Keep your details up to date so we can match you with the right advisors.</p>
        </div>
        <button type="button" onClick={save} disabled={saving || (!isDirty && !saved)}
          className={["text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors", (isDirty || saving) ? "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50" : saved ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"].join(" ")}>
          {saving ? "Saving…" : saved || "Save changes"}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-lg shrink-0">{initials}</div>
        <div className="min-w-0">
          <div className="flex items-center flex-wrap gap-2">
            <div className="text-[16px] font-bold">{[draft.firstName, draft.lastName].filter(Boolean).join(" ") || "Your name"}</div>
            <span className="inline-flex items-center text-[10.5px] font-semibold uppercase tracking-wider px-2 py-[3px] rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">Active</span>
          </div>
          <div className="text-[12.5px] text-gray-500">{client.email}</div>
        </div>
      </div>

      <Section title="Personal">
        <Row><Field label="First name" value={draft.firstName} onChange={v => set("firstName", v)} /><Field label="Last name" value={draft.lastName} onChange={v => set("lastName", v)} /></Row>
        <Row>
          <Field label="Email" value={client.email} onChange={() => {}} readOnly note="Used for sign-in" />
          <Field label="Phone" value={draft.phone} onChange={v => set("phone", v)} placeholder="+1 415 555 0100" />
        </Row>
        <Row><Field label="Title" value={draft.title} onChange={v => set("title", v)} placeholder="Founder & CEO" /><Field label="Location" value={draft.location} onChange={v => set("location", v)} placeholder="San Francisco, CA" /></Row>
      </Section>

      <Section title="Company">
        <Row><Field label="Company name" value={draft.companyName} onChange={v => set("companyName", v)} /><Field label="Website" value={draft.companyWebsite} onChange={v => set("companyWebsite", v)} placeholder="https://acme.com" /></Row>
        <Row>
          <Select label="Industry" value={draft.companyIndustry} onChange={v => set("companyIndustry", v)} options={INDUSTRY_OPTIONS} />
          <Select label="Stage" value={draft.companyStage} onChange={v => set("companyStage", v)} options={STAGE_OPTIONS} />
        </Row>
        <Row><Select label="Company size" value={draft.companySize} onChange={v => set("companySize", v)} options={SIZE_OPTIONS} /><span /></Row>
        <div className="mt-3">
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Description</label>
          <textarea value={draft.companyDescription} onChange={e => set("companyDescription", e.target.value)} placeholder="What does your company do?" rows={4} style={FIELD_LIGHT}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 resize-y" />
        </div>
      </Section>

      <Section title="Advisor search preferences">
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Role you are looking to hire?</label>
          <Select label="" value={draft.prefRole} onChange={v => set("prefRole", v)} options={ROLE_OPTIONS} />
        </div>
        <div className="mt-3">
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Tell us a bit more</label>
          <textarea value={draft.prefLookingFor} onChange={e => set("prefLookingFor", e.target.value)}
            placeholder="What's the situation? Stage, industry, what kind of executive would be a fit…" rows={4} style={FIELD_LIGHT}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 resize-y" />
          <p className="mt-1.5 text-[12px] text-gray-500">The more context you share, the better we can match you.</p>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5"><h2 className="text-[12px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-3">{title}</h2>{children}</div>;
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 last:mb-0">{children}</div>;
}
function Field({ label, value, onChange, placeholder, readOnly, note }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; readOnly?: boolean; note?: string }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
        {label}{note && <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-1.5 py-[1px] normal-case">{note}</span>}
      </label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} readOnly={readOnly}
        style={readOnly ? { background: "#f9fafb", color: "#6b7280", colorScheme: "light", WebkitTextFillColor: "#6b7280" } : { background: "#fff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827" }}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500" />
    </div>
  );
}
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      {label && <label className="block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} style={{ background: "#fff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827" }}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500">
        {options.map(o => <option key={o || "_blank"} value={o}>{o || "—"}</option>)}
      </select>
    </div>
  );
}
