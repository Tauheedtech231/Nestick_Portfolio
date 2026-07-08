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

export default function AdmissionsSection() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Scroll handler for scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoplay video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Colors - Blue + Teal Theme
  const BLUE_600 = '#2563EB';
  const TEAL_600 = '#0D9488';

  // Steps for horizontal indicator
  const steps = [
    { number: 1, label: 'Register' },
    { number: 2, label: 'Apply' },
    { number: 3, label: 'Documents' },
    { number: 4, label: 'Pay Fee' },
    { number: 5, label: 'Track' },
    { number: 6, label: 'Admission' }
  ];

  return (
    <section className="min-h-screen bg-white transition-colors duration-300 relative pt-[40px] ">
      
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 text-white p-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
            style={{ 
              backgroundColor: BLUE_600,
              boxShadow: `0 8px 30px ${BLUE_600}40`
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

      {/* Hero Section with Video - Full Width */}
      <div className="relative w-full overflow-hidden">
        {/* Video Background - Full Width */}
        <div className="relative w-full h-[340px] sm:h-[420px] lg:h-[500px] overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            autoPlay
            poster="/ad-poster.jpg"
          >
            <source src="/ad.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
          
          {/* Hero Content - Overlay on Video */}
          <motion.div 
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
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
              <span className="text-white">Admission </span>
              <span style={{ color: '#0D9488' }}>Guidance</span>
            </motion.h1>
            <motion.p 
              className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your complete guide to joining Aspire College. Follow our streamlined process for a smooth admission experience.
            </motion.p>

            {/* Buttons - Larger Size */}
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
                    backgroundColor: TEAL_600,
                    color: '#FFFFFF',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0F766E';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = TEAL_600;
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

            {/* Horizontal Steps Indicator - Part of Hero with 2rem gap */}
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
                      {/* Step Circle */}
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-[9px] sm:text-xs transition-all duration-300"
                          style={{
                            backgroundColor: index === 0 ? TEAL_600 : 'rgba(255,255,255,0.2)',
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
                      
                      {/* Line between steps */}
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-[1.5px] mx-1 sm:mx-2" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                          <div 
                            className="h-full transition-all duration-500"
                            style={{ 
                              width: index === 0 ? '100%' : '0%',
                              backgroundColor: TEAL_600
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
        {/* Admission Process Section - Fully Independent Component */}
        <AdmissionProcess />

        {/* FAQ Section - Fully Independent Component */}
        <FAQSection />
        <MyApplicationsPage/>
      </div>

    </section>
  );
}