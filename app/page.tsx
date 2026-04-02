import HeroIntro from "@/components/HeroIntro";
import ImageFlicker from "@/components/ImageFlicker";

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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <p
            className="font-bold leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-instrument-sans)",
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              color: "var(--fg)",
            }}
          >
            Creative leader with 7 years of experience across{" "}
            <span style={{ color: "#888888" }}>
              <span className="service-tag service-film">film</span>,{" "}
              <span className="service-tag service-design">design</span>,{" "}
              <span className="service-tag service-photo">photo</span>, and{" "}
              <span className="service-tag service-events">events</span>.
            </span>
          </p>
          <div style={{ maxWidth: "520px", marginLeft: "auto" }}>
            <ImageFlicker />
          </div>
        </div>
      </section>

    </main>
  );
}
