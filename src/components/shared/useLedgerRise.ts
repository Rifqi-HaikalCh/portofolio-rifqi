import { useLayoutEffect, type RefObject } from 'react';

export function useLedgerRise(listRef: RefObject<HTMLOListElement | null>, resetKey: string) {
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = [...list.querySelectorAll<HTMLElement>(':scope > li')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.remove('is-waiting', 'is-settled'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          item.style.animationDelay = '0ms';
          item.classList.remove('is-waiting');
          item.classList.add('is-settled');
          observer.unobserve(item);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((item, index) => {
      item.classList.remove('is-waiting', 'is-settled');
      const rect = item.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (inView) {
        item.style.animationDelay = `${index * 70}ms`;
        item.classList.add('is-settled');
        return;
      }
      item.classList.add('is-waiting');
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [listRef, resetKey]);
}

export function useSectionRise(rootRef: RefObject<HTMLElement | null>, resetKey: string) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = [...root.querySelectorAll<HTMLElement>('section[data-studio]')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.remove('is-waiting', 'is-settled', 'section-rise'));
      return;
    }

    const settle = (item: HTMLElement, delayMs: number) => {
      item.style.animationDelay = `${delayMs}ms`;
      item.classList.add('section-rise', 'is-settled');
      item.classList.remove('is-waiting');
    };

    const revealIfEntered = (item: HTMLElement) => {
      const rect = item.getBoundingClientRect();
      const entered = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (!entered) return;
      settle(item, 0);
      observer.unobserve(item);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealIfEntered(entry.target as HTMLElement);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );

    const onScroll = () => {
      items.forEach((item) => {
        if (item.classList.contains('is-waiting')) revealIfEntered(item);
      });
    };

    items.forEach((item, index) => {
      item.classList.add('section-rise');
      item.classList.remove('is-waiting', 'is-settled');
      const rect = item.getBoundingClientRect();
      const seen = rect.bottom <= 0 || (rect.top < window.innerHeight * 0.92 && rect.bottom > 0);
      if (seen) {
        settle(item, index * 70);
        return;
      }
      item.classList.add('is-waiting');
      observer.observe(item);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [rootRef, resetKey]);
}
