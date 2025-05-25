"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Check,
  Calendar,
  Menu,
  X,
  Download,
  Users,
} from "lucide-react";

const CircleLandingPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stats] = useState({ users: 8247, matches: 15600 });
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
    }, 2500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Intro Animation with Tree of Life */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 z-50 flex items-center justify-center overflow-hidden"
            exit={{ y: "100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Tree of Life Background */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <svg viewBox="0 0 400 400" className="w-96 h-96 text-emerald-700">
                {/* Tree Trunk */}
                <motion.path
                  d="M200 350 Q195 300 200 250 Q205 300 200 350"
                  fill="currentColor"
                  opacity="0.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />

                {/* Main Branches */}
                {[
                  { d: "M200 250 Q170 220 140 200", delay: 0.8 },
                  { d: "M200 250 Q230 220 260 200", delay: 0.9 },
                  { d: "M200 250 Q180 200 160 170", delay: 1.0 },
                  { d: "M200 250 Q220 200 240 170", delay: 1.1 },
                  { d: "M200 250 Q190 190 180 140", delay: 1.2 },
                  { d: "M200 250 Q210 190 220 140", delay: 1.3 },
                ].map((branch, i) => (
                  <motion.path
                    key={i}
                    d={branch.d}
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: branch.delay }}
                  />
                ))}

                {/* Sacred Circles - Tree nodes */}
                {[
                  { cx: 200, cy: 120, r: 12, delay: 1.5 },
                  { cx: 180, cy: 140, r: 8, delay: 1.6 },
                  { cx: 220, cy: 140, r: 8, delay: 1.7 },
                  { cx: 160, cy: 170, r: 6, delay: 1.8 },
                  { cx: 240, cy: 170, r: 6, delay: 1.9 },
                  { cx: 140, cy: 200, r: 6, delay: 2.0 },
                  { cx: 260, cy: 200, r: 6, delay: 2.1 },
                  { cx: 200, cy: 250, r: 10, delay: 2.2 },
                ].map((circle, i) => (
                  <motion.circle
                    key={i}
                    cx={circle.cx}
                    cy={circle.cy}
                    r={circle.r}
                    fill="currentColor"
                    opacity="0.6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: circle.delay }}
                  />
                ))}

                {/* Connecting Lines */}
                <motion.path
                  d="M200 120 L180 140 M200 120 L220 140 M180 140 L160 170 M220 140 L240 170 M160 170 L140 200 M240 170 L260 200"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
              </svg>
            </motion.div>

            {/* Circle Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative z-10"
            >
              <h1 className="text-6xl font-light text-emerald-800">Circle</h1>
              <motion.p
                className="text-emerald-600 text-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Sacred Connections
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Slides up from bottom */}
      <motion.div
        className="min-h-screen bg-gradient-to-br from-stone-50 via-green-50 to-emerald-50 relative overflow-hidden"
        initial={{ y: "100%" }}
        animate={showIntro ? { y: "100%" } : { y: 0 }}
        transition={{
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
          delay: showIntro ? 0 : 2,
        }}
      >
        {/* Subtle Mandala Background */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.06] z-0">
          <svg
            viewBox="0 0 800 800"
            className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[120vh] min-h-[120vh]"
          >
            <defs>
              <radialGradient id="mandalaGradient" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#065f46", stopOpacity: 0.8 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#059669", stopOpacity: 0.4 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#10b981", stopOpacity: 0.1 }}
                />
              </radialGradient>
            </defs>

            {/* Simplified Mandala */}
            {[...Array(12)].map((_, i) => (
              <g key={`petal-${i}`} transform={`rotate(${i * 30} 400 400)`}>
                <path
                  d="M400 100 Q420 150 400 200 Q380 150 400 100"
                  fill="url(#mandalaGradient)"
                  opacity="0.7"
                />
              </g>
            ))}

            {/* Center Circle */}
            <circle
              cx="400"
              cy="400"
              r="80"
              fill="none"
              stroke="#065f46"
              strokeWidth="2"
              opacity="0.6"
            />
            <circle
              cx="400"
              cy="400"
              r="40"
              fill="none"
              stroke="#059669"
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Heart in center */}
            <path
              d="M400,420 C400,415 390,405 380,415 C380,405 370,415 380,420 L400,440 L420,420 C430,415 420,405 420,415 C410,405 400,415 400,420 Z"
              fill="#065f46"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Header */}
        <motion.header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl border-b border-emerald-100/50 shadow-lg shadow-emerald-500/5"
              : "bg-transparent"
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={!showIntro ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{ duration: 0.6, delay: 3.2 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-700 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
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
                    className="relative px-4 py-2 text-emerald-700 hover:text-emerald-900 font-medium transition-colors duration-300 rounded-lg group"
                    whileHover={{ y: -1 }}
                  >
                    {item.name}
                    <motion.div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:w-8 group-hover:-translate-x-4 transition-all duration-300" />
                  </motion.button>
                ))}
              </nav>

              {/* Right Section */}
              <div className="hidden md:flex items-center space-x-4">
                <motion.div
                  className="flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-full"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium text-emerald-800">
                    <span className="font-bold">
                      {stats.users.toLocaleString()}
                    </span>{" "}
                    joining
                  </span>
                </motion.div>

                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-emerald-700 to-teal-600 text-white rounded-full font-medium shadow-lg relative overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(16, 185, 129, 0.25)",
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
                className="md:hidden p-2 rounded-lg hover:bg-emerald-100"
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
                      <X className="w-6 h-6 text-emerald-700" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-emerald-700" />
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
                  className="md:hidden mt-4 py-4 border-t border-emerald-200"
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
                        className="text-left text-emerald-700 hover:text-emerald-900 font-medium py-3 px-2 rounded-lg hover:bg-emerald-50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.name}
                      </motion.button>
                    ))}
                    <motion.button
                      className="mt-4 px-6 py-3 bg-gradient-to-r from-emerald-700 to-teal-600 text-white rounded-full font-medium"
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
          transition={{ duration: 0.8, delay: 3 }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-light mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={
                !showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 1, delay: 3.2 }}
            >
              <span className="block bg-gradient-to-r from-emerald-800 via-teal-700 to-green-800 bg-clip-text text-transparent">
                Sacred
              </span>
              <span className="block text-stone-600">Connections</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-stone-600 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={
                !showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 1, delay: 3.4 }}
            >
              Connect with fellow seekers who practice meditation, yoga, energy
              healing, and embrace conscious living.
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
              transition={{ duration: 0.6, delay: 3.6 }}
            >
              <div className="max-w-lg mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50 shadow-xl">
                <motion.div
                  className="flex items-center justify-center space-x-2 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="w-5 h-5 text-emerald-700" />
                  <span className="text-lg font-semibold text-emerald-800">
                    Coming Spring 2025
                  </span>
                </motion.div>
                <p className="text-stone-600 mb-4">
                  Join the waitlist for exclusive early access
                </p>
                <div className="text-sm text-stone-500">
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
              transition={{ duration: 0.6, delay: 3.8 }}
            >
              <div className="max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div key="form">
                      <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-full border border-emerald-200/50 shadow-xl">
                        <input
                          type="email"
                          placeholder="Enter your email for early access"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 px-6 py-3 rounded-full border-0 focus:outline-none bg-white/90 text-stone-700 placeholder-stone-500 focus:ring-2 focus:ring-emerald-300/50"
                          required
                        />
                        <motion.button
                          onClick={handleSubmit}
                          className="px-6 py-3 bg-gradient-to-r from-emerald-700 to-teal-600 text-white rounded-full font-medium shadow-lg flex items-center justify-center space-x-2 whitespace-nowrap relative overflow-hidden group"
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 10px 25px rgba(16, 185, 129, 0.25)",
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
                      <p className="text-stone-600 text-center mt-4">
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
                      className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-200/50 shadow-xl"
                    >
                      <motion.div
                        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.6 }}
                      >
                        <Check className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                        Welcome to the Circle
                      </h3>
                      <p className="text-stone-600">
                        You&apos;re on the exclusive early access list!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Simplified Stats */}
            <motion.div
              className="border-t border-emerald-200 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={
                !showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 4 }}
            >
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: stats.users, label: "Souls waiting", suffix: "+" },
                  {
                    value: stats.matches,
                    label: "Connections made",
                    suffix: "+",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      !showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 4.2 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold mb-1 text-emerald-800 group-hover:text-emerald-900 transition-colors">
                      {stat.value.toLocaleString()}
                      {stat.suffix}
                    </div>
                    <div className="text-stone-600 text-sm group-hover:text-stone-700 transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.main>

        {/* Simplified Features Section */}
        <motion.section
          className="py-20 relative z-10"
          id="features"
          initial={{ opacity: 0, y: 50 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 4.2 }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-light mb-6 bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                How it works
              </h2>
              <p className="text-lg text-stone-600">
                Simple steps to find your sacred connection
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: Heart,
                  title: "Conscious Matching",
                  description:
                    "Connect with souls who share your spiritual practices and values",
                },
                {
                  icon: Users,
                  title: "Sacred Community",
                  description:
                    "Join circles of like-minded seekers on similar spiritual journeys",
                },
                {
                  icon: MessageCircle,
                  title: "Meaningful Conversations",
                  description:
                    "Share your journey through deep dialogue about growth and consciousness",
                },
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-200/50 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl h-full group-hover:border-emerald-300/50">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-6 mx-auto text-emerald-700 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-emerald-800 mb-4 group-hover:text-emerald-900 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Simplified About Section */}
        <motion.section
          className="py-20 bg-white/40 backdrop-blur-sm relative z-10"
          id="about"
          initial={{ opacity: 0, y: 50 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 4.4 }}
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-light text-emerald-800 mb-8 leading-tight">
                Your sacred journey begins here
              </h2>

              <p className="text-lg text-stone-600 mb-12 max-w-2xl mx-auto">
                Join thousands of awakened souls ready to experience authentic
                connection through shared spiritual practices.
              </p>

              <motion.div
                className="flex flex-wrap justify-center gap-6 text-stone-500 text-sm"
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
                    className="flex items-center space-x-2 hover:text-emerald-700 transition-colors cursor-pointer"
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
          className="py-12 px-6 border-t border-emerald-200 relative z-10"
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 4.6 }}
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
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-700 to-teal-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
                  Circle
                </span>
              </motion.div>
              <p className="text-stone-600 mb-6">
                Connecting souls through sacred technology and conscious design.
              </p>
              <div className="flex justify-center space-x-6 text-stone-500 mb-6 text-sm">
                {["Privacy", "Terms", "Contact"].map((item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="hover:text-emerald-700 transition-colors"
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
              <p className="text-stone-400 text-sm">
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
