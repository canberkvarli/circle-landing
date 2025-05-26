import React from "react";
import { motion } from "framer-motion";

const RoadmapSection = ({ showIntro }: { showIntro: boolean }) => {
  const roadmapItems = [
    {
      status: "COMPLETE",
      statusColor: "bg-green-500",
      period: "Q4 2024",
      title: "Foundation & Core Development",
      description:
        "User authentication, profile creation, and matching algorithm",
    },
    {
      status: "IN PROGRESS",
      statusColor: "bg-yellow-500",
      period: "Q1 2025",
      title: "Beta Testing & Refinement",
      description:
        "Closed beta with conscious communities, feedback integration, and platform optimization",
    },
    {
      status: "UPCOMING",
      statusColor: "bg-[#8B5A2B]",
      period: "Q2 2025",
      title: "Public Launch",
      description:
        "iOS and Android app release, community features, and guided connection experiences",
    },
    {
      status: "FUTURE",
      statusColor: "bg-gray-500",
      period: "Q3 2025",
      title: "Enhanced Features",
      description:
        "Group meditations, wellness events, mentorship programs, and advanced compatibility insights",
    },
  ];

  return (
    <motion.section
      className="py-20 bg-white/30 backdrop-blur-sm relative z-10"
      id="roadmap"
      initial={{ opacity: 0, y: 50 }}
      animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 4.4 }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-light mb-6 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent">
            Our Journey
          </h2>
          <p className="text-lg text-[#8B7355]">
            The path to creating meaningful connections
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] to-[#8B5A2B] opacity-30"></div>

          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative mb-12 ml-12 p-6 bg-white/70 backdrop-blur-sm rounded-xl border-l-4 border-[#D4AF37] hover:shadow-lg transition-all duration-300 hover:transform hover:translate-x-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ x: 10 }}
            >
              <div className="absolute -left-14 top-8 w-4 h-4 bg-[#D4AF37] rounded-full border-4 border-white shadow-lg"></div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`${item.statusColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                >
                  {item.status}
                </span>
                <span className="text-[#8B7355] text-sm font-medium">
                  {item.period}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#8B5A2B] mb-2">
                {item.title}
              </h3>
              <p className="text-[#8B7355] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
export default RoadmapSection;
