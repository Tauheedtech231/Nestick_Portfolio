/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Aspire College Theme Colors
  const TEAL_600 = '#0D9488';
  const BLUE_600 = '#2563EB';
  const LIGHT_BG = '#F8FAFC';
  const DARK_TEXT = '#1E293B';
  const MUTED_TEXT = '#64748B';
  const BORDER = '#E2E8F0';

  return (
    <section id="contact" className="min-h-screen bg-white pt-[85px] sm:pt-[93px]">
      {/* Hero Section with Video Background - NO OVERLAY */}
      <div className="relative w-full overflow-hidden">
        {/* Video Background - Clear, No Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ minHeight: '100%', minWidth: '100%' }}
          >
            <source src="/contact.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* NO OVERLAY - Video completely clear */}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#5EEAD4' }} />
              <span className="text-xs font-medium text-white">We're Here to Help</span>
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4"
              style={{ textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Get in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EEAD4] to-[#14B8A6]">
                Touch
              </span>
            </motion.h1>

            <motion.p 
              className="text-base sm:text-lg text-white max-w-2xl mx-auto leading-relaxed"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Have questions about our programs, admissions, or campus life? 
              Reach out to us and get a response within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex flex-wrap justify-center gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)' }}>
                <span className="text-white/70 text-xs">📞</span>
                <span className="text-white text-sm">+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)' }}>
                <span className="text-white/70 text-xs">✉️</span>
                <span className="text-white text-sm">info@aspirecollege.edu.pk</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-xs tracking-widest uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 rounded-full mt-2"
                style={{ backgroundColor: '#5EEAD4' }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Contact Info with Dots & Map */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-px" style={{ backgroundColor: TEAL_600 }} />
                  <span className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: TEAL_600 }}>
                    Contact Info
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold" style={{ color: DARK_TEXT }}>
                  Let's Connect
                </h3>
                <p className="text-sm sm:text-base mt-2" style={{ color: MUTED_TEXT }}>
                  Reach out to us through any of the following channels.
                </p>
              </div>

              {/* Contact Info with Dots */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-md" style={{ backgroundColor: LIGHT_BG }}>
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: TEAL_600 }} />
                  <div>
                    <h4 className="text-sm font-semibold" style={{ color: DARK_TEXT }}>Address</h4>
                    <p className="text-xs sm:text-sm" style={{ color: MUTED_TEXT }}>123 Education Street, Lahore, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-md" style={{ backgroundColor: LIGHT_BG }}>
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: TEAL_600 }} />
                  <div>
                    <h4 className="text-sm font-semibold" style={{ color: DARK_TEXT }}>Phone</h4>
                    <p className="text-xs sm:text-sm" style={{ color: MUTED_TEXT }}>+92 300 1234567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-md" style={{ backgroundColor: LIGHT_BG }}>
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: TEAL_600 }} />
                  <div>
                    <h4 className="text-sm font-semibold" style={{ color: DARK_TEXT }}>Email</h4>
                    <p className="text-xs sm:text-sm" style={{ color: MUTED_TEXT }}>info@aspirecollege.edu.pk</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-md" style={{ backgroundColor: LIGHT_BG }}>
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: TEAL_600 }} />
                  <div>
                    <h4 className="text-sm font-semibold" style={{ color: DARK_TEXT }}>Admissions</h4>
                    <p className="text-xs sm:text-sm" style={{ color: MUTED_TEXT }}>admissions@aspirecollege.edu.pk</p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="rounded-xl p-5 sm:p-6" style={{ backgroundColor: LIGHT_BG, border: `1px solid ${BORDER}` }}>
                <h4 className="text-sm font-semibold mb-2" style={{ color: DARK_TEXT }}>Office Hours</h4>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: MUTED_TEXT }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: TEAL_600 }} />
                    Monday - Friday: 8:00 AM - 6:00 PM
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: MUTED_TEXT }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: TEAL_600 }} />
                    Saturday: 9:00 AM - 2:00 PM
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: MUTED_TEXT }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: TEAL_600 }} />
                    Sunday: Closed
                  </li>
                </ul>
              </div>

              {/* Google Map */}
              <div className="rounded-xl overflow-hidden shadow-md border" style={{ borderColor: BORDER }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27202.57722541243!2d74.312598!3d31.489459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0x17e9ba30aae47afd!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Aspire College Location"
                />
              </div>
            </motion.div>

            {/* Right Column - Form with Flip Card */}
            <motion.div 
              className="perspective-1000"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div 
                className="relative transition-all duration-700 transform-style-3d"
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* Front Side - Form */}
                <div className="backface-hidden">
                  <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border" style={{ borderColor: BORDER }}>
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: TEAL_600 + '20' }}>
                          <svg className="w-8 h-8" style={{ color: TEAL_600 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: DARK_TEXT }}>Thank You!</h3>
                        <p className="text-sm mt-2" style={{ color: MUTED_TEXT }}>Your message has been sent successfully.</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold" style={{ color: DARK_TEXT }}>Send a Message</h3>
                          <button
                            onClick={handleFlip}
                            className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 hover:shadow-md"
                            style={{ backgroundColor: LIGHT_BG, color: TEAL_600 }}
                          >
                            📍 View Map
                          </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div>
                            <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5" style={{ color: DARK_TEXT }}>
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                              style={{ borderColor: BORDER, backgroundColor: '#FFFFFF', color: DARK_TEXT }}
                              placeholder="Enter your full name"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5" style={{ color: DARK_TEXT }}>
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                              style={{ borderColor: BORDER, backgroundColor: '#FFFFFF', color: DARK_TEXT }}
                              placeholder="Enter your email"
                            />
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1.5" style={{ color: DARK_TEXT }}>
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                style={{ borderColor: BORDER, backgroundColor: '#FFFFFF', color: DARK_TEXT }}
                                placeholder="+92 300 1234567"
                              />
                            </div>
                            <div>
                              <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-1.5" style={{ color: DARK_TEXT }}>
                                Subject <span className="text-red-500">*</span>
                              </label>
                              <select
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 text-sm sm:text-base cursor-pointer"
                                style={{ borderColor: BORDER, backgroundColor: '#FFFFFF', color: DARK_TEXT }}
                              >
                                <option value="">Select a subject</option>
                                <option value="admission">Admission Inquiry</option>
                                <option value="program">Program Information</option>
                                <option value="scholarship">Scholarship</option>
                                <option value="campus">Campus Tour</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5" style={{ color: DARK_TEXT }}>
                              Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              rows={4}
                              required
                              value={formData.message}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                              style={{ borderColor: BORDER, backgroundColor: '#FFFFFF', color: DARK_TEXT }}
                              placeholder="Tell us how we can help you..."
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 sm:py-3.5 text-white font-semibold rounded-full text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                            style={{ background: `linear-gradient(135deg, ${TEAL_600} 0%, ${BLUE_600} 100%)` }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                          >
                            Send Message
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>

                {/* Back Side - Map */}
                <div 
                  className="absolute top-0 left-0 w-full h-full backface-hidden"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border h-full flex flex-col" style={{ borderColor: BORDER }}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold" style={{ color: DARK_TEXT }}>Our Location</h3>
                      <button
                        onClick={handleFlip}
                        className="text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300 hover:shadow-md"
                        style={{ backgroundColor: LIGHT_BG, color: TEAL_600 }}
                      >
                        ✕ Close
                      </button>
                    </div>
                    <div className="flex-1 rounded-xl overflow-hidden border" style={{ borderColor: BORDER }}>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27202.57722541243!2d74.312598!3d31.489459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0x17e9ba30aae47afd!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full min-h-[300px]"
                        title="Aspire College Location"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-xs sm:text-sm" style={{ color: MUTED_TEXT }}>
                        📍 123 Education Street, Lahore, Pakistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}