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

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function ContactSection() {
  const [time, setTime] = useState("9:41");
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent">("idle");
  const [values, setValues] = useState<Record<string, string>>({});

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // ─── Theme Colors - Solid Colors ────────────────────────────────────────────
  const TEAL_600 = '#0D9488';
  
  const colors = {
    sectionBg: '#FFFFFF',
    cardBg: '#FFFFFF',
    leftBg: '#F8FAFC',
    textPrimary: '#0a1240',
    textSecondary: '#0a1240',
    textMuted: '#3d4566',
    border: 'rgba(13, 148, 136, 0.15)',
    accent: TEAL_600,
    accentLight: 'rgba(13, 148, 136, 0.08)',
    inputBg: '#FFFFFF',
    inputBorder: '#E2E8F0',
    shadow: '0 20px 50px rgba(0,0,0,0.06)',
    laptopBg: '#0F172A',
    formBg: '#FFFFFF',
    inputFocus: TEAL_600,
    buttonBg: TEAL_600,
    buttonText: '#FFFFFF',
    laptopBorder: TEAL_600,
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

  const closeForm = () => {
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
      }, 2000);
    }, 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
        minHeight: 'auto',
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="px-3 sm:px-8 md:px-16">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 text-[10px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase mb-3 sm:mb-5 md:mb-7">
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] items-stretch">
            
            {/* ─── LEFT COLUMN ────────────────────────────────────────────────── */}
            <div 
              className="relative p-[20px_16px_20px] sm:p-[24px_20px_24px] lg:p-[30px_24px_24px] flex flex-col justify-center min-h-[300px] sm:min-h-[340px] overflow-hidden"
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
                  className="mt-3 sm:mt-4 text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] max-w-[380px] hidden sm:block"
                  style={{ color: colors.textMuted }}
                >
                  Have questions about admissions, programs, or campus life? Reach out to us and get a response within 24 hours.
                </p>

                <ul className="mt-4 sm:mt-6 lg:mt-9 list-none">
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

            {/* ─── RIGHT COLUMN - Laptop Mockup with Form ──────────────────────── */}
            <div 
              className="relative flex justify-center items-center p-[16px_20px] sm:p-[20px_24px] lg:p-[24px_28px] min-h-[400px] sm:min-h-[480px] lg:min-h-[500px]"
              style={{ 
                background: colors.formBg,
                borderLeft: '1px solid rgba(0, 0, 0, 0.04)',
              }}
            >
              <div className="relative flex justify-center items-center z-[2] w-full">
                {/* Laptop Mockup - No Bottom Shadow */}
                <div 
                  className="relative w-full max-w-[500px] rounded-t-2xl overflow-hidden transition-colors duration-300"
                  style={{
                    background: colors.laptopBg,
                    boxShadow: `0 20px 50px -10px rgba(0,0,0,0.15)`,
                    border: `2px solid ${colors.laptopBorder}`,
                  }}
                >
                  {/* Laptop Screen - Form inside */}
                  <div className="relative w-full bg-white p-4 sm:p-6 lg:p-8">
                    {/* Screen Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: colors.border }}>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="w-3 h-3 rounded-full bg-red-500"></span>
                          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                          <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        </div>
                        <span className="text-xs font-medium ml-2" style={{ color: colors.textMuted }}>
                          Aspire College - Contact Form
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px]" style={{ color: colors.textMuted }}>{time}</span>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {FIELDS.slice(0, 3).map((field) => (
                          <div key={field.id} className={field.id === "fphone" ? "sm:col-span-2" : ""}>
                            <label htmlFor={field.id} className="block text-[10px] sm:text-xs font-semibold tracking-[0.05em] uppercase mb-1" style={{ color: colors.textMuted }}>
                              {field.label}
                            </label>
                            <input
                              id={field.id}
                              type={field.type}
                              placeholder={field.placeholder}
                              required={field.required}
                              value={values[field.id] ?? ""}
                              onChange={(e) => handleChange(field.id, e.target.value)}
                              className="w-full font-sans text-[12px] sm:text-sm rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 outline-none transition-all duration-300"
                              style={{
                                fontFamily: "var(--font-inter), sans-serif",
                                background: colors.inputBg,
                                border: `1.4px solid ${colors.inputBorder}`,
                                color: colors.textPrimary,
                              }}
                              onFocus={(e) => {
                                e.currentTarget.style.borderColor = colors.inputFocus;
                                e.currentTarget.style.background = '#F8FAFF';
                                e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.accentLight}`;
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.borderColor = colors.inputBorder;
                                e.currentTarget.style.background = colors.inputBg;
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label htmlFor="fsubject" className="block text-[10px] sm:text-xs font-semibold tracking-[0.05em] uppercase mb-1" style={{ color: colors.textMuted }}>
                          Subject
                        </label>
                        <input
                          id="fsubject"
                          type="text"
                          placeholder="Admission inquiry"
                          required
                          value={values["fsubject"] ?? ""}
                          onChange={(e) => handleChange("fsubject", e.target.value)}
                          className="w-full font-sans text-[12px] sm:text-sm rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 outline-none transition-all duration-300"
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            background: colors.inputBg,
                            border: `1.4px solid ${colors.inputBorder}`,
                            color: colors.textPrimary,
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = colors.inputFocus;
                            e.currentTarget.style.background = '#F8FAFF';
                            e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.accentLight}`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = colors.inputBorder;
                            e.currentTarget.style.background = colors.inputBg;
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>

                      <div>
                        <label htmlFor="fmessage" className="block text-[10px] sm:text-xs font-semibold tracking-[0.05em] uppercase mb-1" style={{ color: colors.textMuted }}>
                          Message
                        </label>
                        <textarea
                          id="fmessage"
                          placeholder="Tell us about your query..."
                          required
                          rows={3}
                          value={values["fmessage"] ?? ""}
                          onChange={(e) => handleChange("fmessage", e.target.value)}
                          className="w-full font-sans text-[12px] sm:text-sm rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 outline-none resize-none transition-all duration-300"
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            background: colors.inputBg,
                            border: `1.4px solid ${colors.inputBorder}`,
                            color: colors.textPrimary,
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = colors.inputFocus;
                            e.currentTarget.style.background = '#F8FAFF';
                            e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.accentLight}`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = colors.inputBorder;
                            e.currentTarget.style.background = colors.inputBg;
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={sendState !== "idle"}
                        className={`w-full border-none rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-400 text-white ${
                          sendState === "sent" ? "bg-[#1D9E6D]" : ""
                        }`}
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          background: sendState === "sent" ? '#1D9E6D' : colors.buttonBg,
                          color: sendState === "sent" ? '#FFFFFF' : colors.buttonText,
                        }}
                      >
                        <span>{sendLabel}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="M5 12h14" />
                          <path d="M13 5l7 7-7 7" />
                        </svg>
                      </button>
                    </form>
                  </div>

                  {/* Laptop Bottom Bar - Minimal Stand */}
                  <div className="w-full h-0.5 bg-[#1a1a2e]"></div>
                  <div className="w-12 h-0.5 mx-auto bg-[#2a2a3e] rounded-b-full"></div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}