export default function FilterBar({
  categories,
  cities,
  interests,
  grades,
  filters,
  setFilters,
  onSearch,
}) {
  const setSearch = (value) =>
    setFilters((prev) => ({ ...prev, search: value }));

  const toggleInArray = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key];
      const exists = arr.includes(value);
      return {
        ...prev,
        [key]: exists ? arr.filter((x) => x !== value) : [...arr, value],
      };
    });
  };

  const clearAll = () => {
    setFilters({
      search: "",
      categories: [],
      cities: [],
      interests: [],
      grades: [],
      onlyOpenToAllImmigrationStatuses: false,
    });
    onSearch?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch?.();
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.topRow}>
        <input
          style={styles.input}
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search (name, description, category, city, interest)..."
        />

        <button style={styles.searchBtn} onClick={onSearch}>
          Search
        </button>
        <button style={styles.resetBtn} onClick={clearAll}>
          Reset
        </button>
      </div>

      <div style={styles.grid}>
        <div style={styles.group}>
          <div style={styles.groupTitle}>Type</div>
          <div style={styles.checkList}>
            {categories.map((c) => (
              <label key={c} style={styles.checkRow}>
                <input
                  type="checkbox"
                  checked={filters.categories.includes(c)}
                  onChange={() => toggleInArray("categories", c)}
                />
                <span style={styles.checkLabel}>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.group}>
          <div style={styles.groupTitle}>City</div>
          <div style={styles.checkList}>
            {cities.map((c) => (
              <label key={c} style={styles.checkRow}>
                <input
                  type="checkbox"
                  checked={filters.cities.includes(c)}
                  onChange={() => toggleInArray("cities", c)}
                />
                <span style={styles.checkLabel}>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.group}>
          <div style={styles.groupTitle}>Area of Interest</div>
          <div style={styles.checkList}>
            {interests.map((i) => (
              <label key={i} style={styles.checkRow}>
                <input
                  type="checkbox"
                  checked={filters.interests.includes(i)}
                  onChange={() => toggleInArray("interests", i)}
                />
                <span style={styles.checkLabel}>{i}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.group}>
          <div style={styles.groupTitle}>Grades</div>
          <div style={styles.checkList}>
            {grades.map((g) => (
              <label key={g} style={styles.checkRow}>
                <input
                  type="checkbox"
                  checked={filters.grades.includes(g)}
                  onChange={() => toggleInArray("grades", g)}
                />
                <span style={styles.checkLabel}>Grade {g}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.group}>
          <div style={styles.groupTitle}>Eligibility</div>
          <label style={styles.checkRow}>
            <input
              type="checkbox"
              checked={filters.onlyOpenToAllImmigrationStatuses}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  onlyOpenToAllImmigrationStatuses: e.target.checked,
                }))
              }
            />
            <span style={styles.checkLabel}>
              Open regardless of immigration status
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    backgroundColor: "white",
    padding: "clamp(12px, 2vw, 16px)",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    display: "grid",
    gap: "12px",
    overflowX: "hidden", 
  },

  topRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center",
  },

  input: {
    flex: "1 1 320px",
    minWidth: "min(520px, 100%)",
    width: "100%",
    padding: "12px 12px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    outline: "none",
    color: "#111827",
    backgroundColor: "white",
    boxSizing: "border-box",
  },

  searchBtn: {
    flex: "0 0 auto",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid transparent",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  resetBtn: {
    flex: "0 0 auto",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #D1D5DB",
    backgroundColor: "#F3F4F6",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#111827",
    whiteSpace: "nowrap",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },

  group: {
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "12px",
    backgroundColor: "#ffffff",
    minWidth: 0, // prevents overflow in grid children
  },

  groupTitle: {
    fontWeight: 900,
    color: "#111827",
    marginBottom: "8px",
  },

  checkList: {
    display: "grid",
    gap: "8px",
    maxHeight: "min(210px, 32vh)",
    overflow: "auto",
    paddingRight: "6px",
  },

  checkRow: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    color: "#111827",
    fontSize: "0.95rem",
  },

  checkLabel: {
    color: "#111827",
    lineHeight: 1.25,
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  },
};
