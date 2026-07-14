// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { MessageCircle, Map as MapIcon, Phone } from "lucide-react";
// import InteractiveMapModal from "@/components/InteractiveMapModal";

// const mapLocationsData = [
//   {
//     id: "entry-gate",
//     title: "Entry Gate",
//     desc: "Grand entrance to the property.",
//     x: "55.00%",
//     y: "75.00%",
//     image: "/images/gallery/8.jpeg",

//   },
//   // --- Lawn Area ---
//   {
//     id: "lawn-owl-valley-1",
//     title: "Owl Valley Lawn-1",
//     desc: "Spacious lawn for relaxed evenings.",
//     x: "84.00%",
//     y: "20.00%",
//     image: "/images/facilities/_65A4866.jpg",
//   },
//   {
//     id: "lawn-owl-valley-2",
//     title: "Owl Valley Lawn-2",
//     desc: "Perfect spot for gatherings & events.",
//    x: "76.00%",
//     y: "30.00%",
//     image: "/images/facilities/_65A4866.jpg",
//   },
//   {
//     id: "lawn-chavni-bonfire",
//     title: "Chavni / Bonfire Area",
//     desc: "Warm bonfire vibes under the stars.",
//     x: "38.00%",
//     y: "40.00%",
//     image: "/images/facilities/bonfire.jpg",
//   },
//   {
//     id: "lawn-kadamb",
//     title: "Kadamb",
//     desc: "A serene corner for quiet moments.",
//     x: "26.00%",
//     y: "70.00%",
//     image: "/images/facilities/_65A5186.jpg",
//   },
//   // {
//   //   id: "lawn-shamiyana",
//   //   title: "Shamiyana",
//   //   desc: "Elegant seating zone for celebrations.",
//   //   x: "26.00%",
//   //   y: "30.00%",
//   //   image: "/images/facilities/_65A4866.jpg",
//   // },

//   // --- Dining ---
//   {
//     id: "dining-restaurant",
//     title: "Restaurant ",
//     desc: "Dine with a view.",
//     x: "7.00%",
//     y: "55.00%",
//     image: "/images/facilities/5.jpeg",
//   },
//   {
//     id: "duplex",
//     title: "Duplex",
//     desc: "Comfortable living with premium finishes.",
//       x: "23.00%",
//     y: "53.00%",
//     image: "/images/facilities/_65A5186.jpg",
//   },
//   {
//  id: "machan",
//     title: "Machan",
//     desc: "Elevated dining experience.",
//    x: "30.00%",
//     y: "46.00%",
//     image: "/images/machan/4.jpg",
//   },
//   {
//     id: "osari",
//     title: "Osari",
//     desc: "Traditional dining with a modern twist.",
//     x: "28.00%",
//     y: "53.00%",
//     image: "/images/machan/4.jpg",
//   },

//   // --- Fun Activities ---
//   {
//     id: "activity-infinity-pool",
//     title: "Infinity Pool",
//     desc: "Relax, unwind and rejuvenate.",
//     x: "12.00%",
//     y: "75.00%",
//     image: "/images/pools/_65A4480.jpg",
//   },
//   {
//     id: "spa",
//     title: "Spa",
//     desc: "Rejuvenate your senses.",
//     x: "8.00%",
//     y: "72.00%",
//     image: "/images/facilities/_65A5175.jpg",
//   },
//   {
//     id: "activity-owl-valley-waterfalls",
//     title: "Owl Valley Waterfalls",
//     desc: "Soothing views and a refreshing vibe.",
//     x: "88.00%",
//     y: "10.00%",
//     image: "/images/natureHighlights/water-fall.jpeg",
//   },

//   // --- Function Area ---
//   {
//     id: "function-wada",
//     title: "Wada",
//     desc: "Heritage stay experience.",
//     x: "30.00%",
//     y: "35.00%",
//     image: "/images/wada/1.jpeg",
//   },
//   {
//     id: "function-banquet-hall",
//     title: "Banquet Hall",
//     desc: "Host memorable celebrations.",
//     x: "13.00%",
//     y: "46.00%",
//     image: "/images/facilities/6.jpeg",
//   },
//   {
//     id: "function-wada-event-outside",
//     title: "Wada event outside area",
//     desc: "Open-air events with valley vibes.",
//     x: "24.00%",
//     y: "38.00%",
//     image: "/images/eventsHighlights/1.jpg",
//   },
//   {
// id: "machi",
//     title: "Machi",
//     desc: "Elevated platform for performances & views.",
//     x: "16.00%",
//     y: "39.00%",
//     image: "/images/hero/5.jpg",
//   },
//   {
//     id: "function-back-event-torna-view",
//     title: "Back event area with Torna View",
//     desc: "A scenic backdrop for special moments.",
//     x: "38.00%",
//     y: "26.00%",
//     image: "/images/facilities/wada-backside-events.jpg",
//   },

