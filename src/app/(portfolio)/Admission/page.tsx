'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowUpIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import FAQSection from './FAQSection';
import AdmissionProcess from './AdmissionProcess';
import MyApplicationsPage from './ApplicationForm';

interface AdmissionsData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
}

export default function AdmissionsSection() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [data, setData] = useState<AdmissionsData>({
    heroTitle: 'Admission Guidance',
    heroSubtitle: 'Your complete guide to joining Nestick College. Follow our streamlined process for a smooth admission experience.',
    heroImage: ''
  });
  const [loading, setLoading] = useState(true);

  // ✅ Session storage key
  const SESSION_KEY = 'admissions_section_8';

  // Scroll handler for scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Fetch data from API with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [AdmissionsSection] Loading from session storage (instant)');
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
        console.log('🔄 [AdmissionsSection] Fetching data...');
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=8&section_name=Admission`);
        const result = await response.json();
        console.log('📦 [AdmissionsSection] API Response:', result);

        let fetchedData;
        if (result.success && result.content) {
          const content = result.content;
          fetchedData = {
            heroTitle: content.heroTitle || 'Admission Guidance',
            heroSubtitle: content.heroSubtitle || 'Your complete guide to joining Nestick College. Follow our streamlined process for a smooth admission experience.',
            heroImage: content.heroImage || ''
          };
          console.log('✅ [AdmissionsSection] Data loaded');
        } else {
          console.log('⚠️ [AdmissionsSection] No data, using default');
          fetchedData = {
            heroTitle: 'Admission Guidance',
            heroSubtitle: 'Your complete guide to joining Nestick College. Follow our streamlined process for a smooth admission experience.',
            heroImage: ''
          };
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        }
        setData(fetchedData);
      } catch (error) {
        console.error('❌ [AdmissionsSection] Error:', error);
        // ✅ Don't cache on error
        setData({
          heroTitle: 'Admission Guidance',
          heroSubtitle: 'Your complete guide to joining Nestick College. Follow our streamlined process for a smooth admission experience.',
          heroImage: ''
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ Consistent brand colors - EXACTLY same as Navbar
  const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color (same as Navbar)
  const PRIMARY_DARK = '#1530b0'; // Darker blue for hover (same as Navbar)
  const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights

  // Steps for horizontal indicator - Hardcoded
  const steps = [
    { number: 1, label: 'Register' },
    { number: 2, label: 'Apply' },
    { number: 3, label: 'Documents' },
    { number: 4, label: 'Pay Fee' },
    { number: 5, label: 'Track' },
    { number: 6, label: 'Admission' }
  ];

  // ✅ Show loading only on first visit (no cache)
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <section className="min-h-screen bg-white transition-colors duration-300 relative pt-[40px] sm:pt-[80px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading admission guidance...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white transition-colors duration-300 relative pt-[40px] sm:pt-[80px]"> 
      
      {/* Scroll to Top Button - Using PRIMARY_COLOR */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 text-white p-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
            style={{ 
              backgroundColor: PRIMARY_COLOR,
              boxShadow: `0 8px 30px ${PRIMARY_COLOR}40`
            }}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpIcon className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section with Image */}
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[500px] overflow-hidden">
          <img 
            src={data.heroImage || "https://plus.unsplash.com/premium_photo-1733317282227-19fa01b5c964?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Admission Guidance"
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
          
          {/* Hero Content */}
          <motion.div 
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center mt-30 sm:mt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">{data.heroTitle}</span>
            </motion.h1>
            <motion.p 
              className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {data.heroSubtitle}
            </motion.p>

            {/* Buttons - Using PRIMARY_COLOR for both */}
            <motion.div 
              className="flex flex-wrap gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/Programms">
                <button 
                  className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK})`,
                    color: '#FFFFFF',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Our Programs
                </button>
              </Link>
              
              <Link href="/Contact">
                <button 
                  className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '2px solid #FFFFFF',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#101820';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  Contact Us
                </button>
              </Link>
            </motion.div>

            {/* Horizontal Steps Indicator - Using PRIMARY_COLOR */}
            <motion.div 
              className="w-full max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 border border-white/20">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[9px] sm:text-xs transition-all duration-300"
                          style={{
                            backgroundColor: index === 0 ? PRIMARY_COLOR : 'rgba(255,255,255,0.2)',
                            color: index === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                            border: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.3)'
                          }}
                        >
                          {step.number}
                        </div>
                        <span className="text-[8px] sm:text-[10px] font-medium text-white/80 mt-0.5 whitespace-nowrap">
                          {step.label}
                        </span>
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-[1.5px] mx-1 sm:mx-2" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                          <div 
                            className="h-full transition-all duration-500"
                            style={{ 
                              width: index === 0 ? '100%' : '0%',
                              backgroundColor: PRIMARY_COLOR
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admission Process Component */}
        <AdmissionProcess />

        {/* My Applications Page */}
        <MyApplicationsPage />
        
        {/* FAQ Section */}
        <FAQSection />
      </div>

    </section>
  );
}