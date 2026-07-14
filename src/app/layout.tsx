import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingEnquiry from "@/components/FloatingEnquiry";
import data from "@/data/resort-data.json";
import ScrollToTop from "@/components/ScrollToTop";
import GlobalFloatingActions from "@/components/GlobalFloatingActions"; 


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://durgbhumi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title:
    "DurgBhumi Resort | Luxury Heritage Stays in Velhe, Near Gunjavani dam gate",
  description:
    "Stay at DurgBhumi Resort—an upscale luxury resort in Velhe, Near Gunjavani dam gate. Immerse in heritage, nature, and premium hospitality. Book your getaway.",
  keywords: [
    "DurgBhumi Resort",
    "Luxury Resort",
    "Nature Resort",
    "Forest Resort",
    "Hotel",
    "Vacation Stay",
    "Weekend Getaway",
    "Luxury Rooms",
    "Resort Booking",
    "Wellness Retreat",
  ],
  authors: [{ name: "DurgBhumi Resort" }],
  creator: "DurgBhumi Resort",
  publisher: "DurgBhumi Resort",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title:
      "DurgBhumi Resort | Luxury Heritage Stays in Velhe, Near Gunjavani dam gate, Pune",
    description:
      "An upscale luxury resort in Velhe, Near Gunjavani dam gate, Pune—heritage, nature, and premium hospitality.",
    images: [
      {
        url: "/logo.png?v=1",
        width: 1200,
        height: 630,
        alt: "DurgBhumi Resort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "DurgBhumi Resort | Luxury Heritage Stays in Velhe, Near Gunjavani dam gate, Pune",
    description:
      "An upscale luxury resort in Velhe, Near Gunjavani dam gate, Pune—heritage, nature, and premium hospitality.",
    images: ["/logo.png?v=1"],
  },
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
        <body className={`${inter.variable} ${playfair.variable}`}>


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: data.resort.name,
              description: data.resort.description,
              priceRange: "₹₹₹",
              address: {
                "@type": "PostalAddress",
                streetAddress: data.resort.address,
                addressLocality: "Velhe",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              telephone: data.resort.phone.replace(/\s+\/\s+/g, ", ").trim(),
              email: data.resort.email,
              url: siteUrl,
              image: ["/images/logo/headlogo-main.png"],
              geo: {
                "@type": "GeoCoordinates",
                latitude: 18.29611587524414,
                longitude: 73.6214370727539,
              },
            }),
          }}
        />
        
 <div className="fixed inset-0 z-[-1]">
          <div className="absolute inset-0 bg-[#0B0E0C]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(197,168,112,0.05)_0%,_transparent_70%)]" />
          <div className="atmosphere-layer" />
        </div>
        
        <Preloader />
        <Navbar />

        {/* <main className="inset-0 bg-gradient-to-br from-[#013f16] via-[#09371a] to-[#0d1410] z-0">{children}</main> */}
        <main
  className="min-h-screen bg-gradient-to-br from-[#02542C] via-[#0B3F28] via-40% to-[#0D1410]"
>
  {children}
</main>
        
        <ScrollToTop />
        <Footer />
        <FloatingEnquiry />

           <GlobalFloatingActions 
          phone={data.resort.phone.split("/")[0]} 
        />

      </body>
    </html>
  );
}