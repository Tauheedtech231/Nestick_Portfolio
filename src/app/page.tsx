"use client";

import React from "react";
import Home from "./(portfolio)/Home/page";
import AboutSection from "./AboutSection";
import ProgramsSection from "./ProgramsSection";

import FacultySection from "./FacultySection";
import ScholarshipSection from "./ScholarshipSection";
import { motion, Variants } from "framer-motion";

const sectionVariants:Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 scroll-smooth overflow-x-hidden">
      {/* Home Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Home />
      </motion.div>

      {/* All Sections - Fully Independent Components */}
      <AboutSection />
      <ProgramsSection />
      
      <FacultySection />
      <ScholarshipSection />
      
    </div>
  );
}