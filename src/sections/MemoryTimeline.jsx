import { useState } from "react";
import { motion } from "framer-motion";
import ChapterTransition from "../components/ChapterTransition";
import RevealText from "../components/RevealText";
import NextButton from "../components/NextButton";
import { proposalConfig } from "../data/config";
import { EASE, pad2 } from "../lib/utils";

function MemoryStar({ memory, index, lit, onToggle }) {
  const side = index % 2 === 0 ? -1 : 1;
  return (
    <motion.li
      className={`memory memory--${side < 0 ? "left" : "right"}`}
      initial={{ opacity: 0, x: side * 46, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <span className={`memory__node ${lit ? "is-lit" : ""}`} aria-hidden="true" />
      <div className="memory__float" style={{ animationDelay: `${index * -1.7}s` }}>
        <button type="button" className={`memory__body ${lit ? "is-lit" : ""}`} onClick={onToggle} aria-pressed={lit}>
          <span className="memory__num" aria-hidden="true">
            {pad2(index + 1)}
          </span>
          <span className="memory__title">{memory.title}</span>
          <span className="memory__text">“{memory.text}”</span>
          {lit && (
            <span className="memory__sparks" aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <i key={i} style={{ "--a": `${i * 60}deg` }} />
              ))}
            </span>
          )}
        </button>
      </div>
    </motion.li>
  );
}

function MomentsContent({ onNext }) {
  const { memories } = proposalConfig;
  const [lit, setLit] = useState(() => new Set());
  const toggle = (i) =>
    setLit((prev) => {
      const n = new Set(prev);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });

  return (
    <div className="scene__content moments">
      <header className="section-head">
        <p className="eyebrow">MEMORIES · {pad2(memories.length)}</p>
        <RevealText as="h2" className="section-title" text="কিছু মুহূর্ত, যেগুলো এমনিই থেকে গেছে" />
        <motion.p className="section-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          একটা একটা করে ছুঁয়ে দেখো ✨
        </motion.p>
      </header>
      <ol className="constellation">
        {memories.map((m, i) => (
          <MemoryStar key={i} memory={m} index={i} lit={lit.has(i)} onToggle={() => toggle(i)} />
        ))}
      </ol>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <NextButton onClick={onNext} hint={lit.size === memories.length ? "সবগুলো তারা জ্বলে উঠেছে ✨" : "আরও অনেক মুহূর্ত বাকি… হয়তো।"} />
      </motion.div>
    </div>
  );
}

export default function MemoryTimeline({ onNext }) {
  return (
    <ChapterTransition chapter="02" title="OUR LITTLE MOMENTS" subtitle="ছোট ছোট মুহূর্ত">
      <MomentsContent onNext={onNext} />
    </ChapterTransition>
  );
}
