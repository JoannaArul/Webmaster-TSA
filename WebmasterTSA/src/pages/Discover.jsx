import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import discoverHero from "../assets/DiscoverHero.jpg";

import academicPrograms from "../data/AcademicProgram.json";
import awards from "../data/Awards.json";
import communityEvents from "../data/CommunityEvents.json";
import nonprofits from "../data/Nonprofits.json";
import scholarships from "../data/Scholarships.json";
import summerPrograms from "../data/SummerPrograms.json";
import supportServices from "../data/SupportServices.json";
import volunteering from "../data/Volunteering.json";

const COLORS = {
  carolinaBlue: "#4B9CD3",
  beige: "#F5FCEF",
  text: "#111111",
  textSoft: "#2B2B2B",
  border: "#E5E7EB",
  cardFill: "#FAFFF6",
};

const INTERESTS = [
  "Biology",
  "Computer Science",
  "Education",
  "Engineering",
  "Environmental Science",
  "Mathematics",
  "Chemistry",
  "English Literature Writing",
  "Arts Performance",
  "Law & Government",
  "Physics",
  "Political Science",
  "Business",
  "Psychology",
  "STEM/Enrichment",
  "Public Service",
  "Sports & Entertainment",
];

const TYPE_PILLS = [
  "Academic Program",
  "Awards",
  "Community Events",
  "Non-profits",
  "Scholarships",
  "Summer Programs",
  "Support Services",
  "Volunteering",
];

const uniq = (arr) => Array.from(new Set((arr || []).filter(Boolean)));

const formatGrades = (grades) => {
  const nums = uniq(grades)
    .map((g) => Number(g))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b);

  if (nums.length === 0) return "";

  let consecutive = true;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] + 1) {
      consecutive = false;
      break;
    }
  }

  if (consecutive && nums.length >= 2) return `${nums[0]}–${nums[nums.length - 1]}`;
  if (nums.length === 1) return `${nums[0]}`;
  return nums.join(", ");
};

const slugify = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const QUIZ = [
  {
    id: "q1",
    q: "You’re given a messy real-world problem with no clear instructions. What’s your instinct?",
    options: [
      { t: "Break it into logical steps and test different solutions", points: { "Computer Science": 2, Engineering: 2 } },
      { t: "Ask why the problem exists and how it impacts people", points: { "Public Service": 2, "Political Science": 2 } },
      { t: "Look for patterns, models, or equations behind it", points: { Mathematics: 2, Physics: 2 } },
      { t: "Think about how to explain it clearly to others", points: { Education: 2, "English Literature Writing": 2 } },
    ],
  },
  {
    id: "q2",
    q: "Which task sounds most satisfying to you?",
    options: [
      { t: "Designing something that physically works (bridge, robot, device)", points: { Engineering: 2, Physics: 2 } },
      { t: "Analyzing data to prove or disprove a hypothesis", points: { Biology: 2, Chemistry: 2 } },
      { t: "Writing something that changes how people think or feel", points: { "English Literature Writing": 2, "Arts Performance": 2 } },
      { t: "Leading a group toward a shared goal", points: { Business: 2, "Law & Government": 2 } },
    ],
  },
  {
    id: "q3",
    q: "In a group project, what role do you naturally fall into?",
    options: [
      { t: "The organizer who keeps everyone on track", points: { Business: 2, "Public Service": 2 } },
      { t: "The idea generator who thinks creatively", points: { "Arts Performance": 2, "STEM/Enrichment": 2 } },
      { t: "The problem-solver who fixes what’s broken", points: { "Computer Science": 2, Engineering: 2 } },
      { t: "The mediator who makes sure everyone feels heard", points: { Psychology: 2, Education: 2 } },
    ],
  },
  {
    id: "q4",
    q: "What kind of questions do you catch yourself asking?",
    options: [
      { t: "“How does this system actually work?”", points: { Engineering: 2, "Computer Science": 2 } },
      { t: "“Why do people behave this way?”", points: { Psychology: 2, "Political Science": 2 } },
      { t: "“What evidence supports this?”", points: { Biology: 2, Chemistry: 2 } },
      { t: "“What would happen if we changed the rules?”", points: { "Law & Government": 2, Business: 2 } },
    ],
  },
  {
    id: "q5",
    q: "You’re given free time and resources for a passion project. You choose to:",
    options: [
      { t: "Build an app, game, or website", points: { "Computer Science": 2, "STEM/Enrichment": 2 } },
      { t: "Write, perform, or create something expressive", points: { "English Literature Writing": 2, "Arts Performance": 2 } },
      { t: "Start a club, initiative, or fundraiser", points: { "Public Service": 2, Business: 2 } },
      { t: "Conduct an experiment or research study", points: { Biology: 2, Chemistry: 2, Physics: 1 } },
    ],
  },
  {
    id: "q6",
    q: "What kind of impact motivates you the most?",
    options: [
      { t: "Helping individuals improve their lives", points: { Psychology: 2, Education: 2 } },
      { t: "Solving global or environmental challenges", points: { "Environmental Science": 2, "Public Service": 2 } },
      { t: "Advancing technology or innovation", points: { Engineering: 2, "Computer Science": 2 } },
      { t: "Influencing systems, policies, or institutions", points: { "Law & Government": 2, "Political Science": 2 } },
    ],
  },
  {
    id: "q7",
    q: "Which school assignment do you secretly enjoy more?",
    options: [
      { t: "Open-ended projects with creative freedom", points: { "Arts Performance": 2, "English Literature Writing": 2 } },
      { t: "Labs with precise steps and measurable results", points: { Chemistry: 2, Biology: 2 } },
      { t: "Problem sets that require deep thinking", points: { Mathematics: 2, Physics: 2 } },
      { t: "Presentations or debates", points: { "Law & Government": 2, Education: 2 } },
    ],
  },
  {
    id: "q8",
    q: "When something fails, your reaction is:",
    options: [
      { t: "Debug it until it works", points: { "Computer Science": 2, Engineering: 2 } },
      { t: "Reflect on the human or emotional factors", points: { Psychology: 2, "Public Service": 2 } },
      { t: "Analyze the data to find what went wrong", points: { Mathematics: 2, Biology: 1, Chemistry: 1, Physics: 1 } },
      { t: "Adapt and pivot to a new strategy", points: { Business: 2, "Political Science": 2 } },
    ],
  },
  {
    id: "q9",
    q: "Which environment sounds most exciting?",
    options: [
      { t: "A lab or research facility", points: { Biology: 2, Chemistry: 2, Physics: 1 } },
      { t: "A classroom, workshop, or mentorship setting", points: { Education: 2, "STEM/Enrichment": 2 } },
      { t: "A courtroom, legislature, or policy meeting", points: { "Law & Government": 2, "Political Science": 2 } },
      { t: "A studio, stage, or media space", points: { "Arts Performance": 2, "Sports & Entertainment": 2 } },
    ],
  },
  {
    id: "q10",
    q: "What do people often compliment you on?",
    options: [
      { t: "Your logic and problem-solving skills", points: { Mathematics: 2, "Computer Science": 2 } },
      { t: "Your ability to communicate ideas clearly", points: { Education: 2, "English Literature Writing": 2 } },
      { t: "Your empathy and understanding of others", points: { Psychology: 2, "Public Service": 2 } },
      { t: "Your leadership or confidence", points: { Business: 2, "Sports & Entertainment": 2 } },
    ],
  },
  {
    id: "q11",
    q: "Which challenge would you rather tackle?",
    options: [
      { t: "Reducing pollution using science and data", points: { "Environmental Science": 2, Chemistry: 2 } },
      { t: "Improving access to education or healthcare", points: { "Public Service": 2, Education: 2 } },
      { t: "Optimizing a system for efficiency", points: { Engineering: 2, Mathematics: 2 } },
      { t: "Building a personal brand or team", points: { Business: 2, "Sports & Entertainment": 2 } },
    ],
  },
  {
    id: "q12",
    q: "If success were guaranteed, you’d want to:",
    options: [
      { t: "Discover something new", points: { Physics: 2, Biology: 2, Chemistry: 1 } },
      { t: "Teach or inspire future generations", points: { Education: 2, "STEM/Enrichment": 2 } },
      { t: "Create something people love or remember", points: { "Arts Performance": 2, "English Literature Writing": 2 } },
      { t: "Influence decisions at a large scale", points: { "Law & Government": 2, "Political Science": 2 } },
    ],
  },
];

