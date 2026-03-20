import HeroIntro from "@/components/HeroIntro";

export default function Home() {
  return (
    <main>
      <HeroIntro />

      {/* Bio */}
      <section
        style={{
          paddingLeft: "clamp(2rem, 6vw, 6rem)",
          paddingRight: "clamp(2rem, 6vw, 6rem)",
          paddingTop: "clamp(4rem, 8vw, 8rem)",
          paddingBottom: "clamp(4rem, 8vw, 8rem)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <p
          className="font-bold leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-instrument-sans)",
            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
            color: "var(--fg)",
            maxWidth: "16ch",
          }}
        >
          Creative production lead with over 6 years of experience across film, design, photo, and events.
        </p>
      </section>

    </main>
  );
}
