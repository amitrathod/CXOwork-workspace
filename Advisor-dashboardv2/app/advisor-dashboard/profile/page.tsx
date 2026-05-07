"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import {
  User, Briefcase, ShieldCheck, Lock, Bell, Trash2,
  Check, LogOut, ChevronRight, Scale, Cookie, Download,
  ExternalLink,
} from "lucide-react";
import { useAdvisor } from "@/lib/advisor-context";
import type { AdvisorProfile, WorkHistoryEntry, Reference } from "@/types/advisor";

// ─── Nav sections ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "my-info",       label: "My info",               icon: User },
  { id: "experience",    label: "Experience",             icon: Briefcase },
  { id: "verification",  label: "Verification",           icon: ShieldCheck },
  { id: "privacy",       label: "Privacy",                icon: Lock },
  { id: "notifications", label: "Notification Settings",  icon: Bell },
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

function Field({ label, value, onChange, placeholder, readOnly, note, type = "text" }: {
  label: string; value: string; onChange?: (v: string) => void;
  placeholder?: string; readOnly?: boolean; note?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
        {note && <span className="ml-2 normal-case text-[10px] font-medium bg-gray-100 border border-gray-200 text-gray-500 rounded-full px-1.5 py-px">{note}</span>}
      </label>
      <input
        type={type} value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder} readOnly={readOnly}
        style={readOnly ? READONLY_STYLE : FIELD_STYLE}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 4 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
      <textarea
        value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} rows={rows}
        style={FIELD_STYLE}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
      />
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

function SaveBar({ isDirty, saving, saved, onSave }: { isDirty: boolean; saving: boolean; saved: boolean; onSave: () => void }) {
  if (!isDirty) return null;
  return (
    <div className="flex justify-end pt-2">
      <button
        onClick={onSave} disabled={saving}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
      >
        {saving ? "Saving…" : saved ? <><Check className="w-4 h-4" /> Saved</> : "Save changes"}
      </button>
    </div>
  );
}

