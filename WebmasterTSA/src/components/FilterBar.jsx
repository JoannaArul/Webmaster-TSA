export default function FilterBar({
  categories,
  cities,
  interests,
  filters,
  setFilters,
}) {
  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div style={styles.wrap}>
      <input
        style={styles.input}
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        placeholder="Search by keyword (name, description)..."
      />

      <select style={styles.select} value={filters.category} onChange={(e) => update("category", e.target.value)}>
        <option value="All">All Categories</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select style={styles.select} value={filters.city} onChange={(e) => update("city", e.target.value)}>
        <option value="All">All Cities</option>
        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select style={styles.select} value={filters.interest} onChange={(e) => update("interest", e.target.value)}>
        <option value="All">All Interests</option>
        {interests.map((i) => <option key={i} value={i}>{i}</option>)}
      </select>

      <label style={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={filters.onlyOpenToAllImmigrationStatuses}
          onChange={(e) => update("onlyOpenToAllImmigrationStatuses", e.target.checked)}
        />
        <span>Only show resources open regardless of immigration status</span>
      </label>

      <button
        style={styles.reset}
        onClick={() =>
          setFilters({
            search: "",
            category: "All",
            city: "All",
            interest: "All",
            onlyOpenToAllImmigrationStatuses: false,
          })
        }
      >
        Reset
      </button>
    </div>
  );
}

const styles = {
  wrap: {
    backgroundColor: "white",
    padding: "16px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    display: "grid",
    gap: "10px",
  },
  input: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "12px 12px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    outline: "none",
    backgroundColor: "white",
  },
  checkboxRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    fontSize: "0.95rem",
    color: "#111827",
  },
  reset: {
    justifySelf: "start",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    backgroundColor: "#F3F4F6",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
