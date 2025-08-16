import React from "react";
import { motion } from "framer-motion";

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
              <svg className="w-5 h-5 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 70c-16.569 0-30-13.431-30-30s13.431-30 30-30 30 13.431 30 30-13.431 30-30 30z"/>
                <path d="M50 25c-19.33 0-35 15.67-35 35s15.67 35 35 35 35-15.67 35-35-15.67-35-35-35zm0 60c-13.807 0-25-11.193-25-25s11.193-25 25-25 25 11.193 25 25-11.193 25-25 25z"/>
                <path d="M50 35c-13.807 0-25 11.193-25 25s11.193 25 25 25 25-11.193 25-25-11.193-25-25-25zm0 40c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15z"/>
              </svg>
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
