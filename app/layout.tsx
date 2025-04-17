import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
 title: "Adonis's Portfolio",
 description: "Software Engineer, Mentor, and Consultant",
 icons: {
   icon: [
     { url: "/favicon.ico" },
     { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
     { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
   ],
   apple: [{ url: "/apple-touch-icon.png" }],
 },
};


export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
   <html lang="en">
     <head>
       <link rel="icon" href="/favicon.ico" sizes="any" />
     </head>
     <body className={inter.className}>{children}</body>
   </html>
 );
}
