"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  type: 'campus' | 'event' | 'video';
  videoUrl?: string;
  description?: string;
}

const galleryData: GalleryItem[] = [
  // Campus Photos
  {
    id: 1,
    title: "Main Campus Building",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "campus",
    description: "Our beautiful main campus building with modern architecture and state-of-the-art facilities."
  },
  {
    id: 2,
    title: "Library Interior",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "campus",
    description: "Spacious library with thousands of books, study areas, and digital resources."
  },
  {
    id: 3,
    title: "Science Laboratory",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "campus",
    description: "Modern science labs equipped with latest technology for practical learning."
  },
  {
    id: 4,
    title: "Student Common Area",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "campus",
    description: "Vibrant common area where students gather, collaborate, and relax."
  },
  {
    id: 5,
    title: "Sports Ground",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "campus",
    description: "Well-maintained sports ground for cricket, football, and athletics."
  },
  {
    id: 6,
    title: "Auditorium",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "campus",
    description: "State-of-the-art auditorium for events, seminars, and performances."
  },
  // Event Photos
  {
    id: 7,
    title: "Annual Science Fair",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "event",
    description: "Students showcasing innovative science projects at annual science fair."
  },
  {
    id: 8,
    title: "Graduation Ceremony",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "event",
    description: "Celebrating the success and achievements of our graduating students."
  },
  {
    id: 9,
    title: "Cultural Festival",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "event",
    description: "Vibrant cultural festival celebrating diversity and talent."
  },
  {
    id: 10,
    title: "Sports Day",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "event",
    description: "Annual sports day with competitive events and team spirit."
  },
  {
    id: 11,
    title: "Workshop Session",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "event",
    description: "Interactive workshops by industry experts and professionals."
  },
  {
    id: 12,
    title: "Guest Lecture",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "event",
    description: "Distinguished guest speakers sharing knowledge and insights."
  },
  // Video Tours
  {
    id: 13,
    title: "Virtual Campus Tour",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/0iZAAM3NOFk",
    description: "Take a virtual tour of our beautiful campus and facilities."
  },
  {
    id: 14,
    title: "University Life",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/0iZAAM3NOFk",
    description: "Experience the vibrant student life at Aspire College."
  },
  {
    id: 15,
    title: "Campus Facilities Tour",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    type: "video",
    videoUrl: "https://www.youtube.com/embed/0iZAAM3NOFk",
    description: "Explore our state-of-the-art facilities and learning spaces."
  }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredData, setFilteredData] = useState<GalleryItem[]>(galleryData);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'campus', label: 'Campus' },
    { value: 'event', label: 'Events' },
    { value: 'video', label: 'Videos' },
  ];

  // Filter data based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredData(galleryData);
    } else {
      setFilteredData(galleryData.filter(item => item.type === activeFilter));
    }
  }, [activeFilter]);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedItem(null), 300);
  };

  // Colors
  const TEAL_600 = '#0D9488';
  const BLUE_600 = '#2563EB';
  const DARK_TEXT = '#1E293B';
  const MUTED_TEXT = '#64748B';
  const LIGHT_BG = '#F8FAFC';

  // Animation variants
  const headingVariants:Variants = {
    hidden: { opacity: 0, x: -200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      }
    }
  };

  const subHeadingVariants:Variants = {
    hidden: { opacity: 0, x: -180 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.4,
      }
    }
  };

  const filterVariants:Variants = {
    hidden: { opacity: 0, x: 300 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.4,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.6,
      }
    }
  };

  const itemVariants:Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 pt-[40px] ">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#101820' }}>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={headingVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Our <span style={{ color: TEAL_600 }}>Gallery</span>
            </motion.h1>

            <motion.p 
              variants={subHeadingVariants}
              className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              Explore our campus, events, and facilities through photos and virtual tours
            </motion.p>

            {/* Filter Options */}
            <motion.div 
              variants={filterVariants}
              className="flex flex-wrap justify-center gap-2 mt-8"
            >
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    activeFilter === option.value
                      ? 'bg-[#0D9488] text-white shadow-md'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>

            {/* Results Count */}
            <motion.div 
              className="mt-3 text-sm text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Showing {filteredData.length} {filteredData.length === 1 ? 'item' : 'items'}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid - 3 Cards per row with Continuous Float */}
      <section className="py-16" style={{ backgroundColor: LIGHT_BG }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: Math.min(index * 0.08, 0.5),
                }}
                onClick={() => openModal(item)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-[#E2E8F0] cursor-pointer group"
              >
                <div className="relative h-56 overflow-hidden">
                  {/* Continuous Floating Animation on Images */}
                  <motion.div
                    className="w-full h-full"
                    animate={{
                      y: [0, -8, 0, 8, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 right-3">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg"
                      style={{ 
                        backgroundColor: item.type === 'campus' ? TEAL_600 : 
                                      item.type === 'event' ? BLUE_600 : '#7C3AED'
                      }}
                    >
                      {item.type === 'campus' ? '📸 Campus' : 
                       item.type === 'event' ? '🎉 Event' : '🎬 Video'}
                    </span>
                  </div>

                  {/* Click to view overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 px-4 py-2 rounded-full">
                      Click to view
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-2 cursor-pointer" style={{ color: DARK_TEXT }}>
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: MUTED_TEXT }}>No items found matching your filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white z-10 rounded-t-2xl border-b border-[#E2E8F0] px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold" style={{ color: DARK_TEXT }}>
                  {selectedItem.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                >
                  <XMarkIcon className="w-6 h-6" style={{ color: MUTED_TEXT }} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                {/* Image/Video */}
                <div className="relative rounded-xl overflow-hidden" style={{ backgroundColor: LIGHT_BG }}>
                  {selectedItem.type === 'video' && selectedItem.videoUrl ? (
                    <div className="aspect-video">
                      <iframe
                        src={selectedItem.videoUrl}
                        title={selectedItem.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative h-80">
                      <Image
                        src={selectedItem.image}
                        alt={selectedItem.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                {selectedItem.description && (
                  <p className="text-sm leading-relaxed" style={{ color: MUTED_TEXT }}>
                    {selectedItem.description}
                  </p>
                )}

                {/* Type Badge */}
                <div className="flex items-center gap-2">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ 
                      backgroundColor: selectedItem.type === 'campus' ? TEAL_600 : 
                                    selectedItem.type === 'event' ? BLUE_600 : '#7C3AED'
                    }}
                  >
                    {selectedItem.type === 'campus' ? '📸 Campus' : 
                     selectedItem.type === 'event' ? '🎉 Event' : '🎬 Video'}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="w-full py-3 font-semibold rounded-full text-sm transition-all duration-300 cursor-pointer border-2"
                  style={{ borderColor: '#E2E8F0', color: DARK_TEXT }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}