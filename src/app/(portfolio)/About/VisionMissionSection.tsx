'use client';

import { motion } from 'framer-motion';

export default function VisionMissionSection() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-3 text-center">
      <style>{`
        @media (max-width: 900px) {
          .vm-stage { flex-direction: column; gap: 20px; }
          .vm-blob-left, .vm-blob-right { margin: 0 !important; }
          .vm-connectors { display: none; }
          .vm-center { 
            width: 160px !important; 
            height: 160px !important; 
            margin: 5px 0 !important;
            position: relative !important;
            z-index: 10 !important;
          }
          .vm-center .center-inner {
            inset: 5px !important;
          }
          .vm-center svg {
            width: 20px !important;
            height: 20px !important;
          }
          .vm-center .center-text {
            font-size: 12px !important;
          }
          .vm-blob-left, .vm-blob-right {
            position: relative !important;
            z-index: 1 !important;
          }
          /* Hide icons on mobile */
          .vm-blob-left .icon-wrapper, 
          .vm-blob-right .icon-wrapper {
            display: none !important;
          }
          .vm-blob-left .content, 
          .vm-blob-right .content {
            padding-top: 40px !important;
          }
          .vm-blob-left .title, 
          .vm-blob-right .title {
            margin-top: 10px !important;
          }
        }
        @media (max-width: 600px) {
          .vm-blob-left, .vm-blob-right { 
            width: 100% !important; 
            max-width: 340px; 
          }
          .vm-blob-left svg, .vm-blob-right svg { 
            height: 400px; 
          }
          .vm-center { 
            width: 140px !important; 
            height: 140px !important;
            margin: 0 !important;
            position: relative !important;
            top: -5px !important;
            z-index: 10 !important;
          }
          .vm-center .center-inner {
            inset: 4px !important;
          }
          /* Hide icons on mobile - smaller screens */
          .vm-blob-left .icon-wrapper, 
          .vm-blob-right .icon-wrapper {
            display: none !important;
          }
          .vm-blob-left .content, 
          .vm-blob-right .content {
            padding-top: 45px !important;
          }
          .vm-blob-left .title, 
          .vm-blob-right .title {
            font-size: 18px !important;
            margin-top: 15px !important;
            margin-bottom: 6px !important;
          }
          .vm-blob-left .description, 
          .vm-blob-right .description {
            font-size: 12px !important;
            padding: 0 20px !important;
            max-width: 200px !important;
            line-height: 1.6 !important;
          }
          .vm-blob-left .dots, 
          .vm-blob-right .dots {
            bottom: 15px !important;
          }
        }
        @media (max-width: 400px) {
          .vm-blob-left svg, .vm-blob-right svg { 
            height: 370px; 
          }
          .vm-center { 
            width: 120px !important; 
            height: 120px !important;
            top: -5px !important;
          }
          .vm-blob-left .content, 
          .vm-blob-right .content {
            padding-top: 40px !important;
          }
          .vm-blob-left .title, 
          .vm-blob-right .title {
            font-size: 16px !important;
            margin-top: 10px !important;
          }
          .vm-blob-left .description, 
          .vm-blob-right .description {
            font-size: 11px !important;
            padding: 0 15px !important;
            max-width: 170px !important;
          }
        }
      `}</style>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a1240] cursor-pointer hover:text-[#2f56fb] transition-colors duration-300">
          Vision &amp; <span className="text-[#2f56fb]">Mission</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-[1.8] text-[#3d4566]">
          Driving excellence through visionary leadership and purposeful mission. Our principles
          guide every decision we make and every step we take toward shaping the future of
          education.
        </p>
      </motion.div>

      <div className="vm-stage relative mx-auto flex max-w-[1120px] items-center justify-center">
        {/* Vision blob */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="vm-blob-left relative z-[1] w-[380px] flex-shrink-0 -mr-10 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        >
          <svg
            className="block w-full h-[480px]"
            viewBox="0 0 480 620"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="gGreen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gGreen)"
              d="M90,55
                 C50,55 38,90 38,130
                 L38,480
                 C38,555 75,575 130,575
                 L255,575
                 C298,575 328,558 358,522
                 L432,300
                 L358,90
                 C328,55 298,58 255,58
                 Z"
            />
          </svg>

          <div className="content absolute inset-0 flex -translate-x-3 flex-col items-center pt-14 text-white">
            <div className="icon-wrapper mb-3.5 flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 border-white/40 bg-white/15">
              <div className="icon-inner flex h-14 w-14 items-center justify-center rounded-full bg-white">
                <svg className="h-[26px] w-[26px] text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>
            <h2 className="title mb-3 text-[22px] font-extrabold">Our Vision</h2>
            <p className="description max-w-[230px] px-8 text-[13px] leading-[1.75] text-white/90">
              To be a globally recognized institution that empowers students to become
              innovative leaders, critical thinkers, and responsible citizens who drive
              positive change in an interconnected world.
            </p>
          </div>

          <div className="dots absolute bottom-10 left-[30px] right-[70px] grid grid-cols-10 gap-1.5 opacity-35">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="h-[3px] w-[3px] justify-self-center rounded-full bg-white" />
            ))}
          </div>
        </motion.div>

        {/* Center circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="vm-center relative z-[3] h-[200px] w-[200px] flex-shrink-0 cursor-pointer hover:scale-[1.03] transition-transform duration-300"
        >
          <div className="absolute inset-0 rounded-full border border-[#2f56fb]/25" />
          <div className="absolute inset-3.5 rounded-full border-[1.5px] border-dashed border-[#2f56fb]/35" />
          <div
            className="center-inner absolute inset-7 flex flex-col items-center justify-center rounded-full bg-white"
            style={{ boxShadow: "0 20px 45px rgba(20,40,90,0.08)" }}
          >
            <svg className="mb-2 h-[28px] w-[28px] text-[#2f56fb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 21h16M5 21V10M19 21V10M3 10l9-6 9 6M7 10v4M12 10v4M17 10v4" />
            </svg>
            <div className="center-text text-[15px] font-extrabold text-[#0a1240]">Our Guiding</div>
            <div className="center-text text-[15px] font-extrabold text-[#2f56fb]">Principles</div>
          </div>
        </motion.div>

        {/* Mission blob */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="vm-blob-right relative z-[1] w-[380px] flex-shrink-0 -ml-10 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        >
          <svg
            className="block w-full h-[480px] scale-x-[-1]"
            viewBox="0 0 480 620"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="gBlue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e3fd6" />
                <stop offset="100%" stopColor="#0a1e78" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gBlue)"
              d="M90,55
                 C50,55 38,90 38,130
                 L38,480
                 C38,555 75,575 130,575
                 L255,575
                 C298,575 328,558 358,522
                 L432,300
                 L358,90
                 C328,55 298,58 255,58
                 Z"
            />
          </svg>

          <div className="content absolute inset-0 flex translate-x-3 flex-col items-center pt-14 text-white">
            <div className="icon-wrapper mb-3.5 flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 border-white/40 bg-white/15">
              <div className="icon-inner flex h-14 w-14 items-center justify-center rounded-full bg-white">
                <svg className="h-[26px] w-[26px] text-[#2f56fb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 21V4a1 1 0 0 1 1-1h9l-1.5 4L16 11H6" />
                </svg>
              </div>
            </div>
            <h2 className="title mb-3 text-[22px] font-extrabold">Our Mission</h2>
            <p className="description max-w-[230px] px-8 text-[13px] leading-[1.75] text-white/90">
              To provide transformative education through innovative curricula, world-class
              faculty, and state-of-the-art facilities that foster intellectual growth,
              ethical values, and lifelong learning skills essential for success in the 21st
              century.
            </p>
          </div>

          <div className="dots absolute bottom-10 left-[70px] right-[30px] grid grid-cols-10 gap-1.5 opacity-35">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="h-[3px] w-[3px] justify-self-center rounded-full bg-white" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}