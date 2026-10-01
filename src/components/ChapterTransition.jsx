import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Letterbox from "./Letterbox";
import { useSound } from "../context/SoundContext";
import { EASE } from "../lib/utils";

/**
 * Wraps a chapter: camera push-in, a title card with letterbox bars,
 * then mounts the content (so its timeline starts after the card).
 */
export default function ChapterTransition({ chapter, title, subtitle, background, className = "", children }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const { whoosh } = useSound();

  useEffect(() => {
    whoosh(1.1);
    const t = setTimeout(() => setReady(true), reduce ? 1100 : 2300);
    return () => clearTimeout(t);
  }, [reduce, whoosh]);

  return (
    <motion.section
      className={`scene ${className}`}
      aria-label={`Chapter ${chapter} — ${title}`}
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.8, ease: EASE } }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      {background}
      <Letterbox active={!ready} />
      <AnimatePresence mode="wait">
        {!ready ? (
          <motion.button
            type="button"
            key="card"
            className="chapter-card"
            onClick={() => setReady(true)}
            aria-label={`Chapter ${chapter}: ${title}. শুরু করতে tap করো`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)", transition: { duration: 0.6 } }}
          >
            <motion.span
              className="chapter-card__num"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
            >
              CHAPTER {chapter}
            </motion.span>
            <motion.span
              className="chapter-card__rule"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: EASE }}
            />
            <motion.span
              className="chapter-card__title"
              initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(12px)" }}
              animate={{ opacity: 1, letterSpacing: "0.16em", filter: "blur(0px)" }}
              transition={{ delay: 0.55, duration: 1.4, ease: EASE }}
            >
              {title}
            </motion.span>
            {subtitle && (
              <motion.span
                className="chapter-card__sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.9 }}
              >
                {subtitle}
              </motion.span>
            )}
          </motion.button>
        ) : (
          <motion.div
            key="content"
            className="scene__scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
