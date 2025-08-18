"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MandalaBackground = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative w-96 h-96 flex items-center justify-center"
        initial={{ 
          rotate: 0, // Start from normal position
          opacity: 0.7 
        }}
        animate={{ 
          rotate: -1440, // 4 full rotations counterclockwise (-4 * 360 = -1440 degrees)
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
        {/* Simple ouroboros without scaling */}
        <Image
          src="/assets/circle.svg"
          alt="Spinning Ouroboros"
          width={400}
          height={400}
          className="w-full h-full opacity-90"
          priority
        />
      </motion.div>
    </div>
  );
};

export default MandalaBackground;
