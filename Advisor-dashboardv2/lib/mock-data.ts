import type {
  AdvisorProfile, AdvisorMatch, MatchedClientProfile, Lead, ChatMessage, ClientThread,
} from "@/types/advisor";

export const MOCK_ADVISOR: AdvisorProfile = {
  uid                  : "mock-advisor-uid-001",
  firstName            : "Alex",
  lastName             : "Morgan",
  email                : "alex.morgan@example.com",
  bio                  : "Seasoned C-suite executive with 15+ years driving growth across fintech, SaaS, and enterprise software. Former CFO at TechCorp Inc. and VP Finance at GrowthStack.",
  about                : "Seasoned C-suite executive with 15+ years driving growth across fintech, SaaS, and enterprise software.",
  headline             : "Former CFO | Financial Strategy & Growth Expert",
  professionalTitle    : "Chief Financial Officer",
  photoUrl             : null,
  linkedinUrl          : "linkedin.com/in/alexmorgan",
  profileStatus        : "active",
  skills               : ["Financial Strategy", "M&A", "Fundraising", "P&L Management", "Series B/C Fundraising", "Board Reporting"],
  coreSkills           : ["Financial Strategy", "M&A", "Fundraising"],
  selectedIndustries   : ["Fintech", "SaaS", "Enterprise Software"],
  industry             : "Fintech",
  hourlyRate           : 350,
  location             : "San Francisco, CA",
  city                 : "San Francisco",
  profileVisibility    : "public",
  anonymousMode        : false,
  idVerificationStatus : "verified",
  notifyEmail          : true,
  notifySms            : false,
  references           : [
    { name: "Jennifer Park",  email: "jpark@ventureX.com",   relationship: "Former Board Member" },
    { name: "Marcus Liu",     email: "mliu@techcorp.io",     relationship: "Former CEO" },
  ],
  workHistory: [
    { title: "CFO",              company: "TechCorp Inc.",    startDate: "2019", endDate: "2023",         description: "Led $120M Series C and oversaw 3x revenue growth." },
    { title: "VP Finance",       company: "GrowthStack",      startDate: "2016", endDate: "2019",         description: "Built finance team from scratch, led acquisition." },
    { title: "Finance Director", company: "FinServe Global",  startDate: "2012", endDate: "2016" },
  ],
  experienceHistory: [
    { title: "CFO",              company: "TechCorp Inc.",    startDate: "2019", endDate: "2023",         description: "Led $120M Series C and oversaw 3x revenue growth." },
    { title: "VP Finance",       company: "GrowthStack",      startDate: "2016", endDate: "2019",         description: "Built finance team from scratch, led acquisition." },
    { title: "Finance Director", company: "FinServe Global",  startDate: "2012", endDate: "2016" },
  ],
};

export const MOCK_MATCHES: AdvisorMatch[] = [
  { id: "match-1", clientUid: "client-1", advisorUid: "mock-advisor-uid-001", status: "active",   note: "Strong fit for Series B financial strategy — Alex's SaaS background is exactly what this team needs." },
  { id: "match-2", clientUid: "client-2", advisorUid: "mock-advisor-uid-001", status: "active",   note: "Both have deep fintech roots. Complementary experience in payments infrastructure." },
  { id: "match-3", clientUid: "client-3", advisorUid: "mock-advisor-uid-001", status: "active",   note: "Enterprise SaaS company targeting CFO advisory for their upcoming M&A process." },
  { id: "match-4", clientUid: "client-4", advisorUid: "mock-advisor-uid-001", status: "archived", note: "Archived — engagement completed." },
];

export const MOCK_CLIENTS: Record<string, MatchedClientProfile> = {
  "client-1": {
    uid: "client-1", firstName: "Sarah", lastName: "Chen",
    email: "sarah.chen@growthtech.io", companyName: "GrowthTech",
    companyIndustry: "SaaS", companyWebsite: "growthtech.io",
    prefRole: "Fractional CFO",
    lookingFor: "Help with Series B fundraising, financial modeling, and building out our finance function ahead of an institutional raise.",
  },
  "client-2": {
    uid: "client-2", firstName: "Marcus", lastName: "Rivera",
    email: "m.rivera@payflowlabs.com", companyName: "PayFlow Labs",
    companyIndustry: "Fintech", companyWebsite: "payflowlabs.com",
    prefRole: "Strategic Advisor",
    lookingFor: "Payments infrastructure strategy and regulatory guidance as we expand to Europe.",
  },
  "client-3": {
    uid: "client-3", firstName: "Priya", lastName: "Nair",
    email: "priya@cloudbase.co", companyName: "CloudBase",
    companyIndustry: "Enterprise Software", companyWebsite: "cloudbase.co",
    prefRole: "M&A Advisor",
    lookingFor: "M&A advisory support for a planned acquisition. Need someone who has run the process before.",
  },
};

