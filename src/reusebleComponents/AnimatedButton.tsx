"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface AnimatedButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export default function AnimatedButton({ 
  text, 
  onClick, 
  className = "w-full flex justify-center" 
}: AnimatedButtonProps) {
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      
    >
      <div className={`border-t border-white/10 pt-10 ${className}`}>
        <button 
          onClick={onClick} 
          className="cursor-pointer group flex items-center justify-center gap-3 px-8 py-3 w-max rounded-full bg-transparent border border-yellow-500/40 text-white hover:bg-yellow-500/20 hover:border-yellow-500 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.05)]"
        >
          <span className="uppercase tracking-[0.2em] text-[10px] font-medium text-yellow-500 group-hover:text-white transition-colors">
            {text}
          </span>
          <ChevronRight className="w-4 h-4 text-yellow-500 group-hover:translate-x-1 group-hover:text-white transition-all" />
        </button>
      </div>
    </motion.div>
  );
}