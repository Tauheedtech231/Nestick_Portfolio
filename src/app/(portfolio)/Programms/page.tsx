// app/programs/page.tsx (Main Page)
'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import ProgramsList from './ProgramsList';
import CoursesTab from './CoursesTab';

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

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.6,
    }
  }
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 pt-[40px] sm:pt-[80px]">
      {/* Hero Section - Same height as About page: h-[60vh] min-h-[500px] */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://plus.unsplash.com/premium_photo-1691962725001-8e9157a933cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Programs Hero"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 text-white drop-shadow-lg"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            <span className="text-white">Our </span>
            <span style={{ color: '#5DCAA5' }}>Programs</span>
          </motion.h1>

          <motion.p 
            variants={subHeadingVariants}
            initial="hidden"
            animate="visible"
            className="text-[15px] sm:text-[18px] lg:text-[20px] text-white drop-shadow-lg max-w-2xl mx-auto leading-[1.8]"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            Discover your path to success with our diverse range of programs
          </motion.p>

          {/* Apply Now Button */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8"
          >
            <Link
              href="/Admission"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-8 py-4 text-[16px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] transition-all duration-300 cursor-pointer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 3L1 8l11 5 9-4.09V17h2V8L12 3z" />
                <path d="M4 11.18V15c0 2.21 3.58 4 8 4s8-1.79 8-4v-3.82" />
              </svg>
              Apply Now
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Programs List Component */}
      <ProgramsList />
      <CoursesTab />
    </div>
  );
}