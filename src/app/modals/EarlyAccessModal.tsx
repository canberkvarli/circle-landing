import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight, Check, Mail, User, Phone, Info } from "lucide-react";
import Image from "next/image";

interface EarlyAccessModalProps {
  onClose: () => void;
  openModal?: (modalType: string) => void;
}

const EarlyAccessModal = ({ onClose, openModal }: EarlyAccessModalProps) => {
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
            <div className="flex justify-center mx-auto mb-4">
              <Image
                src="/assets/circle.svg"
                alt="Circle"
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </div>
            <h2 className="text-2xl font-spirituality font-bold text-spiritual-primary mb-2 tracking-wide">
              Join the Waitlist
            </h2>
            <p className="text-spiritual-text-muted mb-4">
              Be among the first to experience authentic connections
            </p>
            
            {/* FullCircle Membership Info Button */}
            {openModal && (
              <button
                onClick={() => openModal('fullcircle')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-spiritual-accent/10 text-spiritual-accent rounded-full text-sm font-medium hover:bg-spiritual-accent/20 transition-colors"
              >
                <Info className="w-4 h-4" />
                What is FullCircle Membership?
              </button>
            )}
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
