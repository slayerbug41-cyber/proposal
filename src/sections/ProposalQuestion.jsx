import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlowHeart from "../components/GlowHeart";
import RevealText from "../components/RevealText";
import CinematicButton from "../components/CinematicButton";
import Letterbox from "../components/Letterbox";
import useSequence from "../hooks/useSequence";
import { useSound } from "../context/SoundContext";
import { setStars } from "../lib/stars";
import { proposalConfig } from "../data/config";
import { EASE, hasRealName } from "../lib/utils";

// 0 black → 1 heart → 2-4 lead lines → 5 question → 6 promise → 7 choices
const TIMELINE = [1800, 2200, 2400, 2700, 2700, 3400, 3000, null];

export default function ProposalQuestion({ onAnswer }) {
  const { question: q, herName } = proposalConfig;
  const [step, , tap] = useSequence(TIMELINE);
  const [chosen, setChosen] = useState(null);
  const { heartbeat } = useSound();

  useEffect(() => {
    setStars({ brightness: step >= 5 ? 0.32 : 0.12, speed: 0.04 });
  }, [step]);

  const heartOn = step >= 1 && !chosen;
  useEffect(() => {
    if (!heartOn) return undefined;
    const id = setInterval(() => heartbeat(0.7), 1300);
    return () => clearInterval(id);
  }, [heartOn, heartbeat]);

  const answer = (kind) => {
    if (chosen) return;
    setChosen(kind);
    setTimeout(() => onAnswer(kind), 900);
  };

  return (
    <motion.section
      className="scene question"
      aria-label="Chapter 06 — The Question"
      initial={{ opacity: 0 }}
      animate={{ opacity: chosen ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: chosen ? 0.9 : 1.6 }}
    >
      <Letterbox active size="6svh" />
      <div className="scene__scroll" onClick={tap}>
        <div className="scene__content question__inner">
          {step >= 1 && (
            <motion.div
              className="question__heart"
              layout
              initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: step >= 5 ? 0.62 : 1, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <GlowHeart size={112} />
            </motion.div>
          )}

          {step >= 2 && step <= 4 && (
            <div className="question__lead" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  className="lead-line"
                  initial={{ opacity: 0, y: 14, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                  transition={{ duration: 1, ease: EASE }}
                >
                  {q.lead[step - 2]}
                </motion.p>
              </AnimatePresence>
            </div>
          )}

          {step >= 5 && (
            <motion.div className="question__ask" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              {hasRealName(herName) && <p className="question__name">{herName},</p>}
              <RevealText as="h1" className="ask" text={q.ask} stagger={0.12} />
            </motion.div>
          )}

          {step >= 6 && (
            <motion.div className="question__promise" layout>
              {q.promise.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 1.1, duration: 1, ease: EASE }}
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>
          )}

          {step >= 7 && (
            <motion.div
              className="question__choices"
              role="group"
              aria-label="Your answer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <div className="choices-main">
                <CinematicButton variant="primary" onClick={() => answer("yes")} disabled={!!chosen}>
                  <span aria-hidden="true">❤️</span> {q.yes}
                </CinematicButton>
                <CinematicButton variant="glass" onClick={() => answer("maybe")} disabled={!!chosen}>
                  <span aria-hidden="true">🌙</span> {q.maybe}
                </CinematicButton>
              </div>
              <button type="button" className="choice-no" onClick={() => answer("no")} disabled={!!chosen}>
                {q.no}
              </button>
              <p className="question__note">Whatever you choose is the right answer.</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
