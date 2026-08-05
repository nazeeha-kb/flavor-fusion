import { Geist, Geist_Mono, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/sessionWrapper";
import MainLayout from "@/components/layout/MainLayout";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for headlines — geometric, friendly, confident at large sizes.
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

// Body face — neutral and highly legible for copy and UI text.
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Flavor Fusion — Turn Your Ingredients Into Delicious Recipes",
  description:
    "Enter the ingredients you already have and let Flavor Fusion's AI generate personalized recipes in seconds.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${body.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`font-body antialiased`}
      >
        <SessionWrapper>
          <MainLayout children={children} />
        </SessionWrapper>
      </body>
    </html>
  );
}
