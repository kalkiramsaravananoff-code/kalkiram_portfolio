import React from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* --- Mobile chip data & animation variants --- */
const stackChips = [
  "React",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "TailwindCSS",
  "HTML",
  "CSS",
  "Git",
  "Figma",
  "REST APIs",
];

const chipContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
};

const chipItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

// tiny code snippets per tech (for mobile chip popups)
const chipCodeMap = {
  React: "const App = () => <UI />;",
  JavaScript: "const sum = (a,b) => a + b;",
  "Node.js": 'app.get("/api", handler);',
  Express: "router.post('/login', ctrl);",
  MongoDB: "db.users.find({ active: true });",
  TailwindCSS: 'className="flex gap-2"',
  HTML: "<section>Portfolio</section>",
  CSS: ".card { border-radius: 9999px; }",
  Git: "git commit -m 'feat: hero'",
  Figma: "Design → Handoff → Dev",
  "REST APIs": "GET /api/projects/1",
};

// code lines — now only for the RIGHT SIDE overlay
const heroCodeLines = [
  {
    text: 'fetch("/api/projects").then(res => res.json())',
    top: "18%",
    left: "10%",
  },
  {
    text: "useEffect(() => initDashboard(), [])",
    top: "35%",
    left: "22%",
  },
  {
    text: "return <Layout routes={protectedRoutes} />",
    top: "56%",
    left: "14%",
  },
  {
    text: "app.post('/api/login', validateUser)",
    top: "72%",
    left: "28%",
  },
];

