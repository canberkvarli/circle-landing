"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import RoadmapSection from "./RoadmapSection";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import IntroAnimation from "./IntroAnimation";
import EarlyAccessModal from "../modals/EarlyAccessModal";
import ContactModal from "../modals/ContactModal";
import PrivacyModal from "../modals/PrivacyModal";
import TermsModal from "../modals/TermsModal";

const CircleLandingPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
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
    setActiveModal(modalType);
  };

  const closeModal = () => {
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

      {/* Modals */}
      <AnimatePresence>
        {activeModal === "earlyAccess" && (
          <EarlyAccessModal onClose={closeModal} />
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
      </AnimatePresence>
    </div>
  );
};

export default CircleLandingPage;
