// layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";
import { MasterProvider } from "@/context/MasterContext";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clearvote",
  description: "Simplifying elections, Strengthening communities",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>  
        <MasterProvider>
          {children}
        </MasterProvider>
      </body>
    </html>
  );
}