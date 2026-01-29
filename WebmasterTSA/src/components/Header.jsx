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
  { to: "/the-hub", label: "The Hub" },
  { to: "/grow-the-hub", label: "Grow the Hub" },
  { to: "/discover", label: "Discover" },
  { to: "/reference-page", label: "Reference Page" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const closeTimerRef = useRef(null);

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
    };
  }, []);

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

  const closeMenu = () => setMenuOpen(false);

  const onMobileLinkClick = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setMenuOpen(false), 0);
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
          <NavLink
            to="/"
            style={styles.logoLink}
            aria-label="Go to Home"
            onClick={closeMenu}
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

          <nav className="nav-desktop" style={styles.navDesktop} aria-label="Primary navigation">
            {NAV_LINKS.map((l) => (
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
            onClick={() => setMenuOpen((v) => !v)}
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
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  style={mobileLinkStyle}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={onMobileLinkClick}
                >
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
    flexWrap: "wrap",
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
};

const css = `
  @media (max-width: 860px) {
    .nav-desktop { display: none !important; }
    .menu-btn { display: grid !important; place-items: center; }
  }
`;
