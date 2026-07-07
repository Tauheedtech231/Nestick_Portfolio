"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  // Teal Green Theme
  const TEAL = '#0D9488';
  const DARK_BG = '#0a0e1a';

  return (
    <footer className="relative text-white pt-[55px] px-[5%] overflow-hidden" style={{ backgroundColor: DARK_BG }}>
      {/* Footer Grid */}
      <div className="relative z-[2] grid grid-cols-1 md:grid-cols-[1.3fr_0.8fr_1fr] gap-8 max-w-[1200px] mx-auto pb-6">
        {/* Column 1 - Brand */}
        <div>
          <div className="flex items-center gap-[12px] mb-[14px]">
            <div className="relative w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="Aspire College Logo"
                width={48}
                height={48}
                className="rounded-full w-12 h-12 object-cover"
              />
            </div>
            <div>
              <div className="text-[1.4rem] font-bold text-white">Aspire College</div>
              <div className="text-[0.75rem] text-[#a89572]">Empowering Minds. Shaping Futures.</div>
            </div>
          </div>
          <div className="w-10 h-[2px] bg-[#0D9488] my-3" />
          <p className="text-[#9ca3af] text-[0.85rem] leading-[1.6] max-w-[280px] mb-4">
            Aspire College is committed to academic excellence, innovation, and holistic development.
          </p>
          {/* Learn More button removed */}
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <div className="text-[#0D9488] text-[0.75rem] font-bold tracking-[1.5px] mb-4">
            QUICK LINKS
          </div>
          <ul className="list-none space-y-[14px]">
            <li>
              <Link href="/" className="flex items-center gap-2 text-[#e5e7eb] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0D9488]">
                <span className="text-[#0D9488] text-[0.7rem]">&#8250;</span> Home
              </Link>
            </li>
            <li>
              <Link href="/About" className="flex items-center gap-2 text-[#e5e7eb] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0D9488]">
                <span className="text-[#0D9488] text-[0.7rem]">&#8250;</span> About Us
              </Link>
            </li>
            <li>
              <Link href="/Programms" className="flex items-center gap-2 text-[#e5e7eb] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0D9488]">
                <span className="text-[#0D9488] text-[0.7rem]">&#8250;</span> Programs
              </Link>
            </li>
            <li>
              <Link href="/Admission" className="flex items-center gap-2 text-[#e5e7eb] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0D9488]">
                <span className="text-[#0D9488] text-[0.7rem]">&#8250;</span> Admissions
              </Link>
            </li>
            <li>
              <Link href="/Contact" className="flex items-center gap-2 text-[#e5e7eb] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0D9488]">
                <span className="text-[#0D9488] text-[0.7rem]">&#8250;</span> Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Stay Connected */}
        <div>
          <div className="text-[#0D9488] text-[0.75rem] font-bold tracking-[1.5px] mb-4">
            STAY CONNECTED
          </div>
          <p className="text-[#9ca3af] text-[0.8rem] leading-[1.5] mb-4 max-w-[280px]">
            Subscribe to our newsletter for the latest updates and news.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center bg-[#10162a] border border-[#232a40] rounded-[30px] p-[5px] pl-4 mb-5 max-w-[280px]">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#e5e7eb] text-[0.8rem] py-1.5"
              required
            />
            <button
              type="submit"
              className="w-[32px] h-[32px] rounded-full bg-[#0D9488] border-none flex items-center justify-center cursor-pointer flex-shrink-0 transition-opacity hover:opacity-80"
            >
              <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-[#0a0e1a]">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
              </svg>
            </button>
          </form>

          <div className="flex gap-3">
            <a
              href="#"
              className="w-[36px] h-[36px] rounded-full bg-[#10162a] border border-[#232a40] flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#0D9488]"
            >
              <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-white">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-[36px] h-[36px] rounded-full bg-[#10162a] border border-[#232a40] flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#0D9488]"
            >
              <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-white">
                <path d="M22 5.9c-.7.3-1.5.6-2.4.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.8A11.7 11.7 0 0 1 3.2 4.8a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.9A8.3 8.3 0 0 1 2 18.6a11.7 11.7 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-[36px] h-[36px] rounded-full bg-[#10162a] border border-[#232a40] flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#0D9488]"
            >
              <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-white">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4 0 4.8 2.6 4.8 6.1V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-4z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-[36px] h-[36px] rounded-full bg-[#10162a] border border-[#232a40] flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#0D9488]"
            >
              <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-white">
                <path d="M12 2c2.7 0 3 0 4.1.06 1.1.05 1.8.22 2.5.47.7.27 1.2.6 1.8 1.2.6.6.9 1.1 1.2 1.8.25.7.42 1.4.47 2.5.06 1.1.06 1.4.06 4.1s0 3-.06 4.1a7.6 7.6 0 0 1-.47 2.5 5 5 0 0 1-3 3c-.7.25-1.4.42-2.5.47-1.1.06-1.4.06-4.1.06s-3 0-4.1-.06a7.6 7.6 0 0 1-2.5-.47 5 5 0 0 1-3-3 7.6 7.6 0 0 1-.47-2.5C2 15 2 14.7 2 12s0-3 .06-4.1c.05-1.1.22-1.8.47-2.5a5 5 0 0 1 3-3c.7-.25 1.4-.42 2.5-.47C9 2 9.3 2 12 2zm0 1.8c-2.6 0-2.9 0-4 .06-.9.04-1.4.2-1.7.32-.4.16-.7.35-1 .65-.3.3-.5.6-.65 1-.13.33-.28.83-.32 1.7-.05 1.1-.06 1.4-.06 4s0 2.9.06 4c.04.9.2 1.4.32 1.7.16.4.35.7.65 1 .3.3.6.5 1 .65.33.13.83.28 1.7.32 1.1.05 1.4.06 4 .06s2.9 0 4-.06c.9-.04 1.4-.2 1.7-.32.4-.16.7-.35 1-.65.3-.3.5-.6.65-1 .13-.33.28-.83.32-1.7.05-1.1.06-1.4.06-4s0-2.9-.06-4c-.04-.9-.2-1.4-.32-1.7a2.6 2.6 0 0 0-.65-1 2.6 2.6 0 0 0-1-.65c-.33-.13-.83-.28-1.7-.32-1.1-.05-1.4-.06-4-.06zm0 3.4a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zm0 1.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5-2.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Wavy teal line separator - FULL WIDTH */}
      <div className="relative h-[40px] mt-2 w-screen -ml-[5vw]">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#14B8A6" stopOpacity="1" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M0,18 C120,38 200,42 320,36 C460,30 520,12 650,6 C820,-2 950,12 1050,22 C1120,28 1160,26 1200,18"
            stroke="url(#waveGrad)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom bar */}
      <div className="relative z-[2] flex items-center justify-center gap-4 py-3 pb-[22px]">
        <div className="h-[1px] bg-[#232a40] flex-1 max-w-[200px]" />
        <div className="text-center text-[#9ca3af] text-[0.75rem]">
          <span className="text-[#0D9488] text-[0.8rem] block mb-1">&#10022;</span>
          &copy; 2026 Aspire College. All rights reserved.
        </div>
        <div className="h-[1px] bg-[#232a40] flex-1 max-w-[200px]" />
      </div>
    </footer>
  );
}