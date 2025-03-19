import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AppBar from "@/components/ui/appBar";
import { Providers } from "@/components/providers/provider";
import { Toaster } from "@/components/ui/sonner";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "nano Photo AI",
  description: "Generate Your Imaginations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <Providers>
              <div>
                <div>
                  <AppBar />
                </div>
                <div>
                {children}
                </div>
                <Toaster/>
              </div>
            </Providers>
        </body>
    </html>
  );
}
