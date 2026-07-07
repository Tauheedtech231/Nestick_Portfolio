/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion';
import VisionMissionSection from './VisionMissionSection';
import ContactSection from './ContactSection';

export default function AboutUs() {
  // Refs for sections
  const heroRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const historyInView = useInView(historyRef, { once: true, amount: 0.3 });

  // Colors - Blue + Teal Theme
  const BLUE_600 = '#2563EB';
  const TEAL_600 = '#0D9488';

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

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Scroll to contact form
  const scrollToContact = () => {
    const contactElement = document.getElementById('contact-section');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="about" className="min-h-screen bg-white transition-colors duration-300 overflow-hidden pt-[85px] sm:pt-[95px]">
      {/* Hero Section - Clean Image with Text Overlay Only */}
      <motion.section 
        ref={heroRef}
        className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image - No Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80"
            alt="Aspire College Campus"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content with minimal text shadow for readability */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-white"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
            >
              About Aspire College
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-base sm:text-lg text-white max-w-3xl mx-auto leading-relaxed mb-6"
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
            >
              Shaping futures through excellence in education, innovation, and character building since 1985
            </motion.p>

            {/* Contact Button */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={scrollToContact}
                className="px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
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
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* History & Legacy Section */}
      <motion.section 
        ref={historyRef}
        initial="hidden"
        animate={historyInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-16 bg-[#F8FAFC]"
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div variants={fadeInUp}>
              <motion.div 
                className="flex items-center mb-6"
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center mr-4 shadow-md cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">History & Legacy</h2>
              </motion.div>
              
              <motion.p 
                variants={fadeInUp}
                className="text-[#475569] mb-4 text-base leading-relaxed"
              >
                Established in 1985, Aspire College has been at the forefront of educational excellence for nearly four decades. 
                What began as a small institution with just 200 students has grown into a premier educational hub serving over 10,000 students annually.
              </motion.p>
              
              <motion.p 
                variants={fadeInUp}
                className="text-[#475569] mb-6 text-base leading-relaxed"
              >
                Our legacy is built on a foundation of academic rigor, innovative teaching methodologies, and a commitment to 
                developing well-rounded individuals who contribute meaningfully to society.
              </motion.p>

              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4"
              >
                <motion.div
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="text-center p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 cursor-pointer"
                  style={{ borderColor: BLUE_600 }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: BLUE_600 }}>
                    35+
                  </div>
                  <div className="text-sm text-[#475569] font-medium">
                    Years of Excellence
                  </div>
                </motion.div>
                <motion.div
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="text-center p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 cursor-pointer"
                  style={{ borderColor: TEAL_600 }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: TEAL_600 }}>
                    50k+
                  </div>
                  <div className="text-sm text-[#475569] font-medium">
                    Alumni Worldwide
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
              >
                <img 
                  src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
                  alt="Aspire College Campus" 
                  className="w-full h-80 lg:h-[400px] object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md cursor-pointer"
                >
                  <h3 className="font-bold text-[#1E293B] text-base mb-1">Prestigious Heritage</h3>
                  <p className="text-[#475569] text-sm">
                    Our campus blends historic architecture with modern facilities
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission Section - Independent Component */}
      <VisionMissionSection />

      {/* Contact Section - Independent Component */}
      <div id="contact-section">
        <ContactSection />
      </div>
    </div>
  );
}