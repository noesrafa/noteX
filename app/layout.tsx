import "./globals.css";
import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import ConvexProviderClient from "@/components/providers/convex-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--inter" });

const orbitron = Orbitron({ subsets: ["latin"], variable: "--orbitron" });

export const metadata: Metadata = {
  title: "NoteX",
  description: "Recreating Notion in Next.js",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable}`}>
        <ConvexProviderClient>
          <Toaster position="bottom-center" />
          {children}
        </ConvexProviderClient>
      </body>
    </html>
  );
}
