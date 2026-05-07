"use client";

import { useState } from "react";
import type { AdvisorProfile } from "@/types/advisor";
import { FieldLabel, TextInput } from "./Atoms";

/* ── Verification Tab ────────────────────────────────────────────────── */

export function VerificationTab({
  advisor,
  uid,
  onSaved,
}: {
  advisor: AdvisorProfile;
  uid    : string;
  onSaved: () => void;
}) {
  const refs = (advisor.references || []).filter((r) => r.name && r.email);
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-4">
      {/* ID Verification */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-[14px] font-semibold text-gray-900 mb-3">Identity Verification</h3>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full grid place-items-center ${advisor.idVerificationStatus === "verified" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
            {advisor.idVerificationStatus === "verified" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            )}
          </div>
          <div>
            <div className="text-[13.5px] font-semibold text-gray-900">
              {advisor.idVerificationStatus === "verified" ? "Identity Verified" : "Verification Pending"}
            </div>
            <div className="text-[12px] text-gray-500">
              {advisor.idVerificationStatus === "verified" ? "Your identity has been confirmed." : "Our team will reach out with next steps."}
            </div>
          </div>
        </div>
      </div>

      {/* References */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[14px] font-semibold text-gray-900">References ({refs.length}/3)</h3>
        </div>
        {refs.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-[13.5px] text-gray-500 mb-3">No references added yet. Add up to 3 professional references.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {refs.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 grid place-items-center font-bold text-sm shrink-0">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold text-gray-900">{r.name}</div>
                  <div className="text-[12.5px] text-gray-500">{r.email}</div>
                  {r.relationship && <div className="text-[12px] text-gray-400">{r.relationship}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
        {refs.length < 3 && (
          <button
            type="button"
            onClick={() => { setSaved(true); onSaved(); setTimeout(() => setSaved(false), 2000); }}
            className="mt-3 text-[13px] font-semibold text-blue-600 hover:underline"
          >
            + Add reference
          </button>
        )}
        {saved && <p className="text-[12px] text-emerald-600 mt-2">✓ Saved</p>}
      </div>
    </div>
  );
}

/* ── Privacy Tab ─────────────────────────────────────────────────────── */

export function PrivacyTab({
  advisor,
  uid,
  onSaved,
}: {
  advisor: AdvisorProfile;
  uid    : string;
  onSaved: () => void;
}) {
  const [visibility, setVisibility] = useState(advisor.profileVisibility || "public");
  const [anon, setAnon]             = useState(advisor.anonymousMode || false);
  const [saved, setSaved]           = useState(false);

  function save() {
    setSaved(true);
    onSaved();
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Profile Visibility</h3>
        <div className="space-y-2.5">
          {[
            { id: "public",   label: "Public",         sub: "Anyone can view your profile" },
            { id: "invite",   label: "Invite-only",    sub: "Only clients you invite can view your profile" },
            { id: "verified", label: "Verified users", sub: "Only verified CXOwork members can view your profile" },
          ].map((opt) => (
            <label key={opt.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="visibility"
                value={opt.id}
                checked={visibility === opt.id}
                onChange={() => setVisibility(opt.id as typeof visibility)}
                className="accent-gray-900"
              />
              <div>
                <div className="text-[13.5px] font-semibold text-gray-900">{opt.label}</div>
                <div className="text-[12px] text-gray-500">{opt.sub}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-[14px] font-semibold text-gray-900 mb-3">Anonymous Mode</h3>
        <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
          <div>
            <div className="text-[13.5px] font-semibold text-gray-900">Hide your name</div>
            <div className="text-[12px] text-gray-500">Show your initials only until you approve a client match</div>
          </div>
          <div
            onClick={() => setAnon(!anon)}
            className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${anon ? "bg-gray-900" : "bg-gray-200"}`}
            style={{ position: "relative" }}
          >
            <div
              className="w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform"
              style={{ transform: anon ? "translateX(22px)" : "translateX(2px)" }}
            />
          </div>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={save} className="px-5 py-2.5 rounded-lg text-[13.5px] font-semibold text-white bg-gray-900 hover:bg-black">
          Save Changes
        </button>
        {saved && <span className="text-[13px] text-emerald-600 font-medium">✓ Saved</span>}
      </div>
    </div>
  );
}

/* ── Settings Tab ────────────────────────────────────────────────────── */

export function SettingsTab({
  advisor,
  uid,
  onSaved,
}: {
  advisor: AdvisorProfile;
  uid    : string;
  onSaved: () => void;
}) {
  const [emailNotifs, setEmailNotifs] = useState(advisor.notifyEmail ?? true);
  const [smsNotifs,   setSmsNotifs]   = useState(advisor.notifySms   ?? false);
  const [saved, setSaved]             = useState(false);

  function save() {
    setSaved(true);
    onSaved();
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-3">
          <Toggle label="Email notifications" sub="Receive updates and match alerts by email" checked={emailNotifs} onChange={setEmailNotifs} />
          <Toggle label="SMS notifications"   sub="Receive text messages for new matches"     checked={smsNotifs}   onChange={setSmsNotifs}   />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-[14px] font-semibold text-gray-900 mb-3">Account</h3>
        <div className="space-y-2">
          <div className="text-[13.5px] text-gray-700">
            <span className="font-medium">Email:</span> {advisor.email}
          </div>
          <div className="text-[13.5px] text-gray-700">
            <span className="font-medium">Account ID:</span> {advisor.uid.slice(0, 12)}…
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <button type="button" className="px-4 py-2 rounded-lg text-[13px] font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50">
            Change Password
          </button>
          <button type="button" className="px-4 py-2 rounded-lg text-[13px] font-semibold border border-red-200 text-red-600 hover:bg-red-50">
            Delete Account
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="button" onClick={save} className="px-5 py-2.5 rounded-lg text-[13.5px] font-semibold text-white bg-gray-900 hover:bg-black">
          Save Changes
        </button>
        {saved && <span className="text-[13px] text-emerald-600 font-medium">✓ Saved</span>}
      </div>
    </div>
  );
}

function Toggle({ label, sub, checked, onChange }: { label: string; sub: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
      <div>
        <div className="text-[13.5px] font-semibold text-gray-900">{label}</div>
        <div className="text-[12px] text-gray-500">{sub}</div>
      </div>
      <div
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${checked ? "bg-gray-900" : "bg-gray-200"}`}
        style={{ position: "relative" }}
      >
        <div
          className="w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform"
          style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
        />
      </div>
    </label>
  );
}
