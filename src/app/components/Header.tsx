'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  openModal: (modalType: string) => void;
}

const Header = ({ openModal }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent hydration mismatch by not rendering scroll-dependent content until mounted
  if (!mounted) {
    return (
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-transparent"
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
              priority
            />
              <span className="text-4xl font-spirituality font-bold tracking-wider text-spiritual-text-dark dark:text-spiritual-dark-text-dark">
                Circle
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent">
                About
              </button>
              <button className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent">
                Features
              </button>
              <button className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent">
                Roadmap
              </button>
              <button className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent">
                Contact
              </button>
              
              {/* Theme Toggle */}
              <ThemeToggle />
            </nav>

            {/* CTA Button */}
            <motion.button
              className="header-waitlist-button"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(255, 100, 100, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal('earlyAccess')}
            >
              Join Waitlist
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-spiritual-accent/10 transition-colors"
            >
              <Menu className="w-6 h-6 text-spiritual-text-dark dark:text-spiritual-dark-text-dark" />
            </button>
          </div>
        </div>
      </motion.header>
    );
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-spiritual-border dark:bg-spiritual-dark-card/90 dark:border-spiritual-dark-border"
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
              priority
            />
            <span className="text-4xl font-spirituality font-bold tracking-wider text-spiritual-text-dark dark:text-spiritual-dark-text-dark">
              Circle
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent"
            >
              About
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent"
            >
              Features
            </button>
            <button
              onClick={() => {
                document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent"
            >
              Roadmap
            </button>
            <button
              onClick={() => openModal('contact')}
              className="text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent"
            >
              Contact
            </button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </nav>

          {/* CTA Button */}
          <motion.button
            className="header-waitlist-button"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(255, 100, 100, 0.4)",
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
              className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-spiritual-accent/20 dark:bg-spiritual-dark-card dark:border-spiritual-dark-border md:hidden"
            >
              <div className="px-6 py-4 space-y-4">
                <button
                  onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent"
                >
                  About
                </button>
                <button
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent"
                >
                  Roadmap
                </button>
                <button
                  onClick={() => {
                    openModal('contact');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 text-spiritual-text-dark hover:text-spiritual-accent transition-colors font-bold text-xl font-spirituality tracking-wide dark:text-spiritual-dark-text-dark dark:hover:text-spiritual-dark-accent"
                >
                  Contact
                </button>
                
                {/* Mobile Theme Toggle */}
                <div className="flex justify-center pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
