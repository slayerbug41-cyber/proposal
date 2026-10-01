import { useEffect, useRef } from "react";
import { mq } from "../lib/utils";

/** Soft, slanted night rain. Calm, not stormy. */
export default function RainCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = mq("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    const drops = [];

    const make = (d, top) => {
      d.x = Math.random() * (w + 200) - 100;
      d.y = top ? -Math.random() * h * 0.3 : Math.random() * h;
      d.len = 10 + Math.random() * 18;
      d.v = 0.55 + Math.random() * 0.55;
      d.a = 0.08 + Math.random() * 0.22;
      return d;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = reduce ? 0 : Math.min(240, Math.round(w / 4));
      while (drops.length < target) drops.push(make({}, false));
      drops.length = target;
    };

    const tick = (now) => {
      const dt = Math.min(48, now - last);
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineWidth = 1;
      for (const d of drops) {
        d.y += d.v * dt;
        d.x -= d.v * dt * 0.18;
        if (d.y - d.len > h) make(d, true);
        ctx.strokeStyle = `rgba(200,205,255,${d.a})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * 0.18, d.y - d.len);
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="fx-canvas rain-canvas" aria-hidden="true" />;
}
