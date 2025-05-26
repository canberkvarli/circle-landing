"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

interface MandalaBackgroundProps {
  show: boolean;
}

const MandalaBackground: React.FC<MandalaBackgroundProps> = ({ show }) => (
  <AnimatePresence mode="wait">
    {show && (
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 0.2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* parent must be relative for 'fill' to work */}
        <div className="relative w-80 h-80 lg:w-[500px] lg:h-[500px]">
          {/* <Image
            src="/assets/mandala.png"
            alt="Mandala background"
            fill
            style={{ objectFit: "contain" }}
            priority
          /> */}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MandalaBackground;
