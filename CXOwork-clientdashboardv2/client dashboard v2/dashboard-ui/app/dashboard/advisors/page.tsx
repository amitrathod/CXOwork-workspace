export default function AdvisorsPage() {
  return <ComingSoon title="Search CXO" subtitle="Browse and search the full executive directory — launching soon." />;
}
function ComingSoon({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <div className="mb-5"><h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">{title}</h1></div>
      <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 grid place-items-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <div className="text-[15px] font-semibold text-gray-900 mb-1">Coming soon</div>
        <div className="text-[13.5px] text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
}
