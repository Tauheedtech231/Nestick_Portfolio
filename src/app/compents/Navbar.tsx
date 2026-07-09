"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Nav items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/About' },
    { name: 'Programs', path: '/Programms' },
    { name: 'Scholarship', path: '/Scholarships' },
    { name: 'Admission', path: '/Admission' },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always White Theme
  const accentColor = '#2f56fb'; // Updated to match theme
  const navBgColor = '#FFFFFF';
  const navTextColor = '#0a1240';
  const navActiveColor = accentColor;
  const menuBgColor = '#FFFFFF';
  const borderColor = 'rgba(47, 86, 251, 0.15)';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-0`}
      style={{
        paddingTop: '0px',
        paddingBottom: '0px',
        background: 'transparent',
      }}
    >
      <div 
        className="w-full h-[70px] sm:h-[80px] flex items-center relative overflow-visible"
        style={{
          background: navBgColor,
          boxShadow: isScrolled ? '0 6px 40px rgba(0,0,0,0.15)' : '0 6px 40px rgba(0,0,0,0.1)',
          fontFamily: "'Inter', sans-serif",
          borderRadius: '0px',
        }}
      >
        {/* ① LOGO BLOCK */}
        <div 
          className="h-full flex items-center gap-3 sm:gap-4 flex-shrink-0"
          style={{
            background: 'transparent',
            padding: '0 16px 0 16px',
          }}
        >
          <div 
            className="w-[56px] h-[56px] sm:w-[70px] sm:h-[70px] flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => window.location.href = '/'}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={70}
              height={70}
              className="rounded-full w-[70px] h-[70px] object-cover"
            />
          </div>
        </div>

        {/* ② NAV LINKS */}
        <div className="hidden md:flex flex-1 h-full items-center gap-0 pl-1 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => window.location.href = item.path}
                className="relative h-full flex items-center whitespace-nowrap text-[13px] lg:text-[14px] font-medium tracking-[0.6px] px-2 lg:px-5 cursor-pointer"
                style={{
                  color: isActive ? navActiveColor : navTextColor,
                  fontWeight: isActive ? '600' : '500',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-md"
                    style={{ background: navActiveColor }} />
                )}
              </button>
            );
          })}
          <style>{`
            .nav-links-container-two button + button::before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 1px;
              height: 20px;
              background: ${borderColor};
            }
          `}</style>
        </div>

        {/* ③ RIGHT CONTROLS */}
        <div className="flex items-center gap-1 sm:gap-3 pr-4 flex-shrink-0 ml-auto">
          {/* Apply Now Button */}
          <Link
            href="/Admission"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-7 py-3 text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            Apply Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-[34px] h-[34px] sm:w-[42px] sm:h-[42px] rounded-full border-2 flex items-center justify-center cursor-pointer mr-2"
            style={{
              borderColor: 'rgba(47, 86, 251, 0.3)',
              background: 'transparent',
              color: accentColor,
            }}
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        {/* ④ MOBILE MENU */}
        <div 
          className={`md:hidden absolute top-[70px] sm:top-[80px] left-0 right-0 overflow-hidden transition-all duration-200 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10px] pointer-events-none'
          }`}
          style={{
            display: isMobileMenuOpen ? 'block' : 'none',
          }}
        >
          <div className="shadow-2xl border-t-0 overflow-hidden"
            style={{
              backgroundColor: menuBgColor,
              borderColor: 'rgba(47, 86, 251, 0.2)',
            }}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      window.location.href = item.path;
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left font-medium text-sm py-2.5 px-3 rounded-lg cursor-pointer ${
                      isActive 
                        ? 'text-[#2f56fb] bg-[#2f56fb]/10'
                        : 'text-[#0a1240] hover:bg-gray-100'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}