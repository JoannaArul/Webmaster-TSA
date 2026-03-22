import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import resumeHero from "../assets/resume-hero.webp";
import notebookDesk from "../assets/notebook-desk.webp";
import studentWriting from "../assets/student-writing.webp";
import interviewResume from "../assets/interview-resume.webp";

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
    background: #e5f3fb;
    color: #1a6fa8;
    padding: 0.28rem 0.85rem;
    border-radius: 20px;
    font-size: 0.69rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1.05rem;
  }

  .art-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #000000;
    line-height: 1.2;
    letter-spacing: -0.025em;
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
    width: 3px; height: 3px;
    background: #bbb;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
  }

  .art-intro {
    font-size: 1.1rem;
    line-height: 1.88;
    color: #1a1a18;
    margin-bottom: 1.5rem;
  }

  .art-intro-lead {
    font-size: 1.08rem;
    color: #000000;
    font-weight: 500;
    line-height: 1.78;
    border-left: 3.5px solid #4B9CD3;
    padding: 1rem 1.1rem;
    margin-bottom: 2.25rem;
    background: #eaf5fb;
    border-radius: 0 8px 8px 0;
  }

  .art-body p {
    font-size: 1.02rem;
    line-height: 1.85;
    color: #1a1a18;
    margin-bottom: 1.35rem;
  }

  .art-body h2 {
    font-size: 1.32rem;
    font-weight: 700;
    color: #000000;
    margin: 2.85rem 0 1rem;
    padding-left: 1rem;
    border-left: 3.5px solid #4B9CD3;
    line-height: 1.35;
  }

  .art-section-img {
    width: 100%;
    max-height: 380px;
    object-fit: cover;
    border-radius: 12px;
    margin: 1.75rem 0 2.25rem;
    display: block;
    background: #c8d9bb;
    border: 1.5px solid #dce8d5;
  }

  .resource-box {
    background: #eaf5fb;
    border: 1.5px solid #b3d9f0;
    border-radius: 12px;
    padding: 1.5rem 1.75rem;
    margin-top: 3rem;
  }

  .resource-box h3 {
    font-size: 0.72rem;
    font-weight: 700;
    color: #494A48;
    margin-bottom: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
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
    transition: color 0.18s;
    font-weight: 500;
  }

  .resource-link:last-child { border-bottom: none; }
  .resource-link:hover { color: #1a5e8a; }
  .resource-link svg { flex-shrink: 0; }

  .art-back-bottom {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: 3.5rem;
    color: #494A48;
    font-size: 0.85rem;
    font-weight: 600;
    background: none;
    border: 1.5px solid #c4cfc2;
    border-radius: 8px;
    padding: 0.58rem 1.2rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .art-back-bottom:hover {
    background: #494A48;
    color: #fff;
    border-color: #494A48;
  }

  /* Tablet (max 768px) */
  @media (max-width: 768px) {
    .art-container { padding: 2rem 1.1rem 3.5rem; }
    .art-title { font-size: 1.7rem; }
    .art-body h2 { font-size: 1.18rem; margin: 2.25rem 0 0.85rem; }
    .art-intro { font-size: 1rem; }
    .art-section-img { max-height: 300px; border-radius: 8px; }
    .resource-box { padding: 1.2rem 1.3rem; }
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
    .art-back-bottom { width: 100%; justify-content: center; margin-top: 2.5rem; }
  }
`;

export default function Resume() {
  const isLoaded = useImagePreload([resumeHero]);

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
            backgroundImage: isLoaded(resumeHero) ? `url(${resumeHero})` : "none",
            backgroundColor: "#1a2e42",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            opacity: isLoaded(resumeHero) ? 1 : 0,
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
                background: "rgba(229,243,251,0.18)",
                color: "#e5f3fb",
                border: "1px solid rgba(229,243,251,0.35)",
                padding: "0.28rem 0.85rem",
                borderRadius: "20px",
                fontSize: "0.69rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.85rem",
              }}>Resume Tips</span>
              <h1 style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "clamp(1.45rem, 4vw, 2.4rem)",
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                textShadow: "0 4px 18px rgba(0,0,0,0.35)",
              }}>
                From Classroom to Lab: How to Write a Research Resume That Actually Works
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
                <span>Alisha Varshney</span>
                <span style={{ width: 3, height: 3, background: "rgba(255,255,255,0.5)", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                <span>March 10, 2026</span>
                <span style={{ width: 3, height: 3, background: "rgba(255,255,255,0.5)", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                <span>5 min read</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="art-container">
          <p className="art-intro">
            Staring at a lab posting from a place like NC State or Duke as a high schooler is intimidating.
            You look at your resume and all you see is a summer spent lifeguarding or the time you spent mowing
            lawns. It feels like every other applicant was born knowing how to run a centrifuge while you are
            still trying to figure out how to find a parking spot on a college campus.
          </p>
          <p className="art-intro-lead">
            The good news is that researchers are not looking for a finished genius when they hire high schoolers.
            They want someone who is reliable, follows instructions, and won't accidentally break an expensive
            piece of glass. You do not need a college degree to get a foot in the door in the Triangle. You just
            need to stop writing a resume for a summer job and start writing one for a scientist.
          </p>

          <div className="art-body">

            <img src={notebookDesk} alt="Books and notebook on a desk" className="art-section-img" />

            <h2>1. Put Your Education and Advanced Classes First</h2>
            <p>
              Since you are in high school, your school work is your full-time career. Researchers want to see
              your GPA and the specific knowledge you have already learned. List your high school, your current
              grade level, and your expected graduation date right at the top of the page. If your GPA is over a
              3.0, make it easy to find.
            </p>
            <p>
              Under that, create a section for relevant coursework. Do not list every class you have taken since
              freshman year. Pick the ones that relate directly to a lab, like AP Biology, Chemistry, or
              Statistics. This tells the person hiring you that you already know the basic vocabulary. It saves
              them from having to explain the absolute basics during your first week.
            </p>
            <p>
              This section also helps fill the page if you do not have a long work history. It proves you have
              the brainpower to handle the work. Use simple bullet points to keep this list easy for a busy
              researcher to read quickly.
            </p>

            <h2>2. List Your Technical and Digital Tools</h2>
            <p>
              Lab managers want to see what you can do with your hands and a computer. Create a dedicated section
              for technical skills. You might have one category for lab skills you learned in class, like using a
              microscope or a balance, and another for data tools like Excel, Google Sheets, or even basic coding.
            </p>
            <p>
              Be honest about what you know. If you used a specific software for a science fair project, list it.
              Just be ready to explain the process if they ask you about it in an interview. Categorizing these
              skills makes it easy for a recruiter to see your value in just a few seconds.
            </p>
            <p>
              Avoid using vague phrases like "good at computers." Just list the name of the tool or the technique.
              This tells the reader you have the right mindset for the job. It is much more effective than writing
              a long paragraph about how much you love science.
            </p>

            <img src={studentWriting} alt="Student writing at a wooden desk" className="art-section-img" />

            <h2>3. Treat Your Science Fair or Class Projects Like a Job</h2>
            <p>
              This is the best way to show experience if you have never had an internship. If you spent months
              working on a science fair project or a big lab report, that counts as research. Create a section
              called Research Projects and give yourself a title like Student Researcher.
            </p>
            <p>
              Describe what you did using a simple formula: what was the goal, what method did you use, and what
              was the result? For example, you might write that you tested three different types of soil to see
              which grew the tallest plants. This shows you understand how a project moves from a question to a
              conclusion.
            </p>
            <p>
              Doing this makes you look like a serious student instead of someone just looking for a line on their
              college application. It proves you can follow a protocol and handle data without someone holding your
              hand. It also shows you have the patience required for real scientific work.
            </p>

            <h2>4. Use Your Clubs and Sports to Show Reliability</h2>
            <p>
              You might think your time on the soccer team or in the marching band is useless here. It is not.
              Research requires you to be reliable and show up every day. You just need to rephrase your
              extracurriculars to highlight those traits.
            </p>
            <p>
              If you were a captain or a club officer, you managed a schedule and coordinated a team. If you were
              in a demanding club like Robotics or Science Olympiad, you followed strict rules and solved problems
              under a deadline. These are the same "soft" skills that keep a professional lab running smoothly.
            </p>
            <p>
              Focus on your consistency. A lead researcher would rather hire a student who shows up on time every
              day than a genius who forgets to check their email. Use your club history to prove you are a
              responsible person who can handle a professional schedule.
            </p>

            <img src={interviewResume} alt="Business interview with resume" className="art-section-img" />

            <h2>5. Keep the Layout Clean and on One Page</h2>
            <p>
              Scientists value clarity and data over flashy design. Your resume should reflect that. Use a clean
              font like Arial or Calibri and stay away from bright colors or weird graphics. Keep everything to
              exactly one page. If you cannot fit your info on one page, it suggests you do not know how to pick
              out the important parts.
            </p>
            <p>
              Use bullet points that start with strong action words. Instead of saying you were "responsible for"
              something, say you "managed," "built," or "tested" it. This makes you sound like a leader rather
              than someone who just watched things happen.
            </p>
            <p>
              Check your spelling three times. In a lab, a small mistake can ruin an entire experiment. If you
              have typos on your resume, a researcher will worry you will make mistakes with their data. Keep the
              document tight, clean, and professional.
            </p>

            <div className="resource-box">
              <h3>Ready-to-Use Research Resume Templates</h3>
              <a className="resource-link" href="https://www.myperfectresume.com/resume/templates" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                myperfectresume.com — Resume Templates
              </a>
              <a className="resource-link" href="https://www.resume-now.com/t3" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                resume-now.com — Resume Templates
              </a>
              <a className="resource-link" href="https://www.canva.com/resumes/templates/" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                canva.com — Free Resume Templates
              </a>
            </div>

            <button className="art-back-bottom" onClick={() => window.history.back()}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to all articles
            </button>

          </div>
        </div>

      </div>
    </>
  );
}
