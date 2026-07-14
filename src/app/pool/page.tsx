"use client";

import Image from "next/image";
import { dispatchHeroImageLoadedOnce } from "@/lib/loaderEvents";

import { motion } from "framer-motion";
import { Droplets, Sun, ShieldCheck, Moon, ArrowRight } from "lucide-react";
import poolData from "@/data/poolPage.json";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import SectionHeader from "@/reusebleComponents/SectionHeader";

// TypeScript interface to prevent 'any' linting errors
interface GalleryImage {
  src: string;
  alt: string;
  desc?: string;
}

export default function PoolPage() {
  const router = useRouter();
  const [emblaRef] = useEmblaCarousel({ loop: true }); 
  

  const { hero, experience, amenities, gallery, cta } = poolData.pool_page;

  // Cinematic Scroll Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -60, filter: "blur(5px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 60, filter: "blur(5px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // Icon mapping for amenities
  const getAmenityIcon = (index: number) => {
    switch (index) {
      case 0: return <Droplets className="w-8 h-8 text-yellow-500" />;
      case 1: return <Sun className="w-8 h-8 text-yellow-500" />;
      case 2: return <ShieldCheck className="w-8 h-8 text-yellow-500" />;
      case 3: return <Moon className="w-8 h-8 text-yellow-500" />;
      default: return <Droplets className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#02542C] via-[#0B3F28] via-40% to-[#0D1410] overflow-hidden font-sans antialiased">
      
      {/* 🌿 1. LUXURY CINEMATIC HERO SECTION (Matched with About Page) */}
   

{/* ========================================================= */}

   {/* 🌿 LUXURY CINEMATIC HERO SECTION */}
      <section className="relative w-full h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
        
        {/* Base Background Image Layer */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={hero.background_image}
            alt={hero.title}
            fill
            priority 
            onLoad={() => dispatchHeroImageLoadedOnce()}
            className="object-cover object-center scale-105 transition-transform duration-[10s] ease-out"
          />
        </div>
        
        {/* Exact Home-Hero Darkness Sync Layer */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/20 to-[#0B0E0C]" />
        
        {/* Atmospheric Vignette & Soft Golden Radial Glow */}
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_35%,rgba(197,168,112,0.15),transparent_60%)]" />
        <div className="absolute inset-0 z-[3] bg-[linear-gradient(to_bottom,rgba(11,14,12,0.3),rgba(11,14,12,0.1),rgba(11,14,12,0.85))]" />

        {/* Text Content Engine */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.15, ease: "easeOut" }}
          className="relative z-10 text-center px-4 flex flex-col items-center mt-12"
        >
          <div className="backdrop-blur-[1px]">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif gold-text-gradient tracking-wide py-2 drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
                 {hero.title}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-10 h-[1px] bg-[#C5A870]/30" />
              <p className="text-[10px] md:text-xs text-[#C5A870] tracking-[0.45em] uppercase font-light">
                {hero.subtitle}
              </p>
              <div className="w-10 h-[1px] bg-[#C5A870]/30" />
            </div>
          </div>
          {/* Flawless Bottom Border Accent */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A870]/50 to-transparent mx-auto mt-6" />
        </motion.div>
      </section>

{/* ==================================================================== */}



      {/* 🌿 2. THE EXPERIENCE (SPLIT LAYOUT) */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Text */}
          <motion.div 
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2 flex flex-col justify-center glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight drop-shadow-sm tracking-wide">
              {experience.heading}
            </h2>
            <p className="text-gray-300 font-light leading-relaxed text-sm mb-8">
              {experience.description}
            </p>
            <div className="mt-10 h-[1px] w-1/3 mx-auto lg:mx-0 bg-gradient-to-r from-[#C5A870]/40 to-transparent" />
          </motion.div>

          {/* Right: Image */}
          <motion.div 
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2 relative group perspective-1000"
          >
            <div className="absolute inset-0 border border-[#C5A870]/20 rounded-3xl transform translate-x-4 translate-y-4 transition-all duration-700 group-hover:translate-x-2 group-hover:translate-y-2 z-0" />
            <div className="glass-card relative w-full h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] z-10 border border-white/5">
              <Image
                src={experience.image.src}
                alt={experience.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🌿 3. AMENITIES GRID */}
      <section className="relative  py-10 px-6 md:px-16  ">
        <div className="max-w-7xl mx-auto">
          {/* <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif gold-text-gradient tracking-widest uppercase">
              {amenities.heading}
            </h2>
          </motion.div> */}
        <SectionHeader             
            title={amenities.heading}          
            className="text-center mb-4 max-w-3xl mx-auto"
          /> 
          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {amenities.items.map((item, index) => (
              <motion.div key={index} variants={fadeUp} className=" bg-gradient-to-br from-[#02542C] via-[#0B3F28] via-40% to-[#0D1410] glass-card p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all duration-500 group text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(197,168,112,0.1)]">
                  {getAmenityIcon(index)}
                </div>
                <h3 className="text-lg font-serif text-[#E8D3A2] mb-3">{item.title}</h3>
                <p className="text-xs text-[#AFAAA0] font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🌿 4. MASONRY GALLERY */}
   
<section className="max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-10">
  {/* <motion.div 
    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
    className="text-center mb-16"
  >
    <h2 className="text-3xl md:text-5xl font-serif text-[#F0EDE6] tracking-wide">
      {gallery.heading}
    </h2>
    <div className="w-16 h-[1px] bg-[#C5A870]/50 mx-auto mt-6" />
  </motion.div> */}
<SectionHeader 
            
            title={gallery.heading}
          
            className="text-center mb-4 max-w-3xl mx-auto"
          /> 
  {/* DESKTOP: Masonry Grid */}
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="hidden md:block md:columns-2 lg:columns-3 gap-6 space-y-6"
>
    {gallery.images.map((img: GalleryImage, index: number) => (
            <motion.div key={index} variants={fadeUp} className="relative w-full rounded-2xl overflow-hidden group break-inside-avoid">
              <Image 
                src={img.src} 
                alt={img.alt} 
                width={600} 
                height={800} 
                className="w-full h-auto object-cover transition-transform duration-[2s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500" />
              
              {/* Image Description Hover Effect */}
              {img.desc && (
                <div className="absolute bottom-0 left-0 w-full p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10">
                  <p className="text-sm md:text-base text-white font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {img.desc}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
  </motion.div>

  {/* MOBILE: Auto-play Carousel */}
  <motion.div 
    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
    className="md:hidden overflow-hidden" 
    ref={emblaRef}
  >
    <div className="flex gap-4">
      {gallery.images.map((img: GalleryImage, index: number) => (
        <div key={index} className="flex-[0_0_85%] relative rounded-2xl overflow-hidden aspect-[4/5]">
          <Image 
            src={img.src} 
            alt={img.alt} 
            fill 
            className="object-cover" 
          />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-xs text-white font-light">{img.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
</section>




      {/* 🌿 5. CTA SECTION */}
      <motion.section 
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="w-full py-24 md:py-32 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,168,112,0.1),transparent_70%)]" />
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-serif text-[#E8D3A2] mb-10 drop-shadow-lg">
            {cta.heading}
          </h2>
          <button 
            onClick={() => {
              // Using Floating Enquiry Trigger if it exists
              const trigger = document.querySelector<HTMLButtonElement>('button[data-enquiry-trigger="true"]');
              if (trigger) {
                trigger.click();
              } else {
                router.push('/contact');
              }
            }}
            className= "cursor-pointer flex items-center  group flex items-center justify-center gap-3 px-10 py-4 w-max rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold uppercase text-xs tracking-[0.2em] transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            {cta.button_text}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.section>

    </main>
  );
}