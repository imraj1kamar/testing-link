

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Navigation, X } from "lucide-react";
import Image from "next/image"; // 🔥 ADDED: Next.js Image import
import attractionsData from "@/data/attractions.json";
import SectionHeader from "@/reusebleComponents/SectionHeader";

// 🔥 FIX: Added TypeScript Type to replace 'any'
type Attraction = {
  id: string | number;
  name: string;
  description: string;
  image: string;
  distance?: string;
};

export default function NearbyAttractions() {
  // 🔥 FIX: Replaced 'any' with the Attraction type
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const attractions = attractionsData.attractions;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAttraction) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedAttraction]);

  return (
    <>
      <section id="explore" className="relative w-full  px-6 pb-[25px] sm:pb-[25px] md:px-16 sm:py-0 overflow-hidden ">
        {/* Background Subtle Glow */}
        <div className="absolute top-0 left-0 w-full h-[300px]  z-0" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-yellow-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Header */}
          {/* <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center items-center gap-3 mb-3">
              <Map className="w-5 h-5 text-yellow-500" />
              <p className="text-xs tracking-[0.3em] text-white/60 uppercase">Discover The Surroundings</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif gold-text-gradient tracking-widest uppercase">
              Nearby Attractions
            </h2>
          </motion.div> */}
          <SectionHeader 
            subtitle="Discover The Surroundings" 
            title="Nearby Attractions" 
            className="text-center mb-16 max-w-3xl mx-auto"
          />

          {/* Attractions Grid (4 Columns for Desktop, 2 for Tablet, 1 for Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {attractions.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="bg-gradient-to-br from-[#02542C] via-[#0B3F28] via-40% to-[#0D1410]  rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-yellow-500/30 transition-colors duration-500 flex flex-col h-full shadow-xl"
                onClick={() => setSelectedAttraction(place)}
              >
                {/* Image Box - Fixed Height */}
                <div className="w-full h-48 relative overflow-hidden shrink-0">
                  {/* 🔥 FIX: Replaced img with Next.js Image */}
                  <Image 
                    src={place.image} 
                    alt={place.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0c] via-black/20 to-transparent" />
                  
                  {/* Distance Badge */}
                  {place.distance && place.distance !== "—" && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                      <Navigation className="w-3 h-3 text-yellow-400" />
                      <span className="text-[10px] text-white tracking-widest uppercase">{place.distance}</span>
                    </div>
                  )}
                </div>

                {/* Content Box - Flex Grow ensures equal card heights */}
                <div className="p-5 flex flex-col flex-1 bg-[#121814]/50">
                  <h3 className="text-lg font-serif text-white tracking-wider mb-2 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                    {place.name}
                  </h3>
                  
                  {/* line-clamp-3 truncates long text to keep card sizes uniform */}
                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-4 flex-1 line-clamp-3">
                    {place.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <span className="text-[10px] text-yellow-500 tracking-widest uppercase group-hover:underline underline-offset-4 transition-all duration-300 flex items-center gap-1">
                      View Details
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 🖼️ ATTRACTION MODAL / LIGHTBOX                            */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedAttraction && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#02542C] via-[#0B3F28] via-40% to-[#0D1410]  backdrop-blur-md p-4 md:p-10"
            onClick={() => setSelectedAttraction(null)}
          >
            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full bg-gradient-to-br from-[#02542C] via-[#0B3F28] via-40% to-[#0D1410]  border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
            >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 border border-white/20 text-white hover:bg-yellow-500 hover:text-black transition-all z-50"
                onClick={() => setSelectedAttraction(null)}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                {/* 🔥 FIX: Replaced img with Next.js Image */}
                <Image 
                  src={selectedAttraction.image} 
                  alt={selectedAttraction.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121814c9] md:bg-gradient-to-r md:from-transparent md:to-[#121814c9] to-transparent" />
              </div>

              {/* Modal Content */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                {selectedAttraction.distance && selectedAttraction.distance !== "—" && (
                  <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full w-max mb-4">
                    <Navigation className="w-3 h-3 text-yellow-500" />
                    <span className="text-[10px] text-yellow-500 tracking-widest uppercase">
                      {selectedAttraction.distance} From Resort
                    </span>
                  </div>
                )}
                
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-snug">
                  {selectedAttraction.name}
                </h3>
                
                <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8">
                  {selectedAttraction.description}
                </p>
                
                <button 
                  onClick={() => setSelectedAttraction(null)}
                  className="cursor-pointer px-8 py-3 w-max rounded-full border border-white/20 hover:bg-yellow-500/20 uppercase text-[10px] tracking-widest transition-all text-white"
                >
                  Close Details
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}