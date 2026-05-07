"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAdvisor } from "@/lib/advisor-context";
import {
  ChevronDown, Search, Users, FileText,
  ClipboardList, Briefcase, Calendar, Receipt,
  MessageSquare, Bell, Settings, LogOut, Menu, X, LayoutGrid,
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
    { label: "Overview",            href: "/advisor-dashboard/overview",  icon: LayoutGrid,    desc: "Your dashboard and activity summary" },
    { label: "Contracts",           href: "/advisor-dashboard/contracts",   icon: ClipboardList, desc: "Active and past contracts" },
    { label: "Project milestones",  href: "/advisor-dashboard/milestones",  icon: Briefcase,     desc: "Track deliverables & progress" },
    { label: "Sessions",            href: "/advisor-dashboard/sessions",    icon: Calendar,      desc: "Scheduled and past advisory sessions" },
    { label: "Timesheets",          href: "/advisor-dashboard/timesheets",  icon: Receipt,       desc: "Hours logged & weekly billing" },
  ]},
];

const ALL_NAV_ITEMS = [
  ...FIND_JOB.flatMap(g => g.items),
  ...MANAGE_WORK.flatMap(g => g.items),
  { label: "Messages", href: "/advisor-dashboard/messages", icon: MessageSquare, desc: "Your conversations" },
];

// ─── Desktop dropdown ─────────────────────────────────────────────────────────

function NavDropdown({ label, groups, activeHrefs }: {
  label: string;
  groups: { group: string; items: { label: string; href: string; icon: React.ElementType; desc: string }[] }[];
  activeHrefs: string[];
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
                    <div>
                      <p className={`text-sm font-medium ${active ? "text-blue-700" : "text-gray-800"}`}>{item.label}</p>
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
            <p className="text-xs text-gray-500 mt-0.5">Advisor account</p>
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
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = [advisor?.firstName, advisor?.lastName].filter(Boolean).join(" ") || "Advisor";
  const initials = ((advisor?.firstName?.[0] || "") + (advisor?.lastName?.[0] || "")).toUpperCase() || "?";
  const messagesActive = pathname?.startsWith("/advisor-dashboard/messages");

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
              activeHrefs={["/advisor-dashboard/overview", "/advisor-dashboard/contracts", "/advisor-dashboard/milestones", "/advisor-dashboard/sessions", "/advisor-dashboard/timesheets"]}
            />
            <Link
              href="/advisor-dashboard/messages"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                messagesActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Messages
              <span className="ml-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full grid place-items-center font-bold leading-none">2</span>
            </Link>
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <ProfileMenu initials={initials} name={displayName} />
          </div>

        </div>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
