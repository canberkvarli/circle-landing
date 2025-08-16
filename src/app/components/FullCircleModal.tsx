import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, Star, Heart, Sparkles, Users, Mail } from "lucide-react";

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
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
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
            className="absolute top-6 right-6 w-8 h-8 bg-spiritual-accent/10 rounded-full flex items-center justify-center hover:bg-spiritual-accent/20 transition-colors"
          >
            <X className="w-5 h-5 text-spiritual-accent" />
          </button>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-spiritual-accent to-spiritual-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-10 h-10 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 70c-16.569 0-30-13.431-30-30s13.431-30 30-30 30 13.431 30 30-13.431 30-30 30z"/>
                <path d="M50 25c-19.33 0-35 15.67-35 35s15.67 35 35 35 35-15.67 35-35-15.67-35-35-35zm0 60c-13.807 0-25-11.193-25-25s11.193-25 25-25 25 11.193 25 25-11.193 25-25 25z"/>
                <path d="M50 35c-13.807 0-25 11.193-25 25s11.193 25 25 25 25-11.193 25-25-11.193-25-25-25zm0 40c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-spirituality font-bold text-spiritual-accent mb-2 tracking-wide">
              What is FullCircle?
            </h2>
            <p className="text-spiritual-text-muted text-lg">
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
                icon: <Users className="w-6 h-6" />,
                title: "Unlimited Connections",
                description: "Connect with unlimited conscious seekers"
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "See Who Likes You",
                description: "Discover who resonates with your energy"
              },
              {
                icon: <Star className="w-6 h-6" />,
                title: "Advanced Filters",
                description: "Find your perfect spiritual match"
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Priority Matching",
                description: "Get featured with the lotus flower"
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-spiritual-background rounded-xl">
                <div className="w-10 h-10 bg-spiritual-accent/20 rounded-full flex items-center justify-center text-spiritual-accent">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-spirituality font-bold text-spiritual-accent mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-spiritual-text-muted text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Plans */}
          <div className="bg-gradient-to-br from-spiritual-background to-spiritual-tertiary/30 rounded-2xl p-6 mb-6 border border-spiritual-accent/20">
            <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-4 text-center">
              Choose Your Sacred Path
            </h3>
            <div className="space-y-3">
              {[
                { plan: "1 Month", price: "$29.99", weekly: "$7.50/week" },
                { plan: "3 Months", price: "$74.97", weekly: "$6.25/week", popular: true, savings: "17%" },
                { plan: "6 Months", price: "$119.94", weekly: "$5.00/week", savings: "33%" }
              ].map((option, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-spiritual-accent/20">
                  <div className="flex items-center gap-3">
                    <span className="font-spirituality font-bold text-spiritual-accent">
                      {option.plan}
                    </span>
                    {option.popular && (
                      <span className="px-2 py-1 bg-spiritual-accent text-white text-xs font-bold rounded-full">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-spirituality font-bold text-spiritual-accent">
                      {option.price}
                    </div>
                    <div className="text-sm text-spiritual-text-muted">
                      {option.weekly}
                    </div>
                    {option.savings && (
                      <div className="text-xs text-spiritual-accent font-bold">
                        Save {option.savings}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-spiritual-background rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-4 text-center">
              Sacred Features Unlocked
            </h3>
            <div className="space-y-3">
              {[
                "Unlimited Soul Connections",
                "See Who Resonates With You", 
                "Advanced Spiritual Filters",
                "Priority Likes with the Lotus Flower"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-spiritual-accent flex-shrink-0" />
                  <span className="text-spiritual-text-dark font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-spiritual-text-muted text-sm mt-4 italic">
              Cancel anytime and keep all premium features until your cycle ends
            </p>
          </div>

          {/* Email Collection Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2">
                  Get Early Access
                </h3>
                <p className="text-spiritual-text-muted mb-4">
                  Be among the first to experience FullCircle when we launch
                </p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-full focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="px-6 py-3 bg-gradient-to-r from-spiritual-accent to-spiritual-primary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-spirituality font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2">
                Welcome to FullCircle! 🌟
              </h3>
              <p className="text-spiritual-text-muted">
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
