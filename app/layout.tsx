import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tejasjagdale.dev"),
  title: "Tejas Jagdale — Backend Developer & AI Engineer",
  description:
    "Portfolio of Tejas Jagdale — Backend Developer building AI systems, scalable APIs, and production infrastructure. Specialized in Python, FastAPI, LangGraph, PostgreSQL, and distributed architectures.",
  keywords: [
    "Tejas Jagdale",
    "Backend Developer",
    "AI Engineer",
    "FastAPI",
    "Python",
    "LangGraph",
    "Distributed Systems",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Pune Developer"
  ],
  authors: [{ name: "Tejas Jagdale", url: "https://github.com/tejasjagdale" }],
  creator: "Tejas Jagdale",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tejasjagdale.dev",
    title: "Tejas Jagdale — Backend Developer & AI Engineer",
    description:
      "Portfolio of Tejas Jagdale — Backend Developer building AI systems, scalable APIs, and production infrastructure.",
    siteName: "Tejas Jagdale Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tejas Jagdale — Backend Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejas Jagdale — Backend Developer & AI Engineer",
    description:
      "Backend Developer & AI Engineer focused on fast APIs, multi-agent systems, and scalable cloud infrastructure.",
    creator: "@tejasjagdale",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#030712] text-gray-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
