import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Typewriter from "../components/Typewriter";
import CinematicButton from "../components/CinematicButton";
import useSequence from "../hooks/useSequence";
import { useSound } from "../context/SoundContext";
import { setStars } from "../lib/stars";
import { proposalConfig } from "../data/config";
import { EASE, EASE_IN } from "../lib/utils";

// 0 darkness → 1 teaser → 2 first typed line → 3 second typed line → 4 button
const TIMELINE = [1700, 2600, null, null, null];

export default function CinematicIntro({ onOpen }) {
  const { intro } = proposalConfig;
  const reduce = useReducedMotion();
  const [step, next] = useSequence(TIMELINE);
  const [warping, setWarping] = useState(false);
  const { whoosh } = useSound();

  const open = () => {
    if (warping) return;
    setWarping(true);
    whoosh(1.6);
    setStars({ speed: reduce ? 0 : 75, brightness: 1.35 });
    setTimeout(onOpen, reduce ? 400 : 1750);
  };

  return (
    <motion.section
      className="scene intro"
      aria-label="Chapter 00 — The Secret"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9 } }}
    >
      <div className="scene__scroll">
        <motion.div
          className="scene__content intro__inner"
          animate={warping ? { scale: 1.7, opacity: 0, filter: "blur(8px)" } : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: EASE_IN }}
        >
          <AnimatePresence>
            {step >= 1 && (
              <motion.p
                key="eyebrow"
                className="eyebrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 1.6 }}
              >
                CHAPTER 00 · THE SECRET
              </motion.p>
            )}
          </AnimatePresence>
          {step >= 1 && (
            <motion.p
              className={`intro__teaser ${step >= 2 ? "is-small" : ""}`}
              layout
              initial={{ opacity: 0, filter: "blur(14px)", scale: 0.96 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              {intro.teaser}
            </motion.p>
          )}
          <div className="intro__lines">
            {step >= 2 && (
              <motion.p className="intro__line" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typewriter text={intro.lines[0]} onDone={next} startDelay={1100} />
              </motion.p>
            )}
            {step >= 3 && (
              <motion.p className="intro__line intro__line--soft" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typewriter text={intro.lines[1]} onDone={next} startDelay={500} />
              </motion.p>
            )}
          </div>
          <div className="intro__cta">
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.92, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                <CinematicButton variant="glow" onClick={open} disabled={warping}>
                  {intro.button}
                </CinematicButton>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {warping && (
          <motion.div
            className="warp-flash"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: reduce ? 0.4 : 1.75, times: [0, 0.7, 1], ease: "easeIn" }}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
