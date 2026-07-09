import { GraduationCap, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { ReactNode, useState, useEffect, useRef } from "react";
import { motion, Variants } from 'framer-motion';

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string | ReactNode;
  className: string;
  id: string;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  delay?: number;
}

function StatCard({ icon, value, label, className, id, isHovered, onHover, delay = 0 }: StatCardProps) {
  const [floatOffset, setFloatOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newOffset = Math.sin(Date.now() / 3000 + delay) * 3;
      setFloatOffset(newOffset);
    }, 50);

    return () => clearInterval(interval);
  }, [delay]);

  return (
    <motion.div
      id={id}
      className={`absolute flex items-center gap-3 rounded-full bg-white py-2.5 pl-2.5 pr-5 transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.03] ${className}`}
      style={{
        transform: isHovered 
          ? `scale(1.03) translateY(${floatOffset}px)` 
          : `translateY(${floatOffset}px)`,
        border: isHovered ? '2px solid #0D9488' : '2px solid rgba(255,255,255,0.5)',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(13,148,136,0.4), 0 4px 15px -6px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)' 
          : '0 15px 35px -10px rgba(37,99,235,0.3), 0 4px 12px -6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        background: isHovered 
          ? 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
      }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      initial={{ opacity: 0, x: className.includes('left') ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
    >
      <div 
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300"
        style={{
          backgroundColor: isHovered ? '#ECFDF5' : '#EFF6FF',
          boxShadow: isHovered ? 'inset 0 2px 4px rgba(13,148,136,0.1)' : 'inset 0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <div 
          className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 text-white"
          style={{
            backgroundColor: isHovered ? '#0D9488' : '#3B82F6',
            boxShadow: isHovered 
              ? '0 8px 20px -6px rgba(13,148,136,0.5)' 
              : '0 8px 20px -6px rgba(59,130,246,0.4)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {icon}
        </div>
      </div>
      <div className="whitespace-nowrap leading-tight">
        <p 
          className="text-[20px] font-extrabold transition-all duration-300"
          style={{
            color: isHovered ? '#0D9488' : '#1E3A8A',
            textShadow: isHovered ? '0 2px 10px rgba(13,148,136,0.15)' : 'none',
          }}
        >
          {value}
        </p>
        <p className="text-[13px] font-bold text-slate-700">{label}</p>
      </div>
    </motion.div>
  );
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

export default function Stats() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getLineColor = () => {
    return hoveredId ? '#0D9488' : '#3B82F6';
  };

  const getLineOpacity = () => {
    return hoveredId ? '0.8' : '0.4';
  };

  const getDotColor = () => {
    return hoveredId ? '#0D9488' : '#3B82F6';
  };

  return (
    <section 
      id="stats-section"
      className="relative mx-auto flex w-full items-center justify-center bg-gradient-to-br from-[#f0f4ff] via-white to-[#e8edf8] py-10 sm:py-16 px-4 overflow-hidden min-h-[600px]"
    >
      {/* Deep shadow decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-[960px] flex items-center justify-center min-h-[560px]">
        {/* SVG connecting lines - hidden on mobile */}
        {!isMobile && (
          <svg
            viewBox="0 0 960 580"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
          >
            <line 
              x1="480" 
              y1="290"
              x2="190" 
              y2="170" 
              stroke={getLineColor()}
              strokeWidth="2.5" 
              opacity={getLineOpacity()}
              strokeDasharray="6,4"
            />
            <line 
              x1="480" 
              y1="290"
              x2="770" 
              y2="160" 
              stroke={getLineColor()}
              strokeWidth="2.5" 
              opacity={getLineOpacity()}
              strokeDasharray="6,4"
            />
            <line 
              x1="480" 
              y1="290"
              x2="790" 
              y2="430" 
              stroke={getLineColor()}
              strokeWidth="2.5" 
              opacity={getLineOpacity()}
              strokeDasharray="6,4"
            />
            <line 
              x1="480" 
              y1="290"
              x2="170" 
              y2="420" 
              stroke={getLineColor()}
              strokeWidth="2.5" 
              opacity={getLineOpacity()}
              strokeDasharray="6,4"
            />
            <circle cx="190" cy="170" r="4" fill={getDotColor()} opacity={getLineOpacity()} />
            <circle cx="770" cy="160" r="4" fill={getDotColor()} opacity={getLineOpacity()} />
            <circle cx="790" cy="430" r="4" fill={getDotColor()} opacity={getLineOpacity()} />
            <circle cx="170" cy="420" r="4" fill={getDotColor()} opacity={getLineOpacity()} />
            <circle 
              cx="480" 
              cy="290"
              r="6" 
              fill={hoveredId ? '#0D9488' : '#3B82F6'} 
              opacity="0.9"
              filter="url(#glow)"
            />
            <circle 
              cx="480" 
              cy="290"
              r="16" 
              fill={hoveredId ? '#0D9488' : '#3B82F6'} 
              opacity="0.12" 
            />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        )}

        {/* heading with stagger animation */}
        <motion.div 
          className="absolute top-4 left-1/2 w-full -translate-x-1/2 text-center px-4 z-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[12px] font-semibold text-[#1c3fe0] mb-3 shadow-sm"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Our Achievements
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-extrabold text-[#0a1240] sm:text-4xl"
          >
            Why Choose <span className="text-[#2f56fb]">Aspire College?</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="mt-2 text-[14px] text-[#3d4566]"
          >
            Excellence in education, innovation, and student success
          </motion.p>
        </motion.div>

        {/* Desktop Layout */}
        {!isMobile ? (
          <>
            {/* center circle with animation */}
            <motion.div 
              className="relative z-10 flex h-[200px] w-[200px] flex-col items-center justify-center rounded-full bg-gradient-to-br from-white to-[#f8faff] text-center border-2 shadow-[0_20px_50px_-12px_rgba(37,99,235,0.3), inset_0_-4px_12px_rgba(37,99,235,0.05), inset_0_4px_12px_rgba(255,255,255,0.8)]"
              style={{
                borderColor: hoveredId ? '#0D9488' : 'rgba(59,130,246,0.3)',
                boxShadow: hoveredId 
                  ? '0 25px 60px -12px rgba(13,148,136,0.4), inset 0 -4px 12px rgba(13,148,136,0.1), inset 0 4px 12px rgba(255,255,255,0.8)' 
                  : '0 20px 50px -12px rgba(37,99,235,0.3), inset 0 -4px 12px rgba(37,99,235,0.05), inset 0 4px 12px rgba(255,255,255,0.8)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <div 
                className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-[0_8px_25px_-6px_rgba(37,99,235,0.5)] mb-2"
              >
                <GraduationCap className="h-7 w-7 text-white" strokeWidth={1.75} />
              </div>
              <p className="text-xl font-extrabold leading-tight text-[#0a1240]">ASPIRE</p>
              <p className="text-xl font-extrabold leading-tight text-[#2f56fb]">COLLEGE</p>
              <span className="my-1.5 block h-px w-12 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
              <p className="text-[11px] font-medium text-slate-500">Shaping Futures,</p>
              <p className="text-[11px] font-medium text-slate-500">Inspiring Excellence</p>
            </motion.div>

            {/* Stat Cards - animation handled inside component with whileInView */}
            <StatCard
              id="stat-top-left"
              icon={<ShieldCheck className="h-5 w-5" strokeWidth={2} />}
              value="25+"
              label={
                <>
                  Years
                  <br />
                  of Excellence
                </>
              }
              className="left-[6%] top-[20%]"
              isHovered={hoveredId === 'stat-top-left'}
              onHover={setHoveredId}
              delay={0}
            />
            <StatCard
              id="stat-top-right"
              icon={<GraduationCap className="h-5 w-5" strokeWidth={2} />}
              value="15+"
              label={
                <>
                  Academic
                  <br />
                  Programs
                </>
              }
              className="right-[4%] top-[18%]"
              isHovered={hoveredId === 'stat-top-right'}
              onHover={setHoveredId}
              delay={0.5}
            />
            <StatCard
              id="stat-bottom-right"
              icon={<TrendingUp className="h-5 w-5" strokeWidth={2} />}
              value="97%"
              label={
                <>
                  Success
                  <br />
                  Rate
                </>
              }
              className="right-[4%] bottom-[18%]"
              isHovered={hoveredId === 'stat-bottom-right'}
              onHover={setHoveredId}
              delay={1}
            />
            <StatCard
              id="stat-bottom-left"
              icon={<Users className="h-5 w-5" strokeWidth={2} />}
              value="40+"
              label={
                <>
                  Faculty
                  <br />
                  Members
                </>
              }
              className="left-[4%] bottom-[20%]"
              isHovered={hoveredId === 'stat-bottom-left'}
              onHover={setHoveredId}
              delay={1.5}
            />
          </>
        ) : (
          /* Mobile Layout */
          <div className="flex flex-col items-center w-full max-w-sm mx-auto mt-16">
            <div className="grid grid-cols-2 gap-3 w-full">
              <motion.div 
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_-8px_rgba(37,99,235,0.15), inset_0_1px_0_rgba(255,255,255,0.8)] text-center border transition-all duration-300 cursor-pointer hover:scale-[1.03]"
                style={{
                  borderColor: hoveredId === 'mobile-top-left' ? '#0D9488' : 'rgba(59,130,246,0.15)',
                  boxShadow: hoveredId === 'mobile-top-left' 
                    ? '0 15px 35px -10px rgba(13,148,136,0.25), inset 0 1px 0 rgba(255,255,255,0.8)' 
                    : '0 8px 25px -8px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
                onMouseEnter={() => setHoveredId('mobile-top-left')}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                    <ShieldCheck className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xl font-extrabold text-[#1E3A8A]">25+</p>
                </div>
                <p className="text-[12px] font-bold text-slate-700">Years of Excellence</p>
              </motion.div>
              <motion.div 
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_-8px_rgba(37,99,235,0.15), inset_0_1px_0_rgba(255,255,255,0.8)] text-center border transition-all duration-300 cursor-pointer hover:scale-[1.03]"
                style={{
                  borderColor: hoveredId === 'mobile-top-right' ? '#0D9488' : 'rgba(59,130,246,0.15)',
                  boxShadow: hoveredId === 'mobile-top-right' 
                    ? '0 15px 35px -10px rgba(13,148,136,0.25), inset 0 1px 0 rgba(255,255,255,0.8)' 
                    : '0 8px 25px -8px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
                onMouseEnter={() => setHoveredId('mobile-top-right')}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-md">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xl font-extrabold text-[#1E3A8A]">15+</p>
                </div>
                <p className="text-[12px] font-bold text-slate-700">Academic Programs</p>
              </motion.div>
            </div>

            <motion.div 
              className="relative z-10 flex h-[160px] w-[160px] flex-col items-center justify-center rounded-full bg-gradient-to-br from-white to-[#f8faff] text-center my-4 border-2 shadow-[0_20px_50px_-12px_rgba(37,99,235,0.3), inset_0_-4px_12px_rgba(37,99,235,0.05), inset_0_4px_12px_rgba(255,255,255,0.8)]"
              style={{
                borderColor: hoveredId ? '#0D9488' : 'rgba(59,130,246,0.3)',
                boxShadow: hoveredId 
                  ? '0 25px 60px -12px rgba(13,148,136,0.4), inset 0 -4px 12px rgba(13,148,136,0.1), inset 0 4px 12px rgba(255,255,255,0.8)' 
                  : '0 20px 50px -12px rgba(37,99,235,0.3), inset 0 -4px 12px rgba(37,99,235,0.05), inset 0 4px 12px rgba(255,255,255,0.8)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-[0_8px_25px_-6px_rgba(37,99,235,0.5)] mb-1.5">
                <GraduationCap className="h-6 w-6 text-white" strokeWidth={1.75} />
              </div>
              <p className="text-base font-extrabold leading-tight text-[#0a1240]">ASPIRE</p>
              <p className="text-base font-extrabold leading-tight text-[#2f56fb]">COLLEGE</p>
              <span className="my-1 block h-px w-10 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
              <p className="text-[10px] font-medium text-slate-500">Shaping Futures</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <motion.div 
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_-8px_rgba(37,99,235,0.15), inset_0_1px_0_rgba(255,255,255,0.8)] text-center border transition-all duration-300 cursor-pointer hover:scale-[1.03]"
                style={{
                  borderColor: hoveredId === 'mobile-bottom-left' ? '#0D9488' : 'rgba(59,130,246,0.15)',
                  boxShadow: hoveredId === 'mobile-bottom-left' 
                    ? '0 15px 35px -10px rgba(13,148,136,0.25), inset 0 1px 0 rgba(255,255,255,0.8)' 
                    : '0 8px 25px -8px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
                onMouseEnter={() => setHoveredId('mobile-bottom-left')}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow-md">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xl font-extrabold text-[#1E3A8A]">40+</p>
                </div>
                <p className="text-[12px] font-bold text-slate-700">Faculty Members</p>
              </motion.div>
              <motion.div 
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-[0_8px_25px_-8px_rgba(37,99,235,0.15), inset_0_1px_0_rgba(255,255,255,0.8)] text-center border transition-all duration-300 cursor-pointer hover:scale-[1.03]"
                style={{
                  borderColor: hoveredId === 'mobile-bottom-right' ? '#0D9488' : 'rgba(59,130,246,0.15)',
                  boxShadow: hoveredId === 'mobile-bottom-right' 
                    ? '0 15px 35px -10px rgba(13,148,136,0.25), inset 0 1px 0 rgba(255,255,255,0.8)' 
                    : '0 8px 25px -8px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
                onMouseEnter={() => setHoveredId('mobile-bottom-right')}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-md">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xl font-extrabold text-[#1E3A8A]">97%</p>
                </div>
                <p className="text-[12px] font-bold text-slate-700">Success Rate</p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}