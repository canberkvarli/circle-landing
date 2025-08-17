import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full Circle - Sacred Connections",
  description:
    "Where sacred souls unite. Connect with fellow seekers who practice meditation, yoga, energy healing, and embrace conscious living.",
  keywords:
    "spiritual dating, conscious relationships, meditation, yoga, energy healing, sacred connections, full circle app",
  authors: [{ name: "Full Circle Team" }],
  creator: "Full Circle",
  publisher: "Full Circle",
  robots: "index, follow",
  alternates: {
    canonical: "https://joinfullcircle.app",
  },
  openGraph: {
    title: "Full Circle - Sacred Connections",
    description: "Where sacred souls unite. Connect with fellow seekers who practice meditation, yoga, energy healing, and embrace conscious living.",
    url: "https://joinfullcircle.app",
    siteName: "Full Circle",
    images: [
      {
        url: "https://joinfullcircle.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Full Circle - Sacred Connections",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Circle - Sacred Connections",
    description: "Where sacred souls unite. Connect with fellow seekers who practice meditation, yoga, energy healing, and embrace conscious living.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Philosopher:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
