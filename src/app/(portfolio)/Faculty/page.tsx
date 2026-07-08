'use client';

import Image from 'next/image';

interface StaffMember {
  id: number;
  name: string;
  designation: string;
  specialization: string;
  image: string;
}

const staffData: StaffMember[] = [
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
    id: 6,
    name: "Prof. Robert Brown",
    designation: "Lecturer",
    specialization: "English Literature & Linguistics",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    name: "Dr. Aisha Khan",
    designation: "Associate Professor",
    specialization: "Biology & Environmental Science",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    name: "Prof. James Wilson",
    designation: "Assistant Professor",
    specialization: "Economics & Finance",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 9,
    name: "Dr. Lisa Wang",
    designation: "Professor",
    specialization: "Psychology & Cognitive Science",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

export default function FacultyStaff() {
  // Aspire College Theme Colors
  const TEAL_600 = '#0D9488';
  const LIGHT_BG = '#F8FAFC';
  const DARK_TEXT = '#1E293B';
  const MUTED_TEXT = '#64748B';

  return (
    <section className="min-h-screen bg-white pt-[85px] sm:pt-[93px]">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 sm:w-10 h-px inline-block" style={{ backgroundColor: TEAL_600 }} />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase cursor-pointer" style={{ color: TEAL_600 }}>
              Meet Our Team
            </span>
            <span className="w-8 sm:w-10 h-px inline-block" style={{ backgroundColor: TEAL_600 }} />
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
              style={{ borderColor: '#E2E8F0' }}
            >
              {/* Circular Image */}
              <div className="relative mx-auto mb-4 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full overflow-hidden border-4 transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{ borderColor: TEAL_600 + '40' }}
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
              <p className="text-sm font-semibold mb-2 cursor-pointer" style={{ color: TEAL_600 }}>
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