import AboutTimeline from "@/components/AboutTimeline";

export const metadata = {
  title: "About Our Process | Lumière Event Architecture",
  description:
    "A transparent, meticulous approach to transforming fleeting concepts into architectural masterpieces of celebration.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-header">
        <div className="lumiere-container">
          <span className="section-label">Methodology</span>
          <h1 style={{ fontFamily: "var(--font-display)" }}>
            The <span className="italic gold-text">Art</span> of Orchestration
          </h1>
          <p>
            A transparent, meticulous approach to transforming fleeting concepts
            into architectural masterpieces of celebration.
          </p>
        </div>
      </section>

      <AboutTimeline />
    </>
  );
}
