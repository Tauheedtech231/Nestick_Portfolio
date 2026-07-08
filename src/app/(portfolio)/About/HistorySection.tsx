/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Link from 'next/link';

export default function HistorySection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Theme Colors - Your Teal + Blue Theme
  const TEAL_600 = '#0D9488';
  const BLUE_600 = '#2563EB';
  const NAVY_DEEP = '#0e1b30';
  const CREAM = '#f2ede2';
  const MUTED = '#aab4c8';

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Smooth slide from left on scroll
  const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center py-10 sm:py-12 md:py-16 bg-white"
    >
      {/* Top Heading with Description - Slide from left on scroll */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16"
      >
        <motion.div variants={slideFromLeft} className="text-center">
          <h2 
            className="text-[clamp(28px,3.5vw,48px)] font-bold mb-3 leading-tight"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#1E293B',
            }}
          >
            Our <span style={{ color: TEAL_600 }}>History</span> &amp;{' '}
            <span style={{ color: BLUE_600 }}>Legacy</span>
          </h2>
          <motion.div 
            variants={fadeInUp}
            className="w-20 h-1 rounded-full mx-auto mb-4"
            style={{ background: TEAL_600 }}
          />
          <p 
            className="text-[15px] sm:text-[17px] md:text-[19px] text-[#64748B] max-w-3xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Discover the rich heritage and journey of Aspire College, built on decades of educational excellence and innovation
          </p>
        </motion.div>
      </motion.div>

      {/* Full Width Card - Clean, no shadow */}
      <div className="w-full px-0">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative w-full rounded-none overflow-hidden"
          style={{
            background: NAVY_DEEP,
            aspectRatio: '1098/714',
          }}
        >
          {/* Left Background - Clean solid color */}
          <div 
            className="absolute left-0 top-0 w-[53.2%] h-full z-[1]"
            style={{
              background: NAVY_DEEP,
            }}
          />

          {/* Photo SVG - WITHOUT teal curve line */}
          <svg 
            className="absolute inset-0 w-full h-full z-[2]"
            viewBox="0 0 1098 714" 
            preserveAspectRatio="xMidYMid slice" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="photoClip" clipPathUnits="userSpaceOnUse">
                <path d="M 585,0 C 573.3,10 531.5,40 515,60 C 498.5,80 492.3,100 486,120 C 479.7,140 479.7,160 477,180 C 474.3,200 472.2,220 470,240 C 467.8,260 466,280 464,300 C 462,320 458.7,340 458,360 C 457.3,380 460.3,400 460,420 C 459.7,440 458,460 456,480 C 454,500 449.7,522.5 448,540 C 446.3,557.5 443.5,570 446,585 C 448.5,600 456.3,617.5 463,630 C 469.7,642.5 474.3,650 486,660 C 497.7,670 517.2,682.5 533,690 C 548.8,697.5 568.7,701 581,705 C 593.3,709 602.7,712.5 607,714 L 1098,714 L 1098,0 Z" />
              </clipPath>
              <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="55%" stopColor="rgba(9,17,32,0)" />
                <stop offset="100%" stopColor="rgba(9,17,32,0.5)" />
              </linearGradient>
            </defs>
            <g clipPath="url(#photoClip)">
              <image 
                href="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
                x="0" y="0" width="1098" height="714" 
                preserveAspectRatio="xMidYMid slice" 
              />
              <rect x="0" y="0" width="1098" height="714" fill="url(#fadeGrad)" />
            </g>
            {/* Teal curve line REMOVED */}
          </svg>

          {/* Watermark SVG - Clean */}
          <svg 
            className="absolute left-0 bottom-0 w-[17%] opacity-[0.03] pointer-events-none z-[1]"
            viewBox="0 0 200 260" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M100 0L120 40H80L100 0Z" fill={TEAL_600}/>
            <rect x="90" y="40" width="20" height="60" fill={TEAL_600}/>
            <rect x="20" y="100" width="160" height="160" fill={TEAL_600}/>
            <rect x="40" y="120" width="14" height="30" fill={NAVY_DEEP}/>
            <rect x="70" y="120" width="14" height="30" fill={NAVY_DEEP}/>
            <rect x="100" y="120" width="14" height="30" fill={NAVY_DEEP}/>
            <rect x="130" y="120" width="14" height="30" fill={NAVY_DEEP}/>
          </svg>

          {/* Content */}
          <div 
            className="absolute z-[3] left-0 top-0 w-[44%] h-full flex flex-col justify-center"
            style={{ padding: '5.5% 4.5%' }}
          >
            {/* Eyebrow */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 w-fit px-2 py-2 pr-4 rounded-full mb-[5%]"
              style={{
                background: 'rgba(13,148,136,0.1)',
                border: '1px solid rgba(13,148,136,0.35)',
              }}
            >
              <span 
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(13,148,136,0.18)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={TEAL_600} strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 7v5l3 3"/>
                </svg>
              </span>
              <span 
                className="text-[12px] font-bold tracking-[1.6px] uppercase whitespace-nowrap"
                style={{ color: TEAL_600 }}
              >
                OUR HERITAGE
              </span>
            </motion.div>

            {/* Heading - Only "Since 1985" */}
            <motion.h1 
              variants={fadeInUp}
              className="leading-[1.08] mb-[4%]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(20px, 3.6vw, 52px)',
                color: TEAL_600,
              }}
            >
              Since 1985
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="leading-[1.75] mb-[4%]"
              style={{
                fontSize: 'clamp(11px, 1vw, 14.5px)',
                color: MUTED,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Established in 1985, Aspire College has been at the forefront of educational excellence for nearly four decades. What began as a small institution with just 200 students has grown into a premier educational hub serving over 10,000 students annually.
            </motion.p>

            <motion.p 
              variants={fadeInUp}
              className="leading-[1.75] mb-[4%]"
              style={{
                fontSize: 'clamp(11px, 1vw, 14.5px)',
                color: MUTED,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Our legacy is built on a foundation of academic rigor, innovative teaching methodologies, and a commitment to developing well-rounded individuals who contribute meaningfully to society.
            </motion.p>

            {/* CTA Button - Redirects to /Contact */}
            <motion.div
              variants={fadeInUp}
            >
              <Link
                href="/Contact"
                className="inline-flex items-center gap-3 w-fit mt-[4%] transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  padding: '11px 10px 11px 22px',
                  background: `linear-gradient(135deg, ${TEAL_600}, ${BLUE_600})`,
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 'clamp(11px, 1.05vw, 14.5px)',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <span>Get in Touch</span>
                <span 
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: '#14213a',
                    color: '#FFFFFF',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Overlay Card - Clean */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.4 }}
            className="absolute z-[4] flex items-center gap-4 rounded-[18px]"
            style={{
              left: '51%',
              right: '3%',
              bottom: '4.5%',
              padding: '1.8% 2%',
              background: 'rgba(10,18,33,0.85)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div 
              className="flex-shrink-0 w-[14%] max-w-[52px] aspect-square rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(13,148,136,0.15)',
                border: '1px solid rgba(13,148,136,0.4)',
                color: TEAL_600,
              }}
            >
              <svg className="w-[46%] h-[46%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M4 21V9l8-6 8 6v12M9 21v-6h6v6"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 
                className="font-semibold text-white mb-0.5"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(12px, 1.4vw, 19px)',
                }}
              >
                Prestigious Heritage
              </h3>
              <p 
                className="leading-[1.5]"
                style={{
                  fontSize: 'clamp(9px, 1vw, 13.5px)',
                  color: MUTED,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Our campus blends historic architecture with modern facilities.
              </p>
            </div>
            <div 
              className="ml-auto flex-shrink-0 w-[12%] max-w-[44px] aspect-square rounded-full flex items-center justify-center"
              style={{
                background: TEAL_600,
                color: '#FFFFFF',
              }}
            >
              <svg className="w-[38%] h-[38%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @media (max-width: 720px) {
          .aspect-ratio-auto {
            aspect-ratio: auto !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}