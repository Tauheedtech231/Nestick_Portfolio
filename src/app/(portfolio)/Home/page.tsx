/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Stats from "./Stats";

interface SlideData {
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  ctaLink: string;
  desktopImage: string;
  mobileImage: string;
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // ✅ Dynamic state - initialize with default slides
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const bgColor = '#F8FAFC';
  const accentColor = '#0D9488';

  // ✅ Hardcoded college ID for testing
  const collegeId = "8";
  const SESSION_KEY = `hero_slides_${collegeId}`;

  // ✅ Get default slides
  const getDefaultSlides = (): SlideData[] => [
    {
      eyebrow: "Welcome To",
      title: "Nestick College",
      desc: "Leading educational institution in Pakistan. We offer innovative learning, cutting-edge research, and a commitment to global impact.",
      cta: "Get Started",
      ctaLink: "/admission",
      desktopImage: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      mobileImage: "https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      eyebrow: "Our Programs",
      title: "Academic Excellence",
      desc: "Explore our diverse range of academic programs designed to nurture future leaders and innovators.",
      cta: "View Programs",
      ctaLink: "/programs",
      desktopImage: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      mobileImage: "https://plus.unsplash.com/premium_photo-1691962725086-d1590e379139?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D"
    },
    {
      eyebrow: "Campus Life",
      title: "Beyond Academics",
      desc: "Experience vibrant campus life with state-of-the-art facilities, clubs, and extracurricular activities.",
      cta: "Explore Campus",
      ctaLink: "/student-life",
      desktopImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      mobileImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D"
    }
  ];

