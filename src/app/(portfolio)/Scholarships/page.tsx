"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Scholarship {
  id: number;
  name: string;
  program: string;
  eligibility: string;
  amount: string;
  description: string;
  type: 'merit' | 'need' | 'sports' | 'special' | 'general';
  provider?: string;
  deadline?: string;
  applyLink?: string;
}

const ScholarshipsPage = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // All Scholarships - General Focus
  const allScholarships: Scholarship[] = [
    // General/External Scholarships
    {
      id: 1,
      name: "HEC Need-Based Scholarship",
      program: "All Programs (Public Sector)",
      eligibility: "Family income below ₹1,000,000 annually",
      amount: "Up to 100% Tuition",
      description: "Higher Education Commission scholarship for deserving students across Pakistan. Covers tuition, hostel, and books.",
      type: "general",
      provider: "HEC Pakistan",
      deadline: "June 30, 2025",
      applyLink: "https://hec.gov.pk/scholarships"
    },
    {
      id: 2,
      name: "PEEF Scholarship",
      program: "All Programs (Punjab)",
      eligibility: "Punjab domicile, family income below ₹800,000",
      amount: "Full Tuition + Stipend",
      description: "Punjab Educational Endowment Fund provides scholarships to talented and deserving students across Punjab.",
      type: "general",
      provider: "PEEF Pakistan",
      deadline: "August 15, 2025",
      applyLink: "https://peef.org.pk"
    },
    {
      id: 3,
      name: "Pakistan Bait-ul-Mal Scholarship",
      program: "All Programs",
      eligibility: "Orphan students, family income below ₹600,000",
      amount: "Full Fee Coverage",
      description: "National scholarship program for orphans and deserving students through Bait-ul-Mal across Pakistan.",
      type: "general",
      provider: "Pakistan Bait-ul-Mal",
      deadline: "December 31, 2025",
      applyLink: "https://baitulmal.gov.pk"
    },
    {
      id: 4,
      name: "Benazir Income Support Program (BISP)",
      program: "All Programs",
      eligibility: "BISP registered families, income below ₹500,000",
      amount: "Quarterly Stipend",
      description: "Government program providing financial support to students from BISP registered families.",
      type: "general",
      provider: "Government of Pakistan",
      deadline: "Open - Apply Anytime",
      applyLink: "https://bisp.gov.pk"
    },
    {
      id: 5,
      name: "Coca-Cola Pakistan Scholarship",
      program: "All Programs",
      eligibility: "Academic excellence & financial need",
      amount: "Varies (50-100%)",
      description: "Corporate scholarship program for talented students across Pakistan. Focuses on leadership and academic merit.",
      type: "general",
      provider: "Coca-Cola Pakistan",
      deadline: "March 31, 2025",
      applyLink: "https://coca-colascholarship.pk"
    },
    {
      id: 6,
      name: "Sindh Education Foundation (SEF)",
      program: "All Programs (Sindh)",
      eligibility: "Sindh domicile, family income below ₹700,000",
      amount: "Full Tuition + Books",
      description: "Sindh Education Foundation provides comprehensive scholarships to students from underprivileged backgrounds.",
      type: "general",
      provider: "SEF Pakistan",
      deadline: "September 30, 2025",
      applyLink: "https://sef.org.pk"
    },
    {
      id: 7,
      name: "KPK Education Endowment Fund",
      program: "All Programs (KPK)",
      eligibility: "KPK domicile, 70%+ marks, income below ₹600,000",
      amount: "Full Tuition Fee",
      description: "KPK Education Endowment Fund scholarships for talented students of Khyber Pakhtunkhwa province.",
      type: "general",
      provider: "KPK Government",
      deadline: "October 15, 2025",
      applyLink: "https://kpk.gov.pk/scholarships"
    },
    {
      id: 8,
      name: "Balochistan Education Endowment Fund",
      program: "All Programs (Balochistan)",
      eligibility: "Balochistan domicile, 65%+ marks",
      amount: "Full Tuition + Stipend",
      description: "Balochistan Education Endowment Fund scholarships for students of Balochistan province.",
      type: "general",
      provider: "Balochistan Government",
      deadline: "November 30, 2025",
      applyLink: "https://beef.gov.pk"
    },
    // Additional General Scholarships
    {
      id: 9,
      name: "Merit Excellence Scholarship",
      program: "All Programs",
      eligibility: "95%+ marks in Matriculation",
      amount: "100% Tuition Fee",
      description: "Awarded to top-performing students demonstrating exceptional academic achievement.",
      type: "merit",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },
    {
      id: 10,
      name: "Science Talent Scholarship",
      program: "FSc & ICS",
      eligibility: "90%+ marks in Science subjects",
      amount: "75% Tuition Fee",
      description: "For students with outstanding performance in science and mathematics.",
      type: "merit",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },
    {
      id: 11,
      name: "Sports Achievement Scholarship",
      program: "All Programs",
      eligibility: "District/Provincial level sports recognition",
      amount: "50-100% Tuition Fee",
      description: "Support for athletes representing college in competitive sports.",
      type: "sports",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },
    {
      id: 12,
      name: "Financial Need Scholarship",
      program: "All Programs",
      eligibility: "Family income below ₹500,000 annually",
      amount: "25-75% Tuition Fee",
      description: "Financial assistance for students from economically challenged backgrounds.",
      type: "need",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },
    {
      id: 13,
      name: "Arts & Humanities Scholarship",
      program: "FA & ICom",
      eligibility: "85%+ marks in Arts/Commerce subjects",
      amount: "50% Tuition Fee",
      description: "Encouraging excellence in arts, humanities, and commerce education.",
      type: "merit",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },
    {
      id: 14,
      name: "Early Admission Scholarship",
      program: "All Programs",
      eligibility: "Application submitted before December 31st",
      amount: "15% Tuition Fee",
      description: "Incentive for early decision and application submission.",
      type: "special",
      provider: "Aspire College",
      deadline: "December 31, 2024"
    }
  ];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Scholarships' },
    { value: 'general', label: 'Government / External' },
    { value: 'merit', label: 'Merit Based' },
    { value: 'need', label: 'Need Based' },
    { value: 'sports', label: 'Sports' },
    { value: 'special', label: 'Special' }
  ];

  // Filter scholarships based on search and type
  const filterScholarships = () => {
    let filtered = allScholarships;

    // Search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.eligibility.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.provider && s.provider.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Type filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(s => s.type === activeFilter);
    }

    return filtered;
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'merit':
        return 'bg-blue-100 text-blue-800';
      case 'need':
        return 'bg-green-100 text-green-800';
      case 'sports':
        return 'bg-purple-100 text-purple-800';
      case 'special':
        return 'bg-orange-100 text-orange-800';
      case 'general':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const filteredScholarships = filterScholarships();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  // Colors
  const TEAL_600 = '#0D9488';

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 pt-[85px] sm:pt-[95px]">
      {/* Hero Section with Background Image */}
      <section ref={heroRef} className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
            alt="Scholarships"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              Scholarships & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EEAD4] to-[#0D9488]">Financial Aid</span>
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              Explore available scholarships and financial support opportunities for your education
            </motion.p>

            {/* Search Input */}
            <motion.div 
              className="max-w-2xl mx-auto mt-8"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search scholarships by name, program, or provider..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3.5 pr-12 rounded-full bg-white/95 backdrop-blur-sm text-[#1E293B] placeholder-[#64748B] border-0 focus:ring-2 focus:ring-[#0D9488] shadow-lg transition-all duration-300 cursor-pointer"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#64748B] hover:text-[#1E293B] transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="text-left mt-2">
                  <span className="text-sm text-gray-300">
                    Found {filteredScholarships.length} scholarships
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scholarships Table Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Filter & Results Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-[#475569]">Filter by:</label>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-4 py-2 rounded-full border border-[#E2E8F0] bg-white text-[#1E293B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488] cursor-pointer"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-[#64748B] bg-[#F8FAFC] px-4 py-2 rounded-full border border-[#E2E8F0]">
              Showing <span className="font-semibold text-[#1E293B]">{filteredScholarships.length}</span> scholarships
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-[#1E293B]">Scholarship Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#1E293B]">Program</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#1E293B]">Provider</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#1E293B]">Eligibility</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#1E293B]">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#1E293B]">Deadline</th>
                  <th className="text-left py-4 px-6 font-semibold text-[#1E293B]">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredScholarships.map((scholarship, index) => (
                  <motion.tr
                    key={scholarship.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                    className="border-b border-gray-100 hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6 font-medium text-[#1E293B]">{scholarship.name}</td>
                    <td className="py-4 px-6 text-[#475569]">{scholarship.program}</td>
                    <td className="py-4 px-6 text-[#475569]">{scholarship.provider || 'N/A'}</td>
                    <td className="py-4 px-6 text-[#475569] max-w-[200px] truncate">{scholarship.eligibility}</td>
                    <td className="py-4 px-6 font-semibold text-[#0D9488]">{scholarship.amount}</td>
                    <td className="py-4 px-6 text-[#475569]">{scholarship.deadline || 'N/A'}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(scholarship.type)}`}>
                        {getTypeLabel(scholarship.type)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#475569] text-lg">No scholarships found matching your criteria.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                className="mt-4 px-6 py-2 text-white rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: TEAL_600 }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0F766E'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = TEAL_600; }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ScholarshipsPage;