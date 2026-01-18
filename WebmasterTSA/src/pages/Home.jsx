import { useEffect, useMemo, useRef, useState } from "react";
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
      timer.current = setTimeout(
        () => setPhase("typingWord"),
        pauseAfterPrefixMs
      );
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
      timer.current = setTimeout(
        () => setPhase("deletingWord"),
        pauseAfterWordMs
      );
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
  }, [
    phase,
    typedPrefix,
    typedWord,
    wordIndex,
    prefix,
    words,
    typingMs,
    deletingMs,
    pauseAfterWordMs,
    pauseAfterPrefixMs,
  ]);

  return { typedPrefix, typedWord };
}

export default function Home() {
  const navigate = useNavigate();

  // ✅ 5 featured resources (fallback if none are marked featured)
  const featured = useMemo(() => {
    const picks = resourcesData.filter((r) => r.featured === true);
    if (picks.length === 0) return resourcesData.slice(0, 5);
    return picks.slice(0, 5);
  }, []);

  const [active, setActive] = useState(0);

  // ✅ auto rotate (shared for hero highlight + hub carousel)
  useEffect(() => {
    if (!featured.length) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % featured.length);
    }, 4500);
    return () => clearInterval(id);
  }, [featured.length]);

  const next = () => setActive((i) => (i + 1) % featured.length);
  const prev = () =>
    setActive((i) => (i - 1 + featured.length) % featured.length);

  const current = featured[active];
  const prevItem = featured[(active - 1 + featured.length) % featured.length];
  const nextItem = featured[(active + 1) % featured.length];

  const { typedPrefix, typedWord } = useTypeRotate({
    prefix: "Making finding resources ",
    words: [
      "faster.",
      "convenient.",
      "easier.",
      "better.",
      "educational.",
      "exciting.",
    ],
  });

  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);
  const [hoverMission, setHoverMission] = useState(false);
  const [hoverHubBtn, setHoverHubBtn] = useState(false);

  return (
    <div style={styles.page}>
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        style={styles.heroWrap}
      >
        <div style={styles.heroGrid}>
          {/* LEFT: Nexus hero */}
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
              <span style={styles.caret} aria-hidden="true">
                |
              </span>
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
                <span style={styles.defNum}>1.</span>{" "}
                A connection or series of connections linking two or more things
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={styles.heroButtons}
            >
              <button
                style={{
                  ...styles.primaryButton,
                  ...(hoverPrimary ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setHoverPrimary(true)}
                onMouseLeave={() => setHoverPrimary(false)}
                onClick={() => navigate("/resource-hub")}
              >
                Explore Resources
              </button>

              <button
                style={{
                  ...styles.secondaryButton,
                  ...(hoverSecondary ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setHoverSecondary(true)}
                onMouseLeave={() => setHoverSecondary(false)}
                onClick={() => navigate("/add-resource")}
              >
                Request/Add Resources
              </button>
            </motion.div>
          </div>

          {/* RIGHT */}
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
                  {current?.featured && (
                    <div style={styles.featureBadge}>Featured</div>
                  )}

                  <h3 style={styles.featureName}>{current?.name}</h3>

                  <div style={styles.featureMeta}>
                    {current?.category ? <span>{current.category}</span> : null}
                    {Array.isArray(current?.cities) && current.cities.length ? (
                      <span>• {current.cities.join(", ")}</span>
                    ) : null}
                    {current?.interest ? (
                      <span>• {current.interest}</span>
                    ) : null}
                  </div>

                  <p style={styles.featureDesc}>{current?.description}</p>

                  <div style={styles.featureBottomRow}>
                    {current?.link ? (
                      <a
                        href={current.link}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.featureVisitLink}
                      >
                        Visit →
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.25 }}
        style={styles.missionWrap}
      >
        <div style={styles.containerCenter}>
          <h2 style={styles.missionTitle}>Our Mission</h2>

          <p style={styles.missionText}>
            At Nexus, we believe that access to community resources should be
            clear, welcoming, and easy to navigate. Our mission is to connect
            residents across the Research Triangle with opportunities and
            support—so finding help, programs, and pathways feels simple,
            empowering, and inclusive.
          </p>

          <button
            style={{
              ...styles.missionBtn,
              ...(hoverMission ? styles.missionBtnHover : {}),
            }}
            onMouseEnter={() => setHoverMission(true)}
            onMouseLeave={() => setHoverMission(false)}
            onClick={() => navigate("/mission")}
          >
            Read more →
          </button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        style={styles.hubWrap}
      >
        <div style={styles.hubInner}>
          <h2 style={styles.hubTitle}>Our Resource Hub</h2>
          <p style={styles.hubSub}>
            From summer programs to scholarships, we have a variety of community
            opportunities to help you learn, grow, and get support across the
            Triangle.
          </p>

          <button
            style={{
              ...styles.hubBtn,
              ...(hoverHubBtn ? styles.hubBtnHover : {}),
            }}
            onMouseEnter={() => setHoverHubBtn(true)}
            onMouseLeave={() => setHoverHubBtn(false)}
            onClick={() => navigate("/resource-hub")}
          >
            View Full Hub
          </button>

          <div style={styles.hubCarouselStage}>
            <div style={{ ...styles.hubGhostCard, ...styles.hubGhostLeft }}>
              <div style={styles.hubGhostImg} />
              <div style={styles.hubGhostTitle}>{prevItem?.name || ""}</div>
            </div>

            <div style={{ ...styles.hubGhostCard, ...styles.hubGhostRight }}>
              <div style={styles.hubGhostImg} />
              <div style={styles.hubGhostTitle}>{nextItem?.name || ""}</div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${current?.name}-${active}-hub`}
                initial={{ opacity: 0, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.985 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                style={styles.hubCard}
              >
                <div style={styles.hubImg} />
                <div style={styles.hubCardBody}>
                  <div style={styles.hubCardTopRow}>
                    <div style={styles.hubCardName}>{current?.name}</div>
                    {current?.category ? (
                      <div style={styles.hubChip}>{current.category}</div>
                    ) : null}
                  </div>

                  <div style={styles.hubCardMeta}>
                    {Array.isArray(current?.cities) && current.cities.length
                      ? current.cities.join(", ")
                      : ""}
                    {current?.interest ? ` • ${current.interest}` : ""}
                  </div>

                  <div style={styles.hubCardDesc}>
                    {current?.description || ""}
                  </div>

                  <div style={styles.hubCardActions}>
                    {current?.link ? (
                      <a
                        href={current.link}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.hubVisit}
                      >
                        Visit Resource →
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              style={{ ...styles.hubArrow, ...styles.hubArrowLeft }}
              onClick={prev}
              aria-label="Previous featured resource"
            >
              ←
            </button>
            <button
              style={{ ...styles.hubArrow, ...styles.hubArrowRight }}
              onClick={next}
              aria-label="Next featured resource"
            >
              →
            </button>

            <div style={styles.hubDotsRow}>
              {featured.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to item ${i + 1}`}
                  onClick={() => setActive(i)}
                  style={{
                    ...styles.hubDot,
                    ...(i === active ? styles.hubDotActive : {}),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

const styles = {
  page: {
    margin: 0,
    padding: 0,
    backgroundColor: COLORS.beige,
    width: "100%",
    overflowX: "hidden",
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
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "18px",
    alignItems: "center",
  },

  heroContent: {
    width: "100%",
    textAlign: "left",
  },

  nexus: {
    margin: 0,
    fontFamily: "var(--font-heading)",
    fontSize: "4rem",
    lineHeight: 1,
    letterSpacing: "-0.02em",
    color: COLORS.carolinaBlue,
    fontWeight: 900,
  },

  typeLine: {
    marginTop: "18px",
    marginBottom: "18px",
    fontFamily: "var(--font-body)",
    fontSize: "1.45rem",
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

  defBlock: {
    marginTop: "6px",
    display: "grid",
    gap: "6px",
    maxWidth: "62ch",
  },
  phonetic: {
    color: COLORS.beigeDark,
    fontFamily: "var(--font-body)",
    fontWeight: 500,
  },
  partOfSpeech: {
    color: COLORS.beigeDark,
    fontFamily: "var(--font-body)",
    fontWeight: 500,
  },
  definition: {
    color: COLORS.beige,
    fontFamily: "var(--font-body)",
    fontSize: "1.05rem",
    lineHeight: 1.55,
    fontWeight: 400,
  },
  defNum: { fontWeight: 600 },

  heroButtons: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "22px",
  },

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

  featureSide: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: "6px",
  },

  featureCardOuterHero: {
    width: "100%",
    maxWidth: "520px",
  },

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

  missionWrap: {
    width: "100%",
    padding: "90px 0 70px 0",
    backgroundColor: COLORS.beige,
  },
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

  hubWrap: {
    width: "100%",
    padding: "95px 0 90px 0",
    backgroundColor: "#111111",
    color: COLORS.beige,
  },
  hubInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
    textAlign: "center",
  },
  hubTitle: {
    margin: 0,
    fontFamily: "var(--font-heading)",
    fontSize: "3.2rem",
    color: COLORS.beige,
    fontWeight: 900,
    letterSpacing: "-0.02em",
  },
  hubSub: {
    margin: "12px auto 0 auto",
    maxWidth: "70ch",
    fontFamily: "var(--font-body)",
    fontSize: "1.05rem",
    lineHeight: 1.7,
    color: "rgba(245,252,239,0.85)",
    fontWeight: 400,
  },
  hubBtn: {
    marginTop: "18px",
    fontFamily: "var(--font-body)",
    padding: "12px 18px",
    backgroundColor: COLORS.carolinaBlue,
    color: COLORS.text,
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: 500,
    boxShadow: "0 14px 30px rgba(0,0,0,0.30)",
    transition: "filter 250ms ease, transform 250ms ease, box-shadow 250ms ease",
  },
  hubBtnHover: {
    filter: "brightness(0.9)",
    transform: "translateY(-1px)",
    boxShadow: "0 18px 42px rgba(0,0,0,0.36)",
  },

  hubCarouselStage: {
    position: "relative",
    marginTop: "48px",
    display: "grid",
    placeItems: "center",
    padding: "30px 0 44px 0",
  },

  hubGhostCard: {
    position: "absolute",
    width: "520px",
    maxWidth: "70vw",
    height: "260px",
    borderRadius: "18px",
    backgroundColor: "rgba(245,252,239,0.10)",
    border: "1px solid rgba(245,252,239,0.18)",
    backdropFilter: "blur(2px)",
    display: "grid",
    gridTemplateRows: "150px 1fr",
    overflow: "hidden",
    opacity: 0.35,
  },
  hubGhostLeft: { left: "50%", transform: "translateX(-92%)" },
  hubGhostRight: { left: "50%", transform: "translateX(-8%)" },
  hubGhostImg: {
    background:
      "linear-gradient(135deg, rgba(75,156,211,0.22), rgba(245,252,239,0.08))",
  },
  hubGhostTitle: {
    padding: "12px",
    fontFamily: "var(--font-heading)",
    color: "rgba(245,252,239,0.85)",
    fontSize: "1.05rem",
    textAlign: "left",
  },

  hubCard: {
    width: "620px",
    maxWidth: "86vw",
    borderRadius: "18px",
    backgroundColor: COLORS.beige,
    color: COLORS.text,
    overflow: "hidden",
    boxShadow: "0 26px 60px rgba(0,0,0,0.45)",
    border: "1px solid rgba(0,0,0,0.08)",
  },
  hubImg: {
    height: "190px",
    background:
      "linear-gradient(135deg, rgba(75,156,211,0.30), rgba(73,74,72,0.12))",
  },
  hubCardBody: {
    padding: "18px 18px 16px 18px",
    textAlign: "left",
  },
  hubCardTopRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  hubCardName: {
    fontFamily: "var(--font-heading)",
    fontSize: "1.6rem",
    fontWeight: 900,
    lineHeight: 1.2,
  },
  hubChip: {
    fontFamily: "var(--font-body)",
    fontSize: "0.85rem",
    fontWeight: 600,
    backgroundColor: "rgba(73,74,72,0.10)",
    border: "1px solid rgba(73,74,72,0.18)",
    padding: "6px 10px",
    borderRadius: "999px",
    color: COLORS.gray,
    whiteSpace: "nowrap",
  },
  hubCardMeta: {
    marginTop: "6px",
    fontFamily: "var(--font-body)",
    fontSize: "0.95rem",
    color: COLORS.gray,
  },
  hubCardDesc: {
    marginTop: "12px",
    fontFamily: "var(--font-body)",
    color: COLORS.textSoft,
    lineHeight: 1.65,
    fontSize: "1.0rem",
  },
  hubCardActions: {
    marginTop: "14px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  hubVisit: {
    textDecoration: "none",
    color: COLORS.carolinaBlue,
    fontFamily: "var(--font-body)",
    fontWeight: 700,
  },

  hubArrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-35%)",
    width: "54px",
    height: "54px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "rgba(75,156,211,0.95)",
    color: COLORS.text,
    cursor: "pointer",
    boxShadow: "0 18px 36px rgba(0,0,0,0.35)",
    display: "grid",
    placeItems: "center",
    fontFamily: "var(--font-body)",
    fontWeight: 700,
    transition: "filter 180ms ease, transform 180ms ease",
  },
  hubArrowLeft: { left: "calc(50% - 360px)" },
  hubArrowRight: { right: "calc(50% - 360px)" },

  hubDotsRow: {
    position: "absolute",
    bottom: "0px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
  hubDot: {
    width: "10px",
    height: "10px",
    borderRadius: "999px",
    border: "1px solid rgba(245,252,239,0.55)",
    backgroundColor: "rgba(245,252,239,0.18)",
    cursor: "pointer",
  },
  hubDotActive: {
    backgroundColor: "rgba(75,156,211,0.95)",
    border: "1px solid rgba(75,156,211,1)",
  },
};
