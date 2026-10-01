import { useEffect, useRef } from "react";
import { mq } from "../lib/utils";

/** Soft light that follows the mouse (desktop only). */
export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (!mq("(pointer: fine)") || mq("(prefers-reduced-motion: reduce)")) return undefined;
    const el = ref.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let running = false;
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.5) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const onLeave = () => (el.style.opacity = "0");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
