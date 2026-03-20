import type { Metadata } from "next";
import {
  Geist, Geist_Mono, Instrument_Sans, Instrument_Serif,
  League_Gothic, Inter_Tight, Jacquard_12,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const leagueGothic = League_Gothic({
  variable: "--font-league-gothic",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const jacquard12 = Jacquard_12({
  variable: "--font-jacquard-12",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Nate Shipps",
  description: "Filmmaker. Director. Storyteller.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} ${leagueGothic.variable} ${instrumentSerif.variable} ${interTight.variable} ${jacquard12.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden">
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
