import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, HandHeart, Sprout, Sparkles } from "lucide-react";
import Image from "next/image";
import EmailWaitlistInput from "./EmailWaitlistInput";

interface HeroSectionProps {
  showIntro: boolean;
  stats: {
    signups: number;
    totalSpots: number;
    connections: number;
  };
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  openModal: (modalType: string) => void;
}

const HeroSection = ({ showIntro, stats, countdown, openModal }: HeroSectionProps) => {
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
          className="mb-12 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            !showIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="mb-2 flex justify-between text-sm text-spiritual-accent font-medium">
            <span>{stats.signups} fullcircle spots claimed</span>
            <span>{stats.totalSpots - stats.signups} remaining</span>
          </div>
          <div className="w-full bg-spiritual-accent/20 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-spiritual-accent to-spiritual-primary h-full rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 1.6 }}
            />
          </div>
          <p className="text-xs text-spiritual-text-muted mt-2 text-center">
            First {stats.totalSpots.toLocaleString()} users get 1 month of fullcircle+ membership for free
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            !showIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-spiritual-accent/20 shadow-xl dark:bg-spiritual-dark-card/90 dark:border-spiritual-dark-border">
            <motion.div
              className="flex items-center justify-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="w-5 h-5 text-spiritual-accent" />
              <span className="text-lg font-spirituality font-bold text-spiritual-accent tracking-wide">
                Launching in
              </span>
            </motion.div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Minutes" },
                { value: countdown.seconds, label: "Seconds" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <motion.div
                    className="text-2xl font-spirituality font-bold text-spiritual-accent"
                    key={item.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </motion.div>
                  <div className="text-xs text-spiritual-text-muted">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="text-sm text-spiritual-text-muted flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>iOS & Android • Free to download</span>
            </div>
          </div>
        </motion.div>


      </div>
      
      {/* Danielle Modal */}
      {/* Removed Danielle modal as it's no longer accessible */}

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
            {/* Top: Danielle Video */}
            <div className="flex justify-center mb-12 relative">
              <div className="relative w-72 h-[600px] bg-black rounded-[2.5rem] shadow-2xl transform transition-all duration-500 hover:scale-105">
                {/* Phone Notch - iPhone 16 Pro style */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10"></div>
                
                {/* Information Icon - Positioned inside the frame on top right */}
                <button
                  onClick={() => openModal("danielle")}
                  className="absolute top-4 right-4 z-20 w-8 h-8 bg-spiritual-accent/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
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
                
                {/* Video Screen */}
                <div className="absolute inset-1 bg-black rounded-[2rem] overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/assets/videos/danielle.mp4" type="video/mp4" />
                  </video>
                  
                  {/* App Overlay - Cleaner design */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent flex flex-col justify-between">                    
                    {/* Bottom Section - Smaller Buttons */}
                    <div className="p-6 flex flex-col flex-1 pt-16">
                      <div className="flex-1" />
                      <div className="space-y-3">
                        {/* Email Input for Waitlist */}
                        <div className="px-2">
                          <EmailWaitlistInput className="w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={!showIntro ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 3.4 }}
            >
              <p className="text-sm text-spiritual-text-muted">
                First 1,000 members get 1 month of fullcircle+ completely free
              </p>
            </motion.div>
          </div>
        </motion.div>
    </motion.main>
  );
};

export default HeroSection;
