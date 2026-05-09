"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAdvisor } from "@/lib/advisor-context";
import { useMatches } from "@/lib/match-context";
import type { MatchRequest } from "@/lib/match-context";
import { useProposals } from "@/lib/proposal-context";
import {
  ChevronDown, Search, Users, FileText,
  ClipboardList, Briefcase, Calendar, Receipt,
  MessageSquare, Bell, Settings, LogOut, Menu, X, LayoutGrid,
  CheckCircle2, XCircle, Zap, Video,
} from "lucide-react";

// ─── Dropdown data ────────────────────────────────────────────────────────────

const FIND_JOB = [
  { group: "Find work", items: [
    { label: "Find job",             href: "/advisor-dashboard",          icon: Search,        desc: "Browse opportunities matching your profile" },
    { label: "Your matches",         href: "/advisor-dashboard/clients",  icon: Users,         desc: "Clients our team has matched you with" },
    { label: "Proposals and offers", href: "/advisor-dashboard/leads",    icon: FileText,      desc: "Track your active proposals and offers" },
  ]},
];

const MANAGE_WORK = [
  { group: "Work", items: [
    { label: "Overview",           href: "/advisor-dashboard/overview",   icon: LayoutGrid,    desc: "Your dashboard and activity summary" },
    { label: "Contracts",          href: "/advisor-dashboard/contracts",  icon: ClipboardList, desc: "Active and past contracts" },
    { label: "Project milestones", href: "/advisor-dashboard/milestones", icon: Briefcase,     desc: "Track deliverables & progress" },
    { label: "Timesheets",         href: "/advisor-dashboard/timesheets", icon: Receipt,       desc: "Hours logged & weekly billing" },
  ]},
];

const ENGAGE = [
  { group: "Engage", items: [
    { label: "Messages", href: "/advisor-dashboard/messages", icon: MessageSquare, desc: "Conversations with clients and CXOwork" },
    { label: "Meetings",  href: "/advisor-dashboard/meetings", icon: Video,         desc: "Scheduled and past advisory sessions" },
  ]},
];

const ALL_NAV_ITEMS = [
  ...FIND_JOB.flatMap(g => g.items),
  ...MANAGE_WORK.flatMap(g => g.items),
  ...ENGAGE.flatMap(g => g.items),
];

// ─── Desktop dropdown ─────────────────────────────────────────────────────────

