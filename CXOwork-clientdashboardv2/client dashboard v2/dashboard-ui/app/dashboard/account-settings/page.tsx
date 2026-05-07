"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useClient } from "@/lib/mock-context";
import {
  User, Lock, CreditCard, Bell, Plug, Shield, Trash2,
  LogOut, Download, ExternalLink, Check, ChevronRight,
  Scale, ShieldCheck, Cookie,
} from "lucide-react";

// ─── Nav sections ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "my-info",        label: "My info",               icon: User },
  { id: "password",       label: "Password & Security",   icon: Lock },
  { id: "membership",     label: "Membership",            icon: CreditCard },
  { id: "notifications",  label: "Notification Settings", icon: Bell },
  { id: "connected",      label: "Connected Services",    icon: Plug },
];

// ─── Shared primitives ────────────────────────────────────────────────────────

const FIELD_STYLE: React.CSSProperties = {
  background: "#fff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827",
};
const READONLY_STYLE: React.CSSProperties = {
  background: "#f9fafb", color: "#6b7280", colorScheme: "light", WebkitTextFillColor: "#6b7280",
};

function SectionCard({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-6 bg-white border border-gray-200 rounded-2xl overflow-hidden mb-5">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function Field({ label, value, onChange, placeholder, readOnly, note, span }: {
  label: string; value: string; onChange?: (v: string) => void;
  placeholder?: string; readOnly?: boolean; note?: string; span?: boolean;
}) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
        {note && <span className="ml-2 normal-case text-[10px] font-medium bg-gray-100 border border-gray-200 text-gray-500 rounded-full px-1.5 py-px">{note}</span>}
      </label>
      <input
        type="text" value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder} readOnly={readOnly}
        style={readOnly ? READONLY_STYLE : FIELD_STYLE}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={FIELD_STYLE}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        {options.map(o => <option key={o || "_blank"} value={o}>{o || "—"}</option>)}
      </select>
    </div>
  );
}

