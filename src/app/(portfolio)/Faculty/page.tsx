/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface StaffMember {
  id: number;
  name: string;
  designation: string;
  specialization: string;
  image: string;
}

export default function FacultyStaff() {
  const [loading, setLoading] = useState(true);
  const [staffData, setStaffData] = useState<StaffMember[]>([]);
  const collegeId = "8"; // ✅ Hardcoded college ID
  const SESSION_KEY = `faculty_staff_${collegeId}`;

  // ✅ Consistent brand colors - EXACTLY same as Navbar
  const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color (same as Navbar)
  const PRIMARY_DARK = '#1530b0'; // Darker blue for hover (same as Navbar)
  const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights
  const LIGHT_BG = '#F8FAFC';
  const DARK_TEXT = '#1E293B';
  const MUTED_TEXT = '#64748B';

  // ✅ Fetch faculty data from API with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [FacultyStaff] Loading from session storage (instant)');
          const parsedData = JSON.parse(cachedData);
          setStaffData(parsedData);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    async function fetchFacultyData() {
      try {
        setLoading(true);
        console.log('🔄 [FacultyStaff] Fetching from API...');
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=Faculty`);
        const result = await response.json();
        
        console.log('📦 [FacultyStaff] API Response:', result);

        let fetchedData;
        if (result.success && result.content && result.content.faculty) {
          // ✅ Map faculty data to StaffMember format
          const facultyMembers = result.content.faculty.map((member: any) => ({
            id: member.id || Date.now() + Math.random(),
            name: member.name || 'Faculty Member',
            designation: member.designation || member.position || 'Faculty',
            specialization: member.expertise?.join(', ') || member.specialization || 'Education',
            image: member.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
          }));
          
          fetchedData = facultyMembers;
          console.log('✅ [FacultyStaff] Loaded', facultyMembers.length, 'faculty members');
        } else {
          // ✅ Fallback to default data if API returns no data
          console.log('⚠️ [FacultyStaff] No data, using fallback');
          fetchedData = getDefaultStaffData();
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        }
        setStaffData(fetchedData);
      } catch (error) {
        console.error('❌ [FacultyStaff] Error fetching:', error);
        // ✅ Don't cache on error
        setStaffData(getDefaultStaffData());
      } finally {
        setLoading(false);
      }
    }

    fetchFacultyData();
  }, [collegeId, SESSION_KEY]);

  // ✅ Default staff data (fallback)
  const getDefaultStaffData = (): StaffMember[] => {
    return [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        designation: "Professor & Dean",
        specialization: "Computer Science & AI",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 2,
        name: "Prof. Michael Chen",
        designation: "Associate Professor",
        specialization: "Mathematics & Statistics",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 3,
        name: "Dr. Emily Rodriguez",
        designation: "Assistant Professor",
        specialization: "Physics & Quantum Mechanics",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 4,
        name: "Dr. Aisha Khan",
        designation: "Associate Professor",
        specialization: "Biology & Environmental Science",
        image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 5,
        name: "Prof. James Wilson",
        designation: "Assistant Professor",
        specialization: "Economics & Finance",
        image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 6,
        name: "Dr. Lisa Wang",
        designation: "Professor",
        specialization: "Psychology & Cognitive Science",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }
    ];
  };

  // ✅ Show loading only on first visit (no cache)
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <section className="min-h-screen bg-white pt-[85px] sm:pt-[93px]">
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12 flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2f56fb] mx-auto mb-4"></div>
            <p className="text-gray-500">Loading faculty members...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white pt-[85px] sm:pt-[93px]">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* Header - Using PRIMARY_COLOR */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 sm:w-10 h-px inline-block" style={{ backgroundColor: PRIMARY_COLOR }} />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase cursor-pointer" style={{ color: PRIMARY_COLOR }}>
              Meet Our Team
            </span>
            <span className="w-8 sm:w-10 h-px inline-block" style={{ backgroundColor: PRIMARY_COLOR }} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold cursor-pointer" style={{ color: DARK_TEXT }}>
            Our Faculty & Staff
          </h2>
          <p className="text-sm sm:text-base mt-3 max-w-2xl mx-auto cursor-pointer" style={{ color: MUTED_TEXT }}>
            Meet our dedicated team of experienced educators and professionals committed to student success.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {staffData.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden text-center p-6 border cursor-pointer"
              style={{ 
                borderColor: '#E2E8F0',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = PRIMARY_COLOR;
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(47,86,251,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
              }}
            >
              {/* Circular Image - Using PRIMARY_COLOR */}
              <div className="relative mx-auto mb-4 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full overflow-hidden border-4 transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{ borderColor: PRIMARY_COLOR + '40' }}
              >
                <Image
                  src={staff.image}
                  alt={staff.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold mb-1 line-clamp-1 cursor-pointer" style={{ color: DARK_TEXT }}>
                {staff.name}
              </h3>
              <p className="text-sm font-semibold mb-2 cursor-pointer" style={{ color: PRIMARY_COLOR }}>
                {staff.designation}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed cursor-pointer" style={{ color: MUTED_TEXT }}>
                {staff.specialization}
              </p>
            </div>
          ))}
        </div>

        {/* Count */}
        <div className="text-center mt-10 sm:mt-12">
          <p className="text-xs sm:text-sm cursor-pointer" style={{ color: MUTED_TEXT }}>
            Showing {staffData.length} faculty members
          </p>
        </div>
      </div>
    </section>
  );
}