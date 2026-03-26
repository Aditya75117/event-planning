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
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1600&auto=format&fit=crop",
    alt: "Consultation",
  },
  {
    overline: "Strategy",
    title: "Planning",
    body: "Precision engineering meets creative vision. We draft high-fidelity 3D floor plans, source exclusive textiles, and curate a culinary journey. Every logistical pivot is accounted for, ensuring a seamless structural integrity for the entire experience.",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1600&auto=format&fit=crop",
    alt: "Planning",
  },
  {
    overline: "Production",
    title: "Execution",
    body: "Our production team descends on the venue with surgical focus. We manage the build-out, technical choreography, and vendor flow. On the day, we operate as invisible conductors, ensuring the crescendo of the event is perfectly timed.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1600&auto=format&fit=crop",
    alt: "Execution",
  },
  {
    overline: "Immersion",
    title: "Celebration",
    body: "The final transformation. You and your guests inhabit a space where the mechanics are hidden and only the atmosphere remains. We stay on-site until the final candle is extinguished, ensuring the memory of the night is as flawless as the night itself.",
    image:
      "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=1600&auto=format&fit=crop",
    alt: "Celebration",
  },
];

export default function AboutStickyStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".sticky-stack-card");

      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;
        const imgEl = card.querySelector(".sticky-stack-img");
        const overline = card.querySelector(".section-label");
        const title = card.querySelector(".sticky-stack-title");
        const body = card.querySelector(".sticky-stack-body");
        const counter = card.querySelector(".sticky-stack-counter");
        const isEven = i % 2 !== 0;
        const slideX = isEven ? -60 : 60;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: isLast ? "bottom bottom" : "+=100%",
          pin: !isLast,
          pinSpacing: !isLast,
        });

        if (!isLast) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.4,
            filter: "blur(3px)",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }

        gsap.fromTo(
          imgEl,
          { y: 80 },
          {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        });

        tl.fromTo(
          counter,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, color: "var(--accent-gold)", duration: 0.3 },
          0
        )
          .fromTo(
            overline,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 },
            0.05
          )
          .fromTo(
            title,
            { opacity: 0, x: slideX },
            { opacity: 1, x: 0, duration: 0.5 },
            0.1
          )
          .fromTo(
            body,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5 },
            0.25
          );
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="sticky-stack-wrapper">
      {steps.map((step, i) => (
        <div key={i} className="sticky-stack-card">
          <div className="sticky-stack-image">
            <Image
              src={step.image}
              alt={step.alt}
              fill
              sizes="50vw"
              className="sticky-stack-img object-cover"
            />
          </div>
          <div className="sticky-stack-content">
            <div className="sticky-stack-counter">
              {String(i + 1).padStart(2, "0")}
            </div>
            <span className="section-label">{step.overline}</span>
            <h2 className="sticky-stack-title">
              The{" "}
              <span className="italic gold-text">{step.title}</span>
            </h2>
            <p className="sticky-stack-body">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
