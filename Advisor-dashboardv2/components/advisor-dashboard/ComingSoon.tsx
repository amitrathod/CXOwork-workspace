"use client";

export function ComingSoon({
  title,
  subtitle,
  body,
}: {
  title   : string;
  subtitle: string;
  body   ?: string;
}) {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-[24px] font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center min-h-[320px] text-center px-6 py-10">
        <div className="w-14 h-14 rounded-full bg-gray-100 grid place-items-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div className="text-[15px] font-semibold text-gray-700 mb-2">Coming Soon</div>
        <div className="text-[13.5px] text-gray-500 max-w-[360px]">
          {body ?? `${title} features are on the way. Check back soon.`}
        </div>
      </div>
    </div>
  );
}
