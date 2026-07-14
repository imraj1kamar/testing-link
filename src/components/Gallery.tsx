"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import galleryData from "@/data/gallery.json";
import SectionHeader from "@/reusebleComponents/SectionHeader";

type GalleryImage = {
  id: string | number;
  src: string;
  alt: string;
  category: string;
};

const formatGalleryColumns = (images: GalleryImage[]) => {
  const columns = [];
  let i = 0;
  let colIndex = 0;

  while (i < images.length) {
    const isSingle = colIndex % 2 !== 0; 
    
    if (isSingle || i === images.length - 1) {
      columns.push({
        id: `col-${colIndex}`,
        type: "single",
        yOffset: colIndex % 4 === 1 ? 15 : -10,
        images: [images[i]]
      });
      i += 1;
    } else {
      columns.push({
        id: `col-${colIndex}`,
        type: "double",
        yOffset: colIndex % 4 === 0 ? 20 : -20,
        images: [images[i], images[i + 1]]
      });
      i += 2;
    }
    colIndex++;
  }
  return columns;
};

export default function Gallery() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const rawImages = galleryData.gallery;
  const galleryColumns = formatGalleryColumns(rawImages);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 25, 
    restDelta: 0.0001 
  });

  const endX = `-${Math.max(10, galleryColumns.length * 6.5)}%`; 
  const x = useTransform(smoothProgress, [0, 1], ["5%", endX]);

  const opacityUp = useTransform(smoothProgress, [0, 0.05], [1, 0], { clamp: true });
  const opacityDown = useTransform(smoothProgress, [0.95, 1], [0, 1], { clamp: true });

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % rawImages.length : null));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + rawImages.length) % rawImages.length : null));
  };

  const selectedImg = selectedIndex !== null ? rawImages[selectedIndex] : null;

  return (
    <>
      <section id="gallery" ref={targetRef} className="relative w-full   lg:h-[400vh]">
        
        <div className="lg:hidden flex flex-col px-4 md:px-12 py-20 w-full relative z-10">
          <div className="text-center mb-12">
         
              <SectionHeader 
              subtitle="A Glimpse into DurgBhumi" 
              title="Moments Frozen"
              className="text-center mb-4 max-w-3xl mx-auto"
            /> 
          </div>

          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {rawImages.map((item, idx) => (
              <div 
                key={item.id} 
                className="relative overflow-hidden rounded-xl break-inside-avoid border border-white/10 group cursor-pointer"
                onClick={() => setSelectedIndex(idx)}
              >
                <Image 
                  src={item.src} 
                  alt={item.alt} 
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-yellow-500 text-[10px] uppercase tracking-widest">{item.category}</p>
                  <p className="text-white text-sm font-serif">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex flex-col sticky top-0 h-screen  overflow-hidden ">
          <div className="absolute inset-0  z-0 pointer-events-none opacity-80" />
          
          <motion.div style={{ opacity: opacityUp }} className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none">
            <span className="text-[10px] text-yellow-500 tracking-[0.3em] uppercase mb-1 drop-shadow-md">Scroll Up</span>
            <ChevronUp className="w-5 h-5 text-yellow-500 animate-bounce" />
          </motion.div>

          <div className="w-full text-center z-40 pt-20 shrink-0 pointer-events-none">
            {/* <h2 className="text-5xl md:text-7xl font-serif gold-text-gradient tracking-widest mb-3 drop-shadow-2xl uppercase">
              MOMENTS FROZEN
            </h2>
            <p className="text-xs tracking-[0.3em] text-white/50 uppercase">
              A Glimpse into DurgBhumi
            </p> */}

            <SectionHeader 
              subtitle="A Glimpse into DurgBhumi" 
              title="Moments Frozen"
              className="text-center mb-4 max-w-3xl mx-auto"
            /> 
          </div>

          <div className="flex-1 w-full flex items-center relative z-20  overflow-visible">
            <motion.div style={{ x }} className="flex gap-10 px-32 items-center w-max will-change-transform">
              {galleryColumns.map((col, colIndex) => (
                <motion.div 
                  key={col.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: col.yOffset }}
                  viewport={{ once: true, margin: "200px" }}
                  transition={{ duration: 0.8, delay: colIndex * 0.1 }}
                  className={`flex shrink-0 gap-6 ${col.type === "double" ? "flex-col" : "flex-row"}`}
                >
                  {col.images.map((item) => {
                    const globalIdx = rawImages.findIndex(img => img.id === item.id);
                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.03, zIndex: 30 }}
                        onClick={() => setSelectedIndex(globalIdx)}
                        className={`glass-card p-3 rounded-2xl cursor-pointer shadow-2xl relative group
                          ${col.type === "single" ? "w-[600px] h-[450px]" : "w-[350px] h-[220px]"}
                        `}
                      >
                        <div className="w-full h-full rounded-xl overflow-hidden relative border border-white/10">
                          <Image 
                            src={item.src} 
                            alt={item.alt} 
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                            <span className="text-yellow-500 text-[10px] tracking-widest uppercase mb-1">{item.category}</span>
                            <span className="text-white text-sm font-serif border border-white/40 px-6 py-2 rounded-full bg-black/20 backdrop-blur-sm">
                              {item.alt}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div style={{ opacity: opacityDown }} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none">
            <span className="text-[10px] text-yellow-500 tracking-[0.3em] uppercase mb-1 drop-shadow-md">Scroll Down</span>
            <ChevronDown className="w-5 h-5 text-yellow-500 animate-bounce" />
          </motion.div>

        </div>
      </section>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-yellow-500 hover:text-black transition-all z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            >
              <X className="w-6 h-6" />
            </button>

            <button 
              className="absolute left-4 md:left-10 p-3 rounded-full bg-black/50 border border-white/20 text-white hover:bg-yellow-500 hover:text-black transition-all z-50"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div 
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()} 
            >
              <motion.img 
                key={selectedImg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedImg.src} 
                alt={selectedImg.alt} 
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              <motion.div 
                key={`text-${selectedImg.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-6 text-center"
              >
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">{selectedImg.alt}</h3>
                <p className="text-yellow-500 text-xs tracking-[0.2em] uppercase">{selectedImg.category}</p>
                <p className="text-white/40 text-[10px] mt-2 tracking-widest">{selectedIndex! + 1} / {rawImages.length}</p>
              </motion.div>
            </div>

            <button 
              className="absolute right-4 md:right-10 p-3 rounded-full bg-black/50 border border-white/20 text-white hover:bg-yellow-500 hover:text-black transition-all z-50"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}