/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

type NodeData = {
  id: string;
  title: string;
  subtitle: string;
  details: string[];
  color: {
    border: string;
    glow: string;
    avatarBg: string;
    text: string;
  };
  x: number;
  y: number;
  w: number;
};

// ✅ Consistent brand colors - EXACTLY same as Navbar
const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color (same as Navbar)
const PRIMARY_DARK = '#1530b0'; // Darker blue for hover (same as Navbar)
const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights

// Updated color scheme with PRIMARY_COLOR as the main blue
const colors = {
  teal: {
    border: "border-[#0D9488]",
    glow: "shadow-[0_0_35px_-5px_rgba(13,148,136,0.4)]",
    avatarBg: "bg-[#0D9488]",
    text: "text-[#0D9488]",
  },
  blue: {
    border: "border-[#2f56fb]", // ✅ Changed to PRIMARY_COLOR
    glow: "shadow-[0_0_35px_-5px_rgba(47,86,251,0.4)]", // ✅ Changed to PRIMARY_COLOR
    avatarBg: "bg-[#2f56fb]", // ✅ Changed to PRIMARY_COLOR
    text: "text-[#2f56fb]", // ✅ Changed to PRIMARY_COLOR
  },
  tealLight: {
    border: "border-[#14B8A6]",
    glow: "shadow-[0_0_35px_-5px_rgba(20,184,166,0.4)]",
    avatarBg: "bg-[#14B8A6]",
    text: "text-[#14B8A6]",
  },
  blueLight: {
    border: "border-[#60A5FA]",
    glow: "shadow-[0_0_35px_-5px_rgba(96,165,250,0.4)]",
    avatarBg: "bg-[#60A5FA]",
    text: "text-[#60A5FA]",
  },
  tealDark: {
    border: "border-[#0F766E]",
    glow: "shadow-[0_0_35px_-5px_rgba(15,118,110,0.4)]",
    avatarBg: "bg-[#0F766E]",
    text: "text-[#0F766E]",
  },
  blueDark: {
    border: "border-[#1530b0]", // ✅ Changed to PRIMARY_DARK
    glow: "shadow-[0_0_35px_-5px_rgba(21,48,176,0.4)]", // ✅ Changed to PRIMARY_DARK
    avatarBg: "bg-[#1530b0]", // ✅ Changed to PRIMARY_DARK
    text: "text-[#1530b0]", // ✅ Changed to PRIMARY_DARK
  },
};

// ✅ Fixed positions for 6 steps
const positionMap = [
  { x: 600, y: 40, w: 300 },
  { x: 350, y: 240, w: 270 },
  { x: 850, y: 240, w: 270 },
  { x: 190, y: 440, w: 250 },
  { x: 600, y: 440, w: 250 },
  { x: 1010, y: 440, w: 250 },
];

const colorMap = [
  colors.teal,
  colors.blue,      // ✅ Now uses PRIMARY_COLOR (#2f56fb)
  colors.tealLight,
  colors.blueLight,
  colors.tealDark,
  colors.blueDark,  // ✅ Now uses PRIMARY_DARK (#1530b0)
];

const getDefaultNodes = (): NodeData[] => [
  {
    id: "01",
    title: "Register / Login",
    subtitle: "Create your applicant account",
    details: ["Secure account creation", "Email verification", "Profile management"],
    color: colors.teal,
    x: 600,
    y: 40,
    w: 300,
  },
  {
    id: "02",
    title: "Fill Application",
    subtitle: "Complete admission form",
    details: ["Personal information", "Academic history", "Program preferences"],
    color: colors.blue, // ✅ Now uses PRIMARY_COLOR (#2f56fb)
    x: 350,
    y: 240,
    w: 270,
  },
  {
    id: "03",
    title: "Upload Documents",
    subtitle: "Submit certificates & photos",
    details: ["Transcripts", "CNIC/B-Form", "Photographs"],
    color: colors.tealLight,
    x: 850,
    y: 240,
    w: 270,
  },
  {
    id: "04",
    title: "Pay Fee",
    subtitle: "Submit processing fee",
    details: ["Online payment", "Bank challan", "Secure transaction"],
    color: colors.blueLight,
    x: 190,
    y: 440,
    w: 250,
  },
  {
    id: "05",
    title: "Track Status",
    subtitle: "Monitor application online",
    details: ["Real-time updates", "Status notifications", "Review feedback"],
    color: colors.tealDark,
    x: 600,
    y: 440,
    w: 250,
  },
  {
    id: "06",
    title: "Admission Letter",
    subtitle: "Receive official confirmation",
    details: ["Official letter", "Next steps", "Welcome package"],
    color: colors.blueDark, // ✅ Now uses PRIMARY_DARK (#1530b0)
    x: 1010,
    y: 440,
    w: 250,
  },
];

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

