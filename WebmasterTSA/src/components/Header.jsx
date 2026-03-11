import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import nexusLogo from "../assets/nexus-logo.png";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  gray: "#494A48",
  beige: "#F5FCEF",
  text: "#111111",
};

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/our-mission", label: "Our Mission" },
  { to: "/grow-the-hub", label: "Grow the Hub" },
  { to: "/discover", label: "Discover" },
  { to: "/reference-page", label: "Reference Page" },
];

const HUB_MENU = [
  { to: "/resource-hub", label: "Resource Hub" },
  { to: "/resource-hub/calendar", label: "Calendar View" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hubOpen, setHubOpen] = useState(false);

  const location = useLocation();
  const closeTimerRef = useRef(null);
  const hubCloseTimerRef = useRef(null);
  const hubBtnRef = useRef(null);
  const hubMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setHubOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      if (hubCloseTimerRef.current) window.clearTimeout(hubCloseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!hubOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setHubOpen(false);
        hubBtnRef.current?.focus?.();
      }
    };

    const onPointerDown = (e) => {
      const btn = hubBtnRef.current;
      const menu = hubMenuRef.current;
      if (!btn || !menu) return;
      if (btn.contains(e.target) || menu.contains(e.target)) return;
      setHubOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [hubOpen]);

  const hubIsActive =
    location.pathname === "/resource-hub" || location.pathname.startsWith("/resource-hub/");

  const linkStyle = () => ({
    fontFamily: "var(--font-body)",
    fontSize: "16px",
    fontWeight: 600,
    color: scrolled ? COLORS.beige : COLORS.text,
    textDecoration: "none",
    opacity: 0.92,
    borderBottom: "2px solid transparent",
    paddingBottom: "4px",
    transition: "color 300ms ease, opacity 300ms ease",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
    lineHeight: 1,
  });

  const hubTopLinkStyle = {
    fontFamily: "var(--font-body)",
    fontSize: "16px",
    fontWeight: 600,
    color: scrolled ? COLORS.beige : COLORS.text,
    textDecoration: "none",
    opacity: 0.92,
    borderBottom: "2px solid transparent",
    padding: "0",
    paddingBottom: "4px",
    margin: "0",
    height: "100%",
    background: "none",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    transition: "color 300ms ease",
    whiteSpace: "nowrap",
    lineHeight: 1,
  };

  const hubItemStyle = ({ isActive }) => ({
    fontFamily: "var(--font-body)",
    color: COLORS.text,
    textDecoration: "none",
    fontWeight: 800,
    padding: "10px 12px",
    borderRadius: "12px",
    backgroundColor: isActive ? "rgba(17,17,17,0.06)" : "transparent",
    border: isActive ? "1px solid rgba(17,17,17,0.18)" : "1px solid transparent",
    display: "block",
    whiteSpace: "nowrap",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  });

  const mobileLinkStyle = ({ isActive }) => ({
    fontFamily: "var(--font-body)",
    color: COLORS.text,
    textDecoration: "none",
    fontWeight: 800,
    opacity: isActive ? 1 : 0.96,
    padding: "12px 14px",
    borderRadius: "12px",
    border: isActive ? "1px solid rgba(17,17,17,0.18)" : "1px solid transparent",
    backgroundColor: isActive ? "rgba(17,17,17,0.06)" : "transparent",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  });

  const headerBg = scrolled ? COLORS.gray : COLORS.carolinaBlue;
  const headerText = scrolled ? COLORS.beige : COLORS.text;

  const closeMenu = () => {
    setMenuOpen(false);
    setHubOpen(false);
  };

  const onMobileLinkClick = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setMenuOpen(false), 0);
  };

  const openHubSoon = () => {
    if (hubCloseTimerRef.current) window.clearTimeout(hubCloseTimerRef.current);
    setHubOpen(true);
  };

  const closeHubSoon = () => {
    if (hubCloseTimerRef.current) window.clearTimeout(hubCloseTimerRef.current);
    hubCloseTimerRef.current = window.setTimeout(() => setHubOpen(false), 120);
  };

  return (
    <>
      <style>{css}</style>

      <header
        style={{
          ...styles.header,
          backgroundColor: headerBg,
        }}
      >
        <div style={styles.inner}>
          <NavLink to="/" style={styles.logoLink} aria-label="Go to Home" onClick={closeMenu}>
            <div style={styles.logoFrame}>
              <img
                src={nexusLogo}
                alt="Nexus"
                style={{
                  ...styles.logoImg,
                  ...(scrolled ? styles.logoImgScrolled : {}),
                }}
              />
            </div>
          </NavLink>

          <nav className="nav-desktop" style={styles.navDesktop} aria-label="Primary navigation">
            <NavLink to="/" style={linkStyle}>
              Home
            </NavLink>

            <NavLink to="/our-mission" style={linkStyle}>
              Our Mission
            </NavLink>

            <div style={styles.hubWrap} onMouseEnter={openHubSoon} onMouseLeave={closeHubSoon}>
              <button
                ref={hubBtnRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={hubOpen}
                onClick={() => setHubOpen((v) => !v)}
                onFocus={openHubSoon}
                style={hubTopLinkStyle}
              >
                Resource Hub
                <span
                  aria-hidden="true"
                  style={{
                    fontWeight: 900,
                    transform: hubOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 180ms ease",
                    display: "inline-block",
                    position: "relative",
                    top: "1px",
                  }}
                >
                  ▾
                </span>
              </button>

              {hubOpen && (
                <div
                  ref={hubMenuRef}
                  role="menu"
                  aria-label="Resource Hub menu"
                  style={{
                    ...styles.hubMenu,
                    backgroundColor: COLORS.beige,
                  }}
                  onMouseEnter={openHubSoon}
                  onMouseLeave={closeHubSoon}
                >
                  {HUB_MENU.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      role="menuitem"
                      style={hubItemStyle}
                      onClick={() => setHubOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.filter((x) => x.to !== "/" && x.to !== "/our-mission").map((l) => (
              <NavLink key={l.to} to={l.to} style={linkStyle}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((v) => !v);
              setHubOpen(false);
            }}
            style={{
              ...styles.menuBtn,
              color: headerText,
              borderColor: scrolled ? "rgba(245,252,239,0.6)" : "rgba(17,17,17,0.25)",
              backgroundColor: scrolled ? "rgba(245,252,239,0.08)" : "rgba(245,252,239,0.20)",
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          style={styles.overlay}
          onMouseDown={closeMenu}
          onTouchStart={closeMenu}
          aria-hidden="true"
        >
          <div
            style={{
              ...styles.mobilePanel,
              backgroundColor: COLORS.beige,
            }}
            role="dialog"
            aria-label="Mobile navigation"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <nav style={styles.mobileNav}>
              <NavLink to="/" style={mobileLinkStyle} onClick={onMobileLinkClick}>
                Home
              </NavLink>

              <NavLink to="/our-mission" style={mobileLinkStyle} onClick={onMobileLinkClick}>
                Our Mission
              </NavLink>

              <div style={styles.mobileSection}>
                <div style={styles.mobileSectionTitle}>Resource Hub</div>
                {HUB_MENU.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    style={mobileLinkStyle}
                    onClick={onMobileLinkClick}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              {NAV_LINKS.filter((x) => x.to !== "/" && x.to !== "/our-mission").map((l) => (
                <NavLink key={l.to} to={l.to} style={mobileLinkStyle} onClick={onMobileLinkClick}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  header: {
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "background-color 400ms ease",
    boxShadow: "0 10px 24px rgba(0,0,0,0.14)",
  },

  inner: {
    maxWidth: "1400px",
    width: "100%",
    height: "var(--header-h)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxSizing: "border-box",
    gap: "16px",
    margin: "0 auto",
  },

  logoLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },

  logoFrame: {
    height: "var(--header-h)",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    paddingRight: "12px",
    maxWidth: "50vw",
  },

  logoImg: {
    height: "190px",
    width: "auto",
    objectFit: "contain",
    transform: "translateY(2px)",
    transition: "filter 400ms ease, transform 250ms ease",
  },

  logoImgScrolled: {
    filter: "brightness(0) invert(1)",
  },

  navDesktop: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    flexWrap: "nowrap",
    height: "100%",
  },

  hubWrap: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
  },

  hubMenu: {
    position: "absolute",
    top: "calc(100% + 10px)",
    left: 0,
    minWidth: "220px",
    padding: "10px",
    borderRadius: "16px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
    border: "1px solid rgba(0,0,0,0.10)",
    display: "grid",
    gap: "8px",
    zIndex: 10000,
  },

  menuBtn: {
    display: "none",
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    border: "1px solid rgba(17,17,17,0.25)",
    cursor: "pointer",
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1,
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9998,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingTop: "var(--header-h)",
  },

  mobilePanel: {
    width: "100%",
    maxHeight: "calc(100vh - var(--header-h))",
    overflow: "auto",
    boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
    borderTop: "1px solid rgba(0,0,0,0.10)",
  },

  mobileNav: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "12px 20px 16px",
    boxSizing: "border-box",
    display: "grid",
    gap: "8px",
  },

  mobileSection: {
    padding: "6px 0 6px",
    display: "grid",
    gap: "8px",
  },

  mobileSectionTitle: {
    fontFamily: "var(--font-body)",
    fontWeight: 900,
    color: "rgba(17,17,17,0.70)",
    padding: "8px 14px 0",
    letterSpacing: "0.2px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
};

const css = `
  @media (max-width: 860px) {
    .nav-desktop { display: none !important; }
    .menu-btn { display: grid !important; place-items: center; }
  }
`;