// "use client";

// import React, { useCallback, useState, useEffect } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Star, Quote, ChevronLeft, ChevronRight, MessageSquarePlus, X, Send } from "lucide-react";
// import testimonialsData from "@/data/testimonials.json";

// export default function Testimonials() {
//   // Use state to manage reviews so we can add new ones dynamically
//   const [reviews, setReviews] = useState(testimonialsData.testimonials);
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  
//   // Modal State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({ name: "", text: "", rating: 5, mobile: "" });

//   // Lock body scroll when modal is open
//   useEffect(() => {
//     if (isModalOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "auto";
//     return () => { document.body.style.overflow = "auto"; };
//   }, [isModalOpen]);

//   const scrollPrev = useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev();
//   }, [emblaApi]);

//   const scrollNext = useCallback(() => {
//     if (emblaApi) emblaApi.scrollNext();
//   }, [emblaApi]);

//   // Handle Form Submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.name || !formData.text) return;

//     const newReview = {
//       id: Date.now(),
//       name: formData.name,
//       rating: formData.rating,
//       mobile: formData.mobile,
//       text: formData.text,
//       avatar: "/images/testimonials/avatar.png" // Default avatar
//     };

//     // Add new review to the beginning of the list
//     setReviews([newReview, ...reviews]);
//     setIsModalOpen(false);
    
//     // Reset Form
//     setFormData({ name: "", text: "", rating: 5, mobile: "" });
    
//     // Scroll to the first slide to show the new review
//     if (emblaApi) emblaApi.scrollTo(0);
//   };

//   return (
//     <>
//       <section id="testimonials" className="relative w-full py-24 px-6 md:px-16 overflow-hidden bg-[#0a0f0c]">
//         {/* Background Cinematic Glow */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-yellow-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

//         <div className="relative z-10 max-w-6xl mx-auto">
          
//           {/* Header & Add Review Button */}
//           <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
//             <motion.div 
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1 }}
//               className="text-center md:text-left"
//             >
//               <div className="flex justify-center md:justify-start items-center gap-3 mb-3">
//                 <Quote className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
//                 <p className="text-xs tracking-[0.3em] text-white/60 uppercase">What Our Guests Say</p>
//               </div>
//               <h2 className="text-4xl md:text-5xl font-serif gold-text-gradient tracking-widest uppercase">
//                 Testimonials
//               </h2>
//             </motion.div>

//             <motion.button
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1 }}
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 px-6 py-3 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.1)] text-xs tracking-widest uppercase font-medium"
//             >
//               <MessageSquarePlus className="w-4 h-4" /> Share Your Experience
//             </motion.button>
//           </div>

//           {/* Custom Embla Carousel Slider */}
//           <div className="relative max-w-5xl mx-auto">
//             <div className="overflow-hidden" ref={emblaRef}>
//               <div className="flex gap-6 py-10 cursor-grab active:cursor-grabbing">
//                 {reviews.map((review, index) => (
//                   <motion.div 
//                     key={review.id}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                     className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_40%] min-w-0"
//                   >
//                     <div className="glass-card h-full p-8 rounded-3xl relative border border-white/5 hover:border-yellow-500/30 transition-all duration-500 flex flex-col group bg-gradient-to-b from-white/[0.05] to-transparent">
//                       {/* Floating Avatar or Quote Icon */}
//                       <div className="absolute -top-6 left-8 w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500/50 shadow-lg bg-[#121814] flex items-center justify-center">
//                         {review.avatar ? (
//                           <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
//                         ) : (
//                           <Quote className="w-5 h-5 text-yellow-500" />
//                         )}
//                       </div>

//                       {/* Dynamic Stars */}
//                       <div className="flex gap-1 mb-6 mt-4">
//                         {[...Array(5)].map((_, i) => (
//                           <Star 
//                             key={i} 
//                             className={`w-4 h-4 ${i < (review.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-gray-600 fill-gray-600"}`} 
//                           />
//                         ))}
//                       </div>