const GRID_W = 1200;
const GRID_H = 620;
const MOBILE_GRID_W = 400;
const MOBILE_GRID_H = 920;
const CARD_H = 100;
const MOBILE_CARD_H = 140;

function Card({
  node,
  isHovered,
  onHover,
  onLeave,
  index,
  isMobile,
}: {
  node: NodeData;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  index: number;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        className={`absolute rounded-[20px] border-2 bg-white shadow-lg ${node.color.border} ${node.color.glow}`}
        style={{
          left: pct(node.x, MOBILE_GRID_W),
          top: pct(node.y, MOBILE_GRID_H),
          width: pct(node.w, MOBILE_GRID_W),
          zIndex: 10,
        }}
      >
        <div className="flex items-center gap-4 px-4 py-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md ${node.color.avatarBg}`}
          >
            {node.id}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#1E293B]">{node.title}</p>
            <p className={`truncate text-xs font-medium ${node.color.text}`}>{node.subtitle}</p>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="mt-1 border-t border-[#E2E8F0] pt-3">
            <ul className="space-y-1.5">
              {node.details.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-[#475569]">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${node.color.avatarBg}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`absolute rounded-[20px] border-2 bg-white backdrop-blur-sm transition-all duration-300 ease-out cursor-pointer ${node.color.border} ${
        node.color.glow
      } ${isHovered ? "z-30 scale-[1.04]" : "z-10 scale-100"}`}
      style={{
        left: pct(node.x - node.w / 2, GRID_W),
        top: pct(node.y, GRID_H),
        width: pct(node.w, GRID_W),
        boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center gap-4 px-5 py-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-md cursor-pointer ${node.color.avatarBg}`}
        >
          {node.id}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-bold text-[#1E293B] cursor-pointer">{node.title}</p>
          <p className={`truncate text-xs font-medium cursor-pointer ${node.color.text}`}>{node.subtitle}</p>
        </div>
      </div>

      <div
        className="grid overflow-hidden transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isHovered ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden px-5 pb-4">
          <div className="mt-1 border-t border-[#E2E8F0] pt-3">
            <ul className="space-y-1.5">
              {node.details.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-[#475569] cursor-pointer">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${node.color.avatarBg}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MobileConnections({ isInView }: { isInView: boolean }) {
  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      }
    }
  };

  const connections = [
    { from: 10, to: 160 },
    { from: 160, to: 310 },
    { from: 310, to: 460 },
    { from: 460, to: 610 },
    { from: 610, to: 760 },
  ];

  return (
    <svg
      viewBox={`0 0 ${MOBILE_GRID_W} ${MOBILE_GRID_H}`}
      className="absolute inset-0 h-full w-full pointer-events-none"
      preserveAspectRatio="none"
    >
      <g stroke="#2f56fb" strokeWidth={2.5} strokeOpacity={0.4} strokeLinecap="round">
        {connections.map((conn, idx) => {
          const y1 = conn.from + MOBILE_CARD_H;
          const y2 = conn.to;
          
          return (
            <motion.line
              key={idx}
              x1={185}
              y1={y1}
              x2={185}
              y2={y2}
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              strokeDasharray="4,4"
            />
          );
        })}
        {connections.map((conn, idx) => {
          const y1 = conn.from + MOBILE_CARD_H;
          const y2 = conn.to;
          
          return (
            <motion.polygon
              key={`arrow-${idx}`}
              points={`${185},${y2 - 8} ${180},${y2} ${190},${y2}`}
              fill="#2f56fb"
              opacity={0.4}
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default function AdmissionProcess() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [nodes, setNodes] = useState<NodeData[]>(getDefaultNodes());
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // ✅ Session storage key
  const SESSION_KEY = 'admission_process_8';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ Fetch data from API with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [AdmissionProcess] Loading from session storage (instant)');
          const parsedData = JSON.parse(cachedData);
          setNodes(parsedData);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    async function fetchData() {
      try {
        console.log('🔄 [AdmissionProcess] Fetching data...');
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=8&section_name=Admission`);
        const result = await response.json();
        console.log('📦 [AdmissionProcess] API Response:', result);

        let fetchedNodes;
        if (result.success && result.content && result.content.steps) {
          const steps = result.content.steps;
          console.log('✅ [AdmissionProcess] Steps from API:', steps.length);
          
          // ✅ Map API steps to node format with fixed positions
          fetchedNodes = steps.map((step: any, index: number) => {
            const posIndex = Math.min(index, positionMap.length - 1);
            const colorIndex = Math.min(index, colorMap.length - 1);
            
            return {
              id: step.id || String(index + 1).padStart(2, '0'),
              title: step.title || `Step ${index + 1}`,
              subtitle: step.subtitle || '',
              details: step.details || ['Detail 1', 'Detail 2', 'Detail 3'],
              color: colorMap[colorIndex] || colors.teal,
              x: positionMap[posIndex]?.x || 600,
              y: positionMap[posIndex]?.y || 40,
              w: positionMap[posIndex]?.w || 300,
            };
          });
          
          console.log('✅ [AdmissionProcess] Mapped nodes:', fetchedNodes.length);
        } else {
          console.log('⚠️ [AdmissionProcess] No data, using default');
          fetchedNodes = getDefaultNodes();
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedNodes));
        }
        setNodes(fetchedNodes);
      } catch (error) {
        console.error('❌ [AdmissionProcess] Error:', error);
        // ✅ Don't cache on error
        setNodes(getDefaultNodes());
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const n01 = nodes[0];
  const n02 = nodes[1];
  const n03 = nodes[2];
  const n04 = nodes[3];
  const n05 = nodes[4];
  const n06 = nodes[5];

  const bus1Y = n01?.y + CARD_H + 40 || 140;
  const bus2Y = n02?.y + CARD_H + 40 || 340;

  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      }
    }
  };

  const isAnyHovered = hoveredId !== null;
  
  // ✅ Mobile nodes with proper positioning
  const mobileNodes = nodes.map((node, i) => ({
    ...node,
    x: 50,
    y: 10 + i * 150,
    w: 300,
  }));
  
  const displayNodes = isMobile ? mobileNodes : nodes;
  const gridWidth = isMobile ? MOBILE_GRID_W : GRID_W;
  const gridHeight = isMobile ? MOBILE_GRID_H : GRID_H;

  // ✅ Show loading only on first visit (no cache)
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <div className="relative w-full overflow-visible bg-white py-12 sm:py-16 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading admission process...</p>
        </div>
      </div>
    );
  }

  // ✅ Only show if nodes exist
  if (nodes.length === 0) {
    return (
      <div className="relative w-full overflow-visible bg-white py-12 sm:py-16">
        <div className="text-center text-gray-500">
          <p>No admission steps available</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full overflow-visible bg-white py-12 sm:py-16">
      {!isMobile && (
        <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#2f56fb]/10 blur-[100px]" />
      )}

      <motion.h2 
        className="relative z-10 mb-8 sm:mb-14 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E293B] px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Our{" "}
        <span className="text-[#2f56fb]">
          Admission Process
        </span>
      </motion.h2>

      <div
        className="relative mx-auto w-full max-w-[1200px] px-4"
        style={{ 
          aspectRatio: isMobile ? `${MOBILE_GRID_W} / ${MOBILE_GRID_H}` : `${GRID_W} / ${GRID_H}`,
          minHeight: isMobile ? '920px' : 'auto',
        }}
      >
        {/* SVG Lines - Desktop - Only if nodes exist */}
        {!isMobile && nodes.length >= 6 && n01 && n02 && n03 && n04 && n05 && n06 && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ 
              opacity: isAnyHovered ? 0 : 1,
              zIndex: 5,
            }}
          >
            <svg
              viewBox={`0 0 ${GRID_W} ${GRID_H}`}
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <g stroke="#2f56fb" strokeWidth={2.5} strokeOpacity={0.5} strokeLinecap="round">
                <motion.line
                  x1={n01.x} y1={n01.y + CARD_H} 
                  x2={n01.x} y2={bus1Y}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.line
                  x1={n02.x} y1={bus1Y} 
                  x2={n03.x} y2={bus1Y}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.line
                  x1={n02.x} y1={bus1Y} 
                  x2={n02.x} y2={n02.y}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.line
                  x1={n03.x} y1={bus1Y} 
                  x2={n03.x} y2={n03.y}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.line
                  x1={n02.x} y1={n02.y + CARD_H} 
                  x2={n02.x} y2={bus2Y}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.line
                  x1={n03.x} y1={n03.y + CARD_H} 
                  x2={n03.x} y2={bus2Y}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.line
                  x1={n04.x} y1={bus2Y} 
                  x2={n06.x} y2={bus2Y}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.line
                  x1={n04.x} y1={bus2Y} 
                  x2={n04.x} y2={n04.y}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.line
                  x1={n05.x} y1={bus2Y} 
                  x2={n05.x} y2={n05.y}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.line
                  x1={n06.x} y1={bus2Y} 
                  x2={n06.x} y2={n06.y}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                />
              </g>
            </svg>
          </div>
        )}

        {/* Mobile Connections */}
        {isMobile && <MobileConnections isInView={isInView} />}

        {/* Cards */}
        {displayNodes.map((node, index) => (
          <Card
            key={node.id}
            node={node}
            index={index}
            isHovered={!isMobile && hoveredId === node.id}
            onHover={() => !isMobile && setHoveredId(node.id)}
            onLeave={() => !isMobile && setHoveredId(null)}
            isMobile={isMobile}
          />
        ))}
      </div>

      {isMobile && (
        <motion.p 
          className="text-center text-xs text-[#64748B] mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Scroll to see all steps →
        </motion.p>
      )}
    </div>
  );
}