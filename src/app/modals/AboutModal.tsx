import React from "react";
import { motion } from "framer-motion";
import { X, Heart, Users, Sparkles, Globe } from "lucide-react";

interface AboutModalProps {
  onClose: () => void;
}

const AboutModal = ({ onClose }: AboutModalProps) => {
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
              About Circle
            </h2>
            <p className="text-xl text-spiritual-text-muted max-w-2xl mx-auto">
              Where intention meets connection. Circle is building a community of mindful seekers who believe in the power of meaningful relationships.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-spiritual-accent/20 rounded-full flex items-center justify-center text-spiritual-accent">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2">
                    Our Mission
                  </h3>
                  <p className="text-spiritual-text-muted">
                    To create authentic connections between people who share a passion for personal growth, mindful living, and meaningful relationships.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-spiritual-accent/20 rounded-full flex items-center justify-center text-spiritual-accent">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2">
                    Our Community
                  </h3>
                  <p className="text-spiritual-text-muted">
                    A diverse group of seekers, healers, yogis, meditators, and mindful individuals who value depth over superficiality.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-spiritual-accent/20 rounded-full flex items-center justify-center text-spiritual-accent">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2">
                    Our Values
                  </h3>
                  <p className="text-spiritual-text-muted">
                    Authenticity, mindfulness, compassion, and the belief that every connection has the potential to transform lives.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-spiritual-accent/20 rounded-full flex items-center justify-center text-spiritual-accent">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-2">
                    Our Vision
                  </h3>
                  <p className="text-spiritual-text-muted">
                    A world where meaningful connections flourish, creating ripples of positive change that touch every corner of the globe.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 text-center">
              Join the Movement
            </h3>
            <p className="text-center text-spiritual-text-muted mb-6">
              Be part of something bigger than yourself. Connect with like-minded souls who are ready to explore meaningful connections together.
            </p>
            <div className="text-center">
              <button
                onClick={onClose}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-white rounded-full font-medium shadow-xl text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-spirituality font-bold tracking-wide"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutModal;
