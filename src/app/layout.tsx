import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoroStream",
  description: "Real-time USDC payment streaming on Stellar Soroban",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">{children}</body>
    </html>
  );
}
