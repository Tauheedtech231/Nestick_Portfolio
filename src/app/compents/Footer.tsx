"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  const TEAL = '#0D9488';
  const DARK_BG = '#0a0e1a';

  const programs = [
    { name: "FSc Pre-Medical", link: "/programs/fsc-pre-medical" },
    { name: "FSc Pre-Engineering", link: "/programs/fsc-pre-engineering" },
    { name: "ICS", link: "/programs/ics" },
    { name: "I.Com", link: "/programs/i-com" },
    { name: "DAE", link: "/programs/dae" },
    { name: "DIT", link: "/programs/dit" },
  ];

  return (
    <footer className="relative text-white pt-[40px] px-[5%] overflow-hidden" style={{ backgroundColor: DARK_BG }}>
      {/* Footer Grid - Reduced gap */}
      <div className="relative z-[2] grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-6 max-w-[1200px] mx-auto pb-4">
        {/* Column 1 - Brand */}
        <div>
          <div className="flex items-center gap-[10px] mb-[10px]">
            <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="Aspire College Logo"
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
            </div>
            <div>
              <div className="text-[1.4rem] font-bold text-white leading-tight">Aspire College</div>
              <div className="text-[0.7rem] text-[#a89572]">Empowering Minds. Shaping Futures.</div>
            </div>
          </div>
          <div className="w-10 h-[2px] bg-[#0D9488] my-2" />
          <p className="text-[#9ca3af] text-[0.85rem] leading-[1.6] max-w-[320px] mb-3">
            Aspire College is committed to academic excellence, innovation, and holistic development. 
            We provide quality education that empowers students to become leaders, critical thinkers, 
            and responsible citizens.
          </p>
        </div>

        {/* Column 2 - Programs */}
        <div>
          <div className="text-[#0D9488] text-[0.75rem] font-bold tracking-[1.5px] mb-3">
            PROGRAMS
          </div>
          <ul className="list-none space-y-[10px]">
            {programs.map((program) => (
              <li key={program.name}>
                <Link href={program.link} className="flex items-center gap-2 text-[#e5e7eb] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#0D9488]">
                  <span className="text-[#0D9488] text-[0.7rem]">&#8250;</span> {program.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Contact Info - Reduced spacing */}
        <div>
          <div className="text-[#0D9488] text-[0.75rem] font-bold tracking-[1.5px] mb-3">
            CONTACT INFO
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="w-4 h-4 text-[#0D9488] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#9ca3af] text-[0.7rem] font-medium">Address</p>
                <p className="text-[#e5e7eb] text-[0.85rem] leading-relaxed">
                  123 Education Boulevard, Lahore
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaPhone className="w-4 h-4 text-[#0D9488] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#9ca3af] text-[0.7rem] font-medium">Phone</p>
                <a href="tel:+9242111222333" className="text-[#e5e7eb] text-[0.85rem] hover:text-[#0D9488] transition-colors">
                  +92-42-111-222-333
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaEnvelope className="w-4 h-4 text-[#0D9488] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#9ca3af] text-[0.7rem] font-medium">Email</p>
                <a href="mailto:info@aspirecollege.edu.pk" className="text-[#e5e7eb] text-[0.85rem] hover:text-[#0D9488] transition-colors break-all">
                  info@aspirecollege.edu.pk
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaClock className="w-4 h-4 text-[#0D9488] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#9ca3af] text-[0.7rem] font-medium">Office Hours</p>
                <p className="text-[#e5e7eb] text-[0.85rem]">
                  Mon-Fri: 8:00 AM - 6:00 PM
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4 - Stay Connected */}
        <div>
          <div className="text-[#0D9488] text-[0.75rem] font-bold tracking-[1.5px] mb-3">
            STAY CONNECTED
          </div>
          <p className="text-[#9ca3af] text-[0.8rem] leading-[1.4] mb-3 max-w-[280px]">
            Subscribe to our newsletter for latest updates.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center bg-[#10162a] border border-[#232a40] rounded-[30px] p-[5px] pl-4 mb-4 max-w-[280px]">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#e5e7eb] text-[0.8rem] py-1"
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
          
          {/* Social Icons - Slightly smaller */}
          <div className="flex gap-2.5">
            <a
              href="https://facebook.com/aspirecollege"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] rounded-full bg-[#10162a] border border-[#232a40] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#0D9488] hover:scale-110 hover:border-[#0D9488]"
              aria-label="Facebook"
            >
              <FaFacebook className="w-[15px] h-[15px] fill-white" />
            </a>
            <a
              href="https://twitter.com/aspirecollege"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] rounded-full bg-[#10162a] border border-[#232a40] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#0D9488] hover:scale-110 hover:border-[#0D9488]"
              aria-label="Twitter"
            >
              <FaTwitter className="w-[15px] h-[15px] fill-white" />
            </a>
            <a
              href="https://instagram.com/aspirecollege"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] rounded-full bg-[#10162a] border border-[#232a40] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#0D9488] hover:scale-110 hover:border-[#0D9488]"
              aria-label="Instagram"
            >
              <FaInstagram className="w-[15px] h-[15px] fill-white" />
            </a>
            <a
              href="https://linkedin.com/company/aspirecollege"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] rounded-full bg-[#10162a] border border-[#232a40] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#0D9488] hover:scale-110 hover:border-[#0D9488]"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-[15px] h-[15px] fill-white" />
            </a>
            <a
              href="https://youtube.com/aspirecollege"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] rounded-full bg-[#10162a] border border-[#232a40] flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#0D9488] hover:scale-110 hover:border-[#0D9488]"
              aria-label="YouTube"
            >
              <FaYoutube className="w-[15px] h-[15px] fill-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Wavy teal line separator - Reduced height */}
      <div className="relative h-[30px] mt-1 w-screen -ml-[5vw]">
        <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#14B8A6" stopOpacity="1" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M0,15 C120,30 200,34 320,28 C460,22 520,8 650,4 C820,-2 950,10 1050,18 C1120,22 1160,20 1200,15"
            stroke="url(#waveGrad)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom bar - Reduced padding */}
      <div className="relative z-[2] flex items-center justify-center gap-3 py-2 pb-[16px]">
        <div className="h-[1px] bg-[#232a40] flex-1 max-w-[200px]" />
        <div className="text-center text-[#9ca3af] text-[0.75rem]">
          <span className="text-[#0D9488] text-[0.8rem] block mb-0.5">&#10022;</span>
          &copy; 2026 Aspire College. All rights reserved.
        </div>
        <div className="h-[1px] bg-[#232a40] flex-1 max-w-[200px]" />
      </div>
    </footer>
  );
}