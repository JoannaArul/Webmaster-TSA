import { motion } from "framer-motion";
import referenceHero from "../assets/ReferenceImage.jpg";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  beige: "#F5FCEF",
  beigeLight: "#FAFFF6",
  black: "#000000",
};

export default function Documentation() {
  const requiredLinks = [
    { label: "Student Copyright Checklist", href: "/docs/StudentCopyrightChecklist.pdf" },
    { label: "Work Log", href: "/docs/WorkLog.pdf" },
  ];

  const tools = [
    { name: "Github", desc: "This was used to host code repository", href: "https://github.com/" },
    { name: "Visual Studio Code", desc: "Integrated Development Environment", href: "https://code.visualstudio.com/" },
    { name: "Vercel", desc: "This was utilized only for website hosting and not to generate pre-built sites", href: "https://vercel.com/" },
    { name: "Formspree", desc: "This tool was utilized for form submission.", href: "https://formspree.io/" },
    { name: "Canva", desc: "This was created to create our logo and for Canva free images.", href: "https://www.canva.com/" },
  ];

  const mla = [
    "Freepik. Authentic book club scene. Freepik, www.freepik.com/free-photo/authentic-book-club-scene_37155647.htm. Accessed 28 Jan. 2026.",
    "Freepik. Business company concept. Freepik, www.freepik.com/free-photo/business-company-concept_238033824.htm. Accessed 28 Jan. 2026.",
    "Freepik. Business concept with wooden blocks with icons and green plant. Freepik, www.freepik.com/free-photo/business-concept-with-wooden-blocks-with-icons-green-plant_10183577.htm. Accessed 28 Jan. 2026.",
    "Freepik. Colleagues working together, medium shot. Freepik, www.freepik.com/free-photo/colleagues-working-together-medium-shot_34305548.htm. Accessed 28 Jan. 2026.",
    "Freepik. Happy volunteers hugging each other while preparing donation boxes. Freepik, www.freepik.com/free-photo/happy-volunteers-hugging-each-other-while-preparing-donation-boxes_10853096.htm. Accessed 28 Jan. 2026.",
    "Freepik. Medium shot of people hugging. Freepik, www.freepik.com/free-photo/medium-shot-people-hugging_20550523.htm. Accessed 28 Jan. 2026.",
    "Freepik. Ottawa street. Freepik, www.freepik.com/free-photo/ottawa-street_26923665.htm. Accessed 28 Jan. 2026.",
    "Freepik. Team of college students working on a business management project. Freepik, www.freepik.com/free-photo/team-college-students-working-project-related-business-management_416754949.htm. Accessed 28 Jan. 2026.",
    "In Education Online. “Importance of Extracurricular Activities.” In Education Online, 5 Sept. 2024, ineducationonline.org/2024/09/05/importance-of-extracurricular-activities/. Accessed 28 Jan. 2026.",
    "Pexels. A volunteer giving charity to children. Pexels, www.pexels.com/photo/a-volunteer-giving-charity-to-children-9090746/. Accessed 28 Jan. 2026.",
    "Pexels. Children walking with UNICEF backpacks. Pexels, www.pexels.com/photo/children-walking-with-unicef-backpacks-12886800/. Accessed 28 Jan. 2026.",
    "Picjumbo. Old books. Picjumbo, picjumbo.com/old-books/. Accessed 28 Jan. 2026.",
    "Picjumbo. “Psycho” sorry word in programming code. Picjumbo, picjumbo.com/psycho-sorry-word-in-programming-code/. Accessed 28 Jan. 2026.",
    "Pixabay. Cup winner award. Pixabay, pixabay.com/photos/cup-winner-award-857047/. Accessed 28 Jan. 2026.",
    "Pixabay. Hands, friendship, friends, children. Pixabay, pixabay.com/photos/hands-friendship-friends-children-2847508/. Accessed 28 Jan. 2026.",
    "Pixabay. Mentor, school, students, college. Pixabay, pixabay.com/photos/mentor-school-students-college-3512369/. Accessed 28 Jan. 2026.",
    "Pixabay. NC State, North Carolina State. Pixabay, pixabay.com/photos/nc-state-north-carolina-state-5287789/. Accessed 28 Jan. 2026.",
    "Pixabay. Pen, notebook, notepad, diary. Pixabay, pixabay.com/photos/pen-notebook-notepad-diary-4337521/. Accessed 28 Jan. 2026.",
    "Unsplash. A person placing a block into a pile of wooden blocks. Unsplash, unsplash.com/photos/a-person-placing-a-block-into-a-pile-of-wooden-blocks-bTMTggEt5s4. Accessed 28 Jan. 2026.",
    "Unsplash. Person in red sweater holding baby’s hand. Unsplash, unsplash.com/photos/person-in-red-sweater-holding-babys-hand-Zyx1bK9mqmA. Accessed 28 Jan. 2026.",
  ];

  const styles = {
    page: {
      minHeight: "calc(100vh - var(--header-h))",
      backgroundColor: COLORS.beige,
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      overflowX: "clip",
    },
    hero: {
      position: "relative",
      width: "100%",
      height: "clamp(220px, 36vw, 420px)",
      overflow: "hidden",
    },
    heroImg: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: "scale(1.02)",
    },
    heroOverlay: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
    },
    heroInner: {
      position: "relative",
      height: "100%",
      display: "grid",
      placeItems: "center",
      padding: "0 clamp(16px, 4vw, 48px)",
      textAlign: "center",
    },
    heroTitle: {
      fontFamily: "Merriweather, Georgia, serif",
      fontWeight: 800,
      letterSpacing: "-0.02em",
      fontSize: "clamp(40px, 5vw, 64px)",
      margin: 0,
      color: COLORS.carolinaBlue,
      lineHeight: 1.05,
    },
    heroSub: {
      margin: "14px auto 0",
      maxWidth: "min(980px, 92vw)",
      fontSize: "clamp(14px, 1.6vw, 18px)",
      lineHeight: 1.6,
      color: "rgba(255,255,255,0.92)",
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    },
    wrap: {
      width: "min(1050px, 92vw)",
      margin: "0 auto",
      padding: "clamp(18px, 3.5vw, 34px) 0 clamp(42px, 6vw, 64px)",
      display: "grid",
      gap: "clamp(14px, 2vw, 18px)",
    },
    card: {
      backgroundColor: COLORS.beigeLight,
      borderRadius: 18,
      padding: "clamp(16px, 2.6vw, 26px)",
      boxShadow: "0 14px 34px rgba(0,0,0,0.10)",
      border: "1px solid rgba(0,0,0,0.04)",
    },
    cardTitle: {
      fontFamily: "Merriweather, Georgia, serif",
      fontWeight: 800,
      fontSize: "clamp(22px, 2.2vw, 28px)",
      margin: 0,
      color: COLORS.black,
      letterSpacing: "-0.01em",
    },
    bodyText: {
      margin: "12px 0 0",
      fontSize: "clamp(14px, 1.55vw, 16px)",
      lineHeight: 1.7,
      color: "rgba(0,0,0,0.85)",
    },
    bulletList: {
      margin: "12px 0 0",
      paddingLeft: 18,
      display: "grid",
      gap: 10,
    },
    link: {
      color: COLORS.carolinaBlue,
      textDecoration: "underline",
      fontSize: "clamp(14px, 1.55vw, 16px)",
      fontWeight: 600,
    },
    toolRow: {
      display: "grid",
      gap: 4,
    },
    toolTop: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "baseline",
      gap: 10,
    },
    toolName: {
      fontWeight: 800,
      color: "rgba(0,0,0,0.92)",
      fontSize: "clamp(14px, 1.55vw, 16px)",
    },
    toolDesc: {
      color: "rgba(0,0,0,0.82)",
      fontSize: "clamp(14px, 1.55vw, 16px)",
      lineHeight: 1.6,
    },
    toolLink: {
      color: COLORS.carolinaBlue,
      textDecoration: "underline",
      fontWeight: 700,
      fontSize: "clamp(13px, 1.4vw, 15px)",
    },
    mlaWrap: {
      marginTop: 12,
      display: "grid",
      gap: 10,
    },
    mlaItem: {
      fontSize: "clamp(13.5px, 1.5vw, 15.5px)",
      lineHeight: 1.7,
      color: "rgba(0,0,0,0.86)",
      paddingLeft: 24,
      textIndent: -24,
      overflowWrap: "anywhere",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={styles.page}
    >
      <div style={styles.hero}>
        <img src={referenceHero} alt="References hero" style={styles.heroImg} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroInner}>
          <div>
            <h1 style={styles.heroTitle}>References</h1>
            <p style={styles.heroSub}>
              This page contains all project documentation, including sources and resources used, copyright checklists,
              work logs, and related materials.
            </p>
          </div>
        </div>
      </div>

      <div style={styles.wrap}>
        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Required References</h2>
          <ul style={styles.bulletList}>
            {requiredLinks.map((it) => (
              <li key={it.label}>
                <a style={styles.link} href={it.href} target="_blank" rel="noreferrer">
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Code Stack</h2>
          <p style={styles.bodyText}>
            This website is built using ReactJS, a modern JavaScript library optimized for efficient rendering and
            component-based architecture. Styling and layout are implemented through custom HTML and CSS and responsive
            design principles to ensure compatibility across a wide range of devices and screen sizes. Form submissions
            are handled through Formspree, allowing secure and reliable data collection without server-side overhead. All
            visual assets, layout structure, and interactive elements were designed and implemented by our team. The site
            follows accessibility-conscious design practices aligned with WCAG guidelines, including sufficient color
            contrast, readable typographic, and clear visual hierarchy to support inclusive use. All third-party images
            for design and hero banners are a combination of publicly licensed stock media sites like Unsplash, Pixabay,
            and Canva.
          </p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Tools</h2>
          <ul style={styles.bulletList}>
            {tools.map((t) => (
              <li key={t.name} style={styles.toolRow}>
                <div style={styles.toolTop}>
                  <span style={styles.toolName}>{t.name}:</span>
                  <a href={t.href} target="_blank" rel="noreferrer" style={styles.toolLink}>
                    {t.href.replace("https://", "").replace("http://", "")}
                  </a>
                </div>
                <div style={styles.toolDesc}>{t.desc}</div>
              </li>
            ))}
          </ul>
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Resources</h2>
          <p style={styles.bodyText}>
            All images are sourced under the Unsplash license, the Canva License, Creative Commons ShareAlike (with
            attribution), or are in the public domain.
          </p>

          <div style={styles.mlaWrap} aria-label="MLA citations">
            {mla.map((c, idx) => (
              <div key={idx} style={styles.mlaItem}>
                {c}
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
