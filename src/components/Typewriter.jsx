import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { graphemes } from "../lib/utils";

/** Types text one Bengali-safe character at a time, with a glowing cursor. */
export default function Typewriter({ text, speed = 55, startDelay = 700, onDone, className = "", keepCursor = false }) {
  const reduce = useReducedMotion();
  const parts = useMemo(() => graphemes(text), [text]);
  const [count, setCount] = useState(reduce ? parts.length : 0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (reduce) {
      setCount(parts.length);
      const t = setTimeout(() => doneRef.current?.(), 500);
      return () => clearTimeout(t);
    }
    let i = 0;
    let timer;
    const typeNext = () => {
      i += 1;
      setCount(i);
      if (i >= parts.length) {
        timer = setTimeout(() => doneRef.current?.(), 650);
        return;
      }
      const ch = parts[i - 1];
      const delay = /[…।?!,]/.test(ch) ? speed * 7 : ch === " " ? speed * 1.3 : speed * (0.65 + Math.random() * 0.7);
      timer = setTimeout(typeNext, delay);
    };
    timer = setTimeout(typeNext, startDelay);
    return () => clearTimeout(timer);
  }, [parts, speed, startDelay, reduce]);

  const done = count >= parts.length;
  return (
    <span className={`typewriter ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {parts.slice(0, count).join("")}
        {(!done || keepCursor) && <span className="type-cursor" />}
        <span className="typewriter__ghost">{parts.slice(count).join("")}</span>
      </span>
    </span>
  );
}
