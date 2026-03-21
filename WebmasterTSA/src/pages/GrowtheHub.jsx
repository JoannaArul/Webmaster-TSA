import { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "@formspree/react";

import buildingBlockBg from "../assets/BuildingBlock.webp";
import buildImg from "../assets/Build.avif";
import academicImg from "../assets/Academic.webp";
import reviewImg from "../assets/ReviewProcess.webp";

const TYPE_OPTIONS = [
  "Academic Program",
  "Awards",
  "Community Events",
  "Non-profits",
  "Scholarships",
  "Summer Programs",
  "Support Services",
  "Volunteering",
];

const CITY_OPTIONS = ["Durham", "Raleigh", "Chapel Hill"];

const INTEREST_OPTIONS = [
  "Biology",
  "Computer Science",
  "Education",
  "Engineering",
  "Environmental Science",
  "Mathematics",
  "Chemistry",
  "English Literature Writing",
  "Arts Performance",
  "Law & Government",
  "Physics",
  "Political Science",
  "Business",
  "Psychology",
  "STEM/Enrichment",
  "Public Service",
];

const GRADE_OPTIONS = ["9", "10", "11", "12"];

const COLORS = {
  carolinaBlue: "#4B9CD3",
  beige: "#F5FCEF",
  text: "#111111",
  textSoft: "#2B2B2B",
  border: "#E5E7EB",
};

const FADE_STYLE_ID = "img-fade-style";
function injectFadeStyle() {
  if (typeof document === "undefined") return;
  if (document.getElementById(FADE_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = FADE_STYLE_ID;
  style.textContent = `.img-pending{opacity:0}.img-loaded{opacity:1;transition:opacity 0.35s ease}`;
  document.head.appendChild(style);
}
injectFadeStyle();

function useImagePreload(srcs) {
  const [loadedMap, setLoadedMap] = useState({});

  useEffect(() => {
    srcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () =>
        setLoadedMap((prev) => ({ ...prev, [src]: true }));
    });
  }, []);

  return (src) => !!loadedMap[src];
}

function BlurImage({ src, alt, style, eager = false, dominantColor = "#b8c9b0" }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (el.complete && el.naturalWidth > 0) {
      el.classList.remove("img-pending");
      el.classList.add("img-loaded");
    }
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: dominantColor,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="img-pending"
        onLoad={(e) => {
          e.currentTarget.classList.remove("img-pending");
          e.currentTarget.classList.add("img-loaded");
        }}
        style={style}
      />
    </div>
  );
}

