import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, Clock, Star } from "lucide-react";

interface RoadmapModalProps {
  onClose: () => void;
}

const RoadmapModal = ({ onClose }: RoadmapModalProps) => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation & Launch",
      status: "completed",
      features: ["Core matching algorithm", "User profiles", "Basic messaging", "iOS & Android apps"],
      timeline: "Q1 2024"
    },
    {
      phase: "Phase 2",
      title: "Community Building",
      status: "in-progress",
      features: ["Group circles", "Event organization", "Community guidelines", "Moderation tools"],
      timeline: "Q2 2024"
    },
    {
      phase: "Phase 3",
      title: "Advanced Features",
      status: "planned",
      features: ["AI-powered matching", "Video calls", "Meditation integration", "Wellness tracking"],
      timeline: "Q3 2024"
    },
    {
      phase: "Phase 4",
      title: "Global Expansion",
      status: "planned",
      features: ["Multi-language support", "Cultural adaptations", "Global events", "Partnerships"],
      timeline: "Q4 2024"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "in-progress":
        return <Clock className="w-6 h-6 text-amber-500" />;
      case "planned":
        return <Star className="w-6 h-6 text-blue-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-500 bg-green-50";
      case "in-progress":
        return "border-amber-500 bg-amber-50";
      case "planned":
        return "border-blue-500 bg-blue-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
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
              Development Roadmap
            </h2>
            <p className="text-xl text-spiritual-text-muted max-w-2xl mx-auto">
              See how Circle is evolving and what&apos;s coming next in our journey to transform conscious connections.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <div className="space-y-6">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                className={`border-2 rounded-2xl p-6 ${getStatusColor(item.status)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <span className="text-sm font-medium text-spiritual-text-muted uppercase tracking-wide">
                        {item.phase}
                      </span>
                      <h3 className="text-xl font-spirituality font-bold text-spiritual-accent">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-spiritual-text-muted">
                    {item.timeline}
                  </span>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {item.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-spiritual-accent rounded-full"></div>
                      <span className="text-spiritual-text-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200 mt-8">
            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 text-center">
              Be Part of Our Journey
            </h3>
            <p className="text-center text-spiritual-text-muted mb-6">
              Join our community and help shape the future of conscious connections. Your feedback and participation drive our development.
            </p>
            <div className="text-center">
              <button
                onClick={onClose}
                className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-white rounded-full font-medium shadow-xl text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-spirituality font-bold tracking-wide"
              >
                Join the Community
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RoadmapModal;
