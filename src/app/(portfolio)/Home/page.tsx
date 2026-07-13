"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Stats from "./Stats";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bgColor = '#F8FAFC';
  const accentColor = '#0D9488'; // Teal

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto slide - alternate between right and full screen (5 seconds)
  useEffect(() => {
    // Don't auto-slide on mobile
    if (isMobile) return;
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        if (isFullScreen) {
          // Move to next slide with right position
          setIsFullScreen(false);
          setIsTransitioning(true);
          setCurrentSlide((prev) => (prev + 1) % slides.length);
          setTimeout(() => setIsTransitioning(false), 800);
        } else {
          // Switch to full screen
          setIsFullScreen(true);
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 800);
        }
      }
    }, 5000); // 5 seconds per state
    return () => clearInterval(interval);
  }, [isFullScreen, isTransitioning, isMobile]);

  const slides = [
    {
      eyebrow: "Welcome To",
      title: "Aspire College",
      desc: "Leading educational institution in Pakistan. We offer innovative learning, cutting-edge research, and a commitment to global impact.",
      cta: "Get Started",
      ctaLink: "/admission",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      mobileImage: "https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      eyebrow: "Our Programs",
      title: "Academic Excellence",
      desc: "Explore our diverse range of academic programs designed to nurture future leaders and innovators.",
      cta: "View Programs",
      ctaLink: "/programs",
      image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      mobileImage: "https://plus.unsplash.com/premium_photo-1691962725086-d1590e379139?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D"
    },
    {
      eyebrow: "Campus Life",
      title: "Beyond Academics",
      desc: "Experience vibrant campus life with state-of-the-art facilities, clubs, and extracurricular activities.",
      cta: "Explore Campus",
      ctaLink: "/student-life",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      mobileImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D"
    }
  ];

  // Split description into sentences
  const splitIntoSentences = (text: string) => {
    // Split by period, question mark, or exclamation followed by space
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    return sentences.map(s => s.trim());
  };

  // Split text into chunks of 3 words for mobile
  const splitIntoThreeWords = (text: string) => {
    const words = text.split(' ');
    const chunks = [];
    for (let i = 0; i < words.length; i += 3) {
      chunks.push(words.slice(i, i + 3).join(' '));
    }
    return chunks;
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // On mobile, just change slide
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
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // On mobile, just change slide
    if (isMobile) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 800);
      return;
    }
    
    // If in split view, go to full screen with same image
    if (!isFullScreen) {
      setIsFullScreen(true);
      setTimeout(() => setIsTransitioning(false), 800);
    } else {
      // If in full screen, go to split view with next image
      setIsFullScreen(false);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  // Get sentences for current slide
  const sentences = splitIntoSentences(slides[currentSlide].desc);

  return (
    <div className={`min-h-screen flex flex-col pt-[40px] sm:pt-[80px]`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-85px)] sm:h-[calc(100vh-95px)] min-h-[450px] overflow-hidden"
        style={{ backgroundColor: '#101820' }}
      >
        {/* Mobile Background Image - Only visible on mobile */}
        <div
          className="absolute inset-0 transition-all duration-800 ease-in-out z-0 md:hidden"
          style={{
            opacity: isMobile ? 1 : 0,
            transform: 'scale(1)',
          }}
        >
          <Image
            src={slides[currentSlide].mobileImage}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for text readability on mobile */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)'
            }}
          />
        </div>

        {/* Desktop Background Image - Only visible on desktop */}
        <div
          className="absolute inset-0 transition-all duration-800 ease-in-out z-0 hidden md:block"
          style={{
            opacity: isFullScreen ? 1 : 0,
            transform: isFullScreen ? 'scale(1)' : 'scale(1.1)',
          }}
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          {/* Light overlay for text readability on desktop */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)'
            }}
          />
        </div>

        {/* Right side image panel - Split View Mode (desktop only) */}
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
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Left side dark background - only in split view (desktop only) */}
        {!isMobile && (
          <div 
            className="absolute inset-0 z-0 transition-all duration-800 ease-in-out hidden md:block"
            style={{
              opacity: isFullScreen ? 0 : 1,
              background: 'linear-gradient(to right, #101820 0%, #101820 40%, transparent 100%)',
            }}
          />
        )}

        {/* Left Content - Position changes based on mode */}
        <div 
          className="relative z-20 h-full flex flex-col justify-center transition-all duration-800 ease-in-out"
          style={{
            paddingLeft: isMobile ? '5%' : (isFullScreen ? '0' : '8%'),
            paddingRight: isMobile ? '5%' : (isFullScreen ? '0' : '0'),
            alignItems: isMobile ? 'center' : (isFullScreen ? 'center' : 'flex-start'),
            textAlign: isMobile ? 'center' : (isFullScreen ? 'center' : 'left'),
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
              marginBottom: isMobile ? '60px' : '0', // Add bottom margin on mobile to avoid overlap with arrows
            }}
          >
            <div 
              className="text-[clamp(1.2rem,2.5vw,2.2rem)] font-bold tracking-[2px] uppercase transition-all duration-800 ease-out"
              style={{ 
                color: isMobile ? '#1fb6a6' : (isFullScreen ? '#FFFFFF' : '#1fb6a6'),
                transform: isTransitioning ? 'translateX(-100px) scale(0.9)' : 'translateX(0) scale(1)',
                opacity: isTransitioning ? 0 : 1,
                textShadow: isMobile ? 'none' : (isFullScreen ? '0 2px 20px rgba(0,0,0,0.5)' : 'none'),
              }}
            >
              {slides[currentSlide].eyebrow}
            </div>
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
              {slides[currentSlide].title}
            </div>
            
            {/* Description - Mobile: 3 words per line, Desktop: sentence by sentence */}
            {isMobile ? (
              // Mobile: 3 words per line
              <div 
                className="transition-all duration-800 ease-out space-y-0.5"
                style={{
                  transform: isTransitioning ? 'translateX(-140px) scale(0.9)' : 'translateX(0) scale(1)',
                  opacity: isTransitioning ? 0 : 1,
                  transitionDelay: '200ms',
                  margin: '0 auto',
                  maxWidth: '100%',
                }}
              >
                {splitIntoThreeWords(slides[currentSlide].desc).map((chunk, index) => (
                  <div 
                    key={index}
                    className="text-[0.8rem] leading-[1.4]"
                    style={{
                      textShadow: '0 1px 15px rgba(0,0,0,0.7)',
                      color: '#d7dce2',
                    }}
                  >
                    {chunk}
                  </div>
                ))}
              </div>
            ) : (
              // Desktop: sentence by sentence
              <div 
                className="transition-all duration-800 ease-out space-y-1"
                style={{
                  transform: isTransitioning ? 'translateX(-140px) scale(0.9)' : 'translateX(0) scale(1)',
                  opacity: isTransitioning ? 0 : 1,
                  transitionDelay: '200ms',
                  margin: isFullScreen ? '0 auto' : '0',
                  maxWidth: '480px',
                }}
              >
                {sentences.map((sentence, index) => (
                  <div 
                    key={index}
                    className="text-[0.9rem] md:text-[0.95rem] leading-[1.6]"
                    style={{
                      textShadow: isFullScreen ? '0 1px 15px rgba(0,0,0,0.5)' : 'none',
                      color: isFullScreen ? '#FFFFFF' : '#d7dce2',
                    }}
                  >
                    {sentence}
                  </div>
                ))}
              </div>
            )}
            
            {/* Two Buttons - Admission + Contact Us */}
            <div
              className="flex flex-wrap gap-4 mt-6 transition-all duration-800 ease-out"
              style={{
                transform: isTransitioning ? 'translateX(-160px) scale(0.9)' : 'translateX(0) scale(1)',
                opacity: isTransitioning ? 0 : 1,
                transitionDelay: '300ms',
                justifyContent: isMobile ? 'center' : (isFullScreen ? 'center' : 'flex-start'),
                marginBottom: isMobile ? '10px' : '0', // Add margin bottom on mobile
              }}
            >
              {/* Admission Button - Redirects to /Admission */}
              <Link href="/Admission">
                <button 
                  className="px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                  style={{
                    backgroundColor: accentColor,
                    color: '#FFFFFF',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0F766E';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = accentColor;
                  }}
                >
                  Admission
                </button>
              </Link>
              
              {/* Contact Us Button */}
              <Link href="/contact">
                <button 
                  className="px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '2px solid #FFFFFF',
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

        {/* Navigation Arrows - Same for both mobile and desktop */}
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 z-30 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white text-xl md:text-2xl p-2 md:p-3 rounded-full transition-all duration-300 cursor-pointer left-[2%] hover:scale-110"
          disabled={isTransitioning}
          style={{
            marginTop: isMobile ? '-10px' : '0', // Slight adjustment for mobile
          }}
        >
          &#10094;
        </button>
        
        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 z-30 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white text-xl md:text-2xl p-2 md:p-3 rounded-full transition-all duration-300 cursor-pointer right-[2%] hover:scale-110"
          disabled={isTransitioning}
          style={{
            marginTop: isMobile ? '-10px' : '0', // Slight adjustment for mobile
          }}
        >
          &#10095;
        </button>
      </section>

      {/* Stats Component */}
      <Stats />
    </div>
  );
}