'use client';

import { motion, Variants } from 'framer-motion';

const BLUE_600 = '#2563EB';
const TEAL_600 = '#0D9488';

// Animation variants
const walkInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const walkInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15
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

export default function VisionMissionSection() {
  return (
    <section className="relative w-full bg-white py-5 px-4 overflow-hidden">
      <div className="relative max-w-5xl mx-auto text-center z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-[#0a1240] mb-3"
        >
          Our Guiding Principles
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[15px] text-[#3d4566] leading-[1.8] mb-12 max-w-2xl mx-auto"
        >
          Driving excellence through visionary leadership and purposeful mission. Our principles guide every decision we make and every step we take toward shaping the future of education.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-30 justify-center items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {/* Vision Card - Walks from Left */}
          <motion.div
            variants={walkInLeft}
            className="relative w-full sm:w-[320px] min-h-[340px] bg-[#f0fdf4] rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300"
            style={{
              clipPath:
                'path("M0,0 L280,80 Q320,95 320,140 L320,440 Q320,480 290,480 L30,480 Q0,480 0,440 Z")',
            }}
          >
            <div className="px-8 pt-16 pb-10 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: TEAL_600 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-[20px] font-bold mb-4"
                style={{ color: TEAL_600 }}
              >
                Our Vision
              </h3>
              <p className="text-[14px] text-[#3d4566] leading-relaxed max-w-[280px] mx-auto">
                To be a globally recognized institution that empowers
                students to become innovative leaders, critical thinkers,
                and responsible citizens who drive positive change in an
                interconnected world.
              </p>
            </div>
          </motion.div>

          {/* Mission Card - Walks from Right */}
          <motion.div
            variants={walkInRight}
            className="relative w-full sm:w-[320px] min-h-[340px] bg-[#eff6ff] rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-300"
            style={{
              clipPath:
                'path("M320,0 L40,80 Q0,95 0,140 L0,440 Q0,480 30,480 L290,480 Q320,480 320,440 Z")',
            }}
          >
            <div className="px-8 pt-16 pb-10 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: BLUE_600 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.012 1.244h3.22a2.25 2.25 0 002.012-1.244l.256-.512a2.25 2.25 0 012.012-1.244h3.86M12 3v8.25m0 0l-3-3m3 3l3-3"
                  />
                </svg>
              </div>
              <h3
                className="text-[20px] font-bold mb-4"
                style={{ color: BLUE_600 }}
              >
                Our Mission
              </h3>
              <p className="text-[14px] text-[#3d4566] leading-relaxed max-w-[280px] mx-auto">
                To provide transformative education through innovative
                curricula, world-class faculty, and state-of-the-art
                facilities that foster intellectual growth, ethical
                values, and lifelong learning skills essential for
                success in the 21st century.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}