"use client";

import { useState } from "react";
import { Search, Star, MapPin, Clock, Filter, ChevronDown, Heart, MessageSquare, Check, Users } from "lucide-react";

// ─── Mock advisor data ────────────────────────────────────────────────────────

interface Advisor {
  id: string;
  name: string;
  title: string;
  location: string;
  photoInitials: string;
  photoColor: string;
  role: string;
  rating: number;
  reviews: number;
  rate: number;
  availability: string;
  skills: string[];
  bio: string;
  pedigree: string[];        // e.g. ["Google", "Sequoia-backed"]
  similarRole: string;       // label for "View similar" e.g. "CFO"
  verified: boolean;
  topRated: boolean;
  available: boolean;
}

const ADVISORS: Advisor[] = [
  {
    id: "a1", name: "Sarah Chen", title: "Fractional CFO | SaaS & FinTech Specialist",
    location: "San Francisco, CA", photoInitials: "SC", photoColor: "bg-purple-500",
    role: "CFO", rating: 4.9, reviews: 47, rate: 450, availability: "10–20 hrs/week",
    skills: ["Financial Modeling", "Fundraising", "Investor Relations", "SaaS Metrics", "Cap Table Management"],
    bio: "Former CFO at two Series B SaaS companies backed by Sequoia and a16z. I help growth-stage startups build finance infrastructure, prepare for fundraising rounds, and establish board-level financial reporting that investors trust.",
    pedigree: ["Sequoia-backed", "a16z portfolio", "2× Series B exits"],
    similarRole: "CFO",
    verified: true, topRated: true, available: true,
  },
  {
    id: "a2", name: "Marcus Rivera", title: "Fractional CTO | AI & Scalable Systems",
    location: "Austin, TX", photoInitials: "MR", photoColor: "bg-blue-600",
    role: "CTO", rating: 4.9, reviews: 62, rate: 350, availability: "20–30 hrs/week",
    skills: ["System Architecture", "Engineering Leadership", "AI/ML", "Cloud Infrastructure", "DevOps"],
    bio: "Ex-Google and Microsoft engineer who went on to lead engineering at two venture-backed startups with exits totalling $340M. I help growth-stage startups build world-class engineering teams and scalable architecture that won't crack under hypergrowth.",
    pedigree: ["Ex-Google", "Ex-Microsoft", "$340M in exits"],
    similarRole: "CTO",
    verified: true, topRated: true, available: true,
  },
  {
    id: "a3", name: "Priya Sharma", title: "Fractional CMO | B2B Growth & Brand",
    location: "New York, NY", photoInitials: "PS", photoColor: "bg-rose-500",
    role: "CMO", rating: 4.8, reviews: 31, rate: 300, availability: "10–20 hrs/week",
    skills: ["Demand Generation", "Brand Strategy", "Content Marketing", "Product Marketing", "Go-to-Market"],
    bio: "15 years building B2B marketing engines at companies from seed to IPO — including stints at Salesforce and HubSpot. I specialise in turning product-led growth into enterprise-ready GTM strategies that scale beyond the founding team.",
    pedigree: ["Ex-Salesforce", "Ex-HubSpot", "Seed → IPO journeys"],
    similarRole: "CMO",
    verified: true, topRated: false, available: false,
  },
  {
    id: "a4", name: "James Okafor", title: "Fractional CRO | Revenue & Sales Excellence",
    location: "Chicago, IL", photoInitials: "JO", photoColor: "bg-emerald-600",
    role: "CRO", rating: 4.7, reviews: 24, rate: 375, availability: "5–10 hrs/week",
    skills: ["Sales Process", "Revenue Operations", "Enterprise Sales", "SDR Team Building", "CRM Setup"],
    bio: "Built and scaled sales teams at 6 startups, 3 of which reached Series A under his leadership. Previously led revenue at a Bessemer-backed SaaS company from $0 to $12M ARR in 18 months. Focused on repeatable, data-driven revenue engines.",
    pedigree: ["Bessemer-backed", "3× Series A", "$0–$12M ARR"],
    similarRole: "CRO",
    verified: true, topRated: false, available: true,
  },
  {
    id: "a5", name: "Lisa Tanaka", title: "Fractional COO | Operations & Scale",
    location: "Seattle, WA", photoInitials: "LT", photoColor: "bg-amber-500",
    role: "COO", rating: 4.9, reviews: 38, rate: 320, availability: "20–30 hrs/week",
    skills: ["Operations Strategy", "OKR Frameworks", "Process Design", "Team Scaling", "Customer Success"],
    bio: "Former Amazon and Stripe ops leader who has since worked with 12 startups across SaaS, marketplace, and HealthTech — 4 successful exits. I turn chaotic hypergrowth into sustainable operational excellence that doesn't burn your team out.",
    pedigree: ["Ex-Amazon", "Ex-Stripe", "4 successful exits"],
    similarRole: "COO",
    verified: true, topRated: true, available: true,
  },
];

const ROLES = ["All roles", "CTO", "CMO", "CRO", "CFO", "COO", "CPO", "CHRO", "CISO"];
const HOURS = ["Any commitment", "5–10 hrs/week", "10–20 hrs/week", "20–30 hrs/week", "30+ hrs/week"];
const LOCATIONS = ["Anywhere", "U.S. only", "Remote only"];

