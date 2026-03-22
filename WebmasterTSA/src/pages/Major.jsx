import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ManWithMap from "../assets/ManWithMap.webp";
import Hallway from "../assets/Hallway.webp";
import Pottery from "../assets/Pottery.webp";
import GroupOutside from "../assets/GroupOutside.webp";

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
    background: #fef6e4;
    color: #966210;
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

export default function Major() {
  const isLoaded = useImagePreload([ManWithMap]);

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
            backgroundImage: isLoaded(ManWithMap) ? `url(${ManWithMap})` : "none",
            backgroundColor: "#1a2e42",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            opacity: isLoaded(ManWithMap) ? 1 : 0,
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
                background: "rgba(254,246,228,0.18)",
                color: "#fef6e4",
                border: "1px solid rgba(254,246,228,0.35)",
                padding: "0.28rem 0.85rem",
                borderRadius: "20px",
                fontSize: "0.69rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.85rem",
              }}>Career</span>
              <h1 style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "clamp(1.45rem, 4vw, 2.4rem)",
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                textShadow: "0 4px 18px rgba(0,0,0,0.35)",
              }}>
                You Don't Need to Know Your Major Yet: How to Explore Without Panicking
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
            Every Thanksgiving, some relative you barely see asks the same question. "So, what do you want to study in college?" You smile and say something vague about maybe doing biology or maybe engineering, and then you spend the car ride home spiraling because the truth is you have absolutely no idea. You are sixteen. You cannot even decide what to eat for lunch most days.
          </p>

          <p className="art-intro-lead">
            The pressure to pick a major before you have even picked a college is one of the most stressful parts of being a high schooler right now. Here is what nobody tells you at the college information sessions: not knowing is completely normal, and forcing yourself to pick before you are ready usually makes things worse, not better.
          </p>

          <div className="art-body">

            <h2>1. Most College Students Change Their Major Anyway</h2>

            <p>
              This is not something you hear at campus tours, but it happens constantly. A huge number of college students switch their major at least once. Some switch two or three times. The student who walks in on day one absolutely certain they want to study political science ends up graduating with a degree in data analytics. It happens all the time.
            </p>

            <p>
              Colleges know this. That is why most schools do not make you officially declare a major until the end of your sophomore year. You have four semesters to take classes, explore different departments, and figure out what actually holds your attention when the novelty wears off. The system is literally designed for people who do not have it all figured out yet.
            </p>

            <p>
              So when you feel behind because you have not picked your lane, remember that the lane does not need to exist yet. The people who seem certain at seventeen are not more prepared than you. They just picked earlier. That does not mean they picked right.
            </p>

            <img src={Hallway} alt="Students walking through a university hallway" className="art-section-img" />

            <h2>2. Stop Asking "What Do I Want to Be?" and Start Asking "What Do I Like Doing?"</h2>

            <p>
              The question "what do you want to be when you grow up" is broken. It assumes there is one answer, one career, one identity waiting for you at the end of a straight path. Real life does not work like that. Most adults have had multiple careers. The job your parents do today probably did not exist when they were your age.
            </p>

            <p>
              A better question is: what do you like spending time on? Not what sounds impressive or what pays well, but what genuinely holds your attention. Maybe you lose track of time when you are editing videos. Maybe you enjoy organizing things more than your friends think is normal. Maybe you light up during biology lab but zone out during the lecture part.
            </p>

            <p>
              These are clues, not answers. You do not need to turn every interest into a career plan. You just need to pay attention to what pulls you in. Over time, patterns will start to form, and those patterns will point you somewhere useful.
            </p>

            <h2>3. Use High School to Run Cheap Experiments</h2>

            <p>
              Right now, trying something new costs you almost nothing. You can join a club for a semester and quit if you hate it. You can take an elective in a subject you know nothing about. You can volunteer at a hospital, shadow someone at an engineering firm, or spend a Saturday at a free coding workshop. If it does not work out, you have lost nothing except a few hours.
            </p>

            <p>
              In college, experimenting gets more expensive. Every class costs real money, and switching majors can add extra semesters. That is why high school is the best time to try a wide range of things without worrying about wasting resources. Think of it as low-stakes exploration. You are not committing to anything. You are gathering information.
            </p>

            <p>
              The students who show up to college with the clearest sense of direction are not the ones who knew their major at fifteen. They are the ones who tried a bunch of stuff in high school and figured out what they did not like. Ruling things out is just as valuable as finding the right thing.
            </p>

            <img src={Pottery} alt="Student trying pottery in an art class" className="art-section-img" />

            <h2>4. Talk to People Who Actually Do the Work</h2>

            <p>
              Reading about a career online gives you the highlight reel. Talking to someone who does it every day gives you the reality. If you think you might be interested in environmental science, find someone who works in that field and ask them what a normal Tuesday looks like. Not the TED Talk version. The actual, boring, day-to-day version.
            </p>

            <p>
              You can do this more easily than you think. Teachers, parents of friends, and local professionals are usually happy to talk to a high schooler who asks politely. In the Triangle, you are surrounded by people working at universities, hospitals, tech companies, and research labs. A short email asking for a fifteen-minute conversation is one of the most underused tools available to you.
            </p>

            <p>
              These conversations will save you from chasing a career that looks exciting from the outside but feels miserable from the inside. They will also expose you to jobs you did not know existed. Most interesting careers are not listed in a high school guidance office pamphlet.
            </p>

            <h2>5. Ignore the People Who Have It All Figured Out (They Probably Don't)</h2>

            <p>
              The classmate who has been saying "pre-med" since freshman year might change their mind the first time they take organic chemistry. The kid with the five-year plan might scrap the whole thing after one semester of college. Confidence is not the same thing as certainty, and certainty at sixteen is usually just a guess that sounds convincing.
            </p>

            <p>
              Comparing your confusion to someone else's confidence is a trap. You are seeing their public answer to the question, not their private doubts. Almost everyone your age is figuring this out as they go. The ones who admit it are just more honest about it.
            </p>

            <img src={GroupOutside} alt="Group of students having a casual conversation outdoors" className="art-section-img" />

            <h2>6. "Undecided" Is a Legitimate Starting Point</h2>

            <p>
              When you fill out a college application and it asks for your intended major, writing "undecided" is perfectly fine. Admissions offices see it constantly. It does not make you look lost or unmotivated. It makes you look like a student who is being honest rather than picking something random just to fill in the box.
            </p>

            <p>
              Some schools even have dedicated advising programs for undecided students. These programs are designed to help you explore different departments, take intro courses across multiple fields, and connect with faculty before you commit. Choosing "undecided" at these schools can actually give you more support, not less.
            </p>

            <p>
              The goal is not to arrive at college with a finished plan. The goal is to arrive with enough self-awareness to start narrowing things down. If you leave high school knowing what you are curious about, what kind of work energizes you, and what you definitely do not want to do, you are ahead of most people. Even the ones who sound like they have it figured out.
            </p>

            <div className="resource-box">
              <h3>Exploration Tools and Resources</h3>

              <a
                className="resource-link"
                href="https://bigfuture.collegeboard.org/explore-careers"
                target="_blank"
                rel="noopener noreferrer"
              >
                College Board — Career Exploration Tool
              </a>

              <a
                className="resource-link"
                href="https://www.bls.gov/ooh/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bureau of Labor Statistics — Occupational Outlook Handbook
              </a>

              <a
                className="resource-link"
                href="https://www.youscience.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouScience — Aptitude and Interest Assessment
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
