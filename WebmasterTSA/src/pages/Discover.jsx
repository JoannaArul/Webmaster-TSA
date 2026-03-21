import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import discoverHero from "../assets/DiscoverHero.webp";

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

const careerLearnMoreHref = (title) => `https://www.bls.gov/ooh/search/?q=${encodeURIComponent(title)}`;

const QUIZ = [
  {
    id: "q1",
    q: "You're given a messy real-world problem with no clear instructions. What's your instinct?",
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
      { t: "The problem-solver who fixes what's broken", points: { "Computer Science": 2, Engineering: 2 } },
      { t: "The mediator who makes sure everyone feels heard", points: { Psychology: 2, Education: 2 } },
    ],
  },
  {
    id: "q4",
    q: "What kind of questions do you catch yourself asking?",
    options: [
      { t: '"How does this system actually work?"', points: { Engineering: 2, "Computer Science": 2 } },
      { t: '"Why do people behave this way?"', points: { Psychology: 2, "Political Science": 2 } },
      { t: '"What evidence supports this?"', points: { Biology: 2, Chemistry: 2 } },
      { t: '"What would happen if we changed the rules?"', points: { "Law & Government": 2, Business: 2 } },
    ],
  },
  {
    id: "q5",
    q: "You're given free time and resources for a passion project. You choose to:",
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
    q: "If success were guaranteed, you'd want to:",
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
    { title: "Health Educator", url: "https://www.bls.gov/ooh/community-and-social-service/health-educators.htm", medianSalary: "~$49,612", education: "Bachelor's (CHES sometimes preferred)", schoolYears: "4", blurb: "Health educators help people and communities make informed choices about wellness through topics like nutrition, physical activity, and disease prevention. They often review health data to spot needs or patterns, then create lessons, materials, and training programs people can actually use. Strong communication and leadership matter because they regularly explain health information in schools, community spaces, clinics, and workplaces." },
    { title: "Park Ranger", url: "https://careers.doi.gov/occupational-series/park-ranger", medianSalary: "~$48,419", education: "Bachelor's", schoolYears: "4", blurb: "Park rangers protect parks and the natural resources inside them while helping visitors have a safe, meaningful experience. The day-to-day work can include educating the public, monitoring ecosystems, supporting park operations, and responding to issues as they come up. Depending on the site, they may also take on safety and enforcement responsibilities as part of keeping the park protected." },
    { title: "Biological Technician / Research Assistant", url: "https://www.indeed.com/career-advice/finding-a-job/what-is-biological-technician", medianSalary: "~$45,249", education: "Bachelor's (plus lab experience)", schoolYears: "4", blurb: "Biological technicians support research by collecting, preparing, and organizing samples like blood, food, or bacteria for scientists to study. They help keep labs running by maintaining equipment, tracking procedures, and documenting results carefully so experiments stay reliable. Many also assist with fieldwork and day-to-day lab tasks that make larger studies possible." },
    { title: "Agricultural or Food Science Technician", url: "https://www.bls.gov/ooh/life-physical-and-social-science/agricultural-and-food-science-technicians.htm", medianSalary: "~$44,700", education: "Associate's (sometimes Bachelor's)", schoolYears: "2–4", blurb: "Agricultural and food science technicians help scientists and organizations monitor crops, soil, and food products for quality and safety. Their work often includes collecting data, running tests, and maintaining lab equipment or production records. They may support regulatory work or private companies by helping confirm that products and processes meet standards." },
    { title: "High School Science Teacher (Biology)", url: "https://careers.nsta.org/career/high-school-biology-teacher", medianSalary: "~$53,712", education: "Bachelor's + licensure/certification", schoolYears: "4–5", blurb: "High school biology teachers introduce students to life science topics like cells, genetics, evolution, and ecosystems in grades 9–12. They plan lessons, explain concepts, guide labs or activities, and evaluate learning through assignments, quizzes, and exams. Strong organization and communication are key because they also support student growth, questions, and progress throughout the year." },
    { title: "Content Writer (Science/Health)", url: "https://ca.indeed.com/career-advice/finding-a-job/science-writer", medianSalary: "~$51,994", education: "Bachelor's (often) / Portfolio", schoolYears: "2–4", blurb: "Science and health content writers research topics and explain complex ideas in a clear, engaging way for a wider audience. They may summarize research, interview experts, and turn technical information into articles, guides, or website content. This role can be freelance or in-house, and success depends on accuracy, clarity, and strong storytelling." },
  ],
  "Computer Science": [
    { title: "Network Administrator", url: "https://www.indeed.com/hire/job-description/network-administrator", medianSalary: "~$79,556", education: "Bachelor's", schoolYears: "4", blurb: "Manages an organization's networks and core IT systems so communication and access stay reliable. Troubleshoots issues, performs routine maintenance, and rolls out upgrades to reduce downtime and keep everything running smoothly. Often helps users (including new hires) learn system basics and access the tools and files they need." },
    { title: "Web Developer", url: "https://www.indeed.com/hire/job-description/web-developer", medianSalary: "~$79,615", education: "Bachelor's/Portfolio", schoolYears: "4", blurb: "Builds websites and web applications using tools like HTML, CSS, and JavaScript. Works with clients or teams to turn requirements into a clean, functional experience across devices. May review user behavior and feedback to improve usability, accessibility, and overall performance." },
    { title: "Systems Analyst", url: "https://www.bls.gov/ooh/computer-and-information-technology/computer-systems-analysts.htm", medianSalary: "~$83,226", education: "Bachelor's", schoolYears: "4", blurb: "Evaluates a company's IT systems to make sure they match business needs and goals. Identifies problems, recommends better tools or workflows, and helps plan improvements that increase efficiency. Can work within one organization or support multiple clients across different industries." },
    { title: "Programmer Analyst", url: "https://www.indeed.com/hire/job-description/programmer-analyst", medianSalary: "~$60,773", education: "Bachelor's", schoolYears: "4", blurb: "Designs and develops software solutions based on what a company needs day-to-day. Updates and repairs existing programs to improve features, fix bugs, and keep systems current. Often coordinates with project managers to stay on schedule, meet requirements, and manage resources responsibly." },
    { title: "Application Developer", url: "https://www.indeed.com/career-advice/finding-a-job/application-developer", medianSalary: "~$91,532", education: "Bachelor's", schoolYears: "4", blurb: "Creates applications for computers, mobile devices, and other platforms with a focus on usability and performance. Uses programming languages and system knowledge to build features that solve real user problems. Also maintains apps over time by releasing updates, testing changes, and improving stability." },
    { title: "Information Security Analyst", url: "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm", medianSalary: "~$90,077", education: "Bachelor's", schoolYears: "4", blurb: "Protects organizations by monitoring systems for threats and preventing cyberattacks before damage happens. Sets up and improves security measures, investigates suspicious activity, and responds quickly when incidents occur. Helps maintain security tools and policies so protection stays strong as risks evolve." },
  ],
  Education: [
    { title: "Adult Education Instructor", url: "https://careers.acteonline.org/career/adult-education-instructor/job-descriptions", medianSalary: "~$51,263", education: "Bachelor's (often) / Teaching credential (varies)", schoolYears: "4+", blurb: "Designs lessons and curriculum for adult learners based on their goals, skill levels, and schedules. Tracks progress through assessments, feedback, and structured practice so students can see measurable improvement. May teach job skills, life skills, ESL, or subject-based classes depending on the program." },
    { title: "Career Counselor", url: "https://jobs.marylandnonprofits.org/career/career-counselor/job-descriptions", medianSalary: "~$45,844", education: "Bachelor's (often Master's preferred)", schoolYears: "4–6", blurb: "Helps people—often students—clarify interests and turn them into realistic career plans. Teaches practical job-search skills like building resumes, writing applications, and preparing for interviews through coaching and mock practice. Also connects individuals to opportunities, resources, and next steps like training programs or internships." },
    { title: "Juvenile Correctional Officer", url: "https://careers.acteonline.org/career/juvenile-corrections-officer/job-descriptions", medianSalary: "~$46,765", education: "Bachelor's (often) / Training academy (varies)", schoolYears: "2–4+", blurb: "Maintains safety and structure for youth in detention settings while enforcing rules and procedures consistently. Builds rapport through supervision, de-escalation, and guidance that supports behavior improvement over time. Often coordinates with counselors, educators, and treatment providers to support rehabilitation and appropriate services." },
    { title: "Preschool Director", url: "https://www.bls.gov/ooh/management/preschool-and-childcare-center-directors.htm", medianSalary: "~$49,309", education: "Bachelor's (often) + early childhood admin requirements", schoolYears: "4+", blurb: "Oversees daily operations of a preschool, including staffing, schedules, budgeting, and program quality. Ensures the school meets licensing standards and follows legal and safety requirements. Communicates with families and stakeholders while guiding long-term planning like enrollment, marketing, and facility needs." },
    { title: "Corporate Trainer", url: "https://www.indeed.com/hire/job-description/corporate-trainer", medianSalary: "~$61,736", education: "Bachelor's", schoolYears: "4", blurb: "Creates and delivers training that helps employees learn tools, processes, and professional skills. Builds workshops, presentations, and online modules, then measures whether training actually improves performance. Often supports onboarding and works with leadership to identify new learning needs across teams." },
    { title: "Human Resources Specialist", url: "https://www.bls.gov/ooh/business-and-financial/human-resources-specialists.htm", medianSalary: "~$47,207", education: "Bachelor's", schoolYears: "4", blurb: "Supports hiring and onboarding by screening candidates, coordinating interviews, and helping new employees start smoothly. Maintains HR policies and records while assisting with everyday questions about procedures and workplace support. Also helps manage retention and performance processes through feedback cycles, evaluations, and employee development steps." },
  ],
  Engineering: [
    { title: "Biomedical Engineer", url: "https://bigfuture.collegeboard.org/careers/biomedical-engineer", medianSalary: "$97,406", education: "Bachelor's", schoolYears: "4", blurb: "Biomedical engineers use engineering principles along with biology and chemistry to develop and evaluate health-related systems and products. Their work includes contributing to medical devices, prosthetics, and healthcare technologies. These systems are designed to improve how medical care and biological processes function in practice." },
    { title: "Architectural and Engineering Manager", url: "https://bigfuture.collegeboard.org/careers/architectural-and-engineering-manager", medianSalary: "$152,190", education: "Bachelor's", schoolYears: "4", blurb: "Architectural and engineering managers plan and coordinate work across engineering and architectural projects. They direct activities related to design, development, and research efforts. Their role focuses on organizing teams and ensuring technical projects meet overall objectives." },
    { title: "Chemical Engineer", url: "https://bigfuture.collegeboard.org/careers/chemical-engineer", medianSalary: "$105,517", education: "Bachelor's", schoolYears: "4", blurb: "Chemical engineers design equipment and processes used to manufacture chemicals and industrial products. They apply chemistry, physics, and engineering principles to improve production methods. Their work supports the creation of materials such as fuels, plastics, and other manufactured goods." },
    { title: "Aerospace Engineering and Operations Technologist or Technician", url: "https://bigfuture.collegeboard.org/careers/aerospace-engineering-and-operations-technician", medianSalary: "$73,369", education: "Bachelor's", schoolYears: "4", blurb: "These technologists operate and maintain systems used to test and evaluate air and space vehicles. They work with simulators, computer systems, and measurement equipment to track performance. Their role may also involve recording and interpreting technical test data." },
    { title: "Civil Engineering Technologist or Technician", url: "https://bigfuture.collegeboard.org/careers/civil-engineering-technician", medianSalary: "$58,100", education: "Bachelor's", schoolYears: "4", blurb: "Civil engineering technologists apply civil engineering principles to support construction and infrastructure projects. They assist with planning, design, and maintenance tasks under the direction of engineering staff. Their work helps ensure structures and facilities meet required standards." },
    { title: "Electrical and Electronic Engineering Technologist or Technician", url: "https://bigfuture.collegeboard.org/careers/electrical-and-electronic-engineering-technician", medianSalary: "$63,211", education: "Bachelor's", schoolYears: "4", blurb: "These technologists apply electrical and electronic theory to build, repair, and modify electrical systems. They work with circuitry, controls, and machinery to support engineering design decisions. Their role often includes testing and adjusting components for proper operation." },
  ],
  "Environmental Science": [
    { title: "Environmental Specialist", url: "https://www.indeed.com/hire/job-description/environmental-specialist", medianSalary: "$56,316", education: "Bachelor's", schoolYears: "4", blurb: "Environmental specialists monitor how environmental conditions impact people and communities. They collect and analyze samples from food, water, soil, or air to identify environmental issues. Their work focuses on proposing and implementing solutions to reduce environmental risks." },
    { title: "Environmental Technician", url: "https://careers.ieca.org/career/environmental-technician/job-descriptions", medianSalary: "$50,630", education: "Bachelor's", schoolYears: "4", blurb: "Environmental technicians identify and assess environmental contamination in field and laboratory settings. They often work alongside environmental engineers to collect samples and monitor waste operations. Their role also includes helping maintain equipment used for environmental testing." },
    { title: "Environmental Science Teacher", url: "https://nccareers.org/occupation-profile/251053/1284", medianSalary: "$54,810", education: "Bachelor's", schoolYears: "4", blurb: "Environmental science teachers educate high school students about environmental systems and processes. They teach topics such as ecology, geology, chemistry, and biology. Their work helps students understand how human activity interacts with the natural world." },
    { title: "Marine Biologist", url: "https://careers.poultryscience.org/career/marine-biologist/job-descriptions", medianSalary: "$46,773", education: "Bachelor's", schoolYears: "4", blurb: "Marine biologists research life in oceans and other saltwater environments such as wetlands. They observe marine organisms, collect data, and conduct experiments. Their research contributes to understanding marine ecosystems and species behavior." },
    { title: "Environmental Chemist", url: "https://online-distance.ncsu.edu/career/environmental-field-chemist/", medianSalary: "$71,290", education: "Bachelor's", schoolYears: "4", blurb: "Environmental chemists collect and test soil, air, and water samples to evaluate environmental quality. They analyze how chemical conditions affect ecosystems and human health. Their findings help identify and prevent environmental threats." },
    { title: "Wildlife Biologist", url: "https://www.bls.gov/ooh/life-physical-and-social-science/zoologists-and-wildlife-biologists.htm", medianSalary: "$62,022", education: "Bachelor's", schoolYears: "4", blurb: "Wildlife biologists study animals within their natural habitats to understand behavior and environmental impact. They collect data to assess how habitats affect animal populations. Their work also includes classifying species and identifying new ones." },
  ],
  Mathematics: [
    { title: "Auditor", url: "https://www.indeed.com/hire/job-description/auditor", medianSalary: "$79,880", education: "Bachelor's", schoolYears: "4", blurb: "Auditors review and prepare financial records to ensure accuracy and compliance. They analyze how funds are managed and identify ways to reduce waste or fraud. Auditors then communicate their findings to stakeholders to improve financial practices." },
    { title: "Data or Research Analyst", url: "https://graduate.northeastern.edu/knowledge-hub/what-does-a-data-analyst-do/", medianSalary: "$74,680", education: "Bachelor's", schoolYears: "4", blurb: "Data analysts use mathematical and analytical methods to investigate complex business problems. They interpret large datasets using statistical tools to uncover patterns and inefficiencies. Their reports help leaders make informed, data-driven decisions." },
    { title: "Computer Programmer", url: "https://www.bls.gov/ooh/computer-and-information-technology/computer-programmers.htm", medianSalary: "$99,700", education: "Bachelor's", schoolYears: "4", blurb: "Computer programmers write and test code for software and applications. They update existing programs, fix errors, and improve functionality. Their work requires strong knowledge of programming languages and mathematical concepts." },
    { title: "Medical Scientist", url: "https://www.bls.gov/ooh/life-physical-and-social-science/medical-scientists.htm", medianSalary: "$100,890", education: "Bachelor's", schoolYears: "4", blurb: "Medical scientists design experiments and conduct research to test scientific hypotheses. They often use clinical trials and investigative methods to study diseases and treatments. Their work relies on a strong foundation in life sciences, physical sciences, and mathematics." },
    { title: "Financial Analyst", url: "https://www.bls.gov/ooh/business-and-financial/financial-analysts.htm", medianSalary: "$99,890", education: "Bachelor's", schoolYears: "4", blurb: "Financial analysts evaluate investment opportunities across banks, funds, and financial institutions. They study financial data and economic trends to assess risk and performance. Analysts meet with company leaders to better understand future prospects." },
    { title: "Statistician", url: "https://www.indeed.com/hire/job-description/statistician", medianSalary: "$104,860", education: "Bachelor's", schoolYears: "4", blurb: "Statisticians develop and apply mathematical techniques to solve real-world problems. They design surveys and experiments to collect data and analyze results. Their conclusions help guide decisions across business, engineering, and scientific fields." },
  ],
  Chemistry: [
    { title: "Chemical Technician", url: "https://www.bls.gov/ooh/life-physical-and-social-science/chemical-technicians.htm", medianSalary: "$49,326", education: "Bachelor's", schoolYears: "4", blurb: "Chemical technicians support research chemists by helping studies run smoothly in laboratory settings. They monitor equipment, prepare materials, and assist with specific research techniques. Their work ensures experiments are conducted efficiently and accurately." },
    { title: "Toxicologist", url: "https://www.indeed.com/career-advice/careers/what-does-a-toxicologist-do", medianSalary: "$20.76/hour", education: "Bachelor's", schoolYears: "4", blurb: "Toxicologists test blood and tissue samples to identify drugs, alcohol, poisons, or other substances. They analyze results to understand how chemicals affect the human body. Their findings are often used to answer questions related to criminal or medical cases." },
    { title: "Chemistry Teacher", url: "https://www.betterteam.com/chemistry-teacher-job-description", medianSalary: "$45,468", education: "Bachelor's", schoolYears: "4", blurb: "Chemistry teachers create and teach curriculum focused on chemical principles and reactions. They present material through lectures, labs, tests, and projects. Their role centers on helping students understand and apply chemistry concepts effectively." },
    { title: "Water Chemist", url: "https://careers.slas.org/career/water-chemist", medianSalary: "$71,290", education: "Bachelor's", schoolYears: "4", blurb: "Water chemists study and monitor chemical levels in water systems. They collect and analyze samples from different environments to ensure purification processes are safe. Their work helps inform regulations, policies, and environmental standards." },
    { title: "Analytical Chemist", url: "https://www.acs.org/careers/chemical-sciences/areas/analytical-chemistry.html", medianSalary: "$65,880", education: "Bachelor's", schoolYears: "4", blurb: "Analytical chemists examine substances to answer questions related to toxicology, pharmaceuticals, or forensics. They analyze samples to identify chemical composition and behavior. Many specialize in areas such as forensic science or drug development." },
    { title: "Synthetic Chemist", url: "https://www.ziprecruiter.com/career/Synthetic-Chemist/What-Is-How-to-Become", medianSalary: "$71,290", education: "Bachelor's", schoolYears: "4", blurb: "Synthetic chemists develop and test chemical compounds to create new materials. They work primarily in laboratory environments to design substances for specific purposes. Their work supports industries such as healthcare, manufacturing, and food production." },
  ],
  "English Literature Writing": [
    { title: "Copywriter", url: "https://www.indeed.com/hire/job-description/copywriter", medianSalary: "$72,716", education: "Bachelor's", schoolYears: "4", blurb: "Copywriters create short-form written content designed to promote products or services. Their work includes slogans, social media posts, and website copy tailored to specific audiences. They must balance brand voice, business goals, and customer needs to persuade effectively." },
    { title: "User Experience (UX) Writer", url: "https://www.indeed.com/hire/job-description/ux-writer", medianSalary: "$70,954", education: "Bachelor's", schoolYears: "4", blurb: "UX writers craft clear and concise text that helps users navigate websites and apps. They write microcopy such as buttons, menus, labels, and error messages. Their work focuses on improving usability by aligning language with design and user expectations." },
    { title: "Grant Writer", url: "https://www.indeed.com/hire/job-description/grant-writer", medianSalary: "$52,282", education: "Bachelor's", schoolYears: "4", blurb: "Grant writers research funding opportunities and write proposals for nonprofit organizations. Their work includes developing statements of need, project goals, budgets, and supporting documentation. Strong research and persuasive writing skills are essential to securing funding." },
    { title: "Technical Writer", url: "https://www.bls.gov/ooh/media-and-communication/technical-writers.htm", medianSalary: "$82,194", education: "Bachelor's", schoolYears: "4", blurb: "Technical writers create documents that explain complex information in a clear and usable way. They write manuals, how-to guides, and technical documentation for a variety of industries. Their role often involves collaborating with subject-matter experts to ensure accuracy." },
    { title: "Medical Writer", url: "https://www.indeed.com/career-advice/finding-a-job/how-to-become-medical-writer", medianSalary: "$127,817", education: "Bachelor's", schoolYears: "4", blurb: "Medical writers translate scientific and medical information for professional or general audiences. They write materials such as journal abstracts, patient resources, educational content, and reports. Their work helps make complex medical information accessible and understandable." },
    { title: "Editor", url: "https://www.indeed.com/hire/job-description/editor", medianSalary: "$68,950", education: "Bachelor's", schoolYears: "4", blurb: "Editors review written content to ensure clarity, accuracy, and quality. They work closely with writers to revise drafts and maintain consistency with organizational goals. Editors may also manage contributors and decide which content is ready for publication." },
  ],
  "Arts Performance": [
    { title: "Artist", url: "https://designcareers.asid.org/career/artist/job-descriptions", medianSalary: "$85,424", education: "Bachelor's", schoolYears: "4", blurb: "Artists create original works using a variety of creative mediums. Their work may include painting, drawing, weaving, glassblowing, or other artistic forms. Many artists sell their work independently or through galleries and commissions." },
    { title: "Production Artist", url: "https://artisantalent.com/job-descriptions/production-artist-job-description/", medianSalary: "$51,213", education: "Bachelor's", schoolYears: "4", blurb: "Production artists support design teams by producing polished print and visual materials. They help create packaging, displays, and marketing assets across different industries. Their role focuses on ensuring designs are accurate, consistent, and production-ready." },
    { title: "Photographer", url: "https://www.indeed.com/hire/job-description/photographer", medianSalary: "$47,073", education: "Bachelor's", schoolYears: "4", blurb: "Photographers capture images of people, events, and environments across various industries. They work in fields such as journalism, event production, and portrait photography. Their job requires strong composition skills and attention to visual detail." },
    { title: "Print Manager", url: "https://careers.essae.org/career/printing-manager/job-descriptions", medianSalary: "$66,290", education: "Bachelor's", schoolYears: "4", blurb: "Print managers oversee printing operations and supervise production teams. They ensure marketing materials, signage, and publications meet quality standards. Their responsibilities also include coordinating with clients and managing workflow timelines." },
    { title: "Art Teacher", url: "https://www.betterteam.com/art-teacher-job-description", medianSalary: "$61,090", education: "Bachelor's", schoolYears: "4", blurb: "Art teachers instruct students in various artistic techniques and creative mediums. They introduce students to different art movements and styles. Their goal is to encourage artistic expression and appreciation." },
    { title: "Theatre Manager", url: "https://getintotheatre.org/blog/what-does-a-theatre-manager-do/", medianSalary: "$58,212", education: "Bachelor's", schoolYears: "4", blurb: "Theatre managers oversee daily operations of performing arts venues. They coordinate staff, manage performances, and plan events for audiences. Their role focuses on delivering organized and engaging guest experiences." },
  ],
  "Law & Government": [
    { title: "Tax Law Specialist", url: "https://www.jobs.irs.gov/resources/tax-law-specialist", medianSalary: "$64,546", education: "Bachelor's", schoolYears: "4", blurb: "Tax law specialists focus on federal taxation issues by analyzing tax claims and reviewing technical tax documents. They research tax treaties, rulings, and laws to interpret how regulations apply in specific cases. Their work combines legal analysis with auditing and accounting tasks for government agencies." },
    { title: "Public Defender", url: "https://jobs.togethersc.org/career/public-defender", medianSalary: "$73,713", education: "Bachelor's", schoolYears: "4", blurb: "Public defenders represent individuals who cannot afford private legal counsel. They handle criminal cases by filing legal paperwork, negotiating with prosecutors, and advising clients. Their role ensures access to legal representation through government-funded services." },
    { title: "Policy Analyst", url: "https://claremontlincoln.edu/news-blog/policy-analyst-job-description-and-salary/", medianSalary: "$78,326", education: "Bachelor's", schoolYears: "4", blurb: "Policy analysts research social and political issues to develop effective public policies. They study the impact of existing policies, evaluate multiple viewpoints, and propose new approaches. Their findings are presented in reports that guide government decision-makers." },
    { title: "Regulatory Affairs Specialist", url: "https://graduate.northeastern.edu/knowledge-hub/what-does-a-regulatory-affairs-specialist-do/", medianSalary: "$96,755", education: "Bachelor's", schoolYears: "4", blurb: "Regulatory affairs specialists ensure organizations comply with government laws and standards. They assess compliance levels, advise leadership, and educate staff on regulatory requirements. Their work helps organizations meet legal obligations and maintain safety standards." },
    { title: "Judge Advocate General", url: "https://www.navy.com/careers-benefits/careers/legal/jag", medianSalary: "$63,784", education: "Bachelor's", schoolYears: "4", blurb: "Judge advocate generals serve as legal advisors within the U.S. Armed Forces. They practice law in areas determined by military needs and provide guidance to service members. Their duties may include participating in court-martial proceedings as legal counsel." },
    { title: "Assistant Prosecutor", url: "https://www.ncai.org/resources/job-listings/assistant-prosecutor", medianSalary: "$44,138", education: "Bachelor's", schoolYears: "4", blurb: "Assistant prosecutors represent the prosecutor's office in criminal cases. They investigate suspects, gather evidence, and file formal charges. Their work also includes issuing subpoenas and negotiating with defense attorneys." },
  ],
  Physics: [
    { title: "Aerospace Engineer", url: "https://www.bls.gov/ooh/architecture-and-engineering/aerospace-engineers.htm", medianSalary: "$116,500", education: "Bachelor's", schoolYears: "4", blurb: "Aerospace engineers design and analyze aircraft, spacecraft, rockets, and satellites using principles of physics and mathematics. They create and test prototypes, study structural performance, and evaluate how speed and air interact with flight systems. Their work also includes analyzing flight data and testing products to ensure safety and performance." },
    { title: "Computer Research Scientist", url: "https://www.bls.gov/ooh/computer-and-information-technology/computer-and-information-research-scientists.htm", medianSalary: "$122,840", education: "Master's", schoolYears: "6", blurb: "Computer research scientists develop new approaches to computing technology through research and experimentation. Their work includes data processing, software design, programming languages, and analyzing experimental results. They publish findings in scientific journals to advance computer and physics-related research." },
    { title: "Physicist", url: "https://www.bls.gov/ooh/life-physical-and-social-science/physicists-and-astronomers.htm", medianSalary: "$122,850", education: "Doctorate", schoolYears: "8–10", blurb: "Physicists conduct advanced research to understand the fundamental laws governing energy and matter. They analyze technical reports, develop scientific theories, and create mathematical models. Their responsibilities include experimentation, quality control, and interpreting complex physical interactions." },
    { title: "Astronomer", url: "https://www.bls.gov/ooh/life-physical-and-social-science/physicists-and-astronomers.htm", medianSalary: "$114,590", education: "Doctorate", schoolYears: "8–10", blurb: "Astronomers study stars, planets, galaxies, and cosmic systems using physics-based models. They conduct research, formulate hypotheses, and analyze astronomical data to predict cosmic events. Their work focuses on understanding how celestial bodies interact within the universe." },
    { title: "Nuclear Engineer", url: "https://www.bls.gov/ooh/architecture-and-engineering/nuclear-engineers.htm", medianSalary: "$113,460", education: "Bachelor's", schoolYears: "4", blurb: "Nuclear engineers design and develop nuclear equipment such as reactor cores and radiation shielding. They oversee maintenance and safety operations in nuclear facilities. Their role applies physics principles to ensure efficient and secure nuclear power systems." },
    { title: "Biophysicist", url: "https://www.careerexplorer.com/careers/biophysicist/", medianSalary: "$94,490", education: "Doctorate", schoolYears: "8–10", blurb: "Biophysicists combine physics and biology to study how physical forces affect biological systems. They design and conduct complex research experiments involving substances like drugs or hormones. Their work helps explain biological processes through quantitative and physical analysis." },
  ],
  "Political Science": [
    { title: "Historian", url: "https://bigfuture.collegeboard.org/careers/historian", medianSalary: "$59,513", education: "Bachelor's", schoolYears: "4", blurb: "Historians research and interpret the past using a wide range of historical sources. They analyze documents such as government records, newspapers, photographs, interviews, and personal writings. Their work helps preserve historical knowledge and explain how past events shape the present." },
    { title: "Legislator", url: "https://bigfuture.collegeboard.org/careers/legislator", medianSalary: "$37,166", education: "Bachelor's", schoolYears: "4", blurb: "Legislators create, introduce, and pass laws at the local, state, tribal, or federal level. They represent constituents by proposing legislation and voting on public policy matters. Their work directly influences how governments operate and serve the public." },
    { title: "Social Science Research Assistant", url: "https://bigfuture.collegeboard.org/careers/social-science-research-assistant", medianSalary: "$49,700", education: "Bachelor's", schoolYears: "4", blurb: "Social science research assistants support researchers conducting social science studies. They help with surveys, data collection, laboratory analysis, and data management. Their work may also include preparing findings for publication." },
    { title: "Political Science Teacher", url: "https://bigfuture.collegeboard.org/careers/political-science-teacher-postsecondary", medianSalary: "$61,625", education: "Bachelor's", schoolYears: "4", blurb: "Secondary school teachers educate students at the middle or high school level. They teach one or more academic subjects and develop lesson plans and assessments. Their role focuses on building foundational knowledge and critical thinking skills." },
    { title: "Political Scientist", url: "https://bigfuture.collegeboard.org/careers/political-scientist", medianSalary: "$121,091", education: "Bachelor's", schoolYears: "4", blurb: "Political scientists study political systems, institutions, and behavior. They analyze topics such as public opinion, elections, political ideology, and government structures. Their research helps explain how political systems function and evolve." },
    { title: "Postsecondary History Teacher", url: "https://bigfuture.collegeboard.org/careers/history-teacher-postsecondary", medianSalary: "$79,062", education: "Bachelor's", schoolYears: "4", blurb: "Postsecondary teachers instruct college-level courses in history or political science. They teach, conduct research, or combine both responsibilities. Their work contributes to higher education and academic scholarship." },
  ],
  Business: [
    { title: "Human Resources Specialist", url: "https://www.bls.gov/ooh/business-and-financial/human-resources-specialists.htm", medianSalary: "$47,207", education: "Bachelor's", schoolYears: "4", blurb: "Human resources specialists manage core employee functions such as recruiting, interviewing, and onboarding staff. They assist employees with benefits, resolve workplace issues, and support communication between employees and management. Their role also requires ensuring company practices follow internal policies and government labor regulations." },
    { title: "Accountant", url: "https://www.indeed.com/hire/job-description/accountant", medianSalary: "$59,606", education: "Bachelor's", schoolYears: "4", blurb: "Accountants oversee financial records to ensure accuracy and compliance. They analyze financial data, prepare budget reports, and support executives with business planning. Their responsibilities often include managing accounts payable and receivable across organizations." },
    { title: "Investment Banker", url: "https://www.cfainstitute.org/programs/cfa-program/careers/investment-banker", medianSalary: "$78,664", education: "Bachelor's", schoolYears: "4", blurb: "Investment bankers help clients manage finances by raising capital and evaluating spending strategies. They analyze market trends to guide investment decisions and manage bonds or stock transactions. Their work supports individuals and companies in making informed financial moves." },
    { title: "Loan Officer", url: "https://www.bls.gov/ooh/business-and-financial/loan-officers.htm", medianSalary: "$63,380", education: "Bachelor's", schoolYears: "4", blurb: "Loan officers evaluate loan applications to determine financial eligibility. They review financial documents and guide applicants through borrowing rules and requirements. Their role often focuses on specific lending areas such as residential or commercial loans." },
    { title: "Research Analyst", url: "https://www.indeed.com/hire/job-description/research-analyst", medianSalary: "$66,256", education: "Bachelor's", schoolYears: "4", blurb: "Research analysts use data and market research to study business trends. They prepare reports that help organizations improve profitability and strategy. Their work often supports marketing teams and decision-makers across industries." },
    { title: "Business Development Manager", url: "https://www.indeed.com/career-advice/careers/what-does-a-business-development-manager-do", medianSalary: "$75,645", education: "Bachelor's", schoolYears: "4", blurb: "Business development managers identify growth opportunities by analyzing markets and finding new leads. They collaborate with internal teams and clients to strengthen relationships and satisfaction. Their work helps guide long-term financial growth and company success." },
  ],
  Psychology: [
    { title: "Neuropsychologist", url: "https://my.clevelandclinic.org/health/articles/24691-neuropsychologist", medianSalary: "$122,928", education: "PhD/PsyD", schoolYears: "8–10", blurb: "Neuropsychologists study how the physical brain affects behavior and cognition. They assess conditions impacting memory, language, attention, and problem-solving through detailed evaluations. Their work helps guide treatment and rehabilitation plans for brain injuries and neurological diseases." },
    { title: "Health Psychologist", url: "https://www.apa.org/education-career/guide/subfields/health/education-training", medianSalary: "$120,811", education: "PhD/PsyD", schoolYears: "8–10", blurb: "Health psychologists examine how behavior and psychology influence physical health and illness. They research how people cope with medical conditions and how healthcare systems can improve outcomes. Their work often integrates psychological care into medical and public health settings." },
    { title: "Industrial-Organizational Psychologist", url: "https://www.allpsychologyschools.com/organizational-psychology/job-description/", medianSalary: "$120,524", education: "Master's/PhD", schoolYears: "6–10", blurb: "Industrial-organizational psychologists apply psychology to improve workplace performance and employee well-being. They study productivity, leadership styles, and organizational structure. Their work includes training programs, employee assessments, and organizational change initiatives." },
    { title: "Clinical Psychologist", url: "https://www.allpsychologyschools.com/clinical-psychology/job-description/", medianSalary: "$109,894", education: "PhD", schoolYears: "8–10", blurb: "Clinical psychologists diagnose and treat a wide range of mental health conditions. They use therapy, assessments, and psychological testing to support patients. Their role may also include research, treatment planning, and patient education." },
    { title: "General / Experimental Psychologist", url: "https://www.allpsychologyschools.com/careers/research-psychologist/", medianSalary: "$92,813", education: "PhD", schoolYears: "8–10", blurb: "General or experimental psychologists conduct research to understand behavior and mental processes. They study topics such as learning, motivation, perception, and emotion. Their findings contribute to advancements in education, technology, and healthcare." },
    { title: "Engineering Psychologist", url: "https://www.verywellmind.com/engineering-psychologist-2795650", medianSalary: "$92,813", education: "Master's/PhD", schoolYears: "6–10", blurb: "Engineering psychologists design systems that improve how humans interact with technology. They apply psychology to enhance usability, safety, and efficiency in products and devices. Their work often involves user research and testing to reduce errors and improve user experience." },
  ],
  "STEM/Enrichment": [
    { title: "Nurse Practitioner", url: "https://college.mayo.edu/academics/explore-health-care-careers/careers-a-z/nurse-practitioner/", medianSalary: "$129,210", education: "Master's", schoolYears: "6", blurb: "Nurse practitioners provide advanced medical care by diagnosing conditions and managing patient treatment plans. They often work independently or alongside physicians in a variety of healthcare settings. Their role combines clinical expertise with patient-centered care to improve health outcomes." },
    { title: "IT Manager", url: "https://www.indeed.com/hire/job-description/it-manager", medianSalary: "$171,200", education: "Bachelor's", schoolYears: "4", blurb: "IT managers oversee an organization's technology systems and infrastructure. They coordinate teams, manage budgets, and ensure technology supports business goals. Their work focuses on system reliability, security, and long-term technology planning." },
    { title: "Information Security Analyst", url: "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm", medianSalary: "$124,910", education: "Bachelor's", schoolYears: "4", blurb: "Information security analysts protect organizations from cyber threats and data breaches. They monitor systems, identify vulnerabilities, and implement security measures. Their role is critical to maintaining the safety and integrity of digital information." },
    { title: "Physician Assistant", url: "https://www.bls.gov/ooh/healthcare/physician-assistants.htm", medianSalary: "$133,260", education: "Master's", schoolYears: "6", blurb: "Physician assistants practice medicine under physician supervision by examining patients and developing treatment plans. They diagnose illnesses, prescribe medications, and assist in medical procedures. Their work expands access to high-quality healthcare services." },
    { title: "Software Developer", url: "https://www.indeed.com/hire/job-description/software-developer", medianSalary: "$133,080", education: "Bachelor's", schoolYears: "4", blurb: "Software developers design and build computer applications and systems. They write, test, and maintain code to meet user and business needs. Their work powers websites, mobile apps, and enterprise software solutions." },
    { title: "Data Scientist", url: "https://www.bls.gov/ooh/math/data-scientists.htm", medianSalary: "$112,590", education: "Bachelor's", schoolYears: "4", blurb: "Data scientists analyze large datasets to uncover patterns and insights. They use statistical methods and programming tools to support decision-making. Their findings help organizations improve products, services, and strategy." },
  ],
  "Public Service": [
    { title: "Teacher", url: "https://www.indeed.com/hire/job-description/teacher", medianSalary: "$45,468", education: "Bachelor's", schoolYears: "4", blurb: "Teachers provide instruction to students in a classroom setting across specific subjects or age groups. They plan lessons, teach material, and assess student learning throughout the school year. Many work in public school systems to deliver accessible education to local communities." },
    { title: "Crossing Guard", url: "https://nccareers.org/occupation-profile/339091/1284", medianSalary: "$33,980", education: "Bachelor's", schoolYears: "4", blurb: "Crossing guards help pedestrians safely cross streets by managing traffic flow. They often work in busy areas or near schools where children are present. Their role focuses on preventing accidents and ensuring safe travel for the public." },
    { title: "Developmental Disabilities Specialist", url: "https://careers.naswwa.socialworkers.org/career/disability-specialist-2/job-descriptions", medianSalary: "$52,440", education: "Bachelor's", schoolYears: "4", blurb: "Developmental disabilities specialists support adults in building social, vocational, and daily living skills. They work with individuals or small groups to increase independence and quality of life. Their work may also involve helping design or lead community-based support programs." },
    { title: "Substance Abuse Counselor", url: "https://www.bls.gov/ooh/community-and-social-service/substance-abuse-behavioral-disorder-and-mental-health-counselors.htm", medianSalary: "$53,650", education: "Bachelor's", schoolYears: "4", blurb: "Substance abuse counselors help individuals manage and recover from addiction. They provide guidance and support in medical facilities or specialized treatment centers. Their work contributes to healthier individuals and reduced substance abuse in communities." },
    { title: "Firefighter", url: "https://www.indeed.com/hire/job-description/firefighter", medianSalary: "$46,220", education: "Bachelor's", schoolYears: "4", blurb: "Firefighters respond to emergencies such as fires, accidents, and rescues. They use specialized equipment to protect lives and property during critical situations. When not on calls, they remain on duty at fire stations and perform maintenance tasks." },
    { title: "Guidance Counselor", url: "https://www.indeed.com/hire/job-description/guidance-counselor", medianSalary: "$53,089", education: "Bachelor's", schoolYears: "4", blurb: "Guidance counselors support students with academic planning and personal development. They assist with college applications, school selection, and recommendation materials. Their role also includes helping students manage behavioral or academic challenges." },
  ],
  "Sports & Entertainment": [
    { title: "Athletic Director", url: "https://www.indeed.com/hire/job-description/athletic-director", medianSalary: "$65,271", education: "Bachelor's", schoolYears: "4", blurb: "Athletic directors lead the athletics department at a high school, college, or university and oversee day-to-day operations. A major part of the role is managing public relations while supervising staff, coordinating travel, and keeping programs organized. They also handle budgets and may manage equipment purchasing and other logistical needs depending on the size of the school." },
    { title: "Athletic Scout", url: "https://www.bls.gov/ooh/entertainment-and-sports/coaches-and-scouts.htm", medianSalary: "$50,874", education: "Bachelor's", schoolYears: "4", blurb: "Athletic scouts evaluate athletes to judge current skill level and long-term potential for teams they represent. They attend games, review footage, and track news to stay updated on player performance and development. Scouts also speak with coaches and others to gather context about athletes and their future prospects." },
    { title: "Athletic Trainer", url: "https://college.mayo.edu/academics/explore-health-care-careers/careers-a-z/athletic-trainer/", medianSalary: "$49,966", education: "Bachelor's", schoolYears: "4", blurb: "Athletic trainers work under physician supervision to prevent, recognize, and treat sports-related injuries and medical conditions. They help reduce injury risk by advising athletes on training, strength and balance work, proper equipment use, and nutrition. When injuries happen, they provide immediate care, develop treatment plans, and often manage records while attending practices and games, including nights and weekends." },
    { title: "Athletics Coach", url: "https://www.indeed.com/hire/job-description/coach", medianSalary: "$48,041", education: "Bachelor's", schoolYears: "4", blurb: "Athletics coaches train athletes and teams to build skills, confidence, and performance in their sport. They create practice plans, motivate players, and develop strategies by analyzing opponents and adjusting tactics. Coaches also track athletes' physical and mental well-being and provide support to help the team compete at its best." },
    { title: "Contract Negotiator", url: "https://www.indeed.com/career-advice/finding-a-job/how-to-become-contract-negotiator", medianSalary: "$93,419", education: "Bachelor's", schoolYears: "4", blurb: "Contract negotiators negotiate deals with teams for athlete clients with the goal of securing the strongest possible terms. They may also manage endorsements and marketing opportunities while maintaining relationships with clients and recruiting new athletes. The role involves signing and managing contracts, following rules and regulations, and applying business ethics throughout negotiations." },
    { title: "Event Coordinator", url: "https://www.indeed.com/hire/job-description/event-coordinator", medianSalary: "$47,418", education: "Bachelor's", schoolYears: "4", blurb: "Event coordinators plan and coordinate the moving parts of sports events to keep everything running smoothly. They collaborate with teams like security, ticketing, and concessions to handle logistics before and during the event. If the event is televised, they also help ensure the experience is positive for viewers watching from home." },
  ],
};

