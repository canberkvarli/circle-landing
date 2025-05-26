import React from "react";
import Modal from "./Modal";

const TermsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service">
      <div className="text-[#8B7355] leading-relaxed space-y-4 max-h-96 overflow-y-auto">
        <p>
          <strong className="text-[#8B5A2B]">Last updated: January 2025</strong>
        </p>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">
            Acceptance of Terms
          </h4>
          <p>
            By accessing and using our platform, you accept and agree to be
            bound by the terms and provision of this agreement.
          </p>
        </div>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">Use License</h4>
          <p>
            Permission is granted to temporarily download one copy of our app
            for personal, non-commercial transitory viewing only. This is the
            grant of a license, not a transfer of title.
          </p>
        </div>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">User Conduct</h4>
          <p>
            You agree to use our platform in a respectful manner that aligns
            with mindful and conscious values. Harassment, hate speech, or
            inappropriate behavior is not tolerated.
          </p>
        </div>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">
            Community Guidelines
          </h4>
          <p>
            Our platform is designed to foster meaningful connections. We expect
            all users to engage authentically and with respect for diverse paths
            and practices.
          </p>
        </div>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">Disclaimer</h4>
          <p>
            The materials on our platform are provided on an &apos;as is&apos;
            basis. We make no warranties, expressed or implied, and hereby
            disclaim and negate all other warranties including without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
          </p>
        </div>

        <div>
          <h4 className="text-[#8B5A2B] font-semibold mb-2">
            Contact Information
          </h4>
          <p>
            Questions about the Terms of Service should be sent to us at
            canberkvarli@gmail.com
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default TermsModal;
