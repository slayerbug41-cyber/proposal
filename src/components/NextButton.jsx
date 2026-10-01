import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CinematicButton from "./CinematicButton";
import { EASE } from "../lib/utils";

export default function NextButton({ onClick, label = "পরের chapter", hint }) {
  return (
    <motion.div
      className="next-wrap"
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: EASE }}
    >
      {hint && <p className="next-hint">{hint}</p>}
      <CinematicButton variant="glass" onClick={onClick}>
        {label}
        <ArrowRight size={18} aria-hidden="true" />
      </CinematicButton>
    </motion.div>
  );
}
