// "use client";

// import { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { 
//   ChevronRight, UtensilsCrossed, Building, Waves, ChefHat, 
//   Dices, Baby, TreePine, Flower2, BookOpen, Droplets, Flame, Tent, Sparkles 
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import useEmblaCarousel from "embla-carousel-react";
// import facilitiesData from "@/data/facilities.json"; 
// import SectionHeader from "@/reusebleComponents/SectionHeader";
// import AnimatedButton from "@/reusebleComponents/AnimatedButton";

// // Interface added to fix the "any" error
// interface FacilityItem {
//   id: number;
//   title: string;
//   description: string;
//   icon: string;
// }

// export default function FacilitiesSection() {
//   const router = useRouter();
  
//   // Embla Carousel Setup for Mobile
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
//   const isPausedRef = useRef(false);

//   // Auto-play logic for carousel
//   useEffect(() => {
//     if (!emblaApi) return;
//     const intervalMs = 3000; // 3 seconds per slide
//     const id = window.setInterval(() => {
//       if (isPausedRef.current) return;
//       emblaApi.scrollNext();
//     }, intervalMs);
//     return () => window.clearInterval(id);
//   }, [emblaApi]);
  
//   // Naye JSON structure ke according mapping
//   const { title, subtitle, description, items } = facilitiesData;

//   // Icon Mapping Function (JSON ke "icon" string ko Lucide icons mein convert karega)
//   const getIcon = (iconName: string) => {
//     const iconClass = "w-7 h-7 text-[#C5A870] group-hover:scale-110 group-hover:text-white transition-all duration-500";
//     switch (iconName) {
//       case "restaurant": return <UtensilsCrossed className={iconClass} />;
//       case "meeting": return <Building className={iconClass} />;
//       case "pool": return <Waves className={iconClass} />;
//       case "utensils": return <ChefHat className={iconClass} />;
//       case "games": return <Dices className={iconClass} />;
//       case "kids": return <Baby className={iconClass} />;
//       case "forest": return <TreePine className={iconClass} />;
//       case "spa": return <Flower2 className={iconClass} />;
//       case "book": return <BookOpen className={iconClass} />;
//       case "water": return <Droplets className={iconClass} />;
//       case "fire": return <Flame className={iconClass} />;
//       case "camp": return <Tent className={iconClass} />;
//       default: return <Sparkles className={iconClass} />;
//     }
//   };

//   return (
//     <section className="relative w-full py-8 md:py-0  overflow-hidden">
      
//       {/* 🌟 Background Ambient Golden Glow */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C5A870]/5 blur-[120px] rounded-full pointer-events-none z-0" />

//       <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
      
//       <SectionHeader 
//         subtitle={subtitle} 
//         title={title} 
//         description={description} 
//         className="text-center mb-16 max-w-3xl mx-auto"
//       /> 
//         {/* 🌿 DESKTOP & TABLET: Facilities Grid (Hidden on Mobile) */}
//         <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
//           {items.map((item: FacilityItem, index: number) => (
//             <motion.div 
//               key={item.id} 
//               initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
//               whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
//               viewport={{ once: true, margin: "-50px" }}
//               className="group relative p-8 rounded-3xl overflow-hidden glass-card border border-white/5 hover:border-[#C5A870]/40 hover:bg-white/[0.02] transition-all duration-500 cursor-default"
//             >
//               {/* Icon Wrapper */}
//               <div className="w-14 h-14 rounded-full bg-[#C5A870]/10 flex items-center justify-center mb-6 group-hover:bg-[#C5A870]/20 transition-colors duration-500 shadow-[0_0_15px_rgba(197,168,112,0.05)]">
//                 {getIcon(item.icon)}
//               </div>
              
//               {/* Content */}
//               <h3 className="text-lg md:text-xl font-serif text-[#E8D3A2] mb-3 leading-snug drop-shadow-md group-hover:text-white transition-colors duration-300">
//                 {item.title}
//               </h3>
//               <p className="text-xs md:text-sm text-[#AFAAA0] font-light leading-relaxed">
//                 {item.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         {/* 🌿 MOBILE: Auto-play Carousel (Hidden on Desktop) */}
//         <motion.div 
//           initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
//           whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//           viewport={{ once: true }}
//           className="md:hidden overflow-hidden mb-12" 
//           ref={emblaRef}
//           onTouchStart={() => (isPausedRef.current = true)}
//           onTouchEnd={() => (isPausedRef.current = false)}
//         >
//           <div className="flex gap-4 cursor-grab active:cursor-grabbing">
//             {items.map((item: FacilityItem) => (
//               <div 
//                 key={item.id} 
//                 className="flex-[0_0_85%] min-w-0 relative p-6 rounded-3xl overflow-hidden glass-card border border-white/5"
//               >
//                 <div className="w-12 h-12 rounded-full bg-[#C5A870]/10 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(197,168,112,0.05)]">
//                   {getIcon(item.icon)}
//                 </div>
//                 <h3 className="text-lg font-serif text-[#E8D3A2] mb-2 leading-snug drop-shadow-md">
//                   {item.title}
//                 </h3>
//                 <p className="text-xs text-[#AFAAA0] font-light leading-relaxed">
//                   {item.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </motion.div>

  

