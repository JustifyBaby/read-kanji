import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "変な熟語ゲーム",
  description: "適当な漢字の並びに好きな読み方を付けよう！",
  icons: "./icon.svg",
  openGraph: {
    images: "./icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='ja'>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
