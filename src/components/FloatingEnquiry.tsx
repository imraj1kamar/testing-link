"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

export default function FloatingEnquiry() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const botcheckRef = useRef<HTMLInputElement>(null); // 🔥 Added for Web3Forms Spam Protection

  // ==========================================
  // 🔥 UPDATED API LOGIC FOR WEB3FORMS 🔥
  // ==========================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    // Spam Check (Honeypot) - agar bot ne hidden field bhar di, toh form submit nahi hoga
    if (botcheckRef.current?.checked) {
      return; 
    }

    if (!nameRef.current?.value.trim()) {
      setStatus("Please enter your name");
      setStatusType("error");
      nameRef.current?.focus();
      return;
    }
    const email = emailRef.current?.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("Please enter a valid email");
      setStatusType("error");
      emailRef.current?.focus();
      return;
    }
    if (!messageRef.current?.value.trim()) {
      setStatus("Please enter a message");
      setStatusType("error");
      messageRef.current?.focus();
      return;
    }

    // 🔥 Web3Forms Payload Structure
    const formData = {
      access_key: "2ac6d2f0-e83b-482e-9b81-e23b817df40b", // 👈 YAHAN APNI KEY DALEIN
      name: nameRef.current.value.trim(),
      email,
      phone: phoneRef.current?.value.trim() || "",
      message: messageRef.current.value.trim(),
      subject: subjectRef.current?.value.trim() || "New Enquiry from Website",
    };

    setLoading(true);
    setStatus("");
    setStatusType("");

    try {
      // 🔥 Changed endpoint to Web3Forms
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Thank you! Message sent successfully.");
        setStatusType("success");
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
        if (phoneRef.current) phoneRef.current.value = "";
        if (subjectRef.current) subjectRef.current.value = "";
        if (messageRef.current) messageRef.current.value = "";
        setTimeout(() => setOpen(false), 2000);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      setStatus("❌ Failed to send. Please try again.");
      setStatusType("error");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [open]);

  return (
    <>
      {/* ========================================================= */}
      {/* THE TRIGGERS (Desktop Vertical Tab & Mobile Floating Btn) */}
      {/* ========================================================= */}
      {!open && (
        <>
          {/* DESKTOP: Center Right Vertical Tab */}
          <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-[90]">
            <button
              aria-label="Open Quick Enquiry"
              data-enquiry-trigger="true"
              onClick={() => setOpen(true)}
              className="cursor-pointer bg-gradient-to-b from-yellow-600 to-yellow-500 text-black px-2.5 py-6 rounded-l-xl flex flex-col items-center gap-4 shadow-[-10px_0_20px_rgba(0,0,0,0.5)] hover:scale-105 origin-right transition-transform cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span
                className="text-[10px] tracking-[0.2em] font-bold uppercase"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Quick Enquiry
              </span>
            </button>
          </div>

          {/* MOBILE & TABLET: Bottom Right Floating Icon */}
          <div className="lg:hidden fixed bottom-6 right-6 z-[90]">
            <button 
              onClick={() => setOpen(true)} 
              className="cursor-pointer w-14 h-14 bg-gradient-to-tr from-yellow-600 to-yellow-400 text-black rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(212,175,55,0.4)] active:scale-95 transition-transform"
            >
              <MessageSquare className="w-6 h-6" />
            </button>
          </div>
        </>
      )}

      {/* ========================================================= */}
      {/* SLIDE-OUT ENQUIRY FORM DRAWER                           */}
      {/* ========================================================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95]"
            />

            {/* Right Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
              className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-[#0a0f0c] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-[100] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-2xl font-serif gold-text-gradient uppercase tracking-widest">Enquiry</h3>
                  <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-1">Get in touch with us</p>
                </div>
                <button 
                  onClick={() => setOpen(false)} 
                  className="cursor-pointer p-2 rounded-full bg-white/5 hover:bg-yellow-500 hover:text-black text-white/50 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Scrollable Area */}
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  
                  {/* 🔥 Honeypot Field for Spam Protection (Invisible to users) */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} ref={botcheckRef} />

                  {/* Tailwind Floating Label Input Component */}
                  <div className="relative w-full">
                    <input 
                      id="name" ref={nameRef} required placeholder=" "
                      className="peer w-full bg-[#121814] border border-white/10 rounded-xl px-4 pb-2 pt-6 text-sm text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                    />
                    <label htmlFor="name" className="absolute left-4 top-4 text-xs text-white/40 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-yellow-500 uppercase tracking-widest pointer-events-none">
                      Your Name *
                    </label>
                  </div>

                  <div className="relative w-full">
                    <input 
                      id="email" ref={emailRef} type="email" required placeholder=" "
                      className="peer w-full bg-[#121814] border border-white/10 rounded-xl px-4 pb-2 pt-6 text-sm text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                    />
                    <label htmlFor="email" className="absolute left-4 top-4 text-xs text-white/40 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-yellow-500 uppercase tracking-widest pointer-events-none">
                      Email Address *
                    </label>
                  </div>

                  <div className="relative w-full">
                    <input 
                      id="phone" ref={phoneRef} type="tel" placeholder=" "
                      className="peer w-full bg-[#121814] border border-white/10 rounded-xl px-4 pb-2 pt-6 text-sm text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                    />
                    <label htmlFor="phone" className="absolute left-4 top-4 text-xs text-white/40 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-yellow-500 uppercase tracking-widest pointer-events-none">
                      Phone Number
                    </label>
                  </div>

                  <div className="relative w-full">
                    <input 
                      id="subject" ref={subjectRef} type="text" placeholder=" "
                      className="peer w-full bg-[#121814] border border-white/10 rounded-xl px-4 pb-2 pt-6 text-sm text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                    />
                    <label htmlFor="subject" className="absolute left-4 top-4 text-xs text-white/40 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-yellow-500 uppercase tracking-widest pointer-events-none">
                      Subject
                    </label>
                  </div>

                  <div className="relative w-full h-32">
                    <textarea 
                      id="message" ref={messageRef} required placeholder=" "
                      className="peer w-full h-full bg-[#121814] border border-white/10 rounded-xl px-4 pb-2 pt-6 text-sm text-white focus:outline-none focus:border-yellow-500/50 transition-colors resize-none"
                    />
                    <label htmlFor="message" className="absolute left-4 top-4 text-xs text-white/40 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-yellow-500 uppercase tracking-widest pointer-events-none">
                      Message *
                    </label>
                  </div>

                  {/* Status Message */}
                  {status && (
                    <div className={`p-3 rounded-xl text-xs tracking-wider border ${statusType === 'error' ? 'bg-red-900/20 text-red-400 border-red-500/30' : 'bg-emerald-900/20 text-emerald-400 border-emerald-500/30'}`}>
                      {status}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer mt-4 w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Enquiry <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}