import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-spiritual-dark-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-spirituality font-bold text-spiritual-primary mb-6 tracking-wide">
            About fullcircle
          </h2>
          <p className="text-xl text-spiritual-text-muted max-w-3xl mx-auto leading-relaxed">
            We believe that authentic wellness community grows through shared practices, meditation, and conscious living
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-spirituality font-bold text-spiritual-text-dark mb-6 tracking-wide dark:text-spiritual-dark-text-dark">
              Our Mission
            </h3>
            <p className="text-spiritual-text-muted mb-6 leading-relaxed dark:text-spiritual-dark-text-muted">
              fullcircle is your wellness community app • a sanctuary for mindful souls
              seeking authentic community through shared wellness practices. We understand that true community
              grows through meditation, healing modalities, and conscious living principles that
              support personal growth and spiritual alignment.
            </p>
            <p className="text-spiritual-text-muted mb-6 leading-relaxed dark:text-spiritual-dark-text-muted">
              Our platform is designed to foster wellness communities based on
              shared practices, healing interests, and mindful living. Whether you&apos;re into meditation, 
              breathwork, energy healing, sound healing, or simply living intentionally, 
              fullcircle helps you find your tribe and track your wellness journey.
            </p>
            <div className="flex items-center space-x-1 justify-start">
              <button
                onClick={() => {
                  // Scroll to the first email input in the hero section
                  const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                  if (emailInput) {
                    emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Focus the input after scrolling
                    setTimeout(() => {
                      emailInput.focus();
                    }, 500);
                  }
                }}
                className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
              >
                <Image
                  src="/logo.png"
                  alt="fullcircle"
                  width={32}
                  height={32}
                  className="w-50 h-50"
                />
                <span className="text-spiritual-primary font-medium ml-2">
                  Join the wellness community
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-spiritual-primary/20 to-spiritual-secondary/20 rounded-2xl p-8 border border-spiritual-primary/30 dark:from-spiritual-dark-primary/20 dark:to-spiritual-dark-secondary/20 dark:border-spiritual-dark-border">
              <h4 className="text-xl font-spirituality font-bold text-spiritual-primary mb-4 tracking-wide dark:text-spiritual-dark-accent">
                What Makes Us Different
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full dark:bg-spiritual-dark-accent"></div>
                  <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">Meditation Timer & Tracking: Built-in tools for your practice</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full dark:bg-spiritual-dark-accent"></div>
                  <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">Practice-Based Community: Find others who share your wellness practices like meditation, healing modalities & wellness interests</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full dark:bg-spiritual-dark-accent"></div>
                  <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">Local Wellness Events: Discover meditation circles, sound healing, reiki & more</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full dark:bg-spiritual-dark-accent"></div>
                  <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">Community Affirmations: Share and engage with wellness-focused content</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full dark:bg-spiritual-dark-accent"></div>
                  <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">fullcircle+ Enhanced Features: Advanced wellness tracking and community access</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
