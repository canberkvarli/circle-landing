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
      <body className={`${inter.className} ${philosopher.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
