"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; // 1. useScroll & useTransform add kiya
import { ArrowDown } from "lucide-react";
import heroData from "@/data/hero.json";
import Image from "next/image";
import Link from "next/link"
import { dispatchHeroImageLoadedOnce } from "@/lib/loaderEvents";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const slides = heroData.slides;
  
  // 2. Scroll tracking ke liye Ref
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 3. Scroll ke sath text ka parallax (text dheere upar jayega)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Scroll ke sath opacity kam hogi
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section 
      id="home" 
      ref={containerRef} // Ref attach kiya
      className="relative min-h-[85vh] md:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      
      {/* Background Slideshow */}
   <div className="absolute inset-0 z-0">
        {slides.map((slide, i) => (
          <motion.div
            key={slide.id}
          
            initial={{ opacity: i === 0 ? 1 : 0, scale: 1.1 }}
            animate={{ 
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.1,
              x: i === index ? [0, 20] : 0,
            }}
            transition={{ 
             
              opacity: { duration: 2, ease: "easeInOut" },
              scale: { duration: 10, ease: "linear" },
              x: { duration: 10, ease: "linear" }
            }}
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt={`Hero Slide ${i}`}
              fill
              priority={i === 0} 
                onLoad={() => {
                  if (i === 0) {
                    dispatchHeroImageLoadedOnce();
                  }
                }}
              className="object-cover object-center"
              quality={85} 
            />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/10 to-[#1a241c]" />

      {/* Main Content: Parallax Applied */}
      <motion.div 
        style={{ y, opacity }} // 4. Parallax effect yahan apply hua
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full mt-16"
      >
<div className="flex flex-col items-center justify-center mb-4">
  
  {/* 1. TOP LOGO (Icon/Crest) */}
  <Image
    src="/images/logo/logo.png" 
    alt="DurgBhumi Icon"
    width={200}
    height={200}
    priority

   className="w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] h-auto object-contain mb-0 drop-shadow-none md:drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
>
  
</Image>
  {/* 2. MAIN BRAND LOGO (Text Logo) */}
  <h1 className="flex justify-center">
    <Image
      src="/images/logo/DBStrip.png" 
      alt="DurgBhumi"
      width={600}
      height={200}
      priority 
   
      className="w-[280px] md:w-[350px] lg:w-[450px] h-auto object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
    />
  </h1>
  
</div>
        
        <p className="text-xs md:text-lg tracking-[0.3em] mb-12 font-light text-gray-100 drop-shadow-lg text-center">
          The Land Of Forts.
        </p>

       <Link 
  href="#stay" 
  className="px-8 py-3 inline-block rounded-full bg-black/30 backdrop-blur-md border border-white/30 hover:bg-white/10 hover:border-yellow-500 transition-all duration-500 uppercase tracking-widest text-xs md:text-sm shadow-[0_0_20px_rgba(255,215,0,0.15)] text-white"
>
  Unveil Your Escape
</Link>
      </motion.div>

      {/* Scroll Down Animation */}
      <motion.div style={{ opacity }} className="absolute bottom-10 z-10 flex flex-col items-center justify-center">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="h-16 w-[1px] bg-gradient-to-b from-white/50 to-transparent mb-2"></div>
          <ArrowDown className="text-white/60 w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}