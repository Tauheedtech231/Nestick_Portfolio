/* eslint-disable react/no-unescaped-entities */
'use client';

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

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
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

interface AboutStatsData {
  badgeText: string;
  headingFirst: string;
  headingHighlight: string;
  headingLast: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  desktopImage: string;
  mobileImage: string;
  quoteText: string;
}

export default function AboutSection() {
  const [data, setData] = useState<AboutStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded college ID for testing
  const collegeId = "8";
  const SESSION_KEY = `about_stats_${collegeId}`;

  // Get default data
  const getDefaultData = (): AboutStatsData => ({
    badgeText: 'About Our Institution',
    headingFirst: 'Our',
    headingHighlight: 'Mission.',
    headingLast: 'Our Vision.',
    description: 'Discover the driving force behind our institution\'s commitment to excellence, innovation, and student success in a rapidly evolving world. We believe in nurturing talent, fostering creativity, and building a community where every individual can thrive and make a meaningful impact on society.',
    buttonText: 'Explore Our Story',
    buttonLink: '/About',
    desktopImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    mobileImage: '',
    quoteText: 'Education is the foundation of every great achievement.'
  });

  // ✅ Fetch data with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (synchronous)
    const cachedData = sessionStorage.getItem(SESSION_KEY);
    
    if (cachedData) {
      try {
        console.log('📦 [AboutSection] Loading from session storage (instant)');
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
        console.log('🔄 [AboutSection] Fetching data for college:', collegeId);
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=AboutStats`);
        const result = await response.json();
        console.log('📦 [AboutSection] API Response:', result);

        let fetchedData;
        if (result.success && result.content) {
          console.log('✅ [AboutSection] Data loaded');
          fetchedData = result.content;
        } else {
          console.log('⚠️ [AboutSection] No data, using fallback');
          fetchedData = getDefaultData();
        }

        // ✅ Save to session storage
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        setData(fetchedData);
      } catch (error) {
        console.error('❌ [AboutSection] Error:', error);
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
      <section className="relative bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8edf8] overflow-x-hidden min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  const d = data || getDefaultData();

  return (
    <section className="relative bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8edf8] overflow-x-hidden">
      {/* Deep blue decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:px-16 lg:py-8">
        {/* decorative dot grid, top right */}
        <motion.div
          className="absolute right-16 top-8 hidden h-[60px] w-[90px] opacity-70 lg:block"
          style={{
            backgroundImage: "radial-gradient(circle, #2f56fb 1.4px, transparent 1.6px)",
            backgroundSize: "12px 12px",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* LEFT COLUMN */}
        <motion.div 
          className="lg:ml-8 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-[16px] py-[7px] text-[12px] font-semibold text-[#1c3fe0] cursor-pointer hover:bg-[#c8d2ed] transition-colors shadow-sm"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
            </svg>
            {d.badgeText}
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="mb-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-[#0a1240] sm:text-4xl"
          >
            {d.headingFirst} <span className="text-[#2f56fb]">{d.headingHighlight}</span>
            <br />
            {d.headingLast}
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="mb-6 max-w-[500px] text-[15px] leading-[1.8] text-[#3d4566]"
          >
            {d.description}
          </motion.p>

          <motion.a
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={d.buttonLink}
            className="mb-12 inline-flex items-center gap-3.5 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] py-[14px] pl-6 pr-[10px] text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] transition-all duration-300 cursor-pointer"
          >
            {d.buttonText}
            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth={2.4}
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </motion.a>
        </motion.div>

        {/* RIGHT COLUMN - image with blob shape */}
        <motion.div 
          className="relative flex min-h-[340px] items-center justify-center overflow-hidden lg:min-h-[500px] lg:overflow-visible"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInRight}
        >
          <motion.div
            className="absolute left-1/2 top-0 origin-top -translate-x-1/2 scale-[0.6] lg:static lg:h-[500px] lg:w-[500px] lg:translate-x-0 lg:scale-100"
            style={{ width: 500, height: 500 }}
            variants={fadeInScale}
          >
            {/* blue accent shape behind the photo */}
            <motion.div
              className="absolute left-[56px] top-[56px] h-[440px] w-[440px] bg-gradient-to-br from-[#1a3fd6] to-[#0f2996] opacity-90"
              style={{ borderRadius: "49% 51% 54% 46% / 57% 44% 56% 43%" }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 0.9, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />

            {/* white-bordered blob frame with image */}
            <motion.div
              className="absolute left-5 top-5 h-[440px] w-[440px] bg-white p-3.5 shadow-[0_30px_60px_-20px_rgba(15,30,80,0.3)] transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
              style={{ borderRadius: "49% 51% 54% 46% / 57% 44% 56% 43%" }}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="relative h-full w-full overflow-hidden"
                style={{ borderRadius: "49% 51% 54% 46% / 57% 44% 56% 43%" }}
              >
                {/* ✅ Dynamic image - desktop or fallback */}
                <img
                  src={d.desktopImage || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=749&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                  alt="University campus with students"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            {/* graduation cap badge */}
            <motion.div 
              className="absolute left-[50px] top-[50px] z-10 flex h-[74px] w-[74px] items-center justify-center rounded-full border-[5px] border-white bg-gradient-to-br from-[#1a3fd6] to-[#0f2996] shadow-[0_15px_30px_-8px_rgba(47,86,251,0.5)] cursor-pointer hover:scale-105 transition-transform duration-200"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 3L1 9l11 6 9-4.9V17h2V9L12 3zM5 13.18v3.02c0 1.9 3.13 3.8 7 3.8s7-1.9 7-3.8v-3.02L12 17l-7-3.82z" />
              </svg>
            </motion.div>

            {/* gold ring accent */}
            <motion.div 
              className="absolute right-9 top-[76px] z-10 h-10 w-10 rounded-full border-[3px] border-[#f0b93d] cursor-pointer hover:scale-110 transition-transform duration-200 shadow-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />

            {/* ✅ Dynamic quote card */}
            <motion.div 
              className="absolute bottom-[70px] right-1.5 z-10 w-[220px] rounded-2xl bg-white/95 backdrop-blur-sm px-[20px] pb-[16px] pt-[20px] shadow-[0_25px_50px_-15px_rgba(15,30,80,0.35)] cursor-pointer hover:shadow-[0_35px_65px_-20px_rgba(15,30,80,0.5)] transition-shadow duration-300 border border-white/50"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="mb-1 font-serif text-[32px] font-extrabold leading-none text-[#2f56fb]">
                &ldquo;
              </div>
              <p className="mb-3 text-[13px] font-semibold leading-snug text-[#0e1642]">
                {d.quoteText}
              </p>
              <div className="h-[3px] w-[24px] rounded-full bg-[#2f56fb]" />
            </motion.div>

            {/* dotted trail */}
            <motion.svg
              className="absolute bottom-[45px] right-[95px] z-0 w-[70px]"
              viewBox="0 0 70 40"
              fill="none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <path
                d="M2 5 Q30 5 40 30"
                stroke="#2f56fb"
                strokeWidth={2}
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}