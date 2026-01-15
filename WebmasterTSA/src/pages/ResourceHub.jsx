import { useMemo, useState } from "react";
import resourcesData from "../data/resources.json";
import FilterBar from "../components/FilterBar.jsx";
import ResourceCard from "../components/ResourceCard.jsx";

export default function ResourceHub() {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    city: "All",
    interest: "All",
    onlyOpenToAllImmigrationStatuses: false,
  });

  const categories = useMemo(
    () => Array.from(new Set(resourcesData.map((r) => r.category))).sort(),
    []
  );

  const cities = useMemo(
    () => Array.from(new Set(resourcesData.map((r) => r.city))).sort(),
    []
  );

  const interests = useMemo(
    () => Array.from(new Set(resourcesData.map((r) => r.interest))).sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();

    return resourcesData.filter((r) => {
      const matchesSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q);

      const matchesCategory = filters.category === "All" || r.category === filters.category;
      const matchesCity = filters.city === "All" || r.city === filters.city;
      const matchesInterest = filters.interest === "All" || r.interest === filters.interest;

      const matchesImmigration =
        !filters.onlyOpenToAllImmigrationStatuses || r.openToAllImmigrationStatuses === true;

      return matchesSearch && matchesCategory && matchesCity && matchesInterest && matchesImmigration;
    });
  }, [filters]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Resource Hub</h1>
        <p style={styles.subtitle}>
          Use filters to find volunteering, programs, support services, and more across the Triangle.
        </p>

        <FilterBar
          categories={categories}
          cities={cities}
          interests={interests}
          filters={filters}
          setFilters={setFilters}
        />

        <div style={styles.resultsRow}>
          <span style={styles.count}>{filtered.length} results</span>
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
  title: {
    margin: 0,
    fontSize: "2.2rem",
  },
  subtitle: {
    marginTop: "8px",
    color: "#374151",
    marginBottom: "18px",
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
