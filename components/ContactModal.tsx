"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Using mailto as fallback — swap for Formspree/Resend/etc. as needed
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:nateshipps@gmail.com?subject=${subject}&body=${body}`;
    setSending(false);
    setSent(true);
  };

  const handleReset = () => {
    setName(""); setEmail(""); setMessage(""); setSent(false);
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="relative w-full md:max-w-lg"
        style={{
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
          borderRadius: "12px 12px 0 0",
          padding: "clamp(2rem, 6vw, 3rem)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
          style={{ color: "var(--fg-subtle)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-subtle)")}
        >
          Close ✕
        </button>

        {sent ? (
          <div className="flex flex-col gap-6 py-8">
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--fg-subtle)" }}>
              Sent
            </p>
            <p style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--fg)", fontFamily: "var(--font-instrument-sans)", lineHeight: 1.2 }}>
              Your email client should be open. Talk soon.
            </p>
            <button
              onClick={handleReset}
              className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 self-start"
              style={{ color: "var(--fg-subtle)" }}
            >
              Send another →
            </button>
          </div>
        ) : (
          <>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-6" style={{ color: "var(--fg-subtle)" }}>
              Get In Touch
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-subtle)" }}>Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full text-sm outline-none transition-colors duration-200"
                    style={{
                      background: "transparent",
                      borderBottom: "1px solid var(--border)",
                      padding: "0.5rem 0",
                      color: "var(--fg)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--fg)")}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--border)")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-subtle)" }}>Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full text-sm outline-none transition-colors duration-200"
                    style={{
                      background: "transparent",
                      borderBottom: "1px solid var(--border)",
                      padding: "0.5rem 0",
                      color: "var(--fg)",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--fg)")}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--border)")}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-subtle)" }}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  className="w-full text-sm outline-none resize-none transition-colors duration-200"
                  style={{
                    background: "transparent",
                    borderBottom: "1px solid var(--border)",
                    padding: "0.5rem 0",
                    color: "var(--fg)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--fg)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--border)")}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="self-start font-mono text-[10px] tracking-[0.25em] uppercase px-6 py-3 transition-all duration-200"
                style={{
                  background: "var(--fg)",
                  color: "var(--bg)",
                  borderRadius: 4,
                  opacity: sending ? 0.6 : 1,
                }}
              >
                {sending ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
