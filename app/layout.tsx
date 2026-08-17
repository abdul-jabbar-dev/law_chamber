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
  title: "Legal Advocare Bureau-LAB | Expert Legal Services & Practice",
  description: "Expert Legal Guidance and Strategic Representation for Clients in Bangladesh and Globally.",
  openGraph: {
    title: "Legal Advocare Bureau-LAB | Expert Legal Services",
    description: "Expert Legal Guidance and Strategic Representation for Clients in Bangladesh and Globally.",
    url: "https://yourlawfirm.com",
    siteName: "Legal Advocare Bureau-LAB",
    images: [
      {
        url: "https://yourlawfirm.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Advocare Bureau-LAB Premium Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Advocare Bureau-LAB | Expert Legal Services",
    description: "Expert Legal Guidance and Strategic Representation for Clients in Bangladesh and Globally.",
    images: ["https://yourlawfirm.com/og-image.jpg"],
  },
};

import FloatingWhatsApp from "@/src/components/common/FloatingWhatsApp";
import { AppointmentProvider } from "@/src/context/AppointmentContext";
import { Toaster } from "sonner";

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
          <Toaster position="bottom-right" richColors />
        </AppointmentProvider>
      </body>
    </html>
  );
}
