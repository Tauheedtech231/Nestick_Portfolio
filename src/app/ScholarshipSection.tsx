'use client';

import { ReactNode, useEffect, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";

interface ScholarshipCard {
  id: string;
  num: string;
  title: string;
  description: string;
  color: string;
  className?: string;
}

interface ScholarshipSectionProps {
  cards?: ScholarshipCard[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

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

const walkInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function ScholarshipSection({ cards, title, subtitle, badgeText }: ScholarshipSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const defaultCards: ScholarshipCard[] = [
    {
      id: "card1",
      num: "01",
      title: "Merit Scholarships",
      description: "Recognizing excellence and academic achievements.",
      color: "#2f56fb",
      className: "card1",
    },
    {
      id: "card2",
      num: "02",
      title: "Need-Based Aid",
      description: "Supporting students who need it the most.",
      color: "#2f56fb",
      className: "card2",
    },
    {
      id: "card3",
      num: "03",
      title: "Affordable Education",
      description: "Making quality education accessible for all.",
      color: "#2f56fb",
      className: "card3",
    }
  ];

  const displayCards = cards || defaultCards;
  const displayTitle = title || 'Scholarships &';
  const displaySubtitle = subtitle || 'We believe that financial constraints should never be a barrier to quality education. Aspire College offers a range of merit-based and need-based scholarships to help talented students achieve their academic dreams.';
  const displayBadge = badgeText || 'SCHOLARSHIPS';

  // Function to wrap text with 3 words per line with proper spacing
  const formatDescription = (text: string) => {
    const words = text.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += 3) {
      lines.push(words.slice(i, i + 3).join(' '));
    }
    return lines.join(' ');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen  flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fbfcff 0%, #f4f6fd 100%)',
      }}
    >
      {/* Depth Shadow Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 py-16 lg:py-16">
        {/* Heading - Top Center */}
        <motion.div 
          className="text-center mb-5 lg:mb-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[12px] font-semibold text-[#1c3fe0] shadow-sm mb-2"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
            </svg>
            {displayBadge}
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-extrabold text-[#0a1240] leading-[1.08]"
          >
            {displayTitle}<br />
            <span className="text-[#2f56fb]">Financial Aid</span>
          </motion.h1>
          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-center gap-1.5 mt-2"
          >
            <div className="h-1 w-[34px] rounded-full bg-[#2f56fb]" />
            <div className="h-[4px] w-[4px] rounded-full bg-[#2f56fb] opacity-55" />
            <div className="h-[4px] w-[4px] rounded-full bg-[#2f56fb] opacity-30" />
          </motion.div>
          <motion.p 
            variants={fadeInUp}
            className="mt-2 text-[14px] text-[#3d4566] leading-[1.6] max-w-2xl mx-auto"
          >
            {displaySubtitle}
          </motion.p>
        </motion.div>

        {/* Cards - Location Pin Shape */}
        <motion.div 
          className="relative flex flex-wrap justify-center items-center gap-6 lg:gap-8 mb-8 lg:mb-10"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {displayCards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={walkInRight}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="relative w-[260px] h-[340px] bg-white shadow-[0_18px_40px_rgba(47,86,251,0.12)] cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center"
              style={{
                // Location Pin Shape - More prominent pin shape with less padding
                clipPath: "path('M130,340 C60,280 -5,210 15,150 C25,105 65,65 130,65 C195,65 235,105 245,150 C265,210 200,280 130,340 Z M130,340 L130,340')",
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: '0 18px 40px rgba(47,86,251,0.12), 0 8px 20px rgba(47,86,251,0.06)',
                padding: '20px 18px 30px',
              }}
            >
              {/* Number Watermark */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[70px] font-black leading-none opacity-[0.04] z-0" style={{ color: card.color }}>
                {card.num}
              </div>

              {/* Number */}
              <div className="relative z-10 font-extrabold text-[14px] mb-1" style={{ color: card.color }}>{card.num}</div>

              {/* Title */}
              <div 
                className="relative z-10 font-extrabold text-[14px] text-[#0a1240] leading-tight mb-1.5 max-w-[160px]"
              >
                {card.title}
              </div>

              {/* Description - 3 words per line with proper spacing */}
              <div 
                className="relative z-10 text-[11.5px] text-[#3d4566] leading-[1.8] max-w-[140px]"
                style={{ 
                  wordBreak: 'break-word',
                  display: 'inline-block'
                }}
              >
                {formatDescription(card.description)}
              </div>

              {/* Pin tip at bottom - the sharp point of location pin */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[1px] w-0 h-0"
                style={{
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '18px solid white',
                  filter: 'drop-shadow(0 4px 8px rgba(47,86,251,0.08))'
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Button - Below Cards */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-center"
        >
          <Link
            href="/Scholarships"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] transition-all duration-300 cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 3L1 8l11 5 9-4.09V17h2V8L12 3z" />
              <path d="M4 11.18V15c0 2.21 3.58 4 8 4s8-1.79 8-4v-3.82" />
            </svg>
            Explore Scholarships
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .scholarship-card {
            width: 230px !important;
            height: 300px !important;
            padding: 16px 14px 25px !important;
          }
        }
        @media (max-width: 480px) {
          .scholarship-card {
            width: 200px !important;
            height: 280px !important;
            padding: 14px 12px 22px !important;
          }
        }
      `}</style>
    </section>
  );
}