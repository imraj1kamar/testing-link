"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // Agar lucide-react nahi hai, toh simple icon use kar lena

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Jab user 300px niche scroll karega, tabhi button dikhega
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`mb-5 sm:mb-0  cursor-pointer  fixed bottom-20 right-8 z-50 p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6 text-white" />
    </button>
  );
}