import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import ReferenceHero from "../assets/ReferenceHero.jpg";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  gray: "#494A48",
  beige: "#F5FCEF",
  text: "#111111",
  textSoft: "#2B2B2B",
  navy: "#1a2e42",
};

const HERO_IMG = ReferenceHero;
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: "easeOut" } },
};

function useImagePreload(srcs) {
  const [loadedMap, setLoadedMap] = useState({});
  useEffect(() => {
    srcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoadedMap((p) => ({ ...p, [src]: true }));
      img.onerror = () => setLoadedMap((p) => ({ ...p, [src]: true }));
    });
  }, []);
  return (src) => !!loadedMap[src];
}

function useScrollDirection() {
  const [dir, setDir] = useState("down");
  const lastY = useRef(0);
  useEffect(() => {
    lastY.current = window.scrollY || 0;
    const onScroll = () => {
      const y = window.scrollY || 0;
      const next = y > lastY.current ? "down" : y < lastY.current ? "up" : dir;
      lastY.current = y;
      if (next !== dir) setDir(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dir]);
  return dir;
}

function RevealSection({ amount = 0.18, style, children, onReveal }) {
  const dir = useScrollDirection();
  const ref = useRef(null);
  const inView = useInView(ref, { amount, once: false });
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    if (!played && inView && dir === "down") {
      setPlayed(true);
      if (onReveal) onReveal();
    }
  }, [played, inView, dir, onReveal]);
  return (
    <motion.section ref={ref} variants={fadeUp} initial="hidden" animate={played ? "show" : "hidden"} style={style}>
      {children}
    </motion.section>
  );
}

function RevealDiv({ amount = 0.18, delay = 0, children, style }) {
  const dir = useScrollDirection();
  const ref = useRef(null);
  const inView = useInView(ref, { amount, once: false });
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    if (!played && inView && dir === "down") setPlayed(true);
  }, [played, inView, dir]);
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={played ? "show" : "hidden"} transition={{ delay }} style={style}>
      {children}
    </motion.div>
  );
}

function CountUp({ to, durationMs = 950, start, decimals = 0 }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!start) return;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / durationMs);
      setValue(parseFloat((p * to).toFixed(decimals)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [to, durationMs, start, decimals]);
  return <span>{decimals > 0 ? value.toFixed(decimals) : value}</span>;
}

