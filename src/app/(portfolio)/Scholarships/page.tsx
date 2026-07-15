"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ContactSection from './ContactSection';

interface Scholarship {
  id: number;
  name: string;
  program: string;
  eligibility: string;
  amount: string;
  description: string;
  type: string;
  provider?: string;
  deadline?: string;
  applyLink?: string;
}

interface ScholarshipsPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  scholarships: Scholarship[];
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    merit: 'bg-blue-100 text-blue-800',
    need: 'bg-green-100 text-green-800',
    merit_cum_need: 'bg-teal-100 text-teal-800',
    fully_funded: 'bg-emerald-100 text-emerald-800',
    partial: 'bg-yellow-100 text-yellow-800',
    tuition_waiver: 'bg-indigo-100 text-indigo-800',
    sports: 'bg-purple-100 text-purple-800',
    hafiz: 'bg-amber-100 text-amber-800',
    minority: 'bg-rose-100 text-rose-800',
    disability: 'bg-cyan-100 text-cyan-800',
    orphan: 'bg-orange-100 text-orange-800',
    kinship: 'bg-pink-100 text-pink-800',
    alumni: 'bg-violet-100 text-violet-800',
    sibling: 'bg-fuchsia-100 text-fuchsia-800',
    employee: 'bg-slate-100 text-slate-800',
    research: 'bg-sky-100 text-sky-800',
    international: 'bg-lime-100 text-lime-800',
    exchange: 'bg-cyan-100 text-cyan-800',
    endowment: 'bg-amber-100 text-amber-800',
    talent: 'bg-purple-100 text-purple-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    merit: 'Merit Based',
    need: 'Need Based',
    merit_cum_need: 'Merit-cum-Need',
    fully_funded: 'Fully Funded',
    partial: 'Partial',
    tuition_waiver: 'Tuition Waiver',
    sports: 'Sports',
    hafiz: 'Hafiz-e-Quran',
    minority: 'Minority',
    disability: 'Disability',
    orphan: 'Orphan',
    kinship: 'Kinship',
    alumni: 'Alumni',
    sibling: 'Sibling',
    employee: 'Employee',
    research: 'Research',
    international: 'International',
    exchange: 'Exchange',
    endowment: 'Endowment',
    talent: 'Talent',
  };
  return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
};

const filterOptions = [
  { value: 'all', label: 'All Scholarships' },
  { value: 'merit', label: 'Merit Based' },
  { value: 'need', label: 'Need Based' },
  { value: 'merit_cum_need', label: 'Merit-cum-Need' },
  { value: 'fully_funded', label: 'Fully Funded' },
  { value: 'partial', label: 'Partial' },
  { value: 'tuition_waiver', label: 'Tuition Waiver' },
  { value: 'sports', label: 'Sports' },
  { value: 'hafiz', label: 'Hafiz-e-Quran' },
  { value: 'minority', label: 'Minority' },
  { value: 'disability', label: 'Disability' },
  { value: 'orphan', label: 'Orphan' },
  { value: 'kinship', label: 'Kinship' },
  { value: 'alumni', label: 'Alumni' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'employee', label: 'Employee' },
  { value: 'research', label: 'Research' },
  { value: 'international', label: 'International' },
  { value: 'exchange', label: 'Exchange' },
  { value: 'endowment', label: 'Endowment' },
  { value: 'talent', label: 'Talent' },
];

const getDefaultScholarships = (): Scholarship[] => [
  {
    id: 1,
    name: "Merit Excellence Scholarship",
    program: "All Programs",
    eligibility: "95%+ marks in Matriculation with outstanding academic record",
    amount: "100% Tuition Fee",
    description: "A top scholarship for students with high academic performance.",
    type: "merit",
    provider: "Nestick College",
    deadline: "January 15, 2025"
  },
  {
    id: 2,
    name: "Financial Need Scholarship",
    program: "All Programs",
    eligibility: "Family income below ₹500,000 annually",
    amount: "25-75% Tuition Fee",
    description: "A need-based scholarship for financially deserving students.",
    type: "need",
    provider: "Nestick College",
    deadline: "January 15, 2025"
  },
  {
    id: 3,
    name: "Sports Achievement Scholarship",
    program: "All Programs",
    eligibility: "District/Provincial level sports recognition",
    amount: "50-100% Tuition Fee",
    description: "For students with outstanding sports achievements.",
    type: "sports",
    provider: "Nestick College",
    deadline: "January 15, 2025"
  }
];

