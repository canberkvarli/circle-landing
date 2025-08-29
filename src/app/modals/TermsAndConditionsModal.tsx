import React from "react";
import { motion } from "framer-motion";
import { X, FileText, Scale } from "lucide-react";

interface TermsAndConditionsModalProps {
  onClose: () => void;
}

const TermsAndConditionsModal = ({ onClose }: TermsAndConditionsModalProps) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-spiritual-dark-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
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
            className="absolute top-6 right-6 w-8 h-8 bg-spiritual-accent/10 rounded-full flex items-center justify-center hover:bg-spiritual-accent/20 transition-colors"
          >
            <X className="w-5 h-5 text-spiritual-accent" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-spiritual-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-spiritual-accent" />
            </div>
            <h2 className="text-4xl font-spirituality font-bold text-spiritual-accent mb-4 tracking-wide">
              Terms and Conditions
            </h2>
            <p className="text-lg text-spiritual-text-muted max-w-2xl mx-auto">
              Last updated: August 29, 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <div className="prose prose-lg max-w-none text-spiritual-text-muted">
            <p className="mb-6">
              Please read these terms and conditions carefully before using Our Service.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Interpretation and Definitions
            </h3>

            <h4 className="text-xl font-semibold text-spiritual-accent mb-3">Interpretation</h4>
            <p className="mb-4">
              The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </p>

            <h4 className="text-xl font-semibold text-spiritual-accent mb-3">Definitions</h4>
            <p className="mb-4">For the purposes of these Terms and Conditions:</p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Circle LLC, 4337 Renaissance Dr, San Jose, CA, 95134.</li>
              <li><strong>Country</strong> refers to: California, United States</li>
              <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
              <li><strong>Service</strong> refers to the Website and newsletter signup functionality.</li>
              <li><strong>Terms and Conditions</strong> (also referred as &quot;Terms&quot;) mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
              <li><strong>Website</strong> refers to Circle, accessible from <a href="https://www.joinfullcircle.app" className="text-spiritual-accent hover:underline">https://www.joinfullcircle.app</a></li>
              <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
            </ul>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Acknowledgment
            </h3>
            <p className="mb-4">
              These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
            </p>
            <p className="mb-4">
              Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
            </p>
            <p className="mb-4">
              By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
            </p>
            <p className="mb-4">
              You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
            </p>
            <p className="mb-6">
              Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Newsletter Registration and Early Access Offer
            </h3>
            <p className="mb-4">
              The Service allows You to register for our newsletter by providing Your email address, name, and optionally Your phone number. By registering, You consent to receive periodic communications from Us regarding our upcoming application and related updates.
            </p>

            <h4 className="text-xl font-semibold text-spiritual-accent mb-3">Early Access Promotional Offer</h4>
            <p className="mb-4">
              The first 1,000 newsletter subscribers will receive one month of free access to our upcoming application when it launches. This promotional offer is:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Subject to successful launch of the application</li>
              <li>Not transferable or assignable to other individuals</li>
              <li>Limited to one offer per email address</li>
              <li>Contingent upon the application being developed and released</li>
              <li>May be modified or cancelled if technical, legal, or business circumstances prevent delivery</li>
              <li>Will be provided when the application becomes available, timing to be determined by the Company</li>
              <li>Not a guarantee of specific application features or functionality</li>
            </ul>
            <p className="mb-6">
              Newsletter registration does not constitute a binding contract for application access. The promotional offer represents our current intention but may be subject to change based on development progress and business requirements.
            </p>
            <p className="mb-6">
              You may unsubscribe from our newsletter at any time by following the unsubscribe instructions included in our emails or by contacting Us directly. Unsubscribing will forfeit eligibility for the promotional offer.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Prohibited Uses
            </h3>
            <p className="mb-4">You may not use Our Service:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To collect or track the personal information of others</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>For any obscene or immoral purpose</li>
              <li>To interfere with or circumvent the security features of the Service</li>
              <li>If You are under the age of 18</li>
            </ul>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Intellectual Property Rights
            </h3>
            <p className="mb-6">
              The Service and its original content, features and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              User Feedback
            </h3>
            <p className="mb-6">
              Any feedback, comments, ideas, improvements or suggestions provided by You shall become the sole and exclusive property of the Company and the Company may use and develop such feedback for any purpose without compensation or attribution to You.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Termination
            </h3>
            <p className="mb-4">
              We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.
            </p>
            <p className="mb-6">
              Upon termination, Your right to use the Service will cease immediately.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Limitation of Liability
            </h3>
            <p className="mb-4">
              Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to 100 USD.
            </p>
            <p className="mb-6">
              To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
            </p>
            <p className="mb-6">
              Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party&apos;s liability will be limited to the greatest extent permitted by law.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
            </h3>
            <p className="mb-6">
              The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Governing Law
            </h3>
            <p className="mb-6">
              The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Service may also be subject to other local, state, national, or international laws.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Disputes Resolution
            </h3>
            <p className="mb-6">
              If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              United States Legal Compliance
            </h3>
            <p className="mb-6">
              You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Severability and Waiver
            </h3>
            <h4 className="text-xl font-semibold text-spiritual-accent mb-3">Severability</h4>
            <p className="mb-4">
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.
            </p>
            <h4 className="text-xl font-semibold text-spiritual-accent mb-3">Waiver</h4>
            <p className="mb-6">
              Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party&apos;s ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Changes to These Terms and Conditions
            </h3>
            <p className="mb-4">
              We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.
            </p>
            <p className="mb-6">
              By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.
            </p>

            <h3 className="text-2xl font-spirituality font-bold text-spiritual-accent mb-4 mt-8">
              Contact Us
            </h3>
            <p className="mb-6">
              If you have any questions about these Terms and Conditions, You can contact us:
            </p>
            <p className="mb-8">
              <strong>By email:</strong> <a href="mailto:hello@joinfullcircle.app" className="text-spiritual-accent hover:underline">hello@joinfullcircle.app</a>
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-700/30 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-spiritual-accent dark:text-spiritual-dark-accent" />
              <h3 className="text-xl font-spirituality font-bold text-spiritual-accent dark:text-spiritual-dark-accent">
                Terms &amp; Conditions
              </h3>
            </div>
            <p className="text-center text-spiritual-text-muted dark:text-spiritual-dark-text-muted mb-6">
              By using our service, you agree to these terms and conditions. We&apos;re committed to transparency and clear communication about how our service works.
            </p>
            <div className="text-center">
              <button
                onClick={onClose}
                className="px-8 py-4 bg-gradient-to-r from-spiritual-accent to-spiritual-primary dark:from-spiritual-dark-accent dark:to-spiritual-dark-primary text-white rounded-full font-bold shadow-xl text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 font-spirituality tracking-wide"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TermsAndConditionsModal;
