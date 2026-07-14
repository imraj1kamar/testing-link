
"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // 🔥 ADDED: Next.js Image import
import amenitiesData from "@/data/amenities.json";
import SectionHeader from "@/reusebleComponents/SectionHeader";


export default function Amenities() {
  const { title, subtitle, description, amenities, commonImages } = amenitiesData;

  return (
    <section id="amenities" className="relative w-full py-13 px-6 md:px-16 ">
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-6 text-center flex flex-col items-center">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <p className="text-[var(--gold-primary)] text-xs tracking-[0.3em] uppercase mb-4">
              {subtitle}
            </p>

            <h2 className="text-4xl md:text-6xl font-serif gold-text-gradient tracking-wider mb-6 text-center">
              {title}
            </h2>

            <p className="text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl text-center">
              {description}
            </p>
          </motion.div> */}

          <SectionHeader 
            subtitle={subtitle} 
            title={title} 
            description={description} 
            className="text-center mb-4 max-w-3xl mx-auto"
          /> 
        </div>

        {/* Sidebar Layout: Left Cards, Right Sticky Images */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Amenities Cards */}
          <div className="flex flex-col gap-6">
            {amenities.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-white/5 hover:border-[var(--gold-primary)]/30 transition-all"
              >
                <h3 className="text-lg font-serif text-[var(--text-primary)] mb-3 group-hover:text-[var(--gold-light)]">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Sticky Images */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="grid grid-cols-2 gap-4">
              {commonImages.slice(0, 4).map((img, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  // 🔥 FIX: Added 'relative' here so <Image fill> works perfectly
                  className="relative rounded-2xl overflow-hidden aspect-square border border-white/5 shadow-xl"
                >
                  {/* 🔥 FIX: Replaced <img> with Next.js <Image> */}
                  <Image 
                    src={img} 
                    alt="Amenity" 
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover hover:scale-110 transition-transform duration-1000" 
                  />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