function ArrowIcon({ color = "#fff", size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17L17 7" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9 7H17V15" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "reset",
    label: "Ways to Reset",
    headline: "Rest is productive.",
    subline: "Your mind and body need recovery. These activities are low-pressure and designed to help you breathe again.",
    cards: [
      { title: "Nature Walks", time: "20 to 30 min", description: "Step outside without a destination. Movement in green spaces measurably lowers cortisol and gives your mind a genuine rest.", ideas: "Local park trails, campus greenways, neighborhood blocks, botanical gardens" },
      { title: "Journaling", time: "10 to 15 min", description: "Writing releases mental pressure. Free-writing, gratitude pages, or dumping thoughts onto paper creates space between you and your stress.", ideas: "Gratitude prompts, brain dump pages, letter to future self, weekly reflections" },
      { title: "Gentle Stretching", time: "10 min", description: "Physical tension builds invisibly during long study sessions. A short routine resets your body and signals your nervous system to slow down.", ideas: "Beginner yoga sequences, desk stretch routines, evening wind-down flows" },
      { title: "Creative Doodling", time: "15 to 20 min", description: "No skills required. Doodling engages a part of your brain that studying ignores, and the result is genuine mental rest.", ideas: "Geometric patterns, abstract shapes, portrait sketches, watercolor blobs" },
      { title: "Mindful Listening", time: "Anytime", description: "Put on headphones, close your eyes, and listen without multitasking. One of the most accessible forms of recovery available.", ideas: "Lo-fi playlists, classical music, nature soundscapes, your comfort album" },
    ],
  },
  {
    id: "engage",
    label: "Stay Engaged Lightly",
    headline: "Growth at your own pace.",
    subline: "These activities keep you curious and connected without demanding much. Meaningful participation that fits around your schedule.",
    cards: [
      { title: "Flexible Volunteering", time: "1 to 3 hrs per week", description: "One-off shifts let you give back without overextending. Helping others is one of the most reliable ways to feel good about yourself.", ideas: "Food bank sorting, community clean-ups, one-session tutoring, library volunteering" },
      { title: "Book Clubs", time: "Bi-weekly", description: "Reading for pleasure and talking about it with people you like. Pick something completely unrelated to your coursework.", ideas: "Literary fiction, graphic novels, poetry collections, true crime, short stories" },
      { title: "Skill-Swap Sessions", time: "1 hr", description: "Teach something you know, learn something you do not. Informal exchange keeps learning feeling personal and fun.", ideas: "Cooking lessons, language practice, basic music instruction, sketching" },
      { title: "Community Events", time: "1 to 2 hrs", description: "Showing up casually to local things broadens your world. Go, connect with whoever you meet, and leave when you are ready.", ideas: "Farmers markets, local art openings, open mic nights, cultural festivals" },
      { title: "Interest-Based Clubs", time: "Flexible", description: "Find your people in a setting with zero academic stakes. Low pressure, high social return.", ideas: "Film club, hiking group, board game nights, trivia, photography walks" },
    ],
  },
  {
    id: "creative",
    label: "Creative Outlets",
    headline: "Make something just for you.",
    subline: "Creation without grades. These activities reconnect you to what you enjoy doing for its own sake.",
    cards: [
      { title: "Photography Walks", time: "30 to 60 min", description: "Your phone camera is enough. Train yourself to find interesting light, texture, and composition in ordinary places.", ideas: "Golden hour shots, texture hunting, street photography, architecture details" },
      { title: "Cooking New Recipes", time: "45 to 60 min", description: "Following a recipe is meditative. You use your hands, you focus on something immediate, and at the end you have something to eat.", ideas: "One new recipe per week, cultural cuisine exploration, five-ingredient challenges" },
      { title: "Playing Music", time: "20 to 30 min", description: "Noodling on an instrument, building a playlist, or humming melodies all count as creation. You do not need to be good at it.", ideas: "GarageBand beats, chord practice, playlist curation, drum pad apps" },
      { title: "Crafting and DIY", time: "Flexible", description: "Working with your hands on a physical object is deeply satisfying in a way that screen-based activities rarely match.", ideas: "Candle making, macrame, thrift-flip fashion, origami, collage making" },
      { title: "Creative Writing", time: "20 min", description: "Write a short story, a poem, or a fictional journal entry. No audience required, no grade coming.", ideas: "Flash fiction prompts, letters to your future self, character sketches, world-building" },
    ],
  },
  {
    id: "social",
    label: "Meaningful Connections",
    headline: "You are not in this alone.",
    subline: "Real connection is one of the strongest protective factors for mental health. These are ways to invest in the people around you.",
    cards: [
      { title: "Phone-Free Hangouts", time: "1 to 2 hrs", description: "Undivided time with people you care about recharges you more than almost anything else. The phone-free part is what makes it count.", ideas: "Board games, picnics, movie nights, cooking together, walks without earbuds" },
      { title: "Mentorship Conversations", time: "Monthly", description: "A casual conversation with someone further along a path you are curious about can reframe everything. No formal program needed.", ideas: "Campus mentorship programs, alumni panels, professor office hours" },
      { title: "Studying With Friends", time: "2 to 3 hrs", description: "Same work, dramatically better company. Shared accountability without the isolation that makes solo studying feel so heavy.", ideas: "Pomodoro sessions, library coworking, cafe study dates, shared playlists" },
      { title: "Writing Real Letters", time: "15 min", description: "A handwritten letter or a genuine message to someone you have been meaning to reach out to is one of the most human things you can do.", ideas: "Reconnect with a hometown friend, write to a grandparent, thank a mentor" },
      { title: "Peer Support Spaces", time: "Weekly", description: "Being around others navigating the same challenges can be profoundly normalizing. You are probably not the only one feeling what you feel.", ideas: "Campus wellness circles, affinity spaces, first-gen student networks" },
    ],
  },
];

