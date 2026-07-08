import { GraduationCap, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { ReactNode, useState, useEffect } from "react";

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
      // Very light floating animation - 3px up and down
      const newOffset = Math.sin(Date.now() / 3000 + delay) * 3;
      setFloatOffset(newOffset);
    }, 50);

    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div
      id={id}
      className={`absolute flex items-center gap-4 rounded-full bg-white py-3 pl-3 pr-6 shadow-[0_10px_30px_-8px_rgba(37,99,235,0.25)] transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.03] hover:shadow-[0_20px_50px_-8px_rgba(13,148,136,0.3)] ${className}`}
      style={{
        transform: isHovered 
          ? `scale(1.03) translateY(${floatOffset}px)` 
          : `translateY(${floatOffset}px)`,
        border: isHovered ? '2px solid #0D9488' : '2px solid transparent',
        boxShadow: isHovered 
          ? '0 20px 50px -8px rgba(13,148,136,0.3)' 
          : '0 10px 30px -8px rgba(37,99,235,0.25)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      <div 
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
        style={{
          backgroundColor: isHovered ? '#ECFDF5' : '#EFF6FF',
        }}
      >
        <div 
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full transition-colors duration-300 text-white"
          style={{
            backgroundColor: isHovered ? '#0D9488' : '#3B82F6',
          }}
        >
          {icon}
        </div>
      </div>
      <div className="whitespace-nowrap leading-tight">
        <p 
          className="text-2xl font-extrabold transition-colors duration-300"
          style={{
            color: isHovered ? '#0D9488' : '#3B82F6',
          }}
        >
          {value}
        </p>
        <p className="text-base font-bold text-slate-800">{label}</p>
      </div>
    </div>
  );
}

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

  // SVG line colors based on hover - Blue default, Green on hover
  const getLineColor = () => {
    return hoveredId ? '#0D9488' : '#3B82F6';
  };

  const getLineOpacity = () => {
    return hoveredId ? '0.8' : '0.5';
  };

  const getDotColor = () => {
    return hoveredId ? '#0D9488' : '#3B82F6';
  };

  return (
    <section 
      id="stats-section"
      className="relative mx-auto flex min-h-[670px] w-full max-w-[960px] items-center justify-center bg-gradient-to-b from-blue-50/40 to-blue-50/80 py-12 sm:py-20 px-4"
    >
      {/* SVG connecting lines - hidden on mobile */}
      {!isMobile && (
        <svg
          viewBox="0 0 960 670"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Line to top-left stat */}
          <line 
            x1="480" 
            y1="365" 
            x2="190" 
            y2="220" 
            stroke={getLineColor()}
            strokeWidth="2.5" 
            opacity={getLineOpacity()}
            strokeDasharray="6,4"
          />
          
          {/* Line to top-right stat */}
          <line 
            x1="480" 
            y1="365" 
            x2="770" 
            y2="210" 
            stroke={getLineColor()}
            strokeWidth="2.5" 
            opacity={getLineOpacity()}
            strokeDasharray="6,4"
          />
          
          {/* Line to bottom-right stat */}
          <line 
            x1="480" 
            y1="365" 
            x2="790" 
            y2="520" 
            stroke={getLineColor()}
            strokeWidth="2.5" 
            opacity={getLineOpacity()}
            strokeDasharray="6,4"
          />
          
          {/* Line to bottom-left stat */}
          <line 
            x1="480" 
            y1="365" 
            x2="170" 
            y2="510" 
            stroke={getLineColor()}
            strokeWidth="2.5" 
            opacity={getLineOpacity()}
            strokeDasharray="6,4"
          />

          {/* Small dots at line endpoints */}
          <circle cx="190" cy="220" r="3.5" fill={getDotColor()} opacity={getLineOpacity()} />
          <circle cx="770" cy="210" r="3.5" fill={getDotColor()} opacity={getLineOpacity()} />
          <circle cx="790" cy="520" r="3.5" fill={getDotColor()} opacity={getLineOpacity()} />
          <circle cx="170" cy="510" r="3.5" fill={getDotColor()} opacity={getLineOpacity()} />
          
          {/* Center dot */}
          <circle 
            cx="480" 
            cy="365" 
            r="6" 
            fill={hoveredId ? '#0D9488' : '#3B82F6'} 
            opacity="0.9" 
          />
          <circle 
            cx="480" 
            cy="365" 
            r="14" 
            fill={hoveredId ? '#0D9488' : '#3B82F6'} 
            opacity="0.12" 
          />
        </svg>
      )}

      {/* heading */}
      <div className="absolute top-6 left-1/2 w-full -translate-x-1/2 text-center px-4">
        <h2 className="text-[clamp(24px,3vw,42px)] font-bold leading-tight">
          <span className="text-slate-900">Why Choose </span>
          <span className="text-blue-600">Aspire College?</span>
        </h2>
        <p className="mt-2 sm:mt-3 text-[13px] sm:text-[15px] text-slate-500">
          Excellence in education, innovation, and student success
        </p>
        <span className="mx-auto mt-2 sm:mt-3 block h-[3px] w-16 sm:w-20 rounded bg-blue-600" />
      </div>

      {/* Desktop Layout */}
      {!isMobile ? (
        <>
          {/* center circle */}
          <div 
            className="relative z-10 flex h-[264px] w-[264px] flex-col items-center justify-center rounded-full border-[3px] border-blue-400 bg-white text-center shadow-[0_10px_40px_-10px_rgba(37,99,235,0.35)] transition-all duration-300"
            style={{
              borderColor: hoveredId ? '#0D9488' : '#3B82F6',
              boxShadow: hoveredId ? '0 10px 40px -10px rgba(13,148,136,0.4)' : '0 10px 40px -10px rgba(37,99,235,0.35)',
            }}
          >
            <GraduationCap className="mb-2 h-12 w-12 text-blue-600" strokeWidth={1.75} />
            <p className="text-2xl font-extrabold leading-tight text-slate-900">ASPIRE</p>
            <p className="text-2xl font-extrabold leading-tight text-blue-600">COLLEGE</p>
            <span className="my-2 block h-px w-14 bg-slate-200" />
            <p className="text-xs italic leading-tight text-slate-400">Shaping Futures,</p>
            <p className="text-xs italic leading-tight text-slate-400">Inspiring Excellence</p>
          </div>

          {/* Stat Cards - Desktop (4 cards only) */}
          <StatCard
            id="stat-top-left"
            icon={<ShieldCheck className="h-6 w-6" strokeWidth={2} />}
            value="25+"
            label={
              <>
                Years
                <br />
                of Excellence
              </>
            }
            className="left-[10%] top-[24%]"
            isHovered={hoveredId === 'stat-top-left'}
            onHover={setHoveredId}
            delay={0}
          />
          <StatCard
            id="stat-top-right"
            icon={<GraduationCap className="h-6 w-6" strokeWidth={2} />}
            value="15+"
            label={
              <>
                Academic
                <br />
                Programs
              </>
            }
            className="right-[8%] top-[21%]"
            isHovered={hoveredId === 'stat-top-right'}
            onHover={setHoveredId}
            delay={0.5}
          />
          <StatCard
            id="stat-bottom-right"
            icon={<TrendingUp className="h-6 w-6" strokeWidth={2} />}
            value="97%"
            label={
              <>
                Success
                <br />
                Rate
              </>
            }
            className="right-[6%] bottom-[20%]"
            isHovered={hoveredId === 'stat-bottom-right'}
            onHover={setHoveredId}
            delay={1}
          />
          <StatCard
            id="stat-bottom-left"
            icon={<Users className="h-6 w-6" strokeWidth={2} />}
            value="40+"
            label={
              <>
                Faculty
                <br />
                Members
              </>
            }
            className="left-[4%] bottom-[22%]"
            isHovered={hoveredId === 'stat-bottom-left'}
            onHover={setHoveredId}
            delay={1.5}
          />
        </>
      ) : (
        /* Mobile Layout - 2 cards top, center circle, 2 cards bottom */
        <div className="flex flex-col items-center w-full max-w-sm mx-auto mt-16">
          {/* Top Row - 2 cards */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <div 
              className="bg-white rounded-2xl p-4 shadow-md text-center border border-blue-100 cursor-pointer hover:border-teal-500 hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => setHoveredId('mobile-top-left')}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderColor: hoveredId === 'mobile-top-left' ? '#0D9488' : '#DBEAFE',
                boxShadow: hoveredId === 'mobile-top-left' ? '0 10px 30px -8px rgba(13,148,136,0.2)' : '0 4px 15px -8px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                <p className="text-xl font-extrabold text-blue-600">25+</p>
              </div>
              <p className="text-xs font-bold text-slate-700">Years of Excellence</p>
            </div>
            <div 
              className="bg-white rounded-2xl p-4 shadow-md text-center border border-blue-100 cursor-pointer hover:border-teal-500 hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => setHoveredId('mobile-top-right')}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderColor: hoveredId === 'mobile-top-right' ? '#0D9488' : '#DBEAFE',
                boxShadow: hoveredId === 'mobile-top-right' ? '0 10px 30px -8px rgba(13,148,136,0.2)' : '0 4px 15px -8px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <p className="text-xl font-extrabold text-blue-600">15+</p>
              </div>
              <p className="text-xs font-bold text-slate-700">Academic Programs</p>
            </div>
          </div>

          {/* Center Circle - Mobile */}
          <div 
            className="relative z-10 flex h-[180px] w-[180px] flex-col items-center justify-center rounded-full border-[3px] border-blue-400 bg-white text-center shadow-[0_10px_40px_-10px_rgba(37,99,235,0.35)] my-4"
            style={{
              borderColor: hoveredId ? '#0D9488' : '#3B82F6',
              boxShadow: hoveredId ? '0 10px 40px -10px rgba(13,148,136,0.4)' : '0 10px 40px -10px rgba(37,99,235,0.35)',
            }}
          >
            <GraduationCap className="mb-1 h-8 w-8 text-blue-600" strokeWidth={1.75} />
            <p className="text-lg font-extrabold leading-tight text-slate-900">ASPIRE</p>
            <p className="text-lg font-extrabold leading-tight text-blue-600">COLLEGE</p>
            <span className="my-1 block h-px w-10 bg-slate-200" />
            <p className="text-[10px] italic leading-tight text-slate-400">Shaping Futures,</p>
            <p className="text-[10px] italic leading-tight text-slate-400">Inspiring Excellence</p>
          </div>

          {/* Bottom Row - 2 cards */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <div 
              className="bg-white rounded-2xl p-4 shadow-md text-center border border-blue-100 cursor-pointer hover:border-teal-500 hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => setHoveredId('mobile-bottom-left')}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderColor: hoveredId === 'mobile-bottom-left' ? '#0D9488' : '#DBEAFE',
                boxShadow: hoveredId === 'mobile-bottom-left' ? '0 10px 30px -8px rgba(13,148,136,0.2)' : '0 4px 15px -8px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <p className="text-xl font-extrabold text-blue-600">40+</p>
              </div>
              <p className="text-xs font-bold text-slate-700">Faculty Members</p>
            </div>
            <div 
              className="bg-white rounded-2xl p-4 shadow-md text-center border border-blue-100 cursor-pointer hover:border-teal-500 hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => setHoveredId('mobile-bottom-right')}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderColor: hoveredId === 'mobile-bottom-right' ? '#0D9488' : '#DBEAFE',
                boxShadow: hoveredId === 'mobile-bottom-right' ? '0 10px 30px -8px rgba(13,148,136,0.2)' : '0 4px 15px -8px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <p className="text-xl font-extrabold text-blue-600">97%</p>
              </div>
              <p className="text-xs font-bold text-slate-700">Success Rate</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}