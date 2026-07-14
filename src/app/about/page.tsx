// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// import aboutData from "@/data/about.json";
// import { dispatchHeroImageLoadedOnce } from "@/lib/loaderEvents";


// type AboutSection = {
//   id: string;
//   heading: string;
//   content?: string;
//   points?: string[];
//   image?: {
//     image_url: string;
//     alt_text: string;
//   };
// };

// export default function AboutPage() {
//   const about = aboutData.about_us;
//   const page_title = about?.page_title ?? "Our Story";
//   const sections = (about?.sections ?? []) as AboutSection[];
//   const footer_quote = about?.footer_quote ?? "";

//   const citeTagRegex = /\[[^\]]*\]/g;

//   // Removes citation tags automatically
//   const cleanText = (text: string) => text.replace(citeTagRegex, "");

//   const pointsVariants = {
//     hidden: { opacity: 0, x: -15 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.7, ease: "easeOut" as const },
//     },
//   } as const;

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#02542C] via-[#0B3F28] via-40% to-[#0D1410] overflow-hidden font-sans antialiased">
      
//       {/* 🌿 LUXURY CINEMATIC HERO SECTION */}
//       <section className="relative w-full h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
        
//         {/* Base Background Image Layer */}
//         <div className="absolute inset-0 w-full h-full z-0">
//           <Image
//             src={about.background_url || "/images/about/01.jpg"}
//             alt="About DurgBhumi Heritage Resort"
//             fill
//             priority 
//             onLoad={() => dispatchHeroImageLoadedOnce()}
//             className="object-cover object-center scale-105 transition-transform duration-[10s] ease-out"
//           />
//         </div>
        
//         {/* Exact Home-Hero Darkness Sync Layer */}
//         <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/20 to-[#0B0E0C]" />
        
//         {/* Atmospheric Vignette & Soft Golden Radial Glow */}
//         <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_35%,rgba(197,168,112,0.15),transparent_60%)]" />
//         <div className="absolute inset-0 z-[3] bg-[linear-gradient(to_bottom,rgba(11,14,12,0.3),rgba(11,14,12,0.1),rgba(11,14,12,0.85))]" />

//         {/* Text Content Engine */}
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.4, delay: 0.15, ease: "easeOut" }}
//           className="relative z-10 text-center px-4 flex flex-col items-center mt-12"
//         >
//           <div className="backdrop-blur-[1px]">
//             <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif gold-text-gradient tracking-wide py-2 drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
//               {page_title}
//             </h1>
//             <div className="flex items-center justify-center gap-4 mb-4">
//               <div className="w-10 h-[1px] bg-[#C5A870]/30" />
//               <p className="text-[10px] md:text-xs text-[#C5A870] tracking-[0.45em] uppercase font-light">
//                 Heritage & Heart
//               </p>
//               <div className="w-10 h-[1px] bg-[#C5A870]/30" />
//             </div>
//           </div>
//           {/* Flawless Bottom Border Accent */}
//           <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A870]/50 to-transparent mx-auto mt-6" />
//         </motion.div>
//       </section>

//       {/* 🌟 EDITORIAL CONTENT SECTIONS (Horizontal Scroll Motion) */}
//       <section className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 py-6 md:py-20 space-y-20 md:space-y-52">
//         {sections.map((section, index) => {
//           const isEven = index % 2 === 0;

//           // Dynamic Horizontal Animation Variants
//           const slideFromLeft = {
//             hidden: { opacity: 0, x: -80, filter: "blur(10px)" },
//             visible: { 
//               opacity: 1, 
//               x: 0, 
//               filter: "blur(0px)",
//               transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
//             },
//           };

//           const slideFromRight = {
//             hidden: { opacity: 0, x: 80, filter: "blur(10px)" },
//             visible: { 
//               opacity: 1, 
//               x: 0, 
//               filter: "blur(0px)",
//               transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
//             },
//           };

//           return (
//             <div
//               key={section.id}
//               className={`flex flex-col gap-12 md:gap-24 items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
//             >
              
//               {/* Image Canvas Frame */}
//               <motion.div 
//                 variants={isEven ? slideFromLeft : slideFromRight}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, margin: "-120px" }}
//                 className="w-full md:w-1/2 relative group perspective-1000"
//               >
//                 {/* 3D Offset Muted Golden Accent Border */}
//                 <div className="absolute inset-0 border border-[#C5A870]/15 rounded-3xl transform translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:border-[#C5A870]/35 z-0" />
                
