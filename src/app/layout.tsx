import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";

import { TopbarContextProviderWrapper } from "@/app/components/topbar/topbar";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chong Cheng Hock",
  description: "A full stack web app developer currently pursuing studies in data analytics and applied AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-primary">
      <body className={`${robotoCondensed.className} flex flex-col`}>
        <TopbarContextProviderWrapper>
          {children}
        </TopbarContextProviderWrapper>
      </body>
    </html>
  );
}
