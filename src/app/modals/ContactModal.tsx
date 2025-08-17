import React from "react";
import { motion } from "framer-motion";
import { Check, X, Mail, User, MessageSquare, FileText } from "lucide-react";

const ContactModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  submitMessage,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string | null;
    email: string | null;
    subject: string | null;
    message: string | null;
    timestamp: string;
  }) => Promise<{ success: boolean }>;
  isSubmitting: boolean;
  submitMessage?: string;
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    
    // Validate that all required fields have values
    if (!name || !email || !subject || !message) {
      console.error('Missing required form fields');
      return;
    }
    
    const data = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    const result = await onSubmit(data);
    if (result.success && e.currentTarget) {
      // Safely reset the form
      try {
        e.currentTarget.reset();
      } catch (error) {
        console.warn('Form reset failed:', error);
        // Alternative: manually clear form fields
        const form = e.currentTarget as HTMLFormElement;
        if (form) {
          const inputs = form.querySelectorAll('input, textarea, select');
          inputs.forEach((input: Element) => {
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement || input instanceof HTMLSelectElement) {
              if (input.type === 'select-one') {
                (input as HTMLSelectElement).selectedIndex = 0;
              } else {
                input.value = '';
              }
            }
          });
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:bg-spiritual-dark-card"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-8 pb-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 bg-spiritual-accent/10 rounded-full flex items-center justify-center hover:bg-spiritual-accent/20 transition-colors dark:bg-spiritual-dark-accent/10 dark:hover:bg-spiritual-dark-accent/20"
          >
            <X className="w-5 h-5 text-spiritual-accent dark:text-spiritual-dark-accent" />
          </button>
          
          <div className="text-center">
            <h2 className="text-4xl font-spirituality font-bold text-spiritual-accent mb-4 tracking-wide dark:text-spiritual-dark-accent">
              Contact
            </h2>
            <p className="text-xl text-spiritual-text-muted max-w-2xl mx-auto dark:text-spiritual-dark-text-muted">
              Have questions about our journey? We&apos;d love to hear from you.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" />
              <input
                type="text"
                name="name"
                className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-muted dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent"
                placeholder="Your name"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" />
              <input
                type="email"
                name="email"
                className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-muted dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" />
              <select
                name="subject"
                className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-muted dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent"
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

            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-spiritual-text-muted dark:text-spiritual-dark-text-muted" />
              <textarea
                name="message"
                rows={5}
                className="w-full pl-10 pr-4 py-3 border border-spiritual-accent/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-accent/50 focus:border-spiritual-accent text-spiritual-text-dark placeholder-spiritual-text-muted dark:bg-spiritual-dark-card dark:border-spiritual-dark-border dark:text-spiritual-dark-text-light dark:placeholder-spiritual-dark-text-muted dark:focus:ring-spiritual-dark-accent/50 dark:focus:border-spiritual-dark-accent resize-y"
                placeholder="Your message..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-spiritual-accent/90 to-spiritual-primary/90 text-white rounded-lg font-spirituality font-bold text-lg tracking-wide hover:shadow-xl transition-all duration-100 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg dark:from-spiritual-dark-accent/90 dark:to-spiritual-dark-primary/90"
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
              className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center dark:bg-green-900/20 dark:border-green-800"
            >
              <div className="flex items-center justify-center mb-2">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Message sent!</h4>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Thank you for reaching out. We&apos;ll get back to you within 24
                hours.
              </p>
            </motion.div>
          )}

          {submitMessage === "error" && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center dark:bg-red-900/20 dark:border-red-800">
              <p className="text-red-700 dark:text-red-300 text-sm">
                There was an error sending your message. Please try again or email
                us directly at canberkvarli@gmail.com
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
