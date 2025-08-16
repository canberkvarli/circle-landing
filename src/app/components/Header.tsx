import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, Menu, X } from "lucide-react";

const Header = ({ openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-spiritual-border"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Circle className="w-8 h-8 text-spiritual-primary" />
            <span className="text-xl font-semibold text-spiritual-primary">
              Circle
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.button
              className="text-spiritual-text-muted hover:text-spiritual-primary transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </motion.button>
            <motion.button
              className="text-spiritual-text-muted hover:text-spiritual-primary transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.button>
            <motion.button
              className="text-spiritual-text-muted hover:text-spiritual-primary transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Roadmap
            </motion.button>
            <motion.button
              className="text-spiritual-text-muted hover:text-spiritual-primary transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
          </nav>

          {/* CTA Button */}
          <motion.button
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-spiritual-primary to-spiritual-secondary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(123, 107, 92, 0.25)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal("earlyAccess")}
          >
            Join Waitlist
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-spiritual-primary"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-spiritual-border shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 space-y-4">
                <button className="block w-full text-left text-spiritual-text-muted hover:text-spiritual-primary transition-colors py-2">
                  Features
                </button>
                <button className="block w-full text-left text-spiritual-text-muted hover:text-spiritual-primary transition-colors py-2">
                  About
                </button>
                <button className="block w-full text-left text-spiritual-text-muted hover:text-spiritual-primary transition-colors py-2">
                  Roadmap
                </button>
                <button className="block w-full text-left text-spiritual-text-muted hover:text-spiritual-primary transition-colors py-2">
                  Contact
                </button>
                <button
                  className="block w-full px-6 py-3 bg-gradient-to-r from-spiritual-primary to-spiritual-secondary text-white rounded-full font-medium text-center"
                  onClick={() => {
                    openModal("earlyAccess");
                    setIsMenuOpen(false);
                  }}
                >
                  Join Waitlist
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
