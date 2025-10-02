"use client";

interface Scholarship {
  id: number;
  name: string;
  program: string;
  eligibility: string;
  amount: string;
  description: string;
  type: 'merit' | 'need' | 'sports' | 'special';
}

interface ProgramScholarships {
  program: string;
  scholarships: Scholarship[];
}

const ScholarshipsPage = () => {
  // First Year Scholarships Data
  const firstYearScholarships: Scholarship[] = [
    {
      id: 1,
      name: "Merit Excellence Scholarship",
      program: "All Programs",
      eligibility: "95%+ marks in Matriculation",
      amount: "100% Tuition Fee",
      description: "Awarded to top-performing students demonstrating exceptional academic achievement.",
      type: "merit"
    },
    {
      id: 2,
      name: "Science Talent Scholarship",
      program: "FSc & ICS",
      eligibility: "90%+ marks in Science subjects",
      amount: "75% Tuition Fee",
      description: "For students with outstanding performance in science and mathematics.",
      type: "merit"
    },
    {
      id: 3,
      name: "Sports Achievement Scholarship",
      program: "All Programs",
      eligibility: "District/Provincial level sports recognition",
      amount: "50-100% Tuition Fee",
      description: "Support for athletes representing college in competitive sports.",
      type: "sports"
    },
    {
      id: 4,
      name: "Financial Need Scholarship",
      program: "All Programs",
      eligibility: "Family income below ₹500,000 annually",
      amount: "25-75% Tuition Fee",
      description: "Financial assistance for students from economically challenged backgrounds.",
      type: "need"
    },
    {
      id: 5,
      name: "Arts & Humanities Scholarship",
      program: "FA & ICom",
      eligibility: "85%+ marks in Arts/Commerce subjects",
      amount: "50% Tuition Fee",
      description: "Encouraging excellence in arts, humanities, and commerce education.",
      type: "merit"
    },
    {
      id: 6,
      name: "Early Admission Scholarship",
      program: "All Programs",
      eligibility: "Application submitted before December 31st",
      amount: "15% Tuition Fee",
      description: "Incentive for early decision and application submission.",
      type: "special"
    }
  ];

  // Second Year Scholarships Data
  const secondYearScholarships: ProgramScholarships[] = [
    {
      program: "Intermediate in Commerce (ICom)",
      scholarships: [
        {
          id: 7,
          name: "Commerce Excellence Award",
          program: "ICom",
          eligibility: "80%+ in 1st year & clear academic record",
          amount: "60% Tuition Fee",
          description: "Reward for consistent academic performance in commerce stream.",
          type: "merit"
        },
        {
          id: 8,
          name: "Business Leadership Scholarship",
          program: "ICom",
          eligibility: "Active participation in business clubs & 75%+ marks",
          amount: "40% Tuition Fee",
          description: "For students demonstrating leadership in business activities.",
          type: "special"
        }
      ]
    },
    {
      program: "Intermediate in Computer Science (ICS)",
      scholarships: [
        {
          id: 9,
          name: "Tech Innovation Grant",
          program: "ICS",
          eligibility: "85%+ in computer subjects & project portfolio",
          amount: "70% Tuition Fee",
          description: "Support for students with innovative tech projects and high grades.",
          type: "merit"
        },
        {
          id: 10,
          name: "Women in Tech Scholarship",
          program: "ICS",
          eligibility: "Female students with 80%+ in 1st year",
          amount: "50% Tuition Fee",
          description: "Encouraging female participation in computer science education.",
          type: "special"
        }
      ]
    },
    {
      program: "Faculty of Science (FSc)",
      scholarships: [
        {
          id: 11,
          name: "Science Research Fellowship",
          program: "FSc",
          eligibility: "88%+ in science subjects & research interest",
          amount: "80% Tuition Fee",
          description: "For students pursuing research in scientific fields.",
          type: "merit"
        },
        {
          id: 12,
          name: "Medical Aspirants Scholarship",
          program: "FSc Pre-Medical",
          eligibility: "90%+ in biology & chemistry",
          amount: "65% Tuition Fee",
          description: "Support for students aiming for medical careers.",
          type: "merit"
        }
      ]
    },
    {
      program: "Faculty of Arts (FA)",
      scholarships: [
        {
          id: 13,
          name: "Creative Arts Scholarship",
          program: "FA",
          eligibility: "Outstanding performance in arts subjects",
          amount: "45% Tuition Fee",
          description: "For students excelling in creative and performing arts.",
          type: "merit"
        },
        {
          id: 14,
          name: "Social Sciences Award",
          program: "FA",
          eligibility: "85%+ in social sciences & community service",
          amount: "55% Tuition Fee",
          description: "Recognizing excellence in social sciences and community engagement.",
          type: "merit"
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'merit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'need':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'sports':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'special':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'merit':
        return '🏆';
      case 'need':
        return '💝';
      case 'sports':
        return '⚽';
      case 'special':
        return '⭐';
      default:
        return '🎓';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-purple-800 dark:from-blue-950 dark:to-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Scholarships & Financial Aid
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Investing in your future through comprehensive scholarship programs and financial support systems.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 inline-block">
              <p className="text-blue-100 text-lg">
                <strong>Application Deadline:</strong> January 15, 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* First Year Scholarships Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              First Year Scholarships
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Available for all incoming students across ICom, ICS, FSc, and FA programs. 
              Apply once for multiple scholarship considerations.
            </p>
          </div>

          {/* Scholarship Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {firstYearScholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTypeIcon(scholarship.type)}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {scholarship.name}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(scholarship.type)}`}>
                          {scholarship.type.charAt(0).toUpperCase() + scholarship.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Program */}
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Program:</span>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">{scholarship.program}</p>
                  </div>

                  {/* Eligibility */}
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Eligibility:</span>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{scholarship.eligibility}</p>
                  </div>

                  {/* Amount */}
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Award:</span>
                    <p className="text-green-600 dark:text-green-400 font-bold text-lg">{scholarship.amount}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {scholarship.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

       
        </div>
      </section>

      {/* Second Year Scholarships Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Second Year Scholarships
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Continuation and performance-based scholarships for returning students. 
              Maintain academic excellence to renew your awards.
            </p>
          </div>

          <div className="space-y-8">
            {secondYearScholarships.map((programGroup, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-600">
                  {programGroup.program}
                </h3>
                
                <div className="grid gap-6">
                  {programGroup.scholarships.map((scholarship) => (
                    <div
                      key={scholarship.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="text-2xl">{getTypeIcon(scholarship.type)}</span>
                            <div>
                              <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                                {scholarship.name}
                              </h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(scholarship.type)}`}>
                                {scholarship.type.charAt(0).toUpperCase() + scholarship.type.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Eligibility:</span>
                              <p className="text-gray-700 dark:text-gray-300 text-sm">{scholarship.eligibility}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Award Value:</span>
                              <p className="text-green-600 dark:text-green-400 font-bold text-lg">{scholarship.amount}</p>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {scholarship.description}
                          </p>
                        </div>
                        
                      
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Renewal Information */}
          <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-800 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Scholarship Renewal</h3>
                <p className="text-yellow-700 dark:text-yellow-300">Maintain your academic standing to continue receiving support</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Renewal Requirements:</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Maintain minimum 3.0 GPA</li>
                  <li>• Complete 90% attendance</li>
                  <li>• Clear all academic dues</li>
                  <li>• No disciplinary actions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Application Timeline:</h4>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Applications open: December 1st</li>
                  <li>• Deadline: January 15th</li>
                  <li>• Results announced: February 28th</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Need More Information?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our financial aid office is here to help you navigate scholarship opportunities and application processes.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-300">financialaid@college.edu</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">Visit Us</h3>
                <p className="text-gray-600 dark:text-gray-300">Financial Aid Office, Admin Building</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipsPage;