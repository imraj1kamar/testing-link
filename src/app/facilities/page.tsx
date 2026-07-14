"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import facilitiesPageData from "@/data/facilitiesPage.json";

// TypeScript Interface
interface FacilitySection {
  id: number;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export default function FacilitiesPage() {
  const router = useRouter();
  const { hero, sections, cta } = facilitiesPageData.facilities_page;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#02542C] via-[#0B3F28] via-40% to-[#0D1410] overflow-hidden font-sans antialiased">
      
      {/* 🌿 1. LUXURY CINEMATIC HERO SECTION */}
      <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        
        {/* Base Background Image Layer */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={hero.background_image}
            alt={hero.title}
            fill
            priority 
            className="object-cover object-center scale-105 transition-transform duration-[10s] ease-out"
          />
        </div>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/20 to-[#0B0E0C]" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_40%,rgba(197,168,112,0.15),transparent_60%)]" />
        <div className="absolute inset-0 z-[3] bg-[linear-gradient(to_bottom,rgba(11,14,12,0.3),rgba(11,14,12,0.1),rgba(11,14,12,0.85))]" />

        {/* Text Content Engine */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 text-center px-4 flex flex-col items-center mt-16"
        >
          <div className="backdrop-blur-[2px]">
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif gold-text-gradient tracking-wide py-2 drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
              {hero.title}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#C5A870]/40" />
              <p className="text-[10px] md:text-xs text-[#C5A870] tracking-[0.45em] uppercase font-light">
                {hero.subtitle}
              </p>
              <div className="w-12 h-[1px] bg-[#C5A870]/40" />
            </div>
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A870]/50 to-transparent mx-auto mt-8" />
        </motion.div>
      </section>

      {/* 🌿 2. ABOUT-LIKE EDITORIAL FACILITIES SECTIONS (UI only) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 py-6 md:py-20 space-y-20 md:space-y-52">
        {sections.map((section: FacilitySection, index: number) => {
          const isEven = index % 2 === 0;

          const slideFromLeft = {
            hidden: { opacity: 0, x: -80, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            },
          } as const;

          const slideFromRight = {
            hidden: { opacity: 0, x: 80, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            },
          } as const;

          return (
            <div
              key={section.id}
              className={`flex flex-col gap-12 md:gap-24 items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Image Canvas Frame */}
              <motion.div
                variants={isEven ? slideFromLeft : slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
                className="w-full md:w-1/2 relative group perspective-1000"
              >
                <div className="absolute inset-0 border border-[#C5A870]/15 rounded-3xl transform translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:border-[#C5A870]/35 z-0" />

                <div className="glass-card relative w-full h-[360px] sm:h-[460px] md:h-[560px] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] z-10 border border-white/5">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C]/90 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Text Editorial Sheet */}
              <motion.div
                variants={isEven ? slideFromRight : slideFromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
                className="w-full lg:w-1/2 flex flex-col justify-center glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden"
              >
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight drop-shadow-sm tracking-wide">
                  {section.title}
                </h2>

                <p className="text-gray-300 font-light leading-relaxed text-sm mb-8">
                  {section.description}
                </p>

                <div className="mt-10 h-[1px] w-1/4 mx-auto md:mx-0 bg-gradient-to-r from-[#C5A870]/30 to-transparent" />
              </motion.div>
            </div>
          );
        })}
      </section>

      {/* 🌿 3. CTA SECTION (kept, but style closer to about-page container UI) */}
      <motion.section
        initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="w-full py-28 md:py-36 px-6 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(197,168,112,0.06),transparent_65%)]" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-serif text-[#E8D3A2] mb-10 drop-shadow-lg">
            {cta.heading}
          </h2>

          <button
            onClick={() => {
              const trigger = document.querySelector<HTMLButtonElement>(
                'button[data-enquiry-trigger="true"]'
              );
              if (trigger) {
                trigger.click();
              } else {
                router.push('/contact');
              }
            }}
            className="cursor-pointer flex items-center group flex items-center justify-center gap-3 px-10 py-4 w-max rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold uppercase text-xs tracking-[0.2em] transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            {cta.button_text}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.section>

    </main>
  );
}
