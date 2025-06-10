import { useId, useRef } from 'react';

// A simple counter for environments that don't have React's useId.
let idCounter = 0;

/**
 * Generates a unique and stable ID.
 * If a `providedId` is given, it will be used.
 * Otherwise, it leverages React's built-in `useId` hook.
 * As a fallback for older React versions, it uses a ref-based incrementing counter.
 */
export default function useUniqueId(providedId?: string | null): string {
  const idFromHook = useId();

  // Keep a ref to the ID to ensure it's stable across re-renders.
  // This is especially important for the fallback case.
  const stableIdRef = useRef<string | null>(null);

  if (stableIdRef.current === null) {
    // If an ID is provided, use it. Otherwise, use the one from the hook,
    // or fall back to the counter.
    stableIdRef.current = providedId || idFromHook || `panel-${idCounter++}`;
  }

  // Always return the providedId if it exists, otherwise return the stable, generated ID.
  return providedId || stableIdRef.current;
}
