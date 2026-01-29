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

import AcademicProgramImg from "../assets/AcademicProgram.jpg";
import AwardsImg from "../assets/Awards.jpg";
import CommunityEventsImg from "../assets/CommunityEvents.jpg";
import NonprofitsImg from "../assets/Non-profits.jpg";
import ScholarshipsImg from "../assets/Scholarships.jpg";
import SummerProgramsImg from "../assets/SummerPrograms.jpg";
import SupportServicesImg from "../assets/SupportServices.jpg";
import VolunteeringImg from "../assets/Volunteering.jpg"; 

import ResourceHubBg from "../assets/ResourceHubBackground.jpg";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  headerGray: "#494A48",
  beige: "#F5FCEF", // background of curved areas / page
  cardBg: "#FAFFF6", // inside filter boxes
  text: "#000000",
  border: "#DCE7D1",
};

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
  "Sports & Entertainment",
  "General Scholarships"
];

const GRADE_OPTIONS = ["9", "10", "11", "12"];

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

const CATEGORY_CARDS = [
  { name: "Academic Program", img: AcademicProgramImg },
  { name: "Awards", img: AwardsImg },
  { name: "Community Events", img: CommunityEventsImg },
  { name: "Non-profits", img: NonprofitsImg },
  { name: "Scholarships", img: ScholarshipsImg },
  { name: "Summer Programs", img: SummerProgramsImg },
  { name: "Support Services", img: SupportServicesImg },
  { name: "Volunteering", img: VolunteeringImg },
];

