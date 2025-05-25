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
import emailjs from "@emailjs/browser";

const CircleLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [stats, setStats] = useState({ users: 12847, connections: 28451 });

  // Modal states
  const [activeModal, setActiveModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Intro timing
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    // Simulate user growth
    const statsInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setStats((prev) => ({
          ...prev,
          users: prev.users + Math.floor(Math.random() * 3) + 1,
        }));
      }
    }, 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      clearInterval(statsInterval);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const openModal = (modalId: string) => {
    setActiveModal(modalId as unknown as null);
    setSubmitMessage("");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = "auto";
  };

  const handleEarlyAccess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      name: formData.get("name") || "Not provided",
      practices: formData.get("practices") || "Not specified",
      timestamp: new Date().toISOString(),
    };

    try {
      // Send notification to you
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          to_email: "canberkvarli@gmail.com",
          from_email: data.email,
          from_name: data.name,
          subject: "New Early Access Signup - Circle",
          message: `
                  New early access signup:

                  Email: ${data.email}
                  Name: ${data.name}
                  Spiritual Practices: ${data.practices}
                  Timestamp: ${data.timestamp}
          `,
        }
      );

      // Send confirmation to user
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID ||
          "YOUR_CONFIRMATION_TEMPLATE_ID",
        {
          to_email: data.email,
          to_name: data.name,
        }
      );

      setSubmitMessage("success");
      e.currentTarget.reset();

      // Update stats
      setStats((prev) => ({ ...prev, users: prev.users + 1 }));
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      timestamp: new Date().toISOString(),
    };

    try {
      // Use the same early access template but with contact form data
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          to_email: "canberkvarli@gmail.com",
          from_email: data.email,
          from_name: data.name,
          subject: `🔔 Circle Contact Form: ${data.subject}`,
          practices: `Contact Form Inquiry - ${data.subject}`,
          message: `
📞 CONTACT FORM SUBMISSION

👤 Name: ${data.name}
📧 Email: ${data.email}
📋 Subject: ${data.subject}
⏰ Timestamp: ${data.timestamp}

💬 Message:
${data.message}

---
This was sent via the Circle contact form.
          `,
          timestamp: data.timestamp,
        }
      );

      setSubmitMessage("success");
      e.currentTarget.reset();
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const MandalaBackground = () => (
    <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-0">
      <svg
        viewBox="0 0 800 800"
        className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[120vh] min-h-[120vh]"
      >
        <defs>
          <radialGradient id="mandalaGradient" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              style={{ stopColor: "#8B5A2B", stopOpacity: 0.8 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#D4AF37", stopOpacity: 0.4 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#8B7355", stopOpacity: 0.1 }}
            />
          </radialGradient>
        </defs>

        <g transform="translate(400,400)">
          {/* Outer Ring - 16 petals */}
          {[...Array(16)].map((_, i) => (
            <g key={`outer-${i}`} transform={`rotate(${i * 22.5} 0 0)`}>
              <path
                d="M0,-200 Q20,-180 0,-160 Q-20,-180 0,-200"
                fill="url(#mandalaGradient)"
                opacity="0.6"
              />
            </g>
          ))}

          {/* Middle Ring - 12 petals */}
          {[...Array(12)].map((_, i) => (
            <g key={`middle-${i}`} transform={`rotate(${i * 30} 0 0)`}>
              <path
                d="M0,-150 Q15,-135 0,-120 Q-15,-135 0,-150"
                fill="url(#mandalaGradient)"
                opacity="0.7"
              />
            </g>
          ))}

          {/* Inner Ring - 8 petals */}
          {[...Array(8)].map((_, i) => (
            <g key={`inner-${i}`} transform={`rotate(${i * 45} 0 0)`}>
              <path
                d="M0,-100 Q10,-90 0,-80 Q-10,-90 0,-100"
                fill="url(#mandalaGradient)"
                opacity="0.8"
              />
            </g>
          ))}

          {/* Center circles */}
          <circle
            r="60"
            fill="none"
            stroke="#8B5A2B"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle
            r="30"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Sacred geometry in center */}
          <polygon
            points="0,-20 17.32,10 -17.32,10"
            fill="none"
            stroke="#8B5A2B"
            strokeWidth="1"
            opacity="0.7"
          />
          <polygon
            points="0,20 -17.32,-10 17.32,-10"
            fill="none"
            stroke="#8B5A2B"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  );

  const Modal = ({
    isOpen,
    onClose,
    title,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1EA] via-[#EDE4D3] to-[#E8DCC6] relative overflow-hidden">
      {/* Background */}
      <MandalaBackground />

      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-[#F5F1EA] via-[#EDE4D3] to-[#E8DCC6] z-50 flex items-center justify-center"
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center"
            >
              <h1 className="text-6xl font-light bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent mb-4">
                Circle
              </h1>
              <motion.p
                className="text-[#8B7355] text-xl"
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

      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-[#8B5A2B]/10 shadow-lg shadow-[#8B5A2B]/5"
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
              <div className="w-10 h-10 bg-gradient-to-br from-[#8B5A2B] to-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent">
                Circle
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { name: "Features", id: "features" },
                { name: "Roadmap", id: "roadmap" },
                { name: "About", id: "about" },
              ].map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 text-[#8B5A2B] hover:text-[#D4AF37] font-medium transition-colors duration-300 rounded-lg"
                  whileHover={{ y: -1 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <button
                onClick={() => openModal("contact")}
                className="px-4 py-2 text-[#8B5A2B] hover:text-[#D4AF37] font-medium transition-colors duration-300 rounded-lg"
              >
                Contact
              </button>
            </nav>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.div
                className="flex items-center space-x-2 bg-[#8B5A2B]/10 px-4 py-2 rounded-full"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-[#8B5A2B]">
                  <span className="font-bold">
                    {stats.users.toLocaleString()}
                  </span>{" "}
                  joining
                </span>
              </motion.div>

              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-full font-medium shadow-lg relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(139, 90, 43, 0.25)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal("earlyAccess")}
              >
                Get Early Access
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-[#8B5A2B]/10"
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
                    <X className="w-6 h-6 text-[#8B5A2B]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-[#8B5A2B]" />
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
                className="md:hidden mt-4 py-4 border-t border-[#8B5A2B]/20"
              >
                <nav className="flex flex-col space-y-2">
                  {[
                    { name: "Features", id: "features" },
                    { name: "Roadmap", id: "roadmap" },
                    { name: "About", id: "about" },
                  ].map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-[#8B5A2B] hover:text-[#D4AF37] font-medium py-3 px-2 rounded-lg hover:bg-[#8B5A2B]/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  <button
                    onClick={() => openModal("contact")}
                    className="text-left text-[#8B5A2B] hover:text-[#D4AF37] font-medium py-3 px-2 rounded-lg hover:bg-[#8B5A2B]/5 transition-colors"
                  >
                    Contact
                  </button>
                  <motion.button
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-full font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => openModal("earlyAccess")}
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
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 3.2 }}
          >
            <span className="block bg-gradient-to-r from-[#8B5A2B] via-[#D4AF37] to-[#8B5A2B] bg-clip-text text-transparent">
              Sacred
            </span>
            <span className="block text-[#8B7355]">Connections</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-[#8B7355] mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
            <div className="max-w-lg mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#8B5A2B]/20 shadow-xl">
              <motion.div
                className="flex items-center justify-center space-x-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="w-5 h-5 text-[#8B5A2B]" />
                <span className="text-lg font-semibold text-[#8B5A2B]">
                  Coming Spring 2025
                </span>
              </motion.div>
              <p className="text-[#8B7355] mb-4">
                Join the waitlist for exclusive early access
              </p>
              <div className="text-sm text-[#8B7355]">
                iOS & Android • Free to download
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-full font-medium shadow-lg text-lg mb-12 relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(139, 90, 43, 0.25)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal("earlyAccess")}
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 3.8 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Join Sacred Circle</span>
          </motion.button>

          {/* Stats */}
          <motion.div
            className="border-t border-[#8B5A2B]/20 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 4 }}
          >
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: stats.users, label: "Souls waiting", suffix: "+" },
                {
                  value: stats.connections,
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
                  <div className="text-2xl sm:text-3xl font-bold mb-1 text-[#8B5A2B] group-hover:text-[#D4AF37] transition-colors">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-[#8B7355] text-sm group-hover:text-[#8B7355]/70 transition-colors">
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
            <h2 className="text-4xl sm:text-5xl font-light mb-6 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent">
              How it works
            </h2>
            <p className="text-lg text-[#8B7355]">
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
                  <div className="p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#8B5A2B]/20 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl h-full group-hover:border-[#8B5A2B]/30">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-[#8B5A2B]/10 to-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 mx-auto text-[#8B5A2B] group-hover:from-[#8B5A2B]/20 group-hover:to-[#D4AF37]/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-[#8B5A2B] mb-4 group-hover:text-[#D4AF37] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-[#8B7355] leading-relaxed group-hover:text-[#8B7355]/80 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Roadmap Section */}
      <motion.section
        className="py-20 bg-white/30 backdrop-blur-sm relative z-10"
        id="roadmap"
        initial={{ opacity: 0, y: 50 }}
        animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 4.4 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-light mb-6 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent">
              Sacred Journey
            </h2>
            <p className="text-lg text-[#8B7355]">
              Our path to creating meaningful connections
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] to-[#8B5A2B] opacity-30"></div>

            {[
              {
                status: "COMPLETE",
                statusColor: "bg-green-500",
                period: "Q4 2024",
                title: "Foundation & Core Development",
                description:
                  "User authentication, profile creation, and spiritual practice matching algorithm",
              },
              {
                status: "IN PROGRESS",
                statusColor: "bg-yellow-500",
                period: "Q1 2025",
                title: "Beta Testing & Refinement",
                description:
                  "Closed beta with spiritual communities, feedback integration, and platform optimization",
              },
              {
                status: "UPCOMING",
                statusColor: "bg-[#8B5A2B]",
                period: "Q2 2025",
                title: "Public Launch",
                description:
                  "iOS and Android app release, community features, and guided connection experiences",
              },
              {
                status: "FUTURE",
                statusColor: "bg-gray-500",
                period: "Q3 2025",
                title: "Enhanced Features",
                description:
                  "Group meditations, spiritual events, mentorship programs, and advanced compatibility insights",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative mb-12 ml-12 p-6 bg-white/70 backdrop-blur-sm rounded-xl border-l-4 border-[#D4AF37] hover:shadow-lg transition-all duration-300 hover:transform hover:translate-x-2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ x: 10 }}
              >
                <div className="absolute -left-14 top-8 w-4 h-4 bg-[#D4AF37] rounded-full border-4 border-white shadow-lg"></div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`${item.statusColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[#8B7355] text-sm font-medium">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#8B5A2B] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#8B7355] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="py-20 relative z-10"
        id="about"
        initial={{ opacity: 0, y: 50 }}
        animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 4.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-light text-[#8B5A2B] mb-8 leading-tight bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent">
              Your sacred journey begins here
            </h2>

            <p className="text-lg text-[#8B7355] mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of awakened souls ready to experience authentic
              connection through shared spiritual practices.
            </p>

            <motion.div
              className="flex flex-wrap justify-center gap-6 text-[#8B7355] text-sm mb-12"
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
                  className="flex items-center space-x-2 hover:text-[#D4AF37] transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-full font-medium shadow-lg text-lg relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(139, 90, 43, 0.25)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal("earlyAccess")}
            >
              Reserve Your Place
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="py-12 px-6 border-t border-[#8B5A2B]/20 relative z-10"
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
              <div className="w-8 h-8 bg-gradient-to-br from-[#8B5A2B] to-[#D4AF37] rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent">
                Circle
              </span>
            </motion.div>
            <p className="text-[#8B7355] mb-6">
              Connecting souls through sacred technology and conscious design.
            </p>
            <div className="flex justify-center space-x-6 text-[#8B7355] mb-6 text-sm">
              {[
                { name: "Privacy", modal: "privacy" },
                { name: "Terms", modal: "terms" },
                { name: "Contact", modal: "contact" },
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => openModal(item.modal)}
                  className="hover:text-[#D4AF37] transition-colors"
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
            <p className="text-[#8B7355]/70 text-sm">
              © 2025 Circle. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>

      {/* Modals */}

      {/* Early Access Modal */}
      <Modal
        isOpen={activeModal === "earlyAccess"}
        onClose={closeModal}
        title="Join Sacred Circle"
      >
        <p className="text-[#8B7355] mb-6 leading-relaxed">
          Be among the first to experience divine connections. Join our
          exclusive early access list and receive updates on our journey.
        </p>

        <form onSubmit={handleEarlyAccess} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
              Name (Optional)
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
              Spiritual Practices (Optional)
            </label>
            <select
              name="practices"
              className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
            >
              <option value="">Select your primary practice</option>
              <option value="meditation">Meditation</option>
              <option value="yoga">Yoga</option>
              <option value="energy-healing">Energy Healing</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="astrology">Astrology</option>
              <option value="breathwork">Breathwork</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Reserve My Place</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {submitMessage === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-green-800 mb-1">
              Welcome to the Circle!
            </h4>
            <p className="text-green-700 text-sm">
              You&apos;re now on our exclusive early access list. We&apos;ll
              notify you as soon as the app launches.
            </p>
          </motion.div>
        )}

        {submitMessage === "error" && (
          <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg text-center">
            <p className="text-red-700 text-sm">
              There was an error processing your request. Please try again or
              contact us directly at canberkvarli@gmail.com
            </p>
          </div>
        )}
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={activeModal === "contact"}
        onClose={closeModal}
        title="Contact Us"
      >
        <p className="text-[#8B7355] mb-6 leading-relaxed">
          Have questions about Circle? We&apos;d love to hear from you.
        </p>

        <form onSubmit={handleContact} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
              Subject
            </label>
            <select
              name="subject"
              className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
              required
            >
              <option value="">Select a topic</option>
              <option value="general">General Inquiry</option>
              <option value="partnerships">Partnerships</option>
              <option value="feedback">Feedback</option>
              <option value="support">Support</option>
              <option value="press">Press Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors resize-y"
              placeholder="Your message..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Send Message</span>
            )}
          </button>
        </form>

        {submitMessage === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-green-800 mb-1">Message sent!</h4>
            <p className="text-green-700 text-sm">
              Thank you for reaching out. We&apos;ll get back to you within 24
              hours.
            </p>
          </motion.div>
        )}

        {submitMessage === "error" && (
          <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg text-center">
            <p className="text-red-700 text-sm">
              There was an error sending your message. Please try again or email
              us directly at canberkvarli@gmail.com
            </p>
          </div>
        )}
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={activeModal === "privacy"}
        onClose={closeModal}
        title="Privacy Policy"
      >
        <div className="text-[#8B7355] leading-relaxed space-y-4 max-h-96 overflow-y-auto">
          <p>
            <strong className="text-[#8B5A2B]">
              Last updated: January 2025
            </strong>
          </p>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">
              Information We Collect
            </h4>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, update your profile, or contact us. This
              may include your name, email address, spiritual practices, and
              preferences.
            </p>
          </div>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">
              How We Use Your Information
            </h4>
            <p>
              We use the information we collect to provide, maintain, and
              improve our services, communicate with you, and connect you with
              like-minded individuals based on your spiritual practices and
              preferences.
            </p>
          </div>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">
              Information Sharing
            </h4>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy or as required by law.
            </p>
          </div>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">Data Security</h4>
            <p>
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
          </div>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">Contact Us</h4>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at canberkvarli@gmail.com
            </p>
          </div>
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={activeModal === "terms"}
        onClose={closeModal}
        title="Terms of Service"
      >
        <div className="text-[#8B7355] leading-relaxed space-y-4 max-h-96 overflow-y-auto">
          <p>
            <strong className="text-[#8B5A2B]">
              Last updated: January 2025
            </strong>
          </p>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">
              Acceptance of Terms
            </h4>
            <p>
              By accessing and using Circle, you accept and agree to be bound by
              the terms and provision of this agreement.
            </p>
          </div>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">Use License</h4>
            <p>
              Permission is granted to temporarily download one copy of Circle
              for personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title.
            </p>
          </div>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">User Conduct</h4>
            <p>
              You agree to use Circle in a respectful manner that aligns with
              spiritual and conscious values. Harassment, hate speech, or
              inappropriate behavior is not tolerated.
            </p>
          </div>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">
              Community Guidelines
            </h4>
            <p>
              Circle is designed to foster meaningful spiritual connections. We
              expect all users to engage authentically and with respect for
              diverse spiritual paths and practices.
            </p>
          </div>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">Disclaimer</h4>
            <p>
              The materials on Circle are provided on an &apos;as is&apos;
              basis. Circle makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>
          </div>

          <div>
            <h4 className="text-[#8B5A2B] font-semibold mb-2">
              Contact Information
            </h4>
            <p>
              Questions about the Terms of Service should be sent to us at
              canberkvarli@gmail.com
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CircleLandingPage;