export default function GrowtheHub() {
  const formTopRef = useRef(null);
  const isLoaded = useImagePreload([buildingBlockBg]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    cities: [],
    interest: "",
    grades: [],
    description: "",
    link: "",
    openToAllImmigrationStatuses: false,
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [state, formspreeSubmit] = useForm("xreelzqy");

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const toggleArray = (key, value) => {
    setForm((p) => {
      const arr = p[key];
      const exists = arr.includes(value);
      return { ...p, [key]: exists ? arr.filter((x) => x !== value) : [...arr, value] };
    });
  };

  const isValidUrl = (url) => {
    try {
      const u = new URL(url);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const heroCards = useMemo(
    () => [
      {
        title: "Build",
        description:
          "Do you have a resource that would benefit the community? Use the form below to submit resources to the Hub.",
        img: buildImg,
        dominantColor: "#7a9e8a",
      },
      {
        title: "Submission Guidelines",
        bigTitle: true,
        description:
          "Accepted resources include Academic Program, Awards, Community Events, Non-profits, Scholarships, Summer Programs, Support Services, and Volunteering.",
        img: academicImg,
        dominantColor: "#8fa3b1",
      },
      {
        title: "Review Process",
        bigTitle: true,
        description:
          "The Nexus committee and website manager will review all resources considering quality before adding it to the Hub. Thank you for supporting your community!",
        img: reviewImg,
        dominantColor: "#a09070",
      },
    ],
    []
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    if (!form.name.trim()) return setError("Please enter a resource name.");
    if (!form.category) return setError("Please select a type.");
    if (form.cities.length === 0) return setError("Please select at least one city.");
    if (!form.interest) return setError("Please select an area of interest.");
    if (form.grades.length === 0) return setError("Please select at least one grade.");
    if (!form.description.trim()) return setError("Please add a short description.");
    if (!isValidUrl(form.link)) return setError("Please enter a valid link starting with https://");

    const res = await formspreeSubmit(e);

    if (res?.body?.ok === false) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);

    setForm({
      name: "",
      category: "",
      cities: [],
      interest: "",
      grades: [],
      description: "",
      link: "",
      openToAllImmigrationStatuses: false,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToForm = () => {
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={styles.page}>
      <PreloadImages srcs={[buildingBlockBg, buildImg, academicImg, reviewImg]} />

      <section
        style={{
          ...hero.fullBleed,
          backgroundImage: isLoaded(buildingBlockBg)
            ? `linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url(${buildingBlockBg})`
            : "none",
          backgroundColor: "#1a2e42",
          opacity: isLoaded(buildingBlockBg) ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div style={hero.innerMax}>
          <div style={hero.innerGrid}>
            <div style={hero.left}>
              <div style={hero.kicker}>Community Submission</div>

              <h1 style={hero.title}>HELP BUILD NEXUS</h1>

              <p style={hero.sub}>
                Share a program, scholarship, nonprofit, support service, or opportunity that could help someone in the
                Research Triangle.
              </p>

              <div style={hero.actions}>
                <button
                  type="button"
                  style={hero.cta}
                  onClick={scrollToForm}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2F86BC")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.carolinaBlue)}
                >
                  Scroll to the form
                </button>
              </div>

              <div style={hero.statsRow}>
                <div style={hero.stat}>
                  <div style={hero.statNum}>9 to 12</div>
                  <div style={hero.statLabel}>Grades supported</div>
                </div>
                <div style={hero.stat}>
                  <div style={hero.statNum}>3</div>
                  <div style={hero.statLabel}>Cities</div>
                </div>
              </div>
            </div>

            <div style={hero.right}>
              {heroCards.map((c, idx) => (
                <motion.div
                  key={c.title}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.18 }}
                  style={hero.infoCard}
                >
                  <div style={hero.cardImgWrap}>
                    <div style={hero.imgOverlay} />
                    <BlurImage
                      src={c.img}
                      alt={c.title}
                      eager
                      dominantColor={c.dominantColor}
                      style={hero.cardImg}
                    />
                  </div>

                  <div style={hero.cardText}>
                    <div style={c.bigTitle ? hero.cardTitleBig : hero.cardTitle}>{c.title}</div>
                    <div style={hero.cardLine} />
                    <div style={hero.cardDesc}>{c.description}</div>
                  </div>

                  <div
                    style={{
                      ...hero.cardAccent,
                      opacity: idx === 0 ? 1 : 0.85,
                    }}
                    aria-hidden="true"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={styles.container}>
        <div ref={formTopRef} />

        {(submitted || state.succeeded) && (
          <div style={styles.success}>Submission received! Thank you for helping build Nexus.</div>
        )}

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Submission Form</h2>
          <p style={styles.cardSub}>Fields marked with * are required.</p>

          {error && <div style={styles.error}>{error}</div>}

          {state.errors?.length > 0 && !error && (
            <div style={styles.error}>Something went wrong. Please check your fields and try again.</div>
          )}

          <form onSubmit={onSubmit} style={styles.formGrid}>
            <input type="hidden" name="cities" value={form.cities.join(", ")} />
            <input type="hidden" name="grades" value={form.grades.join(", ")} />

            <div style={styles.field}>
              <div style={styles.label}>Resource Name *</div>
              <input
                name="resource_name"
                style={styles.input}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Example: Chapel Hill Math Circle"
              />
            </div>

            <div style={styles.row2}>
              <div style={styles.field}>
                <div style={styles.label}>Type *</div>
                <select
                  name="category"
                  style={styles.select}
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  <option value="">Select type...</option>
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <div style={styles.label}>Area of Interest *</div>
                <select
                  name="interest"
                  style={styles.select}
                  value={form.interest}
                  onChange={(e) => update("interest", e.target.value)}
                >
                  <option value="">Select area of interest...</option>
                  {INTEREST_OPTIONS.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.row2}>
              <div style={styles.group}>
                <div style={styles.groupTitle}>City *</div>
                <div style={styles.checkList}>
                  {CITY_OPTIONS.map((c) => (
                    <label key={c} style={styles.checkRow}>
                      <input
                        type="checkbox"
                        checked={form.cities.includes(c)}
                        onChange={() => toggleArray("cities", c)}
                      />
                      <span style={styles.checkLabel}>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={styles.group}>
                <div style={styles.groupTitle}>Grades *</div>
                <div style={styles.checkList}>
                  {GRADE_OPTIONS.map((g) => (
                    <label key={g} style={styles.checkRow}>
                      <input
                        type="checkbox"
                        checked={form.grades.includes(g)}
                        onChange={() => toggleArray("grades", g)}
                      />
                      <span style={styles.checkLabel}>Grade {g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div style={styles.group}>
              <div style={styles.groupTitle}>Eligibility</div>
              <label style={styles.checkRow}>
                <input
                  type="checkbox"
                  checked={form.openToAllImmigrationStatuses}
                  onChange={(e) => update("openToAllImmigrationStatuses", e.target.checked)}
                />
                <span style={styles.checkLabel}>Open regardless of immigration status</span>
              </label>
              <input
                type="hidden"
                name="open_to_all_immigration_statuses"
                value={form.openToAllImmigrationStatuses ? "Yes" : "No"}
              />
            </div>

            <div style={styles.field}>
              <div style={styles.label}>Description *</div>
              <textarea
                name="description"
                style={styles.textarea}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Briefly explain what the resource offers, who it is for, and key details."
              />
            </div>

            <div style={styles.field}>
              <div style={styles.label}>Official Link *</div>
              <input
                name="link"
                style={styles.input}
                value={form.link}
                onChange={(e) => update("link", e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div style={styles.actions}>
              <button
                type="submit"
                style={{
                  ...styles.primary,
                  opacity: state.submitting ? 0.75 : 1,
                  cursor: state.submitting ? "not-allowed" : "pointer",
                }}
                disabled={state.submitting}
                onMouseEnter={(e) => !state.submitting && (e.currentTarget.style.backgroundColor = "#2F86BC")}
                onMouseLeave={(e) => !state.submitting && (e.currentTarget.style.backgroundColor = COLORS.carolinaBlue)}
              >
                {state.submitting ? "Submitting..." : "Submit Resource"}
              </button>

              <button
                type="button"
                style={styles.secondary}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E6EDE2")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.beige)}
                onClick={() =>
                  setForm({
                    name: "",
                    category: "",
                    cities: [],
                    interest: "",
                    grades: [],
                    description: "",
                    link: "",
                    openToAllImmigrationStatuses: false,
                  })
                }
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function PreloadImages({ srcs }) {
  useEffect(() => {
    srcs.forEach((src) => {
      if (!src) return;
      const existing = document.querySelector(`link[rel="preload"][href="${src}"]`);
      if (existing) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }, [srcs]);
  return null;
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: COLORS.beige,
    paddingBottom: "28px",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, sans-serif',
    color: COLORS.text,
  },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "0 20px", boxSizing: "border-box" },
  card: {
    backgroundColor: COLORS.beige,
    borderRadius: "18px",
    padding: "18px",
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 14px 30px rgba(0,0,0,0.10)",
    marginTop: "32px",
    marginBottom: "32px",
  },
  cardTitle: { margin: 0, color: COLORS.text, fontSize: "clamp(1.35rem, 2.5vw, 1.6rem)", fontFamily: '"Merriweather", serif' },
  cardSub: { marginTop: "6px", color: "#374151", marginBottom: "12px", fontSize: "clamp(0.88rem, 1.5vw, 1rem)" },
  error: {
    marginTop: "10px",
    backgroundColor: "#FEF2F2",
    border: "1px solid #FCA5A5",
    color: "#991B1B",
    padding: "10px 12px",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)",
  },
  success: {
    marginTop: "10px",
    backgroundColor: "#ECFDF5",
    border: "1px solid #6EE7B7",
    color: "#065F46",
    padding: "10px 12px",
    borderRadius: "12px",
    fontWeight: 600,
    fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)",
  },
  formGrid: { display: "grid", gap: "12px" },
  row2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" },
  field: { display: "grid", gap: "6px" },
  label: { fontWeight: 600, color: COLORS.text, fontSize: "clamp(0.88rem, 1.5vw, 1rem)" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    outline: "none",
    color: COLORS.text,
    backgroundColor: "#FAFFF6",
    boxSizing: "border-box",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, sans-serif',
    fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    outline: "none",
    color: COLORS.text,
    backgroundColor: "#FAFFF6",
    boxSizing: "border-box",
    resize: "vertical",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, sans-serif',
    fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    outline: "none",
    color: COLORS.text,
    backgroundColor: "#FAFFF6",
    boxSizing: "border-box",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, sans-serif',
    fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
  },
  group: { border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "12px", backgroundColor: "#FAFFF6" },
  groupTitle: { fontWeight: 600, color: COLORS.text, marginBottom: "8px", fontSize: "clamp(0.88rem, 1.5vw, 1rem)" },
  checkList: { display: "grid", gap: "8px" },
  checkRow: { display: "flex", gap: "10px", alignItems: "center", color: COLORS.text },
  checkLabel: { color: COLORS.text, fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)" },
  actions: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" },
  primary: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid transparent",
    backgroundColor: COLORS.carolinaBlue,
    color: "#FAFFF6",
    fontWeight: 600,
    transition: "background-color 160ms ease",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, sans-serif',
    cursor: "pointer",
    fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
  },
  secondary: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: "#FAFFF6",
    cursor: "pointer",
    fontWeight: 600,
    color: COLORS.text,
    transition: "background-color 160ms ease",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, sans-serif',
    fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
  },
};

const hero = {
  fullBleed: {
    width: "100%",
    padding: "clamp(28px, 5vw, 42px) 0",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderBottom: `1px solid ${COLORS.border}`,
    willChange: "transform",
  },
  innerMax: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  innerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "22px",
    alignItems: "center",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    color: "#FAFFF6",
    maxWidth: "60ch",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, sans-serif',
  },
  kicker: {
    display: "inline-flex",
    width: "fit-content",
    padding: "8px 12px",
    borderRadius: "999px",
    backgroundColor: "rgba(245,252,239,0.92)",
    color: COLORS.text,
    fontWeight: 600,
    fontSize: "clamp(0.78rem, 1.2vw, 0.85rem)",
    border: "1px solid rgba(255,255,255,0.25)",
    backdropFilter: "blur(6px)",
  },
  title: {
    margin: 0,
    fontSize: "clamp(2rem, 4vw, 3.3rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.02em",
    fontWeight: 900,
    fontFamily: '"Merriweather", serif',
  },
  sub: {
    margin: 0,
    color: "rgba(255,255,255,0.92)",
    lineHeight: 1.6,
    fontWeight: 500,
    fontSize: "clamp(0.92rem, 1.5vw, 1.02rem)",
  },
  actions: { display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" },
  cta: {
    padding: "12px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.20)",
    backgroundColor: COLORS.carolinaBlue,
    color: "#FAFFF6",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
    transition: "background-color 160ms ease, transform 160ms ease",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, sans-serif',
    fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
  },
  statsRow: { display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" },
  stat: {
    backgroundColor: "rgba(245,252,239,0.92)",
    color: COLORS.text,
    borderRadius: "16px",
    padding: "10px 12px",
    border: "1px solid rgba(255,255,255,0.25)",
    minWidth: "120px",
    backdropFilter: "blur(6px)",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, sans-serif',
  },
  statNum: { fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", lineHeight: 1.1 },
  statLabel: { marginTop: "2px", color: "#4B5563", fontWeight: 500, fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)" },
  right: { display: "grid", gap: "12px" },
  infoCard: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "96px 1fr",
    gap: "12px",
    borderRadius: "18px",
    overflow: "hidden",
    backgroundColor: "rgba(245,252,239,0.92)",
    border: "1px solid rgba(255,255,255,0.20)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 14px 34px rgba(0,0,0,0.18)",
  },
  cardImgWrap: {
    width: "96px",
    minHeight: "100%",
    position: "relative",
    backgroundColor: "#c8d6c0",
    overflow: "hidden",
  },
  imgOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 2,
    pointerEvents: "none",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    position: "relative",
    zIndex: 1,
  },
  cardText: {
    padding: "12px 14px 12px 0",
    color: COLORS.text,
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, sans-serif',
  },
  cardTitle: { fontWeight: 600, fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)" },
  cardTitleBig: { fontWeight: 600, fontSize: "clamp(1rem, 1.8vw, 1.12rem)" },
  cardLine: { width: "100%", height: "1px", backgroundColor: "rgba(0,0,0,0.10)", margin: "8px 0" },
  cardDesc: { color: COLORS.textSoft, fontWeight: 400, lineHeight: 1.4, fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)" },
  cardAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "6px",
    backgroundColor: COLORS.carolinaBlue,
  },
};