import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

import researchTriangleImg from "../assets/ResearchTriangle.png";
import localImpactImg from "../assets/LocalImpact.png";

import computerImg from "../assets/Computer.png";
import filterImg from "../assets/Filter.png";
import actionImg from "../assets/Action.png";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  gray: "#494A48",
  beige: "#F5FCEF",
  text: "#111111",
  textSoft: "#2B2B2B",
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function useScrollDirection() {
  const [dir, setDir] = useState("down");
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY || 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const nextDir = y > lastY.current ? "down" : y < lastY.current ? "up" : dir;
      lastY.current = y;
      if (nextDir !== dir) setDir(nextDir);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dir]);

  return dir;
}

function RevealSection({ amount = 0.35, style, children, onReveal }) {
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
    <motion.section
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={played ? "show" : "hidden"}
      style={style}
    >
      {children}
    </motion.section>
  );
}

function RevealDiv({ amount = 0.35, style, children }) {
  const dir = useScrollDirection();
  const ref = useRef(null);
  const inView = useInView(ref, { amount, once: false });
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!played && inView && dir === "down") setPlayed(true);
  }, [played, inView, dir]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={played ? "show" : "hidden"}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function ArrowIcon({ color = COLORS.beige, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M9 7H17V15"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuoteMarkIcon({ size = 26, color = COLORS.beige }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 11.2c0 4-2.2 7-6 8.2v-2.4c2.1-.9 3.2-2.5 3.3-4.3H4V5h6v6.2Zm10 0c0 4-2.2 7-6 8.2v-2.4c2.1-.9 3.2-2.5 3.3-4.3H14V5h6v6.2Z"
        fill={color}
      />
    </svg>
  );
}

function CountUp({ to = 80, durationMs = 950, start = false }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!start) return;

    const startTime = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - startTime) / durationMs);
      setValue(Math.round(p * to));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [to, durationMs, start]);

  return <span style={styles.percentBlue}>{value}%</span>;
}

function FlipCard({ title, backText }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={styles.flipBtn}
      aria-pressed={flipped}
    >
      <div
        style={{
          ...styles.flipScene,
          ...(flipped ? styles.flipSceneFlipped : null),
        }}
      >
        {/* FRONT — hover effects allowed */}
        <div
          style={{
            ...styles.flipFace,
            ...styles.flipFront,
            ...(hovered && !flipped ? styles.flipFaceHover : null),
          }}
        >
          <div style={styles.flipTitleWrap}>
            <div style={styles.flipTitle}>{title}</div>
            <div style={styles.flipUnderline} />
          </div>

          <div style={styles.cornerArrow}>
            <ArrowIcon />
          </div>
        </div>

        {/* BACK — NO hover styles at all */}
        <div
          style={{
            ...styles.flipFace,
            ...styles.flipBack,
          }}
        >
          <div style={styles.flipBackText}>{backText}</div>

          <div style={styles.cornerArrowInverse}>
            <ArrowIcon color={COLORS.carolinaBlue} />
          </div>
        </div>
      </div>
    </button>
  );
}

