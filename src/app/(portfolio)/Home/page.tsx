"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [currentNews, setCurrentNews] = useState(0);
  const [statsCount, setStatsCount] = useState([0, 0, 0]);
  const [fade, setFade] = useState(true);

  const stats = [
    { value: 42, label: "Top National University", suffix: "#" },
    { value: 150, label: "Academic Programs", suffix: "+" },
    { value: 96, label: "Graduate Placement Rate", suffix: "%" },
  ];

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

  // Auto news slider with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentNews((prev) => (prev + 1) % news.length);
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate stats count-up
  useEffect(() => {
    const interval = setInterval(() => {
      setStatsCount((prev) =>
        prev.map((val, i) => (val < stats[i].value ? val + 1 : val))
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const nextNews = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentNews((prev) => (prev + 1) % news.length);
      setFade(true);
    }, 300);
  };

  const prevNews = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentNews((prev) => (prev - 1 + news.length) % news.length);
      setFade(true);
    }, 300);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
      {/* Header */}
   

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
    <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg hover:from-blue-600 hover:to-blue-800 transition-colors shadow-lg">
      Explore Programs
    </button>
  </Link>

  <Link href="/Contact">
    <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg hover:from-blue-600 hover:to-blue-800 transition-colors shadow-lg">
      Contact Now
    </button>
  </Link>
</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {statsCount[i]}
                  {stat.suffix}
                </p>
                <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Slider */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Campus News
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <div className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <div
                    className="aspect-video w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${news[currentNews].img})` }}
                  />
                  {/* Navigation arrows */}
                  <button
                    onClick={prevNews}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 rounded-full p-3 shadow-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextNews}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 rounded-full p-3 shadow-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {news[currentNews].title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {news[currentNews].desc}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-3">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFade(false);
                    setTimeout(() => {
                      setCurrentNews(index);
                      setFade(true);
                    }, 300);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentNews
                      ? 'bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}