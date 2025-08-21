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
  title: "Circle - Meaningful Connections",
  description:
    "Where mindful souls unite. Connect with fellow seekers who practice meditation, yoga, energy healing, and embrace mindful living.",
  keywords:
    "mindful dating, meaningful relationships, meditation, yoga, energy healing, authentic connections, full circle app",
  authors: [{ name: "Full Circle" }],
  creator: "Full Circle",
  publisher: "Full Circle",
  robots: "index, follow",
  alternates: {
    canonical: "https://joinfullcircle.app",
  },
  openGraph: {
    title: "Circle - Meaningful Connections",
    description: "Where mindful souls unite. Connect with fellow seekers who practice meditation, yoga, energy healing, and embrace mindful living.",
    url: "https://joinfullcircle.app",
    siteName: "Circle",
    images: [
      {
        url: "https://joinfullcircle.app/lightOuroboros.png",
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
    title: "Circle - Meaningful Connections",
    description: "Where mindful souls unite. Connect with fellow seekers who practice meditation, yoga, energy healing, and embrace mindful living.",
    images: ["https://joinfullcircle.app/lightOuroboros.png"],
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

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
        
        {/* Additional social media meta tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image:alt" content="Circle - Meaningful Connections" />
      </head>
      <body className={`${inter.className} ${philosopher.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}