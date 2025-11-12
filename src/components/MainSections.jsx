import React from "react";
import { ArrowRight, Github } from "lucide-react";
import { Reveal, RevealStagger } from "../components/scroll animation/Reveal";
import kalki from "../assets/kalki.jpg";
import logo from "../assets/logo.png";
import yawaytechlogo from "../assets/yawaytechlogo.jpg";
import velinfotechlogo from "../assets/velinfotechlogo.png";
import ContactModal from "../components/ContactModal";

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
        @keyframes shine { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
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

// --- Reusable compact project card with hover animation ---
const ProjectCard = ({ title, blurb, category, image, tags = [], href = "#" }) => (
  <a
    href={href}
    className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-black border border-white/10
               focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black
               transform transition-transform duration-300 ease-out
               hover:-translate-y-1 hover:shadow-[0_16px_44px_-12px_rgba(139,92,246,0.35)]
               active:-translate-y-1 active:shadow-[0_16px_44px_-12px_rgba(139,92,246,0.35)]
               cursor-pointer select-none"
    aria-label={`${title} – ${category}`}
    rel="noopener noreferrer"
    style={{ WebkitTapHighlightColor: "transparent" }}
  >
    {/* soft gradient glow */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0
                 transition duration-500 blur-md
                 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100"
      style={{
        background:
          "radial-gradient(60% 50% at 50% 0%, rgba(168,85,247,0.25), rgba(59,130,246,0.20), transparent 70%)",
      }}
    />

    {/* media */}
    <div className="aspect-[16/10] overflow-hidden shrink-0">
      <img
        src={image}
        alt={`${title} preview`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-110 group-focus-within:scale-110"
        loading="lazy"
        decoding="async"
        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
      />
    </div>

    {/* content */}
    <div className="p-4 flex flex-col flex-1 relative">
      <div className="text-[10px] uppercase tracking-widest text-purple-400">{category}</div>
      <h3 className="mt-1 text-lg md:text-xl font-bold">{title}</h3>
      <p className="text-gray-400 mt-1.5 text-sm">{blurb}</p>

      <div className="mt-3 flex flex-wrap gap-1.5 mt-auto">
        {tags.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-full bg-black border border-white/10 text-xs text-gray-200"
          >
            {t}
          </span>
        ))}
      </div>
    </div>

    {/* shimmer sweep */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
                 transition group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100"
      style={{
        background:
          "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: "shine 1.6s linear infinite",
      }}
    />
  </a>
);

const MainSections = () => {
  // ✅ Correct place for modal state
  const [contactOpen, setContactOpen] = React.useState(false);

  const projects = [
    {
      title: "Yabookit",
      blurb: "Movie ticket booking web app with showtimes, seat selection, and secure checkout.",
      category: "Full Stack",
      image: logo,
      tags: ["React", "Express", "MongoDB", "JWT"],
      href: "#", // TODO: replace with your live/demo or repo link
    },
    {
      title: "YawayTech Website",
      blurb: "Corporate site showcasing services, projects, and contact—optimized for performance.",
      category: "Frontend",
      image: yawaytechlogo,
      tags: ["React", "Vite", "TailwindCSS"],
      href: "https://www.yawaytech.com",
    },
    {
      title: "Vel Infotech Website",
      blurb: "IT training institute site highlighting courses, hands-on learning, and placement support.",
      category: "Frontend",
      image: velinfotechlogo,
      tags: ["React", "Vite", "TailwindCSS"],
      href: "https://www.vellinfotech.com",
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
              href="https://github.com/kalkiramsaravananoff-code"
              target="_blank"
              rel="noopener noreferrer"
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
              { title: "Frontend (1 yr)", desc: "React + Tailwind: responsive layouts, forms, modals, routing, basic accessibility." },
              { title: "Backend (1 yr)", desc: "Node + Express + MongoDB: CRUD APIs, JWT auth, input validation, error handling." },
              { title: "Delivery & Tools", desc: "Git & GitHub, Vite, ENV configs, simple CI, and deploys to Vercel/Netlify." }
            ].map((c) => (
              <div key={c.title} className="group relative">
                {/* glow */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0
                             transition duration-500 blur-md
                             group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100"
                  style={{
                    background:
                      "radial-gradient(60% 50% at 50% 0%, rgba(168,85,247,0.25), rgba(59,130,246,0.2), transparent 70%)",
                  }}
                />
                <div
                  className="relative rounded-2xl border border-white/10 bg-black p-5
                             transition-transform duration-300 ease-out
                             hover:-translate-y-1 hover:shadow-[0_14px_40px_-10px_rgba(139,92,246,0.35)]
                             active:-translate-y-1 active:shadow-[0_14px_40px_-10px_rgba(139,92,246,0.35)]
                             focus-within:-translate-y-1 focus-within:shadow-[0_14px_40px_-10px_rgba(139,92,246,0.35)]
                             ring-0 hover:ring-1 hover:ring-purple-500/40 active:ring-1 active:ring-purple-500/40"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {/* shimmer */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
                               transition group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                      animation: "shine 1.6s linear infinite",
                    }}
                  />
                  <h4 className="relative font-semibold text-base md:text-lg">{c.title}</h4>
                  <p className="relative text-gray-400 mt-1 text-sm md:text-base">{c.desc}</p>
                </div>
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
              I’m a junior full-stack developer with <strong>1 year</strong> of hands-on experience
              building responsive React/Node apps. I focus on clean UI, accessible components, and
              reliable APIs—shipping fast without skipping quality.
            </p>
            <ul className="mt-4 space-y-2 text-gray-300 text-sm md:text-base">
              <li>• <strong>Frontend:</strong> React, Vite, Tailwind — reusable components, forms/validation, routing.</li>
              <li>• <strong>Backend:</strong> Node.js, Express, MongoDB — REST APIs, JWT auth, error handling.</li>
              <li>• <strong>Quality & DX:</strong> Git/GitHub, ESLint/Prettier, env configs, readable commits.</li>
              <li>• <strong>Delivery:</strong> Deploys to Vercel/Netlify, simple CI, clear docs & handoff.</li>
            </ul>
          </div>

          <div className="order-1 md:order-2">
            <div className="group relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] mx-auto">
              {/* soft glow behind on hover/tap */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0
                           transition duration-500 blur-md
                           group-hover:opacity-100 group-active:opacity-100"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 0%, rgba(168,85,247,0.25), rgba(59,130,246,0.20), transparent 70%)",
                }}
              />

              <div
                className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black
                           transform transition-all duration-300 ease-out
                           group-hover:-translate-y-1 group-active:-translate-y-1
                           group-hover:shadow-[0_16px_44px_-12px_rgba(139,92,246,0.35)]
                           group-active:shadow-[0_16px_44px_-12px_rgba(139,92,246,0.35)]
                           ring-0 group-hover:ring-1 group-active:ring-1 group-hover:ring-purple-500/40 group-active:ring-purple-500/40"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {/* image zoom on hover/tap */}
                <img
                  src={kalki}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-500
                             group-hover:scale-105 group-active:scale-105"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width:768px) 300px, (min-width:640px) 260px, 220px"
                />

                {/* subtle shimmer sweep */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
                             transition group-hover:opacity-100 group-active:opacity-100"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shine 1.6s linear infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — replaces HIGHLIGHTS */}
      <section
        id="banner" /* keep the same id so existing nav links still work */
        className="scroll-mt-24 md:scroll-mt-28 py-10 md:py-14 px-5 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#1a1026] via-[#1b1430] to-[#181224] p-5 sm:p-6 md:p-8 shadow-[0_10px_40px_-10px_rgba(139,92,246,0.35)]">
            {/* soft ambient glows */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 60% at 10% 10%, rgba(168,85,247,0.25), transparent 60%), radial-gradient(70% 60% at 90% 90%, rgba(99,102,241,0.22), transparent 60%)",
              }}
            />
            {/* subtle top shine & inner ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-white/10" />
            <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/5" />

            {/* content */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 justify-between">
              <div className="max-w-3xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                  Let’s build a fast, beautiful website.
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-300">
                  Modern UI, strong SEO, and smooth interactions—tailored to your brand.
                </p>
              </div>

              <div className="w-full md:w-auto">
                <a
                  href="#contact" /* or mailto:hello@example.com */
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2.5 rounded-full font-semibold text-white bg-violet-500 hover:bg-violet-400 transition-colors ring-1 ring-white/20 shadow-[0_8px_30px_rgba(139,92,246,0.35)] focus:outline-none focus:ring-2 focus:ring-violet-400/60"
                >
                  Start a project
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="-mr-0.5">
                    <path d="M13.172 12 7.808 6.636l1.414-1.414L16 12l-6.778 6.778-1.414-1.414z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
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
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 font-semibold text-sm inline-flex items-center gap-2"
            >
              Start a Conversation <ArrowRight size={16} />
            </button>
            <a
              href="https://github.com/kalkiramsaravananoff-code"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-white hover:bg-gray-800/40 transition-colors font-semibold text-sm inline-flex items-center gap-2"
            >
              View GitHub <Github size={16} />
            </a>
          </RevealStagger>
          <Reveal>
            <p className="text-gray-400 mt-5 text-sm md:text-base">
              Prefer LinkedIn?{" "}
              <a
                className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
                href="https://www.linkedin.com/in/your-username"
                target="_blank"
                rel="noopener noreferrer"
              >
                Let’s connect
              </a>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ✅ Mount the modal once */}
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        whatsappNumber="8760564164"            // ← your number (country code, no +)
        defaultEmail="kalkiramsaravananoff@gmail.com"
      />
    </>
  );
};

export default MainSections;
