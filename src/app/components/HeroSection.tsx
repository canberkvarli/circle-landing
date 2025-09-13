import React from "react";
import { motion } from "framer-motion";
import { HandHeart, Sprout, Sparkles } from "lucide-react";
import Image from "next/image";
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

        {/* App Preview Section */}
        <motion.div
          className="mt-16 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight min-h-[150px] flex flex-col justify-center font-spirituality text-spiritual-accent mb-8 text-center tracking-wide">
            See fullcircle in Action
          </h3>
          
          {/* Pyramid Layout: Video at top, 3 phones below */}
          <div className="max-w-7xl mx-auto">
            {/* Top: Demo Video */}
            <div className="flex justify-center mb-12">
              <div className="relative inline-block">
                {/* Video Frame Container */}
                <div className="relative w-72 h-[600px] bg-black rounded-[2.5rem] shadow-2xl transform transition-all duration-500 hover:scale-105">
                  {/* Phone Notch - iPhone 16 Pro style */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10"></div>
                  
                  {/* Video Screen */}
                  <div className="absolute inset-2 bg-black rounded-[1.8rem] overflow-hidden">
                    <video
                      ref={(el) => {
                        if (el) {
                          el.addEventListener('ended', () => {
                            el.currentTime = 0;
                            el.play();
                          });
                        }
                      }}
                      className="w-full h-full object-cover scale-110"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src="/assets/videos/demo_shortened.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
                
                {/* Information Icon - Positioned at top-right of frame */}
                <button
                  onClick={() => openModal("danielle")}
                  className="absolute -top-4 -right-4 z-20 w-8 h-8 bg-spiritual-accent/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                >
                  <svg 
                    className="w-4 h-4 text-white group-hover:text-spiritual-background transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </button>
                
                {/* Replay Button - Positioned at bottom-right of frame */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const video = e.currentTarget.parentElement?.querySelector('video');
                    if (video) {
                      video.currentTime = 0;
                      video.play();
                    }
                  }}
                  className="absolute -bottom-4 -right-4 z-20 w-8 h-8 bg-spiritual-primary/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                >
                  <svg 
                    className="w-4 h-4 text-white group-hover:text-spiritual-background transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                    />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Bottom: 4 Phone Frames */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Phone 1 - Connect Feature */}
              <div className="relative group">
                <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-spiritual-background to-spiritual-tertiary rounded-[2.5rem] shadow-xl border-6 border-spiritual-accent/20 dark:from-spiritual-dark-background dark:to-spiritual-dark-tertiary transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-spiritual-accent/20 rounded-b-xl"></div>
                  
                  {/* Screen Content */}
                  <div className="absolute inset-1.5 bg-white rounded-[2rem] overflow-hidden dark:bg-spiritual-dark-card">
                    <Image
                      src="/assets/frames/connect2.png"
                      alt="Connect Screen"
                      fill
                      className="object-cover"
                      style={{ objectPosition: 'center 80%' }}
                    />
                  </div>
                </div>
                
                {/* Label */}
                <div className="text-center mt-4">
                  <h4 className="text-xl font-spirituality font-bold text-spiritual-accent mb-1 dark:text-spiritual-dark-accent">Connect</h4>
                  <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light">Find your tribe</p>
                </div>
              </div>

              {/* Phone 2 - Kindred Feature */}
              <div className="relative group">
                <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-spiritual-background to-spiritual-tertiary rounded-[2.5rem] shadow-xl border-6 border-spiritual-accent/20 dark:from-spiritual-dark-background dark:to-spiritual-dark-tertiary transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-spiritual-accent/20 rounded-b-xl"></div>
                  
                  {/* Screen Content */}
                  <div className="absolute inset-1.5 bg-white rounded-[2rem] overflow-hidden dark:bg-spiritual-dark-card">
                    <Image
                      src="/assets/frames/kindred1.png"
                      alt="Kindred Screen"
                      fill
                      className="object-cover"
                      style={{ objectPosition: 'center 75%' }}
                    />
                  </div>
                </div>
                
                {/* Label */}
                <div className="text-center mt-4">
                  <h4 className="text-xl font-spirituality font-bold text-spiritual-accent mb-1 dark:text-spiritual-dark-accent">Kindred Spirits</h4>
                  <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light">Discover souls</p>
                </div>
              </div>

              {/* Phone 3 - Chat Feature */}
              <div className="relative group">
                <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-spiritual-background to-spiritual-tertiary rounded-[2.5rem] shadow-xl border-6 border-spiritual-accent/20 dark:from-spiritual-dark-background dark:to-spiritual-dark-tertiary transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-spiritual-accent/20 rounded-b-xl"></div>
                  
                  {/* Screen Content */}
                  <div className="absolute inset-1.5 bg-white rounded-[2rem] overflow-hidden dark:bg-spiritual-dark-card">
                    <Image
                      src="/assets/frames/chat1.png"
                      alt="Chat Screen"
                      fill
                      className="object-cover"
                      style={{ objectPosition: 'center 70%' }}
                    />
                  </div>
                </div>
                
                {/* Label */}
                <div className="text-center mt-4">
                  <h4 className="text-xl font-spirituality font-bold text-spiritual-accent mb-1 dark:text-spiritual-dark-accent">Soul Chats</h4>
                  <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light">Start connecting</p>
                </div>
              </div>

              {/* Phone 4 - Sacred Self Feature */}
              <div className="relative group">
                <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-spiritual-background to-spiritual-tertiary rounded-[2.5rem] shadow-xl border-6 border-spiritual-accent/20 dark:from-spiritual-dark-background dark:to-spiritual-dark-tertiary transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-spiritual-accent/20 rounded-b-xl"></div>
                  
                  {/* Screen Content */}
                  <div className="absolute inset-1.5 bg-white rounded-[2rem] overflow-hidden dark:bg-spiritual-dark-card">
                    <Image
                      src="/assets/frames/self1.png"
                      alt="Sacred Self Screen"
                      fill
                      className="object-cover"
                      style={{ objectPosition: 'center 75%' }}
                    />
                  </div>
                </div>
                
                {/* Label */}
                <div className="text-center mt-4">
                  <h4 className="text-xl font-spirituality font-bold text-spiritual-accent mb-1 dark:text-spiritual-dark-accent">Self</h4>
                  <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-light">Express yourself</p>
                </div>
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
              className="text-4xl sm:text-5xl font-spirituality font-bold text-spiritual-text-dark mb-6 tracking-wide dark:text-spiritual-dark-accent"
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
                  icon: <HandHeart className="w-6 h-6" />,
                  title: "Deep Connections",
                  description: "Find your tribe of like-minded souls who share your journey"
                },
                {
                  icon: <Sprout className="w-6 h-6" />,
                  title: "Personal Growth",
                  description: "Access curated content and practices to support your journey"
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Enhanced Features",
                  description: "Unlock advanced matching, unlimited connections, and dedicated support"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-spiritual-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-spiritual-dark-card/80 dark:border-spiritual-dark-border">
                  <div className="mb-4 flex justify-center text-spiritual-accent dark:text-spiritual-dark-accent">{feature.icon}</div>
                  <h3 className="text-xl font-spirituality font-bold text-spiritual-text-dark mb-3 dark:text-spiritual-dark-accent">{feature.title}</h3>
                  <p className="text-spiritual-text-muted">{feature.description}</p>
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
