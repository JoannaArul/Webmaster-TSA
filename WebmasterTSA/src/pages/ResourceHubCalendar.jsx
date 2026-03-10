import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import awards from "../data/Awards.json";
import scholarships from "../data/Scholarships.json";
import summerPrograms from "../data/SummerPrograms.json";
import communityEvents from "../data/CommunityEvents.json";

const DEADLINE_SOURCES = [
  { data: awards,          color: "#E07B54" },
  { data: scholarships,    color: "#4B9CD3" },
  { data: summerPrograms,  color: "#5BAD8F" },
  { data: communityEvents, color: "#9B7FD4" },
];

const C = {
  carolinaBlue: "#4B9CD3",
  headerGray:   "#494A48",
  beige:        "#F5FCEF",
  cardBg:       "#FAFFF6",
  text:         "#000000",
  border:       "#DCE7D1",
  mutedText:    "#6B7C6A",
};

const CATEGORY_COLORS = {};
DEADLINE_SOURCES.forEach(({ data, color }) => {
  if (data.length) CATEGORY_COLORS[data[0].category] = color;
});

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_FULL  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAYS_SHORT = ["S","M","T","W","T","F","S"];
const YEARS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 1 + i);

function parseDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}
function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function firstDayOfMonth(year, month) { return new Date(year, month, 1).getDay(); }

function useIsMobile() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return { isMobile: width < 640, isTablet: width >= 640 && width < 1024, isDesktop: width >= 1024 };
}

