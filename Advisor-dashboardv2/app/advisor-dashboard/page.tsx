"use client";

export default function FindWorkPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[24px] font-semibold tracking-tight">Find work</h1>
        <p className="text-sm text-gray-500 mt-1">Browse opportunities that match your expertise.</p>
      </div>

      {/* Empty state */}
      <div className="bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center min-h-[420px] text-center px-8 py-16">
        <div className="w-14 h-14 rounded-full bg-gray-100 grid place-items-center mb-4">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        <p className="text-[15px] font-semibold text-gray-700 mb-1.5">Job listings coming soon</p>
        <p className="text-[13.5px] text-gray-400 max-w-sm">
          We&apos;re building out the job board. Check back soon — matched opportunities will appear here.
        </p>
      </div>
    </div>
  );
}
