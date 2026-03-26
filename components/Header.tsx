"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-[100] w-full border-b border-[var(--border-subtle)] px-[5vw] py-6 transition-all duration-500${scrolled ? " header-scrolled" : ""}`}
      style={{
        background: scrolled
          ? undefined
          : "linear-gradient(to bottom, var(--header-bg) 0%, var(--header-bg-end) 100%)",
        backdropFilter: scrolled ? undefined : "blur(5px)",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Link
          href="/"
          className="font-display text-[1.5rem] uppercase tracking-[0.1em] text-[var(--text-main)] no-underline"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Lumière
        </Link>
        <nav>
          <ul className="nav-links flex list-none gap-10">
            <li>
              <Link
                href="/services"
                className="text-[0.75rem] uppercase tracking-[0.15em] text-[var(--text-muted)] no-underline transition-colors duration-300 hover:text-[var(--accent-gold)]"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className="text-[0.75rem] uppercase tracking-[0.15em] text-[var(--text-muted)] no-underline transition-colors duration-300 hover:text-[var(--accent-gold)]"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-[0.75rem] uppercase tracking-[0.15em] text-[var(--text-muted)] no-underline transition-colors duration-300 hover:text-[var(--accent-gold)]"
              >
                The Process
              </Link>
            </li>
            <li>
              <Link
                href="#testimonials"
                className="text-[0.75rem] uppercase tracking-[0.15em] text-[var(--text-muted)] no-underline transition-colors duration-300 hover:text-[var(--accent-gold)]"
              >
                Journal
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[0.75rem] uppercase tracking-[0.15em] text-[var(--text-muted)] no-underline transition-colors duration-300 hover:text-[var(--accent-gold)]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link
            href="/contact"
            className="lumiere-btn lumiere-btn-outline py-3 px-6 text-[0.65rem]"
          >
            Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
