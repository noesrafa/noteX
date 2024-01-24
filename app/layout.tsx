import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexProviderClient from "@/components/providers/convex-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // title: "Workspace — By ",
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
      <body className={inter.className}>
        <ConvexProviderClient>{children}</ConvexProviderClient>
      </body>
    </html>
  );
}
