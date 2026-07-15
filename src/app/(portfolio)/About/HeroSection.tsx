/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from "react";

interface HeroSectionProps {
  onContactClick?: () => void;
  collegeId?: string;
}

interface AboutData {
  heroTitle: string;
  heroSubtitle: string;
  heroDesktopImage: string;
  heroMobileImage: string;
}

export default function HeroSection({ onContactClick, collegeId = "8" }: HeroSectionProps) {
  // ✅ Consistent brand colors - EXACTLY same as Navbar
  const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color (same as Navbar)
  const PRIMARY_DARK = '#1530b0'; // Darker blue for hover (same as Navbar)
  const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights
  
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState<AboutData>({
    heroTitle: 'About Nestick College',
    heroSubtitle: 'Shaping futures through excellence in education, innovation, and character building since 1985',
    heroDesktopImage: '',
    heroMobileImage: ''
  });
  const [loading, setLoading] = useState(true);

  // ✅ Session storage key
  const SESSION_KEY = `hero_about_${collegeId}`;

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
          console.log('📦 [HeroSection] Loading from session storage (instant)');
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
        console.log('🔄 [HeroSection] Fetching data for college:', collegeId);
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=About`);
        const result = await response.json();
        console.log('📦 [HeroSection] API Response:', result);

        let fetchedData;
        if (result.success && result.content) {
          const content = result.content;
          fetchedData = {
            heroTitle: content.heroTitle || 'About Nestick College',
            heroSubtitle: content.heroSubtitle || 'Shaping futures through excellence in education, innovation, and character building since 1985',
            heroDesktopImage: content.heroDesktopImage || content.heroImage || '',
            heroMobileImage: content.heroMobileImage || content.mobileImage || ''
          };
          console.log('✅ [HeroSection] Data loaded successfully');
          console.log('🖼️ [HeroSection] Desktop Image:', fetchedData.heroDesktopImage);
          console.log('📱 [HeroSection] Mobile Image:', fetchedData.heroMobileImage);
        } else {
          console.log('⚠️ [HeroSection] No data, using default');
          fetchedData = {
            heroTitle: 'About Nestick College',
            heroSubtitle: 'Shaping futures through excellence in education, innovation, and character building since 1985',
            heroDesktopImage: '',
            heroMobileImage: ''
          };
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        }
        setData(fetchedData);
      } catch (error) {
        console.error('❌ [HeroSection] Error fetching:', error);
        // ✅ Don't cache on error
        setData({
          heroTitle: 'About Nestick College',
          heroSubtitle: 'Shaping futures through excellence in education, innovation, and character building since 1985',
          heroDesktopImage: '',
          heroMobileImage: ''
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [collegeId, SESSION_KEY]);

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

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact-section');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onContactClick) {
      onContactClick();
    }
  };

  // ✅ Get appropriate image based on device
  const getImageUrl = () => {
    console.log('📸 [HeroSection] isMobile:', isMobile);
    console.log('📸 [HeroSection] heroDesktopImage:', data.heroDesktopImage);
    console.log('📸 [HeroSection] heroMobileImage:', data.heroMobileImage);
    
    if (isMobile) {
      return data.heroMobileImage || "https://plus.unsplash.com/premium_photo-1691962725086-d1590e379139?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D";
    }
    return data.heroDesktopImage || "https://images.unsplash.com/photo-1641160616553-a9d21a846e49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  };

  // ✅ Show loading only on first visit (no cache) - with window check
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2f56fb] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  // ✅ Increased subtitle (Slight increase as requested)
  const displaySubtitle = data.heroSubtitle + 
    ' We are committed to nurturing talent, fostering creativity, and building a community where every individual can thrive and make a meaningful impact on society.';

  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image - Dynamic based on device */}
      <div className="absolute inset-0 z-0">
        <img 
          src={getImageUrl()}
          alt="College Campus"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-extrabold mb-3 text-white"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
          >
            {data.heroTitle}
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-[15px] sm:text-[15px] text-white max-w-3xl mx-auto leading-[1.8] mb-6"
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
          >
            {displaySubtitle}
          </motion.p>

          {/* Contact Button - Same as Navbar "Apply Now" button */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              Contact Us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}