'use client';

import { useEffect, useRef } from 'react';

export default function AboutUs() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div id="#about" className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-purple-800 dark:from-blue-950 dark:to-purple-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">About Aspire College</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Shaping futures through excellence in education, innovation, and character building since 1985
          </p>
        </div>
      </section>

      {/* History & Legacy */}
      <section 
        ref={addToRefs}
        className="py-16 bg-gray-50 dark:bg-gray-800 transition-opacity duration-500 opacity-0 translate-y-8"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">History & Legacy</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed">
                Established in 1985, Aspir College has been at the forefront of educational excellence for nearly four decades. 
                What began as a small institution with just 200 students has grown into a premier educational hub serving over 10,000 students annually.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed">
                Our legacy is built on a foundation of academic rigor, innovative teaching methodologies, and a commitment to 
                developing well-rounded individuals who contribute meaningfully to society.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">35+</div>
                  <div className="text-gray-600 dark:text-gray-300">Years of Excellence</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50k+</div>
                  <div className="text-gray-600 dark:text-gray-300">Alumni Worldwide</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
    
                alt="Aspire College Campus" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-blue-900 opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section 
        ref={addToRefs}
        className="py-16 bg-white dark:bg-gray-900 transition-opacity duration-500 opacity-0 translate-y-8"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Vision</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                To be a globally recognized institution that empowers students to become innovative leaders, 
                critical thinkers, and responsible citizens who drive positive change in an interconnected world.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Our Mission</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                To provide transformative education through innovative curricula, world-class faculty, 
                and state-of-the-art facilities that foster intellectual growth, ethical values, and 
                lifelong learning skills essential for success in the 21st century.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations & Affiliations */}
      <section 
        ref={addToRefs}
        className="py-16 bg-gray-50 dark:bg-gray-800 transition-opacity duration-500 opacity-0 translate-y-8"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Recognitions & Partners</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Our commitment to quality education is recognized by leading national and international accreditation bodies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'NAAC A++', desc: 'National Assessment and Accreditation Council' },
              { name: 'UGC', desc: 'University Grants Commission' },
              { name: 'AICTE', desc: 'All India Council for Technical Education' },
              { name: 'ISO 9001:2015', desc: 'Quality Management System Certified' },
            ].map((accreditation, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">✓</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {accreditation.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {accreditation.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">International Affiliations</h3>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {['International University A', 'Global College B', 'World Institute C', 'Education Network D'].map((affiliation, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 px-6 py-3 rounded-lg shadow-sm">
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">{affiliation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}