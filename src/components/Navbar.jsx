import React from "react";
import { Github, Linkedin, Mail, Menu, X, Download } from "lucide-react";

const Navbar = ({ links, active, isMenuOpen, setIsMenuOpen }) => {
  // Smooth height reveal for the mobile menu (no framer-motion)
  const contentRef = React.useRef(null);
  const [maxH, setMaxH] = React.useState(0);

  React.useEffect(() => {
    const updateHeight = () => {
      if (!contentRef.current) return;
      // when open, set to scrollHeight; when closed, set to 0
      setMaxH(isMenuOpen ? contentRef.current.scrollHeight : 0);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isMenuOpen, links]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-extrabold text-xl tracking-tight">
          <span>Port</span><span className="text-purple-500">folio</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative px-1 py-1 text-sm uppercase tracking-wide transition-colors ${
                active === l.id ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {l.label}
              {/* underline without motion */}
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

      {/* Mobile Sheet (no motion, smooth max-height) */}
      <div
        className="md:hidden overflow-hidden border-t border-white/5 transition-[max-height] duration-300 ease-out"
        style={{ maxHeight: maxH }}
      >
        <div
          ref={contentRef}
          className="px-6 pb-4 pt-2 space-y-2 bg-black/60 backdrop-blur"
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-300 hover:text-white"
            >
              {l.label}
            </a>
          ))}

          {/* (Optional) social quick links on mobile */}
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
