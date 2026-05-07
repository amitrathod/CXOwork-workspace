"use client";

import { useState } from "react";
import type { AdvisorProfile } from "@/types/advisor";
import { FieldLabel, TextInput, TextArea } from "./Atoms";

export function OverviewTab({
  advisor,
  uid,
  onSaved,
}: {
  advisor: AdvisorProfile;
  uid    : string;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState({
    firstName  : advisor.firstName || "",
    lastName   : advisor.lastName  || "",
    headline   : advisor.headline  || "",
    location   : advisor.location  || "",
    bio        : advisor.bio       || advisor.about || "",
    hourlyRate : String(advisor.hourlyRate || ""),
    linkedinUrl: advisor.linkedinUrl || "",
    skills     : (advisor.skills || advisor.coreSkills || []).join(", "),
    industries : (advisor.selectedIndustries || []).join(", "),
  });
  const [saved, setSaved] = useState(false);

  function set<K extends keyof typeof draft>(k: K, v: string) {
    setDraft((d) => ({ ...d, [k]: v }));
    setSaved(false);
  }

  function save() {
    setSaved(true);
    onSaved();
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-5">
      <Section title="Basic Information">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <FieldLabel>First Name</FieldLabel>
            <TextInput value={draft.firstName} onChange={(v) => set("firstName", v)} placeholder="First name" />
          </div>
          <div>
            <FieldLabel>Last Name</FieldLabel>
            <TextInput value={draft.lastName} onChange={(v) => set("lastName", v)} placeholder="Last name" />
          </div>
        </div>
        <div className="mb-3">
          <FieldLabel>Professional Headline</FieldLabel>
          <TextInput value={draft.headline} onChange={(v) => set("headline", v)} placeholder="e.g. Former CFO | Series B/C Fundraising Expert" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <FieldLabel>Location</FieldLabel>
            <TextInput value={draft.location} onChange={(v) => set("location", v)} placeholder="City, State" />
          </div>
          <div>
            <FieldLabel>Hourly Rate ($)</FieldLabel>
            <TextInput value={draft.hourlyRate} onChange={(v) => set("hourlyRate", v)} placeholder="e.g. 350" type="number" />
          </div>
        </div>
        <div>
          <FieldLabel>LinkedIn URL</FieldLabel>
          <TextInput value={draft.linkedinUrl} onChange={(v) => set("linkedinUrl", v)} placeholder="linkedin.com/in/yourprofile" />
        </div>
      </Section>

      <Section title="Bio">
        <TextArea value={draft.bio} onChange={(v) => set("bio", v)} placeholder="Tell clients about your background and what you can help with…" rows={5} />
      </Section>

      <Section title="Skills">
        <TextArea value={draft.skills} onChange={(v) => set("skills", v)} placeholder="e.g. Financial Strategy, M&A, Fundraising" rows={2} />
        <p className="text-[11.5px] text-gray-400 mt-1">Comma-separated list of skills</p>
      </Section>

      <Section title="Industries">
        <TextInput value={draft.industries} onChange={(v) => set("industries", v)} placeholder="e.g. Fintech, SaaS, Enterprise Software" />
        <p className="text-[11.5px] text-gray-400 mt-1">Comma-separated list of industries</p>
      </Section>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={save}
          className="px-5 py-2.5 rounded-lg text-[13.5px] font-semibold text-white bg-gray-900 hover:bg-black"
        >
          Save Changes
        </button>
        {saved && <span className="text-[13px] text-emerald-600 font-medium">✓ Saved</span>}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-[14px] font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}
