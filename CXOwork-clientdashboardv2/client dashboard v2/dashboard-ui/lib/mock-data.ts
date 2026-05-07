export type ProfileStatus = "active" | "under_review" | "rejected" | "deactivated";

export interface MockClient {
  uid: string;
  firstName: string; lastName: string; email: string; phone: string;
  title: string; location: string; companyName: string; companyIndustry: string;
  companyStage: string; companySize: string; companyWebsite: string; companyDescription: string;
  profileStatus: ProfileStatus;
  notifyMessages: boolean; notifyMatches: boolean; notifyProductUpdates: boolean; notifyMarketing: boolean;
  preferences: { role: string; lookingFor: string; industry?: string; companySize?: string; challenges?: string[] };
}

export const INITIAL_CLIENT: MockClient = {
  uid: "mock-user-123",
  firstName: "Alex", lastName: "Johnson", email: "alex@acmecorp.com",
  phone: "+1 415 555 0100", title: "Founder & CEO", location: "San Francisco, CA",
  companyName: "Acme Corp", companyIndustry: "Information Technology & Services",
  companyStage: "Series A", companySize: "11–50", companyWebsite: "https://acmecorp.com",
  companyDescription: "Acme Corp builds enterprise workflow automation tools for mid-market teams.",
  profileStatus: "active",
  notifyMessages: true, notifyMatches: true, notifyProductUpdates: true, notifyMarketing: false,
  preferences: {
    role: "CFO",
    lookingFor: "Looking for a fractional CFO with SaaS experience to help us prepare for Series B fundraising. We have $3M ARR, growing 8% MoM, and need help structuring our metrics and investor narrative.",
  },
};

export interface MockAdvisor {
  uid: string; firstName: string; lastName: string; headline: string;
  selectedRoles: string[]; city: string; hourlyRate: number; about: string;
  skills: string[]; selectedIndustries: string[]; engagementTypes: string[]; photoUrl?: string;
  photoColor?: string; rating?: number; reviews?: number; topRated?: boolean;
  available?: boolean; availability?: string;
}

export const MOCK_ADVISORS: Record<string, MockAdvisor> = {
  "advisor-1": {
    uid: "advisor-1", firstName: "Sarah", lastName: "Chen",
    headline: "Fractional CFO | SaaS & FinTech | Series A–C Growth",
    selectedRoles: ["CFO"], city: "New York, NY", hourlyRate: 350,
    about: "15 years of CFO experience across SaaS, FinTech, and marketplaces. I help founders build the financial infrastructure they need to scale confidently — from building board-ready models to leading Series B fundraises.",
    skills: ["Financial Modeling", "Fundraising", "Cash Flow Management", "Board Reporting", "SaaS Metrics"],
    selectedIndustries: ["SaaS", "FinTech"], engagementTypes: ["Fractional", "Advisory"],
    photoColor: "bg-purple-500", rating: 4.9, reviews: 47, topRated: true, available: true, availability: "10–20 hrs/week",
  },
  "advisor-2": {
    uid: "advisor-2", firstName: "Marcus", lastName: "Rivera",
    headline: "Fractional CTO | Platform Architecture | AI/ML Integration",
    selectedRoles: ["CTO"], city: "Austin, TX", hourlyRate: 400,
    about: "Engineering leader with 3 successful exits. I specialize in helping Series A/B companies scale their tech stack, hire strong engineering teams, and integrate AI capabilities without slowing product velocity.",
    skills: ["System Architecture", "Team Building", "AI/ML", "Cloud Infrastructure", "Technical Recruiting"],
    selectedIndustries: ["SaaS", "AI", "Enterprise Software"], engagementTypes: ["Fractional", "Project-based"],
    photoColor: "bg-blue-600", rating: 4.9, reviews: 62, topRated: true, available: true, availability: "20–30 hrs/week",
  },
  "advisor-3": {
    uid: "advisor-3", firstName: "Priya", lastName: "Sharma",
    headline: "Fractional CMO | B2B Growth | PLG & Sales-Led",
    selectedRoles: ["CMO"], city: "San Francisco, CA", hourlyRate: 300,
    about: "Built marketing orgs at 4 B2B SaaS companies from $1M to $50M ARR. Expert in product-led growth, demand gen, and building brand in competitive markets.",
    skills: ["Demand Gen", "PLG", "Brand Strategy", "Content Marketing", "ABM"],
    selectedIndustries: ["SaaS", "B2B", "Marketing Tech"], engagementTypes: ["Fractional", "Advisory"],
    photoColor: "bg-rose-500", rating: 4.8, reviews: 31, topRated: false, available: true, availability: "10–20 hrs/week",
  },
};

