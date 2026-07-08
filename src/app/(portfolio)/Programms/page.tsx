"use client";

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Program {
  id: number;
  name: string;
  fullName: string;
  duration: string;
  eligibility: string;
  feePerYear: string;
  feePerSemester: string;
  image: string;
  description: string;
  highlights: string[];
  level?: 'school' | 'olevel' | 'alevel' | 'college' | 'technical';
  category?: string;
}

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [formType, setFormType] = useState<'apply' | 'info'>('apply');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // All Programs Data - School, O-Level, A-Level, College, Technical Only
  const programs: Program[] = [
    // ==================== SCHOOL (Board System) ====================
    {
      id: 1,
      name: 'Play Group',
      fullName: 'Play Group (Age 2-3 Years)',
      duration: '1 Year',
      eligibility: 'Age 2+ years',
      feePerYear: 'PKR 15,000',
      feePerSemester: 'PKR 7,500',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Early childhood education program focusing on social, emotional, and cognitive development through play-based learning.',
      highlights: ['Social Skills', 'Cognitive Development', 'Creative Play', 'Motor Skills'],
      level: 'school',
      category: 'primary'
    },
    {
      id: 2,
      name: 'Nursery',
      fullName: 'Nursery (Age 3-4 Years)',
      duration: '1 Year',
      eligibility: 'Age 3+ years',
      feePerYear: 'PKR 18,000',
      feePerSemester: 'PKR 9,000',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Foundation years program introducing basic literacy, numeracy, and social skills.',
      highlights: ['Basic Literacy', 'Numeracy', 'Social Skills', 'Art & Craft'],
      level: 'school',
      category: 'primary'
    },
    {
      id: 3,
      name: 'Kindergarten (KG)',
      fullName: 'Kindergarten (Age 4-5 Years)',
      duration: '1 Year',
      eligibility: 'Age 4+ years',
      feePerYear: 'PKR 20,000',
      feePerSemester: 'PKR 10,000',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Kindergarten program preparing children for formal schooling with structured learning activities.',
      highlights: ['Reading Readiness', 'Writing Skills', 'Basic Math', 'Science Exploration'],
      level: 'school',
      category: 'primary'
    },
    {
      id: 4,
      name: 'Prep',
      fullName: 'Preparatory (Age 5-6 Years)',
      duration: '1 Year',
      eligibility: 'Age 5+ years',
      feePerYear: 'PKR 22,000',
      feePerSemester: 'PKR 11,000',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Preparatory program bridging early years and primary education with comprehensive learning.',
      highlights: ['Reading', 'Writing', 'Mathematics', 'Science', 'Social Studies'],
      level: 'school',
      category: 'primary'
    },
    {
      id: 5,
      name: 'Primary School',
      fullName: 'Primary Education (Class 1-5)',
      duration: '5 Years',
      eligibility: 'Completion of Prep',
      feePerYear: 'PKR 25,000',
      feePerSemester: 'PKR 12,500',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Primary education building strong foundation in core subjects with holistic development.',
      highlights: ['Mathematics', 'English', 'Science', 'Social Studies', 'Arts & Crafts'],
      level: 'school',
      category: 'primary'
    },
    {
      id: 6,
      name: 'Middle School',
      fullName: 'Middle School (Class 6-8)',
      duration: '3 Years',
      eligibility: 'Completion of Primary education',
      feePerYear: 'PKR 30,000',
      feePerSemester: 'PKR 15,000',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Middle school program bridging primary and secondary education with comprehensive subjects.',
      highlights: ['Advanced Mathematics', 'Science', 'English Literature', 'Computer Basics', 'Social Studies'],
      level: 'school',
      category: 'middle'
    },
    {
      id: 7,
      name: 'Matric (SSC)',
      fullName: 'Secondary School Certificate (Class 9-10)',
      duration: '2 Years',
      eligibility: 'Completion of Middle school with minimum 50% marks',
      feePerYear: 'PKR 35,000',
      feePerSemester: 'PKR 17,500',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Comprehensive secondary education program preparing students for higher studies and board examinations.',
      highlights: ['Science Group', 'Arts Group', 'Computer Science', 'Commerce Group'],
      level: 'school',
      category: 'secondary'
    },
    {
      id: 8,
      name: 'Intermediate (HSSC)',
      fullName: 'Higher Secondary School Certificate (Class 11-12)',
      duration: '2 Years',
      eligibility: 'Matriculation with minimum 50% marks',
      feePerYear: 'PKR 45,000',
      feePerSemester: 'PKR 22,500',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Higher secondary education program with specialized streams for professional careers.',
      highlights: ['Pre-Medical', 'Pre-Engineering', 'Computer Science', 'Commerce', 'Humanities'],
      level: 'college',
      category: 'intermediate'
    },

    // ==================== O LEVEL ====================
    {
      id: 9,
      name: 'O-Level English Language',
      fullName: 'Cambridge O-Level English Language',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level English Language focusing on language skills, comprehension, and writing.',
      highlights: ['Language Skills', 'Comprehension', 'Creative Writing', 'Grammar'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 10,
      name: 'O-Level English Literature',
      fullName: 'Cambridge O-Level English Literature',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level English Literature covering poetry, prose, and drama analysis.',
      highlights: ['Poetry Analysis', 'Prose Studies', 'Drama', 'Literary Criticism'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 11,
      name: 'O-Level Urdu',
      fullName: 'Cambridge O-Level Urdu (First Language)',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Urdu focusing on language skills, literature, and comprehension.',
      highlights: ['Urdu Grammar', 'Literature', 'Comprehension', 'Creative Writing'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 12,
      name: 'O-Level Islamiyat',
      fullName: 'Cambridge O-Level Islamiyat',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Islamiyat covering Islamic beliefs, history, and ethics.',
      highlights: ['Islamic Beliefs', 'Quranic Studies', 'Hadith', 'Islamic History'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 13,
      name: 'O-Level Pakistan Studies',
      fullName: 'Cambridge O-Level Pakistan Studies',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Pakistan Studies covering history, geography, and culture of Pakistan.',
      highlights: ['History of Pakistan', 'Geography', 'Culture', 'Government'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 14,
      name: 'O-Level Mathematics',
      fullName: 'Cambridge O-Level Mathematics',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 65% marks in Mathematics or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Mathematics focusing on algebra, geometry, trigonometry, and statistics.',
      highlights: ['Algebra', 'Geometry', 'Trigonometry', 'Statistics'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 15,
      name: 'O-Level Additional Mathematics',
      fullName: 'Cambridge O-Level Additional Mathematics',
      duration: '2 Years',
      eligibility: 'O-Level Mathematics with minimum B grade or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Additional Mathematics covering advanced topics for students aiming for A-Level Mathematics.',
      highlights: ['Advanced Algebra', 'Calculus', 'Vectors', 'Complex Numbers'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 16,
      name: 'O-Level Physics',
      fullName: 'Cambridge O-Level Physics',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks in Science or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Physics covering mechanics, electricity, waves, and modern physics.',
      highlights: ['Mechanics', 'Electricity', 'Waves', 'Modern Physics'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 17,
      name: 'O-Level Chemistry',
      fullName: 'Cambridge O-Level Chemistry',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks in Science or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Chemistry covering organic, inorganic, and physical chemistry.',
      highlights: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Laboratory Skills'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 18,
      name: 'O-Level Biology',
      fullName: 'Cambridge O-Level Biology',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks in Science or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Biology covering cells, genetics, ecology, and human physiology.',
      highlights: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 19,
      name: 'O-Level Computer Science',
      fullName: 'Cambridge O-Level Computer Science',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Computer Science focusing on programming, algorithms, and computational thinking.',
      highlights: ['Programming', 'Algorithms', 'Computational Thinking', 'Data Structures'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 20,
      name: 'O-Level Business Studies',
      fullName: 'Cambridge O-Level Business Studies',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Business Studies covering business operations, marketing, and finance.',
      highlights: ['Business Operations', 'Marketing', 'Finance', 'Entrepreneurship'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 21,
      name: 'O-Level Accounting',
      fullName: 'Cambridge O-Level Accounting',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Accounting covering financial statements, bookkeeping, and analysis.',
      highlights: ['Financial Statements', 'Bookkeeping', 'Accounting Principles', 'Analysis'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 22,
      name: 'O-Level Sociology',
      fullName: 'Cambridge O-Level Sociology',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Sociology covering social structures, institutions, and human behavior.',
      highlights: ['Social Structures', 'Social Institutions', 'Human Behavior', 'Social Change'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 23,
      name: 'O-Level Psychology',
      fullName: 'Cambridge O-Level Psychology',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Psychology covering human behavior, cognition, and mental processes.',
      highlights: ['Human Behavior', 'Cognition', 'Mental Health', 'Social Psychology'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 24,
      name: 'O-Level Environmental Management',
      fullName: 'Cambridge O-Level Environmental Management',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Environmental Management covering ecosystems, conservation, and sustainability.',
      highlights: ['Ecosystems', 'Conservation', 'Sustainability', 'Environmental Issues'],
      level: 'olevel',
      category: 'olevel'
    },
    {
      id: 25,
      name: 'O-Level Combined Sciences',
      fullName: 'Cambridge O-Level Combined Sciences (Physics, Chemistry, Biology)',
      duration: '2 Years',
      eligibility: 'Completion of Grade 8 with minimum 60% marks in Science or equivalent',
      feePerYear: 'PKR 80,000',
      feePerSemester: 'PKR 40,000',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge O-Level Combined Sciences covering Physics, Chemistry, and Biology at a combined level for students who want a broad science foundation.',
      highlights: ['Physics Fundamentals', 'Chemistry Basics', 'Biology Essentials', 'Lab Skills'],
      level: 'olevel',
      category: 'olevel'
    },

    // ==================== A LEVEL ====================
    {
      id: 26,
      name: 'A-Level Mathematics',
      fullName: 'Cambridge A-Level Mathematics',
      duration: '2 Years',
      eligibility: 'O-Level Mathematics with minimum B grade or O-Level Additional Mathematics with minimum C grade',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Mathematics covering pure mathematics, mechanics, and statistics.',
      highlights: ['Pure Mathematics', 'Mechanics', 'Statistics', 'Further Mathematics'],
      level: 'alevel',
      category: 'alevel'
    },
    {
      id: 27,
      name: 'A-Level Further Mathematics',
      fullName: 'Cambridge A-Level Further Mathematics',
      duration: '2 Years',
      eligibility: 'A-Level Mathematics with minimum B grade or equivalent',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Further Mathematics covering advanced topics for STEM-focused students.',
      highlights: ['Advanced Pure', 'Advanced Mechanics', 'Advanced Statistics', 'Discrete Mathematics'],
      level: 'alevel',
      category: 'alevel'
    },
    {
      id: 28,
      name: 'A-Level Statistics',
      fullName: 'Cambridge A-Level Statistics',
      duration: '2 Years',
      eligibility: 'A-Level Mathematics with minimum C grade or equivalent',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Statistics covering probability, hypothesis testing, and statistical modeling.',
      highlights: ['Probability', 'Hypothesis Testing', 'Statistical Modeling', 'Data Analysis'],
      level: 'alevel',
      category: 'alevel'
    },
    {
      id: 29,
      name: 'A-Level Physics',
      fullName: 'Cambridge A-Level Physics',
      duration: '2 Years',
      eligibility: 'O-Level Physics with minimum B grade or O-Level Combined Sciences with minimum A grade',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Physics covering advanced mechanics, electromagnetism, and quantum physics.',
      highlights: ['Advanced Mechanics', 'Electromagnetism', 'Quantum Physics', 'Thermodynamics'],
      level: 'alevel',
      category: 'alevel'
    },
    {
      id: 30,
      name: 'A-Level Chemistry',
      fullName: 'Cambridge A-Level Chemistry',
      duration: '2 Years',
      eligibility: 'O-Level Chemistry with minimum B grade or O-Level Combined Sciences with minimum A grade',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Chemistry covering advanced organic, inorganic, and physical chemistry.',
      highlights: ['Advanced Organic', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
      level: 'alevel',
      category: 'alevel'
    },
    {
      id: 31,
      name: 'A-Level Biology',
      fullName: 'Cambridge A-Level Biology',
      duration: '2 Years',
      eligibility: 'O-Level Biology with minimum B grade or O-Level Combined Sciences with minimum A grade',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Biology covering molecular biology, genetics, and advanced ecology.',
      highlights: ['Molecular Biology', 'Genetics', 'Advanced Ecology', 'Biochemistry'],
      level: 'alevel',
      category: 'alevel'
    },
    {
      id: 32,
      name: 'A-Level Computer Science',
      fullName: 'Cambridge A-Level Computer Science',
      duration: '2 Years',
      eligibility: 'O-Level Computer Science with minimum B grade or equivalent',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Computer Science covering advanced programming, algorithms, and software development.',
      highlights: ['Advanced Programming', 'Algorithms', 'Software Development', 'Data Science'],
      level: 'alevel',
      category: 'alevel'
    },
    {
      id: 33,
      name: 'A-Level Economics',
      fullName: 'Cambridge A-Level Economics',
      duration: '2 Years',
      eligibility: 'O-Level Economics or Business Studies with minimum B grade or equivalent',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Economics covering microeconomics, macroeconomics, and global economics.',
      highlights: ['Microeconomics', 'Macroeconomics', 'Global Economics', 'Economic Policy'],
      level: 'alevel',
      category: 'alevel'
    },
    {
      id: 34,
      name: 'A-Level Business Studies',
      fullName: 'Cambridge A-Level Business Studies',
      duration: '2 Years',
      eligibility: 'O-Level Business Studies with minimum B grade or equivalent',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Business Studies covering strategic management, marketing, and business operations.',
      highlights: ['Strategic Management', 'Marketing', 'Business Operations', 'International Business'],
      level: 'alevel',
      category: 'alevel'
    },
    {
      id: 35,
      name: 'A-Level Psychology',
      fullName: 'Cambridge A-Level Psychology',
      duration: '2 Years',
      eligibility: 'O-Level Psychology with minimum B grade or equivalent',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Psychology covering advanced human behavior, cognition, and research methods.',
      highlights: ['Advanced Human Behavior', 'Cognition', 'Research Methods', 'Mental Health'],
      level: 'alevel',
      category: 'alevel'
    },
    {
      id: 36,
      name: 'A-Level Sociology',
      fullName: 'Cambridge A-Level Sociology',
      duration: '2 Years',
      eligibility: 'O-Level Sociology with minimum B grade or equivalent',
      feePerYear: 'PKR 100,000',
      feePerSemester: 'PKR 50,000',
      image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Cambridge A-Level Sociology covering advanced social theories, structures, and institutions.',
      highlights: ['Social Theories', 'Social Structures', 'Institutions', 'Social Change'],
      level: 'alevel',
      category: 'alevel'
    },

    // ==================== COLLEGE (Intermediate) ====================
    {
      id: 37,
      name: 'FSc Pre-Medical',
      fullName: 'FSc Pre-Medical (Biology, Chemistry, Physics)',
      duration: '2 Years',
      eligibility: 'Matric Science with minimum 65% marks',
      feePerYear: 'PKR 50,000',
      feePerSemester: 'PKR 25,000',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Pre-medical program preparing students for medical and dental colleges.',
      highlights: ['Biology', 'Chemistry', 'Physics', 'Medical Preparation'],
      level: 'college',
      category: 'science'
    },
    {
      id: 38,
      name: 'FSc Pre-Engineering',
      fullName: 'FSc Pre-Engineering (Mathematics, Chemistry, Physics)',
      duration: '2 Years',
      eligibility: 'Matric Science with minimum 65% marks',
      feePerYear: 'PKR 50,000',
      feePerSemester: 'PKR 25,000',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Pre-engineering program preparing students for engineering universities.',
      highlights: ['Mathematics', 'Chemistry', 'Physics', 'Engineering Preparation'],
      level: 'college',
      category: 'science'
    },
    {
      id: 39,
      name: 'ICS',
      fullName: 'Intermediate in Computer Science',
      duration: '2 Years',
      eligibility: 'Matric Science with minimum 60% marks',
      feePerYear: 'PKR 55,000',
      feePerSemester: 'PKR 27,500',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Computer science program focusing on programming and IT fundamentals.',
      highlights: ['Programming', 'IT Fundamentals', 'Database Systems', 'Computer Networks'],
      level: 'college',
      category: 'science'
    },
    {
      id: 40,
      name: 'I.Com',
      fullName: 'Intermediate in Commerce',
      duration: '2 Years',
      eligibility: 'Matric Science/Arts with minimum 50% marks',
      feePerYear: 'PKR 45,000',
      feePerSemester: 'PKR 22,500',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Commerce program focusing on accounting, business, and economics.',
      highlights: ['Accounting', 'Business Studies', 'Economics', 'Business Mathematics'],
      level: 'college',
      category: 'commerce'
    },
    {
      id: 41,
      name: 'FA',
      fullName: 'Faculty of Arts (Humanities)',
      duration: '2 Years',
      eligibility: 'Matric Arts/Science with minimum 45% marks',
      feePerYear: 'PKR 40,000',
      feePerSemester: 'PKR 20,000',
      image: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Arts program offering humanities, social sciences, and creative arts.',
      highlights: ['Literature', 'Social Sciences', 'Fine Arts', 'Language Studies'],
      level: 'college',
      category: 'arts'
    },

    // ==================== TECHNICAL ====================
    {
      id: 42,
      name: 'DAE',
      fullName: 'Diploma of Associate Engineering',
      duration: '3 Years',
      eligibility: 'Matric Science with minimum 50% marks',
      feePerYear: 'PKR 60,000',
      feePerSemester: 'PKR 30,000',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Technical diploma program preparing students for engineering technician careers.',
      highlights: ['Civil', 'Mechanical', 'Electrical', 'Electronics'],
      level: 'technical',
      category: 'technical'
    },
    {
      id: 43,
      name: 'DIT',
      fullName: 'Diploma in Information Technology',
      duration: '2 Years',
      eligibility: 'Matric Science with minimum 50% marks',
      feePerYear: 'PKR 50,000',
      feePerSemester: 'PKR 25,000',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Diploma program providing practical IT and computer skills.',
      highlights: ['Software', 'Networking', 'Hardware', 'Database'],
      level: 'technical',
      category: 'technical'
    }
  ];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Programs' },
    { value: 'school', label: 'School (Board)' },
    { value: 'olevel', label: 'O-Level' },
    { value: 'alevel', label: 'A-Level' },
    { value: 'college', label: 'College' },
    { value: 'technical', label: 'Technical' },
  ];

  // Filter programs based on search and filter
  useEffect(() => {
    let filtered = programs;

    if (searchTerm.trim()) {
      filtered = filtered.filter(program =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (activeFilter !== 'all') {
      filtered = filtered.filter(program => program.level === activeFilter);
    }

    setFilteredPrograms(filtered);
  }, [searchTerm, activeFilter]);

  useEffect(() => {
    setFilteredPrograms(programs);
  }, []);

  const handleApplyNow = (program: Program) => {
    setSelectedProgram(program);
    setFormType('apply');
    setShowForm(true);
  };

  const handleRequestInfo = (program: Program) => {
    setSelectedProgram(program);
    setShowInfoModal(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your ${formType === 'apply' ? 'application' : 'inquiry'}! We will contact you soon.`);
    setShowForm(false);
    setSelectedProgram(null);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Colors
  const BLUE_600 = '#2563EB';
  const TEAL_600 = '#0D9488';

  // Animation variants
  const headingVariants: Variants = {
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

  const subHeadingVariants: Variants = {
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

  const searchVariants: Variants = {
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

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 pt-[40px] ">
      {/* Hero Section with High Quality Image - No Overlay */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background Image - No Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Programs Hero"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            <span className="text-white">Our </span>
            <span style={{ color: TEAL_600 }}>Programs</span>
          </motion.h1>

          <motion.p 
            variants={subHeadingVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-white drop-shadow-lg max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            Discover your path to success with our diverse range of programs
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-14 rounded-full bg-white/95 backdrop-blur-sm text-[#1E293B] placeholder-[#64748B] border-0 focus:ring-2 focus:ring-[#0D9488] shadow-lg transition-all duration-300 cursor-pointer"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-14 top-1/2 -translate-y-1/2 cursor-pointer text-[#64748B] hover:text-[#1E293B] transition-colors"
                >
                  ✕
                </button>
              )}
              <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid with Filter */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-6">
          {/* Filter & Results Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <label className="text-base font-semibold text-[#1E293B]">Filter by:</label>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-5 py-2.5 rounded-full border border-[#E2E8F0] bg-white text-[#1E293B] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#0D9488] cursor-pointer min-w-[160px] shadow-sm hover:shadow-md transition-all duration-200"
                style={{ borderColor: '#E2E8F0' }}
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-[#64748B] bg-white px-4 py-2 rounded-full shadow-sm border border-[#E2E8F0]">
              Showing <span className="font-semibold text-[#1E293B]">{filteredPrograms.length}</span> programs
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: Math.min(index * 0.04, 0.5),
                }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col max-w-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-5">
                    <h3 className="text-2xl font-bold text-white">{program.name}</h3>
                    <p className="text-blue-200 text-sm truncate max-w-[180px]">{program.fullName}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: TEAL_600 }}>
                      {program.duration}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[#475569] mb-4 text-sm leading-relaxed flex-1 line-clamp-2">
                    {program.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#1E293B] text-sm mb-2">Program Highlights:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {program.highlights.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: '#E6F7F5',
                            color: TEAL_600
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                      {program.highlights.length > 3 && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium text-[#64748B] bg-[#F1F5F9]">
                          +{program.highlights.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#F8FAFC' }}>
                      <h4 className="font-semibold text-[#1E293B] text-xs mb-1">Eligibility</h4>
                      <p className="text-[#475569] text-xs line-clamp-2">{program.eligibility}</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#F8FAFC' }}>
                      <h4 className="font-semibold text-[#1E293B] text-xs mb-1">Annual Fee</h4>
                      <p className="font-bold text-sm" style={{ color: TEAL_600 }}>{program.feePerYear}</p>
                      <p className="text-[#475569] text-xs">Semester: {program.feePerSemester}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <Link href="/Admission" className="w-full">
                      <button
                        className="w-full py-2.5 text-white font-semibold rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                        style={{ backgroundColor: BLUE_600 }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1D4ED8';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = BLUE_600;
                        }}
                      >
                        Apply Now
                      </button>
                    </Link>
                    <button
                      onClick={() => handleRequestInfo(program)}
                      className="w-full py-2.5 font-semibold rounded-full text-sm transition-all duration-300 cursor-pointer"
                      style={{ 
                        border: `2px solid ${TEAL_600}`,
                        color: TEAL_600,
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E6F7F5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">No programs found</h3>
              <p className="text-[#475569]">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                className="mt-4 px-6 py-2 text-white rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: TEAL_600 }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0F766E'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = TEAL_600; }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* More Info Modal */}
      {showInfoModal && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white z-10 rounded-t-2xl border-b border-[#E2E8F0] px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1E293B]">{selectedProgram.name}</h3>
                <p className="text-sm text-[#475569]">{selectedProgram.fullName}</p>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-2 rounded-full hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <XMarkIcon className="w-6 h-6 text-[#64748B]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="relative h-48 rounded-xl overflow-hidden">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4">
                  <span className="px-3 py-1 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: TEAL_600 }}>
                    {selectedProgram.duration}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-[#1E293B] mb-2">About this Program</h4>
                <p className="text-[#475569] text-sm leading-relaxed">{selectedProgram.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-[#1E293B] mb-3">Program Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProgram.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#F8FAFC]">
                      <CheckCircleIcon className="w-5 h-5 text-[#0D9488] flex-shrink-0" />
                      <span className="text-sm text-[#1E293B]">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#F8FAFC' }}>
                  <h4 className="font-semibold text-[#1E293B] text-sm mb-1">Eligibility</h4>
                  <p className="text-[#475569] text-sm">{selectedProgram.eligibility}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#F8FAFC' }}>
                  <h4 className="font-semibold text-[#1E293B] text-sm mb-1">Fee Structure</h4>
                  <p className="font-bold text-lg" style={{ color: TEAL_600 }}>{selectedProgram.feePerYear}</p>
                  <p className="text-[#475569] text-sm">Per Semester: {selectedProgram.feePerSemester}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/Admission" className="w-full sm:flex-1">
                  <button
                    className="w-full py-3 text-white font-semibold rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                    style={{ backgroundColor: BLUE_600 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1D4ED8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = BLUE_600;
                    }}
                  >
                    Apply Now
                  </button>
                </Link>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="w-full sm:flex-1 py-3 font-semibold rounded-full text-sm transition-all duration-300 cursor-pointer"
                  style={{ 
                    border: `2px solid ${TEAL_600}`,
                    color: TEAL_600,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E6F7F5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Application/Info Form Modal */}
      {showForm && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-[#1E293B]">
                {formType === 'apply' ? 'Apply Now' : 'Request Information'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#E6F7F5' }}>
              <h4 className="font-semibold text-[#1E293B]">{selectedProgram.name} - {selectedProgram.fullName}</h4>
              <p className="text-sm" style={{ color: TEAL_600 }}>{selectedProgram.duration} Program</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                required 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer"
              />
              {formType === 'apply' && (
                <input 
                  type="text" 
                  placeholder="Previous Qualification" 
                  required 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer"
                />
              )}
              <textarea 
                placeholder={formType === 'apply' ? 'Why do you want to join this program?' : 'What information would you like to know?'} 
                rows={3} 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-300 text-[#1E293B] cursor-pointer resize-none"
              />

              <button 
                type="submit" 
                className="w-full text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                style={{ 
                  background: 'linear-gradient(135deg, #0D9488 0%, #2563EB 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                {formType === 'apply' ? 'Submit Application' : 'Request Info'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}