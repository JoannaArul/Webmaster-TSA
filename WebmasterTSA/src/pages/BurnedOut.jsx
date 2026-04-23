import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BurnedFemale from "../assets/BurnedFemale.webp";
import WomanChocolate from "../assets/WomanChocolate.webp";
import MusicWoman from "../assets/MusicWoman.webp";

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
    background: #fce8f0;
    color: #a0295a;
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

export default function BurnedOut() {
  const isLoaded = useImagePreload([BurnedFemale]);

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
            backgroundImage: isLoaded(BurnedFemale) ? `url(${BurnedFemale})` : "none",
            backgroundColor: "#1a2e42",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            opacity: isLoaded(BurnedFemale) ? 1 : 0,
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
                background: "rgba(252,232,240,0.18)",
                color: "#fce8f0",
                border: "1px solid rgba(252,232,240,0.35)",
                padding: "0.28rem 0.85rem",
                borderRadius: "20px",
                fontSize: "0.69rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.85rem",
              }}>Wellness</span>
              <h1 style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "clamp(1.45rem, 4vw, 2.4rem)",
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                textShadow: "0 4px 18px rgba(0,0,0,0.35)",
              }}>
                Burned Out and Behind: How to Recover From Academic Burnout Without Losing Your Mind
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
            You used to care about school. You used to highlight your textbook and color-code your planner and feel a little rush when you got a good grade back. Now you stare at your assignments like they are written in a language you forgot how to read. You are tired in a way that sleep does not fix. That is burnout, and pretending it is just laziness will only make it worse.
          </p>

          <p className="art-intro-lead">
            Academic burnout does not show up overnight. It builds slowly. One week you skip your usual study session because you are exhausted. The next week you stop caring about a project you would have obsessed over a month ago. Eventually you find yourself sitting in class wondering why any of this matters. The worst part is the guilt. You know you should care more. You just can't make yourself do it.
          </p>

          <div className="art-body">

            <p>
              The thing nobody tells high schoolers is that burnout is not a character flaw. It is your brain telling you that something about the way you are working is broken. The fix is not to push harder. It is to change the system.
            </p>

            <h2>1. Admit That You Hit a Wall</h2>

            <p>
              This sounds obvious, but most students skip this step entirely. They keep dragging themselves through the motions, hoping the feeling will pass on its own. It rarely does. Burnout is not a bad week. It is a pattern, and patterns do not break themselves.
            </p>

            <p>
              Take an honest look at where you are. Are you sleeping less than six hours a night? Have you stopped doing things you used to enjoy? Do you feel a knot in your stomach every Sunday night? Those are not signs of a busy schedule. Those are signs that your body is running on fumes.
            </p>

            <p>
              Naming the problem is not dramatic. It is practical. You would not try to run on a sprained ankle. Treating your brain the same way is not weakness. It is the first smart decision you have made in a while.
            </p>

            <img src={WomanChocolate} alt="Woman journaling with a cup of hot chocolate" className="art-section-img" />

            <h2>2. Find the Actual Source of the Drain</h2>

            <p>
              Burnout is not always about too much homework. Sometimes it is about the wrong kind of pressure. Maybe you signed up for four AP classes because your parents expected it. Maybe you are spending every evening at an extracurricular you stopped enjoying two years ago. Maybe you are comparing yourself to someone online who seems to have it all together.
            </p>

            <p>
              Sit down and write out everything on your plate. Every class, every club, every obligation. Then mark the ones that actually matter to you and the ones you are only doing because you feel like you should. The gap between those two lists is usually where the burnout lives.
            </p>

            <p>
              You cannot fix what you cannot see. This exercise is not about quitting everything. It is about figuring out which commitments are feeding you and which ones are draining you dry.
            </p>

            <h2>3. Drop Something (Yes, Really)</h2>

            <p>
              This is the part that terrifies high schoolers. You have been told since freshman year that colleges want to see a packed schedule and a mile-long activity list. So dropping anything feels like failure.
            </p>

            <p>
              Here is the truth. A student who does three things well looks better than a student who does seven things poorly. Admissions officers can tell the difference between genuine involvement and a resume padded with commitments you barely showed up for. More importantly, no college acceptance is worth your mental health.
            </p>

            <p>
              Talk to your guidance counselor about adjusting your course load if you need to. Quit the club that makes you miserable every Tuesday afternoon. You are not giving up. You are making room to actually care about the things that stay on your list.
            </p>

            <img src={MusicWoman} alt="Student relaxing outdoors with headphones" className="art-section-img" />

            <h2>4. Rebuild Your Routine From Scratch</h2>

            <p>
              When you are burned out, your old routine is part of the problem. Going back to it and hoping for a different result does not work. Instead, start small and build something new.
            </p>

            <p>
              Pick one non-negotiable task per day. Not five. One. Maybe today it is finishing that history reading. Tomorrow it is sending an email to your teacher about a missed assignment. The point is to prove to yourself that you can still get things done without the panic spiral that used to fuel your productivity.
            </p>

            <p>
              Add structure back in slowly. Set a hard stop time for schoolwork each night. Your brain needs a clear signal that the work is done for the day. Without that boundary, everything bleeds together and you end up thinking about homework at midnight even when you are not doing any of it.
            </p>

            <h2>5. Stop Using Your Phone as a Rest Strategy</h2>

            <p>
              Scrolling TikTok for an hour after studying does not count as rest. Your brain is still processing information, reacting to content, and comparing itself to other people. You finish the scroll session feeling more drained than when you started.
            </p>

            <p>
              Actual rest looks boring. It looks like sitting outside for fifteen minutes without your phone. It looks like drawing something bad in a notebook or playing with your dog or just lying on the floor listening to music. Your brain needs empty space to recover. Filling every gap with a screen makes the burnout worse, not better.
            </p>

            <p>
              This does not mean you need to delete all your apps and go live in the woods. It means you need at least one block of time each day where your brain gets to do absolutely nothing productive. That is when it heals.
            </p>

            <h2>6. Talk to Someone Who is Not a Search Engine</h2>

            <p>
              Burnout makes you feel isolated. You assume everyone else is handling the pressure fine and you are the only one falling apart. That is almost never true. Talking to a parent, a school counselor, or even a friend who gets it can break that cycle fast.
            </p>

            <p>
              If your school has a counselor or a psychologist, make an appointment. You do not need to be in a crisis to talk to someone. These people exist specifically to help students who are overwhelmed before things get worse. Using that resource is not a sign of weakness. It is a sign that you are paying attention to what you need.
            </p>

            <p>
              If talking to an adult feels like too much, start with a friend. Sometimes just hearing someone say "yeah, I feel that too" is enough to remind you that you are not broken. You are just tired.
            </p>

            <h2>7. Redefine What a Good Day Looks Like</h2>

            <p>
              Before burnout, a good day probably meant finishing all your homework, acing a quiz, and still making it to practice on time. That standard is part of what got you here. You need a new one.
            </p>

            <p>
              For now, a good day might mean getting out of bed on time and finishing one assignment without spiraling. It might mean eating an actual meal instead of skipping lunch because you were cramming. It might mean going to bed before midnight for the first time in two weeks.
            </p>

            <p>
              These sound small. They are not. Recovery is not a dramatic comeback montage. It is a series of tiny, boring wins that slowly add up until you realize you feel like yourself again. Give yourself credit for those wins instead of punishing yourself for not being back to full speed yet.
            </p>

            <div className="resource-box">
              <h3>Helpful Resources for Students</h3>

              <a
                className="resource-link"
                href="https://childmind.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Child Mind Institute — Mental Health Resources for Teens
              </a>

              <a
                className="resource-link"
                href="https://www.samhsa.gov/find-help/national-helpline"
                target="_blank"
                rel="noopener noreferrer"
              >
                SAMHSA National Helpline (Free &amp; Confidential)
              </a>

              <a
                className="resource-link"
                href="https://kidshealth.org/en/teens/stress.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                KidsHealth — Managing Stress &amp; Burnout
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
