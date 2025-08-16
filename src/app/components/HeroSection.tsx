import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

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
  
  // Modal state
  const [showDanielleModal, setShowDanielleModal] = useState(false);

  return (
    <motion.main
      className="pt-32 pb-20 relative z-10 bg-gradient-to-br from-white via-spiritual-tertiary/30 to-spiritual-secondary/20"
      initial={{ opacity: 0, y: 30 }}
      animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Hero Content */}
        <div className="text-center mb-20">
          <motion.h1
            className="text-7xl sm:text-8xl lg:text-9xl font-light leading-tight min-h-[400px] flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="block text-spiritual-accent font-spirituality font-bold tracking-wide mb-8">
              Conscious
            </span>
            <span className="block text-spiritual-text-dark font-spirituality font-bold tracking-wide text-6xl sm:text-7xl lg:text-8xl ml-12">
              Connections
            </span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-spiritual-text-muted mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Connect with fellow seekers who practice meditation, yoga, energy
            healing, and embrace conscious living.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="px-12 py-5 bg-gradient-to-r from-spiritual-accent to-spiritual-primary text-white rounded-full font-medium shadow-xl text-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(184, 134, 11, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal("earlyAccess")}
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Join FullCircle Waitlist</span>
          </motion.button>
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
            <span>{stats.signups} FullCircle spots claimed</span>
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
            First {stats.totalSpots.toLocaleString()} users get 1 month of FullCircle free
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
          <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-spiritual-accent/20 shadow-xl">
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

        {/* Stats */}
        <motion.div
          className="border-t border-spiritual-accent/20 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <div className="grid grid-cols-2 gap-8">
            {[
              {
                value: stats.signups,
                label: "Early supporters",
                suffix: "",
              },
              {
                value: stats.connections,
                label: "Connections made",
                suffix: "+",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  !showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 2.0 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="text-2xl sm:text-3xl font-spirituality font-bold mb-1 text-spiritual-accent group-hover:text-spiritual-primary transition-colors">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-spiritual-text-muted text-sm group-hover:text-spiritual-text-muted/70 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Danielle Modal */}
      {showDanielleModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDanielleModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-spiritual-accent/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDanielleModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-spiritual-accent/10 rounded-full flex items-center justify-center hover:bg-spiritual-accent/20 transition-colors"
            >
              <svg className="w-5 h-5 text-spiritual-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal Content */}
            <div className="text-center">
              {/* Danielle's Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-spiritual-accent to-spiritual-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                <span className="text-white font-spirituality font-bold text-2xl">D</span>
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-spirituality font-bold text-spiritual-text-dark mb-3 tracking-wide">
                Meet Danielle
              </h3>
              
              {/* Description */}
              <p className="text-spiritual-text-muted mb-6 leading-relaxed">
                Danielle is a passionate meditation teacher and energy healer who believes in the power of conscious connections. 
                She&apos;s one of the many amazing people you can meet on Circle.
              </p>
              
              {/* Practice Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="px-3 py-1 bg-spiritual-accent/10 text-spiritual-accent rounded-full text-sm font-medium">
                  Meditation
                </span>
                <span className="px-3 py-1 bg-spiritual-primary/10 text-spiritual-primary rounded-full text-sm font-medium">
                  Energy Healing
                </span>
                <span className="px-3 py-1 bg-spiritual-secondary/10 text-spiritual-secondary rounded-full text-sm font-medium">
                  Mindfulness
                </span>
              </div>
              
              {/* CTA */}
              <button
                onClick={() => setShowDanielleModal(false)}
                className="px-6 py-3 bg-spiritual-accent text-white rounded-full font-medium hover:bg-spiritual-accent/90 transition-colors"
              >
                Join Circle
              </button>
            </div>
          </motion.div>
        </div>
      )}

        {/* App Preview Section */}
        <motion.div
          className="mt-16 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h3 className="text-4xl font-spirituality font-bold text-spiritual-accent mb-16 text-center tracking-wide">
            Experience the App
          </h3>
          
          {/* Pyramid Layout: Video at top, 3 phones below */}
          <div className="max-w-7xl mx-auto">
            {/* Top: Danielle Video */}
            <div className="flex justify-center mb-12 relative">
              <div className="relative w-80 h-[600px] bg-gradient-to-br from-spiritual-background to-spiritual-tertiary rounded-[3rem] shadow-2xl border-8 border-spiritual-accent/20 transform transition-all duration-500 hover:scale-105">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-spiritual-accent/20 rounded-b-2xl z-10"></div>
                
                {/* Info Icon - Top Right Corner of Phone Frame */}
                <div className="absolute top-2 right-2 z-20">
                  <button 
                    onClick={() => setShowDanielleModal(true)}
                    className="w-10 h-10 bg-spiritual-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 shadow-xl hover:scale-110 transition-all duration-300 hover:bg-spiritual-accent"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                
                {/* Video Screen */}
                <div className="absolute inset-2 bg-black rounded-[2rem] overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/assets/videos/danielle.mp4" type="video/mp4" />
                    <source src="/assets/videos/danielle.mov" type="video/quicktime" />
                  </video>
                  
                  {/* App Overlay - Like Login/Signup Page */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent flex flex-col justify-between">
                    {/* Top Section - Just Title */}
                    <div className="flex-1 flex flex-col items-center justify-center pt-16">
                      {/* Title */}
                      <div className="text-center mb-8">
                        <h4 className="text-white font-spirituality font-bold text-3xl mb-2 tracking-wide">circle</h4>
                      </div>
                    </div>
                    
                    {/* Bottom Section - Smaller Buttons */}
                    <div className="p-6 space-y-3">
                      {/* Create Account Button */}
                      <div className="w-full bg-spiritual-accent rounded-full py-3 px-6 text-center">
                        <span className="text-white font-spirituality font-bold text-base tracking-wide">Create account</span>
                      </div>
                      
                      {/* Sign In Button */}
                      <div className="w-full bg-white/15 backdrop-blur-sm rounded-full py-3 px-6 text-center border-2 border-spiritual-accent">
                        <span className="text-white font-spirituality font-bold text-base tracking-wide">Sign In</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom: 3 Phone Frames */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Phone 1 - Connect Feature */}
              <div className="relative group">
                <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-spiritual-background to-spiritual-tertiary rounded-[2.5rem] shadow-xl border-6 border-spiritual-accent/20 transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-2">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-spiritual-accent/20 rounded-b-xl"></div>
                  
                  {/* Screen Content */}
                  <div className="absolute inset-1.5 bg-white rounded-[2rem] overflow-hidden">
                    {/* App Header */}
                    <div className="bg-gradient-to-r from-spiritual-accent to-spiritual-primary h-12 flex items-center justify-center">
                      <span className="text-white font-spirituality font-bold text-sm">Circle</span>
                    </div>
                    
                    {/* Main Content - Profile Cards */}
                    <div className="p-3 space-y-3">
                      <div className="bg-spiritual-background rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-spiritual-accent to-spiritual-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-spirituality font-bold text-sm">S</span>
                          </div>
                          <div className="flex-1">
                            <div className="h-3 bg-spiritual-accent/30 rounded w-20 mb-1"></div>
                            <div className="h-2 bg-spiritual-accent/20 rounded w-24"></div>
                          </div>
                        </div>
                        <div className="mt-2 h-2 bg-spiritual-accent/20 rounded w-full"></div>
                      </div>
                      
                      <div className="bg-spiritual-background rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-spiritual-primary to-spiritual-secondary rounded-full flex items-center justify-center">
                            <span className="text-white font-spirituality font-bold text-sm">M</span>
                          </div>
                          <div className="flex-1">
                            <div className="h-3 bg-spiritual-primary/30 rounded w-24 mb-1"></div>
                            <div className="h-2 bg-spiritual-primary/20 rounded w-28"></div>
                          </div>
                        </div>
                        <div className="mt-2 h-2 bg-spiritual-primary/20 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Label */}
                <div className="text-center mt-4">
                  <h4 className="text-lg font-spirituality font-bold text-spiritual-accent mb-1">Connect</h4>
                  <p className="text-sm text-spiritual-text-dark">Find your tribe</p>
                </div>
              </div>

              {/* Phone 2 - Discover Feature */}
              <div className="relative group">
                <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-spiritual-background to-spiritual-tertiary rounded-[2.5rem] shadow-xl border-6 border-spiritual-accent/20 transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-spiritual-accent/20 rounded-b-xl"></div>
                  
                  {/* Screen Content */}
                  <div className="absolute inset-1.5 bg-white rounded-[2rem] overflow-hidden">
                    {/* App Header */}
                    <div className="bg-gradient-to-r from-spiritual-primary to-spiritual-secondary h-12 flex items-center justify-center">
                      <span className="text-white font-spirituality font-bold text-sm">Discover</span>
                    </div>
                    
                    {/* Main Content - Practice Grid */}
                    <div className="p-3 space-y-3">
                      <div className="bg-spiritual-background rounded-lg p-4 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-spiritual-accent to-spiritual-primary rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white font-spirituality font-bold text-sm">🧘</span>
                        </div>
                        <div className="h-2 bg-spiritual-accent/30 rounded w-20 mx-auto mb-1"></div>
                        <div className="h-1.5 bg-spiritual-accent/20 rounded w-16 mx-auto"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-spiritual-background rounded-lg p-2 text-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-spiritual-primary to-spiritual-secondary rounded-full mx-auto mb-1 flex items-center justify-center">
                            <span className="text-white font-spirituality font-bold text-xs">🌿</span>
                          </div>
                          <div className="h-1.5 bg-spiritual-primary/30 rounded w-12 mx-auto"></div>
                        </div>
                        <div className="bg-spiritual-background rounded-lg p-2 text-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-spiritual-secondary to-spiritual-accent rounded-full mx-auto mb-1 flex items-center justify-center">
                            <span className="text-white font-spirituality font-bold text-xs">✨</span>
                          </div>
                          <div className="h-1.5 bg-spiritual-secondary/30 rounded w-12 mx-auto"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Label */}
                <div className="text-center mt-4">
                  <h4 className="text-lg font-spirituality font-bold text-spiritual-accent mb-1">Discover</h4>
                  <p className="text-sm text-spiritual-text-dark">New practices</p>
                </div>
              </div>

              {/* Phone 3 - Grow Feature */}
              <div className="relative group">
                <div className="relative mx-auto w-64 h-[500px] bg-gradient-to-br from-spiritual-background to-spiritual-tertiary rounded-[2.5rem] shadow-xl border-6 border-spiritual-accent/20 transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-spiritual-accent/20 rounded-b-xl"></div>
                  
                  {/* Screen Content */}
                  <div className="absolute inset-1.5 bg-white rounded-[2rem] overflow-hidden">
                    {/* App Header */}
                    <div className="bg-gradient-to-r from-spiritual-secondary to-spiritual-accent h-12 flex items-center justify-center">
                      <span className="text-white font-spirituality font-bold text-sm">Grow</span>
                    </div>
                    
                    {/* Main Content - Progress Tracking */}
                    <div className="p-3 space-y-3">
                      <div className="bg-spiritual-background rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-spiritual-text-dark font-medium">Daily Practice</span>
                          <span className="text-xs font-bold text-spiritual-accent">75%</span>
                        </div>
                        <div className="w-full bg-spiritual-accent/20 rounded-full h-2">
                          <div className="bg-gradient-to-r from-spiritual-accent to-spiritual-primary h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <div className="flex-1">
                            <div className="h-1.5 bg-spiritual-accent/30 rounded w-20"></div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <div className="flex-1">
                            <div className="h-1.5 bg-spiritual-accent/30 rounded w-24"></div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-spiritual-accent/30 rounded-full flex items-center justify-center">
                            <span className="text-spiritual-accent text-xs">○</span>
                          </div>
                          <div className="flex-1">
                            <div className="h-1.5 bg-spiritual-accent/20 rounded w-16"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Label */}
                <div className="text-center mt-4">
                  <h4 className="text-lg font-spirituality font-bold text-spiritual-accent mb-1">Grow</h4>
                  <p className="text-sm text-spiritual-text-dark">Track journey</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FullCircle Membership Section */}
        <motion.div
          id="waitlist"
          className="mt-20 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl sm:text-5xl font-spirituality font-bold text-spiritual-accent mb-6 tracking-wide"
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
              Join thousands of conscious seekers who are already transforming their lives through meaningful connections and guided growth.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 3.0 }}
            >
              {[
                {
                  icon: "🌱",
                  title: "Deep Connections",
                  description: "Find your tribe of like-minded souls who share your spiritual journey"
                },
                {
                  icon: "✨",
                  title: "Guided Growth",
                  description: "Access exclusive content and practices to accelerate your evolution"
                },
                {
                  icon: "🌟",
                  title: "Premium Features",
                  description: "Unlock advanced matching, unlimited connections, and priority support"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-spiritual-accent/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-3">{feature.title}</h3>
                  <p className="text-spiritual-text-muted">{feature.description}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 3.2 }}
            >
              <button
                onClick={() => openModal('fullcircle')}
                className="px-8 py-4 bg-gradient-to-r from-spiritual-accent to-spiritual-primary text-white rounded-full font-black shadow-xl text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-spirituality tracking-wide border-2 border-white/20"
              >
                Become a FullCircle Member
              </button>
              
              <button
                onClick={() => openModal('earlyAccess')}
                className="px-8 py-4 bg-white/90 backdrop-blur-sm text-spiritual-accent rounded-full font-medium border-2 border-spiritual-accent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Join Waitlist (Free)
              </button>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={!showIntro ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 3.4 }}
            >
              <p className="text-sm text-spiritual-text-muted">
                First 1,000 members get 1 month of FullCircle completely free
              </p>
              <button
                onClick={() => openModal('fullcircle')}
                className="w-8 h-8 bg-spiritual-accent/20 rounded-full flex items-center justify-center hover:bg-spiritual-accent/30 transition-colors group"
                title="Learn more about FullCircle"
              >
                <span className="text-spiritual-accent text-lg font-bold group-hover:scale-110 transition-transform">?</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
    </motion.main>
  );
};

export default HeroSection;