export interface MockMatch {
  id: string; advisorUid: string; clientUid: string; status: string; note: string;
}

export const MOCK_MATCHES: MockMatch[] = [
  { id: "match-1", advisorUid: "advisor-1", clientUid: "mock-user-123", status: "active",
    note: "Sarah has deep SaaS CFO experience and has guided 3 companies through their Series B. Her metrics framework work is exactly what you need at this stage." },
  { id: "match-2", advisorUid: "advisor-3", clientUid: "mock-user-123", status: "active",
    note: "Priya built a very similar PLG motion at her last company and scaled them from $2M to $18M ARR in 18 months. Great fit for your growth challenge." },
];

export interface MockMessage {
  id: string; text: string; senderRole: "client" | "advisor" | "admin"; createdAt: Date;
}
export interface MockThread {
  id: string; participants: string[]; clientUid: string; advisorUid: string; lastMessage: string;
}

export const MOCK_THREADS: MockThread[] = [
  { id: "t_mock_advisor-1", participants: ["mock-user-123", "advisor-1"],
    clientUid: "mock-user-123", advisorUid: "advisor-1", lastMessage: "Happy to set up a call this week." },
];

export const MOCK_MESSAGES: Record<string, MockMessage[]> = {
  "t_mock_advisor-1": [
    { id: "m1", text: "Hi Sarah, I came across your profile and would love to connect. We're a Series A SaaS company and need help structuring our financials for a B round.", senderRole: "client", createdAt: new Date("2025-04-27T10:00:00") },
    { id: "m2", text: "Hi Alex! Thanks for reaching out — this sounds right in my wheelhouse. I've helped several SaaS companies at exactly your stage get their metrics board-ready.", senderRole: "advisor", createdAt: new Date("2025-04-27T10:45:00") },
    { id: "m3", text: "Happy to set up a call this week.", senderRole: "advisor", createdAt: new Date("2025-04-27T10:46:00") },
    { id: "m4", text: "That would be great! Does Thursday at 2pm PT work for you?", senderRole: "client", createdAt: new Date("2025-04-27T11:10:00") },
  ],
};

// ─── Timesheets ───────────────────────────────────────────────────────────────

export interface TimesheetDay {
  date: string;       // "2026-04-27"
  label: string;      // "Monday, April 27"
  hoursDecimal: number; // 8.0
  hoursDisplay: string; // "8:00"
}

export interface TimesheetWeek {
  weekLabel: string;  // "Apr 27 – May 3, 2026"
  weekStart: string;  // "2026-04-27"
  totalHours: number;
  totalHoursDisplay: string;
  totalAmount: number;
  days: TimesheetDay[];
}

export interface MockTimesheet {
  contractId: string;
  contractTitle: string;
  advisorName: string;
  advisorInitials: string;
  advisorColor: string;
  advisorRole: string;
  billingType: "hourly_weekly";
  hourlyRate: number;
  weeklyHoursLimit: number;
  hoursLast24h: number;
  hoursThisWeek: number;
  hoursLastWeek: number;
  hoursSinceStart: number;
  status: "active" | "paused" | "ended";
  weeks: TimesheetWeek[];
}

