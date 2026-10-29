import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import RainCanvas from "../components/RainCanvas";
import RevealText from "../components/RevealText";
import CinematicButton from "../components/CinematicButton";
import EndingActions from "./EndingActions";
import useSequence from "../hooks/useSequence";
import { setStars } from "../lib/stars";
import { proposalConfig } from "../data/config";

export default function MaybeEnding({ onRestart, onRevisit }) {
  const { lines, whatsappMessage } = proposalConfig.maybe;
  const timeline = useMemo(() => [1600, ...lines.map(() => 2800), null], [lines]);
  const [step, , tap] = useSequence(timeline);

  useEffect(() => setStars({ brightness: 0.14, speed: 0.03 }), []);

  return (
    <motion.section className="scene ending ending--maybe" aria-label="Final scene — Take your time" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8 } }} transition={{ duration: 2 }}>
      <motion.div className="rain-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}>
        <RainCanvas />
      </motion.div>
      <div className="rain-mist" aria-hidden="true" />
      <div className="scene__scroll" onClick={tap}>
        <div className="scene__content ending__content" aria-live="polite">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.6, duration: 1.4 }}>
            FINAL SCENE · TAKE YOUR TIME
          </motion.p>
          {lines.map((l, i) => step > i && <RevealText key={i} layout className={`ending-line ${i === 0 ? "ending-line--lg" : ""}`} text={l} />)}
          {step > lines.length && (
            <EndingActions message={whatsappMessage} onRestart={onRestart}>
              <CinematicButton variant="glass" onClick={onRevisit}>
                When you're ready, go back to the question
              </CinematicButton>
            </EndingActions>
          )}
        </div>
      </div>
    </motion.section>
  );
}
