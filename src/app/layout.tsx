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
  title: "Full Circle - Meaningful Connections",
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
    title: "Full Circle - Meaningful Connections",
    description: "Where mindful souls unite. Connect with fellow seekers who practice meditation, yoga, energy healing, and embrace mindful living.",
    url: "https://joinfullcircle.app",
    siteName: "Full Circle",
    images: [
      {
        url: "https://joinfullcircle.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Full Circle - Meaningful Connections",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Circle - Meaningful Connections",
    description: "Where mindful souls unite. Connect with fellow seekers who practice meditation, yoga, energy healing, and embrace mindful living.",
    images: ["https://joinfullcircle.app/og-image.jpg"],
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
        <link rel="icon" type="image/svg+xml" href="/assets/circle.svg" sizes="32x32 48x48 64x64 96x96 128x128 256x256" />
        <link rel="icon" type="image/svg+xml" href="/assets/circle.svg" sizes="any" />
      </head>
      <body className={`${inter.className} ${philosopher.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
