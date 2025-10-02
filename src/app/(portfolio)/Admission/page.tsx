'use client';

import { useState } from 'react';

export default function AdmissionsSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const admissionInfo = {
    overview:
      "Begin your educational journey with Aspire College's Intermediate programs. We offer comprehensive education in Commerce, Computer Science, Science, and Arts to build strong foundations for your future career.",
    eligibility: [
      "Matriculation with minimum 50% marks",
      "Science group required for FSc Pre-Medical/Engineering",
      "No specific group required for ICom, ICS, and FA",
      "Character certificate from previous institution",
    ],
    scholarships: [
      "Merit Scholarship: 90%+ marks in Matric - 50% fee waiver",
      "Sports Scholarship: District/Provincial level players",
      "Need-based Financial Aid: For deserving students",
      "Early Bird Discount: 10% for applications before December",
    ],
    admissionProcess: [
      "Fill out the admission form with all required details.",
      "System generates a challan form automatically.",
      "Pay the admission fee via bank or online transfer.",
      "Upload the screenshot of the paid fee slip as proof.",
      "Receive email confirmation of successful fee submission.",
      "Get WhatsApp notifications for further admission updates.",
    ],
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section id="admissions" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Intermediate Admissions
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Start your college journey with our comprehensive Intermediate programs. Build a strong foundation for your future studies and career.
          </p>
        </div>

        <div className="space-y-6">
          {/* Overview */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border-l-4 border-blue-500">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {admissionInfo.overview}
            </p>
          </div>

          {/* Eligibility */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <button
              onClick={() => toggleSection('eligibility')}
              className="w-full p-4 sm:p-6 text-left flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Eligibility Criteria</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">General admission requirements</p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${
                  expandedSection === 'eligibility' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSection === 'eligibility' && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-fade-in">
                <ul className="space-y-2 sm:space-y-3">
                  {admissionInfo.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-1 mr-2 sm:mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Scholarships */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <button
              onClick={() => toggleSection('scholarships')}
              className="w-full p-4 sm:p-6 text-left flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Scholarships</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Financial support options</p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${
                  expandedSection === 'scholarships' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSection === 'scholarships' && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-fade-in">
                <ul className="space-y-2 sm:space-y-3">
                  {admissionInfo.scholarships.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mt-1 mr-2 sm:mr-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Admission Process */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <button
              onClick={() => toggleSection('process')}
              className="w-full p-4 sm:p-6 text-left flex justify-between items-center"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Admission Process</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">Step-by-step procedure</p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${
                  expandedSection === 'process' ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSection === 'process' && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-fade-in">
                <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  {admissionInfo.admissionProcess.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
