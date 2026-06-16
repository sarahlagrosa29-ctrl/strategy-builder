import { useState, useCallback, useRef, useEffect, useContext, createContext } from "react";

// Print context: when true, all Collapse sections render open for PDF export
const PrintContext = createContext(false);

// ═══════════════════════════════════════════
// MAVERICKS MARKETING PLAN GENERATOR V3
// Premium Edition
// ═══════════════════════════════════════════

// ── MAVERICKS COLOR SYSTEM ──
const LOGO_B64 = "data:image/png;base64,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";

const C = {
  bg: "#faf7f1", pageBg: "#efe9df", navBar: "#2a2520",
  accent: "#e0631c", heading: "#2a2520",
  text: "#2d2823", textSoft: "#6b635a", textDim: "#a89f92",
  card: "#fffefb", cardBorder: "rgba(80,65,45,0.08)",
  inputBg: "#fffefb", separator: "rgba(80,65,45,0.07)",
  userBubble: "#e0631c", themBubble: "#efe9df",
  green: "#5a9367", greenBg: "rgba(90,147,103,0.1)",
  red: "#c0593f", redBg: "rgba(192,89,63,0.1)",
  yellow: "#c89a3c", purple: "#8a7299",
  // compat aliases
  navy: "#2d2823", gold: "#bd8a3a", goldLight: "rgba(189,138,58,0.09)",
  teal: "#5a9367", tealLight: "rgba(90,147,103,0.09)",
  coral: "#cc7849", coralLight: "rgba(204,120,73,0.09)",
  purpleLight: "rgba(138,114,153,0.09)",
  gray: "#8a8175", grayLight: "#f3eee5",
  border: "rgba(80,65,45,0.08)", warmGray: "#6b635a",
  charcoal: "#2a2520", ivory: "#fffefb",
  orange: "#e0631c", orangeLight: "rgba(224,99,28,0.08)",
  greenLight: "rgba(90,147,103,0.09)",
};
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,'Helvetica Neue',Helvetica,Arial,sans-serif";

// ── ICON (simple, token-based) ──
function Icon3D({ emoji, color, size = 48 }) {
  return (
    <span style={{ fontSize: size * 0.5 }}>{emoji}</span>
  );
}

// ── CSS ANIMATIONS (injected once) ──
const ANIM_CSS = `
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
@keyframes scaleIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
@keyframes spin { to{transform:rotate(360deg)} }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
@keyframes glow { 0%,100%{box-shadow:0 0 0 0 rgba(224,99,28,0)} 50%{box-shadow:0 0 0 6px rgba(224,99,28,0.12)} }
* { box-sizing: border-box; }
.mav-card { transition: transform .15s ease, box-shadow .25s ease; }
.mav-card:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(80,65,45,0.1) !important; }
.mav-card:active { transform: scale(0.985); }
.mav-fadeup { animation: fadeUp .4s ease both; }
.mav-fadeup-1 { animation: fadeUp .4s ease .1s both; }
.mav-fadeup-2 { animation: fadeUp .4s ease .2s both; }
.mav-fadeup-3 { animation: fadeUp .4s ease .3s both; }
::selection { background: rgba(224,99,28,0.14); }
input, textarea { transition: border-color .2s, box-shadow .2s; }
input:focus, textarea:focus { border-color: #e0631c !important; box-shadow: 0 0 0 3px rgba(224,99,28,0.08) !important; outline: none; }
button { transition: all .15s ease; }
button:active:not(:disabled) { transform: scale(0.97); }
`;

// ── WIZARD STEPS ──
const WIZARD_STEPS = [
  { id: "welcome", label: "Start", icon: "" },
  { id: "marketing101", label: "Marketing 101", icon: "" },
  { id: "research101", label: "Research", icon: "" },
  { id: "goal", label: "Goal", icon: "" },
  { id: "timeline", label: "Timeline", icon: "" },
  { id: "niche", label: "Audience", icon: "" },
  { id: "story", label: "Story", icon: "" },
  { id: "branddna", label: "Voice", icon: "" },
  { id: "resources", label: "Resources", icon: "" },
  { id: "channel", label: "Strategy", icon: "" },
  { id: "converter", label: "Converter", icon: "" },
  { id: "research", label: "Engine", icon: "" },
  { id: "plan", label: "Your Plan", icon: "" },
];

// ── CHANNEL DATA ──
const CHANNELS = {
  conservative: {
    label: "Conservative",
    tag: "Quick Start",
    desc: "Outreach + FAST Links",
    components: ["Direct Outreach (FB or LinkedIn DMs)", "Rolling List", "FAST Links"],
    effort: "5 to 7 hrs/week",
    difficulty: "Easiest to start. Hardest to sustain.",
    firstLead: "7 to 14 days",
    leadQuality: "Mixed. Cold outreach = lower trust.",
    compounds: "No. You stop, leads stop. Your list runs out unless you replace daily.",
    color: C.teal,
  },
  standard_digital: {
    label: "Standard (Digital)",
    tag: "Steady Builder",
    desc: "Outreach + Facebook Page + Content + FAST Links",
    components: ["Direct Outreach", "Facebook Page", "FB Content (3 to 5x/week)", "FAST Links"],
    effort: "8 to 12 hrs/week",
    difficulty: "Moderate. Learning content creation + staying consistent.",
    firstLead: "14 to 30 days",
    leadQuality: "Warm. Content builds familiarity before the conversation.",
    compounds: "Yes. Content works while you sleep. Outreach fills the gap while content ramps.",
    color: C.coral,
  },
  standard_nondigital: {
    label: "Standard (Non Digital)",
    tag: "In Person Builder",
    desc: "Outreach + Networking/Meetups + FAST Links",
    components: ["Direct Outreach", "Networking Events", "Business Card Follow Up System", "FAST Links"],
    effort: "8 to 12 hrs/week",
    difficulty: "Moderate. Requires showing up consistently and being comfortable in rooms.",
    firstLead: "14 to 21 days",
    leadQuality: "Warm. Face to face builds trust faster than any screen.",
    compounds: "Partially. Relationships compound. But you must keep showing up.",
    color: C.gold,
  },
  aggressive_youtube: {
    label: "Aggressive (YouTube)",
    tag: "Authority Builder",
    desc: "YouTube + FB Page + Content + FAST Links",
    components: ["YouTube (1 video per week, consistency over volume)", "Facebook Page", "Cross platform Content", "FAST Links"],
    effort: "12 to 18 hrs/week",
    difficulty: "Hardest upfront. Camera, scripting, editing, SEO. Gets easier fast.",
    firstLead: "30 to 45 days",
    leadQuality: "Highest. They watched you for 10+ minutes. Pre sold before the call.",
    compounds: "Strongest compounding asset. Videos from Month 1 still generate leads in Year 3.",
    color: C.purple,
  },
  aggressive_community: {
    label: "Aggressive (Community)",
    tag: "Community Builder",
    desc: "Facebook Group + Lives + Content + FAST Links",
    components: ["Facebook Group", "Weekly FB Lives (minimum)", "Content Engine", "FAST Links"],
    effort: "10 to 15 hrs/week",
    difficulty: "Emotionally demanding. You must show up live and engage consistently.",
    firstLead: "21 to 35 days",
    leadQuality: "High. Group members feel like they know you personally.",
    compounds: "Yes. You own the audience. No algorithm can take it away.",
    color: C.orange,
  },
};

// ── SHARED UI COMPONENTS ──
function Card({ children, accent, style }) {
  return (
    <div style={{ background: C.card, borderRadius: 16, padding: "20px 22px", border: accent ? `1px solid ${accent}20` : "none", borderLeft: accent ? `3px solid ${accent}` : undefined, marginBottom: 14, boxShadow: "0 1px 2px rgba(80,65,45,0.04), 0 4px 16px rgba(80,65,45,0.04)", ...style }}>
      {children}
    </div>
  );
}

function Checklist({ items }) {
  const [checked, setChecked] = useState({});
  const toggle = (i) => setChecked((p) => ({ ...p, [i]: !p[i] }));
  const done = Object.values(checked).filter(Boolean).length;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 11.5, color: done === items.length ? C.green : C.textDim || C.gray, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{done} of {items.length}</span>
      </div>
      {items.map((item, i) => (
        <label key={i} onClick={() => toggle(i)} style={{ display: "flex", gap: 10, padding: "8px 0", cursor: "pointer", alignItems: "flex-start", borderBottom: i < items.length - 1 ? `1px solid ${C.separator || C.border}` : "none" }}>
          <div style={{ width: 18, height: 18, minWidth: 18, borderRadius: "50%", border: checked[i] ? `1.5px solid ${C.accent}` : `1.5px solid ${C.cardBorder || C.border}`, background: checked[i] ? C.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2, transition: "all .2s" }}>
            {checked[i] && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
          </div>
          <span style={{ fontSize: 14, lineHeight: 1.5, color: checked[i] ? (C.textDim || C.gray) : (C.textSoft || C.text), textDecoration: checked[i] ? "line-through" : "none", transition: "all .2s" }}>{item}</span>
        </label>
      ))}
    </div>
  );
}

function Collapse({ title, subtitle, accent, children, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  const printMode = useContext(PrintContext);
  const isOpen = open || printMode;
  return (
    <div className="mav-card" style={{ background: C.card, borderRadius: 16, marginBottom: 12, overflow: "hidden", border: isOpen ? `1px solid ${accent || C.accent}30` : "none", boxShadow: isOpen ? `0 2px 12px rgba(240,106,30,0.06), 0 0 0 1px rgba(0,0,0,0.03)` : "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", background: isOpen ? (accent || C.accent) + "06" : "transparent", transition: "background .2s" }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: C.text, letterSpacing: -0.2 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: C.textDim || C.gray, marginTop: 3 }}>{subtitle}</div>}
        </div>
        <svg width="11" height="11" viewBox="0 0 11 11" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform .25s" }}><path d="M2 4l4 4 4-4" fill="none" stroke={isOpen ? (accent || C.accent) : (C.textDim || C.gray)} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      {isOpen && <div style={{ padding: "0 20px 16px" }}>{children}</div>}
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div style={{ flex: "1 1 130px", textAlign: "center", padding: "12px 10px", background: (color || C.accent) + "0d", borderRadius: 12 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: color || C.accent, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontSize: 10, color: C.textDim || C.gray, marginTop: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5 }}>{label}</div>
    </div>
  );
}

function Eyebrow({ children, color }) {
  return (
    <span style={{ display: "inline-block", background: color || C.accent, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", padding: "5px 12px", borderRadius: 7, marginBottom: 10, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(80,65,45,0.12)" }}>{children}</span>
  );
}

function WelcomePills() {
  const [active, setActive] = useState(0);
  const items = [
    { num: "01", title: "Learn", desc: "How marketing actually works" },
    { num: "02", title: "Discover", desc: "Your voice, your audience, your edge" },
    { num: "03", title: "Execute", desc: "90 days of daily checklists" },
  ];
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        {items.map((f, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            display: "flex", alignItems: "center", gap: 7,
            background: active === i ? C.accent : C.card,
            color: active === i ? "#fff" : C.text,
            border: active === i ? "none" : `1px solid ${C.border}`,
            borderRadius: 999, padding: "9px 17px", cursor: "pointer",
            fontFamily: FONT, transition: "all .2s",
            boxShadow: active === i ? "0 4px 14px rgba(224,99,28,0.28)" : "0 1px 2px rgba(80,65,45,0.05)",
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: active === i ? "rgba(255,255,255,0.8)" : C.accent, fontVariantNumeric: "tabular-nums" }}>{f.num}</span>
            <span style={{ fontSize: 13.5, fontWeight: 600 }}>{f.title}</span>
          </button>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 14, fontSize: 13.5, color: C.textSoft, minHeight: 18 }}>
        {items[active].desc}
      </div>
    </div>
  );
}

