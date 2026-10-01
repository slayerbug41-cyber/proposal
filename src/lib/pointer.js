import { mq } from "./utils";

// Smoothed pointer / device-tilt position in the range -1..1.
// Written to CSS variables (--px, --py) so parallax layers never re-render React.
export const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

let started = false;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function startPointerTracking() {
  if (started || typeof window === "undefined") return;
  started = true;
  if (mq("(prefers-reduced-motion: reduce)")) return;

  const root = document.documentElement;
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true }
  );
  // Gentle phone parallax where it's available without a permission prompt.
  window.addEventListener(
    "deviceorientation",
    (e) => {
      if (e.gamma == null || e.beta == null) return;
      pointer.tx = clamp(e.gamma / 25, -1, 1);
      pointer.ty = clamp((e.beta - 40) / 25, -1, 1);
    },
    { passive: true }
  );

  let lx = 0;
  let ly = 0;
  const tick = () => {
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;
    if (Math.abs(pointer.x - lx) > 0.002 || Math.abs(pointer.y - ly) > 0.002) {
      lx = pointer.x;
      ly = pointer.y;
      root.style.setProperty("--px", lx.toFixed(3));
      root.style.setProperty("--py", ly.toFixed(3));
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
