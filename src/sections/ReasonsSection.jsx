import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChapterTransition from "../components/ChapterTransition";
import RevealText from "../components/RevealText";
import NextButton from "../components/NextButton";
import GlowHeart from "../components/GlowHeart";
import useSequence from "../hooks/useSequence";
import { useSound } from "../context/SoundContext";
import { setStars } from "../lib/stars";
import { proposalConfig } from "../data/config";
import { EASE } from "../lib/utils";

const line = {
  initial: { opacity: 0, y: 22, filter: "blur(14px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: EASE } },
  exit: { opacity: 0, y: -18, filter: "blur(12px)", transition: { duration: 0.7, ease: EASE } },
};

function ReasonsContent({ onNext }) {
  const { reasons, reasonsBridge, reasonsFinal } = proposalConfig;
  const n = reasons.length;
  // wait → each reason → bridge → blackout → final line → next button
  const timeline = useMemo(() => [800, ...reasons.map(() => 4000), 3200, 2300, 3200, null], [reasons]);
  const [step, , tap] = useSequence(timeline);
  const { heartbeat } = useSound();

  const phase = step === 0 ? "wait" : step <= n ? "reason" : step === n + 1 ? "bridge" : step === n + 2 ? "black" : "final";
  const dark = phase === "black" || phase === "final";

  useEffect(() => {
    if (phase === "black") setStars({ brightness: 0.03, speed: 0.02 });
    if (phase === "final") setStars({ brightness: 0.28, speed: 0.05 });
  }, [phase]);

  useEffect(() => {
    if (phase !== "final") return undefined;
    heartbeat(1);
    const id = setInterval(() => heartbeat(0.75), 1300);
    return () => clearInterval(id);
  }, [phase, heartbeat]);

  return (
    <div className="scene__content reasons" onClick={tap}>
      <motion.div className="blackout" aria-hidden="true" initial={false} animate={{ opacity: dark ? 0.9 : 0 }} transition={{ duration: 2.2 }} />
      <div className="reasons__stage" aria-live="polite">
        <AnimatePresence mode="wait">
          {phase === "reason" && (
            <motion.p key={`r${step}`} className="reason-line" {...line}>
              {reasons[step - 1]}
            </motion.p>
          )}
          {phase === "bridge" && (
            <motion.p key="bridge" className="reason-line reason-line--bridge" {...line}>
              {reasonsBridge}
            </motion.p>
          )}
          {phase === "final" && (
            <motion.div key="final" className="reasons__final" {...line}>
              <GlowHeart size={84} />
              <RevealText className="reason-line reason-line--final glow-text" text={reasonsFinal} stagger={0.14} delay={0.6} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="reasons__foot">
        {step > n + 3 ? (
          <NextButton onClick={onNext} />
        ) : (
          <div className={`reasons__dots ${dark ? "is-hidden" : ""}`} aria-hidden="true">
            {reasons.map((_, i) => (
              <span key={i} className={i < step ? "is-on" : ""} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReasonsSection({ onNext }) {
  return (
    <ChapterTransition chapter="04" title="WHY YOU?" subtitle="কেন তুমি?">
      <ReasonsContent onNext={onNext} />
    </ChapterTransition>
  );
}
