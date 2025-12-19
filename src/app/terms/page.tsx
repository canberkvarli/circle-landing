import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | fullcircle™",
  description: "Read the fullcircle Terms of Service. Learn about our policies, user conduct guidelines, and legal terms for using the fullcircle mobile application.",
  robots: "index, follow",
};

export default function TermsOfService() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-6 border border-amber-200 dark:border-amber-900/30">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-amber-700 dark:text-amber-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-wide">
              fullcircle™ Terms of Service
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Last Updated: {lastUpdated}
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-700 dark:border-amber-500 p-4 rounded-r-lg max-w-2xl">
              <p className="text-xs text-gray-700 dark:text-gray-300 italic">
                This is a legally binding agreement. Please read carefully before using the Service.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 space-y-8 border border-gray-200 dark:border-gray-700">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Welcome to fullcircle™ ("fullcircle," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of the fullcircle mobile application and related services (collectively, the "Service").
              </p>
              <p>
                By creating an account or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.
              </p>
              <p>
                <strong className="font-semibold">Contact Information:</strong><br />
                • Email: hello@joinfullcircle.app<br />
                • Address: 1711 Oregon St, Berkeley, CA 94703
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Eligibility</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                You must be at least 18 years old to create an account and use fullcircle. By using the Service, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>You are at least 18 years of age</li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>You are not prohibited from using the Service under applicable laws</li>
                <li>You have not been previously removed from the Service for violations of these Terms</li>
                <li>You will comply with these Terms and all applicable local, state, national, and international laws</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Account Registration and Security</h2>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">3.1 Account Creation</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                To use fullcircle, you must create an account by providing accurate, current, and complete information. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide truthful and accurate information about yourself</li>
                <li>Maintain and update your information to keep it accurate and current</li>
                <li>Maintain the security and confidentiality of your account credentials</li>
                <li>Notify us immediately of any unauthorized access to your account</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">3.2 Account Authentication</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may offer various authentication methods, including third-party OAuth providers. You are responsible for maintaining the security of any credentials used to access your account.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">3.3 One Account Per Person</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You may only maintain one account at a time. Creating multiple accounts may result in termination of all your accounts.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. User Conduct</h2>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">4.1 Community Standards</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                fullcircle is built for individuals practicing meditation, yoga, healing journeys, reiki, sound healing, plant medicine, and other spiritual practices. We expect all users to maintain the integrity and safety of our community. You agree NOT to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Harass, bully, stalk, intimidate, threaten, or abuse any person</li>
                <li>Post violent, graphic, sexually explicit, or otherwise objectionable content</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                <li>Solicit money or financial information from other users</li>
                <li>Use the Service for any commercial purpose without our written permission</li>
                <li>Promote or facilitate prostitution, human trafficking, or any illegal activities</li>
                <li>Post content that infringes on intellectual property rights of others</li>
                <li>Spam, solicit, or contact users for purposes outside the intended use of the Service</li>
                <li>Use automated systems (bots, scripts, etc.) to access or interact with the Service</li>
                <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
                <li>Collect or harvest information about other users without their consent</li>
                <li>Post false, misleading, or deceptive content</li>
                <li>Discriminate against or demean any individual or group based on race, ethnicity, national origin, religion, gender, sexual orientation, disability, or any other protected characteristic</li>
                <li>Share content that promotes violence, self-harm, or dangerous activities</li>
                <li>Share another person's private information without consent</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">4.2 Content Guidelines</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                All content you post, upload, or share through the Service, including photos, videos, messages, and profile information, must:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Be appropriate for a diverse, respectful community</li>
                <li>Not contain nudity or sexually explicit material</li>
                <li>Not depict or promote illegal drug use (while we support discussions of plant medicine in therapeutic contexts, we do not permit content promoting illegal activities)</li>
                <li>Not infringe on others' rights or violate any laws</li>
                <li>Be your own original content or content you have permission to use</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">4.3 Events and Gatherings</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                The Sanctuary section allows users to discover and attend spiritual events and gatherings. When posting or attending events, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate information about events</li>
                <li>Respect the practices and beliefs of others</li>
                <li>Maintain appropriate conduct at in-person gatherings</li>
                <li>Not use events for commercial solicitation without permission</li>
                <li>Report any safety concerns to fullcircle immediately</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. User Content</h2>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">5.1 Your Content</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You retain ownership of all content you submit to fullcircle ("Your Content"). However, by posting Your Content, you grant fullcircle a worldwide, non-exclusive, royalty-free, transferable, sublicensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display Your Content in connection with operating and providing the Service.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">5.2 Content Monitoring</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              While we do not pre-screen content, we reserve the right (but have no obligation) to monitor, review, and remove any content that violates these Terms or is otherwise objectionable, at our sole discretion.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">5.3 Reporting Content</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you encounter content that violates these Terms, please report it through the in-app reporting feature or by contacting hello@joinfullcircle.app.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">5.4 Content Removal</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may remove any content at any time, for any reason, without prior notice. You are responsible for maintaining your own copies of Your Content.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. In-App Purchases</h2>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">6.1 Virtual Items</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                fullcircle offers in-app purchases of virtual items, including but not limited to Lotus Flowers and Radiance. These virtual items:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Have no monetary value outside the Service</li>
                <li>Cannot be exchanged for cash or real-world value</li>
                <li>Are non-transferable and non-refundable except as required by law</li>
                <li>May be used only within the Service and according to their intended purpose</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">6.2 fullcircle+ and Premium Features</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                We may offer subscription services ("fullcircle+") or other premium features that provide enhanced functionality. Subscription terms include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Subscriptions automatically renew unless canceled</li>
                <li>You will be charged the then-current subscription price at each renewal</li>
                <li>You may cancel at any time through your device's subscription settings</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>No refunds for partial subscription periods</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">6.3 Payment Processing</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All purchases are processed through your device's app store (Apple App Store or Google Play Store). Payment terms, refund policies, and billing disputes are subject to the app store's policies in addition to these Terms.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">6.4 Price Changes</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify pricing for any in-app purchases or subscriptions at any time. Price changes for existing subscriptions will be communicated in advance and take effect at the next renewal period.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Privacy and Data</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your privacy is important to us. Our collection and use of your personal information is governed by our{" "}
              <Link href="/privacy" className="text-amber-700 dark:text-amber-500 hover:underline font-semibold">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference. By using the Service, you consent to our collection and use of your information as described in the Privacy Policy.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Matching and Connections</h2>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">8.1 No Guarantees</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              fullcircle provides a platform for users to connect with others who share similar spiritual practices and interests. We do not guarantee that you will meet any particular person or achieve any particular outcome from using the Service.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">8.2 User Responsibility</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You are solely responsible for your interactions with other users. fullcircle does not conduct background checks on users and makes no representations or warranties about the conduct, identity, intentions, legitimacy, or veracity of users.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">8.3 Safety</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Please exercise caution and common sense when meeting people in person. We recommend:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Meeting in public places for initial meetings</li>
                <li>Informing a friend or family member of your plans</li>
                <li>Trusting your instincts</li>
                <li>Reporting suspicious behavior immediately</li>
              </ul>
              <p>
                fullcircle is not responsible for the conduct of users on or off the Service.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Intellectual Property</h2>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">9.1 fullcircle Property</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Service, including its design, features, functionality, text, graphics, logos, and software, is owned by fullcircle and is protected by copyright, trademark, and other intellectual property laws. The fullcircle name and logo are trademarks of fullcircle.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">9.2 Limited License</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for personal, non-commercial purposes, subject to these Terms.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">9.3 Restrictions</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>You may not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Copy, modify, or create derivative works of the Service</li>
                <li>Reverse engineer, decompile, or disassemble any aspect of the Service</li>
                <li>Remove or alter any copyright, trademark, or proprietary notices</li>
                <li>Use the Service for any unlawful purpose</li>
              </ul>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Third-Party Services</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Service may contain links to or integrate with third-party websites, services, or content. fullcircle is not responsible for and does not endorse any third-party services. Your use of third-party services is at your own risk and subject to their terms and policies.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Termination</h2>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">11.1 Termination by You</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You may terminate your account at any time by following the account deletion process in the app or by contacting us at hello@joinfullcircle.app.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">11.2 Termination by Us</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                We reserve the right to suspend or terminate your account at any time, with or without notice, for any reason, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Violation of these Terms</li>
                <li>Conduct that is harmful to other users or to fullcircle</li>
                <li>Request by law enforcement or government agencies</li>
                <li>Unexpected technical or security issues</li>
                <li>Extended periods of inactivity</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">11.3 Effect of Termination</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>Upon termination:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your right to access and use the Service immediately ceases</li>
                <li>We may delete your account and all associated data</li>
                <li>You will not be entitled to any refunds of fees or unused virtual items</li>
                <li>Provisions of these Terms that should survive termination will remain in effect</li>
              </ul>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Disclaimers</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="font-semibold uppercase">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="font-semibold">FULLCIRCLE DOES NOT WARRANT THAT:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The Service will be uninterrupted, secure, or error-free</li>
                <li>Any defects or errors will be corrected</li>
                <li>The Service will meet your requirements</li>
                <li>The results obtained from the Service will be accurate or reliable</li>
              </ul>
              <p className="font-semibold uppercase">
                YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. NO ADVICE OR INFORMATION OBTAINED FROM FULLCIRCLE OR THROUGH THE SERVICE CREATES ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Limitation of Liability</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="font-semibold uppercase">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, FULLCIRCLE, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-1 uppercase">
                <li>LOSS OF PROFITS, DATA, USE, OR GOODWILL</li>
                <li>PERSONAL INJURY OR PROPERTY DAMAGE</li>
                <li>EMOTIONAL DISTRESS</li>
                <li>SERVICE INTERRUPTION</li>
                <li>COMPUTER FAILURE OR MALFUNCTION</li>
              </ul>
              <p className="font-semibold uppercase">
                THIS LIMITATION APPLIES REGARDLESS OF THE LEGAL THEORY (CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE) AND WHETHER OR NOT FULLCIRCLE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p className="font-semibold uppercase">
                IN JURISDICTIONS THAT DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, FULLCIRCLE'S LIABILITY SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.
              </p>
              <p className="font-semibold uppercase">
                IF YOU HAVE A DISPUTE WITH ANOTHER USER, YOU RELEASE FULLCIRCLE FROM ANY CLAIMS, DEMANDS, AND DAMAGES ARISING OUT OF OR IN CONNECTION WITH SUCH DISPUTE.
              </p>
              <p className="font-semibold uppercase">
                TO THE EXTENT PERMITTED BY LAW, FULLCIRCLE'S TOTAL LIABILITY FOR ANY CLAIMS UNDER THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU PAID TO FULLCIRCLE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Indemnification</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                You agree to indemnify, defend, and hold harmless fullcircle, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another person or entity</li>
                <li>Your Content</li>
              </ul>
            </div>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. Dispute Resolution</h2>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">15.1 Governing Law</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">15.2 Arbitration</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Any dispute, claim, or controversy arising out of or relating to these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Berkeley, California, unless otherwise agreed by the parties.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">15.3 Exceptions to Arbitration</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Either party may seek injunctive or equitable relief in court to prevent the actual or threatened infringement, misappropriation, or violation of intellectual property rights.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">15.4 Class Action Waiver</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-semibold uppercase">
              You agree that any arbitration or proceeding shall be limited to the dispute between you and fullcircle individually. TO THE FULLEST EXTENT PERMITTED BY LAW, YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">15.5 Venue</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To the extent arbitration does not apply, you agree that any legal action shall be brought in the state or federal courts located in Alameda County, California, and you consent to the exclusive jurisdiction of such courts.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">16. Changes to Terms</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>We reserve the right to modify these Terms at any time. We will notify you of material changes by:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Posting a notice in the app</li>
                <li>Sending an email to the address associated with your account</li>
                <li>Updating the "Last Updated" date at the top of these Terms</li>
              </ul>
              <p>
                Your continued use of the Service after changes become effective constitutes acceptance of the modified Terms. If you do not agree to the modified Terms, you must stop using the Service.
              </p>
            </div>
          </section>

          {/* Section 17 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">17. General Provisions</h2>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">17.1 Entire Agreement</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and fullcircle regarding the Service and supersede all prior agreements and understandings.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">17.2 Severability</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If any provision of these Terms is found to be invalid or unenforceable, that provision shall be enforced to the maximum extent possible, and the remaining provisions shall remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">17.3 Waiver</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              No waiver of any provision of these Terms shall be deemed a further or continuing waiver of that provision or any other provision.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">17.4 Assignment</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms at any time without notice.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">17.5 No Agency</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Nothing in these Terms creates any agency, partnership, joint venture, or employment relationship between you and fullcircle.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">17.6 Force Majeure</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              fullcircle shall not be liable for any delay or failure to perform resulting from causes beyond its reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">17.7 Survival</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Provisions of these Terms that by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>

            <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-500 mb-3 mt-4">17.8 Language</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms were prepared in English. Any translations are provided for convenience only. In the event of any conflict between the English version and any translation, the English version shall prevail.
            </p>
          </section>

          {/* Section 18 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">18. Contact Us</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                If you have any questions, concerns, or feedback about these Terms or the Service, please contact us:
              </p>
              <p>
                • Email: <a href="mailto:hello@joinfullcircle.app" className="text-amber-700 dark:text-amber-500 hover:underline">hello@joinfullcircle.app</a><br />
                • Address: 1711 Oregon St, Berkeley, CA 94703
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 italic">
              By using fullcircle, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 text-center">
          <Link
            href="/privacy"
            className="inline-block text-amber-700 dark:text-amber-500 hover:underline font-semibold"
          >
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
