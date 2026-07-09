/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion, Variants } from 'framer-motion';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export default function HeroSection({ onContactClick }: HeroSectionProps) {
  // Colors - Blue + Teal Theme
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

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact-section');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onContactClick) {
      onContactClick();
    }
  };

  return (
    <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
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
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-extrabold mb-3 text-white"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
          >
            About Aspire College
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-[15px] sm:text-[15px] text-white max-w-3xl mx-auto leading-[1.8] mb-6"
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
          >
            Shaping futures through excellence in education, innovation, and character building since 1985
          </motion.p>

          {/* Contact Button */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              onClick={scrollToContact}
              className="px-8 py-3.5 rounded-full font-semibold text-[14px] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
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
    </section>
  );
}