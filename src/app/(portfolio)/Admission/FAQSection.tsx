'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQData {
  faqs: FAQ[];
}

export default function FAQSection() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Session storage key
  const SESSION_KEY = 'faq_section_8';

  // ✅ Fetch data from API with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [FAQSection] Loading from session storage (instant)');
          const parsedData = JSON.parse(cachedData);
          setFaqs(parsedData);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    async function fetchData() {
      try {
        console.log('🔄 [FAQSection] Fetching data...');
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=8&section_name=Admission`);
        const result = await response.json();
        console.log('📦 [FAQSection] API Response:', result);

        let fetchedFaqs;
        if (result.success && result.content && result.content.faqs) {
          const faqData = result.content.faqs;
          console.log('✅ [FAQSection] FAQs loaded:', faqData.length);
          fetchedFaqs = faqData;
        } else {
          console.log('⚠️ [FAQSection] No data, using default');
          fetchedFaqs = getDefaultFaqs();
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedFaqs));
        }
        setFaqs(fetchedFaqs);
      } catch (error) {
        console.error('❌ [FAQSection] Error:', error);
        // ✅ Don't cache on error
        setFaqs(getDefaultFaqs());
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getDefaultFaqs = (): FAQ[] => [
    {
      id: "faq-1",
      question: "What documents are required for admission?",
      answer: "You'll need your Matric/O-Level certificate and marksheet, CNIC/B-Form, 4 recent passport-size photographs, and any relevant certificates for scholarships or sports quotas."
    },
    {
      id: "faq-2",
      question: "When is the admission deadline?",
      answer: "Admissions are open throughout the year, but we recommend applying at least 4 weeks before the semester start date to complete all formalities."
    },
    {
      id: "faq-3",
      question: "Can I apply for multiple programs?",
      answer: "Yes, you can apply for up to 3 programs simultaneously. However, you'll need to submit separate application forms and pay individual processing fees."
    },
    {
      id: "faq-4",
      question: "How long does the admission process take?",
      answer: "The complete admission process typically takes 7-10 working days from application submission to final admission confirmation."
    }
  ];

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  // ✅ Show loading only on first visit (no cache)
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <div className="max-w-4xl mx-auto scroll-mt-24 pb-16">
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto scroll-mt-24 pb-16">
        <div className="text-center py-16 text-gray-500">
          <p>No FAQs available</p>
        </div>
      </div>
    );
  }

  // ✅ Consistent brand colors
  const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color (same as Navbar)
  const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights

  return (
    <div className="max-w-4xl mx-auto scroll-mt-24 pb-16">
      <motion.div 
        className="mb-10 text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-base text-[#475569]">
          Find answers to common questions about our admission process
        </p>
      </motion.div>

      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
        viewport={{ once: true }}
      >
        {faqs.map((faq, index) => (
          <motion.div 
            key={faq.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#E2E8F0] overflow-hidden cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ x: 3 }}
          >
            <motion.button
              onClick={() => toggleFaq(faq.id)}
              className="w-full p-5 text-left flex justify-between items-center hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              whileHover={{ backgroundColor: "#F8FAFC" }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-base font-semibold text-[#1E293B] pr-4 cursor-pointer">
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: expandedFaq === faq.id ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 cursor-pointer"
              >
                {expandedFaq === faq.id ? (
                  <MinusIcon className="w-5 h-5 text-[#2f56fb]" strokeWidth={2.5} />
                ) : (
                  <PlusIcon className="w-5 h-5 text-[#2f56fb]" strokeWidth={2.5} />
                )}
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {expandedFaq === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <motion.p 
                      className="text-[#475569] text-sm leading-relaxed cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {faq.answer}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}