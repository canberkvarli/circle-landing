"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sun, Leaf } from "lucide-react";

interface DanielleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DanielleModal({ isOpen, onClose }: DanielleModalProps) {
  if (!isOpen) return null;

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
            
            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-4xl font-spirituality font-bold text-spiritual-primary dark:text-spiritual-dark-primary tracking-wide">
                D
              </h2>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-spiritual-text-dark dark:text-spiritual-dark-text-light leading-relaxed">
                  Danielle is a warm and caring person who creates safe spaces for others to grow and heal.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-spiritual-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Sun className="w-5 h-5 text-spiritual-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-spiritual-text-dark dark:text-spiritual-dark-accent mb-1">
                      Safe Space Creator
                    </h3>
                    <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light">
                      Danielle has a natural ability to make others feel comfortable and supported as they explore personal growth.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-spiritual-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Leaf className="w-5 h-5 text-spiritual-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-spiritual-text-dark dark:text-spiritual-dark-accent mb-1">
                      Wellness Guide
                    </h3>
                    <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light">
                      She practices yoga, meditation, and body-based healing techniques, helping others on their wellness journey.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-spiritual-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-5 h-5 text-spiritual-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-spiritual-text-dark dark:text-spiritual-dark-accent mb-1">
                      Bali Connection
                    </h3>
                    <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light">
                      Having lived in Bali, she brings the island&apos;s peaceful energy and sense of community to everything she does.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
