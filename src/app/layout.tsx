import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/env";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "我的博客",
    template: "%s | 我的博客",
  },
  description: "分享技术、思考和生活",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "我的博客",
    description: "分享技术、思考和生活",
    type: "website",
    locale: "zh_CN",
    siteName: "我的博客",
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "我的博客",
    description: "分享技术、思考和生活",
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
