// layout.tsx

import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { MasterProvider } from "@/context/MasterContext";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
const ibm_plex_sans = IBM_Plex_Sans({ 
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

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