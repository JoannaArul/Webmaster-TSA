import { useEffect, useState } from "react";
import referenceHero from "../assets/ReferenceImage.webp";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  beige: "#F5FCEF",
  beigeLight: "#FAFFF6",
  black: "#000000",
};

function useImagePreload(src) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);
  return loaded;
}

export default function ReferencePage() {
  const heroLoaded = useImagePreload(referenceHero);

  const requiredLinks = [
    { label: "Student Copyright Checklist", href: "/docs/StudentCopyrightChecklist.pdf" },
    { label: "Work Log", href: "/docs/StatesWorkLog.pdf" },
  ];

  const tools = [
    { name: "Github", desc: "This was used to host code repository.", href: "https://github.com/" },
    { name: "Visual Studio Code", desc: "This was our integrated development environment.", href: "https://code.visualstudio.com/" },
    { name: "Vercel", desc: "This was utilized only for website hosting and not to generate pre-built sites", href: "https://vercel.com/" },
    { name: "Formspree", desc: "This tool was utilized for form submission.", href: "https://formspree.io/" },
    { name: "Canva", desc: "This was used to create our logo and for Canva free images.", href: "https://www.canva.com/" },
  ];

  const mla = [
    // A
    "Author(s) unknown. \u201CPMC Article.\u201D PubMed Central, U.S. National Library of Medicine, pmc.ncbi.nlm.nih.gov/articles/PMC12342330/. Accessed 23 Mar. 2026.",
    // B
    "BigFuture by College Board. \u201C10 Jobs for Engineering Majors.\u201D BigFuture, College Board, bigfuture.collegeboard.org/explore-careers/get-started/career-paths-for-popular-majors/10-jobs-engineering-majors. Accessed 29 Jan. 2026.",
    "BigFuture by College Board. \u201C7 Jobs for Political Science Majors.\u201D BigFuture, College Board, bigfuture.collegeboard.org/explore-careers/get-started/career-paths-for-popular-majors/7-jobs-political-science-majors. Accessed 29 Jan. 2026.",
    // C
    "Coursera. \u201CJobs for English Majors.\u201D Coursera, www.coursera.org/articles/jobs-for-english-majors. Accessed 29 Jan. 2026.",
    // F
    "\u201CBusiness Women Signature Document.\u201D Freepik, www.freepik.com/free-photo/business-women-signature-document_1155996.htm. Accessed 23 Mar. 2026.",
    "Freepik. Authentic book club scene. Freepik, www.freepik.com/free-photo/authentic-book-club-scene_37155647.htm. Accessed 28 Jan. 2026.",
    "Freepik. Business company concept. Freepik, www.freepik.com/free-photo/business-company-concept_238033824.htm. Accessed 28 Jan. 2026.",
    "Freepik. Business concept with wooden blocks with icons and green plant. Freepik, www.freepik.com/free-photo/business-concept-with-wooden-blocks-with-icons-green-plant_10183577.htm. Accessed 28 Jan. 2026.",
    "Freepik. Colleagues working together, medium shot. Freepik, www.freepik.com/free-photo/colleagues-working-together-medium-shot_34305548.htm. Accessed 28 Jan. 2026.",
    "Freepik. Happy volunteers hugging each other while preparing donation boxes. Freepik, www.freepik.com/free-photo/happy-volunteers-hugging-each-other-while-preparing-donation-boxes_10853096.htm. Accessed 28 Jan. 2026.",
    "Freepik. Medium shot of people hugging. Freepik, www.freepik.com/free-photo/medium-shot-people-hugging_20550523.htm. Accessed 28 Jan. 2026.",
    "Freepik. Ottawa street. Freepik, www.freepik.com/free-photo/ottawa-street_26923665.htm. Accessed 28 Jan. 2026.",
    "Freepik. Team of college students working on a business management project. Freepik, www.freepik.com/free-photo/team-college-students-working-project-related-business-management_416754949.htm. Accessed 28 Jan. 2026.",
    "\u201CClose Up Young Group Startapers Sitting Library Making Research About Future Tem Project Looking Through Graphics Laptop Writing New Ideas Business Teamwork Concept.\u201D Freepik, www.freepik.com/free-photo/close-up-young-group-startapers-sitting-library-making-research-about-future-tem-project-looking-through-graphics-laptop-writing-new-ideas-business-teamwork-concept_8357192.htm. Accessed 23 Mar. 2026.",
    "\u201CCloseup Job Applicant Giving His Resume Job Interview Office.\u201D Freepik, www.freepik.com/free-photo/closeup-job-applicant-giving-his-resume-job-interview-office_26346646.htm. Accessed 23 Mar. 2026.",
    "\u201CWoman Drinking Hot Chocolate Cafe.\u201D Freepik, www.freepik.com/free-photo/woman-drinking-hot-chocolate-cafe_34914232.htm. Accessed 23 Mar. 2026.",
    "\u201CYoung Asian Woman Sit Chair Near Stream Listening Music Wireless Headphones Use Tablet with Happily While Camping Woods Copy Space.\u201D Freepik, www.freepik.com/free-photo/young-asian-woman-sit-chair-near-stream-listening-music-wireless-headphones-use-tablet-with-happily-while-camping-woods-copy-space_25597253.htm. Accessed 23 Mar. 2026.",
    "\u201CYoung Sad Tired Female Student Sleeping Desk with Books Around Study Library University.\u201D Freepik, www.freepik.com/free-photo/young-sad-tired-female-student-sleeping-desk-with-books-around-study-library-university_23177083.htm. Accessed 23 Mar. 2026.",
    // G
    "Graduate Programs at Northeastern University. \u201CBest Math Careers.\u201D Northeastern University, graduate.northeastern.edu/knowledge-hub/best-math-careers/. Accessed 29 Jan. 2026.",
    // I
    "Indeed Career Guide. \u201CBachelor\u2019s Degree in Education Jobs.\u201D Indeed, www.indeed.com/career-advice/finding-a-job/bachelors-degree-in-education-jobs. Accessed 29 Jan. 2026.",
    "Indeed Career Guide. \u201CBiology Degree Jobs.\u201D Indeed, www.indeed.com/career-advice/finding-a-job/biology-degree-jobs. Accessed 29 Jan. 2026.",
    "Indeed Career Guide. \u201CCareers in Sports.\u201D Indeed, www.indeed.com/career-advice/career-development/careers-in-sports. Accessed 29 Jan. 2026.",
    "Indeed Career Guide. \u201CComputer Scientist Degree.\u201D Indeed, www.indeed.com/career-advice/finding-a-job/computer-scientist-degree. Accessed 29 Jan. 2026.",
    "Indeed Career Guide. \u201CEnvironmental Science Degree Jobs.\u201D Indeed, www.indeed.com/career-advice/finding-a-job/environmental-science-degree-jobs. Accessed 29 Jan. 2026.",
    "Indeed Career Guide. \u201CJobs for Art Majors.\u201D Indeed, www.indeed.com/career-advice/finding-a-job/jobs-with-an-art-degree. Accessed 29 Jan. 2026.",
    "Indeed Career Guide. \u201CJobs for Business Majors.\u201D Indeed, www.indeed.com/career-advice/finding-a-job/jobs-for-business-majors. Accessed 29 Jan. 2026.",
    "Indeed Career Guide. \u201CLaw Degree Government Jobs.\u201D Indeed, www.indeed.com/career-advice/finding-a-job/law-degree-government-jobs. Accessed 29 Jan. 2026.",
    "Indeed Career Guide. \u201CPublic Service Degree Jobs.\u201D Indeed, www.indeed.com/career-advice/finding-a-job/public-service-degree-jobs. Accessed 29 Jan. 2026.",
    "Indeed Career Guide. \u201CTop Chemistry Degree Jobs.\u201D Indeed, www.indeed.com/career-advice/finding-a-job/top-chemistry-degree-jobs. Accessed 29 Jan. 2026.",
    "In Education Online. \u201CImportance of Extracurricular Activities.\u201D In Education Online, 5 Sept. 2024, ineducationonline.org/2024/09/05/importance-of-extracurricular-activities/. Accessed 28 Jan. 2026.",
    // N
    "\u201CNew APA Poll: Americans Who Engage in Creative Acti\u2014.\u201D American Psychiatric Association, www.psychiatry.org/news-room/news-releases/new-apa-poll-americans-who-engage-in-creative-acti. Accessed 23 Mar. 2026.",
    // P
    "Pexels. A volunteer giving charity to children. Pexels, www.pexels.com/photo/a-volunteer-giving-charity-to-children-9090746/. Accessed 28 Jan. 2026.",
    "Pexels. Children walking with UNICEF backpacks. Pexels, www.pexels.com/photo/children-walking-with-unicef-backpacks-12886800/. Accessed 28 Jan. 2026.",
    "\u201CBedroom.\u201D Pexels, www.pexels.com/search/bedroom/. Accessed 23 Mar. 2026.",
    "\u201CBusinesspeople Having Coffee Break at Work.\u201D Pexels, www.pexels.com/photo/businesspeople-having-coffee-break-at-work-7693695/. Accessed 23 Mar. 2026.",
    "\u201CCheerful Multiethnic Students with Books Sitting near University.\u201D Pexels, www.pexels.com/photo/cheerful-multiethnic-students-with-books-sitting-near-university-6146978/. Accessed 23 Mar. 2026.",
    "\u201CMan in Yellow Shirt Sitting Beside Woman in Black Shirt.\u201D Pexels, www.pexels.com/photo/man-in-yellow-shirt-sitting-beside-woman-in-black-shirt-6334763/. Accessed 23 Mar. 2026.",
    "\u201CMan Making a Clay Pot.\u201D Pexels, www.pexels.com/photo/man-making-a-clay-pot-6611262/. Accessed 23 Mar. 2026.",
    "\u201CPhoto of a Man with Eyeglasses Looking at a Map with a Shocked Facial Expression.\u201D Pexels, www.pexels.com/photo/photo-of-a-man-with-eyeglasses-looking-at-a-map-with-a-shocked-facial-expression-6050146/. Accessed 23 Mar. 2026.",
    "\u201CPerson Sketching on a Notebook.\u201D Pexels, www.pexels.com/photo/person-sketching-on-a-notebook-4238498/. Accessed 23 Mar. 2026.",
    "\u201CScientist in Laboratory.\u201D Pexels, www.pexels.com/photo/scientist-in-laboratory-3735769/. Accessed 23 Mar. 2026.",
    "\u201CTeacher College.\u201D Pexels, www.pexels.com/search/teacher%20college/. Accessed 23 Mar. 2026.",
    "\u201CTray with Breakfast on Bed near Book.\u201D Pexels, www.pexels.com/photo/tray-with-breakfast-on-bed-near-book-5591661/. Accessed 23 Mar. 2026.",
    "\u201CWoman in White Long-Sleeved Laboratory Gown Standing.\u201D Pexels, www.pexels.com/photo/woman-in-white-long-sleeved-laboratory-gown-standing-3735715/. Accessed 23 Mar. 2026.",
    "\u201CYoung Woman Studying While Sitting at a Desk.\u201D Pexels, www.pexels.com/photo/a-young-woman-studying-while-sitting-at-a-desk-6549641/. Accessed 23 Mar. 2026.",
    "Picjumbo. Old books. Picjumbo, picjumbo.com/old-books/. Accessed 28 Jan. 2026.",
    "Picjumbo. \u201CPsycho\u201D sorry word in programming code. Picjumbo, picjumbo.com/psycho-sorry-word-in-programming-code/. Accessed 28 Jan. 2026.",
    "Pixabay. Cup winner award. Pixabay, pixabay.com/photos/cup-winner-award-857047/. Accessed 28 Jan. 2026.",
    "Pixabay. Hands, friendship, friends, children. Pixabay, pixabay.com/photos/hands-friendship-friends-children-2847508/. Accessed 28 Jan. 2026.",
    "Pixabay. Mentor, school, students, college. Pixabay, pixabay.com/photos/mentor-school-students-college-3512369/. Accessed 28 Jan. 2026.",
    "Pixabay. NC State, North Carolina State. Pixabay, pixabay.com/photos/nc-state-north-carolina-state-5287789/. Accessed 28 Jan. 2026.",
    "Pixabay. Pen, notebook, notepad, diary. Pixabay, pixabay.com/photos/pen-notebook-notepad-diary-4337521/. Accessed 28 Jan. 2026.",
    "\u201CAfrican American Teenage Boy Forest.\u201D Pixabay, pixabay.com/photos/african-american-teenage-boy-forest-7175046/. Accessed 23 Mar. 2026.",
    "\u201CAsian Man Portrait Young Man Man.\u201D Pixabay, pixabay.com/photos/asian-man-portrait-young-man-man-1468032/. Accessed 23 Mar. 2026.",
    "\u201CBoard Games Monopoly Card Games.\u201D Pixabay, pixabay.com/photos/board-games-monopoly-card-games-7731385/. Accessed 23 Mar. 2026.",
    "\u201CFriendship Day Black Women Portrait.\u201D Pixabay, pixabay.com/photos/friendship-day-black-women-portrait-3104635/. Accessed 23 Mar. 2026.",
    "\u201CGirl Sad Portrait Face Woman.\u201D Pixabay, pixabay.com/photos/girl-sad-portrait-face-woman-2961959/. Accessed 23 Mar. 2026.",
    "\u201CIndian Woman Outdoors Teenager Teen.\u201D Pixabay, pixabay.com/photos/indian-woman-outdoors-teenager-teen-7137739/. Accessed 23 Mar. 2026.",
    "\u201CKandi Burruss Tucker Woman Smile.\u201D Pixabay, pixabay.com/photos/kandi-burruss-tucker-woman-smile-6551893/. Accessed 23 Mar. 2026.",
    "\u201CVietnamese Women Women Girls Water.\u201D Pixabay, pixabay.com/photos/vietnamese-women-women-girls-water-5355708/. Accessed 23 Mar. 2026.",
    "\u201CWoman Beauty Fashion Stylish.\u201D Pixabay, pixabay.com/photos/woman-beauty-fashion-stylish-8228723/. Accessed 23 Mar. 2026.",
    // S
    "Superprof. \u201CCareer Prospects in Physics.\u201D Superprof, www.superprof.com/blog/career-prospects-physics/. Accessed 29 Jan. 2026.",
    // U
    "U.S. News & World Report. \u201CBest STEM Jobs.\u201D U.S. News & World Report, careers.usnews.com/best-jobs/rankings/best-stem-jobs. Accessed 29 Jan. 2026.",
    "University of North Dakota. \u201CHighest-Paying Jobs with a Psychology Degree.\u201D UND Today, und.edu/blog/highest-paying-jobs-with-a-psychology-degree.html. Accessed 29 Jan. 2026.",
    "Unsplash. A person placing a block into a pile of wooden blocks. Unsplash, unsplash.com/photos/a-person-placing-a-block-into-a-pile-of-wooden-blocks-bTMTggEt5s4. Accessed 28 Jan. 2026.",
    "Unsplash. Person in red sweater holding baby\u2019s hand. Unsplash, unsplash.com/photos/person-in-red-sweater-holding-babys-hand-Zyx1bK9mqmA. Accessed 28 Jan. 2026.",
    "\u201CBlue and White Logo Guessing Game.\u201D Unsplash, unsplash.com/photos/blue-and-white-logo-guessing-game-LPZy4da9aRo. Accessed 23 Mar. 2026.",
    "\u201CBrown and White Book on Gray Textile.\u201D Unsplash, unsplash.com/photos/brown-and-white-book-on-gray-textile-la6C554Ev_o. Accessed 23 Mar. 2026.",
    "\u201CPerson Holding Pencil near Laptop Computer.\u201D Unsplash, unsplash.com/photos/person-holding-pencil-near-laptop-computer-5fNmWej4tAA. Accessed 23 Mar. 2026.",
    "\u201CWoman in Black Sleeveless Top.\u201D Unsplash, unsplash.com/photos/woman-in-black-sleeveless-top-h6gCRTCxM7o. Accessed 23 Mar. 2026.",
  ];

  const styles = {
    page: {
      minHeight: "calc(100vh - var(--header-h))",
      backgroundColor: COLORS.beige,
      fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      overflowX: "clip",
    },
    hero: {
      position: "relative",
      width: "100%",
      aspectRatio: "21 / 9",
      maxHeight: "min(420px, 70vh)",
      overflow: "hidden",
      backgroundColor: "#1a2e42",
    },
    heroImg: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: "scale(1.02)",
      display: "block",
      opacity: heroLoaded ? 1 : 0,
      transition: "opacity 0.5s ease",
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
      fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
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
      paddingLeft: "1.6em",
      textIndent: "-1.6em",
      overflowWrap: "anywhere",
      wordBreak: "break-word",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <img
          src={referenceHero}
          alt="References hero"
          style={styles.heroImg}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
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
            follows accessibility-conscious design practices, including sufficient color
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
    </div>
  );
}
