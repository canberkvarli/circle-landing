import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, Mail } from "lucide-react";
import Image from "next/image";

interface FullCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullCircleModal = ({ isOpen, onClose }: FullCircleModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Close modal after 2 seconds
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:bg-spiritual-dark-card"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-8 pb-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 bg-spiritual-primary/10 rounded-full flex items-center justify-center hover:bg-spiritual-primary/20 transition-colors dark:bg-spiritual-dark-primary/10 dark:hover:bg-spiritual-dark-primary/20"
          >
            <X className="w-5 h-5 text-spiritual-primary dark:text-spiritual-dark-primary" />
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
            <h2 className="text-3xl font-spirituality font-bold text-spiritual-primary mb-2 tracking-wide dark:text-spiritual-dark-primary">
              What is FullCircle?
            </h2>
            <p className="text-spiritual-text-muted text-lg dark:text-spiritual-dark-text-muted">
              Your premium spiritual connection experience
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: "💫",
                title: "Soul Matching",
                description: "Advanced algorithm that connects you with compatible spiritual seekers"
              },
              {
                icon: "🌿",
                title: "Conscious Community",
                description: "Join exclusive events and connect with like-minded souls"
              },
              {
                icon: "✨",
                title: "Premium Support",
                description: "Get priority assistance from our spiritual connection experts"
              },
              {
                icon: "🌟",
                title: "Exclusive Content",
                description: "Access to guided meditations, spiritual practices, and growth resources"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-spiritual-primary/20 dark:bg-spiritual-dark-card dark:border-spiritual-dark-border">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="text-xl font-spirituality font-bold text-spiritual-primary mb-2 tracking-wide dark:text-spiritual-dark-primary">
                  {feature.title}
                </h4>
                <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing Plans */}
          <div className="bg-gradient-to-br from-spiritual-background to-spiritual-tertiary/30 rounded-2xl p-6 mb-6 border border-spiritual-primary/20 dark:from-spiritual-dark-background dark:to-spiritual-dark-tertiary/30 dark:border-spiritual-dark-border">
            <h3 className="text-xl font-spirituality font-bold text-spiritual-primary mb-4 tracking-wide dark:text-spiritual-dark-primary">
              Choose Your Plan
            </h3>
            <div className="space-y-3">
              {[
                { name: "Monthly", price: "$9.99", savings: "0%" },
                { name: "3 Months", price: "$24.99", savings: "17%" },
                { name: "6 Months", price: "$44.99", savings: "25%" },
                { name: "Annual", price: "$79.99", savings: "33%", popular: true },
              ].map((option, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-spiritual-primary/20 dark:bg-spiritual-dark-card dark:border-spiritual-dark-border">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-spiritual-text-dark dark:text-spiritual-dark-text-light">
                      {option.name}
                    </div>
                    {option.popular && (
                      <span className="px-2 py-1 bg-spiritual-primary text-white text-xs font-bold rounded-full dark:bg-spiritual-dark-primary">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-lg font-bold text-spiritual-text-dark dark:text-spiritual-dark-text-light">
                      {option.price}
                    </div>
                    {option.savings !== "0%" && (
                      <div className="text-xs text-spiritual-primary font-bold dark:text-spiritual-dark-primary">
                        Save {option.savings}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-spiritual-background to-spiritual-tertiary/30 rounded-2xl p-6 mb-6 border border-spiritual-primary/20 dark:from-spiritual-dark-background dark:to-spiritual-dark-tertiary/30 dark:border-spiritual-dark-border">
            <h3 className="text-xl font-spirituality font-bold text-spiritual-primary mb-4 tracking-wide dark:text-spiritual-dark-primary">
              Sacred Features Unlocked
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Unlimited daily matches",
                "Advanced compatibility algorithm",
                "Priority customer support",
                "Exclusive spiritual content",
                "Community events access",
                "Profile verification badge",
                "Custom conversation starters",
                "Relationship coaching sessions"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-spiritual-primary flex-shrink-0 dark:text-spiritual-dark-primary" />
                  <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Email Collection Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2 dark:text-spiritual-dark-accent">
                  Get Early Access
                </h3>
                <p className="text-spiritual-text-muted mb-4 dark:text-spiritual-dark-text-muted">
                  Be among the first to experience FullCircle when we launch
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" style={{ marginTop: '-2.5px' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-full focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-muted dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-spiritual-primary/90 to-spiritual-secondary/90 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-100 hover:scale-105 font-spirituality text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed dark:from-spiritual-dark-primary/90 dark:to-spiritual-dark-secondary/90"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-green-900/20">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2 dark:text-spiritual-dark-accent">
                Welcome to FullCircle! 🌟
              </h3>
              <p className="text-spiritual-text-muted dark:text-spiritual-dark-text-muted">
                You&apos;re now on our exclusive waitlist. We&apos;ll notify you as soon as we launch!
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FullCircleModal;
