"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Users,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Check,
  Download,
  Star,
  Menu,
  X,
  Calendar,
  Shield,
  Globe,
  Compass,
} from "lucide-react";

const CircleLandingPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stats] = useState({ users: 8247, downloads: 125000, matches: 15600 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Simple intro timing
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Simple Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-5xl font-light text-gray-900">Circle</h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Slides up like a drawer */}
      <motion.div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden"
        initial={{ y: "100%" }}
        animate={showIntro ? { y: "100%" } : { y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: showIntro ? 0 : 1.5,
        }}
      >
        {/* Sacred Mandala Background */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-0">
          <svg
            viewBox="0 0 800 800"
            className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[120vh] min-h-[120vh]"
          >
            <defs>
              <radialGradient id="mandalaGradient" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#374151", stopOpacity: 0.8 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#6B7280", stopOpacity: 0.4 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#9CA3AF", stopOpacity: 0.1 }}
                />
              </radialGradient>
            </defs>

            {/* Outer ring - Lotus petals */}
            {[...Array(24)].map((_, i) => (
              <g key={`outer-${i}`} transform={`rotate(${i * 15} 400 400)`}>
                <path
                  d="M400 50 Q420 100 400 150 Q380 100 400 50"
                  fill="url(#mandalaGradient)"
                  opacity="0.7"
                />
                <path
                  d="M400 70 Q410 110 400 130 Q390 110 400 70"
                  fill="none"
                  stroke="#4B5563"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
              </g>
            ))}

            {/* Middle ring - Sacred geometry */}
            {[...Array(12)].map((_, i) => (
              <g key={`middle-${i}`} transform={`rotate(${i * 30} 400 400)`}>
                <circle
                  cx="400"
                  cy="200"
                  r="15"
                  fill="none"
                  stroke="#4B5563"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
                <circle
                  cx="400"
                  cy="200"
                  r="8"
                  fill="none"
                  stroke="#6B7280"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <path
                  d="M400 185 L400 215 M385 200 L415 200"
                  stroke="#4B5563"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
              </g>
            ))}

            {/* Inner ring - Tree of Life pattern */}
            {[...Array(8)].map((_, i) => (
              <g key={`inner-${i}`} transform={`rotate(${i * 45} 400 400)`}>
                <path
                  d="M400 300 Q420 320 400 340 Q400 350 400 360 Q390 350 400 340 Q380 320 400 300"
                  fill="none"
                  stroke="#4B5563"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                <circle cx="400" cy="320" r="4" fill="#6B7280" opacity="0.6" />
              </g>
            ))}

            {/* Center - Heart chakra symbol */}
            <g transform="translate(400, 400)">
              {/* Outer hexagram */}
              <path
                d="M0,-40 L34.6,-20 L34.6,20 L0,40 L-34.6,20 L-34.6,-20 Z"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                opacity="0.8"
              />
              <path
                d="M0,40 L34.6,20 L34.6,-20 L0,-40 L-34.6,-20 L-34.6,20 Z"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
                opacity="0.8"
              />

              {/* Inner circles */}
              <circle
                r="30"
                fill="none"
                stroke="#4B5563"
                strokeWidth="1.5"
                opacity="0.7"
              />
              <circle
                r="20"
                fill="none"
                stroke="#6B7280"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* Heart symbol in center */}
              <path
                d="M0,8 C0,3 -8,-5 -15,3 C-15,-5 -22,3 -15,8 L0,20 L15,8 C22,3 15,-5 15,3 C8,-5 0,3 0,8 Z"
                fill="#4B5563"
                opacity="0.6"
              />

              {/* Radiating lines */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={`ray-${i}`}
                  x1="0"
                  y1="35"
                  x2="0"
                  y2="45"
                  stroke="#6B7280"
                  strokeWidth="1"
                  opacity="0.4"
                  transform={`rotate(${i * 30})`}
                />
              ))}
            </g>

            {/* Outer cosmic circles */}
            <circle
              cx="400"
              cy="400"
              r="350"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="1"
              opacity="0.3"
            />
            <circle
              cx="400"
              cy="400"
              r="300"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="0.8"
              opacity="0.25"
            />
            <circle
              cx="400"
              cy="400"
              r="250"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="0.6"
              opacity="0.2"
            />
          </svg>
        </div>

        {/* Floating Sacred Elements */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-15">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`float-${i}`}
              className="absolute w-6 h-6 text-gray-400"
              style={{
                left: `${(i * 15 + 10) % 90}%`,
                top: `${(i * 23 + 15) % 80}%`,
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <motion.header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-lg shadow-gray-500/5"
              : "bg-transparent"
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={!showIntro ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Circle
                </span>
              </motion.div>

              {/* Navigation - Desktop */}
              <nav className="hidden md:flex items-center space-x-1">
                {[
                  { name: "Features", id: "features" },
                  { name: "About", id: "about" },
                  { name: "Contact", id: "contact" },
                ].map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300 rounded-lg group"
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.name}
                    <motion.div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 group-hover:w-8 group-hover:-translate-x-4 transition-all duration-300" />
                  </motion.button>
                ))}
              </nav>

              {/* Right Section */}
              <div className="hidden md:flex items-center space-x-4">
                <motion.div
                  className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <motion.div
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    <span className="text-gray-900 font-bold">
                      {stats.users.toLocaleString()}
                    </span>{" "}
                    joining
                  </span>
                </motion.div>

                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-full font-medium shadow-lg relative overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Get Early Access</span>
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden mt-4 py-4 border-t border-gray-200"
                >
                  <nav className="flex flex-col space-y-2">
                    {[
                      { name: "Features", id: "features" },
                      { name: "About", id: "about" },
                      { name: "Contact", id: "contact" },
                    ].map((item, index) => (
                      <motion.button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="text-left text-gray-700 hover:text-gray-900 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.name}
                      </motion.button>
                    ))}
                    <motion.button
                      className="mt-4 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-full font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Get Early Access
                    </motion.button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.main
          className="pt-32 pb-20 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.3 }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-light mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={
                !showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 1, delay: 2.5 }}
            >
              <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                Sacred
              </span>
              <span className="block text-gray-600">Connections</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={
                !showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 1, delay: 2.7 }}
            >
              Where sacred souls unite. Connect with fellow seekers who practice
              <span className="text-gray-800 font-medium"> meditation</span>,
              <span className="text-gray-800 font-medium"> yoga</span>,
              <span className="text-gray-800 font-medium"> energy healing</span>
              , and embrace conscious living.
            </motion.p>

            {/* Coming Soon */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                !showIntro
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.6, delay: 2.9 }}
            >
              <div className="max-w-lg mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-xl">
                <motion.div
                  className="flex items-center justify-center space-x-2 mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Calendar className="w-5 h-5 text-gray-700" />
                  <span className="text-lg font-semibold text-gray-800">
                    Coming Spring 2025
                  </span>
                </motion.div>
                <p className="text-gray-600 mb-4">
                  Join the waitlist for exclusive early access
                </p>
                <div className="text-sm text-gray-500">
                  iOS & Android • Free to download
                </div>
              </div>
            </motion.div>

            {/* Email Collection */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={
                !showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 3.1 }}
            >
              <div className="max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-xl">
                        <input
                          type="email"
                          placeholder="Enter your email for early access"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 px-6 py-3 rounded-full border-0 focus:outline-none bg-white/90 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-gray-300/50"
                          required
                        />
                        <motion.button
                          onClick={handleSubmit}
                          className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-full font-medium shadow-lg flex items-center justify-center space-x-2 whitespace-nowrap relative overflow-hidden group"
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/10"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                          <span className="relative z-10">Join Waitlist</span>
                          <ArrowRight className="w-4 h-4 relative z-10" />
                        </motion.button>
                      </div>
                      <p className="text-gray-600 text-center mt-4">
                        Be among the first to experience divine love ✨
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl"
                    >
                      <motion.div
                        className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.6 }}
                      >
                        <Check className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Welcome to the Circle
                      </h3>
                      <p className="text-gray-600">
                        You're on the exclusive early access list!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="border-t border-gray-200 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={
                !showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 3.3 }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { value: stats.users, label: "Souls waiting", suffix: "+" },
                  { value: 25, label: "Sacred features", suffix: "+" },
                  {
                    value: stats.matches,
                    label: "Connections made",
                    suffix: "+",
                  },
                  { value: 2156, label: "Beta testers", suffix: "" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      !showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 3.5 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <div className="text-xl sm:text-2xl font-bold mb-1 text-gray-800 group-hover:text-gray-900 transition-colors">
                      {stat.value.toLocaleString()}
                      {stat.suffix}
                    </div>
                    <div className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.main>

        {/* Features Section */}
        <motion.section
          className="py-20 relative z-10"
          id="features"
          initial={{ opacity: 0, y: 50 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-light mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Sacred Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every feature designed for authentic spiritual connections and
                divine love
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Conscious Matching",
                  description:
                    "Connect with souls who share your spiritual practices and consciousness level",
                  features: [
                    "Energy alignment",
                    "Practice matching",
                    "Soul compatibility",
                  ],
                },
                {
                  icon: Compass,
                  title: "Spiritual Guidance",
                  description:
                    "Receive personalized insights and guidance for your spiritual journey",
                  features: [
                    "Daily wisdom",
                    "Practice tracking",
                    "Growth insights",
                  ],
                },
                {
                  icon: MessageCircle,
                  title: "Sacred Conversations",
                  description:
                    "Share your journey through meaningful dialogue about consciousness and growth",
                  features: [
                    "Deep conversations",
                    "Guided prompts",
                    "Energy exchange",
                  ],
                },
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl h-full group-hover:border-gray-300/50">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-6 mx-auto text-gray-700 group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">
                        {feature.description}
                      </p>

                      <div className="space-y-2">
                        {feature.features.map((item, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center justify-center space-x-2 text-sm text-gray-500 group-hover:text-gray-600 transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-gray-500 transition-colors"></div>
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Your Journey Section */}
        <motion.section
          className="py-20 bg-white/40 backdrop-blur-sm relative z-10"
          id="about"
          initial={{ opacity: 0, y: 50 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 3.7 }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-light text-gray-800 mb-6 leading-tight">
                Your sacred journey
                <span className="block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  begins with intention
                </span>
              </h2>

              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Join thousands of awakened souls ready to experience authentic
                connection through shared spiritual practices.
              </p>

              {/* Journey Steps */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    step: "1",
                    title: "Set Your Intention",
                    description:
                      "Define what sacred connection means to you and your spiritual path",
                  },
                  {
                    step: "2",
                    title: "Connect Consciously",
                    description:
                      "Match with souls who resonate with your energy and practices",
                  },
                  {
                    step: "3",
                    title: "Grow Together",
                    description:
                      "Embark on a journey of mutual growth, love, and evolution",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold shadow-lg group-hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.step}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex flex-wrap justify-center gap-4 sm:gap-6 text-gray-500 text-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {[
                  { icon: Calendar, text: "Spring 2025" },
                  { icon: Download, text: "iOS & Android" },
                  { icon: Heart, text: "Free to join" },
                  { icon: Sparkles, text: "Sacred by design" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2 hover:text-gray-700 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="py-12 px-6 border-t border-gray-200 relative z-10"
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 3.9 }}
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
                <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Circle
                </span>
              </motion.div>
              <p className="text-gray-600 mb-6">
                Connecting souls through sacred technology and conscious design.
              </p>
              <div className="flex justify-center space-x-6 text-gray-500 mb-6 text-sm">
                {["Privacy", "Terms", "Contact"].map((item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="hover:text-gray-800 transition-colors"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                © 2025 Circle. All rights reserved.
              </p>
            </motion.div>
          </div>
        </motion.footer>
      </motion.div>
    </>
  );
};

export default CircleLandingPage;
