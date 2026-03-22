import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import academicPrograms from "../data/AcademicProgram.json";
import awards from "../data/Awards.json";
import communityEvents from "../data/CommunityEvents.json";
import nonprofits from "../data/Nonprofits.json";
import scholarships from "../data/Scholarships.json";
import summerPrograms from "../data/SummerPrograms.json";
import supportServices from "../data/SupportServices.json";
import volunteering from "../data/Volunteering.json";

import dyesImg from "../assets/dyes.webp";
import sMathHacksImg from "../assets/SMathHacks.webp";
import floreneScholarshipImg from "../assets/FloreneScholarship.webp";
import bigBroSisImg from "../assets/BigBroSis.webp";
import handsOnImg from "../assets/HandsOn.webp";
import BuildImg from "../assets/Build.avif";

import AliceImg from "../assets/Alice.webp";
import NaomiImg from "../assets/Naomi.webp";
import SophiaImg from "../assets/Sophia.webp";
import PriyaImg from "../assets/Priya.webp";
import JordanImg from "../assets/Jordan.webp";
import LilaImg from "../assets/Lila.webp";
import ShawnImg from "../assets/Shawn.webp";
import MarcusImg from "../assets/Marcus.webp";
import TylerImg from "../assets/Tyler.webp";
import CarlosImg from "../assets/Carlos.webp";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  gray: "#494A48",
  beige: "#F5FCEF",
  text: "#111111",
  textSoft: "#2B2B2B",
  beigeDark: "#DCE7D1",
};

const resourcesData = [
  ...academicPrograms,
  ...awards,
  ...communityEvents,
  ...nonprofits,
  ...scholarships,
  ...summerPrograms,
  ...supportServices,
  ...volunteering,
];

const TESTIMONIALS = [
  {
    name: "Alice Johnson",
    location: "Durham, NC",
    img: AliceImg,
    quote:
      "Nexus helped me find a summer internship I never would have discovered on my own. The resource hub is incredibly well-organized and easy to use.",
    tag: "Summer Programs",
  },
  {
    name: "Marcus Williams",
    location: "Chapel Hill, NC",
    img: MarcusImg,
    quote:
      "I found a scholarship through Nexus that covered my first semester. Having everything in one place made the search so much less overwhelming.",
    tag: "Scholarships",
  },
  {
    name: "Jordan Lee",
    location: "Raleigh, NC",
    img: JordanImg,
    quote:
      "As a first-generation student, I didn't know where to start. Nexus pointed me to academic programs I didn't even know existed in the Triangle.",
    tag: "Academic Programs",
  },
  {
    name: "Priya Sharma",
    location: "Cary, NC",
    img: PriyaImg,
    quote:
      "The community events section helped me connect with local nonprofits doing meaningful work. I'm now a regular volunteer thanks to Nexus.",
    tag: "Volunteering",
  },
  {
    name: "Tyler Brooks",
    location: "Durham, NC",
    img: TylerImg,
    quote:
      "I was struggling to find mental health support services. Nexus made it simple and judgment-free — found exactly what I needed within minutes.",
    tag: "Support Services",
  },
  {
    name: "Sophia Martinez",
    location: "Morrisville, NC",
    img: SophiaImg,
    quote:
      "My daughter applied to three programs she found through Nexus. She got into two of them. This platform is a game changer for Triangle families.",
    tag: "Academic Programs",
  },
  {
    name: "Shawn Carter",
    location: "Raleigh, NC",
    img: ShawnImg,
    quote:
      "The map view is brilliant. I could see every resource near me at a glance. It's the kind of tool every community deserves.",
    tag: "Resource Hub",
  },
  {
    name: "Lila Thompson",
    location: "Durham, NC",
    img: LilaImg,
    quote:
      "I added our nonprofit to the hub and received new volunteer inquiries the same week. Nexus truly bridges the gap between organizations and residents.",
    tag: "Nonprofits",
  },
  {
    name: "Carlos Rivera",
    location: "Apex, NC",
    img: CarlosImg,
    quote:
      "Growing up in a Spanish-speaking household, finding local resources always felt like a barrier. Nexus made everything accessible and stress-free.",
    tag: "Support Services",
  },
  {
    name: "Naomi Grant",
    location: "Chapel Hill, NC",
    img: NaomiImg,
    quote:
      "I use Nexus every semester to discover new opportunities. It's become my go-to tool for staying connected with what's happening in the Triangle.",
    tag: "Community Events",
  },
];

