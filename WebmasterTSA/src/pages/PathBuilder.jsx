import { useState, useMemo, useRef, useEffect } from "react";
import academicPrograms from "../data/AcademicProgram.json";
import awards from "../data/Awards.json";
import communityEvents from "../data/CommunityEvents.json";
import nonprofits from "../data/Nonprofits.json";
import scholarships from "../data/Scholarships.json";
import summerPrograms from "../data/SummerPrograms.json";
import supportServices from "../data/SupportServices.json";
import volunteering from "../data/Volunteering.json";

const ALL_RESOURCES = [
  ...academicPrograms,
  ...awards,
  ...communityEvents,
  ...nonprofits,
  ...scholarships,
  ...summerPrograms,
  ...supportServices,
  ...volunteering,
];

const FD = `'Merriweather', Georgia, serif`;
const FB = `'Inter', system-ui, sans-serif`;

const C = {
  carolinaBlue: "#4B9CD3",
  headerGray:   "#494A48",
  pageBg:       "#F0EBE3",
  lightBg:      "#FAF7F4",
  border:       "#E2D5C8",
  text:         "#111111",
  gold:         "#C8860A",
  purple:       "#6B4FAF",
  teal:         "#1E9B8A",
  coral:        "#C94F3A",
};

const INTEREST_OPTIONS = [
  { id: "stem",    label: "STEM / Enrichment"     },
  { id: "cs",      label: "Computer Science"       },
  { id: "bio",     label: "Biology"                },
  { id: "env",     label: "Environmental Science"  },
  { id: "math",    label: "Mathematics"            },
  { id: "chem",    label: "Chemistry"              },
  { id: "arts",    label: "Arts & Performance"     },
  { id: "eng",     label: "Engineering"            },
  { id: "law",     label: "Law & Government"       },
  { id: "poli",    label: "Political Science"      },
  { id: "biz",     label: "Business"               },
  { id: "psych",   label: "Psychology"             },
  { id: "lit",     label: "English / Writing"      },
  { id: "service", label: "Public Service"         },
  { id: "sports",  label: "Sports & Entertainment" },
  { id: "edu",     label: "Education"              },
];

const GOAL_OPTIONS = [
  { id: "scholarships", label: "Win Scholarships",     color: C.gold         },
  { id: "internships",  label: "Find Internships",     color: C.carolinaBlue },
  { id: "service",      label: "Earn Service Hours",   color: C.teal         },
  { id: "college",      label: "College Prep",         color: C.purple       },
  { id: "awards",       label: "Awards & Recognition", color: C.coral        },
  { id: "skills",       label: "Build Skills",         color: C.gold         },
  { id: "community",    label: "Community Impact",     color: C.teal         },
  { id: "network",      label: "Network & Mentorship", color: C.carolinaBlue },
];

const GRADE_OPTIONS = ["9", "10", "11", "12"];
const CITY_OPTIONS  = ["Durham", "Raleigh", "Chapel Hill", "Any / Remote"];

const CAT_COLOR = {
  "Academic Program":  C.carolinaBlue,
  "Awards":            C.gold,
  "Community Events":  C.teal,
  "Non-profits":       C.teal,
  "Scholarships":      C.gold,
  "Summer Programs":   C.coral,
  "Support Services":  C.carolinaBlue,
  "Volunteering":      C.purple,
};

const CAT_GRADIENT = {
  "Academic Program":  ["#4B9CD3", "#2d7db3"],
  "Awards":            ["#C8860A", "#e6a020"],
  "Community Events":  ["#1E9B8A", "#16b89f"],
  "Non-profits":       ["#1E9B8A", "#16b89f"],
  "Scholarships":      ["#C8860A", "#e6a020"],
  "Summer Programs":   ["#C94F3A", "#e05a45"],
  "Support Services":  ["#4B9CD3", "#2d7db3"],
  "Volunteering":      ["#6B4FAF", "#8060c8"],
};

const CAT_SVG = {
  "Academic Program": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  "Awards": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  "Community Events": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  "Non-profits": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  "Scholarships": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  "Summer Programs": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  ),
  "Support Services": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
  "Volunteering": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
};

