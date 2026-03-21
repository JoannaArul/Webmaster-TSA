import { useEffect, useMemo, useState } from "react";
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

import AcademicProgramImg from "../assets/AcademicProgram.webp";
import AwardsImg from "../assets/Awards.webp";
import CommunityEventsImg from "../assets/CommunityEvents.webp";
import NonprofitsImg from "../assets/Non-profits.webp";
import ScholarshipsImg from "../assets/Scholarships.webp";
import SummerProgramsImg from "../assets/SummerPrograms.webp";
import SupportServicesImg from "../assets/SupportServices.webp";
import VolunteeringImg from "../assets/Volunteering.webp";
import ResourceHubBg from "../assets/ResourceHubBackground.webp";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  headerGray: "#494A48",
  pageBg: "#F0EBE3",
  lightBg: "#FAF7F4",
  border: "#E2D5C8",
  text: "#000000",
};

const PAGE_SIZE = 30;

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
  "General Scholarships",
];

const GRADE_OPTIONS = ["9", "10", "11", "12"];

const ALL_IMAGES = [
  ResourceHubBg,
  AcademicProgramImg,
  AwardsImg,
  CommunityEventsImg,
  NonprofitsImg,
  ScholarshipsImg,
  SummerProgramsImg,
  SupportServicesImg,
  VolunteeringImg,
];

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

// Preloads all images and returns a lookup function
function useImagePreload(srcs) {
  const [loadedMap, setLoadedMap] = useState({});

  useEffect(() => {
    srcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () =>
        setLoadedMap((prev) => ({ ...prev, [src]: true }));
    });
  }, []);

  return (src) => !!loadedMap[src];
}

