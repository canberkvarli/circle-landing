"use client";
import React from "react";
import { motion } from "framer-motion";
import MandalaBackground from "./MandalaBackground";

const IntroAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-spiritual-background via-spiritual-tertiary to-spiritual-secondary"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: "-100%",
        transition: { 
          duration: 1, 
          ease: [0.76, 0, 0.24, 1] // Smooth exit easing
        }
      }}
      transition={{ duration: 0.8 }}
    >
      <MandalaBackground />
    </motion.div>
  );
};

export default IntroAnimation;