function score(resource, { interests, goals, grade, city }) {
  let s = 0;
  const resInterest = (resource.interest || "").toLowerCase();
  interests.forEach((i) => { if (resInterest.includes(i) || i.includes(resInterest)) s += 30; });
  const goalCats = {
    scholarships: ["Scholarships","Awards"],
    internships:  ["Support Services","Academic Program"],
    service:      ["Volunteering","Non-profits","Community Events"],
    college:      ["Academic Program","Summer Programs"],
    awards:       ["Awards","Academic Program"],
    skills:       ["Summer Programs","Academic Program"],
    community:    ["Community Events","Non-profits","Volunteering"],
    network:      ["Community Events","Support Services"],
  };
  goals.forEach((g) => { if ((goalCats[g] || []).includes(resource.category)) s += 25; });
  if (grade && Array.isArray(resource.grades) && resource.grades.includes(grade)) s += 20;
  if (city && city !== "Any / Remote" && Array.isArray(resource.cities) && resource.cities.includes(city)) s += 15;
  return s;
}

const PATHWAY_ORDER = [
  "Community Events","Volunteering","Non-profits",
  "Academic Program","Summer Programs","Support Services","Awards","Scholarships",
];

function buildPath(resources, filters) {
  const scored = resources
    .map((r) => ({ ...r, _score: score(r, filters) }))
    .filter((r) => r._score > 0)
    .sort((a, b) => b._score - a._score);
  const seen = new Set();
  const diverse = [];
  for (const r of scored) {
    if (!seen.has(r.category)) { seen.add(r.category); diverse.push(r); }
    if (diverse.length === 5) break;
  }
  if (diverse.length < 5) {
    for (const r of scored) {
      if (!diverse.includes(r)) { diverse.push(r); }
      if (diverse.length === 5) break;
    }
  }
  return diverse.sort((a, b) => PATHWAY_ORDER.indexOf(a.category) - PATHWAY_ORDER.indexOf(b.category));
}

function Chip({ label, selected, onClick, color = C.carolinaBlue }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display:"inline-flex", alignItems:"center", gap:"7px",
        padding:"7px 15px", borderRadius:"6px",
        border:`1.5px solid ${selected ? color : C.border}`,
        background: selected ? `${color}14` : C.lightBg,
        color: selected ? color : C.headerGray,
        fontWeight: selected ? 600 : 400,
        fontSize:"0.83rem", cursor:"pointer",
        transition:"all 140ms ease", fontFamily:FB,
      }}
    >
      <span style={{
        width:"7px", height:"7px", borderRadius:"50%",
        background: selected ? color : C.border,
        flexShrink:0, transition:"background 140ms",
      }} />
      {label}
    </button>
  );
}

