"use client"
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Components/Navbar";
import Footer from "@/components/Components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const excludedPaths = ['/organization','/organization/dashboard'];

  const shouldHideNavAndFooter = excludedPaths.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen w-full antialiased bg-zinc-800`}
      >
        {!shouldHideNavAndFooter && <Navbar />}
        <div className={` ${shouldHideNavAndFooter ? '' :' py-[9vh]'} bg-zinc-800`}> 
          {children}
        </div>
        {!shouldHideNavAndFooter && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