export const MOCK_TIMESHEETS: MockTimesheet[] = [
  {
    contractId: "contract-1",
    contractTitle: "Fractional CFO Engagement",
    advisorName: "Sarah Chen",
    advisorInitials: "SC",
    advisorColor: "bg-purple-500",
    advisorRole: "Fractional CFO",
    billingType: "hourly_weekly",
    hourlyRate: 350,
    weeklyHoursLimit: 15,
    hoursLast24h: 0,
    hoursThisWeek: 10.5,
    hoursLastWeek: 15,
    hoursSinceStart: 187.5,
    status: "active",
    weeks: [
      {
        weekLabel: "Apr 27 – May 3, 2026",
        weekStart: "2026-04-27",
        totalHours: 10.5,
        totalHoursDisplay: "10:30",
        totalAmount: 3675,
        days: [
          { date: "2026-04-27", label: "Monday, Apr 27",    hoursDecimal: 3,   hoursDisplay: "3:00" },
          { date: "2026-04-28", label: "Tuesday, Apr 28",   hoursDecimal: 2.5, hoursDisplay: "2:30" },
          { date: "2026-04-29", label: "Wednesday, Apr 29", hoursDecimal: 2,   hoursDisplay: "2:00" },
          { date: "2026-04-30", label: "Thursday, Apr 30",  hoursDecimal: 3,   hoursDisplay: "3:00" },
          { date: "2026-05-01", label: "Friday, May 1",     hoursDecimal: 0,   hoursDisplay: "0:00" },
          { date: "2026-05-02", label: "Saturday, May 2",   hoursDecimal: 0,   hoursDisplay: "0:00" },
          { date: "2026-05-03", label: "Sunday, May 3",     hoursDecimal: 0,   hoursDisplay: "0:00" },
        ],
      },
      {
        weekLabel: "Apr 20 – Apr 26, 2026",
        weekStart: "2026-04-20",
        totalHours: 15,
        totalHoursDisplay: "15:00",
        totalAmount: 5250,
        days: [
          { date: "2026-04-20", label: "Monday, Apr 20",    hoursDecimal: 3,   hoursDisplay: "3:00" },
          { date: "2026-04-21", label: "Tuesday, Apr 21",   hoursDecimal: 3,   hoursDisplay: "3:00" },
          { date: "2026-04-22", label: "Wednesday, Apr 22", hoursDecimal: 3,   hoursDisplay: "3:00" },
          { date: "2026-04-23", label: "Thursday, Apr 23",  hoursDecimal: 3,   hoursDisplay: "3:00" },
          { date: "2026-04-24", label: "Friday, Apr 24",    hoursDecimal: 3,   hoursDisplay: "3:00" },
          { date: "2026-04-25", label: "Saturday, Apr 25",  hoursDecimal: 0,   hoursDisplay: "0:00" },
          { date: "2026-04-26", label: "Sunday, Apr 26",    hoursDecimal: 0,   hoursDisplay: "0:00" },
        ],
      },
      {
        weekLabel: "Apr 13 – Apr 19, 2026",
        weekStart: "2026-04-13",
        totalHours: 13,
        totalHoursDisplay: "13:00",
        totalAmount: 4550,
        days: [
          { date: "2026-04-13", label: "Monday, Apr 13",    hoursDecimal: 2,   hoursDisplay: "2:00" },
          { date: "2026-04-14", label: "Tuesday, Apr 14",   hoursDecimal: 3,   hoursDisplay: "3:00" },
          { date: "2026-04-15", label: "Wednesday, Apr 15", hoursDecimal: 3,   hoursDisplay: "3:00" },
          { date: "2026-04-16", label: "Thursday, Apr 16",  hoursDecimal: 2,   hoursDisplay: "2:00" },
          { date: "2026-04-17", label: "Friday, Apr 17",    hoursDecimal: 3,   hoursDisplay: "3:00" },
          { date: "2026-04-18", label: "Saturday, Apr 18",  hoursDecimal: 0,   hoursDisplay: "0:00" },
          { date: "2026-04-19", label: "Sunday, Apr 19",    hoursDecimal: 0,   hoursDisplay: "0:00" },
        ],
      },
    ],
  },
  {
    contractId: "contract-2",
    contractTitle: "Fractional CTO Advisory",
    advisorName: "Marcus Rivera",
    advisorInitials: "MR",
    advisorColor: "bg-blue-600",
    advisorRole: "Fractional CTO",
    billingType: "hourly_weekly",
    hourlyRate: 400,
    weeklyHoursLimit: 10,
    hoursLast24h: 2,
    hoursThisWeek: 6,
    hoursLastWeek: 10,
    hoursSinceStart: 84,
    status: "active",
    weeks: [
      {
        weekLabel: "Apr 27 – May 3, 2026",
        weekStart: "2026-04-27",
        totalHours: 6,
        totalHoursDisplay: "6:00",
        totalAmount: 2400,
        days: [
          { date: "2026-04-27", label: "Monday, Apr 27",    hoursDecimal: 2,   hoursDisplay: "2:00" },
          { date: "2026-04-28", label: "Tuesday, Apr 28",   hoursDecimal: 1,   hoursDisplay: "1:00" },
          { date: "2026-04-29", label: "Wednesday, Apr 29", hoursDecimal: 2,   hoursDisplay: "2:00" },
          { date: "2026-04-30", label: "Thursday, Apr 30",  hoursDecimal: 1,   hoursDisplay: "1:00" },
          { date: "2026-05-01", label: "Friday, May 1",     hoursDecimal: 0,   hoursDisplay: "0:00" },
          { date: "2026-05-02", label: "Saturday, May 2",   hoursDecimal: 0,   hoursDisplay: "0:00" },
          { date: "2026-05-03", label: "Sunday, May 3",     hoursDecimal: 0,   hoursDisplay: "0:00" },
        ],
      },
      {
        weekLabel: "Apr 20 – Apr 26, 2026",
        weekStart: "2026-04-20",
        totalHours: 10,
        totalHoursDisplay: "10:00",
        totalAmount: 4000,
        days: [
          { date: "2026-04-20", label: "Monday, Apr 20",    hoursDecimal: 2,   hoursDisplay: "2:00" },
          { date: "2026-04-21", label: "Tuesday, Apr 21",   hoursDecimal: 2,   hoursDisplay: "2:00" },
          { date: "2026-04-22", label: "Wednesday, Apr 22", hoursDecimal: 2,   hoursDisplay: "2:00" },
          { date: "2026-04-23", label: "Thursday, Apr 23",  hoursDecimal: 2,   hoursDisplay: "2:00" },
          { date: "2026-04-24", label: "Friday, Apr 24",    hoursDecimal: 2,   hoursDisplay: "2:00" },
          { date: "2026-04-25", label: "Saturday, Apr 25",  hoursDecimal: 0,   hoursDisplay: "0:00" },
          { date: "2026-04-26", label: "Sunday, Apr 26",    hoursDecimal: 0,   hoursDisplay: "0:00" },
        ],
      },
    ],
  },
];

export const MOCK_ADMIN_MESSAGES: MockMessage[] = [
  { id: "a1", text: "Welcome to CXOwork! Your profile is under review. We typically take 1–2 business days to match you with the right executives.", senderRole: "admin", createdAt: new Date("2025-04-20T09:00:00") },
  { id: "a2", text: "Great news — your profile is approved! We've matched you with Sarah Chen (CFO) and Priya Sharma (CMO). Check your Matched CXO tab to view their profiles and send a message.", senderRole: "admin", createdAt: new Date("2025-04-27T14:00:00") },
];
