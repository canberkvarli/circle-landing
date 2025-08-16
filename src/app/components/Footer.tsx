import React from "react";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";

const Footer = ({ showIntro, openModal }) => {
  return (
    <motion.footer
      className="py-12 px-6 border-t border-spiritual-primary/20 relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 4.8 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center justify-center space-x-3 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-spiritual-primary to-spiritual-secondary rounded-lg flex items-center justify-center">
              <Circle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-spiritual-primary to-spiritual-secondary bg-clip-text text-transparent">
              Circle
            </span>
          </motion.div>
          <p className="text-spiritual-text-muted mb-6">
            Connecting souls through mindful technology and conscious design.
          </p>
          <div className="flex justify-center space-x-6 text-spiritual-text-muted mb-6 text-sm">
            {[
              { name: "Privacy", modal: "privacy" },
              { name: "Terms", modal: "terms" },
              { name: "Contact", modal: "contact" },
            ].map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => openModal(item.modal)}
                className="hover:text-spiritual-secondary transition-colors"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
          <p className="text-spiritual-text-muted/70 text-sm">
            © 2025 Circle. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
