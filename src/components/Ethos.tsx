
"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image"; 
import welcomeData from "@/data/welcome.json";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight } from "lucide-react";
import AnimatedButton from "@/reusebleComponents/AnimatedButton";

export default function Ethos() {
  const router = useRouter(); 

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const isPausedRef = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const intervalMs = 3000;
    const id = window.setInterval(() => {
      if (isPausedRef.current) return;
      emblaApi.scrollNext();
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  const containerRef = useRef<HTMLElement>(null);
  const { about } = welcomeData;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 25, 
    restDelta: 0.0001 
  });

  const drawLine = useTransform(smoothProgress, [0, 1], [0, 1]);

  const img3Opacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const img3Scale = useTransform(smoothProgress, [0, 0.25], [1, 1.15]);

  const img1X = useTransform(smoothProgress, [0, 0.35], ["-80%", "0%"]);
  const img1Y = useTransform(smoothProgress, [0, 0.35], ["-20%", "0%"]);
  const img1Rotate = useTransform(smoothProgress, [0, 0.35], [-10, 0]);
  const img1Scale = useTransform(smoothProgress, [0, 0.35], [0.9, 1.1]);
  const img1Opacity = useTransform(smoothProgress, [0.6, 0.75], [1, 0]);
  const img1Z = useTransform(smoothProgress, [0, 0.1], [10, 40]);

  const img2X = useTransform(smoothProgress, [0, 0.35, 0.7], ["80%", "80%", "0%"]);
  const img2Y = useTransform(smoothProgress, [0, 0.35, 0.7], ["20%", "20%", "0%"]);
  const img2Rotate = useTransform(smoothProgress, [0, 0.35, 0.7], [10, 10, 0]);
  const img2Scale = useTransform(smoothProgress, [0, 0.35, 0.7], [0.9, 0.9, 1.1]);
  const img2Z = useTransform(smoothProgress, [0, 0.5], [20, 50]);

  return (
    <section
      id="about"
      ref={containerRef}
      // 🔥 FIX: Added 'isolate' to stop overlap bleeding to other sections
      className="relative w-full h-auto md:h-[300vh]  isolate"
    >
      {/* 🔥 FIX: Changed md:sticky to md:sticky md:top-0 to stay within section bounds. 
          Added 'overflow-hidden' to clip any overflowing motion elements. */}
      <div className="relative md:sticky md:top-0 h-auto md:h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-16 py-10 md:py-0">

        <div className="absolute inset-0  z-0" />

        <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div className="glass-card p-4 sm:p-8 md:p-6 rounded-3xl relative text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif gold-text-gradient tracking-wide drop-shadow-md mb-0 ">
               {about.heading}
            </h2>

            <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[var(--text-secondary)] mb-6 sm:mb-8 uppercase font-medium">
              {about.subtext}
            </p>

            <p className="text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed mb-6">
              {about.description}
            </p>

            <p className="text-sm md:text-base text-[var(--text-secondary)] font-light leading-relaxed whitespace-pre-line">
              {about.longDescription}
            </p>
            
            {/* <div className="mt-8 border-t border-[var(--gold-primary)]/20 pt-4 flex justify-center lg:justify-start">
              <button 
                onClick={() => router.push('/about')}
                className="cursor-pointer group flex items-center justify-center gap-3 px-8 py-3 w-max rounded-full bg-transparent border border-[var(--gold-primary)]/40 text-[var(--text-primary)] hover:bg-[var(--gold-primary)]/10 hover:border-[var(--gold-primary)] transition-all duration-300"
              >
                <span className="uppercase tracking-[0.2em] text-[10px] font-medium text-[var(--gold-dark)] group-hover:text-[var(--gold-primary)] transition-colors">
                  Discover Our Story
                </span>
                <ChevronRight className="w-4 h-4 text-[var(--gold-dark)] group-hover:translate-x-1 group-hover:text-[var(--gold-primary)] transition-all" />
              </button>
            </div> */}
            <AnimatedButton 
              text="Discover Our Story" 
              onClick={() => router.push('/about')} 
                className=""
            />
          </div>


          <div className="hidden md:flex relative w-full h-[600px] items-center justify-center will-change-transform">
            
            <motion.div
              style={{ x: img1X, y: img1Y, rotate: img1Rotate, scale: img1Scale, zIndex: img1Z, opacity: img1Opacity }}
              className="absolute w-28 sm:w-40 md:w-56 h-36 sm:h-56 md:h-72 rounded-2xl overflow-hidden shadow-xl border border-white/40"
            >
              <Image src={about.images[0]} alt="Ethos Image 1" fill sizes="(max-width: 768px) 30vw, 20vw" className="object-cover" />
            </motion.div>

            <motion.div
              style={{ x: img2X, y: img2Y, rotate: img2Rotate, scale: img2Scale, zIndex: img2Z }}
              className="absolute w-32 sm:w-44 md:w-60 h-44 sm:h-60 md:h-80 rounded-2xl overflow-hidden shadow-xl border border-white/40"
            >
              <Image src={about.images[1]} alt="Ethos Image 2" fill sizes="(max-width: 768px) 40vw, 25vw" className="object-cover" />
            </motion.div>

            <motion.div
              style={{ scale: img3Scale, opacity: img3Opacity, zIndex: 30 }}
              className="absolute w-36 sm:w-52 md:w-72 h-52 sm:h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/60"
            >
              <Image src={about.images[2]} alt="Ethos Image 3" fill sizes="(max-width: 768px) 50vw, 30vw" priority className="object-cover" />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="md:hidden w-full overflow-hidden mt-4" 
            ref={emblaRef}
            onTouchStart={() => (isPausedRef.current = true)}
            onTouchEnd={() => (isPausedRef.current = false)}
          >
            <div className="flex gap-4 cursor-grab active:cursor-grabbing">
              {about.images.map((imgSrc: string, index: number) => (
                <div 
                  key={index} 
                  className="flex-[0_0_85%] min-w-0 relative h-[350px] rounded-3xl overflow-hidden glass-card"
                >
                  <Image 
                    src={imgSrc} 
                    alt={`Resort View ${index + 1}`} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
 