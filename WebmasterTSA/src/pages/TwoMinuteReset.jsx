import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const STEPS = ["breathe", "body", "ground", "reframe", "gratitude", "done"];

const BREATH_PHASES = [
  { label: "Inhale",  duration: 4, scale: 1.45 },
  { label: "Hold",    duration: 4, scale: 1.45 },
  { label: "Exhale",  duration: 4, scale: 1.0  },
];

const TOTAL_BREATH_CYCLES = 4;

const BODY_AREAS = [
  { area: "Shoulders", cue: "Let them drop away from your ears. Release any tension you're holding there." },
  { area: "Jaw",       cue: "Unclench your teeth. Let your lips part slightly. Soften your face." },
  { area: "Hands",     cue: "Open your palms. Relax your grip on whatever you're holding onto." },
  { area: "Stomach",   cue: "Take one slow breath into your belly. Let it expand fully, then release." },
];

const GROUND_PROMPTS = [
  "Something you can see right now",
  "Something you can physically feel",
  "A sound you can hear in this moment",
  "Something you are grateful to have nearby",
];

const REFRAME_LINES = [
  "You don't have to do everything today.",
  "One small step is still a step forward.",
  "Rest is not a reward. It is part of the work.",
  "You are allowed to take up space and take your time.",
  "Progress is not always visible. That does not mean it isn't happening.",
];

const GRATITUDE_PROMPTS = [
  "One thing that went okay today, even if small",
  "Something about your body you are thankful for right now",
  "A person who has made your life a little easier recently",
];

function useBreathCycle(active) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const phase = BREATH_PHASES[phaseIdx];
    startRef.current = performance.now();

    function tick(now) {
      const elapsed = (now - startRef.current) / 1000;
      const p = Math.min(elapsed / phase.duration, 1);
      setProgress(p);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        const nextIdx = (phaseIdx + 1) % BREATH_PHASES.length;
        if (nextIdx === 0) {
          setCycleCount((c) => c + 1);
        }
        setPhaseIdx(nextIdx);
        setProgress(0);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, phaseIdx]);

  return { phase: BREATH_PHASES[phaseIdx], progress, cycleCount };
}