function NavDropdown({ label, groups, activeHrefs, badgeCount }: {
  label: string;
  groups: { group: string; items: { label: string; href: string; icon: React.ElementType; desc: string }[] }[];
  activeHrefs: string[];
  badgeCount?: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = activeHrefs.some(h => pathname === h || pathname?.startsWith(h + "/"));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[14px] font-medium transition-colors ${
          isActive
            ? "text-blue-600 bg-blue-50"
            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        {label}
        {badgeCount !== undefined && badgeCount > 0 && !open && (
          <span className="ml-0.5 min-w-[16px] h-4 bg-blue-600 text-white text-[10px] rounded-full grid place-items-center font-bold leading-none px-0.5">
            {badgeCount}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-2 overflow-hidden">
          {groups.map(g => (
            <div key={g.group}>
              <p className="px-4 pt-3 pb-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{g.group}</p>
              {g.items.map(item => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                    className={`flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${active ? "bg-blue-50" : ""}`}
                  >
                    <div className={`p-1.5 rounded-lg mt-0.5 flex-shrink-0 ${active ? "bg-blue-100" : "bg-gray-100"}`}>
                      <Icon className={`w-3.5 h-3.5 ${active ? "text-blue-600" : "text-gray-500"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-medium ${active ? "text-blue-700" : "text-gray-800"}`}>{item.label}</p>
                        {item.href === "/advisor-dashboard/contracts" && badgeCount !== undefined && badgeCount > 0 && (
                          <span className="min-w-[18px] h-4 bg-blue-600 text-white text-[10px] rounded-full grid place-items-center font-bold leading-none px-1">
                            {badgeCount} new
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Engage dropdown (Messages + Meetings) ────────────────────────────────────

function EngageDropdown({ pendingCount }: { pendingCount: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const engageHrefs = ["/advisor-dashboard/messages", "/advisor-dashboard/meetings"];
  const isActive = engageHrefs.some(h => pathname === h || pathname?.startsWith(h + "/"));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[14px] font-medium transition-colors ${
          isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        Engage
        {pendingCount > 0 && !open && (
          <span className="ml-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[10px] rounded-full grid place-items-center font-bold leading-none px-0.5">
            {pendingCount}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-2 overflow-hidden">
          <p className="px-4 pt-3 pb-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Engage</p>

          {ENGAGE[0].items.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            const isMessages = item.href === "/advisor-dashboard/messages";
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${active ? "bg-blue-50" : ""}`}
              >
                <div className={`p-1.5 rounded-lg mt-0.5 flex-shrink-0 ${active ? "bg-blue-100" : "bg-gray-100"}`}>
                  <Icon className={`w-3.5 h-3.5 ${active ? "text-blue-600" : "text-gray-500"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${active ? "text-blue-700" : "text-gray-800"}`}>{item.label}</p>
                    {isMessages && pendingCount > 0 && (
                      <span className="min-w-[16px] h-4 bg-red-500 text-white text-[10px] rounded-full grid place-items-center font-bold leading-none px-0.5">
                        {pendingCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Bell / notification dropdown ─────────────────────────────────────────────

function NotificationBell() {
  const { matches, pendingCount, accept, deny } = useMatches();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleAccept(m: MatchRequest) {
    accept(m.id);
  }
  function handleDeny(m: MatchRequest) {
    deny(m.id);
  }
  function handleViewInMessages() {
    setOpen(false);
    router.push("/advisor-dashboard/messages");
  }

  // Show pending first, then recently actioned (last 2)
  const visible = [
    ...matches.filter(m => m.status === "pending"),
    ...matches.filter(m => m.status !== "pending").slice(0, 2),
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4" />
        {pendingCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
            {pendingCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-[360px] bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-gray-900">Notifications</span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600">
                  {pendingCount} new
                </span>
              )}
            </div>
            <button
              onClick={handleViewInMessages}
              className="text-[12px] text-blue-600 hover:underline font-medium"
            >
              View all in Messages
            </button>
          </div>

          {/* Match request cards */}
          <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
            {visible.length === 0 && (
              <div className="px-4 py-8 text-center text-[13px] text-gray-400">
                No notifications yet
              </div>
            )}

            {visible.map((m) => (
              <div
                key={m.id}
                className={`px-4 py-3.5 ${m.status === "pending" ? "bg-amber-50/60" : "bg-white"}`}
              >
                {/* Row: avatar + info */}
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full ${m.avatarColor} flex items-center justify-center text-white font-bold text-[12px] shrink-0`}>
                    {m.clientInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[13px] font-semibold text-gray-900">{m.clientName}</span>
                      <span className="text-[11.5px] text-gray-400">· {m.company}</span>
                      {m.status === "pending" && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                          <Zap className="w-2.5 h-2.5" />New match
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-500 mt-0.5">
                      Wants to hire you as <span className="font-medium text-gray-700">{m.role}</span> · {m.rate} · {m.hoursPerWeek} hrs/wk
                    </p>
                    <p className="text-[12px] text-gray-600 mt-1 line-clamp-2 leading-snug">
                      &ldquo;{m.intro}&rdquo;
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">{m.receivedAt}</p>

                    {/* Action buttons — only when pending */}
                    {m.status === "pending" && (
                      <div className="flex gap-2 mt-2.5">
                        <button
                          type="button"
                          onClick={() => handleAccept(m)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeny(m)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-semibold border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Pass
                        </button>
                        <button
                          type="button"
                          onClick={handleViewInMessages}
                          className="ml-auto text-[12px] text-blue-600 hover:underline font-medium self-center"
                        >
                          View thread →
                        </button>
                      </div>
                    )}

                    {/* Post-action state */}
                    {m.status === "accepted" && (
                      <div className="flex items-center gap-1.5 mt-2 text-[12px] text-green-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Profile shared · awaiting client to reach out
                      </div>
                    )}
                    {m.status === "denied" && (
                      <div className="flex items-center gap-1.5 mt-2 text-[12px] text-gray-400 font-medium">
                        <XCircle className="w-3.5 h-3.5" />
                        You passed on this match
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          {matches.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-2.5">
              <button
                onClick={handleViewInMessages}
                className="w-full text-center text-[12.5px] text-blue-600 hover:underline font-medium"
              >
                Open Messages for full conversation →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Profile menu ─────────────────────────────────────────────────────────────

function ProfileMenu({ initials, name }: { initials: string; name: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-8 h-8 rounded-full bg-gray-900 text-white grid place-items-center font-semibold text-xs hover:bg-gray-700 transition"
        title={name}
      >
        {initials}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-2 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <p className="text-sm font-semibold text-gray-900">{name}</p>
            <p className="text-xs text-gray-500 mt-0.5">Fractional CFO · Advisor account</p>
          </div>
          <Link
            href="/advisor-dashboard/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-500" /> Account settings
          </Link>
          <div className="border-t border-gray-50 mt-1 pt-1">
            <button
              onClick={() => { setOpen(false); alert("Sign out — UI demo only."); }}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full transition-colors"
            >
              <LogOut className="w-4 h-4 text-gray-500" /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mobile drawer ────────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 h-[60px] border-b border-gray-100">
          <Link href="/advisor-dashboard" onClick={onClose} className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="CXOwork" width={22} height={18} />
            <span className="font-bold text-[17px] tracking-tight text-gray-900" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>CXOwork</span>
          </Link>
          <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {ALL_NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-blue-600" : "text-gray-500"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 px-3 py-3 space-y-0.5">
          <Link href="/advisor-dashboard/profile" onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-500" /> Account settings
          </Link>
        </div>
      </div>
    </>
  );
}

// ─── TopNav ───────────────────────────────────────────────────────────────────

export function TopNav() {
  const { advisor } = useAdvisor();
  const { pendingCount } = useMatches();
  const { newContractCount } = useProposals();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = [advisor?.firstName, advisor?.lastName].filter(Boolean).join(" ") || "Advisor";
  const initials    = ((advisor?.firstName?.[0] || "") + (advisor?.lastName?.[0] || "")).toUpperCase() || "?";
  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-[60px] flex items-center relative">

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -ml-1 mr-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href="/advisor-dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity flex-shrink-0">
            <Image src="/logo.svg" alt="CXOwork" width={25} height={20} priority />
            <span className="font-bold text-[18px] tracking-tight text-gray-900" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>CXOwork</span>
          </Link>

          {/* Desktop nav — absolutely centred */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5">
            <NavDropdown
              label="Find job"
              groups={FIND_JOB}
              activeHrefs={["/advisor-dashboard", "/advisor-dashboard/clients", "/advisor-dashboard/leads"]}
            />
            <NavDropdown
              label="Manage work"
              groups={MANAGE_WORK}
              activeHrefs={["/advisor-dashboard/overview", "/advisor-dashboard/contracts", "/advisor-dashboard/milestones", "/advisor-dashboard/timesheets"]}
              badgeCount={newContractCount}
            />
            <EngageDropdown pendingCount={pendingCount} />
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <NotificationBell />
            <ProfileMenu initials={initials} name={displayName} />
          </div>

        </div>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
