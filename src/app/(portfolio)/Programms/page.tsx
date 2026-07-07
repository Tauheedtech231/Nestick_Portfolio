"use client";

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Program {
  id: number;
  name: string;
  fullName: string;
  duration: string;
  eligibility: string;
  feePerYear: string;
  feePerSemester: string;
  image: string;
  description: string;
  highlights: string[];
  level?: 'school' | 'college' | 'academy' | 'olevel' | 'alevel';
  category?: string;
}

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [formType, setFormType] = useState<'apply' | 'info'>('apply');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Comprehensive Programs Data
  const programs: Program[] = [
    // College Programs
    {
      id: 1,
      name: 'ICom',
      fullName: 'Intermediate in Commerce',
      duration: '2 Years',
      eligibility: 'Matric Science/Arts with minimum 50% marks',
      feePerYear: '₹45,000',
      feePerSemester: '₹22,500',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Comprehensive commerce education focusing on accounting, business, and economics principles.',
      highlights: ['Accounting Fundamentals', 'Business Studies', 'Economics', 'Business Mathematics'],
      level: 'college',
      category: 'commerce'
    },
    {
      id: 2,
      name: 'ICS',
      fullName: 'Intermediate in Computer Science',
      duration: '2 Years',
      eligibility: 'Matric Science with minimum 60% marks',
      feePerYear: '₹55,000',
      feePerSemester: '₹27,500',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cutting-edge computer science program with hands-on programming and software development.',
      highlights: ['Programming Fundamentals', 'Web Development', 'Database Systems', 'Computer Networks'],
      level: 'college',
      category: 'science'
    },
    {
      id: 3,
      name: 'FSc',
      fullName: 'Faculty of Science',
      duration: '2 Years',
      eligibility: 'Matric Science with minimum 65% marks',
      feePerYear: '₹50,000',
      feePerSemester: '₹25,000',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Rigorous science program preparing students for engineering and medical fields.',
      highlights: ['Physics', 'Chemistry', 'Mathematics', 'Biology Options'],
      level: 'college',
      category: 'science'
    },
    {
      id: 4,
      name: 'FA',
      fullName: 'Faculty of Arts',
      duration: '2 Years',
      eligibility: 'Matric Arts/Science with minimum 45% marks',
      feePerYear: '₹40,000',
      feePerSemester: '₹20,000',
      image: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Diverse arts program offering humanities, social sciences, and creative arts.',
      highlights: ['Literature', 'Social Sciences', 'Fine Arts', 'Language Studies'],
      level: 'college',
      category: 'arts'
    },
    // School Programs
    {
      id: 5,
      name: 'Primary',
      fullName: 'Primary Education (Class 1-5)',
      duration: '5 Years',
      eligibility: 'Age 5+ years',
      feePerYear: '₹25,000',
      feePerSemester: '₹12,500',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Strong foundation in core subjects with focus on holistic development and character building.',
      highlights: ['Mathematics', 'English', 'Science', 'Social Studies', 'Arts & Crafts'],
      level: 'school',
      category: 'primary'
    },
    {
      id: 6,
      name: 'Middle',
      fullName: 'Middle School (Class 6-8)',
      duration: '3 Years',
      eligibility: 'Completion of Primary education',
      feePerYear: '₹30,000',
      feePerSemester: '₹15,000',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Comprehensive middle school program bridging primary and secondary education.',
      highlights: ['Advanced Mathematics', 'Science', 'English Literature', 'Computer Basics', 'Social Studies'],
      level: 'school',
      category: 'middle'
    },
    {
      id: 7,
      name: 'Matric',
      fullName: 'Matriculation (Class 9-10)',
      duration: '2 Years',
      eligibility: 'Completion of Middle school',
      feePerYear: '₹35,000',
      feePerSemester: '₹17,500',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Comprehensive secondary education program preparing students for higher studies.',
      highlights: ['Science Group', 'Arts Group', 'Computer Science', 'Commerce Group'],
      level: 'school',
      category: 'secondary'
    },
    // O/A Level Programs
    {
      id: 8,
      name: 'O-Level',
      fullName: 'Cambridge O-Level',
      duration: '2 Years',
      eligibility: 'Age 14+ years with previous academic record',
      feePerYear: '₹80,000',
      feePerSemester: '₹40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Internationally recognized O-Level program preparing students for global education.',
      highlights: ['Science Subjects', 'Commerce Subjects', 'Arts Subjects', 'English Language'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 9,
      name: 'A-Level',
      fullName: 'Cambridge A-Level',
      duration: '2 Years',
      eligibility: 'O-Level completion with minimum C grade',
      feePerYear: '₹100,000',
      feePerSemester: '₹50,000',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Advanced level program for higher education pathways to top universities worldwide.',
      highlights: ['Advanced Science', 'Advanced Mathematics', 'Business Studies', 'Humanities'],
      level: 'alevel',
      category: 'alevel'
    },
    // Academy Programs
    {
      id: 10,
      name: 'CSS',
      fullName: 'CSS Preparation Course',
      duration: '1 Year',
      eligibility: 'Graduation with minimum 50% marks',
      feePerYear: '₹120,000',
      feePerSemester: '₹60,000',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Comprehensive CSS exam preparation with expert guidance and study material.',
      highlights: ['Compulsory Subjects', 'Optional Subjects', 'Mock Tests', 'Interview Preparation'],
      level: 'academy',
      category: 'competitive'
    },
    {
      id: 11,
      name: 'PMS',
      fullName: 'PMS Preparation Course',
      duration: '1 Year',
      eligibility: 'Graduation with minimum 50% marks',
      feePerYear: '₹100,000',
      feePerSemester: '₹50,000',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Focused PMS exam preparation with experienced faculty and comprehensive resources.',
      highlights: ['General Knowledge', 'Current Affairs', 'Essay Writing', 'Subject Specialization'],
      level: 'academy',
      category: 'competitive'
    }
  ];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Programs' },
    { value: 'school', label: '🏫 School' },
    { value: 'college', label: '🎓 College' },
    { value: 'academy', label: '📚 Academy' },
    { value: 'olevel', label: '🌍 O-Level' },
    { value: 'alevel', label: '🎯 A-Level' },
  ];

  // Filter programs based on search and filter
  useEffect(() => {
    let filtered = programs;

    if (searchTerm.trim()) {
      filtered = filtered.filter(program =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (activeFilter !== 'all') {
      filtered = filtered.filter(program => program.level === activeFilter);
    }

    setFilteredPrograms(filtered);
  }, [searchTerm, activeFilter]);

  useEffect(() => {
    setFilteredPrograms(programs);
  }, []);

  const handleApplyNow = (program: Program) => {
    setSelectedProgram(program);
    setFormType('apply');
    setShowForm(true);
  };

  const handleRequestInfo = (program: Program) => {
    setSelectedProgram(program);
    setShowInfoModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your ${formType === 'apply' ? 'application' : 'inquiry'}! We will contact you soon.`);
    setShowForm(false);
    setSelectedProgram(null);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Colors
  const BLUE_600 = '#2563EB';
  const TEAL_600 = '#0D9488';

  // Animation variants
  const headingVariants: Variants = {
    hidden: { opacity: 0, x: -200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      }
    }
  };

  const subHeadingVariants: Variants = {
    hidden: { opacity: 0, x: -180 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.4,
      }
    }
  };

  const searchVariants: Variants = {
    hidden: { opacity: 0, x: 300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.4,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.6,
      }
    }
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 pt-[85px] sm:pt-[95px]">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#101820' }}>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            <span className="text-white">Our </span>
            <span style={{ color: TEAL_600 }}>Programs</span>
          </motion.h1>

          <motion.p 
            variants={subHeadingVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            Discover your path to success with our diverse range of programs
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-14 rounded-full bg-white/95 backdrop-blur-sm text-[#1E293B] placeholder-[#64748B] border-0 focus:ring-2 focus:ring-[#0D9488] shadow-lg transition-all duration-300 cursor-pointer"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-14 top-1/2 -translate-y-1/2 cursor-pointer text-[#64748B] hover:text-[#1E293B] transition-colors"
                >
                  ✕
                </button>
              )}
              <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid with Filter */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-6">
          {/* Filter & Results Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <label className="text-base font-semibold text-[#1E293B]">Filter by:</label>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-5 py-2.5 rounded-full border border-[#E2E8F0] bg-white text-[#1E293B] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488] cursor-pointer min-w-[160px] shadow-sm hover:shadow-md transition-all duration-200"
                style={{ borderColor: '#E2E8F0' }}
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-[#64748B] bg-white px-4 py-2 rounded-full shadow-sm border border-[#E2E8F0]">
              Showing <span className="font-semibold text-[#1E293B]">{filteredPrograms.length}</span> programs
            </div>
          </div>

          {/* Cards Grid - Fixed 3 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: Math.min(index * 0.08, 0.4),
                }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col max-w-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-5">
                    <h3 className="text-2xl font-bold text-white">{program.name}</h3>
                    <p className="text-blue-200 text-sm truncate max-w-[180px]">{program.fullName}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: TEAL_600 }}>
                      {program.duration}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[#475569] mb-4 text-sm leading-relaxed flex-1 line-clamp-2">
                    {program.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#1E293B] text-sm mb-2">Program Highlights:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {program.highlights.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: '#E6F7F5',
                            color: TEAL_600
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                      {program.highlights.length > 3 && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium text-[#64748B] bg-[#F1F5F9]">
                          +{program.highlights.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#F8FAFC' }}>
                      <h4 className="font-semibold text-[#1E293B] text-xs mb-1">Eligibility</h4>
                      <p className="text-[#475569] text-xs line-clamp-2">{program.eligibility}</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#F8FAFC' }}>
                      <h4 className="font-semibold text-[#1E293B] text-xs mb-1">Annual Fee</h4>
                      <p className="font-bold text-sm" style={{ color: TEAL_600 }}>{program.feePerYear}</p>
                      <p className="text-[#475569] text-xs">Semester: {program.feePerSemester}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <Link href="/Admission" className="w-full">
                      <button
                        className="w-full py-2.5 text-white font-semibold rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                        style={{ backgroundColor: BLUE_600 }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1D4ED8';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = BLUE_600;
                        }}
                      >
                        Apply Now
                      </button>
                    </Link>
                    <button
                      onClick={() => handleRequestInfo(program)}
                      className="w-full py-2.5 font-semibold rounded-full text-sm transition-all duration-300 cursor-pointer"
                      style={{ 
                        border: `2px solid ${TEAL_600}`,
                        color: TEAL_600,
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E6F7F5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">No programs found</h3>
              <p className="text-[#475569]">Try adjusting your search or filter criteria</p>
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

      {/* More Info Modal */}
      {showInfoModal && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 rounded-t-2xl border-b border-[#E2E8F0] px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1E293B]">{selectedProgram.name}</h3>
                <p className="text-sm text-[#475569]">{selectedProgram.fullName}</p>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-2 rounded-full hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <XMarkIcon className="w-6 h-6 text-[#64748B]" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Program Image */}
              <div className="relative h-48 rounded-xl overflow-hidden">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: TEAL_600 }}>
                    {selectedProgram.duration}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-[#1E293B] mb-2">About this Program</h4>
                <p className="text-[#475569] text-sm leading-relaxed">{selectedProgram.description}</p>
              </div>

              {/* Highlights with Check Icons */}
              <div>
                <h4 className="font-semibold text-[#1E293B] mb-3">Program Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProgram.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#F8FAFC]">
                      <CheckCircleIcon className="w-5 h-5 text-[#0D9488] flex-shrink-0" />
                      <span className="text-sm text-[#1E293B]">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility & Fee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#F8FAFC' }}>
                  <h4 className="font-semibold text-[#1E293B] text-sm mb-1">Eligibility</h4>
                  <p className="text-[#475569] text-sm">{selectedProgram.eligibility}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#F8FAFC' }}>
                  <h4 className="font-semibold text-[#1E293B] text-sm mb-1">Fee Structure</h4>
                  <p className="font-bold text-lg" style={{ color: TEAL_600 }}>{selectedProgram.feePerYear}</p>
                  <p className="text-[#475569] text-sm">Per Semester: {selectedProgram.feePerSemester}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/Admission" className="w-full sm:flex-1">
                  <button
                    className="w-full py-3 text-white font-semibold rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                    style={{ backgroundColor: BLUE_600 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1D4ED8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = BLUE_600;
                    }}
                  >
                    Apply Now
                  </button>
                </Link>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="w-full sm:flex-1 py-3 font-semibold rounded-full text-sm transition-all duration-300 cursor-pointer"
                  style={{ 
                    border: `2px solid ${TEAL_600}`,
                    color: TEAL_600,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E6F7F5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Application/Info Form Modal */}
      {showForm && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[#1E293B]">
                {formType === 'apply' ? 'Apply Now' : 'Request Information'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#E6F7F5' }}>
              <h4 className="font-semibold text-[#1E293B]">{selectedProgram.name} - {selectedProgram.fullName}</h4>
              <p className="text-sm" style={{ color: TEAL_600 }}>{selectedProgram.duration} Program</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                required 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer"
              />
              {formType === 'apply' && (
                <input 
                  type="text" 
                  placeholder="Previous Qualification" 
                  required 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer"
                />
              )}
              <textarea 
                placeholder={formType === 'apply' ? 'Why do you want to join this program?' : 'What information would you like to know?'} 
                rows={3} 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer resize-none"
              />

              <button 
                type="submit" 
                className="w-full text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                style={{ 
                  background: 'linear-gradient(135deg, #0D9488 0%, #2563EB 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                {formType === 'apply' ? 'Submit Application' : 'Request Info'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}