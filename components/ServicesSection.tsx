"use client";

import { useFadeIn, useFadeInGroup } from "@/hooks/useFadeIn";

const services = [
  {
    icon: (
      <svg
        className="service-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent-gold)"
        strokeWidth="1"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: "Weddings",
    description:
      "Bespoke matrimony. Tailored environments that reflect personal narratives, from intimate vows to multi-day destination galas.",
  },
  {
    icon: (
      <svg
        className="service-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent-gold)"
        strokeWidth="1"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <path d="M4 10h16M10 4v16" />
      </svg>
    ),
    title: "Corporate",
    description:
      "Brand immersion. High-stakes summits, product launches, and galas designed to elevate corporate prestige and impress stakeholders.",
  },
  {
    icon: (
      <svg
        className="service-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent-gold)"
        strokeWidth="1"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Private",
    description:
      "Exclusive access. Milestone birthdays, anniversary dinners, and private concerts executed with absolute discretion.",
  },
  {
    icon: (
      <svg
        className="service-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent-gold)"
        strokeWidth="1"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Concierge",
    description:
      "Beyond the event. Curating travel, luxury accommodations, and elite experiences for guests pre- and post-celebration.",
  },
];

export default function ServicesSection() {
  const headerRef = useFadeIn();
  const setCardRef = useFadeInGroup(services.length, { staggerDelay: 0.1 });

  return (
    <section
      id="services"
      className="border-t border-b border-[var(--border-subtle)]"
      style={{
        backgroundColor: "var(--bg-surface)",
        padding: "var(--space-xl) 0",
      }}
    >
      <div className="lumiere-container">
        <div ref={headerRef} className="text-center fade-in">
          <span className="section-label">Curated Offerings</span>
          <h2 style={{ fontFamily: "var(--font-display)" }}>Event Disciplines</h2>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={i}
              ref={setCardRef(i)}
              className="service-card fade-in"
            >
              {service.icon}
              <h3 style={{ fontFamily: "var(--font-display)" }}>
                {service.title}
              </h3>
              <p className="lumiere-p">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
