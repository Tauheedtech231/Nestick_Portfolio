"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [currentNews, setCurrentNews] = useState(0);

  const [fade, setFade] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

 const stats = [
    { value: 25, label: "Years of Excellence in Education", suffix: "+" },
    { value: 40, label: "Qualified Faculty Members", suffix: "+" },
    { value: 15, label: "Academic & Professional Programs", suffix: "+" }
   
  ];

  // Counter animation state
  const [statsCount, setStatsCount] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatsCount((prev) =>
        prev.map((val, i) => (val < stats[i].value ? val + 1 : val))
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);



  const news = [
    {
      title: "New Research Center for Sustainable Energy Opens",
      desc: "State-of-the-art facility to advance renewable energy research and innovation.",
      img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
    },
    {
      title: "Student Innovation Wins International Competition",
      desc: "Engineering team develops groundbreaking solution for clean water access.",
      img: "/st.jpg"
    },
    {
      title: "Campus Expansion Breaks Ground",
      desc: "New student center and innovation hub to enhance campus experience.",
      img: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80",
    },
  ];

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // Swipe left - next
      nextNews();
    } else {
      // Swipe right - previous
      prevNews();
    }
  };

  // Auto news slider with fade effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentNews((prev) => (prev + 1) % news.length);
        setFade(true);
      }, 300);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, news.length]);



  const nextNews = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setCurrentNews((prev) => (prev + 1) % news.length);
      setFade(true);
    }, 300);
  }, [news.length]);

  const prevNews = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setCurrentNews((prev) => (prev - 1 + news.length) % news.length);
      setFade(true);
    }, 300);
  }, [news.length]);

  const goToSlide = (index: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrentNews(index);
      setFade(true);
    }, 300);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
      {/* Hero Section */}
      <section
        className="relative flex min-h-[70vh] items-center justify-center bg-cover bg-center py-20 text-white text-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2067&q=80")',
        }}
      >
        <div className="px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Excellence in Education & Innovation
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
            At Aspire College, we nurture future leaders through innovative learning, 
            cutting-edge research, and a commitment to global impact.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/Programms">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Explore Programs
              </button>
            </Link>
            <Link href="/Contact">
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold text-lg hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Contact Now
              </button>
            </Link>
          </div>
        </div>
      </section>

 
<section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose Aspire College?
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-400"
            >
              {/* Animated Value */}
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {statsCount[i]}
                {stat.suffix}
              </div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>


      {/* Enhanced News Slider */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Campus News & Events
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest happenings and achievements at our campus
            </p>
          </div>

          <div 
            className="relative max-w-4xl mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Slider Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {currentNews + 1} / {news.length}
                </span>
                <button
                  onClick={toggleAutoPlay}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isAutoPlaying ? (
                    <PauseIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <PlayIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={prevNews}
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group"
                  aria-label="Previous news"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </button>
                <button
                  onClick={nextNews}
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group"
                  aria-label="Next news"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </button>
              </div>
            </div>

            {/* Slider Content */}
            <div className={`transition-all duration-500 transform ${fade ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="relative group">
                  <div
                    className="aspect-video w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${news[currentNews].img})` }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                    <div 
                      className={`h-full bg-blue-600 transition-all duration-100 ${isAutoPlaying ? 'animate-progress' : ''}`}
                      style={{ 
                        animation: isAutoPlaying ? `progress 5s linear` : 'none',
                        width: isAutoPlaying ? '100%' : '0%'
                      }}
                    />
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                    {news[currentNews].title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {news[currentNews].desc}
                  </p>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <button className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2 group">
                      Read full story
                      <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <div className="flex gap-1">
                      {news.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentNews
                              ? 'bg-blue-600 scale-125'
                              : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                <span className="hidden sm:inline">Swipe or use arrows to navigate</span>
                <span className="inline sm:hidden">Swipe to navigate</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}