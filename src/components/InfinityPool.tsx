"use client";

import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Waves, ChevronLeft, ChevronRight } from "lucide-react";
import poolData from "@/data/poolExperience.json";
import { useRouter } from "next/navigation"; 
import AnimatedButton from "@/reusebleComponents/AnimatedButton";

export default function InfinityPool() {
  const router = useRouter(); // 🔥 ADDED: Initialize router

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const isPausedRef = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const intervalMs = 3500;
    const id = window.setInterval(() => {
      if (isPausedRef.current) return;
      emblaApi.scrollNext();
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  return (
    <section id="pool" className="relative w-full min-h-screen overflow-hidden">
      
      {/* ========================================================= */}
      {/* 🌟 FIXED SECTION-SPECIFIC BACKGROUND WITH GLASS EFFECT    */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-0">
        <div className="relative top-0 h-full w-full">
          {/* Background Image from JSON */}
          <Image 
            src={poolData.content.right.images[0].src} 
            alt="Infinity Pool Background"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-[#0a0f0c]/50 backdrop-blur-[2px]" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* CONTENT AREA (Relative z-10)                              */}
      {/* ========================================================= */}
      <div className="relative z-10 py-24 px-6 md:px-16 lg:px-24 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 rounded-3xl border-l-4 border-l-yellow-500 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <Waves className="w-6 h-6 text-yellow-500" />
            <p className="text-xs tracking-[0.3em] text-white/80 uppercase font-light">
              {poolData.subtitle}
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif gold-text-gradient tracking-widest mb-6">
            {poolData.content.left.heading}
          </h2>

          <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8">
            {poolData.content.left.text}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {poolData.content.left.bullets.map((bullet, i) => (
              <div key={i} className="text-[10px] md:text-xs text-white/60 flex items-center gap-2 uppercase tracking-widest">
                <span className="w-1 h-1 bg-yellow-500/50 rounded-full" /> {bullet}
              </div>
            ))}
          </div>

          {/* 🔥 ADDED: Theme-consistent Redirect Button */}
          {/* <div className="mt-4 border-t border-white/10 pt-8">
            <button 
              onClick={() => router.push('/pool')}
              // className="group flex items-center justify-center gap-3 px-8 py-3 w-max rounded-full bg-transparent border border-yellow-500/40 text-white hover:bg-yellow-500/20 hover:border-yellow-500 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                className="cursor-pointer inline-flex items-center gap-er-pointer group flex items-center justify-center gap-3 px-8 py-3 w-max rounded-full bg-transparent border border-yellow-500/40 text-white hover:bg-yellow-500/20 hover:border-yellow-500 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.05)]"
            >
              <span className="uppercase tracking-[0.2em] text-[10px] font-medium text-yellow-500 group-hover:text-white transition-colors">
                Explore Pool Experience
              </span>
              <ChevronRight className="w-4 h-4 text-yellow-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </button>
          </div> */}

          <AnimatedButton 
            text="Explore Pool Experience" 
            onClick={() => router.push('/pool')} 
            className=""
          />

        </motion.div>

        {/* Right: Carousel */}
        <div
          className="relative w-full h-[50vh] lg:h-[70vh] rounded-[2rem] overflow-hidden border border-white/10 group shadow-2xl"
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
        >
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {poolData.content.right.images.map((img, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 h-full relative">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={scrollPrev}
            className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-yellow-500/20 text-white transition-all"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={scrollNext}
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-yellow-500/20 text-white transition-all"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}