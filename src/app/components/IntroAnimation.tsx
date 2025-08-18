"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const IntroAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-spiritual-background/80 via-spiritual-tertiary/60 to-spiritual-secondary/80 backdrop-blur-sm"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: "100%",
        transition: { 
          duration: 1, 
          ease: [0.76, 0, 0.24, 1] // Smooth exit easing
        }
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Spinning Ouroboros */}
      <motion.div
        className="relative w-96 h-96 flex items-center justify-center"
        initial={{ 
          rotate: 0, // Start from normal position
          opacity: 0.7 
        }}
        animate={{ 
          rotate: 1440, // 4 full rotations clockwise (4 * 360 = 1440 degrees)
          opacity: 1
        }}
        transition={{
          duration: 6, // 6 seconds for the complete animation
          rotate: {
            duration: 6,
            ease: [0.4, 0, 0.2, 1], // Smooth slow-fast-slow easing
          },
          opacity: {
            duration: 1.5,
            ease: "easeOut"
          }
        }}
      >
        <Image
          src="/assets/circle.svg"
          alt="Spinning Ouroboros"
          width={400}
          height={400}
          className="w-full h-full opacity-90"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;
