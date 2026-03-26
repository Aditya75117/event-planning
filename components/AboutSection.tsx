"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useFadeIn } from "@/hooks/useFadeIn";


gsap.registerPlugin(ScrollTrigger);

const storyBlocks = [
  {
    overline: "Phase 01 — Conception",
    title: "The",
    titleHighlight: "Dream",
    body: "It begins with a feeling. A mood board of textures, aromas, and sounds. We translate your abstract desires into a concrete architectural blueprint for celebration. No detail is too esoteric; we listen to what isn't being said to capture the essence of your vision.",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2938&auto=format&fit=crop",
    alt: "Dreaming of the perfect event",
  },
  {
    overline: "Phase 02 — Architecture",
    title: "The",
    titleHighlight: "Planning",
    body: "Precision meets imagination. Timelines are drafted with surgical accuracy. Vendors are curated from our private black book of global artisans, florists, and gastronomes. We engineer the flow of the evening so every transition feels completely invisible.",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2940&auto=format&fit=crop",
    alt: "Meticulous event planning",
  },
  {
    overline: "Phase 03 — Orchestration",
    title: "The",
    titleHighlight: "Execution",
    body: "On the day, we are ghosts in the machine. Our production team operates in the shadows, anticipating needs before they arise. Lighting shifts seamlessly, courses drop in unison, and the atmosphere thickens exactly as designed.",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2940&auto=format&fit=crop",
    alt: "Flawless event execution",
  },
  {
    overline: "Phase 04 — Immersion",
    title: "The",
    titleHighlight: "Celebration",
    body: "You arrive as a guest at your own masterpiece. The burden of logistics vanishes, leaving only the pure, distilled emotion of the moment. Clinking glass, hushed conversations, and a night that burns brightly into memory.",
    image:
      "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=2787&auto=format&fit=crop",
    alt: "Joyful celebration",
  },
];

export default function AboutSection() {
  const iconRef = useFadeIn<HTMLDivElement>();
  const titleRef = useFadeIn<HTMLHeadingElement>({ delay: "0.1s" });
  const descRef = useFadeIn<HTMLParagraphElement>({ delay: "0.25s" });
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray<HTMLElement>(".story-block");

      blocks.forEach((block, i) => {
        const imgWrapper = block.querySelector(".story-img-wrapper");
        const label = block.querySelector(".section-label");
        const h2 = block.querySelector("h2");
        const p = block.querySelector(".lumiere-p");
        const isEven = i % 2 !== 0;
        const slideX = isEven ? -80 : 80;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        });

        gsap.fromTo(
          imgWrapper,
          { y: 60 },
          {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        tl.fromTo(
          label,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          0
        )
          .fromTo(
            h2,
            { opacity: 0, x: slideX },
            { opacity: 1, x: 0, duration: 0.5 },
            0.1
          )
          .fromTo(
            p,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.5 },
            0.3
          );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      style={{ padding: "var(--space-xl) 0" }}
    >
      <div className="bg-watermark" />
      <div className="lumiere-container">
        <div className="section-intro">
          <div ref={iconRef} className="icon-divider fade-in-opacity">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L15 8H21L16 12L18 18L12 14L6 18L8 12L3 8H9L12 2Z" />
            </svg>
          </div>
          <h2 ref={titleRef} className="fade-in" style={{ fontFamily: "var(--font-display)" }}>
            Our Philosophy
          </h2>
          <p ref={descRef} className="lumiere-p fade-in">
            An event is a fleeting moment, but its memory should be permanent. We
            craft narrative arcs through space, light, and hospitality.
          </p>
        </div>

        {storyBlocks.map((block, i) => (
          <div key={i} className="story-block">
            <div className="story-img-wrapper">
              <Image
                src={block.image}
                alt={block.alt}
                width={1200}
                height={600}
                className="story-img"
              />
            </div>
            <div className="story-content">
              <span className="section-label">{block.overline}</span>
              <h2 style={{ fontFamily: "var(--font-display)" }}>
                {block.title}{" "}
                <span className="italic gold-text">{block.titleHighlight}</span>
              </h2>
              <p className="lumiere-p">{block.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
