import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FooterProps {
  showIntro: boolean;
  openModal: (modalType: string) => void;
}

const Footer = ({ showIntro, openModal }: FooterProps) => {
  return (
    <motion.footer
      className="py-12 px-6 border-t border-spiritual-primary/20 relative z-10 dark:border-spiritual-dark-border"
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
            className="flex items-center justify-center space-x-0 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Circle"
                width={32}
                height={32}
                className="w-50 h-50 mr-2"
              />
              <span className="text-3xl font-spirituality text-spiritual-primary dark:text-spiritual-dark-primary ml-2">
                Circle
              </span>
            </button>
          </motion.div>
          <p className="text-spiritual-text-muted mb-6 dark:text-spiritual-dark-text-muted">
            Connecting souls through mindful technology and mindful design.
          </p>
          <div className="flex justify-center space-x-6 text-spiritual-text-muted mb-6 text-sm dark:text-spiritual-dark-text-muted">
            {[
              { name: "Privacy", modal: "privacy" },
              { name: "Terms", modal: "terms" },
              { name: "Contact", modal: "contact" },
            ].map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => openModal(item.modal)}
                className="hover:text-spiritual-secondary transition-colors dark:hover:text-spiritual-dark-secondary"
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
          <p className="text-spiritual-text-muted/70 text-sm dark:text-spiritual-dark-text-muted/70">
            © 2025 Circle. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
