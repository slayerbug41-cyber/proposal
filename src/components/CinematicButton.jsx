import { motion } from "framer-motion";

/** variant: "primary" | "glass" | "glow" | "ghost" */
export default function CinematicButton({ variant = "glass", href, children, className = "", ...rest }) {
  const Comp = href ? motion.a : motion.button;
  const extra = href ? { href } : { type: "button" };
  return (
    <Comp
      className={`cbtn cbtn--${variant} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      {...extra}
      {...rest}
    >
      <span className="cbtn__shine" aria-hidden="true" />
      {children}
    </Comp>
  );
}
