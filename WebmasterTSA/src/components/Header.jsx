import { NavLink } from "react-router-dom";

export default function Header() {
  const linkStyle = ({ isActive }) => ({
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    opacity: isActive ? 1 : 0.9,
    borderBottom: isActive ? "2px solid white" : "2px solid transparent",
    paddingBottom: "4px",
  });

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <div style={styles.logo}>Triangle Resource Hub</div>

        <nav style={styles.nav}>
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/resource-hub" style={linkStyle}>Resource Hub</NavLink>
          <NavLink to="/programs" style={linkStyle}>Programs</NavLink>
          <NavLink to="/scholarships" style={linkStyle}>Scholarships</NavLink>
          <NavLink to="/find-ecs" style={linkStyle}>FIND ECS</NavLink>
          <NavLink to="/work-logs" style={linkStyle}>Work Logs</NavLink>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
  },
  inner: {
    maxWidth: "1400px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 20px",
    boxSizing: "border-box",
    gap: "16px",
    flexWrap: "wrap",
  },
  logo: {
    fontWeight: 800,
    fontSize: "1.25rem",
    letterSpacing: "0.2px",
  },
  nav: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
  },
};
