const SERVICES = [
  "Video Production",
"Post Production",
  "Motion Design",
  "Photography",
  "Design",
  "Creative Direction",
  "Events",
  "XYZ",
];

export default function ServicesSection() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1.5rem" }}>
      {SERVICES.map((label) => (
        <span
          key={label}
          className="service-btn"
          style={{
            display: "inline-block",
            padding: "0.35rem 0.85rem",
            borderRadius: "999px",
            border: "1px solid var(--border)",
            fontSize: "0.7rem",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "0.06em",
            color: "var(--fg-muted)",
            transition: "border-color 0.2s ease, color 0.2s ease",
            cursor: "default",
          }}
        >
          {label}
        </span>
      ))}
      <style>{`
        .service-btn:hover { color: var(--fg); border-color: var(--fg-muted); }
      `}</style>
    </div>
  );
}
