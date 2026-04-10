import { useState, useRef } from "react";

const COLORS = {
  bg: "#f8f7f4",
  surface: "#ffffff",
  border: "#e2e0da",
  ink: "#0f0e0c",
  ink2: "#2c2b28",
  muted: "#7a7874",
  gold: "#b8953a",
  goldBg: "#f5edda",
  green: "#1a6b47",
  greenBg: "#e8f5ee",
  blue: "#1a3a6b",
  blueBg: "#e8eef8",
  red: "#8b2020",
};

const initialProfile = {
  firstName: "Sarah",
  lastName: "Chen",
  email: "sarah.chen@email.com",
  phone: "+1 415 555 0192",
  professionalTitle: "Former CFO",
  company: "Stripe",
  location: "San Francisco, CA",
  experience: "20+ years",
  bio: "Helped scale Stripe from Series B to IPO. Expert in building finance teams and fundraising strategies for high-growth startups. Passionate about helping founders navigate the challenges of scaling their businesses.",
  linkedin: "linkedin.com/in/sarahchen",
  twitter: "@sarahchen",
  website: "sarahchen.com",
  videoUrl: "",
  headline: "Former CFO at Stripe · 20+ yrs · Expert in Fundraising & IPO Readiness",
  about: "Helped scale Stripe from Series B to IPO. Expert in building finance teams and fundraising strategies for high-growth startups.",
  industries: "FinTech, SaaS, E-commerce",
  hourlyRate: "450",
  acceptBookings: true,
  roles: ["Advisor", "Board Member"],
  engagementTypes: ["Board Advisory", "Fractional CXO"],
  minEngagement: "No minimum",
  maxClients: "3",
  restrictions: "",
  profileVisibility: "verified",
  anonymousMode: false,
  revealedCompanies: ["TechStart Inc.", "Meridian Ventures"],
  selectedIndustries: ["FinTech", "SaaS", "E-commerce"],
  selectedRoles: ["Advisor", "Board Member"],
  skills: ["Financial Strategy", "Fundraising", "M&A", "IPO Readiness"],
  idVerified: true,
  linkedinConnected: true,
  backgroundCheck: true,
  connectedAccounts: { linkedin: true, github: false, gmail: false },
};

const TABS = [
  { id: "basic", label: "Basic Info", icon: "◉" },
  { id: "expertise", label: "Expertise", icon: "✦" },
  { id: "preferences", label: "Preferences", icon: "⚙" },
  { id: "verification", label: "Verification", icon: "✓" },
  { id: "benefits", label: "Benefits", icon: "◈" },
  { id: "payments", label: "Payments", icon: "$" },
  { id: "social", label: "Social Media", icon: "⇄" },
  { id: "privacy", label: "Privacy", icon: "⊘" },
];

const ALL_INDUSTRIES = ["FinTech", "SaaS", "E-commerce", "Healthcare", "AI/ML", "Consumer", "Enterprise", "Logistics", "EdTech", "Climate"];
const ALL_ROLES = ["Advisor", "Board Member", "Fractional CEO", "Fractional CFO", "Fractional CTO", "Fractional COO", "Fractional CMO", "Fractional CPO", "Mentor", "Coach"];
const ALL_SKILLS_SUGGESTIONS = ["Financial Strategy", "Fundraising", "M&A", "IPO Readiness", "Go-to-Market", "Product Strategy", "Scaling Operations", "People & Culture", "Board Governance", "Capital Markets"];
const ALL_ENG_TYPES = ["Board Advisory", "Fractional CXO", "Project-based", "Consulting", "Mentoring", "Workshops"];
const VIDEO_GUIDELINES = [
  "2 minutes max — founders are busy",
  "Introduce yourself and your background",
  "Describe the type of founder you're best suited for",
  "Mention 1–2 notable outcomes from past engagements",
  "Good lighting, clear audio, professional background",
];

function Btn({ children, onClick, variant = "primary", small, style, disabled }) {
  const base = {
    fontFamily: "inherit", cursor: disabled ? "default" : "pointer", fontWeight: 600,
    fontSize: small ? 13 : 14, borderRadius: 10, padding: small ? "7px 14px" : "11px 20px",
    border: "none", transition: "background 0.15s", opacity: disabled ? 0.5 : 1,
  };
  const styles = {
    primary: { background: COLORS.ink, color: "#fff" },
    ghost: { background: COLORS.surface, color: COLORS.ink2, border: `1.5px solid ${COLORS.border}` },
    danger: { background: "#8b2020", color: "#fff" },
  };
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, ...styles[variant], ...style }}>{children}</button>;
}

function Toggle({ value, onChange }) {
  return (
    <div onClick={() => onChange(!value)} style={{
      width: 44, height: 24, borderRadius: 12, background: value ? COLORS.green : COLORS.border,
      cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 2, left: value ? 22 : 2, width: 20, height: 20,
        borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </div>
  );
}

function Chip({ label, active, onClick, removable }) {
  return (
    <span onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 12px",
      borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", margin: "3px",
      border: `1.5px solid ${active ? COLORS.ink : COLORS.border}`,
      background: active ? COLORS.ink : COLORS.surface,
      color: active ? "#fff" : COLORS.ink2, transition: "all 0.15s",
    }}>
      {active && !removable && <span style={{ fontSize: 11 }}>✓</span>}
      {label}
      {removable && active && <span style={{ fontSize: 12, opacity: 0.7 }}>×</span>}
    </span>
  );
}

