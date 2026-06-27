import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download, Mail, Phone, Linkedin, Github, Code2, ExternalLink, Sparkles, Cpu, Cloud, Send, Rocket, Database, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

// ── Animation Variants ──────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function LeetCodeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14.5 4 6.5 12l8 8" />
      <path d="M8 12h11" />
      <path d="M14.5 8 18.5 12 14.5 16" opacity="0.55" />
    </svg>
  );
}

export function SocialRail() {
  const links = [
    {
      label: "LeetCode",
      href: "https://leetcode.com/u/KULDEEP2005",
      icon: <LeetCodeIcon className="h-4 w-4" />,
    },
    {
      label: "GitHub",
      href: "https://github.com/KDGIT005",
      icon: <Github size={16} />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kuldeepdhangad/",
      icon: <Linkedin size={16} />,
    },
  ];

  return (
    <motion.nav
      aria-label="Social profile links"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-4 top-28 bottom-24 z-30 hidden xl:block pointer-events-none"
    >
      <div className="sticky top-28 flex flex-col items-center gap-3 pointer-events-auto">
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-accent/30" />
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            title={link.label}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-foreground/45 backdrop-blur-md shadow-[0_12px_36px_-18px_oklch(0.65_0.25_305/0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-[0_16px_42px_-18px_oklch(0.65_0.25_305/0.7)]"
          >
            {link.icon}
          </a>
        ))}
        <div className="h-16 w-px bg-gradient-to-b from-accent/30 to-transparent" />
      </div>
    </motion.nav>
  );
}

// ── Floating Icons ──────────────────────────────────────────────────

function FloatingIcons() {
  const icons = [
    { Icon: Cloud, top: "8%", left: "2%", cls: "float-slow" },
    { Icon: Cpu, top: "14%", right: "2%", cls: "float-slower" },
  ];
  return (
    <>
      {icons.map(({ Icon, cls, ...pos }, i) => (
        <div
          key={i}
          aria-hidden
          className={`absolute ${cls} hidden lg:block`}
          style={pos as React.CSSProperties}
        >
          <div className="glass w-14 h-14 rounded-2xl flex items-center justify-center text-accent">
            <Icon size={24} />
          </div>
        </div>
      ))}
    </>
  );
}

// ── Hero Section ────────────────────────────────────────────────────

