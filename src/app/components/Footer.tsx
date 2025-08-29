import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

// Custom X.com logo component
const XLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
              <span className="text-3xl font-spirituality text-spiritual-text-dark dark:text-spiritual-dark-primary ml-2">
                Circle
              </span>
            </button>
          </motion.div>
          <p className="text-spiritual-text-dark dark:text-spiritual-dark-text-muted mb-6">
            Connecting souls through mindful technology and mindful design.
          </p>
          <div className="flex justify-center space-x-6 text-spiritual-text-dark dark:text-spiritual-dark-text-muted mb-6 text-sm">
            <motion.button
              onClick={() => openModal("contact")}
              className="hover:text-spiritual-secondary transition-colors dark:hover:text-spiritual-dark-secondary"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Contact
            </motion.button>
            <motion.button
              onClick={() => openModal("privacyPolicy")}
              className="hover:text-spiritual-secondary transition-colors dark:hover:text-spiritual-dark-secondary"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Privacy Policy
            </motion.button>
            <motion.button
              onClick={() => openModal("termsAndConditions")}
              className="hover:text-spiritual-secondary transition-colors dark:hover:text-spiritual-dark-secondary"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Terms &amp; Conditions
            </motion.button>
          </div>
          
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 text-spiritual-text-dark dark:text-spiritual-dark-text-muted mb-6">
            <motion.a
              href="https://www.linkedin.com/company/joinfullcircleapp/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-spiritual-accent/10 hover:bg-spiritual-accent/20 transition-colors dark:hover:bg-spiritual-dark-accent/20"
              whileHover={{ y: -2, scale: 1.1 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://instagram.com/fullcircleapp.co"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-spiritual-accent/10 hover:bg-spiritual-accent/20 transition-colors dark:hover:bg-spiritual-dark-accent/20"
              whileHover={{ y: -2, scale: 1.1 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://x.com/meetoncircle"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-spiritual-accent/10 hover:bg-spiritual-accent/20 transition-colors dark:hover:bg-spiritual-dark-accent/20"
              whileHover={{ y: -2, scale: 1.1 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              aria-label="X"
            >
              <XLogo className="w-5 h-5" />
            </motion.a>
          </div>
          <p className="text-spiritual-text-dark/70 dark:text-spiritual-dark-text-muted/70 text-sm">
            © 2025 Circle. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