function normalizeKey(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

const FEATURED_IMAGE_BY_NAME = {
  [normalizeKey("HandsOn Triangle")]: handsOnImg,
  [normalizeKey("SMathHacks 2026")]: sMathHacksImg,
  [normalizeKey("Big Brothers Big Sisters")]: bigBroSisImg,
  [normalizeKey("Durham Youth Employed & Succeeding (YES)")]: dyesImg,
  [normalizeKey("Florene Dickmeyer Memorial Scholarship")]: floreneScholarshipImg,
};

function getResourceImage(resource) {
  const byName = FEATURED_IMAGE_BY_NAME[normalizeKey(resource?.name)];
  if (byName) return byName;
  const maybeImageKey = normalizeKey(resource?.image);
  if (maybeImageKey) {
    const byKey = FEATURED_IMAGE_BY_NAME[maybeImageKey];
    if (byKey) return byKey;
  }
  return null;
}

function useTypeRotate({
  prefix = "",
  words = [],
  typingMs = 55,
  deletingMs = 35,
  pauseAfterWordMs = 900,
  pauseAfterPrefixMs = 450,
}) {
  const [typedPrefix, setTypedPrefix] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typingPrefix");
  const timer = useRef(null);

  useEffect(() => {
    const clear = () => timer.current && clearTimeout(timer.current);
    clear();
    const currentWord = words[wordIndex] || "";

    if (phase === "typingPrefix") {
      if (typedPrefix.length < prefix.length) {
        timer.current = setTimeout(() => {
          setTypedPrefix(prefix.slice(0, typedPrefix.length + 1));
        }, typingMs);
      } else {
        setPhase("pausePrefix");
      }
    }
    if (phase === "pausePrefix") {
      timer.current = setTimeout(() => setPhase("typingWord"), pauseAfterPrefixMs);
    }
    if (phase === "typingWord") {
      if (typedWord.length < currentWord.length) {
        timer.current = setTimeout(() => {
          setTypedWord(currentWord.slice(0, typedWord.length + 1));
        }, typingMs);
      } else {
        setPhase("pauseWord");
      }
    }
    if (phase === "pauseWord") {
      timer.current = setTimeout(() => setPhase("deletingWord"), pauseAfterWordMs);
    }
    if (phase === "deletingWord") {
      if (typedWord.length > 0) {
        timer.current = setTimeout(() => {
          setTypedWord(typedWord.slice(0, -1));
        }, deletingMs);
      } else {
        setWordIndex((i) => (i + 1) % Math.max(words.length, 1));
        setPhase("typingWord");
      }
    }
    return clear;
  }, [phase, typedPrefix, typedWord, wordIndex, prefix, words, typingMs, deletingMs, pauseAfterWordMs, pauseAfterPrefixMs]);

  return { typedPrefix, typedWord };
}

function PieChart({ data, size = 420, innerRatio = 0.6, activeIndex, onHoverIndex }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const r = size / 2;
  const outerR = r - 8;
  const innerR = outerR * innerRatio;

  const polarToCartesian = (cx, cy, radius, angleDeg) => {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(angleRad), y: cy + radius * Math.sin(angleRad) };
  };

  const describeArc = (cx, cy, radius, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, radius, endAngle);
    const end = polarToCartesian(cx, cy, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  if (!total) {
    return (
      <div style={{ width: size, height: size, display: "grid", placeItems: "center" }}>
        <div style={{ fontFamily: "var(--font-body)", color: COLORS.gray, fontWeight: 600 }}>No resources yet</div>
      </div>
    );
  }

  let currentAngle = 0;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Resource type breakdown pie chart"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto", maxWidth: size, display: "block", overflow: "visible", touchAction: "manipulation" }}
    >
      <g>
        {data.map((slice, idx) => {
          const sliceAngle = (slice.value / total) * 360;
          const start = currentAngle;
          const end = currentAngle + sliceAngle;
          currentAngle = end;

          const endSafe = Math.max(end, start + 0.8);
          const isActive = activeIndex === idx;
          const midAngle = (start + endSafe) / 2;
          const bump = isActive ? 7 : 0;
          const offset = polarToCartesian(r, r, bump, midAngle);
          const dx = offset.x - r;
          const dy = offset.y - r;

          const outerArc = describeArc(r, r, outerR, start, endSafe);
          const innerArc = describeArc(r, r, innerR, endSafe, start);
          const innerEnd = polarToCartesian(r, r, innerR, endSafe);
          const innerStart = polarToCartesian(r, r, innerR, start);
          const d = `${outerArc} L ${innerEnd.x} ${innerEnd.y} ${innerArc} L ${innerStart.x} ${innerStart.y} Z`;

          return (
            <motion.g
              key={slice.label}
              initial={false}
              animate={{ x: dx, y: dy }}
              transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.7 }}
              onPointerEnter={(e) => { if (e.pointerType !== "touch") onHoverIndex(idx); }}
              onPointerLeave={(e) => { if (e.pointerType !== "touch") onHoverIndex(null); }}
              onPointerDown={(e) => { if (e.pointerType === "touch") onHoverIndex(idx); }}
              onPointerUp={(e) => { if (e.pointerType === "touch") onHoverIndex(null); }}
            >
              <path
                d={d}
                fill={slice.color}
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="1"
                style={{ transition: "filter 220ms ease", filter: isActive ? "brightness(1.03) saturate(1.08)" : "none" }}
              >
                <title>{`${slice.label}: ${slice.value}`}</title>
              </path>
            </motion.g>
          );
        })}
      </g>
      <circle cx={r} cy={r} r={innerR - 2} fill="rgba(245,252,239,0.92)" />
      <text x={r} y={r - 6} textAnchor="middle" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 18, fill: COLORS.text }}>
        Total
      </text>
      <text x={r} y={r + 18} textAnchor="middle" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: 26, fill: COLORS.carolinaBlue }}>
        {total}
      </text>
    </svg>
  );
}

