import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import RevealText from "../components/RevealText";
import EndingActions from "./EndingActions";
import useSequence from "../hooks/useSequence";
import { setStars } from "../lib/stars";
import { proposalConfig } from "../data/config";
import { EASE } from "../lib/utils";

export default function NoEnding({ onRestart }) {
  const { lines, whatsappMessage } = proposalConfig.no;
  const timeline = useMemo(() => [2000, ...lines.map(() => 2900), null], [lines]);
  const [step, , tap] = useSequence(timeline);

  useEffect(() => setStars({ brightness: 0, speed: 0.02 }), []);

  return (
    <motion.section className="scene ending ending--no" aria-label="Final scene — Sunrise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8 } }} transition={{ duration: 2 }}>
      <div className="sunrise" aria-hidden="true">
        <motion.div className="sun" initial={{ y: "38svh", opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 7, ease: EASE }} />
        <div className="sunrise__rays" />
        <div className="sunrise__haze" />
      </div>
      <div className="scene__scroll" onClick={tap}>
        <div className="scene__content ending__content" aria-live="polite">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.8, duration: 1.4 }}>
            FINAL SCENE · A NEW MORNING
          </motion.p>
          {lines.map((l, i) => step > i && <RevealText key={i} layout className={`ending-line ${i === 0 ? "ending-line--lg" : ""}`} text={l} />)}
          {step > lines.length && <EndingActions message={whatsappMessage} onRestart={onRestart} />}
        </div>
      </div>
    </motion.section>
  );
}
