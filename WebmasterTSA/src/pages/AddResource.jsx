import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "triangle_resource_hub_submissions";

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

export default function AddResource() {
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

  const [pending, setPending] = useState([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load saved submissions
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPending(JSON.parse(stored));
      } catch {
        setPending([]);
      }
    }
  }, []);

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

  const pendingCount = useMemo(() => pending.length, [pending]);

  const handleSubmit = (e) => {
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

    const entry = {
      ...form,
      featured: false,
      submittedAt: new Date().toISOString(),
    };

    const updated = [entry, ...pending];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPending(updated);

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

  const clearPending = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPending([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={styles.page}
    >
      <div style={styles.container}>
        {/* Banner */}
        <section style={banner.wrap}>
          <div style={banner.left}>
            <div style={banner.kicker}>Request / Add a Resource</div>
            <h1 style={banner.title}>Help grow the Triangle Resource Hub.</h1>
            <p style={banner.sub}>
              Suggest programs, scholarships, nonprofits, support services, and more. Submissions are{" "}
              <b>reviewed</b> before being added to the public directory.
            </p>

            <div style={banner.statsRow}>
              <div style={banner.statCard}>
                <div style={banner.statNum}>{pendingCount}</div>
                <div style={banner.statLabel}>Pending submissions</div>
              </div>
              <div style={banner.statCard}>
                <div style={banner.statNum}>9–12</div>
                <div style={banner.statLabel}>Grades supported</div>
              </div>
              <div style={banner.statCard}>
                <div style={banner.statNum}>3</div>
                <div style={banner.statLabel}>Cities</div>
              </div>
            </div>

            <div style={banner.tip}>
              Tip: Include the <b>official website link</b> so we can verify accuracy.
            </div>
          </div>

          <div style={banner.right}>
            <div style={banner.illus}>
              <div style={banner.tileRow}>
                <div style={banner.tile} />
                <div style={banner.tile} />
              </div>
              <div style={banner.bigBlock} />
              <div style={banner.smallRow}>
                <div style={banner.small} />
                <div style={banner.smallTall} />
                <div style={banner.small} />
              </div>
            </div>

            <div style={banner.miniPills}>
              <div style={banner.pill}>Reviewed before publishing</div>
              <div style={banner.pill}>Saved locally</div>
              <div style={banner.pill}>Fast submission</div>
            </div>
          </div>
        </section>

        {/* Form Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Submission Form</h2>
          <p style={styles.cardSub}>
            Fields marked with * are required. This form saves submissions locally (for demo + review).
          </p>

          {error && <div style={styles.error}>{error}</div>}
          {submitted && <div style={styles.success}>✅ Submission received! It is now pending review.</div>}

          <form onSubmit={handleSubmit} style={styles.formGrid}>
            <div style={styles.field}>
              <div style={styles.label}>Resource Name *</div>
              <input
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
                  style={styles.select}
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  <option value="">Select type…</option>
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <div style={styles.label}>Area of Interest *</div>
                <select
                  style={styles.select}
                  value={form.interest}
                  onChange={(e) => update("interest", e.target.value)}
                >
                  <option value="">Select area of interest…</option>
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
            </div>

            <div style={styles.field}>
              <div style={styles.label}>Description *</div>
              <textarea
                style={styles.textarea}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Briefly explain what the resource offers, who it’s for, and key details."
              />
            </div>

            <div style={styles.row2}>
              <div style={styles.field}>
                <div style={styles.label}>Official Link *</div>
                <input
                  style={styles.input}
                  value={form.link}
                  onChange={(e) => update("link", e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div style={styles.field}>
                <div style={styles.label}>Featured (admin-only)</div>
                <input
                  style={{ ...styles.input, backgroundColor: "#F3F4F6" }}
                  value="Featured is set by the site admin"
                  disabled
                />
              </div>
            </div>

            <div style={styles.actions}>
              <button type="submit" style={styles.primary}>Submit Resource</button>
              <button
                type="button"
                style={styles.secondary}
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

        {/* Pending Submissions */}
        <div style={styles.pendingCard}>
          <div style={styles.pendingTop}>
            <div>
              <h2 style={styles.pendingTitle}>Pending Submissions</h2>
              <p style={styles.pendingSub}>
                These are saved locally on this device for review/demo.
              </p>
            </div>

            <button style={styles.danger} onClick={clearPending}>
              Clear Pending
            </button>
          </div>

          {pending.length === 0 ? (
            <div style={styles.empty}>No pending submissions yet.</div>
          ) : (
            <div style={styles.grid}>
              {pending.map((r, idx) => (
                <motion.div key={`${r.name}-${idx}`} whileHover={{ scale: 1.01 }} style={styles.pendingItem}>
                  <div style={styles.pendingNameRow}>
                    <div style={styles.pendingName}>{r.name}</div>
                    <div style={styles.pendingBadge}>Pending</div>
                  </div>

                  <div style={styles.pendingMeta}>
                    <div><b>Type:</b> {r.category}</div>
                    <div><b>Cities:</b> {r.cities?.join(", ") || "—"}</div>
                    <div><b>Interest:</b> {r.interest || "—"}</div>
                    <div><b>Grades:</b> {r.grades?.join(", ") || "—"}</div>
                  </div>

                  <div style={styles.pendingBottom}>
                    {r.openToAllImmigrationStatuses && (
                      <span style={styles.openBadge}>Open regardless of immigration status</span>
                    )}
                    <a style={styles.link} href={r.link} target="_blank" rel="noreferrer">
                      View Link →
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.note}>
          <b>Note:</b> This site reviews submissions for accuracy and eligibility before adding them to the public Resource Hub.
        </div>
      </div>
    </motion.div>
  );
}

const styles = {
  page: { minHeight: "100vh", backgroundColor: "#f9fafb", padding: "30px 0" },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "0 20px", boxSizing: "border-box" },

  card: {
    backgroundColor: "white",
    borderRadius: "18px",
    padding: "18px",
    border: "1px solid #E5E7EB",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    marginTop: "14px",
  },
  cardTitle: { margin: 0, color: "#111827", fontSize: "1.6rem" },
  cardSub: { marginTop: "6px", color: "#374151", marginBottom: "12px" },

  error: {
    marginTop: "10px",
    backgroundColor: "#FEF2F2",
    border: "1px solid #FCA5A5",
    color: "#991B1B",
    padding: "10px 12px",
    borderRadius: "12px",
    fontWeight: 800,
  },
  success: {
    marginTop: "10px",
    backgroundColor: "#ECFDF5",
    border: "1px solid #6EE7B7",
    color: "#065F46",
    padding: "10px 12px",
    borderRadius: "12px",
    fontWeight: 800,
  },

  formGrid: { display: "grid", gap: "12px" },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },

  field: { display: "grid", gap: "6px" },
  label: { fontWeight: 900, color: "#111827" },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    outline: "none",
    color: "#111827",
    backgroundColor: "white",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    outline: "none",
    color: "#111827",
    backgroundColor: "white",
    boxSizing: "border-box",
    resize: "vertical",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    outline: "none",
    color: "#111827",
    backgroundColor: "white",
    boxSizing: "border-box",
  },

  group: { border: "1px solid #E5E7EB", borderRadius: "12px", padding: "12px", backgroundColor: "#ffffff" },
  groupTitle: { fontWeight: 900, color: "#111827", marginBottom: "8px" },
  checkList: { display: "grid", gap: "8px" },
  checkRow: { display: "flex", gap: "10px", alignItems: "center", color: "#111827" },
  checkLabel: { color: "#111827" },

  actions: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "4px" },
  primary: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid transparent",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  secondary: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    backgroundColor: "#F3F4F6",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#111827",
  },

  pendingCard: {
    backgroundColor: "white",
    borderRadius: "18px",
    padding: "18px",
    border: "1px solid #E5E7EB",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    marginTop: "14px",
  },
  pendingTop: { display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", flexWrap: "wrap" },
  pendingTitle: { margin: 0, color: "#111827" },
  pendingSub: { margin: "6px 0 0", color: "#374151" },
  danger: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #FCA5A5",
    backgroundColor: "#FEF2F2",
    color: "#991B1B",
    cursor: "pointer",
    fontWeight: 900,
    whiteSpace: "nowrap",
  },
  empty: { marginTop: "10px", color: "#374151" },

  grid: {
    marginTop: "12px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "14px",
  },
  pendingItem: {
    backgroundColor: "#ffffff",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "14px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.04)",
    display: "grid",
    gap: "10px",
  },
  pendingNameRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" },
  pendingName: { fontWeight: 900, color: "#111827", lineHeight: 1.25 },
  pendingBadge: {
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "0.75rem",
    padding: "4px 10px",
    borderRadius: "999px",
    whiteSpace: "nowrap",
    fontWeight: 900,
  },
  pendingMeta: { display: "grid", gap: "4px", color: "#374151", fontSize: "0.92rem" },
  pendingBottom: { display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center", flexWrap: "wrap" },
  openBadge: { backgroundColor: "#E5E7EB", color: "#111827", fontSize: "0.78rem", padding: "4px 10px", borderRadius: "999px" },
  link: { color: "#2563eb", fontWeight: "bold", textDecoration: "none" },

  note: { marginTop: "14px", backgroundColor: "#F6F7FB", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "12px", color: "#374151" },
};

const banner = {
  wrap: {
    backgroundColor: "#F6F7FB",
    borderRadius: "18px",
    padding: "22px",
    border: "1px solid #E5E7EB",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "18px",
    alignItems: "center",
  },
  left: { display: "flex", flexDirection: "column", gap: "10px" },
  kicker: {
    display: "inline-flex",
    alignSelf: "flex-start",
    padding: "6px 10px",
    borderRadius: "999px",
    backgroundColor: "white",
    border: "1px solid #E5E7EB",
    color: "#2563eb",
    fontWeight: 800,
    fontSize: "0.85rem",
  },
  title: { margin: 0, fontSize: "2.2rem", lineHeight: 1.1, color: "#111827", letterSpacing: "-0.01em" },
  sub: { margin: 0, color: "#374151", lineHeight: 1.6, maxWidth: "70ch" },
  statsRow: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "6px" },
  statCard: { backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "10px 12px", minWidth: "140px" },
  statNum: { fontSize: "1.35rem", fontWeight: 900, color: "#111827", lineHeight: 1.1 },
  statLabel: { fontSize: "0.9rem", color: "#6B7280", marginTop: "2px" },
  tip: { marginTop: "6px", backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "10px 12px", color: "#374151" },
  right: { display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" },
  illus: { width: "100%", borderRadius: "16px", backgroundColor: "white", border: "1px solid #E5E7EB", padding: "14px", boxSizing: "border-box" },
  tileRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" },
  tile: { height: "62px", borderRadius: "14px", border: "1px solid #E5E7EB", background: "linear-gradient(135deg, rgba(37,99,235,0.10), rgba(30,64,175,0.06))" },
  bigBlock: { height: "150px", borderRadius: "16px", border: "1px solid #E5E7EB", background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(99,102,241,0.06))", marginBottom: "10px" },
  smallRow: { display: "grid", gridTemplateColumns: "0.7fr 1fr 0.7fr", gap: "10px", alignItems: "end" },
  small: { height: "46px", borderRadius: "14px", border: "1px solid #E5E7EB", backgroundColor: "#F3F4F6" },
  smallTall: { height: "64px", borderRadius: "14px", border: "1px solid #E5E7EB", backgroundColor: "#F3F4F6" },
  miniPills: { display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" },
  pill: { backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "999px", padding: "6px 10px", fontWeight: 800, fontSize: "0.85rem", color: "#374151" },
};
