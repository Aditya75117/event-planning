import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact | Lumière Premium Event Architecture",
  description:
    "Connect with Lumière—request a proposal, reach our New York atelier, or start the conversation for your next event.",
};

export default function ContactPage() {
  return (
    <>
      <section
        className="contact-hero"
        style={{
          backgroundImage: `linear-gradient(var(--hero-overlay-start), var(--hero-overlay-end)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop')`,
        }}
      >
        <div className="lumiere-container">
          <span className="section-label" style={{ color: "var(--text-muted)" }}>
            Connect With Us
          </span>
          <h1 style={{ fontFamily: "var(--font-display)" }}>
            The Art of <span className="contact-hero-italic">Conversation</span>
          </h1>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
