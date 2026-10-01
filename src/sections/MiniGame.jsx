import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChapterTransition from "../components/ChapterTransition";
import CinematicButton from "../components/CinematicButton";
import RevealText from "../components/RevealText";
import { ArrowRight } from "lucide-react";
import { proposalConfig } from "../data/config";
import { EASE } from "../lib/utils";

const LOG = ["> reading vibes…", "> cross-checking chat history…", "> calculating smile ratio…", "> result: very interesting ✓"];
const fade = {
  initial: { opacity: 0, y: 16, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
  exit: { opacity: 0, y: -12, filter: "blur(8px)", transition: { duration: 0.5 } },
};

function GameContent({ onNext }) {
  const { game } = proposalConfig;
  const [choice, setChoice] = useState(null);
  const [phase, setPhase] = useState("ask"); // ask → scan → react
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (phase !== "scan") return undefined;
    const t = setTimeout(() => setPhase("react"), 2600);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "react" || beat >= 2) return undefined;
    const t = setTimeout(() => setBeat((b) => b + 1), beat === 0 ? 2600 : 2000);
    return () => clearTimeout(t);
  }, [phase, beat]);

  const pick = (i) => {
    if (choice !== null) return;
    setChoice(i);
    setTimeout(() => setPhase("scan"), 650);
  };

  return (
    <div className="scene__content game">
      <AnimatePresence mode="wait">
        {phase === "ask" && (
          <motion.div key="ask" className="game__ask" {...fade}>
            <p className="eyebrow">A TINY TEST</p>
            <h2 className="game__title">{game.title}</h2>
            <p className="game__question">{game.question}</p>
            <div className="game__choices" role="group" aria-label="একটা উত্তর বেছে নাও">
              {game.choices.map((c, i) => (
                <motion.button
                  type="button"
                  key={i}
                  className={`choice ${choice === i ? "is-picked" : ""} ${choice !== null && choice !== i ? "is-dim" : ""}`}
                  onClick={() => pick(i)}
                  disabled={choice !== null}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.14, duration: 0.7, ease: EASE }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="choice__key" aria-hidden="true">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="choice__text">{c}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "scan" && (
          <motion.div key="scan" className="scan" role="status" {...fade}>
            <p className="scan__title mono">ANALYZING YOUR ANSWER…</p>
            <div className="scan__bar" aria-hidden="true">
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.2, ease: "easeInOut" }} />
            </div>
            <ul className="scan__log mono">
              {LOG.map((l, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.5 }}>
                  {l}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {phase === "react" && (
          <motion.div key="react" className="game__react" {...fade} aria-live="polite">
            <p className="game__picked">
              তোমার answer: <span>{game.choices[choice]}</span>
            </p>
            <RevealText as="h2" className="game__response" text={game.response} />
            {game.reactions?.[choice] && (
              <motion.p className="game__reaction" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
                {game.reactions[choice]}
              </motion.p>
            )}
            {beat >= 1 && <RevealText className="game__later" text={game.later} />}
            {beat >= 2 && (
              <motion.div className="next-wrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
                <p className="next-hint">FINAL SCENE</p>
                <CinematicButton variant="glass" onClick={onNext}>
                  শেষ দৃশ্যে চলো
                  <ArrowRight size={18} aria-hidden="true" />
                </CinematicButton>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MiniGame({ onNext }) {
  return (
    <ChapterTransition chapter="05" title="A TINY TEST" subtitle="একটু খেলা যাক?">
      <GameContent onNext={onNext} />
    </ChapterTransition>
  );
}
