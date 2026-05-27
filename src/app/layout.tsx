import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_JP, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "QQ | Quinto.Quinte — 池下のイタリアン複合型店舗",
    template: "%s | QQ Quinto.Quinte",
  },
  description:
    "名古屋・池下の路地裏にある、イタリア食材店「Gastronomia Quinto」とレストラン「Degusteria Quinte」が一体となった複合型店舗。日常の余白、5番目の場所をご提供します。",
  keywords: ["QQ", "Quinto", "Quinte", "イタリアン", "池下", "名古屋", "レストラン", "食材店"],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "QQ | Quinto.Quinte",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${notoSerifJP.variable} ${dmSans.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
