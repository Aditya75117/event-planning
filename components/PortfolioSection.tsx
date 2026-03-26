"use client";

import Image from "next/image";
import Link from "next/link";
import { useFadeIn, useFadeInGroup } from "@/hooks/useFadeIn";

const portfolioItems = [
  {
    image:
      "https://images.unsplash.com/photo-1530103862676-de8892ebe819?q=80&w=2000&auto=format&fit=crop",
    title: "The Midnight Gala",
    meta: "Corporate • London",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop",
    title: "Estate Vows",
    meta: "Wedding • Tuscany",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2000&auto=format&fit=crop",
    title: "Neon Noir Launch",
    meta: "Product • Tokyo",
  },
  {
    image:
      "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=2000&auto=format&fit=crop",
    title: "Symphony at Dusk",
    meta: "Private • New York",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2000&auto=format&fit=crop",
    title: "The Glasshouse",
    meta: "Wedding • Paris",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2000&auto=format&fit=crop",
    title: "Oceanside Summit",
    meta: "Corporate • Malibu",
  },
];

export default function PortfolioSection() {
  const introRef = useFadeIn();
  const setItemRef = useFadeInGroup(portfolioItems.length, {
    staggerDelay: 0.08,
  });
  const btnRef = useFadeIn({ delay: "0.4s" });

  return (
    <section id="portfolio" className="lumiere-section">
      <div className="lumiere-container">
        <div ref={introRef} className="section-intro fade-in">
          <span className="section-label">The Archive</span>
          <h2 style={{ fontFamily: "var(--font-display)" }}>Selected Works</h2>
        </div>

        <div className="portfolio-grid">
          {portfolioItems.map((item, i) => (
            <div
              key={i}
              ref={setItemRef(i)}
              className="portfolio-item fade-in-scale"
            >
              <Image
                src={item.image}
                alt="Event"
                width={600}
                height={400}
                className="portfolio-img"
              />
              <div className="portfolio-overlay">
                <h4 style={{ fontFamily: "var(--font-display)" }}>
                  {item.title}
                </h4>
                <span>{item.meta}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={btnRef}
          className="text-center fade-in"
          style={{ marginTop: "var(--space-lg)" }}
        >
          <Link href="#" className="lumiere-btn lumiere-btn-outline">
            View Full Archive
          </Link>
        </div>
      </div>
    </section>
  );
}
