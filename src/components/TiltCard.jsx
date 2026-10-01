import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/** 3D tilt that follows mouse or finger, with a moving glare. */
export default function TiltCard({ children, className = "", max = 14, ...rest }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 16 });
  const sy = useSpring(py, { stiffness: 160, damping: 16 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const gx = useTransform(sx, [0, 1], [0, 100]);
  const gy = useTransform(sy, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.28), transparent 55%)`;

  const update = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={update}
      onPointerDown={update}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onPointerUp={(e) => e.pointerType !== "mouse" && reset()}
      {...rest}
    >
      {children}
      <motion.span className="tilt__glare" style={{ backgroundImage: glare }} aria-hidden="true" />
    </motion.div>
  );
}
