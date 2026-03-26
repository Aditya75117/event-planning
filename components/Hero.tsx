import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 text-center"
    >
      <div
        className="hero-bg absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=2940&auto=format&fit=crop')",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--hero-overlay-start) 0%, var(--hero-overlay-end) 100%)",
        }}
      />
      <div className="lumiere-container relative z-10 max-w-[800px]">
        <span
          className="section-label hero-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Exquisite Event Architecture
        </span>
        <h1
          className="hero-fade-in mb-8 text-[clamp(3rem,6vw,5.5rem)] font-normal leading-tight text-[var(--text-main)]"
          style={{
            fontFamily: "var(--font-display)",
            animationDelay: "0.5s",
          }}
        >
          We Create <br />
          <span className="italic gold-text">Unforgettable</span> Experiences
        </h1>
        <p
          className="hero-fade-in mx-auto mb-16 max-w-[600px] text-[1.1rem] text-[var(--text-muted)]"
          style={{ animationDelay: "0.7s" }}
        >
          Masterfully orchestrating luxury weddings, corporate galas, and
          private celebrations with obsessive attention to detail.
        </p>
        <Link
          href="#contact"
          className="hero-fade-in lumiere-btn lumiere-btn-solid"
          style={{ animationDelay: "0.9s" }}
        >
          Plan Your Event
        </Link>
      </div>
    </section>
  );
}
