"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * /dashboard/settings — Notifications, legal links, account actions.
 *
 * Mirrors the iframe's Settings page 1:1. Notifications toggles persist
 * directly to the client doc on each toggle. Account section handles
 * sign-out, password reset, data export, delete account (with DELETE
 * confirmation + dual-persona scoping).
 */

import { useEffect, useState } from "react";
import { useClient } from "@/lib/client-context";
import { updateClient } from "@/lib/firestore-client-dashboard";
import { trackEvent } from "@/lib/analytics";

export default function ClientSettingsPage() {
  const { uid, client, refresh } = useClient();
  const [hasAdvisor, setHasAdvisor]       = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput]     = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError]     = useState("");
  const [resetMsg, setResetMsg]           = useState("");

  // Detect dual-persona to scope deletion correctly
  useEffect(() => {
    const fb = (typeof window !== "undefined" ? (window as any).firebase : undefined);
    if (!fb || !uid) return;
    fb.firestore().collection("advisors").doc(uid).get()
      .then((snap: any) => setHasAdvisor(!!snap?.exists))
      .catch(() => {});
  }, [uid]);

  async function setPref(key: keyof NonNullable<typeof client>, val: boolean) {
    if (!uid) return;
    await updateClient(uid, { [key]: val } as any);
    await refresh();
    // Capture which preference was changed + the new value so we can
    // see what users actually opt in/out of in GA4.
    trackEvent("client_settings_pref_changed", { pref: String(key), value: val });
  }

  async function handleSignOut() {
    trackEvent("client_signed_out", {});
    const fb = (window as any).firebase;
    try { await fb?.auth?.()?.signOut(); } catch { /* ignore */ }
    try { localStorage.removeItem("cxo_active_persona"); } catch { /* ignore */ }
    window.location.href = "/";
  }

  async function handleResetPassword() {
    const fb = (window as any).firebase;
    if (!fb || !client?.email) return;
    setResetMsg("");
    try {
      await fb.auth().sendPasswordResetEmail(client.email);
      trackEvent("client_password_reset_requested", {});
      setResetMsg(`Reset email sent to ${client.email}`);
      setTimeout(() => setResetMsg(""), 6000);
    } catch (e: any) {
      setResetMsg(`Could not send reset email: ${e?.message || e?.code || "unknown"}`);
    }
  }

  function handleExport() {
    window.open(
      "mailto:info@cxowork.com?subject=Data%20Export%20Request&body=Please%20send%20me%20a%20copy%20of%20all%20data%20you%20hold%20about%20my%20account.",
      "_blank",
    );
  }

  async function handleDelete() {
    if (deleteInput !== "DELETE") { setDeleteError("Type DELETE to confirm."); return; }
    const fb = (window as any).firebase;
    if (!fb)         { setDeleteError("Firebase not available."); return; }
    const user = fb.auth().currentUser;
    if (!user)       { setDeleteError("Not signed in."); return; }

    setDeleteLoading(true); setDeleteError("");

    // Dual persona — wipe only the client doc and bounce them to the
    // advisor dashboard with the active persona flipped.
    if (hasAdvisor) {
      try {
        await fb.firestore().collection("clients").doc(user.uid).delete();
        trackEvent("client_account_deleted", { scope: "client_only" });
        try { localStorage.setItem("cxo_active_persona", "advisor"); } catch { /* ignore */ }
        window.location.href = "/advisor-dashboard";
      } catch (e: any) {
        setDeleteError(`Could not delete client profile: ${e?.message || e?.code}`);
        setDeleteLoading(false);
      }
      return;
    }

    // Single persona — full wipe (client doc + Firebase Auth user).
    try { await fb.firestore().collection("clients").doc(user.uid).delete(); } catch { /* ignore */ }
    try {
      await user.delete();
      trackEvent("client_account_deleted", { scope: "full" });
      try { localStorage.removeItem("cxo_active_persona"); } catch { /* ignore */ }
      window.location.href = "/";
    } catch (e: any) {
      setDeleteError(
        e?.code === "auth/requires-recent-login"
          ? "For security, please sign out and sign back in before deleting your account."
          : `Could not delete account: ${e?.message || e?.code}`,
      );
      setDeleteLoading(false);
    }
  }

  if (!client) {
    return (
      <div className="grid place-items-center py-20">
        <div className="w-9 h-9 rounded-full border-[3px] border-gray-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-[24px] font-semibold tracking-tight mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-5">Manage your notifications, privacy, and account.</p>

      {/* Notifications */}
      <SectionLabel>Notifications</SectionLabel>
      <Card>
        <Pref label="New messages"          desc="Email me when an advisor replies"               value={client.notifyMessages       !== false} onChange={(v) => setPref("notifyMessages", v)} />
        <Pref label="New advisor matches"   desc="When we surface advisors that fit your needs"   value={client.notifyMatches        !== false} onChange={(v) => setPref("notifyMatches", v)} />
        <Pref label="Product updates"       desc="Important platform changes and tips"            value={client.notifyProductUpdates !== false} onChange={(v) => setPref("notifyProductUpdates", v)} />
        <Pref label="Marketing emails"      desc="Occasional newsletters — opt-in"                value={!!client.notifyMarketing}              onChange={(v) => setPref("notifyMarketing", v)} last />
      </Card>

      {/* Legal */}
      <SectionLabel>Legal & Privacy</SectionLabel>
      <Card>
        <LinkRow icon="⚖"  label="Terms & Conditions" sub="Read our platform terms and conditions" href="/terms" />
        <LinkRow icon="🛡" label="Privacy Policy"     sub="See how we collect and use your data"   href="/privacy" />
        <LinkRow icon="🍪" label="Cookie Policy"      sub="Manage your cookie preferences"         href="/privacy#cookies" last />
      </Card>

      {/* Account */}
      <SectionLabel>Account</SectionLabel>
      <Card>
        <Row>
          <RowText label="Sign out" desc="Sign out of CXOwork on this device" />
          <ActionBtn onClick={handleSignOut} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>}>Sign out</ActionBtn>
        </Row>
        <Row>
          <RowText label="Change password" desc={`A reset link will be sent to ${client.email || "your email"}`} extra={resetMsg ? <div className="text-[12px] text-blue-600 mt-1">{resetMsg}</div> : null} />
          <ActionBtn onClick={handleResetPassword} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}>Reset</ActionBtn>
        </Row>
        <Row>
          <RowText label="Export my data" desc="Request a copy of all data CXOwork holds about you (GDPR / CCPA)" />
          <ActionBtn onClick={handleExport} icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>}>Request</ActionBtn>
        </Row>

        {/* Delete account (last row, no border) */}
        <div className="mt-1">
          {!deleteConfirm ? (
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: "#fff8f8", border: "1.5px solid #fecaca" }}>
              <div>
                <div className="text-[14px] font-semibold" style={{ color: "#b91c1c" }}>
                  {hasAdvisor ? "Delete client profile" : "Delete account"}
                </div>
                <div className="text-[12px] mt-0.5" style={{ color: "#ef4444" }}>
                  {hasAdvisor
                    ? "Removes only your client profile. Your advisor account stays intact."
                    : "Permanently remove your profile, data, and access. This cannot be undone."}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeleteConfirm(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[13px] font-semibold"
                style={{ border: "1.5px solid #fca5a5", color: "#b91c1c" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                Delete
              </button>
            </div>
          ) : (
            <div className="p-5 rounded-lg" style={{ background: "#fff8f8", border: "2px solid #fca5a5" }}>
              <div className="text-[14px] font-bold mb-2" style={{ color: "#b91c1c" }}>
                {hasAdvisor ? "⚠ Confirm client profile deletion" : "⚠ Confirm account deletion"}
              </div>
              <div className="text-[13px] mb-3.5 leading-[1.6]" style={{ color: "#374151" }}>
                {hasAdvisor ? (
                  <>This will permanently delete your <strong>client profile</strong> only. Your advisor account stays intact, and you&apos;ll be taken to your advisor dashboard. <strong>Your client data cannot be recovered.</strong></>
                ) : (
                  <>This will permanently delete your profile, all your data, and revoke your access to CXOwork. <strong>This action cannot be undone.</strong></>
                )}
              </div>
              <div className="text-[13px] font-semibold text-gray-900 mb-2">Type <strong>DELETE</strong> to confirm:</div>
              <input
                value={deleteInput}
                onChange={(e) => { setDeleteInput(e.target.value); setDeleteError(""); }}
                placeholder="DELETE"
                style={{
                  background: "#fff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827",
                  width: "100%", padding: "9px 12px",
                  border: `1.5px solid ${deleteError ? "#fca5a5" : "#e5e7eb"}`,
                  borderRadius: 8, fontSize: 14, marginBottom: 10,
                  fontFamily: "monospace", letterSpacing: "0.05em", outline: "none",
                }}
              />
              {deleteError && <div className="text-[13px] mb-2.5" style={{ color: "#b91c1c" }}>{deleteError}</div>}
              <div className="flex gap-2.5">
                <button type="button" onClick={() => { setDeleteConfirm(false); setDeleteInput(""); setDeleteError(""); }} className="flex-1 py-2.5 rounded-lg border border-gray-300 bg-white text-[13px] font-semibold text-gray-900">Cancel</button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteLoading || deleteInput !== "DELETE"}
                  className="flex-1 py-2.5 rounded-lg text-[13px] font-bold text-white"
                  style={{ background: deleteInput === "DELETE" ? "#b91c1c" : "#fca5a5", cursor: deleteInput === "DELETE" ? "pointer" : "default", border: "none" }}
                >
                  {deleteLoading ? "Deleting…" : (hasAdvisor ? "Delete client profile" : "Delete my account")}
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
function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between py-3.5 border-b border-gray-200 last:border-b-0">{children}</div>;
}
function RowText({ label, desc, extra }: { label: string; desc: string; extra?: React.ReactNode }) {
  return (
    <div>
      <div className="text-[14px] font-semibold text-gray-900">{label}</div>
      <div className="text-[12px] text-gray-500 mt-0.5">{desc}</div>
      {extra}
    </div>
  );
}
function ActionBtn({ children, onClick, icon }: { children: React.ReactNode; onClick: () => void; icon: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 bg-white text-[13px] font-semibold text-gray-900 hover:bg-gray-50">
      {icon}{children}
    </button>
  );
}
function Pref({ label, desc, value, onChange, last }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void; last?: boolean }) {
  return (
    <div className={`flex items-start justify-between py-3.5 ${last ? "" : "border-b border-gray-200"}`}>
      <div>
        <div className="text-[14px] font-semibold text-gray-900">{label}</div>
        <div className="text-[12px] text-gray-500 mt-0.5">{desc}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={["w-11 h-6 rounded-full relative transition-colors shrink-0", value ? "bg-emerald-600" : "bg-gray-300"].join(" ")}
      >
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
        <div>
          <div className="text-[14px] font-semibold text-gray-900">{label}</div>
          <div className="text-[12px] text-gray-500 mt-0.5">{sub}</div>
        </div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
    </a>
  );
}
