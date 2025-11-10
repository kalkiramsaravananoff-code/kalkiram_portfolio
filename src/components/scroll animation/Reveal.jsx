import React from "react";

/** tiny in-view hook using IntersectionObserver */
function useInView({ threshold = 0.25, rootMargin = "0px" } = {}) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // toggle while entering/leaving viewport (not "once")
        setInView(entry.isIntersecting && entry.intersectionRatio >= threshold);
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

/** Fade+slide up for single elements (no framer-motion) */
export const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({ threshold: 0.25 });

  const t = "cubic-bezier(0.22, 1, 0.36, 1)";
  const d = `${delay}s`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.6s ${t} ${d}, transform 0.6s ${t} ${d}`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

/** Stagger children as they enter the viewport (no framer-motion) */
export const RevealStagger = ({
  children,
  delayChildren = 0.05,
  stagger = 0.08,
  amount = 0.25, // viewport "amount" -> threshold
  className = "",
}) => {
  const [ref, inView] = useInView({ threshold: amount });

  const t = "cubic-bezier(0.22, 1, 0.36, 1)";
  const base = Math.max(0, delayChildren);

  const items = React.Children.toArray(children);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // optional container fade (subtle)
        opacity: items.length ? 1 : 0,
        willChange: "opacity, transform",
      }}
    >
      {items.map((child, i) => {
        const delay = `${base + i * Math.max(0, stagger)}s`;
        return (
          <div
            key={i}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.55s ${t} ${delay}, transform 0.55s ${t} ${delay}`,
              willChange: "opacity, transform",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};
