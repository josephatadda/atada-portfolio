import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [data-name='Button']")) {
        setIsHovering(true);
      }
    };
    const onHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [data-name='Button']")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onHoverStart);
    document.addEventListener("mouseout", onHoverEnd);

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onHoverStart);
      document.removeEventListener("mouseout", onHoverEnd);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot — follows tightly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-charcoal"
          animate={{
            width: isHovering ? 6 : 5,
            height: isHovering ? 6 : 5,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Ring — follows with spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-charcoal"
          animate={{
            width: isHovering ? 36 : 24,
            height: isHovering ? 36 : 24,
            opacity: isHovering ? 0.5 : 0.25,
          }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        />
      </motion.div>
    </>
  );
}