const CAREERS_BY_INTEREST = {
  Biology: [
    { title: "Natural Sciences Manager", medianSalary: "~$137,904", education: "Bachelor’s+ (often Master’s/PhD)", schoolYears: "4–10", blurb: "Leads scientific teams and research programs, budgets, timelines, and lab operations." },
    { title: "Biologists", medianSalary: "~$82,246", education: "Master’s", schoolYears: "6", blurb: "Studies living organisms and ecosystems through fieldwork, experiments, and data." },
    { title: "Agricultural Technicians", medianSalary: "~$40,828", education: "Bachelor’s+ (often Master’s)", schoolYears: "4–6", blurb: "Supports crop/livestock research by collecting samples, running tests, and tracking results." },
    { title: "Molecular and Cellular Biologists", medianSalary: "~$82,246", education: "Bachelor’s", schoolYears: "4", blurb: "Investigates cells, genes, and proteins to understand disease and develop treatments." },
    { title: "Forensic Science Technicians", medianSalary: "~$61,873", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Analyzes evidence and lab samples to support investigations and courtroom testimony." },
    { title: "Microbiologists", medianSalary: "~$79,060", education: "Associate’s/Bachelor’s", schoolYears: "2–4", blurb: "Studies bacteria/viruses and runs lab tests for health, food safety, and research." },
  ],
  "Computer Science": [
    { title: "Software Engineer", medianSalary: "~$120k", education: "Bachelor’s", schoolYears: "4", blurb: "Builds and maintains software systems, features, and infrastructure for real users." },
    { title: "Data Scientist", medianSalary: "~$125k", education: "Bachelor’s+ (often Master’s)", schoolYears: "4–6", blurb: "Turns messy data into insights using statistics, ML, and storytelling." },
    { title: "Cybersecurity Analyst", medianSalary: "~$110k", education: "Bachelor’s", schoolYears: "4", blurb: "Protects networks and accounts by detecting threats, patching risks, and responding fast." },
    { title: "UI/UX Designer", medianSalary: "~$90k", education: "Bachelor’s/Portfolio", schoolYears: "2–4", blurb: "Designs interfaces that feel intuitive—research, wireframes, prototypes, and testing." },
    { title: "AI/ML Engineer", medianSalary: "~$140k", education: "Bachelor’s+ (often Master’s)", schoolYears: "4–6", blurb: "Builds models and pipelines that learn from data and power intelligent features." },
    { title: "Product Manager (Tech)", medianSalary: "~$130k", education: "Bachelor’s", schoolYears: "4", blurb: "Aligns teams around a product vision—priorities, roadmap, and customer impact." },
  ],
  Education: [
    { title: "High School Teacher", medianSalary: "~$60k", education: "Bachelor’s + licensure", schoolYears: "4–5", blurb: "Plans lessons, teaches, assesses learning, and supports student growth day-to-day." },
    { title: "School Counselor", medianSalary: "~$65k", education: "Master’s", schoolYears: "6", blurb: "Supports academic planning, mental wellness, and college/career readiness." },
    { title: "Instructional Designer", medianSalary: "~$80k", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Builds training courses and learning materials that actually work and stick." },
    { title: "Special Education Teacher", medianSalary: "~$62k", education: "Bachelor’s + licensure", schoolYears: "4–5", blurb: "Creates supports and adaptations so students can learn confidently and independently." },
    { title: "Education Policy Analyst", medianSalary: "~$85k", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Studies school systems and programs to improve outcomes through policy decisions." },
    { title: "Tutor / Academic Coach", medianSalary: "~$35–70k", education: "Varies", schoolYears: "—", blurb: "Works 1:1 or small group to build skills, confidence, and learning strategies." },
  ],
  Engineering: [
    { title: "Mechanical Engineer", medianSalary: "~$95k", education: "Bachelor’s", schoolYears: "4", blurb: "Designs machines and mechanisms—CAD, prototypes, testing, and iteration." },
    { title: "Civil Engineer", medianSalary: "~$90k", education: "Bachelor’s", schoolYears: "4", blurb: "Plans and builds infrastructure like roads, bridges, water systems, and buildings." },
    { title: "Electrical Engineer", medianSalary: "~$105k", education: "Bachelor’s", schoolYears: "4", blurb: "Designs circuits and systems powering devices—hardware, signals, and control." },
    { title: "Aerospace Engineer", medianSalary: "~$120k", education: "Bachelor’s", schoolYears: "4", blurb: "Builds aircraft/spacecraft components with a focus on safety, performance, and materials." },
    { title: "Biomedical Engineer", medianSalary: "~$100k", education: "Bachelor’s", schoolYears: "4", blurb: "Combines engineering + medicine to develop devices, diagnostics, and prosthetics." },
    { title: "Systems Engineer", medianSalary: "~$115k", education: "Bachelor’s", schoolYears: "4", blurb: "Makes complex systems work together—requirements, integration, and reliability." },
  ],
  "Environmental Science": [
    { title: "Environmental Scientist", medianSalary: "~$78k", education: "Bachelor’s", schoolYears: "4", blurb: "Assesses environmental impact using field samples, lab testing, and reporting." },
    { title: "Sustainability Analyst", medianSalary: "~$75k", education: "Bachelor’s", schoolYears: "4", blurb: "Tracks sustainability metrics and helps organizations cut waste and emissions." },
    { title: "Conservation Scientist", medianSalary: "~$70k", education: "Bachelor’s", schoolYears: "4", blurb: "Protects land and ecosystems through research, restoration, and stewardship plans." },
    { title: "Climate Data Analyst", medianSalary: "~$90k", education: "Bachelor’s+", schoolYears: "4–6", blurb: "Analyzes climate datasets to model trends and support decisions." },
    { title: "Environmental Engineer", medianSalary: "~$100k", education: "Bachelor’s", schoolYears: "4", blurb: "Designs solutions for clean air/water, pollution control, and waste systems." },
    { title: "Water Quality Specialist", medianSalary: "~$65k", education: "Bachelor’s", schoolYears: "4", blurb: "Tests water systems, investigates contamination, and ensures safety standards." },
  ],
  Mathematics: [
    { title: "Actuary", medianSalary: "~$120k", education: "Bachelor’s + exams", schoolYears: "4+", blurb: "Uses probability + finance to measure risk in insurance, pensions, and more." },
    { title: "Statistician", medianSalary: "~$95k", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Designs studies and interprets data to answer real questions with confidence." },
    { title: "Operations Research Analyst", medianSalary: "~$105k", education: "Bachelor’s", schoolYears: "4", blurb: "Optimizes systems (routes, staffing, scheduling) using models and constraints." },
    { title: "Quantitative Analyst", medianSalary: "~$140k", education: "Bachelor’s+ (often Master’s)", schoolYears: "4–6", blurb: "Builds math models for trading, pricing, forecasting, and decision-making." },
    { title: "Data Analyst", medianSalary: "~$85k", education: "Bachelor’s", schoolYears: "4", blurb: "Transforms data into dashboards and insights that guide everyday decisions." },
    { title: "Math Teacher (Secondary)", medianSalary: "~$60k", education: "Bachelor’s + licensure", schoolYears: "4–5", blurb: "Teaches math foundations and problem-solving with structure and clarity." },
  ],
  Chemistry: [
    { title: "Chemist", medianSalary: "~$85k", education: "Bachelor’s", schoolYears: "4", blurb: "Runs experiments to create and test substances for products and research." },
    { title: "Pharmacist", medianSalary: "~$125k", education: "PharmD", schoolYears: "6–8", blurb: "Dispenses medication, checks interactions, and guides patients on safe use." },
    { title: "Forensic Scientist", medianSalary: "~$70k", education: "Bachelor’s", schoolYears: "4", blurb: "Applies lab science to analyze evidence like fibers, chemicals, and residues." },
    { title: "Chemical Engineer", medianSalary: "~$110k", education: "Bachelor’s", schoolYears: "4", blurb: "Designs large-scale processes to manufacture chemicals, fuels, and materials." },
    { title: "Quality Control Analyst", medianSalary: "~$65k", education: "Bachelor’s", schoolYears: "4", blurb: "Tests products to ensure safety, consistency, and compliance with standards." },
    { title: "Materials Scientist", medianSalary: "~$100k", education: "Bachelor’s+ (often PhD)", schoolYears: "4–10", blurb: "Develops new materials with better strength, conductivity, or durability." },
  ],
  "English Literature Writing": [
    { title: "Journalist", medianSalary: "~$55k", education: "Bachelor’s", schoolYears: "4", blurb: "Reports stories, interviews sources, and explains what’s happening and why." },
    { title: "Copywriter", medianSalary: "~$70k", education: "Bachelor’s/Portfolio", schoolYears: "2–4", blurb: "Writes clear, persuasive text for brands—websites, ads, emails, campaigns." },
    { title: "Editor", medianSalary: "~$65k", education: "Bachelor’s", schoolYears: "4", blurb: "Refines writing for clarity and voice—structure, pacing, and accuracy." },
    { title: "Technical Writer", medianSalary: "~$85k", education: "Bachelor’s", schoolYears: "4", blurb: "Explains complex products (software, tools) in guides, docs, and tutorials." },
    { title: "Content Strategist", medianSalary: "~$95k", education: "Bachelor’s", schoolYears: "4", blurb: "Plans content systems that match user needs—tone, topics, and structure." },
    { title: "Attorney (Writing-heavy)", medianSalary: "~$130k", education: "JD", schoolYears: "7", blurb: "Writes arguments, briefs, and documents where precision and logic matter." },
  ],
  "Arts Performance": [
    { title: "Graphic Designer", medianSalary: "~$60k", education: "Bachelor’s/Portfolio", schoolYears: "2–4", blurb: "Creates visuals for brands—posters, layouts, social media, and identity." },
    { title: "UX/UI Designer", medianSalary: "~$90k", education: "Bachelor’s/Portfolio", schoolYears: "2–4", blurb: "Designs digital experiences that feel smooth, accessible, and beautiful." },
    { title: "Film/Video Editor", medianSalary: "~$65k", education: "Bachelor’s/Portfolio", schoolYears: "2–4", blurb: "Shapes raw footage into compelling stories with pacing, sound, and color." },
    { title: "Performer / Actor", medianSalary: "Varies", education: "Training/Portfolio", schoolYears: "—", blurb: "Builds characters and performs live/on camera through practice and auditions." },
    { title: "Music Producer", medianSalary: "Varies", education: "Training/Portfolio", schoolYears: "—", blurb: "Creates songs—recording, arranging, mixing, and guiding the sound." },
    { title: "Art Director", medianSalary: "~$105k", education: "Bachelor’s", schoolYears: "4", blurb: "Leads visual direction for campaigns, projects, and creative teams." },
  ],
  "Law & Government": [
    { title: "Attorney", medianSalary: "~$135k", education: "JD", schoolYears: "7", blurb: "Advises clients and argues cases using research, writing, and negotiation." },
    { title: "Policy Advisor", medianSalary: "~$90k", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Develops policy ideas and briefs leaders on what to do next." },
    { title: "Legislative Assistant", medianSalary: "~$60k", education: "Bachelor’s", schoolYears: "4", blurb: "Supports lawmakers with research, constituent work, and drafting documents." },
    { title: "Compliance Officer", medianSalary: "~$95k", education: "Bachelor’s", schoolYears: "4", blurb: "Ensures organizations follow laws and policies; manages audits and risk." },
    { title: "Judge (long-term)", medianSalary: "Varies", education: "JD + experience", schoolYears: "7+", blurb: "Presides over cases and makes rulings after years of legal practice." },
    { title: "Public Administrator", medianSalary: "~$85k", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Manages public programs and services—budgets, teams, and community outcomes." },
  ],
  Physics: [
    { title: "Physicist", medianSalary: "~$130k", education: "PhD (often)", schoolYears: "8–10", blurb: "Studies fundamental laws of nature through theory, experiments, and computation." },
    { title: "Aerospace Engineer", medianSalary: "~$120k", education: "Bachelor’s", schoolYears: "4", blurb: "Designs flight systems and components using physics, materials, and testing." },
    { title: "Medical Physicist", medianSalary: "~$150k", education: "Graduate + residency", schoolYears: "8+", blurb: "Works with radiation and imaging to support safe and effective treatment." },
    { title: "Research Scientist", medianSalary: "~$120k", education: "PhD (often)", schoolYears: "8–10", blurb: "Runs investigations, publishes results, and builds new tools or methods." },
    { title: "Data Scientist", medianSalary: "~$125k", education: "Bachelor’s+ (often Master’s)", schoolYears: "4–6", blurb: "Builds models and insights from data to solve complex real-world problems." },
    { title: "Energy Systems Analyst", medianSalary: "~$95k", education: "Bachelor’s", schoolYears: "4", blurb: "Analyzes energy grids and systems to improve efficiency and reliability." },
  ],
  "Political Science": [
    { title: "Policy Analyst", medianSalary: "~$85k", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Evaluates policies using research + data to recommend better decisions." },
    { title: "Campaign Manager", medianSalary: "Varies", education: "Bachelor’s", schoolYears: "4", blurb: "Plans campaign strategy—messaging, fundraising, organizing, and outreach." },
    { title: "International Relations Specialist", medianSalary: "~$90k", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Works on global issues—diplomacy, policy research, and cross-cultural work." },
    { title: "Public Affairs Specialist", medianSalary: "~$80k", education: "Bachelor’s", schoolYears: "4", blurb: "Communicates policy updates and builds public trust through media and messaging." },
    { title: "Community Organizer", medianSalary: "~$55k", education: "Varies", schoolYears: "—", blurb: "Builds coalitions and mobilizes communities around shared goals." },
    { title: "Legislative Analyst", medianSalary: "~$75k", education: "Bachelor’s", schoolYears: "4", blurb: "Reviews bills, summarizes impacts, and briefs decision-makers quickly." },
  ],
  Business: [
    { title: "Entrepreneur", medianSalary: "Varies", education: "Varies", schoolYears: "—", blurb: "Builds a business from idea to execution—customers, product, and growth." },
    { title: "Marketing Manager", medianSalary: "~$115k", education: "Bachelor’s", schoolYears: "4", blurb: "Leads marketing strategy—campaigns, brand, analytics, and customer research." },
    { title: "Financial Analyst", medianSalary: "~$95k", education: "Bachelor’s", schoolYears: "4", blurb: "Analyzes financials and forecasts to guide investments and business decisions." },
    { title: "Project Manager", medianSalary: "~$105k", education: "Bachelor’s", schoolYears: "4", blurb: "Keeps projects on track—scope, timelines, risks, and stakeholders." },
    { title: "Management Consultant", medianSalary: "~$130k", education: "Bachelor’s+ (often MBA)", schoolYears: "4–6", blurb: "Solves business problems for clients using analysis and structured strategy." },
    { title: "Product Manager", medianSalary: "~$130k", education: "Bachelor’s", schoolYears: "4", blurb: "Owns product direction—user needs, roadmap, and cross-team execution." },
  ],
  Psychology: [
    { title: "Clinical Psychologist", medianSalary: "~$95k", education: "PhD/PsyD", schoolYears: "8–10", blurb: "Assesses and treats mental health using therapy and evidence-based care." },
    { title: "School Psychologist", medianSalary: "~$80k", education: "Specialist/Master’s", schoolYears: "6–7", blurb: "Supports student learning needs through evaluations and intervention planning." },
    { title: "Therapist (LCSW/LMHC)", medianSalary: "~$65k", education: "Master’s", schoolYears: "6", blurb: "Provides counseling and support plans for individuals, couples, or groups." },
    { title: "UX Researcher", medianSalary: "~$105k", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Studies how people use products through interviews, tests, and insights." },
    { title: "Behavior Analyst", medianSalary: "~$75k", education: "Master’s", schoolYears: "6", blurb: "Designs behavior plans and interventions, often in clinical or school settings." },
    { title: "HR Specialist", medianSalary: "~$70k", education: "Bachelor’s", schoolYears: "4", blurb: "Supports hiring, onboarding, culture, and employee development." },
  ],
  "STEM/Enrichment": [
    { title: "Research Intern (HS/Undergrad)", medianSalary: "Varies", education: "In progress", schoolYears: "—", blurb: "Assists in research—literature review, experiments, data cleaning, and posters." },
    { title: "Robotics Builder", medianSalary: "Varies", education: "Varies", schoolYears: "—", blurb: "Builds and tests robots—mechanical, electrical, and iteration under deadlines." },
    { title: "Hackathon Developer", medianSalary: "Varies", education: "Varies", schoolYears: "—", blurb: "Creates fast prototypes with a team—shipping an idea in 24–48 hours." },
    { title: "STEM Program Mentor", medianSalary: "~$35–60k", education: "Varies", schoolYears: "—", blurb: "Mentors students in projects and skills, helping them grow confidence." },
    { title: "Science Communicator", medianSalary: "~$60k", education: "Bachelor’s", schoolYears: "4", blurb: "Explains science clearly through writing, video, teaching, or outreach." },
    { title: "Innovation Program Lead", medianSalary: "~$80k", education: "Bachelor’s", schoolYears: "4", blurb: "Runs workshops and programs that help teams turn ideas into real pilots." },
  ],
  "Public Service": [
    { title: "Social Worker", medianSalary: "~$60k", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Connects people to services and support while advocating for their needs." },
    { title: "Public Health Coordinator", medianSalary: "~$70k", education: "Bachelor’s/Master’s", schoolYears: "4–6", blurb: "Coordinates programs that improve community health and access to care." },
    { title: "Nonprofit Program Manager", medianSalary: "~$75k", education: "Bachelor’s", schoolYears: "4", blurb: "Plans and runs nonprofit programs—outcomes, logistics, partners, and budgets." },
    { title: "Urban Planner", medianSalary: "~$85k", education: "Master’s", schoolYears: "6", blurb: "Designs community plans for housing, transportation, and public spaces." },
    { title: "Community Outreach Specialist", medianSalary: "~$60k", education: "Bachelor’s", schoolYears: "4", blurb: "Builds relationships and awareness through events, partnerships, and communication." },
    { title: "Emergency Management Specialist", medianSalary: "~$90k", education: "Bachelor’s", schoolYears: "4", blurb: "Plans responses for disasters and coordinates resources when emergencies happen." },
  ],
  "Sports & Entertainment": [
    { title: "Sports Marketing Manager", medianSalary: "~$90k", education: "Bachelor’s", schoolYears: "4", blurb: "Promotes teams/events through campaigns, partnerships, and fan engagement." },
    { title: "Event Producer", medianSalary: "~$75k", education: "Bachelor’s/Portfolio", schoolYears: "2–4", blurb: "Plans events end-to-end—logistics, vendors, schedules, and live execution." },
    { title: "Sports Analyst", medianSalary: "~$85k", education: "Bachelor’s", schoolYears: "4", blurb: "Uses stats and video to evaluate performance and strategy." },
    { title: "Content Creator", medianSalary: "Varies", education: "Portfolio", schoolYears: "—", blurb: "Creates social/video content that grows an audience through storytelling and consistency." },
    { title: "Talent Manager", medianSalary: "~$80k", education: "Bachelor’s", schoolYears: "4", blurb: "Supports creators/athletes—contracts, branding, opportunities, and negotiation." },
    { title: "Broadcast Producer", medianSalary: "~$95k", education: "Bachelor’s", schoolYears: "4", blurb: "Coordinates live/recorded shows—run of show, crew, timing, and delivery." },
  ],
};

const DEFAULT_CAREERS = Array.from({ length: 6 }).map(() => ({
  title: "Career Pathway Example",
  medianSalary: "~$—",
  education: "Varies",
  schoolYears: "—",
  blurb: "A short preview of this career would appear here, along with a Learn more link.",
}));

const careerCardVariants = {
  rest: { y: 0, scale: 1, boxShadow: "0 12px 26px rgba(0,0,0,0.10)" },
  hover: { y: -8, scale: 1.02, boxShadow: "0 22px 45px rgba(75,156,211,0.22)" },
};

const RESOURCE_NORMALIZE = (arr, categoryLabel) =>
  (Array.isArray(arr) ? arr : []).map((r, i) => ({
    id: r.id || `${categoryLabel}-${(r.name || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i}`,
    name: r.name || "Untitled",
    category: r.category || categoryLabel,
    cities: Array.isArray(r.cities) ? r.cities : [],
    grades: Array.isArray(r.grades) ? r.grades : [],
    interest: r.interest || "",
    description: r.description || "",
    link: r.link || "#",
    featured: !!r.featured,
  }));

export default function Discover() {
  const quizTopRef = useRef(null);

  const [answers, setAnswers] = useState(() => Object.fromEntries(QUIZ.map((q) => [q.id, ""])));
  const [error, setError] = useState("");
  const [resultInterest, setResultInterest] = useState("");

  const allResources = useMemo(() => {
    return [
      ...RESOURCE_NORMALIZE(academicPrograms, "Academic Program"),
      ...RESOURCE_NORMALIZE(awards, "Awards"),
      ...RESOURCE_NORMALIZE(communityEvents, "Community Events"),
      ...RESOURCE_NORMALIZE(nonprofits, "Non-profits"),
      ...RESOURCE_NORMALIZE(scholarships, "Scholarships"),
      ...RESOURCE_NORMALIZE(summerPrograms, "Summer Programs"),
      ...RESOURCE_NORMALIZE(supportServices, "Support Services"),
      ...RESOURCE_NORMALIZE(volunteering, "Volunteering"),
    ];
  }, []);

  const filteredResources = useMemo(() => {
    if (!resultInterest) return [];
    return allResources.filter((r) => r.interest === resultInterest);
  }, [allResources, resultInterest]);

  const scrollToQuiz = () => {
    quizTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scored = useMemo(() => {
    if (!resultInterest) return null;
    const careers = CAREERS_BY_INTEREST[resultInterest] || DEFAULT_CAREERS;
    return { interest: resultInterest, careers };
  }, [resultInterest]);

  const setAnswer = (qid, idx) => setAnswers((p) => ({ ...p, [qid]: String(idx) }));

  const computeTopInterest = () => {
    const scores = Object.fromEntries(INTERESTS.map((k) => [k, 0]));
    for (const q of QUIZ) {
      const chosen = answers[q.id];
      if (chosen === "") continue;
      const opt = q.options[Number(chosen)];
      if (!opt?.points) continue;
      for (const [k, v] of Object.entries(opt.points)) {
        if (scores[k] !== undefined) scores[k] += Number(v) || 0;
      }
    }
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const top = ranked[0];
    return top?.[1] > 0 ? top[0] : "STEM/Enrichment";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    for (const q of QUIZ) {
      if (answers[q.id] === "") {
        setError("Please answer every question before submitting.");
        return;
      }
    }
    setResultInterest(computeTopInterest());
    setTimeout(() => {
      quizTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const reset = () => {
    setResultInterest("");
    setError("");
    setAnswers(Object.fromEntries(QUIZ.map((q) => [q.id, ""])));
    setTimeout(() => {
      quizTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} style={styles.page}>
      <section
        style={{
          ...hero.fullBleed,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url(${discoverHero})`,
        }}
      >
        <div style={hero.innerMax}>
          <div style={hero.innerGrid}>
            <div style={hero.left}>
              <div style={hero.kicker}>Interest Test</div>

              <h1 style={hero.title}>
                Choosing your path can feel <span style={{ color: COLORS.carolinaBlue }}>overwhelming</span>
              </h1>

              <p style={hero.sub}>
                A quick interest test can bring clarity by matching what you enjoy with possible career directions — plus resources and opportunities to explore next.
              </p>

              <div style={hero.actions}>
                <button
                  type="button"
                  style={hero.cta}
                  onClick={scrollToQuiz}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2F86BC")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.carolinaBlue)}
                >
                  Take the Free Interest Test
                </button>
              </div>

              <div style={hero.statsRow}>
                <div style={hero.stat}>
                  <div style={hero.statNum}>5</div>
                  <div style={hero.statLabel}>Minutes</div>
                </div>
                <div style={hero.stat}>
                  <div style={hero.statNum}>17</div>
                  <div style={hero.statLabel}>Interest Areas</div>
                </div>
              </div>
            </div>

            <div style={hero.right}>
              <div style={hero.heroCard}>
                <div style={hero.heroCardTop}>
                  <div style={hero.heroCardTitle}>How it works</div>
                  <div style={hero.heroCardLine} />
                </div>
                <div style={hero.heroCardBody}>
                  <div style={hero.step}>
                    <div style={hero.stepDot} />
                    <div style={hero.stepText}>Answer 12 quick questions</div>
                  </div>
                  <div style={hero.step}>
                    <div style={hero.stepDot} />
                    <div style={hero.stepText}>Get your best-fit interest area</div>
                  </div>
                  <div style={hero.step}>
                    <div style={hero.stepDot} />
                    <div style={hero.stepText}>Explore careers and resources that match</div>
                  </div>
                </div>
                <div style={hero.heroCardFooter}>
                  <div style={hero.footerPill}>Beginner-friendly</div>
                  <div style={hero.footerPill}>Fast</div>
                  <div style={hero.footerPill}>Actionable</div>
                </div>
              </div>

              <div style={hero.heroHint}></div>
            </div>
          </div>
        </div>
      </section>

      <div style={styles.container}>
        <div ref={quizTopRef} />

        {!resultInterest ? (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Free Interest Test</h2>
            <p style={styles.cardSub}>Select one answer for each question.</p>

            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={onSubmit} style={styles.formGrid}>
              {QUIZ.map((q, qi) => (
                <div key={q.id} style={styles.group}>
                  <div style={styles.groupTitle}>
                    {qi + 1}. {q.q}
                  </div>

                  <div style={styles.radioList}>
                    {q.options.map((o, oi) => {
                      const checked = answers[q.id] === String(oi);
                      return (
                        <label key={o.t} style={{ ...styles.radioRow, ...(checked ? styles.radioRowOn : null) }}>
                          <input type="radio" name={q.id} checked={checked} onChange={() => setAnswer(q.id, oi)} />
                          <span style={styles.radioLabel}>{o.t}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div style={styles.actions}>
                <button
                  type="submit"
                  style={styles.primary}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2F86BC")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.carolinaBlue)}
                >
                  Get My Result
                </button>
                <button
                  type="button"
                  style={styles.secondary}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E6EDE2")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.cardFill)}
                  onClick={() => setAnswers(Object.fromEntries(QUIZ.map((x) => [x.id, ""])))}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 16, marginTop: 28 }}>
            <div style={styles.resultBox}>
              <div style={styles.resultKicker}>Your best-fit interest area</div>
              <div style={styles.resultTitle}>{resultInterest.toUpperCase()}</div>
              <div style={styles.resultSub}>These are example careers connected to your result. Your interests can lead to many different paths.</div>
              <div style={styles.resultActions}>
                <button
                  type="button"
                  style={styles.primary}
                  onClick={reset}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2F86BC")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.carolinaBlue)}
                >
                  Retake Test
                </button>
              </div>
            </div>

            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Career Ideas</h2>
              <div style={styles.sectionLine} />
              <p style={styles.sectionSub}>Explore six careers commonly linked to {resultInterest}.</p>
            </div>

            <div className="discover-career-grid" style={styles.careerGrid}>
              {(scored?.careers || DEFAULT_CAREERS).slice(0, 6).map((c) => {
                const slug = slugify(c.title);
                return (
                  <motion.div
                    key={c.title}
                    style={styles.careerCard}
                    variants={careerCardVariants}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <div style={styles.careerBody}>
                      <div style={styles.careerTitle}>{c.title}</div>
                      <div style={styles.careerBlurb}>{c.blurb || "Learn what this role involves, what skills it uses, and how people get started."}</div>

                      <div style={styles.careerMeta}>
                        <div style={styles.metaRow}>
                          <span style={styles.metaKey}>Median Salary:</span>
                          <span style={styles.metaVal}>{c.medianSalary}</span>
                        </div>
                        <div style={styles.metaRow}>
                          <span style={styles.metaKey}>Education:</span>
                          <span style={styles.metaVal}>{c.education}</span>
                        </div>
                        <div style={styles.metaRow}>
                          <span style={styles.metaKey}>Years of School:</span>
                          <span style={styles.metaVal}>{c.schoolYears}</span>
                        </div>
                      </div>

                      <div style={styles.learnMoreRow}>
                        <Link to={`/careers/${slug}`} style={styles.learnMoreLink}>
                          Learn more →
                        </Link>
                      </div>
                    </div>

                    <div style={styles.cardAccent} aria-hidden="true" />
                  </motion.div>
                );
              })}
            </div>

            <div style={{ ...styles.card, marginTop: 4 }}>
              <h2 style={styles.cardTitle}>Recommended Opportunities</h2>

              <div style={styles.placeholderStrip}>
                {TYPE_PILLS.map((t) => (
                  <div key={t} style={styles.placeholderPill}>
                    {t}
                  </div>
                ))}
              </div>

              <div style={styles.oppsHeader}>
                <div style={styles.oppsTitle}>Resources matched to {resultInterest}</div>
                <div style={styles.oppsCount}>{filteredResources.length} results</div>
              </div>

              {filteredResources.length === 0 ? (
                <div style={styles.emptyState}>
                  No resources found for this interest yet. Add more resources tagged <b>{resultInterest}</b> and they’ll appear here automatically.
                </div>
              ) : (
                <div className="discover-resource-grid" style={styles.resourceGrid}>
                  {filteredResources.map((r) => {
                    const citiesText = uniq(r.cities).join(", ");
                    const gradesText = formatGrades(r.grades);
                    return (
                      <a key={r.id} href={r.link} target="_blank" rel="noreferrer" style={styles.resourceCard}>
                        <div style={styles.resourceTopRow}>
                          <div style={styles.resourceTitle}>{r.name}</div>
                          <div style={styles.resourceBadge}>{r.category}</div>
                        </div>

                        <div style={styles.resourceLine} />

                        <div style={styles.resourceDesc}>{r.description}</div>

                        <div style={styles.resourceMetaRow}>
                          <div style={styles.metaPill}>{r.interest}</div>
                          {citiesText && <div style={styles.metaPill}>Cities: {citiesText}</div>}
                          {gradesText && <div style={styles.metaPill}>Grades: {gradesText}</div>}
                        </div>

                        <div style={styles.resourceAccent} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - var(--header-h))",
    backgroundColor: COLORS.beige,
    paddingBottom: "32px",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    color: COLORS.text,
    overflowX: "clip",
  },
  container: { maxWidth: "1200px", margin: "0 auto", padding: "0 20px", boxSizing: "border-box" },

  card: {
    backgroundColor: COLORS.beige,
    borderRadius: "18px",
    padding: "18px",
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 14px 30px rgba(0,0,0,0.10)",
    marginTop: "28px",
  },
  cardTitle: { margin: 0, color: COLORS.text, fontSize: "1.7rem", fontFamily: '"Merriweather", serif' },
  cardSub: { marginTop: "8px", color: "#374151", marginBottom: "14px", fontWeight: 600 },

  error: {
    marginTop: "10px",
    backgroundColor: "#FEF2F2",
    border: "1px solid #FCA5A5",
    color: "#991B1B",
    padding: "10px 12px",
    borderRadius: "12px",
    fontWeight: 800,
  },

  formGrid: { display: "grid", gap: "14px" },

  group: {
    border: `1px solid ${COLORS.border}`,
    borderRadius: "14px",
    padding: "14px",
    backgroundColor: COLORS.cardFill,
  },
  groupTitle: { fontWeight: 900, color: COLORS.text, marginBottom: "10px", lineHeight: 1.35 },
  radioList: { display: "grid", gap: "10px" },
  radioRow: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    color: COLORS.text,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "12px",
    padding: "10px 12px",
    backgroundColor: "rgba(255,255,255,0.35)",
    cursor: "pointer",
    transition: "transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease",
  },
  radioRowOn: {
    border: `1px solid rgba(75,156,211,0.65)`,
    boxShadow: "0 10px 22px rgba(75,156,211,0.18)",
    backgroundColor: "rgba(75,156,211,0.08)",
    transform: "translateY(-1px)",
  },
  radioLabel: { fontWeight: 700, lineHeight: 1.35, color: COLORS.textSoft },

  actions: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "6px" },
  primary: {
    padding: "11px 16px",
    borderRadius: "12px",
    border: "1px solid transparent",
    backgroundColor: COLORS.carolinaBlue,
    color: COLORS.beige,
    fontWeight: 900,
    cursor: "pointer",
    transition: "background-color 160ms ease",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  },
  secondary: {
    padding: "11px 16px",
    borderRadius: "12px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.cardFill,
    cursor: "pointer",
    fontWeight: 900,
    color: COLORS.text,
    transition: "background-color 160ms ease",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  },

  resultBox: {
    backgroundColor: COLORS.beige,
    borderRadius: "22px",
    padding: "22px",
    border: `1px solid ${COLORS.border}`,
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    gap: 10,
  },
  resultKicker: {
    padding: "8px 12px",
    borderRadius: "999px",
    backgroundColor: COLORS.cardFill,
    border: `1px solid ${COLORS.border}`,
    fontWeight: 900,
    color: COLORS.text,
  },
  resultTitle: {
    fontFamily: '"Merriweather", serif',
    color: COLORS.carolinaBlue,
    fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    marginTop: 4,
  },
  resultSub: { maxWidth: 720, color: "#374151", fontWeight: 700, lineHeight: 1.6 },
  resultActions: { marginTop: 8 },

  sectionHeader: { marginTop: 6 },
  sectionTitle: { margin: 0, fontSize: "1.55rem", fontFamily: '"Merriweather", serif', color: COLORS.text },
  sectionLine: { width: "100%", height: 1, backgroundColor: "rgba(0,0,0,0.10)", marginTop: 10 },
  sectionSub: { marginTop: 10, marginBottom: 0, color: "#374151", fontWeight: 650 },

  careerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
  },
  careerCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "18px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.cardFill,
    minHeight: 320,
    transformOrigin: "center",
  },
  careerBody: { padding: "14px 14px 16px", display: "grid", gap: 10 },
  careerTitle: { fontWeight: 950, fontSize: "1.06rem", color: COLORS.text, marginBottom: 2 },
  careerBlurb: { color: COLORS.textSoft, fontWeight: 650, lineHeight: 1.45, fontSize: "0.95rem" },
  careerMeta: { display: "grid", gap: 8, marginTop: 2 },
  metaRow: { display: "flex", justifyContent: "space-between", gap: 12 },
  metaKey: { color: "#374151", fontWeight: 800 },
  metaVal: { color: COLORS.text, fontWeight: 900, textAlign: "right" },

  learnMoreRow: { marginTop: 4, display: "flex", justifyContent: "flex-end" },
  learnMoreLink: {
    textDecoration: "none",
    fontWeight: 950,
    color: COLORS.carolinaBlue,
    padding: "8px 10px",
    borderRadius: "12px",
    border: "1px solid rgba(75,156,211,0.25)",
    backgroundColor: "rgba(75,156,211,0.08)",
  },

  cardAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "6px",
    backgroundColor: COLORS.carolinaBlue,
  },

  placeholderStrip: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 },

  placeholderPill: {
    padding: "8px 12px",
    borderRadius: "999px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.cardFill,
    fontWeight: 900,
    color: COLORS.text,
  },

  oppsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
    marginTop: 18,
  },
  oppsTitle: { fontFamily: '"Merriweather", serif', fontWeight: 900, fontSize: "1.25rem", color: COLORS.text },
  oppsCount: {
    padding: "7px 10px",
    borderRadius: "999px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.cardFill,
    fontWeight: 900,
    color: COLORS.text,
    whiteSpace: "nowrap",
  },

  emptyState: {
    marginTop: 12,
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.cardFill,
    borderRadius: 14,
    padding: 14,
    color: "#374151",
    fontWeight: 650,
    lineHeight: 1.55,
  },

  resourceGrid: {
    marginTop: 12,
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 12,
  },

  resourceCard: {
    position: "relative",
    textDecoration: "none",
    color: COLORS.text,
    backgroundColor: COLORS.cardFill,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 18,
    padding: 14,
    boxShadow: "0 12px 26px rgba(0,0,0,0.10)",
    transition: "transform 160ms ease, box-shadow 160ms ease",
  },

  resourceTopRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 },
  resourceTitle: { fontWeight: 950, fontSize: "1.02rem", lineHeight: 1.2 },
  resourceBadge: {
    padding: "6px 10px",
    borderRadius: "999px",
    backgroundColor: "rgba(75,156,211,0.12)",
    border: "1px solid rgba(75,156,211,0.30)",
    fontWeight: 900,
    color: COLORS.text,
    whiteSpace: "nowrap",
    fontSize: "0.85rem",
  },
  resourceLine: { width: "100%", height: 1, backgroundColor: "rgba(0,0,0,0.10)", margin: "10px 0" },
  resourceDesc: { color: COLORS.textSoft, fontWeight: 650, lineHeight: 1.45, fontSize: "0.95rem" },
  resourceMetaRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 },
  metaPill: {
    padding: "6px 10px",
    borderRadius: "999px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: "rgba(255,255,255,0.55)",
    fontWeight: 900,
    color: COLORS.text,
    fontSize: "0.85rem",
  },

  resourceAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "6px",
    backgroundColor: COLORS.carolinaBlue,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
};

const hero = {
  fullBleed: {
    width: "100%",
    padding: "56px 0",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderBottom: `1px solid ${COLORS.border}`,
  },
  innerMax: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    boxSizing: "border-box",
  },
  innerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "22px",
    alignItems: "center",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    color: COLORS.beige,
    maxWidth: "62ch",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  },
  kicker: {
    display: "inline-flex",
    width: "fit-content",
    padding: "8px 12px",
    borderRadius: "999px",
    backgroundColor: "rgba(245,252,239,0.92)",
    color: COLORS.text,
    fontWeight: 900,
    fontSize: "0.85rem",
    border: "1px solid rgba(255,255,255,0.25)",
    backdropFilter: "blur(6px)",
  },
  title: {
    margin: 0,
    fontSize: "clamp(2.25rem, 4.2vw, 3.45rem)",
    lineHeight: 1.03,
    letterSpacing: "-0.02em",
    fontWeight: 900,
    fontFamily: '"Merriweather", serif',
    color: COLORS.beige,
  },
  sub: {
    margin: 0,
    color: "rgba(245,252,239,0.92)",
    lineHeight: 1.65,
    fontWeight: 650,
    fontSize: "1.02rem",
  },
  actions: { display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" },
  cta: {
    padding: "12px 18px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.20)",
    backgroundColor: COLORS.carolinaBlue,
    color: COLORS.beige,
    cursor: "pointer",
    fontWeight: 950,
    boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
    transition: "background-color 160ms ease, transform 160ms ease",
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  },
  statsRow: { display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" },
  stat: {
    backgroundColor: "rgba(245,252,239,0.92)",
    color: COLORS.text,
    borderRadius: "16px",
    padding: "10px 12px",
    border: "1px solid rgba(255,255,255,0.25)",
    minWidth: "150px",
    backdropFilter: "blur(6px)",
  },
  statNum: { fontWeight: 950, fontSize: "1.35rem", lineHeight: 1.1 },
  statLabel: { marginTop: "2px", color: "#4B5563", fontWeight: 850, fontSize: "0.9rem" },

  right: { display: "grid", gap: "10px" },
  heroCard: {
    borderRadius: "20px",
    overflow: "hidden",
    backgroundColor: "rgba(245,252,239,0.92)",
    border: "1px solid rgba(255,255,255,0.22)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 16px 36px rgba(0,0,0,0.20)",
    display: "grid",
  },
  heroCardTop: { padding: "14px 16px 0" },
  heroCardTitle: { fontFamily: '"Merriweather", serif', fontWeight: 900, color: COLORS.text, fontSize: "1.15rem" },
  heroCardLine: { width: "100%", height: 1, backgroundColor: "rgba(0,0,0,0.10)", marginTop: 10 },
  heroCardBody: { padding: "14px 16px", display: "grid", gap: 10 },
  step: { display: "flex", gap: 10, alignItems: "flex-start" },
  stepDot: { width: 10, height: 10, borderRadius: 999, backgroundColor: COLORS.carolinaBlue, marginTop: 6 },
  stepText: { color: COLORS.textSoft, fontWeight: 800, lineHeight: 1.4 },
  heroCardFooter: { padding: "0 16px 16px", display: "flex", gap: 10, flexWrap: "wrap" },
  footerPill: {
    padding: "7px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(0,0,0,0.10)",
    backgroundColor: "rgba(255,255,255,0.55)",
    fontWeight: 900,
    color: COLORS.text,
    fontSize: "0.9rem",
  },
  heroHint: { color: "rgba(245,252,239,0.92)", fontWeight: 750, paddingLeft: 2 },
};

const mediaCss = `
@media (max-width: 980px) {
  .discover-career-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  .discover-resource-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
}
@media (max-width: 620px) {
  .discover-career-grid { grid-template-columns: 1fr !important; }
  .discover-resource-grid { grid-template-columns: 1fr !important; }
}
`;

(function injectMediaOnce() {
  if (typeof document === "undefined") return;
  const id = "discover-media-css-v4";
  if (document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.innerHTML = mediaCss;
  document.head.appendChild(s);
})();