//                 {/* Ultra-Luxury Glass Card Layer wrapper */}
//                 <div className="glass-card relative w-full h-[360px] sm:h-[460px] md:h-[560px] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] z-10 border border-white/5">
//                   {section.image?.image_url ? (
//                     <Image
//                       src={section.image.image_url}
//                       alt={section.image.alt_text}
//                       fill
//                       sizes="(max-width: 768px) 100vw, 50vw"
//                       className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
//                     />
//                   ) : null}
//                   {/* Subtle Inner Dark Shadow Anchor */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E0C]/90 via-transparent to-transparent pointer-events-none" />
//                 </div>
//               </motion.div>

//               {/* Text Editorial Sheet */}
//               <motion.div 
//                 variants={isEven ? slideFromRight : slideFromLeft}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, margin: "-120px" }}
//                 className="w-full lg:w-1/2 flex flex-col justify-center glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden"
//               >
//                 <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight drop-shadow-sm tracking-wide">
//                   {section.heading}
//                 </h2>

//                 {section.points?.length ? (
//                   <motion.ul
//                     className="space-y-6 text-sm md:text-base text-[#AFAAA0] font-light leading-relaxed"
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                     transition={{ staggerChildren: 0.18 }}
//                   >
//                     {section.points.map((point, i) => (
//                       <motion.li key={i} className="flex items-start gap-4" variants={pointsVariants}>
//                         {/* Custom Core-Glow bullet mapping layout variables */}
//                         <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#C5A870] shadow-[0_0_10px_#C5A870] shrink-0" />
//                         <span className="text-gray-300 font-light leading-relaxed text-sm mb-8">{cleanText(point)}</span>
//                       </motion.li>
//                     ))}
//                   </motion.ul>
//                 ) : (
//                   <p className="text-gray-300 font-light leading-relaxed text-sm mb-8">
//                     {cleanText(section.content ?? "")}
//                   </p>
//                 )}

//                 {/* Minimalist Asymmetrical Grad Line */}
//                 <div className="mt-10 h-[1px] w-1/4 mx-auto md:mx-0 bg-gradient-to-r from-[#C5A870]/30 to-transparent" />
//               </motion.div>
//             </div>
//           );
//         })}
//       </section>

//       {/* 🌟 PREMIUM LOWER END CLOSURE QUOTE */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1.8 }}
//         viewport={{ once: true }}
//         className="w-full py-28 md:py-36 px-6 text-center  relative overflow-hidden"
//       >
//         {/* Soft Core Lighting Gradients */}
//         <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(197,168,112,0.06),transparent_65%)]" />
        
//         <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
//           <svg className="w-8 h-8 text-[#C5A870]/30 mb-8 opacity-70" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//           </svg>

//          <h3 className="text-2xl md:text-4xl font-serif text-[#E8D3A2] font-light leading-relaxed tracking-wide drop-shadow-md">
//             &quot;{cleanText(footer_quote)}&quot;
//           </h3>
          
//           <div className="w-12 h-12 border border-[#C5A870]/15 rounded-full flex items-center justify-center mt-12 bg-white/5 backdrop-blur-md shadow-lg">
//              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A870] animate-pulse" />
//           </div>
//         </div>
//       </motion.section>
//     </main>
//   );
// }


"use client";

import Image from "next/image";
// 🔥 FIX: Imported Variants from framer-motion
import { motion, Variants } from "framer-motion"; 

import aboutData from "@/data/about.json";
import { dispatchHeroImageLoadedOnce } from "@/lib/loaderEvents";

type AboutSection = {
  id: string;
  heading: string;
  content?: string;
  points?: string[];
  image?: {
    image_url: string;
    alt_text: string;
  };
};

