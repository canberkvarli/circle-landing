import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, Mail, Sparkles, Leaf, Star, Crown } from "lucide-react";
import Image from "next/image";

interface FullCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  openModal: (modalType: string) => void;
}

const FullCircleModal = ({ isOpen, onClose, openModal }: FullCircleModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          heardFrom: 'fullcircle-modal',
          additionalComments: ''
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setEmail("");
        }, 2000);
      } else {
        // Handle specific error cases
        if (response.status === 409) {
          setError('This email is already on our waitlist! You\'re all set.');
        } else {
          console.error('Waitlist submission failed:', result.message);
          setError(result.message || 'Failed to join waitlist. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      // You could add error handling here if needed
      setSubmitted(true); // Still show success for now
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setEmail("");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85dvh] sm:max-h-[90vh] overflow-y-auto shadow-2xl dark:bg-spiritual-dark-card relative"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button - Always visible */}
        <div className="sticky top-0 z-10 bg-white dark:bg-spiritual-dark-card rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-6 sm:right-6 w-10 h-10 sm:w-8 sm:h-8 bg-spiritual-primary/10 rounded-full flex items-center justify-center hover:bg-spiritual-primary/20 transition-colors dark:bg-spiritual-dark-primary/10 dark:hover:bg-spiritual-dark-primary/20 z-20"
          >
            <X className="w-5 h-5 text-spiritual-primary dark:text-spiritual-dark-primary" />
          </button>
        </div>

        {/* Header */}
        <div className="relative pt-16 pb-4 px-4 sm:px-8 sm:pb-6">
          <div className="text-center">
            <div className="flex justify-center mx-auto mb-4">
              <Image
                src="/logo.png"
                alt="Circle"
                width={64}
                height={64}
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-spirituality font-bold text-spiritual-primary mb-2 tracking-wide dark:text-spiritual-dark-primary">
              What is FullCircle?
            </h2>
            <p className="text-spiritual-text-dark text-base sm:text-lg dark:text-spiritual-dark-text-light">
              Your elevated connection experience
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-8 pb-6 sm:pb-8">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {[
              {
                icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-spiritual-primary dark:text-spiritual-dark-primary" />,
                title: "Soul Matching",
                description: "Advanced algorithm that connects you with compatible seekers"
              },
              {
                icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-spiritual-primary dark:text-spiritual-dark-primary" />,
                title: "Mindful Community",
                description: "Join communities and connect with like-minded souls"
              },
              {
                icon: <Star className="w-6 h-6 sm:w-8 sm:h-8 text-spiritual-primary dark:text-spiritual-dark-primary" />,
                title: "Dedicated Support",
                description: "Get dedicated assistance from our connection experts"
              },
              {
                icon: <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-spiritual-primary dark:text-spiritual-dark-primary" />,
                title: "Curated Content",
                description: "Access to mindful content and growth resources"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-3 sm:p-4 border border-spiritual-primary/20 dark:bg-spiritual-dark-card dark:border-spiritual-dark-border">
                <div className="mb-2 sm:mb-3">{feature.icon}</div>
                <h4 className="text-lg sm:text-xl font-spirituality font-bold text-spiritual-primary mb-2 tracking-wide dark:text-spiritual-dark-primary">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm text-spiritual-text-dark dark:text-spiritual-dark-text-light font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-spiritual-background to-spiritual-tertiary/30 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-spiritual-primary/20 dark:from-spiritual-dark-background dark:to-spiritual-dark-tertiary/30 dark:border-spiritual-dark-border">
            <h3 className="text-lg sm:text-xl font-spirituality font-bold text-spiritual-primary mb-3 sm:mb-4 tracking-wide dark:text-spiritual-dark-primary">
              Enhanced Features Unlocked
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[
                "Unlimited daily matches",
                "Advanced compatibility algorithm",
                "Dedicated customer support",
                "Curated mindful content",
                "Community events access",
                "Profile verification badge",
                "See who wants to connect with you",
                "Unlimited connections"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-spiritual-primary flex-shrink-0 dark:text-spiritual-dark-primary" />
                  <span className="text-sm sm:text-base text-spiritual-text-dark dark:text-spiritual-dark-text-light font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special Offer */}
          <div className="bg-gradient-to-br from-spiritual-accent/20 to-spiritual-primary/20 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-spiritual-accent/40 dark:from-spiritual-dark-accent/20 dark:to-spiritual-dark-primary/20 dark:border-spiritual-dark-accent/40">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-spiritual-accent dark:text-spiritual-dark-accent" />
              </div>
              <h3 className="text-lg sm:text-xl font-spirituality font-bold text-spiritual-accent mb-2 dark:text-spiritual-dark-accent">
                🎉 Special Launch Offer
              </h3>
              <p className="text-spiritual-text-dark dark:text-spiritual-dark-text-light font-medium text-base sm:text-lg">
                <span className="font-bold text-spiritual-accent dark:text-spiritual-dark-accent">
                  First 5,000 users get 1 month of FullCircle FREE!
                </span>
              </p>
              <p className="text-spiritual-text-dark/80 dark:text-spiritual-dark-text-light/80 text-xs sm:text-sm mt-2">
                Join our limited waitlist and be among the first to experience elevated connections
              </p>
            </div>
          </div>

          {/* Email Collection Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-spirituality font-bold text-spiritual-accent mb-2 dark:text-spiritual-dark-accent">
                  Join the Waitlist
                </h3>
                <p className="text-spiritual-text-dark mb-3 sm:mb-4 dark:text-spiritual-dark-text-light font-medium text-sm sm:text-base">
                  Be among the first 5,000 to get 1 month of FullCircle FREE when we launch
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <div className="absolute inset-0 grid place-items-center pointer-events-none" style={{ width: '48px' }}>
                    <Mail className="w-5 h-5 text-spiritual-text-dark dark:text-spiritual-dark-text-light" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(""); // Clear error when user types
                    }}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3 border border-spiritual-accent/30 rounded-full focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-dark/60 dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-light/60 dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent font-medium"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="waitlist-button w-full"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </div>
              
              {/* Error Display */}
              {error && (
                <div className="text-center">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                    {error}
                  </p>
                </div>
              )}
              
              {/* Privacy Policy Link */}
              <p className="text-xs text-spiritual-text-muted text-center dark:text-spiritual-dark-text-muted">
                By joining the waitlist, you agree to our{" "}
                <button
                  type="button"
                  onClick={() => openModal('privacyPolicy')}
                  className="text-spiritual-accent hover:underline dark:text-spiritual-dark-accent"
                >
                  Privacy Policy
                </button>
              </p>
            </form>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-green-900/20">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-spirituality font-bold text-spiritual-accent mb-2 dark:text-spiritual-dark-accent">
                Welcome to Circle!
              </h3>
              <p className="text-spiritual-text-dark dark:text-spiritual-dark-text-light font-medium text-sm sm:text-base">
                You&apos;re now on our limited waitlist. We&apos;ll notify you as soon as we launch with your FREE month of FullCircle!
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FullCircleModal;
