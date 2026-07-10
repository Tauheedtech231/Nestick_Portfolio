/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import VisionMissionSection from './VisionMissionSection';
import ContactSection from './ContactSection';
import HistorySection from './HistorySection';
import HeroSection from './HeroSection';
import AffiliationsSection from './AffiliationsSection';

export default function AboutUs() {
  // Refs for sections
  const historyRef = useRef<HTMLDivElement | null>(null);

  // Check if sections are in view
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

  return (
    <div id="about" className="min-h-screen bg-white transition-colors duration-300 overflow-hidden pt-[40px] ">
      {/* Hero Section - Independent Component */}
      <HeroSection />

      {/* History & Legacy Section */}
      <HistorySection />

      {/* Vision & Mission Section - Independent Component */}
      <VisionMissionSection />
      <AffiliationsSection/>

      {/* Contact Section - Independent Component */}
      <div id="contact-section">
        <ContactSection />
      </div>
    </div>
  );
}