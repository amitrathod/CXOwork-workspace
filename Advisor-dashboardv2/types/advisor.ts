export type ProfileStatus = "under_review" | "active" | "inactive";
export type ProfileVisibility = "public" | "invite" | "verified";
export type LeadStatus = "new" | "in-conversation" | "active-project" | "awaiting-review" | "inactive";
export type LeadSource = "self" | "cxowork" | "linkedin" | "apollo";

export interface WorkHistoryEntry {
  title   : string;
  company : string;
  startDate?: string;
  endDate  ?: string;
  description?: string;
}

export interface Reference {
  name : string;
  email: string;
  relationship?: string;
}

export interface AdvisorProfile {
  uid                  : string;
  firstName            : string;
  lastName             : string;
  email                : string;
  bio                 ?: string;
  about               ?: string;
  headline            ?: string;
  professionalTitle   ?: string;
  photoUrl            ?: string | null;
  linkedinUrl         ?: string;
  profileStatus        : ProfileStatus;
  skills              ?: string[];
  coreSkills          ?: string[];
  selectedIndustries  ?: string[];
  industry            ?: string;
  hourlyRate          ?: number;
  location            ?: string;
  city                ?: string;
  profileVisibility   ?: ProfileVisibility;
  anonymousMode       ?: boolean;
  references          ?: Reference[];
  workHistory         ?: WorkHistoryEntry[];
  experienceHistory   ?: WorkHistoryEntry[];
  idVerificationStatus?: "pending" | "verified" | "rejected";
  notifyEmail         ?: boolean;
  notifySms           ?: boolean;
}

export interface AdvisorMatch {
  id        : string;
  clientUid : string;
  advisorUid: string;
  status    : "active" | "archived" | "pending";
  note     ?: string;
  createdAt ?: number;
}

export interface MatchedClientProfile {
  uid          : string;
  firstName   ?: string;
  lastName    ?: string;
  email       ?: string;
  companyName ?: string;
  companyIndustry?: string;
  companyWebsite?: string;
  prefRole    ?: string;
  lookingFor  ?: string;
}

export interface Lead {
  id         : string;
  name       : string;
  email      : string;
  phone      : string;
  title      : string;
  company    : string;
  location   : string;
  linkedinUrl: string;
  source     : LeadSource;
  status     : LeadStatus;
  notes      : string;
  createdAt  : number;
}

export interface ChatMessage {
  id        : string;
  text      : string;
  senderRole: "advisor" | "admin" | "client";
  senderUid : string;
  createdAt : number;
}

export interface ClientThread {
  id         : string;
  clientUid  : string;
  advisorUid : string;
  clientName ?: string;
  lastMessage?: string;
  updatedAt   : number;
}
