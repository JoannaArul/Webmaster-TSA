import { motion } from "framer-motion";

function normalizeCity(city) {
  if (!city) return "";
  if (city === "All Triangle") return "Research Triangle";
  return city;
}

export default function ResourceCard({ resource }) {
  const city = normalizeCity(resource.city);

  return (
    <motion.article whileHover={{ scale: 1.02 }} style={styles.card}>
      <div style={styles.topRow}>
        <h3 style={styles.name}>{resource.name}</h3>
        {resource.featured && <span style={styles.badge}>Featured</span>}
      </div>

      <div style={styles.meta}>
        <span>
          <b>Category:</b> {resource.category}
        </span>
        <span>
          <b>City:</b> {city}
        </span>
        <span>
          <b>Interest:</b> {resource.interest}
        </span>
      </div>

      <p style={styles.desc}>{resource.description}</p>

      <div style={styles.bottomRow}>
        {resource.openToAllImmigrationStatuses && (
          <span style={styles.openBadge}>
            Open regardless of immigration status
          </span>
        )}
        <a style={styles.link} href={resource.link} target="_blank" rel="noreferrer">
          Visit Resource →
        </a>
      </div>
    </motion.article>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    padding: "18px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  topRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
  },

  // IMPORTANT: force dark text so titles are visible
  name: {
    margin: 0,
    fontSize: "1.05rem",
    lineHeight: 1.25,
    color: "#111827",
  },

  badge: {
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "0.75rem",
    padding: "4px 10px",
    borderRadius: "999px",
    whiteSpace: "nowrap",
  },
  meta: {
    display: "grid",
    gap: "4px",
    color: "#374151",
    fontSize: "0.9rem",
  },
  desc: {
    margin: 0,
    color: "#111827",
    fontSize: "0.95rem",
    lineHeight: 1.4,
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
    backgroundColor: "#E5E7EB",
    color: "#111827",
    fontSize: "0.78rem",
    padding: "4px 10px",
    borderRadius: "999px",
  },
  link: {
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
