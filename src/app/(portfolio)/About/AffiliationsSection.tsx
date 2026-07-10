'use client';

import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const affiliations = [
  { name: "Higher Education Commission", note: "Recognized by HEC Pakistan" },
  { name: "Pakistan Engineering Council", note: "Accredited by PEC" },
  { name: "Pakistan Medical Commission", note: "Approved by PMC" },
  { name: "University of the Punjab", note: "Affiliated with PU" },
  { name: "National Accreditation Council", note: "Accredited by NAC" },
  { name: "British Council", note: "British Council Partner" },
];

export default function Affiliations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedAffiliation, setSelectedAffiliation] = useState<{ name: string; note: string } | null>(null);

  const handleItemClick = (item: { name: string; note: string }) => {
    setSelectedAffiliation(item);
  };

  const handleCloseModal = () => {
    setSelectedAffiliation(null);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-10"
    >
      <style>{`
        @keyframes marqueeScrollAffil {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track-affil {
          animation: marqueeScrollAffil 26s linear infinite;
        }
        .marquee-track-affil:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track-affil { animation: none; }
        }
      `}</style>

      {/* Heading with Description */}
      <motion.div
        className="relative z-[1] mx-auto max-w-3xl px-5 text-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl font-extrabold text-[#0a1240]"
        >
          Our Affiliations
        </motion.h2>
       
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-[15px] text-[#3d4566] leading-[1.8]"
        >
          Proudly affiliated with leading educational bodies and institutions worldwide, ensuring quality and recognition for our students.
        </motion.p>
      </motion.div>

      {/* Diagonal ribbon slider - No shadow */}
      <div className="relative mt-10 w-[170%] -translate-x-[15%] -rotate-3">
        <div className="overflow-hidden bg-[#2f56fb] py-5 cursor-pointer">
          <div className="marquee-track-affil flex w-max whitespace-nowrap">
            {[0, 1].map((rep) => (
              <div key={rep} className="flex items-center gap-10 px-5" aria-hidden={rep === 1}>
                {affiliations.map((item, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-10 text-lg sm:text-2xl font-extrabold uppercase tracking-wide text-white hover:text-blue-200 transition-colors duration-200"
                    onClick={() => handleItemClick(item)}
                  >
                    {item.name}
                    <span aria-hidden="true">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedAffiliation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl cursor-pointer"
            >
              ✕
            </button>

            {/* Content */}
            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-[#0a1240] mb-3">
                {selectedAffiliation.name}
              </h3>
              <p className="text-[15px] text-[#3d4566] leading-relaxed">
                {selectedAffiliation.note}
              </p>
              <div className="mt-6 w-16 h-1 bg-[#2f56fb] rounded-full mx-auto" />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}