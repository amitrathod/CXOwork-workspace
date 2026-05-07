"use client";

export default function AdvisorOverviewPage() {
  return (
    <div>
      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back. Here&apos;s your overview.</p>
        </div>
        <button type="button" className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-900">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Product Tour
        </button>
      </div>

      {/* ── Stat cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
        <StatCard label="Total Revenue"                value="$12,450"   change="+18% this month"      icon={<TrendingUpIcon />} />
        <StatCard label="Sessions"                     value="24"        change="4 this week"          icon={<EventNoteIcon />} />
        <StatCard label="Active Clients"               value="3"         change="2 new matches"        icon={<PersonIcon />} />
        <StatCard label="Avg. Rating"                  value="4.9"       change="Based on 18 reviews"  icon={<StarIcon />} />
        <StatCard label="Available capacity this week" value="8 hrs"     change="Set your availability" icon={<ScheduleIcon />} />
      </div>

      {/* ── Chart placeholders ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <PlaceholderCard icon={<BarChartIcon />} title="Revenue Overview" body="Revenue data will appear here once you complete sessions" />
        <PlaceholderCard icon={<CalendarIcon />} title="Sessions This Week" body="Session data will appear here once you have bookings" />
      </div>

      {/* ── Lists ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ListCard
          title="Upcoming Sessions"
          sub="Your next scheduled calls"
          action={<button type="button" className="text-[12px] font-semibold px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-900">View All</button>}
          items={[
            { name: "Sarah Chen",    company: "GrowthTech",   time: "Thu May 7 · 2:00pm PST" },
            { name: "Marcus Rivera", company: "PayFlow Labs",  time: "Fri May 8 · 10:00am PST" },
          ]}
          emptyIcon={<EventAvailableIcon />}
          emptyTitle="No upcoming sessions"
          emptyBody="Bookings will appear here once clients schedule time with you"
        />
        <ListCard
          title="Recent Activity"
          sub="Latest updates and notifications"
          items={[
            { name: "New match",        company: "Priya Nair · CloudBase", time: "2 hours ago" },
            { name: "Message received", company: "Sarah Chen",             time: "Yesterday" },
            { name: "Profile approved", company: "CXOwork team",           time: "3 days ago" },
          ]}
          emptyIcon={<NotificationsIcon />}
          emptyTitle="No recent activity"
          emptyBody="Activity will appear here as you engage with clients"
        />
      </div>
    </div>
  );
}

/* ── Primitives ──────────────────────────────────────────────────────── */

function StatCard({ label, value, change, icon }: { label: string; value: string; change?: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mb-1.5">
        <span className="text-gray-400 inline-flex">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-[24px] font-semibold text-gray-900 leading-tight">{value}</div>
      {change && <div className="text-[12px] text-gray-400 mt-0.5">{change}</div>}
    </div>
  );
}

function PlaceholderCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center min-h-[200px] text-center px-6 py-8">
      <span className="text-gray-300 mb-2.5">{icon}</span>
      <div className="text-[14px] font-semibold text-gray-500">{title}</div>
      <div className="text-[12.5px] text-gray-400 mt-1 max-w-[280px]">{body}</div>
    </div>
  );
}

function ListCard({
  title, sub, action, items, emptyIcon, emptyTitle, emptyBody,
}: {
  title: string; sub?: string; action?: React.ReactNode;
  items: { name: string; company: string; time: string }[];
  emptyIcon: React.ReactNode; emptyTitle: string; emptyBody: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[15px] font-semibold text-gray-900">{title}</div>
          {sub && <div className="text-[12.5px] text-gray-500 mt-0.5">{sub}</div>}
        </div>
        {action}
      </div>
      {items.length === 0 ? (
        <div className="text-center px-4 py-8">
          <span className="text-gray-300 inline-flex mb-2">{emptyIcon}</span>
          <div className="text-[13px] font-semibold text-gray-500">{emptyTitle}</div>
          <div className="text-[12px] text-gray-400 mt-1">{emptyBody}</div>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((item, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between">
              <div>
                <div className="text-[13.5px] font-semibold text-gray-900">{item.name}</div>
                <div className="text-[12px] text-gray-500">{item.company}</div>
              </div>
              <div className="text-[11.5px] text-gray-400">{item.time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Icons ───────────────────────────────────────────────────────────── */
function TrendingUpIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>; }
function EventNoteIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg>; }
function PersonIcon()         { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function StarIcon()           { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }
function ScheduleIcon()       { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function BarChartIcon()       { return <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6"  y1="20" x2="6"  y2="16"/></svg>; }
function CalendarIcon()       { return <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8"  y1="2" x2="8"  y2="6"/><line x1="3"  y1="10" x2="21" y2="10"/></svg>; }
function EventAvailableIcon() { return <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8"  y1="2" x2="8"  y2="6"/><line x1="3"  y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/></svg>; }
function NotificationsIcon()  { return <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
