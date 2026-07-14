"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import propertyData from "@/data/propertyoverview.json";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import InteractiveMapModal from "@/components/InteractiveMapModal"; 
import SectionHeader from "@/reusebleComponents/SectionHeader";

// TypeScript Interfaces (Unchanged)
interface FeatureItem { letter: string; text: string; }
interface SubSection { title: string; items: FeatureItem[]; }
interface FeatureSection {
  title: string;
  items: FeatureItem[];
  subSections?: SubSection[];
}



const mapLocationsData = [
  {
    id: "entry-gate",
    title: "Entry Gate",
    desc: "Grand entrance to the property.",
    x: "55.00%",
    y: "75.00%",
    image: "/images/gallery/8.jpeg",

  },
  // --- Lawn Area ---
  {
    id: "lawn-owl-valley-1",
    title: "Owl Valley Lawn-1",
    desc: "Spacious lawn for relaxed evenings.",
    x: "84.00%",
    y: "20.00%",
    image: "/images/facilities/_65A4866.jpg",
  },
  {
    id: "lawn-owl-valley-2",
    title: "Owl Valley Lawn-2",
    desc: "Perfect spot for gatherings & events.",
   x: "76.00%",
    y: "30.00%",
    image: "/images/facilities/_65A4866.jpg",
  },
  {
    id: "lawn-chavni-bonfire",
    title: "Chavni / Bonfire Area",
    desc: "Warm bonfire vibes under the stars.",
    x: "38.00%",
    y: "40.00%",
    image: "/images/facilities/bonfire.jpg",
  },
  {
    id: "lawn-kadamb",
    title: "Kadamb",
    desc: "A serene corner for quiet moments.",
    x: "26.00%",
    y: "70.00%",
    image: "/images/facilities/_65A5186.jpg",
  },
  // {
  //   id: "lawn-shamiyana",
  //   title: "Shamiyana",
  //   desc: "Elegant seating zone for celebrations.",
  //   x: "26.00%",
  //   y: "30.00%",
  //   image: "/images/facilities/_65A4866.jpg",
  // },

  // --- Dining ---
  {
    id: "dining-restaurant",
    title: "Restaurant ",
    desc: "Dine with a view.",
    x: "7.00%",
    y: "55.00%",
    image: "/images/facilities/5.jpeg",
  },
  {
    id: "duplex",
    title: "Duplex",
    desc: "Comfortable living with premium finishes.",
      x: "23.00%",
    y: "53.00%",
    image: "/images/facilities/_65A5186.jpg",
  },
  {
 id: "machan",
    title: "Machan",
    desc: "Elevated dining experience.",
   x: "30.00%",
    y: "46.00%",
    image: "/images/machan/4.jpg",
  },
  {
    id: "osari",
    title: "Osari",
    desc: "Traditional dining with a modern twist.",
    x: "28.00%",
    y: "53.00%",
    image: "/images/machan/4.jpg",
  },

  // --- Fun Activities ---
  {
    id: "activity-infinity-pool",
    title: "Infinity Pool",
    desc: "Relax, unwind and rejuvenate.",
    x: "12.00%",
    y: "75.00%",
    image: "/images/pools/_65A4480.jpg",
  },
  {
    id: "spa",
    title: "Spa",
    desc: "Rejuvenate your senses.",
    x: "8.00%",
    y: "72.00%",
    image: "/images/facilities/_65A5175.jpg",
  },
  {
    id: "activity-owl-valley-waterfalls",
    title: "Owl Valley Waterfalls",
    desc: "Soothing views and a refreshing vibe.",
    x: "88.00%",
    y: "10.00%",
    image: "/images/natureHighlights/water-fall.jpeg",
  },

  // --- Function Area ---
  {
    id: "function-wada",
    title: "Wada",
    desc: "Heritage stay experience.",
    x: "30.00%",
    y: "35.00%",
    image: "/images/wada/1.jpeg",
  },
  {
    id: "function-banquet-hall",
    title: "Banquet Hall",
    desc: "Host memorable celebrations.",
    x: "13.00%",
    y: "46.00%",
    image: "/images/facilities/6.jpeg",
  },
  {
    id: "function-wada-event-outside",
    title: "Wada event outside area",
    desc: "Open-air events with valley vibes.",
    x: "24.00%",
    y: "38.00%",
    image: "/images/eventsHighlights/1.jpg",
  },
  {
id: "machi",
    title: "Machi",
    desc: "Elevated platform for performances & views.",
    x: "16.00%",
    y: "39.00%",
    image: "/images/hero/5.jpg",
  },
  {
    id: "function-back-event-torna-view",
    title: "Back event area with Torna View",
    desc: "A scenic backdrop for special moments.",
    x: "38.00%",
    y: "26.00%",
    image: "/images/facilities/wada-backside-events.jpg",
  },

  // --- Entry ---
  {
    id: "entry-parking",
    title: "Parking",
    desc: "Convenient & secure.",
    x: "60.00%",
    y: "52.00%",
    image: "/images/facilities/_65A4815.jpg",
  },
  {
    id: "entry-reception",
    title: "Reception",
    desc: "Warm welcome & check-in.",
    x: "26.00%",
    y: "83.00%",
    image: "/images/facilities/_65A4810.jpg",
  },
];

