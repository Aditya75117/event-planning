"use client";

import { useEffect, useRef, useCallback } from "react";

interface FadeInOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: string;
}

export function useFadeIn<T extends HTMLElement = HTMLDivElement>(
  options: FadeInOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (options.delay) {
      el.style.transitionDelay = options.delay;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.delay, options.threshold, options.rootMargin]);

  return ref;
}

export function useFadeInGroup(
  count: number,
  options: FadeInOptions & { staggerDelay?: number } = {}
) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const { staggerDelay = 0.1, threshold, rootMargin } = options;

  const setRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      refs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold ?? 0.15,
        rootMargin: rootMargin ?? "0px 0px -50px 0px",
      }
    );

    refs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transitionDelay = `${i * staggerDelay}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [count, staggerDelay, threshold, rootMargin]);

  return setRef;
}
