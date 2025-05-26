import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

const HeroSection = ({ showIntro, stats, countdown, openModal }) => {
  // Progress bar percentage
  const progressPercentage = (stats.signups / stats.totalSpots) * 100;

  return (
    <motion.main
      className="pt-32 pb-20 relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 3 }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-light mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 3.2 }}
        >
          <span className="block bg-gradient-to-r from-[#8B5A2B] via-[#D4AF37] to-[#8B5A2B] bg-clip-text text-transparent">
            Conscious
          </span>
          <span className="block text-[#8B7355]">Connections</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-[#8B7355] mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 3.4 }}
        >
          Connect with fellow seekers who practice meditation, yoga, energy
          healing, and embrace conscious living.
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          className="mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            !showIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.6, delay: 3.5 }}
        >
          <div className="mb-2 flex justify-between text-sm text-[#8B5A2B]">
            <span className="font-semibold">{stats.signups} spots claimed</span>
            <span>{stats.totalSpots - stats.signups} remaining</span>
          </div>
          <div className="w-full bg-[#8B5A2B]/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 3.8 }}
            />
          </div>
          <p className="text-xs text-[#8B7355] mt-2">
            Limited to {stats.totalSpots.toLocaleString()} founding members
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            !showIntro ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.6, delay: 3.6 }}
        >
          <div className="max-w-lg mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#8B5A2B]/20 shadow-xl">
            <motion.div
              className="flex items-center justify-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="w-5 h-5 text-[#8B5A2B]" />
              <span className="text-lg font-semibold text-[#8B5A2B]">
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
                    className="text-2xl font-bold text-[#8B5A2B]"
                    key={item.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </motion.div>
                  <div className="text-xs text-[#8B7355]">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="text-sm text-[#8B7355] flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>iOS & Android • Free to download</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-full font-medium shadow-lg text-lg mb-12 relative overflow-hidden group"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(139, 90, 43, 0.25)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal("earlyAccess")}
          initial={{ opacity: 0, y: 20 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 3.8 }}
        >
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">Reserve Your Spot</span>
        </motion.button>

        {/* Stats */}
        <motion.div
          className="border-t border-[#8B5A2B]/20 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={!showIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 4 }}
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
                transition={{ delay: 4.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="text-2xl sm:text-3xl font-bold mb-1 text-[#8B5A2B] group-hover:text-[#D4AF37] transition-colors">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-[#8B7355] text-sm group-hover:text-[#8B7355]/70 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default HeroSection;
