"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  className?: string; // 🔥 ADDED: Custom class prop
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  description, 
  // 🔥 FIX: Default class set kar di, agar pass nahi hui toh ye apply hogi
  className
}: SectionHeaderProps) {
  
  // Agar teeno missing hain toh render mat karo
  if (!title && !subtitle && !description) return null;

  return (
   <>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A870]/50 to-transparent mx-auto mt-0 mb-4" />

    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className={className} 
    >
    
      {title && (
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif gold-text-gradient tracking-wide drop-shadow-md mb-6">
          {title}
        </h2>
      )}
        {subtitle && (
          <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#C5A870]/40" />
              <p className="text-[10px] md:text-xs text-[#C5A870] tracking-[0.45em] uppercase font-light">
                {subtitle}
              </p>
              <div className="w-12 h-[1px] bg-[#C5A870]/40" />
            </div>
      )}


      {description && (
        <p className="text-sm md:text-base text-[#AFAAA0] font-light leading-relaxed">
          {description}
        </p>
      )}
    </motion.div></>
  );
}