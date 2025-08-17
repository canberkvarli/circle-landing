import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, Star, Heart, Sparkles, Users, Crown } from "lucide-react";

interface FullCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullCircleModal = ({ isOpen, onClose }: FullCircleModalProps) => {
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
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Crown className="w-10 h-10 text-white" />
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
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 mb-6 border border-amber-200">
            <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-4 text-center">
              Choose Your Sacred Path
            </h3>
            <div className="space-y-3">
              {[
                { plan: "1 Month", price: "$29.99", weekly: "$7.50/week" },
                { plan: "3 Months", price: "$74.97", weekly: "$6.25/week", popular: true, savings: "17%" },
                { plan: "6 Months", price: "$119.94", weekly: "$5.00/week", savings: "33%" }
              ].map((option, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-amber-200">
                  <div className="flex items-center gap-3">
                    <span className="font-spirituality font-bold text-spiritual-accent">
                      {option.plan}
                    </span>
                    {option.popular && (
                      <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
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
                      <div className="text-xs text-amber-600 font-bold">
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
                  <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-spiritual-text-dark font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-spiritual-text-muted text-sm mt-4 italic">
              Cancel anytime and keep all premium features until your cycle ends
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => {
                onClose();
                // You can add logic here to open the waitlist modal
              }}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-white rounded-full font-medium shadow-xl text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-spirituality font-bold tracking-wide"
            >
              Start Your FullCircle Journey
            </button>
            <p className="text-sm text-spiritual-text-muted mt-3">
              First 5,000 members get 1 month completely free
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FullCircleModal;
