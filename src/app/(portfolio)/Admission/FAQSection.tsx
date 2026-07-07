'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    id: "faq-1",
    question: "What documents are required for admission?",
    answer: "You'll need your Matric/O-Level certificate and marksheet, CNIC/B-Form, 4 recent passport-size photographs, and any relevant certificates for scholarships or sports quotas."
  },
  {
    id: "faq-2",
    question: "When is the admission deadline?",
    answer: "Admissions are open throughout the year, but we recommend applying at least 4 weeks before the semester start date to complete all formalities. Early applications may qualify for discounts."
  },
  {
    id: "faq-3",
    question: "Can I apply for multiple programs?",
    answer: "Yes, you can apply for up to 3 programs simultaneously. However, you'll need to submit separate application forms and pay individual processing fees for each program."
  },
  {
    id: "faq-4",
    question: "How long does the admission process take?",
    answer: "The complete admission process typically takes 7-10 working days from application submission to final admission confirmation, provided all documents are submitted correctly."
  }
];

export default function FAQSection() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="max-w-4xl mx-auto scroll-mt-20 pb-16">
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
                  <MinusIcon className="w-5 h-5 text-[#2563EB]" strokeWidth={2.5} />
                ) : (
                  <PlusIcon className="w-5 h-5 text-[#2563EB]" strokeWidth={2.5} />
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