const DEFAULT_CAREERS = Array.from({ length: 6 }).map(() => ({
  title: "Career Pathway Example",
  url: "",
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

export default function Discover() {
  const quizTopRef = useRef(null);
  const isLoaded = useImagePreload([discoverHero]);

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
    <div style={styles.page}>
      <section
        style={{
          ...hero.fullBleed,
          backgroundImage: isLoaded(discoverHero)
            ? `linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url(${discoverHero})`
            : "none",
          backgroundColor: "#1a2e42",
          opacity: isLoaded(discoverHero) ? 1 : 0,
          transition: "opacity 0.5s ease",
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
                A quick interest test can bring clarity by matching what you enjoy with possible career directions, resources, and opportunities to explore next.
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
                const href = c?.url || careerLearnMoreHref(c.title);
                return (
                  <motion.div
                    key={`${c.title}-${slug}`}
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
                        <a href={href} target="_blank" rel="noreferrer" style={styles.learnMoreLink} aria-label={`Learn more about ${c.title}`}>
                          Learn more →
                        </a>
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
                  <div key={t} style={styles.placeholderPill}>{t}</div>
                ))}
              </div>

              <div style={styles.oppsHeader}>
                <div style={styles.oppsTitle}>Resources matched to {resultInterest}</div>
                <div style={styles.oppsCount}>{filteredResources.length} results</div>
              </div>

              {filteredResources.length === 0 ? (
                <div style={styles.emptyState}>
                  No resources found for this interest yet. Add more resources tagged <b>{resultInterest}</b> and they'll appear here automatically.
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
    </div>
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
  cardTitle: { margin: 0, color: COLORS.text, fontSize: "clamp(1.35rem, 2.5vw, 1.7rem)", fontFamily: '"Merriweather", serif' },
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
  groupTitle: { fontWeight: 900, color: COLORS.text, marginBottom: "10px", lineHeight: 1.35, fontSize: "clamp(0.9rem, 1.6vw, 1rem)" },
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
  radioLabel: { fontWeight: 700, lineHeight: 1.35, color: COLORS.textSoft, fontSize: "clamp(0.88rem, 1.5vw, 1rem)" },
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
    fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
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
    fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
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
    fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
  },
  resultTitle: {
    fontFamily: '"Merriweather", serif',
    color: COLORS.carolinaBlue,
    fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    marginTop: 4,
  },
  resultSub: { maxWidth: 720, color: "#374151", fontWeight: 700, lineHeight: 1.6, fontSize: "clamp(0.9rem, 1.6vw, 1rem)" },
  resultActions: { marginTop: 8 },
  sectionHeader: { marginTop: 6 },
  sectionTitle: { margin: 0, fontSize: "clamp(1.25rem, 2.2vw, 1.55rem)", fontFamily: '"Merriweather", serif', color: COLORS.text },
  sectionLine: { width: "100%", height: 1, backgroundColor: "rgba(0,0,0,0.10)", marginTop: 10 },
  sectionSub: { marginTop: 10, marginBottom: 0, color: "#374151", fontWeight: 650, fontSize: "clamp(0.88rem, 1.5vw, 1rem)" },
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
  careerBody: { padding: "14px 14px 16px", display: "grid", gap: 10, height: "100%" },
  careerTitle: { fontWeight: 950, fontSize: "clamp(0.95rem, 1.6vw, 1.06rem)", color: COLORS.text, marginBottom: 2 },
  careerBlurb: { color: COLORS.textSoft, fontWeight: 650, lineHeight: 1.45, fontSize: "clamp(0.88rem, 1.4vw, 0.95rem)" },
  careerMeta: { display: "grid", gap: 8, marginTop: 2 },
  metaRow: { display: "flex", justifyContent: "space-between", gap: 12 },
  metaKey: { color: "#374151", fontWeight: 800, fontSize: "clamp(0.82rem, 1.3vw, 0.92rem)" },
  metaVal: { color: COLORS.text, fontWeight: 900, textAlign: "right", fontSize: "clamp(0.82rem, 1.3vw, 0.92rem)" },
  learnMoreRow: { marginTop: "auto", display: "flex", justifyContent: "flex-end", alignItems: "flex-end", paddingTop: 6 },
  learnMoreLink: {
    textDecoration: "none",
    fontWeight: 950,
    color: COLORS.carolinaBlue,
    padding: "8px 10px",
    borderRadius: "12px",
    border: "1px solid rgba(75,156,211,0.25)",
    backgroundColor: "rgba(75,156,211,0.08)",
    fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)",
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
    fontSize: "clamp(0.82rem, 1.3vw, 0.92rem)",
  },
  oppsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
    marginTop: 18,
  },
  oppsTitle: { fontFamily: '"Merriweather", serif', fontWeight: 900, fontSize: "clamp(1.05rem, 2vw, 1.25rem)", color: COLORS.text },
  oppsCount: {
    padding: "7px 10px",
    borderRadius: "999px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.cardFill,
    fontWeight: 900,
    color: COLORS.text,
    whiteSpace: "nowrap",
    fontSize: "clamp(0.82rem, 1.3vw, 0.92rem)",
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
  resourceTitle: { fontWeight: 950, fontSize: "clamp(0.92rem, 1.5vw, 1.02rem)", lineHeight: 1.2 },
  resourceBadge: {
    padding: "6px 10px",
    borderRadius: "999px",
    backgroundColor: "rgba(75,156,211,0.12)",
    border: "1px solid rgba(75,156,211,0.30)",
    fontWeight: 900,
    color: COLORS.text,
    whiteSpace: "nowrap",
    fontSize: "clamp(0.78rem, 1.2vw, 0.85rem)",
  },
  resourceLine: { width: "100%", height: 1, backgroundColor: "rgba(0,0,0,0.10)", margin: "10px 0" },
  resourceDesc: { color: COLORS.textSoft, fontWeight: 650, lineHeight: 1.45, fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)" },
  resourceMetaRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 },
  metaPill: {
    padding: "6px 10px",
    borderRadius: "999px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: "rgba(255,255,255,0.55)",
    fontWeight: 900,
    color: COLORS.text,
    fontSize: "clamp(0.78rem, 1.2vw, 0.85rem)",
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
    padding: "clamp(40px, 6vw, 56px) 0",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
    fontSize: "clamp(0.78rem, 1.2vw, 0.85rem)",
    border: "1px solid rgba(255,255,255,0.25)",
    backdropFilter: "blur(6px)",
  },
  title: {
    margin: 0,
    fontSize: "clamp(2rem, 4.2vw, 3.45rem)",
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
    fontSize: "clamp(0.92rem, 1.5vw, 1.02rem)",
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
    fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
  },
  statsRow: { display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" },
  stat: {
    backgroundColor: "rgba(245,252,239,0.92)",
    color: COLORS.text,
    borderRadius: "16px",
    padding: "10px 12px",
    border: "1px solid rgba(255,255,255,0.25)",
    minWidth: "120px",
    backdropFilter: "blur(6px)",
  },
  statNum: { fontWeight: 950, fontSize: "clamp(1.1rem, 2vw, 1.35rem)", lineHeight: 1.1 },
  statLabel: { marginTop: "2px", color: "#4B5563", fontWeight: 850, fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)" },
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
  heroCardTitle: { fontFamily: '"Merriweather", serif', fontWeight: 900, color: COLORS.text, fontSize: "clamp(1rem, 1.8vw, 1.15rem)" },
  heroCardLine: { width: "100%", height: 1, backgroundColor: "rgba(0,0,0,0.10)", marginTop: 10 },
  heroCardBody: { padding: "14px 16px", display: "grid", gap: 10 },
  step: { display: "flex", gap: 10, alignItems: "flex-start" },
  stepDot: { width: 10, height: 10, borderRadius: 999, backgroundColor: COLORS.carolinaBlue, marginTop: 6, flexShrink: 0 },
  stepText: { color: COLORS.textSoft, fontWeight: 800, lineHeight: 1.4, fontSize: "clamp(0.88rem, 1.4vw, 1rem)" },
  heroCardFooter: { padding: "0 16px 16px", display: "flex", gap: 10, flexWrap: "wrap" },
  footerPill: {
    padding: "7px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(0,0,0,0.10)",
    backgroundColor: "rgba(255,255,255,0.55)",
    fontWeight: 900,
    color: COLORS.text,
    fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
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