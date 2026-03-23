import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import teacherRecHero from "../assets/teacher-rec-hero.webp";
import teacherClass from "../assets/teacher-class.webp";
import emailEnvelope from "../assets/email-envelope.webp";
import laptopMeeting from "../assets/laptop-meeting.webp";

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

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .art-root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #F5FCEF;
    min-height: 100vh;
    color: #000000;
  }

  .art-container {
    max-width: 750px;
    margin: 0 auto;
    padding: 2.85rem 1.5rem 5.5rem;
  }

  .art-tag {
    display: inline-block;
    background: #eaf7e1;
    color: #3a7d2c;
    padding: 0.28rem 0.85rem;
    border-radius: 20px;
    font-size: 0.69rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1.05rem;
  }

  .art-title {
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.3rem;
  }

  .art-meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.83rem;
    color: #666;
    margin-bottom: 2.3rem;
    padding-bottom: 2.3rem;
    border-bottom: 1.5px solid #dce8d5;
    flex-wrap: wrap;
  }

  .art-dot {
    width: 3px;
    height: 3px;
    background: #bbb;
    border-radius: 50%;
  }

  .art-intro {
    font-size: 1.1rem;
    line-height: 1.88;
    margin-bottom: 1.5rem;
  }

  .art-intro-lead {
    font-size: 1.08rem;
    font-weight: 500;
    line-height: 1.78;
    border-left: 3.5px solid #4B9CD3;
    padding: 1rem 1.1rem;
    margin-bottom: 2.25rem;
    background: #eaf5fb;
  }

  .art-body p {
    font-size: 1.02rem;
    line-height: 1.85;
    margin-bottom: 1.35rem;
  }

  .art-body h2 {
    font-size: 1.32rem;
    font-weight: 700;
    margin: 2.85rem 0 1rem;
    padding-left: 1rem;
    border-left: 3.5px solid #4B9CD3;
  }

  .art-section-img {
    width: 100%;
    max-height: 380px;
    object-fit: cover;
    border-radius: 12px;
    margin: 1.75rem 0 2.25rem;
  }

  .cheatsheet-box {
    background: #f0faf3;
    border: 1.5px solid #b8e0c4;
    border-radius: 10px;
    padding: 1.3rem 1.55rem;
    margin: 1.5rem 0 2rem;
  }

  .cheatsheet-label {
    font-size: 0.88rem;
    font-weight: 700;
    margin-bottom: 0.7rem;
    display: block;
  }

  .cheatsheet-box ul {
    margin-left: 1.3rem;
  }

  .resource-box {
    background: #eaf5fb;
    border: 1.5px solid #b3d9f0;
    border-radius: 12px;
    padding: 1.5rem 1.75rem;
    margin-top: 3rem;
  }

  .resource-box h3 {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .resource-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #2d7db5;
    font-size: 0.93rem;
    text-decoration: none;
    padding: 0.6rem 0;
    border-bottom: 1px solid #cce8f5;
  }

  .resource-link:last-child { border-bottom: none; }

  .art-back-bottom {
    margin-top: 3.5rem;
    padding: 0.6rem 1.2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    background: none;
    font-size: 0.93rem;
  }

  /* Tablet (max 768px) */
  @media (max-width: 768px) {
    .art-container { padding: 2rem 1.25rem 4rem; }
    .art-title { font-size: 1.75rem; }
    .art-intro { font-size: 1rem; }
    .art-intro-lead { font-size: 1rem; }
    .art-body p { font-size: 0.97rem; }
    .art-body h2 { font-size: 1.18rem; }
    .art-section-img { max-height: 300px; border-radius: 8px; }
    .resource-box { padding: 1.2rem 1.3rem; }
    .cheatsheet-box { padding: 1rem 1.2rem; }
  }

  /* Mobile (max 480px) */
  @media (max-width: 480px) {
    .art-container { padding: 1.5rem 1rem 3.5rem; }
    .art-title { font-size: 1.45rem; line-height: 1.25; }
    .art-meta { font-size: 0.78rem; gap: 0.45rem; margin-bottom: 1.75rem; padding-bottom: 1.75rem; }
    .art-intro { font-size: 0.97rem; line-height: 1.78; }
    .art-intro-lead { font-size: 0.95rem; padding: 0.85rem 0.9rem; }
    .art-body p { font-size: 0.95rem; line-height: 1.78; }
    .art-body h2 { font-size: 1.08rem; margin: 2.2rem 0 0.85rem; }
    .art-section-img { max-height: 210px; margin: 1.25rem 0 1.75rem; border-radius: 8px; }
    .resource-box { padding: 1rem 1.1rem; }
    .resource-link { font-size: 0.87rem; }
    .art-back-bottom { width: 100%; text-align: center; margin-top: 2.5rem; }
    .cheatsheet-box { padding: 0.9rem 1rem; }
  }
