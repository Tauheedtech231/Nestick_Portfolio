"use client";

import { motion } from 'framer-motion';

export default function VisionMissionSection() {
  const BLUE_600 = '#2563EB';
  const TEAL_600 = '#0D9488';

  return (
    <section className=" bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-3">
            Our Guiding Principles
          </h2>
          <p className="text-base text-[#475569] max-w-2xl mx-auto">
            Driving excellence through visionary leadership and purposeful mission
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Vision Card - Blue */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -6,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="group relative bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] p-8 rounded-[32px] shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer"
          >
            <div className="relative z-10">
              <motion.div 
                className="flex items-center mb-4"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-[#1E293B]">Our Vision</h3>
              </motion.div>
              <p className="text-[#475569] text-base leading-relaxed">
                To be a globally recognized institution that empowers students to become innovative leaders, 
                critical thinkers, and responsible citizens who drive positive change in an interconnected world.
              </p>
            </div>
          </motion.div>

          {/* Mission Card - Teal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -6,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="group relative bg-gradient-to-br from-[#E6F7F5] to-[#CCF2EE] p-8 rounded-[32px] shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer"
          >
            <div className="relative z-10">
              <motion.div 
                className="flex items-center mb-4"
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg className="w-6 h-6 text-[#0D9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-[#1E293B]">Our Mission</h3>
              </motion.div>
              <p className="text-[#475569] text-base leading-relaxed">
                To provide transformative education through innovative curricula, world-class faculty, 
                and state-of-the-art facilities that foster intellectual growth, ethical values, and 
                lifelong learning skills essential for success in the 21st century.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}