//   // --- Entry ---
//   {
//     id: "entry-parking",
//     title: "Parking",
//     desc: "Convenient & secure.",
//     x: "60.00%",
//     y: "52.00%",
//     image: "/images/facilities/_65A4815.jpg",
//   },
//   {
//     id: "entry-reception",
//     title: "Reception",
//     desc: "Warm welcome & check-in.",
//     x: "26.00%",
//     y: "83.00%",
//     image: "/images/facilities/_65A4810.jpg",
//   },
// ];


// export default function GlobalFloatingActions({ phone, whatsappMessage }: { phone: string, whatsappMessage?: string }) {
//   const [isMapOpen, setIsMapOpen] = useState(false);

//   const cleanPhone = phone.replace(/\s+/g, '').replace(/[^0-9\+]/g, '');
//   const defaultMessage = whatsappMessage || "Hello DurgBhumi Resort, I would like to know more about the bookings.";

//   const handleWhatsapp = () => {
//     window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`, "_blank");
//   };

//   const handleCall = () => {
//     window.location.href = `tel:${cleanPhone}`;
//   };

//   return (
//     <>
//       {/* 🔥 FIX: Changed from right-6 bottom-24 to left-6 bottom-8 */}
//       <div className="fixed bottom-8 left-6 md:bottom-10 md:left-8 z-[90] flex flex-col gap-4">
        
//         {/* Contact/Call Button */}
//         {/* 🔥 FIX: Hover animation x: 5 kar diya (Left se aage aayega) */}
//         <motion.button
//           whileHover={{ scale: 1.1, x: 5 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={handleCall}
//           className="cursor-pointer w-11 h-11 md:w-12 md:h-12 rounded-full glass-card border border-[var(--gold-primary)]/30 flex items-center justify-center shadow-xl hover:shadow-[0_0_20px_rgba(184,134,11,0.2)] transition-all bg-black/60 backdrop-blur-md"
//           title="Call Us"
//         >
//           <Phone className="w-5 h-5 text-[var(--gold-dark)]" />
//         </motion.button>

//         {/* Map Trigger Button */}
//         <motion.button
//           whileHover={{ scale: 1.1, x: 5 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setIsMapOpen(true)}
//           className="cursor-pointer w-11 h-11 md:w-12 md:h-12 rounded-full glass-card border border-[var(--gold-primary)]/30 flex items-center justify-center shadow-xl hover:shadow-[0_0_20px_rgba(184,134,11,0.2)] transition-all bg-black/60 backdrop-blur-md"
//           title="Open Property Map"
//         >
//           <MapIcon className="w-5 h-5 text-[var(--gold-primary)]" />
//         </motion.button>

//         {/* WhatsApp Button */}
//         <motion.button
//           whileHover={{ scale: 1.1, x: 5 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={handleWhatsapp}
//           className="cursor-pointer w-11 h-11 md:w-12 md:h-12 rounded-full glass-card border border-[#25D366]/30 flex items-center justify-center shadow-xl hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all bg-black/60 backdrop-blur-md"
//           title="Chat on WhatsApp"
//         >
//           <MessageCircle className="w-5 h-5 text-[#25D366]" />
//         </motion.button>

//       </div>

//       <InteractiveMapModal 
//         isOpen={isMapOpen} 
//         onClose={() => setIsMapOpen(false)} 
//         imageSrc="/images/about/file_0.png" 
//         locations={mapLocationsData} 
//       />
//     </>
//   );
// }


"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Map as MapIcon, Phone, Plus, X } from "lucide-react";
import InteractiveMapModal from "@/components/InteractiveMapModal";

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


