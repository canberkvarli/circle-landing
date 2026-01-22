import React from "react";
import { motion } from "framer-motion";
import { HandHeart, Sprout, Sparkles } from "lucide-react";
import EmailWaitlistInput from "./EmailWaitlistInput";

interface HeroSectionProps {
  showIntro: boolean;
  stats: {
    signups: number;
    totalSpots: number;
    connections: number;
  };
  openModal: (modalType: string) => void;
}

const HeroSection = ({ showIntro, stats, openModal }: HeroSectionProps) => {
  // Progress bar percentage
  const progressPercentage = (stats.signups / stats.totalSpots) * 100;
  
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

          {/* Email Waitlist Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <EmailWaitlistInput />
          </motion.div>
        </div>

        {/* Progress and Countdown Section */}
        <motion.div
          className="mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            !showIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {/* Progress Bar Container */}
          <div className="bg-white/80 dark:bg-spiritual-dark-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-spiritual-primary/10 dark:border-spiritual-dark-border/20">
            <div className="mb-4 flex justify-between items-center">
              <div className="text-left">
                <div className="text-lg font-sans font-bold text-spiritual-primary dark:text-spiritual-dark-primary">
                  {stats.signups} fullcircle spots claimed
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-sans font-bold text-spiritual-accent dark:text-spiritual-dark-accent">
                  {stats.totalSpots - stats.signups} remaining
                </div>
              </div>
            </div>
            
            {/* Beautiful Progress Bar */}
            <div className="relative">
              <div className="w-full bg-gradient-to-r from-spiritual-background/50 to-spiritual-tertiary/30 dark:from-spiritual-dark-background/50 dark:to-spiritual-dark-tertiary/30 rounded-full h-4 overflow-hidden shadow-inner border border-spiritual-primary/10 dark:border-spiritual-dark-border/20">
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
                >
                  {/* Gradient Progress Fill */}
                  <div className="absolute inset-0 bg-gradient-to-r from-spiritual-accent via-spiritual-primary to-spiritual-secondary rounded-full shadow-lg" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse" />
                  
                  {/* Progress Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-spiritual-accent/20 via-spiritual-primary/20 to-spiritual-secondary/20 rounded-full blur-sm" />
                </motion.div>
              </div>
            </div>
            
          </div>
        </motion.div>



      </div>

        {/* fullcircle+ Membership Section */}
        <motion.div
          id="waitlist"
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
              <EmailWaitlistInput />
            </motion.div>

          </div>
        </motion.div>
    </motion.main>
  );
};

export default HeroSection;