export default function Property() {
  const { intro, image, features } = propertyData;
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      <section id="property" className="relative w-full pb-17  px-6 md:px-10 overflow-hidden">
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px]  rounded-full pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
        
<SectionHeader
            subtitle="Discover the Essence of Durgbhumi"
            title={propertyData.title}
            description="Explore the unique features and offerings of Durgbhumi, where tradition meets modernity."
            className="text-center mb-20 max-w-3xl mx-auto"
          />
          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Overview Image + Intro */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden border border-white/50 shadow-xl cursor-pointer group"
                onClick={() => setIsMapOpen(true)}
              >
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                  <div className="glass-card px-6 py-3 rounded-full flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-[var(--gold-dark)]" />
                    <span className="text-xs uppercase tracking-widest font-medium text-[var(--gold-dark)]">
                      Explore Interactive Map
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="glass-card p-8 rounded-3xl border border-white/50">
                <h3 className="text-xl font-serif text-[var(--gold-dark)] mb-4">{intro.heading}</h3>
                <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed">{intro.description}</p>
              </div>
            </div>

            {/* Right: Dynamic Features Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.sections.map((section: FeatureSection, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                  className="glass-card p-6 rounded-2xl border border-white/50 hover:border-[var(--gold-primary)]/40 transition-all"
                >
                  <h4 className="text-[var(--gold-primary)] font-serif text-lg mb-4 uppercase tracking-widest">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item: FeatureItem, i: number) => (
                      <li key={i} className="text-xs md:text-sm text-[var(--text-primary)] flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[var(--gold-primary)]/10 text-[var(--gold-primary)] flex items-center justify-center text-[10px] font-bold shrink-0">
                          {item.letter}
                        </span>
                        {item.text}
                      </li>
                    ))}
                  </ul>

                  {section.subSections?.map((sub, subIdx) => (
                    <div key={subIdx} className="mt-5">
                      <h5 className="text-[var(--gold-primary)] font-serif text-sm mb-3 uppercase tracking-widest">
                        {sub.title}
                      </h5>
                      <ul className="space-y-2">
                        {sub.items.map((item: FeatureItem, i: number) => (
                          <li
                            key={i}
                            className="text-xs md:text-sm text-[var(--text-primary)] flex items-center gap-3"
                          >
                            <span className="w-6 h-6 rounded-full bg-[var(--gold-primary)]/10 text-[var(--gold-primary)] flex items-center justify-center text-[10px] font-bold shrink-0">
                              {item.letter}
                            </span>
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 🔥 The Extracted Full-Screen Modal Component */}
     <InteractiveMapModal 
  isOpen={isMapOpen} 
  onClose={() => setIsMapOpen(false)} 
  imageSrc={image.src} 
  locations={mapLocationsData} // 🔥 Ye pura updated data yahan pass ho raha hai
/>
    </>
  );
}