`;

export default function TeacherRecommendation() {
  const isLoaded = useImagePreload([teacherRecHero]);

  return (
    <>
      <style>{css}</style>

      <div className="art-root">

        {/* ── HERO ── */}
        <section
          style={{
            position: "relative",
            width: "100%",
            minHeight: "clamp(260px, 45vw, 500px)",
            display: "flex",
            alignItems: "flex-end",
            backgroundImage: isLoaded(teacherRecHero) ? `url(${teacherRecHero})` : "none",
            backgroundColor: "#1a2e42",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            opacity: isLoaded(teacherRecHero) ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.08) 100%)",
          }} />
          <div style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 1.5rem) clamp(2rem, 4vw, 3rem)",
            boxSizing: "border-box",
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <span style={{
                display: "inline-block",
                background: "rgba(234,247,225,0.18)",
                color: "#eaf7e1",
                border: "1px solid rgba(234,247,225,0.35)",
                padding: "0.28rem 0.85rem",
                borderRadius: "20px",
                fontSize: "0.69rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.85rem",
              }}>Applications</span>
              <h1 style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "clamp(1.45rem, 4vw, 2.4rem)",
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                textShadow: "0 4px 18px rgba(0,0,0,0.35)",
              }}>
                The Art of the Ask: Getting a Teacher Recommendation for Research Programs
              </h1>
              <div style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                fontSize: "0.83rem",
                color: "rgba(255,255,255,0.78)",
                flexWrap: "wrap",
              }}>
                <span>Joanna Arul Jeeva</span>
                <span style={{ width: 3, height: 3, background: "rgba(255,255,255,0.5)", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                <span>March 15, 2026</span>
                <span style={{ width: 3, height: 3, background: "rgba(255,255,255,0.5)", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                <span>5 min read</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="art-container">

          <p className="art-intro">
            Securing a spot in a summer research program or a competitive weekend lab as a high schooler is a major win. But these programs usually have tiny cohorts, which means they rely heavily on what your teachers say about you. You aren't just looking for a generic "they are a good student" letter. You need a "they are curious, they don't give up when a lab fails, and they actually follow safety rules" letter.
          </p>

          <p className="art-intro-lead">
            Strong programs want to hear that you are curious, persistent, and capable of working through problems when experiments fail. Asking a teacher for that kind of recommendation can feel awkward, but approaching it professionally helps you stand out before the letter is even written.
          </p>

          <div className="art-body">

            <img src={teacherClass} alt="Teacher classroom" className="art-section-img" />

            <h2>1. Choose the Teacher Who Saw You Do Science</h2>

            <p>
              For research programs, the teacher who gave you an A+ in English is great, but the teacher who watched you struggle through a complex chemistry lab is better. You want someone who can talk about your technical skills and the way you approach problems.
            </p>

            <p>
              Think about which teacher saw you ask thoughtful questions or work through a project that did not go as planned. Research is mostly troubleshooting, so a teacher who can write something like, "When the experiment failed, they stayed after class to figure out why," is incredibly valuable.
            </p>

            <p>
              If you are applying for a math-heavy program, ask your math or physics teacher. If it is a biology or biotechnology program, choose someone who supervised your lab work or research projects in that area.
            </p>

            <img src={emailEnvelope} alt="Email envelope illustration" className="art-section-img" />

            <h2>2. Timing: Don't Be the Last Minute Student</h2>

            <p>
              Teachers are often juggling grading, lesson planning, meetings, and their own personal lives. If you ask for a recommendation letter only a few days before the deadline, you are essentially asking them to rush something important.
            </p>

            <p>
              The best time to ask is at least three to four weeks before the program's deadline. This gives them enough time to think carefully about your strengths and write a thoughtful letter rather than a rushed paragraph.
            </p>

            <p>
              Asking early also signals that you are organized and responsible. Those traits matter a lot in research settings where missing deadlines or forgetting details can disrupt an entire experiment.
            </p>

            <img src={laptopMeeting} alt="Laptop meeting discussion" className="art-section-img" />

            <h2>3. Send the Research Cheat Sheet</h2>

            <p>
              Even teachers who know you well might not remember every detail of the project you completed months ago. When you send your request email, include a short document that gives them helpful information they can reference while writing.
            </p>

            <div className="cheatsheet-box">
              <span className="cheatsheet-label">Your cheat sheet should include:</span>
              <ul>
                <li>The name of the research program and a link to its website</li>
                <li>A short explanation of why you want to participate in that program</li>
                <li>A reminder of a specific project or lab you completed in their class</li>
                <li>Your resume or a list of science-related extracurricular activities</li>
              </ul>
            </div>

            <h2>4. Use Professional (but Human) Language</h2>

            <p>
              Your request email should be polite and clear without sounding overly formal. Start by reminding the teacher which class you were in and when you had them.
            </p>

            <p>
              Explain the program you are applying to and why you thought of them specifically when choosing someone to write the recommendation. Mentioning something specific about their class, such as a project or teaching style you appreciated, makes the request feel more personal.
            </p>

            <p>
              Finally, clearly state the deadline and include any forms or submission links they might need. Keeping the request organized makes the process much easier for them.
            </p>

            <h2>5. Close the Loop and Say Thank You</h2>

            <p>
              Once a teacher agrees to write your letter, send a quick follow-up message confirming the deadline and providing any additional instructions they might need.
            </p>

            <p>
              After you hear back from the program, let them know the outcome. Teachers spend significant time writing these letters, and they genuinely want to know if their support helped you succeed.
            </p>

            <p>
              A simple message saying, "I got into the program, thank you again for writing the recommendation," can strengthen the relationship and make it easier to ask for future recommendations later in your academic career.
            </p>

            <div className="resource-box">
              <h3>Ready-to-Use Email &amp; Organization Tools</h3>

              <a
                className="resource-link"
                href="https://onlineprograms.sacredheart.edu/application-central/letters-of-recommendation-email-template/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Teacher Recommendation Email Template
              </a>

              <a
                className="resource-link"
                href="https://www.commonapp.org/static/7bc36ad35601e024c5ba48dcef1292e2/Resource_FY_TeacherBragSheet_ENG_2025.06.25_1.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Common App Teacher Brag Sheet (PDF)
              </a>
            </div>

            <button
              className="art-back-bottom"
              onClick={() => window.history.back()}
            >
              Back to all articles
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
