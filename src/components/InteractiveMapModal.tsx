"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
import { ZoomIn, ZoomOut, MapPin, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ChevronLeft, RotateCcw } from "lucide-react";

interface MapLocation {
  id: string;
  title: string;
  desc: string;
  x: string;
  y: string;
  image: string;
}

interface InteractiveMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  locations: MapLocation[];
}

export default function InteractiveMapModal({ isOpen, onClose, imageSrc, locations }: InteractiveMapModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activePin, setActivePin] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const panX = useMotionValue(0);
  const panY = useMotionValue(0);

  const initialDistance = useRef<number | null>(null);
  const initialZoom = useRef<number>(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 0.3));
  const handleReset = () => { 
    setZoomLevel(1); 
    panX.set(0); 
    panY.set(0); 
    setActivePin(null); 
  };

  const panAmount = 150;
  const handlePan = (dx: number, dy: number) => {
    panX.set(panX.get() + dx);
    panY.set(panY.get() + dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      initialDistance.current = dist;
      initialZoom.current = zoomLevel;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance.current !== null) {
      if (e.cancelable) e.preventDefault(); 
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      const scaleChange = dist / initialDistance.current;
      const newZoom = Math.min(Math.max(initialZoom.current * scaleChange, 0.3), 4);
      setZoomLevel(newZoom);
    }
  };

  const handleTouchEnd = () => {
    initialDistance.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[#0B0E0C] overflow-hidden flex items-center justify-center touch-none"
        >
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-50 pointer-events-auto">
            <button 
              onClick={() => { onClose(); handleReset(); }}
              className="flex items-center gap-1 md:gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-white hover:bg-[#C5A870] hover:text-black transition-all shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-[10px] md:text-xs tracking-widest uppercase font-semibold">Back</span>
            </button>
          </div>

          <div 
            ref={mapContainerRef} 
            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => setActivePin(null)} 
          >
            <motion.div
              drag
              dragConstraints={mapContainerRef}
              style={{ x: panX, y: panY }}
              animate={{ scale: zoomLevel }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative inline-block rounded-lg md:rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
                <Image 
                  src={imageSrc} 
                  alt="Property Map" 
                  width={2500} 
                  height={1500} 
                  className="w-auto h-[100vh] md:w-[150vw] md:h-auto max-w-none object-contain pointer-events-none select-none"
                  draggable="false"
                  priority
                />

                {locations.map((loc) => {
                  const isSelected = activePin === loc.id;
                  return (
                    <div 
                      key={loc.id} 
                      className={`absolute ${isSelected ? "z-50" : "z-10 hover:z-50"}`} 
                      style={{ left: loc.x, top: loc.y, transform: 'translate(-50%, -50%)' }}
                    >
                      <button
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setActivePin(isSelected ? null : loc.id); 
                        }}
                        className="relative flex flex-col items-center group focus:outline-none p-4"
                      >
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-[#C5A870]/40 animate-ping pointer-events-none md:block" />
                        
                        <div className={`flex items-center justify-center transition-all duration-300 ${
                          isSelected 
                            ? "text-[#C5A870] md:text-black md:bg-[#C5A870] md:border md:border-white md:w-8 md:h-8 md:rounded-full md:shadow-xl scale-125 md:scale-110" 
                            : "text-[#C5A870] md:bg-black/80 md:backdrop-blur-md md:border md:border-[#C5A870] md:w-8 md:h-8 md:rounded-full md:shadow-xl group-hover:scale-110"
                        }`}>
                          <MapPin className="w-7 h-7 md:w-4 md:h-4 drop-shadow-lg md:drop-shadow-none" />
                        </div>

                        <div className={`absolute top-12 hidden md:block bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap transition-all duration-300 ${isSelected ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}>
                          <span className="text-[10px] font-bold text-white uppercase tracking-widest">{loc.title}</span>
                        </div>

                        <div className={`absolute top-12 pointer-events-none transition-all duration-300 ${isSelected ? "opacity-100 scale-100" : "opacity-0 md:group-hover:opacity-100 scale-95"}`}>
                          <div className="w-48 md:w-56 p-2 md:p-2.5 rounded-xl border border-white/20 shadow-2xl bg-black/95 flex flex-col gap-2">
                            <div className="relative w-full h-24 md:h-28 rounded-lg overflow-hidden border border-white/10">
                              <Image src={loc.image} alt={loc.title} fill className="object-cover" />
                            </div>
                            <div className="p-1">
                              <h4 className="text-[10px] md:text-[11px] font-bold text-white uppercase tracking-wider mb-1">{loc.title}</h4>
                              <p className="text-[9px] md:text-[10px] text-gray-400 leading-tight">{loc.desc}</p>
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="hidden md:flex absolute bottom-6 right-6 flex-col gap-3 z-50 pointer-events-auto">
            <div className="flex flex-col items-center gap-1 p-1.5 rounded-2xl shadow-xl border border-white/10 bg-black/60 backdrop-blur-md">
              <button onClick={handleZoomIn} className="p-2 hover:bg-[#C5A870]/30 rounded-full transition-colors text-white"><ZoomIn className="w-5 h-5" /></button>
              <div className="w-6 h-[1px] bg-white/20" />
              <button onClick={handleZoomOut} className="p-2 hover:bg-[#C5A870]/30 rounded-full transition-colors text-white"><ZoomOut className="w-5 h-5" /></button>
              <div className="w-6 h-[1px] bg-white/20" />
              <button onClick={handleReset} className="p-2 hover:bg-[#C5A870]/30 rounded-full transition-colors text-white"><RotateCcw className="w-4 h-4" /></button>
            </div>

            <div className="p-2 rounded-3xl grid grid-cols-3 gap-1 place-items-center shadow-xl border border-white/10 bg-black/60 backdrop-blur-md">
              <div /><button onClick={() => handlePan(0, panAmount)} className="p-2 hover:bg-[#C5A870]/30 rounded-full text-white transition-all"><ArrowUp className="w-5 h-5" /></button><div />
              <button onClick={() => handlePan(panAmount, 0)} className="p-2 hover:bg-[#C5A870]/30 rounded-full text-white transition-all"><ArrowLeft className="w-5 h-5" /></button>
              <div className="w-2 h-2 rounded-full bg-[#C5A870]" />
              <button onClick={() => handlePan(-panAmount, 0)} className="p-2 hover:bg-[#C5A870]/30 rounded-full text-white transition-all"><ArrowRight className="w-5 h-5" /></button>
              <div /><button onClick={() => handlePan(0, -panAmount)} className="p-2 hover:bg-[#C5A870]/30 rounded-full text-white transition-all"><ArrowDown className="w-5 h-5" /></button><div />
            </div>
          </div>
          
          <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 glass-card px-4 py-2 rounded-full pointer-events-none z-50">
            <span className="text-[10px] tracking-widest text-white/50 uppercase">Pinch to Zoom &bull; Drag to Pan</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}