function MobileRoadmapCard({ step, index, total, active, onClick }) {
  const color = CAT_COLOR[step.category] || C.carolinaBlue;
  const [g1, g2] = CAT_GRADIENT[step.category] || [color, color];
  const isLast = index === total - 1;

  return (
    <div style={{ display:"flex", gap:"0", position:"relative" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:"48px", flexShrink:0 }}>
        <div style={{
          width:"44px", height:"44px", borderRadius:"14px",
          background:`linear-gradient(135deg, ${g1}, ${g2})`,
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"#fff", flexShrink:0, zIndex:1,
          boxShadow:`0 6px 18px ${color}44`,
          border:`2px solid rgba(255,255,255,0.3)`,
          position:"relative",
        }}>
          {CAT_SVG[step.category]}
          <div style={{
            position:"absolute", top:"-8px", right:"-8px",
            width:"20px", height:"20px", borderRadius:"50%",
            background:`linear-gradient(135deg, ${g1}, ${g2})`,
            border:`2px solid ${C.pageBg}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:"0.58rem", fontWeight:700, color:"#fff", fontFamily:FB,
          }}>{index + 1}</div>
        </div>
        {!isLast && (
          <div style={{
            width:"2px", flex:1, minHeight:"20px",
            background:`linear-gradient(to bottom, ${color}66, ${color}11)`,
            margin:"4px 0",
          }} />
        )}
      </div>

      <div
        onClick={onClick}
        style={{
          flex:1, marginLeft:"12px", marginBottom: isLast ? 0 : "12px",
          borderRadius:"16px", overflow:"hidden", cursor:"pointer",
          border:`1.5px solid ${active ? color : C.border}`,
          boxShadow: active
            ? `0 8px 32px ${color}28, 0 2px 8px ${color}18`
            : `0 2px 8px rgba(0,0,0,0.06)`,
          transition:"all 220ms ease",
          background: C.lightBg,
        }}
      >
        <div style={{
          height:"5px",
          background:`linear-gradient(90deg, ${g1}, ${g2})`,
        }} />

        <div style={{ padding:"14px 16px" }}>
          <div style={{
            fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.1em",
            textTransform:"uppercase", color:color, marginBottom:"4px", fontFamily:FB,
          }}>
            {step.category}
          </div>
          <div style={{
            fontWeight:700, fontSize:"0.97rem", color:C.text,
            lineHeight:1.3, fontFamily:FD, marginBottom:"8px",
          }}>
            {step.name}
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:"5px", marginBottom: active ? "12px" : 0 }}>
            {step.cities && (
              <span style={{
                display:"inline-flex", alignItems:"center", gap:"4px",
                fontSize:"0.68rem", fontWeight:500, color:C.headerGray,
                background:C.pageBg, padding:"3px 8px", borderRadius:"20px",
                border:`1px solid ${C.border}`, fontFamily:FB,
              }}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 1 8 8c0 5.25-8 14-8 14S4 15.25 4 10a8 8 0 0 1 8-8z"/></svg>
                {Array.isArray(step.cities) ? step.cities.join(", ") : step.cities}
              </span>
            )}
            {step.grades && (
              <span style={{
                fontSize:"0.68rem", fontWeight:500, color:C.headerGray,
                background:C.pageBg, padding:"3px 8px", borderRadius:"20px",
                border:`1px solid ${C.border}`, fontFamily:FB,
              }}>
                Gr. {Array.isArray(step.grades) ? step.grades.join(", ") : step.grades}
              </span>
            )}
          </div>

          {active && (
            <div style={{ animation:"fadeUp 180ms ease" }}>
              <p style={{
                margin:"0 0 12px", fontSize:"0.84rem",
                color:C.headerGray, lineHeight:1.7, fontFamily:FB,
              }}>
                {step.description}
              </p>
              {step.link && (
                <a
                  href={step.link} target="_blank" rel="noopener noreferrer"
                  style={{
                    display:"inline-flex", alignItems:"center", gap:"6px",
                    padding:"9px 18px",
                    background:`linear-gradient(135deg, ${g1}, ${g2})`,
                    color:"#fff", fontWeight:600, fontSize:"0.8rem",
                    borderRadius:"8px", textDecoration:"none", fontFamily:FB,
                    boxShadow:`0 4px 14px ${color}44`,
                  }}
                >
                  Visit Resource
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              )}
            </div>
          )}

          <div style={{
            display:"flex", alignItems:"center", justifyContent:"flex-end",
            marginTop:"6px",
          }}>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={color} strokeWidth="2.5" strokeLinecap="round"
              style={{ transform: active ? "rotate(180deg)" : "rotate(0deg)", transition:"transform 220ms ease" }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopRoadmap({ path, activeIdx, setActiveIdx }) {
  return (
    <div>
      <div style={{ position:"relative", padding:"16px 0 0" }}>
        <div style={{
          position:"absolute",
          top:"52px",
          left:"10%", right:"10%",
          height:"4px",
          borderRadius:"99px",
          background:`repeating-linear-gradient(
            90deg,
            ${C.border} 0px, ${C.border} 18px,
            transparent 18px, transparent 30px
          )`,
          zIndex:0,
        }} />

        <div style={{
          display:"grid",
          gridTemplateColumns:`repeat(${path.length}, minmax(0, 1fr))`,
          gap:"16px",
          position:"relative", zIndex:1,
        }}>
          {path.map((step, i) => {
            const color = CAT_COLOR[step.category] || C.carolinaBlue;
            const [g1, g2] = CAT_GRADIENT[step.category] || [color, color];
            const active = activeIdx === i;
            const isEven = i % 2 === 0;

            return (
              <div
                key={i}
                onClick={() => setActiveIdx(active ? null : i)}
                style={{
                  display:"flex",
                  flexDirection: isEven ? "column" : "column-reverse",
                  alignItems:"center",
                  cursor:"pointer",
                  gap:"0",
                }}
              >
                <div style={{
                  width:"100%",
                  borderRadius:"16px",
                  background: C.lightBg,
                  border:`1.5px solid ${active ? color : C.border}`,
                  overflow:"hidden",
                  boxShadow: active
                    ? `0 12px 36px ${color}30, 0 3px 10px ${color}20`
                    : `0 3px 12px rgba(0,0,0,0.07)`,
                  transition:"all 240ms cubic-bezier(.34,1.56,.64,1)",
                  transform: active ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                  marginBottom: isEven ? 0 : "8px",
                  marginTop: isEven ? "8px" : 0,
                }}>
                  <div style={{
                    height:"4px",
                    background:`linear-gradient(90deg, ${g1}, ${g2})`,
                  }} />

                  <div style={{ padding:"14px 14px 12px" }}>
                    <div style={{
                      width:"46px", height:"46px", borderRadius:"13px",
                      background:`linear-gradient(135deg, ${g1}22, ${g2}18)`,
                      border:`1.5px solid ${color}30`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:color,
                      marginBottom:"10px",
                      transition:"all 240ms ease",
                      ...(active ? {
                        background:`linear-gradient(135deg, ${g1}, ${g2})`,
                        color:"#fff",
                        boxShadow:`0 6px 18px ${color}40`,
                      } : {}),
                    }}>
                      {CAT_SVG[step.category]}
                    </div>

                    <div style={{
                      fontSize:"0.58rem", fontWeight:600, letterSpacing:"0.1em",
                      textTransform:"uppercase", color:color,
                      marginBottom:"4px", fontFamily:FB,
                    }}>
                      {step.category}
                    </div>

                    <div style={{
                      fontWeight:700, fontSize:"0.88rem",
                      color:C.text, lineHeight:1.3,
                      fontFamily:FD, marginBottom:"8px",
                    }}>
                      {step.name}
                    </div>

                    <div style={{ display:"flex", flexWrap:"wrap", gap:"4px", marginBottom:"8px" }}>
                      {step.cities && (
                        <span style={{
                          display:"inline-flex", alignItems:"center", gap:"3px",
                          fontSize:"0.62rem", fontWeight:500, color:C.headerGray,
                          background:C.pageBg, padding:"2px 7px", borderRadius:"20px",
                          border:`1px solid ${C.border}`, fontFamily:FB,
                        }}>
                          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 1 8 8c0 5.25-8 14-8 14S4 15.25 4 10a8 8 0 0 1 8-8z"/></svg>
                          {Array.isArray(step.cities) ? step.cities.slice(0,2).join(", ") : step.cities}
                        </span>
                      )}
                      {step.grades && (
                        <span style={{
                          fontSize:"0.62rem", fontWeight:500, color:C.headerGray,
                          background:C.pageBg, padding:"2px 7px", borderRadius:"20px",
                          border:`1px solid ${C.border}`, fontFamily:FB,
                        }}>
                          Gr {Array.isArray(step.grades) ? step.grades.join(", ") : step.grades}
                        </span>
                      )}
                    </div>

                    <p style={{
                      margin:"0 0 8px",
                      fontSize:"0.75rem",
                      color: C.headerGray,
                      lineHeight:1.6,
                      fontFamily:FB,
                      display:"-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient:"vertical",
                      overflow:"hidden",
                      textOverflow:"ellipsis",
                    }}>
                      {step.description}
                    </p>

                    {step.link && (
                      <a
                        href={step.link} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display:"inline-flex", alignItems:"center", gap:"5px",
                          padding:"7px 13px",
                          background: active
                            ? `linear-gradient(135deg, ${g1}, ${g2})`
                            : C.pageBg,
                          color: active ? "#fff" : color,
                          border: `1.5px solid ${color}44`,
                          fontWeight:600, fontSize:"0.73rem",
                          borderRadius:"7px", textDecoration:"none",
                          fontFamily:FB, transition:"all 200ms ease",
                          boxShadow: active ? `0 4px 14px ${color}40` : "none",
                          marginTop:"2px",
                        }}
                      >
                        Visit Resource
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    )}
                  </div>
                </div>

                <div style={{
                  display:"flex", flexDirection:"column", alignItems:"center",
                  flexShrink:0,
                  ...(isEven ? { marginTop:"0" } : { marginBottom:"0" }),
                }}>
                  <div style={{
                    width:"2px", height:"20px",
                    background:`linear-gradient(to bottom, ${color}66, ${color}22)`,
                    ...(isEven ? {} : { transform:"scaleY(-1)" }),
                  }} />
                  <div style={{
                    width:"28px", height:"28px", borderRadius:"50%",
                    background:`linear-gradient(135deg, ${g1}, ${g2})`,
                    border:`3px solid ${C.pageBg}`,
                    boxShadow:`0 0 0 2px ${color}60, 0 4px 14px ${color}40`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:"0.62rem", fontWeight:700, color:"#fff", fontFamily:FB,
                    transition:"all 240ms ease",
                    transform: active ? "scale(1.2)" : "scale(1)",
                  }}>
                    {i + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PathBuilder({ resources = ALL_RESOURCES }) {
  const [step,      setStep]      = useState(1);
  const [interests, setInterests] = useState([]);
  const [goals,     setGoals]     = useState([]);
  const [grade,     setGrade]     = useState("");
  const [city,      setCity]      = useState("");
  const [activeIdx, setActiveIdx] = useState(null);
  const [generated, setGenerated] = useState(false);
  const pathRef = useRef(null);

  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 680px)");
    const h  = (e) => setNarrow(e.matches);
    setNarrow(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const toggleArr = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const interestLabels = useMemo(() => {
    const MAP = {
      stem:"STEM/Enrichment", cs:"Computer Science", bio:"Biology",
      env:"Environmental Science", math:"Mathematics", chem:"Chemistry",
      arts:"Arts Performance", eng:"Engineering", law:"Law & Government",
      poli:"Political Science", biz:"Business", psych:"Psychology",
      lit:"English Literature Writing", service:"Public Service",
      sports:"Sports & Entertainment", edu:"Education",
    };
    return interests.map((id) => MAP[id] || id);
  }, [interests]);

  const path = useMemo(() => {
    if (!generated) return [];
    return buildPath(resources, { interests: interestLabels, goals, grade, city });
  }, [generated, resources, interestLabels, goals, grade, city]);

  const canNext1    = interests.length > 0;
  const canNext2    = goals.length > 0;
  const canGenerate = grade && city;

  function handleGenerate() {
    if (!canGenerate) return;
    setGenerated(true);
    setActiveIdx(null);
    setTimeout(() => pathRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 100);
  }

  function handleReset() {
    setStep(1); setInterests([]); setGoals([]);
    setGrade(""); setCity(""); setGenerated(false); setActiveIdx(null);
  }

  return (
    <div style={{ backgroundColor:C.pageBg, minHeight:"100vh", padding:"0 0 72px", overflowX:"hidden", fontFamily:FB }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(75,156,211,0.4); }
          70%  { box-shadow: 0 0 0 8px rgba(75,156,211,0); }
          100% { box-shadow: 0 0 0 0 rgba(75,156,211,0); }
        }
        .pb-btn {
          display:inline-flex; align-items:center; gap:6px;
          padding:11px 22px; border-radius:8px; font-weight:600;
          font-size:0.85rem; letter-spacing:0.02em; cursor:pointer;
          transition:all 150ms ease; border:1.5px solid transparent;
          font-family:'Inter', system-ui, sans-serif;
        }
        .pb-btn:disabled { opacity:0.32; cursor:not-allowed; }
        .pb-primary { background:${C.carolinaBlue}; color:#fff; box-shadow:0 4px 14px ${C.carolinaBlue}44; }
        .pb-primary:hover:not(:disabled) { background:#3a8ec4; transform:translateY(-1px); box-shadow:0 6px 20px ${C.carolinaBlue}55; }
        .pb-ghost { background:transparent; color:${C.headerGray}; border-color:${C.border}; }
        .pb-ghost:hover:not(:disabled) { background:${C.border}; color:${C.text}; }
        .pb-generate { background:${C.carolinaBlue}; color:#fff; font-size:0.88rem; padding:12px 28px; border:none; box-shadow:0 4px 18px ${C.carolinaBlue}44; border-radius:8px; }
        .pb-generate:hover:not(:disabled) { background:#3a8ec4; transform:translateY(-1px); box-shadow:0 7px 24px ${C.carolinaBlue}55; }
        .pb-select {
          appearance:none;
          background:${C.lightBg} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7'%3E%3Cpath d='M0 0l5.5 7L11 0z' fill='%23494A48'/%3E%3C/svg%3E") no-repeat right 13px center;
          border:1.5px solid ${C.border}; border-radius:8px;
          padding:10px 34px 10px 12px; font-size:0.87rem; font-weight:500;
          color:${C.text}; cursor:pointer; outline:none; width:100%;
          font-family:'Inter', system-ui, sans-serif; transition:border-color 140ms;
        }
        .pb-select:focus { border-color:${C.carolinaBlue}; }
        @media (max-width:480px) {
          .pb-btn { padding:9px 16px; font-size:0.81rem; }
          .pb-generate { padding:11px 22px; }
        }
      `}</style>

      <div style={{
        background:`linear-gradient(150deg, #1c5f8c 0%, #2d7db3 55%, #1a6ea0 100%)`,
        padding:"clamp(44px,7vw,80px) 20px clamp(32px,5vw,52px)",
        textAlign:"center", position:"relative", overflow:"hidden",
        borderBottom:`3px solid ${C.carolinaBlue}`,
      }}>
        <div style={{
          position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
          backgroundImage:`linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)`,
          backgroundSize:"40px 40px",
        }} />
        <div style={{
          position:"absolute", top:"-60px", left:"50%", transform:"translateX(-50%)",
          width:"500px", height:"260px", borderRadius:"50%",
          background:"rgba(255,255,255,0.06)", filter:"blur(40px)",
          pointerEvents:"none", zIndex:0,
        }} />

        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{
            display:"inline-block",
            borderBottom:`2px solid rgba(255,255,255,0.3)`,
            paddingBottom:"5px",
            fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.14em",
            textTransform:"uppercase", color:"rgba(255,255,255,0.65)",
            marginBottom:"18px", fontFamily:FB,
          }}>
            Opportunity Path Builder
          </div>

          <h1 style={{
            margin:0, fontSize:"clamp(1.85rem,5vw,3rem)",
            fontWeight:900, color:"#fff",
            lineHeight:1.08, letterSpacing:"-0.025em", fontFamily:FD,
          }}>
            Build Your{" "}
            <span style={{ color:"#a8d8f5" }}>Opportunity Path</span>
          </h1>

          <p style={{
            margin:"16px auto 0", color:"rgba(255,255,255,0.62)",
            fontSize:"clamp(0.88rem,1.4vw,1rem)",
            maxWidth:"50ch", lineHeight:1.75, fontFamily:FB,
          }}>
            Share your interests and goals. We will build a personalised roadmap
            of local resources to help you get there.
          </p>
        </div>
      </div>

      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 24px" }}>

        {!generated && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginTop:"36px", marginBottom:"32px" }}>
            {[1,2,3].map((s) => {
              const done   = s < step;
              const active = s === step;
              const labels = ["Interests","Goals","Details"];
              return (
                <div key={s} style={{ display:"flex", alignItems:"center" }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"5px" }}>
                    <div style={{
                      width:"33px", height:"33px", borderRadius:"50%",
                      background: done || active ? C.carolinaBlue : C.lightBg,
                      border:`2px solid ${done || active ? C.carolinaBlue : C.border}`,
                      boxShadow: active ? `0 0 0 4px ${C.carolinaBlue}28` : "none",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color: done || active ? "#fff" : C.headerGray,
                      fontWeight:700, fontSize:"0.77rem",
                      transition:"all 220ms", fontFamily:FB,
                    }}>
                      {done
                        ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        : s
                      }
                    </div>
                    <span style={{
                      fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.06em",
                      textTransform:"uppercase", fontFamily:FB,
                      color: active ? C.carolinaBlue : done ? C.carolinaBlue : C.headerGray,
                    }}>
                      {labels[s-1]}
                    </span>
                  </div>
                  {s < 3 && (
                    <div style={{
                      width:"clamp(44px,8vw,84px)", height:"2px", borderRadius:"99px",
                      margin:"0 8px", marginBottom:"22px",
                      background: s < step ? C.carolinaBlue : C.border,
                      transition:"background 260ms", flexShrink:0,
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!generated && step === 1 && (
          <div style={{ animation:"fadeUp 260ms ease" }}>
            <StepHeader num={1} of={3} title="What are you into?" sub="Select one or more areas. We will find resources that match your passions." />
            <div style={{ display:"flex", flexWrap:"wrap", gap:"7px", marginBottom:"28px" }}>
              {INTEREST_OPTIONS.map(({ id, label }) => (
                <Chip key={id} label={label} selected={interests.includes(id)} onClick={() => toggleArr(interests, setInterests, id)} />
              ))}
            </div>
            <NavRow>
              <button className="pb-btn pb-primary" disabled={!canNext1} onClick={() => setStep(2)}>
                Next
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </NavRow>
          </div>
        )}

        {!generated && step === 2 && (
          <div style={{ animation:"fadeUp 260ms ease" }}>
            <StepHeader num={2} of={3} title="What do you want to achieve?" sub="Pick the goals that matter most to you." />
            <div style={{ display:"flex", flexWrap:"wrap", gap:"7px", marginBottom:"28px" }}>
              {GOAL_OPTIONS.map(({ id, label, color }) => (
                <Chip key={id} label={label} color={color} selected={goals.includes(id)} onClick={() => toggleArr(goals, setGoals, id)} />
              ))}
            </div>
            <NavRow>
              <button className="pb-btn pb-ghost" onClick={() => setStep(1)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                Back
              </button>
              <button className="pb-btn pb-primary" disabled={!canNext2} onClick={() => setStep(3)}>
                Next
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </NavRow>
          </div>
        )}

        {!generated && step === 3 && (
          <div style={{ animation:"fadeUp 260ms ease" }}>
            <StepHeader num={3} of={3} title="A bit more about you" sub="Your grade and city help us surface the most relevant opportunities." />
            <div style={{ display:"grid", gridTemplateColumns: narrow ? "1fr" : "1fr 1fr", gap:"13px", marginBottom:"20px" }}>
              <label style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
                <span style={{ fontSize:"0.7rem", fontWeight:600, color:C.headerGray, letterSpacing:"0.07em", textTransform:"uppercase", fontFamily:FB }}>Grade Level</span>
                <select className="pb-select" value={grade} onChange={(e) => setGrade(e.target.value)}>
                  <option value="">Select grade...</option>
                  {GRADE_OPTIONS.map((g) => <option key={g} value={g}>Grade {g}</option>)}
                </select>
              </label>
              <label style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
                <span style={{ fontSize:"0.7rem", fontWeight:600, color:C.headerGray, letterSpacing:"0.07em", textTransform:"uppercase", fontFamily:FB }}>Your City</span>
                <select className="pb-select" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Select city...</option>
                  {CITY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>

            <div style={{ background:C.lightBg, border:`1.5px solid ${C.border}`, borderRadius:"10px", padding:"13px 15px", marginBottom:"22px" }}>
              <div style={{ fontSize:"0.66rem", fontWeight:600, color:C.headerGray, letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:"9px", fontFamily:FB }}>
                Your path is based on
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {interests.map((id) => { const o = INTEREST_OPTIONS.find((x) => x.id === id); return o ? <span key={id} style={tag(C.carolinaBlue)}>{o.label}</span> : null; })}
                {goals.map((id)     => { const o = GOAL_OPTIONS.find((x) => x.id === id);     return o ? <span key={id} style={tag(o.color)}>{o.label}</span>          : null; })}
              </div>
            </div>

            <NavRow>
              <button className="pb-btn pb-ghost" onClick={() => setStep(2)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                Back
              </button>
              <button className="pb-btn pb-generate" disabled={!canGenerate} onClick={handleGenerate}>
                Generate My Path
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </NavRow>
          </div>
        )}

        {generated && (
          <div ref={pathRef} style={{ animation:"fadeUp 300ms ease", paddingTop:"36px" }}>
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-start", justifyContent:"space-between", gap:"12px", marginBottom:"18px" }}>
              <div>
                <div style={{ fontSize:"0.67rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:C.carolinaBlue, marginBottom:"4px", fontFamily:FB }}>
                  Your Personalised Roadmap
                </div>
                <h2 style={{ margin:0, fontSize:"clamp(1.3rem,3vw,1.6rem)", fontWeight:900, color:C.text, fontFamily:FD }}>
                  {path.length} Steps to Your Goals
                </h2>
              </div>
              <button type="button" className="pb-btn pb-ghost" onClick={handleReset} style={{ fontSize:"0.78rem" }}>
                Rebuild Path
              </button>
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"24px" }}>
              {grade && <span style={tag(C.carolinaBlue)}>Grade {grade}</span>}
              {city  && <span style={tag(C.teal)}>{city}</span>}
              {interests.slice(0,3).map((id) => { const o = INTEREST_OPTIONS.find((x) => x.id === id); return o ? <span key={id} style={tag(C.headerGray)}>{o.label}</span> : null; })}
              {interests.length > 3 && <span style={tag(C.headerGray)}>+{interests.length - 3} more</span>}
            </div>

            {path.length === 0 ? (
              <div style={{ textAlign:"center", padding:"52px 20px", background:C.lightBg, border:`1.5px dashed ${C.border}`, borderRadius:"14px" }}>
                <div style={{ fontWeight:700, fontSize:"0.98rem", marginBottom:"7px", fontFamily:FD, color:C.text }}>No matches found</div>
                <p style={{ margin:0, fontSize:"0.85rem", lineHeight:1.65, color:C.headerGray, fontFamily:FB }}>
                  Try adjusting your interests or goals, or select "Any / Remote" for location.
                </p>
              </div>
            ) : narrow ? (
              <div style={{ paddingTop:"4px" }}>
                {path.map((s, i) => (
                  <MobileRoadmapCard
                    key={i} step={s} index={i} total={path.length}
                    active={activeIdx === i}
                    onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                  />
                ))}
              </div>
            ) : (
              <div style={{
                background:C.lightBg,
                border:`1.5px solid ${C.border}`,
                borderRadius:"20px",
                padding:"32px 28px 36px",
                boxShadow:"0 4px 24px rgba(0,0,0,0.07)",
              }}>
                <DesktopRoadmap
                  path={path}
                  activeIdx={activeIdx}
                  setActiveIdx={(i) => setActiveIdx(activeIdx === i ? null : i)}
                />
              </div>
            )}

            {path.length > 0 && (
              <div style={{
                marginTop:"28px", background:C.lightBg,
                border:`1.5px solid ${C.border}`,
                borderRadius:"14px", padding:"18px 22px",
                display:"flex", flexWrap:"wrap", alignItems:"center",
                justifyContent:"space-between", gap:"12px",
              }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:"0.92rem", color:C.text, marginBottom:"2px", fontFamily:FB }}>Want to explore more?</div>
                  <div style={{ fontSize:"0.8rem", color:C.headerGray, fontFamily:FB }}>Browse all resources in the full Resource Hub.</div>
                </div>
                <a href="/resource-hub" style={{
                  display:"inline-flex", alignItems:"center", gap:"6px",
                  padding:"10px 20px", background:C.carolinaBlue, color:"#fff",
                  fontWeight:600, fontSize:"0.82rem", borderRadius:"8px",
                  textDecoration:"none", fontFamily:FB, whiteSpace:"nowrap",
                  boxShadow:`0 4px 12px ${C.carolinaBlue}33`,
                }}>
                  Go to Resource Hub
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StepHeader({ num, of, title, sub }) {
  return (
    <div style={{ marginBottom:"22px" }}>
      <div style={{ fontSize:"0.67rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:C.carolinaBlue, marginBottom:"5px", fontFamily:FB }}>
        Step {num} of {of}
      </div>
      <h2 style={{ margin:"0 0 5px", fontSize:"clamp(1.2rem,3vw,1.5rem)", fontWeight:900, color:C.text, fontFamily:FD }}>
        {title}
      </h2>
      <p style={{ margin:0, fontSize:"0.86rem", color:C.headerGray, lineHeight:1.65, fontFamily:FB }}>{sub}</p>
    </div>
  );
}

function NavRow({ children }) {
  return (
    <div style={{ display:"flex", gap:"9px", flexWrap:"wrap", justifyContent:"flex-end", paddingTop:"4px" }}>
      {children}
    </div>
  );
}

const tag = (color) => ({
  display:"inline-flex", alignItems:"center",
  padding:"3px 10px", borderRadius:"20px",
  background:`${color}12`, border:`1px solid ${color}30`,
  fontSize:"0.73rem", fontWeight:500,
  color: color === C.headerGray ? C.headerGray : color,
  fontFamily:FB,
});
