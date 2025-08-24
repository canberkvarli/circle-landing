"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, Infinity, Heart } from "lucide-react";
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
            className="relative bg-white dark:bg-spiritual-dark-card border border-spiritual-primary/20 dark:border-spiritual-dark-primary/20 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-spiritual-background dark:bg-spiritual-dark-background border border-spiritual-border dark:border-spiritual-dark-border hover:bg-spiritual-accent/10 dark:hover:bg-spiritual-dark-accent/10 transition-colors"
            >
              <X className="w-5 h-5 text-spiritual-text-dark dark:text-spiritual-dark-text-dark" />
            </button>
            
            {/* Ouroboros Animation */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 relative">
                <Image
                  src="/logo.png"
                  alt="Ouroboros"
                  fill
                  className="object-contain animate-spin-ouroboros"
                />
              </div>
            </div>
            
            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-spirituality font-bold text-spiritual-primary dark:text-spiritual-dark-primary tracking-wide">
                The Ouroboros
              </h2>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-spiritual-text-dark dark:text-spiritual-dark-text-light leading-relaxed">
                  The ouroboros is an ancient symbol of a serpent or dragon eating its own tail, representing the eternal cycle of life, death, and rebirth.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-spiritual-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <RefreshCw className="w-5 h-5 text-spiritual-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-spiritual-text-dark dark:text-spiritual-dark-accent mb-1">
                      Eternal Cycles
                    </h3>
                    <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light">
                      This symbol reminds us that everything in nature moves in cycles - seasons change, relationships evolve, and we continuously transform through our experiences.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-spiritual-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Infinity className="w-5 h-5 text-spiritual-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-spiritual-text-dark dark:text-spiritual-dark-accent mb-1">
                      Unity of Opposites
                    </h3>
                    <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light">
                      The ouroboros shows how beginnings and endings are connected, how light and dark exist together, and how we can find wholeness by embracing all parts of ourselves.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-spiritual-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-5 h-5 text-spiritual-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-spiritual-text-dark dark:text-spiritual-dark-accent mb-1">
                      In Circle&apos;s Journey
                    </h3>
                    <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light">
                      Just as the ouroboros represents endless transformation, Circle helps us grow through relationships. Each connection teaches us something new, and every ending opens the door to new beginnings in our spiritual journey.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quote */}
              <div className="mt-8 pt-6 border-t border-spiritual-border/20 dark:border-spiritual-dark-border/20">
                <div className="text-center">
                  <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light italic">
                    &ldquo;As the serpent completes its circle, so do we find completion in our connections&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
