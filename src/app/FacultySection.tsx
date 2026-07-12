'use client';

import { Users, Award, Lightbulb, Sparkles } from "lucide-react";
import { motion, Variants } from 'framer-motion';

// Animation variants
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

export default function FacultySection() {
  return (
    <section className="relative bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8edf8] overflow-x-hidden py-16 px-0 flex items-center justify-center">
      {/* Deep shadow decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="relative w-full max-w-full overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center p-8 sm:p-10 lg:p-14 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        
        {/* Decorative Shapes */}
        <div className="absolute -top-10 -left-14 w-[180px] h-[180px] bg-gradient-to-br from-[#2f56fb]/20 to-[#1530b0]/20 rounded-[0_0_100px_0] pointer-events-none" />
        <div className="absolute -bottom-14 -right-14 w-[180px] h-[180px] bg-gradient-to-br from-[#2f56fb]/20 to-[#1530b0]/20 rounded-[120px_0_0_0] pointer-events-none" />
        
        {/* Dots Top Right */}
        <div className="absolute top-6 left-6 grid grid-cols-4 gap-1.5 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/60" />
          ))}
        </div>

        {/* Bottom Dots */}
        <div className="absolute bottom-6 left-[120px] grid grid-cols-4 gap-1.5 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#a9d9c8]/40" />
          ))}
        </div>

        {/* LEFT COLUMN - Walking from left */}
        <motion.div 
          className="relative z-10 order-2 lg:order-1"
          variants={walkInLeft}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[12px] font-semibold text-[#1c3fe0] shadow-sm mb-5 cursor-pointer hover:bg-[#c8d2ed] transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            EXCELLENCE IN EDUCATION
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-extrabold text-[#0a1240] leading-[1.08]"
          >
            Distinguished<br />
            <span className="text-[#2f56fb]">Faculty</span>
          </motion.h1>

          <motion.div 
            variants={fadeInUp}
            className="w-[52px] h-[3px] bg-[#2f56fb] rounded-full mt-4 mb-5" 
          />

          <motion.p 
            variants={fadeInUp}
            className="text-[15px] leading-[1.7] text-[#3d4566] max-w-[420px] mb-7"
          >
            Learn from accomplished scholars and industry professionals dedicated to mentoring and inspiring the next generation of leaders and innovators.
          </motion.p>

          <motion.a
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/Faculty"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] transition-all duration-300 cursor-pointer"
          >
            Meet Our Faculty
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>
          </motion.a>
        </motion.div>

        {/* RIGHT COLUMN - Walking from right */}
        <motion.div 
          className="relative h-[300px] sm:h-[360px] md:h-[420px] lg:h-[520px] flex items-center justify-center order-1 lg:order-2 w-full"
          variants={walkInRight}
        >
          {/* Arch Outline */}
          <motion.div 
            variants={fadeInScale}
            className="absolute inset-[-8px] border border-[#bfe6da] rounded-[200px_60px_200px_60px] pointer-events-none" 
          />

          {/* Photo Frame */}
          <motion.div 
            variants={fadeInScale}
            className="relative w-full h-full rounded-[190px_60px_190px_60px] lg:rounded-[190px_60px_190px_60px] overflow-hidden shadow-[0_24px_50px_-15px_rgba(37,99,235,0.25)] z-10"
          >
            {/* Desktop Image - Hidden on mobile */}
            <img
              src="https://plus.unsplash.com/premium_photo-1661756423422-4486e27eb6dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Professor teaching a class"
              className="w-full h-full object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-300 hidden lg:block"
            />
            {/* Mobile Image - Hidden on desktop */}
            <img
              src="https://images.unsplash.com/photo-1577141262638-5548257565d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjdWx0eXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Professor teaching a class"
              className="w-full h-full object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-300 lg:hidden"
            />
          </motion.div>

          {/* Floating Cards - 3 badges on desktop */}
          <motion.div 
            variants={fadeInUp}
            className="absolute top-6 left-[-8px] bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_24px_-8px_rgba(37,99,235,0.2)] p-3 flex items-center gap-3 z-20 cursor-pointer hover:scale-[1.05] transition-all duration-300 border border-white/50 hidden lg:flex"
            transition={{ delay: 0.3 }}
          >
            <div className="w-9 h-9 rounded-lg bg-[#2f56fb]/10 flex items-center justify-center">
              <Users className="h-4.5 w-4.5 text-[#2f56fb]" strokeWidth={2} />
            </div>
            <strong className="text-[13px] font-bold text-[#0a1240] leading-tight">
              Mentorship<br />That Matters
            </strong>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="absolute top-[38%] right-[-32px] bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_24px_-8px_rgba(37,99,235,0.2)] p-3 flex items-center gap-3 z-20 cursor-pointer hover:scale-[1.05] transition-all duration-300 border border-white/50 hidden lg:flex"
            transition={{ delay: 0.4 }}
          >
            <div className="w-9 h-9 rounded-lg bg-[#dce3f5] flex items-center justify-center">
              <Award className="h-4.5 w-4.5 text-[#2f56fb]" strokeWidth={2} />
            </div>
            <strong className="text-[13px] font-bold text-[#0a1240] leading-tight">
              Knowledge<br />That Empowers
            </strong>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="absolute bottom-8 left-[-12px] bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_24px_-8px_rgba(37,99,235,0.2)] p-3 flex items-center gap-3 z-20 cursor-pointer hover:scale-[1.05] transition-all duration-300 border border-white/50 hidden lg:flex"
            transition={{ delay: 0.5 }}
          >
            <div className="w-9 h-9 rounded-lg bg-[#dce3f5] flex items-center justify-center">
              <Lightbulb className="h-4.5 w-4.5 text-[#2f56fb]" strokeWidth={2} />
            </div>
            <strong className="text-[13px] font-bold text-[#0a1240] leading-tight">
              Excellence<br />That Inspires
            </strong>
          </motion.div>

          {/* Mobile Badges - 2 badges (left and right) */}
          <motion.div 
            variants={fadeInUp}
            className="absolute top-4 left-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_24px_-8px_rgba(37,99,235,0.2)] p-2.5 flex items-center gap-2 z-20 cursor-pointer hover:scale-[1.05] transition-all duration-300 border border-white/50 lg:hidden"
            transition={{ delay: 0.3 }}
          >
            <div className="w-7 h-7 rounded-lg bg-[#2f56fb]/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-3.5 w-3.5 text-[#2f56fb]" strokeWidth={2} />
            </div>
            <strong className="text-[11px] font-bold text-[#0a1240] leading-tight">
              Mentorship
            </strong>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="absolute bottom-4 right-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_24px_-8px_rgba(37,99,235,0.2)] p-2.5 flex items-center gap-2 z-20 cursor-pointer hover:scale-[1.05] transition-all duration-300 border border-white/50 lg:hidden"
            transition={{ delay: 0.4 }}
          >
            <div className="w-7 h-7 rounded-lg bg-[#dce3f5] flex items-center justify-center flex-shrink-0">
              <Award className="h-3.5 w-3.5 text-[#2f56fb]" strokeWidth={2} />
            </div>
            <strong className="text-[11px] font-bold text-[#0a1240] leading-tight">
              Excellence
            </strong>
          </motion.div>

        </motion.div>

      </motion.div>
    </section>
  );
}