// app/programs/page.tsx (Main Page)
'use client';

import { motion, Variants } from 'framer-motion';
import ProgramsList from './ProgramsList';

// Animation variants
const headingVariants: Variants = {
  hidden: { opacity: 0, x: -200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.2,
    }
  }
};

const subHeadingVariants: Variants = {
  hidden: { opacity: 0, x: -180 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.4,
    }
  }
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 pt-[40px]">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Programs Hero"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white drop-shadow-lg"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            <span className="text-white">Our </span>
            <span style={{ color: '#5DCAA5' }}>Programs</span>
          </motion.h1>

          <motion.p 
            variants={subHeadingVariants}
            initial="hidden"
            animate="visible"
            className="text-[15px] sm:text-[15px] text-white drop-shadow-lg max-w-2xl mx-auto leading-[1.8]"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            Discover your path to success with our diverse range of programs
          </motion.p>
        </div>
      </section>

      {/* Programs List Component */}
      <ProgramsList />
    </div>
  );
}