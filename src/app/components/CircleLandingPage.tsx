"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import IntroAnimation from "./IntroAnimation";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import RoadmapSection from "./RoadmapSection";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import EarlyAccessModal from "../modals/EarlyAccessModal";
import ContactModal from "../modals/ContactModal";
import PrivacyModal from "../modals/PrivacyModal";
import TermsModal from "../modals/TermsModal";
import FullCircleModal from "./FullCircleModal";

const CircleLandingPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [stats] = useState({
    signups: 1247,
    connections: 89,
    totalSpots: 5000,
  });
  const [countdown, setCountdown] = useState({
    days: 14,
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openModal = (modalType) => {
    console.log('Opening modal:', modalType);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-background via-spiritual-tertiary to-spiritual-secondary">
      <AnimatePresence>
        {showIntro && <IntroAnimation />}
      </AnimatePresence>

      {/* Main Content - Always rendered but controlled by opacity */}
      <div
        className={`transition-all duration-1000 ${
          showIntro ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
      >
        <Header openModal={openModal} />
        <HeroSection
          showIntro={showIntro}
          stats={stats}
          countdown={countdown}
          openModal={openModal}
        />
        <FeaturesSection />
        <RoadmapSection />
        <AboutSection />
        <Footer openModal={openModal} />
      </div>

      {/* Modals - Outside main content so they work during intro */}
      <AnimatePresence>
        {activeModal === "earlyAccess" && (
          <EarlyAccessModal onClose={closeModal} openModal={openModal} />
        )}
        {activeModal === "contact" && (
          <ContactModal onClose={closeModal} />
        )}
        {activeModal === "privacy" && (
          <PrivacyModal onClose={closeModal} />
        )}
        {activeModal === "terms" && (
          <TermsModal onClose={closeModal} />
        )}
        {activeModal === "fullcircle" && (
          <FullCircleModal isOpen={true} onClose={closeModal} />
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-spiritual-primary to-spiritual-secondary text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CircleLandingPage;
