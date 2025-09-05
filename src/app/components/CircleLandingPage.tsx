"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import FullCircleModal from "./FullCircleModal";
import OuroborosInfoModal from "../modals/OuroborosInfoModal";
import DanielleModal from "../modals/DanielleModal";
import PrivacyPolicyModal from "../modals/PrivacyPolicyModal";
import TermsAndConditionsModal from "../modals/TermsAndConditionsModal";
import { getContactFormEmail } from "@/utils/emailTemplates";

const FullCircleLandingPage = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    signups: 0,
    connections: 0,
    totalSpots: 1000,
  });
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate launch date (65 days from now)
  const calculateLaunchDate = useCallback(() => {
    const now = new Date();
    const launchDate = new Date(now.getTime() + (65 * 24 * 60 * 60 * 1000)); // 65 days from now
    return launchDate;
  }, []);

  // Calculate countdown to launch
  const calculateCountdown = useCallback(() => {
    const now = new Date();
    const launchDate = calculateLaunchDate();
    const diff = launchDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  }, [calculateLaunchDate]);

  // Fetch real waitlist data
  const fetchWaitlistData = async () => {
    try {
      const response = await fetch('/api/waitlist');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setStats(prev => ({
            ...prev,
            signups: data.count || 0
          }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch waitlist data:', error);
    }
  };

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    // Fetch waitlist data
    fetchWaitlistData();

    // Set initial countdown
    setCountdown(calculateCountdown());

    return () => clearTimeout(timer);
  }, [calculateCountdown]);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
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
  }, [mounted, calculateCountdown]);

  const openModal = (modalType: string) => {
    console.log('Opening modal:', modalType);
    setActiveModal(modalType);
    setSubmitMessage(undefined); // Reset message when opening modal
  };

  const closeModal = () => {
    console.log('Closing modal');
    setActiveModal(null);
    setSubmitMessage(undefined);
    setIsSubmitting(false);
  };

  const handleContactSubmit = async (data: {
    name: string | null;
    email: string | null;
    subject: string | null;
    message: string | null;
    timestamp: string;
  }) => {
    setIsSubmitting(true);
    setSubmitMessage(undefined);
    
    try {
      // Validate that all required fields have values
      if (!data.name || !data.email || !data.subject || !data.message) {
        console.error('Missing required form fields');
        setSubmitMessage('error');
        return { success: false };
      }
      
      // Prepare email content
      const emailData = {
        to: 'hello@joinfullcircle.app',
        subject: `Contact Form: ${data.subject}`,
        html: getContactFormEmail({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          timestamp: data.timestamp
        })
      };

      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('success');
        return { success: true };
      } else {
        console.error('Email API error:', result.message);
        setSubmitMessage('error');
        return { success: false };
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitMessage('error');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-background via-spiritual-tertiary to-spiritual-secondary dark:from-spiritual-dark-background dark:via-spiritual-dark-tertiary dark:to-spiritual-dark-secondary">
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
        <Footer showIntro={showIntro} openModal={openModal} />
      </div>

      {/* Modals - Outside main content so they work during intro */}
      <AnimatePresence>
        {activeModal === "earlyAccess" && (
          <EarlyAccessModal onClose={closeModal} openModal={openModal} />
        )}
        {activeModal === "contact" && (
          <ContactModal 
            isOpen={true} 
            onClose={closeModal} 
            onSubmit={handleContactSubmit} 
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            openModal={openModal}
          />
        )}
        {activeModal === "fullcircle" && (
          <FullCircleModal isOpen={true} onClose={closeModal} openModal={openModal} />
        )}
        {activeModal === "ouroborosInfo" && (
          <OuroborosInfoModal isOpen={true} onClose={closeModal} />
        )}
        {activeModal === "danielle" && (
          <DanielleModal isOpen={true} onClose={closeModal} />
        )}
        {activeModal === "privacyPolicy" && (
          <PrivacyPolicyModal onClose={closeModal} />
        )}
        {activeModal === "termsAndConditions" && (
          <TermsAndConditionsModal onClose={closeModal} />
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && !showIntro && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-spiritual-primary to-spiritual-secondary text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center dark:from-spiritual-dark-primary dark:to-spiritual-dark-secondary"
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

export default FullCircleLandingPage;