function Toggle({ label, desc, checked, onChange, last }: {
  label: string; desc: string; checked: boolean; onChange: (v: boolean) => void; last?: boolean;
}) {
  return (
    <div className={`flex items-start justify-between py-4 ${!last ? "border-b border-gray-100" : ""}`}>
      <div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ml-6 mt-0.5 ${checked ? "bg-blue-600" : "bg-gray-200"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function ActionRow({ label, desc, children, last, danger }: {
  label: string; desc: string; children: React.ReactNode; last?: boolean; danger?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between py-4 ${!last ? "border-b border-gray-100" : ""}`}>
      <div>
        <p className={`text-sm font-semibold ${danger ? "text-red-700" : "text-gray-900"}`}>{label}</p>
        <p className={`text-xs mt-0.5 ${danger ? "text-red-400" : "text-gray-500"}`}>{desc}</p>
      </div>
      {children}
    </div>
  );
}

// ─── Options ──────────────────────────────────────────────────────────────────

const STAGE_OPTIONS   = ["", "Idea", "Pre-seed", "Seed", "Series A", "Series B", "Series C+", "Growth", "Public"];
const SIZE_OPTIONS    = ["", "Just me (1)", "2–10", "11–50", "51–200", "201–500", "500+"];
const INDUSTRY_OPTIONS = ["", "Financial Services", "Information Technology & Services", "Internet",
  "Computer Software", "Marketing & Advertising", "Health, Wellness & Fitness",
  "Hospital & Health Care", "Real Estate", "Retail", "Banking", "Management Consulting", "Other"];
const ROLE_OPTIONS    = ["", "CFO", "CTO", "CMO", "COO", "CPO", "CHRO", "CSO", "CRO", "Other"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountSettingsPage() {
  const { client, updateClientData } = useClient();

  // ── draft state (personal + company + prefs) ──
  const [draft, setDraft] = useState({
    ...client,
    prefRole: client.preferences?.role || "",
    prefLookingFor: client.preferences?.lookingFor || "",
  });

  useEffect(() => {
    setDraft({ ...client, prefRole: client.preferences?.role || "", prefLookingFor: client.preferences?.lookingFor || "" });
  }, [client]);

  function set<K extends keyof typeof draft>(k: K, v: typeof draft[K]) {
    setDraft(d => ({ ...d, [k]: v }));
  }

  const isDirty = useMemo(() => {
    const keys: (keyof typeof client)[] = ["firstName","lastName","phone","title","location",
      "companyName","companyIndustry","companyStage","companySize","companyWebsite","companyDescription"];
    for (const k of keys) {
      if ((draft[k as keyof typeof draft] as string)?.trim?.() !== ((client[k] as string) ?? "")) return true;
    }
    if (draft.prefRole !== (client.preferences?.role || "")) return true;
    if (draft.prefLookingFor.trim() !== (client.preferences?.lookingFor || "")) return true;
    return false;
  }, [draft, client]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateClientData({
      firstName: draft.firstName, lastName: draft.lastName, phone: draft.phone,
      title: draft.title, location: draft.location, companyName: draft.companyName,
      companyIndustry: draft.companyIndustry, companyStage: draft.companyStage,
      companySize: draft.companySize, companyWebsite: draft.companyWebsite,
      companyDescription: draft.companyDescription,
      preferences: { role: draft.prefRole, lookingFor: draft.prefLookingFor },
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  // ── security ──
  const [resetMsg, setResetMsg] = useState("");
  function handleResetPassword() {
    setResetMsg(`A reset link has been sent to ${client.email}`);
    setTimeout(() => setResetMsg(""), 5000);
  }

  // ── notifications ──
  function setPref(key: "notifyMessages" | "notifyMatches" | "notifyProductUpdates" | "notifyMarketing", val: boolean) {
    updateClientData({ [key]: val } as Parameters<typeof updateClientData>[0]);
  }

  // ── delete ──
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  // ── active nav ──
  const [activeSection, setActiveSection] = useState("my-info");
  const contentRef = useRef<HTMLDivElement>(null);

  function scrollTo(id: string) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const initials = ((client.firstName?.[0] || "") + (client.lastName?.[0] || "")).toUpperCase() || "?";
  const fullName  = [client.firstName, client.lastName].filter(Boolean).join(" ");

  return (
    <div>
      {/* Page heading */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">Account settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your profile, security, and preferences.</p>
        </div>
        {isDirty && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving ? "Saving…" : saved ? <><Check className="w-4 h-4" /> Saved</> : "Save changes"}
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

        {/* ── Left nav ── */}
        <nav className="w-full lg:w-52 lg:flex-shrink-0 lg:sticky lg:top-4">
          {/* Avatar card — desktop only */}
          <div className="hidden lg:flex bg-white border border-gray-200 rounded-2xl p-4 mb-4 items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{fullName || "Your name"}</p>
              <p className="text-xs text-gray-500 truncate">Client account</p>
            </div>
          </div>

          {/* Desktop: vertical list · Mobile: horizontal scrollable pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide mb-4">
            {[...NAV_ITEMS, { id: "danger", label: "Delete account", icon: Trash2 }].map(item => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              const isDanger = item.id === "danger";
              return (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition whitespace-nowrap ${
                    active ? "bg-blue-600 text-white border-blue-600" :
                    isDanger ? "border-red-200 text-red-500 bg-white hover:bg-red-50" :
                    "border-gray-200 text-gray-500 bg-white hover:bg-gray-50"
                  }`}>
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <ul className="hidden lg:block space-y-0.5">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button onClick={() => scrollTo(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition text-left ${
                      active ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`}>
                    <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-blue-600" : "text-gray-500"}`} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Danger zone — desktop only */}
          <div className="hidden lg:block mt-4 pt-4 border-t border-gray-100">
            <button onClick={() => scrollTo("danger")}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition text-left">
              <Trash2 className="w-4 h-4 flex-shrink-0" /> Delete account
            </button>
          </div>
        </nav>

        {/* ── Right content ── */}
        <div ref={contentRef} className="flex-1 min-w-0">

          {/* ── My Info ── */}
          <SectionCard id="my-info" title="My info" subtitle="This is a client account">

            {/* Account summary */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-lg flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-gray-900">{fullName || "Your name"}</p>
                <p className="text-sm text-gray-500">{client.email}</p>
                <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 mt-1">
                  Active
                </span>
              </div>
            </div>

            {/* Personal fields */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Personal</p>
              <div className="space-y-3">
                <FieldRow>
                  <Field label="First name" value={draft.firstName} onChange={v => set("firstName", v)} />
                  <Field label="Last name" value={draft.lastName} onChange={v => set("lastName", v)} />
                </FieldRow>
                <FieldRow>
                  <Field label="Email" value={client.email} readOnly note="Sign-in email" />
                  <Field label="Phone" value={draft.phone} onChange={v => set("phone", v)} placeholder="+1 415 555 0100" />
                </FieldRow>
                <FieldRow>
                  <Field label="Title" value={draft.title} onChange={v => set("title", v)} placeholder="Founder & CEO" />
                  <Field label="Location" value={draft.location} onChange={v => set("location", v)} placeholder="San Francisco, CA" />
                </FieldRow>
              </div>
            </div>

            {/* Company fields */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Company details</p>
              <div className="space-y-3">
                <FieldRow>
                  <Field label="Company name" value={draft.companyName} onChange={v => set("companyName", v)} />
                  <Field label="Website" value={draft.companyWebsite} onChange={v => set("companyWebsite", v)} placeholder="https://acme.com" />
                </FieldRow>
                <FieldRow>
                  <SelectField label="Industry" value={draft.companyIndustry} onChange={v => set("companyIndustry", v)} options={INDUSTRY_OPTIONS} />
                  <SelectField label="Stage" value={draft.companyStage} onChange={v => set("companyStage", v)} options={STAGE_OPTIONS} />
                </FieldRow>
                <FieldRow>
                  <SelectField label="Company size" value={draft.companySize} onChange={v => set("companySize", v)} options={SIZE_OPTIONS} />
                  <span />
                </FieldRow>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Description</label>
                  <textarea
                    value={draft.companyDescription}
                    onChange={e => set("companyDescription", e.target.value)}
                    placeholder="What does your company do?"
                    rows={4}
                    style={FIELD_STYLE}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Advisor search prefs */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Advisor search preferences</p>
              <div className="space-y-3">
                <SelectField label="Role you're looking to hire" value={draft.prefRole} onChange={v => set("prefRole", v)} options={ROLE_OPTIONS} />
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Tell us a bit more</label>
                  <textarea
                    value={draft.prefLookingFor}
                    onChange={e => set("prefLookingFor", e.target.value)}
                    placeholder="Stage, industry, what kind of executive would be a fit…"
                    rows={3}
                    style={FIELD_STYLE}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Save button inline */}
            {isDirty && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {saving ? "Saving…" : saved ? <><Check className="w-4 h-4" /> Saved</> : "Save changes"}
                </button>
              </div>
            )}
          </SectionCard>

          {/* ── Password & Security ── */}
          <SectionCard id="password" title="Password & Security" subtitle="Manage how you sign in and keep your account safe.">
            <ActionRow label="Password" desc={`Reset link sent to ${client.email}`}>
              <button
                onClick={handleResetPassword}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
              >
                <Lock className="w-3.5 h-3.5" /> Reset password
              </button>
            </ActionRow>
            {resetMsg && (
              <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
                <Check className="w-4 h-4 text-blue-500" /> {resetMsg}
              </div>
            )}
            <ActionRow label="Sign out" desc="Sign out of CXOwork on this device" last>
              <button
                onClick={() => alert("Sign out — not wired in UI-only mode.")}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            </ActionRow>
          </SectionCard>

          {/* ── Membership ── */}
          <SectionCard id="membership" title="Membership" subtitle="Your current plan and billing.">
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <div>
                <p className="text-sm font-bold text-blue-900">Growth Plan</p>
                <p className="text-xs text-blue-600 mt-0.5">Renews May 1, 2026 · $299/mo</p>
              </div>
              <span className="text-xs px-2.5 py-1 bg-blue-600 text-white rounded-full font-semibold">Active</span>
            </div>
            <ActionRow label="Billing history" desc="View past invoices and receipts">
              <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition">
                <ExternalLink className="w-3.5 h-3.5" /> View invoices
              </button>
            </ActionRow>
            <ActionRow label="Payment method" desc="Visa ending in 4242" last>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition">
                <CreditCard className="w-3.5 h-3.5" /> Update card
              </button>
            </ActionRow>
          </SectionCard>

          {/* ── Notification Settings ── */}
          <SectionCard id="notifications" title="Notification Settings" subtitle="Control when and how CXOwork contacts you.">
            <div className="-mt-4">
              <Toggle label="New messages" desc="Email me when an advisor replies" checked={client.notifyMessages !== false} onChange={v => setPref("notifyMessages", v)} />
              <Toggle label="New advisor matches" desc="When we surface advisors that fit your needs" checked={client.notifyMatches !== false} onChange={v => setPref("notifyMatches", v)} />
              <Toggle label="Product updates" desc="Important platform changes and tips" checked={client.notifyProductUpdates !== false} onChange={v => setPref("notifyProductUpdates", v)} />
              <Toggle label="Marketing emails" desc="Occasional newsletters and offers" checked={!!client.notifyMarketing} onChange={v => setPref("notifyMarketing", v)} last />
            </div>
          </SectionCard>

          {/* ── Connected Services ── */}
          <SectionCard id="connected" title="Connected Services" subtitle="Apps and integrations linked to your account.">
            {[
              { name: "Google Calendar", desc: "Sync sessions to your calendar", connected: true },
              { name: "Slack", desc: "Receive notifications in your workspace", connected: false },
              { name: "Notion", desc: "Export briefs and notes to Notion", connected: false },
            ].map((svc, i, arr) => (
              <div key={svc.name} className={`flex items-center justify-between py-4 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 grid place-items-center text-sm font-bold text-gray-500 flex-shrink-0">
                    {svc.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{svc.name}</p>
                    <p className="text-xs text-gray-500">{svc.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {svc.connected && (
                    <span className="text-xs px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 rounded-full font-medium">Connected</span>
                  )}
                  <button className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${svc.connected ? "border-gray-200 text-gray-500 hover:bg-gray-50" : "border-blue-200 text-blue-600 hover:bg-blue-50"}`}>
                    {svc.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </div>
            ))}
          </SectionCard>

          {/* ── Legal & Privacy ── */}
          <SectionCard id="legal" title="Legal & Privacy">
            {[
              { icon: Scale,       label: "Terms & Conditions", sub: "Read our platform terms and conditions" },
              { icon: ShieldCheck, label: "Privacy Policy",     sub: "See how we collect and use your data" },
              { icon: Cookie,      label: "Cookie Policy",      sub: "Manage your cookie preferences" },
            ].map((item, i, arr) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href="#"
                  className={`flex items-center justify-between py-4 hover:bg-gray-50 -mx-6 px-6 transition ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
              );
            })}
            <ActionRow label="Export my data" desc="Request a copy of all data CXOwork holds about you (GDPR / CCPA)" last>
              <button
                onClick={() => alert("Data export — not wired in UI-only mode.")}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
              >
                <Download className="w-3.5 h-3.5" /> Request
              </button>
            </ActionRow>
          </SectionCard>

          {/* ── Delete account ── */}
          <div id="danger" className="scroll-mt-6 bg-white border border-red-200 rounded-2xl overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-red-100 bg-red-50">
              <h2 className="text-base font-bold text-red-700">Delete account</h2>
              <p className="text-sm text-red-400 mt-0.5">Permanently remove your profile, data, and access.</p>
            </div>
            <div className="px-6 py-5">
              {!deleteConfirm ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 max-w-sm">
                    Once deleted, your account cannot be recovered. All briefs, matches, and messages will be removed.
                  </p>
                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-50 transition flex-shrink-0 ml-4"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete account
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    This will <strong>permanently delete</strong> your profile. This action cannot be undone.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Type <strong>DELETE</strong> to confirm</label>
                    <input
                      value={deleteInput}
                      onChange={e => setDeleteInput(e.target.value)}
                      placeholder="DELETE"
                      style={{ ...FIELD_STYLE, fontFamily: "monospace" }}
                      className="w-full max-w-xs px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setDeleteConfirm(false); setDeleteInput(""); }}
                      className="px-4 py-2 border border-gray-200 text-gray-500 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={deleteInput !== "DELETE"}
                      onClick={() => alert("Delete — not wired in UI-only mode.")}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Delete my account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
