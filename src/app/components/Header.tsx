import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  openModal: (modalType: string) => void;
}

const Header = ({ openModal }: HeaderProps) => {
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
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/circle.svg"
              alt="Circle"
              width={80}
              height={80}
              className="w-20 h-20"
            />
            <span className="text-4xl font-spirituality font-bold tracking-wider text-spiritual-text-dark">
              circle
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => {
                document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-medium"
            >
              Roadmap
            </button>
          </nav>

          {/* CTA Button */}
          <motion.button
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(184, 134, 11, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal('earlyAccess')}
          >
            Join Waitlist
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-spiritual-accent"
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-spiritual-accent/20 md:hidden"
            >
              <div className="px-6 py-4 space-y-4">
                <button
                  onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-medium"
                >
                  About
                </button>
                <button
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-medium"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-medium"
                >
                  Roadmap
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
