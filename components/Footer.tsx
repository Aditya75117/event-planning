"use client";

import { useFadeIn } from "@/hooks/useFadeIn";

export default function Footer() {
  const infoRef = useFadeIn();
  const formRef = useFadeIn({ delay: "0.2s" });
  const barRef = useFadeIn({ delay: "0.3s" });

  return (
    <footer
      id="contact"
      className="border-t border-[var(--border-subtle)]"
      style={{
        backgroundColor: "var(--bg-surface)",
        padding: "var(--space-xl) 0 var(--space-md)",
      }}
    >
      <div className="lumiere-container">
        <div className="footer-grid">
          <div ref={infoRef} className="footer-info fade-in">
            <span className="section-label">Inquiries</span>
            <h3
              className="mb-8 text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Begin the Conversation
            </h3>
            <p
              className="lumiere-p mb-8 max-w-[400px]"
              style={{ marginBottom: "var(--space-md)" }}
            >
              Share the preliminary details of your vision. Our creative
              directors review all inquiries within 24 hours to schedule a
              private consultation.
            </p>

            <div className="contact-details">
              <p className="text-[var(--text-main)]">Studio</p>
              <span className="mb-4 block text-[0.8rem] text-[var(--text-muted)]">
                450 Park Avenue, Suite 1200
                <br />
                New York, NY 10022
              </span>

              <p className="text-[var(--text-main)]">Direct</p>
              <span className="block text-[0.8rem] text-[var(--text-muted)]">
                +1 (212) 555-0198
                <br />
                atelier@lumiere-events.com
              </span>
            </div>
          </div>

          <div ref={formRef} className="contact-form-wrapper fade-in">
            <form
              className="contact-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Event Type (e.g. Wedding, Gala)"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Estimated Date & Location"
                />
              </div>
              <button
                type="submit"
                className="lumiere-btn lumiere-btn-outline mt-8 w-fit"
                style={{ marginTop: "var(--space-md)" }}
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        <div
          ref={barRef}
          className="fade-in-opacity flex items-center justify-between border-t border-[var(--border-subtle)] pt-8"
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          <p>© 2023 Lumière Event Architecture. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[var(--text-muted)] no-underline transition-colors duration-300 hover:text-[var(--accent-gold)]"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-[var(--text-muted)] no-underline transition-colors duration-300 hover:text-[var(--accent-gold)]"
            >
              Pinterest
            </a>
            <a
              href="#"
              className="text-[var(--text-muted)] no-underline transition-colors duration-300 hover:text-[var(--accent-gold)]"
            >
              Vogue Registry
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