  // ✅ Fetch hero slides from API with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (synchronous)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [Hero] Loading from session storage (instant)');
          const parsedData = JSON.parse(cachedData);
          setSlides(parsedData);
          setLoading(false);
          // ✅ Return early - no API call needed
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    // If no cached data, fetch from API
    async function fetchHeroData() {
      try {
        console.log('🔄 [Hero] Fetching data for college ID:', collegeId);
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=Hero`);
        const data = await response.json();
        console.log('📦 [Hero] API Response:', data);

        let mappedSlides;
        if (data.success && data.content && data.content.slides) {
          const apiSlides = data.content.slides;
          console.log('✅ [Hero] Slides from API:', apiSlides.length);
          
          mappedSlides = apiSlides.map((slide: any) => ({
            eyebrow: slide.eyebrow || '',
            title: slide.title || '',
            desc: slide.desc || '',
            cta: slide.cta || '',
            ctaLink: slide.ctaLink || '',
            desktopImage: slide.desktopImage || slide.image || '',
            mobileImage: slide.mobileImage || ''
          }));
          
          console.log('✅ [Hero] Mapped slides:', mappedSlides);
        } else {
          console.log('⚠️ [Hero] No API slides, using fallback');
          mappedSlides = getDefaultSlides();
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(mappedSlides));
        }
        setSlides(mappedSlides);
      } catch (error) {
        console.error('❌ [Hero] Error fetching:', error);
        const fallbackSlides = getDefaultSlides();
        // ✅ Don't cache failed response
        setSlides(fallbackSlides);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroData();
  }, [SESSION_KEY]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto slide
  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        if (isMobile) {
          setIsTransitioning(true);
          setCurrentSlide((prev) => (prev + 1) % slides.length);
          setTimeout(() => setIsTransitioning(false), 800);
        } else {
          if (isFullScreen) {
            setIsFullScreen(false);
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setTimeout(() => setIsTransitioning(false), 800);
          } else {
            setIsFullScreen(true);
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 800);
          }
        }
      }
    }, isMobile ? 3000 : 5000);
    return () => clearInterval(interval);
  }, [isFullScreen, isTransitioning, isMobile, slides.length]);

  const handlePrev = () => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    
    if (isMobile) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 800);
      return;
    }
    
    setIsFullScreen(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handleNext = () => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    
    if (isMobile) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 800);
      return;
    }
    
    if (!isFullScreen) {
      setIsFullScreen(true);
      setTimeout(() => setIsTransitioning(false), 800);
    } else {
      setIsFullScreen(false);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  const splitIntoSentences = (text: string) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    return sentences.map(s => s.trim());
  };

  const splitIntoWords = (text: string) => {
    return text.split(' ');
  };

  // ✅ Show loading only on first visit (no cache)
  if (loading && slides.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2f56fb] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // No slides state (should never happen with defaults)
  if (slides.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <p className="text-gray-500">No slides available</p>
        </div>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];
  const sentences = splitIntoSentences(currentSlideData.desc);
  const words = splitIntoWords(currentSlideData.desc);

  // ✅ Consistent brand colors - EXACTLY same as Navbar
  const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color (same as Navbar)
  const PRIMARY_DARK = '#1530b0'; // Darker blue for hover (same as Navbar)
  const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights

  return (
    <div className={`min-h-screen flex flex-col pt-[40px] sm:pt-[80px]`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Hero Section - Height 100% full viewport */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden"
        style={{ backgroundColor: '#101820' }}
      >
        {/* ✅ Mobile Background Image - Dynamic from API */}
        <div
          className="absolute inset-0 transition-all duration-800 ease-in-out z-0 md:hidden"
          style={{
            opacity: isMobile ? 1 : 0,
            transform: 'scale(1)',
          }}
        >
          <Image
            src={currentSlideData.mobileImage || currentSlideData.desktopImage}
            alt={currentSlideData.title}
            fill
            className="object-cover"
            priority
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)'
            }}
          />
        </div>

        {/* ✅ Desktop Background Image - Dynamic from API */}
        <div
          className="absolute inset-0 transition-all duration-800 ease-in-out z-0 hidden md:block"
          style={{
            opacity: isFullScreen ? 1 : 0,
            transform: isFullScreen ? 'scale(1)' : 'scale(1.1)',
          }}
        >
          <Image
            src={currentSlideData.desktopImage}
            alt={currentSlideData.title}
            fill
            className="object-cover"
            priority
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)'
            }}
          />
        </div>

        {/* Right side image panel - Desktop only */}
        {!isMobile && (
          <div 
            className="absolute top-0 right-0 h-full w-[60%] overflow-hidden transition-all duration-800 ease-in-out z-10 hidden md:block"
            style={{
              clipPath: isFullScreen ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' : 'polygon(28% 0, 100% 0, 100% 100%, 0% 100%)',
              opacity: isFullScreen ? 0 : 1,
            }}
          >
            <div
              className="relative w-full h-full transition-all duration-800 ease-out"
              style={{
                transform: isTransitioning ? 'translateX(100%) scale(0.95)' : 'translateX(0) scale(1)',
                opacity: isTransitioning ? 0 : 1,
              }}
            >
              <Image
                src={currentSlideData.desktopImage}
                alt={currentSlideData.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Left side dark background - desktop only */}
        {!isMobile && (
          <div 
            className="absolute inset-0 z-0 transition-all duration-800 ease-in-out hidden md:block"
            style={{
              opacity: isFullScreen ? 0 : 1,
              background: 'linear-gradient(to right, #101820 0%, #101820 40%, transparent 100%)',
            }}
          />
        )}

        {/* Left Content */}
        <div 
          className="relative z-20 h-full flex flex-col justify-center transition-all duration-800 ease-in-out"
          style={{
            paddingLeft: isMobile ? '6%' : (isFullScreen ? '0' : '8%'),
            paddingRight: isMobile ? '6%' : (isFullScreen ? '0' : '0'),
            alignItems: isMobile ? 'center' : (isFullScreen ? 'center' : 'flex-start'),
            textAlign: isMobile ? 'center' : (isFullScreen ? 'center' : 'left'),
            paddingTop: isMobile ? '20px' : '0',
          }}
        >
          <div 
            className="transition-all duration-800 ease-out"
            style={{
              transform: isTransitioning ? 'translateX(-100px) scale(0.9)' : 'translateX(0) scale(1)',
              opacity: isTransitioning ? 0 : 1,
              maxWidth: isMobile ? '100%' : (isFullScreen ? '800px' : '640px'),
              width: '100%',
              padding: isMobile ? '0' : (isFullScreen ? '0 20px' : '0'),
              marginBottom: isMobile ? '20px' : '0',
            }}
          >
            {/* Eyebrow - Dynamic */}
            <div 
              className="text-[clamp(1.2rem,2.5vw,2.2rem)] font-bold tracking-[2px] uppercase transition-all duration-800 ease-out"
              style={{ 
                color: isMobile ? '#1fb6a6' : (isFullScreen ? '#FFFFFF' : '#1fb6a6'),
                transform: isTransitioning ? 'translateX(-100px) scale(0.9)' : 'translateX(0) scale(1)',
                opacity: isTransitioning ? 0 : 1,
                textShadow: isMobile ? 'none' : (isFullScreen ? '0 2px 20px rgba(0,0,0,0.5)' : 'none'),
              }}
            >
              {currentSlideData.eyebrow}
            </div>
            
            {/* Title - Dynamic */}
            <div 
              className="text-[clamp(2rem,3.5vw,3.8rem)] font-extrabold mt-1 mb-4 leading-[1.1] transition-all duration-800 ease-out"
              style={{
                transform: isTransitioning ? 'translateX(-120px) scale(0.9)' : 'translateX(0) scale(1)',
                opacity: isTransitioning ? 0 : 1,
                transitionDelay: '100ms',
                color: '#FFFFFF',
                textShadow: isMobile ? '0 2px 20px rgba(0,0,0,0.7)' : (isFullScreen ? '0 2px 30px rgba(0,0,0,0.7)' : 'none'),
              }}
            >
              {currentSlideData.title}
            </div>
            
            {/* ✅ Description - Full on Desktop, Word-by-word on Mobile */}
            {isMobile ? (
              <div 
                className="transition-all duration-800 ease-out flex flex-wrap justify-center gap-x-2.5 gap-y-2"
                style={{
                  transform: isTransitioning ? 'translateX(-140px) scale(0.9)' : 'translateX(0) scale(1)',
                  opacity: isTransitioning ? 0 : 1,
                  transitionDelay: '200ms',
                  maxWidth: '100%',
                  margin: '0 auto',
                  padding: '0 2px',
                }}
              >
                {words.map((word, index) => (
                  <span 
                    key={index}
                    className="text-[clamp(1rem,3.5vw,1.2rem)] leading-[1.6]"
                    style={{
                      textShadow: '0 1px 15px rgba(0,0,0,0.7)',
                      color: '#e8edf5',
                      fontWeight: '400',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ) : (
              <div 
                className="transition-all duration-800 ease-out space-y-1"
                style={{
                  transform: isTransitioning ? 'translateX(-140px) scale(0.9)' : 'translateX(0) scale(1)',
                  opacity: isTransitioning ? 0 : 1,
                  transitionDelay: '200ms',
                  margin: isFullScreen ? '0 auto' : '0',
                  maxWidth: isFullScreen ? '600px' : '480px',
                  width: '100%',
                }}
              >
                {/* ✅ Full description on desktop */}
                <div 
                  className="text-[0.95rem] md:text-[1rem] leading-[1.7]"
                  style={{
                    textShadow: isFullScreen ? '0 1px 15px rgba(0,0,0,0.5)' : 'none',
                    color: isFullScreen ? '#FFFFFF' : '#d7dce2',
                  }}
                >
                  {currentSlideData.desc}
                </div>
              </div>
            )}
            
            {/* ✅ Buttons - Larger on desktop, same on mobile */}
            <div
              className="flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-6 transition-all duration-800 ease-out"
              style={{
                transform: isTransitioning ? 'translateX(-160px) scale(0.9)' : 'translateX(0) scale(1)',
                opacity: isTransitioning ? 0 : 1,
                transitionDelay: '300ms',
                justifyContent: isMobile ? 'center' : (isFullScreen ? 'center' : 'flex-start'),
                marginBottom: isMobile ? '5px' : '0',
                flexDirection: isMobile ? 'row' : 'row',
              }}
            >
              <Link href="/Admission">
                <button 
                  className="px-7 md:px-10 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK})`,
                    color: '#FFFFFF',
                    minWidth: isMobile ? '120px' : 'auto',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    padding: isMobile ? '10px 20px' : '14px 36px',
                    boxShadow: '0 12px 28px -8px rgba(47,86,251,0.5)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(47,86,251,0.7)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 12px 28px -8px rgba(47,86,251,0.5)';
                  }}
                >
                  Admission
                </button>
              </Link>
              
              <Link href="/Contact">
                <button 
                  className="px-7 md:px-10 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '2px solid #FFFFFF',
                    minWidth: isMobile ? '120px' : 'auto',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    padding: isMobile ? '10px 20px' : '14px 36px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#101820';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ Navigation Arrows - Hidden on mobile, visible on desktop */}
        {!isMobile && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -translate-y-1/2 z-30 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white text-xl md:text-2xl p-2 md:p-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 flex items-center justify-center"
              disabled={isTransitioning}
              style={{
                left: '2%',
              }}
            >
              &#10094;
            </button>
            
            <button
              onClick={handleNext}
              className="absolute top-1/2 -translate-y-1/2 z-30 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white text-xl md:text-2xl p-2 md:p-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 flex items-center justify-center"
              disabled={isTransitioning}
              style={{
                right: '2%',
              }}
            >
              &#10095;
            </button>
          </>
        )}
      </section>

      {/* Stats Component */}
      <Stats />
    </div>
  );
}