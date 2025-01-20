"use client";

import { motion } from "framer-motion";

export default function AnimatedCheck() {
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      opacity: [0, 1],
      transition: { duration: 0.8, ease: "easeOut", bounce: 0.3 },
    },
  };

  const glowVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [1.2, 1.5],
      opacity: [0.8, 0],
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
  };

  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "120px",
          height: "120px",
          filter: "blur(10px)",
        }}
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      />

      <motion.svg
        width="130"
        height="130"
        viewBox="-15 -13 88 88" 
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="29.5"
          cy="29.5"
          r="28.5"
          stroke="#4D00B5"
          strokeWidth="4"
          variants={circleVariants}
        />
        <motion.path
          d="M43.0405 16.461L23.6 35.9015L15.9595 28.2905L11.8 32.45L23.6 44.25L47.2 20.65L43.0405 16.461Z"
          fill="#4D00B5"
          variants={checkVariants}
        />
      </motion.svg>
    </div>
  );
}
