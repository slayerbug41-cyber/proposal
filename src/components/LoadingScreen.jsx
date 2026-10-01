import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { proposalConfig } from "../data/config";
import { asset, EASE } from "../lib/utils";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0.06);
  const { title, subtitle, myName, photos } = proposalConfig;

  useEffect(() => {
    let cancelled = false;
    const start = performance.now();
    const tasks = [
      document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve(),
      ...photos.map(
        (p) =>
          new Promise((res) => {
            const img = new Image();
            img.onload = img.onerror = res;
            img.src = asset(typeof p === "string" ? p : p.src);
          })
      ),
    ];
    let done = 0;
    tasks.forEach((t) =>
      t.then(() => {
        done += 1;
        if (!cancelled) setProgress(Math.max(0.06, done / tasks.length));
      })
    );
    Promise.race([Promise.all(tasks), wait(4500)])
      .then(() => wait(Math.max(0, 2600 - (performance.now() - start))))
      .then(() => {
        if (cancelled) return;
        setProgress(1);
        setTimeout(() => !cancelled && onDone(), 650);
      });
    return () => {
      cancelled = true;
    };
  }, [onDone, photos]);

  // Letters animate one by one, but each word stays on one line.
  let k = 0;
  const words = title.split(" ").map((w) => Array.from(w).map((ch) => ({ ch, i: k++ })));
  return (
    <motion.div
      className="loading"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      exit={{ opacity: 0, filter: "blur(12px)", transition: { duration: 1.1, ease: EASE } }}
    >
      <motion.p className="loading__credit" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 1.2 }}>
        A FILM BY {myName.toUpperCase()}
      </motion.p>
      <h1 className="loading__title" aria-label={title}>
        {words.map((word, wi) => (
          <span key={wi} className="loading__word">
            {word.map(({ ch, i }) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.9, ease: EASE }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        ))}
        <motion.span
          className="loading__heart"
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 12 }}
        >
          ❤
        </motion.span>
      </h1>
      <motion.p className="loading__sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 1 }}>
        {subtitle}
      </motion.p>
      <div className="loading__bar" aria-hidden="true">
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: progress }} transition={{ duration: 0.9, ease: EASE }} />
      </div>
      <motion.p className="loading__hint" initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} transition={{ delay: 1.8, duration: 1 }}>
        🎧 চাইলে উপরের ডান কোণ থেকে sound চালু করে নিও
      </motion.p>
    </motion.div>
  );
}