function FlowCard({ icon, title, description }) {
  const [hovered, setHovered] = useState(false);

  return (
    <RevealDiv amount={0.35}>
      <button
        type="button"
        style={{ ...styles.flowCardBtn, ...(hovered ? styles.flowCardHover : null) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`${title} details`}
      >
        <div style={styles.flowLeft}>
          <div style={{ ...styles.flowIcon, backgroundImage: styles.iconBg(icon).backgroundImage }} />
        </div>

        <div style={styles.flowRight}>
          <div style={styles.flowTitle}>{title}</div>
          <div style={styles.flowDesc}>{description}</div>
        </div>
      </button>
    </RevealDiv>
  );
}

export default function Mission() {
  const navigate = useNavigate();

  const cards = useMemo(
    () => [
      {
        title: "Clarity",
        backText:
          "A centralized, easy-to-navigate hub where students and families can browse programs, volunteering opportunities, scholarships, and support services without having to search across dozens of separate websites.",
      },
      {
        title: "Equity",
        backText:
          "A commitment to highlighting inclusive and accessible resources, with special attention to opportunities that are open regardless of immigration status, financial background, or prior experience.",
      },
      {
        title: "Community",
        backText:
          "A collaborative platform that allows residents, organizations, and educators to submit new resources, ensuring the hub stays current, relevant, and reflective of the community’s evolving needs.",
      },
    ],
    []
  );

  const [startCount, setStartCount] = useState(false);

  return (
    <div style={styles.page}>
      <RevealSection amount={0.35} style={styles.heroImage}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroInner}>
          <h1 style={styles.heroTitle}>
            Built for <span style={styles.heroOur}>OUR</span> Community
          </h1>

          <div style={styles.heroActions}>
            <button style={styles.primaryBtn} onClick={() => navigate("/resource-hub")}>
              Explore Resources
            </button>
            <button style={styles.secondaryBtn} onClick={() => navigate("/add-resource")}>
              Add a Resource
            </button>
          </div>
        </div>
      </RevealSection>

      <RevealSection amount={0.22} style={styles.beigeSection}>
        <div style={styles.container}>
          <div style={styles.splitRow}>
            <div style={styles.leftMedia}>
              <img src={localImpactImg} alt="Local impact" style={styles.leftImage} draggable={false} />
            </div>

            <div style={styles.rightCopy}>
              <h2 style={styles.bigHeadline}>Local Resources, Real Impact</h2>
              <p style={styles.subText}>
                Nexus brings together opportunities across the Research Triangle in one clear, organized
                hub, so students and families can spend less time digging through scattered websites and more
                time discovering programs that fit their goals. By highlighting trusted local resources
                and making next steps easy to understand, we ultimately help turn curiosity into action and make
                opportunity feel reachable for everyone. 
              </p>
            </div>
          </div>

          <div style={styles.cardsWrap}>
            <div style={styles.cardsGrid}>
              {cards.map((c) => (
                <FlipCard key={c.title} title={c.title} backText={c.backText} />
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection amount={0.35} style={styles.quoteSectionFull}>
        <div style={styles.quoteInner}>
          <div style={styles.quoteMarkCenter}>
            <QuoteMarkIcon />
          </div>

          <div style={styles.quoteTextCenter}>
            “Education is the most powerful weapon which you can use to change the world.”
          </div>
          <div style={styles.quoteAuthorCenter}>
            <em>-- Nelson Mandela</em>
          </div>
        </div>
      </RevealSection>

      <RevealSection
        amount={0.35}
        style={styles.statsSection}
        onReveal={() => setStartCount(true)}
      >
        <div style={styles.container}>
          <div style={styles.statsCenter}>
            <p style={styles.statsLine}>
              Students who participate in extracurricular activities are{" "}
              <CountUp to={80} durationMs={950} start={startCount} /> more likely to excel in their academics
              and learn important life skills, so we are focused on
            </p>

            <h2 style={styles.discoveryTitle}>Designing for Discovery</h2>

            <p style={styles.discoveryIntro}>
              Hover over each screen below to see how Nexus turns curiosity into momentum—helping students
              and families uncover what’s available, understand what fits, and take the next step with
              confidence.
            </p>

            <div style={styles.flowStack}>
              <FlowCard
                icon={computerImg}
                title="Discover"
                description="Explore a curated collection of programs, organizations, and opportunities across the Research Triangle. Resources are organized by category, interest area, grade level, and location so you can easily see what’s available in your community without endless searching."
              />
              <FlowCard
                icon={filterImg}
                title="Filter"
                description="Refine your search using clear, intentional filters that help narrow down opportunities based on eligibility, interests, and goals. We surface key details up front so you can quickly understand whether a resource is the right fit for you."
              />
              <FlowCard
                icon={actionImg}
                title="Take Action"
                description="Move from information to impact with direct links and straightforward next steps. Whether that means applying to a program, volunteering, attending an event, or reaching out for support, everything you need to act is clearly laid out in one place."
              />
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}

const styles = {
  page: {
  minHeight: "calc(100vh - var(--header-h))",
  backgroundColor: COLORS.beige,
  fontFamily: "var(--font-body)",
  overflowX: "clip",
},


  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },

  heroImage: {
    position: "relative",
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "84px 0",
    backgroundImage: `url(${researchTriangleImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  heroOverlay: { position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.55)" },
  heroInner: {
    position: "relative",
    zIndex: 1,
    width: "min(1100px, 100%)",
    padding: "0 20px",
    boxSizing: "border-box",
    textAlign: "center",
  },
  heroTitle: {
    margin: 0,
    color: "white",
    fontFamily: "var(--font-heading)",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    fontSize: "clamp(2.4rem, 5.4vw, 4.2rem)",
    textShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  heroOur: { color: COLORS.carolinaBlue },
  heroActions: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  beigeSection: { backgroundColor: COLORS.beige, padding: "52px 0 70px" },
  splitRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "22px",
    alignItems: "center",
  },
  leftMedia: { display: "flex", justifyContent: "flex-start" },
  leftImage: {
    width: "100%",
    maxWidth: "520px",
    borderRadius: "18px",
    boxShadow: "0 16px 34px rgba(0,0,0,0.14)",
    border: "1px solid rgba(0,0,0,0.06)",
    objectFit: "cover",
  },
  rightCopy: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    textAlign: "right",
    paddingLeft: "10px",
  },
  bigHeadline: {
    margin: 0,
    color: COLORS.text,
    fontFamily: "var(--font-heading)",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
    lineHeight: 1.05,
  },
  subText: {
    marginTop: "12px",
    marginBottom: 0,
    color: COLORS.textSoft,
    fontSize: "1.06rem",
    lineHeight: 1.75,
    maxWidth: "54ch",
  },

  cardsWrap: { marginTop: "42px" },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
    paddingTop: "8px",
  },

  flipBtn: {
    border: "none",
    padding: 0,
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
  },
  flipScene: {
    position: "relative",
    width: "100%",
    minHeight: "210px",
    transformStyle: "preserve-3d",
    transition: "transform 650ms cubic-bezier(.2,.8,.2,1)",
  },
  flipSceneFlipped: { transform: "rotateY(180deg)" },
  flipFace: {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    borderRadius: "18px",
    border: "1px solid rgba(0,0,0,0.10)",
    boxShadow: "0 16px 34px rgba(0,0,0,0.10)",
    padding: "16px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "filter 180ms ease, box-shadow 180ms ease, transform 180ms ease",
  },
  flipFaceHover: {
    filter: "brightness(0.93)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.14)",
    transform: "translateY(1px)",
  },
  flipFront: {
    transform: "rotateY(0deg)",
    backgroundColor: COLORS.beige,
    alignItems: "center",
    textAlign: "center",
  },
  flipTitleWrap: {
    display: "grid",
    justifyItems: "center",
    gap: "10px",
    paddingBottom: "8px",
  },
  flipTitle: {
    fontFamily: "var(--font-heading)",
    fontWeight: 900,
    fontSize: "1.65rem",
    color: COLORS.text,
    letterSpacing: "-0.01em",
  },
  flipUnderline: {
    width: "64px",
    height: "4px",
    borderRadius: "999px",
    backgroundColor: COLORS.carolinaBlue,
  },
  flipBack: {
    transform: "rotateY(180deg)",
    backgroundColor: COLORS.carolinaBlue,
    color: COLORS.beige,
    alignItems: "center",
    textAlign: "center",
  },
  flipBackText: {
    color: COLORS.beige,
    fontSize: "1.0rem",
    lineHeight: 1.7,
    maxWidth: "38ch",
    padding: "6px 6px 18px",
  },

  cornerArrow: {
    position: "absolute",
    right: "12px",
    bottom: "12px",
    width: "36px",
    height: "36px",
    borderRadius: "999px",
    backgroundColor: COLORS.carolinaBlue,
    border: "1px solid rgba(0,0,0,0.10)",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.10)",
  },

  cornerArrowInverse: {
    position: "absolute",
    right: "12px",
    bottom: "12px",
    width: "36px",
    height: "36px",
    borderRadius: "999px",
    backgroundColor: COLORS.beige,
    border: "1px solid rgba(0,0,0,0.10)",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.10)",
  },

  quoteSectionFull: { backgroundColor: COLORS.carolinaBlue, padding: "34px 0" },
  quoteInner: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 20px",
    textAlign: "center",
    color: COLORS.beige,
    boxSizing: "border-box",
  },
  quoteMarkCenter: { display: "grid", placeItems: "center", marginBottom: "12px" },
  quoteTextCenter: { fontFamily: "var(--font-body)", fontWeight: 700, lineHeight: 1.5 },
  quoteAuthorCenter: { marginTop: "8px", opacity: 0.95 },

  statsSection: { backgroundColor: COLORS.beige, padding: "44px 0 82px" },
  statsCenter: { textAlign: "center", maxWidth: "86ch", margin: "0 auto" },
  statsLine: { margin: 0, color: COLORS.text, fontSize: "1.08rem", lineHeight: 1.8 },
  percentBlue: { color: COLORS.carolinaBlue, fontWeight: 900 },
  discoveryTitle: {
    marginTop: "18px",
    marginBottom: 0,
    color: COLORS.text,
    fontFamily: "var(--font-heading)",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)",
    lineHeight: 1.05,
  },
  discoveryIntro: {
    marginTop: "14px",
    marginBottom: 0,
    color: COLORS.textSoft,
    fontSize: "1.06rem",
    lineHeight: 1.75,
    maxWidth: "70ch",
    marginInline: "auto",
  },

  flowStack: {
    marginTop: "28px",
    display: "grid",
    gap: "16px",
  },
  flowCardBtn: {
    width: "100%",
    border: "1px solid rgba(0,0,0,0.08)",
    backgroundColor: COLORS.beige,
    borderRadius: "18px",
    boxShadow: "0 16px 34px rgba(0,0,0,0.10)",
    padding: "16px",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: "14px",
    alignItems: "center",
    textAlign: "left",
    cursor: "pointer",
    transition: "filter 180ms ease, transform 180ms ease, box-shadow 180ms ease",
    filter: "brightness(1)",
  },
  flowCardHover: {
    filter: "brightness(0.92)",
    transform: "translateY(1px)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.14)",
  },
  flowLeft: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "4px",
  },
  flowIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "999px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    border: "1px solid rgba(0,0,0,0.18)",
    boxShadow: "0 10px 22px rgba(0,0,0,0.12)",
    flexShrink: 0,
  },
  iconBg: (img) => ({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${img})`,
  }),
  flowRight: { minWidth: 0 },
  flowTitle: {
    color: COLORS.carolinaBlue,
    fontFamily: "var(--font-heading)",
    fontWeight: 900,
    letterSpacing: "-0.01em",
    fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)",
    lineHeight: 1.1,
    marginBottom: "8px",
  },
  flowDesc: {
    color: COLORS.text,
    fontSize: "1.0rem",
    lineHeight: 1.7,
    opacity: 0.95,
  },

  primaryBtn: {
    fontFamily: "var(--font-body)",
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: COLORS.carolinaBlue,
    color: COLORS.text,
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 12px 24px rgba(0,0,0,0.18)",
  },
  secondaryBtn: {
    fontFamily: "var(--font-body)",
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: COLORS.gray,
    color: COLORS.beige,
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 12px 24px rgba(0,0,0,0.18)",
  },
};
