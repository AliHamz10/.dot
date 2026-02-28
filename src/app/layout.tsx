import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: ".dot | Vertical AI Solutions",
  description:
    "We build AI-native SaaS products for specific industries. No generic tools. Pure vertical expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${inter.variable} bg-bgPrimary font-sans text-textPrimary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
