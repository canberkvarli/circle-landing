"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface OuroborosInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OuroborosInfoModal({ isOpen, onClose }: OuroborosInfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-spiritual-card dark:bg-spiritual-dark-card border border-spiritual-primary/20 dark:border-spiritual-dark-primary/20 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-spiritual-background dark:bg-spiritual-dark-background border border-spiritual-border dark:border-spiritual-dark-border hover:bg-spiritual-accent/10 dark:hover:bg-spiritual-dark-accent/10 transition-colors"
            >
              <X className="w-5 h-5 text-spiritual-text-dark dark:text-spiritual-dark-text-dark" />
            </button>
            
            {/* Ouroboros Animation */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 relative">
                <Image
                  src="/assets/circle.svg"
                  alt="Ouroboros"
                  fill
                  className="object-contain animate-spin-ouroboros"
                />
              </div>
            </div>
            
            {/* Subtitle */}
            <p className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-center mb-8 leading-relaxed">
              The Ouroboros represents the eternal cycle of transformation and renewal
            </p>
            
            {/* Features Section 1 */}
            <div className="mb-8">
              <h3 className="text-spiritual-text-dark dark:text-spiritual-dark-text-dark font-bold text-center mb-4">
                The Sacred Symbol:
              </h3>
              <ul className="space-y-2">
                <li className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-sm leading-relaxed">
                  • Ancient symbol of infinite cycles
                </li>
                <li className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-sm leading-relaxed">
                  • Represents death and rebirth
                </li>
                <li className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-sm leading-relaxed">
                  • Symbolizes the unity of opposites
                </li>
                <li className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-sm leading-relaxed">
                  • Embodies eternal transformation
                </li>
                <li className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-sm leading-relaxed">
                  • Represents the cosmic dance of life
                </li>
              </ul>
            </div>
            
            {/* Features Section 2 */}
            <div className="mb-8">
              <h3 className="text-spiritual-text-dark dark:text-spiritual-dark-text-dark font-bold text-center mb-4">
                In Circle&apos;s Journey:
              </h3>
              <ul className="space-y-2">
                <li className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-sm leading-relaxed">
                  • Every ending is a new beginning
                </li>
                <li className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-sm leading-relaxed">
                  • Each connection transforms us
                </li>
                <li className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-sm leading-relaxed">
                  • We grow through relationships
                </li>
                <li className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-sm leading-relaxed">
                  • Love flows in infinite cycles
                </li>
                <li className="text-spiritual-text-light dark:text-spiritual-dark-text-light text-sm leading-relaxed">
                  • Our spiritual path has no end
                </li>
              </ul>
            </div>
            
            {/* Footer Quote */}
            <p className="text-spiritual-text-muted dark:text-spiritual-dark-text-muted text-sm text-center italic leading-relaxed">
              &ldquo;As the serpent eats its tail, so do we complete and renew ourselves through love&rdquo;
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
