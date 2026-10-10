import { projects } from "./projects";
import { experiences } from "./experiences";

export const constellations = [
  {
    id: "milky-way", kind: "sky-feature", name: "MILKY WAY", subtitle: "The larger system around every point",
    direction: [0.16, 0.2, -1],
    selectRadius: 0.18,
    lockRadius: 0.12,
    detectRadius: 0.2,
    paintedHitPath: [[300, 490], [620, 410], [920, 315], [1190, 190], [1430, 55]],
    description: "The wide view: a Waterloo CS + Business student moving between AI agents, security, healthcare tooling, financial infrastructure, and products built from scratch.",
    note: "Each constellation holds one part of the story. This one keeps the current coordinates and the places to find the work outside the observatory.",
    entries: [
      { type: "thought", label: "RIGHT NOW", title: "Security agents at Microsoft", text: "I’m building the customer-facing agent integration that turns impersonation, malicious-URL, and weaponizable-file signals into one natural-language investigation workflow for Teams administrators." },
      { type: "social", title: "GitHub", url: "https://github.com/MatthewLi-UW", icon: "github" },
      { type: "social", title: "LinkedIn", url: "https://www.linkedin.com/in/matthew-li-mfl/", icon: "linkedin" },
    ],
  },
  {
    id: "origin", name: "ORIGIN", subtitle: "The coordinates I began with", direction: [-0.44, 0.17, -1],
    paintedStars: [[193, 104, 25], [353, 40, 18], [456, 145, 13], [319, 207, 11], [468, 331, 22]],
    stars: [[-0.46, -0.08], [-0.18, 0.18], [0.08, 0.06], [0.30, 0.28], [0.48, -0.05]], connections: [[0, 1], [1, 2], [2, 3], [2, 4]],
    description: "I’m Matthew, a University of Waterloo Computer Science and Business Administration double-degree student specializing in artificial intelligence.",
    note: "I graduate in August 2027 with a 3.7/4.0 GPA. I started coding in first year and have been making up for lost time ever since.",
    entries: [
      { type: "thought", label: "EDUCATION", title: "Two degrees, one path", text: "Bachelor of Computer Science and Bachelor of Business Administration at Waterloo, with an Artificial Intelligence specialization." },
      { type: "thought", label: "COURSEWORK", title: "Systems + intelligence", text: "Algorithms, operating systems, machine learning, artificial intelligence, optimization, application development, data structures, and computer design." },
      { type: "thought", label: "STARTING POINT", title: "I began in first year", text: "I did not arrive at Waterloo already knowing how to code. Consistency, internships, and building in public became the way I caught up." },
    ],
  },
  {
    id: "build", name: "BUILD", subtitle: "Ideas that made it into the world", direction: [-0.12, 0.29, -1],
    paintedStars: [[45, 211, 12], [185, 273, 21], [376, 259, 14], [468, 331, 22], [324, 460, 17], [165, 378, 10]],
    stars: [[-0.5, 0.02], [-0.24, 0.22], [0.02, 0.1], [0.24, 0.34], [0.48, 0.02], [0.18, -0.2]], connections: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 4]],
    description: "Products and systems are how I think out loud. These are a few that survived contact with reality.",
    entries: [{ type: "project", id: "slicefund" }, { type: "project", id: "precognition" }, { type: "project", id: "krammy" }],
  },
  {
    id: "work", name: "WORK", subtitle: "Lessons from production systems", direction: [0.27, 0.19, -1],
    paintedStars: [[420, 82, 8], [536, 40, 23], [606, 100, 8], [640, 165, 14], [456, 145, 13], [700, 80, 8]],
    stars: [[-0.44, 0.26], [-0.14, 0.08], [0.1, 0.28], [0.32, -0.02], [0.5, 0.22], [0.04, -0.24]], connections: [[0, 1], [1, 2], [2, 4], [2, 3], [1, 5], [5, 3]],
    description: "The useful story in a role is rarely the title. It is the judgement earned by shipping into constraints.",
    entries: [{ type: "experience", id: "microsoft" }, { type: "experience", id: "bitgo" }, { type: "experience", id: "verily" }, { type: "experience", id: "veridocx" }, { type: "experience", id: "ontario" }, { type: "experience", id: "questrade" }, { type: "experience", id: "osfi" }],
  },
  {
    id: "experiment", name: "EXPERIMENT", subtitle: "Fast loops and strange prototypes", direction: [-0.35, 0.09, -1],
    paintedStars: [[740, 45, 8], [777, 100, 10], [842, 102, 7], [910, 218, 16], [982, 53, 22]],
    stars: [[-0.5, 0.14], [-0.22, -0.06], [0.0, 0.2], [0.2, -0.16], [0.46, 0.1]], connections: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 4]],
    description: "Smaller builds where I learned by shipping: emotion-aware voice tooling, reinforcement learning, visual education, and collaborative travel planning.",
    entries: [{ type: "project", id: "justff" }, { type: "project", id: "snake-agent" }, { type: "project", id: "braintrainr" }, { type: "project", id: "valise" }],
  },
  {
    id: "curiosity", name: "CURIOSITY", subtitle: "Questions with unfinished answers", direction: [0.10, 0.07, -1],
    paintedStars: [[1010, 60, 7], [1038, 64, 9], [1078, 181, 11], [1120, 88, 8], [1193, 139, 21], [1150, 150, 7]],
    stars: [[-0.46, -0.18], [-0.28, 0.16], [0.0, 0.02], [0.2, 0.28], [0.46, 0.08], [0.28, -0.22]], connections: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 4]],
    description: "The questions I keep returning to are the same ones showing up in my work: trustworthy agents, useful developer tools, and better signals in noisy systems.",
    entries: [
      { type: "thought", label: "SECURITY", title: "When should an agent be deterministic?", text: "At Microsoft, I ground generated threat insights in deterministic analysis of securely isolated customer data. The useful question is not whether a system uses AI, but where uncertainty is acceptable." },
      { type: "thought", label: "HEALTHCARE", title: "Can developer tools remove expert busywork?", text: "At Verily, a self-correcting CQL pipeline turned plain-English FHIR requests into validated code with 90% first-pass success and cut a multi-hour workflow to under 30 seconds." },
      { type: "thought", label: "MARKETS", title: "What makes a signal trustworthy?", text: "Slicefund searches for cross-market inefficiencies; Precognition weights forecasts by trader calibration. Both projects ask how better evidence can survive noisy incentives." },
    ],
  },
  {
    id: "life", name: "LIFE", subtitle: "The world beyond the screen", direction: [0.46, 0.11, -1],
    paintedStars: [[935, 455, 8], [999, 536, 20], [1075, 351, 10], [1147, 356, 9], [1156, 450, 8], [1275, 424, 18]],
    stars: [[-0.46, 0.08], [-0.18, 0.3], [0.02, 0.02], [0.28, 0.2], [0.48, -0.12], [0.02, -0.28]], connections: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5]],
    description: "A few true things that do not fit neatly into a résumé: concerts, hackathons, teaching, and typing much faster than is reasonable.",
    entries: [
      { type: "thought", label: "ONE WEEKEND", title: "TWICE on Friday, Hack Canada on Sunday", text: "I lost my voice at the concert, then nearly lost it again helping Slicefund win at Hack Canada among 800+ hackers from 139 schools and 26 countries." },
      { type: "thought", label: "COMMUNITY", title: "Judging JAMHacks 10", text: "I helped judge projects from 200+ high-school hackers and left impressed by how confidently they were already shipping, pitching, and teaching through software." },
      { type: "thought", label: "TINY FLEX · TYPING SPEED", title: "180 words per minute", text: "It is not a particularly important skill, but it does make long build nights a little more efficient." },
    ],
  },
  {
    id: "gemini", name: "GEMINI", subtitle: "Two disciplines, one point of view", direction: [0.58, 0.28, -1],
    paintedStars: [[1224, 221, 22], [1462, 197, 20], [1308, 274, 18], [1510, 286, 9], [1275, 424, 18], [1424, 364, 18], [1382, 528, 11], [1574, 367, 10]],
    connections: [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7], [0, 1], [2, 3], [4, 5]],
    description: "Gemini maps the two tracks I study at Waterloo: computer science and business administration, joined by an artificial intelligence specialization.",
    note: "The pairing shows up in the work: architecture and implementation on one side; users, risk, incentives, and product judgement on the other.",
    entries: [
      { type: "thought", label: "TECHNICAL", title: "From CQL compilers to Bitcoin signing", text: "My internships have moved across healthcare, security, and financial infrastructure, but the work stays close to architecture, data, reliability, and implementation." },
      { type: "thought", label: "PRODUCT", title: "From prototype to useful workflow", text: "Krammy reached 50+ learners in its first week; the Verily IDE served eight engineers; the best technical result is still the one that changes what someone can do." },
      { type: "thought", label: "HACKATHONS", title: "Four wins and counting", text: "Recent projects include Slicefund at Hack Canada and Precognition, which placed second overall and won Best Use of Backboard.io at CxC 2026." },
    ],
  },
];

