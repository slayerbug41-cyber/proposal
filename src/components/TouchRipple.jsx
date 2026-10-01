import { useEffect, useRef } from "react";
import { mq } from "../lib/utils";

/** Glowing ripple wherever she touches (touch / pen only). */
export default function TouchRipple() {
  const ref = useRef(null);

  useEffect(() => {
    if (mq("(prefers-reduced-motion: reduce)")) return undefined;
    const host = ref.current;
    const onDown = (e) => {
      if (e.pointerType === "mouse") return;
      const r = document.createElement("span");
      r.className = "ripple";
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      r.addEventListener("animationend", () => r.remove());
      host.appendChild(r);
      if (host.childElementCount > 8) host.firstElementChild?.remove();
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return <div ref={ref} className="ripples" aria-hidden="true" />;
}
