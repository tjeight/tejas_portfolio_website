import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

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

const editorialSerif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fbfbf9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Tejas Jagdale — Backend & AI Engineer",
  description:
    "Backend & AI Engineer building scalable backend systems, AI agents, and intelligent products with Python, FastAPI, PostgreSQL, Redis, and LangGraph.",
  keywords: [
    "Tejas Jagdale",
    "Backend Engineer",
    "AI Engineer",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "Redis",
    "LangGraph",
    "AI Agents",
    "Distributed Systems",
    "Docker",
    "AWS"
  ],
  authors: [{ name: "Tejas Jagdale", url: "https://github.com/tejas-jagdale" }],
  creator: "Tejas Jagdale",
  openGraph: {
    title: "Tejas Jagdale — Backend & AI Engineer",
    description:
      "Building scalable backend systems, AI agents, and intelligent products. Python · FastAPI · PostgreSQL · Redis · LangGraph.",
    url: "https://tejasjagdale.dev",
    siteName: "Tejas Jagdale Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejas Jagdale — Backend & AI Engineer",
    description:
      "Building scalable backend systems, AI agents, and intelligent products.",
    creator: "@tejasjagdale",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${editorialSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fbfbf9] text-[#141416]">
        {children}
      </body>
    </html>
  );
}
