import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import academicPrograms from "../data/AcademicProgram.json";
import awards from "../data/Awards.json";
import communityEvents from "../data/CommunityEvents.json";
import nonprofits from "../data/Nonprofits.json";
import scholarships from "../data/Scholarships.json";
import summerPrograms from "../data/SummerPrograms.json";
import supportServices from "../data/SupportServices.json";
import volunteering from "../data/Volunteering.json";

import FilterBar from "../components/FilterBar.jsx";
import ResourceCard from "../components/ResourceCard.jsx";

// ✅ EXACT lists from your rubric
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

// ✅ merge everything into one list
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

export default function ResourceHub() {
  const [draftFilters, setDraftFilters] = useState({
    search: "",
    categories: [], // Type
    cities: [],
    interests: [],
    grades: [],
    onlyOpenToAllImmigrationStatuses: false,
  });

  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
  const applySearch = () => setAppliedFilters(draftFilters);

  // ✅ Use your fixed options, NOT auto-generated from JSON
  const categories = useMemo(() => TYPE_OPTIONS, []);
  const cities = useMemo(() => CITY_OPTIONS, []);
  const interests = useMemo(() => INTEREST_OPTIONS, []);
  const grades = useMemo(() => GRADE_OPTIONS, []);

  const filtered = useMemo(() => {
    const q = appliedFilters.search.trim().toLowerCase();

    return resourcesData.filter((r) => {
      const resourceCities = Array.isArray(r.cities) ? r.cities : [];
      const resourceGrades = Array.isArray(r.grades) ? r.grades : [];

      // search across useful fields
      const haystack = [
        r.name,
        r.description,
        r.category, // Type stored in JSON as "category"
        r.interest, // Area of Interest stored as "interest"
        resourceCities.join(" "),
        resourceGrades.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !q || haystack.includes(q);

      // Type
      const matchesCategory =
        appliedFilters.categories.length === 0 ||
        appliedFilters.categories.includes(r.category);

      // City
      const matchesCity =
        appliedFilters.cities.length === 0 ||
        resourceCities.some((c) => appliedFilters.cities.includes(c));

      // Area of Interest
      const matchesInterest =
        appliedFilters.interests.length === 0 ||
        appliedFilters.interests.includes(r.interest);

      // Grades
      const matchesGrades =
        appliedFilters.grades.length === 0 ||
        resourceGrades.some((g) => appliedFilters.grades.includes(g));

      // Eligibility
      const matchesImmigration =
        !appliedFilters.onlyOpenToAllImmigrationStatuses ||
        r.openToAllImmigrationStatuses === true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCity &&
        matchesInterest &&
        matchesGrades &&
        matchesImmigration
      );
    });
  }, [appliedFilters]);

  const featuredCount = useMemo(
    () => resourcesData.filter((r) => r.featured).length,
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={styles.page}
    >
      <div style={styles.container}>
        <section style={banner.wrap}>
          <div style={banner.left}>
            <div style={banner.kicker}>Triangle Community Resource Hub</div>
            <h1 style={banner.title}>Search local resources in one place.</h1>
            <p style={banner.sub}>
              Filter by type, city, area of interest, grade level, and eligibility to find
              programs, scholarships, volunteering, nonprofits, and support services.
            </p>

            <div style={banner.statsRow}>
              <div style={banner.statCard}>
                <div style={banner.statNum}>{resourcesData.length}</div>
                <div style={banner.statLabel}>Resources listed</div>
              </div>
              <div style={banner.statCard}>
                <div style={banner.statNum}>{featuredCount}</div>
                <div style={banner.statLabel}>Featured picks</div>
              </div>
              <div style={banner.statCard}>
                <div style={banner.statNum}>{filtered.length}</div>
                <div style={banner.statLabel}>Showing now</div>
              </div>
            </div>

            <div style={banner.tip}>
              Tip: Toggle <b>Open regardless of immigration status</b> to highlight resources
              accessible to all residents.
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
              <div style={banner.pill}>Multi-select filters</div>
              <div style={banner.pill}>Grades (9–12)</div>
              <div style={banner.pill}>Keyword search</div>
            </div>
          </div>
        </section>

        <FilterBar
          categories={categories}
          cities={cities}
          interests={interests}
          grades={grades}
          filters={draftFilters}
          setFilters={setDraftFilters}
          onSearch={applySearch}
        />

        <div style={styles.resultsRow}>
          <span style={styles.count}>
            Showing {filtered.length} resource{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        <div style={styles.grid}>
          {filtered.map((r) => (
            <ResourceCard key={`${r.name}-${r.link}`} resource={r} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// styles unchanged
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
    marginBottom: "14px",
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
  title: {
    margin: 0,
    fontSize: "2.2rem",
    lineHeight: 1.1,
    color: "#111827",
    letterSpacing: "-0.01em",
  },
  sub: { margin: 0, color: "#374151", lineHeight: 1.6, maxWidth: "70ch" },
  statsRow: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "6px" },
  statCard: {
    backgroundColor: "white",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "10px 12px",
    minWidth: "140px",
  },
  statNum: { fontSize: "1.35rem", fontWeight: 900, color: "#111827", lineHeight: 1.1 },
  statLabel: { fontSize: "0.9rem", color: "#6B7280", marginTop: "2px" },
  tip: {
    marginTop: "6px",
    backgroundColor: "white",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "10px 12px",
    color: "#374151",
  },
  right: { display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" },
  illus: {
    width: "100%",
    borderRadius: "16px",
    backgroundColor: "white",
    border: "1px solid #E5E7EB",
    padding: "14px",
    boxSizing: "border-box",
  },
  tileRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" },
  tile: {
    height: "62px",
    borderRadius: "14px",
    border: "1px solid #E5E7EB",
    background: "linear-gradient(135deg, rgba(37,99,235,0.10), rgba(30,64,175,0.06))",
  },
  bigBlock: {
    height: "150px",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
    background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(99,102,241,0.06))",
    marginBottom: "10px",
  },
  smallRow: { display: "grid", gridTemplateColumns: "0.7fr 1fr 0.7fr", gap: "10px", alignItems: "end" },
  small: { height: "46px", borderRadius: "14px", border: "1px solid #E5E7EB", backgroundColor: "#F3F4F6" },
  smallTall: { height: "64px", borderRadius: "14px", border: "1px solid #E5E7EB", backgroundColor: "#F3F4F6" },
  miniPills: { display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" },
  pill: {
    backgroundColor: "white",
    border: "1px solid #E5E7EB",
    borderRadius: "999px",
    padding: "6px 10px",
    fontWeight: 800,
    fontSize: "0.85rem",
    color: "#374151",
  },
};
