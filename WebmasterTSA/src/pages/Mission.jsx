import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  gray: "#494A48",
  beige: "#F5FCEF",
  text: "#111111",
  textSoft: "#2B2B2B",
};

export default function Mission() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={styles.card}
        >
          <div style={styles.kicker}>Nexus • Our Mission</div>

          <h1 style={styles.title}>Our Mission</h1>

          <p style={styles.text}>
            At Nexus, we believe access to community resources should be clear,
            welcoming, and easy to navigate. Our mission is to connect residents
            across the Research Triangle with opportunities and support—so
            finding help, programs, and pathways feels simple, empowering, and
            inclusive.
          </p>

          <p style={styles.text}>
            We organize local resources into one searchable hub, highlight
            student-friendly opportunities, and prioritize accessibility by
            clearly labeling eligibility—especially resources open regardless of
            immigration status.
          </p>

          <div style={styles.grid}>
            <div style={styles.miniCard}>
              <div style={styles.miniTitle}>Clarity</div>
              <div style={styles.miniBody}>
                One place to browse programs, volunteering, scholarships, and
                support services.
              </div>
            </div>

            <div style={styles.miniCard}>
              <div style={styles.miniTitle}>Equity</div>
              <div style={styles.miniBody}>
                Highlight resources that are open regardless of immigration
                status whenever possible.
              </div>
            </div>

            <div style={styles.miniCard}>
              <div style={styles.miniTitle}>Community</div>
              <div style={styles.miniBody}>
                Let residents submit new resources to keep the hub current and
                useful.
              </div>
            </div>
          </div>

          <div style={styles.actions}>
            <button style={styles.primaryBtn} onClick={() => navigate("/resource-hub")}>
              Explore Resources
            </button>
            <button style={styles.secondaryBtn} onClick={() => navigate("/add-resource")}>
              Add a Resource
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: COLORS.beige,
    padding: "48px 0",
    fontFamily: "var(--font-body)",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.65)",
    borderRadius: "18px",
    padding: "26px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
  },
  kicker: {
    display: "inline-flex",
    alignSelf: "flex-start",
    padding: "6px 10px",
    borderRadius: "999px",
    backgroundColor: "white",
    border: "1px solid rgba(0,0,0,0.08)",
    color: COLORS.gray,
    fontWeight: 600,
    fontSize: "0.9rem",
    marginBottom: "10px",
  },
  title: {
    margin: 0,
    fontFamily: "var(--font-heading)",
    fontSize: "2.6rem",
    color: COLORS.text,
    fontWeight: 900,
    letterSpacing: "-0.01em",
  },
  text: {
    marginTop: "14px",
    marginBottom: 0,
    color: COLORS.textSoft,
    fontSize: "1.05rem",
    lineHeight: 1.75,
    fontWeight: 400,
    maxWidth: "85ch",
  },
  grid: {
    marginTop: "18px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "14px",
  },
  miniCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "14px",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 22px rgba(0,0,0,0.06)",
  },
  miniTitle: {
    fontFamily: "var(--font-heading)",
    fontWeight: 900,
    color: COLORS.text,
    marginBottom: "6px",
    fontSize: "1.1rem",
  },
  miniBody: {
    fontFamily: "var(--font-body)",
    color: COLORS.gray,
    fontSize: "0.95rem",
    lineHeight: 1.55,
    fontWeight: 400,
  },
  actions: {
    marginTop: "18px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    fontFamily: "var(--font-body)",
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: COLORS.carolinaBlue,
    color: COLORS.text,
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    transition: "filter 250ms ease, transform 250ms ease, box-shadow 250ms ease",
  },
  secondaryBtn: {
    fontFamily: "var(--font-body)",
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: COLORS.gray,
    color: COLORS.beige,
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    transition: "filter 250ms ease, transform 250ms ease, box-shadow 250ms ease",
  },
};
