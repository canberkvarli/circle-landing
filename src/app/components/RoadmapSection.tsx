import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Star } from "lucide-react";

const RoadmapSection = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation",
      description: "Core app development and beta testing",
      status: "COMPLETED",
      date: "Q1 2024",
    },
    {
      phase: "Phase 2",
      title: "Launch",
      description: "Public release and community building",
      status: "IN PROGRESS",
      date: "Q2 2024",
    },
    {
      phase: "Phase 3",
      title: "Growth",
      description: "Feature expansion and user growth",
      status: "UPCOMING",
      date: "Q3 2024",
    },
    {
      phase: "Phase 4",
      title: "Evolution",
      description: "Advanced features and AI integration",
      status: "UPCOMING",
      date: "Q4 2024",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500";
      case "IN PROGRESS":
        return "bg-spiritual-accent";
      case "UPCOMING":
        return "bg-spiritual-primary";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <section id="roadmap" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-spirituality font-bold text-spiritual-accent mb-6 tracking-wide">
            Our Journey
          </h2>
          <p className="text-xl text-spiritual-text-muted max-w-3xl mx-auto leading-relaxed">
            Follow our path as we build the future of conscious connections
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-spiritual-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-spiritual-accent">
                    {item.phase}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="text-xl font-spirituality font-bold text-spiritual-text-dark mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-spiritual-text-muted mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center text-sm text-spiritual-accent">
                  <Clock className="w-4 h-4 mr-2" />
                  {item.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
