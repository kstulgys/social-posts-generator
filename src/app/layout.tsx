import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://social-posts-generator.vercel.app"),
  title: "Social Media Post Generator",
  description: "Generate engaging social media posts for your products with AI",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Social Media Post Generator",
    description:
      "Generate engaging social media posts for your products with AI",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Social Media Post Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Post Generator",
    description:
      "Generate engaging social media posts for your products with AI",
    images: ["/image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body style={{ background: "#09090f", color: "#ffffff" }}>
        {/* Ambient background glows */}
        <div className="ambient-glow ambient-glow-purple" />
        <div className="ambient-glow ambient-glow-pink" />
        <div className="ambient-glow ambient-glow-orange" />

        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
