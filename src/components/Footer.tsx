"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ExternalLink, Navigation } from "lucide-react";
import data from "@/data/resort-data.json";
import Image from "next/image";

export default function Footer() {
  const { resort } = data;
  
  // Split phone numbers by " / " so we can map them to separate "tel:" links
  const phoneNumbers = resort.phone.split(" / ");

  return (
    <section id="contact" className="relative w-full py-20 px-6 md:px-16 overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-yellow-600/5 blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Main Contact Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-card w-full p-6 md:p-12 rounded-3xl flex flex-col lg:flex-row justify-between gap-12 items-center lg:items-start"
        >
          {/* Left Side: Contact Details & Directions */}
          <div className="flex-1 flex flex-col gap-8 w-full">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif gold-text-gradient tracking-widest mb-2 ">
                Contact Us
              </h2>
              <p className="text-xs text-yellow-500/80 tracking-[0.3em] uppercase">
                {resort.tagline}
              </p>
            </div>
            
            <div className="flex flex-col gap-6 text-gray-300 font-light text-sm md:text-base">
              
              {/* Address - Click to open in map */}
              <a 
                href="https://www.google.com/maps?q=18.29611587524414,73.6214370727539" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-4 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <MapPin className="w-6 h-6 text-yellow-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                <p className="leading-relaxed pr-4">{resort.address}</p>
              </a>
              
              {/* Phones - Click to call */}
              <div className="flex items-center gap-4 group">
                <Phone className="w-6 h-6 text-yellow-500 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col gap-1">
                  {phoneNumbers.map((phone, idx) => (
                    <a 
                      key={idx} 
                      href={`tel:${phone.replace(/\s+/g, '')}`} 
                      className="hover:text-yellow-400 transition-colors duration-300"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Email - Click to mail */}
              <a 
                href={`mailto:${resort.email}`} 
                className="flex items-center gap-4 hover:text-yellow-400 transition-colors duration-300 group"
              >
                <Mail className="w-6 h-6 text-yellow-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span>{resort.email}</span>
              </a>

              {/* Directions / How to Reach */}
              {resort.directions && (
                <div className="flex items-start gap-4 mt-2 pt-6 border-t border-white/10 group">
                  <Navigation className="w-6 h-6 text-yellow-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col gap-4 w-full pr-4">
                    <h4 className="text-white uppercase tracking-widest text-xs font-semibold">How to Reach</h4>
                    <ul className="space-y-3 text-xs md:text-sm text-gray-400 font-light">
                      <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/5 pb-2">
                        <span className="text-gray-300">Mumbai to Velhe</span>
                        <span className="text-yellow-500/80 text-[11px] sm:text-right">{resort.directions.mumbaiToVelhe}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/5 pb-2">
                        <span className="text-gray-300">Mumbai to Torna Fort</span>
                        <span className="text-yellow-500/80 text-[11px] sm:text-right">{resort.directions.mumbaiToTornaFort}</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/5 pb-2">
                        <span className="text-gray-300">Pune to Velhe</span>
                        <span className="text-yellow-500/80 text-[11px] sm:text-right">{resort.directions.puneToVelhe}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Side: Map & Brand Name */}
          <div className="flex-1 w-full flex flex-col items-center lg:items-end gap-8">
            
            {/* Live Interactive Map Box */}
            <div className="w-full lg:w-[90%] h-64 md:h-80 rounded-2xl overflow-hidden border border-white/20 relative group shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3788.120081681628!2d73.6214371!3d18.2961159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc29b0043bd5d71%3A0xeb5f1d9e1d7b087a!2sDurgbhumi!5e0!3m2!1sen!2sin!4v1781982395350!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[40%] contrast-[1.1] opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 pointer-events-auto"
              />

              {/* Open in Google Maps Button */}
              <a
                href="https://maps.app.goo.gl/oGYNteq2prYFr9yx5"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-yellow-500 text-black px-5 py-2.5 rounded-xl text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-10 flex items-center gap-2"
              >
                Open in Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <h3 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-600 tracking-[0.2em] opacity-80">
              <Image
  src="/images/logo/DBStrip.png"
  alt={resort.name || "DurgBhumi Resort"}
  width={400}
  height={120}
  className="w-[200px] md:w-[280px] lg:w-[350px] h-auto object-contain opacity-90 drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]"
/>
            </h3>
          </div>
        </motion.div>

        {/* Footer Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-light tracking-widest text-white/50 uppercase"
        >
          <p>© 2026 {resort.name}. All Rights Reserved.</p>
          <a href="/policies" className="hover:text-yellow-400 transition-colors uppercase tracking-widest text-[10px]">
            Terms & Policies
          </a>
          
          <div className="flex gap-6">
            {/* Facebook SVG */}
            {resort.socialMedia.facebook && (
              <a href={resort.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            )}
            {/* Instagram SVG */}
            {resort.socialMedia.instagram && (
              <a href={resort.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
            )}
            {/* Twitter/X SVG */}
            {resort.socialMedia.twitter && (
              <a href={resort.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}