const records = Object.fromEntries(constellations.map((item) => [item.id, item]));

// Keep the painted layout while giving each destination one complete section.
export const skyDestinations = [
  {
    ...records.build, name: "Me", subtitle: undefined,
    paintedStars: [...records.build.paintedStars, [458, 158, 13], records.work.paintedStars[1]],
    connections: [[2, 3], [3, 4], [4, 5], [5, 2], [2, 6], [6, 7]],
    lineExtensions: [{ from: 7, to: [558, -30] }],
    description: "5th year Waterloo Computer Science + Business Administration",
    note: "Always sidequesting",
    entries: [
      ...records.origin.entries.filter(({ label }) => !["EDUCATION", "COURSEWORK", "STARTING POINT"].includes(label)),
      ...records["milky-way"].entries.filter((entry) => entry.type === "social"),
      { type: "social", title: "mf5li@uwaterloo.ca", url: "mailto:mf5li@uwaterloo.ca", icon: "email" },
    ],
    hideRecordMeta: true,
    marker: [330, 310], number: "01",
  },
  {
    ...records["milky-way"], name: "Experience", subtitle: "The teams and systems I’ve worked on",
    description: "My jobs across security, financial infrastructure, healthcare, and public service, and what I shipped along the way.",
    note: undefined,
    entries: experiences.map(({ id }) => ({ type: "experience", id })),
    marker: [850, 345], number: "02",
  },
  {
    ...records.gemini, name: "Builds", subtitle: "All my projects, in one place",
    connections: [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7], [2, 3]],
    description: "Products, hackathon builds, and experiments—from AI tools and prediction markets to games, travel, and learning.",
    note: undefined,
    entries: projects.map(({ id }) => ({ type: "project", id })),
    marker: [1350, 310], number: "03",
  },
];

export const constellationById = Object.fromEntries([...constellations, ...skyDestinations].map((item) => [item.id, item]));
