import React from "react";
import Modal from "./Modal";

const PrivacyModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <div className="text-[#8B7355] leading-relaxed space-y-4 max-h-96 overflow-y-auto">
        <p>
          <strong className="text-[#8B5A2B]">Last updated: January 2025</strong>
        </p>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">
            Information We Collect
          </h4>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, update your profile, or contact us. This may
            include your name, email address, practices, and preferences.
          </p>
        </div>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">
            How We Use Your Information
          </h4>
          <p>
            We use the information we collect to provide, maintain, and improve
            our services, communicate with you, and connect you with like-minded
            individuals based on your practices and preferences.
          </p>
        </div>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">
            Information Sharing
          </h4>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except as
            described in this policy or as required by law.
          </p>
        </div>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">Data Security</h4>
          <p>
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, disclosure, or
            destruction.
          </p>
        </div>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at canberkvarli@gmail.com
          </p>
        </div>
      </div>
    </Modal>
  );
};
export default PrivacyModal;
