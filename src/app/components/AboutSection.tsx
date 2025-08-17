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
            About Circle
          </h2>
          <p className="text-xl text-spiritual-text-muted max-w-3xl mx-auto leading-relaxed">
            We believe that true connections happen when souls align on a deeper level
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
              Circle is more than a dating app - it&apos;s a sanctuary for conscious souls
              seeking meaningful connections. We understand that true compatibility
              goes beyond surface-level interests and delves into the spiritual,
              emotional, and intellectual realms.
            </p>
            <p className="text-spiritual-text-muted mb-6 leading-relaxed dark:text-spiritual-dark-text-muted">
              Our platform is designed to foster authentic relationships based on
              shared values, spiritual practices, and conscious living principles.
              Whether you&apos;re into meditation, yoga, energy healing, or simply
              living mindfully, Circle helps you find your tribe.
            </p>
            <div className="flex items-center space-x-1 justify-start">
              <Image
                src="/assets/circle.svg"
                alt="Circle"
                width={64}
                height={64}
                className="w-16 h-16"
              />
              <span className="text-spiritual-primary font-medium">
                Join the conscious revolution
              </span>
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
                  <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">Spiritual compatibility matching</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full dark:bg-spiritual-dark-accent"></div>
                  <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">Conscious community events</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full dark:bg-spiritual-dark-accent"></div>
                  <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">Mindful conversation prompts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full dark:bg-spiritual-dark-accent"></div>
                  <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">Authentic profile verification</span>
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
