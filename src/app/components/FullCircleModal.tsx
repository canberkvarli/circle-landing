import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, Sparkles, Leaf, Star, Crown, ArrowRight } from "lucide-react";
import Image from "next/image";

interface fullcircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  openModal: (modalType: string) => void;
}

const fullcircleModal = ({ isOpen, onClose, openModal }: fullcircleModalProps) => {
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
                alt="fullcircle"
                width={64}
                height={64}
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-spirituality font-bold text-spiritual-primary mb-2 tracking-wide dark:text-spiritual-dark-primary">
              fullcircle<span className="font-mono text-lg pl-1">+</span>
            </h2>
            <p className="text-spiritual-text-dark text-base sm:text-lg dark:text-spiritual-dark-text-light">
              Your elevated wellness community experience
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
                title: "Practice-Based Community",
                description: "Find others who share your wellness practices like meditation, energy healing, sound therapy, and other conscious approaches"
              },
              {
                icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-spiritual-primary dark:text-spiritual-dark-primary" />,
                title: "Wellness Community",
                description: "Join meditation circles, healing groups, and find others who share your wellness practices"
              },
              {
                icon: <Star className="w-6 h-6 sm:w-8 sm:h-8 text-spiritual-primary dark:text-spiritual-dark-primary" />,
                title: "Dedicated Support",
                description: "Get dedicated assistance from our wellness community experts"
              },
              {
                icon: <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-spiritual-primary dark:text-spiritual-dark-primary" />,
                title: "Wellness Resources",
                description: "Access meditation guides, breathwork exercises, and conscious living content"
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
                "Unlimited wellness community access",
                "Advanced practice-based recommendations",
                "Dedicated customer support",
                "Curated wellness content & guides",
                "Local wellness events access",
                "Profile verification badge",
                "See who resonates with your practices",
                "Unlimited meditation partners"
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
                  First 1,000 users get 1 month of fullcircle+ membership for FREE!
                </span>
              </p>
              <p className="text-spiritual-text-dark/80 dark:text-spiritual-dark-text-light/80 text-xs sm:text-sm mt-2">
                Join our limited waitlist and be among the first to experience elevated wellness community
              </p>
            </div>
          </div>

          {/* Join Waitlist Button */}
          <div className="text-center">
            <button
              onClick={() => {
                onClose();
                openModal('earlyAccess');
              }}
              className="w-full py-4 bg-gradient-to-r from-spiritual-accent/90 to-spiritual-primary/90 text-white rounded-lg font-spirituality font-bold text-lg tracking-wide hover:shadow-xl transition-all duration-100 flex items-center justify-center space-x-2 shadow-lg dark:from-spiritual-dark-accent/90 dark:to-spiritual-dark-primary/90"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-spiritual-text-dark/80 dark:text-spiritual-dark-text-light/80 text-xs sm:text-sm mt-3">
              Be among the first 1,000 to get 1 month of fullcircle+ membership for FREE when we launch
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default fullcircleModal;
