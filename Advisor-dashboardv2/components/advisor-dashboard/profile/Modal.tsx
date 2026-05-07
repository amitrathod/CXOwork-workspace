"use client";

import { useEffect } from "react";

export function Modal({
  title,
  saving,
  onClose,
  onSave,
  children,
}: {
  title   : string;
  saving  : boolean;
  onClose : () => void;
  onSave  : () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(15,23,42,0.40)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "5vh 16px", overflowY: "auto" }}
    >
      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", width: "100%", maxWidth: 640, colorScheme: "light" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-[16px] font-bold m-0">{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
        <div className="flex justify-end gap-2.5 px-5 py-3.5 border-t border-gray-200">
          <button type="button" onClick={onClose} disabled={saving} className="px-4 py-2 rounded-lg text-[13.5px] font-semibold border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50">Cancel</button>
          <button type="button" onClick={onSave} disabled={saving} className="px-5 py-2 rounded-lg text-[13.5px] font-semibold text-white bg-gray-900 hover:bg-black disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