export default function ResourceHub() {
  const [draftFilters, setDraftFilters] = useState({
    search: "",
    categories: [],
    cities: [],
    interests: [],
    grades: [],
    onlyOpenToAllImmigrationStatuses: false,
  });

  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
  const applySearch = () => setAppliedFilters(draftFilters);

  const categories = useMemo(() => TYPE_OPTIONS, []);
  const cities = useMemo(() => CITY_OPTIONS, []);
  const interests = useMemo(() => INTEREST_OPTIONS, []);
  const grades = useMemo(() => GRADE_OPTIONS, []);

  const filtered = useMemo(() => {
    const q = appliedFilters.search.trim().toLowerCase();

    return resourcesData.filter((r) => {
      const resourceCities = Array.isArray(r.cities) ? r.cities : [];
      const resourceGrades = Array.isArray(r.grades) ? r.grades : [];

      const haystack = [
        r.name,
        r.description,
        r.category,
        r.interest,
        resourceCities.join(" "),
        resourceGrades.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !q || haystack.includes(q);

      const matchesCategory =
        appliedFilters.categories.length === 0 ||
        appliedFilters.categories.includes(r.category);

      const matchesCity =
        appliedFilters.cities.length === 0 ||
        resourceCities.some((c) => appliedFilters.cities.includes(c));

      const matchesInterest =
        appliedFilters.interests.length === 0 ||
        appliedFilters.interests.includes(r.interest);

      const matchesGrades =
        appliedFilters.grades.length === 0 ||
        resourceGrades.some((g) => appliedFilters.grades.includes(g));

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

  const marqueeCards = useMemo(
    () => [...CATEGORY_CARDS, ...CATEGORY_CARDS],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={styles.page}
    >
      <style>{`
        @keyframes nexusMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .nexus-marquee {
          overflow: hidden;
          width: 100%;
        }
        .nexus-track {
          display: flex;
          width: max-content;
          animation: nexusMarquee 44s linear infinite;
        }
        .nexus-marquee:hover .nexus-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .nexus-track { animation: none; }
        }

        /* ✅ Responsive resource grid */
        @media (max-width: 980px) {
          .resource-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 620px) {
          .resource-grid { grid-template-columns: 1fr !important; }
        }

        /* ✅ Make FilterBar "inner boxes" lighter background (#FAFFF6) */
        .filterbar, .filter-bar, .filters, .filterWrap, .filter-wrap,
        .filterCard, .filter-card, .filterSection, .filter-section,
        .filterGroup, .filter-group {
          background: ${COLORS.cardBg} !important;
        }
        .filterbar *, .filter-bar *, .filters * {
          box-sizing: border-box;
        }
        input, select, textarea {
          background: ${COLORS.cardBg} !important;
        }

        /* ✅ Make SEARCH button Carolina blue (covers common button patterns) */
        .filters button,
        .filter-bar button,
        .filterbar button,
        .filterWrap button,
        .filter-wrap button,
        button.search,
        button.searchBtn,
        .search-btn {
          background: ${COLORS.carolinaBlue} !important;
          border-color: ${COLORS.carolinaBlue} !important;
          color: ${COLORS.beige} !important;
        }

        /* ✅ Keep "Visit Resource" as a link (not a button) */
        a.visit,
        a.visitResource,
        .visit-resource,
        .resource-card a,
        .resourceCard a,
        .ResourceCard a {
          color: ${COLORS.carolinaBlue} !important;
          background: transparent !important;
          border: none !important;
        }
      `}</style>

      {/* ✅ FULL-WIDTH HERO with IMAGE + BLACK OVERLAY */}
      <section style={hero.fullBleed}>
        <div style={hero.bgImage} />
        <div style={hero.overlay} />

        <div style={hero.inner}>
          <h1 style={hero.title}>
            <span style={{ color: COLORS.carolinaBlue }}>
              Research Triangle Community Resource Hub
            </span>
          </h1>

          {/* ✅ only this text changed to white */}
          <p style={hero.subWhite}>
            Search local resources in one place with Nexus. Filter by type, city,
            area of interest, grade level, and eligibility to find programs,
            scholarships, volunteering, nonprofits, and support services.
          </p>

          <div style={hero.statRow}>
            <div style={hero.statCardBlue}>
              <div style={hero.statNumBlue}>{resourcesData.length}</div>
              <div style={hero.statLabelBlue}>Resources listed</div>
            </div>

            <div style={hero.statCardBlue}>
              <div style={hero.statNumBlue}>{featuredCount}</div>
              <div style={hero.statLabelBlue}>Featured picks</div>
            </div>

            <div style={hero.statCardBlue}>
              <div style={hero.statNumBlue}>{filtered.length}</div>
              <div style={hero.statLabelBlue}>Showing now</div>
            </div>
          </div>
        </div>

        {/* ✅ Moving category row */}
        <div style={hero.bottomArea}>
          <div className="nexus-marquee">
            <div className="nexus-track" style={carousel.track}>
              {marqueeCards.map((c, idx) => (
                <button
                  key={`${c.name}-${idx}`}
                  type="button"
                  onClick={() => {
                    setDraftFilters((prev) => {
                      const already = prev.categories.includes(c.name);
                      const nextCats = already
                        ? prev.categories
                        : [...prev.categories, c.name];
                      return { ...prev, categories: nextCats };
                    });
                  }}
                  style={carousel.card}
                  aria-label={`Filter by ${c.name}`}
                >
                  <div style={carousel.avatar}>
                    <img src={c.img} alt={c.name} style={carousel.avatarImg} />
                    <div style={carousel.avatarOverlay} />
                  </div>
                  <div style={carousel.label}>{c.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={carousel.helperText}></div>
        </div>
      </section>

      {/* keep the rest the same */}
      <div style={styles.container}>
        <div style={styles.filtersWrap}>
          <FilterBar
            categories={categories}
            cities={cities}
            interests={interests}
            grades={grades}
            filters={draftFilters}
            setFilters={setDraftFilters}
            onSearch={applySearch}
          />
        </div>

        <div style={styles.resultsRow}>
          <span style={styles.count}>
            Showing {filtered.length} resource{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="resource-grid" style={styles.grid}>
          {filtered.map((r) => (
            <ResourceCard key={`${r.name}-${r.link}`} resource={r} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: COLORS.beige,
    padding: "0 0 30px",
    overflowX: "hidden",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  filtersWrap: {
    backgroundColor: COLORS.cardBg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "1px",
    padding: "14px",
    boxShadow: "0 12px 26px rgba(0,0,0,0.08)",
    marginTop: "18px",
  },
  resultsRow: {
    marginTop: "14px",
    marginBottom: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  count: {
    color: COLORS.text,
    fontWeight: 900,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "18px",
  },
};

const hero = {
  fullBleed: {
    width: "100%",
    position: "relative",
    paddingTop: "clamp(46px, 6vw, 78px)",
    paddingBottom: "clamp(18px, 3vw, 26px)",
    borderBottom: `1px solid ${COLORS.border}`,
    overflow: "hidden",
  },
  // ✅ background image layer
  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url(${ResourceHubBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transform: "scale(1.02)",
    zIndex: 0,
  },
  // ✅ black overlay
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    zIndex: 1,
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 2,
  },
  title: {
    margin: 0,
    fontSize: "clamp(2.35rem, 5vw, 4rem)",
    lineHeight: 1.03,
    letterSpacing: "-0.02em",
    fontWeight: 900,
    fontFamily: '"Merriweather", serif',
  },
  // ✅ only subtext is white now
  subWhite: {
    marginTop: "18px",
    marginBottom: "22px",
    maxWidth: "70ch",
    color: "#FFFFFF",
    fontSize: "clamp(1.02rem, 1.35vw, 1.18rem)",
    lineHeight: 1.7,
    fontWeight: 600,
  },
  statRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    alignItems: "stretch",
    marginBottom: "clamp(18px, 2.2vw, 26px)",
  },
  statCardBlue: {
    backgroundColor: COLORS.carolinaBlue,
    border: `1px solid ${COLORS.carolinaBlue}`,
    borderRadius: "18px",
    padding: "14px 18px",
    minWidth: "200px",
    flex: "1 1 220px",
    boxShadow: "0 12px 26px rgba(0,0,0,0.10)",
  },
  statNumBlue: {
    fontSize: "1.65rem",
    fontWeight: 900,
    color: COLORS.beige,
    lineHeight: 1.05,
  },
  statLabelBlue: {
    marginTop: "4px",
    fontSize: "1rem",
    fontWeight: 900,
    color: COLORS.beige,
    opacity: 0.95,
  },
  bottomArea: {
    marginTop: "clamp(12px, 2vw, 18px)",
    padding: "0 0 clamp(18px, 2.6vw, 24px)",
    position: "relative",
    zIndex: 2,
  },
};

const carousel = {
  track: {
    gap: "14px",
    padding: "0 20px",
  },
  card: {
    appearance: "none",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.beige,
    borderRadius: "18px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    boxShadow: "0 12px 26px rgba(0,0,0,0.08)",
    minWidth: "280px",
    transition: "transform 180ms ease",
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "999px",
    overflow: "hidden",
    position: "relative",
    flex: "0 0 60px",
    border: `2px solid ${COLORS.border}`,
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transform: "scale(1.03)",
  },
  avatarOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  label: {
    color: COLORS.text,
    fontWeight: 900,
    fontSize: "1.05rem",
    whiteSpace: "nowrap",
  },
  helperText: {
    maxWidth: "1200px",
    margin: "10px auto 0",
    padding: "0 20px",
    boxSizing: "border-box",
    color: COLORS.headerGray,
    fontWeight: 700,
    fontSize: "0.95rem",
  },
};
