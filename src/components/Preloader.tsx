"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      setIsLoading(false);
      document.body.style.overflow = "";
    };

    const onHeroLoaded = () => {
      finish();
    };

    // 🔥 FIX 1: Check if the hero image was already loaded before this component mounted
    // We attach a flag to the window object from our hero component when it loads
    if (typeof window !== "undefined" && (window as Window & { __HERO_IMAGE_LOADED__?: boolean }).__HERO_IMAGE_LOADED__) {
      finish();
    }

    window.addEventListener("hero_image_loaded", onHeroLoaded);

    const safetyTimer = window.setTimeout(() => {
      finish();
    }, 8000);

    return () => {
      window.removeEventListener("hero_image_loaded", onHeroLoaded);
      window.clearTimeout(safetyTimer);
      // 🔥 FIX 2: Safeguard to ensure body is NEVER stuck in overflow hidden state
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loader"
          exit={{ 
            y: "-100%", 
            opacity: 0, 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a241c] bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_rgba(26,36,28,1)_60%)]"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }} 
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-4"
            >
              <Image
                src="/images/logo/logo.png"
                alt="Loading..."
                width={130}
                height={130}
                priority
                className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                }}
              />
            </motion.div>

            <motion.div
              initial={{ letterSpacing: "0em", opacity: 0 }}
              animate={{ letterSpacing: "0.3em", opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="mb-10 text-white/90 uppercase text-sm md:text-base font-light tracking-widest text-center"
            >
              DurgBhumi
            </motion.div>

            <div className="w-[200px] h-[1px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }} 
                transition={{ 
                  duration: 1.8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 bottom-0 w-[40%] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_15px_#d4af37]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}