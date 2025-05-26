import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Modal from "./Modal";

const ContactModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  submitMessage,
}: {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => Promise<{ success: boolean }>;
  isSubmitting: boolean;
  submitMessage?: string;
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      timestamp: new Date().toISOString(),
    };

    const result = await onSubmit(data);
    if (result.success) {
      e.currentTarget.reset();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Us">
      <p className="text-[#8B7355] mb-6 leading-relaxed">
        Have questions about our journey? We&apos;d love to hear from you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
            Email
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
            Subject
          </label>
          <select
            name="subject"
            className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
            required
          >
            <option value="">Select a topic</option>
            <option value="general">General Inquiry</option>
            <option value="partnerships">Partnerships</option>
            <option value="feedback">Feedback</option>
            <option value="support">Support</option>
            <option value="press">Press Inquiry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#8B5A2B] mb-2">
            Message
          </label>
          <textarea
            name="message"
            rows={5}
            className="w-full px-4 py-3 border border-[#8B5A2B]/20 rounded-lg focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors resize-y"
            placeholder="Your message..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-[#8B5A2B] to-[#D4AF37] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <span>Send Message</span>
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
          <h4 className="font-semibold text-green-800 mb-1">Message sent!</h4>
          <p className="text-green-700 text-sm">
            Thank you for reaching out. We&apos;ll get back to you within 24
            hours.
          </p>
        </motion.div>
      )}

      {submitMessage === "error" && (
        <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg text-center">
          <p className="text-red-700 text-sm">
            There was an error sending your message. Please try again or email
            us directly at canberkvarli@gmail.com
          </p>
        </div>
      )}
    </Modal>
  );
};
export default ContactModal;
