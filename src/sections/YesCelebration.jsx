import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Coffee, RotateCcw } from "lucide-react";
import GlowHeart from "../components/GlowHeart";
import RevealText from "../components/RevealText";
import CinematicButton from "../components/CinematicButton";
import CelebrationCanvas from "../components/CelebrationCanvas";
import useSequence from "../hooks/useSequence";
import { useSound } from "../context/SoundContext";
import { setStars } from "../lib/stars";
import { proposalConfig } from "../data/config";
import { EASE, whatsappLink } from "../lib/utils";

// 0 black → 1 one heartbeat → 2 BOOM → 3 wow → 4 new chapter → 5 status → 6 date → 7 coffee
const TIMELINE = [900, 1400, 1500, 2500, 2500, 2200, 2000, null];

const rise = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, ease: EASE },
};

function useToday() {
  return useMemo(() => {
    const d = new Date();
    try {
      return d.toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } catch {
      return d.toDateString();
    }
  }, []);
}

export default function YesCelebration({ onRestart }) {
  const { yes, game, whatsappNumber } = proposalConfig;
  const [step] = useSequence(TIMELINE);
  const { heartbeat, chime } = useSound();
  const today = useToday();

  useEffect(() => {
    if (step === 0) setStars({ brightness: 0.02, speed: 0.02 });
    if (step === 1) heartbeat(1.4);
    if (step === 2) {
      chime();
      setStars({ brightness: 1.2, speed: 3.5 });
      const t = setTimeout(() => setStars({ speed: 0.5, brightness: 1 }), 1400);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [step, heartbeat, chime]);

  return (
    <motion.section className="scene yes" aria-label="Final scene — Yes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8 } }}>
      {step >= 2 && (
        <>
          <motion.div className="boom-light" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.4, ease: EASE }} />
          <div className="light-rays" aria-hidden="true" />
          <motion.div
            className="boom-flash"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: [0, 1, 0], scale: [0.2, 1.4, 2.6] }}
            transition={{ duration: 1.3, times: [0, 0.18, 1], ease: "easeOut" }}
          />
          <CelebrationCanvas />
        </>
      )}

      {step === 1 && (
        <div className="yes__beat">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 1.25, 0.95, 1.1], opacity: 1 }} transition={{ duration: 1.1, ease: "easeOut" }}>
            <GlowHeart size={96} beating={false} />
          </motion.div>
        </div>
      )}

      <div className="scene__scroll">
        <div className="scene__content yes__content" aria-live="polite">
          {step >= 3 && (
            <motion.h1 className="yes__wow" initial={{ opacity: 0, scale: 1.4, filter: "blur(16px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, ease: EASE }}>
              {yes.wow}
            </motion.h1>
          )}
          {step >= 4 && <RevealText layout className="yes__line" text={yes.chapter} />}
          {step >= 5 && (
            <motion.div className="status-card" role="status" layout {...rise}>
              <div className="status-card__top" aria-hidden="true">
                <span className="status-card__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="mono">project-her ~ status</span>
              </div>
              <p className="status-card__title">PROJECT HER</p>
              <p className="status-card__row mono">
                STATUS:{" "}
                <motion.span className="badge" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 14 }}>
                  ❤️ ACCEPTED
                </motion.span>
              </p>
              <p className="status-card__row mono status-card__muted">
                &gt; game.realAnswer = <span className="status-card__str">"{game.reveal}"</span>
              </p>
            </motion.div>
          )}
          {step >= 6 && (
            <motion.div className="yes__date" layout {...rise}>
              <p>{yes.remember}</p>
              <p className="yes__today">
                <time dateTime={new Date().toISOString().slice(0, 10)}>{today}</time>
              </p>
            </motion.div>
          )}
          {step >= 7 && (
            <motion.div className="yes__coffee" layout {...rise}>
              <p className="yes__ask">{yes.date}</p>
              <CinematicButton variant="primary" href={whatsappLink(whatsappNumber, yes.whatsappMessage)} target="_blank" rel="noopener noreferrer">
                <Coffee size={18} aria-hidden="true" />
                {yes.button}
              </CinematicButton>
              <button type="button" className="text-btn" onClick={onRestart}>
                <RotateCcw size={14} aria-hidden="true" /> Restart experience
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
