"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image"; // 🔥 ADDED: Next.js Image import
import { ArrowRight } from "lucide-react";
import roomsData from "@/data/rooms.json";
import SectionHeader from "@/reusebleComponents/SectionHeader";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DesktopRoomSlide({ room, index, scrollYProgress, total }: { room: any; index: number; scrollYProgress: MotionValue<number>; total: number }) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const fade = step * 0.25; 

  let inputs = [0, start, start + fade, end - fade, end, 1];
  let opacityVals = [0, 0, 1, 1, 0, 0];
  let yVals = [40, 40, 0, 0, -40, -40];

  if (index === 0) {
    inputs = [0, end - fade, end, 1];
    opacityVals = [1, 1, 0, 0];
    yVals = [0, 0, -40, -40];
  }
  if (index === total - 1) {
    inputs = [0, start, start + fade, 1];
    opacityVals = [0, 0, 1, 1];
    yVals = [40, 40, 0, 0];
  }

  const opacity = useTransform(scrollYProgress, inputs, opacityVals, { clamp: true });
  const y = useTransform(scrollYProgress, inputs, yVals, { clamp: true });
  const visibility = useTransform(opacity, (val) => (val > 0.05 ? "visible" : "hidden"));
  const pointerEvents = useTransform(opacity, (val) => (val > 0.5 ? "auto" : "none"));

  return (
    <motion.div style={{ opacity, y, visibility, pointerEvents }} className="absolute inset-0 flex flex-col justify-center">
      <div>
        <h3 className="text-4xl md:text-6xl font-serif text-white mb-2 leading-tight">{room.name}</h3>
        <p className="text-yellow-600 uppercase tracking-widest text-[10px] md:text-xs mb-4">{room.tagline}</p>
        <p className="text-gray-300 text-sm leading-relaxed mb-8 line-clamp-3 max-w-md">{room.description}</p>
        <Link href={`/accommodation#${room.name.toLowerCase()}`}>
          <button className="cursor-pointer flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold uppercase text-[10px] tracking-[0.2em] transition-all hover:opacity-90 hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            Explore Details <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BackgroundLayer({ room, index, total, scrollYProgress }: { room: any, index: number, total: number, scrollYProgress: MotionValue<number> }) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const fade = step * 0.25;
  
  const inputs = [0, start, start + fade, end - fade, end, 1];
  const opacity = useTransform(scrollYProgress, inputs, [0, 0, 1, 1, 0, 0], { clamp: true });

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      {/* 🔥 FIX: Changed to Next.js Image */}
      <Image 
        src={room.images[0]} 
        alt={room.name} 
        fill 
        sizes="100vw"
        priority={index === 0} // LCP fast load for the first image
        className="object-cover scale-105" 
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
    </motion.div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ForegroundImageLayer({ room, index, total, scrollYProgress }: { room: any, index: number, total: number, scrollYProgress: MotionValue<number> }) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const fade = step * 0.25;

  let inputs = [0, start, start + fade, end - fade, end, 1];
  let opacityVals = [0, 0, 1, 1, 0, 0];
  let yVals = [30, 30, 0, 0, -30, -30];
  
  if (index === 0) {
    inputs = [0, end - fade, end, 1];
    opacityVals = [1, 1, 0, 0];
    yVals = [0, 0, -30, -30];
  }
  if (index === total - 1) {
    inputs = [0, start, start + fade, 1];
    opacityVals = [0, 0, 1, 1];
    yVals = [30, 30, 0, 0];
  }
  
  const opacity = useTransform(scrollYProgress, inputs, opacityVals, { clamp: true });
  const y = useTransform(scrollYProgress, inputs, yVals, { clamp: true });
  const visibility = useTransform(opacity, (val) => (val > 0.05 ? "visible" : "hidden"));

  return (
    <motion.div style={{ opacity, y, visibility }} className="absolute inset-0">
      {/* 🔥 FIX: Changed to Next.js Image */}
      <Image 
        src={room.images[0]} 
        alt={room.name} 
        fill 
        sizes="50vw"
        priority={index === 0}
        className="object-cover" 
      />
      <div className="absolute inset-0 bg-black/20" />
    </motion.div>
  );
}

