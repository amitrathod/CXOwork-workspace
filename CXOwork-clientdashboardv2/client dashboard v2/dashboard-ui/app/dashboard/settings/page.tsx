"use client";
import { useState } from "react";
import { useClient } from "@/lib/mock-context";

export default function ClientSettingsPage() {
  const { client, updateClientData } = useClient();
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  function setPref(key: "notifyMessages" | "notifyMatches" | "notifyProductUpdates" | "notifyMarketing", val: boolean) {
    updateClientData({ [key]: val } as any);
  }

  function handleSignOut() { alert("Sign out — not wired in UI-only mode."); }
  function handleResetPassword() { setResetMsg(`Reset email sent to ${client.email}`); setTimeout(() => setResetMsg(""), 5000); }
  function handleExport() { alert("Data export request — not wired in UI-only mode."); }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-5">Manage your notifications, privacy, and account.</p>

      <SectionLabel>Notifications</SectionLabel>
      <Card>
        <Pref label="New messages" desc="Email me when an advisor replies" value={client.notifyMessages !== false} onChange={v => setPref("notifyMessages", v)} />
        <Pref label="New advisor matches" desc="When we surface advisors that fit your needs" value={client.notifyMatches !== false} onChange={v => setPref("notifyMatches", v)} />
        <Pref label="Product updates" desc="Important platform changes and tips" value={client.notifyProductUpdates !== false} onChange={v => setPref("notifyProductUpdates", v)} />
        <Pref label="Marketing emails" desc="Occasional newsletters — opt-in" value={!!client.notifyMarketing} onChange={v => setPref("notifyMarketing", v)} last />
      </Card>

      <SectionLabel>Legal &amp; Privacy</SectionLabel>
      <Card>
        <LinkRow icon="⚖" label="Terms &amp; Conditions" sub="Read our platform terms and conditions" href="/terms" />
        <LinkRow icon="🛡" label="Privacy Policy" sub="See how we collect and use your data" href="/privacy" />
        <LinkRow icon="🍪" label="Cookie Policy" sub="Manage your cookie preferences" href="/privacy#cookies" last />
      </Card>

      <SectionLabel>Account</SectionLabel>
      <Card>
        <SettingsRow>
          <RowText label="Sign out" desc="Sign out of CXOwork on this device" />
          <ActionBtn onClick={handleSignOut} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>}>Sign out</ActionBtn>
        </SettingsRow>
        <SettingsRow>
          <RowText label="Change password" desc={`A reset link will be sent to ${client.email}`} extra={resetMsg ? <div className="text-[12px] text-blue-600 mt-1">{resetMsg}</div> : null} />
          <ActionBtn onClick={handleResetPassword} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}>Reset</ActionBtn>
        </SettingsRow>
        <SettingsRow>
          <RowText label="Export my data" desc="Request a copy of all data CXOwork holds about you (GDPR / CCPA)" />
          <ActionBtn onClick={handleExport} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>}>Request</ActionBtn>
        </SettingsRow>
        <div className="mt-1">
          {!deleteConfirm ? (
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "#fff8f8", border: "1.5px solid #fecaca" }}>
              <div>
                <div className="text-[14px] font-semibold" style={{ color: "#b91c1c" }}>Delete account</div>
                <div className="text-[12px] mt-0.5" style={{ color: "#ef4444" }}>Permanently remove your profile, data, and access.</div>
              </div>
              <button type="button" onClick={() => setDeleteConfirm(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[13px] font-semibold" style={{ border: "1.5px solid #fca5a5", color: "#b91c1c" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                Delete
              </button>
            </div>
          ) : (
            <div className="p-5 rounded-lg" style={{ background: "#fff8f8", border: "2px solid #fca5a5" }}>
              <div className="text-[14px] font-bold mb-2" style={{ color: "#b91c1c" }}>⚠ Confirm account deletion</div>
              <div className="text-[13px] mb-3.5 leading-[1.6]" style={{ color: "#374151" }}>This will permanently delete your profile. <strong>This action cannot be undone.</strong></div>
              <div className="text-[13px] font-semibold text-gray-900 mb-2">Type <strong>DELETE</strong> to confirm:</div>
              <input value={deleteInput} onChange={e => setDeleteInput(e.target.value)} placeholder="DELETE"
                style={{ background: "#fff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827", width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, marginBottom: 10, fontFamily: "monospace", outline: "none" }} />
              <div className="flex gap-2.5">
                <button type="button" onClick={() => { setDeleteConfirm(false); setDeleteInput(""); }} className="flex-1 py-2.5 rounded-lg border border-gray-300 bg-white text-[13px] font-semibold text-gray-900">Cancel</button>
                <button type="button" disabled={deleteInput !== "DELETE"} onClick={() => alert("Delete — not wired in UI-only mode.")}
                  className="flex-1 py-2.5 rounded-lg text-[13px] font-bold text-white" style={{ background: deleteInput === "DELETE" ? "#b91c1c" : "#fca5a5", border: "none" }}>
                  Delete my account
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-bold uppercase tracking-[0.07em] text-gray-500 mb-2.5 mt-6 first:mt-0">{children}</div>;
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white border border-gray-200 rounded-xl px-5 pt-1 pb-5">{children}</div>;
}
function SettingsRow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between py-3.5 border-b border-gray-200 last:border-b-0">{children}</div>;
}
function RowText({ label, desc, extra }: { label: string; desc: string; extra?: React.ReactNode }) {
  return <div><div className="text-[14px] font-semibold text-gray-900">{label}</div><div className="text-[12px] text-gray-500 mt-0.5">{desc}</div>{extra}</div>;
}
function ActionBtn({ children, onClick, icon }: { children: React.ReactNode; onClick: () => void; icon: React.ReactNode }) {
  return <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 bg-white text-[13px] font-semibold text-gray-900 hover:bg-gray-50">{icon}{children}</button>;
}
function Pref({ label, desc, value, onChange, last }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void; last?: boolean }) {
  return (
    <div className={`flex items-start justify-between py-3.5 ${last ? "" : "border-b border-gray-200"}`}>
      <div><div className="text-[14px] font-semibold text-gray-900">{label}</div><div className="text-[12px] text-gray-500 mt-0.5">{desc}</div></div>
      <button type="button" onClick={() => onChange(!value)} className={["w-11 h-6 rounded-full relative transition-colors shrink-0 ml-4", value ? "bg-emerald-600" : "bg-gray-300"].join(" ")}>
        <span className={["absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all", value ? "left-[22px]" : "left-0.5"].join(" ")} />
      </button>
    </div>
  );
}
function LinkRow({ icon, label, sub, href, last }: { icon: string; label: string; sub: string; href: string; last?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`flex items-center justify-between py-3.5 no-underline text-inherit hover:bg-gray-50 -mx-2 px-2 rounded-md ${last ? "" : "border-b border-gray-200"}`}>
      <div className="flex items-center gap-3.5">
        <span className="text-[20px]">{icon}</span>
        <div><div className="text-[14px] font-semibold text-gray-900">{label}</div><div className="text-[12px] text-gray-500 mt-0.5">{sub}</div></div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    </a>
  );
}
