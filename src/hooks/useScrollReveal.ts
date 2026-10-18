import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends Element>({
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  once = false,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'home');

  useEffect(() => {
    if (!sectionIds.length) return;

    let rafId: number | null = null;
    const NAVBAR_HEIGHT = 80;

    const determineActiveSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Top of page edge case
      if (scrollY < 90) {
        setActiveSection(sectionIds[0] || 'home');
        return;
      }

      // Bottom of page edge case
      if (windowHeight + scrollY >= documentHeight - 60) {
        const lastId = sectionIds[sectionIds.length - 1];
        if (lastId) setActiveSection(lastId);
        return;
      }

      // Focal reading line: 30% down the viewport, below fixed navbar
      const focalLine = Math.min(Math.max(NAVBAR_HEIGHT + 40, windowHeight * 0.35), 320);

      let currentActive = activeSection;
      let maxVisibleCoverage = -1;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // Check if focal reading line falls inside this section
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          currentActive = id;
          maxVisibleCoverage = 999999;
          break;
        }

        // Alternatively find section with greatest visible area in viewport
        const visibleTop = Math.max(rect.top, NAVBAR_HEIGHT);
        const visibleBottom = Math.min(rect.bottom, windowHeight);
        const visibleCoverage = Math.max(0, visibleBottom - visibleTop);

        if (visibleCoverage > maxVisibleCoverage) {
          maxVisibleCoverage = visibleCoverage;
          currentActive = id;
        }
      }

      setActiveSection(currentActive);
    };

    const onScrollOrResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(determineActiveSection);
    };

    // Initial check
    determineActiveSection();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Also use IntersectionObserver to detect programmatic scroll stops
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(() => onScrollOrResize(), {
        rootMargin: '-80px 0px -40% 0px',
        threshold: [0, 0.2, 0.5, 0.8],
      });
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
