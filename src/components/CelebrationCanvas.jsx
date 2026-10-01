import { useEffect, useRef } from "react";
import { HEART_PATH, mq } from "../lib/utils";

const COLORS = ["#FF3D9A", "#FF8AC7", "#8B5CF6", "#FFF8FC", "#C4A8FF", "#FF6FB5"];

function dotSprite(color) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.22, color);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

function heartSprite(color) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  g.shadowColor = color;
  g.shadowBlur = 10;
  g.fillStyle = color;
  g.translate(32, 33);
  g.scale(1.65, 1.65);
  g.translate(-12, -12);
  g.fill(new Path2D(HEART_PATH));
  return c;
}

/** The "BOOM": a central particle explosion, shockwaves, mini bursts and rising hearts. */
export default function CelebrationCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = mq("(prefers-reduced-motion: reduce)");
    const dots = COLORS.map(dotSprite);
    const hearts = COLORS.slice(0, 5).map(heartSprite);
    let w = 0;
    let h = 0;
    let raf = 0;
    const start = performance.now();
    let last = start;
    let heartClock = 0;
    const particles = [];
    const floaters = [];
    const rings = [];
    const timers = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const burst = (x, y, n, power) => {
      for (let i = 0; i < n; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = (0.15 + Math.pow(Math.random(), 0.55)) * power;
        particles.push({
          x,
          y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          life: 0,
          max: 1300 + Math.random() * 1900,
          size: 4 + Math.random() * 11,
          s: dots[(Math.random() * dots.length) | 0],
        });
      }
      rings.push({ x, y, r: 0, life: 0, max: 1100, v: power * 0.75 });
    };

    const spawnHeart = () => {
      if (floaters.length > 170) return;
      floaters.push({
        x: Math.random() * w,
        y: h + 30,
        vy: 0.04 + Math.random() * 0.09,
        sway: 8 + Math.random() * 26,
        ph: Math.random() * Math.PI * 2,
        size: 9 + Math.random() * 22,
        rot: (Math.random() - 0.5) * 0.6,
        s: hearts[(Math.random() * hearts.length) | 0],
        life: 0,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reduce) {
      const scale = Math.min(1.25, Math.max(0.7, Math.min(w, h) / 600));
      burst(w / 2, h / 2, 280, 0.95 * scale);
      timers.push(setTimeout(() => burst(w / 2, h / 2, 120, 0.55 * scale), 260));
      [900, 1700, 2600, 3800].forEach((t) =>
        timers.push(
          setTimeout(() => burst(w * (0.18 + Math.random() * 0.64), h * (0.15 + Math.random() * 0.4), 70, 0.42 * scale), t)
        )
      );
    }

    const tick = (now) => {
      const dt = Math.min(48, now - last);
      last = now;
      const f = dt / 16.67;
      const elapsed = now - start;

      heartClock += dt;
      const every = reduce ? 700 : elapsed < 3500 ? 45 : 260;
      while (heartClock > every) {
        heartClock -= every;
        spawnHeart();
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.life += dt;
        const a = 1 - r.life / r.max;
        if (a <= 0) {
          rings.splice(i, 1);
          continue;
        }
        r.r += r.v * dt * a;
        ctx.strokeStyle = `rgba(255,138,199,${a * 0.55})`;
        ctx.lineWidth = 2 + a * 6;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      const drag = Math.pow(0.975, f);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.max) {
          particles.splice(i, 1);
          continue;
        }
        p.vx *= drag;
        p.vy = p.vy * drag + 0.00012 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const a = 1 - p.life / p.max;
        ctx.globalAlpha = a;
        const s = p.size * (0.6 + a * 0.6);
        ctx.drawImage(p.s, p.x - s / 2, p.y - s / 2, s, s);
      }

      ctx.globalCompositeOperation = "source-over";
      for (let i = floaters.length - 1; i >= 0; i--) {
        const q = floaters[i];
        q.life += dt;
        q.y -= q.vy * dt;
        if (q.y < -40) {
          floaters.splice(i, 1);
          continue;
        }
        const x = q.x + Math.sin(q.ph + q.life * 0.0015) * q.sway;
        const fadeIn = Math.min(1, q.life / 600);
        const fadeOut = Math.min(1, q.y / (h * 0.35));
        ctx.globalAlpha = 0.75 * fadeIn * fadeOut;
        ctx.save();
        ctx.translate(x, q.y);
        ctx.rotate(q.rot + Math.sin(q.life * 0.002 + q.ph) * 0.2);
        ctx.drawImage(q.s, -q.size / 2, -q.size / 2, q.size, q.size);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="fx-canvas celebration-canvas" aria-hidden="true" />;
}
