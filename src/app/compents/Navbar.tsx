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
  const accentColor = '#1E40AF'; // Dark Blue
  const navBgColor = '#FFFFFF'; // Always White
  const navTextColor = '#1E293B'; // Dark text
  const navActiveColor = accentColor;
  const menuBgColor = '#FFFFFF';
  const borderColor = 'rgba(30, 64, 175, 0.15)';

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-2 sm:px-4`}
      style={{
        paddingTop: '10px',
        paddingBottom: '10px',
        background: 'transparent',
      }}
    >
      <div 
        className="w-full max-w-[1300px] h-[70px] sm:h-[80px] rounded-[16px] sm:rounded-[20px] flex items-center relative overflow-visible"
        style={{
          background: navBgColor,
          boxShadow: isScrolled ? '0 6px 40px rgba(0,0,0,0.15)' : '0 6px 40px rgba(0,0,0,0.1)',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ① LOGO BLOCK */}
        <div 
          className="h-full rounded-l-[16px] sm:rounded-l-[20px] flex items-center gap-3 sm:gap-4 flex-shrink-0"
          style={{
            background: 'transparent',
            padding: '0 12px 0 12px',
          }}
        >
          <div 
            className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => window.location.href = '/'}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={56}
              height={56}
              className="rounded-full w-[56px] h-[56px] object-cover"
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
                className="relative h-full flex items-center whitespace-nowrap text-[11px] lg:text-[13px] font-medium tracking-[0.6px] px-2 lg:px-5 cursor-pointer"
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
        <div className="flex items-center gap-1 sm:gap-3 pr-2 sm:pr-4 flex-shrink-0 ml-auto">
          {/* Apply Now Button - Redirects to /Admission */}
          <Link
            href="/Admission"
            style={{
              background: accentColor,
              color: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              padding: '8px 16px',
              borderRadius: '28px',
              fontSize: '13px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span>Apply Now</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-[34px] h-[34px] sm:w-[42px] sm:h-[42px] rounded-full border-2 flex items-center justify-center cursor-pointer"
            style={{
              borderColor: 'rgba(30, 64, 175, 0.3)',
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
          className={`md:hidden absolute top-[75px] sm:top-[90px] left-2 right-2 sm:left-4 sm:right-4 overflow-hidden transition-all duration-200 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10px] pointer-events-none'
          }`}
          style={{
            display: isMobileMenuOpen ? 'block' : 'none',
          }}
        >
          <div className="rounded-xl shadow-2xl border overflow-hidden"
            style={{
              backgroundColor: menuBgColor,
              borderColor: 'rgba(30, 64, 175, 0.2)',
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
                        ? 'text-[#1E40AF] bg-[#1E40AF]/10'
                        : 'text-gray-700 hover:bg-gray-100'
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