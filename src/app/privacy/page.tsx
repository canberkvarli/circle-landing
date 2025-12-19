import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | fullcircle™",
  description: "Read the fullcircle Privacy Policy. Learn how we collect, use, and protect your personal information when you use the fullcircle mobile application.",
  robots: "index, follow",
};

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-6 border border-blue-200 dark:border-blue-900/30">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-700 dark:text-blue-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-wide">
              fullcircle™ Privacy Policy
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Last Updated: {lastUpdated}
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-700 dark:border-blue-500 p-4 rounded-r-lg max-w-2xl">
              <p className="text-xs text-gray-700 dark:text-gray-300 italic">
                This Privacy Policy explains how we handle your personal information when you use the Service.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 space-y-8 border border-gray-200 dark:border-gray-700">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Welcome to fullcircle™ ("fullcircle," "we," "us," or "our"). We are committed to protecting your privacy and being transparent about how we collect, use, and share your information.
              </p>
              <p>
                This Privacy Policy explains how we handle your personal information when you use the fullcircle mobile application and related services (collectively, the "Service"). By using fullcircle, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
              <p>
                <strong className="font-semibold">Contact Information:</strong><br />
                • Email: hello@joinfullcircle.app<br />
                • Address: 1711 Oregon St, Berkeley, CA 94703
              </p>
            </div>
          </section>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-3 mt-4">1.1 Information You Provide Directly</h3>

            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <div>
                <p className="font-semibold mb-2">Account Information:</p>
                <p className="mb-2">When you create an account, we collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>First name and full name</li>
                  <li>Date of birth (month, day, year) and calculated age</li>
                  <li>Email address (required)</li>
                  <li>Phone number (country code, area code, number)</li>
                  <li>Gender identity (can select multiple)</li>
                  <li>Location information:
                    <ul className="list-circle pl-6 mt-1">
                      <li>City, region/state, country</li>
                      <li>Geographic coordinates (latitude/longitude) for distance-based matching</li>
                      <li>Detailed address components (street, postal code, formatted address)</li>
                    </ul>
                  </li>
                  <li>Profile photos (stored in Firebase Storage)</li>
                  <li>Bio and personal description</li>
                  <li>Height</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Spiritual Profile:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>What draws you spiritually (interests and values)</li>
                  <li>Spiritual practices you engage in (meditation, yoga, sound healing, reiki, etc.)</li>
                  <li>Healing modalities you're interested in or practice</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Match Preferences:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Preferred age range for matches (min/max)</li>
                  <li>Preferred height range (min/max)</li>
                  <li>Maximum distance for matches</li>
                  <li>Connection intent (romantic, friendship, or both)</li>
                  <li>Connection preferences and styles</li>
                  <li>Spiritual compatibility preferences (desired draws, practices, healing modalities)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Content You Create:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Messages sent to other users in private chats</li>
                  <li>Photos and videos you upload to your profile</li>
                  <li>Event posts and gatherings you create in the Sanctuary section</li>
                  <li>Comments on gatherings and replies to comments</li>
                  <li>Likes on affirmations, comments, replies, and activity feed posts</li>
                  <li>Reports and feedback you submit about other users</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Meditation & Wellness Tracking:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Meditation sessions (duration, type, start/end times)</li>
                  <li>Total meditation time and session count</li>
                  <li>Current meditation streak</li>
                  <li>Favorite meditation types</li>
                  <li>Bell sound preferences (start/end bells)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Sanctuary Interactions:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Gatherings/events you're interested in or attending</li>
                  <li>Invites you send or receive for gatherings</li>
                  <li>Comments and discussions on event posts</li>
                  <li>Activity feed interactions</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Legal Acceptance:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Timestamps of when you accepted Terms of Service and Privacy Policy</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Payment Information:</p>
                <p className="mb-2">When you make in-app purchases (Lotus Flowers, Radiance boosts, fullcircle+ subscription), payment is processed through Stripe. We store:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Purchase history (item type, quantity, price, date)</li>
                  <li>Stripe customer ID and payment intent IDs</li>
                  <li>Transaction status (succeeded, processing, failed)</li>
                </ul>
                <p className="mt-2">
                  Stripe collects and processes your payment card information according to their privacy policy. We do not directly see or store your full credit card numbers.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-3 mt-6">1.2 Information Collected Automatically</h3>

            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <div>
                <p className="font-semibold mb-2">Usage Information:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Features you use and actions you take</li>
                  <li>Content you view and interact with</li>
                  <li>Matches, likes, and passes</li>
                  <li>Daily like limits and usage</li>
                  <li>Time, frequency, and duration of your activities</li>
                  <li>Events you view, mark as interested, or attend</li>
                  <li>Affirmations you like</li>
                  <li>When you're actively using the app ("last active" timestamps)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Matching Activity:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Users you like, pass on (dislike), match with</li>
                  <li>Users you report or unmatch</li>
                  <li>Match history and conversation activity</li>
                  <li>Hidden profile fields (fields you choose not to display)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Device Information:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Device type and model</li>
                  <li>Operating system and version</li>
                  <li>Unique device identifiers</li>
                  <li>Mobile network information</li>
                  <li>IP address</li>
                  <li>Push notification tokens (for sending notifications)</li>
                  <li>Notification permission status</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Location Information:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Approximate location based on IP address</li>
                  <li>Precise location (only if you grant permission in your device settings)</li>
                  <li>Location is used to show you matches and events near you</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Account Settings:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Account pause status</li>
                  <li>Incognito mode status (hide from activity feed)</li>
                  <li>Last active status visibility settings</li>
                  <li>Vibration preferences</li>
                  <li>Push notification preferences (which notifications you want to receive)</li>
                  <li>Connected account status (Google, Apple)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Verification Data:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Selfie verification status (verified, failed, not verified)</li>
                  <li>Verification attempt timestamps</li>
                  <li>Reasons for failed verification (if applicable)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">In-App Purchase Data:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Number of Lotus Flowers owned</li>
                  <li>Active Radiance boosts and expiration times</li>
                  <li>Purchase history for virtual items</li>
                  <li>Subscription status (active, canceled, past due)</li>
                  <li>Subscription period dates</li>
                  <li>Whether subscription is set to auto-renew or cancel</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Log and Analytics Data:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>App crashes and performance data</li>
                  <li>Diagnostic and usage analytics via Firebase</li>
                  <li>Error reports and debugging information</li>
                  <li>Feature usage patterns</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-3 mt-6">1.3 Information from Third Parties</h3>

            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <div>
                <p className="font-semibold mb-2">Authentication Providers:</p>
                <p className="mb-2">If you sign in using third-party authentication (such as Google, Apple, or other OAuth providers), we may receive:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Profile picture</li>
                  <li>Other information you authorize the provider to share</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Social Media:</p>
                <p>
                  If you choose to connect your social media accounts, we may receive information from those platforms in accordance with your privacy settings on those platforms.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">Waitlist:</p>
                <p className="mb-2">If you joined our waitlist before launch, we collected:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>First and last name</li>
                  <li>Email address</li>
                  <li>Phone number (optional)</li>
                  <li>How you heard about us</li>
                  <li>Additional comments</li>
                  <li>Waitlist status and invite status</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>We use the information we collect to:</p>

              <div>
                <p className="font-semibold mb-2">Provide and Improve the Service:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Create and maintain your account</li>
                  <li>Facilitate matches and connections with other users</li>
                  <li>Display your profile to potential matches</li>
                  <li>Enable messaging and communication features</li>
                  <li>Show you profiles of other users based on preferences and compatibility</li>
                  <li>Display events and gatherings in the Sanctuary section</li>
                  <li>Track your meditation practice and wellness journey</li>
                  <li>Show you activity feeds and user interactions</li>
                  <li>Process in-app purchases and manage subscriptions (via Stripe)</li>
                  <li>Verify your identity (age 18+ requirement and optional selfie verification)</li>
                  <li>Distribute weekly Lotus Flowers to eligible users</li>
                  <li>Manage Radiance boosts and premium features</li>
                  <li>Enable account settings (pause, incognito mode, notification preferences)</li>
                  <li>Provide customer support and respond to your inquiries</li>
                  <li>Improve our matching algorithms and features</li>
                  <li>Develop new features and services</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Safety and Security:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Verify your identity and age (18+)</li>
                  <li>Detect and prevent fraud, spam, and abuse</li>
                  <li>Enforce our Terms of Service</li>
                  <li>Protect the rights and safety of our users</li>
                  <li>Respond to legal requests and prevent harm</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Communications:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Send you notifications about matches, messages, and app activity</li>
                  <li>Send service-related announcements and updates</li>
                  <li>Send promotional communications (you can opt out)</li>
                  <li>Respond to your questions and requests</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Analytics and Research:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Understand how users interact with the Service</li>
                  <li>Analyze trends and user behavior</li>
                  <li>Conduct research to improve user experience</li>
                  <li>Generate aggregate, de-identified statistics</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Share Your Information</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="font-semibold">We do not sell your personal information. We may share your information in the following circumstances:</p>

              <div>
                <p className="font-semibold mb-2">With Other Users:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Your profile information, photos, and bio are visible to other users</li>
                  <li>Your messages are visible to the recipients</li>
                  <li>Your event posts in the Sanctuary are visible to other users</li>
                  <li>Your activity and presence may be visible (e.g., "active now" status)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Service Providers:</p>
                <p className="mb-2">We use third-party service providers to help us operate the Service:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Cloud hosting and storage (Firebase/Google Cloud Platform)</li>
                  <li>Payment processing (Stripe)</li>
                  <li>Push notification delivery (Firebase Cloud Messaging)</li>
                  <li>Analytics providers</li>
                  <li>Customer support tools</li>
                </ul>
                <p className="mt-2">
                  These providers have access to your information only to perform tasks on our behalf and are obligated to protect it.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">Authentication Providers:</p>
                <p>
                  When you use OAuth sign-in, we interact with third-party authentication providers. These providers operate according to their own privacy policies.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">Legal Requirements:</p>
                <p className="mb-2">We may disclose your information if required to do so by law or in response to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Legal processes (subpoenas, court orders)</li>
                  <li>Government or regulatory requests</li>
                  <li>Enforcement of our Terms of Service</li>
                  <li>Protection of our rights, property, or safety</li>
                  <li>Investigation of fraud or security issues</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Business Transfers:</p>
                <p>
                  If fullcircle is involved in a merger, acquisition, sale of assets, or bankruptcy, your information may be transferred as part of that transaction. You will be notified via email or prominent notice in the app.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">With Your Consent:</p>
                <p>
                  We may share your information for other purposes with your explicit consent.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Your Privacy Rights and Choices</h2>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-3 mt-4">4.1 Access and Update Your Information</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can access and update your account information at any time through the app settings.
            </p>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-3 mt-4">4.2 Delete Your Account</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                You can delete your account at any time through the app settings or by contacting us at hello@joinfullcircle.app. When you delete your account:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your profile will be removed from the Service</li>
                <li>Your messages may remain visible to recipients (but will not identify you)</li>
                <li>Some information may be retained for legal or business purposes</li>
                <li>Backup copies may exist for up to 90 days</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-3 mt-4">4.3 Marketing Communications</h3>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>You can opt out of promotional emails by:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Following the unsubscribe link in the email</li>
                <li>Adjusting your notification settings in the app</li>
                <li>Contacting us at hello@joinfullcircle.app</li>
              </ul>
              <p>
                Note: You cannot opt out of service-related communications (e.g., account verification, security alerts).
              </p>
            </div>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-3 mt-4">4.4 Location Data</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can control location permissions through your device settings. Disabling location may limit some features.
            </p>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-3 mt-4">4.5 Push Notifications</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You can manage push notifications through your device settings.
            </p>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-3 mt-4">4.6 California Privacy Rights (CCPA)</h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>If you are a California resident, you have additional rights:</p>

              <div>
                <p className="font-semibold mb-2">Right to Know:</p>
                <p className="mb-2">You can request information about:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Categories of personal information we collect</li>
                  <li>Sources of personal information</li>
                  <li>Business purpose for collecting information</li>
                  <li>Categories of third parties we share information with</li>
                  <li>Specific pieces of personal information we have about you</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Right to Delete:</p>
                <p>You can request deletion of your personal information, subject to certain exceptions.</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Right to Opt-Out:</p>
                <p>You have the right to opt out of the "sale" of personal information. We do not sell your personal information.</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Right to Non-Discrimination:</p>
                <p>We will not discriminate against you for exercising your privacy rights.</p>
              </div>

              <div>
                <p className="font-semibold mb-2">How to Exercise Your Rights:</p>
                <p>
                  To exercise these rights, contact us at hello@joinfullcircle.app or through the in-app settings. We will verify your identity before processing your request.
                </p>
                <p className="mt-2">We will respond to verified requests within 45 days.</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-3 mt-4">4.7 European Privacy Rights (GDPR)</h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have additional rights:
              </p>

              <div>
                <p className="font-semibold mb-2">Legal Basis for Processing:</p>
                <p className="mb-2">We process your information based on:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Your consent (you can withdraw at any time)</li>
                  <li>Performance of our contract with you</li>
                  <li>Our legitimate interests in operating and improving the Service</li>
                  <li>Compliance with legal obligations</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Additional Rights:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Right to access your information</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to delete your information</li>
                  <li>Right to restrict or object to processing</li>
                  <li>Right to data portability</li>
                  <li>Right to withdraw consent</li>
                  <li>Right to lodge a complaint with a supervisory authority</li>
                </ul>
                <p className="mt-2">Contact us at hello@joinfullcircle.app to exercise these rights.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Retention</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>We retain your information for as long as necessary to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide the Service</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
              </ul>
              <p className="mt-3">When you delete your account:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Most information is deleted immediately</li>
                <li>Some information may be retained for up to 90 days in backups</li>
                <li>Information may be retained longer if required by law or for legitimate business purposes (fraud prevention, safety)</li>
                <li>Aggregate, de-identified data may be retained indefinitely</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Security</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                We take reasonable measures to protect your information from unauthorized access, use, or disclosure:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Data encryption in transit and at rest</li>
                <li>Secure cloud infrastructure (Firebase/Google Cloud Platform)</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication measures</li>
                <li>Monitoring for suspicious activity</li>
              </ul>
              <p className="mt-3">
                However, no method of transmission or storage is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Children's Privacy</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                fullcircle is only for users aged 18 and older. We do not knowingly collect information from anyone under 18. If we become aware that we have collected information from someone under 18, we will delete it immediately.
              </p>
              <p>
                If you believe we have collected information from someone under 18, please contact us at hello@joinfullcircle.app.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. International Data Transfers</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                fullcircle is based in the United States. If you access the Service from outside the United States, your information will be transferred to, stored, and processed in the United States.
              </p>
              <p>
                The United States may not have the same data protection laws as your country. By using the Service, you consent to the transfer of your information to the United States.
              </p>
              <p>
                For users in the EEA, UK, or Switzerland, we rely on standard contractual clauses or other appropriate safeguards for international transfers.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Third-Party Services and Links</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                The Service may contain links to third-party websites, services, or content. We are not responsible for the privacy practices of these third parties.
              </p>
              <p className="font-semibold">Third-Party Services We Use:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Firebase (Google Cloud Platform) - hosting, database (Firestore), storage, authentication, analytics, and cloud functions</li>
                <li>Stripe - payment processing for in-app purchases and subscriptions</li>
                <li>Authentication providers (Google, Apple) - OAuth sign-in</li>
                <li>Firebase Cloud Messaging - push notifications</li>
                <li>Analytics services - usage tracking and insights</li>
              </ul>
              <p className="mt-3">
                Each third-party service operates under its own privacy policy. We encourage you to review their policies.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Changes to This Privacy Policy</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>We may update this Privacy Policy from time to time. We will notify you of material changes by:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Posting a notice in the app</li>
                <li>Sending an email to the address associated with your account</li>
                <li>Updating the "Last Updated" date at the top of this policy</li>
              </ul>
              <p className="mt-3">
                Your continued use of the Service after changes become effective constitutes acceptance of the updated Privacy Policy.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Data Protection Officer</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have questions about how we handle your information, you can contact our data privacy team at hello@joinfullcircle.app.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Contact Us</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <p>
                <strong className="font-semibold">Email:</strong>{" "}
                <a href="mailto:hello@joinfullcircle.app" className="text-blue-700 dark:text-blue-500 hover:underline">
                  hello@joinfullcircle.app
                </a>
              </p>
              <p>
                <strong className="font-semibold">Mail:</strong><br />
                fullcircle<br />
                1711 Oregon St<br />
                Berkeley, CA 94703
              </p>
              <p>
                We will respond to your inquiry as soon as possible, typically within 30 days.
              </p>
            </div>
          </section>

          {/* Summary Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Summary of Key Points</h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              <div>
                <p className="font-semibold">What information do we collect?</p>
                <p>We collect information you provide (profile, photos, messages), information collected automatically (usage, device, location), and information from third parties (OAuth providers).</p>
              </div>
              <div>
                <p className="font-semibold">How do we use your information?</p>
                <p>To provide the Service, facilitate matches, improve features, ensure safety, and communicate with you.</p>
              </div>
              <div>
                <p className="font-semibold">Do we share your information?</p>
                <p>We share with other users (as part of the Service), service providers, and as required by law. We do not sell your information.</p>
              </div>
              <div>
                <p className="font-semibold">What are your rights?</p>
                <p>You can access, update, and delete your information. California and European users have additional rights.</p>
              </div>
              <div>
                <p className="font-semibold">How do we protect your information?</p>
                <p>We use encryption, secure infrastructure, and access controls, though no system is 100% secure.</p>
              </div>
              <div>
                <p className="font-semibold">How can you contact us?</p>
                <p>Email us at hello@joinfullcircle.app with any questions or requests.</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 italic">
              By using fullcircle, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 text-center">
          <Link
            href="/terms"
            className="inline-block text-blue-700 dark:text-blue-500 hover:underline font-semibold"
          >
            View Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
