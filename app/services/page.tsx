import Image from "next/image";

export const metadata = {
  title: "Services | Lumière Event Architecture",
  description:
    "From concept to final orchestration, we provide a full spectrum of event architecture services tailored to the most discerning clients.",
};

const services = [
  {
    overline: "Matrimony",
    title: "Bespoke",
    titleHighlight: "Weddings",
    body: "We specialize in turning personal narratives into immersive wedding environments. Whether it is a destination celebration in a Tuscan villa or a grand ballroom gala in Manhattan, every detail is meticulously curated to reflect your unique journey.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2938&auto=format&fit=crop",
    alt: "Bespoke Weddings",
    features: [
      { label: "Venue Sourcing & Management", value: "Exclusive Access" },
      { label: "Floral & Spatial Design", value: "Artisanal" },
      { label: "Gastronomic Curation", value: "Michelin Standard" },
      { label: "RSVP & Guest Concierge", value: "White Glove" },
    ],
  },
  {
    overline: "Prestige",
    title: "Corporate",
    titleHighlight: "Galas",
    body: "Elevate your brand with events that command attention and foster deep connections. We blend logistical precision with creative storytelling to produce high-impact summits, launches, and anniversary celebrations.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2912&auto=format&fit=crop",
    alt: "Corporate Galas",
    features: [
      { label: "Brand Immersion Design", value: "360° Vision" },
      { label: "AV & Technical Production", value: "State of the art" },
      { label: "Speaker & Talent Handling", value: "Bespoke Management" },
      { label: "Security & Protocol", value: "Discreet" },
    ],
  },
  {
    overline: "Intimacy",
    title: "Private",
    titleHighlight: "Celebrations",
    body: "For life's most intimate milestones, we create environments that focus on the joy of connection. From high-concept birthday soirées to quiet anniversary dinners, our approach is centered on elegance and privacy.",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2940&auto=format&fit=crop",
    alt: "Private Celebrations",
    features: [
      { label: "Theme Concept Development", value: "Original Narrative" },
      { label: "Custom Decor & Lighting", value: "Atmospheric" },
      { label: "Wine & Spirit Consulting", value: "Rare Vintages" },
      { label: "Live Entertainment", value: "Curated Talent" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section
        className="services-hero"
        style={{
          backgroundImage: `linear-gradient(var(--hero-overlay-start), var(--hero-overlay-end)), url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2940&auto=format&fit=crop')`,
        }}
      >
        <span className="section-label">Excellence in Execution</span>
        <h1 style={{ fontFamily: "var(--font-display)" }}>
          Our <span className="italic gold-text">Services</span>
        </h1>
        <p>
          From concept to final orchestration, we provide a full spectrum of
          event architecture services tailored to the most discerning clients.
        </p>
      </section>

      <div className="lumiere-container service-detail-grid">
        {services.map((service, i) => (
          <div key={i} className="service-row">
            <div className="service-image-box">
              <Image
                src={service.image}
                alt={service.alt}
                width={1200}
                height={700}
                className="service-detail-img"
              />
            </div>
            <div className="service-text-content">
              <span className="section-label">{service.overline}</span>
              <h2 style={{ fontFamily: "var(--font-display)" }}>
                {service.title}{" "}
                <span className="italic gold-text">{service.titleHighlight}</span>
              </h2>
              <p>{service.body}</p>
              <ul className="service-features">
                {service.features.map((f, j) => (
                  <li key={j}>
                    {f.label} <span>{f.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
