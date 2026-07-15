/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactData {
  email: string;
  phone: string;
  address: string;
  website: string;
  mapLink: string;
  appointmentLink: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  contactNumbers: {
    phone: string;
    whatsapp: string;
    office: string;
  };
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
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState<ContactData>({
    email: 'info@aspirecollege.edu.pk',
    phone: '+92 300 1234567',
    address: '123 Education Street, Lahore, Pakistan',
    website: 'https://www.aspirecollege.edu.pk',
    mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27202.57722541243!2d74.312598!3d31.489459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0x17e9ba30aae47afd!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000',
    appointmentLink: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    workingHours: {
      weekdays: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    contactNumbers: {
      phone: '+92 300 1234567',
      whatsapp: '',
      office: ''
    }
  });

  const collegeId = "8"; // ✅ Hardcoded college ID
  const SESSION_KEY = `contact_page_${collegeId}`;

  // ✅ Fetch contact data from API with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [ContactSection] Loading from session storage (instant)');
          const parsedData = JSON.parse(cachedData);
          setContactData(parsedData);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    async function fetchContactData() {
      try {
        setLoading(true);
        console.log('🔄 [ContactSection] Fetching from API...');
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=Contact`);
        const result = await response.json();
        
        console.log('📦 [ContactSection] API Response:', result);

        let fetchedData;
        if (result.success && result.content) {
          const content = result.content;
          fetchedData = {
            email: content.email || contactData.email,
            phone: content.phone || content.contactNumbers?.phone || contactData.phone,
            address: content.address || contactData.address,
            website: content.website || contactData.website,
            mapLink: content.mapLink || contactData.mapLink,
            appointmentLink: content.appointmentLink || contactData.appointmentLink,
            socialMedia: {
              facebook: content.socialMedia?.facebook || '',
              twitter: content.socialMedia?.twitter || '',
              linkedin: content.socialMedia?.linkedin || '',
              instagram: content.socialMedia?.instagram || ''
            },
            workingHours: {
              weekdays: content.workingHours?.weekdays || contactData.workingHours.weekdays,
              saturday: content.workingHours?.saturday || contactData.workingHours.saturday,
              sunday: content.workingHours?.sunday || contactData.workingHours.sunday
            },
            contactNumbers: {
              phone: content.contactNumbers?.phone || content.phone || contactData.phone,
              whatsapp: content.contactNumbers?.whatsapp || '',
              office: content.contactNumbers?.office || ''
            }
          };
          console.log('✅ [ContactSection] Data loaded successfully');
        } else {
          console.log('⚠️ [ContactSection] No data, using default');
          fetchedData = contactData;
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        }
        setContactData(fetchedData);
      } catch (error) {
        console.error('❌ [ContactSection] Error fetching:', error);
        // ✅ Don't cache on error
        setContactData(contactData);
      } finally {
        setLoading(false);
      }
    }

    fetchContactData();
  }, [collegeId, SESSION_KEY]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📤 [ContactSection] Form Data:', formData);
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

  // ✅ Show loading only on first visit (no cache)
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <section id="contact" className="min-h-screen bg-white pt-[85px] sm:pt-[93px]">
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading contact information...</p>
          </div>
        </div>
      </section>
    );
  }

  // ✅ Consistent brand colors - EXACTLY same as Navbar
  const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color
  const PRIMARY_DARK = '#1530b0'; // Darker blue for hover
  const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights
  const LIGHT_BG = '#f8faff';
  const DARK_TEXT = '#0a1240';
  const MUTED_TEXT = '#3d4566';
  const BORDER = '#e8edf8';

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
              <span className="text-[12px] font-semibold text-white">We're Here to Help</span>
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4"
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
              className="text-[15px] sm:text-[15px] text-white max-w-2xl mx-auto leading-[1.8]"
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
                <span className="text-white text-[15px]">{contactData.contactNumbers.phone || contactData.phone}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)' }}>
                <span className="text-white/70 text-xs">✉️</span>
                <span className="text-white text-[15px]">{contactData.email}</span>
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
            <span className="text-white/60 text-[11px] tracking-widest uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Scroll</span>
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
                  <span className="w-8 h-px" style={{ backgroundColor: PRIMARY_COLOR }} />
                  <span className="text-[12px] font-semibold tracking-[0.16em] uppercase" style={{ color: PRIMARY_COLOR }}>
                    Contact Info
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold" style={{ color: DARK_TEXT }}>
                  Let's Connect
                </h3>
                <p className="text-[15px] mt-2 leading-[1.8]" style={{ color: MUTED_TEXT }}>
                  Reach out to us through any of the following channels.
                </p>
              </div>

              {/* Contact Info with Dots */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-md" style={{ backgroundColor: LIGHT_BG }}>
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: PRIMARY_COLOR }} />
                  <div>
                    <h4 className="text-[14px] font-bold" style={{ color: DARK_TEXT }}>Address</h4>
                    <p className="text-[15px]" style={{ color: MUTED_TEXT }}>{contactData.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-md" style={{ backgroundColor: LIGHT_BG }}>
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: PRIMARY_COLOR }} />
                  <div>
                    <h4 className="text-[14px] font-bold" style={{ color: DARK_TEXT }}>Phone</h4>
                    <p className="text-[15px]" style={{ color: MUTED_TEXT }}>{contactData.contactNumbers.phone || contactData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-md" style={{ backgroundColor: LIGHT_BG }}>
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: PRIMARY_COLOR }} />
                  <div>
                    <h4 className="text-[14px] font-bold" style={{ color: DARK_TEXT }}>Email</h4>
                    <p className="text-[15px]" style={{ color: MUTED_TEXT }}>{contactData.email}</p>
                  </div>
                </div>

                {contactData.contactNumbers.whatsapp && (
                  <div className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-md" style={{ backgroundColor: LIGHT_BG }}>
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: PRIMARY_COLOR }} />
                    <div>
                      <h4 className="text-[14px] font-bold" style={{ color: DARK_TEXT }}>WhatsApp</h4>
                      <p className="text-[15px]" style={{ color: MUTED_TEXT }}>{contactData.contactNumbers.whatsapp}</p>
                    </div>
                  </div>
                )}

                {contactData.contactNumbers.office && (
                  <div className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-md" style={{ backgroundColor: LIGHT_BG }}>
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: PRIMARY_COLOR }} />
                    <div>
                      <h4 className="text-[14px] font-bold" style={{ color: DARK_TEXT }}>Office</h4>
                      <p className="text-[15px]" style={{ color: MUTED_TEXT }}>{contactData.contactNumbers.office}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Office Hours */}
              <div className="rounded-xl p-5 sm:p-6" style={{ backgroundColor: LIGHT_BG, border: `1px solid ${BORDER}` }}>
                <h4 className="text-[14px] font-bold mb-2" style={{ color: DARK_TEXT }}>Office Hours</h4>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-[15px]" style={{ color: MUTED_TEXT }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: PRIMARY_COLOR }} />
                    Monday - Friday: {contactData.workingHours.weekdays}
                  </li>
                  <li className="flex items-center gap-2 text-[15px]" style={{ color: MUTED_TEXT }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: PRIMARY_COLOR }} />
                    Saturday: {contactData.workingHours.saturday}
                  </li>
                  <li className="flex items-center gap-2 text-[15px]" style={{ color: MUTED_TEXT }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: PRIMARY_COLOR }} />
                    Sunday: {contactData.workingHours.sunday}
                  </li>
                </ul>
              </div>

              {/* Google Map */}
              <div className="rounded-xl overflow-hidden shadow-md border" style={{ borderColor: BORDER }}>
                <iframe
                  src={contactData.mapLink}
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="College Location"
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
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: PRIMARY_COLOR + '20' }}>
                          <svg className="w-8 h-8" style={{ color: PRIMARY_COLOR }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-extrabold" style={{ color: DARK_TEXT }}>Thank You!</h3>
                        <p className="text-[15px] mt-2 leading-[1.8]" style={{ color: MUTED_TEXT }}>Your message has been sent successfully.</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-extrabold" style={{ color: DARK_TEXT }}>Send a Message</h3>
                          <button
                            onClick={handleFlip}
                            className="text-[12px] font-semibold px-3 py-1.5 rounded-full transition-all duration-300 hover:shadow-md cursor-pointer"
                            style={{ backgroundColor: LIGHT_BG, color: PRIMARY_COLOR }}
                          >
                            📍 View Map
                          </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div>
                            <label htmlFor="name" className="block text-[13px] font-semibold mb-1.5" style={{ color: DARK_TEXT }}>
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f56fb] focus:border-transparent transition-all duration-200 text-[15px]"
                              style={{ borderColor: BORDER, backgroundColor: '#FFFFFF', color: DARK_TEXT }}
                              placeholder="Enter your full name"
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className="block text-[13px] font-semibold mb-1.5" style={{ color: DARK_TEXT }}>
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f56fb] focus:border-transparent transition-all duration-200 text-[15px]"
                              style={{ borderColor: BORDER, backgroundColor: '#FFFFFF', color: DARK_TEXT }}
                              placeholder="Enter your email"
                            />
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="phone" className="block text-[13px] font-semibold mb-1.5" style={{ color: DARK_TEXT }}>
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f56fb] focus:border-transparent transition-all duration-200 text-[15px]"
                                style={{ borderColor: BORDER, backgroundColor: '#FFFFFF', color: DARK_TEXT }}
                                placeholder="+92 300 1234567"
                              />
                            </div>
                            <div>
                              <label htmlFor="subject" className="block text-[13px] font-semibold mb-1.5" style={{ color: DARK_TEXT }}>
                                Subject <span className="text-red-500">*</span>
                              </label>
                              <select
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f56fb] focus:border-transparent transition-all duration-200 text-[15px] cursor-pointer"
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
                            <label htmlFor="message" className="block text-[13px] font-semibold mb-1.5" style={{ color: DARK_TEXT }}>
                              Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              rows={4}
                              required
                              value={formData.message}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f56fb] focus:border-transparent transition-all duration-200 resize-none text-[15px]"
                              style={{ borderColor: BORDER, backgroundColor: '#FFFFFF', color: DARK_TEXT }}
                              placeholder="Tell us how we can help you..."
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 sm:py-3.5 text-white font-semibold rounded-full text-[14px] transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] transform hover:-translate-y-0.5 cursor-pointer"
                            style={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_DARK} 100%)` }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.95'; }}
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
                      <h3 className="text-xl font-extrabold" style={{ color: DARK_TEXT }}>Our Location</h3>
                      <button
                        onClick={handleFlip}
                        className="text-[12px] font-semibold px-3 py-1.5 rounded-full transition-all duration-300 hover:shadow-md cursor-pointer"
                        style={{ backgroundColor: LIGHT_BG, color: PRIMARY_COLOR }}
                      >
                        ✕ Close
                      </button>
                    </div>
                    <div className="flex-1 rounded-xl overflow-hidden border" style={{ borderColor: BORDER }}>
                      <iframe
                        src={contactData.mapLink}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full min-h-[300px]"
                        title="College Location"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-[15px]" style={{ color: MUTED_TEXT }}>
                        📍 {contactData.address}
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