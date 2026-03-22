import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LabPicture from "../assets/LabPicture.webp";
import Scientist from "../assets/Scientist.webp";
import NotebookMan from "../assets/NotebookMan.webp";

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
  }
`;

export default function Lab() {
  const isLoaded = useImagePreload([LabPicture]);

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
            backgroundImage: isLoaded(LabPicture) ? `url(${LabPicture})` : "none",
            backgroundColor: "#1a2e42",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            opacity: isLoaded(LabPicture) ? 1 : 0,
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
              }}>Science</span>
              <h1 style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "clamp(1.45rem, 4vw, 2.4rem)",
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                textShadow: "0 4px 18px rgba(0,0,0,0.35)",
              }}>
                What Working in a Lab Is Actually Like: Expectations vs. Reality for High Schoolers
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
                <span>March 21, 2026</span>
                <span style={{ width: 3, height: 3, background: "rgba(255,255,255,0.5)", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                <span>6 min read</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="art-container">

          <p className="art-intro">
            You picture yourself in a white coat, pipetting something important into a row of test tubes while dramatic music plays in the background. Maybe you discover something groundbreaking by the end of the summer. Maybe the professor shakes your hand and says you are the most talented high schooler they have ever worked with. That is the movie version. The real version involves a lot more washing dishes than you think.
          </p>

          <p className="art-intro-lead">
            Getting a spot in a research lab as a high schooler is a real accomplishment, especially in the Triangle where labs at Duke, UNC, and NC State get flooded with applications. But the gap between what students expect and what the job actually looks like on day one is massive. Knowing what you are walking into will save you from disappointment and help you get way more out of the experience.
          </p>

          <div className="art-body">

            <p>
              This is not meant to scare you away from lab work. It is meant to prepare you so that when the boring parts hit, you do not assume you are doing something wrong.
            </p>

            <h2>1. You Will Not Be Running Your Own Experiments</h2>

            <p>
              This is the biggest expectation adjustment. In your high school science class, you designed your own experiment, picked your variables, and wrote up the results. In a real research lab, you are joining a project that has been running for months or even years. The lead researcher already has a plan. Your job is to help execute a small piece of it.
            </p>

            <p>
              That might mean preparing samples, labeling tubes, or entering data into a spreadsheet. It might mean repeating the same procedure forty times in a row to build a dataset. You are not making the big decisions. You are supporting the people who do. This is not a demotion. This is how every scientist starts. The grad students you see running complex experiments spent their first year doing exactly what you are doing now.
            </p>

            <p>
              If you go in expecting to lead and instead find yourself assisting, it is easy to feel like the experience is not worth it. It is. You are learning how real science operates, and that is something you cannot get from a textbook.
            </p>

            <img src={Scientist} alt="Student working at a lab bench" className="art-section-img" />

            <h2>2. Most of Your Time Will Be Spent on Prep Work</h2>

            <p>
              The exciting part of research, the actual experiment, takes up a surprisingly small portion of your day. The rest is preparation. You will spend time mixing solutions, calibrating instruments, cleaning glassware, organizing supplies, and setting up equipment before anything interesting happens.
            </p>

            <p>
              This is tedious. There is no way around it. But this prep work is what makes the experiment possible. If the solutions are mixed wrong or the instruments are not calibrated correctly, the data is useless. The boring work is the foundation that everything else is built on. Labs that skip prep work produce bad science.
            </p>

            <p>
              The students who thrive in a lab setting are the ones who take the prep seriously instead of rushing through it to get to the fun parts. Researchers notice when a high schooler pays attention to the details. That is how you earn more responsibility over time.
            </p>

            <h2>3. Things Will Fail and That Is Normal</h2>

            <p>
              In school, when an experiment does not produce the expected result, it usually means you did something wrong. In a research lab, failure is part of the process. Experiments fail constantly. Samples get contaminated. Results come back inconclusive. Entire weeks of work sometimes lead nowhere.
            </p>

            <p>
              The first time this happens to you, it will feel terrible. You will wonder if you ruined something or if you are not cut out for this. You are not the problem. This is just what research looks like. The published paper that makes everything seem clean and linear is the end product of hundreds of failed attempts that nobody sees.
            </p>

            <p>
              What matters is how you respond to the failure. A good lab researcher does not panic or pretend it did not happen. They write down exactly what went wrong, tell the person supervising them, and figure out the next step. That mindset is more valuable than any single successful experiment.
            </p>

            <img src={NotebookMan} alt="Lab notebook with handwritten notes and data" className="art-section-img" />

            <h2>4. Reading Papers Is a Bigger Part of the Job Than You Expect</h2>

            <p>
              Before you touch any equipment, you will probably be asked to read research papers related to the lab's work. These papers are dense, full of jargon, and nothing like the articles you read in class. Your first one might take you two hours to get through, and you still might not understand half of it.
            </p>

            <p>
              That is okay. Nobody expects you to read like a PhD student on your first day. The goal is to understand the basics of what the lab is studying and why the work matters. Focus on the introduction and the conclusion first. Those sections are written in the most accessible language and will give you the big picture.
            </p>

            <p>
              Ask questions about what you read. The grad students and postdocs in the lab will respect you for it. Pretending you understood everything when you did not will catch up to you fast. Being honest about what confuses you is not a weakness in a research environment. It is exactly how learning works.
            </p>

            <h2>5. The Social Side Matters More Than You Think</h2>

            <p>
              A research lab is a small team, and how you interact with the people around you matters just as much as your technical skills. The grad student who trains you is giving up their own research time to teach you things. The lab manager who shows you where supplies are stored is doing you a favor. Being polite, showing up on time, and saying thank you goes a long way.
            </p>

            <p>
              Pay attention to the culture of the lab. Some labs are quiet and focused. Others are more social and collaborative. Follow the lead of the people who have been there longer than you. Do not be the person who shows up late, leaves early, and spends breaks staring at their phone without talking to anyone.
            </p>

            <p>
              The relationships you build in a lab can shape your entire academic path. A professor who likes working with you might write you a recommendation letter, invite you back the next summer, or connect you with opportunities at other institutions. That does not happen because you ran the best experiment. It happens because you were someone they enjoyed having around.
            </p>

            <h2>6. It Will Look Great on Your Resume, but That Should Not Be the Only Reason You Do It</h2>

            <p>
              A lot of students pursue lab work because it looks impressive on a college application. That is a valid reason to start, but it is a bad reason to stay. If the only thing keeping you in the lab is the line it adds to your resume, you will be miserable every time the work gets repetitive or hard.
            </p>

            <p>
              The students who get the most out of a lab experience are the ones who find something about the work that genuinely interests them. It does not have to be the topic itself. Maybe you enjoy the problem-solving process. Maybe you like working with your hands. Maybe you appreciate the structure and routine. Find the thing that keeps you showing up even when the work is not exciting, and you will leave the experience with something much more valuable than a resume line.
            </p>

            <p>
              Lab work is not glamorous. It is slow, repetitive, and full of setbacks. But it is one of the most honest ways to find out if you actually like science or if you just like the idea of it. Either answer is useful. Both will save you time down the road.
            </p>

            <div className="resource-box">
              <h3>Finding Lab Opportunities in the Triangle</h3>

              <a
                className="resource-link"
                href="https://our.unc.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                UNC Office of Undergraduate Research
              </a>

              <a
                className="resource-link"
                href="https://undergraduateresearch.duke.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Duke Undergraduate Research Support
              </a>

              <a
                className="resource-link"
                href="https://undergrad-research.ncsu.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NC State Office of Undergraduate Research
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
