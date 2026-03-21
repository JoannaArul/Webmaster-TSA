import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import handsOnImg from "../assets/HandsOn.webp";

const LIFELINE_URL =
  "https://988lifeline.org/?utm_source=SRC&utm_medium=CPM&utm_campaign=988GP&utm_content=hotline&gad_source=1&gad_campaignid=23386135666&gbraid=0AAAAABheg8etSew2pxCPTsZpAr3PPxpPh&gclid=Cj0KCQjwve7NBhC-ARIsALZy9HUOg8YtBe_OviZpcF5IAesNw679MJ6FSiEIfmltV5DZPA2-tHlnMakaApYZEALw_wcB";

const CRISIS_TEXT_URL = "https://www.crisistextline.org/";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --carolina: #4B9CD3;
    --carolina-deep: #2d7ab5;
    --gray-nav: #494A48;
    --beige: #F5FCEF;
    --warm-white: #fefdf9;
    --ink: #1c1c1b;
    --ink-soft: #4a4a48;
    --muted: #888884;
    --rule: #e2e0d8;
    --cream: #f7f4ee;
  }

  .sl { font-family: 'Inter', sans-serif; background: var(--warm-white); color: var(--ink); min-height: 100vh; overflow-x: hidden; }

  .sl-hero {
    position: relative;
    height: 88vh;
    min-height: 520px;
    max-height: 780px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    background-color: #1a2e42;
  }

  .sl-hero-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center 30%;
    filter: brightness(0.62) saturate(0.85);
    transition: opacity 0.5s ease;
  }

  .sl-hero-wash {
    position: absolute; inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 30%,
      rgba(28,28,27,0.25) 55%,
      rgba(20,20,18,0.72) 80%,
      rgba(20,20,18,0.88) 100%
    );
  }

  .sl-hero-content {
    position: relative;
    padding: 0 clamp(24px, 6vw, 96px) clamp(48px, 7vh, 80px);
    max-width: 820px;
  }

  .sl-hero-eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    margin-bottom: 18px;
    border-left: 2px solid var(--carolina);
    padding-left: 10px;
  }

  .sl-hero h1 {
    font-family: 'Merriweather', serif;
    font-size: clamp(2rem, 5.5vw, 3.6rem);
    font-weight: 400;
    line-height: 1.2;
    color: #fff;
    letter-spacing: -0.01em;
    margin-bottom: 20px;
  }

  .sl-hero h1 em {
    font-style: italic;
    color: rgba(255,255,255,0.75);
  }

  .sl-hero-sub {
    font-size: clamp(0.9rem, 1.6vw, 1.05rem);
    color: rgba(255,255,255,0.65);
    max-width: 460px;
    line-height: 1.75;
    font-weight: 300;
  }

  .sl-hero-scroll {
    position: absolute;
    bottom: 32px;
    right: clamp(24px, 5vw, 72px);
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.45);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .sl-hero-scroll-line {
    width: 1px;
    height: 36px;
    background: rgba(255,255,255,0.3);
    animation: sl-pulse-line 2s ease-in-out infinite;
  }
  @keyframes sl-pulse-line { 0%,100%{opacity:0.3;} 50%{opacity:0.8;} }

  .sl-body { max-width: 1040px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 64px); }

  .sl-label {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .sl-label::after { content: ''; flex: 1; height: 1px; background: var(--rule); }

  .sl-cards-wrap { padding: 72px 0 56px; }

  .sl-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
    background: var(--rule);
    border: 1px solid var(--rule);
    border-radius: 4px;
    overflow: hidden;
  }
  @media (max-width: 600px) { .sl-cards-grid { grid-template-columns: 1fr; } }

  .sl-card {
    background: var(--warm-white);
    padding: 36px 32px 32px;
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
    border: none;
    text-align: left;
    font-family: 'Inter', sans-serif;
    width: 100%;
  }
  .sl-card:hover { background: var(--cream); }
  .sl-card.active { background: var(--cream); }

  .sl-card-num {
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--carolina);
    letter-spacing: 0.1em;
    margin-bottom: 20px;
    display: block;
  }

  .sl-card h3 {
    font-family: 'Merriweather', serif;
    font-size: clamp(1rem, 1.8vw, 1.15rem);
    font-weight: 600;
    color: var(--ink);
    line-height: 1.35;
    margin-bottom: 10px;
  }

  .sl-card p {
    font-size: clamp(0.78rem, 1.3vw, 0.85rem);
    color: var(--ink-soft);
    line-height: 1.65;
    font-weight: 300;
  }

  .sl-card-arrow {
    display: block;
    margin-top: 22px;
    font-size: 0.8rem;
    color: var(--carolina);
    font-weight: 500;
    transition: letter-spacing 0.2s;
  }
  .sl-card:hover .sl-card-arrow,
  .sl-card.active .sl-card-arrow { letter-spacing: 0.04em; }

  .sl-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: var(--carolina);
    transform: scaleX(0);
    transition: transform 0.25s ease;
    transform-origin: left;
  }
  .sl-card.active::after,
  .sl-card:hover::after { transform: scaleX(1); }

  .sl-panel {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
    opacity: 0;
  }
  .sl-panel.open { max-height: 900px; opacity: 1; }

  .sl-panel-inner {
    padding: 40px 0 56px;
    border-top: 1px solid var(--rule);
  }

  .sl-panel-title {
    font-family: 'Merriweather', serif;
    font-size: clamp(1.15rem, 2.2vw, 1.4rem);
    font-weight: 400;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .sl-panel-close {
    float: right;
    background: none;
    border: 1px solid var(--rule);
    color: var(--muted);
    font-size: 0.75rem;
    padding: 5px 12px;
    border-radius: 3px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.15s, color 0.15s;
    letter-spacing: 0.05em;
  }
  .sl-panel-close:hover { border-color: var(--ink-soft); color: var(--ink); }

  .sl-resources {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
    border-radius: 4px;
    overflow: hidden;
  }

  .sl-res {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 24px;
    background: var(--warm-white);
    transition: background 0.15s;
    flex-wrap: wrap;
  }
  .sl-res:hover { background: var(--cream); }
  .sl-res.crisis { background: #f0f7fd; }
  .sl-res.crisis:hover { background: #e4f1f9; }

  .sl-res-marker {
    width: 28px;
    flex-shrink: 0;
    text-align: center;
    font-family: 'Merriweather', serif;
    font-style: italic;
    font-size: 1rem;
    color: var(--carolina);
    line-height: 1;
  }

  .sl-res-body { flex: 1; min-width: 160px; }
  .sl-res-body strong {
    display: block;
    font-size: clamp(0.82rem, 1.4vw, 0.88rem);
    font-weight: 500;
    color: var(--ink);
    margin-bottom: 3px;
  }
  .sl-res-body span {
    font-size: clamp(0.72rem, 1.2vw, 0.78rem);
    color: var(--muted);
    font-weight: 300;
    line-height: 1.5;
  }

  .sl-res-tag {
    padding: 7px 14px;
    border-radius: 3px;
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.7rem, 1.2vw, 0.75rem);
    font-weight: 400;
    letter-spacing: 0.03em;
    white-space: nowrap;
    flex-shrink: 0;
    border: 1px solid var(--rule);
    background: var(--warm-white);
    color: var(--muted);
    cursor: default;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .sl-res-tag:hover {
    border-color: var(--carolina);
    color: var(--carolina-deep);
    background: var(--cream);
  }

  .sl-res-btn {
    background: var(--ink);
    color: #fff;
    border: none;
    padding: 8px 18px;
    border-radius: 3px;
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.7rem, 1.2vw, 0.76rem);
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.04em;
    white-space: nowrap;
    text-decoration: none;
    display: inline-block;
    transition: background 0.15s;
    flex-shrink: 0;
  }
  .sl-res-btn:hover { background: var(--carolina-deep); }
  .sl-res.crisis .sl-res-btn { background: var(--carolina); }
  .sl-res.crisis .sl-res-btn:hover { background: var(--carolina-deep); }

  .sl-tips-strip {
    margin-top: 16px;
    padding: 18px 22px;
    background: var(--cream);
    border-left: 3px solid var(--carolina);
    border-radius: 0 4px 4px 0;
  }
  .sl-tips-strip p {
    font-size: clamp(0.76rem, 1.3vw, 0.82rem);
    color: var(--ink-soft);
    line-height: 1.65;
    font-weight: 300;
  }
  .sl-tips-strip p + p { margin-top: 6px; }

  .sl-breath {
    padding: 56px 0 64px;
    border-top: 1px solid var(--rule);
  }

  .sl-breath-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }

  .sl-pill {
    padding: 9px 18px;
    border: 1px solid var(--rule);
    border-radius: 2px;
    font-size: clamp(0.76rem, 1.3vw, 0.82rem);
    color: var(--ink-soft);
    font-weight: 300;
    background: var(--warm-white);
    transition: border-color 0.15s, color 0.15s;
  }
  .sl-pill span { color: var(--carolina); font-weight: 400; }
  .sl-pill:hover { border-color: var(--carolina); color: var(--ink); }

  .sl-actions {
    padding: 48px 0 72px;
    border-top: 1px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
  }

  .sl-actions-text h3 {
    font-family: 'Merriweather', serif;
    font-size: clamp(0.95rem, 1.8vw, 1.1rem);
    font-weight: 400;
    color: var(--ink);
    margin-bottom: 4px;
  }
  .sl-actions-text p {
    font-size: clamp(0.74rem, 1.2vw, 0.8rem);
    color: var(--muted);
    font-weight: 300;
  }

  .sl-actions-btns { display: flex; gap: 10px; flex-wrap: wrap; }

  .sl-btn {
    padding: 11px 22px;
    border-radius: 3px;
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.76rem, 1.3vw, 0.82rem);
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    border: 1px solid transparent;
    text-decoration: none;
    display: inline-block;
  }
  .sl-btn-fill { background: var(--carolina); color: #fff; }
  .sl-btn-fill:hover { background: var(--carolina-deep); }
  .sl-btn-outline { background: transparent; color: var(--ink-soft); border-color: var(--rule); }
  .sl-btn-outline:hover { border-color: var(--ink-soft); color: var(--ink); }

  .sl-footer {
    border-top: 1px solid var(--rule);
    padding: 28px 0 40px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .sl-footer-rule { flex: 1; height: 1px; background: var(--rule); }
  .sl-footer p {
    font-family: 'Merriweather', serif;
    font-style: italic;
    font-size: clamp(0.78rem, 1.3vw, 0.85rem);
    color: var(--muted);
    text-align: center;
  }

  .sl-reveal {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .sl-reveal.in { opacity: 1; transform: none; }

  @media (max-width: 640px) {
    .sl-actions { flex-direction: column; align-items: flex-start; }
    .sl-res { gap: 12px; }
  }
`;

const resourceData = {
  mental: {
    label: "Mental Health Support",
    resources: [
      {
        marker: "◎",
        name: "988 Suicide & Crisis Lifeline",
        desc: "Call or text 988 anytime. Free, confidential, 24/7",
        action: "Visit 988lifeline.org",
        href: LIFELINE_URL,
        external: true,
      },
      {
        marker: "◎",
        name: "Teen Line",
        desc: "Peer support from teens, for teens. Evenings 6 to 10pm PT",
        action: "Learn More",
        href: "https://teenline.org",
        external: true,
      },
      {
        marker: "◎",
        name: "Headspace",
        desc: "Guided meditations and breathing exercises for stress",
        action: "Visit",
        href: "https://headspace.com",
        external: true,
      },
    ],
  },
  academic: {
    label: "Academic Stress Help",
    resources: [
      {
        marker: "◎",
        name: "Khan Academy",
        desc: "Free, self-paced lessons on almost every subject",
        action: "Visit",
        href: "https://khanacademy.org",
        external: true,
      },
      {
        marker: "◎",
        name: "School Counseling",
        desc: "Your counselor is a real resource. Reach out to them today",
        action: null,
      },
      {
        marker: "◎",
        name: "Tutoring",
        desc: "Many schools offer free drop-in sessions, but you can also use free online tutoring at Schoolhouse.World",
        action: "Visit Schoolhouse.World",
        href: "https://schoolhouse.world/",
        external: true,
      },
    ],
    tips: [
      "Try breaking your work into smaller chunks. Start with just 5 minutes.",
      "A 25-minute Pomodoro session followed by a 5-minute break can help you get unstuck.",
    ],
  },
  crisis: {
    label: "Immediate Support",
    resources: [
      {
        marker: "◎",
        name: "988 Lifeline",
        desc: "Call or text 988. Available 24/7, completely free, no judgment",
        action: "Visit 988lifeline.org",
        href: LIFELINE_URL,
        external: true,
        crisis: true,
      },
      {
        marker: "◎",
        name: "Crisis Text Line",
        desc: "Text HOME to 741741 to connect with a trained crisis counselor by text",
        action: "Visit CrisisTextLine.org",
        href: CRISIS_TEXT_URL,
        external: true,
        crisis: true,
      },
    ],
  },
  lowpressure: {
    label: "Low-Pressure Steps",
    resources: [
      {
        marker: "·",
        name: "Take a 5-minute walk",
        desc: "Step outside, breathe, and let your mind rest for a bit",
        action: "Sounds good",
        noLink: true,
      },
      {
        marker: "·",
        name: "Write one sentence",
        desc: "Just one about how you're feeling right now, no format needed",
        action: "Try it",
        noLink: true,
      },
      {
        marker: "·",
        name: "Drink some water",
        desc: "Small acts of self-care add up more than you think",
        action: "Done",
        noLink: true,
      },
    ],
  },
};

const cards = [
  { id: "mental",      num: "01", title: "I'm feeling overwhelmed",        desc: "Start with something that helps you breathe and reset." },
  { id: "academic",    num: "02", title: "I'm stressed about school",       desc: "Find academic support, tutoring, or ways to manage workload." },
  { id: "crisis",      num: "03", title: "I just need someone to talk to",  desc: "Confidential and immediate support options." },
  { id: "lowpressure", num: "04", title: "I want something low-pressure",   desc: "Explore small, easy steps you can take right now." },
];

function useImagePreload(srcs) {
  const [loadedMap, setLoadedMap] = useState({});

  useEffect(() => {
    srcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () =>
        setLoadedMap((prev) => ({ ...prev, [src]: true }));
    });
  }, []);

  return (src) => !!loadedMap[src];
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="sl-reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function SupportLayer() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const isLoaded = useImagePreload([handsOnImg]);

  const toggle = (id) => {
    const next = active === id ? null : id;
    setActive(next);
    if (next) {
      setTimeout(() => {
        document.getElementById(`sl-panel-${next}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="sl">

        <section className="sl-hero">
          <img
            src={handsOnImg}
            alt=""
            className="sl-hero-img"
            style={{ opacity: isLoaded(handsOnImg) ? 1 : 0 }}
          />
          <div className="sl-hero-wash" />
          <div className="sl-hero-content">
            <span className="sl-hero-eyebrow">Support &amp; Resources</span>
            <h1>You don't have to figure <em>everything</em> out alone.</h1>
            <p className="sl-hero-sub">
              If you're feeling overwhelmed, stuck, or unsure where to start,
              here are a few simple places to begin.
            </p>
          </div>
          <div className="sl-hero-scroll">
            <div className="sl-hero-scroll-line" />
            scroll
          </div>
        </section>

        <div className="sl-body">

          <div className="sl-cards-wrap">
            <Reveal>
              <p className="sl-label">Where are you right now?</p>
            </Reveal>
            <Reveal delay={60}>
              <div className="sl-cards-grid">
                {cards.map((c) => (
                  <button
                    key={c.id}
                    className={`sl-card${active === c.id ? " active" : ""}`}
                    onClick={() => toggle(c.id)}
                    aria-expanded={active === c.id}
                  >
                    <span className="sl-card-num">{c.num}</span>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    <span className="sl-card-arrow">
                      {active === c.id ? "Close ↑" : "Show resources →"}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {cards.map((c) => {
            const data = resourceData[c.id];
            return (
              <div key={c.id} id={`sl-panel-${c.id}`} className={`sl-panel${active === c.id ? " open" : ""}`}>
                <div className="sl-panel-inner">
                  <button className="sl-panel-close" onClick={() => setActive(null)}>Close ✕</button>
                  <h2 className="sl-panel-title">{data.label}</h2>
                  <div className="sl-resources">
                    {data.resources.map((r) => (
                      <div key={r.name} className={`sl-res${r.crisis ? " crisis" : ""}`}>
                        <div className="sl-res-marker">{r.marker}</div>
                        <div className="sl-res-body">
                          <strong>{r.name}</strong>
                          <span>{r.desc}</span>
                        </div>
                        {r.action === null ? null
                        : r.noLink ? (
                          <span className="sl-res-tag">{r.action}</span>
                        ) : (
                          <a
                            href={r.href}
                            className="sl-res-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {r.action}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  {data.tips && (
                    <div className="sl-tips-strip">
                      {data.tips.map((t) => <p key={t}>↳ {t}</p>)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <Reveal>
            <div className="sl-breath">
              <p className="sl-label">A reminder</p>
              <div className="sl-breath-pills">
                {[
                  { pre: "It's okay to take things ", hi: "one step at a time." },
                  { pre: "You don't have to solve ", hi: "everything today." },
                  { pre: "Starting small is ", hi: "still progress." },
                  { pre: "Asking for help is ", hi: "a sign of strength." },
                ].map((m, i) => (
                  <div className="sl-pill" key={i}>{m.pre}<span>{m.hi}</span></div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="sl-actions">
              <div className="sl-actions-text">
                <h3>Take a small step right now</h3>
                <p>No pressure. Even one thing is enough.</p>
              </div>
              <div className="sl-actions-btns">
                <button
                  className="sl-btn sl-btn-fill"
                  onClick={() => navigate("/resource-hub")}
                >
                  Explore low-effort ideas
                </button>
                <button
                  className="sl-btn sl-btn-outline"
                  onClick={() => navigate("/")}
                >
                  ← Go back
                </button>
              </div>
            </div>
          </Reveal>

          <div className="sl-footer">
            <div className="sl-footer-rule" />
            <p>This space is here for you, whether you're ready to act or just need a moment.</p>
            <div className="sl-footer-rule" />
          </div>

        </div>
      </div>
    </>
  );
}