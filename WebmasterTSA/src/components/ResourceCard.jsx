import { motion } from "framer-motion";

export default function ResourceCard({ resource }) {
  const cities = Array.isArray(resource.cities) ? resource.cities : [];
  const grades = Array.isArray(resource.grades) ? resource.grades : [];

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={styles.card}
    >
      <div style={styles.topRow}>
        <h3 style={styles.name}>{resource.name}</h3>
        {resource.featured && <span style={styles.badge}>Featured</span>}
      </div>

      <div style={styles.meta}>
        <span>
          <b>Type:</b> {resource.category || "—"}
        </span>
        <span>
          <b>Cities:</b> {cities.length ? cities.join(", ") : "—"}
        </span>
        <span>
          <b>Area of Interest:</b> {resource.interest || "—"}
        </span>
        <span>
          <b>Grades:</b> {grades.length ? grades.join(", ") : "—"}
        </span>
      </div>

      <p style={styles.desc}>{resource.description || ""}</p>

      <div style={styles.bottomRow}>
        {resource.openToAllImmigrationStatuses && (
          <span style={styles.openBadge}>
            Open regardless of immigration status
          </span>
        )}

        {resource.link && (
          <a
            style={styles.link}
            href={resource.link}
            target="_blank"
            rel="noreferrer"
          >
            Visit Resource →
          </a>
        )}
      </div>
    </motion.article>
  );
}

const styles = {
  card: {
    backgroundColor: "#F5FCEF", // beige background
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid #DCE7D1",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minWidth: 0,
  },

  topRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },

  name: {
    margin: 0,
    fontSize: "1.05rem",
    lineHeight: 1.25,
    color: "#000000",
    fontWeight: 700,
    flex: "1 1 auto",
    minWidth: 0,
    wordBreak: "break-word",
  },

  badge: {
    backgroundColor: "#4B9CD3",
    color: "#F5FCEF",
    fontSize: "0.75rem",
    padding: "4px 10px",
    borderRadius: "999px",
    whiteSpace: "nowrap",
    alignSelf: "flex-start",
  },

  meta: {
    display: "grid",
    gap: "4px",
    color: "#494A48",
    fontSize: "0.9rem",
    lineHeight: 1.45,
  },

  desc: {
    margin: 0,
    color: "#000000",
    fontSize: "0.95rem",
    lineHeight: 1.45,
    wordBreak: "break-word",
  },

  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "6px",
  },

  openBadge: {
    backgroundColor: "#FAFFF6",
    border: "1px solid #DCE7D1",
    color: "#000000",
    fontSize: "0.78rem",
    padding: "4px 10px",
    borderRadius: "999px",
    whiteSpace: "nowrap",
  },

  link: {
    color: "#4B9CD3", // Carolina blue text link
    fontWeight: 700,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
};
