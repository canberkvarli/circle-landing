"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import MandalaBackground from "./MandalaBackground";

const IntroAnimation = ({ showIntro }: { showIntro: boolean }) => (
  <AnimatePresence>
    {showIntro && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#F5F1EA] via-[#EDE4D3] to-[#E8DCC6] z-50"
        exit={{ y: "-100%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        <MandalaBackground show={showIntro} />

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="text-6xl font-light bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent mb-4">
            Circle
          </h1>
          <motion.p
            className="text-[#8B7355] text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Conscious Connections
          </motion.p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default IntroAnimation;
