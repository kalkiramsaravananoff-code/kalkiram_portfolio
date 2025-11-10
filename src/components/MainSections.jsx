import React from "react";
import { ArrowRight, Github } from "lucide-react";
import { Reveal, RevealStagger } from "../components/scroll animation/Reveal";

// ---------- Animated coding background (reusable, no framer-motion) ----------
const CodingBackdrop = ({
  glowPos = "rt",      // 'rt' | 'rb' | 'lt' | 'lb'
  gridSize = 28,       // px
  glowOpacity = 0.18,  // 0.0 - 1.0
  glyphs = true,       // show floating code glyphs
  glyphOpacity = 0.15, // 0.0 - 1.0
}) => {
  const posMap = { rt: "90% 10%", rb: "90% 90%", lt: "10% 10%", lb: "10% 90%" };
  const at = posMap[glowPos] || posMap.rt;

  const codeGlyphs = [
    { t: "<div/>", left: "8%",  top: "10%", size: "text-3xl"  },
    { t: "{ }",    left: "78%", top: "14%", size: "text-5xl"  },
    { t: "</>",    left: "64%", top: "26%", size: "text-4xl"  },
    { t: "()",     left: "18%", top: "32%", size: "text-4xl"  },
    { t: "[]",     left: "86%", top: "38%", size: "text-3xl"  },
    { t: "=>",     left: "10%", top: "62%", size: "text-4xl"  },
    { t: "<Tag/>", left: "70%", top: "70%", size: "text-3xl"  },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* local keyframes (no global CSS needed) */}
      <style>{`
        @keyframes fadePulse { 0%{opacity:.4} 50%{opacity:.65} 100%{opacity:.4} }
        @keyframes floatYSlow { 0%{transform:translateY(0)} 50%{transform:translateY(8px)} 100%{transform:translateY(0)} }
        @keyframes glyphFloat { 0%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-12px) rotate(-4deg)} 100%{transform:translateY(0) rotate(0)} }
      `}</style>

      {/* radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(80% 60% at ${at}, rgba(168,85,247,${glowOpacity}), transparent 60%)`,
          animation: "fadePulse 10s ease-in-out infinite",
        }}
      />
      {/* subtle animated grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px`,
          backgroundPosition: "0px 0px, 0px 0px",
          animation: "floatYSlow 12s ease-in-out infinite",
        }}
      />
      {/* floating code glyphs */}
      {glyphs &&
        codeGlyphs.map((g, i) => (
          <span
            key={i}
            className={`absolute font-mono ${g.size} select-none`}
            style={{
              left: g.left,
              top: g.top,
              color: `rgba(255,255,255,${glyphOpacity})`,
              animation: `glyphFloat ${6 + (i % 4)}s ease-in-out ${i * 0.25}s infinite`,
            }}
          >
            {g.t}
          </span>
        ))}
    </div>
  );
};

