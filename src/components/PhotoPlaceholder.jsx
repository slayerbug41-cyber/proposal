/** Illustrated stand-ins for photos that aren't there yet. */
const SCENES = [
  // moon over water
  (
    <>
      <rect width="200" height="250" fill="url(#ph-sky-0)" />
      <circle cx="140" cy="70" r="26" fill="#FFF1F8" opacity=".95" />
      <circle cx="140" cy="70" r="46" fill="#FF8AC7" opacity=".12" />
      <rect y="170" width="200" height="80" fill="#0b0716" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={118 - i * 4} y={180 + i * 12} width={44 + i * 8} height="2" rx="1" fill="#FFF1F8" opacity={0.5 - i * 0.08} />
      ))}
    </>
  ),
  // city bokeh
  (
    <>
      <rect width="200" height="250" fill="url(#ph-sky-1)" />
      {[
        [40, 60, 18, "#FF8AC7"], [120, 50, 26, "#8B5CF6"], [160, 120, 16, "#FFD9A8"], [70, 140, 30, "#FF3D9A"],
        [30, 200, 14, "#C4A8FF"], [150, 200, 22, "#FF8AC7"], [100, 95, 10, "#FFF1D6"],
      ].map(([x, y, r, c], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={c} opacity=".35" />
      ))}
    </>
  ),
  // coffee with a heart of steam
  (
    <>
      <rect width="200" height="250" fill="url(#ph-sky-2)" />
      <path d="M100 92c-6-10-22-8-22 4 0 10 14 18 22 26 8-8 22-16 22-26 0-12-16-14-22-4z" fill="#FF8AC7" opacity=".55" />
      <path d="M86 140c0-10 10-12 10-22M110 140c0-10 10-12 10-22" stroke="#FFF1F8" strokeWidth="2" fill="none" opacity=".35" strokeLinecap="round" />
      <rect x="62" y="150" width="76" height="56" rx="10" fill="#FFF1F8" opacity=".92" />
      <path d="M138 162h8a12 12 0 010 24h-8" stroke="#FFF1F8" strokeWidth="6" fill="none" opacity=".92" />
      <ellipse cx="100" cy="212" rx="56" ry="6" fill="#000" opacity=".3" />
    </>
  ),
];

const SKIES = [
  ["#1b1035", "#3a1a4a"],
  ["#14091f", "#2b1140"],
  ["#2a1230", "#4a1f45"],
];

export default function PhotoPlaceholder({ index = 0 }) {
  const k = index % SCENES.length;
  return (
    <svg className="photo__placeholder" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`ph-sky-${k}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SKIES[k][0]} />
          <stop offset="1" stopColor={SKIES[k][1]} />
        </linearGradient>
      </defs>
      {SCENES[k]}
    </svg>
  );
}