// ─── Page wrapper (Suspense for useSearchParams safety) ───────────────────────

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="grid place-items-center py-20">
        <div className="w-9 h-9 rounded-full border-[3px] border-gray-200 border-t-gray-900 animate-spin" />
      </div>
    }>
      <AccountSettingsPage />
    </Suspense>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function AccountSettingsPage() {
  const { advisor, refresh } = useAdvisor();

  // ── draft state ──
  const [draft, setDraft] = useState<Partial<AdvisorProfile>>({});
  useEffect(() => { if (advisor) setDraft({ ...advisor }); }, [advisor]);

  function set<K extends keyof AdvisorProfile>(k: K, v: AdvisorProfile[K]) {
    setDraft(d => ({ ...d, [k]: v }));
  }

  const isDirty = useMemo(() => {
    if (!advisor) return false;
    const keys: (keyof AdvisorProfile)[] = [
      "firstName", "lastName", "headline", "professionalTitle", "location",
      "bio", "hourlyRate", "linkedinUrl", "profileVisibility", "anonymousMode",
      "notifyEmail", "notifySms",
    ];
    return keys.some(k => draft[k] !== advisor[k]);
  }, [draft, advisor]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    refresh();
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  // ── active nav ──
  const [activeSection, setActiveSection] = useState("my-info");

  function scrollTo(id: string) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ── delete ──
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  // ── password reset ──
  const [resetMsg, setResetMsg] = useState("");

  if (!advisor) return (
    <div className="grid place-items-center py-20">
      <div className="w-9 h-9 rounded-full border-[3px] border-gray-200 border-t-gray-900 animate-spin" />
    </div>
  );

  const initials = ((advisor.firstName?.[0] || "") + (advisor.lastName?.[0] || "")).toUpperCase() || "?";
  const fullName  = [advisor.firstName, advisor.lastName].filter(Boolean).join(" ");

  return (
    <div>
      {/* ── Page heading ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[1.75rem] font-bold tracking-tight text-gray-900">Account settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your profile, security, and preferences.</p>
        </div>
        {isDirty && (
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50">
            {saving ? "Saving…" : saved ? <><Check className="w-4 h-4" /> Saved</> : "Save changes"}
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

        {/* ── Left nav ── */}
        <nav className="w-full lg:w-52 lg:flex-shrink-0 lg:sticky lg:top-20">
          {/* Avatar card */}
          <div className="hidden lg:flex bg-white border border-gray-200 rounded-2xl p-4 mb-4 items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-900 text-white grid place-items-center font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{fullName || "Your name"}</p>
              <p className="text-xs text-gray-500 truncate">Advisor account</p>
            </div>
          </div>

          {/* Mobile: horizontal scrollable pills */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 mb-4">
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

          {/* Desktop: vertical list */}
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

          {/* Danger zone */}
          <div className="hidden lg:block mt-4 pt-4 border-t border-gray-100">
            <button onClick={() => scrollTo("danger")}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition text-left">
              <Trash2 className="w-4 h-4 flex-shrink-0" /> Delete account
            </button>
          </div>
        </nav>

        {/* ── Right content ── */}
        <div className="flex-1 min-w-0">

          {/* ── My Info ── */}
          <SectionCard id="my-info" title="My info" subtitle="This is an advisor account">
            {/* Account summary */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-gray-900 text-white grid place-items-center font-bold text-lg flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-gray-900">{fullName || "Your name"}</p>
                <p className="text-sm text-gray-500">{advisor.email}</p>
                <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1 ${
                  advisor.profileStatus === "active"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-amber-50 border border-amber-200 text-amber-700"
                }`}>
                  {advisor.profileStatus === "active" ? "Active" : advisor.profileStatus === "under_review" ? "Under Review" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Personal fields */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Personal</p>
              <div className="space-y-3">
                <FieldRow>
                  <Field label="First name" value={draft.firstName || ""} onChange={v => set("firstName", v)} />
                  <Field label="Last name"  value={draft.lastName  || ""} onChange={v => set("lastName",  v)} />
                </FieldRow>
                <FieldRow>
                  <Field label="Email" value={advisor.email} readOnly note="Sign-in email" />
                  <Field label="Professional title" value={draft.professionalTitle || ""} onChange={v => set("professionalTitle", v)} placeholder="e.g. Chief Financial Officer" />
                </FieldRow>
                <FieldRow>
                  <Field label="Location" value={draft.location || ""} onChange={v => set("location", v)} placeholder="San Francisco, CA" />
                  <Field label="Hourly rate ($)" value={String(draft.hourlyRate || "")} onChange={v => set("hourlyRate", Number(v) as unknown as AdvisorProfile["hourlyRate"])} placeholder="350" type="number" />
                </FieldRow>
                <Field label="LinkedIn URL" value={draft.linkedinUrl || ""} onChange={v => set("linkedinUrl", v)} placeholder="linkedin.com/in/yourprofile" />
              </div>
            </div>

            {/* Professional headline */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Public profile</p>
              <div className="space-y-3">
                <Field label="Professional headline" value={draft.headline || ""} onChange={v => set("headline", v)} placeholder="e.g. Former CFO | Series B/C Fundraising Expert" />
                <TextAreaField label="Bio" value={draft.bio || ""} onChange={v => set("bio", v)} placeholder="Tell clients about your background and what you can help with…" rows={5} />
              </div>
            </div>

            <SaveBar isDirty={isDirty} saving={saving} saved={saved} onSave={handleSave} />
          </SectionCard>

          {/* ── Experience ── */}
          <ExperienceSection id="experience" advisor={advisor} onSaved={refresh} />

          {/* ── Verification ── */}
          <VerificationSection id="verification" advisor={advisor} />

          {/* ── Privacy ── */}
          <SectionCard id="privacy" title="Privacy" subtitle="Control who can see your profile.">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Profile visibility</p>
              <div className="space-y-2">
                {[
                  { id: "public",   label: "Public",         sub: "Anyone can view your profile" },
                  { id: "invite",   label: "Invite-only",    sub: "Only clients you invite can view your profile" },
                  { id: "verified", label: "Verified users", sub: "Only verified CXOwork members can view your profile" },
                ].map(opt => (
                  <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    (draft.profileVisibility || "public") === opt.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                  }`}>
                    <input
                      type="radio" name="visibility" value={opt.id}
                      checked={(draft.profileVisibility || "public") === opt.id}
                      onChange={() => set("profileVisibility", opt.id as AdvisorProfile["profileVisibility"])}
                      className="accent-blue-600"
                    />
                    <div>
                      <p className={`text-sm font-semibold ${(draft.profileVisibility || "public") === opt.id ? "text-blue-700" : "text-gray-900"}`}>{opt.label}</p>
                      <p className="text-xs text-gray-500">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="-mt-2">
              <Toggle
                label="Anonymous mode"
                desc="Show your initials only until you approve a client match"
                checked={!!draft.anonymousMode}
                onChange={v => set("anonymousMode", v)}
                last
              />
            </div>
            <SaveBar isDirty={isDirty} saving={saving} saved={saved} onSave={handleSave} />
          </SectionCard>

          {/* ── Notification Settings ── */}
          <SectionCard id="notifications" title="Notification Settings" subtitle="Control when and how CXOwork contacts you.">
            <div className="-mt-4">
              <Toggle label="Email notifications" desc="Receive updates and match alerts by email" checked={draft.notifyEmail !== false} onChange={v => set("notifyEmail", v)} />
              <Toggle label="SMS notifications"   desc="Receive text messages for new matches"     checked={!!draft.notifySms}              onChange={v => set("notifySms",   v)} last />
            </div>
            <SaveBar isDirty={isDirty} saving={saving} saved={saved} onSave={handleSave} />
          </SectionCard>

          {/* ── Password & Security ── */}
          <SectionCard id="password" title="Password & Security" subtitle="Manage how you sign in and keep your account safe.">
            <ActionRow label="Password" desc={`Reset link sent to ${advisor.email}`}>
              <button
                onClick={() => { setResetMsg(`A reset link has been sent to ${advisor.email}`); setTimeout(() => setResetMsg(""), 5000); }}
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
              <button onClick={() => alert("Sign out — UI demo only.")}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition">
                <LogOut className="w-3.5 h-3.5" /> Sign out
              </button>
            </ActionRow>
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
            <ActionRow label="Export my data" desc="Request a copy of all your CXOwork data (GDPR / CCPA)" last>
              <button onClick={() => alert("Data export — UI demo only.")}
                className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition">
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
                    Once deleted, your account cannot be recovered. All matches, messages, and leads will be removed.
                  </p>
                  <button onClick={() => setDeleteConfirm(true)}
                    className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-50 transition flex-shrink-0 ml-4">
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
                    <input value={deleteInput} onChange={e => setDeleteInput(e.target.value)} placeholder="DELETE"
                      style={{ ...FIELD_STYLE, fontFamily: "monospace" }}
                      className="w-full max-w-xs px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => { setDeleteConfirm(false); setDeleteInput(""); }}
                      className="px-4 py-2 border border-gray-200 text-gray-500 text-sm font-medium rounded-xl hover:bg-gray-50 transition">Cancel</button>
                    <button disabled={deleteInput !== "DELETE"} onClick={() => alert("Delete — UI demo only.")}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed">
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

// ─── Experience section ───────────────────────────────────────────────────────

function ExperienceSection({ id, advisor, onSaved }: { id: string; advisor: AdvisorProfile; onSaved: () => void }) {
  const history = advisor.experienceHistory || advisor.workHistory || [];
  const skills  = advisor.skills || advisor.coreSkills || [];
  const industries = advisor.selectedIndustries || [];

  const [editingIdx, setEditingIdx] = useState<number | "new" | null>(null);
  const [skillsText, setSkillsText]  = useState(skills.join(", "));
  const [indText, setIndText]        = useState(industries.join(", "));
  const [saved, setSaved] = useState(false);

  function saveSkills() {
    setSaved(true); onSaved(); setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div id={id} className="scroll-mt-6 mb-5 space-y-4">
      {/* Work history card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Experience</h2>
            <p className="text-sm text-gray-500 mt-0.5">Your work history and professional background.</p>
          </div>
          <button onClick={() => setEditingIdx("new")}
            className="text-xs font-semibold text-blue-600 hover:underline px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition">
            + Add role
          </button>
        </div>
        <div className="px-6 py-5">
          {history.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No work history yet.</p>
          ) : (
            <div className="space-y-4">
              {history.map((entry, i) => (
                <div key={i} className={`flex items-start gap-4 ${i < history.length - 1 ? "pb-4 border-b border-gray-100" : ""}`}>
                  <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 grid place-items-center flex-shrink-0">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{entry.title}</p>
                    <p className="text-sm text-gray-600">{entry.company}</p>
                    {(entry.startDate || entry.endDate) && (
                      <p className="text-xs text-gray-400 mt-0.5">{entry.startDate} – {entry.endDate || "Present"}</p>
                    )}
                    {entry.description && <p className="text-xs text-gray-500 mt-1">{entry.description}</p>}
                  </div>
                  <button onClick={() => setEditingIdx(i)}
                    className="text-xs text-blue-600 hover:underline flex-shrink-0">Edit</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Skills & industries card */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Skills & Industries</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Skills</label>
            <textarea value={skillsText} onChange={e => setSkillsText(e.target.value)} rows={2} style={FIELD_STYLE}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
            <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skills.map(s => (
                  <span key={s} className="text-[11.5px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{s}</span>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Industries</label>
            <input value={indText} onChange={e => setIndText(e.target.value)} style={FIELD_STYLE}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <button onClick={saveSkills}
              className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
              Save changes
            </button>
            {saved && <span className="text-sm text-green-600 font-medium flex items-center gap-1"><Check className="w-4 h-4" /> Saved</span>}
          </div>
        </div>
      </div>

      {/* Work history modal */}
      {editingIdx !== null && (
        <WorkHistoryModal
          entry={editingIdx === "new" ? null : history[editingIdx] || null}
          onClose={() => setEditingIdx(null)}
          onSave={() => { setEditingIdx(null); onSaved(); }}
        />
      )}
    </div>
  );
}

function WorkHistoryModal({ entry, onClose, onSave }: { entry: WorkHistoryEntry | null; onClose: () => void; onSave: () => void }) {
  const [draft, setDraft] = useState({
    title: entry?.title || "", company: entry?.company || "",
    startDate: entry?.startDate || "", endDate: entry?.endDate || "",
    description: entry?.description || "",
  });
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof draft>(k: K, v: string) { setDraft(d => ({ ...d, [k]: v })); }

  async function save() {
    if (!draft.title.trim()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    setSaving(false); onSave();
  }

  useEffect(() => {
    function onEsc(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(15,23,42,0.40)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "5vh 16px", overflowY: "auto" }}>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", width: "100%", maxWidth: 560, colorScheme: "light" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">{entry ? "Edit role" : "Add role"}</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <FieldRow>
            <Field label="Title *"  value={draft.title}   onChange={v => set("title",   v)} placeholder="e.g. CFO" />
            <Field label="Company"  value={draft.company} onChange={v => set("company", v)} placeholder="Company name" />
          </FieldRow>
          <FieldRow>
            <Field label="Start year" value={draft.startDate} onChange={v => set("startDate", v)} placeholder="2019" />
            <Field label="End year"   value={draft.endDate}   onChange={v => set("endDate",   v)} placeholder="2023 or leave blank" />
          </FieldRow>
          <TextAreaField label="Description" value={draft.description} onChange={v => set("description", v)} placeholder="Key achievements…" rows={3} />
        </div>
        <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={save} disabled={saving}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gray-900 hover:bg-black disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Verification section ─────────────────────────────────────────────────────

function VerificationSection({ id, advisor }: { id: string; advisor: AdvisorProfile }) {
  const refs = (advisor.references || []).filter(r => r.name && r.email);

  return (
    <div id={id} className="scroll-mt-6 mb-5 space-y-4">
      {/* ID verification */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Verification</h2>
          <p className="text-sm text-gray-500 mt-0.5">Identity and professional references.</p>
        </div>
        <div className="px-6 py-5 space-y-4">
          {/* ID status */}
          <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div className={`w-10 h-10 rounded-full grid place-items-center flex-shrink-0 ${advisor.idVerificationStatus === "verified" ? "bg-green-100" : "bg-amber-100"}`}>
              {advisor.idVerificationStatus === "verified"
                ? <Check className="w-5 h-5 text-green-600" />
                : <ShieldCheck className="w-5 h-5 text-amber-500" />}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Identity {advisor.idVerificationStatus === "verified" ? "Verified" : "Pending"}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {advisor.idVerificationStatus === "verified" ? "Your identity has been confirmed." : "Our team will reach out with next steps."}
              </p>
            </div>
          </div>

          {/* References */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">References ({refs.length}/3)</p>
              {refs.length < 3 && (
                <button className="text-xs font-semibold text-blue-600 hover:underline">+ Add reference</button>
              )}
            </div>
            {refs.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No references added yet.</p>
            ) : (
              <div className="space-y-3">
                {refs.map((r, i) => <ReferenceCard key={i} ref_={r} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReferenceCard({ ref_ }: { ref_: Reference }) {
  const initial = ref_.name?.[0]?.toUpperCase() || "?";
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200">
      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 grid place-items-center font-bold text-sm flex-shrink-0">
        {initial}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900">{ref_.name}</p>
        <p className="text-xs text-gray-500">{ref_.email}</p>
        {ref_.relationship && <p className="text-xs text-gray-400">{ref_.relationship}</p>}
      </div>
    </div>
  );
}
