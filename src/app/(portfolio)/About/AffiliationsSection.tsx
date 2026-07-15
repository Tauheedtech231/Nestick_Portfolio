'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

interface Affiliation {
  id: number;
  name: string;
  note: string;
}

interface AffiliationsData {
  title: string;
  description: string;
  affiliations: Affiliation[];
}

export default function Affiliations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedAffiliation, setSelectedAffiliation] = useState<Affiliation | null>(null);
  const [data, setData] = useState<AffiliationsData>({
    title: 'Our Affiliations',
    description: 'Proudly affiliated with leading educational bodies and institutions worldwide, ensuring quality and recognition for our students.',
    affiliations: [
      { id: 1, name: "Higher Education Commission", note: "Recognized by HEC Pakistan" },
      { id: 2, name: "Pakistan Engineering Council", note: "Accredited by PEC" },
      { id: 3, name: "Pakistan Medical Commission", note: "Approved by PMC" },
      { id: 4, name: "University of the Punjab", note: "Affiliated with PU" },
      { id: 5, name: "National Accreditation Council", note: "Accredited by NAC" },
      { id: 6, name: "British Council", note: "British Council Partner" },
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Session storage key
  const SESSION_KEY = 'affiliations_8';

  // ✅ Inject styles on client only to avoid hydration mismatch
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'affiliations-styles';
    style.textContent = `
      @keyframes marqueeScrollAffil {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .marquee-track-affil {
        animation: marqueeScrollAffil 26s linear infinite;
      }
      .marquee-track-affil:hover {
        animation-play-state: paused;
      }
      @media (prefers-reduced-motion: reduce) {
        .marquee-track-affil { animation: none; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById('affiliations-styles');
      if (el) el.remove();
    };
  }, []);

  // ✅ Fetch data with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [Affiliations] Loading from session storage (instant)');
          const parsedData = JSON.parse(cachedData);
          setData(parsedData);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    async function fetchData() {
      try {
        console.log('🔄 [Affiliations] Starting API call...');
        console.log('📡 [Affiliations] Fetching from: https://dynamic-section-api.vercel.app/api/public/sections?college_id=8&section_name=Affiliations');
        
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=8&section_name=Affiliations`);
        console.log('📥 [Affiliations] Response status:', response.status);
        
        const result = await response.json();
        console.log('📦 [Affiliations] Full API Response:', JSON.stringify(result, null, 2));
        console.log('📦 [Affiliations] success:', result.success);
        console.log('📦 [Affiliations] content:', result.content);
        console.log('📦 [Affiliations] content.title:', result.content?.title);
        console.log('📦 [Affiliations] content.description:', result.content?.description);
        console.log('📦 [Affiliations] content.affiliations:', result.content?.affiliations);

        let fetchedData;
        if (result.success && result.content) {
          console.log('✅ [Affiliations] Data found, setting state...');
          fetchedData = {
            title: result.content.title || 'Our Affiliations',
            description: result.content.description || 'Proudly affiliated with leading educational bodies and institutions worldwide, ensuring quality and recognition for our students.',
            affiliations: result.content.affiliations || [
              { id: 1, name: "Higher Education Commission", note: "Recognized by HEC Pakistan" },
              { id: 2, name: "Pakistan Engineering Council", note: "Accredited by PEC" },
              { id: 3, name: "Pakistan Medical Commission", note: "Approved by PMC" },
              { id: 4, name: "University of the Punjab", note: "Affiliated with PU" },
              { id: 5, name: "National Accreditation Council", note: "Accredited by NAC" },
              { id: 6, name: "British Council", note: "British Council Partner" },
            ]
          };
          console.log('✅ [Affiliations] Data set successfully');
        } else {
          console.log('⚠️ [Affiliations] No data in response, using default');
          fetchedData = {
            title: 'Our Affiliations',
            description: 'Proudly affiliated with leading educational bodies and institutions worldwide, ensuring quality and recognition for our students.',
            affiliations: [
              { id: 1, name: "Higher Education Commission", note: "Recognized by HEC Pakistan" },
              { id: 2, name: "Pakistan Engineering Council", note: "Accredited by PEC" },
              { id: 3, name: "Pakistan Medical Commission", note: "Approved by PMC" },
              { id: 4, name: "University of the Punjab", note: "Affiliated with PU" },
              { id: 5, name: "National Accreditation Council", note: "Accredited by NAC" },
              { id: 6, name: "British Council", note: "British Council Partner" },
            ]
          };
          setError('No data received from API');
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        }
        setData(fetchedData);
      } catch (error) {
        console.error('❌ [Affiliations] Error fetching:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        // ✅ Don't cache on error
      } finally {
        console.log('🏁 [Affiliations] Fetch complete, setting loading false');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleItemClick = (item: Affiliation) => {
    console.log('🔍 [Affiliations] Clicked:', item.name);
    setSelectedAffiliation(item);
  };

  const handleCloseModal = () => {
    console.log('🔍 [Affiliations] Closing modal');
    setSelectedAffiliation(null);
  };

  // ✅ Show loading only on first visit (no cache)
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    console.log('⏳ [Affiliations] Loading state...');
    return (
      <section className="relative w-full overflow-hidden bg-white py-10 min-h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2f56fb]"></div>
      </section>
    );
  }

  if (error && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    console.log('❌ [Affiliations] Error state:', error);
    return (
      <section className="relative w-full overflow-hidden bg-white py-10 min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading affiliations: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[#2f56fb] text-white rounded-lg cursor-pointer"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  console.log('📊 [Affiliations] Rendering with data:', data);
  console.log('📊 [Affiliations] data.title:', data.title);
  console.log('📊 [Affiliations] data.affiliations length:', data.affiliations?.length);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-10"
    >
      {/* ✅ Style tag removed - now injected via useEffect */}

      {/* Heading with Description */}
      <motion.div
        className="relative z-[1] mx-auto max-w-3xl px-5 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl font-extrabold text-[#0a1240]"
        >
          {data.title || 'Our Affiliations'}
        </motion.h2>
       
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-[15px] text-[#3d4566] leading-[1.8]"
        >
          {data.description || 'Proudly affiliated with leading educational bodies and institutions worldwide, ensuring quality and recognition for our students.'}
        </motion.p>
      </motion.div>

      {/* Diagonal ribbon slider */}
      <div className="relative mt-10 w-[170%] -translate-x-[15%] -rotate-3">
        <div className="overflow-hidden bg-[#2f56fb] py-5 cursor-pointer">
          <div className="marquee-track-affil flex w-max whitespace-nowrap">
            {[0, 1].map((rep) => (
              <div key={rep} className="flex items-center gap-10 px-5" aria-hidden={rep === 1}>
                {data.affiliations && data.affiliations.length > 0 ? (
                  data.affiliations.map((item) => (
                    <span
                      key={item.id}
                      className="flex items-center gap-10 text-lg sm:text-2xl font-extrabold uppercase tracking-wide text-white hover:text-blue-200 transition-colors duration-200 cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    >
                      {item.name}
                      <span aria-hidden="true">◆</span>
                    </span>
                  ))
                ) : (
                  <span className="text-white text-lg">No affiliations available</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedAffiliation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl cursor-pointer"
            >
              ✕
            </button>

            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-[#0a1240] mb-3">
                {selectedAffiliation.name}
              </h3>
              <p className="text-[15px] text-[#3d4566] leading-relaxed">
                {selectedAffiliation.note}
              </p>
              <div className="mt-6 w-16 h-1 bg-[#2f56fb] rounded-full mx-auto" />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}