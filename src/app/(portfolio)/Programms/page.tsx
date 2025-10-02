'use client';

import { useState } from 'react';

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
}

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'apply' | 'info'>('apply');

  const programs: Program[] = [
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
      highlights: ['Accounting Fundamentals', 'Business Studies', 'Economics', 'Business Mathematics']
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
      highlights: ['Programming Fundamentals', 'Web Development', 'Database Systems', 'Computer Networks']
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
      highlights: ['Physics', 'Chemistry', 'Mathematics', 'Biology Options']
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
      highlights: ['Literature', 'Social Sciences', 'Fine Arts', 'Language Studies']
    }
  ];

  const handleApplyNow = (program: Program) => {
    setSelectedProgram(program);
    setFormType('apply');
    setShowForm(true);
  };

  const handleRequestInfo = (program: Program) => {
    setSelectedProgram(program);
    setFormType('info');
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your ${formType === 'apply' ? 'application' : 'inquiry'}! We will contact you soon.`);
    setShowForm(false);
    setSelectedProgram(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-blue-950 dark:via-purple-950 dark:to-indigo-950 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">Academic Programs</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover your path to success with our diverse range of intermediate programs designed to shape future leaders and innovators.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Choose Your Program
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Explore our comprehensive intermediate programs that provide strong foundations for higher education and professional careers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-bold text-white">{program.name}</h3>
                    <p className="text-blue-200 text-sm">{program.fullName}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {program.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-1">
                    {program.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Program Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">Eligibility</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{program.eligibility}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-1">Annual Fee</h4>
                      <p className="text-green-600 dark:text-green-400 font-bold">{program.feePerYear}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Semester: {program.feePerSemester}</p>
                    </div>
                  </div>

                  {/* Button Section */}
                 <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-auto">
  <button
    onClick={() => handleApplyNow(program)}
    className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-lg font-semibold transition-transform hover:scale-105"
  >
    Apply Now
  </button>
  <button
    onClick={() => handleRequestInfo(program)}
    className="w-full sm:flex-1 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-lg font-semibold transition-all duration-200"
  >
    More Info
  </button>
</div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application/Info Form Modal */}
      {showForm && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {formType === 'apply' ? 'Apply Now' : 'Request Information'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300">{selectedProgram.name} - {selectedProgram.fullName}</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">{selectedProgram.duration} Program</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
              <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
              <input type="tel" placeholder="Phone Number" required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
              {formType === 'apply' && (
                <input type="text" placeholder="Previous Qualification" required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
              )}
              <textarea placeholder={formType === 'apply' ? 'Why do you want to join this program?' : 'What information would you like to know?'} rows={3} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-transform hover:scale-105">
                {formType === 'apply' ? 'Submit Application' : 'Request Info'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