// ─── Filter pill ──────────────────────────────────────────────────────────────

function FilterSelect({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = value !== options[0];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-sm font-medium transition ${
          selected ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
        }`}
      >
        {selected ? value : label}
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
          {options.map((o) => (
            <button key={o} onClick={() => { onChange(o); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${value === o ? "text-blue-600 font-medium" : "text-gray-700"}`}>
              {o} {value === o && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Advisor card ─────────────────────────────────────────────────────────────

function AdvisorCard({ advisor, onFilterRole }: { advisor: Advisor; onFilterRole: (role: string) => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`w-14 h-14 rounded-full ${advisor.photoColor} text-white grid place-items-center font-bold text-lg flex-shrink-0`}>
          {advisor.photoInitials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              {/* Name + badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-gray-900">{advisor.name}</h3>
                {advisor.topRated && (
                  <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full font-medium flex items-center gap-1">
                    ⭐ Top Rated
                  </span>
                )}
                {advisor.available && (
                  <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 border border-green-200 rounded-full font-medium">
                    Available now
                  </span>
                )}
              </div>

              {/* Title */}
              <p className="text-[15px] text-gray-700 mt-0.5">{advisor.title}</p>

              {/* Location + hours */}
              <p className="text-[13px] text-gray-500 mt-0.5 flex items-center gap-1 flex-wrap">
                <MapPin className="w-3 h-3 flex-shrink-0" /> {advisor.location}
                <span className="mx-0.5">·</span>
                <Clock className="w-3 h-3 flex-shrink-0" /> {advisor.availability}
              </p>
            </div>

            {/* Heart */}
            <button
              onClick={() => setSaved((s) => !s)}
              className={`p-2 rounded-xl border transition flex-shrink-0 ${
                saved ? "border-rose-200 bg-rose-50 text-rose-500" : "border-gray-200 text-gray-500 hover:border-rose-200 hover:text-rose-400"
              }`}
            >
              <Heart className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Rating + rate */}
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1 text-gray-700 font-medium">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {advisor.rating}
              <span className="text-gray-500 font-normal">({advisor.reviews} reviews)</span>
            </span>
            <span className="text-gray-700 font-medium">${advisor.rate}<span className="text-gray-500 font-normal">/hr</span></span>
          </div>

          {/* Pedigree pills */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {advisor.pedigree.map((p) => (
              <span key={p} className="inline-flex items-center gap-1 text-[12px] px-2.5 py-0.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-full font-medium">
                {p}
              </span>
            ))}
          </div>

          {/* Bio — 2 lines */}
          <p className="text-[15px] text-gray-500 mt-2.5 leading-relaxed line-clamp-2">{advisor.bio}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {advisor.skills.slice(0, 4).map((s) => (
              <span key={s} className="text-[13px] px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">{s}</span>
            ))}
            {advisor.skills.length > 4 && (
              <span className="text-[13px] px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">+{advisor.skills.length - 4}</span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        {/* View similar */}
        <button
          onClick={() => onFilterRole(advisor.role)}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 transition font-medium"
        >
          <Users className="w-3.5 h-3.5" />
          View similar {advisor.similarRole}s
        </button>

        {/* Primary actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
            <MessageSquare className="w-3.5 h-3.5" /> Message
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition">
            Invite to job
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FindCXOPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All roles");
  const [hours, setHours] = useState("Any commitment");
  const [location, setLocation] = useState("Anywhere");

  const filtered = ADVISORS.filter((a) => {
    const matchQuery = !query || a.name.toLowerCase().includes(query.toLowerCase()) || a.title.toLowerCase().includes(query.toLowerCase()) || a.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()));
    const matchRole = role === "All roles" || a.role === role;
    const matchHours = hours === "Any commitment" || a.availability === hours;
    const matchLocation = location === "Anywhere" || (location === "U.S. only" ? true : false);
    return matchQuery && matchRole && matchHours && matchLocation;
  });

  function handleFilterRole(r: string) {
    setRole(r);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">Find a CXO</h1>
        <p className="text-gray-500 text-sm mt-1">Browse vetted fractional executives available now.</p>
      </div>

      {/* Search + filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role, or skill…"
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 flex items-center gap-1.5"><Filter className="w-3.5 h-3.5" /> Filter by:</span>
          <FilterSelect label="Role" options={ROLES} value={role} onChange={setRole} />
          <FilterSelect label="Commitment" options={HOURS} value={hours} onChange={setHours} />
          <FilterSelect label="Location" options={LOCATIONS} value={location} onChange={setLocation} />
          {(role !== "All roles" || hours !== "Any commitment" || location !== "Anywhere" || query) && (
            <button
              onClick={() => { setRole("All roles"); setHours("Any commitment"); setLocation("Anywhere"); setQuery(""); }}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500">{filtered.length} advisor{filtered.length !== 1 ? "s" : ""} found</p>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-sm font-medium text-gray-500 mt-3">No advisors match your filters</p>
            <button
              onClick={() => { setRole("All roles"); setHours("Any commitment"); setLocation("Anywhere"); setQuery(""); }}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map((a) => <AdvisorCard key={a.id} advisor={a} onFilterRole={handleFilterRole} />)
        )}
      </div>
    </div>
  );
}
