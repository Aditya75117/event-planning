"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

type FilterKey = "all" | "weddings" | "corporate" | "private" | "destination";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Work" },
  { key: "weddings", label: "Weddings" },
  { key: "corporate", label: "Corporate" },
  { key: "private", label: "Private" },
  { key: "destination", label: "Destination" },
];

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    thumb: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
    full: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop",
    title: "Celestial Reception",
    meta: "Wedding • Paris",
    categories: ["weddings", "destination"] as FilterKey[],
  },
  {
    id: 2,
    thumb: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    full: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop",
    title: "Velvet Night",
    meta: "Corporate • London",
    categories: ["corporate"] as FilterKey[],
  },
  {
    id: 3,
    thumb: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=800&auto=format&fit=crop",
    full: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2000&auto=format&fit=crop",
    title: "Glasshouse Vows",
    meta: "Wedding • Tuscany",
    categories: ["weddings", "destination"] as FilterKey[],
  },
  {
    id: 4,
    thumb: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop",
    full: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2000&auto=format&fit=crop",
    title: "Noir Soirée",
    meta: "Private • New York",
    categories: ["private"] as FilterKey[],
  },
  {
    id: 5,
    thumb: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    full: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000&auto=format&fit=crop",
    title: "The Grand Hall",
    meta: "Gala • Vienna",
    categories: ["corporate", "destination"] as FilterKey[],
  },
  {
    id: 6,
    thumb: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
    full: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2000&auto=format&fit=crop",
    title: "Aqueous Bloom",
    meta: "Floral Architecture",
    categories: ["private"] as FilterKey[],
  },
];

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [modal, setModal] = useState<{
    open: boolean;
    src: string;
    title: string;
    meta: string;
  }>({ open: false, src: "", title: "", meta: "" });

  const filteredItems =
    activeFilter === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.categories.includes(activeFilter));

  const openModal = useCallback((src: string, title: string, meta: string) => {
    setModal({ open: true, src, title, meta });
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setModal((m) => ({ ...m, open: false }));
    if (typeof document !== "undefined") document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeModal]);

  return (
    <>
      <div className="gallery-filters">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`filter-btn${activeFilter === key ? " active" : ""}`}
            onClick={() => setActiveFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="text-center" style={{ marginBottom: "var(--space-lg)" }}>
        <span className="section-label">Visual Archive</span>
        <h2 style={{ fontFamily: "var(--font-display)" }}>
          Captured <span className="italic gold-text">Elegance</span>
        </h2>
      </div>

      <div className="masonry-grid">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="masonry-item"
            onClick={() => openModal(item.full, item.title, item.meta)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal(item.full, item.title, item.meta);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View ${item.title}`}
          >
            <Image
              src={item.thumb}
              alt={item.title}
              width={800}
              height={600}
              className="masonry-img"
            />
            <div className="masonry-overlay">
              <div className="portfolio-item-info">
                <h4 style={{ fontFamily: "var(--font-display)" }}>{item.title}</h4>
                <span>{item.meta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`gallery-modal${modal.open ? " active" : ""}`}
        onClick={closeModal}
        onKeyDown={(e) => e.key === "Escape" && closeModal()}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        <button
          type="button"
          className="gallery-modal-close"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
          aria-label="Close modal"
        >
          ×
        </button>
        <div
          className="gallery-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {modal.src && <img src={modal.src} alt={modal.title} />}
        </div>
        <div className="gallery-modal-caption">
          <h4 style={{ fontFamily: "var(--font-display)" }}>{modal.title}</h4>
          <span>{modal.meta}</span>
        </div>
      </div>
    </>
  );
}
