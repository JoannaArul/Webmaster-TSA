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
  { to: "/mission", label: "Mission" },
  { to: "/resource-hub", label: "Resource Hub" },
  { to: "/build-the-hub", label: "Build The Hub" },
  { to: "/find-ecs", label: "Find Your Path" },
  { to: "/work-logs", label: "Documentation" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close menu if clicking outside the header
  useEffect(() => {
    if (!menuOpen) return;

    const onDown = (e) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target)) setMenuOpen(false);
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("touchstart", onDown, { passive: true });

    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("touchstart", onDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);


  const linkStyle = ({ isActive }) => ({
    fontFamily: "var(--font-body)",
    color: scrolled ? COLORS.beige : COLORS.text,
    textDecoration: "none",
    fontWeight: 600,
    opacity: isActive ? 1 : 0.92,
    borderBottom: isActive
      ? `2px solid ${scrolled ? COLORS.beige : COLORS.text}`
      : "2px solid transparent",
    paddingBottom: "4px",
    transition: "color 300ms ease, border-color 300ms ease, opacity 300ms ease",
    whiteSpace: "nowrap",
  });

  const mobileLinkStyle = ({ isActive }) => ({
    fontFamily: "var(--font-body)",
    color: scrolled ? COLORS.beige : COLORS.text,
    textDecoration: "none",
    fontWeight: 700,
    opacity: isActive ? 1 : 0.95,
    padding: "10px 12px",
    borderRadius: "12px",
    border: isActive
      ? `1px solid ${
          scrolled ? "rgba(245,252,239,0.55)" : "rgba(17,17,17,0.18)"
        }`
      : "1px solid transparent",
    backgroundColor: isActive
      ? scrolled
        ? "rgba(245,252,239,0.10)"
        : "rgba(17,17,17,0.06)"
      : "transparent",
  });

  return (
    <header
      ref={headerRef}
      style={{
        ...styles.header,
        backgroundColor: scrolled ? COLORS.gray : COLORS.carolinaBlue,
      }}
    >
      <div style={styles.inner}>
        {/* Logo */}
        <NavLink
          to="/"
          style={styles.logoLink}
          aria-label="Go to Home"
          onClick={() => setMenuOpen(false)}
        >
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

        {/* Desktop Nav */}
        <nav className="nav-desktop" style={styles.navDesktop} aria-label="Primary navigation">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} style={linkStyle}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="menu-btn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            ...styles.menuBtn,
            color: scrolled ? COLORS.beige : COLORS.text,
            borderColor: scrolled
              ? "rgba(245,252,239,0.6)"
              : "rgba(17,17,17,0.25)",
            backgroundColor: scrolled
              ? "rgba(245,252,239,0.08)"
              : "rgba(245,252,239,0.20)",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        style={{
          ...styles.mobilePanel,
          ...(menuOpen ? styles.mobilePanelOpen : styles.mobilePanelClosed),
          backgroundColor: scrolled ? COLORS.gray : COLORS.carolinaBlue,
          borderTop: scrolled
            ? "1px solid rgba(245,252,239,0.20)"
            : "1px solid rgba(17,17,17,0.12)",
        }}
      >
        <nav style={styles.mobileNav} aria-label="Mobile navigation">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              style={mobileLinkStyle}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
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
    flexWrap: "wrap",
  },

  menuBtn: {
    display: "none", // shown by CSS media query
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    border: "1px solid rgba(17,17,17,0.25)",
    cursor: "pointer",
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1,
  },

  mobilePanel: {
    width: "100%",
    overflow: "hidden",
    transition: "max-height 260ms ease, opacity 220ms ease",
    boxShadow: "0 14px 28px rgba(0,0,0,0.16)",
  },

  mobilePanelClosed: {
    maxHeight: 0,
    opacity: 0,
    pointerEvents: "none",
  },

  mobilePanelOpen: {
    maxHeight: 520,
    opacity: 1,
    pointerEvents: "auto",
  },

  mobileNav: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "12px 20px 16px",
    boxSizing: "border-box",
    display: "grid",
    gap: "8px",
  },
};
