"use client";

/**
 * /advisor-dashboard/leads — CRM-style list of leads sourced by the advisor.
 *
 * Supports search, status + source filtering, add/edit/delete via modals,
 * and (TODO) LinkedIn CSV bulk import. Read/write through
 * `lib/firestore-advisor.ts` against /advisors/{uid}/leads.
 */

import { useEffect, useMemo, useState } from "react";
import { useAdvisor } from "@/lib/advisor-context";
import { addLead, deleteLead, subscribeLeads, updateLead } from "@/lib/firestore-advisor";
import type { Lead, LeadSource, LeadStatus } from "@/types/advisor";
import { Modal } from "@/components/advisor-dashboard/profile/Modal";
import { FieldLabel, TextInput, TextArea } from "@/components/advisor-dashboard/profile/Atoms";

const STATUS_OPTIONS: { id: LeadStatus | "all"; label: string }[] = [
  { id: "all",              label: "All statuses" },
  { id: "new",              label: "New" },
  { id: "in-conversation",  label: "In conversation" },
  { id: "active-project",   label: "Active project" },
  { id: "awaiting-review",  label: "Awaiting review" },
  { id: "inactive",         label: "Inactive" },
];

const SOURCE_OPTIONS: { id: LeadSource | "all"; label: string }[] = [
  { id: "all",      label: "All sources" },
  { id: "self",     label: "Self-sourced" },
  { id: "cxowork",  label: "CXOwork" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "apollo",   label: "Apollo" },
];

