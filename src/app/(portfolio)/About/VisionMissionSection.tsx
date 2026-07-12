'use client';

import { motion } from 'framer-motion';

export default function VisionMissionSection() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-3 text-center">
      <style>{`
        @media (max-width: 900px) {
          .vm-stage { flex-direction: column; gap: 0; }

          /* Hide the desktop SVG blob + its text, we show a CSS blob instead */
          .blob-svg-desktop,
          .blob-content-desktop,
          .vm-blob-left .dots,
          .vm-blob-right .dots {
            display: none !important;
          }

          .vm-blob-left, .vm-blob-right {
            width: 100% !important;
            max-width: 300px !important;
            height: auto !important;
            margin: 0 auto !important;
          }

          .blob-shape-mobile {
            display: flex !important;
          }

          .vm-blob-left {
            margin-bottom: -34px !important;
            z-index: 1;
          }
          .vm-blob-right {
            margin-top: -34px !important;
            z-index: 1;
          }

          .vm-center {
            width: 160px !important;
            height: 160px !important;
            margin: 0 auto !important;
            position: relative !important;
            z-index: 10 !important;
          }
          .vm-center .center-inner { inset: 5px !important; }
          .vm-center svg { width: 22px !important; height: 22px !important; }
          .vm-center .center-text { font-size: 12px !important; }
        }

        .blob-shape-mobile {
          display: none;
          flex-direction: column;
          align-items: center;
          color: white;
          position: relative;
          padding: 58px 26px 78px;
        }
        .vm-blob-left .blob-shape-mobile {
          background: linear-gradient(160deg, #0d9488 0%, #059669 100%);
          border-radius: 140px 140px 32px 32px / 170px 170px 40px 40px;
        }
        .vm-blob-right .blob-shape-mobile {
          background: linear-gradient(160deg, #1e3fd6 0%, #0a1e78 100%);
          padding: 78px 26px 58px;
          border-radius: 32px 32px 140px 140px / 40px 40px 170px 170px;
        }
        .mobile-icon-wrapper {
          margin-bottom: 12px;
          display: flex;
          height: 66px;
          width: 66px;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          border: 2px solid rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.15);
        }
        .mobile-title {
          margin-bottom: 8px;
          font-size: 19px;
          font-weight: 800;
        }
        .mobile-desc {
          max-width: 220px;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(255,255,255,0.9);
        }

        @media (max-width: 600px) {
          .vm-blob-left, .vm-blob-right { max-width: 270px !important; }
          .blob-shape-mobile { padding: 48px 22px 64px; }
          .vm-blob-right .blob-shape-mobile { padding: 64px 22px 48px; }
          .mobile-icon-wrapper { height: 56px; width: 56px; margin-bottom: 10px; }
          .mobile-title { font-size: 17px; margin-top: 4px; }
          .mobile-desc { font-size: 12px; max-width: 190px; }
          .vm-center {
            width: 140px !important;
            height: 140px !important;
          }
        }

        @media (max-width: 400px) {
          .vm-blob-left, .vm-blob-right { max-width: 240px !important; }
          .blob-shape-mobile { padding: 40px 18px 56px; }
          .vm-blob-right .blob-shape-mobile { padding: 56px 18px 40px; }
          .mobile-icon-wrapper { height: 50px; width: 50px; }
          .mobile-title { font-size: 15px; }
          .mobile-desc { font-size: 11px; max-width: 170px; line-height: 1.6; }
          .vm-center {
            width: 120px !important;
            height: 120px !important;
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
          {/* Desktop SVG shape */}
          <svg
            className="blob-svg-desktop block w-full h-[480px]"
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

          <div className="content blob-content-desktop absolute inset-0 flex -translate-x-3 flex-col items-center pt-14 text-white">
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

          {/* Mobile CSS blob shape (top card, tapers down towards center) */}
          <div className="blob-shape-mobile">
            <div className="mobile-icon-wrapper">
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white">
                <svg className="h-[20px] w-[20px] text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
            </div>
            <h2 className="mobile-title">Our Vision</h2>
            <p className="mobile-desc">
              To be a globally recognized institution that empowers students to become
              innovative leaders, critical thinkers, and responsible citizens.
            </p>
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
            className="blob-svg-desktop block w-full h-[480px] scale-x-[-1]"
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

          <div className="content blob-content-desktop absolute inset-0 flex translate-x-3 flex-col items-center pt-14 text-white">
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

          {/* Mobile CSS blob shape (bottom card, tapers up towards center) */}
          <div className="blob-shape-mobile">
            <h2 className="mobile-title">Our Mission</h2>
            <p className="mobile-desc mb-3">
              To provide transformative education through innovative curricula, world-class
              faculty, and state-of-the-art facilities.
            </p>
            <div className="mobile-icon-wrapper" style={{ marginBottom: 0, marginTop: 4 }}>
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white">
                <svg className="h-[20px] w-[20px] text-[#2f56fb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 21V4a1 1 0 0 1 1-1h9l-1.5 4L16 11H6" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}