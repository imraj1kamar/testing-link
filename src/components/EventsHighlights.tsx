"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion";
import { ChevronRight, Sparkles, Briefcase, PartyPopper, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import eventsData from "@/data/eventsHighlights.json";
import SectionHeader from "@/reusebleComponents/SectionHeader";

const getIcon = (index: number) => {
  if (index === 0) return <Sparkles className="w-5 h-5 text-yellow-500" />;
  if (index === 1) return <Briefcase className="w-5 h-5 text-yellow-500" />;
  return <PartyPopper className="w-5 h-5 text-yellow-500" />;
};

function DesktopEventSlide({
  item,
  index,
  scrollYProgress,
  total,
  images
}: {
  item: {
    id: string | number;
    title: string;
    description: string;
  };
  index: number;
  scrollYProgress: MotionValue<number>;
  total: number;
  images: string[];
}) {
  const step = 1 / total;
  const [frontIndex, setFrontIndex] = useState(0);
  
  const inputs: number[] = [];
  const opacityVals: number[] = [];
  const yVals: number[] = [];
  
  const start = index * step;
  const end = start + step;
  const fade = step * 0.2; 

  if (index === total - 1) {
    inputs.push(start, start + fade, 1);
    opacityVals.push(0, 1, 1);
    yVals.push(40, 0, 0);
  } else {
    inputs.push(start, start + fade, end - fade, end);
    opacityVals.push(0, 1, 1, 0);
    yVals.push(40, 0, 0, -40);
  }

  const opacity = useTransform(scrollYProgress, inputs, opacityVals);
  const y = useTransform(scrollYProgress, inputs, yVals);

  const myImages = index === 0 ? [images[0], images[1]] : 
                   index === 1 ? [images[2], images[3]] : 
                   [images[4], images[5], images[6]];

  const handleNext = () => setFrontIndex((prev) => (prev + 1) % myImages.length);
  const handlePrev = () => setFrontIndex((prev) => (prev - 1 + myImages.length) % myImages.length);

  return (
    <motion.div 
      style={{ opacity, y, zIndex: total - index }} 
      className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
    >
      <div className="w-full h-[500px] flex flex-col lg:flex-row gap-16 pointer-events-auto">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center pr-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner">
              {getIcon(index)}
            </div>
            <span className="text-yellow-500 font-mono text-sm tracking-widest block">
              0{index + 1}
            </span>
          </div>
          
          <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-snug drop-shadow-lg">
            {item.title}
          </h3>
          <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8">
            {item.description}
          </p>
          
          <button className="px-8 py-3 w-max rounded-full border border-white/20 hover:bg-yellow-500/20 uppercase text-[10px] tracking-widest transition-all text-white backdrop-blur-sm">
            Plan Your Event
          </button>
        </div>

        <div className="w-full lg:w-1/2 relative h-full flex items-center justify-center">
          
          {myImages.map((imgSrc, imgIdx) => {
            const relativeIndex = (imgIdx - frontIndex + myImages.length) % myImages.length;
            
            let zIndex = 10, scale = 0.8, x = "0%", y = "0%", imgOpacity = 1;

            if (relativeIndex === 0) {
              zIndex = 30; scale = 1; x = "15%"; y = "-15%"; imgOpacity = 1;
            } else if (relativeIndex === 1) {
              zIndex = 20; scale = 0.9; x = "-15%"; y = "15%"; imgOpacity = 0.7;
            } else {
              zIndex = 10; scale = 0.8; x = "0%"; y = "0%"; imgOpacity = 0;
            }
            
            return (
              <motion.div 
                key={imgIdx} 
                animate={{ zIndex, scale, x, y, opacity: imgOpacity }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -mt-[32.5%] -ml-[32.5%] w-[65%] h-[65%] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] will-change-transform"
              >
                <div className="relative w-full h-full">
                  <Image 
                    src={imgSrc} 
                    alt={item.title} 
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover" 
                    priority={index === 0 && imgIdx === 0}
                  />
                </div>
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            );
          })}

          {myImages.length > 1 && (
            <div className="cursor-pointer absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
              <button onClick={handlePrev} className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-yellow-500 hover:text-black hover:scale-110 transition-all shadow-xl">
                <ChevronUp className="w-5 h-5" />
              </button>
              <button onClick={handleNext} className="cursor-pointer p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-yellow-500 hover:text-black hover:scale-110 transition-all shadow-xl">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
}

function MobileEventCard({ item, index, images }: { 
  item: {
    id: string | number;
    title: string;
    description: string;
  };
  index: number; 
  images: string[]; 
}) {
  const [frontIndex, setFrontIndex] = useState(0);
  const myImages = index === 0 ? [images[0], images[1]] : 
                   index === 1 ? [images[2], images[3]] : 
                   [images[4], images[5], images[6]];

  const handleNext = () => setFrontIndex((prev) => (prev + 1) % myImages.length);

  return (
    <div className="snap-center shrink-0 w-[85vw] md:w-[60vw] glass-card rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col relative">
      <div className="w-full h-56 relative overflow-hidden group">
        <motion.div
          key={frontIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full"
        >
          <Image 
            src={myImages[frontIndex]} 
            alt={item.title} 
            fill
            sizes="(max-width: 1024px) 85vw, 50vw"
            className="object-cover" 
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#121814] to-transparent" />
        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
          {getIcon(index)}
        </div>

        {myImages.length > 1 && (
          <button onClick={handleNext} className="absolute bottom-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-yellow-500 hover:text-black transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="p-6 md:p-8 flex flex-col flex-1 bg-[#121814]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-2xl font-serif text-white">{item.title}</h3>
          <span className="text-xs text-yellow-500 font-mono">{frontIndex + 1}/{myImages.length}</span>
        </div>
        <p className="text-sm text-gray-400 font-light leading-relaxed mb-6 flex-1">
          {item.description}
        </p>
        <button className="w-full py-3 rounded-full border border-white/20 hover:bg-yellow-500/20 uppercase text-[10px] tracking-widest transition-all text-white">
          Plan Event
        </button>
      </div>
    </div>
  );
}

export default function EventsHighlights() {
  const containerRef = useRef<HTMLElement>(null);
  const { items, image: images } = eventsData;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 25, 
    restDelta: 0.0001 
  });

  const drawTrail = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section id="events" ref={containerRef} className="relative w-full h-auto lg:h-[250vh] ">
      
      <div className="lg:hidden flex flex-col mt-10 w-full relative z-10 overflow-hidden">
        
        <div className="px-6 md:px-12 mb-12 text-center">
       <SectionHeader 
            subtitle={eventsData.subtitle} 
            title={eventsData.title} 
            className="text-center mb-4 max-w-3xl mx-auto"
          /> 
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-10 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {items.map((item, index) => (
            <MobileEventCard key={item.id} item={item} index={index} images={images} />
          ))}
        </div>
        
        <div className="flex justify-center items-center gap-2 text-white/40 text-[10px] tracking-widest uppercase mt-4">
          <ChevronRight className="w-4 h-4" /> Swipe to explore events
        </div>
      </div>

      <div className="hidden lg:flex sticky top-0 h-screen w-full flex-col items-center justify-center overflow-hidden px-16 lg:px-24">
        
        <div className="absolute inset-0  z-0 opacity-90" />
        
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center opacity-30 will-change-transform">
          <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <motion.path
              d="M 1100,0 C 700,200 700,600 100,800"
              fill="none"
              stroke="url(#goldGradientEvents)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ pathLength: drawTrail }}
              filter="drop-shadow(0 0 10px rgba(212,175,55,0.6))"
            />
            <defs>
              <linearGradient id="goldGradientEvents" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF8D6" stopOpacity="0" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8B6508" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute top-3 z-20 w-full flex flex-col items-center">
   
<SectionHeader 
            subtitle={eventsData.subtitle} 
            title={eventsData.title} 
            className="text-center mb-4 max-w-3xl mx-auto"
          /> 

        </div>

        <div className="relative z-10 w-full max-w-7xl mt-50 h-[65vh]">
          {items.map((item, index) => (
            <DesktopEventSlide 
              key={item.id} 
              item={item} 
              index={index} 
              scrollYProgress={smoothProgress} 
              total={items.length} 
              images={images}
            />
          ))}
        </div>

      </div>
    </section>
  );
}