function PromptBlock({ label, prompt }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{ background: C.card, borderRadius: 16, padding: "16px 18px", marginBottom: 14, position: "relative", border: `1px solid ${C.cardBorder || C.border}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.7, color: C.textSoft || C.gray, whiteSpace: "pre-wrap" }}>{prompt}</div>
      <button onClick={copy} style={{ position: "absolute", top: 14, right: 14, background: copied ? C.green : C.accent, color: "#fff", border: "none", borderRadius: 12, padding: "5px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function Pill({ color, children }) {
  return (
    <span style={{ background: color, color: "#fff", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{children}</span>
  );
}

function OptionCard({ selected, onClick, icon, title, desc, color }) {
  return (
    <div onClick={onClick} className="mav-card" style={{ background: C.card, border: selected ? `2px solid ${color || C.accent}` : "2px solid transparent", borderRadius: 16, padding: "18px 20px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6, boxShadow: selected ? `0 4px 16px ${(color || C.accent)}15, 0 0 0 1px ${(color || C.accent)}20` : "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)", transition: "border-color .2s, box-shadow .2s" }}>
      {icon && <span style={{ fontSize: 24 }}>{icon}</span>}
      <span style={{ fontWeight: 600, fontSize: 15, color: C.text }}>{title}</span>
      {desc && <span style={{ fontSize: 13, color: C.textSoft || C.gray, lineHeight: 1.6 }}>{desc}</span>}
    </div>
  );
}

function NavRow({ onPrev, onNext, nextLabel, nextDisabled }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 18, borderTop: `1px solid ${C.separator || C.border}` }}>
      {onPrev ? <button onClick={onPrev} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: C.textSoft || C.gray, fontFamily: FONT, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>← Back</button> : <div />}
      {onNext && <button onClick={onNext} disabled={nextDisabled} style={{ background: nextDisabled ? C.grayLight : "#333", color: nextDisabled ? C.textDim : "#fff", border: "none", borderRadius: 12, padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: nextDisabled ? "not-allowed" : "pointer", fontFamily: FONT, letterSpacing: 0.2 }}>{nextLabel || "Continue →"}</button>}
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: C.heading || C.accent, margin: 0, lineHeight: 1.2, letterSpacing: -0.5 }}>{children}</h2>
      {sub && <p style={{ fontSize: 14, color: C.textSoft || C.gray, marginTop: 8, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

function openRollingList() {
  window.open("https://docs.google.com/spreadsheets/d/1NxPkR7Gs2IhcN5DDzg6QKi2TWro1pvkq/copy", "_blank");
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({
    name: "",
    goal: "",
    hybridLead: "",
    timeline: "",
    nicheKnown: null,
    niche: "",
    nicheAnswers: ["", "", "", ""],
    suggestedNiches: [],
    topics: "",
    storyWhy: "",
    storyMoment: "",
    storyWish: "",
    storyMisconception: "",
    storyTell: "",
    voiceTones: [],
    voiceNever: "",
    voicePhrases: "",
    voiceAdmire: "",
    voiceHotTake: "",
    committed: false,
    showCommitGate: false,
    apiKey: "",
    budget: "",
    hasCamera: null,
    cameraComfort: null,
    hoursPerWeek: "",
    channel: "",
    converter: "",
    outreachPlatform: "",
    researchResult: null,
    researchLoading: false,
  });
  const scrollRef = useRef(null);
  const u = useCallback((p) => setD((prev) => ({ ...prev, ...p })), []);
  useEffect(() => {
    const post = () => {
      const h = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      window.parent.postMessage({ type: "mav-height", height: h }, "*");
    };
    post();
    window.addEventListener("load", post);
    const ro = new ResizeObserver(post);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("load", post);
      ro.disconnect();
    };
  }, []);

  // Generation counter (localStorage)
  const getGenCount = () => { try { return parseInt(localStorage.getItem("mav_gen_count") || "0"); } catch { return 0; } };
  const incrementGen = () => { try { const c = getGenCount() + 1; localStorage.setItem("mav_gen_count", String(c)); return c; } catch { return 1; } };
  const isLocked = getGenCount() >= 2;

  const next = () => {
    // If moving from research to plan, show commitment gate first
    if (WIZARD_STEPS[step]?.id === "research" && !d.committed) {
      u({ showCommitGate: true });
      return;
    }
    setStep((s) => Math.min(s + 1, WIZARD_STEPS.length - 1)); scrollRef.current?.scrollTo(0, 0);
  };
  const prev = () => { setStep((s) => Math.max(s - 1, 0)); scrollRef.current?.scrollTo(0, 0); };

  const confirmCommit = () => {
    const count = incrementGen();
    u({ committed: true, showCommitGate: false });
    setStep((s) => Math.min(s + 1, WIZARD_STEPS.length - 1));
    scrollRef.current?.scrollTo(0, 0);
  };

  // Niche suggestion logic
  const suggestNiches = () => {
    const a = d.nicheAnswers.map((x) => x.toLowerCase());
    const s = [];
    const isRec = d.goal === "recruiting" || (d.goal === "hybrid" && d.hybridLead === "recruiting");

    if (isRec) {
      // RECRUITING suggestions based on: previous career (a[0]), why they left (a[1]), who they attract (a[2]), what type they want (a[3])
      if (a[0].match(/nurse|health|medical|hospital|dental|pharma/)) s.push("Burned Out Healthcare Workers (nurses, dental hygienists, paramedics who want flexibility and uncapped income without the 12 hour shifts)");
      if (a[0].match(/teacher|educ|school|tutor|professor/)) s.push("Underpaid Educators (teachers and education workers who love helping people but are tired of being undervalued and underpaid)");
      if (a[0].match(/sales|retail|commission|store|manager/)) s.push("Sales Professionals Looking for Uncapped Income (retail managers, car salespeople, B2B reps who already know how to sell but are tired of someone else capping their earnings)");
      if (a[0].match(/real estate|realtor|mortgage/)) s.push("Realtors and Mortgage Brokers (already licensed, already networking, understand commission based income, natural transition to insurance)");
      if (a[0].match(/trade|construct|electr|plumb|weld|labour/)) s.push("Tradespeople Seeking Career Change (their bodies are breaking down, they want something sustainable, they understand hard work)");
      if (a[0].match(/tech|software|IT|engineer|dev/)) s.push("Tech Workers Tired of Layoffs (want income stability they control, not at the mercy of the next round of cuts)");
      if (a[0].match(/stay.?home|parent|mom|dad|caregiv/)) s.push("Stay at Home Parents Wanting Income (flexible schedule, work from home possibility, build something while raising kids)");
      if (a[0].match(/military|army|veteran|police|first responder/)) s.push("Veterans and First Responders (disciplined, mission driven, understand serving others, looking for their next chapter)");
      if (a[0].match(/restaurant|food|chef|hospitality|server|bartend/)) s.push("Hospitality Workers (tired of nights, weekends, and tips, want a career with real earning potential and daytime hours)");
      if (a[0].match(/corporate|office|desk|9.?to.?5|cubicle/)) s.push("Corporate Employees Feeling Stuck (golden handcuffs, bored, no growth, dreaming of entrepreneurship but scared to take the leap)");
      if (a[2].match(/young|millennial|gen.?z|20s|student|grad/)) s.push("Young Professionals and Recent Graduates (no ceiling, no waiting for promotions, build wealth early, entrepreneurial energy)");
      if (a[3].match(/unlicensed|new|career change|beginner/)) s.push("Unlicensed Career Changers (people with zero insurance background who are coachable, hungry, and ready for something new)");
      if (a[3].match(/licensed|agent|broker|unhappy|frustrated/)) s.push("Licensed Agents at Bad Agencies (have the license, have the desire, just need the systems, leads, and support they were promised but never got)");
      if (a[2].match(/immigrant|newcomer|filipino|south asian|community/)) s.push("Immigrant Communities Seeking Financial Independence (understand hustle, want to build something in Canada, community oriented)");
      if (s.length === 0) {
        s.push("Career Changers from Your Previous Industry (people in the exact career you left, they trust you because you walked their path)", "Unlicensed Professionals Looking for Flexible Income (parents, side hustlers, anyone who wants to control their own schedule)", "Licensed Agents Looking for Better Systems and Support (frustrated agents at agencies with no leads, no training, no mentorship)", "Young Professionals Who Want Uncapped Income (ambitious 20 to 35 year olds tired of waiting for promotions)");
      }
    } else {
      // PRODUCTION suggestions (4 dimensions: passions, personal experience, expertise, life stage)
    if (a[0].match(/gym|fitness|sport|crossfit|yoga|run|marathon|lift/)) s.push("Fitness Community (your body is your income source, protect it: disability, critical illness, income replacement if injury hits)");
    if (a[0].match(/church|faith|relig|ministry|pastor|bible/)) s.push("Faith Communities (family stewardship, legacy planning, protecting what God gave you, serving your congregation)");
    if (a[0].match(/filipino|pinoy|tagalog|kapamilya/)) s.push("Filipino Canadian Community (culturally resonant Taglish content, balikbayan family protection, remittance planning)");
    if (a[0].match(/indian|south asian|desi|punjabi|hindi/)) s.push("South Asian Canadian Community (multi generational family protection, cultural understanding of family duty, immigration journey)");
    if (a[0].match(/chinese|mandarin|cantonese|asian/)) s.push("Chinese Canadian Community (family first culture, education planning, wealth transfer, culturally sensitive conversations)");
    if (a[0].match(/soccer|hockey|baseball|basketball|coach/)) s.push("Sports Parents / Youth Coaches (income replacement if you cannot drive to practice, protecting the family behind the athlete)");
    if (a[0].match(/volunteer|nonprofit|charity|community/)) s.push("Nonprofit Workers / Volunteers (underpaid, under protected, group benefits gaps, passion driven people who forget about themselves)");
    if (a[0].match(/music|band|artist|creative|design|photo/)) s.push("Creatives / Freelancers (zero group benefits, irregular income, disability is career ending, nobody plans for them)");
    if (a[0].match(/parent|mom|dad|school|pta/)) s.push("School Parents / PTA Community (mortgage protection, education savings, family income replacement)");
    if (a[0].match(/veteran|military|armed forces|rcmp/)) s.push("Military / Veterans / First Responders (transition planning, group benefits gaps after service, PTSD aware coverage)");

    // PERSONAL EXPERIENCE (a[1])
    if (a[1].match(/immigr|moved|new to canada|newcomer|pr|permanent resident/)) s.push("New Immigrants to Canada (no established coverage, unfamiliar with Canadian insurance, building from scratch, culturally sensitive)");
    if (a[1].match(/divorce|separat|single parent|custody/)) s.push("Divorced / Single Parents (income replacement is critical, one income supporting kids, rebuilding financial foundation)");
    if (a[1].match(/cancer|health scare|diagnosis|surviv|sick/)) s.push("Health Scare Survivors (you lived it, you understand the fear, critical illness coverage messaging from lived experience)");
    if (a[1].match(/parent|kid|baby|child|pregn|newborn/)) s.push("Young Families / New Parents (mortgage protection, education planning, income replacement if something happens to the breadwinner)");
    if (a[1].match(/married|wedding|engaged/)) s.push("Newlyweds (mortgage insurance, income replacement, joint financial planning, starting life together protected)");
    if (a[1].match(/home|mortgage|house|condo|first.?time/)) s.push("New Homeowners (mortgage protection, critical illness tied to mortgage payments, what the bank does not tell you)");
    if (a[1].match(/lost|death|passed|funeral|grief/)) s.push("Families Who Have Experienced Loss (you understand the pain, final expense, legacy planning, protecting those left behind)");
    if (a[1].match(/business|start|entrepreneur|side hustle|freelan/)) s.push("New Entrepreneurs (no group benefits, key person insurance, disability coverage, nobody told them to protect themselves)");
    if (a[1].match(/career change|laid off|fired|pivot/)) s.push("Career Changers (lost group benefits, gap coverage, rebuilding protection from scratch)");
    if (a[1].match(/debt|bankrupt|financial struggle|broke/)) s.push("People Rebuilding Financially (affordable coverage options, term vs whole life, smart protection on a budget)");

    // PROFESSIONAL EXPERTISE (a[2])
    if (a[2].match(/health|nurse|doctor|medical|dental|pharma/)) s.push("Healthcare Professionals (disability insurance, high income protection, burnout coverage, critical illness from occupational exposure)");
    if (a[2].match(/tech|software|engineer|IT|dev|program/)) s.push("Tech Workers (stock heavy portfolios, group benefits gaps, contractor coverage, RSU vs insurance planning)");
    if (a[2].match(/real estate|realtor|mortgage broker|property/)) s.push("Realtors / Real Estate Pros (referral partnerships, mortgage insurance for their clients, commission based income protection)");
    if (a[2].match(/trade|construct|electr|plumb|weld|carpen|hvac/)) s.push("Tradespeople / Contractors (disability is career ending, critical illness, zero group benefits, physically demanding work)");
    if (a[2].match(/business|entrepreneur|owner|startup|manage/)) s.push("Small Business Owners (key person insurance, buy sell agreements, no group benefits for themselves, business continuity)");
    if (a[2].match(/school|teacher|educ|professor|tutor/)) s.push("Educators / Teachers (group benefits gaps, pension is not enough, summer income planning, disability beyond sick days)");
    if (a[2].match(/restaurant|food|chef|cook|hospitality|hotel/)) s.push("Hospitality Workers (irregular income, no group benefits for most, physical toll, tip based income is unprotected)");
    if (a[2].match(/truck|drive|transport|deliver|courier/)) s.push("Truck Drivers / Delivery Workers (disability risk, long hours, physical demands, income replacement if they cannot drive)");
    if (a[2].match(/financ|bank|account|invest|advisor/)) s.push("Financial Professionals (you speak their language, gaps in their own coverage, referral partnership potential)");
    if (a[2].match(/law|lawyer|legal|paralegal/)) s.push("Legal Professionals (high income protection, disability, partner buy sell agreements, estate planning conversations)");
    if (a[2].match(/sales|retail|commission/)) s.push("Commission Based Sales Professionals (income fluctuation, no base salary safety net, disability and income replacement)");

    // LIFE STAGE (a[3])
    if (a[3].match(/retire|50s|60s|pension|empty nest/)) s.push("Pre Retirees (retirement income gap, final expense, legacy planning, pension is not enough)");
    if (a[3].match(/parent|kid|baby|family|child/)) s.push("Young Families (mortgage protection, education planning, income replacement)");
    if (a[3].match(/married|newlywed|engaged/)) s.push("Newlyweds (starting protected, joint planning, mortgage insurance)");
    if (a[3].match(/single|young professional|20s|30s|career/)) s.push("Young Professionals 25 to 40 (income replacement, critical illness, retirement gap, affordable coverage before health changes)");
    if (a[3].match(/caregiv|aging parent|sandwich/)) s.push("Sandwich Generation / Caregivers (caring for kids AND parents, burnout protection, income replacement, estate planning for aging parents)");
    if (a[3].match(/home|condo|mortgage/)) s.push("New Homeowners (mortgage protection, what the bank did not tell you, critical illness tied to payments)");

    if (s.length === 0) {
      s.push("Young Families (mortgage protection, education planning)", "New Homeowners (mortgage insurance, critical illness)", "Small Business Owners (key person, disability, zero group benefits)", "Working Professionals 30 to 45 (income replacement, retirement gap)", "New Immigrants to Canada (building protection from scratch)");
    }
    } // end of production else block
    // Deduplicate
    const unique = [...new Set(s)];
    u({ suggestedNiches: unique });
  };

  // Mavericks Research Engine
  const runResearch = async () => {
    u({ researchLoading: true });
    const goalText = d.goal === "production" ? "selling insurance policies" : d.goal === "recruiting" ? "recruiting agents" : "selling policies and recruiting agents";
    const hybridContext = d.goal === "hybrid" ? `\nIMPORTANT: This agent is HYBRID but leading with ${d.hybridLead || "production"}. 70% of content angles should be ${d.hybridLead === "recruiting" ? "agent/recruiting focused" : "client/production focused"}, 30% should be ${d.hybridLead === "recruiting" ? "client/production focused" : "agent/recruiting focused"}.` : "";
    const isRecruiting = d.goal === "recruiting" || (d.goal === "hybrid" && d.hybridLead === "recruiting");
    const recruitingContext = isRecruiting ? `
RECRUITING-SPECIFIC CONTEXT:
This agent's primary goal is ATTRACTING AND RECRUITING agents, not selling policies to consumers. The audience is completely different. You are speaking to TWO types of people:

TYPE A: UNLICENSED PEOPLE (career changers, side hustlers, burned out professionals)
These people are NOT in the insurance industry yet. They are considering it. They might be:
A teacher tired of being underpaid. A nurse burned out from 12 hour shifts. A salesperson hitting an income ceiling. A stay at home parent wanting flexibility. A recent graduate who does not want a 9 to 5. A gig worker with no stability. A corporate employee who feels stuck.
Their pains: feeling trapped in their current career, watching others make more money, wanting flexibility but not knowing how to get it, scared to start something new, skeptical of "too good to be true" opportunities, worried about commission only income, not knowing if they can actually sell, imposter syndrome.
Their desires: freedom, flexibility, uncapped income, being their own boss, helping people, building something meaningful, proving doubters wrong, financial security on their own terms.
They do NOT respond to "join my team" pitches. They respond to: lifestyle content showing what is possible, income transparency (without income claims that violate compliance), behind the scenes of agent life, relatable "I was in your shoes" content, proof that normal people can succeed.

TYPE B: LICENSED AGENTS (already in the industry but unhappy)
These people already have their license but are struggling. They might be:
With a bad agency that gives no support. Stuck with leads that do not convert. No systems, no training, no mentorship. Watching their upline succeed while they flounder. Considering quitting the industry entirely. Working 60 hours for 30 hour pay.
Their pains: bad leads, no support, feeling like a number, upline does not care, no systems, no marketing training, income plateau, considering quitting, embarrassed to admit they are struggling, feeling like they picked the wrong agency.
Their desires: a real support system, marketing systems that work, leads that actually convert, a team that feels like a team, mentorship from someone who is doing it not just talking about it, being able to look at their business and feel proud.
They DO NOT respond to "our comp plan is better" content. They respond to: proof of systems that work, agent success stories, behind the scenes of what support looks like, content that names the exact frustrations they are feeling, leadership content that proves you actually care.

FOR BOTH TYPES: NEVER make income claims or guarantees. Show the lifestyle and the systems. Let the results speak through stories, not numbers. Compliance matters.
` : "";

    const prompt = `You are the Mavericks Research Engine, a creative content strategist for insurance agents in Canada. Your job is not to produce generic insurance research. Your job is to help this specific agent find their UNIQUE voice and build content that only THEY could create.

CRITICAL PHILOSOPHY: Everyone in finance talks about the same topics. The market is not saturated, but the content IS. The only way to stand out is by making content that is deeply personal to this agent. Their background, their stories, their way of explaining things, their passions. That is their differentiator. Do NOT produce content angles that any insurance agent could use. Produce angles that only THIS agent could pull off because of who they are.
${hybridContext}${recruitingContext}
AGENT PROFILE:
Name: ${d.name}
Goal: ${goalText}
Audience/Niche: ${d.niche}
Topics they are passionate about and want to talk about: ${d.topics || "not specified yet, suggest based on their story and background"}

THIS AGENT'S STORY (this is the most important section. Their story IS their marketing. Read every word carefully and build everything around it):
Why they got into insurance: ${d.storyWhy || "not shared yet"}
A meaningful moment that proved this work matters: ${d.storyMoment || "not shared yet"}
What they wish every family understood: ${d.storyWish || "not shared yet"}
The biggest misconception they keep hearing: ${d.storyMisconception || "not shared yet"}
What they would tell their audience in 10 minutes with no pitch: ${d.storyTell || "not shared yet"}

THIS AGENT'S VOICE AND BRAND DNA (use this to shape the TONE of all content angles, copy swipes, and hooks):
Natural tone: ${d.voiceTones.length > 0 ? d.voiceTones.join(", ") : "not specified"}
What they would NEVER say or do: ${d.voiceNever || "not specified"}
Words and phrases they naturally use: ${d.voicePhrases || "not specified"}
Creators they admire and why: ${d.voiceAdmire || "not specified"}
Their unpopular opinion or hot take: ${d.voiceHotTake || "not specified"}

VOICE INSTRUCTIONS: All content angles, copy swipes, and hooks MUST match this agent's natural tone. If they are funny and sarcastic, the content should make people laugh. If they are raw and vulnerable, the content should make people feel something deep. If they said they would NEVER do something, do NOT include it in any content suggestion. If they gave you their natural phrases, weave those phrases into the copy swipes so it sounds like them talking. If they admire specific creators, calibrate the energy and pacing to match that style. Their hot take should appear as at least 2 content angles.

RESEARCH DEPTH REQUIREMENTS:
${isRecruiting ? "This is a RECRUITING focused plan. The audience is potential agents (both unlicensed career changers and licensed agents looking for a better agency). Every avatar, pain point, desire, and content angle must speak to people considering a career in insurance or unhappy at their current agency. Do NOT produce client-facing content. The FAST link here drives to a recruiting page or career conversation booking, not a policy consultation." : "Everything must be specific to this agent's audience in Canada. If the audience is Filipino Canadian families, the avatar should have a Filipino name, reference cultural attitudes toward money, balikbayan boxes, family duty. If tradespeople, reference jobsite injuries, the physical toll, zero group benefits. Go deep enough that this agent's audience reads the content and thinks \"this person actually understands my life.\""}

IMPORTANT: Do not hyper niche the content angles to the point where they can only talk about one narrow topic. This agent is still discovering what resonates. Give them a RANGE of angles within their niche, from broad educational content to deeply personal stories, so they can test what their audience responds to and narrow from there.

Using the MAVERICKS FRAMEWORK, produce:

1. AUDIENCE AVATAR${isRecruiting ? " (Build TWO avatars)" : ""}
${isRecruiting ? `Build two vivid avatars:
AVATAR A (Unlicensed Career Changer): Name, exact age, current job they hate, income, family situation, daily routine that is draining them. What do they scroll on their phone during lunch break? What do they Google at night? "How to make money from home" "side hustle ideas Canada" "is insurance sales worth it"? What is the dream they are too scared to chase? What would they do if they could start over?
AVATAR B (Unhappy Licensed Agent): Name, age, which agency they are with (generic), how long they have been licensed, what is failing. Are they getting bad leads? No training? No mentorship? What is their daily frustration? What did they think this career would be vs what it actually is? What would make them switch agencies?` : "Build a vivid, human avatar. Name, exact age, income, family (spouse name, kids ages, pet even), job title, daily routine from alarm to bedtime. What apps on their phone? What do they worry about at 3AM? What do they secretly want but are embarrassed to say? What Facebook groups are they in? What do they Google when anxious about money? What is the one conversation they keep avoiding with their spouse? Make this a REAL person."}

2. PAIN MINING (Top 10)
${isRecruiting ? "10 emotional pain points split between unlicensed prospects and unhappy agents. 5 for career changers (feeling trapped, underpaid, watching others succeed, scared to take the leap, skeptical of opportunity). 5 for unhappy agents (bad agency, no leads, no systems, income plateau, considering quitting). These must be SPECIFIC. Not 'they want more money' but 'they check their bank account on Friday and calculate whether they can afford groceries AND gas this week while their upline posts vacation photos.'" : "10 emotional pain points. Not \"they need coverage.\" Think: \"They googled 'what happens to mortgage if I die Canada' at 11pm and closed the tab because the answer scared them.\" What would they type into Reddit at midnight? What would they whisper to their best friend? What is the thing they KNOW they should deal with but keep pushing off? Be specific to THIS audience's life situation, culture, and daily reality."}

3. DESIRE MAPPING (Top 10)
${isRecruiting ? "10 specific outcomes. 5 for career changers: not 'financial freedom' but 'picking up my kid from school at 3pm because I set my own schedule and still made more this month than I used to make in two.' 5 for unhappy agents: not 'better support' but 'joining a Monday team call where my manager actually knows my name and asks about my pipeline, not just my numbers.'" : "10 specific outcomes painted vividly. Not \"financial freedom\" but \"knowing that if something happens to me tomorrow, my wife does not have to sell the house and move the kids to a one bedroom apartment.\" The tangible, visual, emotional version of peace for THIS person."}

4. CONTENT ANGLES (20 ideas)
20 content ideas. For each, specify the format (Reel, YouTube video, static post, carousel, text post, faceless Reel) and the pillar (education, relatable, authority). Each must:
${isRecruiting ? `Call out a specific pain or desire from potential recruits (both types)
Use a hook that stops a burned out professional or frustrated agent mid scroll
Include a RANGE: some targeting career changers, some targeting unhappy agents, some for both
NEVER make income claims or promises. Show lifestyle, show systems, show real agent stories
Examples of strong recruiting angles: "I was a [previous career] making $X. Here is what nobody tells you about switching to insurance." "The 3 things I wish someone told me before I got my insurance license." "What my Monday looks like vs what it looked like at my corporate job." "If your agency does not give you these 5 things, you are at the wrong agency." "Day in the life of an insurance agent who actually has systems." "What I would tell someone considering insurance as a career."` : `Call out a specific pain or desire from your research
Use a hook that stops THIS audience mid scroll
Be something only THIS agent could create because of their personal story, background, or perspective
Include a RANGE: some broad (appealing to anyone in the niche), some narrow (speaking to a very specific pain), some personal (drawing on the agent's own experience)`}
${d.storyWhy ? `At least 7 of the 20 must directly weave in the agent's personal story. Their "why" is: ${d.storyWhy}` : ""}
${d.storyMisconception ? `At least 3 should address the misconception they keep hearing: "${d.storyMisconception}"` : ""}

Be CREATIVE. ${isRecruiting ? "Think beyond 'join my team.' Think: controversy about the insurance industry, raw honesty about what this career is really like, before and after lifestyle content, myth busting about commission only income, behind the scenes of training and support, agent spotlight stories." : "Think beyond '5 tips for life insurance.' Think: 'I watched my [family member] lose everything because of one missing conversation. Here is what nobody tells you.' Think: controversy, surprise, personal revelation, myth busting, hot takes, emotional storytelling, behind the scenes of an agent's life."}

5. COPYWRITING SWIPES (3 posts)
3 Facebook posts ready to copy and paste. Each must:
${isRecruiting ? `Open with a hook that speaks to career changers OR frustrated agents (specify which)
Post 1 must be a "my story" post: how this agent went from their previous life to where they are now. Raw. Honest. No flexing.
Post 2 must call out a specific frustration unhappy agents have (bad leads, no support, income plateau) and position Mavericks as the answer without being salesy
Post 3 must be a lifestyle post that shows what is possible without making income claims. Day in the life, schedule flexibility, team culture, personal growth.
COMPLIANCE: No income claims, no guarantees, no "I made $X in my first month" language. Show, do not tell.` : `Open with a hook that names the audience specifically
${d.storyMoment ? `Post 1 must use this real story: "${d.storyMoment}"` : "Use a personal story as the hook"}
${d.storyWish ? `Post 2 must be built around this insight: "${d.storyWish}"` : "Lead with an insight most people miss"}
Post 3 should be a myth buster or hot take that challenges a common belief`}
Conversational tone. Like a voice note to a friend. Zero jargon. Zero corporate.
End each with a soft CTA to their FAST link.

6. WHAT MAKES THIS AGENT UNIQUE (New Section)
Based on everything above, write a 3 to 5 sentence "positioning statement" that captures what makes this agent different from every other ${isRecruiting ? "recruiter posting about insurance opportunities" : "insurance content creator"}. What is their unique angle? Why should someone ${isRecruiting ? "join THEIR team instead of the 1000 other agencies recruiting on Facebook" : "follow THEM instead of the 1000 other agents posting about insurance"}? This becomes the foundation of their personal brand.

7. HOW TO REPLICATE THIS RESEARCH
Exact prompts to paste into Claude or ChatGPT. ${isRecruiting ? "Specific subreddits where career changers and frustrated agents vent (r/careerguidance, r/sales, r/insurance, r/antiwork), Facebook groups for career changers and insurance agents, LinkedIn search strategies for finding unhappy professionals." : "Specific subreddits, Facebook groups, Amazon book reviews, Google autocomplete phrases to mine."} How to turn research into content. A 30 minute Sunday research routine.

FORMAT: Use clear headers. Every word must earn its place. If a section feels generic, rewrite it until it could only apply to THIS agent.`;

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) {
        u({ researchResult: "Research Error: " + (data.error.message || data.error || "something went wrong") + "\n\nTry again in a moment.", researchLoading: false });
        return;
      }
      const text = data.content?.map((b) => b.text || "").join("\n") || "Research came back empty. Try running again.";
      u({ researchResult: text, researchLoading: false });
    } catch (err) {
      u({ researchResult: "Connection error: " + (err.message || "unknown") + "\n\nCheck your connection and try again.", researchLoading: false });
    }
  };

  // ── RENDER MARKDOWN-ISH TEXT ──
  const renderText = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("# ")) return <h2 key={i} style={{ fontFamily: FONT, fontSize: 22, color: C.navy, margin: "24px 0 8px" }}>{line.slice(2)}</h2>;
      if (line.startsWith("## ")) return <h3 key={i} style={{ fontSize: 18, fontWeight: 700, color: C.navy, margin: "20px 0 6px" }}>{line.slice(3)}</h3>;
      if (line.startsWith("### ")) return <h4 key={i} style={{ fontSize: 15, fontWeight: 700, color: C.coral, margin: "16px 0 4px" }}>{line.slice(4)}</h4>;
      if (line.startsWith("**") && line.endsWith("**")) return <h4 key={i} style={{ fontSize: 15, fontWeight: 700, color: C.navy, margin: "14px 0 4px" }}>{line.slice(2, -2)}</h4>;
      if (line.match(/^[-*]\s/)) return <div key={i} style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 4, paddingLeft: 16, position: "relative" }}><span style={{ position: "absolute", left: 0, color: C.accent }}>→</span>{line.slice(2)}</div>;
      if (line.match(/^\d+\.\s/)) return <div key={i} style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 4, paddingLeft: 24, position: "relative" }}><span style={{ position: "absolute", left: 0, color: C.gold, fontWeight: 700 }}>{line.match(/^\d+/)[0]}.</span>{line.replace(/^\d+\.\s*/, "")}</div>;
      if (line.trim() === "") return <div key={i} style={{ height: 8 }} />;
      return <p key={i} style={{ fontSize: 14, lineHeight: 1.7, color: C.text, margin: "0 0 6px" }}>{line}</p>;
    });
  };

  // ═══════════════════════════════════════════
  // STEP RENDERER
  // ═══════════════════════════════════════════
  const renderStep = () => {
    switch (WIZARD_STEPS[step]?.id) {

      // ── WELCOME ──
      case "welcome":
        return (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32, paddingTop: 16 }} className="mav-fadeup">
              <img src={LOGO_B64} alt="Mavericks" style={{ width: 80, height: 80, objectFit: "contain", margin: "0 auto 20px", display: "block", animation: "float 5s ease-in-out infinite" }} />
              <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>MAVERICKS AGENCY</div>
              <h1 style={{ fontSize: 34, fontWeight: 800, color: C.heading, margin: "0 0 14px", lineHeight: 1.1, letterSpacing: -1 }}>The 90-Day<br />Strategy Builder</h1>
              <p style={{ fontSize: 14.5, color: C.textSoft, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                Write your answers on each screen to build your personalized plan, get the blueprint to train your own AI, and daily checklists so you never guess what to do next.
                <br />Click expand on the upper right to experience it full screen.
              </p>
            </div>
            <WelcomePills />
            <Card style={{ maxWidth: 440, margin: "0 auto" }}>
              <label style={{ fontWeight: 600, fontSize: 14, color: C.text, display: "block", marginBottom: 8 }}>What's your first name?</label>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <input value={d.name} onChange={(e) => u({ name: e.target.value })} onKeyDown={(e) => { if (e.key === "Enter" && d.name.trim()) next(); }} placeholder="Your name" style={{ flex: 1, padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 14, outline: "none", fontFamily: FONT, background: C.inputBg, color: C.text, lineHeight: 1.5 }} />
                <button onClick={next} disabled={!d.name.trim()} style={{ background: !d.name.trim() ? C.grayLight : "#333", color: !d.name.trim() ? C.textDim : "#fff", border: "none", borderRadius: 12, padding: "12px 22px", fontSize: 14, fontWeight: 600, cursor: !d.name.trim() ? "not-allowed" : "pointer", fontFamily: FONT, whiteSpace: "nowrap", letterSpacing: 0.2 }}>Let's Go →</button>
              </div>
            </Card>
          </div>
        );

      // ── MARKETING 101 ──
      case "marketing101":
        return (
          <div>
            <SectionTitle sub="Tap each card to learn. Two concepts, that is it. Get these right and everything else clicks.">Marketing 101</SectionTitle>

            {/* THE EQUATION - INTERACTIVE */}
            <div style={{ background: C.accent + "08", border: `1px solid ${C.accent}15`, borderRadius: 16, padding: "28px 20px", textAlign: "center", marginBottom: 20, position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.accent + '20' }} />
              <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>THE ONLY FORMULA YOU NEED</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                {[
                  { label: "Traffic", sub: "You bring eyeballs", color: C.accent },
                  { label: "+", sub: "", color: C.gold, op: true },
                  { label: "Converter", sub: "They take action", color: C.gold },
                  { label: "=", sub: "", color: C.gold, op: true },
                  { label: "Leads", sub: "Booked calls", color: C.green },
                ].map((b, i) => b.op ? (
                  <div key={i} style={{ fontSize: 24, fontWeight: 800, color: C.gold, textShadow: `0 0 10px ${C.gold}40` }}>{b.label}</div>
                ) : (
                  <div key={i} style={{ background: `${b.color}15`, borderRadius: 12, padding: "14px 20px", border: `1px solid ${b.color}25` }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: b.color }}>{b.label}</div>
                    <div style={{ fontSize: 10, color: C.textDim, marginTop: 2 }}>{b.sub}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: C.textDim, fontSize: 13, marginTop: 14, lineHeight: 1.5 }}>Miss either one = zero results. Simple as that.</p>
            </div>

            {/* TRAFFIC TYPES - TAPPABLE CARDS */}
            <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>📡 TRAFFIC = HOW PEOPLE FIND YOU</div>
            <p style={{ fontSize: 14, color: C.gray, marginBottom: 14 }}>Tap each to learn more.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { emoji: "💬", name: "Outreach", speed: "7 to 14 days", verdict: "Fast start, runs out", detail: "DMs on Facebook or LinkedIn. You go to them directly. Fastest way to your first lead but your list shrinks every day unless you replace names.", color: C.accent },
                { emoji: "📱", name: "Content", speed: "30 to 60 days", verdict: "Slow start, compounds", detail: "Posts, videos, Reels. People come to you. Takes time to build but a video from Month 1 can still generate leads in Year 3.", color: C.gold },
                { emoji: "🤝", name: "Networking", speed: "14 to 21 days", verdict: "Relationships last", detail: "Events, meetups, BNI, chamber of commerce. Face to face. People buy from people they have met in person. Trust builds faster.", color: C.green },
                { emoji: "💰", name: "Paid Ads", speed: "Immediate", verdict: "Stops when budget stops", detail: "Facebook ads, Google ads. Pay per eyeball. Not recommended for beginners. Test with proven organic content first.", color: C.purple },
              ].map((t, i) => (
                <Collapse key={i} title={t.name} subtitle={t.speed} accent={t.color}>
                  <div style={{ marginTop: 10 }}>
                    <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>{t.detail}</p>
                    <div style={{ background: t.color + "10", borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 600, color: t.color }}>{t.verdict}</div>
                  </div>
                </Collapse>
              ))}
            </div>

            {/* CONVERSION TOOLS - TAPPABLE */}
            <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>🔗 CONVERTER = WHERE YOU SEND THEM</div>
            <p style={{ fontSize: 14, color: C.gray, marginBottom: 14 }}>This turns attention into booked calls. Tap to learn.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { emoji: "⚡", name: "FAST Links", verdict: "Yours. Already built.", detail: "Landing page, calendar, lead capture, nurture emails, CRM. All built for you. Other agents spend $500 to $5,000 building this. You just drive traffic to it.", color: C.accent, highlight: true },
                { emoji: "🎤", name: "Events", verdict: "Present to many at once", detail: "Webinars, lunch and learns, workshops. Good for warm audiences who need more trust before booking a 1 on 1.", color: C.gold },
                { emoji: "👥", name: "FB Groups", verdict: "You own the audience", detail: "Build a community. Members see your content daily in their feed. No algorithm can take your group away.", color: C.green },
                { emoji: "📞", name: "1 on 1 Calls", verdict: "Highest close rate", detail: "Direct conversation. Best conversion rate but zero leverage. You can only be on one call at a time.", color: C.gray },
              ].map((t, i) => (
                <Collapse key={i} title={t.name} subtitle={t.highlight ? "⭐ Your primary tool" : ""} accent={t.color}>
                  <div style={{ marginTop: 10 }}>
                    <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>{t.detail}</p>
                    <div style={{ background: t.color + "10", borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 600, color: t.color }}>{t.verdict}</div>
                  </div>
                </Collapse>
              ))}
            </div>

            {/* FAST LINK HIGHLIGHT */}
            <div style={{ background: C.accent + "08", border: `1px solid ${C.accent}15`, borderRadius: 16, padding: "24px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
              <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 800, color: C.heading, marginBottom: 8 }}>Your FAST Link Is Your Conversion Tool</div>
              <p style={{ fontSize: 14, color: C.textDim, lineHeight: 1.6, maxWidth: 440, margin: "0 auto" }}>It is already built. Your only job for the next 90 days is to drive traffic to it. That is what this plan is about.</p>
            </div>

            <NavRow onPrev={prev} onNext={next} />
          </div>
        );

      // ── WHY RESEARCH MATTERS ──
      case "research101":
        return (
          <div>
            <SectionTitle sub="This is the difference between content that gets ignored and content that makes people DM you.">Why Research Is Everything</SectionTitle>

            {/* BEFORE/AFTER - VISUAL COMPARISON */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              <div className="mav-card" style={{ background: C.red + "06", border: `1px solid ${C.red}20`, borderRadius: 16, padding: "20px 16px", textAlign: "center", transition: "transform 0.3s, box-shadow 0.3s", cursor: "default" }}>
                <Icon3D emoji="📢" color={C.red} size={44} />
                <div style={{ fontWeight: 700, fontSize: 14, color: C.red, margin: "10px 0 6px" }}>Without Research</div>
                <div style={{ fontSize: 13, color: C.gray, lineHeight: 1.5, fontStyle: "italic" }}>"Life insurance is important! Book a call with me!"</div>
                <div style={{ marginTop: 8, background: C.red + "10", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: C.red, display: "inline-block" }}>Ignored</div>
              </div>
              <div className="mav-card" style={{ background: C.green + "06", border: `1px solid ${C.green}20`, borderRadius: 16, padding: "20px 16px", textAlign: "center", transition: "transform 0.3s, box-shadow 0.3s", cursor: "default" }}>
                <Icon3D emoji="🎯" color={C.green} size={44} />
                <div style={{ fontWeight: 700, fontSize: 14, color: C.green, margin: "10px 0 6px" }}>With Research</div>
                <div style={{ fontSize: 13, color: C.gray, lineHeight: 1.5, fontStyle: "italic" }}>"You just got your mortgage. Nobody told you what happens to that payment if something happens to you."</div>
                <div style={{ marginTop: 8, background: C.green + "10", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: C.green, display: "inline-block" }}>"Wait... that is me"</div>
              </div>
            </div>

            {/* 5 LAYERS AS TAPPABLE COLLAPSE */}
            <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>THE MAVERICKS RESEARCH FRAMEWORK</div>
            <p style={{ fontSize: 14, color: C.gray, marginBottom: 14 }}>5 layers. Tap each to see why it matters. The Research Engine fills all 5 for you automatically.</p>

            {[
              { num: "1", title: "Niche / Audience", emoji: "🧲", color: C.accent, one: "Who you talk to. Not everyone. One specific group.", why: "When you talk to everyone, nobody listens. When you talk to one person, everyone who looks like them pays attention." },
              { num: "2", title: "Audience Avatar", emoji: "👤", color: C.gold, one: "A real person. Name, age, job, fears, daily life.", why: "You cannot move someone with content if you do not know what their Tuesday looks like." },
              { num: "3", title: "Pain Mining", emoji: "😰", color: C.red, one: "What keeps them up at 3AM? What do they Google in secret?", why: "People do not buy because of features. They buy because something hurts and they want it to stop." },
              { num: "4", title: "Desire Mapping", emoji: "✨", color: C.green, one: "What does peace actually look like for them? Be specific.", why: "Pain gets attention. Desire drives action." },
              { num: "5", title: "Content Angles", emoji: "💡", color: C.gold, one: "Turn pains and desires into hooks that stop the scroll.", why: "Good content is 90% research, 10% creation. Know the pain, and the post writes itself." },
            ].map((layer) => (
              <Collapse key={layer.num} title={`Layer ${layer.num}: ${layer.title}`} subtitle={layer.one} accent={layer.color}>
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                    <Icon3D emoji={layer.emoji} color={layer.color} size={40} />
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: C.text }}>{layer.one}</div>
                  </div>
                  <div style={{ background: layer.color + "08", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: layer.color, fontWeight: 600, lineHeight: 1.5 }}>{layer.why}</div>
                </div>
              </Collapse>
            ))}

            <div style={{ background: C.accent + "08", border: `1px solid ${C.accent}15`, borderRadius: 16, padding: "24px", marginTop: 16, textAlign: "center" }}>
              <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.heading, lineHeight: 1.4 }}>
                The Research Engine fills all 5 layers for you in one click. Then your 90 day plan tells you exactly what to do with them.
              </div>
            </div>

            <NavRow onPrev={prev} onNext={next} />
          </div>
        );

      // ── GOAL ──
      case "goal":
        return (
          <div>
            <SectionTitle sub="This shapes your entire content angle, who you target, and what your FAST link is designed to do.">What are you building for?</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { id: "production", icon: "📋", title: "Production", desc: "Generate leads to sell policies. Mortgage insurance, life, critical illness, retirement." },
                { id: "recruiting", icon: "🔥", title: "Recruiting", desc: "Attract agents to join Mavericks. Build your downline. Grow your agency." },
                { id: "hybrid", icon: "⚡", title: "Hybrid", desc: "Both. Production income while building a team. You must lead with one." },
              ].map((o) => (
                <OptionCard key={o.id} selected={d.goal === o.id} onClick={() => u({ goal: o.id })} {...o} color={o.id === "production" ? C.accent : o.id === "recruiting" ? C.gold : C.coral} />
              ))}
            </div>

            {d.goal === "hybrid" && (
              <div style={{ marginTop: 16 }}>
                <Card accent={C.gold} style={{ background: C.goldLight }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 8 }}>⚠️ Hybrid Requires a Dominant Track</div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                    You cannot split your content 50/50 between production and recruiting. If you talk to clients AND agents equally, you end up resonating with neither. Your audience needs to know what you are about within 3 seconds of landing on your profile.
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                    Pick your dominant track below. Your content split will be 70% dominant, 30% secondary for the first 90 days. After 90 days of consistency, you can start shifting the ratio.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div onClick={() => u({ hybridLead: "production" })} style={{ background: d.hybridLead === "production" ? C.accent + "10" : C.card, border: `2px solid ${d.hybridLead === "production" ? C.accent : C.border}`, borderRadius: 12, padding: "16px", cursor: "pointer", textAlign: "center" }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.navy }}>Lead with Production</div>
                      <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>70% client facing content, 30% recruiting</div>
                    </div>
                    <div onClick={() => u({ hybridLead: "recruiting" })} style={{ background: d.hybridLead === "recruiting" ? C.coral + "10" : C.card, border: `2px solid ${d.hybridLead === "recruiting" ? C.coral : C.border}`, borderRadius: 12, padding: "16px", cursor: "pointer", textAlign: "center" }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.navy }}>Lead with Recruiting</div>
                      <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>70% agent facing content, 30% production</div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            <NavRow onPrev={prev} onNext={next} nextDisabled={!d.goal || (d.goal === "hybrid" && !d.hybridLead)} />
          </div>
        );

      // ── TIMELINE ──
      case "timeline":
        return (
          <div>
            <SectionTitle sub="This determines whether we start with your Rolling List or layer marketing on top of existing momentum.">Where are you in your journey?</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <OptionCard selected={d.timeline === "first60"} onClick={() => u({ timeline: "first60" })} icon="🚀" title="First 30 to 60 Days" desc="New or early agent. Rolling List is your main income engine. We build marketing on top of it." color={C.accent} />
              <OptionCard selected={d.timeline === "past60"} onClick={() => u({ timeline: "past60" })} icon="📈" title="Past 60 Days" desc="You have momentum. Ready for a system that does not depend on your warm list alone." color={C.gold} />
            </div>
            <NavRow onPrev={prev} onNext={next} nextDisabled={!d.timeline} />
          </div>
        );

      // ── NICHE ──
      case "niche": {
        const isRec = d.goal === "recruiting" || (d.goal === "hybrid" && d.hybridLead === "recruiting");
        return (
          <div>
            <SectionTitle sub={isRec ? "You are recruiting, not selling policies. Your audience is people considering a career in insurance or agents unhappy at their current agency. Let's figure out who you attract best." : "Everyone in this industry talks about money. What makes people follow YOU is your unique perspective, your story, and the audience you naturally connect with."}>{isRec ? "Who Do You Want to Recruit?" : "What Makes You Different?"}</SectionTitle>

            {/* PHILOSOPHY */}
            <div style={{ background: C.accent + "08", border: `1px solid ${C.accent}15`, borderRadius: 16, padding: "28px 24px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>{isRec ? "RECRUITING IS DIFFERENT" : "THE TRUTH ABOUT NICHES"}</div>
              {isRec ? (
                <>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textSoft, margin: "0 0 12px" }}>
                    Recruiting is NOT selling a policy. You are selling a career change, a vision, and a support system. The people you are talking to are either burned out professionals considering something new, or licensed agents frustrated at their current agency. These are two completely different conversations.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textSoft, margin: 0 }}>
                    Your strongest recruits will come from people who see themselves in YOUR story. If you were a nurse before insurance, other nurses listen. If you were broke and rebuilt, people in that situation listen. Your background IS your recruiting advantage.
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textSoft, margin: "0 0 12px" }}>
                    There is no saturation in this market. But because everyone is in finance, the only way to stand out is by being unapologetically YOU. Your background, your story, your passions, the way you explain things. That is your differentiator.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textSoft, margin: 0 }}>
                    If you already know exactly who your audience is, great. You can start targeted content from Day 1. If you are unsure, that is completely normal. Start broader, create content around what you are passionate about, and let your audience reveal itself. The data will tell you who resonates most with your message.
                  </p>
                </>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <OptionCard selected={d.nicheKnown === true} onClick={() => u({ nicheKnown: true })} icon="🎯" title={isRec ? "I know who I want to recruit" : "I know my audience"} desc={isRec ? "I know the type of person I attract best." : "I know exactly who I want to reach and what they need."} color={C.accent} />
              <OptionCard selected={d.nicheKnown === false} onClick={() => u({ nicheKnown: false, suggestedNiches: [] })} icon="🔍" title="Help me discover it" desc={isRec ? "Help me figure out who I should be recruiting." : "I am not sure yet. Help me figure out what makes me unique."} color={C.gold} />
            </div>

            {d.nicheKnown === true && (
              <Card accent={C.accent}>
                <label style={{ fontWeight: 600, fontSize: 14, color: C.navy, display: "block", marginBottom: 4 }}>{isRec ? "Who do you want to recruit?" : "Who is your audience?"}</label>
                <p style={{ fontSize: 12, color: C.gray, marginBottom: 10 }}>{isRec ? "Describe the type of person you want on your team. Their current career, life stage, or situation." : "Be as specific as you can. If you know their life stage, profession, or community, include it."}</p>
                <input value={d.niche} onChange={(e) => u({ niche: e.target.value })} placeholder={isRec ? "e.g., Burned out nurses looking for a career change, unhappy agents with no support, young professionals wanting side income..." : "e.g., Young families with mortgages, Filipino Canadians, tradespeople..."} style={{ width: "100%", padding: "14px 18px", border: `1px solid ${C.border}`, borderRadius: 12, fontSize: 15, outline: "none", fontFamily: FONT, background: C.grayLight }} />
              </Card>
            )}

            {d.nicheKnown === false && (
              <div>
                <Card>
                  <p style={{ fontSize: 14, color: C.gray, marginBottom: 16, fontStyle: "italic" }}>{isRec ? "Answer these honestly. Your best recruits are people who see themselves in you. The more detail you give, the sharper your recruiting content will be." : "Answer these honestly and in detail. Your niche is hiding in your real life. The more specific you are here, the sharper your content angles will be."}</p>

                  {isRec ? (
                    <>
                      <Eyebrow color={C.accent}>Your Previous Career</Eyebrow>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontWeight: 600, fontSize: 13, color: C.navy, display: "block", marginBottom: 6 }}>What did you do before insurance? What career, job, or industry did you come from? People from similar backgrounds are your easiest recruits because they trust someone who walked the same path.</label>
                        <input value={d.nicheAnswers[0]} onChange={(e) => { const a = [...d.nicheAnswers]; a[0] = e.target.value; u({ nicheAnswers: a }); }} placeholder="e.g., Nurse for 8 years, retail manager, real estate agent, teacher, stay at home parent..." style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: "none", fontFamily: FONT }} />
                      </div>

                      <Eyebrow color={C.gold}>Why You Left Your Old Career</Eyebrow>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontWeight: 600, fontSize: 13, color: C.navy, display: "block", marginBottom: 6 }}>What was the breaking point? What frustrated you most about your previous career? Be specific. This becomes your most powerful recruiting content because your ideal recruit feels the exact same frustration right now.</label>
                        <textarea value={d.nicheAnswers[1]} onChange={(e) => { const a = [...d.nicheAnswers]; a[1] = e.target.value; u({ nicheAnswers: a }); }} placeholder="e.g., 'I was working 12 hour shifts as a nurse, missing my kids' bedtime every night, making $65K with no room to grow. I loved helping people but hated the system. The breaking point was when I realized I would be doing the same thing for the next 30 years.'" rows={3} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: "none", fontFamily: FONT, resize: "vertical" }} />
                      </div>

                      <Eyebrow color={C.green}>Who Do You Naturally Attract</Eyebrow>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontWeight: 600, fontSize: 13, color: C.navy, display: "block", marginBottom: 6 }}>Think about the people who have already shown interest in what you do, or who ask you about your career change. What type of person gravitates toward you? (career changers, students, parents, side hustlers, people in your old industry, licensed agents)</label>
                        <input value={d.nicheAnswers[2]} onChange={(e) => { const a = [...d.nicheAnswers]; a[2] = e.target.value; u({ nicheAnswers: a }); }} placeholder="e.g., Other nurses who are burned out, young professionals looking for more, people on LinkedIn asking about insurance careers..." style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: "none", fontFamily: FONT }} />
                      </div>

                      <Eyebrow color={C.purple}>What Type of Agents Do You Want</Eyebrow>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontWeight: 600, fontSize: 13, color: C.navy, display: "block", marginBottom: 6 }}>Are you targeting unlicensed people who need to get their license, or licensed agents at other agencies who need better support? Or both? What qualities matter to you in a team member?</label>
                        <input value={d.nicheAnswers[3]} onChange={(e) => { const a = [...d.nicheAnswers]; a[3] = e.target.value; u({ nicheAnswers: a }); }} placeholder="e.g., Both, but mostly unlicensed career changers who are coachable and hungry. Licensed agents who are frustrated with no leads." style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: "none", fontFamily: FONT }} />
                      </div>
                    </>
                  ) : (
                    <>
                      <Eyebrow color={C.coral}>Passions and Communities</Eyebrow>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontWeight: 600, fontSize: 13, color: C.navy, display: "block", marginBottom: 6 }}>What communities, hobbies, or groups are you naturally part of? (gym, church, sports league, cultural community, parenting groups, music, gaming, volunteering)</label>
                        <input value={d.nicheAnswers[0]} onChange={(e) => { const a = [...d.nicheAnswers]; a[0] = e.target.value; u({ nicheAnswers: a }); }} placeholder="e.g., CrossFit, Filipino community, church youth group, soccer league..." style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: "none", fontFamily: FONT }} />
                      </div>

                      <Eyebrow color={C.teal}>Personal Experience That Drives Your Mission</Eyebrow>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontWeight: 600, fontSize: 13, color: C.navy, display: "block", marginBottom: 6 }}>What personal experience made you passionate about helping others with financial protection? Think about moments that changed how you see money, risk, or family responsibility. Be as detailed as possible.</label>
                        <textarea value={d.nicheAnswers[1]} onChange={(e) => { const a = [...d.nicheAnswers]; a[1] = e.target.value; u({ nicheAnswers: a }); }} placeholder="e.g., 'My uncle passed away suddenly and my aunt lost their home because there was no life insurance. I watched my cousins move into a one bedroom apartment. That moment is why I do this work. I never want another family to go through what they went through.' The more specific and detailed, the better your niche suggestions and content will be." rows={3} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: "none", fontFamily: FONT, resize: "vertical" }} />
                      </div>

                      <Eyebrow color={C.purple}>Professional Expertise</Eyebrow>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontWeight: 600, fontSize: 13, color: C.navy, display: "block", marginBottom: 6 }}>What industry or profession did you work in before insurance? What do you know deeply from your career? (healthcare, tech, trades, real estate, education, finance, hospitality, military)</label>
                        <input value={d.nicheAnswers[2]} onChange={(e) => { const a = [...d.nicheAnswers]; a[2] = e.target.value; u({ nicheAnswers: a }); }} placeholder="e.g., Nurse for 8 years, ran a restaurant, worked in construction..." style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: "none", fontFamily: FONT }} />
                      </div>

                      <Eyebrow color={C.gold}>Current Life Stage</Eyebrow>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontWeight: 600, fontSize: 13, color: C.navy, display: "block", marginBottom: 6 }}>What life stage are you in right now? (new parent, newlywed, homeowner, single professional, approaching retirement, empty nester, caregiver for aging parents)</label>
                        <input value={d.nicheAnswers[3]} onChange={(e) => { const a = [...d.nicheAnswers]; a[3] = e.target.value; u({ nicheAnswers: a }); }} placeholder="e.g., New parent, just bought a condo, 30s and married..." style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: "none", fontFamily: FONT }} />
                      </div>
                    </>
                  )}

                  <button onClick={suggestNiches} disabled={d.nicheAnswers.filter((a) => a.trim()).length < 2} style={{ background: d.nicheAnswers.filter((a) => a.trim()).length < 2 ? C.grayLight : C.accent, color: d.nicheAnswers.filter((a) => a.trim()).length < 2 ? C.gray : "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: d.nicheAnswers.filter((a) => a.trim()).length < 2 ? "not-allowed" : "pointer", fontFamily: FONT }}>
                    {isRec ? "Show My Recruiting Angles" : "Show My Niche Options"}
                  </button>
                </Card>
                {d.suggestedNiches.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Based on your answers, these are your strongest options:</div>
                    {d.suggestedNiches.map((n, i) => (
                      <div key={i} onClick={() => u({ niche: n })} style={{ background: d.niche === n ? C.accent + "10" : C.card, border: `1px solid ${d.niche === n ? C.accent : C.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 12, cursor: "pointer", fontSize: 14, color: C.text, lineHeight: 1.5, transition: "all 0.2s" }}>{n}</div>
                    ))}
                    {(d.goal === "recruiting" || (d.goal === "hybrid" && d.hybridLead === "recruiting")) && (
                      <div onClick={() => u({ niche: "General audience (starting broad, will narrow based on what content resonates)" })} style={{ background: d.niche?.includes("General audience") ? C.gold + "10" : C.card, border: `2px dashed ${d.niche?.includes("General audience") ? C.gold : C.border}`, borderRadius: 12, padding: "16px 18px", marginTop: 12, cursor: "pointer", transition: "all 0.2s" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Icon3D emoji="🌊" color={C.gold} size={36} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>I am not sure yet who I will attract</div>
                            <div style={{ fontSize: 13, color: C.gray, lineHeight: 1.5, marginTop: 2 }}>I will start broad, make content I genuinely enjoy creating, and let the audience reveal itself. This is a completely valid strategy. Your content will naturally attract people who resonate with YOUR energy and story. You can narrow later once you see who is engaging.</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {d.niche && (
              <Card style={{ marginTop: 16 }}>
                <label style={{ fontWeight: 600, fontSize: 14, color: C.navy, display: "block", marginBottom: 8 }}>What topics do you want to cover in your content?</label>
                <p style={{ fontSize: 13, color: C.gray, marginBottom: 12 }}>Not sure? Tap any to add them, or type your own.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                  {(() => {
                    const n = d.niche.toLowerCase();
                    const isRecTopic = d.goal === "recruiting" || (d.goal === "hybrid" && d.hybridLead === "recruiting");
                    const all = [];
                    if (isRecTopic) {
                      // RECRUITING topics
                      all.push("Day in the life of an insurance agent", "What I wish I knew before getting licensed", "The truth about commission only income");
                      all.push("Why most insurance agents quit in year one", "What to look for in an agency before joining", "How I went from [old career] to insurance");
                      all.push("Signs your agency is not supporting you", "What real mentorship looks like in insurance", "Behind the scenes of our team training");
                      all.push("Is insurance sales worth it in 2024", "How to know if insurance is right for you", "What my schedule actually looks like");
                      all.push("The hardest part of being a new agent and how to survive it", "Why I chose this agency over others", "What nobody tells you about building a team");
                      if (n.match(/nurse|health|medical/)) all.push("From nursing to insurance: my honest experience", "Why healthcare workers make great agents", "Trading 12 hour shifts for flexibility");
                      if (n.match(/teacher|educ/)) all.push("From teaching to insurance: was it worth it", "Why educators transition well into insurance", "Making more in insurance than I ever did teaching");
                      if (n.match(/sales|retail/)) all.push("Why sales professionals thrive in insurance", "Uncapped income vs salary cap: my real numbers", "If you can sell retail you can sell insurance");
                      if (n.match(/corporate|office|stuck/)) all.push("Leaving corporate for insurance: the real story", "Why I left my 9 to 5 for insurance", "What corporate employees should know about insurance careers");
                      if (n.match(/licensed|agent|unhappy/)) all.push("How to know if you are at the wrong agency", "What good lead systems actually look like", "The 5 things every agent deserves from their agency");
                      if (n.match(/parent|mom|dad|stay.?home/)) all.push("How I build my insurance business around my kids schedule", "Insurance as a career for parents who want flexibility");
                    } else {
                      // PRODUCTION topics
                      all.push("Term vs whole life explained simply", "Why group benefits are not enough", "How much coverage do you actually need");
                      if (n.match(/famil|parent|kid|baby/)) all.push("What happens to your mortgage if something happens to you", "Education savings: RESP vs insurance", "Income replacement for young families", "Critical illness when you have kids depending on you", "The cost of NOT having coverage with dependents");
                      if (n.match(/home|mortgage|condo/)) all.push("Mortgage insurance from the bank vs private", "What your mortgage broker did not tell you", "Critical illness and your mortgage payments", "What happens to your home if you cannot work");
                      if (n.match(/retire|pre.?retire|pension|50|60/)) all.push("Why your pension is not enough", "Retirement income gap explained", "Final expense planning", "Legacy planning for your kids", "Tax free retirement income strategies");
                      if (n.match(/trade|construct|plumb|electr|weld|hvac/)) all.push("Disability insurance for tradespeople", "Your body is your income source", "Why you have zero coverage without group benefits", "Critical illness for physically demanding jobs");
                      if (n.match(/health|nurse|doctor|medical|dental/)) all.push("Burnout and disability coverage", "Why your employer benefits have limits", "High income protection strategies", "Critical illness for healthcare workers");
                      if (n.match(/tech|software|engineer|IT|dev/)) all.push("Group benefits gaps for tech workers", "Contractor vs employee coverage", "RSU and stock heavy portfolios risk");
                      if (n.match(/business|entrepreneur|owner|startup/)) all.push("Key person insurance explained", "Buy sell agreements", "No group benefits when you are the boss", "Business continuity planning");
                      if (n.match(/filipino|pinoy/)) all.push("Balikbayan family protection", "Insurance myths in the Filipino community", "Taglish financial literacy content");
                      if (n.match(/faith|church|ministry/)) all.push("Stewardship and financial protection", "Legacy planning for your family", "Ministry workers and coverage gaps");
                      if (n.match(/immigrant|newcomer|new to canada/)) all.push("Insurance basics for newcomers to Canada", "Building coverage from scratch", "Canadian healthcare gaps that surprise immigrants");
                      if (n.match(/fitness|gym|sport|crossfit/)) all.push("Your body is your asset, protect your income", "What happens if injury ends your career", "Critical illness for active people");
                      if (n.match(/single|young professional|career/)) all.push("Why you need coverage even without dependents", "Locking in rates while you are young and healthy", "Critical illness in your 20s and 30s");
                      if (n.match(/divorce|single parent/)) all.push("Income replacement when you are the only provider", "Rebuilding financial protection after divorce");
                      if (all.length <= 3) all.push("Life insurance myths Canadians believe", "What happens when you have no plan", "The real cost of being uninsured");
                    }
                    return all.map((topic, i) => (
                      <span key={i} onClick={() => u({ topics: d.topics ? d.topics + ", " + topic : topic })} style={{ fontSize: 12, background: d.topics?.includes(topic) ? C.accent + "15" : C.grayLight, color: d.topics?.includes(topic) ? C.accent : C.gray, padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontWeight: 500, transition: "all 0.2s", border: `1px solid ${d.topics?.includes(topic) ? C.accent + "30" : "transparent"}` }}>{topic}</span>
                    ));
                  })()}
                </div>
                <textarea value={d.topics} onChange={(e) => u({ topics: e.target.value })} placeholder="Tap suggestions above or type your own topics here..." rows={3} style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: "none", fontFamily: FONT, resize: "vertical" }} />
              </Card>
            )}
            <NavRow onPrev={prev} onNext={next} nextDisabled={!d.niche} />
          </div>
        );
      }

      // ── YOUR STORY ──
      case "story": {
        const isRec2 = d.goal === "recruiting" || (d.goal === "hybrid" && d.hybridLead === "recruiting");
        return (
          <div>
            <SectionTitle sub={isRec2 ? "Your career change story is your most powerful recruiting tool. The more detail you share here, the more magnetic your content will be to people in the exact same situation you were in." : "Your personal experience is your unfair advantage. No AI can replicate your real stories. These answers directly shape your content angles, copywriting, and research output. The more detailed you are here, the better everything after this step works."}>{isRec2 ? "Your Career Change Story" : "Your Story"}</SectionTitle>
            <Card accent={C.accent} style={{ background: C.orangeLight, marginBottom: 16 }}>
              <div style={{ fontSize: 14, lineHeight: 1.7 }}>
                {isRec2 ? (
                  <span><strong>Your story is your recruiting magnet.</strong> People do not join companies. They join people. The person who left nursing to build a six figure insurance business attracts other burned out nurses. The person who was broke and rebuilt attracts people who feel broke right now. Your transformation IS the pitch. Be raw. Be specific.</span>
                ) : (
                  <span><strong>Be specific and detailed.</strong> "I wanted to help people" is vague and produces generic content. "My uncle passed away with no coverage and I watched my aunt lose their home in 6 months. My cousins moved into a one bedroom apartment. I decided right there that I would never let another family go through that" produces content that makes people stop scrolling and pay attention. Your stories are your marketing. Give them the detail they deserve.</span>
                )}
              </div>
            </Card>
            {(isRec2 ? [
              { key: "storyWhy", q: "What were you doing before insurance and why did you leave? What was your breaking point? Be as specific as possible.", ph: "Not 'I wanted more.' What was the exact moment you decided to leave? Was it a bad shift? A paycheck that made you angry? A conversation? What were you feeling?",
                ex: "\"I was working retail management at a big box store in Brampton for 7 years. I was making $58K, working every weekend, missing my kids' soccer games. The breaking point was when I got passed over for a promotion I had been promised for 2 years. They gave it to someone with less experience who had been there 6 months. I sat in the Tim Hortons drive through after that meeting and googled 'careers with no income ceiling Canada.' That is how I found insurance. I got licensed 3 months later and never looked back.\"" },
              { key: "storyMoment", q: "What moment confirmed you made the right choice? When did you know this career was different from everything before?", ph: "Your first sale, your first recruit who thanked you, the first month you out earned your old salary, a team member's win that made you proud...",
                ex: "\"I recruited a guy who was driving Uber 60 hours a week trying to make ends meet in the GTA. Zero benefits, zero stability. I trained him for 8 weeks. His third month he earned more than he made in any single month driving Uber and he had his evenings back with his family. He sent me a text that said 'you changed my life bro.' I screenshot that message and I look at it every time I have a hard week.\"" },
              { key: "storyWish", q: "What do you wish someone had told you BEFORE you got into insurance? What would have made the transition easier?", ph: "The truth about commission only. The learning curve. How long it takes to see results. What to expect in month 1 vs month 6.",
                ex: "\"I wish someone told me that the first 60 days would feel like I was failing. Nobody prepares you for the quiet. You go from getting a paycheck every two weeks to checking your bank account and seeing nothing. My wife was worried. My parents thought I made a mistake. I wish someone had said: this is normal. Every successful agent went through this exact phase. The ones who quit at day 45 never see what day 90 looks like. Stick with it and trust the process.\"" },
              { key: "storyMisconception", q: "What is the biggest lie or misconception people believe about working in insurance? The thing that stops good people from even considering it.", ph: "'Insurance is a scam.' 'Only desperate people sell insurance.' 'You have to be pushy.' 'Commission only means you will starve.' What do people say that frustrates you?",
                ex: "\"People in Canada think insurance agents are the same as used car salesmen. That we pressure people into buying things they do not need. The truth is the best agents I know are the opposite. They listen, they educate, they let people make their own decisions. The agents who push hard burn out in 6 months. The ones who build trust and systems? They build real businesses. The industry has a reputation problem because the bad ones are louder than the good ones.\"" },
              { key: "storyTell", q: "If someone you care about (a friend, a sibling) was unhappy in their career and considering insurance, what would you honestly tell them? No sugar coating.", ph: "The real talk. What is great about it, what is hard, what they need to be prepared for, why it is worth it despite the challenges.",
                ex: "\"I would say: do not romanticize it. The first 90 days are hard. You will doubt yourself. Your friends will not understand. You will have weeks where you earn zero. But here is what nobody tells you: if you find the right agency with real systems and real support, and you put in consistent effort for 6 months, you will have more freedom, more income potential, and more purpose than any salaried job in Canada will ever give you. The question is not whether it works. It is whether you are willing to go through the hard part to get there.\"" },
            ] : [
              { key: "storyWhy", q: "What is YOUR story? Why did you get into insurance? Be specific. What moment, conversation, or event led you here?", ph: "Not 'I wanted to help people.' What exact moment made you say 'I am doing this'? Who was involved? What did you see, hear, or feel?",
                ex: "\"My neighbour passed away suddenly at 41. Heart attack. His wife had no idea he had zero life insurance. Within 3 months she had to sell their house in Hamilton because she could not carry the mortgage on one income with two kids. I helped her move into an apartment. Watching her explain to her 8 year old why they were leaving their home broke something in me. I realized this happens to families across Canada every single day and nobody is having the conversation that could prevent it.\"" },
              { key: "storyMoment", q: "Describe a specific moment where you realized this work actually changes lives. What happened? Who was the client? What was the outcome?", ph: "A specific client story (anonymized), a family situation you witnessed, a conversation that hit differently than you expected...",
                ex: "\"A young couple in Calgary, both working full time, just had their second baby. They kept saying they would deal with insurance 'next month.' I finally got them to sit down. We set up a term policy and critical illness coverage. Eight months later the husband was diagnosed with MS. The critical illness policy paid out $100K. His wife called me sobbing and said 'you saved our family.' They kept their house, he got treatment without financial stress, and the kids' lives did not change. That call is why I will never stop doing this work.\"" },
              { key: "storyWish", q: "What is the ONE thing you wish every Canadian family understood about financial protection? The thing that, if they knew it, would change how they think about insurance.", ph: "Not 'insurance is important.' What specific truth would shock them or open their eyes?",
                ex: "\"Most Canadians think their group benefits from work have them covered. They do not. The average group life insurance benefit is 1 to 2 times your salary. If you make $70K and you die, your family gets $70K to $140K. Your mortgage alone is $400K or more. That money runs out in less than a year. And the mortgage insurance the bank sold you? It protects the bank, not your family. The payout goes to them. Your spouse gets nothing. Most people have no idea until it is too late.\"" },
              { key: "storyMisconception", q: "What is the biggest lie or misconception your niche believes about insurance, money, or protection? The thing you hear constantly that drives you crazy.", ph: "The exact words people say to you that make you want to shake them. 'I am too young for insurance.' 'My work covers me.' 'I will deal with it later.'",
                ex: "\"'I am young and healthy, I do not need insurance right now.' I hear this from Canadians in their late 20s and early 30s every week. What they do not understand is that RIGHT NOW is when it is cheapest and easiest to get. A healthy 28 year old pays a fraction of what a 38 year old with high blood pressure pays. And if something changes with your health at 33, you might not qualify at all. You are not buying insurance because you think something will happen tomorrow. You are locking in your insurability while you still can.\"" },
              { key: "storyTell", q: "If you had 10 uninterrupted minutes with someone in your niche (no pitch, just real talk), what would you tell them? What do they NEED to hear?", ph: "Imagine they are sitting across from you at a coffee shop. No sales pressure. What would you say to genuinely help them?",
                ex: "\"I would ask them one question: if you could not work tomorrow because of an accident or a diagnosis, how many months could your family survive without your income? Most people go quiet. Then I would say: that silence right there is the problem. You are one unexpected event away from your family's life changing completely. Not because you are irresponsible. Because nobody ever sat you down and had this conversation. The bank did not. Your employer did not. Your parents probably did not. I am having it now because it takes 30 minutes to fix and it could be the most important 30 minutes for your family's future.\"" },
            ]).map((item) => (
              <Card key={item.key}>
                <label style={{ fontWeight: 600, fontSize: 14, color: C.navy, display: "block", marginBottom: 8 }}>{item.q}</label>
                <Collapse title="💡 See an example of a strong answer" subtitle="Tap to see what deep looks like" accent={C.accent}>
                  <div style={{ marginTop: 8, background: C.accent + "06", borderRadius: 10, padding: "14px 16px", fontSize: 13, lineHeight: 1.7, color: C.text, fontStyle: "italic", borderLeft: `3px solid ${C.accent}` }}>
                    {item.ex}
                  </div>
                  <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, marginTop: 8 }}>This level of detail is what produces content that stops people mid scroll. Surface answers produce surface content.</div>
                </Collapse>
                <textarea value={d[item.key]} onChange={(e) => u({ [item.key]: e.target.value })} placeholder={item.ph} rows={4} style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: "none", fontFamily: FONT, resize: "vertical", marginTop: 10, background: C.grayLight }} />
              </Card>
            ))}
            <Card accent={C.gold} style={{ background: C.goldLight }}>
              <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                <strong>Why this matters:</strong> Your stories will be woven into your content angles and copywriting. An agent who says "I got into insurance because my uncle passed with no coverage and I watched my aunt lose the house" creates content that hits completely differently than someone with no personal stake. Your story IS your marketing.
              </div>
            </Card>
            <NavRow onPrev={prev} onNext={next} />
          </div>
        );
      }

      // ── BRAND DNA ──
      case "branddna": {
        const isRecV = d.goal === "recruiting" || (d.goal === "hybrid" && d.hybridLead === "recruiting");
        return (
          <div>
            <SectionTitle sub="This is what makes your AI sound like YOU instead of a robot. Every answer here trains your AI to produce content you would actually post.">Your Voice</SectionTitle>

            <div style={{ background: C.accent + "08", border: `1px solid ${C.accent}15`, borderRadius: 16, padding: "24px", marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>WHY WE ARE ASKING THIS</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.textSoft }}>
                {isRecV ? "Two recruiters can target the same audience. But if one is naturally funny and the other is raw and vulnerable, their content attracts completely different people. Right now, most AI recruiting content sounds the same because nobody tells the AI HOW to sound. We are fixing that. These 5 questions create a voice profile so every piece of content your AI generates sounds like something you would actually post." : "Two agents can have the same niche, the same pain points, and the same content topics. But if one is naturally funny and the other is raw and vulnerable, their content should sound completely different. Right now, most AI content sounds the same because nobody tells the AI HOW to sound. We are fixing that. These 5 questions create a voice profile that goes into your AI Content Kit so every piece of content it generates sounds like something you would actually say."}
              </p>
            </div>

            {/* TONE */}
            <Card accent={C.accent}>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 4 }}>🎤 How do you naturally talk?</div>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 12 }}>Pick 2 to 3 that fit you best. There are no wrong answers. This is about who you already are, not who you think you should be.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { id: "motivational", label: "Motivational / Hype", desc: "You light people up. Energy is your currency." },
                  { id: "funny", label: "Funny / Sarcastic", desc: "You make people laugh first, then think." },
                  { id: "raw", label: "Raw / Vulnerable", desc: "You share the real stuff. No filter." },
                  { id: "calm", label: "Calm / Reassuring", desc: "You make people feel safe and understood." },
                  { id: "direct", label: "Direct / No BS", desc: "You tell it like it is. No sugar coating." },
                  { id: "storyteller", label: "Storyteller", desc: "You paint pictures with words. People get lost in your stories." },
                  { id: "data", label: "Data Driven / Logical", desc: "You lead with facts, numbers, and proof." },
                  { id: "empathetic", label: "Empathetic / Heart First", desc: "You feel what they feel. Connection is everything." },
                ].map((t) => (
                  <div key={t.id} onClick={() => {
                    const tones = d.voiceTones.includes(t.id) ? d.voiceTones.filter((x) => x !== t.id) : d.voiceTones.length < 3 ? [...d.voiceTones, t.id] : d.voiceTones;
                    u({ voiceTones: tones });
                  }} style={{
                    background: d.voiceTones.includes(t.id) ? C.accent + "10" : C.card,
                    border: `2px solid ${d.voiceTones.includes(t.id) ? C.accent : C.border}`,
                    borderRadius: 12, padding: "12px 16px", cursor: "pointer", transition: "all 0.2s", flex: "1 1 calc(50% - 4px)", minWidth: 160,
                    boxShadow: d.voiceTones.includes(t.id) ? `0 2px 8px ${C.accent}15` : "none",
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: d.voiceTones.includes(t.id) ? C.accent : C.navy }}>{t.label}</div>
                    <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
              {d.voiceTones.length > 0 && (
                <div style={{ marginTop: 10, fontSize: 12, color: C.accent, fontWeight: 600 }}>Selected: {d.voiceTones.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(", ")}</div>
              )}
            </Card>

            {/* NEVER SAY */}
            <Card accent={C.red}>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 4 }}>🚫 What would you NEVER say or do in your content?</div>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 10 }}>This prevents the AI from generating content that makes you cringe. If you see it in a draft and think "I would never post that," tell us now so it never appears.</p>
              <textarea value={d.voiceNever} onChange={(e) => u({ voiceNever: e.target.value })} placeholder={isRecV ? "Example: \"I would never post income screenshots or make income claims. I would never trash other agencies by name. I would never say 'be your own boss' because it sounds like an MLM pitch. I would never use fake urgency like 'only 2 spots left on my team.' I hate the phrase 'passive income.'\"" : "Example: \"I would never use fear tactics to sell. I would never bash other agents or companies. I would never post fake urgency like 'only 3 spots left.' I hate the word hustle. I would never post cringe motivational quotes over sunset photos.\""} rows={3} style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: "none", fontFamily: FONT, resize: "vertical", background: C.grayLight }} />
            </Card>

            {/* NATURAL PHRASES */}
            <Card accent={C.gold}>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 4 }}>💬 What words or phrases do you say all the time?</div>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 10 }}>Everyone has verbal fingerprints. The little phrases that make you sound like YOU. When your AI uses these in the content, you will read it and think "that actually sounds like me." List 3 to 5.</p>
              <textarea value={d.voicePhrases} onChange={(e) => u({ voicePhrases: e.target.value })} placeholder={isRecV ? "Example: \"Listen...\" \"Here is what nobody tells you about this industry.\" \"I am not going to sugarcoat it.\" \"When I was still at my old job...\" \"The difference between a good agency and a bad one is...\"" : "Example: \"Here is the thing...\" \"Let me be real with you.\" \"Nobody is talking about this.\" \"This is not financial advice but...\" \"I say 'bes' and 'teh' (Tagalog filler words) when I talk.\""} rows={3} style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: "none", fontFamily: FONT, resize: "vertical", background: C.grayLight }} />
            </Card>

            {/* CREATORS THEY ADMIRE */}
            <Card accent={C.green}>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 4 }}>⭐ Name 2 to 3 content creators you love watching</div>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 10 }}>Any industry, not just insurance. This is not about copying them. It is about calibrating the energy, pacing, and style your AI writes with. If you love Gary Vee, the AI writes punchy and aggressive. If you love Brene Brown, it writes vulnerable and reflective.</p>
              <textarea value={d.voiceAdmire} onChange={(e) => u({ voiceAdmire: e.target.value })} placeholder={isRecV ? "Example: \"I love Alex Hormozi because he breaks down business simply and does not waste your time. I watch a lot of Patrick Bet-David because he talks about building teams and leadership. I follow this agent on TikTok who shows her real daily schedule and it makes people want to join the industry.\"" : "Example: \"I love Alex Hormozi because he is direct and backs everything with logic. I watch a lot of Jay Shetty because he tells stories that make you feel something. I also follow this Filipino Canadian creator @marikitamama because her energy is infectious.\""} rows={3} style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: "none", fontFamily: FONT, resize: "vertical", background: C.grayLight }} />
            </Card>

            {/* HOT TAKE */}
            <Card accent={C.purple}>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 4 }}>🔥 What is your unpopular opinion or "hot take"?</div>
              <p style={{ fontSize: 13, color: C.gray, marginBottom: 10 }}>Every strong personal brand has a point of view that goes against the mainstream. This becomes recurring content fuel and positions you as someone with a real opinion, not a generic talking head. What do you believe that most people in your industry disagree with?</p>
              <textarea value={d.voiceHotTake} onChange={(e) => u({ voiceHotTake: e.target.value })} placeholder={isRecV ? "Example: \"I think most insurance agencies recruit people just to hit their numbers and then abandon them. That is why 80% of new agents quit in the first year. I think the industry does not have a recruiting problem, it has a retention problem. If agencies actually invested in training, systems, and support, agents would stay. The ones that do not invest in their people deserve to lose them.\"" : "Example: \"I think whole life insurance is a waste for 90% of people and the industry pushes it because commissions are higher. I think most agencies set their agents up to fail. I think you do not need a financial advisor if you spend 30 minutes educating yourself.\""} rows={3} style={{ width: "100%", padding: "12px 16px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: "none", fontFamily: FONT, resize: "vertical", background: C.grayLight }} />
            </Card>

            <div style={{ background: C.accent + "08", border: `1px solid ${C.accent}15`, borderRadius: 16, padding: "20px 24px", marginTop: 8, textAlign: "center" }}>
              <p style={{ fontSize: 14, color: C.textSoft, lineHeight: 1.6 }}>Everything you just answered gets packaged into your AI Content Kit. When you download it and paste it into Claude or ChatGPT, the AI will write content that sounds like you talked into a mic and someone transcribed it. Not like a robot. Not like every other agent. Like <span style={{ color: C.accent, fontWeight: 700 }}>you</span>.</p>
            </div>

            <NavRow onPrev={prev} onNext={next} nextDisabled={d.voiceTones.length === 0} />
          </div>
        );
      }

      // ── RESOURCES ──
      case "resources":
        return (
          <div>
            <SectionTitle sub="Honest answers here build a plan you can actually execute. No point building a YouTube plan if you have 3 hours a week.">Your Resources</SectionTitle>
            <Card>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Monthly marketing budget (CAD)</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {["$0 (organic only)", "$50 to $150/mo", "$150 to $500/mo", "$500+/mo"].map((b) => (
                  <div key={b} onClick={() => u({ budget: b })} style={{ background: d.budget === b ? C.accent + "10" : C.grayLight, border: `1px solid ${d.budget === b ? C.accent : C.border}`, borderRadius: 10, padding: "12px 16px", cursor: "pointer", textAlign: "center", fontWeight: 600, fontSize: 14, color: C.navy, transition: "all 0.2s" }}>{b}</div>
                ))}
              </div>
            </Card>
            <Card>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Do you have a phone or camera you can film with?</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[{ v: true, l: "Yes" }, { v: false, l: "No" }].map((o) => (
                  <div key={String(o.v)} onClick={() => u({ hasCamera: o.v })} style={{ background: d.hasCamera === o.v ? C.accent + "10" : C.grayLight, border: `1px solid ${d.hasCamera === o.v ? C.accent : C.border}`, borderRadius: 10, padding: "12px", cursor: "pointer", textAlign: "center", fontWeight: 600, fontSize: 14, color: C.navy }}>{o.l}</div>
                ))}
              </div>
            </Card>
            {d.hasCamera === true && (
              <Card>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Comfortable being on camera?</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[{ v: true, l: "Yes, let's go" }, { v: false, l: "Not yet" }].map((o) => (
                    <div key={String(o.v)} onClick={() => u({ cameraComfort: o.v })} style={{ background: d.cameraComfort === o.v ? C.accent + "10" : C.grayLight, border: `1px solid ${d.cameraComfort === o.v ? C.accent : C.border}`, borderRadius: 10, padding: "12px", cursor: "pointer", textAlign: "center", fontWeight: 600, fontSize: 14, color: C.navy }}>{o.l}</div>
                  ))}
                </div>
              </Card>
            )}
            <Card>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Hours per week for marketing</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {["3 to 5", "5 to 8", "8 to 12", "12+"].map((h) => (
                  <div key={h} onClick={() => u({ hoursPerWeek: h })} style={{ background: d.hoursPerWeek === h ? C.accent + "10" : C.grayLight, border: `1px solid ${d.hoursPerWeek === h ? C.accent : C.border}`, borderRadius: 10, padding: "12px", cursor: "pointer", textAlign: "center", fontWeight: 600, fontSize: 13, color: C.navy }}>{h} hrs</div>
                ))}
              </div>
            </Card>
            <NavRow onPrev={prev} onNext={next} nextDisabled={!d.budget || !d.hoursPerWeek} />
          </div>
        );

      // ── CHANNEL SELECTION ──
      case "channel":
        // Recommendation engine
        const rec = (() => {
          const hrs = d.hoursPerWeek;
          const cam = d.cameraComfort;
          const budget = d.budget;
          if (hrs === "12+" && cam === true) return { pick: "aggressive_youtube", reason: "You have 12+ hours per week and are comfortable on camera. YouTube is the strongest compounding asset you can build. One video per week creates a library that generates leads for years. This is the highest ROI path for someone with your resources." };
          if (hrs === "12+" && cam !== true) return { pick: "aggressive_community", reason: "You have 12+ hours per week but are not on camera yet. A Facebook Group with Lives lets you build a community and go live without the production overhead of YouTube. Lives are less intimidating than edited videos and build trust fast." };
          if (hrs === "8 to 12" && cam === true) return { pick: "standard_digital", reason: "You have 8 to 12 hours per week and are comfortable on camera. Standard Digital gives you outreach for immediate conversations plus a Facebook Page with content that compounds over time. Strong balance of speed and sustainability." };
          if (hrs === "8 to 12" && cam !== true) return { pick: "standard_nondigital", reason: "You have 8 to 12 hours per week but are not on camera yet. Outreach plus networking events lets you build face to face relationships while your Rolling List keeps the pipeline moving. No content creation pressure." };
          if (hrs === "5 to 8") return { pick: "standard_digital", reason: "With 5 to 8 hours per week, Standard Digital is your sweet spot. Outreach fills the pipeline immediately while your Facebook content builds in the background. You have just enough time to do both without burning out." };
          if (hrs === "3 to 5") return { pick: "conservative", reason: "With 3 to 5 hours per week, Conservative is realistic. Outreach plus your FAST link. The Rolling List is your engine. Be honest: anything more ambitious with this time commitment will lead to inconsistency, and inconsistency kills results." };
          return { pick: "standard_digital", reason: "Based on your profile, Standard Digital gives you the best balance of immediate results (outreach) and long term growth (content)." };
        })();
        return (
          <div>
            <SectionTitle sub="Remember: traffic is how people find you. FAST Links is where they convert. Pick your traffic strategy below.">Pick Your Traffic Channel</SectionTitle>

            {/* RECOMMENDATION */}
            <Card accent={CHANNELS[rec.pick]?.color} style={{ background: CHANNELS[rec.pick]?.color + "08", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>🎯</span>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.navy }}>Recommended for You: {CHANNELS[rec.pick]?.label}</div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, margin: "0 0 12px" }}>{rec.reason}</p>
              <button onClick={() => u({ channel: rec.pick })} style={{ background: CHANNELS[rec.pick]?.color, color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>
                Select {CHANNELS[rec.pick]?.label}
              </button>
            </Card>

            {d.cameraComfort === false && (
              <Card accent={C.coral} style={{ background: C.coralLight }}>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>You said you are not comfortable on camera yet. YouTube requires it. Pick Conservative or Standard to start, or choose YouTube anyway and commit to getting uncomfortable. Your call.</div>
              </Card>
            )}

            {/* COMPARISON TABLE */}
            <div style={{ overflowX: "auto", marginBottom: 20 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    {["", "First Lead", "Difficulty", "Compounds?"].map((h, i) => (
                      <th key={i} style={{ padding: "10px 12px", textAlign: "left", borderBottom: `2px solid ${C.border}`, color: C.navy, fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.values(CHANNELS).map((ch, i) => (
                    <tr key={i}>
                      <td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.grayLight}`, fontWeight: 700, color: ch.color }}>{ch.label}</td>
                      <td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.grayLight}` }}>{ch.firstLead}</td>
                      <td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.grayLight}` }}>{ch.difficulty.split(".")[0]}</td>
                      <td style={{ padding: "10px 12px", borderBottom: `1px solid ${C.grayLight}` }}>{ch.compounds.split(".")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {Object.entries(CHANNELS).map(([key, ch]) => (
              <div key={key} onClick={() => u({ channel: key })} style={{ background: d.channel === key ? ch.color + "08" : C.card, border: `2px solid ${d.channel === key ? ch.color : C.border}`, borderRadius: 16, padding: "20px 22px", marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <Pill color={ch.color}>{ch.tag}</Pill>
                  <span style={{ fontWeight: 700, fontSize: 16, color: C.navy }}>{ch.label}</span>
                </div>
                <div style={{ fontSize: 14, color: C.text, marginBottom: 8 }}>{ch.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                  {ch.components.map((c, i) => (
                    <span key={i} style={{ fontSize: 11, background: ch.color + "12", color: ch.color, padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>{c}</span>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
                  <div><span style={{ color: C.gray }}>Effort:</span> <span style={{ fontWeight: 600 }}>{ch.effort}</span></div>
                  <div><span style={{ color: C.gray }}>First Lead:</span> <span style={{ fontWeight: 600 }}>{ch.firstLead}</span></div>
                </div>
              </div>
            ))}

            {/* OUTREACH PLATFORM */}
            {d.channel && (
              <Card style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Which platform for outreach?</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {["Facebook", "LinkedIn"].map((p) => (
                    <div key={p} onClick={() => u({ outreachPlatform: p })} style={{ background: d.outreachPlatform === p ? C.accent + "10" : C.grayLight, border: `1px solid ${d.outreachPlatform === p ? C.accent : C.border}`, borderRadius: 10, padding: "12px", cursor: "pointer", textAlign: "center", fontWeight: 600, fontSize: 14, color: C.navy }}>{p}</div>
                  ))}
                </div>
              </Card>
            )}

            <NavRow onPrev={prev} onNext={next} nextDisabled={!d.channel || !d.outreachPlatform} />
          </div>
        );

      // ── CONVERTER ──
      case "converter":
        return (
          <div>
            <SectionTitle sub="Your traffic channel brings people in. Your converter turns them into booked appointments. These are your four options.">Pick Your Lead Converter</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { id: "fast_only", icon: "⚡", title: "FAST Links Only", desc: "Your personalized landing page with calendar, capture, and nurture. Already built for you. Start here if you want to keep it simple.", color: C.accent },
                { id: "fast_page", icon: "📱", title: "FAST Links + FB Page", desc: "FAST Links for booking calls plus a Facebook Page (personal or business) where you post content consistently. The algorithm pushes your posts to new people over time.", color: C.gold },
                { id: "fast_group", icon: "👥", title: "FAST Links + FB Group", desc: "FAST Links for booking calls plus a private Facebook Group you own. Members see your posts daily in their feed. You control the community and nurture trust through lives and discussions.", color: C.green },
                { id: "own_funnel", icon: "🛠", title: "Your Own Funnel", desc: "You build your own landing pages, email sequences, and booking system from scratch. Full control but requires time, budget, and technical knowledge.", color: C.purple },
              ].map((o) => (
                <OptionCard key={o.id} selected={d.converter === o.id} onClick={() => u({ converter: o.id })} {...o} />
              ))}
            </div>

            {/* PAGE vs GROUP EXPLAINER */}
            <Collapse title="What is the difference between a Facebook Page and a Facebook Group?" subtitle="Tap to learn which one fits your strategy" accent={C.accent}>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                  <div style={{ background: C.card, borderRadius: 12, padding: "16px", border: `1px solid ${C.border}` }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 6 }}>Facebook Page</div>
                    <div style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.6 }}>
                      Public profile for your brand. People follow you. Your posts go into their feed but the algorithm decides who sees them. Great for discoverability. New people find you through Reels, shares, and search. You post content and hope the algorithm pushes it. Think of it like a billboard that sometimes gets shown to the right people.
                    </div>
                  </div>
                  <div style={{ background: C.card, borderRadius: 12, padding: "16px", border: `1px solid ${C.border}` }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 6 }}>Facebook Group</div>
                    <div style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.6 }}>
                      Private community you own. People join and see every post because group content gets priority in the feed. You control the conversation, ask questions, go live, and build real relationships. Harder to grow but much deeper trust. Think of it like hosting a dinner party where everyone knows your name.
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.6 }}>
                  <strong style={{ color: C.text }}>Which should you pick?</strong> If you want reach and discoverability, go with a Page. If you want depth and trust, go with a Group. Many successful agents run both: a Page for content that attracts new people, and a Group where they nurture those people into booked calls.
                </div>
              </div>
            </Collapse>

            {/* ROLLING LIST DOWNLOAD */}
            <Card accent={C.green} style={{ background: C.greenLight }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 8 }}>📥 Get Your Rolling List Tracker</div>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.6, marginBottom: 12 }}>This Google Sheet has everything: daily rules, follow up framework, replacement rules, outreach scripts for unlicensed and licensed recruits, list expansion strategies, and tracking columns. Click below to make your own copy.</p>
              <button onClick={() => openRollingList()} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>
                Open Rolling List (Google Sheets) →
              </button>
            </Card>

            <NavRow onPrev={prev} onNext={next} nextDisabled={!d.converter} nextLabel="Run Research Engine →" />
          </div>
        );

      // ── RESEARCH ENGINE ──
      case "research":
        return (
          <div>
            <SectionTitle sub="The Mavericks Framework builds your audience avatar, mines pain points, maps desires, and generates content angles. One click. Personalized to your niche and your story.">Mavericks Research Engine</SectionTitle>

            {!d.researchResult && !d.researchLoading && (
              <Card style={{ textAlign: "center", padding: "40px 28px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🧠</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: C.navy, marginBottom: 8 }}>Ready to research</div>
                <p style={{ fontSize: 14, color: C.gray, marginBottom: 20, maxWidth: 400, margin: "0 auto 20px" }}>This will build your audience avatar, mine pain points, map desires, generate 20 content angles, and write 3 copy swipes using your personal stories.</p>
                <button onClick={runResearch} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>
                  Run Mavericks Research
                </button>
              </Card>
            )}

            {d.researchLoading && (
              <Card style={{ textAlign: "center", padding: "60px 28px" }}>
                <div style={{ position: "relative", width: 56, height: 56, margin: "0 auto 24px" }}>
                  <div style={{ width: 56, height: 56, border: `3px solid ${C.grayLight}`, borderTopColor: C.accent, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <img src={LOGO_B64} alt="" style={{ width: 28, height: 28, objectFit: "contain", opacity: 0.8 }} />
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 17, color: C.navy, marginBottom: 6 }}>Running deep research...</div>
                <div style={{ fontSize: 13, color: C.gray, animation: "pulse 2s ease-in-out infinite" }}>Building avatar, mining pains, mapping desires, generating angles...</div>
              </Card>
            )}

            {d.researchResult && !d.researchLoading && (
              <div>
                <Card style={{ maxHeight: 600, overflowY: "auto" }}>
                  <div>{renderText(d.researchResult)}</div>
                </Card>
                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                  <button onClick={runResearch} style={{ background: C.grayLight, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT, color: C.navy }}>🔄 Re run for New Angles</button>
                </div>
              </div>
            )}

            <NavRow onPrev={prev} onNext={d.researchResult ? next : null} nextLabel="See Your 90 Day Plan →" />
          </div>
        );

      // ── 90 DAY PLAN ──
      case "plan":
        return <PlanView data={d} onPrev={prev} />;

      default:
        return null;
    }
  };

  // ═══════════════════════════════════════════
  // APP SHELL
  // ═══════════════════════════════════════════

  // If locked (2 generations used), show lock screen
  if (isLocked && !d.committed) {
    return (
      <div style={{ fontFamily: FONT, background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        
        <div style={{ maxWidth: 500, textAlign: "center" }}>
          <img src={LOGO_B64} alt="Mavericks" style={{ width: 64, height: 64, objectFit: "contain", margin: "0 auto 24px", display: "block", opacity: 0.8 }} />
          <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 800, color: C.text, marginBottom: 16 }}>Your Plan Is Built</div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: C.textDim, marginBottom: 24 }}>
            You have used both of your generations. Your marketing plan is set. Now it is time to execute, not redesign.
          </p>
          <div style={{ background: C.card, borderRadius: 16, padding: "24px", marginBottom: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 14, color: C.accent, fontWeight: 700, marginBottom: 12 }}>WHAT TO DO NOW</div>
            <div style={{ textAlign: "left" }}>
              {["Open your AI Content Kit (.txt file you downloaded) and paste it into Claude or ChatGPT", "Follow your 90 day plan phase by phase. Do not skip ahead", "Use the Train Your AI prompts to generate fresh content every week", "If you need to refine your content angles, use the Monthly Research Refresh prompt in your AI, not this generator", "Commit to 12 months. The agents who succeed are the ones who stop planning and start executing"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14, fontSize: 14, lineHeight: 1.6 }}>
                  <span style={{ color: C.accent, fontSize: 16, marginTop: 1 }}>→</span>
                  <span style={{ color: C.textSoft }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 13, color: "#666" }}>The generator is locked because switching strategies is the fastest way to fail. Your plan works. Trust the process.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: FONT, background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      <style>{ANIM_CSS}</style>

      {/* COMMITMENT GATE OVERLAY */}
      {d.showCommitGate && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(8px)" }}>
          <div style={{ maxWidth: 520, background: C.bg, borderRadius: 20, padding: "40px 32px", textAlign: "center", border: `1px solid ${C.accent}20`, boxShadow: `0 20px 60px rgba(0,0,0,0.5)`, animation: "scaleIn 0.3s ease" }}>
            <img src={LOGO_B64} alt="" style={{ width: 48, height: 48, objectFit: "contain", margin: "0 auto 20px", display: "block" }} />
            <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, color: C.text, marginBottom: 12, lineHeight: 1.3 }}>Before You Generate</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textDim, marginBottom: 20 }}>
              This plan is designed to work for <span style={{ color: C.accent, fontWeight: 700 }}>12 months minimum</span>. Switching strategies every 30 days is the number one reason agents fail at marketing. The agents who succeed pick ONE plan and execute it consistently.
            </p>
            <div style={{ background: C.cardBorder, borderRadius: 12, padding: "16px 20px", marginBottom: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 14, color: C.text, fontWeight: 700, marginBottom: 8 }}>You have {2 - getGenCount()} generation{2 - getGenCount() !== 1 ? "s" : ""} remaining</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {[0, 1].map((i) => (
                  <div key={i} style={{ width: 40, height: 40, borderRadius: 10, background: i < getGenCount() ? C.gray + "40" : C.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: `2px solid ${i < getGenCount() ? C.gray + "30" : C.accent}` }}>
                    {i < getGenCount() ? <span style={{ color: "#666" }}>✓</span> : <span style={{ color: "#fff" }}>★</span>}
                  </div>
                ))}
              </div>
              {getGenCount() === 1 && (
                <div style={{ fontSize: 13, color: C.red, fontWeight: 600, marginTop: 10 }}>This is your last generation. Make sure your answers are exactly right.</div>
              )}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "#888", marginBottom: 24 }}>
              If you are not confident in your answers, go back and refine them. Once generated, commit to this plan for a full year before changing strategies. You can always refine your content using the AI prompts. You do not need to regenerate the plan.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => u({ showCommitGate: false })} style={{ background: C.cardBorder, color: C.textDim, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>
                ← Go Back and Refine
              </button>
              <button onClick={confirmCommit} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT, boxShadow: `0 4px 16px ${C.accent}40` }}>
                I Am Ready. Generate My Plan.
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROGRESS */}
      <div className="mav-progress" style={{ background: C.bg, borderBottom: `1px solid ${C.separator || C.border}`, padding: "12px 18px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", gap: 3, maxWidth: 620, margin: "0 auto" }}>
          {WIZARD_STEPS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 1.5, background: i < step ? C.accent : i === step ? C.accent : (C.cardBorder || C.border), transition: "background .35s ease" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 6 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.textDim || C.gray, letterSpacing: 1.5, textTransform: "uppercase" }}>
            {WIZARD_STEPS[step]?.label} · {step + 1} of {WIZARD_STEPS.length}
          </div>
          {getGenCount() > 0 && (
            <div style={{ background: getGenCount() >= 2 ? C.redBg || C.red + "20" : C.accent + "1f", border: `1px solid ${getGenCount() >= 2 ? C.red : C.accent}`, borderRadius: 9, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: getGenCount() >= 2 ? C.red : C.accent, fontVariantNumeric: "tabular-nums" }}>
              {2 - getGenCount()}/{2}
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div ref={scrollRef} className="mav-content" style={{ flex: 1, overflowY: "auto", padding: "28px 24px 80px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// 90-DAY PLAN VIEW (Aggressive YouTube)
// ═══════════════════════════════════════════
function PlanView({ data, onPrev }) {
  const [tab, setTab] = useState("overview");
  const [printMode, setPrintMode] = useState(false);
  const pm = (t) => printMode || tab === t;
  const ch = CHANNELS[data.channel];

  const downloadPDF = () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintMode(false), 500);
    }, 300);
  };

  // TODO: Add Conservative, Standard Digital, Standard Non-Digital, Aggressive Community templates
  // For now, Aggressive YouTube is the full build. Others show a summary.

  const isYouTube = data.channel === "aggressive_youtube";
  const isNonDigital = data.channel === "standard_nondigital";
  const isConservative = data.channel === "conservative";
  const isStdDigital = data.channel === "standard_digital";
  const isCommunity = data.channel === "aggressive_community";

  const planTabs = isYouTube ? [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "phase1", label: "Days 1 to 30", icon: "🚀" },
    { id: "phase2", label: "Days 31 to 60", icon: "📈" },
    { id: "phase3", label: "Days 61 to 90", icon: "🏆" },
    { id: "weekly", label: "Weekly Flow", icon: "📅" },
    { id: "outreach", label: "Outreach", icon: "💬" },
    { id: "rollinglist", label: "Rolling List", icon: "📋" },
    { id: "fbcontent", label: "FB Content", icon: "📱" },
    { id: "aicontent", label: "Train Your AI", icon: "🤖" },
    { id: "scorecard", label: "Scorecard", icon: "✅" },
  ] : isNonDigital ? [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "phase1", label: "Days 1 to 30", icon: "🚀" },
    { id: "phase2", label: "Days 31 to 60", icon: "📈" },
    { id: "phase3", label: "Days 61 to 90", icon: "🏆" },
    { id: "networking", label: "Networking", icon: "🤝" },
    { id: "outreach", label: "Outreach", icon: "💬" },
    { id: "rollinglist", label: "Rolling List", icon: "📋" },
    { id: "aicontent", label: "Train Your AI", icon: "🤖" },
    { id: "scorecard", label: "Scorecard", icon: "✅" },
  ] : [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "phase1", label: "Days 1 to 30", icon: "🚀" },
    { id: "phase2", label: "Days 31 to 60", icon: "📈" },
    { id: "phase3", label: "Days 61 to 90", icon: "🏆" },
    ...(isConservative ? [] : [{ id: "fbcontent", label: "FB Content", icon: "📱" }]),
    { id: "outreach", label: "Outreach", icon: "💬" },
    { id: "rollinglist", label: "Rolling List", icon: "📋" },
    { id: "aicontent", label: "Train Your AI", icon: "🤖" },
    { id: "scorecard", label: "Scorecard", icon: "✅" },
  ];

  return (
    <PrintContext.Provider value={printMode}>
    <div className="mav-plan-root">
      {/* PLAN HEADER */}
      <div style={{ background: "#2a2520", borderRadius: 16, padding: "24px 24px", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>YOUR 90 DAY PLAN</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: -0.3 }}>{ch?.label} Track</div>
          </div>
          <button onClick={downloadPDF} className="mav-noprint" style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "8px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
            ⬇ Save PDF
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[
            { l: "Goal", v: data.goal === "production" ? "Production" : data.goal === "recruiting" ? "Recruiting" : "Hybrid" },
            { l: "Audience", v: data.niche?.split("(")[0]?.trim() },
            { l: "Outreach", v: data.outreachPlatform },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 9, padding: "4px 12px", fontSize: 12 }}>
              <span style={{ color: C.accent, fontWeight: 600 }}>{item.l}:</span> <span style={{ color: "#fff" }}>{item.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PLAN TABS */}
      <div className="mav-noprint" style={{ overflowX: "auto", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 4, minWidth: "max-content" }}>
          {planTabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ background: tab === t.id ? C.accent : "transparent", color: tab === t.id ? "#fff" : (C.textDim || C.gray), border: tab === t.id ? "none" : `1px solid ${C.cardBorder || C.border}`, borderRadius: 12, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: FONT, transition: "all .2s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* PLAN CONTENT */}
      {pm("overview") && (
        <div>
          <SectionTitle sub={`${ch?.desc}. Here is your full breakdown.`}>Plan Overview</SectionTitle>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            <StatBox label="First Lead" value={ch?.firstLead} color={C.accent} />
            <StatBox label="Weekly Effort" value={ch?.effort} color={C.coral} />
            <StatBox label="Lead Quality" value={ch?.leadQuality?.split(".")[0]} color={C.gold} />
          </div>

          {/* TRAFFIC + CONVERSION REMINDER */}
          <Card accent={C.coral}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 8 }}>Your Traffic (Lead Generation)</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ch?.components.filter((c) => c !== "FAST Links").map((c, i) => (
                <span key={i} style={{ background: C.coral + "12", color: C.coral, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{c}</span>
              ))}
            </div>
            <p style={{ fontSize: 13, color: C.gray, marginTop: 8 }}>This is HOW people find you. These are the activities that put you in front of potential {data.goal === "recruiting" ? "recruits" : data.goal === "hybrid" ? "clients and recruits" : "clients"}.</p>
          </Card>
          <Card accent={C.accent}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 8 }}>Your Conversion Tool</div>
            <span style={{ background: C.accent + "12", color: C.accent, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>⚡ FAST Links</span>
            <p style={{ fontSize: 13, color: C.gray, marginTop: 8 }}>This is WHERE you send them. Every piece of content, every outreach message, every conversation ends with your FAST link. It handles landing page, calendar, capture, and nurture. Your only job is to drive traffic to it.</p>
          </Card>

          {data.channel === "conservative" && (
            <Card accent={C.red} style={{ background: "#FEF2F2" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.red, marginBottom: 8 }}>⚠️ Why Outreach Alone Runs Out</div>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>Outreach is trading your time for conversations. Every name you contact is one less name on your list. If you send 10 messages today and do not add 10 new names, you are one day closer to zero. The Rolling List replacement rules in this plan are not optional. They are the difference between running out of leads in 30 days and sustaining this for 90 days and beyond.</p>
            </Card>
          )}
        </div>
      )}

      {/* ── PHASE 1: DAYS 1-30 (AGGRESSIVE YOUTUBE) ── */}
      {pm("phase1") && isYouTube && (
        <div>
          <SectionTitle sub="Foundation. Research. First videos. Rolling List running in parallel.">Phase 1: Days 1 to 30</SectionTitle>

          <Collapse title="Days 1 to 5: Research Sprint" subtitle="No filming. Research only." accent={C.teal} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Go to r/PersonalFinanceCanada. Read the top 50 posts. Copy every question, complaint, and emotional statement into a Google Doc called 'Audience Research'",
                "Search YouTube for your niche topics (life insurance Canada, mortgage protection, RRSP explained). Watch the top 5 results for each. Read every comment. Add to your doc",
                "Google 10 financial topics with 'Reddit' added. Read the threads. Check 'People Also Ask' boxes. Add everything",
                "Text or call 5 people in your niche. Ask: 'What is the one financial question that keeps you up at night?' Write down their exact words",
                "Organize into categories: main topics under each, top 3 misconceptions, top 3 emotions, top 3 questions per category",
                "Run the Mavericks Research Engine (previous step) if you have not already. Print or save the output",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 1 to 5: Rolling List (Parallel Track)" subtitle="This runs alongside everything else" accent={C.green}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Download your Rolling List tracker (from the Converter step)",
                "Write down 50 names: friends, family, coworkers, acquaintances, social media connections, past colleagues",
                "Categorize each as Warm (know you personally) or Cold (connected online but no real relationship)",
                "Block 1 to 2 hours daily for outreach. This is non negotiable",
                "Send your first 10 outreach messages using the framework in the Outreach tab",
                "Add 5 to 10 new names to the list. Every day. No exceptions",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 6 to 8: YouTube Channel Setup" subtitle="Step by step. Under $150 total." accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8 }}>CREATE YOUR CHANNEL</div>
              <Checklist items={[
                "Go to youtube.com. Sign in with your Google account. Click your profile icon (top right) then 'Create a Channel'",
                "Use your real name (not a brand name). People trust faces and names, not logos",
                "Channel description: one sentence. 'I help [YOUR AUDIENCE] in Canada [WHAT YOU DO FOR THEM].' That is it",
                "Upload a professional headshot as your channel icon. Clean background, good lighting, friendly face",
                "Create a channel banner in Canva (free): your name + one line about what you do + your FAST Link URL. Use the YouTube banner template (2560 x 1440 px)",
                "About section: paste your FAST Link as the primary link. Add your Facebook Page link as secondary",
                "Set your channel location to Canada. This helps YouTube recommend you to Canadian viewers",
                "Create your first playlist: name it something your audience would search for (e.g., 'Life Insurance Explained Canada')",
              ]} />
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12, marginTop: 20 }}>EQUIPMENT CHECKLIST (total: $90 to $150 CAD)</div>
              <Checklist items={[
                "Camera: your smartphone (iPhone or Android). Do NOT buy a camera. Your phone shoots 1080p or 4K which is more than enough",
                "Microphone: wireless lav mic ($40 to $70 CAD on Amazon). This is the MOST important purchase. Bad audio kills videos faster than bad lighting. Clip it to your collar, 6 inches below your chin",
                "Lighting: ring light ($30 to $50 CAD) OR film facing a window with natural light. Natural light is free and looks professional. Ring light is better for evenings or cloudy days",
                "Tripod: phone tripod ($20 to $30 CAD). Set at eye level. Not below (makes you look big) and not above (makes you look small). Your eyes should be in the top third of the frame",
                "Teleprompter app: download BigVu or PromptSmart (both free). Load your bullet points so you can glance at them while looking at the lens",
                "FREE editing software: CapCut (best for beginners, drag and drop) or Descript (edit video by editing text, removes filler words in one click)",
                "FREE design tool: Canva for thumbnails. Use the YouTube Thumbnail template",
                "FREE SEO tool: install VidIQ Chrome extension to check search volume on your video titles before publishing",
              ]} />
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12, marginTop: 20 }}>FILMING SETUP (do this once, keep it permanent)</div>
              <Checklist items={[
                "Find your filming spot: clean background (bookshelf, plain wall with a plant, or a tidy office corner). No clutter behind you",
                "Position your phone on the tripod at eye level, 3 to 4 feet away from you, in LANDSCAPE mode (horizontal)",
                "Set phone to 1080p resolution (Settings > Camera > Record Video > 1080p at 30fps)",
                "Clip lav mic to your collar. Do a 10 second test recording and play it back. Audio should be clear with no echo",
                "Check lighting: your face should be evenly lit with no harsh shadows. If using a window, face the window directly",
                "Open teleprompter app on a second device (tablet, laptop, or second phone) and place it right next to your camera lens so your eyes stay near the lens while reading",
                "Mark your position on the floor with tape so you can sit in the exact same spot every time. Consistency = faster setup",
              ]} />
            </div>
          </Collapse>

          <Collapse title="📺 YouTube Resources: Watch Before You Start" subtitle="These will save you hours of trial and error" accent={C.accent}>
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>Watch these before you film your first video. Each one covers a specific stage of the process. Do not binge them all at once. Watch the first one today, set up your channel, then watch the next one before you film.</p>
              {[
                { title: "How to Start a YouTube Channel (Complete Beginner Guide)", when: "Watch FIRST before setting up your channel", url: "https://www.youtube.com/watch?v=sGKXSLmZBz8", color: C.accent },
                { title: "If I Started a YouTube Channel in 2026, I'd Do This", when: "Watch SECOND for strategy and mindset before your first video", url: "https://www.youtube.com/watch?v=QB26WVge0s8", color: C.gold },
                { title: "How to Record Your First YouTube Video (With Just Your Phone)", when: "Watch BEFORE your practice filming session (Days 9 to 11)", url: "https://www.youtube.com/watch?v=56lEsgUUA84", color: C.green },
                { title: "How to Edit a YouTube Video in 2026 (Start to Finish)", when: "Watch BEFORE your first edit session", url: "https://www.youtube.com/watch?v=AV4UnrHznR8", color: C.purple },
              ].map((r, i) => (
                <div key={i} onClick={() => window.open(r.url, "_blank")} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${r.color}`, borderRadius: 12, padding: "14px 18px", marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }} className="mav-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{r.title}</div>
                      <div style={{ fontSize: 12, color: r.color, fontWeight: 600, marginTop: 3 }}>📌 {r.when}</div>
                    </div>
                    <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 12 }}>Watch →</div>
                  </div>
                </div>
              ))}
            </div>
          </Collapse>

          <Collapse title="Days 6 to 8: Facebook Page Setup" subtitle="Your second traffic source" accent={C.coral}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Create a Facebook Business Page (not a personal profile post). Use your real name: '[Your Name] | Financial Advisor' or similar",
                "Profile photo: same professional headshot as YouTube",
                "Cover photo: Canva design with your name, what you do, and your FAST Link URL",
                "About section: one sentence about who you help and how. Add your FAST Link",
                "Add a CTA button: 'Book Now' linking to your FAST Link",
                "Post your first piece of content: introduce yourself, why you do this, who you help. Keep it under 200 words",
                "Invite your warm contacts to follow the page",
              ]} />
            </div>
          </Collapse>

          <Collapse title="📱 Facebook Page Resources: Watch Before You Post" subtitle="Set up your page right from Day 1" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>Your Facebook Page is your second traffic source alongside YouTube. These resources help you set it up properly and understand how to actually get results from social media content.</p>
              {[
                { title: "Facebook Business Page: The Ultimate Step By Step Guide", when: "Watch FIRST while setting up your page", url: "https://www.youtube.com/watch?v=C--xlbevJLk", color: C.accent },
                { title: "How To Market A Brand New Facebook Page From Scratch", when: "Watch AFTER your page is live to build your first audience", url: "https://www.youtube.com/watch?v=dvmjY5CcBC4", color: C.gold },
                { title: "THIS Is How You Actually Get Results From Social Media", when: "Watch BEFORE you start your content routine. Mindset and strategy.", url: "https://www.youtube.com/watch?v=H3bIWWf7LuU", color: C.green },
              ].map((r, i) => (
                <div key={i} onClick={() => window.open(r.url, "_blank")} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${r.color}`, borderRadius: 12, padding: "14px 18px", marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }} className="mav-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{r.title}</div>
                      <div style={{ fontSize: 12, color: r.color, fontWeight: 600, marginTop: 3 }}>📌 {r.when}</div>
                    </div>
                    <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 12 }}>Watch →</div>
                  </div>
                </div>
              ))}
            </div>
          </Collapse>

          <Collapse title="Days 9 to 11: Practice Filming + Learn to Edit" subtitle="These videos will NOT be published. This is your training ground." accent={C.purple}>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8 }}>FILMING PRACTICE</div>
              <Checklist items={[
                "Set up your filming spot with tripod, mic, and lighting (use the setup from Day 6 to 8)",
                "Film 3 practice videos. 5 to 10 minutes each. Topics: your story, a myth you want to bust, one tip for your audience",
                "Use bullet points on the teleprompter, NOT a full word for word script. Bullet points sound natural. Scripts sound robotic",
                "Look at the camera LENS, not the screen. Pretend you are talking to one friend sitting across from you",
                "Film your hook (opening 15 seconds) 3 different ways for each video. You will pick the best one later",
                "When you make a mistake, pause, clap once (this creates a spike in the audio waveform that is easy to find when editing), and restart that sentence",
                "Watch all 3 back. Check: are you looking at the lens? Is the audio clear? Is lighting even? Are you in the top third of the frame?",
                "Reshoot 1 video with fixes applied. You will still dislike how you look and sound. That is 100% normal. Everyone starts here. Push through it",
              ]} />
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12, marginTop: 20 }}>EDITING PRACTICE (pick one tool)</div>
              <Checklist items={[
                "OPTION A: CapCut (easier). Download the desktop app (free). Import your video. Use 'Auto Remove Silence' to cut dead air instantly. Add auto captions. Add 2 to 3 text overlays for key stats. Add background music from their free library at 10 to 15% volume. Export at 1080p",
                "OPTION B: Descript (more powerful). Upload your video. It auto transcribes. Edit the VIDEO by editing the TEXT. Delete filler words with one click (Edit > Remove Filler Words). Cut sections by highlighting and deleting the text. Export at 1080p",
                "Edit one of your practice videos start to finish. Time yourself. First edit will take 1 to 2 hours. By video 5 it will take 30 to 45 minutes",
                "Create one practice thumbnail in Canva: use the YouTube Thumbnail template. Your face with an emotional expression (surprised, serious, pointing) + 3 to 5 words of bold text. High contrast colors",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 12 to 14: Content Calendar" subtitle="Plan your first 10 videos" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Pick your first 10 topics from your Mavericks Research output (content angles section)",
                "For each topic, write the hook word for word (2 to 3 sentences that open with a pain point or surprising fact)",
                "Create your first thumbnail in Canva: your face with an emotional expression + 3 to 5 words of text",
                "Install VidIQ (free Chrome extension) to check search volume on your video titles",
                "Order your 10 topics: start with the broadest, most searched topic first",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 15 to 30: Film and Publish" subtitle="1 video per week. No expectations on results for the first 10 videos." accent={C.teal}>
            <div style={{ marginTop: 14 }}>
              <Card accent={C.gold} style={{ background: C.goldLight, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>⚠️ Set Your Expectations: First 10 Videos = Zero Expectations</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Your first 10 videos will not go viral. They probably will not get many views at all. That is normal. The purpose of your first 10 is to build the habit, get comfortable on camera, and give the YouTube algorithm data about your channel. Do NOT judge your results until you hit Video 10. Consistency is the only metric that matters right now.</p>
              </Card>
              <Checklist items={[
                "Week 3: Film and publish Video 1. Follow the weekly workflow in the Weekly Flow tab. 1 video per week, not more",
                "Week 4: Film and publish Video 2. You should be slightly faster and more comfortable now",
                "Every video description: FAST Link as the FIRST and LAST line",
                "Pin a comment on every video: 'Book a free clarity call here: [FAST Link]'",
                "Repurpose each video into 2 to 3 short clips for Facebook Page (use CapCut or Descript)",
                "Post 3 to 5 times per week on your Facebook Page: mix of clips, text posts, and value content",
                "Continue Rolling List outreach daily: 1 to 2 hour block, 5 to 10 new names added",
                "Replace every name that says No or goes silent after FU #2",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 30 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Videos Published" value="2" color={C.accent} />
                  <StatBox label="FB Posts" value="15+" color={C.coral} />
                  <StatBox label="Outreach Sent" value="100+" color={C.gold} />
                  <StatBox label="Names on List" value="50+" color={C.green} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}

      {/* ── PHASE 2: DAYS 31-60 ── */}
      {pm("phase2") && isYouTube && (
        <div>
          <SectionTitle sub="Momentum. More videos. Content repurposing. Outreach shifts from primary to supplementary.">Phase 2: Days 31 to 60</SectionTitle>

          <Collapse title="Days 31 to 45: Keep the Weekly Cadence" subtitle="1 video per week. Still no expectations on results." accent={C.coral} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Publish 1 video per week. By Day 45 you should have 4 to 5 total videos live",
                "Batch filming: film 2 videos in one session to save setup time",
                "Check YouTube Analytics: which video has the highest click through rate? Which has the best retention?",
                "If a topic performed well, plan 2 more videos on related angles",
                "Every video gets repurposed: 3 to 5 short clips for Facebook, 1 LinkedIn post, 1 text post",
                "Facebook Page should now have 30+ posts. Mix of video clips, value posts, personal stories",
              ]} />
              <PromptBlock label="Batch filming prompt (paste into Claude)" prompt={`I'm filming 2 YouTube videos today. My niche is [YOUR NICHE]. Topics:

1. [TOPIC 1]
2. [TOPIC 2]

For each, give me:
HOOK: 3 different opening lines (2-3 sentences, opens with pain or surprise)
BULLET POINTS: 5-7 key points to cover (not a full script)
BRIDGE: 2 lines connecting the lesson to the viewer's real life
CTA: closing that drives to a free clarity call

Tone: conversational, zero jargon, like a knowledgeable friend.`} />
            </div>
          </Collapse>

          <Collapse title="Days 31 to 60: Outreach Evolution" subtitle="Shift from cold to warm" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>By now your content should be generating some inbound attention. People are watching, commenting, following. Your outreach shifts:</p>
              <Checklist items={[
                "Warm outreach: anyone who liked, commented, or watched your content. These are warm leads now",
                "Engage first: comment on THEIR posts for 2 to 3 days before sending a DM",
                "New outreach message for warm leads: 'Hey [Name], I saw you watched my video on [topic]. Did that resonate with your situation?'",
                "Cold outreach continues but at reduced volume. 5 per day instead of 10",
                "Rolling List: keep replacing names. Your list should be cycling faster now",
                "Track which outreach messages get the most responses. Double down on those",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 46 to 60: Optimize" subtitle="Read the data. Double down on winners" accent={C.teal}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "YouTube Analytics: Click Through Rate below 4% means thumbnails and titles need work",
                "Average View Duration: drop off at 30 seconds means weak hooks. Past 50% means you are doing well",
                "FAST Link clicks: check GHL. Watching but not clicking means your CTA is too weak or too late in the video",
                "Comments: what questions are people asking? Those are your next video topics",
                "Take your best performing video and make 2 more on related angles",
                "Facebook: which posts got the most engagement? More of those, less of what flopped",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 60 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Videos Published" value="6+" color={C.accent} />
                  <StatBox label="FB Posts" value="40+" color={C.coral} />
                  <StatBox label="FAST Link Clicks" value="Track in GHL" color={C.gold} />
                  <StatBox label="Booked Calls" value="3 to 8" color={C.green} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}

      {/* ── PHASE 3: DAYS 61-90 ── */}
      {pm("phase3") && isYouTube && (
        <div>
          <SectionTitle sub="Scale. Repurposing machine. Content compounds. Outreach becomes supplementary.">Phase 3: Days 61 to 90</SectionTitle>

          <Collapse title="Days 61 to 75: Content Machine" subtitle="One video becomes 5+ pieces" accent={C.purple} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Continue 1 video per week. You should have 8 to 10 total by Day 75. This is when your first 10 videos milestone hits and results start showing",
                "Every video gets the full repurpose treatment: 3 to 5 Reels/Shorts, 1 LinkedIn post, 1 FB text post, 1 carousel",
                "Create a content repurposing checklist and follow it for every single video. No exceptions",
                "Start batching content days: film on Tuesday, edit on Wednesday, repurpose on Thursday",
                "Your Facebook Page should feel active: daily posts, mix of formats, consistent voice",
              ]} />
              <PromptBlock label="Repurposing prompt (paste transcript into Claude)" prompt={`Here is my YouTube video transcript:

[PASTE TRANSCRIPT]

Find the 5 best 30 to 60 second segments that work as standalone clips. For each:
1. Where it starts and ends
2. A 2 sentence caption for Facebook/Instagram
3. A hook text overlay for the first 3 seconds

Also write:
1. A 200 word LinkedIn post using the most surprising point
2. A 150 word Facebook text post that opens with the strongest pain point
3. 5 tweet sized quotes from the video`} />
            </div>
          </Collapse>

          <Collapse title="Days 76 to 90: Build the System" subtitle="This becomes self sustaining" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Document your weekly workflow. Write down exactly what you do each day. This is your repeatable system",
                "Track your numbers: views per video, FAST Link clicks, booked calls, closed deals. Know your conversion rate",
                "Calculate your content ROI: how many calls per video? Which topics convert best?",
                "Plan your next 90 days using what worked. Kill what did not",
                "If budget allows: consider boosting your top performing video on Facebook ($20 to $50). Test with proven content only",
                data.goal !== "production" ? "Recruiting: your YouTube channel IS your recruiting tool. Share your best videos with potential recruits to show them what Mavericks looks like" : "Referral system: ask every satisfied client to share your video with one friend who might need the same help",
                "Rolling List review: by now, inbound leads should be supplementing your outreach. Track the ratio",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 90 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Videos Published" value="10+" color={C.accent} />
                  <StatBox label="Repeatable System" value="Yes" color={C.green} />
                  <StatBox label="Inbound Leads/Week" value="2 to 5" color={C.gold} />
                  <StatBox label="Closed from Content" value="3 to 6" color={C.coral} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}

      {/* ── OUTREACH TAB ── */}
      {pm("outreach") && (
        <div>
          <SectionTitle sub={`Your outreach framework for ${data.outreachPlatform}. This is how you start conversations that lead to your FAST link.`}>Outreach Framework</SectionTitle>

          <Collapse title={`${data.outreachPlatform} Profile Setup`} subtitle="Before you send a single message" accent={C.teal} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={data.outreachPlatform === "LinkedIn" ? [
                "Professional headshot as profile photo. Friendly, not corporate",
                "Headline: do NOT put 'Insurance Agent.' Use: 'I help [NICHE] in Canada [BENEFIT]' e.g., 'I help young families protect what matters most'",
                "About section: 3 to 4 sentences about who you help and why. End with your FAST link",
                "Banner image: Canva design with your name + what you do",
                "Feature section: add your FAST Link as a featured link",
                "Post 2 to 3 times per week: value content, not pitches",
              ] : [
                "Profile photo: professional but approachable. Not a selfie. Not a logo",
                "Bio: one line about who you help. Add your FAST link",
                "Cover photo: Canva design with your name + what you do + FAST link URL",
                "Make your profile public. People you message will check your profile first",
                "Pin a value post to the top of your profile. Something helpful, not salesy",
                "Join 5 to 10 Facebook groups where your niche hangs out. Do NOT pitch in groups. Add value first",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Who to Target" subtitle="Quality over quantity" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                `Search ${data.outreachPlatform} for people in your niche: use job titles, group memberships, location (Canada)`,
                "Look for life events: new job, new baby, new home, marriage. These are natural conversation starters",
                "Prioritize people who are active (posting, commenting) over silent profiles",
                "Warm connections first: people who already follow you, liked your content, or have mutual friends",
                "Add 5 to 10 new names to your Rolling List daily from these searches",
              ]} />
            </div>
          </Collapse>

          <Collapse title="The 3 Message Framework" subtitle="Connect. Curiosity. Convert." accent={C.coral}>
            <div style={{ marginTop: 14 }}>
              <Card accent={C.accent}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Message 1: Connect (Day 1)</div>
                <div style={{ background: C.tealLight, borderRadius: 10, padding: "14px 16px", fontSize: 14, lineHeight: 1.6, fontStyle: "italic" }}>
                  "Hey [Name], I came across your profile and noticed [something specific about them: their job, a post, mutual connection]. Just wanted to connect."
                </div>
                <div style={{ fontSize: 12, color: C.gray, marginTop: 8 }}>Goal: get accepted. Zero pitch. Zero mention of insurance.</div>
              </Card>
              <Card accent={C.coral}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Message 2: Curiosity (Day 2 to 3)</div>
                <div style={{ background: C.coralLight, borderRadius: 10, padding: "14px 16px", fontSize: 14, lineHeight: 1.6, fontStyle: "italic" }}>
                  "Thanks for connecting! Quick question: [relevant question based on their situation]. I ask because I work with [NICHE] and this comes up a lot."
                </div>
                <div style={{ fontSize: 12, color: C.gray, marginTop: 8 }}>Goal: start a conversation. Ask a question that makes them think. Still no pitch.</div>
              </Card>
              <Card accent={C.gold}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Message 3: Convert (After they respond)</div>
                <div style={{ background: C.goldLight, borderRadius: 10, padding: "14px 16px", fontSize: 14, lineHeight: 1.6, fontStyle: "italic" }}>
                  "That makes total sense. I actually put together a quick page that breaks this down. Want me to send you the link? No pressure at all, just figured it might be helpful."
                </div>
                <div style={{ fontSize: 12, color: C.gray, marginTop: 8 }}>Goal: send the FAST link. Only after they have engaged. If they say yes, send the link. If they do not respond, follow up using the Rolling List FU framework.</div>
              </Card>
            </div>
          </Collapse>

          <Card accent={C.red} style={{ background: "#FEF2F2" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.red, marginBottom: 8 }}>What NOT To Do</div>
            {["Send your FAST link as the first message. Ever.", "Pitch insurance in the connection request", "Copy paste the same message to everyone. Personalize every single one", "Send more than 20 connection requests per day. Platforms flag this", "Get discouraged by low response rates. 10 to 15% is normal for cold outreach"].map((x, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, lineHeight: 1.5 }}>
                <span style={{ color: C.red }}>✕</span>{x}
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ── ROLLING LIST TAB ── */}
      {pm("rollinglist") && (
        <div>
          <SectionTitle sub="This is your execution backbone. Every lead starts here. Every name gets tracked. Every removal gets replaced.">Rolling List System</SectionTitle>

          <Card accent={C.coral}>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 12 }}>Daily Rules (Non Negotiable)</div>
            <Checklist items={[
              "Every weekend (Saturday or Sunday): audit your list. Do you have enough names for next week?",
              "Add 5 to 10 new names DAILY. Sources: social media search, networking events, referrals, content engagement",
              "Block 1 to 2 execution hours each day. Outreach and FAST link sending happens in this block",
              "Log every date. You need to know exactly where each person stands at a glance",
            ]} />
          </Card>

          <Card accent={C.accent}>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 12 }}>Follow Up Framework</div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ background: C.tealLight, borderRadius: 10, padding: "14px 16px", marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.teal, marginBottom: 4 }}>FU #1 (Next Day)</div>
                <div style={{ fontSize: 14, fontStyle: "italic" }}>"Hey [Name], did you get a chance to peek at the link? What part stood out to you?"</div>
              </div>
              <div style={{ background: C.tealLight, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.teal, marginBottom: 4 }}>FU #2 (2 to 3 Days Later)</div>
                <div style={{ fontSize: 14, fontStyle: "italic" }}>"I figured you got busy but when you get a chance to check the page, let me know if anything stood out"</div>
              </div>
            </div>
          </Card>

          <Card accent={C.gold}>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 12 }}>Replacement Rules</div>
            {[
              { status: "Booked", action: "Remove from list + Replace with new name SAME DAY", color: C.green },
              { status: "Said No", action: "Remove + Replace IMMEDIATELY", color: C.coral },
              { status: "No Reply after FU #2", action: "Mark as Follow Up OR Remove (your call)", color: C.gold },
              { status: "Dead Name", action: "NEVER keep dead names. Keep the list MOVING", color: C.red },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < 3 ? `1px solid ${C.grayLight}` : "none", alignItems: "center" }}>
                <span style={{ background: r.color + "15", color: r.color, padding: "3px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, minWidth: 80, textAlign: "center" }}>{r.status}</span>
                <span style={{ fontSize: 14 }}>{r.action}</span>
              </div>
            ))}
          </Card>

          <button onClick={() => openRollingList()} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "14px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT, width: "100%", marginTop: 8 }}>
            📥 Open Rolling List (Google Sheets) →
          </button>
        </div>
      )}

      {/* ── WEEKLY FLOW (YOUTUBE) ── */}
      {pm("weekly") && isYouTube && (
        <div>
          <SectionTitle sub="One video per week. Each day fits inside 1 to 2 hours. Check off as you go.">Weekly Workflow</SectionTitle>
          {[
            { day: "Monday", title: "Script Day", time: "1.5 hrs", color: C.coral, items: ["Open Claude. Paste the master prompt with this week's topic (20 min)", "Read AI output. Cut generic stuff. Add YOUR stories and perspective (20 min)", "Verify every stat. Google the source. Cannot find it? Cut it (15 min)", "Pick the best hook. Rewrite in your own words (10 min)", "Load hook + bullet points into teleprompter app (5 min)", "Ask AI for 10 title options + 5 thumbnail texts. Check VidIQ for search volume (20 min)"] },
            { day: "Tuesday", title: "Film Day", time: "1.5 hrs", color: C.teal, items: ["Set up: clean background, tripod, ring light, lav mic (5 min)", "Open teleprompter on phone or second device", "Film hook 3 different ways (10 min)", "Film the rest straight through. Pause and clap for mistakes (30 to 40 min)", "Quick review: audio clean? Lighting okay? Head in frame? (10 min)"] },
            { day: "Wednesday", title: "Edit Day", time: "1 hr", color: C.purple, items: ["Import to CapCut or Descript", "Auto silence removal (CapCut) or edit by text (Descript)", "Remove filler words (Descript: one click)", "Pick best hook take. Delete the other two", "Add 2 to 3 text overlays for key stats", "Auto captions on. Check financial terms for accuracy", "Background music from YouTube Audio Library at 10 to 15% volume", "Export at 1080p"] },
            { day: "Thursday", title: "Upload Day", time: "30 min", color: C.gold, items: ["Thumbnail in Canva: your face + text + high contrast (10 min)", "Upload to YouTube with title, description, tags (10 min)", "FAST Link = first AND last line of description", "Pin a comment: 'Book a free clarity call here: [FAST Link]'", "Schedule for Friday 7 to 9 AM EST (5 min)"] },
            { day: "Friday", title: "Publish + Repurpose", time: "30 min", color: C.green, items: ["Video goes live. Share on Facebook Page, LinkedIn", "Paste transcript into Claude. Get 3 to 5 clip suggestions + LinkedIn post (10 min)", "Cut 1 to 2 short clips. Post with caption (15 min)", "Reply to every YouTube comment within 24 hours"] },
            { day: "Weekend", title: "Prep + Rest", time: "Optional", color: C.gray, items: ["20 min: read new Reddit threads + YouTube comments in your niche", "Add fresh questions to your Audience Research doc", "Think about next week's hook", "Rolling List audit: add new names, remove dead ones, plan Monday outreach"] },
          ].map((day) => (
            <Collapse key={day.day} title={`${day.day}: ${day.title}`} subtitle={day.time} accent={day.color}>
              <div style={{ marginTop: 14 }}>
                <Checklist items={day.items} />
              </div>
            </Collapse>
          ))}
        </div>
      )}

      {/* ── FACEBOOK CONTENT STRATEGY TAB ── */}
      {pm("fbcontent") && (
        <div>
          <SectionTitle sub="What to post, how often, and the exact content mix that builds trust and drives traffic to your FAST link. No guessing.">Facebook Content Strategy</SectionTitle>

          <Card accent={C.coral} style={{ background: C.coralLight }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 8 }}>⚠️ Set Your Expectations: No Results for 60 Days</div>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>
              You will post consistently for 60 days before you see meaningful traction. This is not a failure. This is how organic content works. The algorithm needs to learn who you are. Your audience needs to see you repeatedly before they trust you. If you quit at Day 30 because "nothing is happening," you wasted 30 days. If you push through to Day 60, the compounding starts.
            </p>
          </Card>

          <Collapse title="📱 Facebook Resources: Watch These First" subtitle="Strategy and setup before you start posting" accent={C.accent}>
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>Before you start posting, watch these in order. The first one walks you through page setup. The second teaches you how to grow from zero. The third shifts your mindset about what actually works on social media.</p>
              {[
                { title: "Facebook Business Page: The Ultimate Step By Step Guide", when: "Watch FIRST if you have not set up your page yet", url: "https://www.youtube.com/watch?v=C--xlbevJLk", color: C.accent },
                { title: "How To Market A Brand New Facebook Page From Scratch", when: "Watch SECOND to understand how to grow from zero followers", url: "https://www.youtube.com/watch?v=dvmjY5CcBC4", color: C.gold },
                { title: "THIS Is How You Actually Get Results From Social Media", when: "Watch BEFORE you start your content routine. Changes how you think about posting.", url: "https://www.youtube.com/watch?v=H3bIWWf7LuU", color: C.green },
              ].map((r, i) => (
                <div key={i} onClick={() => window.open(r.url, "_blank")} style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${r.color}`, borderRadius: 12, padding: "14px 18px", marginBottom: 12, cursor: "pointer", transition: "all 0.2s" }} className="mav-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{r.title}</div>
                      <div style={{ fontSize: 12, color: r.color, fontWeight: 600, marginTop: 3 }}>📌 {r.when}</div>
                    </div>
                    <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 12 }}>Watch →</div>
                  </div>
                </div>
              ))}
            </div>
          </Collapse>

          <Collapse title="The Content Pillar Split" subtitle="50% Education, 30% Relatable, 20% Authority/CTA" accent={C.teal} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 16 }}>
                <div style={{ background: C.teal + "10", border: `1px solid ${C.teal}30`, borderRadius: 12, padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: C.teal }}>50%</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginTop: 4 }}>Education</div>
                  <div style={{ fontSize: 12, color: C.gray, marginTop: 4, lineHeight: 1.4 }}>Tips, myths busted, "did you know", how to guides, breakdowns. This is what makes people follow you.</div>
                </div>
                <div style={{ background: C.coral + "10", border: `1px solid ${C.coral}30`, borderRadius: 12, padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: C.coral }}>30%</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginTop: 4 }}>Relatable / Personal</div>
                  <div style={{ fontSize: 12, color: C.gray, marginTop: 4, lineHeight: 1.4 }}>Your story, behind the scenes, personal takes, "unpopular opinion", day in the life. This builds trust.</div>
                </div>
                <div style={{ background: C.gold + "10", border: `1px solid ${C.gold}30`, borderRadius: 12, padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: C.gold }}>20%</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginTop: 4 }}>Authority / CTA</div>
                  <div style={{ fontSize: 12, color: C.gray, marginTop: 4, lineHeight: 1.4 }}>Client wins, social proof, testimonials, "book a call", direct link to FAST link. This converts.</div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                The most important pillar is Education. It is 50% of your content because it is what makes strangers follow you. Nobody follows an insurance agent who only posts "DM me for a quote." They follow someone who teaches them something they did not know. Once they trust your knowledge (education) and like you as a person (relatable), the authority/CTA posts convert them into booked calls.
              </p>
              {data.goal === "hybrid" && (
                <Card accent={C.gold} style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Hybrid Content Split: {data.hybridLead === "production" ? "70% Production, 30% Recruiting" : "70% Recruiting, 30% Production"}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.6 }}>Apply the 50/30/20 pillar split within your dominant track. So if you are leading with production: 50% of your production content is educational, 30% relatable, 20% CTA. Your 30% recruiting content follows the same pillar ratio but speaks to potential agents instead of clients.</p>
                </Card>
              )}
            </div>
          </Collapse>

          <Collapse title="Posting Frequency" subtitle="Based on your experience level" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <Card accent={C.accent}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Beginner (First 60 Days)</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.teal, marginBottom: 6 }}>3 to 4x/week</div>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: C.gray }}>Monday, Wednesday, Friday minimum. Add Saturday if you can. Quality over quantity. One good post beats three rushed ones. Build the habit first.</p>
                </Card>
                <Card accent={C.coral}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Past 60 Days / Streamlining</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.coral, marginBottom: 6 }}>5 to 7x/week</div>
                  <p style={{ fontSize: 13, lineHeight: 1.5, color: C.gray }}>Daily or near daily. You have the habit now. Mix formats: Reels, static, carousel, text. Batch your content weekly so you are never scrambling.</p>
                </Card>
              </div>
            </div>
          </Collapse>

          <Collapse title="Content Ideas by Format" subtitle="Reels, Static, Faceless. Never think about what to post." accent={C.purple}>
            <div style={{ marginTop: 14 }}>
              <Card accent={C.accent}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 8 }}>🎬 Reels (Highest Reach)</div>
                <Checklist items={[
                  "EDUCATION: 'The #1 thing your mortgage broker did not tell you' (talking to camera, 30 to 60 seconds)",
                  "EDUCATION: '3 things every [niche] needs to know about insurance in Canada' (trending audio optional)",
                  "RELATABLE: 'POV: you are an insurance agent and someone says insurance is a scam' (reaction style)",
                  "RELATABLE: 'Day in the life of a Mavericks agent' (b roll + voiceover)",
                  "AUTHORITY: 'Client just found out their group benefits do not cover what they thought' (story format)",
                  "EDUCATION: 'Term vs whole life in 45 seconds' (whiteboard or text overlay)",
                ]} />
              </Card>
              <Card accent={C.coral}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 8 }}>📸 Static Posts / Carousels</div>
                <Checklist items={[
                  "EDUCATION: Carousel '5 Myths About Life Insurance in Canada' (Canva, 5 to 7 slides)",
                  "RELATABLE: Text post 'I used to think insurance was boring. Then [personal story].'",
                  "AUTHORITY: Screenshot of client message (anonymized) + your caption about the win",
                  "EDUCATION: Single image with bold stat: 'X% of Canadians have no disability coverage. You are probably one of them.'",
                  "RELATABLE: Photo of you at work, at an event, or with family + genuine caption about why you do this",
                ]} />
              </Card>
              <Card accent={C.gold}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 8 }}>🎭 Faceless Content (If Not on Camera Yet)</div>
                <Checklist items={[
                  "EDUCATION: Text on screen + voiceover: 'What happens to your mortgage if you die without insurance' (CapCut)",
                  "EDUCATION: Screen recording scrolling through stats or news articles + voiceover with your take",
                  "RELATABLE: Quote graphic with your own words: 'Nobody plans to get sick. But everyone plans to recover.'",
                  "EDUCATION: Animated text Reel: step by step 'How to check if your group benefits actually cover you'",
                  "AUTHORITY: Before/after graphic: 'What my client had vs what they needed' (no names, anonymized)",
                ]} />
              </Card>
            </div>
          </Collapse>

          <Collapse title="Filming and Batching System" subtitle="Film once, post all week" accent={C.green}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Pick ONE day per week as your content day. Most agents choose Sunday or Monday. Block 2 to 3 hours",
                "Batch film 3 to 5 Reels in one session. Change your shirt between takes so they look like different days",
                "Use natural light (face a window) or a ring light. Phone on tripod at eye level",
                "Write your hooks first. Open your AI, paste your weekly prompt (see Train Your AI tab), get 5 hooks. Film each one",
                "Edit in CapCut (free): auto captions, trim dead air, add text overlays for key points",
                "Create 2 to 3 static posts in Canva during the same session. Use templates so you are not designing from scratch",
                "Schedule everything using Meta Business Suite (free). Set post times for the week. Done",
                "Total weekly content time: 2 to 3 hours for 5 to 7 posts. No daily scrambling",
              ]} />
              <Card accent={C.gold} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Minimum Equipment</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Smartphone (you already have one), ring light ($30 to $50 CAD), phone tripod ($20 to $30 CAD), wireless lav mic ($40 to $70 CAD if doing video with audio). Total: under $150. CapCut and Canva are free. Meta Business Suite is free. No excuses.</p>
              </Card>
            </div>
          </Collapse>
        </div>
      )}

      {/* ── TRAIN YOUR AI TAB ── */}
      {pm("aicontent") && (
        <div>
          <SectionTitle sub="We already built your profile from every answer you gave. Download it, store it in your AI, then use the prompts below to generate content forever.">Train Your AI</SectionTitle>

          <Card accent={C.navy} style={{ background: C.charcoal }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>HOW THIS WORKS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                { num: "1", label: "Download your kit", sub: "We wrote it for you" },
                { num: "2", label: "Paste into your AI", sub: "Claude or ChatGPT" },
                { num: "3", label: "Use prompts below", sub: "Never think again" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "12px 8px" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.accent, color: "#fff", fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>{s.num}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* DOWNLOAD */}
          <Card accent={C.green} style={{ background: C.greenLight, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 8 }}>📥 Step 1: Download Your AI Content Kit</div>
            <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.6, marginBottom: 12 }}>This file contains your complete profile (auto-generated from your answers), your research output, setup instructions for Claude and ChatGPT, and every prompt below pre-written. One file. One paste.</p>
            <button onClick={() => {
              const goalLabel = data.goal === "production" ? "Production (selling policies)" : data.goal === "recruiting" ? "Recruiting (attracting agents)" : `Hybrid (leading with ${data.hybridLead || "production"}, 70/30 split)`;
              const channelLabel = ch?.label + " (" + ch?.desc + ")";
              const postCount = data.timeline === "first60" ? "3 to 4" : "5 to 7";
              const hybridLine = data.goal === "hybrid" ? `Split: ${data.hybridLead === "production" ? "70% client facing, 30% recruiting" : "70% agent facing, 30% production"}` : "";
              const lines = [
                "================================================================",
                "THE STRATEGY BUILDER — AI CONTENT KIT",
                `Generated for: ${data.name}`,
                `Date: ${new Date().toLocaleDateString()}`,
                "================================================================",
                "",
                "This file contains 5 sections:",
                "  SECTION 1: Your AI Profile (paste into your AI as project instructions)",
                "  SECTION 2: Your Research Output (paste into your AI as context)",
                "  SECTION 3: Setup Instructions (how to store this in Claude or ChatGPT)",
                "  SECTION 4: Content Prompts (weekly, monthly, Reel, carousel, story, repurpose)",
                "  SECTION 5: Your Weekly Routine",
                "",
                "",
                "================================================================",
                "SECTION 1: YOUR AI PROFILE (auto-generated from your wizard answers)",
                "================================================================",
                "",
                "--- PASTE THIS INTO YOUR AI PROJECT INSTRUCTIONS ---",
                "",
                `You are a content assistant for ${data.name}, a life insurance agent in Canada with Mavericks Agency / Experior Financial Group.`,
                "",
                `GOAL: ${goalLabel}`,
                `NICHE/AUDIENCE: ${data.niche}`,
                `TRAFFIC CHANNEL: ${channelLabel}`,
                `OUTREACH PLATFORM: ${data.outreachPlatform}`,
                "",
                "MY STORY:",
                `Why I got into insurance: ${data.storyWhy || "[Not shared]"}`,
                `A meaningful moment: ${data.storyMoment || "[Not shared]"}`,
                `What I wish families understood: ${data.storyWish || "[Not shared]"}`,
                `Biggest misconception I hear: ${data.storyMisconception || "[Not shared]"}`,
                `What I would tell my audience in 10 min: ${data.storyTell || "[Not shared]"}`,
                "",
                "TOPICS I COVER: " + (data.topics || "[Not specified]"),
                "",
                "CONTENT PILLARS: 50% Education, 30% Relatable/Personal, 20% Authority/CTA",
                hybridLine,
                "",
                "TONE: Conversational, no jargon, like a knowledgeable friend. No corporate speak. Always hook first line.",
                "",
                "MY VOICE AND BRAND DNA:",
                `Natural tone: ${data.voiceTones?.length > 0 ? data.voiceTones.join(", ") : "not specified"}`,
                data.voiceNever ? `What I would NEVER say or do in content: ${data.voiceNever}` : "",
                data.voicePhrases ? `Words and phrases I naturally use (weave these into my content): ${data.voicePhrases}` : "",
                data.voiceAdmire ? `Creators I admire and why (calibrate energy and pacing to this style): ${data.voiceAdmire}` : "",
                data.voiceHotTake ? `My unpopular opinion / hot take (use this as recurring content fuel): ${data.voiceHotTake}` : "",
                "",
                "VOICE RULES: All content must match my natural tone above. If I said I would never do something, never include it. Use my natural phrases in copy so it sounds like me. My hot take should appear regularly as content angles.",
                "",
                "CTA: FAST Link (personalized landing page) or 'DM me [keyword]'",
                "",
                "--- END AI PROFILE ---",
                "",
                "",
                "================================================================",
                "SECTION 2: RESEARCH OUTPUT",
                "================================================================",
                "",
                data.researchResult || "[Run the Mavericks Research Engine first]",
                "",
                "",
                "================================================================",
                "SECTION 3: SETUP INSTRUCTIONS",
                "================================================================",
                "",
                "CLAUDE (Recommended):",
                "1. Go to claude.ai > Projects > New Project > 'Mavericks Content Engine'",
                "2. Paste SECTION 1 + SECTION 2 into project instructions",
                "3. Every week: open chat in this project, paste a prompt from Section 4",
                "",
                "CHATGPT:",
                "1. Go to chatgpt.com > Your Name > Customize ChatGPT",
                "2. Paste SECTION 1 into 'What should ChatGPT know about you'",
                "3. Start a new chat, paste SECTION 2 as first message",
                "4. Use prompts from Section 4 in new chats",
                "",
                "",
                "================================================================",
                "SECTION 4: CONTENT PROMPTS",
                "================================================================",
                "",
                "--- PROMPT 1: WEEKLY CONTENT PLAN ---",
                `Generate my content plan for this week. I need ${postCount} posts following my 50/30/20 pillar split.`,
                "For each post give me: PILLAR, FORMAT (Reel/static/carousel/text), HOOK (exact first line), FULL CAPTION (ready to paste), VISUAL DIRECTION.",
                "Also give me: 3 Reel scripts (30-60 sec), 2 faceless ideas, 1 carousel outline.",
                hybridLine,
                "Make every hook specific to my niche. No generic insurance content.",
                "",
                "--- PROMPT 2: REEL SCRIPTS ---",
                "Write 5 Reel scripts for this week. Each must be 30 to 60 seconds. Structure: HOOK (first 3 seconds, pattern interrupt), BODY (teaching or story), CTA (soft, drives to FAST link). Include text overlay suggestions for each.",
                "",
                "--- PROMPT 3: CAROUSEL IDEAS ---",
                "Create 3 carousel post ideas. For each: TOPIC, HOOK (slide 1 text), 5 to 7 slide outline with key point per slide, FINAL SLIDE CTA. Make them saveable and shareable.",
                "",
                "--- PROMPT 4: STORY BASED POSTS ---",
                "Write 3 personal story posts using my story and experiences. Each must: open with a vulnerable or surprising moment, connect to a lesson about my niche, end with a soft CTA. Conversational tone, like a voice note.",
                "",
                "--- PROMPT 5: REPURPOSE A VIDEO ---",
                "Here is my video transcript: [PASTE TRANSCRIPT]. Find the 5 best 30-60 second clips for Reels. For each: where it starts/ends, caption, hook text overlay. Also write: 1 LinkedIn post, 1 Facebook text post, 5 tweet sized quotes.",
                "",
                "--- PROMPT 6: MONTHLY RESEARCH REFRESH ---",
                "Refresh my content research: 3 new pain points I have not covered, 10 new content angles, 5 objection busting ideas, seasonal topics for this month, 3 new copy swipes.",
                "",
                "--- PROMPT 7: ENGAGEMENT POST IDEAS ---",
                "Give me 5 engagement posts that drive comments: polls, 'this or that', 'unpopular opinion', 'what would you do', question posts. Each must relate to my niche and spark conversation.",
                "",
                ...(data.channel === "aggressive_youtube" ? [
                  "--- PROMPT 8: YOUTUBE 20-VIDEO ROADMAP ---",
                  "You are my YouTube content strategist. My niche is [YOUR NICHE]. My audience is " + (data.niche?.split("(")[0]?.trim() || "[YOUR AUDIENCE]") + ". Generate 20 YouTube video topics that attract my ideal audience and drive them to my FAST link.",
                  "For EACH video give me: 1) TOPIC, 2) TWO searchable title options, 3) HOOK (exact first 15 seconds), 4) 5 to 7 TALKING POINTS for a 10 to 15 min video, 5) THE TAKEAWAY, 6) SOFT CTA to my FAST link.",
                  "Spread across: educational explainers, myth busters, story driven, comparisons, beginner guides, mistakes to avoid. Match my voice. No jargon. No generic insurance content.",
                  "",
                  "--- PROMPT 9: SINGLE YOUTUBE VIDEO BUILDER ---",
                  "Build a complete outline for ONE YouTube video on: [PASTE TOPIC]. Target 10 to 15 minutes.",
                  "Give me: 3 title options, word for word HOOK (first 15-20 sec), INTRO, MAIN BODY in 4 to 6 segments with talking points, 2 to 3 pattern interrupts, CTA to my FAST link, thumbnail text options, and a YouTube description with tags. Match my voice. Conversational, no jargon.",
                  "",
                ] : []),
                ...(data.channel === "aggressive_community" ? [
                  "--- PROMPT 8: FACEBOOK LIVE 20-TOPIC ROADMAP ---",
                  "You are my Facebook Live strategist. My niche is [YOUR NICHE]. My group is for " + (data.niche?.split("(")[0]?.trim() || "[YOUR AUDIENCE]") + ". Generate 20 Facebook Live topics for my weekly group lives that build trust and drive bookings to my FAST link.",
                  "For EACH give me: 1) TOPIC, 2) LIVE TITLE, 3) HOOK (first 2 min while people join), 4) 5 to 7 TALKING POINTS for a 15 to 25 min live, 5) 2 to 3 ENGAGEMENT questions, 6) THE TAKEAWAY, 7) SOFT CTA to my FAST link.",
                  "Spread across: teaching lives, myth busters, Q&A style, story driven, hot seat scenarios, behind the scenes. Match my voice. No jargon.",
                  "",
                  "--- PROMPT 9: SINGLE FACEBOOK LIVE BUILDER ---",
                  "Build a complete outline for ONE Facebook Live on: [PASTE TOPIC]. Target 15 to 25 minutes.",
                  "Give me: 3 title options, a pre-live teaser post, THE OPENING (min 0-2 word for word), THE BODY in 3 to 4 segments with talking points and audience questions, Q&A transition, CTA to my FAST link, and a post-live summary comment to pin. Match my voice. Warm and conversational.",
                  "",
                ] : []),
                "",
                "================================================================",
                "SECTION 5: YOUR WEEKLY ROUTINE",
                "================================================================",
                "",
                "SUNDAY/MONDAY (10 min): Open AI, paste PROMPT 1, get your week of content",
                "CONTENT DAY (2-3 hrs): Batch film Reels, design static posts in Canva, write captions",
                "SCHEDULE DAY (15 min): Load everything into Meta Business Suite, set post times",
                "MONTHLY (10 min): Paste PROMPT 6 to refresh research and get new angles",
                "",
                "Total: 2.5 to 3.5 hours per week for all your content. No daily scrambling.",
                "",
                "================================================================",
                `Generated by The Mavericks Strategy Builder for ${data.name}`,
                "================================================================",
              ].filter(Boolean);
              const text = lines.join("\n");
              const blob = new Blob([text], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `Mavericks_Strategy_Kit_${data.name?.replace(/\s+/g, "_") || "Agent"}.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }} style={{ background: C.accent, color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: FONT, boxShadow: `0 4px 16px ${C.accent}30` }}>
              Download AI Content Kit
            </button>
          </Card>

          {/* STEP 2: SETUP */}
          <Collapse title="Step 2: Store Your Knowledge Base" subtitle="One time setup. 5 minutes." accent={C.gold} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>Open the file you downloaded. Follow these steps to give your AI your complete profile and research.</p>
              <Card accent={C.accent}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 8 }}>Claude (Recommended)</div>
                <Checklist items={[
                  "Go to claude.ai and sign in",
                  "Click Projects on the left sidebar",
                  "Create a new project called 'Mavericks Content Engine'",
                  "Click 'Set project instructions'",
                  "Open your downloaded file, copy SECTION 1 (AI Profile) and SECTION 2 (Research Output)",
                  "Paste both into the project instructions box. Click Save",
                  "Done. Every chat inside this project now knows your niche, story, audience, pains, and desires",
                ]} />
              </Card>
              <Card accent={C.gold}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 8 }}>ChatGPT</div>
                <Checklist items={[
                  "Go to chatgpt.com and sign in",
                  "Click your name (bottom left) then 'Customize ChatGPT'",
                  "Paste SECTION 1 (AI Profile) into 'What should ChatGPT know about you'",
                  "Click Save",
                  "Start a new chat and paste SECTION 2 (Research Output) as your first message so it has context",
                  "Done. Use prompts from Step 3 in any new chat",
                ]} />
              </Card>
            </div>
          </Collapse>

          {/* STEP 3: PROMPTS */}
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, marginTop: 20 }}>STEP 3: YOUR CONTENT PROMPTS</div>
          <p style={{ fontSize: 14, color: C.gray, marginBottom: 14 }}>Copy and paste these into your AI whenever you need content. They are all in your downloaded file too.</p>

          {isYouTube && (
            <Collapse title="🎥 YouTube Content Engine" subtitle="Generates 20 video topics with titles, talking points, and structure" accent={C.red} defaultOpen={true}>
              <div style={{ marginTop: 14 }}>
                <p style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.6, marginBottom: 12 }}>This is your YouTube starting roadmap. Paste it once and you will have 20 videos planned. Enough content for 20 weeks at one video per week. Run it again any time you need fresh topics.</p>
                <PromptBlock label="YouTube 20-Video Roadmap" prompt={`You are my YouTube content strategist. My niche is [YOUR NICHE] and I am a licensed insurance and financial advisor in Canada with Mavericks Agency. My audience is ${data.niche?.split("(")[0]?.trim() || "[YOUR AUDIENCE]"}.

Generate 20 YouTube video topics that will attract my ideal audience, build trust, and drive them to book a call through my FAST link.

For EACH of the 20 videos give me:

1. TOPIC: the core subject
2. TWO TITLE OPTIONS: both click-worthy and specific (use curiosity, numbers, or a clear benefit, never clickbait that does not deliver). Make them searchable so people actually find them on YouTube.
3. THE HOOK: the exact first 15 seconds to say on camera (must stop them from clicking away)
4. TALKING POINTS: 5 to 7 bullet points that form the body of a 10 to 15 minute video. Enough that I can sit down and talk through them naturally without a full script.
5. THE TAKEAWAY: the one thing the viewer should remember
6. SOFT CTA: how to point them to my FAST link at the end without being salesy

Spread the 20 topics across these types so my channel has variety:
- Educational explainers (how things work, what people get wrong)
- Myth busters (common misconceptions in my niche)
- Story driven (lessons from real situations, no names)
- Comparison videos (option A vs option B)
- Beginner guides (for people brand new to the topic)
- Mistakes to avoid

Match my voice and brand DNA exactly. Use my natural phrases and tone. Avoid jargon. Talk like I am explaining it to a friend across the table. No generic insurance content. Every topic must be something MY specific audience is actually searching for or worried about.`} />
              </div>
            </Collapse>
          )}

          {isYouTube && (
            <Collapse title="🎬 Single Video Deep Dive" subtitle="Turn any topic into a full video outline" accent={C.purple}>
              <div style={{ marginTop: 14 }}>
                <PromptBlock label="Full Video Script Builder" prompt={`Build me a complete outline for ONE YouTube video on this topic: [PASTE TOPIC OR TITLE].

My niche is [YOUR NICHE]. My audience is ${data.niche?.split("(")[0]?.trim() || "[YOUR AUDIENCE]"}. Target length 10 to 15 minutes.

Give me:
1. THREE title options (searchable and click worthy)
2. HOOK: word for word, the first 15 to 20 seconds
3. INTRO: how to set up what the video covers and why they should stay (30 seconds)
4. MAIN BODY: broken into 4 to 6 segments. For each segment give me a header and 3 to 5 talking points I can speak to naturally. Pace it to fill 10 to 15 minutes.
5. PATTERN INTERRUPTS: 2 or 3 places to re-hook attention (a question, a story, a "but here is the thing" moment)
6. CTA: how to drive to my FAST link naturally at the end
7. THUMBNAIL TEXT: 3 to 5 word options for the thumbnail
8. DESCRIPTION: a YouTube description with my FAST link and 5 searchable tags

Match my voice and tone. Conversational, no jargon, like teaching a friend.`} />
              </div>
            </Collapse>
          )}

          {isCommunity && (
            <Collapse title="📡 Facebook Live Content Engine" subtitle="Generates 20 live topics with hooks, talking points, and structure" accent={C.accent} defaultOpen={true}>
              <div style={{ marginTop: 14 }}>
                <p style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.6, marginBottom: 12 }}>Your weekly lives are the heart of your group. Paste this once and you will have 20 weeks of live topics planned. Run it again when you need fresh ones.</p>
                <PromptBlock label="Facebook Live 20-Topic Roadmap" prompt={`You are my Facebook Live content strategist. My niche is [YOUR NICHE] and I run a Facebook Group for ${data.niche?.split("(")[0]?.trim() || "[YOUR AUDIENCE]"}. I am a licensed insurance and financial advisor in Canada with Mavericks Agency.

Generate 20 Facebook Live topics I can go live on weekly inside my group. Each live should teach something valuable, build trust, and naturally lead to booking a call through my FAST link.

For EACH of the 20 lives give me:

1. TOPIC: the core subject
2. LIVE TITLE: what I announce it as (specific and interesting, makes people want to show up)
3. THE HOOK: the exact first 2 minutes to say while people are joining (acknowledge people hopping on, then state what they will learn and why it matters)
4. TALKING POINTS: 5 to 7 bullets that form the body of a 15 to 25 minute live. Enough that I can talk naturally without a script.
5. ENGAGEMENT MOMENTS: 2 or 3 questions to ask the audience mid-live to get them commenting
6. THE TAKEAWAY: the one thing they should remember
7. SOFT CTA: how to point them to my FAST link at the end

Spread the 20 topics across these types so my lives have variety:
- Teaching lives (how something works, breaking down a concept)
- Myth busters (common misconceptions)
- Q&A style (answer the questions my audience always asks)
- Story driven (lessons from real situations, no names)
- Hot seat (walk through a hypothetical scenario)
- Behind the scenes (why I do what I do)

Match my voice and brand DNA exactly. Use my natural phrases and tone. No jargon. Talk like I am chatting with friends who trust me. Every topic must be something MY specific audience actually cares about.`} />
              </div>
            </Collapse>
          )}

          {isCommunity && (
            <Collapse title="🔴 Single Live Framework" subtitle="Turn any topic into a full live outline" accent={C.gold}>
              <div style={{ marginTop: 14 }}>
                <PromptBlock label="Facebook Live Builder" prompt={`Build me a complete outline for ONE Facebook Live on this topic: [PASTE TOPIC].

My niche is [YOUR NICHE]. My group audience is ${data.niche?.split("(")[0]?.trim() || "[YOUR AUDIENCE]"}. Target length 15 to 25 minutes.

Give me:
1. LIVE TITLE: 3 options that make people want to show up
2. PRE-LIVE TEASER: a short post to drop in the group 2 hours before to build anticipation
3. THE OPENING (minute 0 to 2): word for word, what to say while people join. Acknowledge people hopping on, ask where they are watching from, then hook them with what they will learn.
4. THE BODY (minute 2 to 18): broken into 3 to 4 segments. For each, a header plus 3 to 5 talking points I can speak to naturally. Include where to pause and ask the audience a question.
5. Q&A TRANSITION (minute 18 to 22): how to open it up for questions
6. CTA (final 2 min): how to point them to my FAST link naturally
7. POST-LIVE COMMENT: a summary comment to pin after the live for replay viewers

Match my voice and tone. Warm, conversational, like talking to people who already trust me.`} />
              </div>
            </Collapse>
          )}

          <Collapse title="📅 Weekly Content Plan" subtitle="Paste every Sunday or Monday" accent={C.accent} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <PromptBlock label="Weekly Content Generator" prompt={`Generate my content plan for this week. I need ${data.timeline === "first60" ? "3 to 4" : "5 to 7"} posts following my 50/30/20 content pillar split (education, relatable, authority/CTA).

For each post, give me:
1. PILLAR: which pillar (education, relatable, or authority)
2. FORMAT: Reel, static image, carousel, or text post
3. HOOK: the exact first line (must stop the scroll)
4. FULL CAPTION: ready to copy and paste, ending with my CTA
5. VISUAL DIRECTION: what to film or design

Also give me:
3 Reel ideas with scripts (30 to 60 seconds each, hook + body + CTA)
2 faceless content ideas (for days I do not want to be on camera)
1 carousel idea (topic + 5 to 7 slide outline)
${data.goal === "hybrid" ? `\nSplit: ${data.hybridLead === "production" ? "70% client facing, 30% recruiting" : "70% agent facing, 30% production"}` : ""}
Make every hook specific to my niche. No generic insurance content.`} />
            </div>
          </Collapse>

          <Collapse title="🎬 Reel Scripts" subtitle="When you need video ideas" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <PromptBlock label="Reel Script Generator" prompt={`Write 5 Reel scripts for this week. Each 30 to 60 seconds.

Structure for each:
HOOK (first 3 seconds, pattern interrupt that stops the scroll)
BODY (teach one thing or tell one story)
CTA (soft, drives to my FAST link)
TEXT OVERLAY (what text to put on screen at key moments)

Mix: 3 education Reels, 1 relatable/personal, 1 authority. All specific to my niche.`} />
            </div>
          </Collapse>

          <Collapse title="📸 Carousel Ideas" subtitle="Saveable, shareable slide posts" accent={C.green}>
            <div style={{ marginTop: 14 }}>
              <PromptBlock label="Carousel Generator" prompt={`Create 3 carousel post ideas for Facebook or Instagram.

For each:
TOPIC: what is the carousel about
SLIDE 1: hook text (must be compelling enough to swipe)
SLIDES 2 to 6: one key point per slide, clear and concise
FINAL SLIDE: CTA driving to my FAST link or DMs
CAPTION: 2 to 3 sentence caption for under the post

Make them saveable. People should want to screenshot or share these.`} />
            </div>
          </Collapse>

          <Collapse title="💬 Story Based Posts" subtitle="Your most powerful content type" accent={C.coral}>
            <div style={{ marginTop: 14 }}>
              <PromptBlock label="Story Post Generator" prompt={`Write 3 personal story based Facebook posts using my background and experiences.

Each must:
Open with a vulnerable, surprising, or emotionally honest moment from my life
Connect the story to a lesson that helps my audience
End with a soft CTA to my FAST link
Sound like a voice note to a friend. Zero corporate language.

Use my actual story from my profile. Do not make things up.`} />
            </div>
          </Collapse>

          <Collapse title="🔄 Repurpose a Video" subtitle="Turn 1 video into 5+ pieces" accent={C.purple}>
            <div style={{ marginTop: 14 }}>
              <PromptBlock label="Video Repurpose Prompt" prompt={`Here is my video transcript:

[PASTE YOUR TRANSCRIPT HERE]

Find the 5 best 30 to 60 second segments that work as standalone Reel clips. For each:
1. Where it starts and ends
2. A caption for Facebook/Instagram
3. A hook text overlay for the first 3 seconds

Also write:
1 LinkedIn post using the most surprising point
1 Facebook text post opening with the strongest pain point
5 short quotes from the video I can use as static posts
1 carousel idea based on the video content`} />
            </div>
          </Collapse>

          <Collapse title="💡 Engagement Posts" subtitle="Drive comments and conversations" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <PromptBlock label="Engagement Post Generator" prompt={`Give me 5 engagement posts that drive comments and conversation.

Types to include:
1 poll or 'this or that' question
1 'unpopular opinion' related to my niche
1 'what would you do in this situation' scenario
1 'fill in the blank' post
1 question post that makes people share their experience

Each must relate to my niche and spark real conversation. No generic questions.`} />
            </div>
          </Collapse>

          <Collapse title="🔬 Monthly Research Refresh" subtitle="Paste once per month for fresh angles" accent={C.navy}>
            <div style={{ marginTop: 14 }}>
              <PromptBlock label="Monthly Refresh" prompt={`I need to refresh my content research.

1. Go deeper on 3 pain points I have not covered yet
2. Give me 10 NEW content angles with different hooks and emotional triggers
3. 5 objection busting post ideas for my niche
4. Seasonal or timely topics I should cover this month
5. 3 NEW copy swipe posts using fresh angles

Keep my tone. Every idea must connect to a real pain or desire.`} />
            </div>
          </Collapse>

          {/* WEEKLY ROUTINE SUMMARY */}
          <div style={{ background: C.accent + "08", border: `1px solid ${C.accent}15`, borderRadius: 16, padding: "24px", marginTop: 20, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>YOUR WEEKLY ROUTINE</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 16 }}>
              {[
                { time: "10 min", task: "Paste weekly prompt", day: "Sunday" },
                { time: "2 to 3 hrs", task: "Batch film + design", day: "Content Day" },
                { time: "15 min", task: "Schedule everything", day: "Same Day" },
              ].map((r, i) => (
                <div key={i} style={{ background: C.cardBorder, borderRadius: 10, padding: "12px" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.accent }}>{r.time}</div>
                  <div style={{ fontSize: 12, color: C.text, fontWeight: 600, marginTop: 4 }}>{r.task}</div>
                  <div style={{ fontSize: 10, color: C.textDim, marginTop: 2 }}>{r.day}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.heading, lineHeight: 1.4 }}>
              Total: 2.5 to 3.5 hours per week. The AI does the thinking. You do the executing.
            </div>
          </div>
        </div>
      )}

      {/* ── SCORECARD ── */}
      {pm("scorecard") && (
        <div>
          <SectionTitle sub="Check these off as you hit them. This is your 90 day finish line.">90 Day Scorecard</SectionTitle>
          <Card accent={C.green}>
            <Checklist items={isYouTube ? [
              "YouTube channel created and optimized with FAST Link everywhere",
              "Facebook Page created and posting 3 to 5 times per week",
              "Audience Research doc with 50+ real questions from your niche",
              "10+ YouTube videos published (1 per week for 10 weeks)",
              "10+ short clips repurposed for Facebook/Instagram",
              "Repeatable weekly workflow documented and running",
              "Rolling List maintained: names added daily, replacements made same day",
              "FAST Link clicks tracked in GHL",
              "3 to 8 booked clarity calls from content",
              "1 to 3 closed clients from YouTube leads",
              "AI Content Profile downloaded and stored in Claude or ChatGPT",
              "Weekly AI prompt generating content ideas consistently",
            ] : isNonDigital ? [
              "2 recurring networking events locked in and attended consistently",
              "Outreach profile optimized with FAST Link on Facebook or LinkedIn",
              "Rolling List maintained: 50+ names, daily additions, same day replacements",
              "150+ outreach messages sent (outreach + networking follow ups combined)",
              "Business card follow up system running consistently",
              "30 to 50 networking contacts added to Rolling List from events",
              "5 to 10 referral partners identified and nurtured",
              "FAST Link clicks tracked in GHL",
              "8 to 15 booked clarity calls total (outreach + networking)",
              "3 to 6 closed clients from networking sourced leads",
              "Repeatable weekly networking routine documented",
              "AI Content Profile downloaded and stored in Claude or ChatGPT",
            ] : isConservative ? [
              "Outreach profile optimized with FAST Link",
              "Rolling List maintained: 50+ names, daily additions, same day replacements",
              "600+ outreach messages sent over 90 days",
              "Follow up framework followed consistently (FU #1 and FU #2 for every contact)",
              "FAST Link clicks tracked in GHL",
              "20 to 30 booked clarity calls from outreach",
              "6 to 12 closed clients",
              "Referrals accounting for 30%+ of new names",
              "Repeatable daily outreach routine documented",
              "Best performing outreach messages saved as a swipe file",
              "Decision made on whether to add a second traffic source for next 90 days",
              "AI Content Profile downloaded and stored in Claude or ChatGPT",
            ] : isStdDigital ? [
              "Facebook Page created and posting 5 to 7 times per week",
              "Outreach profile optimized with FAST Link",
              "Rolling List maintained: 50+ names, daily additions, same day replacements",
              "400+ outreach messages sent",
              "60+ Facebook posts published",
              "Content generating inbound DMs and engagement",
              "FAST Link clicks tracked in GHL",
              "12 to 20 booked clarity calls (outreach + content combined)",
              "6 to 12 closed clients",
              "AI Content Profile downloaded and stored in Claude or ChatGPT",
              "Weekly AI prompt generating content ideas consistently",
              "Batch content workflow running (one content day per week)",
            ] : [
              "Facebook Group created with 150 to 300 members",
              "12+ Lives completed (weekly)",
              "Group engagement growing (comments, questions, member posts)",
              "Rolling List maintained: 50+ names, daily additions, same day replacements",
              "Outreach profile optimized with FAST Link",
              "FAST Link clicks tracked in GHL",
              "15 to 25 booked clarity calls (outreach + group combined)",
              "4 to 8 closed clients from group sourced leads",
              "Recurring content series running in the group",
              "AI Content Profile downloaded and stored in Claude or ChatGPT",
              "Weekly AI prompt generating content ideas consistently",
              "Group management system documented",
            ]} />
          </Card>

          <div style={{ background: C.accent + "0d", border: `1px solid ${C.accent}20`, borderRadius: 16, padding: "24px", marginTop: 16, textAlign: "center" }}>
            <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: C.text, lineHeight: 1.4, marginBottom: 8 }}>
              If you checked everything off, you do not have a marketing problem anymore. You have a scaling problem. That is a much better problem to have.
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>
              The system works. Now run it for the next 90 days.
            </div>
          </div>
        </div>
      )}

      {/* ── NETWORKING TAB (Standard Non Digital) ── */}
      {pm("networking") && isNonDigital && (
        <div>
          <SectionTitle sub="Face to face is the oldest marketing channel. It works. But only if you do it right. This guide covers where to go, how often, and what to do when you get a business card.">Networking Guide</SectionTitle>

          <Collapse title="How to Find Events Worth Attending" subtitle="Where to look and what to search for" accent={C.gold} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>Your niche determines where you go. A room full of tech founders is useless if you serve tradespeople. Start with these sources and filter ruthlessly.</p>
              <Checklist items={[
                "Eventbrite: search '[your city] networking' or '[your city] business' or '[your niche] [your city]'. Filter by 'free' and 'this week' to start",
                "Meetup.com: search by interest category. 'Business Networking', 'Entrepreneurs', 'Real Estate', 'Young Professionals'. Join 3 to 5 groups. Attend the next event for each before committing",
                "BNI (Business Network International): structured referral group. One member per profession. Find your local chapter at bni.com. Visitor days are free. Good if you want predictable weekly referrals",
                "Chamber of Commerce: your local chamber hosts monthly mixers, lunch and learns, and business after hours events. Membership is $200 to $500/year in most Canadian cities. Worth it if your niche overlaps with local business owners",
                "Facebook Groups: search '[your city] networking' or '[your city] business events' or '[your city] moms group' or whatever matches your niche. These groups post events weekly",
                "Community boards: your local library, community center, and rec center all have physical bulletin boards and event calendars online. Underrated source for niche specific events (parenting groups, new homeowner seminars, retirement workshops)",
                "LinkedIn Events: search events in your city. Filter by industry. Many free business networking events are posted here only",
                "Ask your existing contacts: 'What networking events do you go to?' is one of the highest ROI questions you can ask anyone in your Rolling List",
              ]} />
            </div>
          </Collapse>

          <Collapse title="How to Evaluate if an Event is Worth Your Time" subtitle="Not all events are equal. Most are a waste." accent={C.coral}>
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>Before you commit to a recurring event, attend once and run it through this filter. If it fails 3 or more of these, drop it.</p>
              <Card accent={C.accent}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 10 }}>The 7 Point Event Filter</div>
                <Checklist items={[
                  "IS YOUR NICHE IN THE ROOM? If you serve young families and the room is 50+ year old business owners, wrong room. This is the number one filter. Everything else is secondary",
                  "What is the size? 20 to 50 people is ideal. You can talk to most of them. 200+ is too diluted. You will not have meaningful conversations",
                  "What is the format? Structured events (BNI, roundtables, speed networking) force conversations. Casual mixers only work if you are comfortable initiating. Be honest about which format suits you",
                  "Are the same people there every time? Recurring events with a core group build recognition. Drop in events with new people every time give breadth but not depth",
                  "Is there a cost? Free events attract tire kickers. Paid events ($20 to $50) filter for people who are serious about networking. BNI and chambers cost more but deliver higher quality contacts",
                  "What is the drive time? 20 minutes or less. If you spend an hour driving for a 90 minute event, the ROI collapses. Exception: if your exact niche is heavily represented, the drive is worth it",
                  "Can you add value there? If the event has speakers or workshops, can you eventually offer to present? That positions you as an authority, not just another attendee",
                ]} />
              </Card>
            </div>
          </Collapse>

          <Collapse title="How Often to Go" subtitle="Consistency beats coverage" accent={C.teal}>
            <div style={{ marginTop: 14 }}>
              <Card accent={C.gold} style={{ background: C.goldLight }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 8 }}>The Rule: Same Event, Minimum 2x Per Month</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>People buy from people they recognize. Going once to 10 different events is worse than going 10 times to 1 event. You need to become "the insurance person" at your event. That takes repeated presence. Most people need to see your face 3 to 5 times before they remember your name. By visit 6 to 8, they start referring others to you without you asking.</p>
              </Card>
              <div style={{ marginTop: 12 }}>
                <Checklist items={[
                  "Pick 1 to 2 recurring events that pass the 7 point filter. Commit to both for 90 days minimum",
                  "BNI meets weekly. Chambers typically meet monthly. Meetup groups vary. Find a rhythm that gives you 2 to 4 touchpoints per month",
                  "Block the events in your calendar as non negotiable. Treat them like client meetings",
                  "If you miss one, make up for it by reaching out to 5 people you would have seen there",
                  "After 90 days: evaluate. Are you getting introductions? Are people remembering your name? If yes, keep going. If no after 90 days of consistent attendance, switch events",
                ]} />
              </div>
            </div>
          </Collapse>

          <Collapse title="What to Do AT the Event" subtitle="Connect. Do not pitch." accent={C.purple}>
            <div style={{ marginTop: 14 }}>
              <Card accent={C.red} style={{ background: "#FEF2F2" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.red, marginBottom: 6 }}>The #1 Rule: Do NOT Pitch at Events</div>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>Nobody wants to be sold to at a networking event. The person handing out business cards and talking about their products is the person everyone avoids. Your job is to be the person others WANT to talk to. That means asking questions and listening.</p>
              </Card>
              <div style={{ marginTop: 12 }}>
                <Checklist items={[
                  "Arrive on time or 10 minutes early. The best conversations happen before the event fills up",
                  "Set a goal: meet 5 to 8 new people per event. Quality over quantity",
                  "Lead with curiosity: 'What do you do?' then 'How did you get into that?' then 'What is the biggest challenge in your business right now?'",
                  "When they ask what you do, keep it short: 'I help [niche] make sure their family is protected if something unexpected happens.' One sentence. Then redirect back to them",
                  "DO NOT hand out your business card unless asked. Collect theirs instead. You want to control the follow up",
                  "If someone shares a problem related to your work, say: 'That is actually something I help people with. Would it be okay if I sent you something useful?' That is permission to follow up",
                  "Before leaving, write a note on the back of every card: where you met, what you talked about, anything personal they mentioned (kids, vacation, project). You will need this for your follow up message",
                  "Stay for the full event. Leaving early signals you are not serious about the relationships",
                ]} />
              </div>
            </div>
          </Collapse>

          <Collapse title="After the Event: The Business Card Follow Up System" subtitle="This is where networking becomes leads" accent={C.green} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>A business card is worthless unless you act on it. Most people collect 10 cards and follow up with zero. This system turns every card into a potential lead on your Rolling List.</p>

              <Card accent={C.coral}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Within 24 Hours: Personalized Connection Message</div>
                <div style={{ background: C.coralLight, borderRadius: 10, padding: "14px 16px", fontSize: 14, lineHeight: 1.6, fontStyle: "italic", marginBottom: 8 }}>
                  "Hey [Name], great meeting you at [event name] last night. I really enjoyed our conversation about [specific thing they mentioned]. Would love to stay connected."
                </div>
                <div style={{ fontSize: 12, color: C.gray }}>Send on Facebook or LinkedIn. Use the notes you wrote on the card. Generic messages get ignored. Specific references to your conversation build trust instantly.</div>
              </Card>

              <Card accent={C.accent}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 1 to 2: Add to Rolling List</div>
                <div style={{ fontSize: 14, lineHeight: 1.7 }}>Every new contact goes on your Rolling List. Mark the source as the event name. Mark as "Warm" because you met face to face. This person is now part of your outreach system.</div>
              </Card>

              <Card accent={C.gold}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 3 to 5: Share Value (Not a Pitch)</div>
                <div style={{ background: C.goldLight, borderRadius: 10, padding: "14px 16px", fontSize: 14, lineHeight: 1.6, fontStyle: "italic", marginBottom: 8 }}>
                  "Hey [Name], I came across this [article/video/resource] and thought of our conversation about [topic]. Figured you might find it useful."
                </div>
                <div style={{ fontSize: 12, color: C.gray }}>This is a value touch, not a pitch. You are proving you listened and that you provide value. If you have a relevant piece of content (a blog post, a video, a useful calculator), send that. If not, find one. The point is to be useful before being promotional.</div>
              </Card>

              <Card accent={C.purple}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 7 to 10: Bridge to FAST Link (Only if they engaged)</div>
                <div style={{ background: C.purpleLight, borderRadius: 10, padding: "14px 16px", fontSize: 14, lineHeight: 1.6, fontStyle: "italic", marginBottom: 8 }}>
                  "By the way, I actually put together a quick page that breaks down [relevant topic to their situation]. If you are curious, here is the link. No pressure at all, just figured it might be relevant based on what you shared."
                </div>
                <div style={{ fontSize: 12, color: C.gray }}>This is your FAST link. Only send it if they responded to your connection message or value touch. If they have not responded to either, they go into your Rolling List follow up sequence (FU #1, FU #2) like any other contact.</div>
              </Card>

              <Card accent={C.red} style={{ background: "#FEF2F2", marginTop: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.red, marginBottom: 8 }}>If They Do NOT Respond</div>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>Follow your Rolling List rules. FU #1 (next day after your value touch). FU #2 (2 to 3 days later). No reply after FU #2? Mark as Follow Up or Remove. Do NOT keep chasing people who are not engaging. Replace with a new name from your next event. The goal is to keep the list fresh and moving, not to chase ghosts.</p>
              </Card>

              <div style={{ background: C.accent + "0d", border: `1px solid ${C.accent}20`, borderRadius: 12, padding: "20px 24px", marginTop: 16, textAlign: "center" }}>
                <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.6 }}>
                  Every event should add 5 to 8 names to your Rolling List. At 2 events per month, that is 10 to 16 new names. At a 10 to 15% conversion rate, that is 1 to 2 booked calls per month from networking alone, layered on top of your outreach.
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      )}

      {/* ── PHASE 1: DAYS 1-30 (Standard Non Digital) ── */}
      {pm("phase1") && isNonDigital && (
        <div>
          <SectionTitle sub="Foundation. Rolling List running hard. Find your networking events. First follow ups from events.">Phase 1: Days 1 to 30</SectionTitle>

          <Collapse title="Days 1 to 5: Research Sprint + Rolling List Launch" subtitle="No events yet. Research and outreach only." accent={C.teal} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Run the Mavericks Research Engine (previous step) if you have not already. Print or save the output",
                "Read the full Networking tab in this plan. Understand the 7 point event filter before attending anything",
                "Download your Rolling List tracker from the Converter step",
                "Write down 50 names: friends, family, coworkers, acquaintances, social media connections, past colleagues",
                "Categorize each as Warm (know you personally) or Cold (connected online but no real relationship)",
                "Block 1 to 2 hours daily for outreach. This is non negotiable for the full 90 days",
                "Send your first 10 outreach messages using the framework in the Outreach tab",
                "Add 5 to 10 new names to the list. Every day. No exceptions",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 3 to 7: Find Your Events" subtitle="Research, do not attend yet" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Search Eventbrite, Meetup, BNI, Chamber of Commerce, and Facebook for events in your city (see Networking tab for exact search terms)",
                "Make a list of 5 to 8 potential events. For each, write: name, date/time, cost, format, and whether your niche is likely in the room",
                "Run each through the 7 point event filter. Eliminate any that fail 3+ points",
                "Pick 2 to 3 events to attend in the next 2 weeks. Register or RSVP now. Put them in your calendar",
                "If BNI interests you, find your local chapter and request a visitor day. These fill up, so book early",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 8 to 14: Attend First Events + Continue Outreach" subtitle="Parallel tracks: events + Rolling List" accent={C.coral}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Attend your first 1 to 2 events. Follow the 'What to Do AT the Event' checklist in the Networking tab",
                "Collect 5 to 8 business cards per event. Write notes on the back of each card before you leave",
                "Within 24 hours: send personalized connection messages to every new contact (see Business Card Follow Up System in Networking tab)",
                "Day 2: add all new contacts to your Rolling List. Mark source as the event name. Mark as Warm",
                "Day 3 to 5: send a value touch to each (article, video, or resource related to your conversation)",
                "Day 7 to 10: if they responded, bridge to your FAST link. If no response, follow Rolling List FU rules",
                "Continue daily outreach to your Rolling List: 1 to 2 hour block, 5 to 10 messages sent",
                "Replace every name that says No or goes silent after FU #2. Same day replacement",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 15 to 30: Evaluate and Commit" subtitle="Double down on what works" accent={C.purple}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Attend 2 to 3 more events. Try a mix: one structured (BNI or chamber), one casual mixer",
                "By Day 20, you should have attended 3 to 5 events total. Evaluate each: did you meet your niche? Did people remember you from last time? Did you enjoy it?",
                "Pick your 1 to 2 recurring events. These are your commitments for the next 60 days",
                "Register or pay for membership if needed (BNI, chamber). Commit financially so you show up",
                "Continue Rolling List: you should have 50+ names by now, with active replacements happening daily",
                "Track your numbers: outreach sent, FU #1 sent, FU #2 sent, FAST link clicks, booked calls",
                "By Day 30: you should have 3 to 5 booked calls from outreach and 0 to 2 from networking contacts",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 30 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Events Attended" value="3 to 5" color={C.gold} />
                  <StatBox label="Outreach Sent" value="100+" color={C.coral} />
                  <StatBox label="New Contacts from Events" value="15 to 30" color={C.accent} />
                  <StatBox label="Booked Calls" value="3 to 7" color={C.green} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}

      {/* ── PHASE 2: DAYS 31-60 (Standard Non Digital) ── */}
      {pm("phase2") && isNonDigital && (
        <div>
          <SectionTitle sub="Momentum. You are now a regular at your events. Contacts recognize you. Outreach shifts from cold to warm.">Phase 2: Days 31 to 60</SectionTitle>

          <Collapse title="Days 31 to 45: Become a Regular" subtitle="Recognition is your advantage" accent={C.gold} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Attend your 1 to 2 committed events consistently. By now people should be saying 'Hey, good to see you again'",
                "Start introducing people to each other at events. This positions you as a connector, which is the most powerful role in any networking room",
                "Ask the organizer if there are opportunities to present, sponsor, or contribute. Even a 5 minute intro positions you as an authority",
                "For BNI: use your 60 second pitch to tell a specific client story (anonymized). Stories convert. Features bore",
                "For each event, aim for 3 to 5 NEW contacts plus checking in with 3 to 5 existing contacts",
                "Existing contacts are now warm. When you follow up, reference your ongoing relationship, not just the first meeting",
                "Continue daily outreach: 5 to 10 messages per day. Your list should be cycling faster now with event contacts feeding in",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 31 to 60: Warm Outreach Shift" subtitle="Events are creating warm leads" accent={C.teal}>
            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>By now your networking contacts should be responding to your messages at a higher rate than cold outreach. Your follow up should reflect this:</p>
              <Checklist items={[
                "Networking contacts get priority in your outreach block. They are warmer and convert faster",
                "When a networking contact refers someone to you, follow up within 24 hours. Mention who referred you by name",
                "Start asking for referrals at events: 'Do you know anyone who [description of your niche situation]?' People are more willing to refer after they see you 3 to 4 times",
                "Cold outreach continues but at reduced volume: 5 per day instead of 10. Events should be feeding your list",
                "Rolling List should be 60% event contacts, 40% cold by now. If it is still mostly cold, you need to attend more events or switch to events with better niche fit",
                "Track which outreach messages get the most responses. Networking contacts vs cold. You should see a clear difference",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 46 to 60: Optimize and Expand" subtitle="What is working? Double down" accent={C.coral}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Review your numbers: how many booked calls from networking contacts vs cold outreach? What is the conversion rate for each?",
                "If one event is producing significantly more contacts than the other, consider attending it more frequently or dropping the weaker one",
                "If you have been doing BNI: by now you should be receiving 1 to 2 referrals per month. If not, your 60 second pitch needs work. Make it story based, not feature based",
                "Consider adding one more event type: a workshop, lunch and learn, or industry specific conference",
                "Ask your best networking contacts for a 1 on 1 coffee meeting. These deepen the relationship and often lead to referrals faster than group events",
                "By Day 60: you should be getting introductions without asking. People at your regular events should know 'that is the insurance person'",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 60 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Events Attended" value="8 to 12" color={C.gold} />
                  <StatBox label="Network Contacts" value="30 to 50" color={C.accent} />
                  <StatBox label="Referrals Received" value="2 to 5" color={C.coral} />
                  <StatBox label="Booked Calls" value="8 to 15" color={C.green} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}

      {/* ── PHASE 3: DAYS 61-90 (Standard Non Digital) ── */}
      {pm("phase3") && isNonDigital && (
        <div>
          <SectionTitle sub="System. Your events are locked in. Referrals are supplementing outreach. Build the machine that runs itself.">Phase 3: Days 61 to 90</SectionTitle>

          <Collapse title="Days 61 to 75: Referral Engine" subtitle="Stop asking. Start receiving." accent={C.gold} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "By now you should have 5 to 10 people at your events who know, like, and trust you. These are your referral partners",
                "Set up 1 on 1 coffee meetings with your top 5 referral partners. Ask: 'Who in your network would benefit from a conversation about [your niche topic]?'",
                "Offer reciprocal value: 'I would love to refer people your way too. Who is your ideal client?' Referrals are a two way street",
                "For every closed deal from a referral, send a handwritten thank you card or small gift ($20 to $30). This cements the behavior",
                "If BNI: your closing rate from BNI referrals should be 30 to 50%. If it is lower, your category education at meetings needs improvement",
                "Start tracking referral sources: who sends you the most? Who sends the best quality? Nurture these relationships above all others",
              ]} />
            </div>
          </Collapse>

          <Collapse title="Days 76 to 90: Build the Repeatable System" subtitle="Document everything" accent={C.teal}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Document your weekly networking routine: which events, what day, what time, what you do before and after",
                "Create a follow up template library: connection message, value touch, FAST link bridge, referral ask. Save these so you can personalize quickly",
                "Calculate your networking ROI: total cost (membership + gas + time) vs revenue from networking sourced clients",
                "Plan your next 90 days: which events stay? Which get dropped? Any new ones to try?",
                "If budget allows ($50 to $100/month): sponsor a monthly event or provide refreshments. This buys visibility at low cost",
                data.goal !== "production" ? "Recruiting angle: your networking contacts see your professionalism first hand. When they say 'I wish I could help people like you do,' that is your recruiting opening" : "Client referral system: every closed client gets asked 'Do you know one person in a similar situation who might benefit from this conversation?'",
                "Rolling List review: by now, 50 to 70% of your list should be warm contacts from events and referrals. If cold outreach still dominates, your events are not producing and you need to reassess",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 90 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Regular Events" value="2" color={C.gold} />
                  <StatBox label="Referral Partners" value="5 to 10" color={C.accent} />
                  <StatBox label="Monthly Referrals" value="3 to 6" color={C.coral} />
                  <StatBox label="Closed from Network" value="3 to 6" color={C.green} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}

      {/* ── CONSERVATIVE PHASES ── */}
      {pm("phase1") && isConservative && (
        <div>
          <SectionTitle sub="Your ONLY engine is outreach and your Rolling List. No content. No events. Pure execution. The Rolling List replacement rules are not optional. They are the difference between running out of leads in 30 days and sustaining this for 90 days.">Phase 1: Days 1 to 30</SectionTitle>
          <Card accent={C.red} style={{ background: "#FEF2F2", marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.red, marginBottom: 8 }}>⚠️ Why Outreach Alone Runs Out</div>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>Every name you contact is one less name on your list. If you send 10 messages today and do not add 10 new names, you are one day closer to zero. This plan only works if you REPLACE names daily. No exceptions.</p>
          </Card>
          <Collapse title="Days 1 to 3: Setup + First 50 Names" subtitle="Build the foundation" accent={C.teal} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Download your Rolling List tracker from the Converter step",
                "Write down 50 names: friends, family, coworkers, acquaintances, social media connections, past colleagues, neighbors, former classmates",
                "Categorize each as Warm (know you personally) or Cold (connected online but no real relationship)",
                `Optimize your ${data.outreachPlatform} profile: professional photo, bio that says what you do for your niche, FAST link in bio or featured section`,
                "Read the Outreach tab in full. Understand the 3 message framework before you send anything",
                "Block 1.5 to 2 hours daily for outreach. Same time every day. Non negotiable for 90 days",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 4 to 14: First Outreach Sprint" subtitle="Send, follow up, replace" accent={C.coral}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Send 10 outreach messages per day using the 3 message framework (Outreach tab)",
                "Personalize every single message. Reference something specific about the person. No copy paste",
                "Log every message in your Rolling List tracker: date sent, link sent, response status",
                "FU #1 next day for anyone who did not respond. FU #2 two to three days later",
                "Anyone who says No: remove + replace SAME DAY with a new name",
                "Anyone who goes silent after FU #2: mark or remove. Replace immediately",
                "Add 5 to 10 NEW names daily. Sources: Facebook friend suggestions, LinkedIn connections, friends of friends, group members",
                "By Day 14 you should have sent 100+ messages and your list should still have 50+ active names",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 15 to 30: Refine and Accelerate" subtitle="What is working? Double down." accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Review your numbers: how many messages sent, how many responses, how many FAST link clicks, how many booked calls",
                "Which opening messages got the most responses? Use those as templates (still personalize each one)",
                "Warm outreach should now include people who engaged with your profile or posts. These convert 2 to 3x better than cold",
                "Increase daily outreach to 15 if your list supports it. If not, focus on adding more names",
                "Ask every booked call: 'Do you know one other person who might benefit from this conversation?' Start building referral muscle",
                "Rolling List audit every weekend: how many names added this week? How many removed? Is the list growing or shrinking?",
                "If your list is shrinking, your replacement discipline is failing. Fix it now or you will be at zero by Day 45",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 30 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Messages Sent" value="200+" color={C.coral} />
                  <StatBox label="FAST Link Clicks" value="15+" color={C.accent} />
                  <StatBox label="Booked Calls" value="5 to 10" color={C.green} />
                  <StatBox label="Active List Size" value="50+" color={C.gold} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}
      {pm("phase2") && isConservative && (
        <div>
          <SectionTitle sub="You have a rhythm now. The goal is to increase response rate and start getting warm referrals.">Phase 2: Days 31 to 60</SectionTitle>
          <Collapse title="Days 31 to 45: Warm Outreach Shift" subtitle="Cold to warm transition" accent={C.teal} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Prioritize warm outreach: anyone who previously responded but did not book, referrals, people who engaged with your profile",
                "New outreach message for warm contacts: reference your previous conversation or mutual connection",
                "Cold outreach continues at 5 to 8 per day. Warm outreach at 5 to 8 per day. Total: 10 to 15 daily",
                "Track response rates separately: warm vs cold. Warm should be 2 to 3x higher",
                "Ask every satisfied client for 1 referral. Make it specific: 'Do you know a [niche description] who might have the same concern?'",
                "Rolling List should now be 40% warm contacts. If still mostly cold, your warm pipeline is not being built",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 46 to 60: Referral System" subtitle="Turn clients into lead sources" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Every closed deal: send a thank you message within 24 hours. Genuine. Not a template",
                "7 days after close: ask for a referral. 'Who else in your circle might benefit from this kind of protection?'",
                "30 days after close: ask for a Google or Facebook review. Send the direct link. Make it easy",
                "Build a referral tracking column in your Rolling List. Who referred whom? Which referral sources are producing?",
                "If a referral source sends 2+ people, nurture that relationship. Coffee, check in calls, birthday messages",
                "By Day 60: referrals should account for 20 to 30% of your new names. If not, your ask is too weak or too late",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 60 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Total Messages" value="400+" color={C.coral} />
                  <StatBox label="Booked Calls" value="12 to 20" color={C.green} />
                  <StatBox label="Referrals Received" value="5+" color={C.gold} />
                  <StatBox label="Closed Clients" value="3 to 6" color={C.accent} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}
      {pm("phase3") && isConservative && (
        <div>
          <SectionTitle sub="Sustain and decide. Outreach only has a ceiling. By Day 90 you should know your numbers and whether to add a second traffic source.">Phase 3: Days 61 to 90</SectionTitle>
          <Collapse title="Days 61 to 75: Optimize the Machine" subtitle="Maximum efficiency from outreach alone" accent={C.coral} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Document your best performing outreach messages. Build a swipe file of 5 to 10 openers that work",
                "Calculate your conversion rate: messages sent to booked calls to closed clients. Know your numbers",
                "If you need 10 messages to book 1 call and 3 calls to close 1 client, you need 30 messages per close. Plan accordingly",
                "Referral pipeline should be self sustaining: every client generates at least 1 referral within 30 days of closing",
                "Continue daily outreach: 10 to 15 messages. Your list should be cycling fast now with warm contacts feeding in",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 76 to 90: Plan Your Next Move" subtitle="Outreach has a ceiling. What is next?" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Honest assessment: is your list growing or shrinking over time? If shrinking, outreach alone will not sustain you past 6 months",
                "Calculate your outreach ceiling: how many new names can you realistically add per week? That is your maximum pipeline",
                "Consider adding a second traffic source: Facebook content (Standard Digital) or networking events (Standard Non Digital)",
                "If you add content: start with the FB Content Strategy tab. 3 to 4 posts per week alongside your outreach",
                "If you add networking: start with 1 to 2 events per month. See the Networking guide in the Standard Non Digital plan",
                "Document your full outreach system: messages, follow up timing, replacement rules, referral ask timing. This is your playbook",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 90 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Total Messages" value="600+" color={C.coral} />
                  <StatBox label="Booked Calls" value="20 to 30" color={C.green} />
                  <StatBox label="Closed Clients" value="6 to 12" color={C.accent} />
                  <StatBox label="Referral %" value="30%+" color={C.gold} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}

      {/* ── STANDARD DIGITAL PHASES ── */}
      {pm("phase1") && isStdDigital && (
        <div>
          <SectionTitle sub="Two parallel tracks: outreach for immediate pipeline, Facebook content for long term compounding. Your Rolling List feeds the first. Your content feeds the second.">Phase 1: Days 1 to 30</SectionTitle>
          <Card accent={C.coral} style={{ background: C.coralLight, marginBottom: 16 }}>
            <div style={{ fontSize: 14, lineHeight: 1.7 }}>⚠️ <strong>No expectations on content results for 60 days.</strong> Your outreach generates conversations immediately. Your Facebook content will not produce leads for 6 to 8 weeks. Do not judge your content results at Day 30. Judge your outreach results. Content is the investment. Outreach is the income.</div>
          </Card>
          <Collapse title="Days 1 to 5: Research + Rolling List + Profile Setup" subtitle="Foundation for both tracks" accent={C.teal} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Run the Mavericks Research Engine if you have not already. Save the output",
                "Download your Rolling List tracker. Write down 50 names",
                `Optimize your ${data.outreachPlatform} profile: professional photo, clear bio, FAST link`,
                "Create a Facebook Business Page: your name + what you do. Professional photo, cover with FAST link, one sentence about section",
                "Add a 'Book Now' CTA button on your FB Page linking to your FAST link",
                "Post your first piece of content: introduce yourself, who you help, why. Keep it under 200 words",
                "Invite your warm contacts to follow the page",
                "Block daily schedule: 1 hour outreach + 30 min content. Same time every day",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 6 to 14: Outreach Sprint + Content Habit" subtitle="Parallel tracks running" accent={C.coral}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "OUTREACH: 10 messages per day using 3 message framework. Log everything in Rolling List",
                "OUTREACH: FU #1 and FU #2 for every contact. Replace every removed name same day",
                "CONTENT: Post 3 to 4 times this week on your FB Page. Follow the 50/30/20 split (see FB Content tab)",
                "CONTENT: Use the Train Your AI tab to set up your AI content assistant. Paste your first weekly prompt",
                "CONTENT: Batch your content: pick one day to create all posts for the week. Schedule in Meta Business Suite",
                "Add 5 to 10 new names to Rolling List daily",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 15 to 30: Settle Into the Routine" subtitle="Both tracks running consistently" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Outreach: 10 to 15 messages per day. Your follow up system should be automatic now",
                "Content: 3 to 4 posts per week consistently. Mix of education, relatable, authority (see FB Content tab)",
                "If comfortable on camera: film 1 to 2 short Reels per week. These get 3 to 5x more reach than static posts",
                "If NOT on camera: use faceless content formats (text overlays, screen recordings with voiceover, quote graphics)",
                "Every post should end with a soft CTA: 'Link in bio' or 'DM me [keyword]' or direct FAST link",
                "Rolling List audit every weekend. Your list should be growing, not shrinking",
                "Do NOT judge content results yet. 60 day minimum before evaluating reach and engagement",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 30 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Messages Sent" value="200+" color={C.coral} />
                  <StatBox label="FB Posts" value="12+" color={C.purple} />
                  <StatBox label="Booked Calls" value="5 to 10" color={C.green} />
                  <StatBox label="Active List" value="50+" color={C.gold} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}
      {pm("phase2") && isStdDigital && (
        <div>
          <SectionTitle sub="Content is building familiarity. Outreach is still your primary lead source. Start looking for engagement signals on your content.">Phase 2: Days 31 to 60</SectionTitle>
          <Collapse title="Days 31 to 45: Content Ramp Up" subtitle="Increase frequency if you have the rhythm" accent={C.teal} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Increase posting to 4 to 5 times per week if the habit is solid. If not, stay at 3 to 4 and focus on quality",
                "Check which posts got the most engagement. More of those formats and topics. Less of what flopped",
                "Start repurposing: turn your best performing post into a Reel or carousel. One idea, multiple formats",
                "Outreach continues: shift from 100% cold to 60% cold, 40% warm (people who engaged with your content)",
                "Warm outreach message: 'Hey [Name], I saw you liked my post about [topic]. Did that resonate with your situation?'",
                "Continue Rolling List replacement: 5 to 10 new names daily. Every removal replaced same day",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 46 to 60: First Content Signals" subtitle="Content should start showing life" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "By Day 50 to 60 your content should be showing engagement signals: likes, comments, shares, DMs from posts",
                "Anyone who DMs you because of a post is a warm lead. Respond within 2 hours. Bridge to FAST link naturally",
                "If no engagement after 60 days of consistent posting: your hooks are too weak or your content is too generic. Revisit research output",
                "Start asking for engagement: 'What questions do you have about [topic]? Drop them below' at the end of posts",
                "Referral system: ask every closed client for 1 referral and 1 Google/Facebook review",
                "Content + outreach should now be generating 2 separate streams of booked calls",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 60 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Messages Sent" value="400+" color={C.coral} />
                  <StatBox label="FB Posts" value="30+" color={C.purple} />
                  <StatBox label="Booked Calls" value="12 to 20" color={C.green} />
                  <StatBox label="Inbound DMs" value="3+" color={C.accent} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}
      {pm("phase3") && isStdDigital && (
        <div>
          <SectionTitle sub="Content is compounding. Outreach becomes supplementary. Build the system that runs itself.">Phase 3: Days 61 to 90</SectionTitle>
          <Collapse title="Days 61 to 75: Content Takes Over" subtitle="Shift the balance" accent={C.purple} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Post 5 to 7 times per week. Daily posting is the target now. Use your weekly AI prompt to generate all ideas",
                "Every post gets a CTA. Alternate between soft ('DM me') and direct (FAST link)",
                "Track which content formats drive the most FAST link clicks. Double down on winners",
                "Reduce cold outreach to 5 per day. Warm outreach from content engagement should fill the gap",
                "If you are on camera: start batching video content. Film 3 to 5 Reels in one session per week",
                "Consider boosting your top performing post ($20 to $50) to test paid amplification of proven content",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 76 to 90: Systemize Everything" subtitle="Document and scale" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Document your weekly workflow: content day, outreach block, follow up day, review day",
                "Calculate ROI: time invested in content vs leads from content. Time invested in outreach vs leads from outreach",
                "Your content library now has 40 to 60+ posts. These keep working. Old posts still get discovered",
                "Plan your next 90 days: increase content frequency? Add video? Add a second platform?",
                "If leads from content are matching or exceeding outreach: you have built a compounding asset. Outreach becomes supplementary",
                data.goal !== "production" ? "Recruiting content: your Facebook Page IS your recruiting portfolio. Share your best posts with potential recruits" : "Referral system: every closed client gets the referral ask at Day 7 and review ask at Day 30",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 90 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="FB Posts" value="60+" color={C.purple} />
                  <StatBox label="Inbound Leads/Week" value="2 to 4" color={C.accent} />
                  <StatBox label="Closed Clients" value="6 to 12" color={C.green} />
                  <StatBox label="Content System" value="Running" color={C.gold} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}

      {/* ── AGGRESSIVE COMMUNITY PHASES ── */}
      {pm("phase1") && isCommunity && (
        <div>
          <SectionTitle sub="Build your own audience you own. A Facebook Group where members see you daily. Lives that create trust fast. This is the most emotionally demanding path but you own every relationship.">Phase 1: Days 1 to 30</SectionTitle>
          <Collapse title="Days 1 to 5: Facebook Group Setup (Step by Step)" subtitle="Build the container before inviting anyone in" accent={C.teal} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8 }}>CREATE YOUR GROUP</div>
              <Checklist items={[
                "Open Facebook. Click Groups (left sidebar) then 'Create New Group'",
                "Name it for your AUDIENCE, not yourself. Good: '[Niche] Financial Protection Canada' or 'Canadian Families Money Talk.' Bad: '[Your Name] Insurance Group'",
                "Set privacy to PRIVATE (visible but only members see posts). This creates exclusivity and people are more likely to share honestly",
                "Group description: 3 to 4 sentences. Who is this for? What will they learn? What makes this different from other groups? Include your FAST link at the bottom",
                "Cover photo: Canva design (Facebook Group Cover template, 1640 x 856 px). Your name, the group purpose, professional but approachable",
                "Set membership questions (Group Settings > Membership Questions). Ask 3 questions: 'What brought you to this group?' 'What is your biggest financial concern right now?' 'How did you hear about us?' These filter spam AND give you content ideas from real answers",
                "Set group rules and pin them as the first post: no spam, no pitching, value first, be respectful. Keep it short and friendly",
              ]} />
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12, marginTop: 20 }}>SEED CONTENT (before inviting anyone)</div>
              <Checklist items={[
                "Post 1 (pin this): Welcome post. Introduce yourself, share your story, why you created this group, ask members to introduce themselves in comments",
                "Post 2 (pin this): Group FAQ. '5 Things Every Canadian Should Know About Financial Protection' (use your research output for the 5 points)",
                "Post 3 (pin this): Your top myth buster. 'The #1 Misconception About [Your Niche Topic] in Canada'",
                "Post 4: An engagement question. 'What is the one financial topic you wish someone had explained to you 5 years ago?'",
                "Post 5: A value post. Pick one pain point from your research and write a 150 word post addressing it",
                "These 5 posts make the group look alive when new members arrive. An empty group with zero posts scares people away",
              ]} />
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12, marginTop: 20 }}>ROLLING LIST (parallel track)</div>
              <Checklist items={[
                "Set up your Rolling List tracker (Google Sheet from Converter step). Write down 50 names",
                "Block 1.5 hours daily for outreach. This runs alongside group building for the full 90 days",
                "Start outreach immediately. Do not wait for the group to fill. Outreach is your pipeline while the group grows",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 6 to 9: How to Go Live (Equipment + Setup)" subtitle="Everything you need to go live confidently" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8 }}>EQUIPMENT (you probably already have everything)</div>
              <Checklist items={[
                "Camera: your smartphone is all you need. Prop it up on a tripod or lean it against something stable at eye level",
                "Audio: wireless lav mic ($40 to $70 CAD) clipped to your collar. If you do not have one yet, earbuds with a mic (AirPods, wired earbuds) work for lives. Upgrade later",
                "Lighting: face a window for natural light OR use a ring light ($30 to $50 CAD). Avoid overhead lighting that creates shadows under your eyes",
                "Background: clean and simple. Bookshelf, plain wall, tidy desk. Nothing distracting behind you",
                "Stable internet: if using phone, connect to WiFi. Test your connection before going live. Laggy video kills trust",
              ]} />
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12, marginTop: 20 }}>HOW TO GO LIVE ON FACEBOOK (step by step)</div>
              <Checklist items={[
                "Open your Facebook Group on your phone (the mobile app is easier for lives than desktop)",
                "Tap 'Write Something' then tap the 'Live Video' icon (camera icon with a broadcast symbol)",
                "Add a title: make it specific and interesting. Not 'Going Live' but 'The 3 Things Your Bank Did Not Tell You About Your Mortgage'",
                "Check your camera angle: face in the top third of frame, eye level, good lighting, background clean",
                "Tap 'Go Live.' Facebook gives a 3 second countdown. Smile and start talking",
                "TIP: go live from your personal profile INTO the group (select the group as destination). This notifies your friends AND group members",
              ]} />
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12, marginTop: 20 }}>YOUR FIRST LIVE: THE FORMAT</div>
              <Checklist items={[
                "Total time: 15 to 20 minutes. Do not overthink it. Nobody expects perfection",
                "Minute 0 to 2: WAIT for people to join. Say 'Hey everyone, give me a minute while people hop on. Drop where you are watching from in the comments!' This buys time and creates engagement",
                "Minute 2 to 4: HOOK. State exactly what you are covering and why it matters. 'Today I am going to break down the one thing most Canadian families get wrong about their mortgage protection. If you have a mortgage, stay for the next 15 minutes'",
                "Minute 4 to 14: TEACH. Cover 2 to 3 key points from your research. Use simple language. Pause between points and ask 'Does that make sense? Drop a yes in the comments if you are following'",
                "Minute 14 to 18: Q&A. 'What questions do you have? Drop them in the comments and I will answer live'",
                "Minute 18 to 20: CTA. 'If this resonated and you want to see where you stand personally, I put together a quick page where you can book a free 15 minute clarity call with me. I will drop the link in the comments.' Post your FAST link in the comments",
                "After the live: the video stays in the group forever. Post a comment summary of the key takeaways for people who watch the replay",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 10 to 14: Seed the Group + First Live" subtitle="Get founding members and do your first real live" accent={C.coral}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Invite 30 to 50 people personally. Not 'join my group' but 'I started a group specifically for [niche] to talk about [topic]. Thought you would find it useful'",
                "Post daily in the group: follow your 50/30/20 pillar split from the FB Content tab",
                "Day 10 to 12: go live in the group for the first time using the format above. Pick one topic from your research",
                "Before going live: post a teaser 2 hours before. 'Going live at [time] to talk about [topic]. Drop your questions below and I will answer them live'",
                "After the live: pin a comment with your FAST link. Post a text summary of key takeaways",
                "Continue outreach: 10 messages per day. Invite interested people to the group as a next step (not the FAST link yet)",
                "Goal: 30 to 50 members by Day 14",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 15 to 30: Weekly Live Rhythm + Content System" subtitle="Lives are your trust accelerator" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8 }}>WEEKLY LIVE SCHEDULE</div>
              <Checklist items={[
                "Go live once per week minimum. Same day, same time every week. Your members will expect it",
                "Pick your day: Tuesday or Wednesday evenings (7 to 8 PM EST) tend to get the best attendance for Canadian audiences",
                "Use the live format from Day 6 to 9: wait for viewers, hook, teach 2 to 3 points, Q&A, CTA with FAST link",
                "Increase live duration to 20 to 30 minutes as you get comfortable. Longer lives get more reach in the algorithm",
                "Save every live. These become content for people who missed it and for repurposing into clips",
              ]} />
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12, marginTop: 20 }}>GROUP CONTENT SYSTEM</div>
              <Checklist items={[
                "Post 5 to 7 times per week in the group. Use your AI weekly prompt (Train Your AI tab) for ideas",
                "Monday: education post (myth buster, tip, or explainer)",
                "Tuesday or Wednesday: go LIVE (your anchor content for the week)",
                "Thursday: engagement post ('What would you do?' 'Unpopular opinion' 'Poll')",
                "Friday: personal story or behind the scenes post",
                "Weekend: lighter content. Share an article with your take, or a weekend reflection post",
                "Reply to EVERY comment in the group within 4 hours. Engagement breeds engagement",
                "DM anyone who engages heavily: 'I noticed you have been active in the group. Is there anything specific I can help with?'",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 30 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Group Members" value="50 to 80" color={C.purple} />
                  <StatBox label="Lives Completed" value="3+" color={C.coral} />
                  <StatBox label="Outreach Sent" value="200+" color={C.accent} />
                  <StatBox label="Booked Calls" value="5 to 10" color={C.green} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}
      {pm("phase2") && isCommunity && (
        <div>
          <SectionTitle sub="Group is growing. Lives are building trust. Members are starting to see you as the go to person in this space.">Phase 2: Days 31 to 60</SectionTitle>
          <Collapse title="Days 31 to 45: Grow the Group" subtitle="Active members, not just numbers" accent={C.teal} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Cross promote: share your best group posts on your personal profile and Facebook Page. 'This conversation is happening in my group right now'",
                "Invite every new outreach contact to the group after your first conversation (not before)",
                "Go live weekly. Increase to 20 to 30 minutes. Include member questions from the week",
                "Create a recurring content series: 'Monday Myth Buster', 'Wednesday Q&A', 'Friday Win' or similar",
                "Feature member wins (with permission): 'Shoutout to [Name] who just [achievement]. This is why I do this work'",
                "Track which posts get the most comments. Those topics are your content goldmine. Create more of those",
                "Goal: 100 to 150 members by Day 45. Quality over quantity. 50 engaged members beats 500 silent ones",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 46 to 60: Convert Group Members" subtitle="Trust is built. Time to bridge to FAST links." accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Monthly value post with a direct CTA: 'I have [X] slots open this month for free clarity calls. If you want to see where you stand, grab a time here: [FAST link]'",
                "DM your most engaged members: 'You have been really active in the group. I would love to help you personally. Want me to send you a link to book a quick call?'",
                "After every live: post the FAST link in comments. 'If this resonated and you want to see where you stand, here is my calendar'",
                "Group polls: 'What topic should I go live on next?' This drives engagement AND gives you content ideas",
                "Outreach shifts: 50% of your outreach should now be DMs to engaged group members. These are the warmest leads you have",
                "Begin asking group members for referrals: 'Know someone who would benefit from being in this group? Add them!'",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 60 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Group Members" value="100 to 200" color={C.purple} />
                  <StatBox label="Lives Completed" value="8+" color={C.coral} />
                  <StatBox label="Booked from Group" value="5 to 10" color={C.green} />
                  <StatBox label="Engagement Rate" value="Growing" color={C.gold} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}
      {pm("phase3") && isCommunity && (
        <div>
          <SectionTitle sub="Your group is an owned audience. No algorithm can take it away. Build the system that keeps it alive and converting.">Phase 3: Days 61 to 90</SectionTitle>
          <Collapse title="Days 61 to 75: Content Machine + Community Management" subtitle="The group runs like a system" accent={C.purple} defaultOpen={true}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Weekly live is non negotiable. Your members expect it. Missing a week breaks trust",
                "Batch your group content: use your weekly AI prompt to generate 5 to 7 posts. Schedule them",
                "Create an 'evergreen' welcome sequence: new members see a pinned welcome post, your top 3 educational posts, and an invitation to your next live",
                "Start repurposing live recordings: clip the best 60 seconds as Reels for your FB Page and Instagram",
                "Identify your top 5 engaged members. DM them personally. Ask if they would be comfortable sharing their experience in the group (social proof)",
                "Track your group to FAST link conversion rate. How many members click? How many book? Optimize based on data",
              ]} />
            </div>
          </Collapse>
          <Collapse title="Days 76 to 90: Scale and Systemize" subtitle="Document everything" accent={C.gold}>
            <div style={{ marginTop: 14 }}>
              <Checklist items={[
                "Document your group management system: posting schedule, live schedule, DM outreach to engaged members, monthly CTA cadence",
                "Calculate ROI: time invested vs leads from group vs leads from outreach. Where should you spend more time?",
                "Plan growth strategy: how will you add 50 new members per month? Cross promotion, member referrals, paid growth?",
                "If budget allows ($50 to $100/month): run a simple Facebook ad to grow the group. Target your niche. Ad says 'Join [X] other [niche] talking about [topic]'",
                data.goal !== "production" ? "Recruiting: your group IS your recruiting showcase. Potential agents see your leadership, your content, your engagement. Share group wins when recruiting" : "Referral system: every closed client from the group gets the referral ask. 'Know someone who should be in this group?'",
                "By Day 90: the group should be generating 3 to 5 booked calls per month on its own, supplementing your outreach",
              ]} />
              <Card accent={C.green} style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 6 }}>Day 90 Checkpoint</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <StatBox label="Group Members" value="150 to 300" color={C.purple} />
                  <StatBox label="Lives Completed" value="12+" color={C.coral} />
                  <StatBox label="Closed from Group" value="4 to 8" color={C.green} />
                  <StatBox label="System Documented" value="Yes" color={C.gold} />
                </div>
              </Card>
            </div>
          </Collapse>
        </div>
      )}

      <div className="mav-noprint" style={{ marginTop: 24 }}>
        <NavRow onPrev={onPrev} />
      </div>
    </div>
    </PrintContext.Provider>
  );
}
