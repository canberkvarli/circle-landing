import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";

const Header = ({
  scrolled,
  showIntro,
  stats,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  openModal,
}: {
  scrolled: boolean;
  showIntro: boolean;
  stats: { signups: number; totalSpots: number };
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (id: string) => void;
  openModal: (type: "contact" | "earlyAccess") => void;
}) => {
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-[#8B5A2B]/10 shadow-lg shadow-[#8B5A2B]/5"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={!showIntro ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.6, delay: 3.2 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B5A2B] to-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] bg-clip-text text-transparent">
              Circle
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { name: "Features", id: "features" },
              { name: "Journey", id: "roadmap" },
              { name: "About", id: "about" },
            ].map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-[#8B5A2B] hover:text-[#D4AF37] font-medium transition-colors duration-300 rounded-lg"
                whileHover={{ y: -1 }}
              >
                {item.name}
              </motion.button>
            ))}
            <button
              onClick={() => openModal("contact")}
              className="px-4 py-2 text-[#8B5A2B] hover:text-[#D4AF37] font-medium transition-colors duration-300 rounded-lg"
            >
              Contact
            </button>
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-2 bg-[#8B5A2B]/10 px-4 py-2 rounded-full"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-[#8B5A2B]">
                <span className="font-bold">
                  {stats.signups}/{stats.totalSpots}
                </span>{" "}
                spots claimed
              </span>
            </motion.div>

            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-full font-medium shadow-lg relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(139, 90, 43, 0.25)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal("earlyAccess")}
            >
              Join Waitlist
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-[#8B5A2B]/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-[#8B5A2B]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-[#8B5A2B]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 py-4 border-t border-[#8B5A2B]/20"
            >
              <nav className="flex flex-col space-y-2">
                {[
                  { name: "Features", id: "features" },
                  { name: "Journey", id: "roadmap" },
                  { name: "About", id: "about" },
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-[#8B5A2B] hover:text-[#D4AF37] font-medium py-3 px-2 rounded-lg hover:bg-[#8B5A2B]/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <button
                  onClick={() => openModal("contact")}
                  className="text-left text-[#8B5A2B] hover:text-[#D4AF37] font-medium py-3 px-2 rounded-lg hover:bg-[#8B5A2B]/5 transition-colors"
                >
                  Contact
                </button>
                <motion.button
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-full font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => openModal("earlyAccess")}
                >
                  Join Waitlist
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
export default Header;
