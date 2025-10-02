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
    name  : "Dr. Lisa Wang",
    designation: "Professor",
    specialization: "Psychology & Cognitive Science",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

export default function FacultyStaff() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Our Faculty & Staff
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Meet our dedicated team of experienced educators and professionals committed to student success.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {staffData.map((staff) => (
            <div
              key={staff.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden text-center p-6"
            >
              {/* Circular Image */}
              <div className="relative mx-auto mb-4 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-500 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={staff.image}
                  alt={staff.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">
                {staff.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2">
                {staff.designation}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {staff.specialization}
              </p>
            </div>
          ))}
        </div>

        {/* Optional: Count */}
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Showing {staffData.length} faculty members
          </p>
        </div>
      </div>
    </section>
  );
}
