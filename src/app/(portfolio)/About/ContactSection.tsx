"use client";

import { useEffect, useRef, useState } from "react";
import { Fraunces, Inter } from "next/font/google";
import { motion } from "framer-motion"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

type FieldType = "text" | "email" | "tel" | "textarea";

interface FieldConfig {
  id: string;
  label: string;
  type: FieldType;
  placeholder: string;
  required?: boolean;
}

const FIELDS: FieldConfig[] = [
  { id: "fname", label: "Full Name", type: "text", placeholder: "Ali Khan", required: true },
  { id: "femail", label: "Email Address", type: "email", placeholder: "ali@email.com", required: true },
  { id: "fphone", label: "Phone Number", type: "tel", placeholder: "+92 300 1234567" },
  { id: "fsubject", label: "Subject", type: "text", placeholder: "Admission inquiry", required: true },
  { id: "fmessage", label: "Message", type: "textarea", placeholder: "Tell us about your query...", required: true },
];

type IconColor = "teal" | "blue" | "green" | "orange" | "tealLight" | "blueLight";

const GRADIENTS: Record<IconColor, string> = {
  teal: "from-[#0D9488] to-[#0F766E]",
  blue: "from-[#2563EB] to-[#1D4ED8]",
  green: "from-[#10B981] to-[#059669]",
  orange: "from-[#F59E0B] to-[#D97706]",
  tealLight: "from-[#14B8A6] to-[#0D9488]",
  blueLight: "from-[#60A5FA] to-[#3B82F6]",
};

// Aspire College Apps
const APPS: { key: string; label: string; emoji: string; color: IconColor }[] = [
  { key: "admissions", label: "Admissions", emoji: "🎓", color: "teal" },
  { key: "programs", label: "Programs", emoji: "📚", color: "blue" },
  { key: "campus", label: "Campus", emoji: "🏛️", color: "green" },
  { key: "faculty", label: "Faculty", emoji: "👨‍🏫", color: "orange" },
  { key: "scholarship", label: "Scholarship", emoji: "🏆", color: "tealLight" },
  { key: "contact", label: "Contact", emoji: "📬", color: "blueLight" },
];

