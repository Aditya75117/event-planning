"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ContactSection() {
  const methodRefs = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    methodRefs.current.forEach((el) => el && observer.observe(el));
    if (formRef.current) observer.observe(formRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");

    setTimeout(() => {
      setFormState("success");
      setTimeout(() => {
        (e.target as HTMLFormElement).reset();
        setFormState("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <section className="contact-section">
      <div className="contact-watermark" />
      <div className="lumiere-container">
        <div className="contact-grid">
          <div className="contact-methods">
            <div
              ref={(el) => { methodRefs.current[0] = el; }}
              className="contact-method-item"
              style={{ transitionDelay: "0.1s" }}
            >
              <span className="section-label">Direct Dial</span>
              <h3 className="contact-method-title" style={{ fontFamily: "var(--font-display)" }}>
                Telephony
              </h3>
              <a href="tel:+12125550198" className="contact-method-detail">
                +1 (212) 555-0198
              </a>
            </div>

            <div
              ref={(el) => { methodRefs.current[1] = el; }}
              className="contact-method-item"
              style={{ transitionDelay: "0.3s" }}
            >
              <span className="section-label">Digital Inquiries</span>
              <h3 className="contact-method-title" style={{ fontFamily: "var(--font-display)" }}>
                Electronic Mail
              </h3>
              <a href="mailto:atelier@lumiere-events.com" className="contact-method-detail">
                atelier@lumiere-events.com
              </a>
            </div>

            <div
              ref={(el) => { methodRefs.current[2] = el; }}
              className="contact-method-item"
              style={{ transitionDelay: "0.5s" }}
            >
              <span className="section-label">The Studio</span>
              <h3 className="contact-method-title" style={{ fontFamily: "var(--font-display)" }}>
                New York Atelier
              </h3>
              <p className="contact-method-detail" style={{ margin: 0 }}>
                450 Park Avenue, Suite 1200
                <br />
                Manhattan, NY 10022
              </p>
            </div>

            <div
              ref={(el) => { methodRefs.current[3] = el; }}
              className="contact-method-item"
              style={{ transitionDelay: "0.7s" }}
            >
              <span className="section-label">Social Presence</span>
              <h3 className="contact-method-title" style={{ fontFamily: "var(--font-display)" }}>
                Global Journal
              </h3>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <Link href="#" className="contact-method-detail">
                  Instagram
                </Link>
                <Link href="#" className="contact-method-detail">
                  Pinterest
                </Link>
              </div>
            </div>
          </div>

          <div ref={formRef} className="contact-form-container">
            <span className="section-label">Request a Proposal</span>
            <h2 className="contact-form-title" style={{ fontFamily: "var(--font-display)" }}>
              Begin Your Event
            </h2>
            <form className="contact-page-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div className="contact-form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="contact-form-group">
                <div className="contact-form-select">
                  <select id="eventType" name="eventType" defaultValue="">
                    <option value="" disabled>
                      Select Event Type
                    </option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="private">Private Celebration</option>
                    <option value="gala">Gala & Fundraiser</option>
                    <option value="other">Other</option>
                  </select>
                  <svg
                    className="contact-select-arrow"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="var(--accent-gold)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="contact-form-group">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your vision..."
                />
              </div>
              <button
                type="submit"
                className={`contact-submit-btn${formState === "loading" ? " loading" : ""}${formState === "success" ? " success" : ""}`}
                disabled={formState === "loading"}
              >
                {formState === "idle" && (
                  <span className="btn-visible">Get Free Quote</span>
                )}
                {formState === "loading" && (
                  <span className="btn-visible" style={{ display: "inline-flex" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="var(--bg-canvas)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        className="contact-spinner-circle"
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="var(--accent-gold)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="50"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                )}
                {formState === "success" && (
                  <span className="btn-visible">✓ Sent</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
