import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, Sparkles, Leaf, Star, Crown } from "lucide-react";
import Image from "next/image";
import { APP_STORE_URL } from "../constants";

interface fullcircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  openModal?: (modalType: string) => void;
}

const fullcircleModal = ({ isOpen, onClose }: fullcircleModalProps) => {
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

          {/* Download the app */}
          <div className="bg-gradient-to-br from-spiritual-accent/20 to-spiritual-primary/20 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-spiritual-accent/40 dark:from-spiritual-dark-accent/20 dark:to-spiritual-dark-primary/20 dark:border-spiritual-dark-accent/40">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-spiritual-accent dark:text-spiritual-dark-accent" />
              </div>
              <h3 className="text-lg sm:text-xl font-spirituality font-bold text-spiritual-accent mb-2 dark:text-spiritual-dark-accent">
                fullcircle is live
              </h3>
              <p className="text-spiritual-text-dark dark:text-spiritual-dark-text-light font-medium text-base sm:text-lg">
                <span className="font-bold text-spiritual-accent dark:text-spiritual-dark-accent">
                  Download the app and join our wellness community today.
                </span>
              </p>
              <p className="text-spiritual-text-dark/80 dark:text-spiritual-dark-text-light/80 text-xs sm:text-sm mt-2">
                Available now on the App Store for iPhone.
              </p>
            </div>
          </div>

          {/* Download on App Store Button */}
          <div className="text-center">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-spiritual-accent/90 to-spiritual-primary/90 text-white rounded-lg font-spirituality font-bold text-lg tracking-wide hover:shadow-xl transition-all duration-100 shadow-lg dark:from-spiritual-dark-accent/90 dark:to-spiritual-dark-primary/90"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on the App Store
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default fullcircleModal;
