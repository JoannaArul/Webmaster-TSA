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
  { to: "/reference-page", label: "Reference Page" },
];

const HUB_MENU = [
  { to: "/resource-hub", label: "Resource Hub", end: true },
  { to: "/resource-hub/calendar", label: "Calendar View" },
  { to: "/path-builder", label: "Path Builder" },
];

const DISCOVER_MENU = [
  { to: "/discover", label: "Discover", end: true },
  { to: "/blog", label: "Blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [hubOpen, setHubOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);

  const [mobileHubOpen, setMobileHubOpen] = useState(false);
  const [mobileDiscoverOpen, setMobileDiscoverOpen] = useState(false);

  const location = useLocation();

  const closeTimerRef = useRef(null);
  const hubCloseTimerRef = useRef(null);
  const discoverCloseTimerRef = useRef(null);

  const hubBtnRef = useRef(null);
  const hubMenuRef = useRef(null);

  const discoverBtnRef = useRef(null);
  const discoverMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) {
        setMenuOpen(false);
        setMobileHubOpen(false);
        setMobileDiscoverOpen(false);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setHubOpen(false);
    setDiscoverOpen(false);
    setMobileHubOpen(false);
    setMobileDiscoverOpen(false);
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
      if (discoverCloseTimerRef.current) window.clearTimeout(discoverCloseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (hubOpen) {
          setHubOpen(false);
          hubBtnRef.current?.focus?.();
        }
        if (discoverOpen) {
          setDiscoverOpen(false);
          discoverBtnRef.current?.focus?.();
        }
      }
    };

    const onPointerDown = (e) => {
      const hubBtn = hubBtnRef.current;
      const hubMenu = hubMenuRef.current;
      const discoverBtn = discoverBtnRef.current;
      const discoverMenu = discoverMenuRef.current;

      const clickedInsideHub =
        (hubBtn && hubBtn.contains(e.target)) ||
        (hubMenu && hubMenu.contains(e.target));

      const clickedInsideDiscover =
        (discoverBtn && discoverBtn.contains(e.target)) ||
        (discoverMenu && discoverMenu.contains(e.target));

      if (!clickedInsideHub) setHubOpen(false);
      if (!clickedInsideDiscover) setDiscoverOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [hubOpen, discoverOpen]);

  const hubIsActive =
    location.pathname === "/resource-hub" || location.pathname === "/path-builder";

  const discoverIsActive =
    location.pathname === "/discover" || location.pathname === "/blog";

  const linkStyle = ({ isActive }) => ({
    fontFamily: "var(--font-body)",
    fontSize: "16px",
    fontWeight: 600,
    color: scrolled ? COLORS.beige : COLORS.text,
    textDecoration: "none",
    opacity: isActive ? 1 : 0.92,
    borderBottom: isActive
      ? `2px solid ${scrolled ? COLORS.beige : COLORS.text}`
      : "2px solid transparent",
    paddingBottom: "4px",
    transition: "color 300ms ease, opacity 300ms ease, border-color 300ms ease",
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
    opacity: hubIsActive ? 1 : 0.92,
    borderBottom: `2px solid ${
      hubIsActive ? (scrolled ? COLORS.beige : COLORS.text) : "transparent"
    }`,
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
    transition: "color 300ms ease, border-color 300ms ease",
    whiteSpace: "nowrap",
    lineHeight: 1,
  };

  const discoverTopLinkStyle = {
    fontFamily: "var(--font-body)",
    fontSize: "16px",
    fontWeight: 600,
    color: scrolled ? COLORS.beige : COLORS.text,
    textDecoration: "none",
    opacity: discoverIsActive ? 1 : 0.92,
    borderBottom: `2px solid ${
      discoverIsActive ? (scrolled ? COLORS.beige : COLORS.text) : "transparent"
    }`,
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
    transition: "color 300ms ease, border-color 300ms ease",
    whiteSpace: "nowrap",
    lineHeight: 1,
  };

  const dropdownItemStyle = ({ isActive }) => ({
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
    display: "block",
  });

  const headerBg = scrolled ? COLORS.gray : COLORS.carolinaBlue;
  const headerText = scrolled ? COLORS.beige : COLORS.text;

  const closeMenu = () => {
    setMenuOpen(false);
    setHubOpen(false);
    setDiscoverOpen(false);
    setMobileHubOpen(false);
    setMobileDiscoverOpen(false);
  };

  const onMobileLinkClick = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setMenuOpen(false);
      setMobileHubOpen(false);
      setMobileDiscoverOpen(false);
    }, 0);
  };

  const openHubSoon = () => {
    if (hubCloseTimerRef.current) window.clearTimeout(hubCloseTimerRef.current);
    setHubOpen(true);
  };

  const closeHubSoon = () => {
    if (hubCloseTimerRef.current) window.clearTimeout(hubCloseTimerRef.current);
    hubCloseTimerRef.current = window.setTimeout(() => setHubOpen(false), 120);
  };

  const openDiscoverSoon = () => {
    if (discoverCloseTimerRef.current) window.clearTimeout(discoverCloseTimerRef.current);
    setDiscoverOpen(true);
  };

  const closeDiscoverSoon = () => {
    if (discoverCloseTimerRef.current) window.clearTimeout(discoverCloseTimerRef.current);
    discoverCloseTimerRef.current = window.setTimeout(() => setDiscoverOpen(false), 120);
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
            <NavLink to="/" style={linkStyle} end>
              Home
            </NavLink>

            <NavLink to="/our-mission" style={linkStyle}>
              Our Mission
            </NavLink>

            <div style={styles.dropdownWrap} onMouseEnter={openHubSoon} onMouseLeave={closeHubSoon}>
              <button
                ref={hubBtnRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={hubOpen}
                onClick={() => {
                  setHubOpen((v) => !v);
                  setDiscoverOpen(false);
                }}
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
                    ...styles.dropdownMenu,
                    backgroundColor: COLORS.beige,
                  }}
                  onMouseEnter={openHubSoon}
                  onMouseLeave={closeHubSoon}
                >
                  {HUB_MENU.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      role="menuitem"
                      style={dropdownItemStyle}
                      onClick={() => setHubOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <div
              style={styles.dropdownWrap}
              onMouseEnter={openDiscoverSoon}
              onMouseLeave={closeDiscoverSoon}
            >
              <button
                ref={discoverBtnRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={discoverOpen}
                onClick={() => {
                  setDiscoverOpen((v) => !v);
                  setHubOpen(false);
                }}
                onFocus={openDiscoverSoon}
                style={discoverTopLinkStyle}
              >
                Discover
                <span
                  aria-hidden="true"
                  style={{
                    fontWeight: 900,
                    transform: discoverOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 180ms ease",
                    display: "inline-block",
                    position: "relative",
                    top: "1px",
                  }}
                >
                  ▾
                </span>
              </button>

              {discoverOpen && (
                <div
                  ref={discoverMenuRef}
                  role="menu"
                  aria-label="Discover menu"
                  style={{
                    ...styles.dropdownMenu,
                    backgroundColor: COLORS.beige,
                  }}
                  onMouseEnter={openDiscoverSoon}
                  onMouseLeave={closeDiscoverSoon}
                >
                  {DISCOVER_MENU.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      role="menuitem"
                      style={dropdownItemStyle}
                      onClick={() => setDiscoverOpen(false)}
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
              setDiscoverOpen(false);
              setMobileHubOpen(false);
              setMobileDiscoverOpen(false);
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
              <NavLink to="/" style={mobileLinkStyle} onClick={onMobileLinkClick} end>
                Home
              </NavLink>

              <NavLink to="/our-mission" style={mobileLinkStyle} onClick={onMobileLinkClick}>
                Our Mission
              </NavLink>

              <div style={styles.mobileSection}>
                <button
                  type="button"
                  onClick={() => setMobileHubOpen((v) => !v)}
                  aria-expanded={mobileHubOpen}
                  style={{
                    ...styles.mobileSectionToggle,
                    ...(hubIsActive ? styles.mobileSectionToggleActive : {}),
                  }}
                >
                  <span>Resource Hub</span>
                  <span
                    aria-hidden="true"
                    style={{
                      transform: mobileHubOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 180ms ease",
                      display: "inline-block",
                    }}
                  >
                    ▾
                  </span>
                </button>

                <div
                  style={{
                    ...styles.mobileSubmenu,
                    maxHeight: mobileHubOpen ? "320px" : "0px",
                    opacity: mobileHubOpen ? 1 : 0,
                    marginTop: mobileHubOpen ? "6px" : "0px",
                  }}
                >
                  {HUB_MENU.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      style={mobileLinkStyle}
                      onClick={onMobileLinkClick}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div style={styles.mobileSection}>
                <button
                  type="button"
                  onClick={() => setMobileDiscoverOpen((v) => !v)}
                  aria-expanded={mobileDiscoverOpen}
                  style={{
                    ...styles.mobileSectionToggle,
                    ...(discoverIsActive ? styles.mobileSectionToggleActive : {}),
                  }}
                >
                  <span>Discover</span>
                  <span
                    aria-hidden="true"
                    style={{
                      transform: mobileDiscoverOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 180ms ease",
                      display: "inline-block",
                    }}
                  >
                    ▾
                  </span>
                </button>

                <div
                  style={{
                    ...styles.mobileSubmenu,
                    maxHeight: mobileDiscoverOpen ? "220px" : "0px",
                    opacity: mobileDiscoverOpen ? 1 : 0,
                    marginTop: mobileDiscoverOpen ? "6px" : "0px",
                  }}
                >
                  {DISCOVER_MENU.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      style={mobileLinkStyle}
                      onClick={onMobileLinkClick}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
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

  dropdownWrap: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
  },

  dropdownMenu: {
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
    display: "grid",
    gap: "0px",
  },

  mobileSectionToggle: {
    fontFamily: "var(--font-body)",
    color: COLORS.text,
    backgroundColor: "transparent",
    border: "1px solid transparent",
    textAlign: "left",
    fontWeight: 800,
    fontSize: "inherit",
    padding: "12px 14px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  },

  mobileSectionToggleActive: {
    border: "1px solid rgba(17,17,17,0.18)",
    backgroundColor: "rgba(17,17,17,0.06)",
  },

  mobileSubmenu: {
    overflow: "hidden",
    display: "grid",
    gap: "8px",
    paddingLeft: "14px",
    transition: "max-height 260ms ease, opacity 220ms ease, margin-top 220ms ease",
  },
};

const css = `
  @media (max-width: 860px) {
    .nav-desktop { display: none !important; }
    .menu-btn { display: grid !important; place-items: center; }
  }
`;