export default function AboutPage() {
  const about = aboutData.about_us;
  const page_title = about?.page_title ?? "Our Story";
  const sections = (about?.sections ?? []) as AboutSection[];
  const footer_quote = about?.footer_quote ?? "";

  const citeTagRegex = /\[[^\]]*\]/g;

  // Removes citation tags automatically
  const cleanText = (text: string) => text.replace(citeTagRegex, "");

  // 🔥 FIX: Added : Variants type
  const pointsVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#02542C] via-[#0B3F28] via-40% to-[#0D1410] overflow-hidden font-sans antialiased">
      
      {/* 🌿 LUXURY CINEMATIC HERO SECTION */}
      <section className="relative w-full h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
        
        {/* Base Background Image Layer */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={about.background_url || "/images/about/01.jpg"}
            alt="About DurgBhumi Heritage Resort"
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
              {page_title}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-10 h-[1px] bg-[#C5A870]/30" />
              <p className="text-[10px] md:text-xs text-[#C5A870] tracking-[0.45em] uppercase font-light">
                Heritage & Heart
              </p>
              <div className="w-10 h-[1px] bg-[#C5A870]/30" />
            </div>
          </div>
          {/* Flawless Bottom Border Accent */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A870]/50 to-transparent mx-auto mt-6" />
        </motion.div>
      </section>

      {/* 🌟 EDITORIAL CONTENT SECTIONS (Horizontal Scroll Motion) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 py-6 md:py-20 space-y-20 md:space-y-52">
        {sections.map((section, index) => {
          const isEven = index % 2 === 0;

          // 🔥 FIX: Added : Variants type here to solve the TypeScript Error
          const slideFromLeft: Variants = {
            hidden: { opacity: 0, x: -80, filter: "blur(10px)" },
            visible: { 
              opacity: 1, 
              x: 0, 
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
            },
          };

          // 🔥 FIX: Added : Variants type here too
          const slideFromRight: Variants = {
            hidden: { opacity: 0, x: 80, filter: "blur(10px)" },
            visible: { 
              opacity: 1, 
              x: 0, 
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
            },
          };

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
                {/* 3D Offset Muted Golden Accent Border */}
                <div className="absolute inset-0 border border-[#C5A870]/15 rounded-3xl transform translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:border-[#C5A870]/35 z-0" />
                
                {/* Ultra-Luxury Glass Card Layer wrapper */}
                <div className="glass-card relative w-full h-[360px] sm:h-[460px] md:h-[560px] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] z-10 border border-white/5">
                  {section.image?.image_url ? (
                    <Image
                      src={section.image.image_url}
                      alt={section.image.alt_text}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                    />
                  ) : null}
                  {/* Subtle Inner Dark Shadow Anchor */}
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
                  {section.heading}
                </h2>

                {section.points?.length ? (
                  <motion.ul
                    className="space-y-6 text-sm md:text-base text-[#AFAAA0] font-light leading-relaxed"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.18 }}
                  >
                    {section.points.map((point, i) => (
                      <motion.li key={i} className="flex items-start gap-4" variants={pointsVariants}>
                        {/* Custom Core-Glow bullet mapping layout variables */}
                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#C5A870] shadow-[0_0_10px_#C5A870] shrink-0" />
                        <span className="text-gray-300 font-light leading-relaxed text-sm mb-8">{cleanText(point)}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <p className="text-gray-300 font-light leading-relaxed text-sm mb-8">
                    {cleanText(section.content ?? "")}
                  </p>
                )}

                {/* Minimalist Asymmetrical Grad Line */}
                <div className="mt-10 h-[1px] w-1/4 mx-auto md:mx-0 bg-gradient-to-r from-[#C5A870]/30 to-transparent" />
              </motion.div>
            </div>
          );
        })}
      </section>

      {/* 🌟 PREMIUM LOWER END CLOSURE QUOTE */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
        viewport={{ once: true }}
        className="w-full py-28 md:py-36 px-6 text-center  relative overflow-hidden"
      >
        {/* Soft Core Lighting Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(197,168,112,0.06),transparent_65%)]" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <svg className="w-8 h-8 text-[#C5A870]/30 mb-8 opacity-70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

         <h3 className="text-2xl md:text-4xl font-serif text-[#E8D3A2] font-light leading-relaxed tracking-wide drop-shadow-md">
            &quot;{cleanText(footer_quote)}&quot;
          </h3>
          
          <div className="w-12 h-12 border border-[#C5A870]/15 rounded-full flex items-center justify-center mt-12 bg-white/5 backdrop-blur-md shadow-lg">
             <div className="w-1.5 h-1.5 rounded-full bg-[#C5A870] animate-pulse" />
          </div>
        </div>
      </motion.section>
    </main>
  );
}