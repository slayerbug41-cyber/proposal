import { useId } from "react";
import { HEART_PATH } from "../lib/utils";

/** Neon heart with a halo and an optional lub-dub heartbeat. */
export default function GlowHeart({ size = 96, beating = true, className = "" }) {
  const id = "gh" + useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <div className={`glow-heart ${beating ? "is-beating" : ""} ${className}`} style={{ "--size": `${size}px` }} aria-hidden="true">
      <div className="glow-heart__halo" />
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF8AC7" />
            <stop offset=".55" stopColor="#FF3D9A" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path d={HEART_PATH} fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
