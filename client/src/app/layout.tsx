import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Gymniac | Track your fitness progress",
    template: "%s | Gymniac"
  },
  description: "Gymniac is a self-host option to track your progress at the gym.",
  twitter: {
    card: "summary_large_image"
  },
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <body
        className={`font-inter antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
