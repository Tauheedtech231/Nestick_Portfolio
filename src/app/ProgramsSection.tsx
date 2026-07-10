/* eslint-disable react/no-unescaped-entities */

'use client';

import { BookOpen, Users, Target, Award } from "lucide-react";
import { motion, Variants } from 'framer-motion';

// Animation variants - Same as HeroSection
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

const walkInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const walkInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
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

export default function ProgramsSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8edf8] overflow-x-hidden py-16 px-4">
      {/* Deep shadow decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="relative max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {/* Top Eyebrow */}
        <motion.div 
          variants={fadeInUp}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="relative w-[80px] h-[2px] border-t-2 border-dashed border-[#2f56fb] opacity-40">
            <span className="absolute -top-[5px] left-0 w-[6px] h-[6px] rounded-full bg-[#2f56fb]" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[12px] font-semibold text-[#1c3fe0] shadow-sm cursor-pointer hover:bg-[#c8d2ed] transition-colors">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2f56fb] text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                <path d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3zm0 12L4 11.18V15c0 2.21 3.58 4 8 4s8-1.79 8-4v-3.82L12 15z"/>
              </svg>
            </span>
            ACADEMIC EXCELLENCE
          </div>
          <div className="relative w-[80px] h-[2px] border-t-2 border-dashed border-[#2f56fb] opacity-40">
            <span className="absolute -top-[5px] right-0 w-[6px] h-[6px] rounded-full bg-[#2f56fb]" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          variants={fadeInUp}
          className="text-3xl sm:text-4xl font-extrabold text-center text-[#0a1240] leading-[1.08]"
        >
          Comprehensive<br />
          <span className="text-[#2f56fb]">Programs</span>
        </motion.h1>

        {/* Divider */}
        <motion.div 
          variants={fadeInUp}
          className="flex items-center justify-center gap-3 my-4"
        >
          <div className="w-[50px] h-[2px] bg-[#2f56fb] opacity-40" />
          <div className="w-2 h-2 bg-[#2f56fb] rotate-45" />
          <div className="w-[50px] h-[2px] bg-[#2f56fb] opacity-40" />
        </motion.div>

        {/* Subtext */}
        <motion.p 
          variants={fadeInUp}
          className="max-w-[560px] mx-auto text-center text-[15px] leading-[1.7] text-[#3d4566] mb-12"
        >
          Choose from a diverse range of undergraduate and graduate programs designed to equip you with the skills needed for tomorrow's challenges.
        </motion.p>

        {/* Feature Row - Cards with HTML shape */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 lg:gap-4">
          {/* Card Left 1 - Walking from left */}
          <motion.div 
            variants={walkInLeft}
            whileHover={{ scale: 1.05 }}
            className="w-[170px] bg-white/95 backdrop-blur-sm rounded-xl px-4 py-5 text-center shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50 transition-all duration-300 cursor-pointer"
            style={{
              clipPath: "path('M5,5 L140,25 Q155,30 155,45 L155,230 Q155,245 140,245 L15,245 Q5,245 5,230 Z')",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)]">
              <BookOpen className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-bold text-[#0a1240]">
              Diverse<br />
              <span className="text-[#2f56fb]">Programs</span>
            </h3>
            <div className="w-[18px] h-[2px] bg-[#2f56fb] opacity-40 mx-auto my-2" />
            <p className="text-[12px] text-[#3d4566] leading-snug w-full text-left">
              Wide range of undergraduate and graduate programs.
            </p>
          </motion.div>

          {/* Card Left 2 - Walking from left with delay */}
          <motion.div 
            variants={walkInLeft}
            whileHover={{ scale: 1.05 }}
            className="w-[170px] bg-white/95 backdrop-blur-sm rounded-xl px-4 py-5 text-center shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50 transition-all duration-300 cursor-pointer lg:mt-12"
            style={{
              clipPath: "path('M5,5 L140,25 Q155,30 155,45 L155,240 Q155,255 140,255 L15,255 Q5,255 5,240 Z')",
            }}
            transition={{ delay: 0.15 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_20px_-6px_rgba(99,102,241,0.4)]">
              <Target className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-bold text-[#0a1240]">
              Industry<br />
              <span className="text-[#2f56fb]">Relevant</span>
            </h3>
            <div className="w-[18px] h-[2px] bg-[#2f56fb] opacity-40 mx-auto my-2" />
            <p className="text-[12px] text-[#3d4566] leading-snug w-full text-left">
              Curriculum designed to meet real-world industry needs.
            </p>
          </motion.div>

          {/* Center Image - Scale and fade */}
          <motion.div 
            variants={fadeInScale}
            className="relative w-[280px] h-[340px] ml-2 lg:-ml-2"
          >
            <div className="w-full h-full rounded-[140px_140px_16px_16px] overflow-hidden border-[5px] border-white shadow-[0_20px_45px_-15px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] cursor-pointer hover:scale-[1.02] transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?auto=format&fit=crop&w=700&q=80"
                alt="Student studying"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Dashed Arc */}
            <svg className="absolute -top-8 left-1/2 -translate-x-1/2 w-[340px] h-[340px] pointer-events-none" viewBox="0 0 400 400">
              <path d="M 20 200 A 180 180 0 0 1 380 200" fill="none" stroke="#2f56fb" strokeWidth="2" strokeDasharray="6 8" opacity="0.3"/>
            </svg>
            {/* Endpoint Dots */}
            <div className="absolute top-[72px] -left-5 w-4 h-4 rounded-full bg-white border-2 border-[#2f56fb] shadow-md" />
            <div className="absolute top-[72px] -right-5 w-4 h-4 rounded-full bg-white border-2 border-[#2f56fb] shadow-md" />
          </motion.div>

          {/* Card Right 1 - Walking from right, corner cut mirrored to top-right */}
          <motion.div 
            variants={walkInRight}
            whileHover={{ scale: 1.05 }}
            className="w-[170px] bg-white/95 backdrop-blur-sm ml-2 rounded-xl px-4 py-5 text-center shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50 transition-all duration-300 cursor-pointer"
            style={{
              clipPath: "path('M150,5 L15,25 Q0,30 0,45 L0,240 Q0,255 15,255 L140,255 Q150,255 150,240 Z')",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_20px_-6px_rgba(168,85,247,0.4)]">
              <Users className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-bold text-[#0a1240]">
              Expert<br />
              <span className="text-[#2f56fb]">Faculty</span>
            </h3>
            <div className="w-[18px] h-[2px] bg-[#2f56fb] opacity-40 mx-auto my-2" />
            <p className="text-[12px] text-[#3d4566] leading-snug w-full text-left">
              Learn from experienced educators and industry leaders.
            </p>
          </motion.div>

          {/* Card Right 2 - Walking from right with delay, corner cut mirrored to top-right */}
          <motion.div 
            variants={walkInRight}
            whileHover={{ scale: 1.05 }}
            className="w-[170px] bg-white/95 backdrop-blur-sm rounded-xl px-4 py-5 text-center shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50 transition-all duration-300 cursor-pointer lg:mt-12"
            style={{
              clipPath: "path('M150,5 L15,25 Q0,30 0,45 L0,230 Q0,245 15,245 L140,245 Q150,245 150,230 Z')",
            }}
            transition={{ delay: 0.15 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-3 shadow-[0_8px_20px_-6px_rgba(20,184,166,0.4)]">
              <Award className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-bold text-[#0a1240]">
              Career<br />
              <span className="text-[#2f56fb]">Focused</span>
            </h3>
            <div className="w-[18px] h-[2px] bg-[#2f56fb] opacity-40 mx-auto my-2" />
            <p className="text-[12px] text-[#3d4566] leading-snug w-full text-left">
              Build skills for a successful and impactful career.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          variants={fadeInUp}
          className="flex items-center justify-center"
        >
          <motion.a
            href="/Programms"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] transition-all duration-300 cursor-pointer"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3zm0 12L4 11.18V15c0 2.21 3.58 4 8 4s8-1.79 8-4v-3.82L12 15z"/>
              </svg>
            </span>
            Browse Programs
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}