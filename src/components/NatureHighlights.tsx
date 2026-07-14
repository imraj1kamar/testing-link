
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, Droplets, Leaf, ArrowUpRight, X } from "lucide-react";
import Image from "next/image"; // 🔥 ADDED: Next.js Image import
import natureData from "@/data/natureHighlights.json";
import SectionHeader from "@/reusebleComponents/SectionHeader";

// 🔥 FIX: Added TypeScript Interface to replace 'any'
type NatureItem = {
  id: string | number;
  title: string;
  description: string;
  backgroundImage: string;
  url?: string;
};

export default function NatureHighlights() {
  const { title, subtitle, description, items } = natureData;
  // 🔥 FIX: Replaced 'any' with proper Type
  const [selectedItem, setSelectedItem] = useState<NatureItem | null>(null);

  // Modal open hone par background scroll lock karne ke liye
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedItem]);

  return (
    <>
      <section id="nature" className="relative w-full lg:mt-10 pb-20 px-4 md:px-16 overflow-hidden ">
        {/* Nature Theme Background Glow */}
        <div className="absolute inset-0 z-0" />
        <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-900/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none z-0" />

        {/* 🌟 FIX: Changed flex-col to flex-col-reverse for Mobile (Text Top, Image Bottom). Desktop lg:flex-row remains untouched. */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: Cinematic Images Layout                        */}
          {/* ========================================================= */}
          <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center mt-10 lg:mt-0">
            
            {/* Main Large Image (Uses 1st item's image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute z-10 w-[85%] sm:w-[80%] h-[80%] sm:h-[75%] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* 🔥 FIX: Changed to Next.js Image */}
              <Image 
                src={items[0]?.backgroundImage} 
                alt={items[0]?.title} 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover" 
                priority // LCP priority for the main image
              />
            </motion.div>
            
            {/* Overlapping small image for depth (Uses 2nd item's image) */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute z-20 bottom-0 sm:bottom-10 right-0 sm:-right-4 md:right-4 w-[55%] sm:w-[50%] h-[40%] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/20 glass-card p-1"
            >
              {/* 🔥 FIX: Changed to Next.js Image */}
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image 
                  src={items[1]?.backgroundImage} 
                  alt={items[1]?.title} 
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover rounded-xl" 
                />
              </div>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: Content & Feature Cards                       */}
          {/* ========================================================= */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-5 h-5 text-emerald-500" />
                <p className="text-[10px] md:text-xs tracking-[0.3em] text-emerald-400/80 uppercase">
                  {subtitle}
                </p>
              </div>
              
              {/* <h2 className="text-4xl md:text-5xl font-serif gold-text-gradient tracking-widest mb-6 uppercase">
                {title}
              </h2>
              
              <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-10">
                {description}
              </p> */}
              <SectionHeader 
                // subtitle={subtitle} 
                title={title} 
                description={description} 
                className="text-left mb-4 max-w-3xl mx-auto"
              />
            </motion.div>

            {/* Dynamic Feature Cards from JSON */}
            <div className="flex flex-col gap-5">
              {items.map((item, index) => {
                // Dynamic Theming: Emerald for Birdwatching, Blue for Waterfalls
                const isBird = item.title.toLowerCase().includes("bird");
                const Icon = isBird ? Feather : Droplets;
                const themeColorClass = isBird ? "text-emerald-400" : "text-blue-400";
                const themeBgClass = isBird ? "bg-emerald-900/30 border-emerald-500/20 group-hover:bg-emerald-500/20" : "bg-blue-900/30 border-blue-500/20 group-hover:bg-blue-500/20";
                const themeBorderHover = isBird ? "hover:border-emerald-500/30" : "hover:border-blue-500/30";
                const themeTitleHover = isBird ? "group-hover:text-emerald-300" : "group-hover:text-blue-300";

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 + (index * 0.2) }}
                    onClick={() => setSelectedItem(item)} // 🌟 CLICK HANDLER
                    className={`glass-card p-5 rounded-2xl flex items-start gap-4 md:gap-5 group ${themeBorderHover} transition-colors cursor-pointer`}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 border transition-colors ${themeBgClass}`}>
                      <Icon className={`w-4 h-4 md:w-5 md:h-5 ${themeColorClass}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`text-lg font-serif text-white tracking-wide mb-2 transition-colors ${themeTitleHover}`}>
                        {item.title}
                      </h4>
                      
                      <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed line-clamp-3 mb-2">
                        {item.description}
                      </p>
                      
                      <span className="inline-flex items-center gap-1 text-[10px] text-yellow-500 uppercase tracking-widest hover:text-white transition-colors mt-2">
                        View Details <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 🖼️ MODAL / LIGHTBOX FOR DETAILS                           */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-10"
            onClick={() => setSelectedItem(null)} // Click outside to close
          >
            {/* Modal Container */}
            {/* 🌟 FIX: Changed flex-col to flex-col-reverse for Mobile Modal (Text Top, Image Bottom). */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full bg-[#121814] border border-white/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col-reverse md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
            >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 border border-white/20 text-white hover:bg-yellow-500 hover:text-black transition-all z-50 shadow-xl"
                onClick={() => setSelectedItem(null)}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content - Scrollable if text is too long */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="w-5 h-5 text-emerald-500" />
                  <p className="text-[10px] tracking-[0.3em] text-emerald-400/80 uppercase">Nature Exploration</p>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-serif gold-text-gradient mb-6 leading-snug">
                  {selectedItem.title}
                </h3>
                
                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8 whitespace-pre-line">
                  {selectedItem.description}
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  {selectedItem.url && (
                    <a 
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold uppercase text-[10px] tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      Read Full Blog <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-3 rounded-full border border-white/20 text-white uppercase text-[10px] tracking-widest hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative shrink-0">
                {/* 🔥 FIX: Changed to Next.js Image */}
                <Image 
                  src={selectedItem.backgroundImage} 
                  alt={selectedItem.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121814] md:bg-gradient-to-r md:from-transparent md:to-[#121814] to-transparent" />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}