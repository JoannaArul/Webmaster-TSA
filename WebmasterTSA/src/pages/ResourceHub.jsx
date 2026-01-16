import { useMemo, useState } from "react";
import resourcesData from "../data/resources.json";
import FilterBar from "../components/FilterBar.jsx";
import ResourceCard from "../components/ResourceCard.jsx";

const CITY_OPTIONS = ["Durham", "Raleigh", "Chapel Hill", "Research Triangle"];

function normalizeCity(city) {
  // Your JSON uses "All Triangle" — map it to the new wording
  if (!city) return "";
  if (city === "All Triangle") return "Research Triangle";
  return city;
}

export default function ResourceHub() {
  // Draft filters (user changes these)
  const [draftFilters, setDraftFilters] = useState({
    search: "",
    category: "All",
    city: "All",
    interest: "All",
    onlyOpenToAllImmigrationStatuses: false,
  });

  // Applied filters (these actually filter results)
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

  const applySearch = () => setAppliedFilters(draftFilters);

  const categories = useMemo(() => {
    // Keep what you have, just normalized + sorted
    const raw = resourcesData.map((r) => r.category).filter(Boolean);
    return Array.from(new Set(raw)).sort();
  }, []);

  const cities = useMemo(() => CITY_OPTIONS, []);

  const interests = useMemo(() => {
    const raw = resourcesData.map((r) => r.interest).filter(Boolean);
    return Array.from(new Set(raw)).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = appliedFilters.search.trim().toLowerCase();

    return resourcesData.filter((r) => {
      const cityNorm = normalizeCity(r.city);

      // Improved search: name + description + category + city + interest
      const haystack = [
        r.name,
        r.description,
        r.category,
        cityNorm,
        r.interest,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !q || haystack.includes(q);

      const matchesCategory =
        appliedFilters.category === "All" || r.category === appliedFilters.category;

      const matchesCity =
        appliedFilters.city === "All" ||
        cityNorm === appliedFilters.city ||
        // If user selects Research Triangle, include entries labeled Durham/Raleigh/Chapel Hill too
        (appliedFilters.city === "Research Triangle" &&
          ["Durham", "Raleigh", "Chapel Hill", "Research Triangle"].includes(cityNorm));

      const matchesInterest =
        appliedFilters.interest === "All" || r.interest === appliedFilters.interest;

      const matchesImmigration =
        !appliedFilters.onlyOpenToAllImmigrationStatuses ||
        r.openToAllImmigrationStatuses === true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCity &&
        matchesInterest &&
        matchesImmigration
      );
    });
  }, [appliedFilters]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Top bar / intro (adds the “explain the page” area you asked for) */}
        <div style={styles.infoBar}>
          <div>
            <h1 style={styles.title}>Resource Hub</h1>
            <p style={styles.subtitle}>
              Search and filter community resources across the Triangle — programs,
              scholarships, volunteering, nonprofits, and support services.
            </p>
          </div>

          <div style={styles.infoStats}>
            <div style={styles.statBox}>
              <div style={styles.statNumber}>{filtered.length}</div>
              <div style={styles.statLabel}>Results</div>
            </div>
            <div style={styles.tipBox}>
              Tip: Use “Open regardless of immigration status” to see resources
              accessible to all residents.
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          categories={categories}
          cities={cities}
          interests={interests}
          filters={draftFilters}
          setFilters={setDraftFilters}
          onSearch={applySearch}
        />

        {/* Results */}
        <div style={styles.resultsRow}>
          <span style={styles.count}>
            Showing {filtered.length} resource{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        <div style={styles.grid}>
          {filtered.map((r) => (
            <ResourceCard key={r.name} resource={r} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    padding: "30px 0",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },

  infoBar: {
    backgroundColor: "white",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "14px",
  },

  title: {
    margin: 0,
    fontSize: "2.2rem",
    color: "#111827",
  },
  subtitle: {
    marginTop: "8px",
    marginBottom: 0,
    color: "#374151",
    maxWidth: "720px",
  },

  infoStats: {
    display: "flex",
    gap: "12px",
    alignItems: "stretch",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  statBox: {
    minWidth: "110px",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "10px 12px",
    textAlign: "center",
  },
  statNumber: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#111827",
    lineHeight: 1.1,
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#374151",
  },
  tipBox: {
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "10px 12px",
    color: "#374151",
    maxWidth: "340px",
    fontSize: "0.92rem",
    display: "flex",
    alignItems: "center",
  },

  resultsRow: {
    marginTop: "14px",
    marginBottom: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  count: {
    color: "#111827",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
  },
};