export const MOCK_LEADS: Lead[] = [
  { id: "lead-1", name: "James Wilson",   email: "james@startuplab.io",  phone: "+1 415 555 0101", title: "CEO",            company: "StartupLab",     location: "SF, CA",       linkedinUrl: "linkedin.com/in/jameswilson",   source: "self",     status: "in-conversation", notes: "Met at SaaStr. Good fit for fractional CFO engagement.", createdAt: Date.now() - 86400000 * 3 },
  { id: "lead-2", name: "Olivia Thompson", email: "o.thompson@nexacloud.com", phone: "", title: "Co-Founder",     company: "NexaCloud",      location: "NYC, NY",      linkedinUrl: "linkedin.com/in/oliviathompson", source: "cxowork",  status: "new",             notes: "Inbound through CXOwork. Series A fintech.", createdAt: Date.now() - 86400000 * 7 },
  { id: "lead-3", name: "David Park",     email: "dpark@vertexai.io",    phone: "+1 650 555 0188", title: "CFO",            company: "VertexAI",       location: "Palo Alto, CA", linkedinUrl: "", source: "linkedin", status: "active-project",  notes: "Currently on engagement — monthly retainer for financial strategy.", createdAt: Date.now() - 86400000 * 30 },
  { id: "lead-4", name: "Lena Fischer",   email: "lena@fintechde.com",   phone: "", title: "Head of Finance", company: "FintechDE",      location: "Berlin, DE",   linkedinUrl: "linkedin.com/in/lenafischer",   source: "apollo",   status: "awaiting-review", notes: "EU expansion candidate. Need to check compliance.", createdAt: Date.now() - 86400000 * 14 },
  { id: "lead-5", name: "Raj Patel",      email: "raj.p@buildfast.dev",  phone: "+1 312 555 0122", title: "CTO",            company: "BuildFast",      location: "Chicago, IL",  linkedinUrl: "linkedin.com/in/rajpatel",      source: "self",     status: "inactive",        notes: "Not a fit right now — CTO, not looking for finance advisory.", createdAt: Date.now() - 86400000 * 60 },
];

export const MOCK_ADMIN_MESSAGES: ChatMessage[] = [
  { id: "adm-1", text: "Hi Alex! Welcome to CXOwork. Your profile has been reviewed and approved. You can now access all features.",          senderRole: "admin",   senderUid: "admin", createdAt: Date.now() - 86400000 * 10 },
  { id: "adm-2", text: "Thanks! Really excited to get started. Any tips on optimising my profile for matches?",                              senderRole: "advisor", senderUid: "mock-advisor-uid-001", createdAt: Date.now() - 86400000 * 10 + 60000 },
  { id: "adm-3", text: "Great question! Make sure to fill in your hourly rate, add 2-3 references, and keep your skills list specific.",     senderRole: "admin",   senderUid: "admin", createdAt: Date.now() - 86400000 * 9 },
  { id: "adm-4", text: "We've matched you with 3 new clients this week. Check the Clients tab to reach out!",                               senderRole: "admin",   senderUid: "admin", createdAt: Date.now() - 86400000 * 2 },
];

export const MOCK_CLIENT_THREADS: ClientThread[] = [
  { id: "thread-client-1", clientUid: "client-1", advisorUid: "mock-advisor-uid-001", clientName: "Sarah Chen",   lastMessage: "Looking forward to our call!", updatedAt: Date.now() - 3600000 },
  { id: "thread-client-2", clientUid: "client-2", advisorUid: "mock-advisor-uid-001", clientName: "Marcus Rivera", lastMessage: "Can you send over the deck?",   updatedAt: Date.now() - 86400000 },
];

export const MOCK_THREAD_MESSAGES: Record<string, ChatMessage[]> = {
  "thread-client-1": [
    { id: "t1m1", text: "Hi Alex, really excited to connect. We're about to kick off our Series B process.",                               senderRole: "client",  senderUid: "client-1", createdAt: Date.now() - 86400000 * 2 },
    { id: "t1m2", text: "Hey Sarah! Congrats on the traction. Happy to help you prepare. When would be a good time to jump on a call?",   senderRole: "advisor", senderUid: "mock-advisor-uid-001", createdAt: Date.now() - 86400000 * 2 + 120000 },
    { id: "t1m3", text: "How about Thursday at 2pm PST?",                                                                                 senderRole: "client",  senderUid: "client-1", createdAt: Date.now() - 86400000 },
    { id: "t1m4", text: "Thursday works perfectly. I'll send over a calendar invite.",                                                    senderRole: "advisor", senderUid: "mock-advisor-uid-001", createdAt: Date.now() - 86400000 + 60000 },
    { id: "t1m5", text: "Looking forward to our call!",                                                                                   senderRole: "client",  senderUid: "client-1", createdAt: Date.now() - 3600000 },
  ],
  "thread-client-2": [
    { id: "t2m1", text: "Hi Alex, Marcus here from PayFlow. I saw your background in payments — very relevant to what we're building.",    senderRole: "client",  senderUid: "client-2", createdAt: Date.now() - 86400000 * 3 },
    { id: "t2m2", text: "Marcus! Great to connect. Love what PayFlow is doing in the European market. What are the biggest pain points?",  senderRole: "advisor", senderUid: "mock-advisor-uid-001", createdAt: Date.now() - 86400000 * 3 + 180000 },
    { id: "t2m3", text: "Regulatory compliance mainly. Can you send over the deck you mentioned in your profile?",                         senderRole: "client",  senderUid: "client-2", createdAt: Date.now() - 86400000 },
  ],
};
