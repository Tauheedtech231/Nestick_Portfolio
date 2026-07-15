/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, ChevronRight, GraduationCap, Target, BookOpen, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Course {
  id: string;
  name: string;
  introduction: string;
  curriculum: string[];
  whatYouLearn: string[];
}

interface AboutCoursesData {
  badgeText: string;
  sectionTitle: string;
  sectionSubtitle: string;
  courses: Course[];
}

export default function AboutCourses() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openCurriculumItems, setOpenCurriculumItems] = useState<Record<number, boolean>>({});
  const [data, setData] = useState<AboutCoursesData | null>(null);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // ✅ Consistent brand colors - EXACTLY same as Navbar
  const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color
  const PRIMARY_DARK = '#1530b0'; // Darker blue for hover
  const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights
  const lightBg = '#f8faff';
  const borderColor = '#e8edf8';

  // ✅ Session storage key
  const SESSION_KEY = 'about_courses_8';

  // ✅ Fetch data from API with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [AboutCourses] Loading from session storage (instant)');
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
        console.log('🔄 [AboutCourses] Fetching data...');
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=8&section_name=AboutCourses`);
        const result = await response.json();
        console.log('📦 [AboutCourses] API Response:', result);

        let fetchedData;
        if (result.success && result.content) {
          const content = result.content;
          fetchedData = {
            badgeText: content.badgeText || 'Academic Programs',
            sectionTitle: content.sectionTitle || 'Explore Our Programs',
            sectionSubtitle: content.sectionSubtitle || 'Discover our comprehensive academic programs designed to shape future leaders and innovators.',
            courses: content.courses || getDefaultCourses()
          };
          console.log('✅ [AboutCourses] Data loaded');
        } else {
          console.log('⚠️ [AboutCourses] No data, using default');
          fetchedData = {
            badgeText: 'Academic Programs',
            sectionTitle: 'Explore Our Programs',
            sectionSubtitle: 'Discover our comprehensive academic programs designed to shape future leaders and innovators.',
            courses: getDefaultCourses()
          };
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        }
        setData(fetchedData);
      } catch (error) {
        console.error('❌ [AboutCourses] Error:', error);
        setData({
          badgeText: 'Academic Programs',
          sectionTitle: 'Explore Our Programs',
          sectionSubtitle: 'Discover our comprehensive academic programs designed to shape future leaders and innovators.',
          courses: getDefaultCourses()
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getDefaultCourses = (): Course[] => [
    {
      id: "olevel",
      name: "O-Level",
      introduction: "Cambridge O-Level is an internationally recognized qualification designed for students aged 14-16. It provides a strong foundation for further academic study and professional development.",
      curriculum: [
        "English Language & Literature",
        "Mathematics (Extended)",
        "Physics",
        "Chemistry",
        "Biology",
        "Accounting",
        "Business Studies",
        "Computer Science"
      ],
      whatYouLearn: [
        "Critical thinking and analytical skills",
        "Scientific inquiry and experimentation",
        "Mathematical problem-solving",
        "Effective communication in English",
        "Business and financial literacy",
        "Digital literacy and programming fundamentals"
      ]
    },
    {
      id: "alevel",
      name: "A-Level",
      introduction: "Cambridge A-Level is an advanced qualification for students aged 16-19, preparing them for university education and professional careers. It offers in-depth study of specialized subjects.",
      curriculum: [
        "Physics (Advanced)",
        "Chemistry (Advanced)",
        "Biology (Advanced)",
        "Mathematics (Pure & Applied)",
        "Economics",
        "Computer Science (Advanced)",
        "Business Studies (Advanced)"
      ],
      whatYouLearn: [
        "Advanced scientific research methods",
        "Complex mathematical modeling",
        "Economic analysis and policy",
        "Software development and algorithms",
        "Strategic business management",
        "Independent research and critical evaluation"
      ]
    },
    {
      id: "school",
      name: "School Level",
      introduction: "School Level education provides a comprehensive foundation in core academic subjects, preparing students for higher studies and developing essential life skills.",
      curriculum: [
        "Primary Education (Grade 1-5)",
        "Middle School (Grade 6-8)",
        "Matriculation (Science Group)",
        "Matriculation (Arts Group)",
        "Matriculation (Commerce Group)",
        "Islamic Studies Foundation"
      ],
      whatYouLearn: [
        "Basic literacy and numeracy",
        "Science and environmental awareness",
        "Social studies and civic education",
        "Arts and creative expression",
        "Physical education and health",
        "Character development and ethics"
      ]
    }
  ];

  // GSAP Animations
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      const elements = [
        headingRef.current,
        cardRef.current,
        tabsRef.current,
        contentRef.current
      ].filter(Boolean);

      if (elements.length > 0) {
        gsap.set(elements, { clearProps: "all" });
      }

      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      if (tabsRef.current) {
        const tabs = tabsRef.current.querySelectorAll('button');
        gsap.fromTo(tabs,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  useEffect(() => {
    if (contentRef.current && data) {
      gsap.to(contentRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }
    setOpenCurriculumItems({});
  }, [activeIndex, data]);

  const toggleCurriculumItem = (idx: number) => {
    setOpenCurriculumItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // ✅ Show loading only on first visit (no cache)
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.courses || data.courses.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-500">No courses available</p>
        </div>
      </div>
    );
  }

  const currentCourse = data.courses[activeIndex] || data.courses[0];
  const courses = data.courses;

  // Icon mapping based on course id
  const getIcon = (id: string) => {
    if (id === 'olevel') return <GraduationCap className="w-5 h-5" />;
    if (id === 'alevel') return <Target className="w-5 h-5" />;
    return <BookOpen className="w-5 h-5" />;
  };

  return (
    <div
      ref={sectionRef}
      className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Heading - Using PRIMARY_COLOR */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[12px] font-semibold text-[#1c3fe0] shadow-sm mb-3">
          <GraduationCap className="h-3.5 w-3.5" />
          {data.badgeText}
        </div>
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-extrabold text-[#0a1240] leading-[1.08]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {data.sectionTitle}
        </h2>
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <div className="h-1 w-[34px] rounded-full" style={{ background: PRIMARY_COLOR }} />
          <div className="h-[4px] w-[4px] rounded-full" style={{ background: PRIMARY_COLOR, opacity: 0.55 }} />
          <div className="h-[4px] w-[4px] rounded-full" style={{ background: PRIMARY_COLOR, opacity: 0.3 }} />
        </div>
        <p className="mt-3 text-[15px] text-[#3d4566] leading-[1.8] max-w-2xl mx-auto">
          {data.sectionSubtitle}
        </p>
      </div>

      {/* Card - Using PRIMARY_COLOR */}
      <div
        ref={cardRef}
        className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(47,86,251,0.08)] p-6 md:p-8 border border-[#e8edf8]"
        style={{
          boxShadow: '0 10px 40px rgba(47,86,251,0.08), 0 2px 8px rgba(47,86,251,0.04)',
          border: '1px solid #e8edf8'
        }}
      >
        {/* Tabs - Using PRIMARY_COLOR */}
        <div
          ref={tabsRef}
          className="flex flex-wrap justify-around gap-3 mb-8"
        >
          {courses.map((course, index) => (
            <button
              key={course.id || index}
              onClick={() => setActiveIndex(index)}
              className={`
                px-6 py-3 rounded-full text-[14px] font-semibold
                transition-all duration-300 cursor-pointer flex items-center gap-2 flex-1 sm:flex-none min-w-[140px] justify-center
                ${activeIndex === index
                  ? "text-white shadow-[0_8px_25px_-6px_rgba(47,86,251,0.4)] transform scale-[1.02]"
                  : "bg-[#f8faff] text-[#3d4566] hover:bg-[#e8edf8] hover:scale-[1.02]"
                }
              `}
              style={{
                background: activeIndex === index ? `linear-gradient(135deg, ${PRIMARY_COLOR}, ${PRIMARY_DARK})` : undefined,
                fontFamily: "'Inter', sans-serif",
                border: activeIndex === index ? 'none' : '1px solid #e8edf8'
              }}
            >
              <span className="opacity-80">{getIcon(course.id)}</span>
              {course.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} className="space-y-8">

          {/* Introduction */}
          <p className="text-[15px] text-[#3d4566] leading-[1.8]">
            {currentCourse.introduction}
          </p>

          {/* Course Curriculum - Using PRIMARY_COLOR */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: PRIMARY_COLOR }}
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0a1240]">Course Curriculum</h3>
            </div>

            <div
              className="rounded-2xl p-2 space-y-2"
              style={{ background: '#f8faff' }}
            >
              {currentCourse.curriculum.map((item, idx) => {
                const isOpen = !!openCurriculumItems[idx];
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl overflow-hidden border border-[#e8edf8]"
                  >
                    <button
                      onClick={() => toggleCurriculumItem(idx)}
                      className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-[#f8faff] transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <ChevronRight
                          className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                          style={{
                            color: PRIMARY_COLOR,
                            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                          }}
                        />
                        <span className="font-semibold text-[#0a1240] text-[14px]">{item}</span>
                      </div>
                      <ChevronDown
                        className="w-5 h-5 text-[#3d4566] transition-transform duration-300 flex-shrink-0"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-4 pb-4 pl-11 text-[14px] text-[#3d4566]">
                        Part of the {currentCourse.name} curriculum.
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What You'll Learn - Using ACCENT_COLOR (Teal) for highlights */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: ACCENT_COLOR }}
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0a1240]">What You'll Learn</h3>
            </div>

            <div
              className="rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4"
              style={{ background: '#f8faff' }}
            >
              {currentCourse.whatYouLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: ACCENT_COLOR }}
                  >
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10.5L8 14.5L16 5.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[15px] text-[#3d4566]">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}