import Image from 'next/image';

interface FacilityCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
}

interface EventCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  type: string;
}

interface ClubCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const StudentLifePage = () => {
  // Campus Facilities Data
  const facilities: FacilityCardProps[] = [
    {
      title: "Advanced Science Labs",
      description: "State-of-the-art laboratories equipped with modern instruments for physics, chemistry, and biology research.",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "🔬"
    },
    {
      title: "Digital Library",
      description: "A vast collection of books, journals, and digital resources with quiet study spaces and group discussion rooms.",
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "📚"
    },
    {
      title: "Sports Complex",
      description: "Modern sports facilities including basketball courts, football field, swimming pool, and fitness center.",
      imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "⚽"
    },
    {
      title: "Student Hostels",
      description: "Comfortable and secure accommodation with modern amenities, WiFi, and 24/7 security.",
      imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "🏠"
    },
    {
      title: "Cafeteria & Food Court",
      description: "Multiple dining options serving healthy and delicious meals in a vibrant social environment.",
      imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "🍽️"
    },
    {
      title: "Auditorium",
      description: "A 500-seat auditorium with advanced audio-visual equipment for seminars, conferences, and cultural events.",
      imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "🎭"
    }
  ];

  // Events Data
  const events: EventCardProps[] = [
    {
      title: "Annual Cultural Fest",
      description: "A three-day celebration of art, music, dance, and drama with performances and competitions.",
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "March 15-17, 2024",
      type: "Cultural"
    },
    {
      title: "Tech Symposium",
      description: "Showcasing innovative projects and research in technology with industry expert talks.",
      imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "April 5, 2024",
      type: "Technical"
    },
    {
      title: "Sports Tournament",
      description: "Inter-college competitions in various sports including cricket, football, and basketball.",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "February 20-25, 2024",
      type: "Sports"
    },
    {
      title: "Career Fair",
      description: "Connect with top companies and explore internship and job opportunities across various fields.",
      imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      date: "May 10, 2024",
      type: "Professional"
    }
  ];

  // Clubs Data
  const clubs: ClubCardProps[] = [
    {
      title: "Coding Club",
      description: "Learn programming, participate in hackathons, and work on real-world software projects.",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Technical"
    },
    {
      title: "Drama Society",
      description: "Explore acting, script writing, and stage production through workshops and performances.",
      imageUrl: "https://images.unsplash.com/photo-1549144511-c559a6f30d82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Cultural"
    },
    {
      title: "Music Club",
      description: "Join our choir, band, or learn various musical instruments with professional guidance.",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Cultural"
    },
    {
      title: "Environmental Club",
      description: "Promote sustainability and environmental awareness through campus initiatives and community projects.",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Social"
    },
    {
      title: "Debating Society",
      description: "Enhance your public speaking and critical thinking skills through regular debates and competitions.",
      imageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Academic"
    },
    {
      title: "Sports Club",
      description: "Regular training sessions and competitions in various sports with professional coaches.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Sports"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-purple-800 dark:from-blue-950 dark:to-purple-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Student Life</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Experience a vibrant campus life with state-of-the-art facilities, exciting events, and diverse student communities.
          </p>
        </div>
      </section>

      {/* Campus Facilities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Campus Facilities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our campus is equipped with modern facilities designed to support your academic journey and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <FacilityCard key={index} {...facility} />
            ))}
          </div>
        </div>
      </section>

      {/* Events & Activities Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Events & Activities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Engage in a wide range of events that foster learning, creativity, and community building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Student Societies & Clubs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Student Societies & Clubs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our diverse range of clubs and societies to pursue your interests and develop new skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => (
              <ClubCard key={index} {...club} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Facility Card Component
const FacilityCard = ({ title, description, imageUrl, icon }: FacilityCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg">
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// Event Card Component
const EventCard = ({ title, description, imageUrl, date, type }: EventCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            type === 'Cultural' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
            type === 'Technical' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            type === 'Sports' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
          }`}>
            {type}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// Club Card Component
const ClubCard = ({ title, description, imageUrl, category }: ClubCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            category === 'Technical' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            category === 'Cultural' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
            category === 'Sports' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            category === 'Academic' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {category}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StudentLifePage;