import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SoroStream",
  description: "Real-time USDC payment streaming on Stellar Soroban",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