const Hero = ({ ySlow, yFast }) => {
  const [parallaxSlow, setParallaxSlow] = React.useState(0);
  const [parallaxFast, setParallaxFast] = React.useState(0);

  // mobile chip popup state
  const [activeChip, setActiveChip] = React.useState(null);

  // hero-wide hover state
  const [isHeroHover, setIsHeroHover] = React.useState(false);

  const handleChipClick = (label) => {
    setActiveChip(label);
    setTimeout(() => {
      setActiveChip((current) => (current === label ? null : current));
    }, 650);
  };

  // Parallax subscriptions
  React.useEffect(() => {
    if (ySlow && typeof ySlow.on === "function") {
      const unsub = ySlow.on("change", (v) => setParallaxSlow(v || 0));
      return () => unsub && unsub();
    }
  }, [ySlow]);

  React.useEffect(() => {
    if (yFast && typeof yFast.on === "function") {
      const unsub = yFast.on("change", (v) => setParallaxFast(v || 0));
      return () => unsub && unsub();
    }
  }, [yFast]);

  return (
    <motion.section
      id="home"
      className="relative min-h-[100vh] flex items-start md:items-center pt-16 md:pt-24 overflow-hidden"
      onHoverStart={() => setIsHeroHover(true)}
      onHoverEnd={() => setIsHeroHover(false)}
    >
      {/* RIGHT-HALF overlay only — avoids overlapping left text */}
      <AnimatePresence>
        {isHeroHover && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* soft gradient tint only on right side */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/12 via-slate-900/0 to-blue-500/16" />

            {/* floating hero-wide code lines (but confined to right-half area) */}
            {heroCodeLines.map((line, index) => (
              <motion.div
                key={index}
                className="absolute text-[10px] md:text-[11px] font-mono text-emerald-300/70"
                style={{ top: line.top, left: line.left }}
                animate={{
                  y: [-6, 6, -6],
                  opacity: [0.25, 0.6, 0.25],
                }}
                transition={{
                  duration: 10 + index * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* gradient blobs */}
      <div
        className="pointer-events-none absolute -top-28 -left-28 w-[22rem] h-[22rem] rounded-full bg-purple-500/20 blur-2xl transition-transform duration-150 ease-out"
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-28 w-[22rem] h-[22rem] rounded-full bg-blue-500/20 blur-2xl transition-transform duration-150 ease-out"
        style={{ transform: `translateY(${parallaxFast}px)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10 md:-mt-6 lg:-mt-10">
        {/* LEFT: copy */}
        <div>
          <p className="text-xs md:text-sm tracking-widest text-purple-400 mb-3">
            FULL-STACK DEV (1 YEAR)
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight md:leading-[1.1] tracking-tight">
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]">
              KALKIRAM SARAVANAN
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 mt-4">
            Software developer with one year of hands-on projects, strong
            fundamentals, and a passion for crisp UI and smooth UX.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 font-semibold text-sm inline-flex items-center gap-2 transition"
            >
              View Projects
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#contact"
              className="group px-5 py-2.5 rounded-full border border-white/15 hover:bg-white/5 font-semibold text-sm inline-flex items-center gap-2 transition"
            >
              Contact Me
            </a>

            <div className="flex items-center gap-2.5 ml-1">
              <a
                aria-label="GitHub"
                className="w-9 h-9 grid place-items-center rounded-full border border-white/10 hover:border-white/30 transition transform hover:-translate-y-0.5 active:scale-95"
                href="https://github.com/kalkiramsaravananoff-code"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} />
              </a>

              <a
                aria-label="LinkedIn"
                className="w-9 h-9 grid place-items-center rounded-full border border-white/10 hover:border-white/30 transition-transform hover:-translate-y-0.5 active:scale-95"
                href="https://www.linkedin.com/in/kalkiram-saravanan-814239393"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={16} />
              </a>

              <a
                aria-label="Email"
                className="w-9 h-9 grid place-items-center rounded-full border border-white/10 hover:border-white/30 transition transform hover:-translate-y-0.5 active:scale-95"
                href="mailto:kalkiramsaravananoff@gmail.com"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: mobile + desktop variants */}
        <div className="relative mx-auto md:mx-0 w-full flex justify-center">
          {/* MOBILE: Stack Snapshot hero with chip animation */}
          <motion.div
            className="md:hidden w-full max-w-md mx-auto rounded-3xl bg-slate-950/80 border border-white/10 shadow-[0_18px_60px_rgba(15,23,42,0.9)] p-4 mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-[11px] tracking-[0.18em] text-purple-300 mb-3">
              TECH STACK
            </p>

            {/* chips – wrapped + staggered animation */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={chipContainer}
              initial="hidden"
              animate="visible"
            >
              {stackChips.map((item, index) => {
                const total = stackChips.length;

                // alignment for popup so it stays inside card
                let popupPosition = "left-1/2 -translate-x-1/2";
                if (index <= 1) {
                  popupPosition = "left-0";
                } else if (index >= total - 2) {
                  popupPosition = "right-0";
                }

                return (
                  <div key={item} className="relative">
                    <motion.button
                      type="button"
                      variants={chipItem}
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChipClick(item)}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] text-gray-100 shadow-sm whitespace-nowrap"
                    >
                      {item}
                    </motion.button>

                    {/* little code burst above the chip */}
                    <AnimatePresence>
                      {activeChip === item && (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: -18, scale: 1 }}
                          exit={{ opacity: 0, y: -30, scale: 0.92 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          className={`absolute -top-7 pointer-events-none ${popupPosition}`}
                        >
                          <div className="max-w-[180px] rounded-md bg-slate-900/95 border border-white/15 px-2 py-1 text-[10px] text-slate-100 shadow-lg whitespace-nowrap font-mono">
                            {chipCodeMap[item] || "console.log('Coding...');"}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

            {/* what you build */}
            <p className="mt-4 text-[13px] text-gray-300 leading-relaxed">
              I work across the stack to build dashboards, admin portals and
              internal tools with clean UI and solid backend APIs.
            </p>

            {/* stats grid */}
            <div className="mt-4 border-t border-white/10 pt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-[11px] text-gray-300">
              <div>
                <p className="text-[10px] text-gray-400">Experience</p>
                <p className="font-semibold text-white">1 year (projects)</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Projects</p>
                <p className="font-semibold text-white">3+ projects</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Focus</p>
                <p className="font-semibold text-white">
                  MERN &amp; Spring Boot
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Location</p>
                <p className="font-semibold text-white">India</p>
              </div>
            </div>

            {/* bottom row */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center justify-center rounded-full bg-purple-600/90 px-4 py-[10px] text-[11px] font-medium text-white shadow leading-none">
                Available for Dev roles
              </span>
              <span className="text-[11px] text-gray-400">
                Open to:{" "}
                <span className="text-gray-100">Remote / On-site</span>
              </span>
            </div>
          </motion.div>

          {/* DESKTOP / TABLET: clean animated dev dashboard card */}
          <motion.div
            className="hidden md:flex items-center justify-center w-full"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="relative w-full max-w-sm lg:max-w-md aspect-square">
              {/* circular glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-700/40 via-slate-900 to-blue-700/40 blur-2xl opacity-80" />

              {/* main card */}
              <motion.div
                className="absolute inset-[12%] rounded-3xl bg-slate-950/80 border border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur flex flex-col justify-between p-5 lg:p-6 overflow-hidden"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <div className="relative z-10">
                  <p className="text-[11px] tracking-[0.3em] text-purple-300 mb-3 text-center">
                    FULL-STACK DEVELOPER
                  </p>
                  <p className="text-[13px] lg:text-sm text-gray-300 text-center leading-relaxed">
                    Building modern web apps with{" "}
                    <span className="text-white font-semibold">
                      MERN stack &amp; Spring Boot
                    </span>
                    , focused on clean UI and reliable APIs.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
                    <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-3">
                      <p className="text-[10px] text-gray-400 mb-1">
                        Recent focus
                      </p>
                      <p className="text-xs text-white">
                        Dashboard UX, auth flows,
                        <br />
                        REST API design.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-3">
                      <p className="text-[10px] text-gray-400 mb-1">
                        Comfortable with
                      </p>
                      <p className="text-xs text-white">
                        React, Node.js, MongoDB,
                        <br />
                        Tailwind CSS.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[11px]">
                    <span className="inline-flex items-center justify-center rounded-full bg-purple-600/90 px-4 py-[6px] text-[11px] font-medium text-white shadow leading-none">
                      Available for Dev roles
                    </span>
                    <span className="text-gray-400">
                      Location: <span className="text-gray-100">India</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* floating chips around the card */}
              <motion.div
                className="absolute -top-1 left-8 lg:left-10"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[11px] text-white px-3 py-1 shadow-lg whitespace-nowrap">
                  MERN Stack
                </div>
              </motion.div>

              <motion.div
                className="absolute top-8 -right-1 lg:-right-3"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              >
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-[11px] text-white px-3 py-1 shadow-lg whitespace-nowrap">
                  Spring Boot APIs
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-7 -left-1 lg:-left-2"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              >
                <div className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-[11px] text-white px-3 py-1 shadow-lg whitespace-nowrap">
                  Clean UI &amp; UX
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-3 right-6 lg:right-8"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
              >
                <div className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-[11px] text-white px-3 py-1 shadow-lg whitespace-nowrap">
                  Deploy to Production
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
