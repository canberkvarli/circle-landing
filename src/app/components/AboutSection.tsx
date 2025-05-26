import React from "react";
import { motion } from "framer-motion";
import { Calendar, Download, Heart, Sparkles } from "lucide-react";

interface AboutSectionProps {
  showIntro: boolean;
  openModal: (modalId: string) => void;
}

const AboutSection = ({ showIntro, openModal }: AboutSectionProps) => {
  return (
    <motion.section
      className="py-20 relative z-10"
      id="about"
      initial={{ opacity: 0, y: 50 }}
      animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 4.6 }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-[#8B5A2B] mb-8 leading-tight bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent">
            Your journey begins here
          </h2>

          <p className="text-lg text-[#8B7355] mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of awakened souls ready to experience authentic
            connection through shared practices and values.
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 text-[#8B7355] text-sm mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { icon: Calendar, text: "Spring 2025" },
              { icon: Download, text: "iOS & Android" },
              { icon: Heart, text: "Free to join" },
              { icon: Sparkles, text: "Mindful by design" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-full font-medium shadow-lg text-lg relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(139, 90, 43, 0.25)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal("earlyAccess")}
          >
            Reserve Your Place
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};
export default AboutSection;
