import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight, Check, Mail, User, Phone } from "lucide-react";

interface EarlyAccessModalProps {
  onClose: () => void;
}

const EarlyAccessModal = ({ onClose }: EarlyAccessModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Close modal after 3 seconds
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 3000);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-spiritual-primary/10 rounded-full flex items-center justify-center hover:bg-spiritual-primary/20 transition-colors"
          >
            <X className="w-5 h-5 text-spiritual-primary" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-spiritual-accent to-spiritual-accent-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 70c-16.569 0-30-13.431-30-30s13.431-30 30-30 30 13.431 30 30-13.431 30-30 30z"/>
                <path d="M50 25c-19.33 0-35 15.67-35 35s15.67 35 35 35 35-15.67 35-35-15.67-35-35-35zm0 60c-13.807 0-25-11.193-25-25s11.193-25 25-25 25 11.193 25 25-11.193 25-25 25z"/>
                <path d="M50 35c-13.807 0-25 11.193-25 25s11.193 25 25 25 25-11.193 25-25-11.193-25-25-25zm0 40c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-spirituality font-bold text-spiritual-primary mb-2 tracking-wide">
              Join the Waitlist
            </h2>
            <p className="text-spiritual-text-muted">
              Be among the first to experience authentic connections
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted" />
                <input
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted"
                  placeholder="Email address"
                  required
                />
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted" />
                <input
                  type="text"
                  name="name"
                  className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted"
                  placeholder="Your name"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted" />
                <input
                  type="tel"
                  name="phone"
                  className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted"
                  placeholder="Phone number (optional)"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-spiritual-accent to-spiritual-accent-light text-white rounded-lg font-spirituality font-bold text-lg tracking-wide hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Reserve My Spot</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2">
                Welcome to the Community! 🌟
              </h3>
              <p className="text-spiritual-text-muted">
                You&apos;re now on our exclusive waitlist. We&apos;ll notify you as soon as the app launches!
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EarlyAccessModal;
