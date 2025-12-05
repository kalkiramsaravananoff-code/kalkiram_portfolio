import React from "react";
import { useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const StickyHero = () => {
  const sectionRef = React.useRef(null);

  // Progress across just this section (0 → 1 while scrolling its height)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax blobs
  const blobUp = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blobDown = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Text + CTA motion
  const titleY = useTransform(scrollYProgress, [0, 0.6, 1], [0, -40, -80]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const subY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -24, -48]);
  const ctaY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -16, -36]);

  // Stats appear after a bit, then float up slightly
  const statsOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.15, 0.6], [16, -8]);

  // Preview card: gentle scale/rotate along the scroll
  const cardScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.98, 1.04, 0.93]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="scroll-mt-24 md:scroll-mt-28 relative min-h-[200vh] bg-black"
    >
      {/* Sticky viewport panel */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background blobs (parallax) */}
        <motion.div
          style={{ y: blobUp }}
          className="pointer-events-none absolute -top-32 -left-32 w-[22rem] h-[22rem] rounded-full bg-purple-500/20 blur-2xl"
        />
        <motion.div
          style={{ y: blobDown }}
          className="pointer-events-none absolute -bottom-32 -right-32 w-[22rem] h-[22rem] rounded-full bg-blue-500/20 blur-2xl"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full grid md:grid-cols-2 items-center gap-8">
          {/* Left: copy */}
          <div>
            <motion.p
              style={{ y: subY }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm tracking-widest text-purple-400 mb-3"
            >
              FULL-STACK DEV (1 YEAR)
            </motion.p>

            <motion.h1
              style={{ y: titleY, scale: titleScale }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight md:leading-[1.1] tracking-tight"
            >
              Hi, I’m{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                KALKIRAM SARAVANAN
              </span>
            </motion.h1>

            <motion.p
              style={{ y: subY }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg text-gray-400 mt-4"
            >
              Software developer with one year of hands-on projects, strong
              fundamentals, and a passion for crisp UI and smooth UX.
            </motion.p>

            <motion.div
              style={{ y: ctaY }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 font-semibold text-sm inline-flex items-center gap-2 transition"
              >
                View Projects <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-full border border-white/15 hover:bg-white/5 font-semibold text-sm inline-flex items-center gap-2 transition"
              >
                Contact Me
              </a>
              <div className="flex items-center gap-2.5 ml-1">
                <a aria-label="GitHub" className="w-9 h-9 grid place-items-center rounded-full border border-white/10 hover:border-white/30 transition" href="#"><Github size={16} /></a>
                <a
                  aria-label="LinkedIn"
                  className="w-9 h-9 grid place-items-center rounded-full border border-white/10 hover:border-white/30 transition"
                  href="https://www.linkedin.com/in/kalkiram-saravanan-814239393"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} />
                </a>

                <a aria-label="Email" className="w-9 h-9 grid place-items-center rounded-full border border-white/10 hover:border-white/30 transition" href="mailto:hello@example.com"><Mail size={16} /></a>
              </div>
            </motion.div>

            {/* Compact two stats (Projects + Skills) */}
            <motion.div
              style={{ opacity: statsOpacity, y: statsY }}
              className="grid grid-cols-2 gap-3 mt-8 text-center"
            >
              {[
                { n: "10+", l: "Projects" },
                { n: "10+", l: "Skills" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-white/10 bg-white/5 py-3">
                  <div className="text-xl font-extrabold text-white">{s.n}</div>
                  <div className="text-[11px] uppercase tracking-wider text-gray-400">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: preview card (parallax scale/rotate) */}
          <motion.div
            style={{ scale: cardScale, rotate: cardRotate }}
            className="relative"
          >
            <div className="aspect-[4/3] max-w-[560px] mx-auto rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-1 ring-1 ring-white/10 shadow-[0_10px_40px_-10px_rgba(147,51,234,0.35)]">
              <div className="w-full h-full rounded-[1.2rem] overflow-hidden bg-black relative">
                <img
                  alt="Showcase"
                  src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1400&h=1000&fit=crop"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="absolute -bottom-4 -right-4 bg-purple-600 text-white px-3 py-2 rounded-2xl shadow-lg text-sm"
            >
              Available for Intern / Jr. Dev roles
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StickyHero;