// --------- Helper UI bits (compact) ---------
const SectionTitle = ({ pre, highlight, post, subtitle }) => (
  <div className="mb-8 text-center">
    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
      {pre} <span className="text-purple-500">{highlight}</span> {post}
    </h2>
    {subtitle && (
      <p className="text-sm md:text-base text-gray-400 mt-3 max-w-3xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

const Tag = ({ children }) => (
  <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-xs text-gray-200 backdrop-blur-sm">
    {children}
  </span>
);

// --- Reusable compact project card (equal height, black box) ---
const ProjectCard = ({ title, blurb, category, image, tags = [], href = "#" }) => (
  <a
    href={href}
    className="group relative flex flex-col h-full rounded-xl overflow-hidden bg-black border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    aria-label={`${title} – ${category}`}
    rel="noopener noreferrer"
  >
    {/* media */}
    <div className="aspect-[16/10] overflow-hidden shrink-0">
      <img
        src={image}
        alt={`${title} preview`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        decoding="async"
        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
      />
    </div>

    {/* content */}
    <div className="p-4 flex flex-col flex-1">
      <div className="text-[10px] uppercase tracking-widest text-purple-400">
        {category}
      </div>
      <h3 className="mt-1 text-lg md:text-xl font-bold">{title}</h3>
      <p className="text-gray-400 mt-1.5 text-sm">{blurb}</p>

      {/* push tags to bottom for consistent heights */}
      <div className="mt-3 flex flex-wrap gap-1.5 mt-auto">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>

    {/* subtle ring + glow on hover */}
    <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition" />
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-px rounded-[14px] opacity-0 group-hover:opacity-100 blur-xl transition"
      style={{
        background:
          "radial-gradient(60% 50% at 50% 0%, rgba(168,85,247,0.22), rgba(59,130,246,0.18), transparent 70%)",
      }}
    />
  </a>
);

const MainSections = () => {
  const projects = [
    {
      title: "Campus Connect",
      blurb: "A mini social portal for clubs & events with role-based dashboards.",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop",
      tags: ["React", "Express", "MongoDB", "JWT"],
      href: "#",
    },
    {
      title: "Expense Tracker",
      blurb: "Personal finance web app with charts and CSV import/export.",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=900&fit=crop",
      tags: ["React", "Chart.js", "LocalStorage"],
      href: "#",
    },
    {
      title: "AI Job Helper",
      blurb: "Resume analyzer that maps JD keywords to resume gaps.",
      category: "Tools",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=900&fit=crop",
      tags: ["Python", "Flask", "NLP"],
      href: "#",
    },
  ];

  const skills = [
    "React", "JavaScript", "Node.js", "Express", "MongoDB",
    "TailwindCSS", "HTML", "CSS", "Git", "Figma", "REST APIs",
  ];

  return (
    <>
      {/* PROJECTS — compact 3-up with animated bg */}
      <section
        id="work"
        className="scroll-mt-24 md:scroll-mt-28 py-10 md:py-16 px-5 relative overflow-hidden bg-gradient-to-b from-black to-gray-900"
      >
        <CodingBackdrop glowPos="rt" glyphs gridSize={24} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <Reveal>
            <SectionTitle
              pre="Featured"
              highlight="Projects"
              post=""
              subtitle="A few things I’ve built recently as a fresher to learn, ship, and iterate."
            />
          </Reveal>

          <RevealStagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            stagger={0.08}
            delayChildren={0.04}
          >
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </RevealStagger>

          <Reveal className="text-center mt-8">
            <a
              href="#"
              className="text-sm md:text-base inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold"
            >
              View more on GitHub <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* SKILLS — animated bg (no motion) */}
      <section className="scroll-mt-24 md:scroll-mt-28 py-10 md:py-16 px-5 relative overflow-hidden">
        <CodingBackdrop glowPos="lt" glyphs={false} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <Reveal>
            <SectionTitle pre="Skills &" highlight="Stack" post="" subtitle="Practical tools I use to design, build, and deploy." />
          </Reveal>

          <RevealStagger className="flex flex-wrap justify-center gap-2.5">
            {skills.map((s) => (
              <span
                key={s}
                tabIndex={0}
                className="group relative px-2.5 py-0.5 rounded-full bg-black border border-white/10 text-xs text-gray-200 transition focus:outline-none focus:ring-2 focus:ring-purple-500/40 transform hover:-translate-y-0.5 active:scale-95 hover:ring-2 hover:ring-purple-500/30"
              >
                {/* soft gradient wash on hover/focus */}
                <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-blue-500/10" />
                <span className="relative">{s}</span>
              </span>
            ))}
          </RevealStagger>

          <RevealStagger className="grid md:grid-cols-3 gap-3 mt-8">
            {[
              { title: "Clean, Accessible UI", desc: "Keyboard-friendly components, color contrast, and semantic HTML." },
              { title: "API-first", desc: "RESTful patterns, error states, and loading skeletons." },
              { title: "Deploy Ready", desc: "ENV configs, basic CI, and zero-downtime deploys." }
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-white/10 bg-black p-5">
                <h4 className="font-semibold text-base md:text-lg">{c.title}</h4>
                <p className="text-gray-400 mt-1 text-sm md:text-base">{c.desc}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ABOUT — animated bg (smaller image, no motion) */}
      <section
        id="about"
        className="scroll-mt-24 md:scroll-mt-28 py-10 md:py-14 px-4 relative overflow-hidden bg-gray-900"
      >
        <CodingBackdrop glowPos="rb" glyphs />
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div className="order-2 md:order-1">
            <SectionTitle pre="About" highlight="Me" post="" />
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              I’m a self-driven fresher with a year of focused learning and real project work. I love turning ideas into delightful interfaces
              and reliable web apps. I’m quick to learn, enjoy code reviews, and document what I build.
            </p>
            <ul className="mt-4 space-y-2 text-gray-300 text-sm md:text-base">
              <li>• Strong with React, JavaScript, and modern CSS</li>
              <li>• Comfortable with Node.js, Express, MongoDB</li>
              <li>• UX thinking: wireframes → prototypes → polish</li>
              <li>• Communicate clearly and iterate fast</li>
            </ul>
          </div>

          <div className="order-1 md:order-2">
            <div className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1000&h=1000&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width:768px) 300px, (min-width:640px) 260px, 220px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS (replaces TIMELINE) — animated bg */}
      <section
        id="timeline"
        className="scroll-mt-24 md:scroll-mt-28 py-10 md:py-14 px-5 relative overflow-hidden"
      >
        <CodingBackdrop glowPos="lb" glyphs />
        <div className="relative z-10 max-w-7xl mx-auto">
          <Reveal>
            <SectionTitle
              pre="Early Career"
              highlight="Highlights"
              post=""
              subtitle="Education, certifications, and a few wins that show how I learn and build."
            />
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* Education */}
            <div className="rounded-xl border border-white/10 bg-black p-5">
              <div className="text-[11px] uppercase tracking-widest text-purple-400">Education</div>
              <h3 className="mt-1 font-bold text-lg">B.Tech / B.E. (Computer Science)</h3>
              <p className="text-gray-400 text-sm mt-1">Your College Name • 2020–2024</p>
              <ul className="mt-3 space-y-1.5 text-gray-300 text-sm">
                <li>• CGPA: 8.2 / 10</li>
                <li>• Final-year project: Campus Connect</li>
                <li>• Core CS: DS&A, OS, DBMS, Networks</li>
              </ul>
            </div>

            {/* Certifications */}
            <div className="rounded-xl border border-white/10 bg-black p-5">
              <div className="text-[11px] uppercase tracking-widest text-purple-400">Certifications</div>
              <h3 className="mt-1 font-bold text-lg">Industry-recognized</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <Tag>React Basics</Tag><Tag>Node.js</Tag><Tag>MongoDB</Tag>
                <Tag>Git & GitHub</Tag><Tag>REST APIs</Tag>
              </div>
              <p className="text-gray-400 text-sm mt-3">Plus course tracks on JS, CSS-in-Depth, and API design.</p>
            </div>

            {/* Achievements */}
            <div className="rounded-xl border border-white/10 bg-black p-5">
              <div className="text-[11px] uppercase tracking-widest text-purple-400">Achievements</div>
              <h3 className="mt-1 font-bold text-lg">Hackathons & Wins</h3>
              <ul className="mt-3 space-y-1.5 text-gray-300 text-sm">
                <li>• Top 10, College Hackathon — Campus Connect prototype</li>
                <li>• Built AI Job Helper in 24 hrs (NLP keywords → resume gaps)</li>
                <li>• 20+ issues fixed in personal/open-source projects</li>
              </ul>
            </div>
          </RevealStagger>

          <Reveal className="text-center mt-8">
            <a
              href="/resume.pdf"
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 font-semibold text-sm inline-flex items-center gap-2"
            >
              Download Resume
            </a>
          </Reveal>
        </div>
      </section>

      {/* CONTACT — animated bg */}
      <section
        id="contact"
        className="scroll-mt-24 md:scroll-mt-28 py-10 md:py-14 px-5 relative overflow-hidden bg-black"
      >
        <CodingBackdrop glowPos="rt" glyphs />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <SectionTitle pre="Let’s" highlight="Collaborate" post="" subtitle="Have a project or an idea? I’d love to help ship it." />
          </Reveal>
          <RevealStagger className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:hello@example.com"
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 font-semibold text-sm inline-flex items-center gap-2"
            >
              Start a Conversation <ArrowRight size={16} />
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-full border border-white/15 hover:bg-white/5 font-semibold text-sm inline-flex items-center gap-2"
            >
              View GitHub <Github size={16} />
            </a>
          </RevealStagger>
          <Reveal>
            <p className="text-gray-400 mt-5 text-sm md:text-base">
              Prefer LinkedIn?{" "}
              <a className="text-purple-400 hover:text-purple-300 underline underline-offset-4" href="#">
                Let’s connect
              </a>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default MainSections;
