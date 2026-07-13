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
  type: 'merit' | 'need' | 'merit_cum_need' | 'fully_funded' | 'partial' | 'tuition_waiver' | 'sports' | 'hafiz' | 'minority' | 'disability' | 'orphan' | 'kinship' | 'alumni' | 'sibling' | 'employee' | 'research' | 'international' | 'exchange' | 'endowment' | 'talent';
  provider?: string;
  deadline?: string;
  applyLink?: string;
}

const ScholarshipsPage = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // All Scholarships with All Types
  const allScholarships: Scholarship[] = [
    // ====== Merit Based ======
    {
      id: 1,
      name: "Merit Excellence Scholarship",
      program: "All Programs",
      eligibility: "95%+ marks in Matriculation with outstanding academic record and excellent performance in previous studies",
      amount: "100% Tuition Fee",
      description: "A top scholarship for students with high academic performance.",
      type: "merit",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },
    {
      id: 2,
      name: "Science Talent Scholarship",
      program: "FSc & ICS",
      eligibility: "90%+ marks in Science subjects with strong background in Mathematics and Physics",
      amount: "75% Tuition Fee",
      description: "For students with outstanding performance in science and mathematics.",
      type: "merit",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },
    {
      id: 3,
      name: "Arts & Humanities Scholarship",
      program: "FA & ICom",
      eligibility: "85%+ marks in Arts/Commerce subjects with excellent academic record",
      amount: "50% Tuition Fee",
      description: "Encouraging excellence in arts, humanities, and commerce education.",
      type: "merit",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Need Based ======
    {
      id: 4,
      name: "Financial Need Scholarship",
      program: "All Programs",
      eligibility: "Family income below ₹500,000 annually with valid income certificate and supporting documents",
      amount: "25-75% Tuition Fee",
      description: "A need-based scholarship for financially deserving students.",
      type: "need",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },
    {
      id: 5,
      name: "HEC Need-Based Scholarship",
      program: "All Programs (Public Sector)",
      eligibility: "Family income below ₹1,000,000 annually with proof of income and domicile certificate",
      amount: "Up to 100% Tuition",
      description: "Higher Education Commission scholarship for deserving students across Pakistan.",
      type: "need",
      provider: "HEC Pakistan",
      deadline: "June 30, 2025",
      applyLink: "https://hec.gov.pk/scholarships"
    },

    // ====== Merit-cum-Need ======
    {
      id: 6,
      name: "Merit-cum-Need Scholarship",
      program: "All Programs",
      eligibility: "70%+ marks & family income below ₹600,000 with both academic and financial documents",
      amount: "50-100% Tuition Fee",
      description: "This scholarship considers both merit and financial need.",
      type: "merit_cum_need",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Fully Funded ======
    {
      id: 7,
      name: "Fully Funded Scholarship",
      program: "All Programs",
      eligibility: "95%+ marks & outstanding academic record with strong extracurricular activities and leadership skills",
      amount: "100% Tuition + Stipend + Books",
      description: "This covers tuition, stipend, and other expenses.",
      type: "fully_funded",
      provider: "HEC Pakistan",
      deadline: "March 31, 2025",
      applyLink: "https://hec.gov.pk/fully-funded"
    },

    // ====== Partial Scholarship ======
    {
      id: 8,
      name: "Partial Merit Scholarship",
      program: "All Programs",
      eligibility: "80%+ marks with good academic standing and regular attendance",
      amount: "30-50% Tuition Fee",
      description: "A portion of the tuition fee is covered.",
      type: "partial",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Tuition Fee Waiver ======
    {
      id: 9,
      name: "Tuition Fee Waiver",
      program: "All Programs",
      eligibility: "90%+ marks & financial need with complete documentation and interview",
      amount: "100% Tuition Waiver",
      description: "Full or partial waiver of the tuition fee.",
      type: "tuition_waiver",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Sports Scholarship ======
    {
      id: 10,
      name: "Sports Achievement Scholarship",
      program: "All Programs",
      eligibility: "District/Provincial level sports recognition with certificates and medals",
      amount: "50-100% Tuition Fee",
      description: "For students with outstanding sports achievements.",
      type: "sports",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Hafiz-e-Quran ======
    {
      id: 11,
      name: "Hafiz-e-Quran Scholarship",
      program: "All Programs",
      eligibility: "Complete Hifz-ul-Quran with certification from a recognized religious institution",
      amount: "50% Tuition Fee",
      description: "A special scholarship for Huffaz.",
      type: "hafiz",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Minority Scholarship ======
    {
      id: 12,
      name: "Minority Scholarship",
      program: "All Programs",
      eligibility: "Religious minority students with valid minority certificate and supporting documents",
      amount: "25-50% Tuition Fee",
      description: "Government scholarship for religious minority students.",
      type: "minority",
      provider: "Government of Pakistan",
      deadline: "December 31, 2025"
    },

    // ====== Disability Scholarship ======
    {
      id: 13,
      name: "Disability Support Scholarship",
      program: "All Programs",
      eligibility: "Students with disabilities (40%+ disability) with valid medical certificate",
      amount: "50-100% Tuition Fee",
      description: "A special scholarship for students with disabilities.",
      type: "disability",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Orphan Scholarship ======
    {
      id: 14,
      name: "Orphan Support Scholarship",
      program: "All Programs",
      eligibility: "Orphan students with valid death certificate of both parents and income certificate",
      amount: "100% Tuition Fee + Stipend",
      description: "Complete support for orphan students.",
      type: "orphan",
      provider: "Pakistan Bait-ul-Mal",
      deadline: "December 31, 2025",
      applyLink: "https://baitulmal.gov.pk"
    },

    // ====== Kinship Scholarship ======
    {
      id: 15,
      name: "Kinship Scholarship",
      program: "All Programs",
      eligibility: "University employees or alumni family members with valid relationship proof",
      amount: "25% Tuition Fee",
      description: "For family members of university employees or alumni.",
      type: "kinship",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Alumni Scholarship ======
    {
      id: 16,
      name: "Alumni Children Scholarship",
      program: "All Programs",
      eligibility: "Alumni or alumni children with valid alumni registration and documents",
      amount: "20% Tuition Fee",
      description: "A special discount for alumni or alumni children.",
      type: "alumni",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Sibling Scholarship ======
    {
      id: 17,
      name: "Sibling Discount Scholarship",
      program: "All Programs",
      eligibility: "2 or more siblings enrolled in the same college with valid relationship proof",
      amount: "15-25% Tuition Fee",
      description: "For two or more siblings in the same university.",
      type: "sibling",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Employee Scholarship ======
    {
      id: 18,
      name: "Employee Family Scholarship",
      program: "All Programs",
      eligibility: "University staff and their children with valid employee ID and documents",
      amount: "50% Tuition Fee",
      description: "A special scholarship for university staff.",
      type: "employee",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Research Scholarship ======
    {
      id: 19,
      name: "Research Excellence Scholarship",
      program: "MS, MPhil, PhD",
      eligibility: "Research proposal & academic record with strong publication potential and references",
      amount: "100% Tuition + Research Grant",
      description: "HEC scholarship for MS, MPhil, and PhD researchers.",
      type: "research",
      provider: "HEC Pakistan",
      deadline: "May 31, 2025",
      applyLink: "https://hec.gov.pk/research"
    },

    // ====== International Scholarship ======
    {
      id: 20,
      name: "International Study Scholarship",
      program: "All Programs",
      eligibility: "Outstanding academic record & IELTS/TOEFL score with strong profile and recommendations",
      amount: "Full Tuition + Living Expenses",
      description: "International scholarship for overseas study.",
      type: "international",
      provider: "HEC Pakistan",
      deadline: "February 28, 2025",
      applyLink: "https://hec.gov.pk/international"
    },

    // ====== Exchange Scholarship ======
    {
      id: 21,
      name: "Student Exchange Scholarship",
      program: "All Programs",
      eligibility: "Academic excellence & language proficiency with strong intercultural skills",
      amount: "Tuition + Travel + Living",
      description: "Scholarship for student exchange programs.",
      type: "exchange",
      provider: "Aspire College",
      deadline: "April 30, 2025"
    },

    // ====== Endowment Scholarship ======
    {
      id: 22,
      name: "Endowment Scholarship",
      program: "All Programs",
      eligibility: "Academic excellence & financial need with complete documentation",
      amount: "Varies (50-100%)",
      description: "Scholarship funded by donors or trusts.",
      type: "endowment",
      provider: "Aspire College Endowment",
      deadline: "January 15, 2025"
    },

    // ====== Talent Scholarship ======
    {
      id: 23,
      name: "Talent Scholarship",
      program: "All Programs",
      eligibility: "Academic, arts or leadership talent with proven achievements and recommendations",
      amount: "50% Tuition Fee",
      description: "For students with academic, arts, or leadership talent.",
      type: "talent",
      provider: "Aspire College",
      deadline: "January 15, 2025"
    },

    // ====== Government/External ======
    {
      id: 24,
      name: "PEEF Scholarship",
      program: "All Programs (Punjab)",
      eligibility: "Punjab domicile, family income below ₹800,000 with complete documentation",
      amount: "Full Tuition + Stipend",
      description: "Punjab Educational Endowment Fund for deserving students.",
      type: "need",
      provider: "PEEF Pakistan",
      deadline: "August 15, 2025",
      applyLink: "https://peef.org.pk"
    },
    {
      id: 25,
      name: "Benazir Income Support Program (BISP)",
      program: "All Programs",
      eligibility: "BISP registered families, income below ₹500,000 with valid registration",
      amount: "Quarterly Stipend",
      description: "Government program for BISP registered families.",
      type: "need",
      provider: "Government of Pakistan",
      deadline: "Open - Apply Anytime",
      applyLink: "https://bisp.gov.pk"
    },
    {
      id: 26,
      name: "Coca-Cola Pakistan Scholarship",
      program: "All Programs",
      eligibility: "Academic excellence & financial need with strong leadership potential",
      amount: "Varies (50-100%)",
      description: "Corporate scholarship for talented students.",
      type: "merit",
      provider: "Coca-Cola Pakistan",
      deadline: "March 31, 2025",
      applyLink: "https://coca-colascholarship.pk"
    }
  ];

  // Filter options
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

  // Filter scholarships based on search and type
  const filterScholarships = () => {
    let filtered = allScholarships;

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'merit': return 'bg-blue-100 text-blue-800';
      case 'need': return 'bg-green-100 text-green-800';
      case 'merit_cum_need': return 'bg-teal-100 text-teal-800';
      case 'fully_funded': return 'bg-emerald-100 text-emerald-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'tuition_waiver': return 'bg-indigo-100 text-indigo-800';
      case 'sports': return 'bg-purple-100 text-purple-800';
      case 'hafiz': return 'bg-amber-100 text-amber-800';
      case 'minority': return 'bg-rose-100 text-rose-800';
      case 'disability': return 'bg-cyan-100 text-cyan-800';
      case 'orphan': return 'bg-orange-100 text-orange-800';
      case 'kinship': return 'bg-pink-100 text-pink-800';
      case 'alumni': return 'bg-violet-100 text-violet-800';
      case 'sibling': return 'bg-fuchsia-100 text-fuchsia-800';
      case 'employee': return 'bg-slate-100 text-slate-800';
      case 'research': return 'bg-sky-100 text-sky-800';
      case 'international': return 'bg-lime-100 text-lime-800';
      case 'exchange': return 'bg-cyan-100 text-cyan-800';
      case 'endowment': return 'bg-amber-100 text-amber-800';
      case 'talent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const TEAL_600 = '#0D9488';

  return (
   <>
    <div className="min-h-screen bg-white transition-colors duration-300 pt-[40px] sm:pt-[80px] ">
      {/* Hero Section - Same height as About page: h-[60vh] min-h-[500px] */}
      <section 
        ref={heroRef} 
        className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://plus.unsplash.com/premium_photo-1691962725028-e825955a7c1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
              Scholarships & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EEAD4] to-[#0D9488]">Financial Aid</span>
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg text-white drop-shadow-lg max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
              Explore available scholarships and financial support opportunities for your education
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
                <button
                  onClick={() => filterScholarships()}
                  className="px-6 py-3.5 rounded-full text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer flex-shrink-0"
                  style={{ backgroundColor: TEAL_600 }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0F766E'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = TEAL_600; }}
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
                    <td 
                      onClick={() => openDetailModal(scholarship)}
                      className="py-4 px-6 text-[#475569] max-w-[200px] truncate cursor-pointer hover:text-[#0D9488] transition-colors"
                      title="Click to view full eligibility"
                    >
                      <span className="hover:underline">{scholarship.eligibility}</span>
                      <span className="ml-1 text-[#0D9488] text-xs">[...]</span>
                    </td>
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
                  <p className="text-[#0D9488] font-bold text-sm">{selectedScholarship.amount}</p>
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
                  style={{ backgroundColor: TEAL_600 }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0F766E'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = TEAL_600; }}
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
};

export default ScholarshipsPage;