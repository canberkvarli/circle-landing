import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, MessageCircle } from "lucide-react";

const FeaturesSection = ({ showIntro }: { showIntro: boolean }) => {
  const features = [
    {
      icon: Heart,
      title: "Mindful Matching",
      description: "Connect with souls who share your practices and values",
    },
    {
      icon: Users,
      title: "Conscious Community",
      description: "Join circles of like-minded seekers on similar journeys",
    },
    {
      icon: MessageCircle,
      title: "Meaningful Conversations",
      description:
        "Share your journey through deep dialogue about growth and consciousness",
    },
  ];

  return (
    <motion.section
      className="py-20 relative z-10"
      id="features"
      initial={{ opacity: 0, y: 50 }}
      animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 4.2 }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-light mb-6 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent">
            How it works
          </h2>
          <p className="text-lg text-[#8B7355]">
            Simple steps to find your authentic connection
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#8B5A2B]/20 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl h-full group-hover:border-[#8B5A2B]/30">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-[#8B5A2B]/10 to-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 mx-auto text-[#8B5A2B] group-hover:from-[#8B5A2B]/20 group-hover:to-[#D4AF37]/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-[#8B5A2B] mb-4 group-hover:text-[#D4AF37] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#8B7355] leading-relaxed group-hover:text-[#8B7355]/80 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
