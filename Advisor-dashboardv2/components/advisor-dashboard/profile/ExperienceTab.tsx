"use client";

import { useState } from "react";
import type { AdvisorProfile, WorkHistoryEntry } from "@/types/advisor";
import { FieldLabel, TextInput, TextArea } from "./Atoms";
import { Modal } from "./Modal";

export function ExperienceTab({
  advisor,
  uid,
  onSaved,
}: {
  advisor: AdvisorProfile;
  uid    : string;
  onSaved: () => void;
}) {
  const history = advisor.experienceHistory || advisor.workHistory || [];
  const [editing, setEditing] = useState<WorkHistoryEntry | "new" | null>(null);

  return (
    <div className="space-y-4">
      {/* Work History */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-semibold text-gray-900">Work History</h3>
          <button type="button" onClick={() => setEditing("new")} className="text-[12.5px] font-semibold text-blue-600 hover:underline">+ Add role</button>
        </div>

        {history.length === 0 ? (
          <p className="text-[13.5px] text-gray-500 py-4 text-center">No work history yet. Add your previous roles.</p>
        ) : (
          <div className="space-y-4">
            {history.map((entry, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg bg-gray-100 grid place-items-center shrink-0 text-gray-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-gray-900">{entry.title}</div>
                  <div className="text-[13px] text-gray-600">{entry.company}</div>
                  {(entry.startDate || entry.endDate) && (
                    <div className="text-[12px] text-gray-400 mt-0.5">
                      {entry.startDate || "?"} – {entry.endDate || "Present"}
                    </div>
                  )}
                  {entry.description && (
                    <p className="text-[12.5px] text-gray-600 mt-1">{entry.description}</p>
                  )}
                </div>
                <button type="button" onClick={() => setEditing(entry)} className="text-[12px] text-blue-600 hover:underline shrink-0">Edit</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills preview */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-[14px] font-semibold text-gray-900 mb-3">Skills</h3>
        {(advisor.skills || advisor.coreSkills || []).length === 0 ? (
          <p className="text-[13.5px] text-gray-500">No skills added. Update them in the Overview tab.</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {(advisor.skills || advisor.coreSkills || []).map((s) => (
              <span key={s} className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{s}</span>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <WorkHistoryModal
          entry={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSave={() => { setEditing(null); onSaved(); }}
        />
      )}
    </div>
  );
}

function WorkHistoryModal({
  entry,
  onClose,
  onSave,
}: {
  entry  : WorkHistoryEntry | null;
  onClose: () => void;
  onSave : () => void;
}) {
  const [draft, setDraft] = useState({
    title      : entry?.title       || "",
    company    : entry?.company     || "",
    startDate  : entry?.startDate   || "",
    endDate    : entry?.endDate     || "",
    description: entry?.description || "",
  });
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof draft>(k: K, v: string) { setDraft((d) => ({ ...d, [k]: v })); }

  async function save() {
    if (!draft.title.trim()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    setSaving(false);
    onSave();
  }

  return (
    <Modal title={entry ? "Edit role" : "Add role"} saving={saving} onClose={onClose} onSave={save}>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <FieldLabel>Title *</FieldLabel>
          <TextInput value={draft.title}   onChange={(v) => set("title", v)}   placeholder="e.g. CFO" />
        </div>
        <div>
          <FieldLabel>Company</FieldLabel>
          <TextInput value={draft.company} onChange={(v) => set("company", v)} placeholder="Company name" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <FieldLabel>Start Year</FieldLabel>
          <TextInput value={draft.startDate} onChange={(v) => set("startDate", v)} placeholder="e.g. 2019" />
        </div>
        <div>
          <FieldLabel>End Year</FieldLabel>
          <TextInput value={draft.endDate}   onChange={(v) => set("endDate", v)}   placeholder="e.g. 2023 or leave blank" />
        </div>
      </div>
      <div>
        <FieldLabel>Description</FieldLabel>
        <TextArea value={draft.description} onChange={(v) => set("description", v)} placeholder="Key achievements or responsibilities…" rows={3} />
      </div>
    </Modal>
  );
}
