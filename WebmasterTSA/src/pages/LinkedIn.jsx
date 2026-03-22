import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WorkGroup from "../assets/WorkGroup.webp";
import LibraryWoman from "../assets/LibraryWoman.webp";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  gray: "#494A48",
  beige: "#F5FCEF",
  text: "#111111",
  textSoft: "#2B2B2B",
};

function useImagePreload(srcs) {
  const [loadedMap, setLoadedMap] = useState({});
  useEffect(() => {
    srcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoadedMap((prev) => ({ ...prev, [src]: true }));
    });
  }, []);
  return (src) => !!loadedMap[src];
}

export default function LinkedIn() {
  const isLoaded = useImagePreload([WorkGroup, LibraryWoman]);

  return (
    <div style={styles.page}>

      {/* ── HERO ── */}
      <section
        style={{
          ...styles.heroWrap,
          backgroundImage: isLoaded(WorkGroup) ? `url(${WorkGroup})` : "none",
          backgroundColor: "#1a2e42",
          opacity: isLoaded(WorkGroup) ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div style={styles.heroOverlay} />
        <div style={styles.heroInner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <span style={styles.heroTag}>Career</span>
            <h1 style={styles.heroTitle}>
              How to Build a LinkedIn Profile as a High School Student Without It Being Cringe
            </h1>
            <div style={styles.heroMeta}>
              <span>Alisha Varshney</span>
              <span style={styles.heroDot} />
              <span>March 21, 2026</span>
              <span style={styles.heroDot} />
              <span>6 min read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div style={styles.container}>

        <div style={styles.introSection}>
          <p style={styles.intro}>
            You know you should probably have a LinkedIn profile. You have heard teachers mention it. You have seen some classmates post about their summer internships on there. But every time you open the site, it feels like a world made for adults in suits talking about "driving value" and "thought leadership." You are seventeen. You do not have thought leadership. You have a part-time job at Chick-fil-A and a science fair trophy from sophomore year.
          </p>
          <div style={styles.introLead}>
            LinkedIn is not just for people with ten years of work experience. It is a tool, and like any tool, it is only as useful as how you use it. A well-built profile can help you connect with researchers, find summer programs, and get on the radar of people who can open doors for you. A poorly built one will make you look like you are cosplaying as a CEO.
          </div>
        </div>

        <div>
          <p style={styles.bodyP}>
            The goal is to look like a serious, capable student. Not a miniature corporate executive. There is a way to do this that feels authentic and actually helps you. Here is how.
          </p>

          <h2 style={styles.h2}>1. Use a Normal Photo and Write a Headline That Makes Sense</h2>
          <p style={styles.bodyP}>
            Your profile photo does not need to be a professional headshot taken in a studio. It needs to be a clear photo of your face with decent lighting and a plain background. A photo from a family event where you are wearing something presentable works fine. Crop it so your face takes up most of the frame. No sunglasses, no group shots, no selfies with filters.
          </p>
          <p style={styles.bodyP}>
            Your headline is the line that appears right under your name. Most high schoolers leave this as the default or write something like "Future CEO | Innovator | Changemaker" which is the fastest way to make someone close your profile. Instead, keep it simple and factual. Something like "Junior at [Your School] | Interested in Biology and Public Health" tells people exactly who you are and what you care about without trying too hard.
          </p>
          <p style={styles.bodyP}>
            The headline is the first thing anyone reads about you. Make it honest. Save the personal branding for after you actually have a career to brand.
          </p>

          <h2 style={styles.h2}>2. Write an About Section That Sounds Like You</h2>
          <p style={styles.bodyP}>
            The About section is where most high schoolers go wrong. They either leave it blank or fill it with corporate buzzwords they copied from someone else's profile. Both are bad. The blank one tells people nothing. The buzzword one tells people you do not know how to talk about yourself yet.
          </p>
          <p style={styles.bodyP}>
            Write three to four sentences about who you are right now. Mention your school, your grade, and one or two things you are genuinely interested in. If you have done research, mention the topic. If you are looking for opportunities, say so. Keep the language natural. Write it the way you would explain yourself to a college interviewer, not the way a robot would write a cover letter.
          </p>
          <p style={styles.bodyP}>
            Here is a good test. Read your About section out loud. If it sounds like something you would actually say in a conversation, it is fine. If it sounds like a press release, rewrite it.
          </p>

          <h2 style={styles.h2}>3. List Your Experience Honestly (Even If It Feels Small)</h2>
          <p style={styles.bodyP}>
            You do not need a long list of internships to fill out the experience section. If you worked at a grocery store, that counts. If you tutored younger students, that counts. If you ran your school's Instagram for a club, that counts. The point is to show that you have done things, taken responsibility, and followed through.
          </p>
          <p style={styles.bodyP}>
            For each entry, write one or two lines about what you actually did. Avoid vague phrases like "assisted with various tasks." Be specific. If you tutored students in algebra, say that. If you organized an event, say how many people came. Numbers and details make you look credible even when the experience is small.
          </p>
          <p style={styles.bodyP}>
            If you have research experience, create a separate entry for it. Use the title you were given or something like "Student Research Assistant." Describe the project briefly. What were you studying? What tools did you use? What did you contribute? This is the section that will catch the attention of anyone in academia who looks at your profile.
          </p>

          <img
            src={LibraryWoman}
            alt="Student updating a profile on their laptop in a library"
            style={{
              ...styles.sectionImg,
              opacity: isLoaded(LibraryWoman) ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />

          <h2 style={styles.h2}>4. Add Skills and Coursework (Skip the Endorsement Game)</h2>
          <p style={styles.bodyP}>
            LinkedIn lets you list skills on your profile, and this section is useful if you fill it correctly. List the things you actually know how to do. If you are comfortable with Excel, Python, lab techniques, public speaking, or data analysis, add those. If you have taken AP courses that are relevant to your interests, add a section for coursework.
          </p>
          <p style={styles.bodyP}>
            Do not spend time asking friends to endorse your skills. Nobody hiring or evaluating a high schooler cares that twelve of your classmates endorsed you for "leadership." The skills section is useful as a quick reference for someone scanning your profile, not as a popularity contest.
          </p>
          <p style={styles.bodyP}>
            Also skip the skills assessment quizzes unless you are confident you will score well. A badge that says you passed the beginner Excel quiz does not impress anyone. Your actual experience and coursework speak louder.
          </p>

          <h2 style={styles.h2}>5. Connect With People You Actually Know (and a Few You Don't)</h2>
          <p style={styles.bodyP}>
            LinkedIn is a network, and a network only works if you use it. Start by connecting with people you already have a relationship with. Your teachers, your guidance counselor, family friends who work in fields you are interested in, and any adults you have met through programs or events. These connections form the foundation of your profile.
          </p>
          <p style={styles.bodyP}>
            After that, it is okay to reach out to people you do not know personally, but do it with intention. If you read about a researcher at a local university whose work interests you, send a short connection request with a note explaining who you are and why you are reaching out. Most people are receptive to a polite message from a curious high schooler. What they are not receptive to is a blank connection request from a stranger with no context.
          </p>
          <p style={styles.bodyP}>
            Do not mass-connect with hundreds of people. A smaller network of people who actually know who you are is more useful than a huge list of strangers. Quality matters more than numbers here.
          </p>

          <h2 style={styles.h2}>6. Do Not Post Just to Post</h2>
          <p style={styles.bodyP}>
            You do not need to be active on LinkedIn the way you are on Instagram or TikTok. You do not need to post motivational quotes or share articles with captions like "This really made me think." Nobody needs that from anyone, and especially not from a high schooler.
          </p>
          <p style={styles.bodyP}>
            If you have something real to share, share it. Finished a research project? Post a short summary of what you learned. Got accepted to a summer program? A quick update is fine. Won an award? Go ahead and mention it. The key is that every post should have actual substance behind it. If the only reason you are posting is to look active, skip it.
          </p>
          <p style={styles.bodyP}>
            Your profile itself is doing the work for you. It exists as a landing page for anyone who wants to learn about you. Keep it updated, keep it honest, and do not worry about building a following. You are not an influencer. You are a student building a tool that will become more and more useful as your career grows.
          </p>

          <div style={styles.resourceBox}>
            <h3 style={styles.resourceLabel}>Helpful LinkedIn Resources</h3>
            <a
              style={styles.resourceLink}
              href="https://www.linkedin.com/help/linkedin/answer/a548441"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn — Getting Started Guide for Students
            </a>
            <a
              style={styles.resourceLink}
              href="https://university.linkedin.com/linkedin-for-students"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn for Students Portal
            </a>
            <a
              style={{...styles.resourceLink, borderBottom: "none"}}
              href="https://www.linkedin.com/learning/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Learning — Free Courses for Students
            </a>
          </div>

          <button
            style={styles.backBtn}
            onClick={() => window.history.back()}
          >
            Back to all articles
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#F5FCEF",
    minHeight: "100vh",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#111111",
  },

  heroWrap: {
    position: "relative",
    width: "100%",
    minHeight: "clamp(340px, 55vw, 560px)",
    display: "flex",
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.10) 100%)",
  },
  heroInner: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 1.5rem) clamp(2rem, 4vw, 3rem)",
    boxSizing: "border-box",
  },
  heroTag: {
    display: "inline-block",
    background: "rgba(254, 246, 228, 0.18)",
    color: "#fef6e4",
    border: "1px solid rgba(254,246,228,0.35)",
    padding: "0.28rem 0.85rem",
    borderRadius: "20px",
    fontSize: "0.69rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "0.85rem",
  },
  heroTitle: {
    margin: 0,
    color: "#ffffff",
    fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
    fontWeight: 800,
    lineHeight: 1.18,
    letterSpacing: "-0.02em",
    textShadow: "0 4px 18px rgba(0,0,0,0.35)",
  },
  heroMeta: {
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.55rem",
    fontSize: "0.83rem",
    color: "rgba(255,255,255,0.78)",
    flexWrap: "wrap",
  },
  heroDot: {
    width: "3px",
    height: "3px",
    background: "rgba(255,255,255,0.5)",
    borderRadius: "50%",
    display: "inline-block",
    flexShrink: 0,
  },

  container: {
    maxWidth: "750px",
    margin: "0 auto",
    padding: "0 clamp(1rem, 3vw, 1.5rem) 5.5rem",
    boxSizing: "border-box",
  },

  introSection: {
    paddingTop: "clamp(1.75rem, 4vw, 2.85rem)",
  },
  intro: {
    fontSize: "clamp(1rem, 2vw, 1.1rem)",
    lineHeight: 1.88,
    marginBottom: "1.5rem",
    color: "#111111",
  },
  introLead: {
    fontSize: "clamp(0.97rem, 1.8vw, 1.08rem)",
    fontWeight: 500,
    lineHeight: 1.78,
    borderLeft: "3.5px solid #4B9CD3",
    padding: "1rem 1.1rem",
    marginBottom: "2.25rem",
    background: "#eaf5fb",
    color: "#111111",
  },

  bodyP: {
    fontSize: "clamp(0.95rem, 1.8vw, 1.02rem)",
    lineHeight: 1.85,
    marginBottom: "1.35rem",
    color: "#111111",
  },
  h2: {
    fontSize: "clamp(1.08rem, 2.2vw, 1.32rem)",
    fontWeight: 700,
    margin: "2.85rem 0 1rem",
    paddingLeft: "1rem",
    borderLeft: "3.5px solid #4B9CD3",
    color: "#111111",
  },

  sectionImg: {
    width: "100%",
    maxHeight: "380px",
    objectFit: "cover",
    borderRadius: "12px",
    margin: "1.75rem 0 2.25rem",
    display: "block",
  },

  resourceBox: {
    background: "#eaf5fb",
    border: "1.5px solid #b3d9f0",
    borderRadius: "12px",
    padding: "clamp(1rem, 3vw, 1.5rem) clamp(1.1rem, 3vw, 1.75rem)",
    marginTop: "3rem",
  },
  resourceLabel: {
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: "1rem",
    color: "#111111",
  },
  resourceLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#2d7db5",
    fontSize: "clamp(0.87rem, 1.6vw, 0.93rem)",
    textDecoration: "none",
    padding: "0.6rem 0",
    borderBottom: "1px solid #cce8f5",
  },

  backBtn: {
    marginTop: "3.5rem",
    padding: "0.6rem 1.2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    background: "none",
    fontSize: "0.93rem",
    color: "#111111",
    display: "block",
  },
};
