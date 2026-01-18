import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import nexusLogo from "../assets/nexus-logo.png";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  gray: "#494A48",
  beige: "#F5FCEF",
  text: "#111111",
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    transition: "color 1000ms ease, border-color 1000ms ease, opacity 1000ms ease",
  });

  return (
    <header
      style={{
        ...styles.header,
        backgroundColor: scrolled ? COLORS.gray : COLORS.carolinaBlue,
      }}
    >
      <div style={styles.inner}>
        {/* Logo */}
        <NavLink to="/" style={styles.logoLink} aria-label="Go to Home">
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

        <nav style={styles.nav}>
          
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/mission" style={linkStyle}>Mission</NavLink>
          <NavLink to="/resource-hub" style={linkStyle}>Resource Hub</NavLink>
          <NavLink to="/add-resource" style={linkStyle}>Add Resource</NavLink>
          <NavLink to="/find-ecs" style={linkStyle}>Find Your Path</NavLink>
          <NavLink to="/work-logs" style={linkStyle}>Documentation</NavLink>
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
    justifyContent: "center",
    height: "var(--header-h)",
    transition: "background-color 1100ms ease",
    boxShadow: "0 10px 24px rgba(0,0,0,0.14)",
  },

  inner: {
    maxWidth: "1400px",
    width: "100%",
    height: "var(--header-h)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    boxSizing: "border-box",
    gap: "16px",
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
    marginLeft: "-20px",   
    paddingRight: "12px",
  },

  logoImg: {
    height: "190px",
    width: "auto",
    objectFit: "contain",
    transform: "translateY(2px)",
    transition: "filter 1100ms ease, transform 250ms ease",
  },

  logoImgScrolled: {
    filter: "brightness(0) invert(1)",
  },

  nav: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    flexWrap: "wrap",
  },
};
