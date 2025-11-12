import React, { useEffect, useMemo, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import StickyHero from "../components/scroll animation/StickyHero";
import MainSections from "../components/MainSections";
import ScrollOrchestrator from "../components/scroll animation/ScrollOrchestrator";
import Hero from "../components/Hero";

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  // scroll position for parallax
  const { scrollYProgress } = useScroll();
   useTransform(scrollYProgress, [0, 1], [0, 200]);
  useTransform(scrollYProgress, [0, 1], [0, -200]);

  // smooth anchor scrolling
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  // observe sections for active link highlight
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.2, 0.6, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  

  const links = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "work", label: "Projects" },
      { id: "about", label: "About" },
      { id: "banner", label: "banner" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  return (
    // Optional "panel" feel: add 'snap-y snap-mandatory' here and 'snap-start' on each section.
    <div className="bg-black text-white min-h-screen">
      {/* NAV */}
      <Navbar
  links={links}
  active={active}
  setActive={setActive}
  isMenuOpen={isMenuOpen}
  setIsMenuOpen={setIsMenuOpen}
/>;

      {/* HERO */}
      <Hero />

      {/* MAIN SECTIONS */}
      <MainSections />

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400">
            © {new Date().getFullYear()} KALKIRAM SARAVANAN — Fresher Developer
          </p>
          <div className="flex items-center gap-6">
            <a className="text-gray-400 hover:text-white" href="https://github.com/kalkiramsaravananoff-code" aria-label="GitHub">
              GitHub
            </a>
            <a className="text-gray-400 hover:text-white" href="#" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a className="text-gray-400 hover:text-white" href="mailto:kalkiramsaravananoff@gmail.com" aria-label="Email">
              Email
            </a>
          </div>
        </div>
      </footer>

      {/* PRO scroll rail + top progress (replaces the old top bar) */}
      <ScrollOrchestrator sections={links} />
    </div>
  );
};

export default Homepage;