export default function LeadsPage() {
  const { uid } = useAdvisor();
  const [leads, setLeads]       = useState<Lead[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [status, setStatus]     = useState<LeadStatus | "all">("all");
  const [source, setSource]     = useState<LeadSource | "all">("all");
  const [editing, setEditing]   = useState<Lead | "new" | null>(null);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    const unsub = subscribeLeads(
      uid,
      (next) => { setLeads(next); setLoading(false); },
      (e)   => { console.warn("[leads] subscribe error", e); setLoading(false); },
    );
    return unsub;
  }, [uid]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      if (status !== "all" && l.status !== status) return false;
      if (source !== "all" && l.source !== source) return false;
      if (!q) return true;
      const hay = [l.name, l.email, l.company, l.title, l.location].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [leads, search, status, source]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-gray-500 mt-1">Track opportunities you&apos;ve sourced or that we&apos;ve sent your way.</p>
        </div>
        <button
          type="button"
          onClick={() => setEditing("new")}
          className="text-[13px] font-semibold px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
        >
          + Add lead
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center" style={{ colorScheme: "light" }}>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, company, title…"
          style={{ background: "#ffffff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827" }}
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-[13.5px] focus:outline-none focus:border-blue-500"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value as LeadStatus | "all")} style={{ background: "#ffffff", color: "#111827", colorScheme: "light" }} className="px-3 py-2 border border-gray-300 rounded-lg text-[13.5px] focus:outline-none focus:border-blue-500">
          {STATUS_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
        <select value={source} onChange={(e) => setSource(e.target.value as LeadSource | "all")} style={{ background: "#ffffff", color: "#111827", colorScheme: "light" }} className="px-3 py-2 border border-gray-300 rounded-lg text-[13.5px] focus:outline-none focus:border-blue-500">
          {SOURCE_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
      </div>

      {/* Lead table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="py-16 grid place-items-center">
            <div className="w-6 h-6 rounded-full border-[3px] border-gray-200 border-t-gray-900 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500 text-[14px]">No leads match these filters.</p>
            {leads.length === 0 && (
              <button type="button" onClick={() => setEditing("new")} className="mt-3 text-[13px] font-semibold text-blue-600 hover:underline">+ Add your first lead</button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="text-left text-[12px] text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 font-medium">Lead</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Source</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="font-semibold text-gray-900">{l.name}</div>
                      {l.email && <div className="text-[12px] text-gray-500">{l.email}</div>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-gray-900">{l.company || "—"}</div>
                      {l.title && <div className="text-[12px] text-gray-500">{l.title}</div>}
                    </td>
                    <td className="px-5 py-3 capitalize text-gray-700">{l.source || "—"}</td>
                    <td className="px-5 py-3"><StatusPill status={l.status} /></td>
                    <td className="px-5 py-3 text-right">
                      <button type="button" onClick={() => setEditing(l)} className="text-[12.5px] font-semibold text-blue-600 hover:underline mr-3">Edit</button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete lead "${l.name}"?`)) deleteLead(uid!, l.id);
                        }}
                        className="text-[12.5px] font-semibold text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <LeadEditDialog
          uid={uid!}
          lead={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function StatusPill({ status }: { status?: LeadStatus }) {
  const map: Record<string, string> = {
    "new":             "bg-blue-100 text-blue-800 border-blue-200",
    "in-conversation": "bg-amber-100 text-amber-800 border-amber-200",
    "active-project":  "bg-emerald-100 text-emerald-800 border-emerald-200",
    "awaiting-review": "bg-purple-100 text-purple-800 border-purple-200",
    "inactive":        "bg-gray-100 text-gray-700 border-gray-200",
  };
  const label: Record<string, string> = {
    "new": "New",
    "in-conversation": "In conversation",
    "active-project":  "Active project",
    "awaiting-review": "Awaiting review",
    "inactive":        "Inactive",
  };
  if (!status) return <span className="text-gray-400">—</span>;
  return <span className={`inline-block text-[11px] font-semibold px-2 py-[2px] rounded-full border ${map[status] || ""}`}>{label[status] || status}</span>;
}

function LeadEditDialog({ uid, lead, onClose }: { uid: string; lead: Lead | null; onClose: () => void }) {
  const [draft, setDraft] = useState({
    name        : lead?.name        || "",
    email       : lead?.email       || "",
    phone       : lead?.phone       || "",
    title       : lead?.title       || "",
    company     : lead?.company     || "",
    location    : lead?.location    || "",
    linkedinUrl : lead?.linkedinUrl || "",
    source      : (lead?.source     as LeadSource) || "self",
    status      : (lead?.status     as LeadStatus) || "new",
    notes       : lead?.notes       || "",
  });
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof draft>(k: K, v: typeof draft[K]) { setDraft((d) => ({ ...d, [k]: v })); }

  async function save() {
    if (!draft.name.trim()) return;
    setSaving(true);
    try {
      const payload = {
        name        : draft.name.trim(),
        email       : draft.email.trim(),
        phone       : draft.phone.trim(),
        title       : draft.title.trim(),
        company     : draft.company.trim(),
        location    : draft.location.trim(),
        linkedinUrl : draft.linkedinUrl.trim(),
        source      : draft.source,
        status      : draft.status,
        notes       : draft.notes,
      };
      if (lead) await updateLead(uid, lead.id, payload);
      else      await addLead(uid, payload);
      onClose();
    } finally { setSaving(false); }
  }

  return (
    <Modal title={lead ? "Edit lead" : "Add a lead"} saving={saving} onClose={onClose} onSave={save}>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <FieldLabel>Name *</FieldLabel>
          <TextInput value={draft.name}  onChange={(v) => set("name", v)}  placeholder="Founder name" />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <TextInput value={draft.email} onChange={(v) => set("email", v)} placeholder="founder@startup.com" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <FieldLabel>Title</FieldLabel>
          <TextInput value={draft.title}   onChange={(v) => set("title", v)}   placeholder="CEO" />
        </div>
        <div>
          <FieldLabel>Company</FieldLabel>
          <TextInput value={draft.company} onChange={(v) => set("company", v)} placeholder="Startup, Inc." />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <FieldLabel>Phone</FieldLabel>
          <TextInput value={draft.phone}    onChange={(v) => set("phone", v)} />
        </div>
        <div>
          <FieldLabel>Location</FieldLabel>
          <TextInput value={draft.location} onChange={(v) => set("location", v)} />
        </div>
      </div>
      <div className="mb-3">
        <FieldLabel>LinkedIn URL</FieldLabel>
        <TextInput value={draft.linkedinUrl} onChange={(v) => set("linkedinUrl", v)} placeholder="linkedin.com/in/…" />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <FieldLabel>Source</FieldLabel>
          <select value={draft.source} onChange={(e) => set("source", e.target.value as LeadSource)} style={{ background: "#ffffff", color: "#111827", colorScheme: "light" }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px]">
            {SOURCE_OPTIONS.filter((o) => o.id !== "all").map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <FieldLabel>Status</FieldLabel>
          <select value={draft.status} onChange={(e) => set("status", e.target.value as LeadStatus)} style={{ background: "#ffffff", color: "#111827", colorScheme: "light" }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px]">
            {STATUS_OPTIONS.filter((o) => o.id !== "all").map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
        </div>
      </div>
      <div>
        <FieldLabel>Notes</FieldLabel>
        <TextArea value={draft.notes} onChange={(v) => set("notes", v)} placeholder="Anything we should remember?" rows={3} />
      </div>
    </Modal>
  );
}
