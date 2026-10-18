export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI & ML' | 'Web Systems' | 'Edge Computing' | 'Cloud Architecture' | string;
  description: string;
  technologies: string[];
  status: 'In Development' | 'Completed' | 'Research Prototype' | 'Concept' | string;
  githubUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  coverImage?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Merit & Honor' | 'Competition';
  organization?: string;
  date?: string;
  year?: string;
  award?: string;
  rank?: string;
  description: string;
  image?: string;
  certificateImage?: string;
  tags?: string[];
  isVerified?: boolean;
}

export interface CertificationItem {
  id: string;
  name: string;
  title?: string;
  issuer: string;
  date?: string;
  issueDate?: string;
  expires?: string;
  credentialId?: string;
  verificationUrl?: string;
  verifyUrl?: string;
  image?: string;
  imageUrl?: string;
  skills?: string[];
  category?: 'Cloud' | 'Cybersecurity' | 'AI & Data' | 'Networking & IoT' | 'Leadership';
  isVerified?: boolean;
}

export interface PatentItem {
  id: string;
  title: string;
  applicationNumber: string;
  filingDate: string;
  publicationDate?: string;
  status: 'Published' | 'Pending' | 'Filed' | 'Published Patent Application' | 'Patent Application';
  domain?: string;
  field?: string;
  problem?: string;
  approach?: string;
  applications?: string;
  abstract: string;
  inventors?: string[];
  documentImage?: string;
  draftDocument?: string;
  isVerified?: boolean;
}

export interface ExtracurricularItem {
  id: string;
  category: string;
  title: string;
  description: string;
  period: string;
  images?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  type: 'Full-time' | 'Internship' | 'Leadership';
  period: string;
  location: string;
  description: string;
  technologies: string[];
  deliverables?: string[];
  certificateImage?: string;
  media?: string;
  badge?: string;
}

export interface RadioShowItem {
  id: string;
  title: string;
  episodeTitle?: string;
  station?: string;
  period?: string;
  date?: string;
  language?: string;
  description: string;
  coverImage?: string;
  spotifyUrl?: string;
  artworkPlaceholder?: string;
  tags: string[];
}

export interface VolunteeringItem {
  id: string;
  role: string;
  event: string;
  organization: string;
  period: string;
  description: string;
  images: {
    tagImage: string;
    teamImage: string;
  };
  highlights: string[];
}

