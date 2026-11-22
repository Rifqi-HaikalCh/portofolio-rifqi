import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/** false during SSR and hydration, true afterwards. No setState-in-effect. */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
