import type { Metadata } from "next";
import { Inter, Philosopher } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });
const philosopher = Philosopher({ 
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-philosopher"
});

export const metadata: Metadata = {
  title: "Circle - Mindful Dating & Meaningful Connections | Join Full Circle",
  description:
    "Discover authentic connections through mindful dating. Join Circle, the premier app for conscious singles seeking meaningful relationships, meditation partners, and spiritual connections.",
  keywords:
    "mindful dating, meaningful relationships, meditation, yoga, energy healing, authentic connections, spiritual dating, conscious dating, wellness dating, mindfulness app, dating app, relationship app, spiritual community, meditation community, yoga community, energy healing, chakra alignment, spiritual growth, conscious living, authentic dating, mindful relationships, spiritual relationships, wellness relationships, meditation partners, yoga partners, spiritual partners, conscious community, mindful community, spiritual community, wellness community, dating for mindful people, dating for spiritual people, dating for wellness enthusiasts",
  authors: [{ name: "Full Circle" }],
  creator: "Full Circle",
  publisher: "Full Circle",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "https://joinfullcircle.app",
  },
  openGraph: {
    title: "Circle - Mindful Dating & Meaningful Connections",
    description: "Discover authentic connections through mindful dating. Join Circle, the premier app for conscious singles seeking meaningful relationships, meditation partners, and spiritual connections.",
    url: "https://joinfullcircle.app",
    siteName: "Circle - Mindful Dating App",
    images: [
      {
        url: "https://joinfullcircle.app/dark-logo.png",
        width: 1200,
        height: 630,
        alt: "Circle - Meaningful Connections",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Circle - Mindful Dating & Meaningful Connections",
    description: "Discover authentic connections through mindful dating. Join Circle, the premier app for conscious singles seeking meaningful relationships, meditation partners, and spiritual connections.",
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
        <meta name="apple-mobile-web-app-title" content="Circle" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* Additional social media meta tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image:alt" content="Circle - Mindful Dating App for Meaningful Connections" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Circle - Mindful Dating App",
              "description": "Discover authentic connections through mindful dating. Join Circle, the premier app for conscious singles seeking meaningful relationships, meditation partners, and spiritual connections.",
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
                "name": "Full Circle"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Full Circle"
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
      </body>
    </html>
  );
}