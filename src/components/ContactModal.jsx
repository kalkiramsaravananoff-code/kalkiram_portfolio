// src/components/ContactModal.jsx
import React from "react";

/**
 * Compact contact popup with WhatsApp + Email.
 * - Pass `open` and `onClose`
 * - Optional: `whatsappNumber` (country code, no +), `defaultEmail`, `subjectPrefix`
 */
export default function ContactModal({
  open,
  onClose,
  whatsappNumber = "919876543210", // ← change to your number (no +)
  defaultEmail = "kalkiramsaravananoff@gmail.com",
  subjectPrefix = "Portfolio Inquiry",
}) {
  const nameRef = React.useRef(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  // Focus first field + ESC to close
  React.useEffect(() => {
    if (!open) return;
    nameRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleWhatsApp = () => {
    const text = `Hello! I'm ${name || "—"} (${email || "—"}).\n\n${message || ""}`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleEmail = (e) => {
    e.preventDefault();
    const subject = `${subjectPrefix} — ${name || "New message"}`;
    const body = `Name: ${name || ""}\nEmail: ${email || ""}\n\n${message || ""}`;
    window.location.href = `mailto:${defaultEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onClick={onClose}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* panel */}
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-black p-4 shadow-[0_14px_44px_-12px_rgba(139,92,246,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 id="contact-title" className="text-base font-semibold">
            Start a conversation
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded p-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form className="space-y-3" onSubmit={handleEmail}>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Name</label>
            <input
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/40"
              placeholder="Your name"
              type="text"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/40"
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg bg-black border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500/40"
              placeholder="Tell me briefly about your project…"
              rows={4}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex-1 px-4 py-2 rounded-full bg-green-600 hover:bg-green-500 text-sm font-semibold"
            >
              Send via WhatsApp
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-full border border-white/15 hover:bg-white/5 text-sm font-semibold"
            >
              Send via Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
