import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { APP_STORE_URL } from "../constants";


interface FooterProps {
  showIntro: boolean;
  openModal: (modalType: string) => void;
}

const Footer = ({ showIntro, openModal }: FooterProps) => {
  // const instagramLink = "https://instagram.com/meetonfullcircle";

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
                alt="fullcircle"
                width={32}
                height={32}
                className="w-50 h-50 mr-2"
              />
              <span className="text-3xl font-spirituality text-spiritual-text-dark dark:text-spiritual-dark-primary ml-2">
                fullcircle
              </span>
            </button>
          </motion.div>
          <p className="text-spiritual-text-dark dark:text-spiritual-dark-text-muted mb-6">
            Building wellness community through mindful technology and conscious design.
          </p>
          <div className="flex justify-center space-x-6 text-spiritual-text-dark dark:text-spiritual-dark-text-muted mb-6 text-sm flex-wrap gap-2">
            <motion.a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-spiritual-secondary transition-colors dark:hover:text-spiritual-dark-secondary"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Download the app
            </motion.a>
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
            <motion.div
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/privacy"
                className="hover:text-spiritual-secondary transition-colors dark:hover:text-spiritual-dark-secondary"
              >
                Privacy Policy
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/terms"
                className="hover:text-spiritual-secondary transition-colors dark:hover:text-spiritual-dark-secondary"
              >
                Terms &amp; Conditions
              </Link>
            </motion.div>
          </div>
          
          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 text-spiritual-text-dark dark:text-spiritual-dark-text-muted mb-6">
            <motion.a
              href="https://www.linkedin.com/company/joinfullcircleapp"
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
            {/* Instagram commented out
            <motion.a
              href={instagramLink}
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
            */}
          </div>
          <p className="text-spiritual-text-dark/70 dark:text-spiritual-dark-text-muted/70 text-sm">
            © 2025 fullcircle. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
