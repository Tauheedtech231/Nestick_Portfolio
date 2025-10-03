'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  UserCircleIcon, 
  DocumentTextIcon, 
  DocumentArrowUpIcon, 
  CreditCardIcon,
  ChartBarIcon,
  EnvelopeIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function AdmissionsSection() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const admissionSteps = [
    {
      step: 1,
      title: "Register/Login",
      description: "Create your applicant account or login to existing account",
      icon: UserCircleIcon,
      details: "Start by creating a secure applicant profile with your basic information and contact details."
    },
    {
      step: 2,
      title: "Fill Application",
      description: "Complete the online admission application form",
      icon: DocumentTextIcon,
      details: "Provide your academic history, personal information, and program preferences in our secure online form."
    },
    {
      step: 3,
      title: "Upload Documents",
      description: "Submit required documents and certificates",
      icon: DocumentArrowUpIcon,
      details: "Upload scanned copies of your previous transcripts, CNIC/B-Form, and other required documentation."
    },
    {
      step: 4,
      title: "Pay Fee",
      description: "Submit admission processing fee",
      icon: CreditCardIcon,
      details: "Pay the non-refundable admission processing fee through secure online payment methods or bank challan."
    },
    {
      step: 5,
      title: "Track Status",
      description: "Monitor your application status online",
      icon: ChartBarIcon,
      details: "Check your application progress, review updates, and see if any additional information is required."
    },
    {
      step: 6,
      title: "Get Admission Letter",
      description: "Receive official admission confirmation",
      icon: EnvelopeIcon,
      details: "Upon approval, download your official admission letter and next steps instructions."
    }
  ];

  const faqs = [
    {
      question: "What documents are required for admission?",
      answer: "You'll need your Matric/O-Level certificate and marksheet, CNIC/B-Form, 4 recent passport-size photographs, and any relevant certificates for scholarships or sports quotas."
    },
    {
      question: "When is the admission deadline?",
      answer: "Admissions are open throughout the year, but we recommend applying at least 4 weeks before the semester start date to complete all formalities. Early applications may qualify for discounts."
    },
    {
      question: "Can I apply for multiple programs?",
      answer: "Yes, you can apply for up to 3 programs simultaneously. However, you'll need to submit separate application forms and pay individual processing fees for each program."
    },
    {
      question: "How long does the admission process take?",
      answer: "The complete admission process typically takes 7-10 working days from application submission to final admission confirmation, provided all documents are submitted correctly."
    }
  ];

  const toggleFaq = (index: string) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 py-16 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Admission Guidance & Support
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Your complete guide to joining Aspire College. Follow our streamlined process for a smooth admission experience.
          </p>
        </div>

        {/* Admission Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Admission Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Follow these 6 simple steps to complete your admission journey with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {admissionSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={step.step}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-400"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                          Step {step.step}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                        {step.description}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find answers to common questions about our admission process
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(`faq-${index}`)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDownIcon 
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transform transition-transform duration-300 ${
                      expandedFaq === `faq-${index}` ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {expandedFaq === `faq-${index}` && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              Start your admission process today and take the first step toward your educational goals.
            </p>
            <Link href="https://nes-tick.vercel.app">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Go to Applicant Portal
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}