/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Link from 'next/link';

interface HistoryData {
  historyTitle: string;
  historyDescription: string;
  historyDesktopImage: string;
  historyMobileImage: string;
  establishedYear: string;
  heritageTitle: string;
  heritageDescription: string;
}

export default function HistorySection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [data, setData] = useState<HistoryData>({
    historyTitle: 'Since 1985',
    historyDescription: 'Established in 1985, Aspire College has been at the forefront of educational excellence for nearly four decades.',
    historyDesktopImage: '',
    historyMobileImage: '',
    establishedYear: '1985',
    heritageTitle: 'Prestigious Heritage',
    heritageDescription: 'Our campus blends historic architecture with modern facilities.'
  });
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Session storage key
  const SESSION_KEY = 'history_section_8';

  // ✅ Consistent brand colors - EXACTLY same as Navbar
  const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color (same as Navbar)
  const PRIMARY_DARK = '#1530b0'; // Darker blue for hover (same as Navbar)
  const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights
  const NAVY_DEEP = '#0e1b30';
  const MUTED = '#aab4c8';

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ Fetch data from API with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [HistorySection] Loading from session storage (instant)');
          const parsedData = JSON.parse(cachedData);
          setData(parsedData);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    async function fetchData() {
      try {
        console.log('🔄 [HistorySection] Fetching data for college: 8');
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=8&section_name=About`);
        const result = await response.json();
        console.log('📦 [HistorySection] API Response:', result);

        let fetchedData;
        if (result.success && result.content) {
          console.log('✅ [HistorySection] historyDesktopImage:', result.content.historyDesktopImage);
          console.log('✅ [HistorySection] historyMobileImage:', result.content.historyMobileImage);
          
          fetchedData = {
            historyTitle: result.content.historyTitle || 'Since 1985',
            historyDescription: result.content.historyDescription || 'Established in 1985, Aspire College has been at the forefront of educational excellence for nearly four decades.',
            historyDesktopImage: result.content.historyDesktopImage || '',
            historyMobileImage: result.content.historyMobileImage || '',
            establishedYear: result.content.establishedYear || '1985',
            heritageTitle: result.content.heritageTitle || 'Prestigious Heritage',
            heritageDescription: result.content.heritageDescription || 'Our campus blends historic architecture with modern facilities.'
          };
          console.log('✅ [HistorySection] Data loaded successfully');
        } else {
          console.log('⚠️ [HistorySection] No data, using default');
          fetchedData = {
            historyTitle: 'Since 1985',
            historyDescription: 'Established in 1985, Aspire College has been at the forefront of educational excellence for nearly four decades.',
            historyDesktopImage: '',
            historyMobileImage: '',
            establishedYear: '1985',
            heritageTitle: 'Prestigious Heritage',
            heritageDescription: 'Our campus blends historic architecture with modern facilities.'
          };
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        }
        setData(fetchedData);
      } catch (error) {
        console.error('❌ [HistorySection] Error fetching:', error);
        // ✅ Don't cache on error
        setData({
          historyTitle: 'Since 1985',
          historyDescription: 'Established in 1985, Aspire College has been at the forefront of educational excellence for nearly four decades.',
          historyDesktopImage: '',
          historyMobileImage: '',
          establishedYear: '1985',
          heritageTitle: 'Prestigious Heritage',
          heritageDescription: 'Our campus blends historic architecture with modern facilities.'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [SESSION_KEY]);

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

  // ✅ Get image based on device
  const getImageUrl = () => {
    console.log('📸 [HistorySection] isMobile:', isMobile);
    console.log('📸 [HistorySection] historyDesktopImage:', data.historyDesktopImage);
    console.log('📸 [HistorySection] historyMobileImage:', data.historyMobileImage);
    
    if (isMobile) {
      return data.historyMobileImage || "https://plus.unsplash.com/premium_photo-1691962725086-d1590e379139?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D";
    }
    return data.historyDesktopImage || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80";
  };

  // ✅ Show loading only on first visit (no cache)
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <section className="relative w-full flex flex-col items-center justify-center py-16 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center py-10 sm:py-12 md:py-16 bg-white"
    >
      {/* Top Heading */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16"
      >
        <motion.div variants={slideFromLeft} className="text-center">
          <h2 className="text-[clamp(28px,3.5vw,35px)] font-extrabold mb-3 leading-tight text-[#0a1240]">
            Our <span style={{ color: PRIMARY_COLOR }}>History</span> &amp;{' '}
            <span style={{ color: PRIMARY_COLOR }}>Legacy</span>
          </h2>
          <motion.div 
            variants={fadeInUp}
            className="w-20 h-1 rounded-full mx-auto mb-4"
            style={{ background: PRIMARY_COLOR }}
          />
          <p className="text-[15px] text-[#3d4566] max-w-3xl mx-auto leading-[1.8]">
            Discover the rich heritage and journey of Nestick College, built on decades of educational excellence and innovation
          </p>
        </motion.div>
      </motion.div>

      {/* Full Width Card */}
      <div className="w-full px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="relative w-full overflow-hidden"
          style={{ background: NAVY_DEEP }}
        >
          {/* Desktop Layout */}
          <div className="hidden md:block relative w-full" style={{ aspectRatio: '1098/714' }}>
            <div className="absolute left-0 top-0 w-[53.2%] h-full z-[1]" style={{ background: NAVY_DEEP }} />

            <svg className="absolute inset-0 w-full h-full z-[2]" viewBox="0 0 1098 714" preserveAspectRatio="xMidYMid slice">
              <defs>
                <clipPath id="photoClip">
                  <path d="M 585,0 C 573.3,10 531.5,40 515,60 C 498.5,80 492.3,100 486,120 C 479.7,140 479.7,160 477,180 C 474.3,200 472.2,220 470,240 C 467.8,260 466,280 464,300 C 462,320 458.7,340 458,360 C 457.3,380 460.3,400 460,420 C 459.7,440 458,460 456,480 C 454,500 449.7,522.5 448,540 C 446.3,557.5 443.5,570 446,585 C 448.5,600 456.3,617.5 463,630 C 469.7,642.5 474.3,650 486,660 C 497.7,670 517.2,682.5 533,690 C 548.8,697.5 568.7,701 581,705 C 593.3,709 602.7,712.5 607,714 L 1098,714 L 1098,0 Z" />
                </clipPath>
                <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="55%" stopColor="rgba(9,17,32,0)" />
                  <stop offset="100%" stopColor="rgba(9,17,32,0.5)" />
                </linearGradient>
              </defs>
              <g clipPath="url(#photoClip)">
                <image 
                  href={getImageUrl()}
                  x="0" y="0" width="1098" height="714" 
                  preserveAspectRatio="xMidYMid slice" 
                />
                <rect x="0" y="0" width="1098" height="714" fill="url(#fadeGrad)" />
              </g>
            </svg>

            {/* Watermark - Using PRIMARY_COLOR */}
            <svg className="absolute left-0 bottom-0 w-[17%] opacity-[0.03] pointer-events-none z-[1]" viewBox="0 0 200 260">
              <path d="M100 0L120 40H80L100 0Z" fill={PRIMARY_COLOR}/>
              <rect x="90" y="40" width="20" height="60" fill={PRIMARY_COLOR}/>
              <rect x="20" y="100" width="160" height="160" fill={PRIMARY_COLOR}/>
              <rect x="40" y="120" width="14" height="30" fill={NAVY_DEEP}/>
              <rect x="70" y="120" width="14" height="30" fill={NAVY_DEEP}/>
              <rect x="100" y="120" width="14" height="30" fill={NAVY_DEEP}/>
              <rect x="130" y="120" width="14" height="30" fill={NAVY_DEEP}/>
            </svg>

            {/* Content */}
            <div className="absolute z-[3] left-0 top-0 w-[44%] h-full flex flex-col justify-center" style={{ padding: '5.5% 4.5%' }}>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 w-fit px-2 py-2 pr-4 rounded-full mb-[5%]" style={{ background: 'rgba(47,86,251,0.1)', border: '1px solid rgba(47,86,251,0.35)' }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(47,86,251,0.18)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={PRIMARY_COLOR} strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 7v5l3 3"/>
                  </svg>
                </span>
                <span className="text-[12px] font-bold tracking-[1.6px] uppercase whitespace-nowrap" style={{ color: PRIMARY_COLOR }}>OUR HERITAGE</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="leading-[1.08] mb-[4%]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(20px, 3.6vw, 52px)', color: PRIMARY_COLOR }}>
                {data.historyTitle}
              </motion.h1>

              <motion.p variants={fadeInUp} className="leading-[1.8] mb-[4%]" style={{ fontSize: 'clamp(11px, 1vw, 15px)', color: MUTED, fontFamily: "'Inter', sans-serif" }}>
                {data.historyDescription}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Link href="/Contact" className="inline-flex items-center gap-3 w-fit mt-[4%] transition-transform duration-300 hover:-translate-y-0.5" style={{ padding: '11px 10px 11px 22px', background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK})`, color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(11px, 1.05vw, 14px)', borderRadius: '999px', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
                  <span>Get in Touch</span>
                  <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: '#14213a', color: '#FFFFFF' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Overlay Card */}
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute z-[4] flex items-center gap-4 rounded-[18px]" style={{ left: '51%', right: '3%', bottom: '4.5%', padding: '1.8% 2%', background: 'rgba(10,18,33,0.85)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex-shrink-0 w-[14%] max-w-[52px] aspect-square rounded-full flex items-center justify-center" style={{ background: 'rgba(47,86,251,0.15)', border: '1px solid rgba(47,86,251,0.4)', color: PRIMARY_COLOR }}>
                <svg className="w-[46%] h-[46%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M4 21V9l8-6 8 6v12M9 21v-6h6v6"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white mb-0.5" style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(12px, 1.4vw, 19px)' }}>
                  {data.heritageTitle}
                </h3>
                <p className="leading-[1.5]" style={{ fontSize: 'clamp(9px, 1vw, 13.5px)', color: MUTED, fontFamily: "'Inter', sans-serif" }}>
                  {data.heritageDescription}
                </p>
              </div>
              <div className="ml-auto flex-shrink-0 w-[12%] max-w-[44px] aspect-square rounded-full flex items-center justify-center" style={{ background: PRIMARY_COLOR, color: '#FFFFFF' }}>
                <svg className="w-[38%] h-[38%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Mobile Layout */}
          <div className="block md:hidden" style={{ background: NAVY_DEEP }}>
            <div className="px-6 pt-8 pb-2" style={{ background: NAVY_DEEP }}>
              <motion.h1 variants={fadeInUp} className="leading-[1.08] mb-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 6vw, 38px)', color: PRIMARY_COLOR }}>
                {data.historyTitle}
              </motion.h1>

              <motion.p variants={fadeInUp} className="leading-[1.8] mb-3" style={{ fontSize: 'clamp(14px, 2.5vw, 15px)', color: MUTED, fontFamily: "'Inter', sans-serif" }}>
                {data.historyDescription}
              </motion.p>

              <motion.div variants={fadeInUp}>
                <Link href="/Contact" className="inline-flex items-center gap-3 w-fit transition-transform duration-300 hover:-translate-y-0.5" style={{ padding: '12px 10px 12px 24px', background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK})`, color: '#FFFFFF', fontWeight: 700, fontSize: 'clamp(14px, 2.5vw, 14px)', borderRadius: '999px', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>
                  <span>Get in Touch</span>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: '#14213a', color: '#FFFFFF' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>

            <div className="pb-14 pt-2" style={{ background: NAVY_DEEP }}>
              <div className="relative w-full overflow-hidden rounded-[18px]" style={{ aspectRatio: '16/18', background: NAVY_DEEP, border: '1px solid rgba(255,255,255,0.06)' }}>
                <img 
                  src={getImageUrl()} 
                  alt="College Campus" 
                  loading="lazy" 
                  className="w-full h-full object-cover" 
                  style={{ opacity: 0.9 }} 
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(14,27,48,0.3) 0%, rgba(14,27,48,0.1) 100%)' }} />
                <motion.div initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="absolute top-3 right-3 z-10">
                  <div className="px-3 py-1.5 rounded-full" style={{ background: 'rgba(47,86,251,0.9)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                    <span className="text-[10px] font-bold tracking-[0.5px] uppercase whitespace-nowrap" style={{ color: '#FFFFFF', fontFamily: "'Inter', sans-serif" }}>
                      Est. {data.establishedYear}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
}