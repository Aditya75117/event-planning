import AboutStickyStack from "@/components/AboutStickyStack";
import AboutStickyImage from "@/components/AboutStickyImage";

export const metadata = {
  title: "Our Process | Lumière Event Architecture",
  description:
    "An immersive look at how we transform fleeting concepts into architectural masterpieces of celebration.",
};

export default function AboutV2Page() {
  return (
    <>
      <section className="sticky-stack-hero">
        <div
          className="sticky-stack-hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2940&auto=format&fit=crop')",
          }}
        />
        <div className="sticky-stack-hero-overlay" />
        <div className="sticky-stack-hero-content">
          <span className="section-label hero-fade-in" style={{ animationDelay: "0.3s" }}>
            Methodology
          </span>
          <h1
            className="hero-fade-in mb-6 text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-tight text-[var(--text-main)]"
            style={{ fontFamily: "var(--font-display)", animationDelay: "0.5s" }}
          >
            The <span className="italic gold-text">Art</span> of Orchestration
          </h1>
          <p
            className="hero-fade-in mx-auto max-w-[550px] text-[1.05rem] text-[var(--text-muted)]"
            style={{ animationDelay: "0.7s" }}
          >
            An immersive look at how we transform fleeting concepts into
            architectural masterpieces of celebration.
          </p>
        </div>
      </section>

      {/* <AboutStickyStack /> */}

      <div className="lumiere-divider" />

      <AboutStickyImage />
    </>
  );
}
