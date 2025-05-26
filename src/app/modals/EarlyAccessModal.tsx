import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Modal from "./Modal";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    email: string;
    name: string;
    phone: string;
    practices: string;
    timestamp: string;
  }) => Promise<{ success: boolean }>;
  isSubmitting: boolean;
  submitMessage: string;
}
const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  submitMessage,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      name: (formData.get("name") as string) || "Not provided",
      phone: (formData.get("phone") as string) || "Not provided",
      practices: (formData.get("practices") as string) || "Not specified",
      timestamp: new Date().toISOString(),
    };

    const result = await onSubmit(data);
    if (result.success) {
      e.currentTarget.reset();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join the Waitlist">
      <p className="text-[#8B7355] mb-6 leading-relaxed">
        Be among the first to experience authentic connections. Reserve your
        spot and receive exclusive updates on our journey.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
            placeholder="+1 (555) 123-4567"
            pattern="[+]?[0-9\s\-\(\)]+"
          />
          <p className="text-xs text-[#8B7355] mt-1">
            Optional: Receive launch notifications via SMS
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
            Primary Practice
          </label>
          <select
            name="practices"
            className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
          >
            <option value="">Select your primary practice</option>
            <option value="meditation">Meditation</option>
            <option value="yoga">Yoga</option>
            <option value="energy-healing">Energy Healing</option>
            <option value="mindfulness">Mindfulness</option>
            <option value="astrology">Astrology</option>
            <option value="breathwork">Breathwork</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Reserve My Spot</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {submitMessage === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-green-800 mb-1">
            Welcome to the community!
          </h4>
          <p className="text-green-700 text-sm">
            You&apos;re now on our exclusive waitlist. We&apos;ll notify you as
            soon as the app launches.
          </p>
        </motion.div>
      )}

      {submitMessage === "error" && (
        <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg text-center">
          <p className="text-red-700 text-sm">
            There was an error processing your request. Please try again or
            contact us directly at canberkvarli@gmail.com
          </p>
        </div>
      )}
    </Modal>
  );
};

export default EarlyAccessModal;
