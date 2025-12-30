import type { Metadata } from "next";
import { Inter, Philosopher } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import Image from 'next/image';

const inter = Inter({ subsets: ["latin"] });
const philosopher = Philosopher({ 
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-philosopher"
});

export const metadata: Metadata = {
  title: "fullcircle™ • Wellness Community & Mindful Living | Join fullcircle",
  description:
    "Discover authentic connections through mindful dating. Join fullcircle, the premier app for conscious singles seeking meaningful relationships, meditation partners, and spiritual connections.",
  keywords:
    "mindful dating, meaningful relationships, meditation, yoga, energy healing, authentic connections, spiritual dating, conscious dating, wellness dating, mindfulness app, dating app, relationship app, spiritual community, meditation community, yoga community, energy healing, chakra alignment, spiritual growth, conscious living, authentic dating, mindful relationships, spiritual relationships, wellness relationships, meditation partners, yoga partners, spiritual partners, conscious community, mindful community, spiritual community, wellness community, dating for mindful people, dating for spiritual people, dating for wellness enthusiasts",
  authors: [{ name: "fullcircle" }],
  creator: "fullcircle",
  publisher: "fullcircle",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://joinfullcircle.app",
  },
  openGraph: {
    title: "fullcircle - Wellness Community & Mindful Living",
    description: "Discover authentic connections through mindful dating. Join fullcircle, the premier app for conscious singles seeking meaningful relationships, meditation partners, and spiritual connections.",
    url: "https://joinfullcircle.app",
    siteName: "fullcircle - Wellness Community App",
    images: [
      {
        url: "https://joinfullcircle.app/dark-logo.png",
        width: 1200,
        height: 630,
        alt: "fullcircle - Meaningful Connections",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "fullcircle - Wellness Community & Mindful Living",
    description: "Discover authentic connections through mindful dating. Join fullcircle, the premier app for conscious singles seeking meaningful relationships, meditation partners, and spiritual connections.",
    images: ["https://joinfullcircle.app/dark-logo.png"],
  },
  verification: {
    google: "kbGJtNuAjM6RnOIDFABALKpS30gdXSCGf-AaVOqzdN0",
  },
  category: "Dating & Relationships",
  classification: "Social Networking",
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

// Add dynamic segment config to force dynamic rendering
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add meta tags to prevent caching */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="fullcircle" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-partner-id" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "7829812";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
                <noscript>
          <Image height={1} width={1} style={{display: 'none'}} alt="" src="https://px.ads.linkedin.com/collect/?pid=7829812&fmt=gif" />
        </noscript>
        
        {/* Additional social media meta tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image:alt" content="fullcircle - Wellness Community App for Mindful Living" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "fullcircle - Wellness Community App",
              "description": "Discover authentic connections through mindful dating. Join fullcircle, the premier app for conscious singles seeking meaningful relationships, meditation partners, and spiritual connections.",
              "url": "https://joinfullcircle.app",
              "applicationCategory": "SocialNetworkingApplication",
              "operatingSystem": "iOS, Android, Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free to join waitlist"
              },
              "author": {
                "@type": "Organization",
                "name": "fullcircle"
              },
              "publisher": {
                "@type": "Organization",
                "name": "fullcircle"
              },
              "keywords": "mindful dating, spiritual dating, conscious dating, wellness dating, meditation, yoga, energy healing"
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${philosopher.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}