const RECHARGE_PATHS = [
  { title: "Feeling overwhelmed?", sub: "Low-effort, deeply restorative", tag: "Start here", tagColor: COLORS.carolinaBlue, recs: ["Nature Walks", "Mindful Listening", "Gentle Stretching"] },
  { title: "Want growth without pressure?", sub: "Meaningful without the grind", tag: "Balanced", tagColor: "#5aaa6e", recs: ["Book Clubs", "Skill-Swap Sessions", "Photography Walks"] },
  { title: "Low commitment, high impact?", sub: "Fits around your schedule", tag: "Easy entry", tagColor: "#c97b3e", recs: ["Flexible Volunteering", "Community Events", "Creative Doodling"] },
];

const STATS = [
  {
    value: 71,
    decimals: 0,
    suffix: "%",
    label: "of those with very good or excellent mental health engage in creative activities frequently",
  },
  {
    value: 46,
    decimals: 0,
    suffix: "%",
    label: "engage in creative activities among those reporting fair or poor mental health",
  },
];

const CAT_COLORS = {
  reset:    { color: COLORS.carolinaBlue, accent: "#d4edff" },
  engage:   { color: "#5aaa6e",           accent: "#d6f5de" },
  creative: { color: "#c97b3e",           accent: "#fde8cc" },
  social:   { color: "#a05cbb",           accent: "#eedcf5" },
};

// ─── resource flip card ───────────────────────────────────────────────────────
function ResourceCard({ card, color, accentBg }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-pressed={flipped}
      style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer", textAlign: "left", width: "100%", height: "230px", perspective: "900px" }}
    >
      <div
        style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 580ms cubic-bezier(.2,.8,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          borderRadius: "14px",
        }}
      >
        {/* front */}
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: "14px",
            backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: hovered && !flipped ? "0 16px 38px rgba(0,0,0,0.11)" : "0 4px 18px rgba(0,0,0,0.06)",
            padding: "20px 18px", display: "flex", flexDirection: "column", justifyContent: "space-between",
            transition: "box-shadow 200ms ease",
          }}
        >
          <div>
            <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", background: accentBg, color, borderRadius: "20px", padding: "2px 10px", marginBottom: "10px" }}>
              Tap to explore
            </span>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)", color: COLORS.text, lineHeight: 1.25 }}>
              {card.title}
            </div>
          </div>
          <div style={{ paddingBottom: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "12px", color: "#888", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontWeight: 600, color: COLORS.textSoft }}>Time:</span>&nbsp;{card.time}
            </div>
            <div style={{ width: "30px", height: "30px", borderRadius: "999px", background: color, display: "grid", placeItems: "center" }}>
              <ArrowIcon />
            </div>
          </div>
        </div>
        </div>
        {/* back */}
        <div
          style={{
            position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: "14px",
            background: color, padding: "18px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between",
            boxShadow: "0 10px 30px rgba(0,0,0,0.14)",
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(0.88rem, 1.4vw, 1rem)", color: "#fff", marginBottom: "10px" }}>{card.title}</div>
            <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>Description</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.92)", lineHeight: 1.55, marginBottom: "10px" }}>{card.description}</div>
            <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>Ideas</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.86)", lineHeight: 1.55 }}>{card.ideas}</div>
          </div>
          <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", textAlign: "right" }}>Tap to flip back</div>
        </div>
      </div>
    </button>
  );
}

