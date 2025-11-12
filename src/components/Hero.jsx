import React from "react";
// import StickyHero from "../components/scroll animation/StickyHero";
import heroimg from "../assets/heroimg.png";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const mapRange = (v, inMin, inMax, outMin, outMax) =>
  outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);

const Hero = ({ ySlow, yFast }) => {
  // --- Tilt spotlight (desktop only) ---
  const cardRef = React.useRef(null);
  const [enableTilt, setEnableTilt] = React.useState(false);
  const [mx, setMx] = React.useState(0);
  const [my, setMy] = React.useState(0);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setEnableTilt(!window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  const rotateX = mapRange(my, -160, 160, 10, -10);
  const rotateY = mapRange(mx, -160, 160, -10, 10);
  const glowX = mapRange(mx, -160, 160, -25, 25);
  const glowY = mapRange(my, -160, 160, -25, 25);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMx(e.clientX - (rect.left + rect.width / 2));
    setMy(e.clientY - (rect.top + rect.height / 2));
  };
  const resetTilt = () => {
    setMx(0);
    setMy(0);
  };

  // --- Parallax: subscribe to ySlow/yFast MotionValues if provided ---
  const [parallaxSlow, setParallaxSlow] = React.useState(0);
  const [parallaxFast, setParallaxFast] = React.useState(0);

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
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center pt-24 overflow-hidden"
    >
      {/* gradient blobs (no framer-motion) */}
      <div
        className="pointer-events-none absolute -top-28 -left-28 w-[22rem] h-[22rem] rounded-full bg-purple-500/20 blur-2xl transition-transform duration-150 ease-out"
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-28 w-[22rem] h-[22rem] rounded-full bg-blue-500/20 blur-2xl transition-transform duration-150 ease-out"
        style={{ transform: `translateY(${parallaxFast}px)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        {/* LEFT: copy (no stagger/variants) */}
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
            Fresher developer with one year of hands-on projects, strong
            fundamentals, and a passion for crisp UI and smooth UX.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 font-semibold text-sm inline-flex items-center gap-2 transition"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
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
              >
                <Github size={16} />
              </a>

              <a
                aria-label="LinkedIn"
                className="w-9 h-9 grid place-items-center rounded-full border border-white/10 hover:border-white/30 transition transform hover:-translate-y-0.5 active:scale-95"
                href="https://www.linkedin.com/in/your-username"
              >
                <Linkedin size={16} />
              </a>

              <a
                aria-label="Email"
                className="w-9 h-9 grid place-items-center rounded-full border border-white/10 hover:border-white/30 transition transform hover:-translate-y-0.5 active:scale-95"
                href="kalkiramsaravananoff@gmail.com"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: preview card with tilt + spotlight (no framer-motion) */}
        <div
          ref={cardRef}
          onMouseMove={enableTilt ? handleMouseMove : undefined}
          onMouseLeave={enableTilt ? resetTilt : undefined}
          className="relative will-change-transform mx-auto md:mx-0 transition-transform duration-200"
          style={{
            transform: enableTilt ? `scale(1.02)` : undefined,
          }}
        >
          <div className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px] aspect-[4/3] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-0.5 ring-1 ring-white/10 shadow-[0_10px_40px_-10px_rgba(147,51,234,0.35)]">
            <div
              className="w-full h-full rounded-[1.2rem] overflow-hidden bg-black relative transition-transform duration-150 will-change-transform"
              style={{
                transform: enableTilt
                  ? `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                  : undefined,
              }}
            >
              {/* moving spotlight */}
              {enableTilt && (
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute rounded-full opacity-20"
                    style={{
                      width: "14rem",
                      height: "14rem",
                      left: "50%",
                      top: "50%",
                      transform: `translate(calc(-50% + ${glowX}px), calc(-50% + ${glowY}px))`,
                      background:
                        "radial-gradient(closest-side, rgba(168,85,247,0.55), transparent 70%)",
                    }}
                  />
                </div>
              )}

              {/* image */}
              <img
                alt="Showcase"
                src={heroimg}
                className="w-full h-full object-contain md:object-cover opacity-90"
                loading="lazy"
                decoding="async"
                sizes="(min-width:1024px) 400px, (min-width:768px) 340px, (min-width:640px) 280px, 220px"
              />
            </div>
          </div>

          {/* floating badge */}
          <div className="absolute -bottom-4 right-0 md:-right-4">
            <div className="bg-purple-600 text-white px-3 py-2 rounded-2xl shadow-lg text-sm animate-bounce">
              Available for Dev roles
            </div>
          </div>
        </div>
      </div>
      {/* <StickyHero /> */}
    </section>
  );
};

export default Hero;
