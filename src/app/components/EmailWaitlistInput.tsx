"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface EmailWaitlistInputProps {
  onSuccess?: () => void;
  className?: string;
}

const EmailWaitlistInput = ({ onSuccess, className = "" }: EmailWaitlistInputProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          heardFrom: 'hero-email-input'
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setEmail('');
        onSuccess?.();
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative mb-8">
        <motion.div
          className="relative flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Email Input */}
          <div className="relative flex-1">
            <div className="relative">
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-300 z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-spiritual-accent/30 rounded-2xl text-spiritual-text-dark placeholder-spiritual-text-muted focus:outline-none focus:border-spiritual-accent focus:ring-4 focus:ring-spiritual-accent/20 transition-all duration-300 dark:bg-spiritual-dark-card/90 dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-muted dark:focus:border-spiritual-dark-accent dark:focus:ring-spiritual-dark-accent/20 relative z-0"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="ml-3 px-6 py-3 bg-spiritual-primary text-gray-800 font-spirituality font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-spiritual-dark-primary dark:text-gray-900 text-base tracking-wide drop-shadow-sm border-2 border-spiritual-primary/30 dark:border-spiritual-dark-primary/30"
            whileHover={{ 
              scale: isSubmitting || !email.trim() ? 1 : 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: isSubmitting || !email.trim() ? 1 : 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Joining...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <span>Join Waitlist</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-4 flex items-center justify-center gap-2 text-spiritual-accent font-medium bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-spiritual-accent/20 dark:bg-spiritual-dark-card/95 dark:border-spiritual-dark-border"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Successfully joined the waitlist!</span>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-4 flex items-center justify-center gap-2 text-red-500 font-medium bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-red-200 dark:bg-spiritual-dark-card/95 dark:border-red-500/30"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Additional Info */}
      <motion.p
        className="text-sm text-spiritual-text-muted text-center mt-4 dark:text-spiritual-dark-text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Be the first to know when fullcircle launches
      </motion.p>
    </div>
  );
};

export default EmailWaitlistInput;
