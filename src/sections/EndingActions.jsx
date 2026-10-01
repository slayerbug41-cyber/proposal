import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { proposalConfig } from "../data/config";
import { EASE, whatsappLink } from "../lib/utils";

/** Shared, calm footer for the Maybe / No endings. */
export default function EndingActions({ message, onRestart, children }) {
  const { replyLinkOnEveryEnding, whatsappNumber, myName } = proposalConfig;
  return (
    <motion.div className="ending__actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: EASE }}>
      {children}
      {replyLinkOnEveryEnding && message && (
        <a className="text-btn" href={whatsappLink(whatsappNumber, message)} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={14} aria-hidden="true" /> চাইলে {myName}-কে জানিয়ে দিতে পারো (optional)
        </a>
      )}
      <button type="button" className="text-btn" onClick={onRestart}>
        Restart experience ↺
      </button>
    </motion.div>
  );
}
