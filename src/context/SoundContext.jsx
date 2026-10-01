import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { proposalConfig } from "../data/config";
import { asset } from "../lib/utils";

const SoundContext = createContext(null);

/**
 * Sound starts OFF. Music + synthesized effects (heartbeat, whoosh, chime)
 * only play after she taps the sound button. Everything fails silently.
 */
export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const fadeRaf = useRef(0);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try {
        ctxRef.current = new AC();
      } catch {
        return null;
      }
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume().catch(() => {});
    return ctxRef.current;
  }, []);

  const fade = useCallback((audio, to, ms, done) => {
    cancelAnimationFrame(fadeRaf.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / ms);
      try {
        audio.volume = from + (to - from) * p;
      } catch {
        /* iOS: volume is read-only */
      }
      if (p < 1) fadeRaf.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRaf.current = requestAnimationFrame(step);
  }, []);

  const playMusic = useCallback(() => {
    let a = audioRef.current;
    if (!a) {
      a = new Audio(asset(proposalConfig.music));
      a.loop = true;
      a.preload = "auto";
      a.volume = 0;
      a.addEventListener("error", () => {}); // missing file → just no music
      audioRef.current = a;
    }
    const p = a.play();
    if (p && p.then) {
      p.then(() => {
        if (enabledRef.current) fade(a, 0.5, 1800);
        else a.pause();
      }).catch(() => {});
    }
  }, [fade]);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    if (next) {
      getCtx(); // unlock inside the tap gesture
      playMusic();
    } else if (audioRef.current) {
      const a = audioRef.current;
      fade(a, 0, 500, () => a.pause());
    }
  }, [getCtx, playMusic, fade]);

  // Pause when the tab/app is hidden, resume when she comes back.
  useEffect(() => {
    const onVis = () => {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden) a.pause();
      else if (enabledRef.current) a.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const heartbeat = useCallback(
    (vol = 1) => {
      if (!enabledRef.current) return;
      const ctx = getCtx();
      if (!ctx) return;
      const thump = (at, freq, gain) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(freq, at);
        o.frequency.exponentialRampToValueAtTime(freq * 0.55, at + 0.18);
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(gain, at + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, at + 0.28);
        o.connect(g).connect(ctx.destination);
        o.start(at);
        o.stop(at + 0.32);
      };
      const t = ctx.currentTime + 0.01;
      thump(t, 72, 0.5 * vol);
      thump(t + 0.24, 60, 0.32 * vol);
    },
    [getCtx]
  );

  const whoosh = useCallback(
    (duration = 1.2) => {
      if (!enabledRef.current) return;
      const ctx = getCtx();
      if (!ctx) return;
      const len = Math.floor(ctx.sampleRate * duration);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 0.8;
      const t = ctx.currentTime;
      filter.frequency.setValueAtTime(200, t);
      filter.frequency.exponentialRampToValueAtTime(2400, t + duration * 0.8);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + duration * 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
      src.connect(filter).connect(g).connect(ctx.destination);
      src.start(t);
      src.stop(t + duration);
    },
    [getCtx]
  );

  const chime = useCallback(() => {
    if (!enabledRef.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((f, i) => {
      const at = ctx.currentTime + 0.02 + i * 0.11;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.07, at + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 1.8);
      o.connect(g).connect(ctx.destination);
      o.start(at);
      o.stop(at + 1.9);
    });
  }, [getCtx]);

  const value = useMemo(
    () => ({ enabled, toggle, heartbeat, whoosh, chime }),
    [enabled, toggle, heartbeat, whoosh, chime]
  );
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

const noop = () => {};
const fallback = { enabled: false, toggle: noop, heartbeat: noop, whoosh: noop, chime: noop };

export const useSound = () => useContext(SoundContext) || fallback;
