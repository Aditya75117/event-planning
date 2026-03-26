"use client";

import Image from "next/image";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function TestimonialsSection() {
  const iconRef = useFadeIn<HTMLDivElement>();
  const quoteRef = useFadeIn<HTMLParagraphElement>({ delay: "0.2s" });
  const authorRef = useFadeIn<HTMLDivElement>({ delay: "0.4s" });
  const dotsRef = useFadeIn<HTMLDivElement>({ delay: "0.6s" });

  return (
    <section
      id="testimonials"
      className="text-center"
      style={{
        backgroundColor: "var(--bg-canvas)",
        padding: "var(--space-xl) 0",
      }}
    >
      <div className="lumiere-container">
        <div className="mx-auto max-w-[800px]">
          <div ref={iconRef} className="icon-divider fade-in-opacity">
            <svg viewBox="0 0 24 24">
              <path d="M14.017 18L14.017 14.923C14.017 10.126 15.681 7.218 19.983 6L21 8.16C19.064 8.653 18.069 9.873 17.79 11.666L21 11.666L21 18L14.017 18ZM5.016 18L5.016 14.923C5.016 10.126 6.681 7.218 10.983 6L12 8.16C10.064 8.653 9.069 9.873 8.79 11.666L12 11.666L12 18L5.016 18Z" />
            </svg>
          </div>
          <p
            ref={quoteRef}
            className="fade-in mb-8 text-2xl italic leading-snug text-[var(--text-main)]"
            style={{
              fontFamily: "var(--font-display)",
              lineHeight: 1.4,
            }}
          >
            &ldquo;They didn&apos;t just plan a wedding; they directed a
            cinematic masterpiece where we happened to be the lead actors.
            Flawless from the first tasting to the final dance.&rdquo;
          </p>
          <div
            ref={authorRef}
            className="fade-in mb-8 flex items-center justify-center gap-4"
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              alt="Client"
              width={50}
              height={50}
              className="rounded-full border border-[var(--border-gold)] object-cover"
            />
            <div className="text-left">
              <h5
                className="text-[1.1rem] text-[var(--text-main)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Alexander & Elena Croft
              </h5>
              <span className="text-[0.7rem] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                Lake Como Private Estate
              </span>
            </div>
          </div>
          <div ref={dotsRef} className="fade-in-opacity flex justify-center gap-2">
            <div
              className="h-1 w-1 rounded-full bg-[var(--accent-gold)]"
              style={{ transform: "scale(1.5)" }}
            />
            <div className="h-1 w-1 rounded-full bg-[var(--border-subtle)]" />
            <div className="h-1 w-1 rounded-full bg-[var(--border-subtle)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
