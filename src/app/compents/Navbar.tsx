"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Dynamic logo state
  const [logo, setLogo] = useState<string>('/logo.png');

  // ✅ TESTING: Hardcoded college_id
  const collegeId = "8";
  const SESSION_KEY = `navbar_logo_${collegeId}`;
  
  console.log('🏫 [Navbar] College ID (hardcoded):', collegeId);

  // ✅ Check session storage FIRST - synchronously before useEffect runs
  useEffect(() => {
    // ✅ Check if data exists in session storage immediately (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          console.log('📦 [Navbar] Loading logo from session storage (instant)');
          setLogo(parsedData.logo || '/logo.png');
          // ✅ Return early - no API call needed
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    // If no cached data, fetch from API
    async function fetchLogo() {
      try {
        console.log('🔄 [Navbar] Fetching from API...');
        console.log('📡 [Navbar] API URL:', `https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=Navbar`);
        
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=Navbar`);
        console.log('📥 [Navbar] API Response Status:', response.status);
        
        const data = await response.json();
        console.log('📦 [Navbar] API Response Data:', JSON.stringify(data, null, 2));
        
        let logoUrl = '/logo.png';
        
        if (data.success && data.content) {
          console.log('✅ [Navbar] API success, content:', data.content);
          
          if (data.content.logo) {
            console.log('🖼️ [Navbar] Logo found in API:', data.content.logo);
            logoUrl = data.content.logo;
          } else {
            console.log('⚠️ [Navbar] No logo in API response, using default');
          }
        } else {
          console.log('❌ [Navbar] API success false or no content, using default');
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify({ logo: logoUrl }));
        }
        setLogo(logoUrl);
      } catch (error) {
        console.error('❌ [Navbar] Error fetching logo:', error);
        // ✅ Use default logo when API fails
        const fallbackLogo = '/logo.png';
        setLogo(fallbackLogo);
        // ✅ Don't cache failed response - will try again on next visit
      }
    }

    fetchLogo();
  }, [SESSION_KEY]);

  // Nav items - Hardcoded
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/About' },
    { 
      name: 'Programs', 
      path: '/Programms',
      hasDropdown: true,
      align: 'left',
      dropdownItems: [
        { name: 'FSc Pre-Medical', path: '/Programms' },
        { name: 'FSc Pre-Engineering', path: '/Programms' },
        { name: 'FSc General Science', path: '/Programms' },
        { name: 'FA Arts', path: '/Programms' },
        { name: 'ICS (Computer Science)', path: '/Programms' },
      ]
    },
    { 
      name: 'Scholarship', 
      path: '/Scholarships',
      hasDropdown: true,
      align: 'right',
      dropdownItems: [
        { name: 'Merit Based', path: '/Scholarships' },
        { name: 'Need Based', path: '/Scholarships' },
        { name: 'Fully Funded', path: '/Scholarships' },
        { name: 'Hafiz-e-Quran', path: '/Scholarships' },
        { name: 'Sports Achievement', path: '/Scholarships' },
      ]
    },
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

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-wrapper')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleDropdownClick = (path: string) => {
    window.location.href = path;
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  // Always White Theme
  const accentColor = '#2f56fb';
  const navBgColor = '#FFFFFF';
  const navTextColor = '#0a1240';
  const navActiveColor = accentColor;
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
        {/* ① LOGO BLOCK - Instant render with default or cached logo */}
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
              src={logo}
              alt="Logo"
              width={70}
              height={70}
              className="rounded-full w-[70px] h-[70px] object-cover"
              priority
            />
          </div>
        </div>

        {/* ② NAV LINKS - Hardcoded */}
        <div className="hidden md:flex flex-1 h-full items-center gap-0 pl-1 overflow-visible">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const hasDropdown = item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0;
            const isDropdownOpen = openDropdown === item.name;
            const alignRight = item.align === 'right';
            
            return (
              <div
                key={item.name}
                className="dropdown-wrapper relative h-full flex items-center"
                onMouseEnter={() => hasDropdown && handleDropdownEnter(item.name)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  onClick={() => {
                    if (hasDropdown) {
                      setOpenDropdown(isDropdownOpen ? null : item.name);
                    } else {
                      window.location.href = item.path;
                    }
                  }}
                  className={`relative h-full flex items-center whitespace-nowrap text-[13px] lg:text-[14px] font-medium tracking-[0.6px] px-2 lg:px-5 gap-1 cursor-pointer transition-colors duration-200 ${
                    isActive ? 'text-[#2f56fb]' : 'text-[#0a1240] hover:text-[#2f56fb]'
                  }`}
                  style={{
                    fontWeight: isActive ? '600' : '500',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {item.name}
                  {hasDropdown && (
                    <ChevronDown 
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                      style={{ color: isActive ? accentColor : navTextColor }}
                    />
                  )}
                  {isActive && !hasDropdown && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-md"
                      style={{ background: navActiveColor }} />
                  )}
                </button>

                {/* Dropdown Menu */}
                {hasDropdown && isDropdownOpen && (
                  <div 
                    className={`absolute top-full ${alignRight ? 'right-0' : 'left-0'} mt-1 min-w-[220px] rounded-xl shadow-2xl overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[60]`}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(47,86,251,0.1)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.06)',
                      transform: 'translateY(0) scale(1)',
                      opacity: 1,
                      animation: 'dropdownFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                    }}
                  >
                    <div className="py-2">
                      {item.dropdownItems?.map((dropdownItem, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDropdownClick(item.path)}
                          className="w-full text-left px-5 py-2.5 text-[13px] font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-[#F8FAFC] cursor-pointer"
                          style={{
                            color: '#0a1240',
                            fontFamily: "'Inter', sans-serif",
                            animation: `dropdownItemFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s forwards`,
                            opacity: 0,
                            transform: 'translateY(-8px)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = accentColor;
                            e.currentTarget.style.paddingLeft = '24px';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#0a1240';
                            e.currentTarget.style.paddingLeft = '20px';
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2f56fb] opacity-40"></span>
                            {dropdownItem.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <style>{`
            .dropdown-wrapper + .dropdown-wrapper::before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 1px;
              height: 20px;
              background: ${borderColor};
            }
            
            @keyframes dropdownFadeIn {
              from {
                opacity: 0;
                transform: translateY(-12px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            
            @keyframes dropdownItemFadeIn {
              from {
                opacity: 0;
                transform: translateY(-8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>

        {/* ③ RIGHT CONTROLS - Hardcoded */}
        <div className="flex items-center gap-1 sm:gap-3 pr-4 flex-shrink-0 ml-auto">
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
            className="md:hidden w-[42px] h-[42px] rounded-full flex items-center justify-center cursor-pointer mr-2 transition-all duration-300 hover:scale-105"
            style={{
              background: isMobileMenuOpen ? accentColor : 'transparent',
              border: `2px solid ${isMobileMenuOpen ? accentColor : 'rgba(47, 86, 251, 0.3)'}`,
              color: isMobileMenuOpen ? '#FFFFFF' : accentColor,
            }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 transition-transform duration-300 rotate-0" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* ④ MOBILE MENU */}
        <div 
          className={`md:hidden absolute top-[70px] sm:top-[80px] left-0 right-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0 visible pointer-events-auto' 
              : 'opacity-0 -translate-y-8 invisible pointer-events-none'
          }`}
          style={{
            transformOrigin: 'top center',
          }}
        >
          <div 
            className="shadow-2xl border-t-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: 'rgba(47, 86, 251, 0.2)',
              transform: isMobileMenuOpen ? 'scaleY(1)' : 'scaleY(0.9)',
              opacity: isMobileMenuOpen ? 1 : 0,
              borderRadius: isMobileMenuOpen ? '0 0 20px 20px' : '0',
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                const hasDropdown = item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0;
                const isMobileDropdownOpen = openDropdown === item.name;
                
                return (
                  <div key={item.name} className="dropdown-wrapper">
                    <button
                      onClick={() => {
                        if (hasDropdown) {
                          setOpenDropdown(isMobileDropdownOpen ? null : item.name);
                        } else {
                          window.location.href = item.path;
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className={`w-full flex items-center justify-between text-left font-medium text-sm py-3 px-4 rounded-lg cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive 
                          ? 'text-[#2f56fb] bg-[#2f56fb]/10'
                          : 'text-[#0a1240] hover:bg-gray-50'
                      }`}
                      style={{ 
                        fontFamily: "'Inter', sans-serif",
                        transform: isMobileMenuOpen ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.95)',
                        opacity: isMobileMenuOpen ? 1 : 0,
                        transitionDelay: `${index * 80}ms`,
                      }}
                    >
                      <span>
                        {item.name}
                        {isActive && (
                          <span className="ml-2 text-[#2f56fb]">●</span>
                        )}
                      </span>
                      {hasDropdown && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isMobileDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>
                    
                    {/* Mobile Dropdown Items */}
                    {hasDropdown && (
                      <div
                        className={`ml-6 border-l-2 border-[#2f56fb]/20 pl-3 overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isMobileDropdownOpen ? 'max-h-96 opacity-100 space-y-1 mt-1' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {item.dropdownItems?.map((dropdownItem, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              window.location.href = item.path;
                              setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left text-[12px] py-2.5 px-3 rounded-lg text-[#475569] hover:bg-gray-50 hover:text-[#2f56fb] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              transform: isMobileMenuOpen ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.95)',
                              opacity: isMobileMenuOpen ? 1 : 0,
                              transitionDelay: `${(index + idx + 1) * 80}ms`,
                            }}
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-[#2f56fb] opacity-40"></span>
                              {dropdownItem.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}