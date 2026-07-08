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
      className="relative mx-auto flex w-full items-center justify-center bg-white py-10 sm:py-16 px-4" // ✅ Balanced padding
    >
      <div className="relative w-full max-w-[960px] flex items-center justify-center min-h-[580px]"> {/* ✅ Balanced height */}
        {/* SVG connecting lines - hidden on mobile */}
        {!isMobile && (
          <svg
            viewBox="0 0 960 580" // ✅ Balanced viewBox height
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
          >
            {/* Line to top-left stat */}
            <line 
              x1="480" 
              y1="290" // ✅ Center point adjusted
              x2="190" 
              y2="170" 
              stroke={getLineColor()}
              strokeWidth="2.5" 
              opacity={getLineOpacity()}
              strokeDasharray="6,4"
            />
            
            {/* Line to top-right stat */}
            <line 
              x1="480" 
              y1="290" // ✅ Center point adjusted
              x2="770" 
              y2="160" 
              stroke={getLineColor()}
              strokeWidth="2.5" 
              opacity={getLineOpacity()}
              strokeDasharray="6,4"
            />
            
            {/* Line to bottom-right stat */}
            <line 
              x1="480" 
              y1="290" // ✅ Center point adjusted
              x2="790" 
              y2="430" 
              stroke={getLineColor()}
              strokeWidth="2.5" 
              opacity={getLineOpacity()}
              strokeDasharray="6,4"
            />
            
            {/* Line to bottom-left stat */}
            <line 
              x1="480" 
              y1="290" // ✅ Center point adjusted
              x2="170" 
              y2="420" 
              stroke={getLineColor()}
              strokeWidth="2.5" 
              opacity={getLineOpacity()}
              strokeDasharray="6,4"
            />

            {/* Small dots at line endpoints */}
            <circle cx="190" cy="170" r="3.5" fill={getDotColor()} opacity={getLineOpacity()} />
            <circle cx="770" cy="160" r="3.5" fill={getDotColor()} opacity={getLineOpacity()} />
            <circle cx="790" cy="430" r="3.5" fill={getDotColor()} opacity={getLineOpacity()} />
            <circle cx="170" cy="420" r="3.5" fill={getDotColor()} opacity={getLineOpacity()} />
            
            {/* Center dot */}
            <circle 
              cx="480" 
              cy="290" // ✅ Center point adjusted
              r="6" 
              fill={hoveredId ? '#0D9488' : '#3B82F6'} 
              opacity="0.9" 
            />
            <circle 
              cx="480" 
              cy="290" // ✅ Center point adjusted
              r="14" 
              fill={hoveredId ? '#0D9488' : '#3B82F6'} 
              opacity="0.12" 
            />
          </svg>
        )}

        {/* heading - perfectly positioned */}
        <div className="absolute top-4 left-1/2 w-full -translate-x-1/2 text-center px-4"> {/* ✅ Balanced position */}
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
              className="relative z-10 flex h-[230px] w-[230px] flex-col items-center justify-center rounded-full border-[3px] border-blue-400 bg-white text-center shadow-[0_10px_40px_-10px_rgba(37,99,235,0.35)] transition-all duration-300"
              style={{
                borderColor: hoveredId ? '#0D9488' : '#3B82F6',
                boxShadow: hoveredId ? '0 10px 40px -10px rgba(13,148,136,0.4)' : '0 10px 40px -10px rgba(37,99,235,0.35)',
              }}
            >
              <GraduationCap className="mb-2 h-11 w-11 text-blue-600" strokeWidth={1.75} />
              <p className="text-2xl font-extrabold leading-tight text-slate-900">ASPIRE</p>
              <p className="text-2xl font-extrabold leading-tight text-blue-600">COLLEGE</p>
              <span className="my-2 block h-px w-14 bg-slate-200" />
              <p className="text-xs italic leading-tight text-slate-400">Shaping Futures,</p>
              <p className="text-xs italic leading-tight text-slate-400">Inspiring Excellence</p>
            </div>

            {/* Stat Cards - Perfectly balanced positions */}
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
              className="left-[10%] top-[18%]" // ✅ Balanced top position
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
              className="right-[8%] top-[15%]" // ✅ Balanced top position
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
              className="right-[6%] bottom-[15%]" // ✅ Balanced bottom position
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
              className="left-[4%] bottom-[17%]" // ✅ Balanced bottom position
              isHovered={hoveredId === 'stat-bottom-left'}
              onHover={setHoveredId}
              delay={1.5}
            />
          </>
        ) : (
          /* Mobile Layout - Same as before */
          <div className="flex flex-col items-center w-full max-w-sm mx-auto mt-16">
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
      </div>
    </section>
  );
}