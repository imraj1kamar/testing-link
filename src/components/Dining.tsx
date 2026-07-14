"use client";

import { useRef, useEffect } from "react";
// 🔥 FIX: Added useSpring to the import
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image"; 
import diningData from "@/data/diningHighlights.json";
import SectionHeader from "@/reusebleComponents/SectionHeader";

function StackedCard({
  item,
  index,
  scrollYProgress,
  total,
}: {
 item: {
    id: string | number;
    title: string;
    description: string;
    images: string[];
  };
  index: number;
  scrollYProgress: MotionValue<number>;
  total: number;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const fade = step * 0.25; 

  let inputs: number[], xVals: string[], scaleVals: number[], opacityVals: number[];

  if (index === 0) {
    // First Slide
    inputs =      [0, end - fade, end, 1];
    xVals =       ["0%", "0%",    "-100vw", "-100vw"];
    scaleVals =   [1, 1,          1,        1];
    opacityVals = [1, 1,          0,        0];
  } else if (index === total - 1) {
    // Last Slide
    inputs =      [0, start - fade, start, start + fade, 1];
    xVals =       ["15%", "15%",    "8%",  "0%",         "0%"];
    scaleVals =   [0.8, 0.8,        0.9,   1,            1];
    opacityVals = [0, 0,            0.2,   1,            1];
  } else {
    // Middle Slides
    inputs =      [0, start - fade, start, start + fade, end - fade, end, 1];
    xVals =       ["15%", "15%",    "8%",  "0%",         "0%",      "-100vw", "-100vw"];
    scaleVals =   [0.8, 0.8,        0.9,   1,            1,         1,        1];
    opacityVals = [0, 0,            0.2,   1,            1,         0,        0];
  }

  const x = useTransform(scrollYProgress, inputs, xVals, { clamp: true });
  const scale = useTransform(scrollYProgress, inputs, scaleVals, { clamp: true });
  const opacity = useTransform(scrollYProgress, inputs, opacityVals, { clamp: true });
  
  // Physically hide element when opacity is low so it NEVER ghosts
  const visibility = useTransform(opacity, (val) => (val > 0.05 ? "visible" : "hidden"));
  const pointerEvents = useTransform(opacity, (val) => (val > 0.5 ? "auto" : "none"));
  const zIndex = total - index; 

  return (
    <motion.div 
      style={{ x, scale, opacity, visibility, pointerEvents, zIndex }} 
      // 🔥 FIX: Added 'will-change-transform' to offload rendering to the GPU and remove spikes
      className="absolute inset-0 flex items-center justify-center will-change-transform"
    >
      <div className="w-[90%] lg:w-[1000px] h-auto lg:h-[500px] bg-[#0a0f0c]/60 bg-gradient-to-br from-[#1a241c]/70 via-[#2a1c12]/60 to-[#0a0f0c]/80 backdrop-blur-[40px] border border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.9)] rounded-[2rem] p-10 flex flex-col lg:flex-row gap-10">
        
        {/* LEFT SIDE: Text & Controls */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
              <ChevronRight className="text-white w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/80 tracking-[0.2em] text-xs uppercase font-light">SCROLL</span>
              <div className="w-8 h-[1px] bg-white/50" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif text-[#f4e2b6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6 uppercase tracking-wider">
            {item.title}
          </h2>
          
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {item.description}
          </p>
        </div>

        {/* RIGHT SIDE: Floating Images Layout */}
        <div className="w-full lg:w-1/2 relative h-[300px] lg:h-full flex items-center justify-center">
          <div className="absolute top-0 lg:top-4 right-0 lg:right-4 w-[65%] h-[60%] rounded-xl overflow-hidden border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-20 bg-[#1a241c]">
            <Image 
              src={item.images[0]} 
              alt={item.title} 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover" 
              priority={index === 0}
            />
          </div>
          <div className="absolute bottom-0 lg:bottom-4 left-0 lg:bottom-4 w-[65%] h-[60%] rounded-xl overflow-hidden border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10 bg-[#3b2313]">
            <Image 
              src={item.images[1]} 
              alt={item.title} 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover" 
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
export default function Dining() {
  const containerRef = useRef<HTMLElement>(null);
  const items = diningData.items;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // FIX: Using exact offset parameters to stabilize tracking
    offset: ["start start", "end end"]
  });

  // 🔥 FIX: Wrapped the raw scroll progress in a spring physics constraint (Same as Ethos)
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 25, 
    restDelta: 0.0001 
  });

  // Passed smoothProgress instead of raw scrollYProgress
  const drawTrail = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section id="dining" ref={containerRef} className="relative md:pb-17 w-full h-auto lg:h-[350vh] ">
      
      {/* ========================================================= */}
      {/* 📱 MOBILE VIEW (Horizontal Native Swipe)                  */}
      {/* ========================================================= */}
      <div className="lg:hidden flex flex-col py-0 w-full relative z-10 overflow-hidden">
        
        <div className="px-6 mb-10 text-center">
           <SectionHeader 
            subtitle={diningData.subtitle} 
            title={diningData.title} 
           
            className="text-center mb-16 max-w-3xl mx-auto"
          /> 
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-10 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {items.map((item, index) => (
            <div key={item.id} className="snap-center shrink-0 w-[90vw] md:w-[60vw]  backdrop-blur-[30px] border border-white/20 rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col">
              <div className="relative w-full h-64 mb-6">
                <div className="absolute top-0 right-0 w-[70%] h-[70%] rounded-xl overflow-hidden border border-white/20 z-20 shadow-lg">
                  <Image 
                    src={item.images[0]} 
                    alt={item.title} 
                    fill
                    sizes="(max-width: 1024px) 80vw, 50vw"
                    className="object-cover" 
                    priority={index === 0}
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-[70%] h-[70%] rounded-xl overflow-hidden  shadow-lg ">
                  <Image 
                    src={item.images[1]} 
                    alt={item.title} 
                    fill
                    sizes="(max-width: 1024px) 80vw, 50vw"
                    className="object-cover" 
                  />
                </div>
              </div>
              <h3 className="text-2xl font-serif text-[#f4e2b6] mb-3 leading-snug drop-shadow-md">{item.title}</h3>
              <p className="text-sm text-white/90 font-light leading-relaxed drop-shadow-sm">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center items-center gap-2 text-white/40 text-[10px] tracking-widest uppercase mt-4">
          <ChevronRight className="w-4 h-4" /> Swipe to explore
        </div>
      </div>

      {/* ========================================================= */}
      {/* 💻 DESKTOP VIEW (Cinematic 3D Stack View)                 */}
      {/* ========================================================= */}
      <div className="hidden lg:flex flex-col sticky top-0 h-screen w-full items-center overflow-hidden">
        
        <div className="absolute inset-0  z-0 opacity-90" />
        
        {/* BACKGROUND GLOW STRIPE */}
        {/* 🔥 FIX: Added will-change-transform for smoother SVG drawing */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-60 will-change-transform">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <motion.path
              d="M -100,200 C 300,100 800,700 1300,500"
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: drawTrail }}
              filter="drop-shadow(0 0 15px rgba(255, 223, 137, 0.6))"
            />
            <defs>
              <linearGradient id="glowGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFF8D6" stopOpacity="0" />
                <stop offset="50%" stopColor="#f4e2b6" />
                <stop offset="100%" stopColor="#FFF8D6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Desktop Header Title */}
        <div className="w-full text-center mt-3 z-40 pointer-events-none">
    

          <SectionHeader 
            subtitle={diningData.subtitle} 
            title={diningData.title} 
           
            className="text-center mb-6 max-w-3xl mx-auto"
          /> 
        </div>

        {/* CARD STACK LAYER */}
        <div className="relative z-10 w-full max-w-7xl flex-1 flex items-center  justify-center ">
          {items.map((item, index) => (
            <StackedCard 
              key={item.id} 
              item={item} 
              index={index} 
              // 🔥 FIX: Passed smoothProgress to the cards to eliminate jitter
              scrollYProgress={smoothProgress} 
              total={items.length} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}