//                       {/* Review Text */}
//                       <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8 flex-1 italic">
//                         "{review.text}"
//                       </p>

//                       {/* Guest Info */}
//                       <div className="mt-auto border-t border-white/10 pt-4">
//                         <h4 className="text-white font-serif tracking-wider group-hover:text-yellow-400 transition-colors">
//                           {review.name}
//                         </h4>
//                         {/* If location exists, show it. Otherwise show Guest label */}
//                         <p className="text-xs text-white/40 tracking-widest uppercase mt-1">
//                           {(review as any).location || "Valued Guest"}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-center gap-4 mt-8">
//               <button 
//                 onClick={scrollPrev}
//                 className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
//               >
//                 <ChevronLeft className="w-6 h-6 text-white" />
//               </button>
//               <button 
//                 onClick={scrollNext}
//                 className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
//               >
//                 <ChevronRight className="w-6 h-6 text-white" />
//               </button>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ========================================================= */}
//       {/* 📝 REVIEW SUBMISSION MODAL / BOTTOM SHEET FOR MOBILE      */}
//       {/* ========================================================= */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <>
//             {/* Dark Overlay */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsModalOpen(false)}
//               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
//             />

//             {/* Form Container (Bottom Sheet on Mobile, Centered Modal on Desktop) */}
//             <motion.div 
//               initial={{ y: "100%", opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: "100%", opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="fixed bottom-0 left-0 w-full md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:w-[500px] z-[101] bg-[#121814] border border-white/10 md:rounded-3xl rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] p-6 md:p-8"
//             >
//               {/* Close Button */}
//               <button 
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <div className="mb-6">
//                 <h3 className="text-2xl font-serif gold-text-gradient mb-1">Share Your Story</h3>
//                 <p className="text-xs text-gray-400 font-light">We'd love to hear about your experience at DurgBhumi.</p>
//               </div>

//               <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
//                 {/* Name & Mobile Row */}
//                 <div className="flex flex-col md:flex-row gap-4">
//                   <div className="flex-1">
//                     <label className="text-[10px] text-white/50 tracking-widest uppercase mb-2 block">Your Name</label>
//                     <input 
//                       type="text" 
//                       required
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50 transition-colors"
//                       placeholder="e.g. Rahul Sharma"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label className="text-[10px] text-white/50 tracking-widest uppercase mb-2 block">Mobile (Optional)</label>
//                     <input 
//                       type="text" 
//                       value={formData.mobile}
//                       onChange={(e) => setFormData({...formData, mobile: e.target.value})}
//                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50 transition-colors"
//                       placeholder="+91..."
//                     />
//                   </div>
//                 </div>

//                 {/* Rating Selector */}
//                 <div>
//                   <label className="text-[10px] text-white/50 tracking-widest uppercase mb-2 block">Rate Your Stay</label>
//                   <div className="flex gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button 
//                         key={star}
//                         type="button"
//                         onClick={() => setFormData({...formData, rating: star})}
//                         className="p-1 hover:scale-110 transition-transform focus:outline-none"
//                       >
//                         <Star className={`w-6 h-6 ${formData.rating >= star ? "text-yellow-500 fill-yellow-500" : "text-white/20"}`} />
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Message Textarea */}
//                 <div>
//                   <label className="text-[10px] text-white/50 tracking-widest uppercase mb-2 block">Your Message</label>
//                   <textarea 
//                     required
//                     rows={4}
//                     value={formData.text}
//                     onChange={(e) => setFormData({...formData, text: e.target.value})}
//                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50 transition-colors resize-none"
//                     placeholder="Tell us what you loved..."
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button 
//                   type="submit"
//                   className="mt-2 w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold text-xs tracking-widest uppercase hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(212,175,55,0.3)]"
//                 >
//                   <Send className="w-4 h-4" /> Submit Review
//                 </button>
//                 <p className="text-[10px] text-center text-white/30 italic">
//                   Note: This will temporarily add the review to the slider. Backend API is needed for permanent storage.
//                 </p>
//               </form>

//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


"use client";

