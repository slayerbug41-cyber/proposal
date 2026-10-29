import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { EASE, pad2 } from "../lib/utils";

const TITLES = ["THE SECRET", "THE JOURNEY", "LITTLE MOMENTS", "MEMORY GALLERY", "WHY YOU?", "A TINY TEST", "THE QUESTION"];

/** Top HUD: back button, chapter label and a hairline progress bar. */
export default function ProgressIndicator({ visible, chapter, total = 7, onBack }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          className="hud"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div
            className="hud__progress"
            role="progressbar"
            aria-label="Story progress"
            aria-valuemin={0}
            aria-valuemax={total - 1}
            aria-valuenow={chapter}
          >
            <motion.span className="hud__bar" initial={false} animate={{ scaleX: (chapter + 1) / total }} transition={{ duration: 1.2, ease: EASE }} />
          </div>
          <div className="hud__row">
            <button type="button" className="icon-btn" onClick={onBack} aria-label="Go back to the previous chapter">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <p className="hud__label">
              <span className="hud__brand">PROJECT HER</span>
              <span className="hud__sep" aria-hidden="true" />
              <span>
                CH {pad2(chapter)} · {TITLES[chapter]}
              </span>
            </p>
            <span className="icon-btn-spacer" aria-hidden="true" />
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