function FieldInput({ label, value, onChange, placeholder, type = "text", textarea, half }) {
  return (
    <div style={{ flex: half ? 1 : "unset", marginBottom: 18 }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.ink2, marginBottom: 5 }}>{label}</label>}
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
            width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`,
            borderRadius: 8, fontSize: 14, color: COLORS.ink, background: COLORS.surface,
            outline: "none", resize: "vertical", minHeight: 90, lineHeight: 1.6, fontFamily: "inherit",
          }} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
            width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`,
            borderRadius: 8, fontSize: 14, color: COLORS.ink, background: COLORS.surface, outline: "none",
          }} />
      }
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 16, ...style }}>{children}</div>;
}

function SectionTitle({ title, sub }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function PaidFeatureBanner() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1a1a, #2d2b28)",
      borderRadius: 12, padding: "20px 24px", marginBottom: 20,
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ background: COLORS.gold, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>PRO</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Unlock with a paid plan</span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
          Upgrade to access full payment controls, earnings dashboard, and group legal benefits included with your Advisio membership.
        </div>
      </div>
      <button style={{
        background: COLORS.gold, color: "#fff", border: "none", borderRadius: 10,
        padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
      }}>Upgrade Now →</button>
    </div>
  );
}

function BasicInfoTab({ profile, setProfile }) {
  const [skillInput, setSkillInput] = useState("");

  function getYTEmbed(url) {
    try {
      const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    } catch { return null; }
  }

  const embedUrl = getYTEmbed(profile.videoUrl || "");

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 0 }}>
        <Card>
          <SectionTitle title="Profile Photo" sub="Displayed on your public profile" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%", background: COLORS.ink,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 700, color: "#fff",
            }}>SC</div>
            <Btn variant="ghost" small>Upload New Photo</Btn>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Basic Information" sub="Your name and professional details" />
          <div style={{ display: "flex", gap: 12 }}>
            <FieldInput label="Full Name" value={profile.firstName + " " + profile.lastName} onChange={v => { const [f, ...l] = v.split(" "); setProfile(p => ({ ...p, firstName: f, lastName: l.join(" ") })); }} half />
            <FieldInput label="Email" value={profile.email} onChange={v => setProfile(p => ({ ...p, email: v }))} half />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <FieldInput label="Professional Title" value={profile.professionalTitle} onChange={v => setProfile(p => ({ ...p, professionalTitle: v }))} half />
            <FieldInput label="Company" value={profile.company} onChange={v => setProfile(p => ({ ...p, company: v }))} half />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1, marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.ink2, marginBottom: 5 }}>Location</label>
              <select value={profile.location} onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} style={{
                width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`,
                borderRadius: 8, fontSize: 14, color: COLORS.ink, background: COLORS.surface, outline: "none",
              }}>
                {["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Chicago, IL", "Boston, MA", "Remote"].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.ink2, marginBottom: 5 }}>Experience</label>
              <select value={profile.experience} onChange={e => setProfile(p => ({ ...p, experience: e.target.value }))} style={{
                width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`,
                borderRadius: 8, fontSize: 14, color: COLORS.ink, background: COLORS.surface, outline: "none",
              }}>
                {["0–2 years", "3–5 years", "6–10 years", "11–15 years", "16–20 years", "20+ years"].map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <FieldInput label="Bio" value={profile.bio} onChange={v => setProfile(p => ({ ...p, bio: v }))} textarea />
          <div style={{ textAlign: "right", fontSize: 12, color: COLORS.muted, marginTop: -12 }}>{profile.bio.length}/500 characters</div>
        </Card>
      </div>

      <Card style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <SectionTitle title="🎬 Video Introduction" sub="Advisors with video get 2.4× more session requests from founders" />
          {embedUrl && <span style={{ background: COLORS.greenBg, color: COLORS.green, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Live</span>}
        </div>

        {embedUrl && (
          <div style={{ marginBottom: 16, borderRadius: 10, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
            <iframe
              width="100%" height="220"
              src={embedUrl}
              title="Video intro"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: "block" }}
            />
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <FieldInput
              label="YouTube Video Link (unlisted)"
              value={profile.videoUrl}
              onChange={v => setProfile(p => ({ ...p, videoUrl: v }))}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {profile.videoUrl && !embedUrl && (
              <div style={{ background: "#fef8f0", border: `1px solid #d4b05a`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#7a5c1a", marginTop: -10, marginBottom: 12 }}>
                ⚠ Paste a valid YouTube URL to preview
              </div>
            )}
            <Btn variant="ghost" small onClick={() => {}}>Upload to YouTube (opens new tab) →</Btn>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink, marginBottom: 10 }}>Video guidelines</div>
            {VIDEO_GUIDELINES.map((g, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7, alignItems: "flex-start" }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%", background: COLORS.goldBg,
                  border: `1px solid #d4b05a`, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: "#7a5c1a", flexShrink: 0, marginTop: 1,
                }}>{i + 1}</div>
                <span style={{ fontSize: 13, color: COLORS.ink2, lineHeight: 1.5 }}>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle title="Social Links" sub="Help founders find and verify you" />
        <div style={{ display: "flex", gap: 12 }}>
          <FieldInput label="LinkedIn" value={profile.linkedin} onChange={v => setProfile(p => ({ ...p, linkedin: v }))} placeholder="linkedin.com/in/..." half />
          <FieldInput label="Twitter / X" value={profile.twitter} onChange={v => setProfile(p => ({ ...p, twitter: v }))} placeholder="@handle" half />
          <FieldInput label="Website" value={profile.website} onChange={v => setProfile(p => ({ ...p, website: v }))} placeholder="yoursite.com" half />
        </div>
      </Card>
    </div>
  );
}

function ExpertiseTab({ profile, setProfile }) {
  const [skillInput, setSkillInput] = useState("");

  function toggleItem(field, val) {
    setProfile(p => {
      const arr = p[field] || [];
      return { ...p, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  }

  function addSkill() {
    const v = skillInput.trim();
    if (v && !profile.skills.includes(v)) {
      setProfile(p => ({ ...p, skills: [...p.skills, v] }));
      setSkillInput("");
    }
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card>
          <SectionTitle title="Industries" sub="Select industries where you have expertise" />
          <div>
            {ALL_INDUSTRIES.map(ind => (
              <Chip key={ind} label={ind} active={profile.selectedIndustries.includes(ind)} onClick={() => toggleItem("selectedIndustries", ind)} />
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle title="Roles" sub="What types of engagements are you open to?" />
          <div>
            {ALL_ROLES.map(r => (
              <Chip key={r} label={r} active={profile.selectedRoles.includes(r)} onClick={() => toggleItem("selectedRoles", r)} />
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <SectionTitle title="Skills & Expertise" sub="Add specific skills that you can help founders with" />
        <div style={{ marginBottom: 10 }}>
          {profile.skills.map(s => (
            <Chip key={s} label={s} active removable onClick={() => setProfile(p => ({ ...p, skills: p.skills.filter(x => x !== s) }))} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addSkill()}
            placeholder="Add a skill..."
            style={{
              flex: 1, padding: "10px 14px", border: `1.5px solid ${COLORS.border}`,
              borderRadius: 8, fontSize: 14, color: COLORS.ink, background: COLORS.surface, outline: "none",
            }}
          />
          <button onClick={addSkill} style={{
            width: 38, height: 38, borderRadius: 8, background: COLORS.ink, color: "#fff",
            border: "none", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>+</button>
        </div>
        <div style={{ marginTop: 10 }}>
          {ALL_SKILLS_SUGGESTIONS.filter(s => !profile.skills.includes(s)).slice(0, 5).map(s => (
            <span key={s} onClick={() => setProfile(p => ({ ...p, skills: [...p.skills, s] }))} style={{
              display: "inline-block", fontSize: 12, color: COLORS.muted, padding: "3px 10px",
              border: `1px dashed ${COLORS.border}`, borderRadius: 20, margin: "3px", cursor: "pointer",
            }}>+ {s}</span>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PreferencesTab({ profile, setProfile }) {
  function toggleArr(field, val) {
    setProfile(p => {
      const arr = p[field] || [];
      return { ...p, [field]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  }

  return (
    <div>
      <div style={{ background: COLORS.blueBg, border: `1px solid #b0c4e0`, borderRadius: 10, padding: "12px 16px", fontSize: 13, color: COLORS.blue, marginBottom: 20 }}>
        ℹ These appear on your public profile so the right founders find you. Control your availability and session pricing here.
      </div>

      <Card>
        <SectionTitle title="Availability Status" sub="Control whether founders can book sessions with you" />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>Accept New Bookings</div>
            <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 2 }}>
              {profile.acceptBookings ? "You are currently accepting new session requests" : "You are not accepting new bookings"}
            </div>
          </div>
          <Toggle value={profile.acceptBookings} onChange={v => setProfile(p => ({ ...p, acceptBookings: v }))} />
        </div>
      </Card>

      <Card>
        <SectionTitle title="Hourly Rate" sub="Set your rate for advisory sessions" />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: COLORS.muted }}>$</span>
          <input
            type="number"
            value={profile.hourlyRate}
            onChange={e => setProfile(p => ({ ...p, hourlyRate: e.target.value }))}
            style={{
              width: 120, padding: "10px 14px", border: `1.5px solid ${COLORS.border}`,
              borderRadius: 8, fontSize: 22, fontWeight: 700, color: COLORS.ink,
              background: COLORS.surface, outline: "none",
            }}
          />
          <span style={{ fontSize: 14, color: COLORS.muted }}> / hour</span>
        </div>
        <div style={{ fontSize: 13, color: COLORS.muted }}>
          Advisio takes a 15% platform fee. You'll receive <strong style={{ color: COLORS.ink }}>
            ${Math.round(parseFloat(profile.hourlyRate || 0) * 0.85)}
          </strong> per hour.
        </div>
      </Card>

      <Card>
        <SectionTitle title="Engagement Preferences" sub="C-Level roles and engagement types you offer" />
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink2, marginBottom: 8 }}>C-Level roles you offer</div>
          {["CEO", "CFO", "COO", "CTO", "CMO", "CHRO", "CSO", "CPO"].map(r => (
            <Chip key={r} label={r} active={profile.roles.includes(r)} onClick={() => toggleArr("roles", r)} />
          ))}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink2, marginBottom: 8 }}>Engagement types</div>
          {ALL_ENG_TYPES.map(t => (
            <Chip key={t} label={t} active={profile.engagementTypes.includes(t)} onClick={() => toggleArr("engagementTypes", t)} />
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle title="Capacity Limits" sub="Set your availability constraints" />
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.ink2, marginBottom: 5 }}>Minimum engagement</label>
            <select value={profile.minEngagement} onChange={e => setProfile(p => ({ ...p, minEngagement: e.target.value }))} style={{
              width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`,
              borderRadius: 8, fontSize: 14, color: COLORS.ink, background: COLORS.surface, outline: "none",
            }}>
              {["No minimum", "1 month", "3 months", "6 months", "12 months"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.ink2, marginBottom: 5 }}>Max active clients</label>
            <select value={profile.maxClients} onChange={e => setProfile(p => ({ ...p, maxClients: e.target.value }))} style={{
              width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`,
              borderRadius: 8, fontSize: 14, color: COLORS.ink, background: COLORS.surface, outline: "none",
            }}>
              {["1", "2", "3", "4", "5", "6+"].map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        </Card>
        <Card>
          <SectionTitle title="Restrictions" sub="Industries or companies you won't work with" />
          <textarea
            value={profile.restrictions}
            onChange={e => setProfile(p => ({ ...p, restrictions: e.target.value }))}
            placeholder="e.g. I don't work with gambling or tobacco companies…"
            style={{
              width: "100%", padding: "10px 14px", border: `1.5px solid ${COLORS.border}`,
              borderRadius: 8, fontSize: 14, color: COLORS.ink, background: COLORS.surface,
              outline: "none", resize: "vertical", minHeight: 100, lineHeight: 1.6, fontFamily: "inherit",
            }}
          />
        </Card>
      </div>
    </div>
  );
}

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: "Patrick Collison",
    title: "CEO & Co-Founder",
    company: "Stripe",
    initials: "PC",
    color: "#635bff",
    relationship: "Direct colleague · 6 years",
    verified: true,
    rating: 5,
    text: "Sarah was instrumental in taking Stripe through our Series B all the way to IPO readiness. Her command of financial infrastructure, investor relations, and cross-functional team-building is genuinely rare. She built our finance org from 4 to 60+ people without losing an ounce of precision. Any founder would be lucky to have her in their corner.",
    impact: ["$2.4B Series H fundraise", "IPO readiness program", "Finance org scaled 15×"],
    date: "March 2024",
    public: true,
  },
  {
    id: 2,
    name: "Claire Hughes Johnson",
    title: "Former COO",
    company: "Stripe",
    initials: "CH",
    color: "#0f6e56",
    relationship: "Direct colleague · 5 years",
    verified: true,
    rating: 5,
    text: "I've worked alongside Sarah through some of the most intense scaling periods any company can face. She has an extraordinary ability to hold the strategic picture while staying ruthlessly precise on the numbers. Her work on our M&A playbook and financial controls gave us a foundation that still holds up today.",
    impact: ["M&A playbook", "Financial controls overhaul", "Global treasury setup"],
    date: "January 2024",
    public: true,
  },
  {
    id: 3,
    name: "Keith Rabois",
    title: "General Partner",
    company: "Founders Fund",
    initials: "KR",
    color: "#3c3489",
    relationship: "Board relationship · 4 years",
    verified: true,
    rating: 5,
    text: "As a board member I've seen many CFOs. Sarah is top-decile — clear thinking, zero spin, and a genuine ability to translate complex financials into strategy the whole leadership team can act on. She'll tell you what you need to hear, not what you want to hear. That's invaluable.",
    impact: ["Board reporting redesign", "Investor narrative", "Fundraising strategy"],
    date: "November 2023",
    public: false,
  },
];

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < count ? "#b8953a" : "#e2e0da"}>
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.436.59 3.438L7 8.77l-3.09 1.74.59-3.44L2 4.635l3.455-.505L7 1z" />
        </svg>
      ))}
    </div>
  );
}

function VerificationTab({ profile }) {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: "", title: "", company: "", email: "", linkedin: "" });
  const [inviteSent, setInviteSent] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const steps = [
    { label: "Email verified", done: true },
    { label: "LinkedIn connected", done: profile.linkedinConnected },
    { label: "ID verification", done: profile.idVerified },
    { label: "Background check", done: profile.backgroundCheck },
  ];
  const badges = [
    { label: "Verified Expert", sub: "Identity and experience verified", done: true },
    { label: "Top Rated", sub: "Maintained 4.8+ rating", done: true },
    { label: "Quick Responder", sub: "Responds within 24 hours", done: true },
    { label: "Super Advisor", sub: "Complete 50+ sessions", done: false },
  ];

  function handleSendInvite() {
    if (!inviteForm.name || !inviteForm.email) return;
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setShowInviteForm(false);
      setInviteForm({ name: "", title: "", company: "", email: "", linkedin: "" });
    }, 2200);
  }

  function togglePublic(id) {
    setTestimonials(ts => ts.map(t => t.id === id ? { ...t, public: !t.public } : t));
  }

  function removeTestimonial(id) {
    setTestimonials(ts => ts.filter(t => t.id !== id));
  }

  const publicCount = testimonials.filter(t => t.public).length;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card>
          <SectionTitle title="Verification Status" sub="Verified profiles get more visibility and trust" />
          <div style={{ background: COLORS.greenBg, border: `1px solid #b6ddc8`, borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.green, marginBottom: 2 }}>✓ Profile Verified</div>
            <div style={{ fontSize: 13, color: COLORS.green, opacity: 0.85 }}>Your identity and experience have been verified</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.ink, marginBottom: 12 }}>Verification Steps</div>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: s.done ? COLORS.greenBg : COLORS.border,
                border: `1.5px solid ${s.done ? "#b6ddc8" : COLORS.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, color: s.done ? COLORS.green : COLORS.muted, fontWeight: 700, flexShrink: 0,
              }}>{s.done ? "✓" : "○"}</div>
              <span style={{ fontSize: 14, color: s.done ? COLORS.ink : COLORS.muted }}>{s.label}</span>
            </div>
          ))}
        </Card>

        <Card>
          <SectionTitle title="Trust Badges" sub="Badges that appear on your public profile" />
          {badges.map((b, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
              borderBottom: i < badges.length - 1 ? `1px solid ${COLORS.border}` : "none",
              opacity: b.done ? 1 : 0.45,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: b.done ? COLORS.greenBg : COLORS.border,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, color: b.done ? COLORS.green : COLORS.muted, flexShrink: 0,
              }}>{b.done ? "✓" : "○"}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: b.done ? COLORS.ink : COLORS.muted }}>{b.label}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* References & Testimonials */}
      <Card style={{ marginBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink, marginBottom: 3 }}>References & Testimonials</div>
            <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.5 }}>
              Verified endorsements from C-level peers and collaborators · shown on your public profile
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>{publicCount} public</div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>{testimonials.length} total</div>
            </div>
            <button onClick={() => setShowInviteForm(v => !v)} style={{
              background: COLORS.ink, color: "#fff", border: "none", borderRadius: 8,
              padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>+ Request Reference</button>
          </div>
        </div>

        {/* Invite form */}
        {showInviteForm && (
          <div style={{
            background: COLORS.bg, border: `1.5px solid ${COLORS.border}`, borderRadius: 10,
            padding: "20px", marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>Invite someone to write a testimonial</div>
            <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 16, lineHeight: 1.5 }}>
              We'll send them a structured prompt asking about your executive impact, leadership style, and outcomes delivered.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              {[
                { key: "name", label: "Full name", placeholder: "Patrick Collison" },
                { key: "title", label: "Their title", placeholder: "CEO & Co-Founder" },
                { key: "company", label: "Company", placeholder: "Stripe" },
                { key: "email", label: "Email address", placeholder: "patrick@stripe.com" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.ink2, marginBottom: 4 }}>{f.label}</label>
                  <input
                    value={inviteForm[f.key]}
                    onChange={e => setInviteForm(v => ({ ...v, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{
                      width: "100%", padding: "9px 12px", border: `1.5px solid ${COLORS.border}`,
                      borderRadius: 8, fontSize: 13, color: COLORS.ink, background: COLORS.surface, outline: "none",
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.ink2, marginBottom: 4 }}>LinkedIn profile (optional)</label>
              <input
                value={inviteForm.linkedin}
                onChange={e => setInviteForm(v => ({ ...v, linkedin: e.target.value }))}
                placeholder="https://linkedin.com/in/..."
                style={{
                  width: "100%", padding: "9px 12px", border: `1.5px solid ${COLORS.border}`,
                  borderRadius: 8, fontSize: 13, color: COLORS.ink, background: COLORS.surface, outline: "none",
                }}
              />
            </div>
            <div style={{ background: COLORS.goldBg, border: `1px solid #d4b05a`, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#7a5c1a", marginBottom: 16 }}>
              ✦ We prompt them to speak to: specific outcomes, your leadership style, and the type of founder you work best with.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowInviteForm(false)} style={{
                padding: "9px 18px", border: `1.5px solid ${COLORS.border}`, borderRadius: 8,
                background: COLORS.surface, fontSize: 13, fontWeight: 600, cursor: "pointer", color: COLORS.ink2,
              }}>Cancel</button>
              <button onClick={handleSendInvite} disabled={!inviteForm.name || !inviteForm.email} style={{
                padding: "9px 20px", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                background: inviteForm.name && inviteForm.email ? COLORS.ink : COLORS.border,
                color: inviteForm.name && inviteForm.email ? "#fff" : COLORS.muted,
                flex: 1,
              }}>
                {inviteSent ? "✓ Request sent!" : "Send Reference Request →"}
              </button>
            </div>
          </div>
        )}

        {/* Stats bar */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
          background: COLORS.border, borderRadius: 10, overflow: "hidden", marginBottom: 20,
        }}>
          {[
            { label: "Avg. rating", value: "5.0 ★" },
            { label: "Verified refs", value: `${testimonials.filter(t => t.verified).length}` },
            { label: "C-level peers", value: `${testimonials.length}` },
          ].map((s, i) => (
            <div key={i} style={{ background: COLORS.surface, padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.ink }}>{s.value}</div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {testimonials.map(t => {
            const expanded = expandedId === t.id;
            const shortText = t.text.length > 180 ? t.text.slice(0, 180) + "…" : t.text;
            return (
              <div key={t.id} style={{
                border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden",
                transition: "box-shadow 0.15s",
              }}>
                {/* Header */}
                <div style={{ padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 12, background: t.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, fontWeight: 700, color: "#fff", flexShrink: 0, letterSpacing: "0.5px",
                  }}>{t.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink }}>{t.name}</span>
                      {t.verified && (
                        <span style={{ background: COLORS.greenBg, color: COLORS.green, fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, letterSpacing: "0.03em" }}>
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 6 }}>{t.title} · {t.company}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <StarRating count={t.rating} />
                      <span style={{ fontSize: 11, color: COLORS.muted }}>·</span>
                      <span style={{ fontSize: 12, color: COLORS.muted }}>{t.relationship}</span>
                      <span style={{ fontSize: 11, color: COLORS.muted }}>·</span>
                      <span style={{ fontSize: 12, color: COLORS.muted }}>{t.date}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                    <button onClick={() => togglePublic(t.id)} style={{
                      padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none",
                      background: t.public ? COLORS.greenBg : COLORS.bg,
                      color: t.public ? COLORS.green : COLORS.muted,
                    }}>{t.public ? "● Public" : "○ Hidden"}</button>
                    <button onClick={() => removeTestimonial(t.id)} style={{
                      width: 28, height: 28, borderRadius: 6, border: `1px solid ${COLORS.border}`,
                      background: COLORS.surface, color: COLORS.muted, fontSize: 14, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>×</button>
                  </div>
                </div>

                {/* Quote body */}
                <div style={{ padding: "0 20px 16px", borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
                  <div style={{
                    borderLeft: `3px solid ${t.color}`, paddingLeft: 14, marginBottom: 12,
                    color: COLORS.ink2, fontSize: 14, lineHeight: 1.7, fontStyle: "italic",
                  }}>
                    "{expanded ? t.text : shortText}"
                  </div>
                  {t.text.length > 180 && (
                    <button onClick={() => setExpandedId(expanded ? null : t.id)} style={{
                      background: "none", border: "none", fontSize: 12, fontWeight: 600,
                      color: COLORS.gold, cursor: "pointer", padding: 0, marginBottom: 12,
                    }}>{expanded ? "Show less ↑" : "Read full testimonial ↓"}</button>
                  )}

                  {/* Impact tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {t.impact.map((imp, j) => (
                      <span key={j} style={{
                        display: "inline-block", padding: "3px 10px",
                        background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                        borderRadius: 20, fontSize: 12, color: COLORS.ink2, fontWeight: 500,
                      }}>✦ {imp}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty / add more nudge */}
        <button onClick={() => setShowInviteForm(true)} style={{
          width: "100%", marginTop: 14, padding: "13px",
          border: `1.5px dashed ${COLORS.border}`, borderRadius: 10, background: "none",
          fontSize: 14, fontWeight: 600, color: COLORS.muted, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <span style={{ fontSize: 18, fontWeight: 400 }}>+</span>
          Request another reference from a C-level peer
        </button>
      </Card>
    </div>
  );
}

function BenefitsTab() {
  const benefits = [
    {
      title: "Professional Liability",
      sub: "Errors & omissions protection for advisory engagements",
      via: "via Advised Insurance Group",
      color: "#1a3a6b",
      colorBg: "#e8eef8",
      icon: "⊕",
      bullets: [
        "Covers claims arising from advice given during paid sessions",
        "Defense costs included even if allegations are unfounded",
        "Retroactive coverage for past 12 months of advisory work",
        "Per-claim and aggregate limits with no deductible for first claim",
      ],
      limit: "Up to $1,000,000 per claim · $2,000,000 aggregate annually",
    },
    {
      title: "Contract Dispute Resolution",
      sub: "Expert legal support if an engagement agreement is contested",
      via: "via LegalShield for Business",
      color: "#4a1b6b",
      colorBg: "#f0e8f8",
      icon: "⊟",
      bullets: [
        "Attorney review of your advisory agreements before signing",
        "Representation in disputes over payment, scope, or termination",
        "Demand letter drafting and negotiation on your behalf",
        "Mediation and arbitration support up to covered limit",
      ],
      limit: "Up to $50,000 per dispute · 3 matters per policy year",
    },
    {
      title: "IP Protection",
      sub: "Protect your frameworks, methodologies, and proprietary content",
      via: "via IPGuard Partners",
      color: "#1a6b3a",
      colorBg: "#e8f5ee",
      icon: "⊛",
      bullets: [
        "Register and document proprietary frameworks and tools",
        "IP ownership clauses included in all engagement agreements",
        "Alert monitoring for unauthorized use of your materials",
        "Legal recourse if IP is infringed by clients or third parties",
      ],
      limit: "Up to $25,000 per IP claim · Unlimited registrations",
    },
    {
      title: "Business Interruption",
      sub: "Income protection if you're unable to fulfil advisory commitments",
      via: "via Prudential Business Shield",
      color: "#6b3a1a",
      colorBg: "#f5edda",
      icon: "⊙",
      bullets: [
        "Coverage for medical events that prevent advisory delivery",
        "Up to 3 months income replacement based on trailing revenue",
        "30-day waiting period, then monthly disbursements",
        "Covers scheduled sessions, retainers, and board commitments",
      ],
      limit: "Up to $15,000/month · 3 months maximum",
    },
  ];

  return (
    <div>
      <PaidFeatureBanner />
      <div style={{ position: "relative", pointerEvents: "none", opacity: 0.4, filter: "grayscale(0.3)" }}>
        <div style={{
          background: COLORS.goldBg, border: `1px solid #d4b05a`, borderRadius: 12,
          padding: "14px 20px", marginBottom: 16,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#7a5c1a" }}>Group Legal Coverage</div>
            <div style={{ fontSize: 13, color: "#7a5c1a", opacity: 0.8 }}>Included with your Advisio membership · No additional cost · 0 of 4 coverages active</div>
          </div>
          <span style={{ background: "#d4b05a", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>4 coverages not yet activated</span>
        </div>
        {benefits.map((b, i) => (
          <div key={i} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "20px 24px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, background: b.colorBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, color: b.color, flexShrink: 0,
                }}>{b.icon}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink }}>{b.title}</div>
                  <div style={{ fontSize: 13, color: COLORS.muted }}>{b.sub}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{b.via}</div>
                </div>
              </div>
              <button style={{
                background: b.color, color: "#fff", border: "none", borderRadius: 8,
                padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0,
              }}>Activate Coverage</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14 }}>
              {b.bullets.map((bl, j) => (
                <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", background: COLORS.border, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0, marginTop: 1 }}>○</span>
                  <span style={{ fontSize: 13, color: COLORS.ink2, lineHeight: 1.5 }}>{bl}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted }}>Coverage limit</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>{b.limit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsTab() {
  return (
    <div>
      <PaidFeatureBanner />
      <div style={{ position: "relative", pointerEvents: "none", opacity: 0.38, filter: "grayscale(0.3)" }}>
        <div style={{
          background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12,
          padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#635bff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 14 }}>S</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, display: "flex", alignItems: "center", gap: 8 }}>
                Stripe Connected
                <span style={{ background: COLORS.greenBg, color: COLORS.green, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>Verified</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>acct_1Abc–XYZ · sarah.chen@stripe.com · Payouts enabled</div>
            </div>
          </div>
          <button style={{ padding: "7px 14px", border: `1.5px solid ${COLORS.border}`, borderRadius: 8, background: COLORS.surface, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Manage in Stripe →</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
          {[
            { label: "Total Earned", value: "$1,530.00", sub: "After platform fees", color: COLORS.green },
            { label: "In Escrow", value: "$956.25", sub: "Awaiting release", color: "#b8953a" },
            { label: "Next Payout", value: "$382.50", sub: "Scheduled Friday", color: COLORS.blue },
            { label: "Platform Fees", value: "$438.75", sub: "15% of gross", color: COLORS.ink },
          ].map((m, i) => (
            <div key={i} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted, marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: m.color }}>{m.value}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        <Card>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink, marginBottom: 4 }}>How Advisio Payments Work</div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 20 }}>Powered by Stripe — your payments are secured, automated, and compliant.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {[
              { step: 1, title: "Client Books & Pays", desc: "Startup pays via Stripe Checkout. Funds held in escrow." },
              { step: 2, title: "Session Delivered", desc: "You complete the advisory session. Advisio confirms automatically." },
              { step: 3, title: "Funds Released", desc: "After 48-hour review, escrow releases. 15% fee deducted." },
              { step: 4, title: "Payout to Bank", desc: "Net earnings hit your bank on weekly, bi-weekly, or monthly schedule." },
            ].map(s => (
              <div key={s.step} style={{ textAlign: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.bg, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 18 }}>
                  {["🗓", "📅", "🔒", "🏦"][s.step - 1]}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gold, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Step {s.step}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function SocialTab({ profile, setProfile }) {
  const platforms = [
    { id: "linkedin", label: "LinkedIn", icon: "in", color: "#0077b5", desc: "Import profile & experience" },
    { id: "twitter", label: "Twitter / X", icon: "𝕏", color: "#000", desc: "Link your professional presence" },
    { id: "github", label: "GitHub", icon: "⌥", color: "#24292e", desc: "Showcase technical work" },
    { id: "gmail", label: "Gmail", icon: "M", color: "#ea4335", desc: "Send reference requests" },
  ];
  return (
    <div>
      <Card>
        <SectionTitle title="Linked Accounts" sub="Connect your professional networks to build credibility" />
        {platforms.map(p => {
          const connected = profile.connectedAccounts[p.id];
          return (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 0",
              borderBottom: `1px solid ${COLORS.border}`,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: p.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, fontWeight: 800, color: "#fff", flexShrink: 0,
              }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.ink }}>{p.label}</div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{p.desc}</div>
              </div>
              {connected
                ? <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.green }}>✓ Connected</span>
                    <button onClick={() => setProfile(pr => ({ ...pr, connectedAccounts: { ...pr.connectedAccounts, [p.id]: false } }))}
                      style={{ background: "none", border: "none", fontSize: 11, color: COLORS.muted, cursor: "pointer", textDecoration: "underline" }}>
                      Disconnect
                    </button>
                  </div>
                : <Btn small variant="ghost" onClick={() => setProfile(pr => ({ ...pr, connectedAccounts: { ...pr.connectedAccounts, [p.id]: true } }))}>Connect</Btn>
              }
            </div>
          );
        })}
      </Card>

      <Card>
        <SectionTitle title="Social Media Brand" sub="Your public presence on professional networks" />
        <FieldInput label="LinkedIn Headline" value={profile.headline || ""} onChange={v => setProfile(p => ({ ...p, headline: v }))} placeholder="Former CFO · Stripe · IPO Expert" />
        <FieldInput label="About (shown publicly)" value={profile.about || ""} onChange={v => setProfile(p => ({ ...p, about: v }))} textarea placeholder="2–3 sentences about what you do and who you help best…" />
      </Card>
    </div>
  );
}

function PrivacyTab({ profile, setProfile }) {
  const VISIBILITY_OPTIONS = [
    { id: "public", label: "Full Public", sub: "Anyone can find and view your profile", tag: "High exposure", tagColor: "#8b2020", tagBg: "#fce8e8" },
    { id: "verified", label: "Verified Companies Only", sub: "Only Advisio-verified businesses can see your full profile", tag: "Recommended", tagColor: COLORS.green, tagBg: COLORS.greenBg },
    { id: "invite", label: "Invite-Only", sub: "Completely private — only people you invite can view your profile", tag: "Maximum privacy", tagColor: COLORS.blue, tagBg: COLORS.blueBg },
  ];
  return (
    <div>
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink }}>🎭 Anonymous Search Identity</div>
            <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 2, lineHeight: 1.5, maxWidth: 500 }}>
              Appear in search results under a pseudonym so companies can't identify you until you choose to reveal your real profile.
            </div>
          </div>
          <Toggle value={profile.anonymousMode} onChange={v => setProfile(p => ({ ...p, anonymousMode: v }))} />
        </div>
        <div style={{
          background: profile.anonymousMode ? COLORS.surface : COLORS.bg,
          border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "16px 18px", marginTop: 14,
          opacity: profile.anonymousMode ? 1 : 0.5,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>YOUR PSEUDONYM</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.ink, marginBottom: 4, fontFamily: "monospace" }}>Advisor_SC_7482</div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 14 }}>
            {profile.anonymousMode ? "Active — companies see this name instead of yours" : "Enable anonymous mode above to activate your pseudonym."}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink, marginBottom: 8 }}>Companies You've Revealed Your Identity To</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {profile.revealedCompanies.map(c => (
              <span key={c} style={{
                display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px",
                background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 20, fontSize: 13, fontWeight: 500,
              }}>
                {c}
                <button onClick={() => setProfile(p => ({ ...p, revealedCompanies: p.revealedCompanies.filter(x => x !== c) }))}
                  style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 14, padding: 0 }}>×</button>
              </span>
            ))}
            <span style={{
              display: "inline-flex", alignItems: "center", padding: "4px 12px",
              border: `1px dashed ${COLORS.border}`, borderRadius: 20, fontSize: 13, color: COLORS.muted, cursor: "pointer",
            }}>+ Reveal identity to a company</span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle title="👁 Profile Visibility" sub="Control exactly who can discover and view your full profile. Your fractional engagements stay private unless you decide otherwise." />
        {VISIBILITY_OPTIONS.map(opt => (
          <div key={opt.id} onClick={() => setProfile(p => ({ ...p, profileVisibility: opt.id }))} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
            border: `${profile.profileVisibility === opt.id ? "2px" : "1px"} solid ${profile.profileVisibility === opt.id ? COLORS.ink : COLORS.border}`,
            borderRadius: 10, marginBottom: 10, cursor: "pointer",
            background: profile.profileVisibility === opt.id ? "#fafaf8" : COLORS.surface,
            transition: "all 0.15s",
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              border: `2px solid ${profile.profileVisibility === opt.id ? COLORS.ink : COLORS.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {profile.profileVisibility === opt.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.ink }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>{opt.sub}</div>
            </div>
            <span style={{ background: opt.tagBg, color: opt.tagColor, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, flexShrink: 0 }}>{opt.tag}</span>
          </div>
        ))}
        <div style={{ background: COLORS.blueBg, border: `1px solid #b0c4e0`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: COLORS.blue, marginTop: 4 }}>
          ℹ Current setting: <strong>{VISIBILITY_OPTIONS.find(o => o.id === profile.profileVisibility)?.label}</strong> — {VISIBILITY_OPTIONS.find(o => o.id === profile.profileVisibility)?.sub}
        </div>
      </Card>
    </div>
  );
}

export default function AdvisioMyProfile() {
  const [activeTab, setActiveTab] = useState("basic");
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const completionPct = 95;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'Instrument Sans', system-ui, sans-serif" }}>
      {/* Topbar */}
      <div style={{
        background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`,
        padding: "0 24px", height: 56, display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, background: COLORS.ink, borderRadius: 7,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
              <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.5" />
              <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.5" />
              <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: 17, fontWeight: 700, color: COLORS.ink, letterSpacing: "-0.3px" }}>Advisio</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Btn variant="ghost" small>⊙ Preview Profile</Btn>
          <Btn small onClick={handleSave} style={{ background: saved ? COLORS.green : COLORS.ink }}>
            {saved ? "✓ Saved!" : "⊡ Save Changes"}
          </Btn>
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: 1100, margin: "0 auto", padding: "24px 20px", gap: 24, alignItems: "flex-start" }}>
        {/* Sidebar */}
        <div style={{
          width: 200, flexShrink: 0, background: COLORS.surface,
          border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 8,
          position: "sticky", top: 72,
        }}>
          <div style={{ padding: "10px 14px 6px", marginBottom: 6 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: COLORS.ink, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>SC</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.ink }}>Sarah Chen</div>
            <div style={{ fontSize: 12, color: COLORS.muted }}>Advisor</div>
          </div>
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 8, marginBottom: 8 }} />
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px",
              borderRadius: 8, border: "none", background: activeTab === tab.id ? "#f0ede6" : "none",
              cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? COLORS.ink : COLORS.ink2, transition: "background 0.15s", marginBottom: 2,
            }}>
              <span style={{ fontSize: 13, width: 16, textAlign: "center" }}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: COLORS.ink }} />}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Completion banner */}
          <div style={{
            background: COLORS.goldBg, border: `1px solid #d4b05a`, borderRadius: 12,
            padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 16,
          }}>
            <span style={{ fontSize: 18 }}>⚠</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#7a5c1a", marginBottom: 2 }}>Complete Your Profile</div>
              <div style={{ fontSize: 13, color: "#7a5c1a", opacity: 0.9 }}>
                Your profile is {completionPct}% complete. Complete profiles get 3× more bookings.
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setActiveTab("basic")} style={{
                padding: "6px 14px", border: `1px solid #d4b05a`, borderRadius: 8,
                background: "none", fontSize: 13, fontWeight: 600, color: "#7a5c1a", cursor: "pointer",
              }}>Add profile photo</button>
              <button onClick={() => setActiveTab("expertise")} style={{
                padding: "6px 14px", border: `1px solid #d4b05a`, borderRadius: 8,
                background: "none", fontSize: 13, fontWeight: 600, color: "#7a5c1a", cursor: "pointer",
              }}>Add more skills</button>
            </div>
          </div>

          {/* Tab header */}
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: COLORS.ink, margin: 0 }}>My Profile</h1>
            <div style={{ fontSize: 14, color: COLORS.muted, marginTop: 2 }}>Manage your public profile and preferences</div>
          </div>

          {/* Horizontal tab bar */}
          <div style={{
            display: "flex", gap: 2, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24,
            overflowX: "auto", paddingBottom: 0,
          }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: "10px 16px", border: "none", background: "none", cursor: "pointer",
                fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? COLORS.ink : COLORS.muted,
                borderBottom: `2px solid ${activeTab === tab.id ? COLORS.ink : "transparent"}`,
                marginBottom: -1, whiteSpace: "nowrap", transition: "all 0.15s",
              }}>{tab.label}</button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "basic" && <BasicInfoTab profile={profile} setProfile={setProfile} />}
          {activeTab === "expertise" && <ExpertiseTab profile={profile} setProfile={setProfile} />}
          {activeTab === "preferences" && <PreferencesTab profile={profile} setProfile={setProfile} />}
          {activeTab === "verification" && <VerificationTab profile={profile} />}
          {activeTab === "benefits" && <BenefitsTab />}
          {activeTab === "payments" && <PaymentsTab />}
          {activeTab === "social" && <SocialTab profile={profile} setProfile={setProfile} />}
          {activeTab === "privacy" && <PrivacyTab profile={profile} setProfile={setProfile} />}
        </div>
      </div>
    </div>
  );
}
