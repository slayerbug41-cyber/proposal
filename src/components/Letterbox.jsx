import { motion } from "framer-motion";
import { EASE } from "../lib/utils";

/** Cinematic black bars. */
export default function Letterbox({ active, size = "10svh" }) {
  const anim = { scaleY: active ? 1 : 0 };
  const t = { duration: 1.1, ease: EASE };
  return (
    <>
      <motion.div className="letterbox letterbox--top" style={{ height: size }} initial={{ scaleY: 0 }} animate={anim} transition={t} aria-hidden="true" />
      <motion.div className="letterbox letterbox--bottom" style={{ height: size }} initial={{ scaleY: 0 }} animate={anim} transition={t} aria-hidden="true" />
    </>
  );
}