function BreathingCircle({ phase, progress, cycleCount }) {
  const ease =
    progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

  const currentScale =
    phase.label === "Exhale"
      ? 1.45 - 0.45 * ease
      : phase.label === "Inhale"
      ? 1.0 + 0.45 * ease
      : 1.45;

  const ringOpacity = 0.12 + 0.28 * ease;
  const ring2Opacity = 0.06 + 0.14 * ease;

  return (
    <div className="tmr-circle-wrap">
      <div
        className="tmr-ring tmr-ring--2"
        style={{ transform: `scale(${currentScale + 0.38})`, opacity: ring2Opacity }}
      />
      <div
        className="tmr-ring"
        style={{ transform: `scale(${currentScale + 0.18})`, opacity: ringOpacity }}
      />
      <div
        className="tmr-circle"
        style={{ transform: `scale(${currentScale})` }}
      >
        <span className="tmr-phase-label">{phase.label}</span>
        <span className="tmr-phase-count">{phase.duration}s</span>
      </div>
      <div className="tmr-cycle-pips">
        {Array.from({ length: TOTAL_BREATH_CYCLES }).map((_, i) => (
          <span
            key={i}
            className={`tmr-pip ${cycleCount > i ? "tmr-pip--done" : cycleCount === i ? "tmr-pip--active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ step }) {
  const idx = STEPS.indexOf(step);
  const total = STEPS.length - 1;
  const pct = Math.round((idx / (total - 1)) * 100);

  return (
    <div className="tmr-progress-wrap">
      <div className="tmr-progress-track">
        <div className="tmr-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="tmr-progress-label">
        {idx < total ? `Step ${idx + 1} of ${total}` : "Complete"}
      </span>
    </div>
  );
}

export default function TwoMinuteReset() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [step, setStep] = useState("breathe");
  const [bodyIdx, setBodyIdx] = useState(0);
  const [groundInputs, setGroundInputs] = useState(["", "", "", ""]);
  const [groundFilled, setGroundFilled] = useState(0);
  const [reframeIdx, setReframeIdx] = useState(0);
  const [reframeDone, setReframeDone] = useState(false);
  const [gratitudeInputs, setGratitudeInputs] = useState(["", "", ""]);
  const [gratitudeFilled, setGratitudeFilled] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [breathReady, setBreathReady] = useState(false);

  const { phase, progress, cycleCount } = useBreathCycle(
    active && step === "breathe" && breathReady
  );

  function startSession() {
    setActive(true);
    setStep("breathe");
    setBodyIdx(0);
    setGroundInputs(["", "", "", ""]);
    setGroundFilled(0);
    setReframeIdx(0);
    setReframeDone(false);
    setGratitudeInputs(["", "", ""]);
    setGratitudeFilled(0);
    setBreathReady(false);
    setTimeout(() => setFadeIn(true), 30);
  }

  function goTo(next) {
    setFadeIn(false);
    setTimeout(() => {
      setStep(next);
      setFadeIn(true);
    }, 350);
  }

  function handleGroundInput(i, val) {
    const next = [...groundInputs];
    next[i] = val;
    setGroundInputs(next);
    setGroundFilled(next.filter((v) => v.trim().length > 0).length);
  }

  function handleGratitudeInput(i, val) {
    const next = [...gratitudeInputs];
    next[i] = val;
    setGratitudeInputs(next);
    setGratitudeFilled(next.filter((v) => v.trim().length > 0).length);
  }

  function cycleReframe() {
    if (reframeIdx < REFRAME_LINES.length - 1) {
      setReframeIdx((r) => r + 1);
    } else {
      setReframeDone(true);
    }
  }

  if (!active) {
    return (
      <>
        <style>{styles}</style>
        <main className="tmr-landing">
          <div className="tmr-landing-inner">
            <p className="tmr-eyebrow">Mental Health Moment</p>
            <h1 className="tmr-hero-title">The 5-Step Reset</h1>
            <p className="tmr-hero-sub">
              A few minutes to come back to yourself. This practice moves
              through breathing, a quick body check, grounding, reframing,
              and gratitude. You can go at your own pace.
            </p>

            <div className="tmr-landing-steps">
              {[
                { num: "01", label: "Breathe",   desc: "Box breathing to settle your nervous system" },
                { num: "02", label: "Body Scan",  desc: "Check in with where you're holding tension" },
                { num: "03", label: "Ground",     desc: "Use your senses to anchor yourself in the present" },
                { num: "04", label: "Reframe",    desc: "A gentle perspective to carry forward" },
                { num: "05", label: "Gratitude",  desc: "Name a few small things that are quietly good" },
              ].map(({ num, label, desc }) => (
                <div key={num} className="tmr-ls-card">
                  <span className="tmr-ls-num">{num}</span>
                  <div>
                    <strong>{label}</strong>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="tmr-landing-note">
              There is no timer. No score. Just a few minutes for you.
            </div>

            <button className="tmr-btn-primary" onClick={startSession}>
              Begin your reset
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="tmr-fullscreen">
        <div className="tmr-grain" />
        <div className="tmr-blob tmr-blob--1" />
        <div className="tmr-blob tmr-blob--2" />

        <div className={`tmr-content ${fadeIn ? "tmr-content--visible" : ""}`}>
          <ProgressBar step={step} />

          {step === "breathe" && (
            <section className="tmr-section">
              <p className="tmr-step-label">Step 1 of 5</p>
              <h2 className="tmr-step-title">Breathe</h2>
              <p className="tmr-step-desc">
                Let everything else go for a moment. Follow the circle through
                four full cycles. Breathe in through your nose, hold gently,
                then release slowly through your mouth.
              </p>

              {!breathReady ? (
                <div className="tmr-breath-start">
                  <div className="tmr-breath-tip">
                    <span className="tmr-breath-tip-label">Box Breathing</span>
                    <p>
                      Inhale for 4 counts. Hold for 4. Exhale for 4. This
                      pattern activates your parasympathetic nervous system,
                      slowing your heart rate and quieting your stress response.
                    </p>
                  </div>
                  <button
                    className="tmr-btn-primary"
                    onClick={() => setBreathReady(true)}
                  >
                    Start breathing
                  </button>
                </div>
              ) : (
                <>
                  <BreathingCircle phase={phase} progress={progress} cycleCount={cycleCount} />
                  <p className="tmr-breath-sub">Inhale 4 &nbsp;&middot;&nbsp; Hold 4 &nbsp;&middot;&nbsp; Exhale 4</p>
                  <button
                    className={`tmr-btn-next ${cycleCount < 1 ? "tmr-btn-next--dim" : ""}`}
                    onClick={() => cycleCount >= 1 && goTo("body")}
                  >
                    {cycleCount === 0
                      ? "Complete at least one cycle"
                      : cycleCount < TOTAL_BREATH_CYCLES
                      ? `Continue when ready (${cycleCount} of ${TOTAL_BREATH_CYCLES} cycles done)`
                      : "That felt good, keep going"}
                  </button>
                  {cycleCount >= 1 && (
                    <button className="tmr-btn-ghost" onClick={() => goTo("body")}>
                      Move on to body scan
                    </button>
                  )}
                </>
              )}
            </section>
          )}

          {step === "body" && (
            <section className="tmr-section">
              <p className="tmr-step-label">Step 2 of 5</p>
              <h2 className="tmr-step-title">Body Scan</h2>
              <p className="tmr-step-desc">
                We store stress in our bodies without realizing it. Work
                through each area below, releasing tension as you go.
              </p>

              <div className="tmr-body-cards">
                {BODY_AREAS.map(({ area, cue }, i) => (
                  <div
                    key={area}
                    className={`tmr-body-card ${i === bodyIdx ? "tmr-body-card--active" : ""} ${i < bodyIdx ? "tmr-body-card--done" : ""}`}
                  >
                    <div className="tmr-body-card-top">
                      <span className="tmr-body-area">{area}</span>
                      {i < bodyIdx && (
                        <svg className="tmr-body-check" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="#4B9CD3" strokeWidth="1.5" />
                          <polyline points="4.5,8.5 7,11 11.5,5.5" stroke="#4B9CD3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    {i === bodyIdx && (
                      <p className="tmr-body-cue">{cue}</p>
                    )}
                    {i === bodyIdx && (
                      <button
                        className="tmr-btn-tiny"
                        onClick={() => setBodyIdx((b) => b + 1)}
                      >
                        Done with {area.toLowerCase()}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {bodyIdx >= BODY_AREAS.length && (
                <button className="tmr-btn-next" onClick={() => goTo("ground")}>
                  My body feels a bit lighter
                </button>
              )}
            </section>
          )}

          {step === "ground" && (
            <section className="tmr-section">
              <p className="tmr-step-label">Step 3 of 5</p>
              <h2 className="tmr-step-title">Ground</h2>
              <p className="tmr-step-desc">
                When your mind is scattered, your senses can bring you back.
                Answer as many of these as you can. Take your time with each one.
              </p>

              <div className="tmr-ground-inputs">
                {GROUND_PROMPTS.map((placeholder, i) => (
                  <div key={i} className="tmr-input-row">
                    <span className="tmr-input-num">{i + 1}</span>
                    <input
                      className="tmr-input"
                      type="text"
                      placeholder={placeholder}
                      value={groundInputs[i]}
                      onChange={(e) => handleGroundInput(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <button
                className={`tmr-btn-next ${groundFilled < 1 ? "tmr-btn-next--dim" : ""}`}
                onClick={() => groundFilled >= 1 && goTo("reframe")}
              >
                {groundFilled === 0
                  ? "Fill in at least one to continue"
                  : groundFilled < 2
                  ? "Continue with what you have"
                  : groundFilled < 4
                  ? `${groundFilled} noticed. Continue when ready.`
                  : "All four. Continue"}
              </button>
            </section>
          )}

          {step === "reframe" && (
            <section className="tmr-section">
              <p className="tmr-step-label">Step 4 of 5</p>
              <h2 className="tmr-step-title">Reframe</h2>
              <p className="tmr-step-desc">
                Read this slowly. Let it land before moving on. If it does not
                resonate, there are others waiting.
              </p>

              <div className="tmr-quote-wrap">
                <blockquote className="tmr-quote" key={reframeIdx}>
                  {REFRAME_LINES[reframeIdx]}
                </blockquote>
                <p className="tmr-quote-counter">
                  {reframeIdx + 1} of {REFRAME_LINES.length}
                </p>
              </div>

              {!reframeDone ? (
                <div className="tmr-reframe-btns">
                  <button className="tmr-btn-next" onClick={() => goTo("gratitude")}>
                    This one sits well with me
                  </button>
                  <button className="tmr-btn-ghost" onClick={cycleReframe}>
                    {reframeIdx < REFRAME_LINES.length - 1
                      ? "Try another"
                      : "That was the last one"}
                  </button>
                </div>
              ) : (
                <button className="tmr-btn-next" onClick={() => goTo("gratitude")}>
                  Continue to the last step
                </button>
              )}
            </section>
          )}

          {step === "gratitude" && (
            <section className="tmr-section">
              <p className="tmr-step-label">Step 5 of 5</p>
              <h2 className="tmr-step-title">Gratitude</h2>
              <p className="tmr-step-desc">
                Research consistently shows that naming specific things we
                appreciate, even small ones, shifts how we experience the
                present moment. Take a minute with these.
              </p>

              <div className="tmr-ground-inputs">
                {GRATITUDE_PROMPTS.map((placeholder, i) => (
                  <div key={i} className="tmr-input-row">
                    <span className="tmr-input-num">{i + 1}</span>
                    <input
                      className="tmr-input"
                      type="text"
                      placeholder={placeholder}
                      value={gratitudeInputs[i]}
                      onChange={(e) => handleGratitudeInput(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <button
                className={`tmr-btn-next ${gratitudeFilled < 1 ? "tmr-btn-next--dim" : ""}`}
                onClick={() => gratitudeFilled >= 1 && goTo("done")}
              >
                {gratitudeFilled === 0
                  ? "Name at least one thing to finish"
                  : gratitudeFilled < 3
                  ? "Continue with what you have"
                  : "All three. Finish the reset."}
              </button>
            </section>
          )}

          {step === "done" && (
            <section className="tmr-section tmr-section--done">
              <div className="tmr-checkmark">
                <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="28" cy="28" r="27" stroke="#4B9CD3" strokeWidth="1.5" />
                  <polyline points="16,29 24,37 40,20" stroke="#4B9CD3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="tmr-step-title">You showed up for yourself.</h2>
              <p className="tmr-step-desc">
                That is genuinely something. You breathed, you checked in with
                your body, you grounded yourself in the present, and you found
                a few things worth holding onto. Carry that forward.
              </p>

              <div className="tmr-done-recap">
                {gratitudeInputs.filter((v) => v.trim()).length > 0 && (
                  <div className="tmr-recap-section">
                    <p className="tmr-recap-label">Things you are grateful for</p>
                    {gratitudeInputs.filter((v) => v.trim()).map((v, i) => (
                      <p key={i} className="tmr-recap-item">{v}</p>
                    ))}
                  </div>
                )}
                {groundInputs.filter((v) => v.trim()).length > 0 && (
                  <div className="tmr-recap-section">
                    <p className="tmr-recap-label">Things you noticed around you</p>
                    {groundInputs.filter((v) => v.trim()).map((v, i) => (
                      <p key={i} className="tmr-recap-item">{v}</p>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="tmr-btn-primary tmr-btn-return"
                onClick={() => navigate("/")}
              >
                Return to exploring
              </button>
              <button className="tmr-btn-ghost" onClick={startSession}>
                Do it again
              </button>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&display=swap');

  :root {
    --blue:    #4B9CD3;
    --blue-lt: #d6eaf8;
    --blue-dk: #3a88c0;
    --header:  #494A48;
    --bg:      #F5FCEF;
    --text:    #000000;
    --muted:   #6b7280;
    --card-bg: #ffffff;
    --radius:  14px;
  }

  .tmr-landing {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(2rem, 6vw, 5rem) 1.25rem;
    padding-top: calc(var(--header-h, 64px) + clamp(2rem, 6vw, 5rem));
    font-family: 'Inter', sans-serif;
  }

  .tmr-landing-inner {
    max-width: 640px;
    width: 100%;
  }

  .tmr-eyebrow {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--blue);
    margin: 0 0 0.75rem;
  }

  .tmr-hero-title {
    font-family: 'Merriweather', serif;
    font-size: clamp(2.2rem, 6vw, 3.4rem);
    color: var(--header);
    line-height: 1.15;
    margin: 0 0 1rem;
  }

  .tmr-hero-sub {
    font-size: clamp(0.93rem, 2vw, 1.03rem);
    color: var(--muted);
    line-height: 1.75;
    margin: 0 0 2rem;
    max-width: 520px;
  }

  .tmr-landing-steps {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    margin-bottom: 1.6rem;
  }

  .tmr-ls-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    background: var(--card-bg);
    border: 1px solid #e5e8e4;
    border-radius: var(--radius);
    padding: 0.9rem 1.2rem;
    transition: border-color 0.2s;
  }

  .tmr-ls-card:hover {
    border-color: var(--blue-lt);
  }

  .tmr-ls-num {
    font-family: 'Merriweather', serif;
    font-size: 1rem;
    font-style: italic;
    color: var(--blue);
    min-width: 2rem;
    padding-top: 1px;
  }

  .tmr-ls-card strong {
    display: block;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--header);
    margin-bottom: 0.2rem;
  }

  .tmr-ls-card p {
    margin: 0;
    font-size: 0.82rem;
    color: var(--muted);
    line-height: 1.5;
  }

  .tmr-landing-note {
    font-size: 0.82rem;
    color: var(--muted);
    font-style: italic;
    margin-bottom: 1.8rem;
    padding-left: 0.25rem;
  }

  .tmr-fullscreen {
    position: fixed;
    inset: 0;
    background: #ecf5ee;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  .tmr-grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
    pointer-events: none;
  }

  .tmr-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    opacity: 0.18;
    animation: tmr-drift 18s ease-in-out infinite alternate;
  }

  .tmr-blob--1 {
    width: 500px;
    height: 500px;
    background: #4B9CD3;
    top: -150px;
    right: -100px;
    animation-delay: 0s;
  }

  .tmr-blob--2 {
    width: 400px;
    height: 400px;
    background: #a8d8b0;
    bottom: -100px;
    left: -80px;
    animation-delay: -9s;
  }

  @keyframes tmr-drift {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(30px, 20px) scale(1.08); }
  }

  .tmr-content {
    position: relative;
    max-width: 580px;
    width: 100%;
    padding: 2rem 1.5rem;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.4s ease, transform 0.4s ease;
    max-height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
  }

  .tmr-content::-webkit-scrollbar {
    display: none;
  }

  .tmr-content--visible {
    opacity: 1;
    transform: translateY(0);
  }

  .tmr-progress-wrap {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  .tmr-progress-track {
    flex: 1;
    height: 3px;
    background: #d0ddd5;
    border-radius: 99px;
    overflow: hidden;
  }

  .tmr-progress-fill {
    height: 100%;
    background: var(--blue);
    border-radius: 99px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .tmr-progress-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
  }

  .tmr-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .tmr-step-label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--blue);
    font-weight: 600;
    margin: 0 0 0.55rem;
  }

  .tmr-step-title {
    font-family: 'Merriweather', serif;
    font-size: clamp(1.8rem, 5vw, 2.4rem);
    color: var(--header);
    margin: 0 0 0.75rem;
  }

  .tmr-step-desc {
    font-size: 0.93rem;
    color: var(--muted);
    line-height: 1.75;
    max-width: 420px;
    margin: 0 0 1.8rem;
  }

  .tmr-breath-start {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    max-width: 400px;
  }

  .tmr-breath-tip {
    background: var(--card-bg);
    border: 1px solid #e5e8e4;
    border-radius: var(--radius);
    padding: 1.1rem 1.3rem;
    text-align: left;
    width: 100%;
  }

  .tmr-breath-tip-label {
    display: block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 0.4rem;
  }

  .tmr-breath-tip p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.65;
  }

  .tmr-circle-wrap {
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.6rem;
    flex-shrink: 0;
  }

  .tmr-ring {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: var(--blue-lt);
    transition: transform 0.08s linear, opacity 0.08s linear;
  }

  .tmr-ring--2 {
    background: #c5e4f5;
  }

  .tmr-circle {
    position: relative;
    width: 148px;
    height: 148px;
    border-radius: 50%;
    background: var(--blue);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.08s linear;
    box-shadow: 0 8px 40px rgba(75,156,211,0.35);
  }

  .tmr-phase-label {
    font-family: 'Merriweather', serif;
    font-size: 1rem;
    color: #fff;
    font-weight: 400;
  }

  .tmr-phase-count {
    font-size: 0.72rem;
    color: rgba(255,255,255,0.72);
    margin-top: 3px;
    font-family: 'Inter', sans-serif;
  }

  .tmr-cycle-pips {
    position: absolute;
    bottom: -28px;
    display: flex;
    gap: 6px;
  }

  .tmr-pip {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #c8dfd0;
    transition: background 0.3s, transform 0.3s;
  }

  .tmr-pip--active {
    background: var(--blue);
    transform: scale(1.2);
  }

  .tmr-pip--done {
    background: var(--blue-dk);
  }

  .tmr-breath-sub {
    font-size: 0.76rem;
    letter-spacing: 0.06em;
    color: var(--muted);
    margin: 2.2rem 0 1.5rem;
  }

  .tmr-body-cards {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    width: 100%;
    max-width: 420px;
    margin-bottom: 1.5rem;
  }

  .tmr-body-card {
    background: var(--card-bg);
    border: 1.5px solid #e5e8e4;
    border-radius: var(--radius);
    padding: 0.9rem 1.1rem;
    text-align: left;
    transition: border-color 0.25s, box-shadow 0.25s, opacity 0.25s;
  }

  .tmr-body-card--active {
    border-color: var(--blue);
    box-shadow: 0 2px 16px rgba(75,156,211,0.12);
  }

  .tmr-body-card--done {
    opacity: 0.5;
  }

  .tmr-body-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tmr-body-area {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--header);
  }

  .tmr-body-check {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .tmr-body-cue {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.65;
    margin: 0.5rem 0 0.85rem;
  }

  .tmr-btn-tiny {
    background: var(--blue-lt);
    border: none;
    border-radius: 50px;
    color: var(--blue-dk);
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.4rem 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }

  .tmr-btn-tiny:hover {
    background: #c0d8f0;
  }

  .tmr-ground-inputs {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    width: 100%;
    max-width: 400px;
    margin-bottom: 1.8rem;
  }

  .tmr-input-row {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .tmr-input-num {
    font-family: 'Merriweather', serif;
    font-style: italic;
    font-size: 1.05rem;
    color: var(--blue);
    min-width: 1.1rem;
    text-align: center;
  }

  .tmr-input {
    flex: 1;
    padding: 0.7rem 1rem;
    border: 1.5px solid #d0ddd5;
    border-radius: 10px;
    background: var(--card-bg);
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .tmr-input:focus {
    border-color: var(--blue);
    box-shadow: 0 0 0 3px rgba(75,156,211,0.12);
  }

  .tmr-input::placeholder {
    color: #b0bbb5;
  }

  .tmr-quote-wrap {
    width: 100%;
    max-width: 440px;
    margin-bottom: 2rem;
  }

  .tmr-quote {
    font-family: 'Merriweather', serif;
    font-style: italic;
    font-size: clamp(1.1rem, 3vw, 1.35rem);
    color: var(--header);
    line-height: 1.65;
    border-left: 3px solid var(--blue);
    padding: 0.6rem 0 0.6rem 1.3rem;
    text-align: left;
    margin: 0 0 0.5rem;
    animation: tmr-quote-in 0.35s ease both;
  }

  @keyframes tmr-quote-in {
    from { opacity: 0; transform: translateX(-6px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .tmr-quote-counter {
    font-size: 0.72rem;
    color: #b0bbb5;
    text-align: right;
    margin: 0;
    font-style: italic;
  }

  .tmr-reframe-btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .tmr-section--done {
    gap: 0.4rem;
  }

  .tmr-checkmark {
    width: 56px;
    height: 56px;
    margin-bottom: 1rem;
    animation: tmr-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  @keyframes tmr-pop {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  .tmr-done-recap {
    width: 100%;
    max-width: 420px;
    margin: 1.2rem 0 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tmr-recap-section {
    background: var(--card-bg);
    border: 1px solid #e5e8e4;
    border-radius: var(--radius);
    padding: 1rem 1.2rem;
    text-align: left;
  }

  .tmr-recap-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--blue);
    margin: 0 0 0.6rem;
  }

  .tmr-recap-item {
    font-size: 0.88rem;
    color: var(--header);
    margin: 0 0 0.3rem;
    line-height: 1.5;
    padding-left: 0.9rem;
    position: relative;
  }

  .tmr-recap-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--blue);
  }

  .tmr-btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 2.1rem;
    border-radius: 50px;
    background: var(--blue);
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 0.93rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(75,156,211,0.32);
    text-decoration: none;
  }

  .tmr-btn-primary:hover {
    background: var(--blue-dk);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(75,156,211,0.38);
  }

  .tmr-btn-next {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.8rem;
    border-radius: 50px;
    background: transparent;
    color: var(--blue);
    border: 1.5px solid var(--blue);
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.15s, opacity 0.2s;
  }

  .tmr-btn-next:hover:not(.tmr-btn-next--dim) {
    background: var(--blue);
    color: #fff;
    transform: translateY(-1px);
  }

  .tmr-btn-next--dim {
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  }

  .tmr-btn-return {
    margin-top: 0.5rem;
  }

  .tmr-btn-ghost {
    background: none;
    border: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: var(--muted);
    cursor: pointer;
    margin-top: 0.4rem;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s;
  }

  .tmr-btn-ghost:hover {
    color: var(--text);
  }

  @media (max-width: 480px) {
    .tmr-content {
      padding: 1.25rem 1rem;
    }

    .tmr-circle-wrap {
      width: 165px;
      height: 165px;
    }

    .tmr-ring {
      width: 165px;
      height: 165px;
    }

    .tmr-circle {
      width: 122px;
      height: 122px;
    }

    .tmr-quote {
      font-size: 1rem;
      padding-left: 1rem;
    }

    .tmr-btn-next,
    .tmr-btn-primary {
      width: 100%;
    }

    .tmr-step-title {
      font-size: 1.75rem;
    }
  }

  @media (min-width: 768px) {
    .tmr-landing-steps {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.65rem;
    }

    .tmr-landing-steps .tmr-ls-card:last-child {
      grid-column: 1 / -1;
    }
  }

  @media (min-width: 1024px) {
    .tmr-landing-inner {
      max-width: 700px;
    }

    .tmr-landing-steps {
      grid-template-columns: 1fr 1fr;
    }

    .tmr-landing-steps .tmr-ls-card:nth-child(5) {
      grid-column: auto;
    }
  }
`;
