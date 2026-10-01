import { useMemo } from "react";

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const W = 1200;
const H = 320;
const WINDOW_COLORS = ["#FFD9A8", "#FF8AC7", "#C4A8FF", "#FFF1D6"];

function buildLayer(seed, minH, maxH, withWindows) {
  const r = rng(seed);
  const buildings = [];
  const windows = [];
  let x = -10;
  while (x < W + 10) {
    const bw = 28 + r() * 62;
    const bh = minH + Math.pow(r(), 1.4) * (maxH - minH);
    buildings.push({ x, w: bw, h: bh });
    if (withWindows) {
      for (let wy = H - bh + 10; wy < H - 8; wy += 12) {
        for (let wx = x + 5; wx < x + bw - 6; wx += 9) {
          if (r() < 0.11) {
            windows.push({ x: wx, y: wy, c: WINDOW_COLORS[(r() * WINDOW_COLORS.length) | 0], tw: r() < 0.25, d: (r() * 6).toFixed(2) });
          }
        }
      }
    }
    x += bw + r() * 4;
  }
  const tallest = buildings.reduce((a, b) => (b.h > a.h ? b : a), buildings[0]);
  return { buildings, windows, tallest };
}

/** Night skyline with lit windows, two parallax depths and a blinking antenna. */
export default function CityScape() {
  const far = useMemo(() => buildLayer(7, 70, 210, false), []);
  const near = useMemo(() => buildLayer(42, 40, 170, true), []);
  const t = near.tallest;

  return (
    <div className="city" aria-hidden="true">
      <div className="city__glow" />
      <svg className="city__layer city__layer--far" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        {far.buildings.map((b, i) => (
          <rect key={i} x={b.x} y={H - b.h} width={b.w} height={b.h} fill="#1a0f2e" />
        ))}
      </svg>
      <svg className="city__layer city__layer--near" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="cityNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#120a20" />
            <stop offset="1" stopColor="#05030A" />
          </linearGradient>
        </defs>
        {near.buildings.map((b, i) => (
          <rect key={i} x={b.x} y={H - b.h} width={b.w} height={b.h} fill="url(#cityNear)" />
        ))}
        {near.windows.map((w, i) => (
          <rect
            key={i}
            x={w.x}
            y={w.y}
            width="4"
            height="5"
            fill={w.c}
            className={w.tw ? "win win--tw" : "win"}
            style={w.tw ? { animationDelay: `${w.d}s` } : undefined}
          />
        ))}
        <line x1={t.x + t.w / 2} y1={H - t.h} x2={t.x + t.w / 2} y2={H - t.h - 26} stroke="#2a1a40" strokeWidth="2" />
        <circle cx={t.x + t.w / 2} cy={H - t.h - 27} r="2.6" fill="#FF3D9A" className="antenna" />
      </svg>
    </div>
  );
}
