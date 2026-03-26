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

export default function AboutStickyImage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const blocks = blockRefs.current.filter(Boolean) as HTMLElement[];
      const images = imageRefs.current.filter(Boolean) as HTMLElement[];

      if (blocks.length === 0 || images.length === 0) return;

      images.forEach((img, i) => {
        gsap.set(img, { opacity: i === 0 ? 1 : 0 });
      });

      blocks.forEach((block, i) => {
        if (i === 0) return;

        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(images[i - 1], { opacity: 0, duration: 0.6, ease: "power2.inOut" });
            gsap.to(images[i], { opacity: 1, duration: 0.6, ease: "power2.inOut" });
          },
          onLeaveBack: () => {
            gsap.to(images[i], { opacity: 0, duration: 0.6, ease: "power2.inOut" });
            gsap.to(images[i - 1], { opacity: 1, duration: 0.6, ease: "power2.inOut" });
          },
        });
      });

      blocks.forEach((block) => {
        const label = block.querySelector(".section-label");
        const counter = block.querySelector(".si-counter");
        const title = block.querySelector(".si-title");
        const body = block.querySelector(".si-body");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        });

        tl.fromTo(
          counter,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, color: "var(--accent-gold)", duration: 0.3 },
          0
        )
          .fromTo(
            label,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 },
            0.05
          )
          .fromTo(
            title,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5 },
            0.1
          )
          .fromTo(
            body,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
            0.25
          );
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="si-wrapper">
      <div className="si-layout">
        <div className="si-content-col">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { blockRefs.current[i] = el; }}
              className="si-content-block"
            >
              <div className="si-counter">
                {String(i + 1).padStart(2, "0")}
              </div>
              <span className="section-label">{step.overline}</span>
              <h2 className="si-title" style={{ fontFamily: "var(--font-display)" }}>
                The <span className="italic gold-text">{step.title}</span>
              </h2>
              <p className="si-body">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="si-image-col">
          <div className="si-image-sticky">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { imageRefs.current[i] = el; }}
                className="si-image"
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
