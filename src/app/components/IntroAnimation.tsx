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
          animation: "spin-clockwise 6s cubic-bezier(0.25, 0.1, 0.25, 1)" // Custom curve: slow -> fast -> very fast
        }}
      >
        <Image
          src="/assets/circle.svg"
          alt="Spinning Ouroboros"
          width={400}
          height={400}
          className="w-full h-full opacity-90"
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
