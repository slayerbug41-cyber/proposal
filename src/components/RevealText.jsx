import { motion } from "framer-motion";
import { EASE } from "../lib/utils";

const word = {
  hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.95, ease: EASE } },
};

/** Word-by-word blur-to-focus reveal. */
export default function RevealText({ text, as = "p", className = "", delay = 0, stagger = 0.07, layout = false }) {
  const Tag = motion[as] || motion.p;
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      layout={layout}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <motion.span className="word" variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
