import { useLayoutEffect, type RefObject } from 'react';

export function useLedgerRise(listRef: RefObject<HTMLOListElement | null>, resetKey: string) {
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = Array.from(list.querySelectorAll<HTMLElement>(':scope > li'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.remove('is-waiting', 'is-settled'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            item.style.animationDelay = '0ms';
            item.classList.remove('is-waiting', 'is-shown');
            item.classList.add('is-settled');
            observer.unobserve(item);
            return;
          }
          if (entry.boundingClientRect.bottom <= 0) {
            item.classList.remove('is-waiting', 'is-settled');
            item.classList.add('is-shown');
            observer.unobserve(item);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach((item, index) => {
      item.classList.remove('is-waiting', 'is-settled', 'is-shown');
      const rect = item.getBoundingClientRect();
      if (rect.bottom <= 0) {
        item.classList.add('is-shown');
        return;
      }
      const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (inView) {
        item.style.animationDelay = `${index * 90}ms`;
        item.classList.add('is-settled');
        return;
      }
      item.classList.add('is-waiting');
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [listRef, resetKey]);
}

const riseSelector = '.rise-item, section[data-studio], footer[data-studio]';

function isRiseTarget(item: HTMLElement) {
  if (item.classList.contains('rise-item')) return true;
  if (!item.matches('section[data-studio], footer[data-studio]')) return false;
  return item.querySelector('.rise-item') === null;
}

function riseTargets(root: ParentNode) {
  const found = Array.from(root.querySelectorAll<HTMLElement>(riseSelector)).filter(isRiseTarget);
  if (root instanceof HTMLElement && isRiseTarget(root) && !found.includes(root)) found.unshift(root);
  return found;
}

export function useSectionRise(rootRef: RefObject<HTMLElement | null>, resetKey: string) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const armed = new Set<HTMLElement>();
    const waiting = new Set<HTMLElement>();

    if (reduce || !('IntersectionObserver' in window)) {
      riseTargets(root).forEach((item) => {
        item.classList.remove('is-waiting', 'is-settled', 'is-shown', 'section-rise');
        item.style.animationDelay = '';
      });
      return;
    }

    const settle = (item: HTMLElement, delayMs: number) => {
      item.style.animationDelay = `${delayMs}ms`;
      item.classList.add('section-rise', 'is-settled');
      item.classList.remove('is-waiting', 'is-shown');
      waiting.delete(item);
    };

    const showPassed = (item: HTMLElement) => {
      item.style.animationDelay = '';
      item.classList.add('section-rise', 'is-shown');
      item.classList.remove('is-waiting', 'is-settled');
      waiting.delete(item);
    };

    let listening = false;
    let queued = false;
    let alive = true;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        if (!alive) return;
        waiting.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const entered = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
          const passed = rect.bottom <= 0;
          if (!entered && !passed) return;
          observer.unobserve(item);
          if (passed && !entered) showPassed(item);
          else settle(item, 0);
        });
        if (waiting.size === 0) {
          window.removeEventListener('scroll', onScroll);
          listening = false;
        }
      });
    };

    const ensureScroll = () => {
      if (listening || waiting.size === 0) return;
      listening = true;
      window.addEventListener('scroll', onScroll, { passive: true });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLElement;
          if (!waiting.has(item)) return;
          if (entry.isIntersecting) {
            observer.unobserve(item);
            settle(item, 0);
            return;
          }
          if (entry.boundingClientRect.bottom <= 0) {
            observer.unobserve(item);
            showPassed(item);
          }
        });
        if (waiting.size === 0 && listening) {
          window.removeEventListener('scroll', onScroll);
          listening = false;
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );

    const place = (item: HTMLElement, delayMs: number) => {
      if (armed.has(item)) return;
      const rect = item.getBoundingClientRect();
      if (rect.width < 1 && rect.height < 1) return;
      armed.add(item);
      item.classList.add('section-rise');
      item.classList.remove('is-waiting', 'is-settled', 'is-shown');
      if (rect.bottom <= 0) {
        showPassed(item);
        return;
      }
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        settle(item, delayMs);
        return;
      }
      item.classList.add('is-waiting');
      waiting.add(item);
      observer.observe(item);
    };

    const scan = (scope: ParentNode) => {
      const fresh = riseTargets(scope).filter((item) => !armed.has(item));
      let stagger = 0;
      fresh.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const inView = rect.height > 0 && rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
        place(item, inView ? stagger * 90 : 0);
        if (inView && armed.has(item)) stagger += 1;
      });
      ensureScroll();
    };

    scan(root);

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) scan(node);
        });
      });
    });
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      alive = false;
      observer.disconnect();
      mutations.disconnect();
      if (listening) window.removeEventListener('scroll', onScroll);
      armed.forEach((item) => {
        item.classList.remove('section-rise', 'is-waiting', 'is-settled', 'is-shown');
        item.style.animationDelay = '';
      });
    };
  }, [rootRef, resetKey]);
}
