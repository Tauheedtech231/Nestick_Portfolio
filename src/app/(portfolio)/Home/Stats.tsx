'use client';

import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";

interface StatItem {
  id: number;
  label: string;
  value: string;
  target: number;
  suffix: string;
  icon?: string;
}

interface StatsData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  stats: StatItem[];
  achievementsBadge: string;
}

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardHover: Variants = {
  hidden: { opacity: 0, y: 50, rotateY: 34 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 34,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

function Sheen() {
  return (
    <div
      className="pointer-events-none absolute -left-[60%] -top-[40%] h-[90%] w-[140%] -rotate-[8deg] transition-opacity duration-300 group-hover:opacity-80"
      style={{
        background: "linear-gradient(120deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0) 55%)",
      }}
    />
  );
}

function Counter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const endValue = target;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (endValue - 0) + 0);
      setCount(currentCount);
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(endValue);
      }
    };
    requestAnimationFrame(animateCount);
    return () => { startTime = null; };
  }, [isInView, target, duration]);

  return (
    <span ref={counterRef} className="inline-flex items-center">
      {count}{suffix && <span className="ml-0.5">{suffix}</span>}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [collegeName, setCollegeName] = useState<string>("College");
  const [loading, setLoading] = useState(true);
  const collegeId = "8";
  
  // ✅ Separate session keys for stats and college name
  const STATS_SESSION_KEY = `stats_data_${collegeId}`;
  const COLLEGE_NAME_SESSION_KEY = `college_name_${collegeId}`;

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ Check session storage for BOTH stats and college name
        if (typeof window !== 'undefined') {
          const cachedStats = sessionStorage.getItem(STATS_SESSION_KEY);
          const cachedCollegeName = sessionStorage.getItem(COLLEGE_NAME_SESSION_KEY);
          
          if (cachedStats && cachedCollegeName) {
            console.log('📦 [Stats] Loading BOTH from session storage (0 API calls)');
            setStatsData(JSON.parse(cachedStats));
            setCollegeName(cachedCollegeName);
            setLoading(false);
            return;
          }
        }

        console.log('🔄 [Stats] Fetching from APIs...');

        // ✅ API CALL 1: Stats data
        console.log('📡 [Stats] API Call 1: Fetching stats...');
        const statsResponse = await fetch(
          `https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=Stats`
        );
        const statsDataResult = await statsResponse.json();
        console.log('📦 [Stats] Stats API Response:', statsDataResult);

        // ✅ API CALL 2: College name (from form API)
        console.log('📡 [Stats] API Call 2: Fetching college name...');
        const collegeResponse = await fetch(
          `https://dynamic-section-api.vercel.app/api/public/college/form?college_id=${collegeId}`
        );
        const collegeResult = await collegeResponse.json();
        console.log('🏫 [Stats] College API Response:', collegeResult);

        // ✅ Extract college name
        let collegeNameFromApi = "College";
        if (collegeResult.success && collegeResult.data && collegeResult.data.college) {
          collegeNameFromApi = collegeResult.data.college.name;
        }
        console.log('🏫 [Stats] College name from API:', collegeNameFromApi);

        // ✅ Extract stats
        let finalStatsData: StatsData;
        if (statsDataResult.success && statsDataResult.content && statsDataResult.content.stats) {
          console.log('✅ [Stats] Stats found:', statsDataResult.content.stats.length);
          finalStatsData = statsDataResult.content;
        } else {
          console.log('⚠️ [Stats] No stats, using fallback');
          finalStatsData = getDefaultStatsData();
        }

        // ✅ Save to session storage (with window check)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(STATS_SESSION_KEY, JSON.stringify(finalStatsData));
          sessionStorage.setItem(COLLEGE_NAME_SESSION_KEY, collegeNameFromApi);
        }

        setStatsData(finalStatsData);
        setCollegeName(collegeNameFromApi);
      } catch (error) {
        console.error('❌ [Stats] Error:', error);
        const fallbackData = getDefaultStatsData();
        const fallbackName = "College";
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(STATS_SESSION_KEY, JSON.stringify(fallbackData));
          sessionStorage.setItem(COLLEGE_NAME_SESSION_KEY, fallbackName);
        }
        setStatsData(fallbackData);
        setCollegeName(fallbackName);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [collegeId]);

  const getDefaultStatsData = (): StatsData => ({
    title: 'Why Choose',
    subtitle: 'Excellence in education, innovation, and student success',
    achievementsBadge: 'Our Achievements',
    backgroundImage: '/stats.jpg',
    stats: [
      { id: 1, label: "Years of Excellence", value: "25+", target: 25, suffix: "+" },
      { id: 2, label: "Academic Programs", value: "15+", target: 15, suffix: "+" },
      { id: 3, label: "Faculty Members", value: "40+", target: 40, suffix: "+" },
      { id: 4, label: "Success Rate", value: "97%", target: 97, suffix: "%" },
    ]
  });

  // ✅ Show loading only on first visit
  if (loading && typeof window !== 'undefined' && !statsData) {
    return (
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f0f4ff]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2f56fb] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading stats...</p>
        </div>
      </section>
    );
  }

  const data = statsData || getDefaultStatsData();
  const displayStats = data.stats || [];
  const displayTitle = data.title || 'Why Choose';
  const displaySubtitle = data.subtitle || 'Excellence in education, innovation, and student success';
  const displayBadge = data.achievementsBadge || 'Our Achievements';
  const bgImage = data.backgroundImage || '/stats.jpg';

  const processedStats = displayStats.map((stat) => ({
    ...stat,
    target: stat.target || 0,
    suffix: stat.suffix || ''
  }));

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center overflow-hidden"
    >
      {/* Heading Section */}
      <div className="relative z-10 w-full py-12 sm:py-16 px-5 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 40%, #e8edf8 70%, #dce3f5 100%)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/25 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[11px] sm:text-[12px] font-semibold text-[#1c3fe0] shadow-sm mb-3"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
              </svg>
              {displayBadge}
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a1240]"
            >
              {displayTitle}
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

      {/* Stats Section */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden px-0 sm:px-5 py-12 sm:py-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Campus background"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30 z-[1]" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2f56fb]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2f56fb]/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2f56fb]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#1530b0]/10 rounded-full blur-3xl" />
        </div>

        {/* Stats Cards */}
        <div className="relative z-[2] w-full max-w-7xl mx-auto">
          <motion.div
            className="[perspective:1200px] sm:[perspective:1800px] lg:[perspective:2200px] [perspective-origin:20%_50%]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
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
              {/* Card 1 - Hero Card with DYNAMIC college name */}
              <motion.div
                variants={cardHover}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative z-[6] snap-center shrink-0 flex h-[380px] w-[200px] flex-col items-center justify-center overflow-hidden rounded-[34px] border-2 border-white/30 text-center text-white shadow-[0_0_30px_rgba(0,0,0,0.3)] cursor-pointer"
                style={{
                  background:
                    "linear-gradient(150deg, rgba(47,86,251,0.9) 0%, rgba(30,64,175,0.85) 45%, rgba(21,48,176,0.9) 100%)",
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Sheen />
                <div className="relative z-[2] px-4 text-[20px] font-extrabold leading-snug tracking-wide">
                  {collegeName.toUpperCase()}
                </div>
              </motion.div>

              {/* Cards 2-5 */}
              {processedStats.map((stat, i) => (
                <motion.div
                  key={stat.id || i}
                  variants={cardHover}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative snap-center shrink-0 -ml-[70px] sm:-ml-[65px] flex h-[380px] w-[200px] flex-col items-center justify-center overflow-hidden rounded-[34px] border-2 text-center shadow-[0_0_30px_rgba(0,0,0,0.2)] cursor-pointer"
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
                  <div className="z-[2] mb-3 text-[13px] font-medium text-slate-500 px-2">
                    {stat.label.split(" ").slice(0, -1).join(" ") || stat.label}
                  </div>
                  <div className="z-[2] mb-3 bg-gradient-to-r from-[#2f56fb] to-[#1530b0] bg-clip-text text-[32px] font-extrabold tracking-wide text-transparent">
                    {stat.target ? (
                      <Counter target={stat.target} suffix={stat.suffix || ''} duration={2000} />
                    ) : (
                      stat.value || '0'
                    )}
                  </div>
                  <div className="z-[2] text-[13px] font-medium text-slate-500 px-2">
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