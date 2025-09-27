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
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative mb-8">
        <motion.div
          className="relative flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Email Input with Subtle Glow */}
          <div className="relative flex-1 w-full">
            <div className="relative group">
              {/* Subtle glowing border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-spiritual-primary/30 via-spiritual-accent/40 to-spiritual-secondary/30 rounded-3xl blur-sm opacity-60 group-hover:opacity-80 group-focus-within:opacity-100 transition-all duration-500"></div>
              
              <div className="relative bg-white/95 dark:bg-spiritual-dark-card/95 rounded-3xl p-1">
                <div className="relative">
                  <img 
                    src="/assets/icons/ouroboros.png" 
                    alt="Ouroboros" 
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-accent dark:text-spiritual-dark-accent z-10" 
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-14 pr-5 py-4 bg-transparent border-0 rounded-2xl text-lg font-semibold text-spiritual-text-dark placeholder-spiritual-accent/80 focus:outline-none transition-all duration-300 dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-accent/80 relative z-0"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button - Smaller and Better Styled */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="px-6 py-4 bg-gradient-to-r from-spiritual-primary via-spiritual-accent to-spiritual-secondary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base tracking-wide drop-shadow-md border border-spiritual-accent/30 hover:scale-105 active:scale-95 min-w-[160px]"
            style={{ 
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 8px rgba(0, 0, 0, 0.2)' 
            }}
            whileHover={{ 
              scale: isSubmitting || !email.trim() ? 1 : 1.05,
              boxShadow: "0 10px 25px -5px rgba(217, 119, 6, 0.4)"
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
                  <Loader2 className="w-4 h-4 animate-spin" />
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
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

    </div>
  );
};

export default EmailWaitlistInput;
