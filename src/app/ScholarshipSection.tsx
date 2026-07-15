'use client';

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";

interface ScholarshipCard {
  id: string;
  num: string;
  title: string;
  description: string;
  color: string;
  className?: string;
}

interface ScholarshipStatsData {
  badgeText: string;
  title: string;
  subtitle: string;
  cards: ScholarshipCard[];
  buttonText: string;
  buttonLink: string;
}

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const walkInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function ScholarshipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const [data, setData] = useState<ScholarshipStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded college ID for testing
  const collegeId = "8";
  const SESSION_KEY = `scholarship_stats_${collegeId}`;

  // Get default data
  const getDefaultData = (): ScholarshipStatsData => {
    console.log('📋 [ScholarshipSection] Using default data');
    return {
      badgeText: 'SCHOLARSHIPS',
      title: 'Scholarships &',
      subtitle: 'We believe that financial constraints should never be a barrier to quality education. Nestick College offers a range of merit-based and need-based scholarships to help talented students achieve their academic dreams.',
      buttonText: 'Explore Scholarships',
      buttonLink: '/Scholarships',
      cards: [
        {
          id: "card1",
          num: "01",
          title: "Merit Scholarships",
          description: "Recognizing excellence and academic achievements.",
          color: "#2f56fb",
          className: "card1",
        },
        {
          id: "card2",
          num: "02",
          title: "Need-Based Aid",
          description: "Supporting students who need it the most.",
          color: "#2f56fb",
          className: "card2",
        },
        {
          id: "card3",
          num: "03",
          title: "Affordable Education",
          description: "Making quality education accessible for all.",
          color: "#2f56fb",
          className: "card3",
        }
      ]
    };
  };

  // ✅ Fetch data with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (synchronous)
    const cachedData = sessionStorage.getItem(SESSION_KEY);
    
    if (cachedData) {
      try {
        console.log('📦 [ScholarshipSection] Loading from session storage (instant)');
        const parsedData = JSON.parse(cachedData);
        setData(parsedData);
        setLoading(false);
        // ✅ Return early - no API call needed
        return;
      } catch (e) {
        console.error('Error parsing cached data:', e);
      }
    }

    // If no cached data, fetch from API
    async function fetchData() {
      try {
        console.log('🔄 [ScholarshipSection] Fetching data for college:', collegeId);
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=ScholarshipStats`);
        console.log('📡 [ScholarshipSection] Response status:', response.status);
        
        const result = await response.json();
        console.log('📦 [ScholarshipSection] Full API Response:', JSON.stringify(result, null, 2));
        console.log('📦 [ScholarshipSection] success:', result.success);
        console.log('📦 [ScholarshipSection] content:', result.content);

        let fetchedData;
        if (result.success && result.content) {
          console.log('✅ [ScholarshipSection] Content keys:', Object.keys(result.content));
          console.log('✅ [ScholarshipSection] Cards:', result.content.cards);
          fetchedData = result.content;
          console.log('✅ [ScholarshipSection] Data set successfully');
        } else {
          console.log('⚠️ [ScholarshipSection] No data, using fallback');
          fetchedData = getDefaultData();
        }

        // ✅ Save to session storage
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        setData(fetchedData);
      } catch (error) {
        console.error('❌ [ScholarshipSection] Error:', error);
        const fallbackData = getDefaultData();
        // ✅ Don't cache failed response
        setData(fallbackData);
      } finally {
        console.log('🏁 [ScholarshipSection] Fetch complete, setting loading false');
        setLoading(false);
      }
    }

    fetchData();
  }, [SESSION_KEY]);

  // Function to wrap text with 3 words per line with proper spacing
  const formatDescription = (text: string) => {
    const words = text.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += 3) {
      lines.push(words.slice(i, i + 3).join(' '));
    }
    return lines.join(' ');
  };

  // ✅ Show loading only on first visit (no cache)
  if (loading && !data) {
    console.log('⏳ [ScholarshipSection] Loading state...');
    return (
      <section 
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #fbfcff 0%, #f4f6fd 100%)',
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  const d = data || getDefaultData();
  console.log('📊 [ScholarshipSection] Final data:', d);
  console.log('📊 [ScholarshipSection] Cards count:', d.cards?.length);

  const displayCards = d.cards || getDefaultData().cards;
  const displayTitle = d.title || 'Scholarships &';
  const displaySubtitle = d.subtitle || 'We believe that financial constraints should never be a barrier to quality education. Nestick College offers a range of merit-based and need-based scholarships to help talented students achieve their academic dreams.';
  const displayBadge = d.badgeText || 'SCHOLARSHIPS';

  console.log('📊 [ScholarshipSection] displayCards:', displayCards);
  console.log('📊 [ScholarshipSection] displayTitle:', displayTitle);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fbfcff 0%, #f4f6fd 100%)',
      }}
    >
      {/*
        Hidden SVG that defines the pin-shape clip path using
        clipPathUnits="objectBoundingBox". Coordinates are 0-1 fractions
        of the element's own box, so the SAME clip-path automatically
        rescales correctly no matter what width/height the card has
        (desktop 260x340, tablet 230x300, mobile 200x280, etc).
        This is what fixes the "breaks on mobile" issue — the old
        version used fixed pixel coordinates (0-260, 0-340) which only
        matched the desktop size and got distorted at smaller sizes.
      */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="pinShape" clipPathUnits="objectBoundingBox">
            <path d="M0.5,1 C0.2308,0.8235 -0.0192,0.6176 0.0577,0.4412 C0.0962,0.3088 0.25,0.1912 0.5,0.1912 C0.75,0.1912 0.9038,0.3088 0.9423,0.4412 C1.0192,0.6176 0.7692,0.8235 0.5,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Depth Shadow Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 py-16 lg:py-16">
        {/* Heading - Top Center */}
        <motion.div 
          className="text-center mb-5 lg:mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[12px] font-semibold text-[#1c3fe0] shadow-sm mb-2"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
            </svg>
            {displayBadge}
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-extrabold text-[#0a1240] leading-[1.08]"
          >
            {displayTitle}<br />
            <span className="text-[#2f56fb]">Financial Aid</span>
          </motion.h1>
          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-center gap-1.5 mt-2"
          >
            <div className="h-1 w-[34px] rounded-full bg-[#2f56fb]" />
            <div className="h-[4px] w-[4px] rounded-full bg-[#2f56fb] opacity-55" />
            <div className="h-[4px] w-[4px] rounded-full bg-[#2f56fb] opacity-30" />
          </motion.div>
          <motion.p 
            variants={fadeInUp}
            className="mt-2 text-[14px] text-[#3d4566] leading-[1.6] max-w-2xl mx-auto"
          >
            {displaySubtitle}
          </motion.p>
        </motion.div>

        {/* Cards - Location Pin Shape */}
        <motion.div 
          className="relative flex flex-wrap justify-center items-center gap-6 lg:gap-8 mb-8 lg:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {displayCards && displayCards.length > 0 ? (
            displayCards.map((card, index) => (
              <motion.div
                key={card.id}
                variants={walkInRight}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                className="scholarship-card relative w-[260px] h-[340px] bg-white shadow-[0_18px_40px_rgba(47,86,251,0.12)] cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center"
                style={{
                  clipPath: "url(#pinShape)",
                  WebkitClipPath: "url(#pinShape)",
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 18px 40px rgba(47,86,251,0.12), 0 8px 20px rgba(47,86,251,0.06)',
                  padding: '20px 18px 30px',
                }}
              >
                {/* Number Watermark */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[70px] font-black leading-none opacity-[0.04] z-0" style={{ color: card.color }}>
                  {card.num}
                </div>

                {/* Number */}
                <div className="relative z-10 font-extrabold text-[14px] mb-1" style={{ color: card.color }}>{card.num}</div>

                {/* Title */}
                <div 
                  className="relative z-10 font-extrabold text-[14px] text-[#0a1240] leading-tight mb-1.5 max-w-[160px]"
                >
                  {card.title}
                </div>

                {/* Description - 3 words per line with proper spacing */}
                <div 
                  className="relative z-10 text-[11.5px] text-[#3d4566] leading-[1.8] max-w-[140px]"
                  style={{ 
                    wordBreak: 'break-word',
                    display: 'inline-block'
                  }}
                >
                  {formatDescription(card.description)}
                </div>

                {/* Pin tip at bottom */}
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[1px] w-0 h-0"
                  style={{
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: '18px solid white',
                    filter: 'drop-shadow(0 4px 8px rgba(47,86,251,0.08))'
                  }}
                />
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No scholarship cards available</p>
            </div>
          )}
        </motion.div>

        {/* Button - Below Cards */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Link
            href={d.buttonLink || '/Scholarships'}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] transition-all duration-300 cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 3L1 8l11 5 9-4.09V17h2V8L12 3z" />
              <path d="M4 11.18V15c0 2.21 3.58 4 8 4s8-1.79 8-4v-3.82" />
            </svg>
            {d.buttonText || 'Explore Scholarships'}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .scholarship-card {
            width: 230px !important;
            height: 300px !important;
            padding: 16px 14px 25px !important;
          }
        }
        @media (max-width: 480px) {
          .scholarship-card {
            width: 200px !important;
            height: 280px !important;
            padding: 14px 12px 22px !important;
          }
        }
      `}</style>
    </section>
  );
}