function MonthYearPicker({ viewMonth, viewYear, setViewMonth, setViewYear, compact }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const label = compact
    ? `${MONTHS_SHORT[viewMonth]} ${viewYear}`
    : `${MONTHS[viewMonth]} ${viewYear}`;

  return (
    <div ref={ref} style={{ position: "relative", flex: 1, display: "flex", justifyContent: "center" }}>
      <button onClick={() => setOpen(o => !o)} style={{ ...s.monthLabel, fontSize: compact ? "0.9rem" : "1.05rem", minWidth: compact ? 130 : 200 }}>
        {label} <span style={{ fontSize: "0.65rem", marginLeft: 4 }}>▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{ ...s.pickerDropdown, minWidth: compact ? 220 : 280 }}
          >
            <div style={s.pickerCols}>
              <div style={s.pickerCol}>
                {MONTHS.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => { setViewMonth(i); setOpen(false); }}
                    style={{
                      ...s.pickerItem,
                      background: viewMonth === i ? C.carolinaBlue : "transparent",
                      color: viewMonth === i ? "#fff" : C.text,
                      fontWeight: viewMonth === i ? 800 : 500,
                    }}
                  >
                    {compact ? MONTHS_SHORT[i] : m}
                  </button>
                ))}
              </div>
              <div style={{ width: 1, background: C.border, margin: "4px 0" }} />
              <div style={s.pickerCol}>
                {YEARS.map(y => (
                  <button
                    key={y}
                    onClick={() => { setViewYear(y); setOpen(false); }}
                    style={{
                      ...s.pickerItem,
                      background: viewYear === y ? C.carolinaBlue : "transparent",
                      color: viewYear === y ? "#fff" : C.text,
                      fontWeight: viewYear === y ? 800 : 500,
                    }}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EventSheet({ selected, onClose }) {
  if (!selected) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="sheet-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={s.sheetBackdrop}
        onClick={onClose}
      />
      <motion.div
        key="sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        style={s.sheet}
      >
        <div style={s.sheetHandle} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 800, fontSize: "1rem", color: C.text, fontFamily: "'Merriweather', serif" }}>
            {selected.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: C.mutedText }}>✕</button>
        </div>
        <div style={{ overflowY: "auto", maxHeight: "55vh" }}>
          {selected.events.length === 0 ? (
            <p style={{ color: C.mutedText, fontSize: "0.88rem" }}>No deadlines on this day.</p>
          ) : selected.events.map((ev, i) => (
            <div key={i} style={{ ...s.eventCard, borderLeft: `4px solid ${ev._color}`, marginBottom: 10 }}>
              <a href={ev.link || "#"} target="_blank" rel="noopener noreferrer"
                style={{ ...s.eventNameLink, color: ev._color, fontSize: "0.95rem" }}>
                {ev.name} →
              </a>
              <div style={{ ...s.eventCat, color: ev._color }}>{ev.category}</div>
              {ev.interest && <div style={s.eventInterest}>📚 {ev.interest}</div>}
              {ev.description && <div style={s.eventDesc}>{ev.description}</div>}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ResourceHubCalendar() {
  const today = new Date();
  const { isMobile, isTablet, isDesktop } = useIsMobile();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected,  setSelected]  = useState(null);
  const [filterCat, setFilterCat] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const allEvents = useMemo(() => {
    const out = [];
    DEADLINE_SOURCES.forEach(({ data, color }) => {
      data.forEach((item) => {
        const rawDate = item.deadline || item.date;
        const d = parseDate(rawDate);
        if (!d) return;
        out.push({ ...item, _date: d, _color: color });
      });
    });
    return out;
  }, []);

  const categories = useMemo(() => [...new Set(allEvents.map((e) => e.category))], [allEvents]);

  const visibleEvents = useMemo(() =>
    filterCat.length === 0 ? allEvents : allEvents.filter((e) => filterCat.includes(e.category)),
  [allEvents, filterCat]);

  const eventMap = useMemo(() => {
    const map = {};
    visibleEvents.forEach((ev) => {
      const key = ev._date.toISOString().slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    return map;
  }, [visibleEvents]);

  const totalDays   = daysInMonth(viewYear, viewMonth);
  const startOffset = firstDayOfMonth(viewYear, viewMonth);
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }
  function goToToday() { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); }

  function handleCellClick(day) {
    if (!day) return;
    const d = new Date(viewYear, viewMonth, day);
    const key = d.toISOString().slice(0, 10);
    setSelected({ date: d, events: eventMap[key] || [] });
  }

  function toggleCat(cat) {
    setFilterCat(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }

  const upcoming = useMemo(() => {
    const now = new Date();
    const limit = new Date(now);
    limit.setDate(limit.getDate() + 60);
    return visibleEvents
      .filter(e => e._date >= now && e._date <= limit)
      .sort((a, b) => a._date - b._date)
      .slice(0, isMobile ? 5 : 8);
  }, [visibleEvents, isMobile]);

  const dayLabels = isMobile ? DAYS_SHORT : DAYS_FULL;

  const cellMinHeight = isMobile ? 52 : isTablet ? 80 : 110;
  const maxPillsVisible = isMobile ? 0 : isTablet ? 1 : 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={s.page}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .cal-cell {
          cursor: pointer;
          transition: background 150ms ease, box-shadow 150ms ease;
          position: relative;
          border-radius: 8px;
          border: 1px solid transparent;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }
        .cal-cell:hover {
          background: ${C.beige} !important;
          border-color: ${C.carolinaBlue}55;
          box-shadow: 0 3px 10px rgba(75,156,211,0.12);
          z-index: 2;
        }
        .cal-cell:active { opacity: 0.75; }
        .cal-cell.today-cell {
          background: #EBF5FF !important;
          border-color: ${C.carolinaBlue} !important;
        }
        .cal-cell.has-events { background: #F2FBF5; }
        .cal-cell.selected-cell {
          outline: 2px solid ${C.carolinaBlue};
          outline-offset: -1px;
        }

        .ev-pill {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 0.62rem;
          font-weight: 700;
          padding: 2px 4px;
          border-radius: 4px;
          margin: 1px 0;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 120ms;
          line-height: 1.3;
          width: 100%;
        }
        .ev-pill:hover { opacity: 0.72; }
        .ev-pill-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .ev-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          display: block;
        }

        .cat-toggle {
          padding: 5px 11px;
          border-radius: 99px;
          border: 1.5px solid transparent;
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 140ms ease;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }
        .cat-toggle:hover { opacity: 0.82; }

        .upcoming-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 6px;
          border-bottom: 1px solid ${C.border};
          cursor: pointer;
          transition: background 140ms;
          border-radius: 6px;
          -webkit-tap-highlight-color: transparent;
        }
        .upcoming-row:hover, .upcoming-row:active { background: ${C.beige}; }
        .upcoming-row:last-child { border-bottom: none; }

        .filter-panel {
          overflow: hidden;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 4px; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={s.header}>
        <div style={{ ...s.headerInner, flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end" }}>
          <div>
            <h1 style={{ ...s.h1, fontSize: isMobile ? "1.6rem" : "clamp(1.9rem, 4vw, 3rem)" }}>
              <span style={{ color: C.carolinaBlue }}>Resource</span> Calendar
            </h1>
            {!isMobile && (
              <p style={s.sub}>
                Track application deadlines for scholarships, awards, summer programs & events. Click any program name to visit directly.
              </p>
            )}
          </div>

          {isMobile ? (
            <div style={{ width: "100%" }}>
              <button
                onClick={() => setShowFilters(f => !f)}
                style={{ ...s.todayBtn, width: "100%", padding: "10px", fontSize: "0.85rem", marginBottom: showFilters ? 10 : 0 }}
              >
                {showFilters ? "Hide Filters" : `Filter by Category${filterCat.length ? ` (${filterCat.length})` : ""}`}
              </button>
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    className="filter-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ ...s.legendRow, paddingTop: 8 }}>
                      {categories.map(cat => {
                        const col = CATEGORY_COLORS[cat] || C.carolinaBlue;
                        const active = filterCat.length === 0 || filterCat.includes(cat);
                        return (
                          <button key={cat} className="cat-toggle" onClick={() => toggleCat(cat)}
                            style={{ background: active ? col + "20" : "#f0f0f0", borderColor: active ? col : "#ccc", color: active ? col : "#999" }}>
                            <span style={{ marginRight: 4 }}>●</span>{cat}
                          </button>
                        );
                      })}
                      {filterCat.length > 0 && (
                        <button className="cat-toggle" onClick={() => setFilterCat([])}
                          style={{ borderColor: C.mutedText, color: C.mutedText, background: "transparent" }}>
                          Clear
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div style={s.legendRow}>
              {categories.map(cat => {
                const col = CATEGORY_COLORS[cat] || C.carolinaBlue;
                const active = filterCat.length === 0 || filterCat.includes(cat);
                return (
                  <button key={cat} className="cat-toggle" onClick={() => toggleCat(cat)}
                    style={{ background: active ? col + "20" : "#f0f0f0", borderColor: active ? col : "#ccc", color: active ? col : "#999" }}>
                    <span style={{ marginRight: 4 }}>●</span>{cat}
                  </button>
                );
              })}
              {filterCat.length > 0 && (
                <button className="cat-toggle" onClick={() => setFilterCat([])}
                  style={{ borderColor: C.mutedText, color: C.mutedText, background: "transparent" }}>
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ ...s.body, padding: isMobile ? "12px 12px 80px" : "24px 24px 48px" }}>
        <div style={{ display: "flex", gap: 22, alignItems: "flex-start", flexDirection: isDesktop ? "row" : "column" }}>

          {/* ── CALENDAR ── */}
          <div style={{ ...s.calWrap, width: "100%", flex: isDesktop ? "1 1 640px" : "none" }}>
            <div style={s.navBar}>
              <button style={s.navBtn} onClick={prevMonth}>‹</button>
              <MonthYearPicker
                viewMonth={viewMonth}
                viewYear={viewYear}
                setViewMonth={setViewMonth}
                setViewYear={setViewYear}
                compact={isMobile}
              />
              <button style={s.navBtn} onClick={nextMonth}>›</button>
              {!isMobile && (
                <button style={s.todayBtn} onClick={goToToday}>Today</button>
              )}
            </div>

            <div style={s.dayHeaders}>
              {dayLabels.map(d => <div key={d} style={s.dayHeader}>{d}</div>)}
            </div>

            <div style={{ ...s.grid, gap: isMobile ? 2 : 3, padding: isMobile ? 4 : 6 }}>
              {cells.map((day, idx) => {
                if (!day) return <div key={`e-${idx}`} style={{ minHeight: cellMinHeight, borderRadius: 8, background: "#fafafa" }} />;
                const cellDate = new Date(viewYear, viewMonth, day);
                const key = cellDate.toISOString().slice(0, 10);
                const evs = eventMap[key] || [];
                const isToday    = isSameDay(cellDate, today);
                const isSelected = selected && isSameDay(cellDate, selected.date);

                return (
                  <div
                    key={key}
                    className={["cal-cell", isToday ? "today-cell" : "", evs.length ? "has-events" : "", isSelected ? "selected-cell" : ""].join(" ")}
                    style={{ minHeight: cellMinHeight, padding: isMobile ? "4px 3px 3px" : "6px 7px 5px" }}
                    onClick={() => handleCellClick(day)}
                  >
                    <div style={{ ...s.dayNum, ...(isToday ? s.dayNumToday : {}), width: isMobile ? 18 : 22, height: isMobile ? 18 : 22, fontSize: isMobile ? "0.7rem" : "0.8rem" }}>
                      {day}
                    </div>

                    {isMobile ? (
                      evs.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 3 }}>
                          {evs.slice(0, 3).map((ev, i) => (
                            <span key={i} className="ev-dot" style={{ background: ev._color }} />
                          ))}
                          {evs.length > 3 && (
                            <span style={{ fontSize: "0.55rem", color: C.mutedText, fontWeight: 800 }}>+{evs.length - 3}</span>
                          )}
                        </div>
                      )
                    ) : (
                      <>
                        {evs.slice(0, maxPillsVisible).map((ev, i) => (
                          <a
                            key={i}
                            href={ev.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ev-pill"
                            onClick={e => e.stopPropagation()}
                            title={ev.description ? `${ev.name}\n\n${ev.description}` : ev.name}
                            style={{ background: ev._color + "1E", color: ev._color, border: `1px solid ${ev._color}40` }}
                          >
                            <span style={{ flexShrink: 0, fontSize: "0.45rem" }}>●</span>
                            <span className="ev-pill-name">{ev.name}</span>
                          </a>
                        ))}
                        {evs.length > maxPillsVisible && (
                          <div style={{ fontSize: "0.58rem", color: C.mutedText, fontWeight: 700, marginTop: 2, paddingLeft: 2 }}>
                            +{evs.length - maxPillsVisible} more
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {isMobile && (
              <div style={{ padding: "10px 12px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "center" }}>
                <button style={{ ...s.todayBtn, fontSize: "0.8rem" }} onClick={goToToday}>Jump to Today</button>
              </div>
            )}
          </div>

          {/* ── SIDEBAR (desktop/tablet) — hidden on mobile (replaced by bottom sheet) ── */}
          {!isMobile && (
            <aside style={{ ...s.sidebar, width: isTablet ? "100%" : 310 }}>
              <AnimatePresence>
                {selected && (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    style={s.detailPanel}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div style={{ fontWeight: 800, fontSize: "0.95rem", color: C.text, fontFamily: "'Merriweather', serif" }}>
                        {selected.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </div>
                      <button onClick={() => setSelected(null)}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: C.mutedText }}>✕</button>
                    </div>
                    {selected.events.length === 0 ? (
                      <p style={{ color: C.mutedText, fontSize: "0.84rem" }}>No deadlines on this day.</p>
                    ) : selected.events.map((ev, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        style={{ ...s.eventCard, borderLeft: `4px solid ${ev._color}` }}>
                        <a href={ev.link || "#"} target="_blank" rel="noopener noreferrer"
                          style={{ ...s.eventNameLink, color: ev._color }}>{ev.name} →</a>
                        <div style={{ ...s.eventCat, color: ev._color }}>{ev.category}</div>
                        {ev.interest && <div style={s.eventInterest}>📚 {ev.interest}</div>}
                        {ev.description && <div style={s.eventDesc}>{ev.description}</div>}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={s.upcomingPanel}>
                <div style={s.sidebarTitle}>Upcoming (next 60 days)</div>
                {upcoming.length === 0 ? (
                  <p style={{ color: C.mutedText, fontSize: "0.84rem" }}>No upcoming deadlines.</p>
                ) : upcoming.map((ev, i) => (
                  <div key={i} className="upcoming-row"
                    onClick={() => { setViewYear(ev._date.getFullYear()); setViewMonth(ev._date.getMonth()); setSelected({ date: ev._date, events: [ev] }); }}>
                    <div style={{ ...s.dateBadge, background: ev._color + "18", color: ev._color, border: `1.5px solid ${ev._color}55` }}>
                      <div style={{ fontSize: "1rem", fontWeight: 900, lineHeight: 1 }}>{ev._date.getDate()}</div>
                      <div style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase" }}>
                        {MONTHS[ev._date.getMonth()].slice(0, 3)}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <a href={ev.link || "#"} target="_blank" rel="noopener noreferrer"
                        style={{ ...s.eventNameLink, color: ev._color, fontSize: "0.84rem" }}
                        onClick={e => e.stopPropagation()}>{ev.name}</a>
                      <div style={{ ...s.eventCat, color: ev._color }}>{ev.category}</div>
                      {ev.description && (
                        <div style={{ ...s.eventDesc, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {ev.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={s.statsRow}>
                {[
                  { label: "This month", val: allEvents.filter(e => e._date.getMonth() === viewMonth && e._date.getFullYear() === viewYear).length },
                  { label: "Upcoming (60d)", val: upcoming.length },
                ].map(({ label, val }) => (
                  <div key={label} style={s.statCard}>
                    <div style={s.statNum}>{val}</div>
                    <div style={s.statLabel}>{label}</div>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>

        {/* ── MOBILE: Upcoming strip below calendar ── */}
        {isMobile && upcoming.length > 0 && (
          <div style={{ ...s.upcomingPanel, marginTop: 16 }}>
            <div style={s.sidebarTitle}>Upcoming (next 60 days)</div>
            {upcoming.map((ev, i) => (
              <div key={i} className="upcoming-row"
                onClick={() => { setViewYear(ev._date.getFullYear()); setViewMonth(ev._date.getMonth()); setSelected({ date: ev._date, events: [ev] }); }}>
                <div style={{ ...s.dateBadge, background: ev._color + "18", color: ev._color, border: `1.5px solid ${ev._color}55`, width: 38, height: 38 }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 900, lineHeight: 1 }}>{ev._date.getDate()}</div>
                  <div style={{ fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase" }}>
                    {MONTHS[ev._date.getMonth()].slice(0, 3)}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <a href={ev.link || "#"} target="_blank" rel="noopener noreferrer"
                    style={{ ...s.eventNameLink, color: ev._color, fontSize: "0.84rem" }}
                    onClick={e => e.stopPropagation()}>{ev.name}</a>
                  <div style={{ ...s.eventCat, color: ev._color }}>{ev.category}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MOBILE: Stats strip ── */}
        {isMobile && (
          <div style={{ ...s.statsRow, marginTop: 12 }}>
            {[
              { label: "Total", val: allEvents.length },
              { label: "This month", val: allEvents.filter(e => e._date.getMonth() === viewMonth && e._date.getFullYear() === viewYear).length },
              { label: "Next 60d", val: upcoming.length },
            ].map(({ label, val }) => (
              <div key={label} style={s.statCard}>
                <div style={s.statNum}>{val}</div>
                <div style={s.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── MOBILE: Bottom sheet on cell tap ── */}
      {isMobile && <EventSheet selected={selected} onClose={() => setSelected(null)} />}
    </motion.div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    backgroundColor: C.beige,
    fontFamily: "'DM Sans', sans-serif",
    overflowX: "hidden",
  },
  header: {
    borderBottom: `1px solid ${C.border}`,
    background: `linear-gradient(160deg, #fff 0%, ${C.beige} 100%)`,
    padding: "clamp(18px, 4vw, 48px) 0 clamp(14px, 2vw, 24px)",
    boxShadow: "0 2px 18px rgba(0,0,0,0.05)",
  },
  headerInner: {
    maxWidth: 1260,
    margin: "0 auto",
    padding: "0 16px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    gap: 14,
    justifyContent: "space-between",
  },
  h1: {
    margin: 0,
    fontFamily: "'Merriweather', serif",
    fontWeight: 900,
    color: C.text,
    lineHeight: 1.1,
  },
  sub: {
    margin: "8px 0 0",
    color: C.mutedText,
    fontSize: "0.92rem",
    fontWeight: 500,
    maxWidth: "60ch",
  },
  legendRow: { display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center" },
  body: { maxWidth: 1260, margin: "0 auto" },

  calWrap: {
    background: "#fff",
    borderRadius: 14,
    border: `1px solid ${C.border}`,
    boxShadow: "0 8px 30px rgba(0,0,0,0.07)",
    overflow: "hidden",
  },
  navBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 14px",
    borderBottom: `1px solid ${C.border}`,
    background: C.cardBg,
  },
  navBtn: {
    background: "none",
    border: `1.5px solid ${C.border}`,
    borderRadius: 8,
    width: 34,
    height: 34,
    fontSize: "1.2rem",
    cursor: "pointer",
    color: C.headerGray,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    flexShrink: 0,
  },
  monthLabel: {
    fontFamily: "'Merriweather', serif",
    fontWeight: 900,
    color: C.text,
    textAlign: "center",
    background: "none",
    border: `1.5px solid ${C.border}`,
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
    transition: "background 140ms",
  },
  pickerDropdown: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    boxShadow: "0 10px 32px rgba(0,0,0,0.14)",
    zIndex: 200,
    overflow: "hidden",
  },
  pickerCols: { display: "flex", maxHeight: 260 },
  pickerCol: { flex: 1, overflowY: "auto", padding: "6px", display: "flex", flexDirection: "column", gap: 2 },
  pickerItem: {
    width: "100%",
    padding: "7px 10px",
    border: "none",
    borderRadius: 7,
    cursor: "pointer",
    fontSize: "0.8rem",
    fontFamily: "'DM Sans', sans-serif",
    textAlign: "left",
    transition: "background 100ms",
  },
  todayBtn: {
    marginLeft: "auto",
    background: C.carolinaBlue,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "7px 14px",
    fontWeight: 700,
    fontSize: "0.82rem",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    flexShrink: 0,
  },
  dayHeaders: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    borderBottom: `1px solid ${C.border}`,
    background: C.beige,
  },
  dayHeader: {
    padding: "7px 0",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "0.68rem",
    color: C.mutedText,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    background: "#fff",
  },
  dayNum: {
    fontWeight: 700,
    color: C.headerGray,
    marginBottom: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  dayNumToday: { background: C.carolinaBlue, color: "#fff" },

  sidebar: { flexShrink: 0, display: "flex", flexDirection: "column", gap: 14 },
  detailPanel: {
    background: "#fff",
    borderRadius: 14,
    border: `1px solid ${C.border}`,
    padding: "16px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
  },
  eventCard: {
    background: C.cardBg,
    borderRadius: 10,
    padding: "10px 12px",
    marginBottom: 8,
    border: `1px solid ${C.border}`,
  },
  eventNameLink: {
    fontWeight: 800,
    textDecoration: "none",
    display: "block",
    lineHeight: 1.3,
    marginBottom: 3,
    fontSize: "0.9rem",
  },
  eventCat: {
    fontWeight: 700,
    fontSize: "0.67rem",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    marginBottom: 3,
  },
  eventInterest: { fontSize: "0.74rem", color: C.mutedText, fontWeight: 500, marginBottom: 4 },
  eventDesc: { fontSize: "0.77rem", color: C.headerGray, lineHeight: 1.55, marginTop: 4 },

  upcomingPanel: {
    background: "#fff",
    borderRadius: 14,
    border: `1px solid ${C.border}`,
    padding: "16px",
    boxShadow: "0 6px 24px rgba(0,0,0,0.07)",
  },
  sidebarTitle: {
    fontFamily: "'Merriweather', serif",
    fontWeight: 900,
    fontSize: "0.9rem",
    color: C.text,
    marginBottom: 12,
  },
  dateBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statsRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  statCard: {
    flex: "1 1 80px",
    background: "#fff",
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: "12px 10px",
    textAlign: "center",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  statNum: {
    fontSize: "1.4rem",
    fontWeight: 900,
    color: C.carolinaBlue,
    lineHeight: 1,
    fontFamily: "'Merriweather', serif",
  },
  statLabel: {
    fontSize: "0.6rem",
    fontWeight: 700,
    color: C.mutedText,
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  sheetBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    zIndex: 300,
  },
  sheet: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fff",
    borderRadius: "18px 18px 0 0",
    padding: "16px 20px 32px",
    zIndex: 301,
    boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
  },
  sheetHandle: {
    width: 36,
    height: 4,
    background: C.border,
    borderRadius: 99,
    margin: "0 auto 16px",
  },
};