//         <AnimatedButton 
//           text="Explore All Facilities" 
//           onClick={() => router.push('/facilities')} 
//         />
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  ChevronRight, UtensilsCrossed, Building, Waves, ChefHat, 
  Dices, Baby, TreePine, Flower2, BookOpen, Droplets, Flame, Tent, Sparkles 
} from "lucide-react";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import facilitiesData from "@/data/facilities.json"; 
import SectionHeader from "@/reusebleComponents/SectionHeader";
import AnimatedButton from "@/reusebleComponents/AnimatedButton";

interface FacilityItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function FacilitiesSection() {
  const router = useRouter();
  
  // ==========================================
  // MOBILE: Embla Carousel Setup (0% Change)
  // ==========================================
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
  
  const { title, subtitle, description, items } = facilitiesData;

  const getIcon = (iconName: string) => {
    const iconClass = "w-7 h-7 text-[#C5A870] group-hover:scale-110 group-hover:text-white transition-all duration-500";
    switch (iconName) {
      case "restaurant": return <UtensilsCrossed className={iconClass} />;
      case "meeting": return <Building className={iconClass} />;
      case "pool": return <Waves className={iconClass} />;
      case "utensils": return <ChefHat className={iconClass} />;
      case "games": return <Dices className={iconClass} />;
      case "kids": return <Baby className={iconClass} />;
      case "forest": return <TreePine className={iconClass} />;
      case "spa": return <Flower2 className={iconClass} />;
      case "book": return <BookOpen className={iconClass} />;
      case "water": return <Droplets className={iconClass} />;
      case "fire": return <Flame className={iconClass} />;
      case "camp": return <Tent className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  // ==========================================
  // DESKTOP: Sticky Scroll Setup
  // ==========================================
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 25, 
    restDelta: 0.0001 
  });

  const gridY = useTransform(smoothProgress, [0, 1], ["3%", "-65%"]);

  return (
    <>
   
      <section ref={containerRef} className="hidden md:block relative w-full h-[300vh] isolate mb-16">
        
     
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C5A870]/5 blur-[120px] rounded-full pointer-events-none z-0" />

    
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden z-10 py-3">
          
    
          <div className="w-full z-30 shrink-0">
            <SectionHeader 
              subtitle={subtitle} 
              title={title} 
              description={description} 
              className="text-center max-w-3xl mx-auto px-4"
            /> 
          </div>

  
          <div 
            className="relative flex-1 w-full max-w-7xl mx-auto overflow-hidden z-20 my-4"
            style={{
          
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)"
            }}
          >
            <motion.div 
              style={{ y: gridY }} 
              className="absolute top-0 left-0 w-full px-6 lg:px-16 pb-12 will-change-transform"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {items.map((item: FacilityItem) => (
                  <div 
                    key={item.id} 
                    className="group relative p-8 rounded-3xl overflow-hidden glass-card border border-black/5 hover:border-[#C5A870]/40 transition-all duration-500 cursor-default shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#C5A870]/10 flex items-center justify-center mb-6 group-hover:bg-[#C5A870]/20 transition-colors duration-500 shadow-[0_0_15px_rgba(197,168,112,0.05)]">
                      {getIcon(item.icon)}
                    </div>
                    <h3 className="text-lg md:text-xl font-serif text-[var(--secondary-color)] mb-3 leading-snug drop-shadow-sm transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--text-gray)] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 🔥 3. Sticky Button (Always visible at bottom) */}
          <div className="w-full flex justify-center z-30 shrink-0">
            <AnimatedButton 
              text="Explore All Facilities" 
              onClick={() => router.push('/facilities')} 
              className=""
            />
          </div>
          
        </div>
      </section>

      {/* =========================================
           MOBILE VIEW 
          ========================================= */}
      <section className="md:hidden relative w-full py-0 overflow-hidden mb-16">
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 mt-6">
          
          <SectionHeader 
            subtitle={subtitle} 
            title={title} 
            description={description} 
            className="text-center mb-16 max-w-3xl mx-auto"
          /> 
          
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="overflow-hidden mb-12" 
            ref={emblaRef}
            onTouchStart={() => (isPausedRef.current = true)}
            onTouchEnd={() => (isPausedRef.current = false)}
          >
            <div className="flex gap-4 cursor-grab active:cursor-grabbing">
              {items.map((item: FacilityItem) => (
                <div 
                  key={item.id} 
                  className="flex-[0_0_85%] min-w-0 relative p-6 rounded-3xl overflow-hidden glass-card border border-black/5 shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C5A870]/10 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(197,168,112,0.05)]">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-lg font-serif text-[var(--secondary-color)] mb-2 leading-snug drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-gray)] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <AnimatedButton 
            text="Explore All Facilities" 
            onClick={() => router.push('/facilities')} 
          />
        </div>
      </section>
    </>
  );
}