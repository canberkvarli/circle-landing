import React from "react";
import { motion } from "framer-motion";
import { X, Heart, Users, Sparkles, Star, Shield, Zap } from "lucide-react";

interface FeaturesModalProps {
  onClose: () => void;
}

const FeaturesModal = ({ onClose }: FeaturesModalProps) => {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Deep Connections",
      description: "Find meaningful relationships with people who share your spiritual journey and values."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Building",
      description: "Join groups and circles based on your interests, practices, and spiritual path."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Intention Matching",
      description: "Our AI connects you with people who align with your energy and personal goals."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Enhanced Features",
      description: "Unlock advanced matching, unlimited connections, and enhanced visibility."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe Space",
      description: "A protected environment where authenticity and vulnerability are celebrated."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Stay connected with instant notifications and live community updates."
    }
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
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
            <h2 className="text-4xl font-spirituality font-bold text-spiritual-accent mb-4 tracking-wide">
              Features
            </h2>
            <p className="text-xl text-spiritual-text-muted max-w-2xl mx-auto">
              Discover the powerful tools and features that make fullcircle the ultimate platform for meaningful connections.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-spiritual-background rounded-2xl p-6 border border-spiritual-accent/20 hover:border-spiritual-accent/40 transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-spiritual-accent/20 rounded-full flex items-center justify-center text-spiritual-accent">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-spiritual-text-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 text-center">
              Ready to Join fullcircle?
            </h3>
            <p className="text-center text-spiritual-text-muted mb-6">
              Join thousands of mindful seekers who are already transforming their connections through fullcircle.
            </p>
            <div className="text-center">
              <button
                onClick={onClose}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-white rounded-full font-medium shadow-xl text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-spirituality font-bold tracking-wide"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeaturesModal;