export default function ResourceHub() {
  const isLoaded = useImagePreload(ALL_IMAGES);

  const [draftFilters, setDraftFilters] = useState({
    search: "",
    categories: [],
    cities: [],
    interests: [],
    grades: [],
    onlyOpenToAllImmigrationStatuses: false,
  });

  const [appliedFilters, setAppliedFilters] = useState(draftFilters);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const applySearch = () => {
    setAppliedFilters(draftFilters);
    setVisibleCount(PAGE_SIZE);
  };

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
        r.name, r.description, r.category, r.interest,
        resourceCities.join(" "), resourceGrades.join(" "),
      ].filter(Boolean).join(" ").toLowerCase();

      const matchesSearch = !q || haystack.includes(q);
      const matchesCategory = appliedFilters.categories.length === 0 || appliedFilters.categories.includes(r.category);
      const matchesCity = appliedFilters.cities.length === 0 || resourceCities.some((c) => appliedFilters.cities.includes(c));
      const matchesInterest = appliedFilters.interests.length === 0 || appliedFilters.interests.includes(r.interest);
      const matchesGrades = appliedFilters.grades.length === 0 || resourceGrades.some((g) => appliedFilters.grades.includes(g));
      const matchesImmigration = !appliedFilters.onlyOpenToAllImmigrationStatuses || r.openToAllImmigrationStatuses === true;
      return matchesSearch && matchesCategory && matchesCity && matchesInterest && matchesGrades && matchesImmigration;
    });
  }, [appliedFilters]);

  const featuredCount = useMemo(() => resourcesData.filter((r) => r.featured).length, []);
  const marqueeCards = useMemo(() => [...CATEGORY_CARDS, ...CATEGORY_CARDS], []);

  const showing = Math.min(visibleCount, filtered.length);
  const total = filtered.length;
  const hasMore = visibleCount < total;
  const progressPct = total === 0 ? 100 : Math.round((showing / total) * 100);

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes nexusMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .nexus-marquee { overflow: hidden; width: 100%; }
        .nexus-track {
          display: flex;
          width: max-content;
          animation: nexusMarquee 44s linear infinite;
        }
        .nexus-marquee:hover .nexus-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .nexus-track { animation: none; } }

        .resource-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        @media (max-width: 980px) {
          .resource-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 620px) {
          .resource-grid { grid-template-columns: 1fr !important; }
        }

        .filters-outer,
        .filters-outer > *,
        .filters-outer div,
        .filters-outer input,
        .filters-outer select,
        .filters-outer textarea,
        .filters-outer label,
        .filters-outer span {
          background-color: ${COLORS.lightBg} !important;
        }
        .filters-outer input[type="checkbox"] {
          accent-color: ${COLORS.carolinaBlue};
          background-color: ${COLORS.lightBg} !important;
        }
        .filters-outer button {
          background-color: ${COLORS.carolinaBlue} !important;
          border-color: ${COLORS.carolinaBlue} !important;
          color: #fff !important;
        }
        .filters-outer button:last-of-type {
          background-color: transparent !important;
          border: 1px solid ${COLORS.border} !important;
          color: ${COLORS.text} !important;
        }

        .rcard-wrap {
          background-color: ${COLORS.lightBg};
          border: 1px solid ${COLORS.border};
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          transition: box-shadow 180ms ease, transform 180ms ease;
          overflow: hidden;
        }
        .rcard-wrap:hover {
          box-shadow: 0 6px 22px rgba(75,156,211,0.18);
          transform: translateY(-2px);
        }
        .rcard-inner {
          flex: 1;
          padding: 18px 18px 10px 18px;
        }
        .rcard-inner > * {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .rcard-inner a[href],
        .rcard-inner a {
          display: none !important;
        }
        .rcard-footer {
          padding: 10px 18px 16px 18px;
          border-top: 1px solid ${COLORS.border};
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .prog-track {
          width: 100%;
          max-width: 420px;
          height: 7px;
          background: ${COLORS.border};
          border-radius: 99px;
          overflow: hidden;
        }
        .prog-fill {
          height: 100%;
          background: ${COLORS.carolinaBlue};
          border-radius: 99px;
          transition: width 350ms ease;
        }

        .load-more-btn {
          display: block;
          width: 100%;
          max-width: 480px;
          padding: 15px 0;
          background: transparent;
          border: 2px solid #111;
          border-radius: 0;
          font-size: 0.88rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #111;
          cursor: pointer;
          transition: background 180ms ease, color 180ms ease;
        }
        .load-more-btn:hover {
          background: #111;
          color: ${COLORS.lightBg};
        }

        /* Hero stat cards responsive */
        @media (max-width: 640px) {
          .hero-stat-row { flex-direction: column !important; }
          .hero-stat-card { min-width: unset !important; flex: 1 1 100% !important; }
        }

        @media (max-width: 600px) {
          .load-more-btn, .prog-track { max-width: 100%; }
        }

        /* Carousel cards smaller on mobile */
        @media (max-width: 480px) {
          .nexus-card { min-width: 200px !important; padding: 10px 12px !important; }
          .nexus-avatar { width: 44px !important; height: 44px !important; flex: 0 0 44px !important; }
          .nexus-label { font-size: 0.9rem !important; }
        }
      `}</style>

      <section style={hero.fullBleed}>
        {/* Background image — fades in once loaded */}
        <div
          style={{
            ...hero.bgImage,
            backgroundImage: isLoaded(ResourceHubBg)
              ? `url(${ResourceHubBg})`
              : "none",
            backgroundColor: "#1a2e42",
            opacity: isLoaded(ResourceHubBg) ? 1 : 1,
            transition: "background-image 0.25s ease",
          }}
        />
        <div style={hero.overlay} />

        <div style={hero.inner}>
          <h1 style={hero.title}>
            <span style={{ color: COLORS.carolinaBlue }}>
              Research Triangle Community Resource Hub
            </span>
          </h1>

          <p style={hero.subWhite}>
            Search local resources in one place with Nexus. Filter by type, city,
            area of interest, grade level, and eligibility to find programs,
            scholarships, volunteering, nonprofits, support services, and more.
          </p>

          <div className="hero-stat-row" style={hero.statRow}>
            <div className="hero-stat-card" style={hero.statCardBlue}>
              <div style={hero.statNumBlue}>{resourcesData.length}</div>
              <div style={hero.statLabelBlue}>Resources listed</div>
            </div>
            <div className="hero-stat-card" style={hero.statCardBlue}>
              <div style={hero.statNumBlue}>{featuredCount}</div>
              <div style={hero.statLabelBlue}>Featured picks</div>
            </div>
            <div className="hero-stat-card" style={hero.statCardBlue}>
              <div style={hero.statNumBlue}>{filtered.length}</div>
              <div style={hero.statLabelBlue}>Showing now</div>
            </div>
          </div>
        </div>

        <div style={hero.bottomArea}>
          <div className="nexus-marquee">
            <div className="nexus-track" style={carousel.track}>
              {marqueeCards.map((c, idx) => (
                <button
                  key={`${c.name}-${idx}`}
                  type="button"
                  className="nexus-card"
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
                  <div className="nexus-avatar" style={carousel.avatar}>
                    <img
                      src={c.img}
                      alt={c.name}
                      style={{
                        ...carousel.avatarImg,
                        opacity: isLoaded(c.img) ? 1 : 0,
                        transition: "opacity 0.25s ease",
                      }}
                    />
                    <div style={carousel.avatarOverlay} />
                  </div>
                  <div className="nexus-label" style={carousel.label}>{c.name}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={carousel.helperText}></div>
        </div>
      </section>

      <div style={styles.container}>
        <div
          className="filters-outer"
          style={{
            backgroundColor: COLORS.lightBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "1px",
            padding: "14px",
            boxShadow: "0 12px 26px rgba(0,0,0,0.08)",
            marginTop: "18px",
          }}
        >
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
            Showing {showing} of {total} resource{total === 1 ? "" : "s"}
          </span>
        </div>

        <div className="resource-grid">
          {filtered.slice(0, visibleCount).map((r) => (
            <div key={`${r.name}-${r.link}`} className="rcard-wrap">
              <div className="rcard-inner">
                <ResourceCard resource={r} />
              </div>
              <div className="rcard-footer">
                {r.link ? (
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: COLORS.carolinaBlue,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                    }}
                  >
                    Visit Resource →
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {total > 0 && (
          <div style={styles.loadMoreSection}>
            <p style={styles.showingLabel}>
              Showing {showing} of {total} resources
            </p>
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${progressPct}%` }} />
            </div>
            {hasMore && (
              <button
                type="button"
                className="load-more-btn"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              >
                Load more resources
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: COLORS.pageBg,
    padding: "0 0 48px",
    overflowX: "hidden",
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
    flexWrap: "wrap",
    gap: "10px",
  },
  count: {
    color: COLORS.text,
    fontWeight: 900,
    fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
  },
  loadMoreSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    marginTop: "44px",
    padding: "0 20px 8px",
  },
  showingLabel: {
    margin: 0,
    fontSize: "clamp(0.85rem, 1.6vw, 0.95rem)",
    fontWeight: 600,
    color: COLORS.headerGray,
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
  bgImage: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transform: "scale(1.02)",
    zIndex: 0,
  },
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
    fontSize: "clamp(1.8rem, 5vw, 4rem)",
    lineHeight: 1.03,
    letterSpacing: "-0.02em",
    fontWeight: 900,
    fontFamily: '"Merriweather", serif',
  },
  subWhite: {
    marginTop: "18px",
    marginBottom: "22px",
    maxWidth: "70ch",
    color: "#FFFFFF",
    fontSize: "clamp(0.95rem, 1.35vw, 1.18rem)",
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
    fontSize: "clamp(1.3rem, 2.5vw, 1.65rem)",
    fontWeight: 900,
    color: "#F0FAE8",
    lineHeight: 1.05,
  },
  statLabelBlue: {
    marginTop: "4px",
    fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
    fontWeight: 900,
    color: "#F0FAE8",
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
    backgroundColor: COLORS.lightBg,
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
    backgroundColor: "#1a2e42",
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