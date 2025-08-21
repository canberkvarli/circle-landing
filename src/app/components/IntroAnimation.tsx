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
        className="relative w-48 h-48 md:w-96 md:h-96 flex items-center justify-center"
        initial={{ 
          opacity: 0.7 
        }}
        animate={{ 
          opacity: 1
        }}
        transition={{
          duration: 6, // 6 seconds for the complete animation
          opacity: {
            duration: 1.5,
            ease: "easeOut"
          }
        }}
        style={{
          transformOrigin: "center center", // Ensure rotation center is consistent
          backfaceVisibility: "hidden", // Prevent rendering issues on mobile
          WebkitBackfaceVisibility: "hidden", // Safari support
          animation: "spin-clockwise 6s cubic-bezier(0.4, 0.3, 0.3, 1)" // Even faster start -> slow -> fast -> very fast
        }}
      >
        <Image
          src="/logo.png"
          alt="Spinning Ouroboros"
          width={200}
          height={200}
          className="w-50 h-50 opacity-90"
          priority
          style={{
            transform: "rotate(0deg)", // Reset any inherited transforms
            transformOrigin: "center center" // Ensure consistent rotation center
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;