export function Hero() {
  return (
    <section id="top" className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 overflow-hidden">
      <FloatingIcons />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass font-mono text-xs"
        >
          <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
          <span className="text-foreground/70">Full-Stack Developer · AWS Certified · AI Builder</span>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-6 text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto font-display">
          <span
            className="gradient-text inline-block whitespace-nowrap font-extrabold text-[1.75rem] md:text-[2.125rem] leading-tight"
            style={{ textShadow: "0 0 26px oklch(0.65 0.25 305 / 0.32)" }}
          >
            Kuldeep Dhangad
          </span>
          <br />
          B.Tech CS student at VIT Bhopal, specializing in Cloud Computing & Automation.<br />
          I build full-stack platforms, AI backends, and Android apps —<br />
          powered by Spring Boot, Gemini AI, and AWS.
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-display font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight text-foreground/60"
        >
          From idea to deployed product.
          <br />
          <span className="gradient-text">In days, not months.</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg-primary text-primary-foreground font-semibold glow-purple hover:scale-105 transition-transform"
          >
            <Sparkles size={18} /> Explore My Work
          </Link>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass text-foreground hover:border-accent transition-all"
          >
            <Download size={16} /> Download Resume
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: "8.19", l: "CGPA" },
            { n: "2×", l: "AWS Certified" },
            { n: "6", l: "Projects Shipped" },
            { n: "8", l: "Certifications" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-5">
              <div className="font-display text-3xl font-bold gradient-text">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-foreground/60">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Tech Ticker ─────────────────────────────────────────────────────

export function Ticker() {
  const tech = ["Spring Boot", "React", "AWS", "Docker", "PostgreSQL", "Gemini AI", "Kotlin", "Firebase", "WebSocket", "JWT", "Next.js", "TypeScript", "MediaPipe", "scikit-learn", "CI/CD"];
  const loop = [...tech, ...tech];
  return (
    <section className="border-y border-border py-5 overflow-hidden glass">
      <div className="flex animate-marquee whitespace-nowrap">
        {loop.map((t, i) => (
          <div key={i} className="flex items-center gap-6 px-6 font-mono text-sm text-foreground/70">
            <span>{t}</span>
            <Sparkles size={12} className="text-accent" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── About Section ───────────────────────────────────────────────────

export function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeader num="01" title="About Me" kicker="Who I Am" />
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="md:col-span-2 glass rounded-3xl p-8"
        >
          <div className="text-lg leading-relaxed text-foreground/85 space-y-4">
            <p>
              I'm a developer who builds at the intersection of <span className="gradient-text font-semibold">AI, cloud, and full-stack engineering</span>.
            </p>
            <p>
              Twice AWS Certified — Cloud Practitioner (865/1000) and Solutions Architect Associate (992/1000) — I don't just learn cloud, I architect with it.
            </p>
            <p>
              From real-time posture detection with MediaPipe + scikit-learn, to JWT-secured ride-sharing platforms with WebSocket chat, to AI volunteer management systems powered by Gemini 3.5 Flash — I build things that feel inevitable: fast, secure, and absurdly simple to use.
            </p>
            <p className="text-foreground/70">
              <span className="font-mono text-xs uppercase tracking-widest text-accent mr-2">⚙️ Currently:</span>
              Integrating Spring AI, LangChain4j, and AWS Bedrock into production-ready backends to compress what used to take a team into what one developer can ship in a week.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Quick Facts</h3>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li>📍 VIT Bhopal, India</li>
            <li>🎓 B.Tech CS · Cloud Computing & Automation (2027)</li>
            <li>☁️ 2× AWS Certified (SAA + CCP)</li>
            <li>⚡ Full-Stack · AI Backends · Android</li>
            <li>🏆 Hackathon Builder — Mahakumbh Innovation Challenge</li>
            <li className="pt-2 text-accent">🚀 Open to internships & SDE fresher roles</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// ── Navigation Cards (Landing Page Hub) ─────────────────────────────

const navCards = [
  {
    icon: "⚡",
    title: "Technical Skills",
    description: "Languages, frameworks, cloud & DevOps, databases, and AI/ML tools I work with.",
    to: "/skills" as const,
    gradient: "from-violet-500/20 to-purple-600/20",
    iconComponent: Database,
  },
  {
    icon: "🚀",
    title: "Featured Projects",
    description: "Full-stack platforms, AI backends, and Android apps — built to scale.",
    to: "/projects" as const,
    gradient: "from-pink-500/20 to-rose-600/20",
    iconComponent: Rocket,
  },
  {
    icon: "💼",
    title: "Experience & Achievements",
    description: "Competitions, certifications, programs, and campus leadership with real shipped outcomes.",
    to: "/experience" as const,
    gradient: "from-cyan-500/20 to-blue-600/20",
    iconComponent: Code2,
  },
  {
    icon: "📜",
    title: "Certifications",
    description: "AWS, DevOps, McKinsey — always learning, always growing.",
    to: "/certifications" as const,
    gradient: "from-amber-500/20 to-orange-600/20",
    iconComponent: Sparkles,
  },
];

export function NavigationCards() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeader num="02" title="Explore More" kicker="Sections" />
      <div className="grid sm:grid-cols-2 gap-6">
        {navCards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Link
              to={card.to}
              className="group relative block glass rounded-3xl p-8 card-hover overflow-hidden"
            >
              {/* Background glow */}
              <div
                aria-hidden
                className={`absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-3xl bg-gradient-to-br ${card.gradient}`}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{card.icon}</div>
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-accent group-hover:scale-110 group-hover:glow-purple transition-all duration-300">
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">{card.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{card.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Skills Section ──────────────────────────────────────────────────

export function Skills() {
  const groups = [
    { title: "Languages", items: ["Java", "Kotlin", "Python", "JavaScript", "SQL"] },
    { title: "Frontend & Backend", items: ["React", "Vite", "Spring Boot", "Spring Security", "Spring Data JPA", "Flask", "REST APIs", "Hibernate"] },
    { title: "Cloud & DevOps", items: ["AWS", "Docker", "Firebase", "CI/CD", "Render", "Vercel", "Git", "GitHub", "Postman", "Maven"] },
    { title: "Databases & AI/ML", items: ["PostgreSQL", "MySQL", "Supabase", "Scikit-learn", "Gemini API", "Prompt Engineering"] },
  ];
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeader num="01" title="Technical Skills" kicker="My Stack" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="glass rounded-3xl p-6 card-hover"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-border bg-background/40 text-foreground/85">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Project Card & Projects Section ─────────────────────────────────

type Project = {
  icon: string;
  title: string;
  badge: string;
  tech: string[];
  desc: string;
  wins: string;
  github?: string;
  live?: string;
};

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group relative glass rounded-3xl p-8 card-hover overflow-hidden flex flex-col"
    >
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div className="relative flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div className="text-4xl">{p.icon}</div>
          <span className="font-mono text-xs px-3 py-1 rounded-full glass text-accent2">
            {p.badge}
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold mb-4">{p.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {p.tech.map((t) => (
            <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-accent/30 bg-accent/5 text-foreground/80">
              {t}
            </span>
          ))}
        </div>
        <p className="text-foreground/75 leading-relaxed text-sm flex-1">{p.desc}</p>
        <div className="mt-5 pt-5 border-t border-border font-mono text-xs text-foreground/60">
          <span className="text-accent">✓</span> {p.wins}
        </div>
        {/* Action Links */}
        {(p.github || p.live) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-bg-primary text-primary-foreground text-xs font-semibold hover:scale-105 transition-transform"
              >
                <ExternalLink size={12} /> Live Demo
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-foreground/80 hover:text-accent hover:border-accent transition-all"
              >
                <Github size={12} /> Source Code
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const projects: Project[] = [
    {
      icon: "🚗",
      title: "CABO",
      badge: "↗ Live · Featured",
      tech: ["React", "Vite", "Spring Boot", "Spring Security", "PostgreSQL", "WebSocket", "STOMP", "Firebase Auth", "Docker", "Render", "Vercel"],
      desc: "Full-stack college ride-sharing platform — users post rides they're taking, others join. Real-time WebSocket chat (STOMP + SockJS), JWT-secured REST APIs with RBAC, duplicate booking prevention, user reporting + admin moderation, and full CI/CD. Every push to main auto-redeploys frontend (Vercel) and Dockerized backend (Render).",
      wins: "Real-time WebSocket chat · JWT + RBAC · Firebase Auth · Full CI/CD pipeline · Zero duplicate bookings",
      live: "https://cabo-two.vercel.app",
      github: "https://github.com/KDGIT005/CABO",
    },
    {
      icon: "🏥",
      title: "HealthSenseAI",
      badge: "Android · Dual-Stack",
      tech: ["Kotlin", "Material 3", "MVVM", "Android Studio", "Python", "Flask", "scikit-learn", "Gemini API"],
      desc: "AI-powered disease prediction Android app built with Kotlin and Material 3. Complete MVVM architecture with onboarding, dashboard, health insights with charts, predictions, and profile. Dual-stack project: Android frontend + Python ML backend (Flask + scikit-learn + Gemini API) for disease prediction from smartwatch sensor data.",
      wins: "Full MVVM architecture · Material 3 UI · Python ML backend · Designed for Google Fit + TensorFlow Lite integration",
      github: "https://github.com/KDGIT005/HealthSense-AI",
    },
    {
      icon: "🕉️",
      title: "MahaSahayak AI",
      badge: "↗ Live · Hackathon",
      tech: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Gemini 3.5 Flash", "Recharts"],
      desc: "AI-powered volunteer deployment platform for Mahakumbh 2028 — manages 50,000+ volunteers across 10+ zones. Features smart assignment, emergency response in <3s, burnout prevention, and bilingual (Hindi/English) dashboard with the original Bharat Ready Score™ metric.",
      wins: "4 Gemini AI endpoints · Bharat Ready Score™ · Real-time zone heatmap · Hackathon qualifier (Round 2)",
      live: "https://maha-sahayak-ai.vercel.app",
      github: "https://github.com/KDGIT005/MahaSahayak-AI",
    },
    {
      icon: "🧠",
      title: "PostureSense",
      badge: "AI/ML · Desktop",
      tech: ["Python", "MediaPipe", "scikit-learn", "OpenCV", "NumPy", "SciPy", "pygame"],
      desc: "Webcam-based AI posture monitor using Random Forest classifier on 12 biomechanical features from 33 body landmarks. One-Class SVM for personal calibration, specific per-issue coaching (neck, shoulders, torso, spine), streak tracking, and fatigue detection. 100% local — no video leaves the machine.",
      wins: "12-feature biomechanical analysis · Personal calibration via One-Class SVM · Privacy-first local processing",
      github: "https://github.com/KDGIT005/PostureSense",
    },
    {
      icon: "🌱",
      title: "Carbon Fossil Assessment",
      badge: "Climate Tech",
      tech: ["JavaScript", "HTML/CSS", "Node.js", "Express.js", "MySQL", "MongoDB"],
      desc: "Web application quantifying the carbon footprint of Indian coal mines with data-driven insights toward carbon neutrality. Features a calculator, emission charts, geo-location mapping, and actionable sustainability recommendations for government agencies and mine operators.",
      wins: "Mine-specific carbon calculator · Geo-location mapping · Sustainability recommendations",
      github: "https://github.com/KDGIT005/Carbon-Fossil-Assessment-System",
    },
    {
      icon: "🗑️",
      title: "YT Watch Later Cleaner",
      badge: "Chrome Extension",
      tech: ["JavaScript", "HTML", "Chrome Extensions API"],
      desc: "Minimal Chrome Extension that automates bulk removal of videos from YouTube's Watch Later playlist. One-click start, built-in smart delays to avoid YouTube rate limiting, and zero background processes — runs only on demand.",
      wins: "One-click bulk delete · Smart rate-limit avoidance · Lightweight on-demand execution",
      github: "https://github.com/KDGIT005/YouTube-Watch-Later-Cleaner",
    },
  ];
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeader num="01" title="Featured Projects" kicker="Selected Work" />
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
}

// ── Experience & Achievements Section ──────────────────────────────

type Achievement = {
  icon: string;
  title: string;
  organization: string;
  type: string;
  date: string;
  badges?: string[];
  bullets: string[];
  tags: string[];
};

const achievements: Achievement[] = [
  {
    icon: "🏆",
    title: "Hackathon Winner",
    organization: "Expert Hire × VIT Bhopal · Mahakumbh Innovation Challenge",
    type: "Competition",
    date: "2025",
    badges: ["Winner"],
    bullets: [
      "Won the Mahakumbh Innovation Hackathon organized by Expert Hire × VIT Bhopal",
      "Built MahaSahayak AI — a real-time AI volunteer deployment platform for Mahakumbh 2028 powered by Google Gemini 3.5 Flash",
      "Shipped a full Next.js + TypeScript + Tailwind app with 4 live AI API endpoints (assign, emergency, balance, natural language search) within the hackathon window",
      "Invented the Bharat Ready Score™ — an original composite volunteer readiness metric",
      "Deployed live on Vercel: maha-sahayak-ai.vercel.app",
    ],
    tags: ["Next.js", "Gemini AI", "TypeScript", "Hackathon", "Live Deployment"],
  },
  {
    icon: "☁️",
    title: "AWS Certified — Dual Certification",
    organization: "Amazon Web Services",
    type: "Certification Achievement",
    date: "June 2026",
    badges: ["2× Certified", "992/1000"],
    bullets: [
      "AWS Certified Solutions Architect – Associate (SAA-C03) — Score: 992/1000 (near-perfect; top percentile)",
      "AWS Certified Cloud Practitioner (CLF-C02) — Score: 865/1000",
      "Domains covered: Secure Architecture Design, Resilient & High-Performing Systems, Cost-Optimized Cloud Infrastructure, Security & Compliance",
      "Both certifications valid through June 2029",
    ],
    tags: ["AWS", "Cloud", "SAA-C03", "CLF-C02", "Architecture"],
  },
  {
    icon: "🖥️",
    title: "Virtual Internship Program",
    organization: "ServiceNow University × AICTE × SmartBridge",
    type: "Internship",
    date: "May 2026",
    badges: ["Completed"],
    bullets: [
      "Completed structured training across 8 modules: ServiceNow Admin Fundamentals, Agentic AI Introduction, Automated Test Framework (ATF), Flows, Reports & CSA Prep",
      "Earned official Certificate ID: SNU2024599 issued jointly by ServiceNow, AICTE (Ministry of Education), and SmartBridge",
      "Gained hands-on exposure to enterprise ITSM workflows and low-code automation",
      "Prepared for Certified System Administrator (CSA) examination pathway",
    ],
    tags: ["ServiceNow", "ITSM", "Agentic AI", "AICTE", "Enterprise Tech"],
  },
  {
    icon: "📊",
    title: "McKinsey.org Forward Program",
    organization: "McKinsey.org",
    type: "Leadership & Business Program",
    date: "December 2025",
    badges: ["Completed"],
    bullets: [
      "Completed the selective McKinsey.org Forward online learning program",
      "Developed structured problem-solving skills using the McKinsey approach",
      "Trained in effective communication, adaptability, and resilience mindsets",
      "Built a foundational digital toolkit for navigating the future of work",
    ],
    tags: ["Leadership", "Problem Solving", "McKinsey", "Strategy"],
  },
  {
    icon: "⚡",
    title: "Active Member — IEEE VIT Bhopal Student Branch",
    organization: "IEEE VIT Bhopal",
    type: "Technical Club",
    date: "2023 – Present",
    bullets: [
      "Active member of one of India's largest student IEEE branches",
      "Contributed to technical events, workshops, and student community initiatives",
      "Collaborated with fellow developers on tech-driven campus projects",
      "Part of a network connecting students to global engineering and tech opportunities",
    ],
    tags: ["IEEE", "Technical Community", "Leadership", "Networking"],
  },
  {
    icon: "🎭",
    title: "Club Member & Event Contributor",
    organization: "Rajasthani Club · Northeast Club · VIT Bhopal",
    type: "Cultural & Student Activities",
    date: "2023 – Present",
    bullets: [
      "Active member of Rajasthani Club and Northeast Club at VIT Bhopal",
      "Handled multiple roles across clubs: Event Management, Photography, Public Relations",
      "Organized and coordinated cultural events representing regional diversity on campus",
      "Built cross-cultural collaboration and leadership skills outside the classroom",
    ],
    tags: ["Event Management", "Photography", "PR", "Leadership", "Culture"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeader num="01" title="Experience & Achievements" kicker="What I've Done" />
      <div className="grid lg:grid-cols-2 gap-6">
        {achievements.map((item, i) => (
          <motion.article
            key={item.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative glass rounded-3xl p-6 md:p-8 pl-8 md:pl-10 card-hover overflow-hidden"
          >
            <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r gradient-bg-primary" />
            <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" aria-hidden>
                    {item.icon}
                  </span>
                  <span className="font-mono text-xs px-3 py-1 rounded-full glass text-accent">
                    {item.type}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">{item.title}</h3>
                <p className="text-foreground/60 mt-2 text-sm leading-relaxed">{item.organization}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2">
                <span className="font-mono text-xs px-3 py-1.5 rounded-full glass text-foreground/75">
                  {item.date}
                </span>
                {item.badges?.map((badge) => (
                  <span
                    key={badge}
                    className="font-mono text-xs px-3 py-1 rounded-full gradient-bg-primary text-primary-foreground font-semibold"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <ul className="space-y-3">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                  <span className="text-accent font-mono mt-0.5 shrink-0">→</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-accent/30 bg-accent/5 text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

// ── Certifications Section ──────────────────────────────────────────

type Cert = {
  icon: string;
  title: string;
  org: string;
  date: string;
  desc: string;
  score?: string;
  credly?: string;
  verify?: string;
};

function CertCard({ c, i }: { c: Cert; i: number }) {
  return (
    <motion.div
      key={c.title}
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="glass rounded-3xl p-6 card-hover flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{c.icon}</div>
        {c.score && (
          <span className="font-mono text-xs px-3 py-1 rounded-full gradient-bg-primary text-primary-foreground font-bold">
            {c.score}
          </span>
        )}
      </div>
      <h3 className="font-display text-lg font-bold leading-snug">{c.title}</h3>
      <p className="font-mono text-xs text-foreground/60 mt-2">{c.org} · {c.date}</p>
      <p className="mt-4 text-sm text-foreground/75 leading-relaxed flex-1">{c.desc}</p>
      {(c.credly || c.verify) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {c.credly && (
            <a
              href={c.credly}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-accent hover:border-accent transition-all"
            >
              🏅 Credly Badge
            </a>
          )}
          {c.verify && (
            <a
              href={c.verify}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-foreground/60 hover:text-foreground transition-all"
            >
              🔗 Verify
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function Certifications() {
  const featured: Cert[] = [
    {
      icon: "⭐",
      title: "AWS Solutions Architect – Associate",
      org: "Amazon Web Services",
      date: "Jun 2026",
      desc: "Designing distributed systems on AWS — compute, storage, networking, security, and cost optimization. Exam SAA-C03.",
      score: "992 / 1000",
      credly: "https://www.credly.com/badges/e0d44a84-31f9-4d94-a6d0-532134f82fa9/public_url",
      verify: "https://aws.amazon.com/verification",
    },
    {
      icon: "☁️",
      title: "AWS Certified Cloud Practitioner",
      org: "Amazon Web Services",
      date: "Jun 2026",
      desc: "Foundational AWS Cloud services, architecture, pricing, shared responsibility model, and cloud economics. Exam CLF-C02.",
      score: "865 / 1000",
      credly: "https://www.credly.com/badges/0d7be21b-c25a-457f-b1f8-607a44aa32ae/public_url",
      verify: "https://aws.amazon.com/verification",
    },
    {
      icon: "🔷",
      title: "Azure Data Fundamentals (DP-900)",
      org: "Microsoft",
      date: "Jun 2025",
      desc: "Core data concepts, relational and non-relational data on Azure, and analytics workloads.",
      credly: "https://www.credly.com/badges/2c974e8f-7b77-4f67-8f19-050b4b63ab87/public_url",
      verify: "https://verify.certiport.com",
    },
    {
      icon: "📊",
      title: "McKinsey Forward Program",
      org: "McKinsey.org",
      date: "Dec 2025",
      desc: "Problem-solving using the McKinsey approach, communication, adaptability & resilience mindsets, digital toolkit fundamentals.",
      credly: "https://www.credly.com/badges/0e89f80e-3b40-464b-bd12-b30eeaa9d837/public_url",
    },
  ];

  const more: Cert[] = [
    {
      icon: "🔧",
      title: "ServiceNow Virtual Internship",
      org: "ServiceNow × AICTE × SmartBridge",
      date: "May 2026",
      desc: "ServiceNow Admin, Agentic AI, Flows, ATF Essentials, Reports, and CSA exam prep. Certificate ID: SNU2024599.",
    },
    {
      icon: "⚙️",
      title: "IBM DevOps Fundamentals",
      org: "IBM Career Education (IBMCE)",
      date: "Jun 2025",
      desc: "CI/CD pipelines, Docker containerization, infrastructure as code, agile DevOps practices.",
      verify: "https://courses.vit.skillsnetwork.site/certificates/1acd8cb350a048eeb194098a11362b1a",
    },
    {
      icon: "⚙️",
      title: "IBM DevOps, Agile & Design Thinking",
      org: "IBM Career Education (IBMCE)",
      date: "Jun 2025",
      desc: "Agile methodologies, design thinking frameworks, and DevOps culture integration.",
      verify: "https://courses.vit.skillsnetwork.site/certificates/021d86ae4780472e8e506eca922aa6b7",
    },
    {
      icon: "🌐",
      title: "Bits and Bytes of Computer Networking",
      org: "Google (Coursera)",
      date: "Dec 2025",
      desc: "Networking fundamentals — TCP/IP, DNS, DHCP, network troubleshooting, and cloud networking.",
      verify: "https://coursera.org/verify/NN8N8552RMXC",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeader num="01" title="Certifications" kicker="Always Learning" />

      {/* Top 4 */}
      <div className="grid md:grid-cols-2 gap-5">
        {featured.map((c, i) => (
          <CertCard key={c.title} c={c} i={i} />
        ))}
      </div>

      {/* Remaining 5 */}
      <div className="grid md:grid-cols-3 gap-5 mt-6">
        {more.map((c, i) => (
          <CertCard key={c.title} c={c} i={i} />
        ))}
      </div>
    </section>
  );
}

// ── Contact Section ─────────────────────────────────────────────────

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "Failed to send message");
      }
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const contacts = [
    { icon: <Mail size={16} />, label: "kuldeepdhangad@gmail.com", href: "mailto:kuldeepdhangad@gmail.com" },
    { icon: <Phone size={16} />, label: "+91-9664289100", href: "tel:+919664289100" },
    { icon: <Linkedin size={16} />, label: "linkedin.com/in/kuldeepdhangad", href: "https://www.linkedin.com/in/kuldeepdhangad/" },
    { icon: <Github size={16} />, label: "github.com/KDGIT005", href: "https://github.com/KDGIT005" },
    { icon: <Code2 size={16} />, label: "leetcode.com/u/KULDEEP2005", href: "https://leetcode.com/u/KULDEEP2005" },
  ];

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative glass rounded-3xl p-10 md:p-16 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 blur-3xl -z-10"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div className="text-center">
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3">03 — Contact</div>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight">
            Let's <span className="gradient-text">build something</span> remarkable.
          </h2>
          <p className="mt-6 text-foreground/70 max-w-xl mx-auto">
            Open to internships, collaborations, and interesting problems. Drop a message — I respond fast.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-widest text-foreground/60 mb-2">Name</label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass bg-white/[0.03] text-foreground placeholder:text-foreground/30 font-mono text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block font-mono text-xs uppercase tracking-widest text-foreground/60 mb-2">Email</label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass bg-white/[0.03] text-foreground placeholder:text-foreground/30 font-mono text-sm outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-widest text-foreground/60 mb-2">Message</label>
            <textarea
              id="contact-message"
              required
              rows={5}
              placeholder="Tell me about your project or idea..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass bg-white/[0.03] text-foreground placeholder:text-foreground/30 font-mono text-sm outline-none focus:border-accent transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full gradient-bg-primary text-primary-foreground font-semibold glow-purple hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? (
              <>
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Sending...
              </>
            ) : status === "sent" ? (
              <>✓ Message Sent!</>
            ) : status === "error" ? (
              <>✕ Failed — try again</>
            ) : (
              <>
                <Send size={16} /> Send Message
              </>
            )}
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass text-sm hover:border-accent hover:text-accent transition-all"
            >
              {c.icon}
              <span className="font-mono text-xs">{c.label}</span>
              <ExternalLink size={12} className="opacity-50" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
