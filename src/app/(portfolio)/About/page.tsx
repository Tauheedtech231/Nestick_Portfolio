/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion';

export default function AboutUs() {
  // Refs for sections
  const heroRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);
  const visionRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const historyInView = useInView(historyRef, { once: true, amount: 0.3 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const formInView = useInView(formRef, { once: true, amount: 0.3 });

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
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="about" className="min-h-screen bg-white transition-colors duration-300 overflow-hidden pt-[85px] sm:pt-[93px]">
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

      {/* Vision & Mission Section */}
      <motion.section 
        ref={visionRef}
        initial="hidden"
        animate={visionInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-3">
              Our Guiding Principles
            </h2>
            <p className="text-base text-[#475569] max-w-2xl mx-auto">
              Driving excellence through visionary leadership and purposeful mission
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Vision Card - Blue */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ 
                y: -6,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="relative z-10">
                <motion.div 
                  className="flex items-center mb-4"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#1E293B]">Our Vision</h3>
                </motion.div>
                <p className="text-[#475569] text-base leading-relaxed">
                  To be a globally recognized institution that empowers students to become innovative leaders, 
                  critical thinkers, and responsible citizens who drive positive change in an interconnected world.
                </p>
              </div>
            </motion.div>

            {/* Mission Card - Teal */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ 
                y: -6,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative bg-gradient-to-br from-[#E6F7F5] to-[#CCF2EE] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="relative z-10">
                <motion.div 
                  className="flex items-center mb-4"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg className="w-6 h-6 text-[#0D9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#1E293B]">Our Mission</h3>
                </motion.div>
                <p className="text-[#475569] text-base leading-relaxed">
                  To provide transformative education through innovative curricula, world-class faculty, 
                  and state-of-the-art facilities that foster intellectual growth, ethical values, and 
                  lifelong learning skills essential for success in the 21st century.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Full Width Form - Clean White */}
      <motion.section 
        ref={formRef}
        initial="hidden"
        animate={formInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="w-full bg-white scroll-mt-[95px]"
      >
        <motion.div 
          variants={fadeInUp}
          className="w-full px-0"
        >
          <div className="w-full py-16 px-6 md:px-8 lg:px-10 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] mb-3">
                  Get in Touch
                </h2>
                <p className="text-base text-[#475569] max-w-2xl mx-auto">
                  Have questions? We'd love to hear from you. Reach out to us anytime.
                </p>
              </div>

              <div className="bg-[#F8FAFC] rounded-2xl shadow-lg p-6 md:p-8">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-1">Message</label>
                    <textarea 
                      rows={4}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 resize-none text-[#1E293B] cursor-pointer"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #0D9488 0%, #2563EB 100%)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    Send Message
                  </motion.button>
                </form>

                {/* Contact Info - Below Form */}
                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="cursor-pointer">
                    <svg className="w-5 h-5 text-[#0D9488] mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm text-[#475569] font-medium">Address</p>
                    <p className="text-xs text-[#64748B]">123 Education Street, City</p>
                  </div>
                  <div className="cursor-pointer">
                    <svg className="w-5 h-5 text-[#0D9488] mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-sm text-[#475569] font-medium">Phone</p>
                    <p className="text-xs text-[#64748B]">+92 300 1234567</p>
                  </div>
                  <div className="cursor-pointer">
                    <svg className="w-5 h-5 text-[#0D9488] mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-[#475569] font-medium">Email</p>
                    <p className="text-xs text-[#64748B]">info@aspirecollege.edu.pk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}