const DOCK: { key: string; label: string; emoji: string; color: IconColor }[] = [
  { key: "phone", label: "Call", emoji: "📞", color: "teal" },
  { key: "email", label: "Email", emoji: "✉️", color: "blue" },
  { key: "visit", label: "Visit", emoji: "📍", color: "green" },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function ContactSection() {
  const [time, setTime] = useState("9:41");
  const [dateStr, setDateStr] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent">("idle");
  const [values, setValues] = useState<Record<string, string>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [sectionOffset, setSectionOffset] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  // ── Check mobile ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ─── Theme Colors - Aspire College Theme ────────────────────────────────────
  const TEAL_600 = '#0D9488';
  const BLUE_600 = '#2563EB';
  const DARK_BG = '#0a0e1a';
  const LIGHT_BG = '#F8FAFC';
  
  const colors = {
    sectionBg: '#F8FAFC',
    cardBg: '#FFFFFF',
    leftBg: '#F8FAFC',
    textPrimary: '#1E293B',
    textSecondary: '#1E293B',
    textMuted: '#64748B',
    border: 'rgba(13, 148, 136, 0.15)',
    accent: TEAL_600,
    accentLight: 'rgba(13, 148, 136, 0.08)',
    inputBg: '#FFFFFF',
    inputBorder: '#E2E8F0',
    shadow: '0 20px 50px rgba(0,0,0,0.06)',
    phoneBg: '#0F172A',
    overlay: 'rgba(0,0,0,0.3)',
    formBg: '#FFFFFF',
    inputFocus: TEAL_600,
    buttonBg: TEAL_600,
    buttonText: '#FFFFFF',
    phoneBorder: TEAL_600,
  };

  // ─── Live clock ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hh = now.getHours();
      const mm = String(now.getMinutes()).padStart(2, "0");
      
      const ampm = hh >= 12 ? 'PM' : 'AM';
      hh = hh % 12 || 12;
      setTime(`${hh}:${mm} ${ampm}`);
      
      setDateStr(now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
    };
    updateClock();
    const id = setInterval(updateClock, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // ─── Smooth scroll and push up ──────────────────────────────────────────────
  const scrollAndPushUp = () => {
    return new Promise<void>((resolve) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const targetY = scrollY + rect.top - 60;
        
        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });

        const pushUpPx = isMobile ? -224 : -112;
        setTimeout(() => {
          setSectionOffset(pushUpPx);
          resolve();
        }, 700);
      } else {
        resolve();
      }
    });
  };

  // ─── Open form ───────────────────────────────────────────────────────────────
  const openForm = async () => {
    if (formOpen) return;
    
    await scrollAndPushUp();
    
    setTimeout(() => {
      setFormOpen(true);
      setSendState("idle");
      setValues({});
      
      setTimeout(() => {
        inputRefs.current["fname"]?.focus();
      }, 400);
    }, 300);
  };

  const closeForm = () => {
    setFormOpen(false);
    setSectionOffset(0);
    clearTimer();
    setSendState("idle");
  };

  const handleChange = (id: string, val: string) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendState !== "idle") return;
    setSendState("sending");
    setTimeout(() => {
      setSendState("sent");
      setTimeout(() => {
        setSendState("idle");
        setValues({});
        setTimeout(() => closeForm(), 400);
      }, 2000);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!formOpen) return;
    if (e.key === "Escape") closeForm();
  };

  const sendLabel =
    sendState === "sending" ? "Sending..." : sendState === "sent" ? "Message sent ✓" : "Send Message";

  return (
    <section
      ref={sectionRef}
      className={`${inter.variable} ${fraunces.variable} relative w-full max-w-full px-0 py-6 sm:py-20 pb-8 sm:pb-16 md:pb-24 overflow-visible transition-all duration-700 ease-in-out`}
      style={{ 
        fontFamily: "var(--font-inter), sans-serif", 
        background: colors.sectionBg, 
        color: colors.textPrimary,
        minHeight: isMobile ? 'auto' : '100vh',
        transform: `translateY(${sectionOffset}px)`,
        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="px-3 sm:px-8 md:px-16">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-[10px] sm:text-[13px] font-semibold tracking-[0.16em] uppercase mb-3 sm:mb-5 md:mb-7">
          <span className="w-5 sm:w-6 h-px inline-block" style={{ background: colors.accent }} />
          <span style={{ color: colors.accent }}>Get in Touch</span>
        </div>
      </div>

      {/* ─── Main Card ────────────────────────────────────────────────────────── */}
      <div className="px-3 sm:px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            boxShadow: colors.shadow,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] items-stretch">
            
            {/* ─── LEFT COLUMN ────────────────────────────────────────────────── */}
            <div 
              className="relative p-[20px_16px_20px] sm:p-[24px_20px_24px] md:p-[30px_24px_24px] flex flex-col justify-center min-h-[300px] sm:min-h-[340px] overflow-hidden"
              style={{ background: colors.leftBg }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-[30px] -left-[10px] w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] rounded-full pointer-events-none" style={{ background: colors.accent, opacity: 0.15 }} />
              <div className="absolute -top-[10px] left-[22px] w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] rounded-full pointer-events-none" style={{ background: colors.accent, opacity: 0.15 }} />
              <div className="absolute -left-[16px] top-[44%] w-[24px] h-[24px] sm:w-[34px] sm:h-[34px] rounded-full pointer-events-none" style={{ background: colors.accent, opacity: 0.15 }} />
              <div className="absolute -right-[14px] top-[42%] w-[20px] h-[50px] sm:w-[30px] sm:h-[70px] rounded-[14px] pointer-events-none" style={{ background: colors.accent, opacity: 0.15 }} />
              <div className="absolute -bottom-[8px] left-[18px] w-[28px] h-[20px] sm:w-[36px] sm:h-[26px] rounded-t-[50%] pointer-events-none" style={{ background: colors.accent, opacity: 0.15 }} />

              <div className="absolute bottom-[20px] right-[38px] grid grid-cols-3 gap-[5px] pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full" style={{ background: colors.accent, opacity: 0.3 }} />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-[3]">
                <h1
                  className="text-[clamp(24px,3vw,42px)] leading-[1.08] tracking-[-0.01em] max-w-[420px]"
                  style={{ 
                    fontFamily: "var(--font-fraunces), serif", 
                    fontWeight: 500, 
                    color: colors.textPrimary,
                    fontStyle: 'normal',
                  }}
                >
                  Connect with{" "}
                  <br />
                  <span style={{ fontWeight: 400, color: colors.accent }}>
                    Aspire College
                  </span>
                </h1>

                <p 
                  className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.6] sm:leading-[1.7] max-w-[380px] hidden sm:block"
                  style={{ color: colors.textMuted }}
                >
                  Have questions about admissions, programs, or campus life? Reach out to us and get a response within 24 hours.
                </p>

                <ul className="mt-4 sm:mt-6 md:mt-9 list-none">
                  <li className="flex items-center gap-3 py-2 sm:py-3 border-t border-b" style={{ borderColor: colors.border }}>
                    <span className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] shrink-0" style={{ color: colors.accent }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2.5" y="5" width="19" height="14" rx="3" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[8px] sm:text-[10px] tracking-[0.08em] uppercase font-semibold" style={{ color: colors.textMuted }}>Email</span>
                      <span className="text-[11px] sm:text-sm font-medium" style={{ color: colors.textPrimary }}>info@aspirecollege.edu.pk</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3 py-2 sm:py-3 border-b" style={{ borderColor: colors.border }}>
                    <span className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] shrink-0" style={{ color: colors.accent }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
                      </svg>
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[8px] sm:text-[10px] tracking-[0.08em] uppercase font-semibold" style={{ color: colors.textMuted }}>Phone</span>
                      <span className="text-[11px] sm:text-sm font-medium" style={{ color: colors.textPrimary }}>+92 300 1234567</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3 py-2 sm:py-3 border-b" style={{ borderColor: colors.border }}>
                    <span className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] shrink-0" style={{ color: colors.accent }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[8px] sm:text-[10px] tracking-[0.08em] uppercase font-semibold" style={{ color: colors.textMuted }}>Location</span>
                      <span className="text-[11px] sm:text-sm font-medium" style={{ color: colors.textPrimary }}>123 Education Street, Lahore</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3 py-2 sm:py-3 border-b" style={{ borderColor: colors.border }}>
                    <span className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] shrink-0" style={{ color: colors.accent }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2.5" y="5" width="19" height="14" rx="3" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[8px] sm:text-[10px] tracking-[0.08em] uppercase font-semibold" style={{ color: colors.textMuted }}>Admissions</span>
                      <span className="text-[11px] sm:text-sm font-medium" style={{ color: colors.textPrimary }}>admissions@aspirecollege.edu.pk</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ─── RIGHT COLUMN - Phone ──────────────────────────────────────── */}
            <div 
              className="relative flex justify-center items-center p-[16px_20px] sm:p-[20px_24px] md:p-[24px_28px] min-h-[480px] sm:min-h-[560px] md:min-h-[500px]"
              style={{ 
                background: colors.formBg,
                borderLeft: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              <div ref={phoneRef} className="relative flex justify-center items-center z-[2] w-full">
                <div className="absolute bottom-[12px] sm:bottom-[18px] left-1/2 -translate-x-1/2 w-[200px] sm:w-[260px] md:w-[300px] h-8 sm:h-10 rounded-full opacity-10 blur-[24px] sm:blur-[28px]" style={{ background: colors.textPrimary }} />

                <div className="relative z-[2]">
                  {/* Phone container */}
                  <div 
                    className="relative w-[300px] sm:w-[290px] md:w-[280px] h-[500px] sm:h-[560px] md:h-[520px] rounded-[32px] sm:rounded-[40px] md:rounded-[48px] p-2.5 sm:p-3 overflow-hidden transition-colors duration-300"
                    style={{
                      background: colors.phoneBg,
                      boxShadow: `0 40px 70px -20px rgba(0,0,0,0.3), 0 20px 30px -10px rgba(0,0,0,0.2)`,
                      border: `2px solid ${colors.phoneBorder}`,
                    }}
                  >
                    {/* side buttons */}
                    <div className="absolute -left-[3px] top-[100px] sm:top-[130px] w-[3px] h-[40px] sm:h-[60px] rounded-l-[2px] z-10 max-[480px]:hidden" style={{ background: '#0F0C17' }} />
                    <div className="absolute -right-[3px] top-[120px] sm:top-[160px] w-[3px] h-8 sm:h-10 rounded-r-[2px] z-10 max-[480px]:hidden" style={{ background: '#0F0C17' }} />

                    <div className="relative w-full h-full rounded-[26px] sm:rounded-[30px] md:rounded-[36px] overflow-hidden flex flex-col">
                      {/* Home screen background - Aspire College themed */}
                      <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=1200&fit=crop&crop=center')",
                        }}
                      >
                        <div className="absolute inset-0" style={{ background: colors.overlay, backdropFilter: 'blur(0.5px)' }} />
                      </div>

                      {/* Notch */}
                      <div className="absolute top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 w-[70px] sm:w-[90px] md:w-[80px] h-[18px] sm:h-[22px] md:h-[20px] rounded-[16px] sm:rounded-[18px] md:rounded-[20px] z-[5]" style={{ background: '#17141F' }}>
                        <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 md:h-1.5 rounded-full border" style={{ background: '#2D2A3A', borderColor: '#1A1825' }} />
                      </div>

                      {/* Status row */}
                      <div
                        className="px-4 sm:px-6 md:px-7 pt-[14px] sm:pt-[18px] md:pt-[18px] pb-0.5 flex justify-between text-[9px] sm:text-[10px] md:text-xs font-semibold text-white z-[2]"
                        style={{ textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}
                      >
                        <span>{time}</span>
                        <span>●●●●</span>
                      </div>

                      {/* HOME SCREEN */}
                      <div
                        className="flex-1 flex flex-col px-3 sm:px-5 pt-1 pb-3 sm:pb-5 overflow-y-auto relative z-[2] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        onClick={(e) => {
                          if (e.target === e.currentTarget) openForm();
                        }}
                      >
                        <div className="text-center text-white mt-2 sm:mt-3" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}>
                          <div
                            className="text-[32px] sm:text-[40px] md:text-[38px] font-bold tracking-[-0.02em] cursor-pointer"
                            style={{ fontFamily: "var(--font-inter), sans-serif" }}
                            onClick={openForm}
                          >
                            {time}
                          </div>
                          <div className="text-[10px] sm:text-[12px] md:text-[12px] text-white/70 mt-0.5">{dateStr}</div>
                          <div className="text-[8px] sm:text-[10px] text-[#0D9488]/80 mt-1 font-medium">Aspire College</div>
                        </div>

                        {/* App grid - Aspire College themed */}
                        <div className="grid grid-cols-3 gap-x-2 sm:gap-x-4 gap-y-3 sm:gap-y-5 mt-3 sm:mt-7">
                          {APPS.map((app) => (
                            <button
                              key={app.key}
                              type="button"
                              onClick={openForm}
                              className="flex flex-col items-center gap-0.5 sm:gap-1 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-[0.92]"
                            >
                              <span
                                className={`w-[40px] h-[40px] sm:w-[54px] sm:h-[54px] md:w-[50px] md:h-[50px] rounded-[10px] sm:rounded-[14px] flex items-center justify-center text-[16px] sm:text-[24px] md:text-[22px] text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-[4px] border border-white/10 bg-gradient-to-br ${GRADIENTS[app.color]}`}
                              >
                                {app.emoji}
                              </span>
                              <span
                                className="text-[7px] sm:text-[9px] md:text-[9px] text-center font-medium text-white/85"
                                style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
                              >
                                {app.label}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Dock */}
                        <div className="flex justify-center gap-3 sm:gap-6 md:gap-5 mt-auto px-2 sm:px-4 md:px-4 py-1.5 sm:py-2.5 md:py-2 rounded-[16px] sm:rounded-[22px] md:rounded-[20px] bg-white/10 backdrop-blur-xl border border-white/5 mb-0.5 sm:mb-1">
                          {DOCK.map((app) => (
                            <button
                              key={app.key}
                              type="button"
                              onClick={openForm}
                              className="flex flex-col items-center gap-0.5 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-[0.92]"
                            >
                              <span
                                className={`w-7 h-7 sm:w-10 sm:h-10 md:w-9 md:h-9 rounded-[8px] sm:rounded-xl flex items-center justify-center text-[13px] sm:text-[18px] md:text-[16px] text-white backdrop-blur-[4px] border border-white/10 bg-gradient-to-br ${GRADIENTS[app.color]}`}
                              >
                                {app.emoji}
                              </span>
                              <span
                                className="text-[6px] sm:text-[8px] md:text-[8px] font-medium text-white/70"
                                style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
                              >
                                {app.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* FORM SCREEN */}
                      <div
                        className={`absolute inset-0 rounded-[26px] sm:rounded-[30px] md:rounded-[36px] flex flex-col z-30 overflow-hidden transition-transform duration-700 ease-out ${
                          formOpen ? "translate-y-0" : "translate-y-full"
                        }`}
                        style={{ 
                          background: colors.formBg,
                          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                          borderRadius: 'inherit',
                        }}
                      >
                        {/* Status bar */}
                        <div
                          className="px-4 sm:px-6 md:px-7 pt-[14px] sm:pt-[18px] md:pt-[18px] pb-0.5 flex justify-between text-[9px] sm:text-[10px] md:text-xs font-semibold flex-shrink-0"
                          style={{ color: '#17141F' }}
                        >
                          <span>{time}</span>
                          <span>●●●●</span>
                        </div>

                        {/* Form Header */}
                        <div className="px-3 sm:px-[22px] pt-1 pb-2 flex items-center justify-between border-b flex-shrink-0" style={{ borderColor: colors.border }}>
                          <span
                            className="text-sm sm:text-lg"
                            style={{ fontFamily: "var(--font-fraunces), serif", fontWeight: 500, color: colors.textPrimary }}
                          >
                            Send a{" "}
                            <span style={{ color: colors.accent }}>message</span>
                          </span>
                          <button
                            type="button"
                            onClick={closeForm}
                            className="bg-transparent border-none text-base sm:text-xl cursor-pointer px-2 py-1 rounded-lg transition-colors flex-shrink-0"
                            style={{ color: colors.textMuted }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#F3F4F6'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                          >
                            ✕
                          </button>
                        </div>

                        {/* Form Body */}
                        <form
                          onSubmit={handleSubmit}
                          className="flex-1 px-3 sm:px-[22px] pt-2 sm:pt-3 pb-2 sm:pb-3 flex flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                          <div className="flex-1 space-y-1.5 sm:space-y-2">
                            {FIELDS.map((field) => (
                              <div key={field.id} className="flex flex-col gap-0.5 transition-all duration-300 opacity-100 translate-y-0">
                                <label htmlFor={field.id} className="text-[8px] sm:text-[10px] font-semibold tracking-[0.05em] uppercase" style={{ color: colors.textMuted }}>
                                  {field.label}
                                </label>
                                {field.type === "textarea" ? (
                                  <textarea
                                    id={field.id}
                                    ref={(el) => {
                                      inputRefs.current[field.id] = el;
                                    }}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    value={values[field.id] ?? ""}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    className="font-sans text-[11px] sm:text-[13px] rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 outline-none resize-none min-h-[32px] sm:min-h-[42px] leading-[1.4] sm:leading-[1.5] transition-colors duration-300"
                                    style={{
                                      fontFamily: "var(--font-inter), sans-serif",
                                      background: colors.inputBg,
                                      border: `1.4px solid ${colors.inputBorder}`,
                                      color: colors.textPrimary,
                                    }}
                                    onFocus={(e) => {
                                      e.currentTarget.style.borderColor = colors.inputFocus;
                                      e.currentTarget.style.background = '#F8FAFF';
                                    }}
                                    onBlur={(e) => {
                                      e.currentTarget.style.borderColor = colors.inputBorder;
                                      e.currentTarget.style.background = colors.inputBg;
                                    }}
                                  />
                                ) : (
                                  <input
                                    id={field.id}
                                    ref={(el) => {
                                      inputRefs.current[field.id] = el;
                                    }}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    value={values[field.id] ?? ""}
                                    onChange={(e) => handleChange(field.id, e.target.value)}
                                    className="font-sans text-[11px] sm:text-[13px] rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 outline-none transition-colors duration-300"
                                    style={{
                                      fontFamily: "var(--font-inter), sans-serif",
                                      background: colors.inputBg,
                                      border: `1.4px solid ${colors.inputBorder}`,
                                      color: colors.textPrimary,
                                    }}
                                    onFocus={(e) => {
                                      e.currentTarget.style.borderColor = colors.inputFocus;
                                      e.currentTarget.style.background = '#F8FAFF';
                                    }}
                                    onBlur={(e) => {
                                      e.currentTarget.style.borderColor = colors.inputBorder;
                                      e.currentTarget.style.background = colors.inputBg;
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Submit Button */}
                          <div className="flex-shrink-0 mt-1.5 sm:mt-2">
                            <button
                              type="submit"
                              disabled={sendState !== "idle"}
                              className={`w-full border-none rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs md:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-400 text-white opacity-100 translate-y-0 ${
                                sendState === "sent" ? "bg-[#1D9E6D]" : ""
                              }`}
                              style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                background: sendState === "sent" ? '#1D9E6D' : colors.buttonBg,
                                color: sendState === "sent" ? '#FFFFFF' : colors.buttonText,
                              }}
                            >
                              <span>{sendLabel}</span>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-3.5 sm:h-3.5">
                                <path d="M5 12h14" />
                                <path d="M13 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </form>

                        {/* Bottom home indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] md:w-[90px] h-0.5 sm:h-1 rounded-[2px] sm:rounded-[3px]" style={{ background: 'rgba(0,0,0,0.08)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}