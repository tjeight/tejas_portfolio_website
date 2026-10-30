import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { site, ui } from "@/lib/data";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.website),
  title: {
    default: site.seo.title,
    template: site.seo.titleTemplate,
  },
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.website }],
  creator: site.name,
  keywords: site.seo.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.seo.locale,
    url: site.website,
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070908",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(geist.variable, instrumentSerif.variable, jetbrainsMono.variable)}
    >
      <body>
        <a className="skip-link" href="#main">
          {ui.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
