import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Law Chamber | Services & Legal Practice",
  description: "Expert Legal Guidance and Strategic Representation for Clients in Bangladesh and Globally.",
};

import FloatingWhatsApp from "@/src/components/common/FloatingWhatsApp";
import { AppointmentProvider } from "@/src/context/AppointmentContext";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"> 
        <AppointmentProvider>
          {children}
          <FloatingWhatsApp />
        </AppointmentProvider>
      </body>
    </html>
  );
}
