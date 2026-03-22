import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "YN — Portfolio & Developer",
  description: "B.Tech 2nd Year Student · Full-Stack Developer · Building high-performance web experiences.",
  keywords: ["Full-Stack Developer", "Next.js", "Portfolio", "React", "Tailwind CSS"],
  authors: [{ name: "YN" }],
  openGraph: {
    title: "YN — Portfolio & Developer",
    description: "B.Tech 2nd Year Student · Full-Stack Developer · Building high-performance web experiences.",
    url: "https://your-portfolio-url.com", // Replace with actual URL
    siteName: "YN Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YN — Portfolio & Developer",
    description: "B.Tech 2nd Year Student · Full-Stack Developer · Building high-performance web experiences.",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