import React, { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquarePlus, X, Send } from "lucide-react";
import testimonialsData from "@/data/testimonials.json";

interface Review {
  id: number;
  name: string;
  rating: number;
  mobile: string;
  text: string;
  avatar?: string;
  location?: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>(testimonialsData.testimonials as Review[]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", text: "", rating: 5, mobile: "" });

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isModalOpen]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;

    const newReview: Review = {
      id: Date.now(),
      name: formData.name,
      rating: formData.rating,
      mobile: formData.mobile,
      text: formData.text,
      avatar: "/images/testimonials/avatar.png"
    };

    setReviews([newReview, ...reviews]);
    setIsModalOpen(false);
    setFormData({ name: "", text: "", rating: 5, mobile: "" });
    if (emblaApi) emblaApi.scrollTo(0);
  };

  return (
    <>
      <section id="testimonials" className="relative w-full py-24 px-6 md:px-16 overflow-hidden bg-[#0a0f0c]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-yellow-600/5 blur-[150px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center md:text-left"
            >
              <div className="flex justify-center md:justify-start items-center gap-3 mb-3">
                <Quote className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
                <p className="text-xs tracking-[0.3em] text-white/60 uppercase">What Our Guests Say</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif gold-text-gradient tracking-widest uppercase">
                Testimonials
              </h2>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.1)] text-xs tracking-widest uppercase font-medium"
            >
              <MessageSquarePlus className="w-4 h-4" /> Share Your Experience
            </motion.button>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6 py-10 cursor-grab active:cursor-grabbing">
                {reviews.map((review, index) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_40%] min-w-0"
                  >
                    <div className="glass-card h-full p-8 rounded-3xl relative border border-white/5 hover:border-yellow-500/30 transition-all duration-500 flex flex-col group bg-gradient-to-b from-white/[0.05] to-transparent">
                      <div className="absolute -top-6 left-8 w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500/50 shadow-lg bg-[#121814] flex items-center justify-center">
                        {review.avatar ? (
                          <Image src={review.avatar} alt={review.name} width={48} height={48} className="w-full h-full object-cover" />
                        ) : (
                          <Quote className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>

                      <div className="flex gap-1 mb-6 mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < (review.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-gray-600 fill-gray-600"}`} 
                          />
                        ))}
                      </div>

                      <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8 flex-1 italic">
                        &quot;{review.text}&quot;
                      </p>

                      <div className="mt-auto border-t border-white/10 pt-4">
                        <h4 className="text-white font-serif tracking-wider group-hover:text-yellow-400 transition-colors">
                          {review.name}
                        </h4>
                        <p className="text-xs text-white/40 tracking-widest uppercase mt-1">
                          {review.location || "Valued Guest"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={scrollNext}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />

            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 w-full md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:w-[500px] z-[101] bg-[#121814] border border-white/10 md:rounded-3xl rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] p-6 md:p-8"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-serif gold-text-gradient mb-1">Share Your Story</h3>
                <p className="text-xs text-gray-400 font-light">We&apos;d love to hear about your experience at DurgBhumi.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] text-white/50 tracking-widest uppercase mb-2 block">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50 transition-colors"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-white/50 tracking-widest uppercase mb-2 block">Mobile (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50 transition-colors"
                      placeholder="+91..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-white/50 tracking-widest uppercase mb-2 block">Rate Your Stay</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="p-1 hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Star className={`w-6 h-6 ${formData.rating >= star ? "text-yellow-500 fill-yellow-500" : "text-white/20"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-white/50 tracking-widest uppercase mb-2 block">Your Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.text}
                    onChange={(e) => setFormData({...formData, text: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50 transition-colors resize-none"
                    placeholder="Tell us what you loved..."
                  />
                </div>

                <button 
                  type="submit"
                  className="mt-2 w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold text-xs tracking-widest uppercase hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  <Send className="w-4 h-4" /> Submit Review
                </button>
                <p className="text-[10px] text-center text-white/30 italic">
                  Note: This will temporarily add the review to the slider. Backend API is needed for permanent storage.
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}