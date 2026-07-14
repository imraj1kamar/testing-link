

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Helper function: Agar home page par hain toh sirf "#hash", warna "/#hash"
  const getHref = (hash: string) => {
    return pathname === "/" ? hash : `/${hash}`;
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      {/* Container: Mobile mein space-x kam, desktop mein zyada */}
      <div className="flex items-center space-x-3 md:space-x-8 lg:space-x-10 px-6 md:px-10 py-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-[9px] md:text-xs font-light tracking-[0.1em] md:tracking-[0.2em] shadow-2xl text-white">
        
        {/* Navigation Links replaced with Next.js <Link> */}
        <Link href={getHref("#home")} className="hover:text-yellow-400 transition-colors">HOME</Link>
        <Link href={getHref("#about")} className="hover:text-yellow-400 transition-colors">ABOUT</Link>
        <Link href={getHref("#stay")} className="hover:text-yellow-400 transition-colors">STAY</Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
          <Link href={getHref("#dining")} className="hover:text-yellow-400 transition-colors">DINING</Link>
          <Link href={getHref("#gallery")} className="hover:text-yellow-400 transition-colors">GALLERY</Link>
          <Link href={getHref("#contact")} className="hover:text-yellow-400 transition-colors">CONTACT</Link>
          
          {/* 🔥 HIGHLIGHTED DESKTOP BROCHURE BUTTON (Kept as <a> for download) */}
          <a 
            href="/broucher/DurgBhumi_Inquiry_Brochure.pdf" 
            download="DurgBhumi_Inquiry_Brochure.pdf" 
            className="hover:text-yellow-400 transition-colors" >
            BROCHURE
          </a>
        </div>
        
        {/* Mobile ke liye sirf important links */}
        <Link href={getHref("#contact")} className="md:hidden hover:text-yellow-400 transition-colors">CONTACT</Link>
        
        {/* 🔥 HIGHLIGHTED MOBILE BROCHURE BUTTON (Kept as <a> for download) */}
        <a 
          href="/broucher/DurgBhumi_Inquiry_Brochure.pdf" 
          download="DurgBhumi_Inquiry_Brochure.pdf" 
          className="md:hidden hover:text-yellow-400 transition-colors"
        >
          BROCHURE
        </a>
      </div>
    </motion.nav>
  );
}