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
          rotate: 0, 
          scale: 0.8, 
          opacity: 0.7 
        }}
        animate={{ 
          rotate: 1440, // 4 full rotations (4 * 360 = 1440)
          scale: 1,
          opacity: 1
        }}
        transition={{
          duration: 3,
          rotate: {
            duration: 3,
            ease: [0.68, -0.55, 0.265, 1.55], // Back out easing for hinge effect
          },
          scale: {
            duration: 3,
            ease: [0.68, -0.55, 0.265, 1.55], // Same easing for scale
            times: [0, 0.6, 0.8, 1], // Timing for scale animation
          },
          opacity: {
            duration: 1.5,
            ease: "easeOut"
          }
        }}
      >
        {/* Scale animation with bounce effect */}
        <motion.div
          className="w-full h-full"
          animate={{
            scale: [0.8, 1.05, 1.03, 1]
          }}
          transition={{
            duration: 3,
            ease: [0.68, -0.55, 0.265, 1.55], // Back out easing
            times: [0, 0.6, 0.8, 1]
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
    </div>
  );
};

export default MandalaBackground;
