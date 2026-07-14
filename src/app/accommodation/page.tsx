"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import roomsData from "@/data/rooms.json";

export default function AccommodationPage() {
  const { title, subtitle, roomsIntro, rooms } = roomsData;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#02542C] via-[#0B3F28] via-40% to-[#0D1410] pt-32 pb-24 px-4 md:px-16 overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-emerald-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ========================================================= */}
        {/* 🌟 PAGE HEADER (Smooth Load Animation)                     */}
        {/* ========================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-serif gold-text-gradient tracking-widest uppercase mb-4">
            {title}
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xs md:text-sm tracking-[0.3em] text-yellow-500/80 uppercase mb-8"
          >
            {subtitle}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-gray-300 font-light leading-relaxed text-sm md:text-base"
          >
            {roomsIntro}
          </motion.p>
        </motion.div>

        {/* ========================================================= */}
        {/* 🌟 ROOM LISTINGS (Scroll Triggered Animation)              */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-24">
          {rooms.map((room, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.section 
                key={room.id} 
                id={room.name.toLowerCase()} // Handles the auto-scroll from Homepage
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                
                {/* Images Grid (Staggered Animation) */}
                <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="col-span-2 h-[300px] md:h-[400px] rounded-3xl overflow-hidden relative shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10 group"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={room.images[0]}
                        alt={room.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-700 group-hover:scale-105"
                        priority={index === 0}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-[150px] md:h-[200px] rounded-3xl overflow-hidden relative border border-white/10"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={room.images[1]}
                        alt={room.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-[150px] md:h-[200px] rounded-3xl overflow-hidden relative border border-white/10"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={room.images[2]}
                        alt={room.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Content Box (Sliding in from Side) */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="w-full lg:w-1/2 flex flex-col justify-center glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden"
                >
                  
                  {/* Subtle Background Number */}
                  {/* <span className="absolute -top-10 -right-4 text-[150px] font-serif text-white/[0.02] font-bold pointer-events-none select-none">
                    0{index + 1}
                  </span> */}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-4xl md:text-5xl font-serif text-white">{room.name}</h2>
                      <span className="text-[10px] text-yellow-500 font-mono tracking-widest border border-yellow-500/20 px-3 py-1 rounded-full bg-yellow-500/10">
                        {room.roomNumbers}
                      </span>
                    </div>

                    <h3 className="text-xs md:text-sm text-yellow-600 uppercase tracking-widest mb-6">
                      {room.tagline}
                    </h3>
                    
                    <p className="text-gray-300 font-light leading-relaxed text-sm mb-8">
                      {room.description}
                    </p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      
                      {/* Price Block */}
                      {/* <div className="bg-[#0a0f0c]/50 border border-white/5 p-4 rounded-2xl">
                        <p className="text-yellow-500 text-sm font-semibold mb-1">{room.price}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                          {room.inclusions} <br/> {room.perNight}
                        </p>
                      </div> */}

                      {/* Extra Charges Block */}
                      {/* <div className="bg-[#0a0f0c]/50 border border-white/5 p-4 rounded-2xl flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2 text-white">
                          <Users className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs uppercase tracking-widest">Extra Guest</span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-relaxed">
                          {room.extraPersonCharges}
                        </p>
                      </div> */}
                    </div>

                    {/* Book Now Button */}
                    <button
                      type="button"
                      className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] shadow-[0_0_20px_rgba(212,175,55,0.3)] group"
                      onClick={() => {
                        // Open the Quick Enquiry drawer by clicking its trigger programmatically.
                        const trigger = document.querySelector<HTMLButtonElement>(
                          'button[aria-label="Open Quick Enquiry"], button[data-enquiry-trigger="true"]'
                        );
                        trigger?.click();
                      }}
                    >
                      For More Details
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>

                </motion.div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </main>
  );
}