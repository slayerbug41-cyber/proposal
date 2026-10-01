import { useCallback, useEffect, useState } from "react";

/**
 * Cinematic timeline. durations[i] = ms to stay on step i before moving on.
 * null = wait for next() (e.g. a typewriter finishing or a button).
 * Returns [step, next, tap] — tap skips ahead on timed steps only.
 */
export default function useSequence(durations) {
  const [step, setStep] = useState(0);
  const last = durations.length - 1;
  const current = durations[step];

  useEffect(() => {
    if (current == null) return undefined;
    const t = setTimeout(() => setStep((s) => Math.min(s + 1, last)), current);
    return () => clearTimeout(t);
  }, [step, current, last]);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, last)), [last]);

  const tap = useCallback(
    (e) => {
      if (e?.target?.closest?.("button, a, [data-no-skip]")) return;
      if (current != null) setStep((s) => Math.min(s + 1, last));
    },
    [current, last]
  );

  return [step, next, tap];
}
