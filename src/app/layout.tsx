import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HuddleContextProvider from "@/context/HuddleContextProvider";

export const metadata: Metadata = {
  title: "Studio01",
  description: "Studio to record podcasts and videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HuddleContextProvider>{children}</HuddleContextProvider>
      </body>
    </html>
  );
}
