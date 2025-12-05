import React from "react";
import { Github, Linkedin, Mail, Menu, X, Download } from "lucide-react";

const NAV_OFFSET = 96; // match your fixed navbar height

const Navbar = ({ links, active, setActive, isMenuOpen, setIsMenuOpen }) => {
  const contentRef = React.useRef(null);
  const [maxH, setMaxH] = React.useState(0);

  // Smooth mobile sheet height
  React.useEffect(() => {
    const updateHeight = () => {
      if (!contentRef.current) return;
      setMaxH(isMenuOpen ? contentRef.current.scrollHeight : 0);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight, { passive: true });
    return () => window.removeEventListener("resize", updateHeight);
  }, [isMenuOpen, links]);

  // Track section visibility -> update active while scrolling
  React.useEffect(() => {
    if (!links?.length) return;

    const ratios = new Map();
    const els = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let bestId = null;
        let best = 0;
        ratios.forEach((r, id) => {
          if (r > best) {
            best = r;
            bestId = id;
          }
        });
        if (bestId && bestId !== active) setActive?.(bestId);
      },
      {
        // top offset for fixed navbar; bottom margin so "below fold" doesn't steal active
        rootMargin: `-${NAV_OFFSET + 8}px 0px -50% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [links, active, setActive]);

  // Click handler (sets active immediately + smooth scroll with offset)
  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActive?.(id);
    const el = document.getElementById(id);
    if (el) {
      const y = window.scrollY + el.getBoundingClientRect().top - NAV_OFFSET;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    }
    setIsMenuOpen(false);
  };

  // Respect initial hash on page load
  React.useEffect(() => {
    const id = (location.hash || "").replace("#", "");
    if (id && links.some((l) => l.id === id)) setActive?.(id);
  }, [links, setActive]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="font-extrabold text-xl tracking-tight"
        >
          <span>Kalkiram</span><span className="text-purple-500"> Saravanan</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => handleNavClick(e, l.id)}
              aria-current={active === l.id ? "page" : undefined}
              className={`relative px-1 py-1 text-sm uppercase tracking-wide transition-colors ${
                active === l.id ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {l.label}
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500 rounded origin-left"
                style={{
                  transform: `scaleX(${active === l.id ? 1 : 0})`,
                  transition: "transform 200ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </a>
          ))}
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-full border border-purple-500/60 hover:bg-purple-500/10 transition"
          >
            <Download size={16} /> Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
          className="md:hidden"
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Sheet */}
      <div
        className="md:hidden overflow-hidden border-t border-white/5 transition-[max-height] duration-300 ease-out"
        style={{ maxHeight: maxH }}
      >
        <div ref={contentRef} className="px-6 pb-4 pt-2 space-y-2 bg-black/60 backdrop-blur">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => handleNavClick(e, l.id)}
              className="block py-2 text-gray-300 hover:text-white"
            >
              {l.label}
            </a>
          ))}

          <div className="flex items-center gap-3 pt-2 text-gray-300">
            <a aria-label="GitHub" href="https://github.com/your-username" className="hover:text-white">
              <Github size={18} />
            </a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/your-username" className="hover:text-white">
              <Linkedin size={18} />
            </a>
            <a aria-label="Email" href="mailto:hello@example.com" className="hover:text-white">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
