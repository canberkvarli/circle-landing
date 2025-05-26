"use client";

import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Header from "@/app/components/Header";
import IntroAnimation from "@/app/components/IntroAnimation";
import HeroSection from "@/app/components/HeroSection";
import FeaturesSection from "@/app/components/FeaturesSection";
import RoadmapSection from "@/app/components/RoadmapSection";
import AboutSection from "@/app/components/AboutSection";
import Footer from "@/app/components/Footer";
import EarlyAccessModal from "@/app/modals/EarlyAccessModal";
import ContactModal from "@/app/modals/ContactModal";
import PrivacyModal from "@/app/modals/PrivacyModal";
import TermsModal from "@/app/modals/TermsModal";
import MandalaBackground from "@/app/components/MandalaBackground";
import { db } from "@/services/firebase/config";
import { doc, getDoc, setDoc, onSnapshot } from "@firebase/firestore";
import type { Stats, Countdown, FormData } from "@/types";

const CircleLandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [stats, setStats] = useState<Stats>({
    signups: 250,
    totalSpots: 1000,
    connections: 28451,
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");

  // Countdown state
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

    // Set up real-time listener for signups
    const unsubscribe = onSnapshot(doc(db, "stats", "signups"), (doc) => {
      if (doc.exists()) {
        setStats((prev) => ({
          ...prev,
          signups: doc.data().count || 250,
        }));
      }
    });

    // Countdown timer
    const launchDate = new Date("2025-05-01T00:00:00").getTime();

    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      clearInterval(countdownInterval);
      unsubscribe();
    };
  }, []);

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const openModal = (modalId: string): void => {
    setActiveModal(modalId);
    setSubmitMessage("");
    document.body.style.overflow = "hidden";
  };

  const closeModal = (): void => {
    setActiveModal(null);
    document.body.style.overflow = "auto";
  };

  const updateSignupCount = async (): Promise<void> => {
    try {
      const docRef = doc(db, "stats", "signups");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentCount = docSnap.data().count || 250;
        await setDoc(docRef, { count: currentCount + 1 });
      } else {
        await setDoc(docRef, { count: 251 });
      }
    } catch (error) {
      console.error("Error updating signup count:", error);
    }
  };

  const handleEarlyAccess = async (
    formData: FormData
  ): Promise<{ success: boolean }> => {
    setIsSubmitting(true);

    try {
      // Send emails
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          to_email: "canberkvarli@gmail.com",
          from_email: formData.email,
          from_name: formData.name,
          from_phone: formData.phone,
          subject: "New Early Access Signup",
          message: `
            New early access signup:
            Email: ${formData.email}
            Name: ${formData.name}
            Phone: ${formData.phone}
            Practices: ${formData.practices}
            Timestamp: ${formData.timestamp}
          `,
        }
      );

      // Send confirmation to user
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID ||
          "YOUR_CONFIRMATION_TEMPLATE_ID",
        {
          to_email: formData.email,
          to_name: formData.name,
        }
      );

      // Update signup count in Firestore
      await updateSignupCount();

      setSubmitMessage("success");
      return { success: true };
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("error");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContact = async (
    formData: FormData
  ): Promise<{ success: boolean }> => {
    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          to_email: "canberkvarli@gmail.com",
          from_email: formData.email,
          from_name: formData.name,
          subject: `Contact Form: ${formData.subject}`,
          practices: `Contact Form Inquiry - ${formData.subject}`,
          message: `
📞 CONTACT FORM SUBMISSION

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📋 Subject: ${formData.subject}
⏰ Timestamp: ${formData.timestamp}

💬 Message:
${formData.message}

---
This was sent via the contact form.
          `,
          timestamp: formData.timestamp,
        }
      );

      setSubmitMessage("success");
      return { success: true };
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("error");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full‐screen background video */}
      <video
        src="/assets/videos/danielle.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="inset-0 w-full h-100 object-cover pointer-events-none"
      />

      {/* rest of your components */}
      <div className="relative z-10 bg-gradient-to-br from-[#F5F1EA] via-[#EDE4D3] to-[#E8DCC6] min-h-screen">
        <MandalaBackground show={showIntro} />
        <IntroAnimation showIntro={showIntro} />

        <Header
          scrolled={scrolled}
          showIntro={showIntro}
          stats={stats}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          scrollToSection={scrollToSection}
          openModal={openModal}
        />

        <HeroSection
          showIntro={showIntro}
          stats={stats}
          countdown={countdown}
          openModal={openModal}
        />

        <FeaturesSection showIntro={showIntro} />

        <RoadmapSection showIntro={showIntro} />

        <AboutSection showIntro={showIntro} openModal={openModal} />

        <Footer showIntro={showIntro} openModal={openModal} />

        {/* Modals */}
        <EarlyAccessModal
          isOpen={activeModal === "earlyAccess"}
          onClose={closeModal}
          onSubmit={handleEarlyAccess}
          isSubmitting={isSubmitting}
          submitMessage={submitMessage}
        />

        <ContactModal
          isOpen={activeModal === "contact"}
          onClose={closeModal}
          onSubmit={handleContact}
          isSubmitting={isSubmitting}
          submitMessage={submitMessage}
        />

        <PrivacyModal isOpen={activeModal === "privacy"} onClose={closeModal} />

        <TermsModal isOpen={activeModal === "terms"} onClose={closeModal} />
      </div>
    </div>
  );
};

export default CircleLandingPage;
