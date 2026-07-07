"use client";

import React from "react";
import Link from "next/link";
import Home from "./(portfolio)/Home/page";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

// Define animation variants for scroll
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Left to Right animation
const leftToRightVariants: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Right to Left animation
const rightToLeftVariants: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Scale and fade animation
const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Colors - Blue + Teal Theme
const BLUE_600 = '#2563EB';
const BLUE_700 = '#1D4ED8';
const TEAL_600 = '#0D9488';
const TEAL_700 = '#0F766E';
const LIGHT_BG = '#F8FAFC';
const DARK_TEXT = '#1E293B';

function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 scroll-smooth overflow-x-hidden">
      {/* Home Page Full Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Home />
      </motion.div>

      {/* Preview Sections Container */}
      <div className="max-w-7xl mx-auto">
        {/* About Section - Blue Theme */}
        <motion.section
          className="py-16 px-6 lg:px-8 overflow-hidden"
          style={{ backgroundColor: LIGHT_BG }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={leftToRightVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ 
                backgroundColor: '#DBEAFE',
                color: BLUE_600
              }}
            >
              About Our Institution
            </div>
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: DARK_TEXT }}
            >
              Our Mission & Vision
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              Discover the driving force behind our institutions commitment to 
              excellence, innovation, and student success in a rapidly evolving world.
            </p>
            <Link
              href="/About"
              className="group inline-flex items-center gap-2.5 px-7 py-3 text-base font-semibold text-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              style={{
                backgroundColor: BLUE_600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BLUE_700;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BLUE_600;
              }}
            >
              Explore Our Story
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.section>

        {/* Programs Section - Teal Theme */}
        <motion.section
          className="py-16 px-6 lg:px-8 overflow-hidden bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={rightToLeftVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ 
                backgroundColor: '#E6F7F5',
                color: TEAL_600
              }}
            >
              Academic Excellence
            </div>
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: DARK_TEXT }}
            >
              Comprehensive Programs
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              Choose from a diverse range of undergraduate and graduate programs 
              designed to equip you with the skills needed for tomorrow challenges.
            </p>
            <Link
              href="/Programms"
              className="group inline-flex items-center gap-2.5 px-7 py-3 text-base font-semibold text-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              style={{
                backgroundColor: TEAL_600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = TEAL_700;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = TEAL_600;
              }}
            >
              Browse Programs
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.section>

        {/* Admissions Section - Blue Theme */}
        <motion.section
          className="py-16 px-6 lg:px-8 overflow-hidden"
          style={{ backgroundColor: LIGHT_BG }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ 
                backgroundColor: '#DBEAFE',
                color: BLUE_600
              }}
            >
              Start Your Journey
            </div>
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: DARK_TEXT }}
            >
              Admissions Process
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              Begin your transformative educational journey with us. Learn about 
              admission requirements, deadlines, and how to submit your application.
            </p>
            <Link
              href="/Admission"
              className="group inline-flex items-center gap-2.5 px-7 py-3 text-base font-semibold text-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              style={{
                backgroundColor: BLUE_600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BLUE_700;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BLUE_600;
              }}
            >
              Apply Now
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.section>

        {/* Faculty Section - Teal Theme */}
        <motion.section
          className="py-16 px-6 lg:px-8 overflow-hidden bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={leftToRightVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ 
                backgroundColor: '#E6F7F5',
                color: TEAL_600
              }}
            >
              Expert Educators
            </div>
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: DARK_TEXT }}
            >
              Distinguished Faculty
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              Learn from accomplished scholars and industry professionals dedicated 
              to mentoring and inspiring the next generation of leaders and innovators.
            </p>
            <Link
              href="/Faculty"
              className="group inline-flex items-center gap-2.5 px-7 py-3 text-base font-semibold text-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              style={{
                backgroundColor: TEAL_600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = TEAL_700;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = TEAL_600;
              }}
            >
              Meet Our Faculty
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.section>

        {/* Gallery Section - Blue Theme */}
        <motion.section
          className="py-16 px-6 lg:px-8 overflow-hidden"
          style={{ backgroundColor: LIGHT_BG }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={rightToLeftVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ 
                backgroundColor: '#DBEAFE',
                color: BLUE_600
              }}
            >
              Campus Life
            </div>
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: DARK_TEXT }}
            >
              Campus Gallery
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
              Experience our vibrant campus community through stunning visuals of 
              facilities, events, student life, and academic activities.
            </p>
            <Link
              href="/Gallery"
              className="group inline-flex items-center gap-2.5 px-7 py-3 text-base font-semibold text-white rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              style={{
                backgroundColor: BLUE_600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BLUE_700;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BLUE_600;
              }}
            >
              View Gallery
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Page;