export const portfolioData = {
  personal: {
    name: "Kaarthik M",
    title: "Software Engineer & AI Explorer",
    institution: "Vellore Institute of Technology, Vellore",
    degree: "Integrated M.Tech in Software Engineering",
    graduationYear: 2028,
    period: "July 2023 – May 2028",
    cgpa: "9.74",
    location: "Vellore, Tamil Nadu, India",
    email: "kaarthik.m2005@gmail.com",
    linkedin: "https://www.linkedin.com/in/kaarthik-m-47198728a",
    github: "https://github.com/thamizhkarthik05",
    instagram: "https://instagram.com/thamizhkarthik_05",
    resumeUrl: "#resume-modal",
    avatar: "/assets/profile/Kaarthik Profile Picture.jpg",
    portrait: "/assets/profile/Kaarthik Profile Picture.jpg",
    headline: "Curious by Nature. Building Beyond the Ordinary.",
    descriptor: "Software Engineering · AI Exploration · Creative Problem Solving",
    bio: "I'm Kaarthik — a software engineering student exploring the intersection of technology, creative problem-solving, and intelligent systems. I enjoy turning ideas into thoughtful digital experiences and exploring solutions to real-world challenges.",
    stats: [
      { label: "Patent Applications Published", value: "5x" },
      { label: "Hackathon Podiums & Wins", value: "4x" },
      { label: "Academic CGPA", value: "9.74" },
      { label: "Years Radio Hosting", value: "2+" },
    ],
  },

  quote: {
    text: "Great work begins with curiosity, grows through consistency, and becomes meaningful when it solves a real problem.",
    author: "Kaarthik M",
    role: "Engineering Philosophy",
  },

  principles: [
    {
      number: "01",
      title: "Understand Before Building",
      summary: "Deconstruct the real problem space before committing to a single line of code or architecture.",
      detail: "True efficiency comes from solving the right problem. I invest early in understanding operational constraints, user needs, and architectural trade-offs to ensure the resulting system has clarity and resilience.",
      geometry: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
    },
    {
      number: "02",
      title: "Explore Before Assuming",
      summary: "Treat assumptions as hypotheses to be tested, validated, and refined with evidence.",
      detail: "Curiosity drives innovation. Whether evaluating edge AI inference models or designing fault-tolerant railway algorithms, exploratory prototyping helps uncover edge cases before they become bottlenecks.",
      geometry: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
    },
    {
      number: "03",
      title: "Build With Purpose",
      summary: "Every component, interaction, and abstraction must justify its place in the system.",
      detail: "Code is not just an implementation; it's a living tool for humans. I strive for clean interfaces, responsive design systems, and thoughtful craft that deliver measurable value without unnecessary bloat.",
      geometry: "polygon(0 0, 100% 15%, 100% 100%, 0 85%)",
    },
    {
      number: "04",
      title: "Iterate With Intention",
      summary: "Rapid feedback cycles combined with deliberate craftsmanship create enduring quality.",
      detail: "From 24-hour hackathons to production frontend internships, progress is made through disciplined iterations. I embrace testing, active peer code reviews, and measured refinement.",
      geometry: "polygon(0 15%, 100% 0, 85% 100%, 0 100%)",
    },
    {
      number: "05",
      title: "Grow Through Collaboration",
      summary: "The strongest technical systems and creative ideas emerge from open, interdisciplinary dialogue.",
      detail: "Whether broadcasting weekly on VIT Community Radio, coordinating 5,000+ participant symposiums, or pair-programming in a hackathon team, diverse perspectives transform good ideas into impactful outcomes.",
      geometry: "polygon(0 0, 85% 0, 100% 100%, 15% 100%)",
    },
  ],

  education: [
    {
      institution: "Vellore Institute of Technology, Vellore",
      degree: "Integrated M.Tech in Software Engineering",
      period: "July 2023 – May 2028 (Expected)",
      score: "CGPA: 9.74",
      scoreDetail: "Consistently among the top performers of the department",
      highlights: [
        "Awarded University Merit Scholarship for 3 consecutive academic years (2023-24, 2024-25, 2025-26)",
        "Identified as 'Achiever' by the Institute for National-Level hackathon distinction (2025-26)",
        "Student Placement Coordinator at VIT Career Development Centre (CDC)",
        "Elected Programme Representative representing the Integrated M.Tech Software Engineering cohort",
      ],
      meritCertificates: [
        { year: "1st Year (2023-24)", path: "/assets/achievements/merit-award-year-1.png" },
        { year: "2nd Year (2024-25)", path: "/assets/achievements/merit-award-year-2.png" },
        { year: "3rd Year (2025-26)", path: "/assets/achievements/merit-award-year-3.png" },
      ],
    },
    {
      institution: "SBOA School & Junior College",
      degree: "Higher Secondary Education (Class 12)",
      period: "Completed with Distinction",
      score: "Class 12 Grade: 93.4%",
      scoreDetail: "Strong academic foundation in Mathematics, Physics, Chemistry and Computer Science",
      highlights: [
        "Consistent academic excellence with focus on analytical problem solving and mathematics",
        "Active participation in inter-school science symposiums, informatics events, and creative writing",
      ],
    },
  ],

  experiences: [
    {
      id: "radio-jockey",
      role: "Radio Jockey & Broadcaster",
      organization: "VIT COMMUNITY RADIO",
      type: "Leadership",
      period: "March 2024 – Present",
      location: "Vellore, Tamil Nadu, India",
      badge: "Broadcasting & Media",
      description: "Hosting and curating engaging radio programs for the university and local community. Responsible for scripting, voice modulation, interviewing guests, and driving audience engagement on educational, cultural, and youth-oriented subjects.",
      technologies: ["Public Speaking", "Audio Storytelling", "Interviewing", "Scriptwriting", "Broadcast Production"],
      deliverables: [
        "Curated and hosted regular live broadcasts and recorded campus segments",
        "Conducted structured interviews with faculty, students, and event organizers",
        "Honed verbal storytelling and spontaneous communication skills before wide listener bases",
      ],
    },
    {
      id: "spatial-biologics",
      role: "Software Development Intern",
      organization: "Spatial Biologics Private Limited",
      type: "Internship",
      period: "10 June 2026 – 10 July 2026",
      location: "Vellore / On-site",
      badge: "Computational App Dev",
      description: "Contributed to the development of a web-based computational application. Implemented responsive frontend UI components, developed server-side functionalities, and optimized workflows for efficient data processing and seamless interaction.",
      technologies: ["React.js", "Python / Server Logic", "Computational Workflows", "API Integration", "UI/UX Optimization"],
      certificateImage: "/assets/internships/spatial-biologics-certificate.png",
      deliverables: [
        "Built responsive interface modules tailored for complex computational data rendering",
        "Optimized server-side workflows to reduce data retrieval latency",
        "Collaborated with researchers and engineering leadership to translate mathematical models into functional UI views",
      ],
    },
    {
      id: "solrrbox",
      role: "Frontend Developer Intern",
      organization: "Solrrbox (H & A Solar Innovations)",
      type: "Internship",
      period: "23 September 2025 – 23 October 2025",
      location: "Vellore, Tamil Nadu",
      badge: "Production Web Dev",
      description: "Worked extensively on modern frontend architecture using Next.js, React.js, and Tailwind CSS. Contributed design suggestions to elevate platform UI/UX, owned dedicated task pipelines, and collaborated in an agile startup environment.",
      technologies: ["Next.js", "React.js", "Tailwind CSS", "JavaScript/TypeScript", "Responsive Design", "Git Workflow"],
      certificateImage: "/assets/internships/solrrbox-certificate.png",
      deliverables: [
        "Developed performant, responsive web components across multiple breakpoints",
        "Refactored styling using modern Tailwind utility patterns for design consistency",
        "Praised by leadership for sincere dedication, fast delivery, and positive team collaboration",
      ],
    },
    {
      id: "placement-coordinator",
      role: "Placement Coordinator",
      organization: "Career Development Centre (CDC), VIT",
      type: "Leadership",
      period: "July 2026 – Present",
      location: "Vellore, Tamil Nadu, India",
      badge: "University Leadership",
      description: "Serving as a key student representative coordinating corporate placement drives, recruitment logistics, student preparedness, and institutional communications for university-wide hiring processes.",
      technologies: ["Stakeholder Management", "Operations Logistics", "Corporate Communication", "Student Mentorship"],
      deliverables: [
        "Coordinating placement sessions and recruitment drives for leading tech companies",
        "Bridging communication between corporate HRs, university deans, and student candidates",
      ],
    },
    {
      id: "programme-representative",
      role: "Programme Representative",
      organization: "Vellore Institute of Technology",
      type: "Leadership",
      period: "August 2026 – Present",
      location: "Vellore, Tamil Nadu",
      badge: "Academic Cohort Lead",
      description: "Elected student representative for the Integrated M.Tech Software Engineering department, acting as an official liaison between the student body, department faculty, and university administration.",
      technologies: ["Conflict Resolution", "Academic Administration", "Peer Advocacy", "Curriculum Feedback"],
      deliverables: [
        "Advocated academic and infrastructural requirements on behalf of cohort peers",
        "Organized academic review forums and streamlined feedback loops with professors",
      ],
    },
  ],

  projects: [
    {
      id: "resume-matcher",
      title: "Resume Matcher",
      category: "AI & ML",
      description: "An intelligent ATS resume analysis and job matching platform that parses candidate resumes against target job descriptions, scoring semantic relevance, identifying missing skills and keyword gaps, and delivering structured recommendations to maximize recruitment success.",
      technologies: ["Python", "NLP", "Streamlit", "Scikit-Learn", "Text Extraction"],
      status: "Completed",
      githubUrl: "https://github.com/thamizhkarthik05/Resume-Matcher.git",
      coverImage: "/assets/projects/resume-matcher.png",
      featured: true,
    },
    {
      id: "journey-360",
      title: "Journey 360",
      category: "Web Systems",
      description: "A smart interactive travel companion application that dynamically generates personalized itineraries based on user preferences, provides real-time navigation with AR guidance, delivers live safety insights using news and weather feeds, and offers offline translation with emergency SOS features.",
      technologies: ["React", "AR Guidance", "Geolocation", "Weather API", "News API"],
      status: "Completed",
      githubUrl: "https://github.com/thamizhkarthik05/Journey360.git",
      coverImage: "/assets/projects/journey-360.png",
      featured: true,
    },
    {
      id: "inventory-management",
      title: "Inventory Management System",
      category: "Web Systems",
      description: "A comprehensive warehouse and inventory tracking portal designed to monitor real-time stock levels, record inbound and outbound material flows, prevent stockouts with automated reorder thresholds, and provide transparent audit logs.",
      technologies: ["React", "Node.js", "Express", "Database", "REST APIs"],
      status: "Completed",
      githubUrl: "https://github.com/thamizhkarthik05/Inventory-Management-Project.git",
      coverImage: "/assets/projects/inventory-management.png",
      featured: true,
    },
    {
      id: "gemini-clone",
      title: "Gemini Clone (Nila)",
      category: "AI & ML",
      description: "A responsive multimodal conversational AI interface named Nila, modeled after Google Gemini. Features real-time streaming LLM response generation, contextual prompt suggestion chips, responsive message threads, and clean conversational state management.",
      technologies: ["React", "Gemini API", "LLM Integration", "JavaScript", "Tailwind CSS"],
      status: "Completed",
      githubUrl: "https://github.com/thamizhkarthik05/Gemini-Clone.git",
      coverImage: "/assets/projects/gemini-clone.png",
      featured: true,
    },
    {
      id: "netflix-clone",
      title: "Netflix Clone",
      category: "Web Systems",
      description: "A high-fidelity entertainment streaming web platform featuring dynamic genre and category carousels, responsive hero banner with video trailer previews, user authentication flows, and live TMDB media catalogue exploration.",
      technologies: ["React.js", "TMDB API", "CSS Grid", "Responsive UI", "Authentication"],
      status: "Completed",
      githubUrl: "https://github.com/thamizhkarthik05/Netflix-Clone.git",
      coverImage: "/assets/projects/netflix-clone.png",
      featured: true,
    },
    {
      id: "air-casty",
      title: "AirCasty — Weather App",
      category: "Web Systems",
      description: "A clean, responsive weather application fetching live meteorological data from external APIs to display real-time temperature, atmospheric conditions, wind speed, humidity, and local environmental metrics across global cities.",
      technologies: ["JavaScript", "Weather API", "HTML5", "CSS3", "Fetch API"],
      status: "Completed",
      githubUrl: "https://github.com/thamizhkarthik05/Weather-App.git",
      coverImage: "/assets/projects/air-casty.png",
      featured: false,
    },
    {
      id: "quiz-master",
      title: "Quiz Master",
      category: "Web Systems",
      description: "An interactive assessment platform featuring timed quizzes, dynamic score computation, instant feedback on answers, domain-specific questionnaire categories, and final performance breakdowns.",
      technologies: ["JavaScript", "DOM Architecture", "CSS3", "LocalStorage", "State Logic"],
      status: "Completed",
      githubUrl: "https://github.com/thamizhkarthik05/QuizMaster.git",
      coverImage: "/assets/projects/quiz-master.png",
      featured: false,
    },
    {
      id: "qr-code-generator",
      title: "QR Code Generator",
      category: "Web Systems",
      description: "A lightweight utility converting user-provided text, URLs, and numeric inputs into customizable, high-resolution QR codes with selectable pixel dimensions and instant one-click download support.",
      technologies: ["JavaScript", "QR Code API", "HTML5 Canvas", "Responsive CSS"],
      status: "Completed",
      githubUrl: "https://github.com/thamizhkarthik05/QR-Code-Generator.git",
      coverImage: "/assets/projects/qr-code-generator.png",
      featured: false,
    },
    {
      id: "analytics-dashboard",
      title: "Analytics Dashboard",
      category: "Web Systems",
      description: "A modular business intelligence dashboard built to visualize key performance indicators, user engagement trends, and transactional analytics with dynamic filters and clean responsive data views.",
      technologies: ["React", "Data Visualization", "JavaScript", "Tailwind CSS"],
      status: "In Development",
      githubUrl: "https://github.com/thamizhkarthik05/Analytics-Dashboard.git",
      featured: false,
    },
  ],

  skills: [
    {
      id: "languages",
      name: "Programming Languages",
      iconName: "Code2",
      description: "Core languages used for systems engineering, backend logic, and algorithms.",
      skills: [
        { name: "Python", highlight: true },
        { name: "JavaScript (ES6+)", highlight: true },
        { name: "TypeScript", highlight: true },
        { name: "C / C++", highlight: false },
        { name: "Java", highlight: false },
        { name: "SQL", highlight: false },
      ],
    },
    {
      id: "frontend",
      name: "Frontend Architecture",
      iconName: "Layout",
      description: "Modern component-driven web interfaces, responsive styling, and micro-interactions.",
      skills: [
        { name: "React.js", highlight: true },
        { name: "Next.js", highlight: true },
        { name: "Tailwind CSS", highlight: true },
        { name: "HTML5 / Semantic Web", highlight: false },
        { name: "CSS3 / Modern Layouts", highlight: false },
        { name: "Framer Motion", highlight: false },
      ],
    },
    {
      id: "aiml",
      name: "AI & Intelligent Systems",
      iconName: "BrainCircuit",
      description: "Machine learning workflows, computer vision, and neural inference exploration.",
      skills: [
        { name: "Machine Learning Foundations", highlight: true },
        { name: "Computer Vision & Object Re-ID", highlight: true },
        { name: "Edge AI & Model Optimization", highlight: true },
        { name: "Generative AI Prompting & Workflows", highlight: false },
        { name: "Vector Databases & Search", highlight: false },
      ],
    },
    {
      id: "cloud-devops",
      name: "Cloud & DevOps",
      iconName: "Cloud",
      description: "Cloud computing infrastructure, IAM policies, and deployment fundamentals.",
      skills: [
        { name: "Google Cloud Platform (GCP)", highlight: true },
        { name: "Google Cloud Console & IAM", highlight: true },
        { name: "Git & Version Control", highlight: true },
        { name: "Linux / Shell Scripting", highlight: false },
        { name: "RESTful API Integration", highlight: false },
      ],
    },
    {
      id: "systems-iot",
      name: "IoT & Networking",
      iconName: "Cpu",
      description: "Hardware microcontrollers, sensor integration, and computer network protocols.",
      skills: [
        { name: "Arduino IDE & Sensors", highlight: true },
        { name: "Computer Networks & Protocols", highlight: true },
        { name: "Hardware Interfacing", highlight: false },
        { name: "Cybersecurity Basics (Phishing Detection)", highlight: false },
      ],
    },
    {
      id: "professional",
      name: "Professional & Media",
      iconName: "Sparkles",
      description: "Storytelling, event organization, broadcast media, and teamwork.",
      skills: [
        { name: "Radio Broadcasting & Voice Hosting", highlight: true },
        { name: "Technical Writing & Presentation", highlight: true },
        { name: "Event Coordination & Public Outreach", highlight: true },
        { name: "Team Leadership & Collaboration", highlight: false },
      ],
    },
  ],

  achievements: [
    {
      id: "achiever-award",
      title: "VIT Achiever's Award — National Distinction",
      category: "Merit & Honor",
      organization: "Vellore Institute of Technology",
      date: "March 2026",
      year: "March 2026",
      award: "Conferred 'Achiever' Title",
      rank: "Achiever Title",
      description: "Conferred as an 'Achiever' for outstanding merit and exceptional National-Level Achievement during the academic year 2025–26, recognizing exemplary performance while representing VIT with distinction at the national level.",
      image: "/assets/achievements/achievers-award-cert.png",
      certificateImage: "/assets/achievements/achievers-award-cert.png",
      tags: ["National Distinction", "University Honor", "Exemplary Performance"],
      isVerified: true,
    },
    {
      id: "hackathon-1",
      title: "Road Safety Hackathon — 3rd Place",
      category: "Hackathon",
      organization: "Office of Students' Welfare, VIT Vellore",
      date: "23 January 2026",
      year: "Jan 2026",
      award: "3rd Place Podium Winner",
      rank: "3rd Place",
      description: "Secured Third Place in the competitive Road Safety Hackathon under the 'Accident Prevention' track, developing an innovative sensor-based preventive telemetry mechanism to detect hazards and alert drivers.",
      image: "/assets/achievements/hackathon-1-road-safety-prize.jpeg",
      certificateImage: "/assets/achievements/hackathon-1-road-safety-cert.png",
      tags: ["Accident Prevention", "3rd Place", "VIT Vellore"],
      isVerified: true,
    },
    {
      id: "hackathon-2",
      title: "Impact-AI-Thon — Podium Winner",
      category: "Hackathon",
      organization: "St. Joseph's College of Engineering, Chennai",
      date: "23–24 February 2025",
      year: "Feb 2025",
      award: "Podium Winner",
      rank: "Podium Winner",
      description: "Recognized with podium prize in Impact-Ai-Thon organized by the Data Analytics Club of the Artificial Intelligence & Data Science Department at St. Joseph's College of Engineering.",
      image: "/assets/achievements/hackathon-2-impact-ai-prize.jpeg",
      certificateImage: "/assets/achievements/hackathon-2-impact-ai-cert.png",
      tags: ["AI & Data Science", "Podium Finish", "St. Joseph's College"],
      isVerified: true,
    },
    {
      id: "hackathon-3",
      title: "PEC HACKS 4.0 — Actian VectorAI Special Award ($100)",
      category: "Hackathon",
      organization: "Panimalar Engineering College & Actian",
      date: "28–30 August 2026",
      year: "Aug 2026",
      award: "Special Prize ($100 Award)",
      rank: "Special Prize ($100)",
      description: "Selected among the Top 50 teams from over 5,000+ applicants across the nation. Awarded the Special 3rd Prize of $100 by sponsor Actian for 'Effective Use of Actian VectorAI DB' with team ThinkInBetween.",
      image: "/assets/achievements/hackathon-3-pec-hacks-prize.jpeg",
      certificateImage: "/assets/achievements/hackathon-3-pec-hacks-cert.png",
      tags: ["Top 50 / 5000+", "Actian VectorAI", "$100 Prize"],
      isVerified: true,
    },
    {
      id: "hackathon-4",
      title: "Sakthi Hackfest '26 — 3rd Position",
      category: "Hackathon",
      organization: "Sree Sakthi Engineering College, Coimbatore",
      date: "10–11 October 2026",
      year: "Oct 2026",
      award: "3rd Position Podium",
      rank: "3rd Position",
      description: "Secured 3rd Position in the intense 24-Hour Hackathon SAKTHI HACKFEST '26 under the domain 'Sustainable Development Goal' (SDG) presenting a functional technology solution for environmental monitoring.",
      image: "/assets/achievements/hackathon-4-sakthi-hackfest-prize.jpeg",
      certificateImage: "/assets/achievements/hackathon-4-sakthi-hackfest-cert.png",
      tags: ["24-Hour Hackathon", "3rd Position", "SDG Track"],
      isVerified: true,
    },
    {
      id: "writing-competition",
      title: "2nd Prize — 'My Favourite Book' Subject Area",
      category: "Merit & Honor",
      organization: "Periyar E.V.R. Central Library, VIT",
      date: "August 2026",
      year: "Aug 2026",
      award: "Second Prize Winner",
      rank: "2nd Prize",
      description: "Official prize winner in the 'My Favourite Book – Subject Area' category during National Librarian's Day celebrations for an essay on 'Software Engineering: A Practitioner's Approach' by Roger S. Pressman.",
      image: "/assets/achievements/writing-competition-winner.png",
      certificateImage: "/assets/achievements/writing-competition-winner.png",
      tags: ["Technical Writing", "Software Engineering Book", "2nd Prize"],
      isVerified: true,
    },
    {
      id: "merit-scholarship",
      title: "3x University Merit Scholarship Winner",
      category: "Merit & Honor",
      organization: "Vellore Institute of Technology",
      date: "2023 – 2026",
      year: "2023–2026",
      award: "Merit Scholarship",
      rank: "Scholar",
      description: "Awarded Merit Scholarship for three consecutive academic years (1st Year 2023-24, 2nd Year 2024-25, 3rd Year 2025-26) by the Chancellor and Vice-Chancellor in recognition of academic distinction in Integrated M.Tech Software Engineering.",
      image: "/assets/achievements/merit-award-year-3.png",
      certificateImage: "/assets/achievements/merit-award-year-3.png",
      tags: ["Academic Excellence", "3 Consecutive Years", "VIT Chancellor Award"],
      isVerified: true,
    },
  ],

  certifications: [
    {
      id: "cert-1",
      name: "Essential Google Cloud Infrastructure: Foundation",
      title: "Essential Google Cloud Infrastructure: Foundation",
      issuer: "Google Cloud Skills Boost (Coursera)",
      date: "July 2026",
      issueDate: "July 2026",
      expires: "No Expiration",
      credentialId: "BE0TBFVC8K8N",
      verifyUrl: "https://coursera.org/verify/BE0TBFVC8K8N",
      verificationUrl: "https://coursera.org/verify/BE0TBFVC8K8N",
      image: "/assets/certifications/gcp-infrastructure-foundation.png",
      imageUrl: "/assets/certifications/gcp-infrastructure-foundation.png",
      skills: ["Google Cloud Console", "Google Cloud Platform (GCP)", "IAM & Networking", "Cloud Security"],
      category: "Cloud",
      isVerified: true,
    },
    {
      id: "cert-2",
      name: "A Tour of Google Cloud Hands-on Labs",
      title: "A Tour of Google Cloud Hands-on Labs",
      issuer: "Google Cloud Skills Boost (Coursera)",
      date: "June 2026",
      issueDate: "June 2026",
      expires: "No Expiration",
      credentialId: "BLRGWFUZF6TO",
      verifyUrl: "https://coursera.org/verify/BLRGWFUZF6TO",
      verificationUrl: "https://coursera.org/verify/BLRGWFUZF6TO",
      image: "/assets/certifications/gcp-handson-labs.png",
      imageUrl: "/assets/certifications/gcp-handson-labs.png",
      skills: ["Cloud Architecture", "Resource Provisioning", "CLI & Console Workflow"],
      category: "Cloud",
      isVerified: true,
    },
    {
      id: "cert-3",
      name: "Cybersecurity Job Simulation",
      title: "Cybersecurity Job Simulation",
      issuer: "Mastercard & Forage",
      date: "May 2026",
      issueDate: "May 2026",
      expires: "No Expiration",
      credentialId: "pbWDNE3GWSMwCdyt3",
      verifyUrl: "https://www.theforage.com/simulations/mastercard/cybersecurity",
      verificationUrl: "https://www.theforage.com/simulations/mastercard/cybersecurity",
      image: "/assets/certifications/mastercard-cybersecurity.png",
      imageUrl: "/assets/certifications/mastercard-cybersecurity.png",
      skills: ["Phishing Detection", "Security Awareness", "Cyber Risk Assessment"],
      category: "Cybersecurity",
      isVerified: true,
    },
    {
      id: "cert-4",
      name: "Effective Leadership",
      title: "Effective Leadership",
      issuer: "HP LIFE Foundation",
      date: "May 2026",
      issueDate: "May 2026",
      expires: "No Expiration",
      credentialId: "f7f67278-685d-4157-bbbd-8e118eaed6ec",
      verifyUrl: "https://www.life-global.org",
      image: "/assets/certifications/hp-effective-leadership.png",
      imageUrl: "/assets/certifications/hp-effective-leadership.png",
      skills: ["Leadership Strategies", "Decision Making", "Team Management", "Ethics"],
      category: "Leadership",
      isVerified: true,
    },
    {
      id: "cert-5",
      name: "SEO with AI",
      title: "SEO with AI",
      issuer: "Sololearn",
      date: "May 2026",
      issueDate: "May 2026",
      expires: "No Expiration",
      credentialId: "Sololearn-SEO-AI-2026",
      verifyUrl: "https://www.sololearn.com",
      image: "/assets/certifications/hp-effective-leadership.png",
      imageUrl: "/assets/certifications/hp-effective-leadership.png",
      skills: ["Search Engine Optimization", "AI Content Optimization", "Keyword Analytics"],
      category: "AI & Data",
      isVerified: true,
    },
    {
      id: "cert-6",
      name: "Generative AI in Practice",
      title: "Generative AI in Practice",
      issuer: "Sololearn",
      date: "May 2026",
      issueDate: "May 2026",
      expires: "No Expiration",
      credentialId: "Sololearn-GenAI-2026",
      verifyUrl: "https://www.sololearn.com",
      image: "/assets/certifications/hp-effective-leadership.png",
      imageUrl: "/assets/certifications/hp-effective-leadership.png",
      skills: ["Generative AI", "Prompt Engineering", "Practical LLM Implementations"],
      category: "AI & Data",
      isVerified: true,
    },
    {
      id: "cert-7",
      name: "Value Added Course: Networking Cardinals",
      title: "Value Added Course: Networking Cardinals",
      issuer: "School of Computer Science & Information Systems, VIT Vellore",
      date: "March 2025",
      issueDate: "March 2025",
      expires: "No Expiration",
      credentialId: "23MIS0050-NC-VAC",
      verifyUrl: "https://vit.ac.in",
      image: "/assets/certifications/vit-networking-cardinals.png",
      imageUrl: "/assets/certifications/vit-networking-cardinals.png",
      skills: ["Network Topologies", "OSI & TCP/IP Stack", "Routing Protocols"],
      category: "Networking & IoT",
      isVerified: true,
    },
    {
      id: "cert-8",
      name: "Value Added Course: IoT and Connected Devices (Arduino)",
      title: "Value Added Course: IoT and Connected Devices (Arduino)",
      issuer: "Dept of Software & Systems Engineering, SCORE, VIT",
      date: "June 2024",
      issueDate: "June 2024",
      expires: "No Expiration",
      credentialId: "23MIS0050-IOT-VAC",
      verifyUrl: "https://vit.ac.in",
      image: "/assets/certifications/vit-arduino-iot.png",
      imageUrl: "/assets/certifications/vit-arduino-iot.png",
      skills: ["Arduino IDE", "Microcontroller Interfacing", "Sensor Data Pipelines", "Smart Systems"],
      category: "Networking & IoT",
      isVerified: true,
    },
  ],

  patents: [
    {
      id: "patent-1",
      title: "AI-Based Predictive Thermal Monitoring and Adaptive Charging Optimization System for Preventing Battery Swelling",
      applicationNumber: "202641110142",
      filingDate: "September 14, 2026",
      publicationDate: "September 18, 2026",
      status: "Published",
      field: "Edge AI & Hardware Battery Protection",
      domain: "Edge AI & Hardware Battery Protection",
      problem: "Traditional battery charging algorithms rely on static voltage/current curves that fail to account for micro-thermal stresses, ambient usage workloads, and internal gas buildup that trigger physical swelling and catastrophic degradation.",
      approach: "An AI-based, on-device battery safety framework integrating edge inference for swelling probability, thermal stress scoring, application-level heat mapping, CPU/GPU-aware charging throttling, and self-learning wear compensation without requiring external cloud connectivity or supplementary sensors.",
      applications: "Smartphones, high-performance laptops, electric mobile devices, and wearable IoT electronics.",
      abstract: "On-device AI battery safety framework for consumer smartphones and laptops. Integrates edge-AI swelling prediction, Thermal Stress Scores, micro thermal gradient analysis, CPU/GPU-aware charging throttling, and behavioral self-learning — without external cloud connectivity.",
      inventors: ["Kaarthik M", "Rekha M", "Harish Kumar S", "Dr. Malaserene I"],
      documentImage: "/assets/patents/patent-details-page-1.png",
      draftDocument: "/assets/patents/drafts/AI-Based Predictive Thermal Monitoring and Adaptive Charging Optimization System for Preventing Battery Swelling in Consumer Smartphones and Laptops.pdf",
      isVerified: true,
    },
    {
      id: "patent-2",
      title: "System and Method for Dynamic Cyber DNA Fingerprinting and Evolutionary Analysis of Cybercrime Complaints",
      applicationNumber: "202641108530",
      filingDate: "September 10, 2026",
      publicationDate: "September 18, 2026",
      status: "Published",
      field: "Cybersecurity & Intelligent Investigation",
      domain: "Cybersecurity & Intelligent Investigation",
      problem: "Cybercrime perpetrators disguise syndicated attack patterns across disparate geographic jurisdictions and seemingly isolated complaint filings, preventing law enforcement from linking common operational rings.",
      approach: "Introduces Dynamic Cyber DNA Fingerprinting that breaks down multimodal complaint evidence into interconnected behavioral and intent-based 'genes'. It tracks mutations across attack iterations and builds evolutionary lineage trees to uncover hidden syndicates.",
      applications: "National cybercrime reporting portals, financial fraud detection bureaus, digital forensics, and threat intelligence operations.",
      abstract: "Introduces Dynamic Cyber DNA Fingerprinting that processes multimodal complaint evidence into interconnected behavioral 'genes', tracks mutations across attack iterations, and builds evolutionary lineage trees to correlate hidden crime syndicates across jurisdictions.",
      inventors: ["Kaarthik M", "Nanda Gopal", "Rohan Thakur", "Dr. Malathy E"],
      documentImage: "/assets/patents/patent-details-page-1.png",
      draftDocument: "/assets/patents/drafts/SYSTEM AND METHOD FOR DYNAMIC CYBER DNA FINGERPRINTING AND EVOLUTIONARY ANALYSIS OF CYBERCRIME COMPLAINTS.pdf",
      isVerified: true,
    },
    {
      id: "patent-3",
      title: "A System and Method for Tokenless Laundry Bag Identity Generation, Localization, Verification and Recovery",
      applicationNumber: "202641104992",
      filingDate: "September 01, 2026",
      publicationDate: "September 11, 2026",
      status: "Published",
      field: "Computer Vision & Autonomous Inventory",
      domain: "Computer Vision & Autonomous Inventory",
      problem: "Physical markers like barcodes, RFID tags, and printed tokens in shared campus and hospitality laundry management suffer from tearing, detachment, water damage, and high operational replacement overhead.",
      approach: "Uses computer vision and deep feature extraction to generate a unique 'Laundry Identity Profile' based on non-invasive visual attributes (fabric color distribution, geometric contours, texture harmonics, dimension ratios, and estimated weight) for autonomous camera-guided rack localization and misplacement recovery.",
      applications: "University residential hostels, hospital laundry services, hotels, and automated industrial laundries.",
      abstract: "AI-based tokenless laundry management system that generates unique Laundry Identity Profiles via computer vision (fabric color, geometric contours, texture, dimension) for autonomous camera-guided rack localization and zero-physical-token recovery.",
      inventors: ["Kaarthik M", "Rekha M", "Dr. Jayalakshmi S"],
      documentImage: "/assets/patents/patent-details-page-1.png",
      draftDocument: "/assets/patents/drafts/A System and Method for Tokenless Laundry Bag Identity Generation, Localization, Verification and Recovery.pdf",
      isVerified: true,
    },
    {
      id: "patent-4",
      title: "Adaptive Capability Reallocation Framework for Intelligent Railway Operational Safety",
      applicationNumber: "202641101765",
      filingDate: "August 23, 2026",
      publicationDate: "August 28, 2026",
      status: "Published",
      field: "Distributed Multi-Agent Systems & Rail Safety",
      domain: "Distributed Multi-Agent Systems & Rail Safety",
      problem: "When a single subsystem or software agent in intelligent railway networks experiences localized faults, conventional fail-safes often trigger broad emergency stop sequences that cause cascade delays across the entire network.",
      approach: "A Railway Digital Twin-integrated framework that performs predictive degradation scoring and reallocates only the compromised capability among remaining healthy intelligent agents, maintaining system-wide train circulation safely while suppressing cascade gridlocks.",
      applications: "Intelligent railway signalling networks, electronic interlocking systems, train movement supervision, and modern metro traffic control centers.",
      abstract: "Railway Digital Twin-integrated framework that performs predictive degradation scoring and reallocates only compromised operational capabilities among healthy signalling agents — maintaining network-wide safety while preventing cascade gridlocks.",
      inventors: ["Kaarthik M", "Rekha M", "Harish Kumar S", "Dr. Sumathy S"],
      documentImage: "/assets/patents/patent-details-page-1.png",
      draftDocument: "/assets/patents/drafts/Adaptive Capability Reallocation System for Intelligent Railway Operational Safety.pdf",
      isVerified: true,
    },
    {
      id: "patent-5",
      title: "System for Predictive Power-Aware Adaptive Neural Inference",
      applicationNumber: "202641065402",
      filingDate: "May 26, 2026",
      publicationDate: "June 05, 2026",
      status: "Published",
      field: "Low-Power Edge Machine Learning",
      domain: "Low-Power Edge Machine Learning",
      problem: "Executing compute-heavy neural models on energy-constrained edge sensors often causes sudden brownouts, battery drain spikes, and latency surges when operating under fluctuating power supplies.",
      approach: "Dynamically predicts available energy budgets and modulates the model's computational graph (precision, activated layers, and inference frequency) ahead of time to guarantee uninterrupted, power-balanced execution.",
      applications: "Remote IoT sensor nodes, solar-powered environmental monitors, field robotics, and wearable health diagnostics.",
      abstract: "Dynamically predicts available power budgets and modulates neural computational graphs (precision, activated layers, inference frequency) ahead of time to guarantee uninterrupted, power-balanced AI execution on energy-constrained edge sensor nodes.",
      inventors: ["Kaarthik M","Dr. Jayalakshmi S"],
      documentImage: "/assets/patents/patent-details-page-1.png",
      draftDocument: "/assets/patents/drafts/SYSTEM FOR PREDICTIVE POWER-AWARE ADAPTIVE NEURAL INFERENCE.pdf",
      isVerified: true,
    },
  ],

  extracurriculars: [
    {
      id: "radio",
      category: "Radio",
      title: "Radio Jockey & Content Producer — VIT Community Radio",
      description: "Hosting and curating weekly broadcasts for VIT's university radio station. Scripting shows, conducting structured interviews with campus changemakers, and reaching thousands of listeners with stories on technology, culture, and student life.",
      period: "March 2024 – Present",
      images: [] as string[],
    },
    {
      id: "gravitas-25",
      category: "Volunteering",
      title: "Outreach Coordinator — GraVITas '25",
      description: "Coordinated outreach operations for VIT's flagship annual technological symposium — scripted official event anchors, coordinated live participant interviews, and liaisoned across point-of-contacts to ensure smooth event workflow across 5,000+ participants.",
      period: "September 2025",
      images: [
        "/assets/volunteering/gravitas25-tag.jpeg",
        "/assets/volunteering/gravitas25-team.jpeg",
      ],
    },
    {
      id: "riviera-26",
      category: "Volunteering",
      title: "Stalls Committee POC & Student Representative — Riviera '26",
      description: "Served on the Stalls Committee for VIT's premier international cultural carnival. Sole student representative coordinating festival food coupon distribution with senior faculty, and primary point-of-contact for external commercial vendor partnerships.",
      period: "February 2026",
      images: [
        "/assets/volunteering/riviera26-tag.jpeg",
        "/assets/volunteering/riviera26-team.jpeg",
      ],
    },
  ],

  beyondScreen: {
    title: "Beyond the Screen",
    subtitle: "Voices, Stories & Everything Else",
    radio: {
      station: "VIT Community Radio",
      role: "Radio Jockey & Content Producer",
      period: "March 2024 – Present",
      description: "Stepping up to the studio microphone is where technical rigor meets human empathy. At VIT Community Radio, I craft weekly broadcasts, interview inspiring changemakers, and translate complex themes into stories that connect with thousands of listeners across campus and the local Vellore community.",
      highlights: [
        "Crafted engaging radio scripts bridging technology, arts, student life, and society",
        "Conducted structured in-depth interviews with campus thought-leaders and student innovators",
        "Mastered voice modulation, live audio handling, and spontaneous stage presentation",
      ],
      shows: [
        {
          id: "radio-science-day",
          title: "Wonders of Science & Innovation",
          episodeTitle: "National Science Day Special Broadcast",
          station: "VIT Community Radio 90.8 FM",
          date: "National Science Day",
          language: "Tamil / English",
          description: "Join RJ Kaarthik on VIT Community Radio as we celebrate National Science Day with a deep dive into the wonders of science and innovation. From revolutionary breakthroughs to the everyday impact of technology on our lives, this special episode honors the spirit of scientific discovery with an insightful conversation that sparks curiosity and inspiration.",
          coverImage: "/assets/radio/national-science-day.png",
          spotifyUrl: "https://open.spotify.com/episode/5vUefz7CT8wuNawZM5oq6d?si=hhMTVUPeQn-LJlDrhc3vvw",
          tags: ["Science & Tech", "Innovation", "VIT Radio 90.8"],
        },
        {
          id: "radio-stranger-talks",
          title: "Stranger Talks: Deepana-oda Nambikkai",
          episodeTitle: "Stranger Talks — Episode 01",
          station: "VIT Community Radio 90.8 FM",
          date: "Episode 01",
          language: "Tamil",
          description: "The very first episode of Stranger Talks: Deepana-oda Nambikkai begins with Deepana, a stranger who shares her thoughts on hope, dreams and the future. In a simple, spontaneous conversation with RJ Kaarthik, discover how one stranger sees tomorrow—with optimism, curiosity, and the courage to keep believing.",
          coverImage: "/assets/radio/stranger-talks.jpg",
          spotifyUrl: "https://open.spotify.com/episode/5792hMQcoLBgpDgErzBdji?si=ksHX2w1_STmsCGkSd71q6Q",
          tags: ["Stranger Talks", "Youth Voices", "Inspiration", "Tamil"],
        },
        {
          id: "radio-valentines-day",
          title: "The Timeless Story of Saint Valentine",
          episodeTitle: "Valentine's Day Special Reflection",
          station: "VIT Community Radio 90.8 FM",
          date: "Valentine's Day Special",
          language: "Tamil",
          description: "RJ Kaarthik shares the timeless story of Saint Valentine—the man who believed in love so deeply that he united two lovers against all odds. His story reminds us that true love is guided by courage, faith, and the belief that hearts meant for each other will always find their way, celebrating love as a journey that teaches patience, understanding, and trust in destiny.",
          coverImage: "/assets/radio/valentines-day.png",
          spotifyUrl: "https://open.spotify.com/episode/2UlMrKg3sQqtGfsiOZLkja?si=0wkbvYq3RoeczAnJFlS5Gg",
          tags: ["Valentine's Day", "Storytelling", "Reflection", "Tamil"],
        },
        {
          id: "radio-data-privacy-day",
          title: "Data Privacy in the Digital Age",
          episodeTitle: "Data Privacy Day Special Talk",
          station: "VIT Community Radio 90.8 FM",
          date: "Data Privacy Day Special",
          language: "Tamil",
          description: "VIT Community Radio marks Data Privacy Day by emphasizing the importance of digital security, personal data protection, and responsible technology use. Tune in to a special talk by RJ Kaarthik discussing the significance of privacy in the digital age, online safety practices, and the role of individuals and organizations in safeguarding personal information.",
          coverImage: "/assets/radio/data-privacy-day.svg",
          spotifyUrl: "https://open.spotify.com/episode/4ysoFS2Q0QP4WFz5MwGFwt?si=l0vPZx49TUSGnE49DrKhIQ",
          tags: ["Data Privacy", "Cyber Awareness", "Digital Safety", "Tamil"],
        },
      ],
    },
    volunteering: [
      {
        id: "gravitas-25",
        role: "Coordinator — Outreach Committee",
        event: "GraVITas '25",
        organization: "Vellore Institute of Technology",
        period: "September 2025",
        description: "Coordinated the outreach operations for GraVITas'25, VIT's flagship annual technological symposium. Scripted official event anchors, coordinated live participant interviews, and liaised across point-of-contacts to ensure smooth event workflow.",
        images: {
          tagImage: "/assets/volunteering/gravitas25-tag.jpeg",
          teamImage: "/assets/volunteering/gravitas25-team.jpeg",
        },
        highlights: [
          "Prepared official event scripts and speaker introductions",
          "Interacted with university-wide POCs and technical delegates",
          "Strengthened organizational agility, rapid crisis handling, and team coordination",
        ],
      },
      {
        id: "riviera-26",
        role: "Stalls Committee Member & Student Representative",
        event: "Riviera '26",
        organization: "VIT University",
        period: "February 2026",
        description: "Served on the Stalls Committee for Riviera, the premier international cultural carnival at VIT. Point of contact (POC) for partner vendors, negotiating setup logistics and maintaining professional partnerships through resilience. Also selected as the sole student representative collaborating directly with senior faculty for festival food coupon distribution to thousands of participants.",
        images: {
          tagImage: "/assets/volunteering/riviera26-tag.jpeg",
          teamImage: "/assets/volunteering/riviera26-team.jpeg",
        },
        highlights: [
          "Served as dedicated Point of Contact for external commercial food and merchandise stalls",
          "Single student representative selected to manage university-wide festival food coupon distribution with faculty members",
          "Commended by faculty advisors for integrity, punctuality, and calm execution under high festival footfall",
        ],
      },
    ],
  },

  contact: {
    message: "I'm always interested in meaningful conversations, thoughtful collaborations, and opportunities to learn and build.",
    email: "kaarthik.m2005@gmail.com",
    linkedin: "https://www.linkedin.com/in/kaarthik-m-47198728a",
    github: "https://github.com/thamizhkarthik05",
    instagram: "https://instagram.com/thamizhkarthik_05",
    location: "Vellore, Tamil Nadu, India",
    institution: "Vellore Institute of Technology",
  },
};
