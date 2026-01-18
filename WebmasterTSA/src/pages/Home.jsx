import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ✅ same data sources as your Resource Hub
import academicPrograms from "../data/AcademicProgram.json";
import awards from "../data/Awards.json";
import communityEvents from "../data/CommunityEvents.json";
import nonprofits from "../data/Nonprofits.json";
import scholarships from "../data/Scholarships.json";
import summerPrograms from "../data/SummerPrograms.json";
import supportServices from "../data/SupportServices.json";
import volunteering from "../data/Volunteering.json";

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

export default function Home() {
  const navigate = useNavigate();

  // ✅ pick up to 5 featured items (stable)
  const featured = useMemo(() => {
    const picks = resourcesData.filter((r) => r.featured === true);
    // fallback if none are featured (so the section isn't empty)
    if (picks.length === 0) return resourcesData.slice(0, 5);
    return picks.slice(0, 5);
  }, []);

  const [active, setActive] = useState(0);

  // ✅ auto-rotate carousel
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

  return (
    <div style={{ ...styles.page, maxWidth: "100vw" }}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.hero}
      >
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>
            Connecting the Research Triangle to Local Resources
          </h1>
          <p style={styles.heroSubtitle}>
            A hub for residents to find volunteering opportunities, community
            organizations, support services, programs, and scholarships
          </p>

          <div style={styles.heroButtons}>
            <button
              style={styles.primaryButton}
              onClick={() => navigate("/resource-hub")}
            >
              Explore Resources
            </button>
            <button
              style={styles.secondaryButton}
              onClick={() => navigate("/add-resource")}
            >
              Request/Add Resource
            </button>
          </div>
        </div>
      </motion.section>

      {/* ✅ Featured Spotlight Carousel */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={styles.sectionAlt}
      >
        <div style={styles.container}>
          <div style={styles.featureHeader}>
            <div>
              <h2 style={styles.sectionTitleAlt}>Featured Spotlight</h2>
              <p style={styles.sectionSubAlt}>
                Highlights from our Resource Hub (marked <b>featured</b>).
              </p>
            </div>

            <div style={styles.featureActions}>
              <button style={styles.pillBtn} onClick={prev} aria-label="Previous featured">
                ←
              </button>
              <button style={styles.pillBtn} onClick={next} aria-label="Next featured">
                →
              </button>
            </div>
          </div>

          <div style={styles.carouselWrap}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current?.name}-${active}`}
                initial={{ opacity: 0, x: 30, scale: 0.99 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.99 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={styles.featureCard}
              >
                <div style={styles.featureTopRow}>
                  <div style={styles.featureBadge}>Featured</div>
                  <div style={styles.featureMeta}>
                    <span style={styles.metaChip}>{current?.category || "Resource"}</span>
                    {Array.isArray(current?.cities) && current.cities.length > 0 && (
                      <span style={styles.metaChip}>{current.cities.join(", ")}</span>
                    )}
                    {current?.interest && <span style={styles.metaChip}>{current.interest}</span>}
                  </div>
                </div>

                <h3 style={styles.featureName}>{current?.name}</h3>
                <p style={styles.featureDesc}>{current?.description}</p>

                <div style={styles.featureBottomRow}>
                  {current?.openToAllImmigrationStatuses && (
                    <span style={styles.openBadge}>
                      Open regardless of immigration status
                    </span>
                  )}

                  <div style={styles.featureLinks}>
                    <button
                      style={styles.linkBtn}
                      onClick={() => navigate("/resource-hub")}
                    >
                      View in Resource Hub
                    </button>

                    {current?.link && (
                      <a
                        href={current.link}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.visitLink}
                      >
                        Visit Resource →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* dots */}
            <div style={styles.dotsRow}>
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to featured item ${i + 1}`}
                  style={{
                    ...styles.dot,
                    ...(i === active ? styles.dotActive : {}),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Accessibility / Immigration Callout */}
      <section style={styles.callout}>
        <div style={styles.container}>
          <p style={styles.calloutText}>
            We recognize that many residents face barriers due to immigration
            status. This hub highlights resources that are accessible to all
            residents, regardless of citizenship or permanent residency.
          </p>
          <p style={styles.calloutSubtext}>
            Use the filter to view only resources open regardless of
            citizenship/residency/immigration status.
          </p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f9fafb",
    width: "100%",
    overflowX: "hidden",
  },

  hero: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "white",
    padding: "50px 0",
  },
  heroTitle: {
    fontSize: "2.8rem",
    marginBottom: "20px",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  heroButtons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    boxSizing: "border-box",
  },
  primaryButton: {
    padding: "12px 25px",
    backgroundColor: "white",
    color: "#2563eb",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  secondaryButton: {
    padding: "12px 25px",
    backgroundColor: "transparent",
    border: "2px solid white",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s",
  },

  sectionAlt: {
    width: "100%",
    padding: "70px 0",
    backgroundColor: "#ffffff",
  },

  container: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },

  // ✅ Featured Spotlight styling (dark text so it’s readable)
  featureHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    alignItems: "flex-end",
    flexWrap: "wrap",
    marginBottom: "18px",
  },
  sectionTitleAlt: {
    margin: 0,
    fontSize: "2rem",
    color: "#111827",
  },
  sectionSubAlt: {
    margin: "6px 0 0 0",
    color: "#374151",
  },
  featureActions: { display: "flex", gap: "10px" },
  pillBtn: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid #E5E7EB",
    backgroundColor: "#F3F4F6",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#111827",
  },

  carouselWrap: {
    borderRadius: "18px",
    border: "1px solid #E5E7EB",
    background: "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(30,64,175,0.04))",
    padding: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },

  featureCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
    padding: "20px",
  },
  featureTopRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: "12px",
  },
  featureBadge: {
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: 900,
    fontSize: "0.85rem",
    padding: "6px 10px",
    borderRadius: "999px",
  },
  featureMeta: { display: "flex", gap: "8px", flexWrap: "wrap" },
  metaChip: {
    backgroundColor: "#F3F4F6",
    border: "1px solid #E5E7EB",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "0.85rem",
    color: "#111827",
    fontWeight: 700,
  },
  featureName: {
    margin: "0 0 8px 0",
    fontSize: "1.4rem",
    color: "#111827",
  },
  featureDesc: {
    margin: 0,
    color: "#374151",
    lineHeight: 1.6,
  },
  featureBottomRow: {
    marginTop: "14px",
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  openBadge: {
    backgroundColor: "#E5E7EB",
    color: "#111827",
    fontSize: "0.8rem",
    padding: "6px 10px",
    borderRadius: "999px",
    fontWeight: 700,
  },
  featureLinks: { display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" },
  linkBtn: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    backgroundColor: "#F3F4F6",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#111827",
  },
  visitLink: {
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none",
  },

  dotsRow: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    marginTop: "12px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "999px",
    border: "1px solid #D1D5DB",
    backgroundColor: "white",
    cursor: "pointer",
  },
  dotActive: {
    backgroundColor: "#2563eb",
    border: "1px solid #2563eb",
  },

  callout: {
    width: "100%",
    backgroundColor: "#667694ff",
    padding: "50px 0",
    color: "white",
  },
  calloutText: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  calloutSubtext: {
    fontSize: "1rem",
  },
};
