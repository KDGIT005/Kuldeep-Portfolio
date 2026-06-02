import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowDown, Mail, Phone, Linkedin, Github, Code2, ExternalLink, Sparkles, Cpu, Cloud, Database, Rocket, Menu, X, Send } from "lucide-react";
import BootIntro from "./BootIntro";
import CursorTrail from "./CursorTrail";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function SectionHeader({ num, title, kicker }: { num: string; title: string; kicker?: string }) {
  return (
    <motion.div
      variants={sectionFade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-14"
    >
      <div className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3">{num} — {kicker ?? title}</div>
      <div className="flex items-end gap-6">
        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
          {title.split(" ").map((w, i, arr) => (
            <span key={i} className={i === arr.length - 1 ? "gradient-text" : ""}>
              {w}{i < arr.length - 1 ? " " : ""}
            </span>
          ))}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/40 to-transparent mb-3" />
      </div>
    </motion.div>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { l: "About", h: "#about" },
    { l: "Skills", h: "#skills" },
    { l: "Projects", h: "#projects" },
    { l: "Experience", h: "#experience" },
    { l: "Contact", h: "#contact" },
  ];
  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-5xl px-4">
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-[0_10px_40px_-10px_oklch(0.65_0.25_305/0.35)]">
        <a href="#top" className="font-display font-bold text-lg">
          <span className="gradient-text">Kuldeep</span>
          <span className="text-foreground/60 font-mono text-xs ml-1">.dev</span>
        </a>
        <ul className="hidden md:flex gap-7 text-sm text-foreground/70">
          {links.map((l) => (
            <li key={l.l}>
              <a href={l.h} className="hover:text-foreground transition-colors">{l.l}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full gradient-bg-primary text-primary-foreground text-sm font-semibold glow-purple hover:scale-105 transition-transform">
          Let's Talk
        </a>
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full glass text-foreground/80 hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mt-2 glass rounded-2xl p-4 shadow-[0_20px_60px_-15px_oklch(0.65_0.25_305/0.4)]"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.l}>
                  <a
                    href={l.h}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm text-foreground/80 hover:text-foreground hover:bg-white/5 transition-all"
                  >
                    {l.l}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block mt-2 text-center px-4 py-2.5 rounded-full gradient-bg-primary text-primary-foreground text-sm font-semibold"
                >
                  Let's Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

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

function Hero() {
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
          <span className="text-foreground/70">Available for opportunities · India</span>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-6 text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto font-display">
          <span className="gradient-text font-bold text-xl md:text-2xl">Kuldeep Dhangad</span>
          <span className="text-foreground/50 mx-2">—</span>
          B.Tech CS student at VIT Bhopal specializing in Cloud Computing.
          I craft full-stack platforms, AI backends, and Android apps that turn complex problems into elegant products.
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-4 font-display font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight text-foreground/60"
        >
          Building <span className="gradient-text">AI-powered</span> systems
          <br />
          that <span className="gradient-text">scale</span> with the cloud
        </motion.h1>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-bg-primary text-primary-foreground font-semibold glow-purple hover:scale-105 transition-transform"
          >
            <Sparkles size={18} /> View My Work
          </a>
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
            { n: "8.03", l: "CGPA" },
            { n: "70%", l: "Time Saved via AI" },
            { n: "6+", l: "REST APIs" },
            { n: "3", l: "Certifications" },
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

function Ticker() {
  const tech = ["Spring Boot", "React", "AWS", "Docker", "PostgreSQL", "Gemini API", "Kotlin", "Firebase", "CI/CD", "WebSocket"];
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

function About() {
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
          <p className="text-lg leading-relaxed text-foreground/85">
            I'm a developer who lives at the intersection of <span className="gradient-text font-semibold">AI, cloud, and full-stack engineering</span>.
            From real-time biometric ML pipelines to JWT-secured ride-sharing platforms, I love building systems that feel inevitable —
            fast, secure, and beautifully simple to use.
          </p>
          <p className="mt-5 text-foreground/70 leading-relaxed">
            Currently exploring how Gemini, Spring Boot, and modern cloud infra can compress what used to take a team into what one developer can ship in a week.
          </p>
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
            <li>🎓 B.Tech CS · Cloud Computing</li>
            <li>⚡ AI Backend · Full-Stack · Android</li>
            <li>🚀 Open to internships & collabs</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { title: "Languages", items: ["Java", "Kotlin", "Python", "JavaScript", "SQL"] },
    { title: "Frontend & Backend", items: ["React", "Vite", "Spring Boot", "Spring Security", "Spring Data JPA", "Flask", "REST APIs", "Hibernate"] },
    { title: "Cloud & DevOps", items: ["AWS", "Docker", "Firebase", "CI/CD", "Render", "Vercel", "Git", "GitHub", "Postman", "Maven"] },
    { title: "Databases & AI/ML", items: ["PostgreSQL", "MySQL", "Supabase", "Scikit-learn", "Gemini API", "Prompt Engineering"] },
  ];
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeader num="02" title="Technical Skills" kicker="My Stack" />
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

type Project = {
  icon: string;
  title: string;
  badge: string;
  tech: string[];
  desc: string;
  wins: string;
};

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group relative glass rounded-3xl p-8 card-hover overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
      />
      <div className="relative">
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
        <p className="text-foreground/75 leading-relaxed text-sm">{p.desc}</p>
        <div className="mt-5 pt-5 border-t border-border font-mono text-xs text-foreground/60">
          <span className="text-accent">✓</span> {p.wins}
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  const projects: Project[] = [
    {
      icon: "🚗",
      title: "CABO",
      badge: "↗ Live",
      tech: ["React", "Spring Boot", "PostgreSQL", "WebSocket", "Docker", "Firebase"],
      desc: "Full-stack college ride-sharing platform with 6+ JWT-secured REST APIs, real-time WebSocket chat (STOMP + SockJS), admin moderation with RBAC, and zero duplicate bookings. Deployed on Render + Vercel with automatic CI/CD.",
      wins: "0% invalid join requests · Full admin moderation · Firebase Auth",
    },
    {
      icon: "🏥",
      title: "HealthSenseAI",
      badge: "Android",
      tech: ["Kotlin", "MVVM", "Python Flask", "Scikit-learn", "Gemini API", "Firebase"],
      desc: "Android health monitoring app generating 6+ biometric parameters every 10 seconds. Cloud-hosted ML API classifies users into 3 risk levels via a 4-layer pipeline: Sensor → ML → Gemini → UI.",
      wins: "~70% reduction in manual input · 3-level ML risk classification · Retrofit REST",
    },
  ];
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeader num="03" title="Featured Projects" kicker="Selected Work" />
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
}

function Experience() {
  const bullets = [
    "Built AI-powered health monitoring features using OpenAI APIs and cloud-based backend services",
    "Developed REST APIs in Spring Boot for AI-driven symptom analysis and recommendations",
    "Integrated real-time biometric simulation into a 4-layer ML inference pipeline",
    "Reduced manual health-report generation time by 70% via response automation",
  ];
  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeader num="04" title="Experience" kicker="Where I've Worked" />
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative glass rounded-3xl p-8 pl-10 card-hover"
      >
        <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r gradient-bg-primary" />
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="font-display text-2xl font-bold">AI Backend Developer Intern</h3>
            <p className="text-foreground/60 mt-1">Self-Initiated / Freelance · Remote</p>
          </div>
          <span className="font-mono text-xs px-3 py-1.5 rounded-full glass text-accent">
            Jan 2026 – Present
          </span>
        </div>
        <ul className="space-y-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-foreground/85">
              <span className="text-accent font-mono mt-0.5">→</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

function Certifications() {
  const certs = [
    { icon: "☁️", title: "AWS Cloud Practitioner Essentials", org: "Amazon Web Services", date: "May 2025", desc: "Foundational AWS Cloud services, architecture, pricing, and the shared responsibility model." },
    { icon: "⚙️", title: "DevOps Fundamentals", org: "IBM Career Education", date: "Jun 2025", desc: "CI/CD pipelines, Docker containerization, infrastructure as code, agile DevOps practices." },
    { icon: "📊", title: "McKinsey Forward Program", org: "McKinsey.org", date: "Dec 2025", desc: "Structured problem-solving — hypothesis-driven thinking and data-driven decision-making." },
  ];
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <SectionHeader num="05" title="Certifications" kicker="Always Learning" />
      <div className="grid md:grid-cols-3 gap-5">
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="glass rounded-3xl p-6 card-hover"
          >
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="font-display text-lg font-bold leading-snug">{c.title}</h3>
            <p className="font-mono text-xs text-foreground/60 mt-2">{c.org} · {c.date}</p>
            <p className="mt-4 text-sm text-foreground/75 leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
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
    { icon: <Linkedin size={16} />, label: "linkedin.com/in/kuldeep-dhangad", href: "https://linkedin.com/in/kuldeep-dhangad" },
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
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-accent mb-3">06 — Contact</div>
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

function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-foreground/60">
        <span>Built by Kuldeep Dhangad · 2026</span>
        <span className="gradient-text">React · TanStack Start · Deployed on Cloudflare</span>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("kd_booted");
    if (seen) setBooted(true);
  }, []);

  const finish = () => {
    sessionStorage.setItem("kd_booted", "1");
    setBooted(true);
  };

  return (
    <>
      <CursorTrail />
      <AnimatePresence>{!booted && <BootIntro key="intro" onFinish={finish} />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 16 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen text-foreground"
      >
        <Navbar />
        <Hero />
        <Ticker />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </motion.div>
    </>
  );
}