// ─── Testimonials Carousel ────────────────────────────────────────────────────
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoRef = useRef(null);
  const total = TESTIMONIALS.length;

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setDirection(1);
      setActive((i) => (i + 1) % total);
    }, 5000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, []);

  const goTo = (idx, dir) => {
    setDirection(dir);
    setActive(idx);
    startAuto();
  };

  const prev = () => goTo((active - 1 + total) % total, -1);
  const next = () => goTo((active + 1) % total, 1);

  // Visible indices: prev, active, next (and peek of next-next)
  const getIdx = (offset) => (active + offset + total) % total;

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.95 }),
  };

  return (
    <motion.section
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      initial="hidden"
      whileInView="show"
      transition={{ duration: 0.75, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      style={tStyles.wrap}
    >
      <div style={tStyles.inner}>
        {/* Header */}
        <div style={tStyles.header}>
          <h2 style={tStyles.title}>Voices from the Triangle</h2>
          <p style={tStyles.sub}>
            Real residents. Real resources. Real impact.
          </p>
          <p style={tStyles.sub}>
            (This section is intended for competition display purposes only and does not represent factual information.)
          </p>
        </div>

        {/* Carousel */}
        <div style={tStyles.stage} aria-label="Testimonials carousel" role="region">
          {/* Ghost left */}
          <div style={{ ...tStyles.ghost, ...tStyles.ghostLeft }} aria-hidden="true">
            <TestimonialCard data={TESTIMONIALS[getIdx(-1)]} ghost />
          </div>

          {/* Ghost right */}
          <div style={{ ...tStyles.ghost, ...tStyles.ghostRight }} aria-hidden="true">
            <TestimonialCard data={TESTIMONIALS[getIdx(1)]} ghost />
          </div>

          {/* Center fade mask */}
          <div style={tStyles.fadeMask} aria-hidden="true" />

          {/* Active card */}
          <div style={tStyles.cardWrap}>
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: "easeInOut" }}
                style={{ width: "100%" }}
              >
                <TestimonialCard data={TESTIMONIALS[active]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button style={{ ...tStyles.arrow, ...tStyles.arrowLeft }} onClick={prev} aria-label="Previous testimonial">←</button>
          <button style={{ ...tStyles.arrow, ...tStyles.arrowRight }} onClick={next} aria-label="Next testimonial">→</button>

          {/* Dots */}
          <div style={tStyles.dots} role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i, i > active ? 1 : -1)}
                style={{ ...tStyles.dot, ...(i === active ? tStyles.dotActive : {}) }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function TestimonialCard({ data, ghost = false }) {
  return (
    <div style={{ ...tStyles.card, ...(ghost ? tStyles.cardGhost : {}) }}>
      <div style={tStyles.cardTop}>
        <div style={tStyles.avatar}>
          <img
            src={data.img}
            alt={data.name}
            style={tStyles.avatarImg}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.backgroundColor = COLORS.carolinaBlue;
              e.target.parentElement.innerHTML = `<span style="color:white;font-size:1.4rem;font-weight:700;font-family:var(--font-heading)">${data.name[0]}</span>`;
            }}
          />
        </div>
        <div>
          <div style={tStyles.name}>{data.name}</div>
          <div style={tStyles.location}>{data.location}</div>
        </div>
        <div style={tStyles.tag}>{data.tag}</div>
      </div>

      <div style={tStyles.quoteWrap}>
        <span style={tStyles.quoteMark} aria-hidden="true">"</span>
        <p style={tStyles.quote}>{data.quote}</p>
      </div>

      <div style={tStyles.stars} aria-label="5 stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} style={tStyles.star}>★</span>
        ))}
      </div>
    </div>
  );
}

