'use client';

import { Camera, ArrowRight, GraduationCap, Users, Award } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

export default function GallerySection() {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setImageRef = (index: number) => (el: HTMLDivElement | null) => {
    imageRefs.current[index] = el;
  };

  useEffect(() => {
    const floatingImages = imageRefs.current.filter(ref => ref !== null);
    
    floatingImages.forEach((img, index) => {
      const randomDuration = 4 + Math.random() * 2;
      const randomDelay = index * 0.5;
      const randomY = 6 + Math.random() * 8;
      const randomX = 3 + Math.random() * 5;
      
      img!.style.animation = `floatImage ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
      img!.style.setProperty('--float-y', `-${randomY}px`);
      img!.style.setProperty('--float-x', `${randomX}px`);
    });

    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes floatImage {
        0% {
          transform: translateY(0px) translateX(0px);
        }
        100% {
          transform: translateY(var(--float-y, -8px)) translateX(var(--float-x, 4px));
        }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8edf8] overflow-x-hidden py-12 sm:py-16 px-4">
      {/* Deep shadow decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="relative max-w-[1100px] mx-auto overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        
        {/* Heading - Top Center - Single Line */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[12px] font-semibold text-[#1c3fe0] shadow-sm mb-3">
            <Camera className="h-3.5 w-3.5" />
            Campus Life
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#0a1240] leading-[1.08]">
            Campus <span className="text-[#2f56fb] font-['Playfair_Display',serif] italic">Gallery</span>
          </h1>
        </motion.div>

        {/* Grid Layout - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10 lg:gap-16 xl:gap-20 p-2 sm:p-4 lg:p-6 xl:p-8">
          
          {/* LEFT COLUMN - Floating Images */}
          <motion.div 
            variants={walkInLeft}
            className="relative h-[380px] sm:h-[420px] lg:h-[480px] order-1 lg:order-1"
          >
            {/* Photo 1 - Top Center */}
            <Link href="/Gallery">
              <div 
                ref={setImageRef(0)}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] sm:w-[220px] lg:w-[240px] h-[140px] sm:h-[150px] lg:h-[160px] bg-white p-1.5 rounded-xl shadow-[0_20px_40px_-15px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] z-20 cursor-pointer hover:scale-[1.05] transition-all duration-300 border border-white/50"
              >
                <img
                  src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Campus building"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </Link>

            {/* Photo 2 - Bottom Center */}
            <Link href="/Gallery">
              <div 
                ref={setImageRef(1)}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] sm:w-[200px] lg:w-[220px] h-[130px] sm:h-[140px] lg:h-[155px] bg-white p-1.5 rounded-xl shadow-[0_20px_40px_-15px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] z-20 cursor-pointer hover:scale-[1.05] transition-all duration-300 border border-white/50"
              >
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80"
                  alt="Friends studying on campus"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </Link>

            {/* Photo 3 - Left Center */}
            <Link href="/Gallery">
              <div 
                ref={setImageRef(2)}
                className="absolute top-1/2 left-[-4px] sm:left-[-6px] lg:left-[-8px] -translate-y-1/2 w-[160px] sm:w-[180px] lg:w-[200px] h-[120px] sm:h-[135px] lg:h-[150px] bg-white p-1.5 rounded-xl shadow-[0_20px_40px_-15px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] z-30 cursor-pointer hover:scale-[1.05] transition-all duration-300 border border-white/50"
              >
                <img
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80"
                  alt="Students playing sports"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </Link>

            {/* Photo 4 - Right Center */}
            <Link href="/Gallery">
              <div 
                ref={setImageRef(3)}
                className="absolute top-1/2 right-[-4px] sm:right-[-6px] lg:right-[-8px] -translate-y-1/2 w-[160px] sm:w-[180px] lg:w-[200px] h-[120px] sm:h-[135px] lg:h-[150px] bg-white p-1.5 rounded-xl shadow-[0_20px_40px_-15px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] z-20 cursor-pointer hover:scale-[1.05] transition-all duration-300 border border-white/50"
              >
                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80"
                  alt="Library interior"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </Link>

            {/* Camera Badge - Center */}
            <Link href="/Gallery">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] sm:w-[65px] lg:w-[70px] h-[60px] sm:h-[65px] lg:h-[70px] bg-white rounded-full flex items-center justify-center shadow-[0_15px_35px_-12px_rgba(37,99,235,0.3),inset_0_1px_0_rgba(255,255,255,0.8)] z-50 border border-white/50 cursor-pointer hover:scale-[1.1] transition-all duration-300">
                <div className="w-[42px] sm:w-[46px] lg:w-[50px] h-[42px] sm:h-[46px] lg:h-[50px] bg-gradient-to-br from-[#2f56fb] to-[#1530b0] rounded-full flex items-center justify-center shadow-[0_8px_20px_-8px_rgba(47,86,251,0.5)]">
                  <Camera className="h-4 sm:h-4.5 lg:h-5.5 w-4 sm:w-4.5 lg:w-5.5 text-white" strokeWidth={2} />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* RIGHT COLUMN - Content */}
          <motion.div 
            variants={walkInRight}
            className="relative z-10 order-2 lg:order-2"
          >
            <motion.p 
              variants={fadeInUp}
              className="text-[14px] sm:text-[15px] leading-[1.7] sm:leading-[1.8] text-[#3d4566] max-w-[420px] mb-5 sm:mb-6"
            >
              Experience our vibrant campus community through stunning visuals of facilities, events, student life, and academic activities. 
              Our campus is a hub of innovation, creativity, and learning where every moment inspires growth and excellence.
            </motion.p>

            {/* Stats - Responsive */}
            <motion.div 
              variants={fadeInUp}
              className="flex items-center gap-2 sm:gap-4 mb-5 sm:mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 max-w-[420px] shadow-[0_10px_30px_-10px_rgba(37,99,235,0.08)] border border-white/30 flex-wrap sm:flex-nowrap"
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-[80px]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#dce3f5]/60 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-4 sm:h-4.5 w-4 sm:w-4.5 text-[#2f56fb]" strokeWidth={2} />
                </div>
                <div>
                  <strong className="text-[16px] sm:text-[18px] font-extrabold text-[#0a1240]">25+</strong>
                  <span className="block text-[10px] sm:text-[11px] text-[#3d4566] font-medium">Years Excellence</span>
                </div>
              </div>
              <div className="h-[30px] sm:h-[34px] w-px bg-[#e6e9f2]/60 hidden sm:block" />
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-[80px]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#dce3f5]/60 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 sm:h-4.5 w-4 sm:w-4.5 text-[#2f56fb]" strokeWidth={2} />
                </div>
                <div>
                  <strong className="text-[16px] sm:text-[18px] font-extrabold text-[#0a1240]">15+</strong>
                  <span className="block text-[10px] sm:text-[11px] text-[#3d4566] font-medium">Programs</span>
                </div>
              </div>
              <div className="h-[30px] sm:h-[34px] w-px bg-[#e6e9f2]/60 hidden sm:block" />
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-[80px]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#dce3f5]/60 flex items-center justify-center flex-shrink-0">
                  <Award className="h-4 sm:h-4.5 w-4 sm:w-4.5 text-[#2f56fb]" strokeWidth={2} />
                </div>
                <div>
                  <strong className="text-[16px] sm:text-[18px] font-extrabold text-[#0a1240]">97%</strong>
                  <span className="block text-[10px] sm:text-[11px] text-[#3d4566] font-medium">Success Rate</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/Gallery"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-5 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] transition-all duration-300 cursor-pointer"
              >
                <Camera className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                View Gallery
                <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* Custom Animations */}
      <style>{`
        @keyframes floatImage {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          100% {
            transform: translateY(var(--float-y, -8px)) translateX(var(--float-x, 4px));
          }
        }
      `}</style>
    </section>
  );
}