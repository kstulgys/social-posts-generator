import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media Post Generator",
  description: "Generate engaging social media posts for your products with AI",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className} style={{ background: "#09090f", color: "#ffffff" }}>
        {/* Ambient background glows */}
        <div className="ambient-glow ambient-glow-purple" />
        <div className="ambient-glow ambient-glow-pink" />
        <div className="ambient-glow ambient-glow-orange" />

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
