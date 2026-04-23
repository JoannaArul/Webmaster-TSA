import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Bedtime from "../assets/Bedtime.webp";
import WomanJournaling from "../assets/WomanJournaling.webp";
import JournalingBed from "../assets/JournalinBed.webp";

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

export default function Sleep() {
  const isLoaded = useImagePreload([Bedtime]);

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
            backgroundImage: isLoaded(Bedtime) ? `url(${Bedtime})` : "none",
            backgroundColor: "#1a2e42",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            opacity: isLoaded(Bedtime) ? 1 : 0,
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
                How to Actually Sleep When Your Brain Won't Turn Off During Exam Season
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
                <span>5 min read</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BODY ── */}
        <div className="art-container">

          <p className="art-intro">
            It is 1:47 AM and you have a chemistry final in eight hours. You finished studying two hours ago. Your notes are put away, your backpack is zipped, and your alarm is set. But your brain did not get the memo. It is still running through reaction equations, worrying about the essay you submitted last Tuesday, and reminding you about the group project due Friday. You are exhausted and wide awake at the same time.
          </p>

          <p className="art-intro-lead">
            This is the exam season sleep problem, and almost every student deals with it. Your body is begging you to rest, but your mind is stuck in overdrive. The worst part is that you know poor sleep will tank your performance the next day, which makes you stress about not sleeping, which keeps you awake even longer. It is a miserable cycle.
          </p>

          <div className="art-body">

            <p>
              The advice you usually hear is to just relax. That is not helpful when your brain is treating every unanswered flashcard like a life-or-death situation. You need specific, practical strategies that actually work when your thoughts will not quiet down.
            </p>

            <h2>1. Set a Hard Shutdown Time for Studying</h2>

            <p>
              Your brain cannot go from full-speed studying to sleep in five minutes. It needs a runway. If you study right up until the moment you climb into bed, you are basically asking your mind to slam the brakes at 70 miles per hour. That does not work for cars and it does not work for your nervous system.
            </p>

            <p>
              Pick a time to stop studying and stick to it. An hour before bed is ideal, but even thirty minutes makes a difference. This does not mean you are wasting time. It means you are giving your brain the signal that the work is done for the day. Without that signal, it will keep processing information long after you close your textbook.
            </p>

            <p>
              The hardest part is trusting that you have studied enough. You will always feel like you could do more. But the version of you that slept six hours will outperform the version that crammed until 2 AM every single time.
            </p>

            <img src={WomanJournaling} alt="Woman writing in a journal at her desk" className="art-section-img" />

            <h2>2. Do Something Boring on Purpose</h2>

            <p>
              After you stop studying, you need a transition activity that is low-effort and not stimulating. This is not the time to scroll TikTok or start a new episode of something. Screens keep your brain alert even when the content feels mindless. The blue light is part of it, but the bigger issue is that your brain keeps reacting to what it sees.
            </p>

            <p>
              Read something that has nothing to do with school. Organize your desk drawer. Fold laundry. Listen to a slow podcast about something you do not care about very much. The goal is to bore your brain into powering down. It sounds silly, but it works because you are replacing racing thoughts with something so dull your mind gives up and starts to drift.
            </p>

            <p>
              Think of it like a cooldown after a workout. You would not sprint and then immediately sit on the couch. Your brain needs the same kind of gradual slowdown.
            </p>

            <h2>3. Write Down the Worry Loop</h2>

            <p>
              When you lie in bed thinking about everything you need to do tomorrow, your brain is trying to hold onto that information because it is afraid you will forget. The fix is simple. Give it somewhere else to store the list.
            </p>

            <p>
              Keep a notebook next to your bed. Before you turn the lights off, spend three minutes writing down every single thing that is bouncing around in your head. The quiz you are nervous about. The email you forgot to send. The fact that you need to print something before first period. Get it all out of your head and onto paper.
            </p>

            <p>
              This works because your brain trusts the written list. Once it knows the information is saved somewhere, it stops repeating it on a loop. You are not solving the problems tonight. You are just parking them until morning.
            </p>

            <img src={JournalingBed} alt="Notebook and pen on a bedside table" className="art-section-img" />

            <h2>4. Control Your Breathing (Even If It Feels Dumb)</h2>

            <p>
              You have probably heard this before and rolled your eyes. Fair. But the reason breathing exercises keep coming up is because they are one of the few things that physically force your nervous system to calm down. When you are stressed, your breathing gets shallow and fast. Your body reads that as a signal to stay alert. Slowing your breathing manually reverses that signal.
            </p>

            <p>
              Try breathing in for four counts, holding for four counts, and breathing out for six counts. Do this for two minutes. You do not need to be in a special position or light a candle. Just lie in bed and count. The exhale being longer than the inhale is the key part. It activates the part of your nervous system that tells your body it is safe to rest.
            </p>

            <p>
              It will not knock you out instantly. But after a few rounds, you will notice your heart rate dropping and your muscles unclenching. That is the shift your body needs to start falling asleep.
            </p>

            <h2>5. Stop Checking the Clock</h2>

            <p>
              Every time you look at the clock and calculate how many hours of sleep you will get if you fall asleep right now, you make the problem worse. That math creates a new wave of stress every single time. Four hours and twenty-three minutes is not a comforting number. It is a reason to panic, which wakes you up even more.
            </p>

            <p>
              Turn your phone face down. Rotate your alarm clock toward the wall. You already set your alarm, so the clock has done its job. Checking it repeatedly does not give you new information. It just gives you new anxiety.
            </p>

            <p>
              If you find yourself reaching for your phone out of habit, put it across the room. This also forces you to physically get up when your alarm goes off in the morning, which is a bonus.
            </p>

            <h2>6. Accept That One Bad Night Will Not Ruin You</h2>

            <p>
              Here is the truth that nobody tells you during exam season. One night of bad sleep will not destroy your grade. Your body is surprisingly good at functioning on less rest than you think, especially for one day. The real damage comes from weeks of poor sleep stacked on top of each other, not from a single rough night before a test.
            </p>

            <p>
              When you stop catastrophizing about the sleep you are not getting, you remove the biggest thing keeping you awake. The pressure to fall asleep is often worse than the actual tiredness. Let yourself lie there. Rest your eyes. Even if you do not fall into deep sleep, your body is still recovering more than it would if you were sitting up studying.
            </p>

            <p>
              You have gotten through hard days on bad sleep before. You will get through this one too. Remind yourself of that and let go of the scoreboard in your head.
            </p>

            <div className="resource-box">
              <h3>Sleep and Wellness Resources</h3>

              <a
                className="resource-link"
                href="https://www.sleepfoundation.org/teens-and-sleep"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sleep Foundation — Teens and Sleep
              </a>

              <a
                className="resource-link"
                href="https://kidshealth.org/en/teens/sleep.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                KidsHealth — Why Sleep Matters for Teens
              </a>

              <a
                className="resource-link"
                href="https://www.headspace.com/sleep"
                target="_blank"
                rel="noopener noreferrer"
              >
                Headspace — Free Sleep Resources
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
