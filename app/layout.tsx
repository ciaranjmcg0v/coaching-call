import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hiyaitsciaran.com"),
  title: {
    template: "%s | Success Coaching with Ciaran",
    default: "Success Coaching with Ciaran",
  },
  description:
    "Join Ciaran for an insightful coaching call on Practical UI/UX: Building Accessible & Performant Interfaces",
  keywords: [
    "UI/UX",
    "Accessibility",
    "Web Performance",
    "Coaching",
    "Web Development",
  ],
  authors: [{ name: "Ciaran" }],
  creator: "Ciaran",
  publisher: "Success Coaching",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="/favicon.ico" />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