// ─── main ─────────────────────────────────────────────────────────────────────
export default function BeyondTheClassroom() {
  const isLoaded = useImagePreload([HERO_IMG]);
  const [activeTab, setActiveTab] = useState("reset");
  const [startStats, setStartStats] = useState(false);
  const currentCat = useMemo(() => CATEGORIES.find((c) => c.id === activeTab), [activeTab]);
  const { color, accent } = CAT_COLORS[activeTab];

  return (
    
    <div style={{ minHeight: "100vh", backgroundColor: COLORS.beige, fontFamily: "var(--font-body)", overflowX: "clip" }}>

      
    {/* ── HERO ── */}
<section
  style={{
    position: "relative",
    minHeight: "min(78vh, 820px)",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
    backgroundColor: "#1a2e42",
    paddingTop: "var(--header-h, 72px)",  }}
>
  {/* background image layer */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: isLoaded(HERO_IMG) ? `url(${HERO_IMG})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      opacity: isLoaded(HERO_IMG) ? 1 : 0,
      transition: "opacity 0.5s ease",
      willChange: "opacity",
    }}
  />

  {/* overlays */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(8,18,32,0.92) 0%, rgba(8,18,32,0.48) 52%, rgba(8,18,32,0.12) 100%)",
      zIndex: 1,
      pointerEvents: "none",
    }}
  />
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(105deg, rgba(8,18,32,0.58) 0%, rgba(8,18,32,0.18) 34%, transparent 60%)",
      zIndex: 1,
      pointerEvents: "none",
    }}
  />

  <div
    style={{
      position: "relative",
      zIndex: 2,
      width: "min(1100px, 100%)",
      margin: "0 auto",
      padding:
        "clamp(40px, 8vw, 88px) clamp(20px, 5vw, 60px) clamp(40px, 6vw, 72px)",
      boxSizing: "border-box",
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.1 }}
    >
      <span
        style={{
          display: "inline-block",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: COLORS.carolinaBlue,
          background: "rgba(75,156,211,0.15)",
          border: "1px solid rgba(75,156,211,0.28)",
          borderRadius: "20px",
          padding: "4px 13px",
          marginBottom: "16px",
        }}
      >
        Student Wellness
      </span>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.18 }}
      style={{
        margin: 0,
        fontFamily: "var(--font-heading)",
        fontWeight: 900,
        fontSize: "clamp(2.2rem, 6vw, 5.4rem)",
        color: "#fff",
        lineHeight: 0.98,
        letterSpacing: "-0.03em",
        textShadow: "0 8px 32px rgba(0,0,0,0.28)",
        maxWidth: "650px",
      }}
    >
      Beyond the
      <br />
      <span style={{ color: COLORS.carolinaBlue }}>Classroom</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      style={{
        marginTop: "16px",
        marginBottom: 0,
        color: "rgba(255,255,255,0.82)",
        fontSize: "clamp(0.95rem, 1.8vw, 1.12rem)",
        lineHeight: 1.7,
        maxWidth: "500px",
        fontWeight: 300,
      }}
    >
      Success is not only academic. It is personal, social, and emotional.
      This is the space where you get to be a whole person.
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      style={{
        marginTop: "32px",
        display: "flex",
        alignItems: "center",
        gap: "9px",
        color: "rgba(255,255,255,0.38)",
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
    >
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <svg width="16" height="23" viewBox="0 0 16 23" fill="none">
          <rect
            x="1"
            y="1"
            width="14"
            height="21"
            rx="7"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <rect
            x="6.5"
            y="5.5"
            width="3"
            height="4.5"
            rx="1.5"
            fill="currentColor"
          />
        </svg>
      </motion.div>
      Scroll to explore
    </motion.div>
  </div>
</section>

      {/* ── INTRO SPLIT ── */}
      <RevealSection style={{ backgroundColor: COLORS.beige, padding: "clamp(36px,5vw,68px) 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", boxSizing: "border-box" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(24px, 4vw, 56px)", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.carolinaBlue, margin: "0 0 10px" }}>
                Why this matters
              </p>
              <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.6rem, 3.4vw, 2.7rem)", color: COLORS.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                A student is more<br />than their GPA.
              </h2>
              <div style={{ width: "48px", height: "3px", borderRadius: "999px", background: COLORS.carolinaBlue, margin: "14px 0" }} />
              <p style={{ color: COLORS.textSoft, fontSize: "clamp(0.88rem, 1.6vw, 0.98rem)", lineHeight: 1.75, maxWidth: "50ch", margin: 0 }}>
                Most resource hubs focus entirely on internships, academic programs, and test prep.
                We think that is incomplete. A student who rests, connects, and creates comes back
                stronger, more focused, and less likely to hit a wall.
              </p>
              <p style={{ color: COLORS.textSoft, fontSize: "clamp(0.88rem, 1.6vw, 0.98rem)", lineHeight: 1.75, maxWidth: "50ch", margin: "12px 0 0" }}>
                This section gives you permission to step away, and a map of where to go when you do.
                Every resource here is low-pressure and designed to fit into a real schedule.
              </p>
            </div>
            <div style={{ display: "grid", gap: "11px" }}>
              {[
                { label: "No burnout culture", desc: "Every activity here respects your limits. Nothing on this page asks you to hustle." },
                { label: "Flexible by design", desc: "Short commitments. Drop-in formats. No RSVP required for most of these." },
                { label: "Community over competition", desc: "These activities connect you to people, not rankings. That distinction matters." },
              ].map((item) => (
                <div key={item.label} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "14px", padding: "16px 18px", boxShadow: "0 2px 14px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.92rem", color: COLORS.text, marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontSize: "0.86rem", color: COLORS.textSoft, lineHeight: 1.62 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── STATS ── */}
      <RevealSection amount={0.25} onReveal={() => setStartStats(true)} style={{ background: COLORS.carolinaBlue, padding: "clamp(36px,5vw,60px) 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", boxSizing: "border-box" }}>
          <p style={{ textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#fff", letterSpacing: "-0.02em", margin: "0 0 clamp(22px,3.5vw,40px)", lineHeight: 1.15 }}>
            The numbers back it up.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center", background: "rgba(255,255,255,0.13)", borderRadius: "16px", padding: "22px 16px", border: "1px solid rgba(255,255,255,0.18)" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(2rem, 4.5vw, 3rem)", color: "#fff", lineHeight: 1, marginBottom: "8px" }}>
                  <CountUp to={s.value} decimals={s.decimals} start={startStats} />{s.suffix}
                </div>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── RECHARGE PATHS ── */}
      <RevealSection style={{ backgroundColor: COLORS.beige, padding: "clamp(36px,5vw,64px) 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "520px", marginBottom: "clamp(22px,3vw,36px)" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.carolinaBlue, margin: "0 0 8px" }}>
              Find your path
            </p>
            <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.4rem)", color: COLORS.text, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Where are you at right now?
            </h2>
            <p style={{ marginTop: "10px", marginBottom: 0, color: COLORS.textSoft, fontSize: "clamp(0.88rem, 1.6vw, 0.97rem)", lineHeight: 1.7 }}>
              Not every day calls for the same energy. Start from where you are.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "14px" }}>
            {RECHARGE_PATHS.map((path) => (
              <RevealDiv key={path.title}>
                <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "16px", padding: "20px 20px", boxShadow: "0 3px 16px rgba(0,0,0,0.05)", height: "100%", boxSizing: "border-box" }}>
                  <span style={{ display: "inline-block", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", background: path.tagColor, color: "#fff", borderRadius: "20px", padding: "2px 10px", marginBottom: "12px" }}>
                    {path.tag}
                  </span>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(0.9rem, 1.7vw, 1.08rem)", color: COLORS.text, marginBottom: "3px", lineHeight: 1.3 }}>{path.title}</div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "14px" }}>{path.sub}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {path.recs.map((r) => (
                      <span key={r} style={{ fontSize: "11px", fontWeight: 500, background: COLORS.beige, color: COLORS.textSoft, border: "1px solid #d4e8cc", borderRadius: "20px", padding: "3px 10px" }}>{r}</span>
                    ))}
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── STICKY TABS ── */}
      <div style={{ backgroundColor: "#fff", borderTop: "1.5px solid rgba(0,0,0,0.07)", borderBottom: "1.5px solid rgba(0,0,0,0.07)", position: "sticky", top: "var(--header-h, 72px)", zIndex: 10 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", display: "flex", overflowX: "auto", scrollbarWidth: "none", boxSizing: "border-box" }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            const c = CAT_COLORS[cat.id];
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                style={{ border: "none", background: "transparent", borderBottom: `3px solid ${isActive ? c.color : "transparent"}`, padding: "15px clamp(12px, 1.8vw, 20px)", fontFamily: "var(--font-body)", fontSize: "clamp(11px, 1.4vw, 13px)", fontWeight: isActive ? 700 : 500, color: isActive ? c.color : "#888", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "color 0.2s, border-color 0.2s" }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── RESOURCE CARDS ── */}
      <section style={{ backgroundColor: COLORS.beige, padding: "clamp(28px,4vw,52px) 0 clamp(40px,6vw,72px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", boxSizing: "border-box" }}>
          <div style={{ marginBottom: "clamp(18px,2.5vw,30px)" }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)", color, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {currentCat.headline}
            </h2>
            <p style={{ marginTop: "7px", marginBottom: 0, color: COLORS.textSoft, fontSize: "clamp(0.86rem, 1.5vw, 0.97rem)", lineHeight: 1.7, maxWidth: "58ch" }}>
              {currentCat.subline}
            </p>
          </div>
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "14px" }}
          >
            {currentCat.cards.map((card) => (
              <motion.div key={card.title} variants={fadeUp}>
                <ResourceCard card={card} color={color} accentBg={accent} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <RevealSection style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, #0d1f30 100%)`, padding: "clamp(40px,6vw,72px) 0", textAlign: "center" }}>
        <div style={{ maxWidth: "740px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", boxSizing: "border-box" }}>
          <div style={{ marginBottom: "14px" }}>
            <svg width="28" height="24" viewBox="0 0 32 28" fill="none" aria-hidden>
              <path d="M13 13.6c0 5.3-2.9 9.3-8 10.9v-3.2c2.8-1.2 4.3-3.3 4.4-5.7H4V3h9v10.6Zm15 0c0 5.3-2.9 9.3-8 10.9v-3.2c2.8-1.2 4.3-3.3 4.4-5.7H19V3h9v10.6Z" fill={COLORS.carolinaBlue} />
            </svg>
          </div>
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 300, fontSize: "clamp(1.1rem, 2.6vw, 1.7rem)", color: "#fff", lineHeight: 1.55, letterSpacing: "-0.01em", margin: 0 }}>
            "Success is not just academic. It is{" "}
            <strong style={{ fontWeight: 900, color: COLORS.carolinaBlue }}>personal</strong>,{" "}
            <strong style={{ fontWeight: 900, color: COLORS.carolinaBlue }}>social</strong>, and{" "}
            <strong style={{ fontWeight: 900, color: COLORS.carolinaBlue }}>emotional</strong>."
          </p>
          <p style={{ marginTop: "16px", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginBottom: 0 }}>
            The Resource Hub
          </p>
        </div>
      </RevealSection>

      {/* ── HOW TO USE ── */}
      <RevealSection style={{ backgroundColor: COLORS.beige, padding: "clamp(36px,5vw,64px) 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", boxSizing: "border-box" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(24px,3.5vw,42px)" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.carolinaBlue, margin: "0 0 8px" }}>
              Getting started
            </p>
            <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)", color: COLORS.text, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Three steps, zero pressure.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "14px" }}>
            {[
              { step: "01", title: "Notice where you are", body: "Check in honestly. Are you running on empty or just looking for something new? The answer changes where you start." },
              { step: "02", title: "Pick one thing", body: "Not a list, not a plan. One activity. Try it once before committing to anything. Low stakes means you can explore freely." },
              { step: "03", title: "Come back when you need it", body: "This page is not a to-do list. It is a resource. Return to it on hard weeks and use it however it actually serves you." },
            ].map((item) => (
              <div key={item.step} style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: "16px", padding: "22px 20px", boxShadow: "0 3px 16px rgba(0,0,0,0.04)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "10px", right: "14px", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "62px", color: "rgba(75,156,211,0.07)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                  {item.step}
                </div>
                <div style={{ width: "28px", height: "28px", borderRadius: "999px", background: COLORS.carolinaBlue, display: "grid", placeItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "11px" }}>{item.step}</span>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.96rem", color: COLORS.text, marginBottom: "8px", lineHeight: 1.25 }}>{item.title}</div>
                <div style={{ fontSize: "0.86rem", color: COLORS.textSoft, lineHeight: 1.68 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── CLOSING ── */}
      <div style={{ backgroundColor: COLORS.beige, borderTop: "1.5px solid rgba(0,0,0,0.06)", padding: "clamp(22px,3vw,38px) clamp(20px,5vw,60px)", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#999", maxWidth: "500px", margin: "0 auto", lineHeight: 1.72 }}>
          These resources are here whenever you need them. No deadline, no pressure, no timeline. Your wellbeing comes first.
        </p>
      </div>

    </div>
  );
}
