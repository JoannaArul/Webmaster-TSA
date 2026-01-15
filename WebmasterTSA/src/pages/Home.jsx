import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const highlights = [
  {
    name: "Volunteer Programs",
    category: "Volunteering",
    description: "Find local volunteering opportunities in the Triangle area.",
    link: "#",
  },
  {
    name: "Scholarships",
    category: "Financial Aid",
    description: "Explore local scholarships available for students of all backgrounds.",
    link: "#",
  },
  {
    name: "Extracurricular Activities",
    category: "Clubs & Competitions",
    description: "Discover clubs, competitions, and workshops to enhance your profile.",
    link: "#",
  },
];

export default function Home() {
  return (
    <div style={{ ...styles.page, maxWidth: "100vw" }}>
      {/* Header / Navbar */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>Triangle Resource Hub</div>
          <nav style={styles.nav}>
            <nav style={styles.nav}>
              <NavLink to="/" style={styles.navLink}>Home</NavLink>
              <NavLink to="/resource-hub" style={styles.navLink}>Resource Hub</NavLink><NavLink to="/programs" style={styles.navLink}>Programs</NavLink>
              <NavLink to="/scholarships" style={styles.navLink}>Scholarships</NavLink>
              <NavLink to="/find-ecs" style={styles.navLink}>FIND ECS</NavLink>
              <NavLink to="/work-logs" style={styles.navLink}>Work Logs</NavLink>
            </nav>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.hero}
      >
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>
            Connecting the Research Triangle to Local Resources
          </h1>
          <p style={styles.heroSubtitle}>
            A hub for residents to find volunteering opportunities, community organizations,
            support services, programs, and scholarships
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.primaryButton}>Explore Resources</button>
            <button style={styles.secondaryButton}>Request/Add Resource</button>
          </div>
        </div>
      </motion.section>

      {/* Highlights Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={styles.section}
      >
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>What You’ll Find</h2>
          <div style={styles.cardGrid}>
            {highlights.map((item, idx) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={idx}
                style={styles.card}
              >
                <h3>{item.name}</h3>
                <p style={styles.cardCategory}>{item.category}</p>
                <p>{item.description}</p>
                <a href={item.link} style={styles.cardLink}>Learn More</a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Accessibility / Immigration Callout */}
      <section style={styles.callout}>
        <div style={styles.container}>
          <p style={styles.calloutText}>
            We recognize that many residents face barriers due to immigration status.
            This hub highlights resources that are accessible to all residents,
            regardless of citizenship or permanent residency.
          </p>
          <p style={styles.calloutSubtext}>
            Use the filter to view only resources open regardless of citizenship/residency/immigration status.
          </p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f9fafb",
    width: "100%",
    overflowX: "hidden",
  },
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
  headerInner: {
    maxWidth: "1400px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  nav: {
    display: "flex",
    gap: "25px",
    paddingRight: "20px", 
    boxSizing: "border-box",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
  },
  hero: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "white",
    padding: "50px 0",
  },
  heroTitle: {
    fontSize: "2.8rem",
    marginBottom: "20px",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  heroButtons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    boxSizing: "border-box",
  },
  primaryButton: {
    padding: "12px 25px",
    backgroundColor: "white",
    color: "#2563eb",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  secondaryButton: {
    padding: "12px 25px",
    backgroundColor: "transparent",
    border: "2px solid white",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  section: {
    width: "100%",
    padding: "70px 0",
  },
  container: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "40px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    width: "100%",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  cardCategory: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "10px",
  },
  cardLink: {
    marginTop: "15px",
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "bold",
  },
  callout: {
    width: "100%",
    backgroundColor: "#667694ff",
    padding: "50px 0",
  },
  calloutText: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  calloutSubtext: {
    fontSize: "1rem",
  },
};
