import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Heart, Users, MessageCircle } from "lucide-react";

const HeroSection = ({ showIntro, stats, countdown, openModal }) => {
  // Progress bar percentage
  const progressPercentage = (stats.signups / stats.totalSpots) * 100;

  return (
    <motion.main
      className="pt-20 pb-20 relative z-10 bg-gradient-to-br from-white via-spiritual-tertiary/30 to-spiritual-secondary/20"
      initial={{ opacity: 0, y: 30 }}
      animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-light mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="block bg-gradient-to-r from-spiritual-primary via-spiritual-secondary to-spiritual-primary bg-clip-text text-transparent">
              Conscious
            </span>
            <span className="block text-spiritual-text-dark">Connections</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-spiritual-text-muted mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Connect with fellow seekers who practice meditation, yoga, energy
            healing, and embrace conscious living.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="px-12 py-5 bg-gradient-to-r from-spiritual-primary to-spiritual-secondary text-white rounded-full font-medium shadow-xl text-xl relative overflow-hidden group mb-16 hover:shadow-2xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(123, 107, 92, 0.3)",
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
            <span className="relative z-10">Reserve Your Spot</span>
          </motion.button>
        </div>

        {/* iPhone Mockup Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-3xl font-light text-spiritual-text-muted mb-12 text-center">
            Experience the App
          </h3>
          
          <div className="relative max-w-sm mx-auto">
            {/* iPhone Frame */}
            <div className="relative mx-auto w-72 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
              {/* Screen */}
              <div className="w-full h-full bg-gradient-to-br from-spiritual-background to-spiritual-tertiary rounded-[2.5rem] overflow-hidden relative">
                {/* App Header */}
                <div className="bg-gradient-to-r from-spiritual-primary to-spiritual-secondary p-4 text-white">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Circle</h4>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                {/* App Content */}
                <div className="p-4 space-y-4">
                  {/* Profile Card */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-spiritual-primary/20 shadow-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-spiritual-accent to-spiritual-accent-light rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-semibold">S</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-spiritual-text-dark">Sarah, 28</h5>
                        <p className="text-sm text-spiritual-text-muted">Meditation • Yoga</p>
                      </div>
                    </div>
                    <p className="text-sm text-spiritual-text-muted">
                      &ldquo;Seeking someone who values mindfulness and conscious living. Love morning meditations and nature walks.&rdquo;
                    </p>
                  </div>
                  
                  {/* Connection Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-spiritual-primary/20 shadow-md">
                      <div className="text-lg font-bold text-spiritual-primary">95%</div>
                      <div className="text-xs text-spiritual-text-muted">Match</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border border-spiritual-primary/20 shadow-md">
                      <div className="text-lg font-bold text-spiritual-primary">3</div>
                      <div className="text-xs text-spiritual-text-muted">Practices</div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-spiritual-primary to-spiritual-secondary text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow">
                      Connect
                    </button>
                    <button className="flex-1 bg-white/90 text-spiritual-primary py-3 rounded-xl font-medium border border-spiritual-primary/20 shadow-md hover:shadow-lg transition-shadow">
                      Pass
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Home Button */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full"></div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-spiritual-accent to-spiritual-accent-light rounded-full flex items-center justify-center shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-spiritual-tertiary to-spiritual-secondary rounded-full flex items-center justify-center shadow-xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Progress and Countdown Section */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <motion.div
            className="mb-12 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              !showIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="mb-2 flex justify-between text-sm text-spiritual-primary font-medium">
              <span>{stats.signups} spots claimed</span>
              <span>{stats.totalSpots - stats.signups} remaining</span>
            </div>
            <div className="w-full bg-spiritual-primary/20 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                className="bg-gradient-to-r from-spiritual-primary to-spiritual-secondary h-full rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 1.6 }}
              />
            </div>
            <p className="text-xs text-spiritual-text-muted mt-2 text-center">
              Limited to {stats.totalSpots.toLocaleString()} founding members
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
            <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-spiritual-primary/20 shadow-xl">
              <motion.div
                className="flex items-center justify-center space-x-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="w-5 h-5 text-spiritual-primary" />
                <span className="text-lg font-semibold text-spiritual-primary">
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
                      className="text-2xl font-bold text-spiritual-primary"
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
            className="border-t border-spiritual-primary/20 pt-8"
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
                  <div className="text-2xl sm:text-3xl font-bold mb-1 text-spiritual-primary group-hover:text-spiritual-secondary transition-colors">
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
      </div>
    </motion.main>
  );
};

export default HeroSection;
