import React from "react";
import { motion } from "framer-motion";
import { HandHeart, Sprout, Sparkles } from "lucide-react";
import { APP_STORE_URL } from "../constants";
import VideoPhoneFrame from "./VideoPhoneFrame";

interface HeroSectionProps {
  showIntro: boolean;
  openModal: (modalType: string) => void;
}

const HeroSection = ({ showIntro, openModal }: HeroSectionProps) => {
  return (
    <motion.main
      className="pt-20 md:pt-32 pb-20 relative z-10 bg-gradient-to-br from-white via-spiritual-tertiary/30 to-spiritual-secondary/20 dark:from-spiritual-dark-card dark:via-spiritual-dark-tertiary/30 dark:to-spiritual-dark-secondary/20"
      initial={{ opacity: 0, y: 30 }}
      animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Main Hero Content */}
        <div className="text-center mb-20">
          <motion.h1
            className="text-7xl sm:text-8xl lg:text-9xl font-light leading-tight min-h-[400px] flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="block text-spiritual-accent font-spirituality font-bold tracking-wide mb-12 dark:text-spiritual-dark-accent">
              Your Sanctuary for
            </span>
            <span className="block text-spiritual-accent font-spirituality font-bold tracking-wide text-6xl sm:text-7xl lg:text-8xl dark:text-spiritual-dark-accent">
              Mindful Community
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-spiritual-text-muted mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            fullcircle brings together wellness-minded individuals seeking authentic community through shared practices and mindful living.
          </motion.p>

          {/* Logo Meaning Link */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <button
              onClick={() => openModal("ouroborosInfo")}
              className="inline-flex items-center gap-2 text-sm text-spiritual-text-dark hover:text-spiritual-accent transition-colors duration-300 font-medium dark:text-spiritual-dark-text-light dark:hover:text-spiritual-dark-accent"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What does the fullcircle logo mean?
            </button>
          </motion.div>

          {/* Download on App Store */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex justify-center"
          >
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-spiritual-primary to-spiritual-accent text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 dark:from-spiritual-dark-primary dark:to-spiritual-dark-accent"
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on the App Store
            </a>
          </motion.div>

          {/* App launch video - see the app in action */}
          <motion.div
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            <VideoPhoneFrame
              videoSrc="/assets/videos/launch.MP4"
              title="See fullcircle in action"
              size="large"
            />
          </motion.div>
        </div>

      </div>

        {/* fullcircle+ Membership Section */}
        <motion.div
          id="download"
          className="mt-20 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-spirituality font-bold text-spiritual-text-dark mb-6 tracking-wide dark:text-spiritual-dark-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2.6 }}
            >
              Unlock Your Full Potential
            </motion.h2>
            
            <motion.p
              className="text-xl text-spiritual-text-muted mb-8 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2.8 }}
            >
              Join thousands of wellness seekers who are already transforming their lives through meditation, healing practices, and conscious community.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 3.0 }}
            >
              {[
                {
                  icon: <HandHeart className="w-14 h-14" />,
                  title: "Wellness Community",
                  description: "Join meditation circles, healing groups, and find others who share your wellness practices"
                },
                {
                  icon: <Sprout className="w-14 h-14" />,
                  title: "Conscious Growth",
                  description: "Access meditation timers, breathwork exercises, and wellness tracking tools"
                },
                {
                  icon: <Sparkles className="w-14 h-14" />,
                  title: "Enhanced Features",
                  description: "Unlock practice-based recommendations, local wellness events, and community affirmations"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-spiritual-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-spiritual-dark-card/80 dark:border-spiritual-dark-border">
                  <div className="mb-8 flex justify-center text-spiritual-accent dark:text-spiritual-dark-accent">{feature.icon}</div>
                  <h3 className="text-3xl font-spirituality font-bold text-spiritual-text-dark mb-5 leading-relaxed dark:text-spiritual-dark-accent">{feature.title}</h3>
                  <p className="text-xl text-spiritual-text-muted">{feature.description}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex justify-center items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 3.2 }}
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-spiritual-primary to-spiritual-accent text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 dark:from-spiritual-dark-primary dark:to-spiritual-dark-accent"
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download on the App Store
              </a>
            </motion.div>

          </div>
        </motion.div>
    </motion.main>
  );
};

export default HeroSection;
