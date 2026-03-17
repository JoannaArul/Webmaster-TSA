import React from "react";
import teacherRecHero from "../assets/teacher-rec-hero.webp";
import teacherClass from "../assets/teacher-class.webp";
import emailEnvelope from "../assets/email-envelope.webp";
import laptopMeeting from "../assets/laptop-meeting.webp";

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .art-root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #F5FCEF;
    min-height: 100vh;
    color: #000000;
  }

  .art-nav {
    background: #494A48;
    padding: 0.95rem 2rem;
    display: flex;
    align-items: center;
    position: relative;
  }

  .art-nav::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: #4B9CD3;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.42rem;
    color: #a8d8f0;
    font-size: 0.85rem;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
  }

  .back-btn:hover { color: #ffffff; }

  .art-hero-wrap {
    width: 100%;
    height: 450px;
    overflow: hidden;
    background: #c8d9bb;
  }

  .art-hero {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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
  }
`;

export default function TeacherRecommendation() {
  return (
    <>
      <style>{css}</style>

      <div className="art-root">

        <nav className="art-nav">
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back to Blog
          </button>
        </nav>

        <div className="art-hero-wrap">
          <img src={teacherRecHero} alt="Email notifications on phone" className="art-hero" />
        </div>

        <div className="art-container">

          <span className="art-tag">Applications</span>

          <h1 className="art-title">
            The Art of the Ask: Getting a Teacher Recommendation for Research Programs
          </h1>

          <div className="art-meta">
            <span>Alisha Varshney</span>
            <span className="art-dot"></span>
            <span>March 15, 2026</span>
            <span className="art-dot"></span>
            <span>5 min read</span>
          </div>

          <p className="art-intro">
            Securing a spot in a summer research program or a competitive weekend lab as a high schooler is a major win. But these programs usually have tiny cohorts, which means they rely heavily on what your teachers say about you.
          </p>

          <p className="art-intro-lead">
            Asking a teacher for this kind of favor can feel awkward, but if you approach it like a professional, you'll stand out before the teacher even opens their laptop to write.
          </p>

          <div className="art-body">

            <img src={teacherClass} alt="Teacher classroom" className="art-section-img" />

            <h2>1. Choose the Teacher Who Saw You Do Science</h2>
            <p>
              For research programs, the teacher who gave you an A in English is great, but the teacher who watched you struggle through a complex chemistry lab is better.
            </p>

            <img src={emailEnvelope} alt="Email envelope" className="art-section-img" />

            <h2>2. Timing: Don't Be the Last Minute Student</h2>
            <p>
              The sweet spot is at least three to four weeks before the program's deadline. This gives teachers time to write a thoughtful recommendation.
            </p>

            <img src={laptopMeeting} alt="Laptop meeting" className="art-section-img" />

            <h2>3. Send the Research Cheat Sheet</h2>

            <div className="cheatsheet-box">
              <span className="cheatsheet-label">Your cheat sheet should include:</span>
              <ul>
                <li>The program name and link</li>
                <li>Why you want to do this research</li>
                <li>A project you did in their class</li>
                <li>Your resume or science extracurriculars</li>
              </ul>
            </div>

            <div className="resource-box">
              <h3>Ready-to-Use Email &amp; Organization Tools</h3>

              <a
                className="resource-link"
                href="https://onlineprograms.sacredheart.edu/application-central/letters-of-recommendation-email-template/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email Template for Teacher Recommendation Requests
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