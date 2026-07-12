'use client';

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";

interface StatsProps {
  stats?: StatItem[];
  title?: string;
  subtitle?: string;
}

interface StatItem {
  label: string;
  value: string;
  target?: number;
  suffix?: string;
}

// Animation variants - Same as HeroSection
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

const cardHover: Variants = {
  hidden: { opacity: 0, y: 50, rotateY: 34 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 34,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    }
  }
};

function Sheen() {
  return (
    <div
      className="pointer-events-none absolute -left-[60%] -top-[40%] h-[90%] w-[140%] -rotate-[8deg] transition-opacity duration-300 group-hover:opacity-80"
      style={{
        background:
          "linear-gradient(120deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0) 55%)",
      }}
    />
  );
}

// Counter Component
function Counter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;
    const endValue = target;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (endValue - startValue) + startValue);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animateCount);

    return () => {
      startTime = null;
    };
  }, [isInView, target, duration]);

  return (
    <span ref={counterRef} className="inline-flex items-center">
      {count}
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
}

export default function Stats({ stats, title, subtitle }: StatsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const defaultStats: StatItem[] = [
    { label: "Years of Excellence", value: "25+", target: 25, suffix: "+" },
    { label: "Academic Programs", value: "15+", target: 15, suffix: "+" },
    { label: "Faculty Members", value: "40+", target: 40, suffix: "+" },
    { label: "Success Rate", value: "97%", target: 97, suffix: "%" },
  ];

  const displayStats = stats || defaultStats;
  const displayTitle = title || 'Why Choose';
  const displaySubtitle = subtitle || 'Excellence in education, innovation, and student success';

  // Process stats to extract target and suffix
  const processedStats = displayStats.map((stat) => {
    // If target is provided, use it
    if (stat.target !== undefined) {
      return stat;
    }

    // Otherwise parse from value string
    const valueStr = stat.value.toString();
    const match = valueStr.match(/^(\d+)(\+|%|K|\+K)?$/);
    if (match) {
      const num = parseInt(match[1]);
      const suffix = match[2] || '';
      return { ...stat, target: num, suffix: suffix };
    }
    return { ...stat, target: 0, suffix: '' };
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center overflow-hidden"
    >
      {/* Heading Section - With Depth Shadow Like About */}
      <div className="relative z-10 w-full py-12 sm:py-16 px-5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 40%, #e8edf8 70%, #dce3f5 100%)' }}>
        {/* Deep shadow decorative elements - Same as About */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/25 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[11px] sm:text-[12px] font-semibold text-[#1c3fe0] shadow-sm mb-3"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
              </svg>
              Our Achievements
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a1240]"
            >
              Why Choose{" "}
              <span className="text-[#2f56fb]">Aspire College?</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-2 text-[13px] sm:text-[15px] text-[#3d4566] px-4"
            >
              {displaySubtitle}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section - With Background Image */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden px-0 sm:px-5 py-12 sm:py-16">
        {/* Background Image - stats.jpg from public folder */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/stats.jpg"
            alt="Campus background"
            fill
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Deep shadow decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2f56fb]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2f56fb]/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2f56fb]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#1530b0]/10 rounded-full blur-3xl" />
        </div>

        {/* Stats Cards - z-[2] to be above background */}
        <div className="relative z-[2] w-full max-w-7xl mx-auto">
          <motion.div
            className="[perspective:1200px] sm:[perspective:1800px] lg:[perspective:2200px] [perspective-origin:20%_50%]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {/*
              MOBILE: horizontal scroll-snap carousel (cards keep same look, just swipeable)
              DESKTOP (sm and up): original wrapped/overlapping layout
            */}
            <div
              className="
                flex items-center
                overflow-x-auto sm:overflow-visible
                snap-x snap-mandatory sm:snap-none
                justify-start sm:justify-center
                flex-nowrap sm:flex-wrap
                gap-4 sm:gap-4 lg:gap-0
                px-6 sm:px-0
                pb-4 sm:pb-0
                no-scrollbar
              "
            >
              {/* Card 1 - Hero with Background Image */}
              <motion.div
                variants={cardHover}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative z-[6] snap-center shrink-0 flex h-[300px] w-[170px] sm:h-[340px] sm:w-[190px] lg:h-[380px] lg:w-[200px] flex-col items-center justify-center overflow-hidden rounded-[28px] sm:rounded-[34px] border-2 border-white/30 text-center text-white shadow-[0_0_30px_rgba(0,0,0,0.3)] cursor-pointer"
                style={{
                  background:
                    "linear-gradient(150deg, rgba(47,86,251,0.9) 0%, rgba(30,64,175,0.85) 45%, rgba(21,48,176,0.9) 100%)",
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Sheen />
                <div className="relative z-[2] px-4 text-[16px] sm:text-[18px] lg:text-[20px] font-extrabold leading-snug tracking-wide">
                  ASPIRE
                  <br />
                  COLLEGE
                </div>
                <div className="relative z-[2] mt-2.5 text-[11px] sm:text-xs leading-relaxed text-white/80">
                  Shaping Futures,
                  <br />
                  Inspiring Excellence
                </div>
              </motion.div>

              {/* Cards 2-5 - With Dynamic Counter */}
              {processedStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={cardHover}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative snap-center shrink-0 -ml-[28px] sm:-ml-[40px] lg:-ml-[55px] flex h-[300px] w-[170px] sm:h-[340px] sm:w-[190px] lg:h-[380px] lg:w-[200px] flex-col items-center justify-center overflow-hidden rounded-[28px] sm:rounded-[34px] border-2 text-center shadow-[0_0_30px_rgba(0,0,0,0.2)] cursor-pointer"
                  style={{
                    zIndex: 5 - i,
                    background:
                      "linear-gradient(150deg, rgba(255,255,255,0.92) 0%, rgba(234,246,245,0.9) 40%, rgba(220,238,253,0.9) 100%)",
                    borderColor:
                      i % 2 === 0
                        ? "rgba(47,86,251,0.4)"
                        : "rgba(47,86,251,0.3)",
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Sheen />
                  <div className="z-[2] mb-2 sm:mb-3 text-[11px] sm:text-[12px] lg:text-[13px] font-medium text-slate-500 px-2">
                    {stat.label.split(" ").slice(0, -1).join(" ") || stat.label}
                  </div>
                  <div className="z-[2] mb-2 sm:mb-3 bg-gradient-to-r from-[#2f56fb] to-[#1530b0] bg-clip-text text-[26px] sm:text-[29px] lg:text-[32px] font-extrabold tracking-wide text-transparent">
                    {stat.target ? (
                      <Counter target={stat.target} suffix={stat.suffix || ''} duration={2000} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="z-[2] text-[11px] sm:text-[12px] lg:text-[13px] font-medium text-slate-500 px-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile swipe hint */}
            <p className="sm:hidden text-center text-[11px] text-white/70 mt-2">
              ← Swipe to see more →
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}