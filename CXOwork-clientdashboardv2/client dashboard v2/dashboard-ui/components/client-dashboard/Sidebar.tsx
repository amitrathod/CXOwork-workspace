"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClient } from "@/lib/mock-context";

const ICONS: Record<string, React.ReactNode> = {
  engagements: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  advisors:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  sessions:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  messages:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  profile:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  settings:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

const NAV = [
  { label: "Matched CXO",  href: "/dashboard/engagements", icon: ICONS.engagements },
  { label: "Search CXO",   href: "/dashboard/advisors",    icon: ICONS.advisors,   featureLocked: true },
  { label: "Sessions",     href: "/dashboard/sessions",    icon: ICONS.sessions },
  { label: "Messages",     href: "/dashboard/messages",    icon: ICONS.messages },
  { label: "My Profile",   href: "/dashboard/profile",     icon: ICONS.profile },
  { label: "Settings",     href: "/dashboard/settings",    icon: ICONS.settings },
];

export function Sidebar({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();
  const { client } = useClient();
  const displayName = [client.firstName, client.lastName].filter(Boolean).join(" ") || "User";
  const initials = ((client.firstName?.[0] || "") + (client.lastName?.[0] || "")).toUpperCase() || "?";

  return (
    <aside className="w-[200px] bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <Link href="/" className="px-4 py-5 border-b border-gray-200 flex items-center gap-2 hover:opacity-80 transition-opacity">
        <BrandMark />
        <span className="font-serif text-[18px] font-bold text-gray-900">CXOwork</span>
      </Link>
      <nav className="flex-1 overflow-y-auto py-2">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          const isLocked = !!item.featureLocked;
          const cls = [
            "flex items-center gap-2.5 px-4 py-2 text-[13.5px] transition-colors border-l-2",
            active ? "bg-blue-50 text-blue-600 border-blue-600 font-medium" : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-900",
            isLocked && "opacity-50 cursor-not-allowed pointer-events-none",
          ].filter(Boolean).join(" ");

          if (isLocked) {
            return (
              <div key={item.href} className={cls} title="Coming soon">
                <span className="opacity-70 shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            );
          }
          return (
            <Link key={item.href} href={item.href} className={cls} onClick={onItemClick}>
              <span className="opacity-70 shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 px-3 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white grid place-items-center font-semibold text-[11px] shrink-0">{initials}</div>
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-semibold text-gray-900 truncate">{displayName}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10.5px] text-gray-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function BrandMark() {
  return (
    <svg width="22" height="18" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.252 13.8458C5.89312 13.8458 5.89312 19.9994 10.252 19.9994H18.8094L14.7525 13.7624L10.252 13.8458Z" fill="#7B9BF8"/>
      <path d="M10.2521 13.8458C5.89327 13.8458 5.89327 19.9994 10.2521 19.9994C2.46388 20.0956 1.02161 6.92287 10.3183 6.92287L17.7228 6.83167L22.0787 13.7496L10.2222 13.8458H10.2521Z" fill="#2650F5"/>
      <path d="M9.92915 19.9943C10.0485 19.9978 10.1688 19.9995 10.2902 19.9995C10.1683 20.001 10.0479 19.9992 9.92915 19.9943C-2.80718 19.6299 -3.84802 0 10.0598 0H19.713L24.0398 6.82674L10.3564 6.9229C1.20521 6.9229 2.45944 19.6864 9.92915 19.9943Z" fill="#032EF4"/>
    </svg>
  );
}
