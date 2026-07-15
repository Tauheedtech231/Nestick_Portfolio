/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { BookOpen, Users, Target, Award } from "lucide-react";
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const walkInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const walkInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
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
      staggerChildren: 0.12
    }
  }
};

interface ProgramsStatsData {
  badgeText: string;
  headingFirst: string;
  headingHighlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  centerImage: string;
  card1Icon: string;
  card1Title: string;
  card1Subtitle: string;
  card1Description: string;
  card2Icon: string;
  card2Title: string;
  card2Subtitle: string;
  card2Description: string;
  card3Icon: string;
  card3Title: string;
  card3Subtitle: string;
  card3Description: string;
  card4Icon: string;
  card4Title: string;
  card4Subtitle: string;
  card4Description: string;
}

const iconMap: Record<string, any> = {
  BookOpen: BookOpen,
  Users: Users,
  Target: Target,
  Award: Award,
  GraduationCap: BookOpen,
  Briefcase: Users
};

export default function ProgramsSection() {
  const [data, setData] = useState<ProgramsStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded college ID for testing
  const collegeId = "8";
  const SESSION_KEY = `programs_stats_${collegeId}`;

  // Get default data
  const getDefaultData = (): ProgramsStatsData => ({
    badgeText: 'ACADEMIC EXCELLENCE',
    headingFirst: 'Comprehensive',
    headingHighlight: 'Programs',
    description: 'Choose from a diverse range of undergraduate and graduate programs designed to equip you with the skills needed for tomorrow\'s challenges.',
    buttonText: 'Browse Programs',
    buttonLink: '/Programms',
    centerImage: 'https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?auto=format&fit=crop&w=700&q=80',
    card1Icon: 'BookOpen',
    card1Title: 'Diverse',
    card1Subtitle: 'Programs',
    card1Description: 'Wide range of undergraduate and graduate programs.',
    card2Icon: 'Target',
    card2Title: 'Industry',
    card2Subtitle: 'Relevant',
    card2Description: 'Curriculum designed to meet real-world industry needs.',
    card3Icon: 'Users',
    card3Title: 'Expert',
    card3Subtitle: 'Faculty',
    card3Description: 'Learn from experienced educators and industry leaders.',
    card4Icon: 'Award',
    card4Title: 'Career',
    card4Subtitle: 'Focused',
    card4Description: 'Build skills for a successful and impactful career.'
  });

  // ✅ Fetch data with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (synchronous)
    const cachedData = sessionStorage.getItem(SESSION_KEY);
    
    if (cachedData) {
      try {
        console.log('📦 [ProgramsSection] Loading from session storage (instant)');
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
        console.log('🔄 [ProgramsSection] Fetching data for college:', collegeId);
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=ProgramsStats`);
        const result = await response.json();
        console.log('📦 [ProgramsSection] API Response:', result);

        let fetchedData;
        if (result.success && result.content) {
          console.log('✅ [ProgramsSection] Data loaded');
          fetchedData = result.content;
        } else {
          console.log('⚠️ [ProgramsSection] No data, using fallback');
          fetchedData = getDefaultData();
        }

        // ✅ Save to session storage
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        setData(fetchedData);
      } catch (error) {
        console.error('❌ [ProgramsSection] Error:', error);
        const fallbackData = getDefaultData();
        // ✅ Don't cache failed response
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [SESSION_KEY]);

  // ✅ Show loading only on first visit (no cache)
  if (loading && !data) {
    return (
      <section className="relative bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8edf8] overflow-x-hidden py-16 px-4 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  const d = data || getDefaultData();

  const Card1Icon = iconMap[d.card1Icon] || BookOpen;
  const Card2Icon = iconMap[d.card2Icon] || Target;
  const Card3Icon = iconMap[d.card3Icon] || Users;
  const Card4Icon = iconMap[d.card4Icon] || Award;

  return (
    <section className="relative bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8edf8] overflow-x-hidden py-16 px-4">
      {/* Deep shadow decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="relative max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {/* Top Eyebrow */}
        <motion.div 
          variants={fadeInUp}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="relative w-[80px] h-[2px] border-t-2 border-dashed border-[#2f56fb] opacity-40">
            <span className="absolute -top-[5px] left-0 w-[6px] h-[6px] rounded-full bg-[#2f56fb]" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[12px] font-semibold text-[#1c3fe0] shadow-sm cursor-pointer hover:bg-[#c8d2ed] transition-colors">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2f56fb] text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                <path d="M12 3 1 8l11 5 9-4.09V17h2V9L12 3zM12 15L4 11.18V15c0 2.21 3.58 4 8 4s8-1.79 8-4v-3.82L12 15z"/>
              </svg>
            </span>
            {d.badgeText}
          </div>
          <div className="relative w-[80px] h-[2px] border-t-2 border-dashed border-[#2f56fb] opacity-40">
            <span className="absolute -top-[5px] right-0 w-[6px] h-[6px] rounded-full bg-[#2f56fb]" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          variants={fadeInUp}
          className="text-3xl sm:text-4xl font-extrabold text-center text-[#0a1240] leading-[1.08]"
        >
          {d.headingFirst}<br />
          <span className="text-[#2f56fb]">{d.headingHighlight}</span>
        </motion.h1>

        {/* Divider */}
        <motion.div 
          variants={fadeInUp}
          className="flex items-center justify-center gap-3 my-4"
        >
          <div className="w-[50px] h-[2px] bg-[#2f56fb] opacity-40" />
          <div className="w-2 h-2 bg-[#2f56fb] rotate-45" />
          <div className="w-[50px] h-[2px] bg-[#2f56fb] opacity-40" />
        </motion.div>

        {/* Subtext */}
        <motion.p 
          variants={fadeInUp}
          className="max-w-[560px] mx-auto text-center text-[15px] leading-[1.7] text-[#3d4566] mb-12"
        >
          {d.description}
        </motion.p>

        {/*
          Feature Row - Cards with HTML shape.

          On mobile/tablet (below lg) the row wraps into 3 lines:
          Line 1 (above image): [Card Left 1] [Card Left 2]
          Line 2:               [Center Image]
          Line 3 (below image): [Card Right 1] [Card Right 2]

          Requested slope: in EACH pair, the left card sits lower (mt-10)
          and the right card sits higher (mt-0) — on both the top pair
          and the bottom pair. This is now set explicitly with base +
          sm: values so it's guaranteed on every mobile/tablet width,
          while lg: keeps the original desktop symmetric zigzag
          (up / down / down / up) around the image untouched.
        */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12 lg:gap-4">
          {/* Card Left 1 (top pair - left, lower) */}
          <motion.div 
            variants={walkInLeft}
            whileHover={{ scale: 1.05 }}
            className="w-[calc(50%-6px)] sm:w-[170px] max-w-[150px] sm:max-w-none bg-white/95 backdrop-blur-sm rounded-xl px-2.5 sm:px-4 lg:pl-4 lg:pr-8 py-5 text-center shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50 transition-all duration-300 cursor-pointer mt-10 sm:mt-10 lg:mt-0"
            style={{
              clipPath: "path('M5,5 L140,25 Q155,30 155,45 L155,230 Q155,245 140,245 L15,245 Q5,245 5,230 Z')",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)]">
              <Card1Icon className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-bold text-[#0a1240]">
              {d.card1Title}<br />
              <span className="text-[#2f56fb]">{d.card1Subtitle}</span>
            </h3>
            <div className="w-[18px] h-[2px] bg-[#2f56fb] opacity-40 mx-auto my-2" />
            <p className="text-[12px] text-[#3d4566] leading-snug w-full text-center">
              {d.card1Description}
            </p>
          </motion.div>

          {/* Card Left 2 (top pair - right, higher) */}
          <motion.div 
            variants={walkInLeft}
            whileHover={{ scale: 1.05 }}
            className="w-[calc(50%-6px)] sm:w-[170px] max-w-[150px] sm:max-w-none bg-white/95 backdrop-blur-sm rounded-xl px-2.5 sm:px-4 lg:pl-4 lg:pr-8 py-5 text-center shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50 transition-all duration-300 cursor-pointer mt-0 sm:mt-0 lg:mt-12"
            style={{
              clipPath: "path('M5,5 L140,25 Q155,30 155,45 L155,240 Q155,255 140,255 L15,255 Q5,255 5,240 Z')",
            }}
            transition={{ delay: 0.15 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_20px_-6px_rgba(99,102,241,0.4)]">
              <Card2Icon className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-bold text-[#0a1240]">
              {d.card2Title}<br />
              <span className="text-[#2f56fb]">{d.card2Subtitle}</span>
            </h3>
            <div className="w-[18px] h-[2px] bg-[#2f56fb] opacity-40 mx-auto my-2" />
            <p className="text-[12px] text-[#3d4566] leading-snug w-full text-center">
              {d.card2Description}
            </p>
          </motion.div>

          {/* Center Image */}
          <motion.div 
            variants={fadeInScale}
            className="relative w-[280px] h-[340px] ml-2 lg:-ml-2"
          >
            <div className="w-full h-full rounded-[140px_140px_16px_16px] overflow-hidden border-[5px] border-white shadow-[0_20px_45px_-15px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] cursor-pointer hover:scale-[1.02] transition-transform duration-300">
              <img
                src={d.centerImage}
                alt="Student studying"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Dashed Arc */}
            <svg className="absolute -top-[24px] lg:-top-8 left-1/2 -translate-x-1/2 w-[340px] h-[340px] pointer-events-none" viewBox="0 0 400 400">
              <path d="M 20 200 A 180 180 0 0 1 380 200" fill="none" stroke="#2f56fb" strokeWidth="2" strokeDasharray="6 8" opacity="0.3"/>
            </svg>
            {/* Endpoint Dots */}
            <div className="absolute top-[80px] lg:top-[72px] -left-5 w-4 h-4 rounded-full bg-white border-2 border-[#2f56fb] shadow-md" />
            <div className="absolute top-[80px] lg:top-[72px] -right-5 w-4 h-4 rounded-full bg-white border-2 border-[#2f56fb] shadow-md" />
          </motion.div>

          {/* Card Right 1 (bottom pair - left, lower) */}
          <motion.div 
            variants={walkInRight}
            whileHover={{ scale: 1.05 }}
            className="w-[calc(50%-6px)] sm:w-[170px] max-w-[150px] sm:max-w-none bg-white/95 backdrop-blur-sm sm:ml-2 rounded-xl px-2.5 sm:px-4 lg:pl-4 lg:pr-8 py-5 text-center shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50 transition-all duration-300 cursor-pointer mt-10 sm:mt-10 lg:mt-12"
            style={{
              clipPath: "path('M150,5 L15,25 Q0,30 0,45 L0,240 Q0,255 15,255 L140,255 Q150,255 150,240 Z')",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_20px_-6px_rgba(168,85,247,0.4)]">
              <Card3Icon className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-bold text-[#0a1240]">
              {d.card3Title}<br />
              <span className="text-[#2f56fb]">{d.card3Subtitle}</span>
            </h3>
            <div className="w-[18px] h-[2px] bg-[#2f56fb] opacity-40 mx-auto my-2" />
            <p className="text-[12px] text-[#3d4566] leading-snug w-full text-center">
              {d.card3Description}
            </p>
          </motion.div>

          {/* Card Right 2 (bottom pair - right, higher) */}
          <motion.div 
            variants={walkInRight}
            whileHover={{ scale: 1.05 }}
            className="w-[calc(50%-6px)] sm:w-[170px] max-w-[150px] sm:max-w-none bg-white/95 backdrop-blur-sm rounded-xl px-2.5 sm:px-4 lg:pl-4 lg:pr-8 py-5 text-center shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50 transition-all duration-300 cursor-pointer mt-0 sm:mt-0 lg:mt-0"
            style={{
              clipPath: "path('M150,5 L15,25 Q0,30 0,45 L0,230 Q0,245 15,245 L140,245 Q150,245 150,230 Z')",
            }}
            transition={{ delay: 0.15 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_20px_-6px_rgba(20,184,166,0.4)]">
              <Card4Icon className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-bold text-[#0a1240]">
              {d.card4Title}<br />
              <span className="text-[#2f56fb]">{d.card4Subtitle}</span>
            </h3>
            <div className="w-[18px] h-[2px] bg-[#2f56fb] opacity-40 mx-auto my-2" />
            <p className="text-[12px] text-[#3d4566] leading-snug w-full text-center">
              {d.card4Description}
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          variants={fadeInUp}
          className="flex items-center justify-center"
        >
          <motion.a
            href={d.buttonLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] transition-all duration-300 cursor-pointer"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3zm0 12L4 11.18V15c0 2.21 3.58 4 8 4s8-1.79 8-4v-3.82L12 15z"/>
              </svg>
            </span>
            {d.buttonText}
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}