const tStyles = {
  wrap: {
    width: "100%",
    padding: "95px 0 90px",
    backgroundColor: "#111111",
    color: COLORS.beige,
    overflow: "hidden",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "52px",
  },
  title: {
    margin: 0,
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(2.0rem, 5vw, 3.0rem)",
    color: COLORS.beige,
    fontWeight: 900,
    letterSpacing: "-0.02em",
  },
  sub: {
    marginTop: "10px",
    fontFamily: "var(--font-body)",
    fontSize: "1.05rem",
    color: "rgba(245,252,239,0.72)",
    fontWeight: 400,
  },

  stage: {
    position: "relative",
    display: "grid",
    placeItems: "center",
    padding: "10px 0 64px",
    overflow: "hidden",
  },

  ghost: {
    position: "absolute",
    top: "10px",
    width: "min(480px, 68vw)",
    zIndex: 1,
    pointerEvents: "none",
    opacity: 0.25,
  },
  ghostLeft: { right: "50%", transform: "translateX(-10px)" },
  ghostRight: { left: "50%", transform: "translateX(10px)" },

  fadeMask: {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    pointerEvents: "none",
    background: "radial-gradient(ellipse at center, transparent 38%, #111111 68%)",
  },

  cardWrap: {
    position: "relative",
    zIndex: 3,
    width: "min(580px, 90vw)",
  },

  card: {
    backgroundColor: COLORS.carolinaBlue,
    borderRadius: "22px",
    padding: "clamp(20px, 4vw, 32px)",
    boxShadow: "0 28px 64px rgba(0,0,0,0.50)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  cardGhost: {
    boxShadow: "none",
    border: "1px solid rgba(255,255,255,0.10)",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },

  avatar: {
    width: "54px",
    height: "54px",
    borderRadius: "999px",
    overflow: "hidden",
    flexShrink: 0,
    border: "2px solid rgba(255,255,255,0.30)",
    backgroundColor: "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  name: {
    fontFamily: "var(--font-heading)",
    fontWeight: 800,
    fontSize: "1.1rem",
    color: COLORS.beige,
    lineHeight: 1.2,
  },
  location: {
    fontFamily: "var(--font-body)",
    fontSize: "0.88rem",
    color: "rgba(245,252,239,0.70)",
    marginTop: "2px",
  },

  tag: {
    marginLeft: "auto",
    fontFamily: "var(--font-body)",
    fontSize: "0.80rem",
    fontWeight: 600,
    backgroundColor: "rgba(245,252,239,0.15)",
    border: "1px solid rgba(245,252,239,0.22)",
    color: COLORS.beige,
    padding: "5px 10px",
    borderRadius: "999px",
    whiteSpace: "nowrap",
  },

  quoteWrap: {
    position: "relative",
    paddingLeft: "28px",
  },
  quoteMark: {
    position: "absolute",
    top: "-10px",
    left: "0",
    fontFamily: "Georgia, serif",
    fontSize: "3.5rem",
    lineHeight: 1,
    color: "rgba(245,252,239,0.25)",
    userSelect: "none",
  },
  quote: {
    margin: 0,
    fontFamily: "var(--font-body)",
    fontSize: "clamp(0.97rem, 2.2vw, 1.08rem)",
    lineHeight: 1.7,
    color: COLORS.beige,
    fontStyle: "italic",
    fontWeight: 400,
  },

  stars: {
    display: "flex",
    gap: "4px",
  },
  star: {
    fontSize: "1.1rem",
    color: "#FFD166",
  },

  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-60%)",
    width: "50px",
    height: "50px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "rgba(75,156,211,0.95)",
    color: COLORS.beige,
    cursor: "pointer",
    boxShadow: "0 14px 32px rgba(0,0,0,0.40)",
    display: "grid",
    placeItems: "center",
    fontFamily: "var(--font-body)",
    fontWeight: 700,
    fontSize: "1.1rem",
    zIndex: 5,
    transition: "filter 180ms ease, transform 180ms ease",
  },
  arrowLeft: { left: "max(8px, calc(50% - 46vw))" },
  arrowRight: { right: "max(8px, calc(50% - 46vw))" },

  dots: {
    position: "absolute",
    bottom: "14px",
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    flexWrap: "wrap",
    maxWidth: "90vw",
  },
  dot: {
    width: "9px",
    height: "9px",
    borderRadius: "999px",
    border: "1px solid rgba(245,252,239,0.40)",
    backgroundColor: "rgba(245,252,239,0.15)",
    cursor: "pointer",
    padding: 0,
    transition: "background-color 200ms ease, border-color 200ms ease, transform 200ms ease",
  },
  dotActive: {
    backgroundColor: COLORS.carolinaBlue,
    border: `1px solid ${COLORS.carolinaBlue}`,
    transform: "scale(1.25)",
  },
};

