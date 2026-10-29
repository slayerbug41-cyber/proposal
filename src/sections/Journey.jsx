import { motion } from "framer-motion";
import ChapterTransition from "../components/ChapterTransition";
import RevealText from "../components/RevealText";
import NextButton from "../components/NextButton";
import CityScape from "../components/CityScape";
import Moon from "../components/Moon";
import useSequence from "../hooks/useSequence";
import { proposalConfig } from "../data/config";
import { EASE } from "../lib/utils";

// 0 → line 1 → line 2 → (dramatic pause) → line 3 → next
const TIMELINE = [700, 4000, 2700, 1400, 3000, null];

function JourneyContent({ onNext }) {
  const lines = proposalConfig.journey;
  const [step, , tap] = useSequence(TIMELINE);
  return (
    <div className="scene__content journey" onClick={tap}>
      <div className="journey__text camera-drift" aria-live="polite">
        {step >= 1 && <RevealText layout className="line line--lg" text={lines[0]} />}
        {step >= 2 && <RevealText layout className="line line--md line--soft" text={lines[1]} delay={0.1} />}
        {step >= 4 && <RevealText layout className="line line--xl glow-text" text={lines[2]} stagger={0.11} />}
      </div>
      {step >= 5 && <NextButton onClick={onNext} />}
    </div>
  );
}

export default function Journey({ onNext }) {
  return (
    <ChapterTransition
      chapter="01"
      title="THE JOURNEY"
      subtitle="How it all began"
      className="scene--journey"
      background={
        <motion.div
          className="journey__bg"
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 3.2, ease: EASE }}
        >
          <Moon className="parallax-far" />
          <div className="parallax-near">
            <CityScape />
          </div>
        </motion.div>
      }
    >
      <JourneyContent onNext={onNext} />
    </ChapterTransition>
  );
}
