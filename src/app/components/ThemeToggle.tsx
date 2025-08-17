"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full bg-gradient-to-r from-spiritual-accent/20 to-spiritual-primary/20 backdrop-blur-sm border border-spiritual-accent/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-spiritual-accent/10 to-spiritual-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-spiritual-accent" />
        ) : (
          <Sun className="w-5 h-5 text-spiritual-accent" />
        )}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-spiritual-accent/20 to-spiritual-primary/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.button>
  );
};

export default ThemeToggle;
