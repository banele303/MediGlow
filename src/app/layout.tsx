import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Exo_2 } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import FloatingActions from "@/components/FloatingActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

export const metadata: Metadata = {
  title: "MediGlow Aesthetics",
  description: "Simple, modern skin treatments that deliver visible results. Free consultations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${exo2.variable}`}>
      <body className={"antialiased bg-white text-gray-900"}>
        <Navigation />
        <main className="min-h-screen">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
  <FloatingActions />
        <footer className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
            <div>
              <Image
                src="/glow-skin-logo.png"
                alt="GlowSkin Logo"
                width={240}
                height={80}
                className="h-20 w-auto object-contain mb-3"
              />
              <p className="text-sm text-gray-600 mt-2">Free consultations. Personalized plans. Real results.</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>Contact: <span className="font-semibold">072 7389 214</span></p>
              <p>Email: <span className="font-semibold">bookings@mediglowaesthetics.co.za</span></p>
            </div>
            <div className="text-sm text-gray-600">
              <p>&copy; {new Date().getFullYear()} MediGlow Aesthetics. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
