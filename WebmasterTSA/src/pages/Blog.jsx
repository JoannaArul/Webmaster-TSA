import React from "react";
import resumeHero from "../assets/resume-hero.webp";
import teacherRecHero from "../assets/teacher-rec-hero.webp";

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .blog-root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #F5FCEF;
    min-height: 100vh;
    color: #000000;
  }

  /* ── HEADER ── */
  .blog-header {
    background: #2e3330;
    padding: 5.5rem 2rem 5rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  /* animated grid lines */
  .blog-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(75, 156, 211, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(75, 156, 211, 0.07) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 85% 80% at 50% 50%, black 40%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 85% 80% at 50% 50%, black 40%, transparent 100%);
  }

  /* bottom accent bar */
  .blog-header::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4B9CD3 0%, #6ec6f5 50%, #4B9CD3 100%);
  }

  /* floating accent circles */
  .blog-header-decor {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .blog-header-decor span {
    position: absolute;
    border-radius: 50%;
    opacity: 0.08;
    background: #4B9CD3;
  }
  .blog-header-decor span:nth-child(1) {
    width: 320px; height: 320px;
    top: -100px; left: -80px;
  }
  .blog-header-decor span:nth-child(2) {
    width: 220px; height: 220px;
    bottom: -70px; right: -40px;
  }
  .blog-header-decor span:nth-child(3) {
    width: 120px; height: 120px;
    top: 30px; right: 18%;
    opacity: 0.05;
  }

  .blog-header-inner {
    position: relative;
    z-index: 1;
  }

  .blog-header-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(75, 156, 211, 0.15);
    color: #a8d8f0;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.32rem 1rem;
    border-radius: 20px;
    border: 1px solid rgba(75, 156, 211, 0.25);
    margin-bottom: 1.3rem;
  }
  .blog-header-eyebrow::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4B9CD3;
    flex-shrink: 0;
  }

  .blog-header h1 {
    color: #ffffff;
    font-size: 3rem;
    font-weight: 800;
    letter-spacing: -0.035em;
    margin-bottom: 0.75rem;
    line-height: 1.12;
  }
  .blog-header h1 span {
    color: #4B9CD3;
  }

  .blog-header-rule {
    width: 48px;
    height: 3px;
    background: #4B9CD3;
    border-radius: 2px;
    margin: 1.1rem auto 1.15rem;
  }

  .blog-header p {
    color: #b8bdb7;
    font-size: 0.97rem;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.72;
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
  .tag-resume  { background: #e5f3fb; color: #1a6fa8; }
  .tag-apps    { background: #eaf7e1; color: #3a7d2c; }
  .tag-career  { background: #fef6e4; color: #966210; }
  .tag-science { background: #e5f3fb; color: #1a6fa8; }

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
    .blog-header h1 { font-size: 2.5rem; }
  }
  @media (max-width: 700px) {
    .blog-header { padding: 3.75rem 1.25rem 3.25rem; }
    .blog-header h1 { font-size: 2rem; }
    .blog-container { padding: 2.25rem 1rem 3.5rem; }
    .blog-grid { grid-template-columns: 1fr; gap: 1.25rem; }
    .card-image-wrap { height: 190px; }
  }
  @media (max-width: 400px) {
    .blog-header h1 { font-size: 1.7rem; }
    .blog-header p { font-size: 0.88rem; }
  }
`;

const POSTS = [
  {
    id: 1,
    title: "From Classroom to Lab: How to Write a Research Resume That Actually Works",
    author: "Alisha Varshney",
    date: "March 10, 2025",
    readTime: "5 min read",
    category: "Resume Tips",
    tagClass: "tag-resume",
    image: resumeHero,
    excerpt:
      "Staring at a lab posting from a place like NC State or Duke as a high schooler is intimidating. Here's how to stop writing a resume for a summer job and start writing one for a scientist.",
    href: "/blog/resume",
  },
  {
    id: 2,
    title: "The Art of the Ask: Getting a Teacher Recommendation for Research Programs",
    author: "Alisha Varshney",
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Applications",
    tagClass: "tag-apps",
    image: teacherRecHero,
    excerpt:
      "Securing a spot in a summer research program means securing a great recommendation. Here's how to ask your teacher the right way — and actually get a letter that stands out.",
    href: "/blog/teacher-recommendation",
  },
];

export default function Blog() {
  return (
    <>
      <style>{css}</style>
      <div className="blog-root">

        <header className="blog-header">
          <div className="blog-header-decor">
            <span />
            <span />
            <span />
          </div>
          <div className="blog-header-inner">
            <span className="blog-header-eyebrow">Resources</span>
            <h1>The Resource <span>Blog</span></h1>
            <div className="blog-header-rule" />
            <p>Guides, tips, and helpful resources for high school students across the Triangle area, including opportunities for volunteering, academics, and community involvement.</p>
          </div>
        </header>

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