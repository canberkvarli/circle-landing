import React from "react";
import { motion } from "framer-motion";
import { HandHeart, Sprout, Sparkles } from "lucide-react";
import EmailWaitlistInput from "./EmailWaitlistInput";
import VideoPhoneFrame from "./VideoPhoneFrame";

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
            <span className="block text-spiritual-accent font-spirituality font-bold tracking-wide mb-8 dark:text-spiritual-dark-accent">
              Meaningful
            </span>
            <span className="block text-spiritual-text-dark font-spirituality font-bold tracking-wide text-6xl sm:text-7xl lg:text-8xl ml-12 dark:text-spiritual-dark-text-light">
              Connections
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-spiritual-text-muted mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Where mindful hearts meet. Connect with a community that values presence, wellness, and authentic living.
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
      
      {/* Danielle Modal */}

        {/* App Preview Section - Premium Showcase */}
        <motion.div
          className="mt-24 mb-24 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-spiritual-tertiary/10 to-transparent dark:via-spiritual-dark-tertiary/5 -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight font-spirituality text-spiritual-secondary dark:text-white mb-6 tracking-wide">
                See fullcircle in Action
              </h3>
              <p className="text-xl text-spiritual-text-muted dark:text-spiritual-dark-text-muted max-w-2xl mx-auto mb-4">
                Explore every feature through video demonstrations
              </p>
              {/* Danielle Info Button */}
                <button
                  onClick={() => openModal("danielle")}
                className="inline-flex items-center gap-2 text-sm text-spiritual-text-muted hover:text-spiritual-accent transition-colors duration-300 font-medium dark:text-spiritual-dark-text-muted dark:hover:text-spiritual-dark-accent"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                About the videos
                </button>
            </motion.div>
            
            {/* Premium Grid Layout */}
            <div className="space-y-12">
              {/* Hero Video - Onboarding */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="max-w-2xl w-full">
                  <VideoPhoneFrame
                    videoSrc="/assets/videos/onboarding.mp4"
                    title="Onboarding"
                    description="Start your journey"
                    detailedDescription="Experience our intuitive onboarding process designed to help you set up your profile and discover your spiritual journey. Get started with guided steps that introduce you to the fullcircle community."
                    size="large"
                    onInfoClick={() => openModal("danielle")}
                  />
                </div>
              </motion.div>

              {/* Four Feature Videos - Staggered Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                {/* Connect */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex justify-center md:justify-end"
                >
                  <VideoPhoneFrame
                    videoSrc="/assets/videos/connect.mp4"
                    title="Connect"
                    description="Find meaningful connections"
                    detailedDescription="Discover like-minded souls and build authentic relationships. Swipe through connections, like profiles that resonate with you, or send lotus flowers to show deep appreciation for someone special."
                    size="large"
                  />
                </motion.div>

                {/* Sanctuary */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex justify-center md:justify-start"
                >
                  <VideoPhoneFrame
                    videoSrc="/assets/videos/sanctuary.mp4"
                    title="Sanctuary"
                    description="Your mindful space"
                    detailedDescription="Access meditation timers with customizable instruments and duration settings. Join gatherings, explore upcoming events, and connect with interested souls. Share affirmations and engage with the activity feed to see meaningful interactions."
                    size="large"
                  />
                </motion.div>

                {/* Spirits */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex justify-center md:justify-end"
                >
                  <VideoPhoneFrame
                    videoSrc="/assets/videos/spirits.mp4"
                    title="Spirits"
                    description="Connections & soul chats"
                    detailedDescription="View connections who have shown interest in you. Engage in meaningful soul chats - deep conversations that go beyond surface-level interactions. Build lasting relationships through authentic communication."
                    size="large"
                  />
                </motion.div>

                {/* Self */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex justify-center md:justify-start"
                >
                  <VideoPhoneFrame
                    videoSrc="/assets/videos/sacred_self.mp4"
                    title="Self"
                    description="Your sacred profile"
                    detailedDescription="Manage your profile, track your lotus flowers and radiances earned through meaningful interactions. Verify your profile to build trust within the community. Access settings to update your information and preferences."
                    size="large"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

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
              Join thousands of mindful seekers who are already transforming their lives through meaningful connections and personal growth.
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
                  title: "Deep Connections",
                  description: "Find your tribe of like-minded souls who share your journey"
                },
                {
                  icon: <Sprout className="w-14 h-14" />,
                  title: "Personal Growth",
                  description: "Access curated content and practices to support your journey"
                },
                {
                  icon: <Sparkles className="w-14 h-14" />,
                  title: "Enhanced Features",
                  description: "Unlock advanced matching, unlimited connections, and dedicated support"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-spiritual-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-spiritual-dark-card/80 dark:border-spiritual-dark-border">
                  <div className="mb-8 flex justify-center text-spiritual-accent dark:text-spiritual-dark-accent">{feature.icon}</div>
                  <h3 className="text-3xl font-spirituality font-bold text-spiritual-text-dark mb-5 dark:text-spiritual-dark-accent">{feature.title}</h3>
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