/* -------------------- MAIN COMPONENT -------------------- */
export default function CuratedStays() {
  const containerRef = useRef<HTMLElement>(null);
  const rooms = roomsData.rooms;
  const roomCount = rooms.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="stay" ref={containerRef} className="relative w-full h-auto lg:h-[450vh]">
      
      {/* 1. DYNAMIC BACKGROUND LAYER (Fixed & Syncing) */}
      <div className="hidden lg:block fixed inset-0 z-0 pointer-events-none">
        {rooms.map((room, index) => (
          <BackgroundLayer 
            key={room.id} 
            room={room} 
            index={index} 
            total={roomCount} 
            scrollYProgress={scrollYProgress} 
          />
        ))}
      </div>

      {/* 2. STICKY CONTENT AREA */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full flex-col items-center justify-center overflow-hidden px-16 lg:px-24 z-10">
        <div className="absolute top-2 z-20 text-center ">
          {/* <h2 className="text-4xl md:text-5xl font-serif gold-text-gradient tracking-widest">{roomsData.title.toUpperCase()}</h2>
          <p className="text-xs tracking-[0.3em] text-white/50 uppercase mt-2">{roomsData.subtitle}</p> */}
          <SectionHeader 
            subtitle={roomsData.subtitle}
            title={roomsData.title}
            // description="Discover a curated selection of our finest accommodations, each offering a unique blend of comfort, style, and local charm. Explore the details of each stay to find your perfect retreat."
            className="text-center mb-16  max-w-3xl mx-auto"
          /> 
        </div>

        <div className="relative z-10 w-full max-w-7xl flex items-center justify-between gap-12 mt-12">
          {/* IMAGE STACK (Foreground) */}
          <div className="relative w-1/2 aspect-[4/3] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl">
            {rooms.map((room, index) => (
              <ForegroundImageLayer 
                key={room.id} 
                room={room} 
                index={index} 
                total={roomCount} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </div>

          {/* CONTENT STACK */}
          <div className="relative w-1/2 h-[450px] flex items-center pl-4">
            {rooms.map((room, i) => (
              <DesktopRoomSlide key={room.id} room={room} index={i} scrollYProgress={scrollYProgress} total={roomCount} />
            ))}
          </div>
        </div>
      </div>

      {/* 3. MOBILE VIEW */}
      <div className="lg:hidden flex flex-col px-4 py-8 w-full">
        <div className="lg:hidden flex flex-col px-4 md:px-12 py-0 w-full">
          <div className="text-center mb-12">
           <SectionHeader 
            subtitle={roomsData.subtitle}
            title={roomsData.title}
            // description="Discover a curated selection of our finest accommodations, each offering a unique blend of comfort, style, and local charm. Explore the details of each stay to find your perfect retreat."
            className="text-center mb-16  max-w-3xl mx-auto"
          /> 
          </div>

          <div className="flex flex-col gap-10">
            {rooms.map((room, index) => (
              <div key={room.id} className="glass-card rounded-3xl overflow-hidden border border-white/10 flex flex-col">
                <div className="w-full h-[300px] relative">
                  {/* 🔥 FIX: Changed to Next.js Image */}
                  <Image 
                    src={room.images[0]} 
                    alt={room.name} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                </div>
                
                <div className="p-6 md:p-8 flex flex-col relative -mt-10 z-10">
                  <h3 className="text-3xl font-serif text-white mb-1">{room.name}</h3>
                  <p className="text-yellow-600 uppercase tracking-widest text-[10px] mb-4">{room.tagline}</p>
                  <p className="text-gray-300 text-xs leading-relaxed mb-8 line-clamp-3">
                    {room.description}
                  </p>
                  <Link href={`/accommodation#${room.name.toLowerCase()}`}>
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-yellow-500 hover:text-black uppercase text-[10px] tracking-widest transition-all text-white group">
                      Explore Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}