import React from "react";

const NAV_OFFSET = 96; // px — matches your fixed navbar height
const THRESHOLDS = [0, 0.25, 0.5, 0.75, 1];

const defaultSections = () => {
  if (typeof window === "undefined") return [];
  return Array.from(document.querySelectorAll("section[id]")).map((el) => ({
    id: el.id,
    label:
      el.getAttribute("data-label") ||
      el.id.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
  }));
};

const ScrollOrchestrator = ({ sections: providedSections }) => {
  // ---- Top progress (no framer-motion) ----
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, scrollTop / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ---- Section list ----
  const [sections, setSections] = React.useState(providedSections || []);
  React.useEffect(() => {
    if (!providedSections || providedSections.length === 0) {
      setSections(defaultSections());
    } else {
      setSections(providedSections);
    }
  }, [providedSections]);

  // ---- Active tracking (IntersectionObserver) ----
  const [active, setActive] = React.useState(null);
  const ratiosRef = React.useRef({}); // id -> latest intersectionRatio

  const computeActiveByVisibility = React.useCallback(() => {
    if (!sections.length) return;
    let bestId = null;
    let bestRatio = 0;
    const vh = window.innerHeight;

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
      const ratio = visible / Math.max(rect.height, 1);
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    });

    if (bestId && bestId !== active) setActive(bestId);
  }, [sections, active]);

  React.useEffect(() => {
    computeActiveByVisibility();
  }, [sections, computeActiveByVisibility]);

  React.useEffect(() => {
    const els = document.querySelectorAll("section[id]");
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratiosRef.current[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0;
        });

        // pick the section with the highest ratio now
        let bestId = null;
        let best = 0;
        for (const [id, r] of Object.entries(ratiosRef.current)) {
          if (r > best) {
            best = r;
            bestId = id;
          }
        }
        if (bestId && bestId !== active) setActive(bestId);
      },
      {
        threshold: THRESHOLDS,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [active, sections]);

  // ---- Smooth anchor nav with offset ----
  const goTo = (id) => (ev) => {
    ev.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - NAV_OFFSET;

    setActive(id); // reflect immediately
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-1.5">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
        <div
          style={{ transform: `scaleX(${progress})` }}
          className="origin-left h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 shadow-[0_0_18px_rgba(168,85,247,0.35)] transition-transform duration-150 ease-out"
        />
      </div>

      {/* Right rail with dots & labels */}
      <div className="pointer-events-none fixed right-5 md:right-6 top-1/2 -translate-y-1/2 z-[60] hidden sm:block">
        <div className="relative flex flex-col items-center gap-3">
          <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/5 rounded-full" />
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={goTo(s.id)}
                className="group pointer-events-auto relative"
                aria-label={s.label}
              >
                {/* dot */}
                <span
                  className={`block w-2.5 h-2.5 rounded-full border ${
                    isActive ? "bg-purple-500 border-purple-400" : "bg-white/40 border-white/40"
                  }`}
                  style={{
                    transform: `scale(${isActive ? 1.15 : 1})`,
                    boxShadow: isActive ? "0 0 0 6px rgba(168, 85, 247, 0.18)" : "none",
                    transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms ease",
                  }}
                />
                {/* label tooltip */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pr-2">
                  <div
                    className="whitespace-nowrap rounded-full bg-white/10 border border-white/10 text-[11px] tracking-wide px-2 py-1 text-gray-200 shadow backdrop-blur"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `translateX(${isActive ? 0 : 8}px)`,
                      transition: "opacity 160ms ease, transform 160ms ease",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom scroll hint (mobile) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[50] md:hidden">
        <div className="px-3 py-1 rounded-full text-[11px] bg-white/10 border border-white/10 text-gray-200 backdrop-blur opacity-70 animate-bounce">
          Scroll
        </div>
      </div>
    </>
  );
};

export default ScrollOrchestrator;
