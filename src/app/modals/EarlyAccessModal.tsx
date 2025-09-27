import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight, Check, Mail, User, Phone, Info, AlertCircle, MessageSquare } from "lucide-react";
import Image from "next/image";

interface EarlyAccessModalProps {
  onClose: () => void;
  openModal?: (modalType: string) => void;
}

const EarlyAccessModal = ({ onClose, openModal }: EarlyAccessModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData(e.currentTarget);
      const fullName = formData.get("firstName") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const heardFrom = formData.get("heardFrom") as string;
      const additionalComments = formData.get("additionalComments") as string;
      
      // Validate required fields
      if (!fullName.trim() || !email.trim() || !heardFrom.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      
      // Split full name into first and last name
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || ''; // Last name is optional
      
      // Call the new waitlist API endpoint
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName,
          lastName,
          phone: phone.trim(),
          heardFrom: heardFrom.trim(),
          additionalComments: additionalComments?.trim() || ''
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitted(true);
        // Close modal after 5 seconds
        setTimeout(() => {
          onClose();
          setSubmitted(false);
        }, 5000);
      } else {
        // Handle specific error cases
        if (response.status === 409) {
          setError('This email is already on our waitlist! You\'re all set.');
        } else {
          setError(result.message || 'Failed to join waitlist. Please try again.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-md w-full max-h-[95vh] sm:max-h-[90vh] shadow-2xl dark:bg-spiritual-dark-card flex flex-col"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-4 sm:p-6 pb-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 bg-spiritual-primary/10 rounded-full flex items-center justify-center hover:bg-spiritual-primary/20 transition-colors dark:bg-spiritual-dark-primary/10 dark:hover:bg-spiritual-dark-primary/20"
          >
            <X className="w-5 h-5 text-spiritual-primary dark:text-spiritual-dark-primary" />
          </button>
          
          <div className="text-center">
            {/* Logo only shown on larger screens to save mobile space */}
            <div className="hidden sm:flex justify-center mx-auto mb-4">
              <Image
                src="/logo.png"
                alt="fullcircle"
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-spirituality font-bold text-spiritual-primary mb-2 tracking-wide dark:text-spiritual-dark-primary">
              Join the Waitlist
            </h2>
            <p className="text-sm sm:text-base text-spiritual-text-muted mb-4 dark:text-spiritual-dark-text-muted">
              Be among the first to experience authentic connections
            </p>
            
            {/* fullcircle Membership Info Button */}
            {openModal && (
              <button
                onClick={() => openModal('fullcircle')}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-spiritual-accent/10 text-spiritual-accent rounded-full text-xs sm:text-sm font-medium hover:bg-spiritual-accent/20 transition-colors dark:bg-spiritual-dark-accent/10 dark:text-spiritual-dark-accent dark:hover:bg-spiritual-dark-accent/20"
              >
                <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">What is fullcircle+ Membership?</span>
                <span className="sm:hidden">fullcircle Info</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex-1 overflow-y-auto">
          {!submitted ? (
            <>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <img 
                  src="/assets/icons/ouroboros.png" 
                  alt="Ouroboros" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" 
                />
                <input
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-muted dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent"
                  placeholder="Email address"
                  required
                />
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" />
                <input
                  type="text"
                  name="firstName"
                  className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-muted dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" />
                <input
                  type="tel"
                  name="phone"
                  className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-muted dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent"
                  placeholder="Phone number (optional)"
                />
              </div>

              <div className="relative">
                <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" />
                <select
                  name="heardFrom"
                  className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent appearance-none cursor-pointer"
                  required
                >
                  <option value="">Where did you hear about us?</option>
                  <option value="social-media">Social Media</option>
                  <option value="friend-recommendation">Friend Recommendation</option>
                  <option value="online-search">Online Search</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="event">Event</option>
                  <option value="blog-article">Blog/Article</option>
                  <option value="podcast">Podcast</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" />
                <textarea
                  name="additionalComments"
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-muted dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent resize-none"
                  placeholder="Anything else you'd like to share? (Optional)"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-spiritual-accent/90 to-spiritual-primary/90 text-white rounded-lg font-spirituality font-bold text-lg tracking-wide hover:shadow-xl transition-all duration-100 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg dark:from-spiritual-dark-accent/90 dark:to-spiritual-dark-primary/90"
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
              
              {/* Privacy Policy & Terms Links */}
              <p className="text-xs text-spiritual-text-muted text-center dark:text-spiritual-dark-text-muted">
                By joining the waitlist, you agree to our{" "}
                <button
                  type="button"
                  onClick={() => openModal?.('privacyPolicy')}
                  className="text-spiritual-accent hover:underline dark:text-spiritual-dark-accent"
                >
                  Privacy Policy
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => openModal?.('termsAndConditions')}
                  className="text-spiritual-accent hover:underline dark:text-spiritual-dark-accent"
                >
                  Terms &amp; Conditions
                </button>
              </p>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2">
                Welcome to the Community!
              </h3>
              <p className="text-spiritual-text-muted">
                You&apos;re now on our limited waitlist. We&apos;ll notify you as soon as the app launches!
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EarlyAccessModal;