export default function GlobalFloatingActions({ phone, whatsappMessage }: { phone: string, whatsappMessage?: string }) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu State

  const cleanPhone = phone.replace(/\s+/g, '').replace(/[^0-9\+]/g, '');
  const defaultMessage = whatsappMessage || "Hello DurgBhumi Resort, I would like to know more about the bookings.";

  const handleWhatsapp = () => {
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`, "_blank");
    setIsMenuOpen(false);
  };

  const handleCall = () => {
    window.location.href = `tel:${cleanPhone}`;
    setIsMenuOpen(false);
  };

  const handleMapOpen = () => {
    setIsMapOpen(true);
    setIsMenuOpen(false);
  };

  // Close menu if user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // Framer motion variants for mobile stagger animation
  const menuVariants = {
    closed: { opacity: 0, y: 20, scale: 0.8, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <>
      {/* Invisible Overlay to close menu when clicked outside (Mobile only) */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[80] bg-transparent" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Container */}
      <div className="fixed bottom-8 left-6 md:bottom-10 md:left-8 z-[90] flex flex-col-reverse md:flex-col gap-4">
        
        {/* 🌟 DESKTOP VIEW (Default: All buttons visible) */}
        <div className="hidden md:flex flex-col gap-4">
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCall}
            className="cursor-pointer w-12 h-12 rounded-full glass-card border border-[var(--gold-primary)]/30 flex items-center justify-center shadow-xl hover:shadow-[0_0_20px_rgba(184,134,11,0.2)] transition-all bg-black/60 backdrop-blur-md"
            title="Call Us"
          >
            <Phone className="w-5 h-5 text-[var(--gold-dark)]" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMapOpen}
            className="cursor-pointer w-12 h-12 rounded-full glass-card border border-[var(--gold-primary)]/30 flex items-center justify-center shadow-xl hover:shadow-[0_0_20px_rgba(184,134,11,0.2)] transition-all bg-black/60 backdrop-blur-md"
            title="Open Property Map"
          >
            <MapIcon className="w-5 h-5 text-[var(--gold-primary)]" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWhatsapp}
            className="cursor-pointer w-12 h-12 rounded-full glass-card border border-[#25D366]/30 flex items-center justify-center shadow-xl hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-all bg-black/60 backdrop-blur-md"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
          </motion.button>
        </div>

        {/* 🌟 MOBILE VIEW (Expandable FAB) */}
        <div className="md:hidden flex flex-col-reverse items-center gap-3">
          
          {/* Main Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative cursor-pointer w-14 h-14 rounded-full border border-[var(--gold-primary)]/50 flex items-center justify-center shadow-[0_0_20px_rgba(184,134,11,0.3)] transition-all bg-[var(--gold-primary)] text-[var(--bg-base)] z-10"
            title="Contact Options"
          >
            {!isMenuOpen && (
              <span className="absolute inset-0 rounded-full animate-ping bg-[var(--gold-primary)]/40 -z-10" />
            )}
            <motion.div
              animate={{ rotate: isMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Plus className="w-7 h-7" />
            </motion.div>
          </motion.button>

          {/* Expanded Buttons */}
          <AnimatePresence>
            {isMenuOpen && (
              <div className="flex flex-col-reverse items-center gap-3 mb-1 w-full absolute bottom-16 pb-2">
                
                {/* WhatsApp */}
                <motion.button
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  onClick={handleWhatsapp}
                  className="cursor-pointer w-11 h-11 rounded-full glass-card border border-[#25D366]/40 flex items-center justify-center shadow-xl bg-black/70 backdrop-blur-md"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </motion.button>

                {/* Map */}
                <motion.button
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  onClick={handleMapOpen}
                  className="cursor-pointer w-11 h-11 rounded-full glass-card border border-[var(--gold-primary)]/40 flex items-center justify-center shadow-xl bg-black/70 backdrop-blur-md"
                >
                  <MapIcon className="w-5 h-5 text-[var(--gold-primary)]" />
                </motion.button>

                {/* Call */}
                <motion.button
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  onClick={handleCall}
                  className="cursor-pointer w-11 h-11 rounded-full glass-card border border-[var(--gold-primary)]/40 flex items-center justify-center shadow-xl bg-black/70 backdrop-blur-md"
                >
                  <Phone className="w-5 h-5 text-[var(--gold-primary)]" />
                </motion.button>

              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <InteractiveMapModal 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        imageSrc="/images/about/file_0.png" 
        locations={mapLocationsData} 
      />
    </>
  );
}