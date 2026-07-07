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

// Teal + Blue Theme - Solid Colors
const colors = {
  teal: {
    border: "border-[#0D9488]",
    glow: "shadow-[0_0_35px_-5px_rgba(13,148,136,0.4)]",
    avatarBg: "bg-[#0D9488]",
    text: "text-[#0D9488]",
  },
  blue: {
    border: "border-[#2563EB]",
    glow: "shadow-[0_0_35px_-5px_rgba(37,99,235,0.4)]",
    avatarBg: "bg-[#2563EB]",
    text: "text-[#2563EB]",
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
    border: "border-[#1D4ED8]",
    glow: "shadow-[0_0_35px_-5px_rgba(29,78,216,0.4)]",
    avatarBg: "bg-[#1D4ED8]",
    text: "text-[#1D4ED8]",
  },
};

const nodes: NodeData[] = [
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
    color: colors.blue,
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
    color: colors.blueDark,
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
const CARD_H = 100;

function Card({
  node,
  isHovered,
  onHover,
  onLeave,
  index,
}: {
  node: NodeData;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  index: number;
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

      {/* details revealed on hover */}
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

export default function AdmissionProcess() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const n01 = nodes[0];
  const n02 = nodes[1];
  const n03 = nodes[2];
  const n04 = nodes[3];
  const n05 = nodes[4];
  const n06 = nodes[5];

  const bus1Y = n01.y + CARD_H + 40;
  const bus2Y = n02.y + CARD_H + 40;

  // Line animation variants with dynamic opacity
  const lineVariants:Variants = {
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

  // Check if any card is hovered
  const isAnyHovered = hoveredId !== null;

  return (
    <div ref={sectionRef} className="relative w-full overflow-visible bg-white py-16">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#0D9488]/10 blur-[100px]" />

      {/* heading */}
      <motion.h2 
        className="relative z-10 mb-14 text-center text-3xl sm:text-4xl font-bold text-[#1E293B]"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Our{" "}
        <span className="text-[#0D9488]">
          Admission Process
        </span>
      </motion.h2>

      {/* chart */}
      <div
        className="relative mx-auto w-full max-w-[1200px] px-4"
        style={{ aspectRatio: `${GRID_W} / ${GRID_H}` }}
      >
        {/* SVG Lines - with dynamic opacity */}
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
            <g stroke="#0D9488" strokeWidth={2.5} strokeOpacity={0.5} strokeLinecap="round">
              {/* tier0 -> bus1 */}
              <motion.line
                x1={n01.x} y1={n01.y + CARD_H} 
                x2={n01.x} y2={bus1Y}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
              {/* bus1 horizontal */}
              <motion.line
                x1={n02.x} y1={bus1Y} 
                x2={n03.x} y2={bus1Y}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
              {/* bus1 -> tier1 tops */}
              <motion.line
                x1={n02.x} y1={bus1Y} 
                x2={n02.x} y2={n02.y}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
              <motion.line
                x1={n03.x} y1={bus1Y} 
                x2={n03.x} y2={n03.y}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />

              {/* tier1 -> bus2 */}
              <motion.line
                x1={n02.x} y1={n02.y + CARD_H} 
                x2={n02.x} y2={bus2Y}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
              <motion.line
                x1={n03.x} y1={n03.y + CARD_H} 
                x2={n03.x} y2={bus2Y}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
              {/* bus2 horizontal */}
              <motion.line
                x1={n04.x} y1={bus2Y} 
                x2={n06.x} y2={bus2Y}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
              {/* bus2 -> tier2 tops */}
              <motion.line
                x1={n04.x} y1={bus2Y} 
                x2={n04.x} y2={n04.y}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
              <motion.line
                x1={n05.x} y1={bus2Y} 
                x2={n05.x} y2={n05.y}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
              <motion.line
                x1={n06.x} y1={bus2Y} 
                x2={n06.x} y2={n06.y}
                variants={lineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              />
            </g>
          </svg>
        </div>

        {/* Cards */}
        {nodes.map((node, index) => (
          <Card
            key={node.id}
            node={node}
            index={index}
            isHovered={hoveredId === node.id}
            onHover={() => setHoveredId(node.id)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </div>
  );
}