import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogHero from "../assets/BlogHero.webp";
import ManWithMap from "../assets/ManWithMap.webp";
import resumeHero from "../assets/resume-hero.webp";
import teacherRecHero from "../assets/teacher-rec-hero.webp";
import BurnedFemale from "../assets/BurnedFemale.webp";
import Bedtime from "../assets/Bedtime.webp";
import LabPicture from "../assets/LabPicture.webp";
import WorkGroup from "../assets/WorkGroup.webp";

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

  .blog-root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #F5FCEF;
    min-height: 100vh;
    color: #000000;
  }

  /* ── MAIN ── */
  .blog-container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 5rem;
  }

  .blog-section-label {
    font-size: 0.73rem;
    font-weight: 700;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 1.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1.5px solid #dce8d5;
  }

  /* ── GRID ── */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.85rem;
  }

  /* ── CARD ── */
  .blog-card {
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    border: 1.5px solid #dce8d5;
    transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }
  .blog-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 44px rgba(73, 74, 72, 0.13);
    border-color: #4B9CD3;
  }

  .card-image-wrap {
    width: 100%;
    height: 215px;
    overflow: hidden;
    background: #d6e8c4;
    flex-shrink: 0;
  }
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.42s ease;
  }
  .blog-card:hover .card-image { transform: scale(1.05); }

  .card-body {
    padding: 1.35rem 1.5rem 1.65rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card-tag {
    display: inline-block;
    padding: 0.26rem 0.78rem;
    border-radius: 20px;
    font-size: 0.69rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.9rem;
    width: fit-content;
  }
  .tag-resume   { background: #e5f3fb; color: #1a6fa8; }
  .tag-apps     { background: #eaf7e1; color: #3a7d2c; }
  .tag-career   { background: #fef6e4; color: #966210; }
  .tag-science  { background: #e5f3fb; color: #1a6fa8; }
  .tag-wellness { background: #fce8f0; color: #a0295a; }

  .card-title {
    font-size: 1.06rem;
    font-weight: 700;
    color: #000000;
    line-height: 1.4;
    margin-bottom: 0.75rem;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-size: 0.78rem;
    color: #666;
    margin-bottom: 0.9rem;
    flex-wrap: wrap;
  }
  .dot {
    width: 3px; height: 3px;
    background: #bbb;
    border-radius: 50%;
    flex-shrink: 0;
    display: inline-block;
  }

  .card-excerpt {
    font-size: 0.875rem;
    color: #3a3a38;
    line-height: 1.7;
    margin-bottom: 1.4rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  .card-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
    background: #4B9CD3;
    color: #ffffff;
    padding: 0.62rem 1.3rem;
    border-radius: 8px;
    font-size: 0.83rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
    width: fit-content;
    align-self: flex-start;
  }
  .card-btn:hover { background: #2d7db5; }
  .blog-card:hover .card-btn svg { transform: translateX(3px); }
  .card-btn svg { transition: transform 0.2s; }

  .blog-footer-note {
    text-align: center;
    margin-top: 4rem;
    font-size: 0.875rem;
    color: #999;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .blog-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 700px) {
    .blog-container { padding: 2.25rem 1rem 3.5rem; }
    .blog-grid { grid-template-columns: 1fr; gap: 1.25rem; }
    .card-image-wrap { height: 190px; }
    .card-body { padding: 1.1rem 1.2rem 1.4rem; }
  }
  @media (max-width: 400px) {
    .card-title { font-size: 1rem; }
    .card-excerpt { font-size: 0.84rem; }
  }
`;

const POSTS = [
  {
    id: 1,
    title: "From Classroom to Lab: How to Write a Research Resume That Actually Works",
    author: "Alisha Varshney",
    date: "January 10, 2025",
    readTime: "5 min read",
    category: "Resume Tips",
    tagClass: "tag-resume",
    image: resumeHero,
    excerpt: "Staring at a lab posting from a place like NC State or Duke as a high schooler is intimidating. Here's how to stop writing a resume for a summer job and start writing one for a scientist.",
    href: "/blog/resume",
  },
  {
    id: 2,
    title: "The Art of the Ask: Getting a Teacher Recommendation for Research Programs",
    author: "Alisha Varshney",
    date: "January 15, 2026",
    readTime: "5 min read",
    category: "Applications",
    tagClass: "tag-apps",
    image: teacherRecHero,
    excerpt: "Securing a spot in a summer research program means securing a great recommendation. Here's how to ask your teacher the right way — and actually get a letter that stands out.",
    href: "/blog/teacher-recommendation",
  },
  {
    id: 3,
    title: "Burned Out and Behind: How to Recover From Academic Burnout Without Losing Your Mind",
    author: "Alisha Varshney",
    date: "January 21, 2026",
    readTime: "6 min read",
    category: "Wellness",
    tagClass: "tag-wellness",
    image: BurnedFemale,
    excerpt: "You used to care. Now you're staring at assignments like they're written in a language you forgot. That's burnout — and pushing harder isn't the fix. Here's how to actually recover.",
    href: "/blog/burnout",
  },
  {
    id: 4,
    title: "How to Actually Sleep When Your Brain Won't Turn Off During Exam Season",
    author: "Alisha Varshney",
    date: "February 10, 2026",
    readTime: "5 min read",
    category: "Wellness",
    tagClass: "tag-wellness",
    image: Bedtime,
    excerpt: "Lying awake replaying everything you forgot to study is its own special kind of torture. Here's what actually helps your brain power down when exam pressure is at its peak.",
    href: "/blog/sleep",
  },
  {
    id: 5,
    title: "You Don't Need to Know Your Major Yet: How to Explore Without Panicking",
    author: "Alisha Varshney",
    date: "February 19, 2026",
    readTime: "5 min read",
    category: "Career",
    tagClass: "tag-career",
    image: ManWithMap,
    excerpt: "Everyone seems to have a five-year plan and you can barely pick a lunch. That's completely normal. Here's how to use high school to explore interests without the pressure of having it all figured out.",
    href: "/blog/major",
  },
  {
    id: 6,
    title: "What Working in a Lab Is Actually Like: Expectations vs. Reality for High Schoolers",
    author: "Alisha Varshney",
    date: "March 11, 2026",
    readTime: "6 min read",
    category: "Science",
    tagClass: "tag-science",
    image: LabPicture,
    excerpt: "TV makes lab work look like dramatic breakthroughs every five minutes. The reality involves a lot of waiting, failed trials, and pipetting. Here's what to actually expect — and why it's still worth it.",
    href: "/blog/lab",
  },
  {
    id: 7,
    title: "How to Build a LinkedIn Profile as a High School Student Without It Being Cringe",
    author: "Alisha Varshney",
    date: "March 23, 2026",
    readTime: "5 min read",
    category: "Career",
    tagClass: "tag-career",
    image: WorkGroup,
    excerpt: "Yes, high schoolers can and should be on LinkedIn. No, you don't need a Fortune 500 internship to make a good profile. Here's how to present yourself professionally without the awkward overhype.",
    href: "/blog/linkedin",
  },
];

export default function Blog() {
  const isLoaded = useImagePreload([BlogHero]);

  return (
    <>
      <style>{css}</style>
      <div className="blog-root">

        {/* ── HERO ── */}
        <section
          style={{
            position: "relative",
            width: "100%",
            minHeight: "clamp(300px, 50vw, 560px)",
            display: "flex",
            alignItems: "flex-end",
            backgroundImage: isLoaded(BlogHero) ? `url(${BlogHero})` : "none",
            backgroundColor: "#1a2e42",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            opacity: isLoaded(BlogHero) ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {/* grid overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(75,156,211,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(75,156,211,0.07) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 50% 50%, black 40%, transparent 100%)",
          }} />
          {/* dark gradient */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.12) 100%)",
          }} />
          {/* bottom accent bar */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #4B9CD3 0%, #6ec6f5 50%, #4B9CD3 100%)",
          }} />

          <div style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "860px",
            margin: "0 auto",
            padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem) clamp(2.5rem, 5vw, 4rem)",
            boxSizing: "border-box",
            textAlign: "center",
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(75,156,211,0.15)",
                color: "#a8d8f0",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "0.32rem 1rem",
                borderRadius: "20px",
                border: "1px solid rgba(75,156,211,0.25)",
                marginBottom: "1.1rem",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4B9CD3", flexShrink: 0, display: "inline-block" }} />
                Resources
              </span>

              <h1 style={{
                color: "#ffffff",
                fontSize: "clamp(2rem, 5.5vw, 3.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                marginBottom: "0.75rem",
                textShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}>
                The Resource <span style={{ color: "#4B9CD3" }}>Blog</span>
              </h1>

              <div style={{
                width: 48, height: 3,
                background: "#4B9CD3",
                borderRadius: 2,
                margin: "1rem auto 1.1rem",
              }} />

              <p style={{
                color: "#b8bdb7",
                fontSize: "clamp(0.88rem, 1.8vw, 0.97rem)",
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.72,
              }}>
                Guides, tips, and helpful resources for high school students across the Triangle area, including opportunities for volunteering, academics, and community involvement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── GRID ── */}
        <main className="blog-container">
          <p className="blog-section-label">All Articles — {POSTS.length} posts</p>
          <div className="blog-grid">
            {POSTS.map((post) => (
              <article
                key={post.id}
                className="blog-card"
                onClick={() => (window.location.href = post.href)}
              >
                <div className="card-image-wrap">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="card-image"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
                <div className="card-body">
                  <span className={`card-tag ${post.tagClass}`}>{post.category}</span>
                  <h2 className="card-title">{post.title}</h2>
                  <div className="card-meta">
                    <span>{post.author}</span>
                    <span className="dot" />
                    <span>{post.date}</span>
                    <span className="dot" />
                    <span>{post.readTime}</span>
                  </div>
                  <p className="card-excerpt">{post.excerpt}</p>
                  <button className="card-btn">
                    Read More
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
          <p className="blog-footer-note">More articles coming soon.</p>
        </main>

      </div>
    </>
  );
}