export default function ScholarshipsPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [data, setData] = useState<ScholarshipsPageData>({
    heroTitle: 'Scholarships & Financial Aid',
    heroSubtitle: 'Explore available scholarships and financial support opportunities for your education',
    heroImage: '',
    scholarships: getDefaultScholarships()
  });
  const [loading, setLoading] = useState(true);

  // ✅ Session storage key
  const SESSION_KEY = 'scholarships_page_8';

  // ✅ Fetch data from API with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [ScholarshipsPage] Loading from session storage (instant)');
          const parsedData = JSON.parse(cachedData);
          setData(parsedData);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    async function fetchData() {
      try {
        console.log('🔄 [ScholarshipsPage] Fetching data...');
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=8&section_name=Scholarships`);
        const result = await response.json();
        console.log('📦 [ScholarshipsPage] API Response:', result);

        let fetchedData;
        if (result.success && result.content) {
          const content = result.content;
          fetchedData = {
            heroTitle: content.heroTitle || 'Scholarships & Financial Aid',
            heroSubtitle: content.heroSubtitle || 'Explore available scholarships and financial support opportunities for your education',
            heroImage: content.heroImage || '',
            scholarships: content.scholarships || getDefaultScholarships()
          };
          console.log('✅ [ScholarshipsPage] Data loaded, scholarships:', content.scholarships?.length);
        } else {
          console.log('⚠️ [ScholarshipsPage] No data, using default');
          fetchedData = {
            heroTitle: 'Scholarships & Financial Aid',
            heroSubtitle: 'Explore available scholarships and financial support opportunities for your education',
            heroImage: '',
            scholarships: getDefaultScholarships()
          };
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        }
        setData(fetchedData);
      } catch (error) {
        console.error('❌ [ScholarshipsPage] Error:', error);
        setData({
          heroTitle: 'Scholarships & Financial Aid',
          heroSubtitle: 'Explore available scholarships and financial support opportunities for your education',
          heroImage: '',
          scholarships: getDefaultScholarships()
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter scholarships based on search and type
  const filterScholarships = () => {
    let filtered = data.scholarships || [];

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.eligibility.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.provider && s.provider.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (activeFilter !== 'all') {
      filtered = filtered.filter(s => s.type === activeFilter);
    }

    return filtered;
  };

  const filteredScholarships = filterScholarships();

  const clearSearch = () => {
    setSearchTerm('');
  };

  const openDetailModal = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedScholarship(null);
  };

  useEffect(() => {
    if (loading) return;
    
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

  }, [loading]);

  // ✅ Consistent brand colors - EXACTLY same as Navbar
  const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color
  const PRIMARY_DARK = '#1530b0'; // Darker blue for hover
  const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights

  // ✅ Show loading only on first visit (no cache)
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <div className="min-h-screen bg-white transition-colors duration-300 pt-[40px] sm:pt-[80px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading scholarships...</p>
        </div>
      </div>
    );
  }

  return (
   <>
    <div className="min-h-screen bg-white transition-colors duration-300 pt-[40px] sm:pt-[80px] ">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={data.heroImage || "https://plus.unsplash.com/premium_photo-1691962725028-e825955a7c1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Scholarships"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white drop-shadow-lg"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              {data.heroTitle}
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg text-white drop-shadow-lg max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              {data.heroSubtitle}
            </motion.p>

            <motion.div 
              className="max-w-2xl mx-auto mt-8"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
            >
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search scholarships by name, program, or provider..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && filterScholarships()}
                    className="w-full px-6 py-3.5 pr-12 rounded-full bg-white/95 backdrop-blur-sm text-[#1E293B] placeholder-[#64748B] border-0 focus:ring-2 focus:ring-[#2f56fb] shadow-lg transition-all duration-300 cursor-pointer"
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
                <button
                  onClick={() => filterScholarships()}
                  className="px-6 py-3.5 rounded-full text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer flex-shrink-0"
                  style={{ 
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK})`,
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Search
                </button>
              </div>
              {searchTerm && (
                <div className="text-left mt-2">
                  <span className="text-sm text-white drop-shadow-lg">
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-[#475569]">Filter by:</label>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-4 py-2 rounded-full border border-[#E2E8F0] bg-white text-[#1E293B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2f56fb] cursor-pointer"
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
                {filteredScholarships.length > 0 ? (
                  filteredScholarships.map((scholarship, index) => (
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
                      <td 
                        onClick={() => openDetailModal(scholarship)}
                        className="py-4 px-6 text-[#475569] max-w-[200px] truncate cursor-pointer hover:text-[#2f56fb] transition-colors"
                        title="Click to view full eligibility"
                      >
                        <span className="hover:underline">{scholarship.eligibility}</span>
                        <span className="ml-1 text-[#2f56fb] text-xs">[...]</span>
                      </td>
                      <td className="py-4 px-6 font-semibold text-[#2f56fb]">{scholarship.amount}</td>
                      <td className="py-4 px-6 text-[#475569]">{scholarship.deadline || 'N/A'}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(scholarship.type)}`}>
                          {getTypeLabel(scholarship.type)}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-[#475569]">
                      No scholarships found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#475569] text-lg">No scholarships found matching your criteria.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                className="mt-4 px-6 py-2 text-white rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
                style={{ 
                  background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK})`,
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Eligibility Detail Modal */}
      {showDetailModal && selectedScholarship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 rounded-t-2xl border-b border-[#E2E8F0] px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1E293B]">Eligibility Details</h3>
                <p className="text-sm text-[#475569]">{selectedScholarship.name}</p>
              </div>
              <button
                onClick={closeDetailModal}
                className="p-2 rounded-full hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <XMarkIcon className="w-6 h-6 text-[#64748B]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-[#1E293B] mb-2">Scholarship Name</h4>
                <p className="text-[#475569]">{selectedScholarship.name}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#1E293B] mb-2">Eligibility Criteria</h4>
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <p className="text-[#1E293B] text-sm leading-relaxed">
                    {selectedScholarship.eligibility}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#1E293B] mb-2">Program</h4>
                  <p className="text-[#475569] text-sm">{selectedScholarship.program}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1E293B] mb-2">Amount</h4>
                  <p className="text-[#2f56fb] font-bold text-sm">{selectedScholarship.amount}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#1E293B] mb-2">Provider</h4>
                  <p className="text-[#475569] text-sm">{selectedScholarship.provider || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1E293B] mb-2">Deadline</h4>
                  <p className="text-[#475569] text-sm">{selectedScholarship.deadline || 'N/A'}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#1E293B] mb-2">Type</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedScholarship.type)}`}>
                  {getTypeLabel(selectedScholarship.type)}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#1E293B] mb-2">Description</h4>
                <p className="text-[#475569] text-sm leading-relaxed">{selectedScholarship.description}</p>
              </div>

              {selectedScholarship.applyLink && (
                <a
                  href={selectedScholarship.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 text-center text-white font-semibold rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                  style={{ 
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK})`,
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Apply Now →
                </a>
              )}

              <button
                onClick={closeDetailModal}
                className="w-full py-2.5 font-semibold rounded-full text-sm transition-all duration-300 cursor-pointer border-2"
                style={{ borderColor: '#E2E8F0', color: '#1E293B' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
    <ContactSection/>
   </>
  );
}