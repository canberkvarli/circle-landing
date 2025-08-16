import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
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
            <h3 className="text-2xl font-spirituality font-bold text-spiritual-text-dark mb-6 tracking-wide">
              Our Mission
            </h3>
            <p className="text-spiritual-text-muted mb-6 leading-relaxed">
              Circle is more than a dating app - it's a sanctuary for conscious souls
              seeking meaningful connections. We understand that true compatibility
              goes beyond surface-level interests and delves into the spiritual,
              emotional, and intellectual realms.
            </p>
            <p className="text-spiritual-text-muted mb-6 leading-relaxed">
              Our platform is designed to foster authentic relationships based on
              shared values, spiritual practices, and conscious living principles.
              Whether you're into meditation, yoga, energy healing, or simply
              living mindfully, Circle helps you find your tribe.
            </p>
            <div className="flex items-center space-x-4">
              <svg className="w-8 h-8 text-spiritual-primary" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 10c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 70c-16.569 0-30-13.431-30-30s13.431-30 30-30 30 13.431 30 30-13.431 30-30 30z"/>
                <path d="M50 25c-19.33 0-35 15.67-35 35s15.67 35 35 35 35-15.67 35-35-15.67-35-35-35zm0 60c-13.807 0-25-11.193-25-25s11.193-25 25-25 25 11.193 25 25-11.193 25-25 25z"/>
                <path d="M50 35c-13.807 0-25 11.193-25 25s11.193 25 25 25 25-11.193 25-25-11.193-25-25-25zm0 40c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15z"/>
              </svg>
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
            <div className="bg-gradient-to-br from-spiritual-primary/20 to-spiritual-secondary/20 rounded-2xl p-8 border border-spiritual-primary/30">
              <h4 className="text-xl font-spirituality font-bold text-spiritual-primary mb-4 tracking-wide">
                What Makes Us Different
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full"></div>
                  <span className="text-spiritual-text-dark">Spiritual compatibility matching</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full"></div>
                  <span className="text-spiritual-text-dark">Conscious community events</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full"></div>
                  <span className="text-spiritual-text-dark">Mindful conversation prompts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-spiritual-primary rounded-full"></div>
                  <span className="text-spiritual-text-dark">Authentic profile verification</span>
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