// ─── Reveal variant (shared) ─────────────────────────────────────────────────
const reveal = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

// ─── Home ────────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();

  const featured = useMemo(() => {
    const picks = resourcesData.filter((r) => r.featured === true);
    if (picks.length === 0) return resourcesData.slice(0, 5);
    return picks.slice(0, 5);
  }, []);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!featured.length) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % featured.length);
    }, 4500);
    return () => clearInterval(id);
  }, [featured.length]);

  const next = () => setActive((i) => (i + 1) % featured.length);
  const prev = () => setActive((i) => (i - 1 + featured.length) % featured.length);

  const current = featured[active];
  const prevItem = featured[(active - 1 + featured.length) % featured.length];
  const nextItem = featured[(active + 1) % featured.length];

  const currentImg = getResourceImage(current);
  const prevImg = getResourceImage(prevItem);
  const nextImg = getResourceImage(nextItem);

  const { typedPrefix, typedWord } = useTypeRotate({
    prefix: "Making finding resources ",
    words: ["faster.", "convenient.", "easier.", "better.", "educational.", "exciting."],
  });

  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);
  const [hoverMission, setHoverMission] = useState(false);

  const chartWrapRef = useRef(null);
  const [chartSize, setChartSize] = useState(420);

  useLayoutEffect(() => {
    if (!chartWrapRef.current) return;
    const el = chartWrapRef.current;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width || 420;
      const next = Math.max(240, Math.min(420, Math.floor(w * 0.95)));
      setChartSize(next);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const resourceBreakdown = useMemo(() => {
    const counts = [
      { label: "Academic Programs", value: academicPrograms.length },
      { label: "Awards", value: awards.length },
      { label: "Community Events", value: communityEvents.length },
      { label: "Non-profits", value: nonprofits.length },
      { label: "Scholarships", value: scholarships.length },
      { label: "Summer Programs", value: summerPrograms.length },
      { label: "Support Services", value: supportServices.length },
      { label: "Volunteering", value: volunteering.length },
    ];
    const palette = ["#4B9CD3", "#7FB7D6", "#9BBFAD", "#C7C29B", "#E0B07A", "#D69AA8", "#9FA7D8", "#8FB0B8"];
    const data = counts.map((d, i) => ({ ...d, color: palette[i % palette.length] }));
    const total = data.reduce((s, d) => s + d.value, 0);
    return { data, total };
  }, []);

  const [hoverSlice, setHoverSlice] = useState(null);

  return (
    <div style={styles.page}>
      <section style={{ ...styles.heroWrap, overflow: "visible" }}>

        <div style={styles.heroGrid}>
          <div style={styles.heroContent}>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              style={styles.nexus}
            >
              Nexus
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              style={styles.typeLine}
            >
              <span style={styles.typePrefix}>{typedPrefix}</span>
              <span style={styles.typeWord}>{typedWord}</span>
              <span style={styles.caret} aria-hidden="true">|</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              style={styles.defBlock}
            >
              <div style={styles.phonetic}>/ˈneksəs/</div>
              <div style={styles.partOfSpeech}>noun</div>
              <div style={styles.definition}>
                <span style={styles.defNum}>1.</span> A connection or series of connections linking two or more things
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={styles.heroButtons}
            >
              <button
                style={{ ...styles.primaryButton, ...(hoverPrimary ? styles.buttonHover : {}) }}
                onMouseEnter={() => setHoverPrimary(true)}
                onMouseLeave={() => setHoverPrimary(false)}
                onClick={() => navigate("/resource-hub")}
              >
                Explore Resources
              </button>
              <button
                style={{ ...styles.secondaryButton, ...(hoverSecondary ? styles.buttonHover : {}) }}
                onMouseEnter={() => setHoverSecondary(true)}
                onMouseLeave={() => setHoverSecondary(false)}
                onClick={() => navigate("/grow-the-hub")}
              >
                Request/Add Resources
              </button>
            </motion.div>
          </div>

          <div style={styles.featureSide}>
            <div style={styles.featureCardOuterHero}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${current?.name}-${active}-hero`}
                  initial={{ opacity: 0, x: 26, scale: 0.99 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -26, scale: 0.99 }}
                  transition={{ duration: 0.42, ease: "easeOut" }}
                  style={styles.featureCardHero}
                >
                  {current?.featured && <div style={styles.featureBadge}>Featured</div>}
                  <h3 style={styles.featureName}>{current?.name}</h3>
                  <div style={styles.featureMeta}>
                    {current?.category ? <span>{current.category}</span> : null}
                    {Array.isArray(current?.cities) && current.cities.length ? <span>• {current.cities.join(", ")}</span> : null}
                    {current?.interest ? <span>• {current.interest}</span> : null}
                  </div>
                  <p style={styles.featureDesc}>{current?.description}</p>
                  <div style={styles.featureBottomRow}>
                    {current?.link ? (
                      <a href={current.link} target="_blank" rel="noreferrer" style={styles.featureVisitLink}>
                        Visit →
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ── */}
      <motion.section
        variants={reveal}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.75, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.25 }}
        style={{ ...styles.missionWrap, overflow: "visible" }}
      >
        <div style={styles.containerCenter}>
          <h2 style={styles.missionTitle}>Our Mission</h2>
          <p style={styles.missionText}>
            At Nexus, we believe that access to community resources should be clear, welcoming, and easy to navigate. Our mission is to
            connect residents across the Research Triangle with opportunities and support, so finding help, programs, and pathways feels
            simple and inclusive.
          </p>
          <button
            style={{ ...styles.missionBtn, ...(hoverMission ? styles.missionBtnHover : {}) }}
            onMouseEnter={() => setHoverMission(true)}
            onMouseLeave={() => setHoverMission(false)}
            onClick={() => navigate("/our-mission")}
          >
            Read more →
          </button>
        </div>
      </motion.section>

      {/* ── TESTIMONIALS (replaces hub carousel section) ── */}
      <TestimonialsSection />

      {/* ── RESOURCE MIX / PIE CHART ── */}
      <motion.section
        variants={reveal}
        initial="hidden"
        whileInView="show"
        transition={{ duration: 0.75, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.25 }}
        style={{ ...styles.snapshotWrap, overflow: "visible" }}
      >
        <div style={styles.snapshotInner}>
          <div style={styles.snapshotTop}>
            <h2 style={styles.snapshotTitle}>The Nexus Resource Mix</h2>
            <p style={styles.snapshotSub}>
              Our approach to surfacing resources is simple: organize opportunities clearly, show what's most available, and spotlight where
              the Triangle could benefit from more support.
            </p>
          </div>

          <div style={styles.snapshotGrid}>
            <div style={styles.snapshotInfoCard}>
              <div style={styles.snapshotInfoTitle}>Our Hub</div>
              <p style={styles.snapshotInfoText}>
                Nexus brings together programs, scholarships, events, and support services in one place. This snapshot shows how resources
                are currently distributed across categories so residents can browse smarter and understand what's available at a glance.
              </p>
              <div style={styles.snapshotStatRow}>
                <div style={styles.snapshotStat}>
                  <div style={styles.snapshotStatNum}>{resourceBreakdown.total}</div>
                  <div style={styles.snapshotStatLabel}>Total resources</div>
                </div>
              </div>
            </div>

            <div style={styles.snapshotChartCard}>
              <div ref={chartWrapRef} style={styles.snapshotChartWrap}>
                <PieChart
                  data={resourceBreakdown.data}
                  size={chartSize}
                  innerRatio={0.6}
                  activeIndex={hoverSlice}
                  onHoverIndex={setHoverSlice}
                />
              </div>
              <div style={styles.snapshotLegend}>
                {resourceBreakdown.data.map((d, idx) => {
                  const isActive = hoverSlice === idx;
                  return (
                    <div
                      key={d.label}
                      onMouseEnter={() => setHoverSlice(idx)}
                      onMouseLeave={() => setHoverSlice(null)}
                      onPointerEnter={(e) => { if (e.pointerType !== "touch") setHoverSlice(idx); }}
                      onPointerLeave={(e) => { if (e.pointerType !== "touch") setHoverSlice(null); }}
                      onPointerDown={(e) => { if (e.pointerType === "touch") setHoverSlice(idx); }}
                      onPointerUp={(e) => { if (e.pointerType === "touch") setHoverSlice(null); }}
                      style={{ ...styles.legendRow, ...(isActive ? styles.legendRowActive : {}) }}
                    >
                      <span style={{ ...styles.legendSwatch, backgroundColor: d.color }} />
                      <span style={styles.legendLabel}>{d.label}</span>
                      <span style={styles.legendValue}>{d.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const styles = {
  page: {
    margin: 0,
    padding: 0,
    minHeight: "calc(100vh - var(--header-h))",
    backgroundColor: COLORS.beige,
    width: "100%",
    overflowX: "clip",
    overflowY: "visible",
    fontFamily: "var(--font-body)",
  },

  heroWrap: {
    width: "100%",
    minHeight: "82vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "56px 0",
    background: `linear-gradient(135deg, ${COLORS.gray} 0%, ${COLORS.carolinaBlue} 55%, ${COLORS.gray} 100%)`,
  },

  heroGrid: {
    width: "100%",
    maxWidth: "1220px",
    padding: "0 20px",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "18px",
    alignItems: "start",
  },

  heroContent: { width: "100%", textAlign: "left" },

  nexus: {
    margin: 0,
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(2.7rem, 6vw, 4rem)",
    lineHeight: 1,
    letterSpacing: "-0.02em",
    color: COLORS.carolinaBlue,
    fontWeight: 900,
  },

  typeLine: {
    marginTop: "18px",
    marginBottom: "18px",
    fontFamily: "var(--font-body)",
    fontSize: "clamp(1.05rem, 2.6vw, 1.45rem)",
    lineHeight: 1.4,
  },
  typePrefix: { color: COLORS.beige, fontWeight: 400 },
  typeWord: { color: COLORS.carolinaBlue, fontWeight: 650 },
  caret: {
    display: "inline-block",
    marginLeft: "4px",
    color: COLORS.beige,
    fontWeight: 600,
    animation: "blink 1s step-end infinite",
  },

  defBlock: { marginTop: "6px", display: "grid", gap: "6px", maxWidth: "62ch" },
  phonetic: { color: COLORS.beigeDark, fontFamily: "var(--font-body)", fontWeight: 500 },
  partOfSpeech: { color: COLORS.beigeDark, fontFamily: "var(--font-body)", fontWeight: 500 },
  definition: { color: COLORS.beige, fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.55, fontWeight: 400 },
  defNum: { fontWeight: 600 },

  heroButtons: { display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "22px" },

  primaryButton: {
    fontFamily: "var(--font-body)",
    padding: "12px 18px",
    backgroundColor: COLORS.carolinaBlue,
    color: COLORS.text,
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 500,
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    transition: "filter 250ms ease, transform 250ms ease, box-shadow 250ms ease",
  },
  secondaryButton: {
    fontFamily: "var(--font-body)",
    padding: "12px 18px",
    backgroundColor: COLORS.carolinaBlue,
    color: COLORS.text,
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 500,
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    transition: "filter 250ms ease, transform 250ms ease, box-shadow 250ms ease",
  },
  buttonHover: {
    filter: "brightness(0.9)",
    transform: "translateY(-1px)",
    boxShadow: "0 14px 26px rgba(0,0,0,0.16)",
  },

  featureSide: { width: "100%", display: "flex", justifyContent: "center", alignItems: "center" },
  featureCardOuterHero: { width: "100%", maxWidth: "520px" },
  featureCardHero: {
    backgroundColor: "rgba(245,252,239,0.93)",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 22px 52px rgba(0,0,0,0.22)",
    minHeight: "270px",
  },
  featureBadge: {
    display: "inline-flex",
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    fontSize: "0.82rem",
    backgroundColor: COLORS.gray,
    color: COLORS.beige,
    padding: "6px 10px",
    borderRadius: "999px",
    marginBottom: "10px",
  },
  featureName: {
    margin: "4px 0 6px 0",
    fontFamily: "var(--font-heading)",
    fontSize: "1.5rem",
    color: COLORS.text,
    fontWeight: 800,
    lineHeight: 1.2,
  },
  featureMeta: {
    fontFamily: "var(--font-body)",
    fontSize: "0.95rem",
    color: COLORS.gray,
    fontWeight: 400,
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "12px",
  },
  featureDesc: {
    margin: 0,
    fontFamily: "var(--font-body)",
    color: COLORS.textSoft,
    lineHeight: 1.6,
    fontWeight: 400,
    fontSize: "1.02rem",
  },
  featureBottomRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    marginTop: "16px",
  },
  featureVisitLink: {
    textDecoration: "none",
    color: COLORS.carolinaBlue,
    fontFamily: "var(--font-body)",
    fontWeight: 600,
  },

  missionWrap: { width: "100%", padding: "90px 0 70px 0", backgroundColor: COLORS.beige },
  containerCenter: {
    maxWidth: "980px",
    width: "100%",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
    textAlign: "center",
  },
  missionTitle: {
    margin: 0,
    fontFamily: "var(--font-heading)",
    fontSize: "2.4rem",
    color: COLORS.text,
    fontWeight: 900,
  },
  missionText: {
    marginTop: "14px",
    marginBottom: "18px",
    fontFamily: "var(--font-body)",
    color: COLORS.textSoft,
    fontSize: "1.05rem",
    lineHeight: 1.75,
    fontWeight: 400,
  },
  missionBtn: {
    fontFamily: "var(--font-body)",
    padding: "12px 18px",
    backgroundColor: COLORS.gray,
    color: COLORS.beige,
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: 500,
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    transition: "filter 250ms ease, transform 250ms ease, box-shadow 250ms ease",
  },
  missionBtnHover: {
    filter: "brightness(0.9)",
    transform: "translateY(-1px)",
    boxShadow: "0 14px 26px rgba(0,0,0,0.16)",
  },

  snapshotWrap: { width: "100%", padding: "95px 0 95px 0", backgroundColor: COLORS.beige },
  snapshotInner: { maxWidth: "1200px", margin: "0 auto", padding: "0 20px", boxSizing: "border-box" },
  snapshotTop: { textAlign: "center", maxWidth: "920px", margin: "0 auto 44px auto" },
  snapshotTitle: {
    margin: 0,
    fontFamily: "var(--font-heading)",
    fontSize: "clamp(2.1rem, 5vw, 3.0rem)",
    color: COLORS.text,
    fontWeight: 900,
    letterSpacing: "-0.02em",
  },
  snapshotSub: {
    margin: "12px auto 0 auto",
    maxWidth: "78ch",
    fontFamily: "var(--font-body)",
    fontSize: "1.05rem",
    lineHeight: 1.7,
    color: COLORS.textSoft,
    fontWeight: 400,
  },
  snapshotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "22px",
    alignItems: "center",
  },
  snapshotInfoCard: {
    backgroundColor: COLORS.beige,
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
    border: "1px solid rgba(0,0,0,0.06)",
  },
  snapshotInfoTitle: {
    fontFamily: "var(--font-heading)",
    fontSize: "1.6rem",
    fontWeight: 900,
    color: COLORS.carolinaBlue,
    marginBottom: "10px",
  },
  snapshotInfoText: {
    margin: 0,
    fontFamily: "var(--font-body)",
    color: COLORS.textSoft,
    lineHeight: 1.75,
    fontSize: "1.02rem",
  },
  snapshotStatRow: { marginTop: "18px", display: "flex", gap: "12px", flexWrap: "wrap" },
  snapshotStat: {
    backgroundColor: "rgba(75,156,211,0.10)",
    border: "1px solid rgba(75,156,211,0.18)",
    borderRadius: "14px",
    padding: "12px 14px",
    minWidth: "180px",
  },
  snapshotStatNum: {
    fontFamily: "var(--font-heading)",
    fontWeight: 900,
    fontSize: "1.8rem",
    color: COLORS.text,
    lineHeight: 1,
  },
  snapshotStatLabel: { marginTop: "6px", fontFamily: "var(--font-body)", color: COLORS.gray, fontWeight: 500 },

  snapshotChartCard: {
    backgroundColor: "rgba(255,255,255,0.30)",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.10)",
    border: "1px solid rgba(0,0,0,0.06)",
    display: "grid",
    gap: "16px",
    justifyItems: "center",
    overflow: "hidden",
  },
  snapshotChartWrap: { width: "100%", maxWidth: "460px", display: "grid", placeItems: "center", overflow: "hidden" },

  snapshotLegend: { width: "100%", maxWidth: "520px", display: "grid", gap: "8px", marginTop: "6px" },
  legendRow: {
    display: "grid",
    gridTemplateColumns: "16px 1fr auto",
    gap: "10px",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "14px",
    backgroundColor: "rgba(245,252,239,0.70)",
    border: "1px solid rgba(0,0,0,0.05)",
    transition: "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease",
    cursor: "default",
    touchAction: "manipulation",
  },
  legendRowActive: { transform: "translateY(-1px)", boxShadow: "0 14px 28px rgba(0,0,0,0.10)", filter: "brightness(1.02)" },
  legendSwatch: { width: "12px", height: "12px", borderRadius: "4px" },
  legendLabel: { fontFamily: "var(--font-body)", color: COLORS.text, fontWeight: 700, fontSize: "0.98rem" },
  legendValue: { fontFamily: "var(--font-body)", color: COLORS.gray, fontWeight: 800 },
};
