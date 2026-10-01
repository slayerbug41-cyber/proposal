import { useEffect, useRef } from "react";
import { starState } from "../lib/stars";
import { pointer } from "../lib/pointer";
import { mq } from "../lib/utils";

const COLORS = ["255,248,252", "255,248,252", "255,248,252", "255,248,252", "255,170,214", "196,176,255"];

/**
 * 3D star field on a single canvas. Calm drift, twinkle, shooting stars and a
 * hyperspace "warp" — all driven by starState, never by React renders.
 */
export default function StarField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = mq("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let nextShoot = last + 5000;
    let shooting = null;
    const stars = [];

    // Initial stars are placed on-screen at a random depth; respawns start far away.
    const spawn = (s, far) => {
      const z = far ? 1 : 0.08 + Math.random() * 0.92;
      s.x = (Math.random() * 2 - 1) * z;
      s.y = (Math.random() * 2 - 1) * z;
      s.z = z;
      s.c = COLORS[(Math.random() * COLORS.length) | 0];
      s.tw = Math.random() * Math.PI * 2;
      s.ts = 0.5 + Math.random() * 2.2;
      return s;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(620, Math.max(160, Math.round((w * h) / 2300)));
      while (stars.length < target) stars.push(spawn({}, false));
      stars.length = target;
    };

    const tick = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      starState.speed += (starState.targetSpeed - starState.speed) * (1 - Math.exp(-dt * 0.0022));
      starState.brightness += (starState.targetBrightness - starState.brightness) * (1 - Math.exp(-dt * 0.0016));
      const speed = reduce ? 0 : starState.speed;
      const b = starState.brightness;

      ctx.clearRect(0, 0, w, h);
      if (b > 0.004) {
        const cx = w / 2;
        const cy = h / 2;
        const dz = speed * dt * 0.00004;
        const streak = speed > 3;
        const ox = pointer.x * 22;
        const oy = pointer.y * 14;
        if (streak) ctx.lineCap = "round";

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.z -= dz;
          if (s.z < 0.04) spawn(s, true);
          const depth = 1 - s.z;
          const sx = cx + (s.x / s.z) * cx + ox * depth;
          const sy = cy + (s.y / s.z) * cy + oy * depth;
          if (sx < -30 || sx > w + 30 || sy < -30 || sy > h + 30) {
            spawn(s, true);
            continue;
          }
          s.tw += s.ts * dt * 0.001;
          const twinkle = reduce ? 0.85 : 0.6 + 0.4 * Math.sin(s.tw);
          const a = Math.min(1, 0.22 + depth * 1.15) * twinkle * Math.min(b, 1.4);
          const r = 0.35 + depth * 1.75;

          if (streak) {
            const tz = Math.min(1, s.z + dz * 7);
            const tx = cx + (s.x / tz) * cx + ox * (1 - tz);
            const ty = cy + (s.y / tz) * cy + oy * (1 - tz);
            ctx.strokeStyle = `rgba(${s.c},${Math.min(1, a * 1.3)})`;
            ctx.lineWidth = r;
            ctx.beginPath();
            ctx.moveTo(tx, ty);
            ctx.lineTo(sx, sy);
            ctx.stroke();
          } else if (r < 1.1) {
            ctx.fillStyle = `rgba(${s.c},${a})`;
            ctx.fillRect(sx - r, sy - r, r * 2, r * 2);
          } else {
            ctx.fillStyle = `rgba(${s.c},${a})`;
            ctx.beginPath();
            ctx.arc(sx, sy, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Occasional shooting star while things are calm.
        if (!reduce && !shooting && b > 0.5 && speed < 1.5 && now > nextShoot) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          shooting = {
            x: w * (0.2 + Math.random() * 0.6),
            y: h * (0.05 + Math.random() * 0.3),
            vx: dir * (0.5 + Math.random() * 0.35),
            vy: 0.22 + Math.random() * 0.15,
            life: 0,
            max: 1100,
          };
        }
        if (shooting) {
          const sh = shooting;
          sh.life += dt;
          sh.x += sh.vx * dt;
          sh.y += sh.vy * dt;
          const p = sh.life / sh.max;
          const alpha = Math.sin(Math.PI * Math.min(1, p)) * b;
          const len = 110;
          const mag = Math.hypot(sh.vx, sh.vy);
          const tx = sh.x - (sh.vx / mag) * len;
          const ty = sh.y - (sh.vy / mag) * len;
          const grad = ctx.createLinearGradient(tx, ty, sh.x, sh.y);
          grad.addColorStop(0, "rgba(255,138,199,0)");
          grad.addColorStop(1, `rgba(255,248,252,${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(sh.x, sh.y);
          ctx.stroke();
          if (p >= 1) {
            shooting = null;
            nextShoot = now + 6000 + Math.random() * 9000;
          }
        }
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

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
