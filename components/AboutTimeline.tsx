"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    overline: "Discovery",
    title: "Consultation",
    body: "We begin with an immersive dialogue. In this stage, we dive deep into your aesthetic inclinations, cultural nuances, and logistical requirements. This is where we identify the 'soul' of your event before a single vendor is contacted.",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
    alt: "Consultation",
  },
  {
    overline: "Strategy",
    title: "Planning",
    body: "Precision engineering meets creative vision. We draft high-fidelity 3D floor plans, source exclusive textiles, and curate a culinary journey. Every logistical pivot is accounted for, ensuring a seamless structural integrity for the entire experience.",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800&auto=format&fit=crop",
    alt: "Planning",
  },
  {
    overline: "Production",
    title: "Execution",
    body: "Our production team descends on the venue with surgical focus. We manage the build-out, technical choreography, and vendor flow. On the day, we operate as invisible conductors, ensuring the crescendo of the event is perfectly timed.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
    alt: "Execution",
  },
  {
    overline: "Immersion",
    title: "Celebration",
    body: "The final transformation. You and your guests inhabit a space where the mechanics are hidden and only the atmosphere remains. We stay on-site until the final candle is extinguished, ensuring the memory of the night is as flawless as the night itself.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8892ebe819?q=80&w=800&auto=format&fit=crop",
    alt: "Celebration",
  },
];

export default function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const container = document.getElementById("timeline");
      const progressLine = document.getElementById("progressLine");
      if (!container || !progressLine) return;

      gsap.to(progressLine, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      const stepEls = gsap.utils.toArray<HTMLElement>(".timeline-step");
      stepEls.forEach((step) => {
        const number = step.querySelector(".step-number");
        const content = step.querySelector(".timeline-content");
        const visual = step.querySelector(".timeline-visual");

        gsap.fromTo(
          number,
          { scale: 0.8, borderColor: "var(--border-subtle)", color: "var(--text-muted)" },
          {
            scale: 1,
            borderColor: "var(--accent-gold)",
            color: "var(--accent-gold)",
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              end: "center center",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              end: "center center",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          visual,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="timeline-section">
      <div className="lumiere-container">
        <div
          className="timeline-container"
          id="timeline"
        >
          <div className="timeline-track" />
          <div
            className="timeline-progress"
            id="progressLine"
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className="timeline-step"
            >
              <div className="step-number">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="timeline-content">
                <span className="section-label">{step.overline}</span>
                <h3 style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                <p>{step.body}</p>
              </div>
              <div className="timeline-visual">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 768px) 85vw, 420px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
