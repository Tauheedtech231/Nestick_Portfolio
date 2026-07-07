"use client";

import { useState, useEffect } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";

// ============================================
// TYPES
// ============================================
interface PersonalInfo {
  fullName: string;
  cnic: string;
  dob: string;
  gender: string;
  address: string;
}

interface AcademicInfo {
  academicLevel: string;
  obtainedMarks: string;
  totalMarks: string;
  percentage: string;
  institute: string;
  board: string;
  passingYear: string;
  marksheet: string | null;
}

interface CourseSelection {
  program: string;
  specialization: string;
  mode: string;
  duration: string;
  startDate: string;
  courseDoc: string | null;
}

interface Documents {
  cnicFile: string | null;
  academicFiles: string[];
  feeFile: string | null;
  paymentProof: string | null;
}

interface FeeDetails {
  originalFee: number;
  scholarshipPercentage: number;
  scholarshipAmount: number;
  finalFee: number;
  applicationId: string;
}

interface FormDataState {
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  courseSelection: CourseSelection;
  documents: Documents;
  feeDetails: FeeDetails | null;
}

interface FormErrors {
  personalInfo: Partial<PersonalInfo>;
  academicInfo: Partial<AcademicInfo>;
  courseSelection: Partial<CourseSelection>;
  documents: Partial<{ cnicFile: string }>;
}

// ============================================
// CONSTANTS & CONFIG
// ============================================
const STORAGE_KEY = "multistep-form-data";
const THEME = {
  primary: '#0D9488',
  primaryHover: '#0F766E',
  secondary: '#2563EB',
  secondaryHover: '#1D4ED8',
  bg: '#FFFFFF',
  text: '#1E293B',
  textMuted: '#64748B',
  border: '#E2E8F0',
  lightBg: '#F8FAFC',
  white: '#FFFFFF',
  shadow: '0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
  shadowHover: '0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
};

const courseFees: { [key: string]: number } = {
  "ICS": 80000,
  "FSc Pre-Medical": 90000,
  "FSc Pre-Engineering": 95000,
  "I.Com": 75000,
  "FA General Science": 70000,
  "FA Arts": 65000,
  "F.A IT": 85000,
  "B.Com": 120000,
  "BA": 110000,
};

interface ScholarshipRule {
  minPercentage: number;
  maxPercentage: number;
  scholarship: number;
  description: string;
  color: string;
  bgColor: string;
}

const scholarshipRules: ScholarshipRule[] = [
  {
    minPercentage: 80,
    maxPercentage: 100,
    scholarship: 50,
    description: "Excellent! You qualify for our highest scholarship tier.",
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200"
  },
  {
    minPercentage: 70,
    maxPercentage: 79.99,
    scholarship: 30,
    description: "Great! You qualify for a substantial scholarship.",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200"
  },
  {
    minPercentage: 60,
    maxPercentage: 69.99,
    scholarship: 15,
    description: "Good! You qualify for a partial scholarship.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 border-yellow-200"
  },
  {
    minPercentage: 0,
    maxPercentage: 59.99,
    scholarship: 0,
    description: "Keep working hard! You can apply for other financial aid options.",
    color: "text-gray-600",
    bgColor: "bg-gray-50 border-gray-200"
  }
];

// ============================================
// VALIDATION FUNCTIONS
// ============================================
const validatePersonalInfo = (data: PersonalInfo): Partial<PersonalInfo> => {
  const errors: Partial<PersonalInfo> = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  if (data.cnic && !/^\d{5}-\d{7}-\d{1}$/.test(data.cnic)) {
    errors.cnic = "CNIC format should be XXXXX-XXXXXXX-X";
  }
  if (data.dob && new Date(data.dob) > new Date()) {
    errors.dob = "Date of birth cannot be in the future";
  }
  return errors;
};

const validateAcademicInfo = (data: AcademicInfo): Partial<AcademicInfo> => {
  const errors: Partial<AcademicInfo> = {};
  if (!data.academicLevel) errors.academicLevel = "Academic level is required";
  if (data.obtainedMarks && parseFloat(data.obtainedMarks) < 0) {
    errors.obtainedMarks = "Obtained marks cannot be negative";
  }
  if (data.totalMarks && parseFloat(data.totalMarks) <= 0) {
    errors.totalMarks = "Total marks must be positive";
  }
  if (data.obtainedMarks && data.totalMarks && parseFloat(data.obtainedMarks) > parseFloat(data.totalMarks)) {
    errors.obtainedMarks = "Obtained marks cannot exceed total marks";
  }
  return errors;
};

const validateCourseSelection = (data: CourseSelection): Partial<CourseSelection> => {
  const errors: Partial<CourseSelection> = {};
  if (!data.program) errors.program = "Program selection is required";
  if (data.startDate && new Date(data.startDate) < new Date()) {
    errors.startDate = "Start date cannot be in the past";
  }
  return errors;
};

const validateDocuments = (data: Documents): Partial<{ cnicFile: string }> => {
  const errors: Partial<{ cnicFile: string }> = {};
  if (!data.cnicFile) errors.cnicFile = "CNIC copy is required";
  return errors;
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const calculateScholarship = (percentage: number): ScholarshipRule => {
  const rule = scholarshipRules.find(
    rule => percentage >= rule.minPercentage && percentage <= rule.maxPercentage
  );
  return rule || scholarshipRules[scholarshipRules.length - 1];
};

const generateApplicationId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `APP-${timestamp}-${random}`;
};

const initialFormData: FormDataState = {
  personalInfo: {
    fullName: "",
    cnic: "",
    dob: "",
    gender: "",
    address: ""
  },
  academicInfo: {
    academicLevel: "",
    obtainedMarks: "",
    totalMarks: "",
    percentage: "",
    institute: "",
    board: "",
    passingYear: "",
    marksheet: null
  },
  courseSelection: {
    program: "",
    specialization: "",
    mode: "",
    duration: "",
    startDate: "",
    courseDoc: null
  },
  documents: {
    cnicFile: null,
    academicFiles: [],
    feeFile: null,
    paymentProof: null
  },
  feeDetails: null
};

// ============================================
// STEP 1: Personal Info
// ============================================
function PersonalInfoForm({ data, onChange, errors }: { data: PersonalInfo; onChange: (data: PersonalInfo) => void; errors: Partial<PersonalInfo> }) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div 
        className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 transition-all duration-300 hover:shadow-xl"
        style={{ 
          boxShadow: THEME.shadow,
          border: `1px solid ${THEME.border}`,
        }}
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-md" style={{ backgroundColor: '#E6F7F5' }}>
            <span className="text-lg font-semibold cursor-pointer" style={{ color: THEME.primary }}>1</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold cursor-pointer" style={{ color: THEME.text }}>
              Personal Information
            </h2>
            <p className="text-sm mt-1 cursor-pointer" style={{ color: THEME.textMuted }}>
              Please fill out your personal details carefully.
            </p>
          </div>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="e.g. Muhammad Ali Khan"
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              National ID Card Number (CNIC)
            </label>
            <input
              type="text"
              value={data.cnic}
              onChange={(e) => handleChange("cnic", e.target.value)}
              placeholder="XXXXX-XXXXXXX-X"
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />
            {errors.cnic && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {errors.cnic}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
                Date of Birth
              </label>
              <input
                type="date"
                value={data.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
                style={{ 
                  borderColor: THEME.border,
                  color: THEME.text,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                }}
              />
              {errors.dob && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {errors.dob}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
                Gender
              </label>
              <select
                value={data.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
                style={{ 
                  borderColor: THEME.border,
                  color: THEME.text,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                }}
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              Address
            </label>
            <textarea
              value={data.address}
              onChange={(e) => handleChange("address", e.target.value)}
              rows={3}
              placeholder="e.g. House #123, Street 4, Islamabad"
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 resize-none cursor-pointer bg-white"
              style={{ 
                borderColor: THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// STEP 2: Academic Info
// ============================================
function AcademicInfoForm({ data, onChange, errors }: { data: AcademicInfo; onChange: (data: AcademicInfo) => void; errors: Partial<AcademicInfo> }) {
  const handleChange = (field: keyof AcademicInfo, value: string) => {
    const updatedData = { ...data, [field]: value };
    if ((field === 'obtainedMarks' || field === 'totalMarks') && updatedData.obtainedMarks && updatedData.totalMarks) {
      const obtained = parseFloat(updatedData.obtainedMarks);
      const total = parseFloat(updatedData.totalMarks);
      if (!isNaN(obtained) && !isNaN(total) && total > 0) {
        const percentage = ((obtained / total) * 100).toFixed(2);
        updatedData.percentage = percentage;
      }
    }
    onChange(updatedData);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div 
        className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 transition-all duration-300 hover:shadow-xl"
        style={{ 
          boxShadow: THEME.shadow,
          border: `1px solid ${THEME.border}`,
        }}
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-md" style={{ backgroundColor: '#E6F7F5' }}>
            <span className="text-lg font-semibold cursor-pointer" style={{ color: THEME.primary }}>2</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold cursor-pointer" style={{ color: THEME.text }}>
              Academic Information
            </h2>
            <p className="text-sm mt-1 cursor-pointer" style={{ color: THEME.textMuted }}>
              Please provide your academic details for scholarship assessment.
            </p>
          </div>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              Academic Level <span className="text-red-500">*</span>
            </label>
            <select
              value={data.academicLevel}
              onChange={(e) => handleChange("academicLevel", e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            >
              <option value="">Select academic level</option>
              <option value="Matric">Matric</option>
              <option value="Intermediate">Intermediate</option>
            </select>
            {errors.academicLevel && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {errors.academicLevel}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
                Obtained Marks
              </label>
              <input
                type="number"
                value={data.obtainedMarks}
                onChange={(e) => handleChange("obtainedMarks", e.target.value)}
                placeholder="e.g. 850"
                className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
                style={{ 
                  borderColor: THEME.border,
                  color: THEME.text,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                }}
              />
              {errors.obtainedMarks && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {errors.obtainedMarks}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
                Total Marks
              </label>
              <input
                type="number"
                value={data.totalMarks}
                onChange={(e) => handleChange("totalMarks", e.target.value)}
                placeholder="e.g. 1100"
                className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
                style={{ 
                  borderColor: THEME.border,
                  color: THEME.text,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                }}
              />
              {errors.totalMarks && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {errors.totalMarks}</p>}
            </div>
          </div>

          {data.percentage && (
            <div className="rounded-xl p-4 cursor-pointer shadow-sm" style={{ backgroundColor: '#E6F7F5', border: '1px solid #0D9488' }}>
              <div className="text-center">
                <p className="text-sm mb-1 cursor-pointer" style={{ color: THEME.primary }}>Calculated Percentage</p>
                <p className="text-2xl font-bold cursor-pointer" style={{ color: THEME.primary }}>{data.percentage}%</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
                Institute / School
              </label>
              <input
                type="text"
                value={data.institute}
                onChange={(e) => handleChange("institute", e.target.value)}
                placeholder="e.g. Islamabad Model College"
                className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
                style={{ 
                  borderColor: THEME.border,
                  color: THEME.text,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
                Board
              </label>
              <input
                type="text"
                value={data.board}
                onChange={(e) => handleChange("board", e.target.value)}
                placeholder="e.g. Federal Board"
                className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
                style={{ 
                  borderColor: THEME.border,
                  color: THEME.text,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              Passing Year
            </label>
            <input
              type="number"
              value={data.passingYear}
              onChange={(e) => handleChange("passingYear", e.target.value)}
              placeholder="e.g. 2024"
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              Upload Marksheet (Optional)
            </label>
            <label className="block cursor-pointer">
              <input
                type="file"
                onChange={(e) => handleChange("marksheet", e.target.files?.[0]?.name || "")}
                className="hidden"
              />
              <div 
                className="w-full rounded-xl border-2 border-dashed px-4 py-6 text-center hover:border-[#0D9488] transition-all duration-200 cursor-pointer bg-white hover:bg-gray-50"
                style={{ borderColor: THEME.border }}
              >
                <span className="cursor-pointer" style={{ color: THEME.textMuted }}>{data.marksheet || "Click to upload marksheet"}</span>
              </div>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// STEP 3: Course Selection
// ============================================
function CourseSelectionForm({ data, onChange, errors }: { data: CourseSelection; onChange: (data: CourseSelection) => void; errors: Partial<CourseSelection> }) {
  const handleChange = (field: keyof CourseSelection, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div 
        className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 transition-all duration-300 hover:shadow-xl"
        style={{ 
          boxShadow: THEME.shadow,
          border: `1px solid ${THEME.border}`,
        }}
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-md" style={{ backgroundColor: '#E6F7F5' }}>
            <span className="text-lg font-semibold cursor-pointer" style={{ color: THEME.primary }}>3</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold cursor-pointer" style={{ color: THEME.text }}>
              Course Selection
            </h2>
            <p className="text-sm mt-1 cursor-pointer" style={{ color: THEME.textMuted }}>
              Choose your preferred program and course details.
            </p>
          </div>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              Preferred Program <span className="text-red-500">*</span>
            </label>
            <select
              value={data.program}
              onChange={(e) => handleChange("program", e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            >
              <option value="">Select a program</option>
              <option value="ICS">ICS</option>
              <option value="FSc Pre-Medical">F.Sc Pre-Medical</option>
              <option value="FSc Pre-Engineering">F.Sc Pre-Engineering</option>
              <option value="I.Com">I.Com (Intermediate in Commerce)</option>
              <option value="FA General Science">FA (General Science)</option>
              <option value="FA Arts">FA (Arts / Humanities)</option>
              <option value="F.A IT">FA (Information Technology)</option>
              <option value="B.Com">B.Com (Bachelor of Commerce)</option>
              <option value="BA">BA (Bachelor of Arts)</option>
            </select>
            {errors.program && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {errors.program}</p>}
            
            {data.program && courseFees[data.program] && (
              <div className="mt-3 p-3 rounded-lg cursor-pointer shadow-sm" style={{ backgroundColor: '#E6F7F5', border: '1px solid #0D9488' }}>
                <p className="text-sm cursor-pointer" style={{ color: THEME.primary }}>
                  <strong>Course Fee:</strong> {courseFees[data.program].toLocaleString()} PKR
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              Specialization (if any)
            </label>
            <input
              type="text"
              value={data.specialization}
              onChange={(e) => handleChange("specialization", e.target.value)}
              placeholder="e.g. Artificial Intelligence"
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
                Course Mode
              </label>
              <select
                value={data.mode}
                onChange={(e) => handleChange("mode", e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
                style={{ 
                  borderColor: THEME.border,
                  color: THEME.text,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                }}
              >
                <option value="">Select mode</option>
                <option value="On-Campus">On-Campus</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
                Duration
              </label>
              <select
                value={data.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
                style={{ 
                  borderColor: THEME.border,
                  color: THEME.text,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                }}
              >
                <option value="">Select duration</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="4 Years">4 Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              Preferred Start Date
            </label>
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#0D9488] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {errors.startDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              Upload Supporting Document (Optional)
            </label>
            <label className="block cursor-pointer">
              <input
                type="file"
                onChange={(e) => handleChange("courseDoc", e.target.files?.[0]?.name || "")}
                className="hidden"
              />
              <div 
                className="w-full rounded-xl border-2 border-dashed px-4 py-6 text-center hover:border-[#0D9488] transition-all duration-200 cursor-pointer bg-white hover:bg-gray-50"
                style={{ borderColor: THEME.border }}
              >
                <span className="cursor-pointer" style={{ color: THEME.textMuted }}>{data.courseDoc || "Click to upload supporting document"}</span>
              </div>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// STEP 4: Scholarship Calculator
// ============================================
function ScholarshipCalculator({ 
  academicInfo, 
  courseSelection,
  onBack,
  onCalculate
}: { 
  academicInfo: AcademicInfo;
  courseSelection: CourseSelection;
  onBack: () => void;
  onCalculate: (feeDetails: FeeDetails) => void;
}) {
  const [calculated, setCalculated] = useState(false);
  
  const percentage = parseFloat(academicInfo.percentage) || 0;
  const scholarshipResult = calculateScholarship(percentage);
  const originalFee = courseFees[courseSelection.program] || 0;
  const scholarshipAmount = (originalFee * scholarshipResult.scholarship) / 100;
  const finalFee = originalFee - scholarshipAmount;
  const applicationId = generateApplicationId();

  const handleCalculate = () => {
    const feeDetails: FeeDetails = {
      originalFee,
      scholarshipPercentage: scholarshipResult.scholarship,
      scholarshipAmount,
      finalFee,
      applicationId
    };
    onCalculate(feeDetails);
    setCalculated(true);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div 
        className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 transition-all duration-300 hover:shadow-xl"
        style={{ 
          boxShadow: THEME.shadow,
          border: `1px solid ${THEME.border}`,
        }}
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-md" style={{ backgroundColor: '#E6F7F5' }}>
            <span className="text-lg font-semibold cursor-pointer" style={{ color: THEME.primary }}>★</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold cursor-pointer" style={{ color: THEME.text }}>
              Scholarship & Fee Calculation
            </h2>
            <p className="text-sm mt-1 cursor-pointer" style={{ color: THEME.textMuted }}>
              Based on your academic performance and course selection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="rounded-xl p-4 sm:p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: THEME.lightBg, borderColor: THEME.border }}
          >
            <h3 className="text-lg font-semibold mb-4 cursor-pointer" style={{ color: THEME.text }}>Academic Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Level:</span><span className="font-medium">{academicInfo.academicLevel}</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Marks:</span><span className="font-medium">{academicInfo.obtainedMarks} / {academicInfo.totalMarks}</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Percentage:</span><span className="font-medium" style={{ color: THEME.primary }}>{percentage}%</span></div>
            </div>
          </div>

          <div 
            className="rounded-xl p-4 sm:p-6 border cursor-pointer transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: THEME.lightBg, borderColor: THEME.border }}
          >
            <h3 className="text-lg font-semibold mb-4 cursor-pointer" style={{ color: THEME.text }}>Course Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Program:</span><span className="font-medium">{courseSelection.program}</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Duration:</span><span className="font-medium">{courseSelection.duration}</span></div>
              <div className="flex justify-between"><span style={{ color: THEME.textMuted }}>Original Fee:</span><span className="font-medium">{originalFee.toLocaleString()} PKR</span></div>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-6 border-2 ${scholarshipResult.bgColor} cursor-pointer transition-all duration-300 hover:shadow-lg`}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              {scholarshipResult.scholarship === 50 ? <span className="text-2xl">🎓</span> : 
               scholarshipResult.scholarship === 30 ? <span className="text-2xl">⭐</span> :
               scholarshipResult.scholarship === 15 ? <span className="text-2xl">📚</span> :
               <span className="text-2xl">💼</span>}
            </div>
            
            <div>
              <h3 className={`text-2xl font-bold ${scholarshipResult.color} mb-2`}>
                {scholarshipResult.scholarship}% Scholarship
              </h3>
              <p className="text-gray-600">{scholarshipResult.description}</p>
            </div>

            <div className="bg-white/80 rounded-lg p-4 mt-4 space-y-3 shadow-sm">
              <h4 className="font-semibold text-center" style={{ color: THEME.text }}>Fee Breakdown</h4>
              <div className="flex justify-between items-center"><span style={{ color: THEME.textMuted }}>Original Fee:</span><span className="font-medium">{originalFee.toLocaleString()} PKR</span></div>
              <div className="flex justify-between items-center"><span style={{ color: THEME.primary }}>Scholarship ({scholarshipResult.scholarship}%):</span><span className="font-medium" style={{ color: THEME.primary }}>-{scholarshipAmount.toLocaleString()} PKR</span></div>
              <div className="border-t pt-2" style={{ borderColor: THEME.border }}>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold" style={{ color: THEME.text }}>Final Fee:</span>
                  <span className="text-lg font-bold" style={{ color: THEME.primary }}>{finalFee.toLocaleString()} PKR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm" style={{ borderColor: THEME.border }}>
          <h4 className="font-semibold text-center mb-3" style={{ color: THEME.text }}>Scholarship Criteria</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {scholarshipRules.map((rule, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg border text-center transition-all duration-300 cursor-pointer hover:shadow-md ${rule.scholarship === scholarshipResult.scholarship ? 'ring-2 ring-[#0D9488] scale-105 shadow-md' : ''}`} 
                style={{ borderColor: THEME.border }}
              >
                <div className={`text-sm font-medium ${rule.color}`}>{rule.minPercentage}% - {rule.maxPercentage}%</div>
                <div className="text-xs mt-1" style={{ color: THEME.textMuted }}>{rule.scholarship}% Scholarship</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button 
            onClick={onBack} 
            className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:shadow-md"
            style={{ backgroundColor: THEME.lightBg, color: THEME.text }}
          >
            <span>←</span> Edit Course Selection
          </button>
          <button 
            onClick={handleCalculate} 
            disabled={calculated} 
            className="flex-1 px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none cursor-pointer hover:scale-105"
            style={{ backgroundColor: calculated ? '#94A3B8' : THEME.primary }}
          >
            {calculated ? <><span>✓</span> Calculated</> : <><span>💰</span> Calculate & Generate Challan</>}
          </button>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs cursor-pointer" style={{ color: THEME.textMuted }}>* Scholarship is subject to verification of submitted documents.</p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// STEP 5: Document Upload
// ============================================
function DocumentUploadForm({ data, onChange, errors, feeDetails }: { data: Documents; onChange: (data: Documents) => void; errors: Partial<{ cnicFile: string }>; feeDetails: FeeDetails | null }) {
  const handleFileChange = (field: keyof Documents, files: FileList | File[] | null) => {
    if (!files) { onChange({ ...data, [field]: field === 'academicFiles' ? [] : null }); return; }
    if (field === 'academicFiles') {
      const fileArray = Array.from(files as FileList | File[]);
      onChange({ ...data, academicFiles: fileArray.map(file => file.name) });
    } else {
      onChange({ ...data, [field]: (files[0] as File).name });
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div 
        className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 transition-all duration-300 hover:shadow-xl"
        style={{ 
          boxShadow: THEME.shadow,
          border: `1px solid ${THEME.border}`,
        }}
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-md" style={{ backgroundColor: '#E6F7F5' }}>
            <span className="text-lg font-semibold cursor-pointer" style={{ color: THEME.primary }}>4</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold cursor-pointer" style={{ color: THEME.text }}>Upload Documents</h2>
            <p className="text-sm mt-1 cursor-pointer" style={{ color: THEME.textMuted }}>Upload required documents</p>
          </div>
        </div>

        {feeDetails && (
          <div className="rounded-xl p-4 cursor-pointer shadow-sm" style={{ backgroundColor: '#E6F7F5', border: '1px solid #0D9488' }}>
            <h3 className="font-semibold mb-2 cursor-pointer" style={{ color: THEME.text }}>Fee Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span style={{ color: THEME.textMuted }}>Original:</span><p className="font-medium">{feeDetails.originalFee.toLocaleString()} PKR</p></div>
              <div><span style={{ color: THEME.primary }}>Scholarship:</span><p className="font-medium">{feeDetails.scholarshipPercentage}%</p></div>
              <div><span style={{ color: THEME.primary }}>Discount:</span><p className="font-medium">{feeDetails.scholarshipAmount.toLocaleString()} PKR</p></div>
              <div><span style={{ color: THEME.text }}>Final Fee:</span><p className="font-medium text-lg" style={{ color: THEME.primary }}>{feeDetails.finalFee.toLocaleString()} PKR</p></div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3 cursor-pointer" style={{ color: THEME.text }}>National ID / CNIC Copy <span className="text-red-500">*</span></label>
            <label className="block cursor-pointer">
              <input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("cnicFile", e.target.files)} className="hidden" />
              <div 
                className={`w-full rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-300 cursor-pointer hover:bg-gray-50 ${
                  data.cnicFile ? 'border-green-500 bg-green-50' : ''
                }`} 
                style={{ borderColor: data.cnicFile ? '#22C55E' : THEME.border }}
              >
                <span className="cursor-pointer" style={{ color: data.cnicFile ? '#22C55E' : THEME.textMuted }}>{data.cnicFile ? `✓ ${data.cnicFile}` : "Click to upload CNIC"}</span>
              </div>
            </label>
            {errors.cnicFile && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {errors.cnicFile}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 cursor-pointer" style={{ color: THEME.text }}>Academic Certificates & Marksheet</label>
            <label className="block cursor-pointer">
              <input type="file" multiple accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("academicFiles", e.target.files)} className="hidden" />
              <div 
                className={`w-full rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-300 cursor-pointer hover:bg-gray-50 ${
                  data.academicFiles.length > 0 ? 'border-green-500 bg-green-50' : ''
                }`} 
                style={{ borderColor: data.academicFiles.length > 0 ? '#22C55E' : THEME.border }}
              >
                <span className="cursor-pointer" style={{ color: data.academicFiles.length > 0 ? '#22C55E' : THEME.textMuted }}>{data.academicFiles.length > 0 ? `✓ ${data.academicFiles.length} file(s) selected` : "Click to upload files"}</span>
              </div>
            </label>
            {data.academicFiles.length > 0 && <div className="mt-3 text-sm p-3 rounded-lg cursor-pointer shadow-sm" style={{ backgroundColor: '#E6F7F5', color: THEME.primary }}><strong>Selected:</strong> {data.academicFiles.join(", ")}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 cursor-pointer" style={{ color: THEME.text }}>Payment Proof <span className="text-xs" style={{ color: THEME.textMuted }}>(Optional)</span></label>
            <label className="block cursor-pointer">
              <input type="file" accept=".jpg,.png,.pdf" onChange={(e) => handleFileChange("paymentProof", e.target.files)} className="hidden" />
              <div 
                className={`w-full rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-300 cursor-pointer hover:bg-gray-50 ${
                  data.paymentProof ? 'border-green-500 bg-green-50' : ''
                }`} 
                style={{ borderColor: data.paymentProof ? '#22C55E' : THEME.border }}
              >
                <span className="cursor-pointer" style={{ color: data.paymentProof ? '#22C55E' : THEME.textMuted }}>{data.paymentProof ? `✓ ${data.paymentProof}` : "Click to upload payment proof"}</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// STEP 6: Review & Submit
// ============================================
function ReviewSubmitForm({ personalInfo, academicInfo, courseSelection, documents, feeDetails, onSubmit }: {
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  courseSelection: CourseSelection;
  documents: Documents;
  feeDetails: FeeDetails | null;
  onSubmit: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try { onSubmit(); } catch (err) { console.error(err); }
    setIsSubmitting(false);
    setShowFeeModal(true);
  };

  const handleModalOk = () => {
    setShowFeeModal(false);
    router.push("/applicant_portal");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div 
        className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-2xl"
        style={{ 
          boxShadow: THEME.shadow,
          border: `1px solid ${THEME.border}`,
        }}
      >
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-md" style={{ backgroundColor: '#E6F7F5' }}>
            <span className="text-lg font-semibold cursor-pointer" style={{ color: THEME.primary }}>5</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold cursor-pointer" style={{ color: THEME.text }}>Review Your Application</h2>
            <p className="text-sm mt-1 cursor-pointer" style={{ color: THEME.textMuted }}>Please review all information before submitting</p>
          </div>
        </div>

        <div className="space-y-6">
          <section 
            className="border rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-md"
            style={{ borderColor: THEME.border, backgroundColor: THEME.lightBg }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3 cursor-pointer" style={{ color: THEME.text }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#E6F7F5' }}>
                <span className="text-sm font-medium" style={{ color: THEME.primary }}>1</span>
              </div>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong>Full Name:</strong> {personalInfo.fullName || "Not provided"}</div>
              <div><strong>CNIC:</strong> {personalInfo.cnic || "Not provided"}</div>
              <div><strong>DOB:</strong> {personalInfo.dob || "Not provided"}</div>
              <div><strong>Gender:</strong> {personalInfo.gender || "Not provided"}</div>
              <div className="md:col-span-2"><strong>Address:</strong> {personalInfo.address || "Not provided"}</div>
            </div>
          </section>

          <section 
            className="border rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-md"
            style={{ borderColor: THEME.border, backgroundColor: THEME.lightBg }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3 cursor-pointer" style={{ color: THEME.text }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#E6F7F5' }}>
                <span className="text-sm font-medium" style={{ color: THEME.primary }}>2</span>
              </div>
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong>Level:</strong> {academicInfo.academicLevel || "Not provided"}</div>
              <div><strong>Marks:</strong> {academicInfo.obtainedMarks} / {academicInfo.totalMarks}</div>
              <div><strong>Percentage:</strong> {academicInfo.percentage}%</div>
              <div><strong>Institute:</strong> {academicInfo.institute || "Not provided"}</div>
              <div><strong>Board:</strong> {academicInfo.board || "Not provided"}</div>
              <div><strong>Passing Year:</strong> {academicInfo.passingYear || "Not provided"}</div>
            </div>
          </section>

          <section 
            className="border rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-md"
            style={{ borderColor: THEME.border, backgroundColor: THEME.lightBg }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3 cursor-pointer" style={{ color: THEME.text }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#E6F7F5' }}>
                <span className="text-sm font-medium" style={{ color: THEME.primary }}>3</span>
              </div>
              Course Selection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong>Program:</strong> {courseSelection.program || "Not provided"}</div>
              <div><strong>Specialization:</strong> {courseSelection.specialization || "Not provided"}</div>
              <div><strong>Mode:</strong> {courseSelection.mode || "Not provided"}</div>
              <div><strong>Duration:</strong> {courseSelection.duration || "Not provided"}</div>
              <div><strong>Start Date:</strong> {courseSelection.startDate || "Not provided"}</div>
            </div>
          </section>

          {feeDetails && (
            <section 
              className="border rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-md"
              style={{ borderColor: THEME.border, backgroundColor: '#E6F7F5' }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-3 cursor-pointer" style={{ color: THEME.text }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#0D9488', color: '#FFF' }}>💰</div>
                Fee Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Application ID:</strong> {feeDetails.applicationId}</div>
                <div><strong>Original Fee:</strong> {feeDetails.originalFee.toLocaleString()} PKR</div>
                <div><strong>Scholarship:</strong> {feeDetails.scholarshipPercentage}%</div>
                <div><strong>Discount:</strong> {feeDetails.scholarshipAmount.toLocaleString()} PKR</div>
                <div className="md:col-span-2"><strong className="text-lg" style={{ color: THEME.primary }}>Final Payable:</strong> <span className="text-lg font-bold" style={{ color: THEME.primary }}>{feeDetails.finalFee.toLocaleString()} PKR</span></div>
              </div>
            </section>
          )}

          <section 
            className="border rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-md"
            style={{ borderColor: THEME.border, backgroundColor: THEME.lightBg }}
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3 cursor-pointer" style={{ color: THEME.text }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#E6F7F5' }}>
                <span className="text-sm font-medium" style={{ color: THEME.primary }}>4</span>
              </div>
              Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong>CNIC:</strong> {documents.cnicFile || "Not uploaded"}</div>
              <div><strong>Academic Files:</strong> {documents.academicFiles.length > 0 ? documents.academicFiles.join(", ") : "Not uploaded"}</div>
              <div><strong>Payment Proof:</strong> {documents.paymentProof || "Not uploaded"}</div>
            </div>
          </section>

          <div className="flex justify-center pt-6">
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting} 
              className="px-8 py-4 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:scale-100 cursor-pointer"
              style={{ backgroundColor: isSubmitting ? '#94A3B8' : THEME.primary }}
            >
              {isSubmitting ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</> : <><span>✓</span> Submit Application</>}
            </button>
          </div>
        </div>
      </div>

      {showFeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFeeModal(false)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-semibold mb-2 cursor-pointer" style={{ color: THEME.text }}>Payment Pending</h3>
            <p className="text-sm mb-4 cursor-pointer" style={{ color: THEME.textMuted }}>Your application has been submitted. Please pay the required fee from your Dashboard.</p>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-md cursor-pointer transition-all duration-300 hover:shadow-md" style={{ backgroundColor: THEME.lightBg, color: THEME.text }} onClick={() => setShowFeeModal(false)}>Close</button>
              <button className="px-4 py-2 rounded-md text-white cursor-pointer transition-all duration-300 hover:shadow-md" style={{ backgroundColor: THEME.primary }} onClick={handleModalOk}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function MyApplicationsPage() {
  const steps = ["Personal Info", "Academic Info", "Course Selection", "Scholarship & Fees", "Document Upload", "Review & Submit"];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({ personalInfo: {}, academicInfo: {}, courseSelection: {}, documents: {} });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFeeChallan, setShowFeeChallan] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) try { setFormData(JSON.parse(saved)); } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  const validateCurrentStep = (): boolean => {
    if (currentStep === 0) { const e = validatePersonalInfo(formData.personalInfo); setErrors(prev => ({ ...prev, personalInfo: e })); return Object.keys(e).length === 0; }
    if (currentStep === 1) { const e = validateAcademicInfo(formData.academicInfo); setErrors(prev => ({ ...prev, academicInfo: e })); return Object.keys(e).length === 0; }
    if (currentStep === 2) { const e = validateCourseSelection(formData.courseSelection); setErrors(prev => ({ ...prev, courseSelection: e })); return Object.keys(e).length === 0; }
    if (currentStep === 4) { const e = validateDocuments(formData.documents); setErrors(prev => ({ ...prev, documents: e })); return Object.keys(e).length === 0; }
    return true;
  };

  const handleStepChange = (newStep: number) => { setIsAnimating(true); setTimeout(() => { setCurrentStep(newStep); setIsAnimating(false); }, 300); };
  const handleNext = () => { if (validateCurrentStep()) handleStepChange(Math.min(currentStep + 1, steps.length - 1)); };
  const handleBack = () => handleStepChange(Math.max(currentStep - 1, 0));

  const handleFeeCalculation = (feeDetails: FeeDetails) => {
    setFormData(prev => ({ ...prev, feeDetails }));
    setShowFeeChallan(true);
  };

  const handleDownloadChallan = () => {
    alert("Challan PDF downloaded successfully!");
    setShowFeeChallan(false);
    handleStepChange(4);
  };

  const handleSubmit = () => { localStorage.removeItem(STORAGE_KEY); setIsSubmitted(true); };
  const handleResetForm = () => { localStorage.removeItem(STORAGE_KEY); setFormData(initialFormData); setCurrentStep(0); setIsSubmitted(false); setShowFeeChallan(false); setErrors({ personalInfo: {}, academicInfo: {}, courseSelection: {}, documents: {} }); };

  const stepComponents = [
    <PersonalInfoForm key="step1" data={formData.personalInfo} onChange={(data) => setFormData(prev => ({ ...prev, personalInfo: data }))} errors={errors.personalInfo} />,
    <AcademicInfoForm key="step2" data={formData.academicInfo} onChange={(data) => setFormData(prev => ({ ...prev, academicInfo: data }))} errors={errors.academicInfo} />,
    <CourseSelectionForm key="step3" data={formData.courseSelection} onChange={(data) => setFormData(prev => ({ ...prev, courseSelection: data }))} errors={errors.courseSelection} />,
    <ScholarshipCalculator key="step4" academicInfo={formData.academicInfo} courseSelection={formData.courseSelection} onBack={() => handleStepChange(2)} onCalculate={handleFeeCalculation} />,
    <DocumentUploadForm key="step5" data={formData.documents} onChange={(data) => setFormData(prev => ({ ...prev, documents: data }))} errors={errors.documents} feeDetails={formData.feeDetails} />,
    <ReviewSubmitForm key="step6" personalInfo={formData.personalInfo} academicInfo={formData.academicInfo} courseSelection={formData.courseSelection} documents={formData.documents} feeDetails={formData.feeDetails} onSubmit={handleSubmit} />,
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-2xl border border-[#E2E8F0] transition-all duration-300 hover:shadow-3xl">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#E6F7F5' }}>
            <span className="text-3xl cursor-pointer" style={{ color: THEME.primary }}>✓</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 cursor-pointer" style={{ color: THEME.text }}>Application Submitted!</h1>
          <p className="mb-6 leading-relaxed cursor-pointer" style={{ color: THEME.textMuted }}>Thank you for submitting your application. We will contact you shortly.</p>
          {formData.feeDetails && (
            <div className="rounded-lg p-4 mb-6 cursor-pointer shadow-sm" style={{ backgroundColor: '#E6F7F5' }}>
              <p className="text-sm cursor-pointer" style={{ color: THEME.primary }}><strong>Application ID:</strong> {formData.feeDetails.applicationId}</p>
              <p className="text-sm mt-1 cursor-pointer" style={{ color: THEME.primary }}><strong>Final Fee:</strong> {formData.feeDetails.finalFee.toLocaleString()} PKR</p>
            </div>
          )}
          <button onClick={handleResetForm} className="w-full px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer" style={{ backgroundColor: THEME.primary }}>Submit Another Application</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-[100px] sm:pt-[120px]">
      <div className="w-full px-0">
        {/* Header - Full Width with Shadow */}
        <div 
          className="w-full bg-white border-b border-[#E2E8F0] px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3 cursor-pointer" style={{ color: THEME.text }}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#E6F7F5' }}>
                    <HiOutlineDocumentText className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: THEME.primary }} />
                  </div>
                  My Application
                </h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base cursor-pointer" style={{ color: THEME.textMuted }}>Complete all {steps.length} steps to submit your application</p>
              </div>
              <button onClick={handleResetForm} className="px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base cursor-pointer hover:shadow-md" style={{ backgroundColor: THEME.lightBg, color: THEME.text }}>
                <span>🔄</span> Reset Form
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 sm:mt-6">
              <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-medium mb-2 sm:mb-3" style={{ color: THEME.text }}>
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(progressPercent)}% Complete</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden shadow-inner" style={{ backgroundColor: THEME.lightBg }}>
                <div className="h-3 rounded-full transition-all duration-500 ease-out shadow-sm" style={{ width: `${progressPercent}%`, background: `linear-gradient(to right, ${THEME.primary}, ${THEME.secondary})` }} />
              </div>
            </div>

            {/* Stepper */}
            <div className="mt-4 sm:mt-6 overflow-x-auto">
              <div className="flex items-center justify-between relative min-w-[320px] sm:min-w-full">
                <div className="absolute top-4 left-0 right-0 h-0.5 -z-10" style={{ backgroundColor: THEME.lightBg }} />
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative z-10 min-w-[40px] sm:min-w-auto">
                    <button 
                      onClick={() => handleStepChange(index)} 
                      disabled={index > currentStep} 
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-medium transition-all duration-300 cursor-pointer shadow-md ${
                        index <= currentStep ? 'text-white shadow-lg scale-110' : ''
                      }`} 
                      style={{ backgroundColor: index <= currentStep ? THEME.primary : THEME.lightBg, color: index <= currentStep ? '#FFF' : THEME.textMuted }}
                    >
                      {index < currentStep ? "✓" : index + 1}
                    </button>
                    <p className={`mt-1 sm:mt-2 text-[9px] sm:text-xs font-medium text-center max-w-[40px] sm:max-w-none cursor-pointer ${index <= currentStep ? '' : ''}`} style={{ color: index <= currentStep ? THEME.primary : THEME.textMuted }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content - Full Width */}
        <div className="w-full py-6 sm:py-8">
          <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {stepComponents[currentStep]}
          </div>

          {/* Navigation Buttons */}
          {currentStep !== 3 && (
            <div className="w-full px-4 sm:px-6 lg:px-8 mt-6">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 cursor-pointer hover:shadow-md"
                  style={{ backgroundColor: THEME.lightBg, color: THEME.text }}
                >
                  <span>←</span> Back
                </button>
                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: THEME.primary }}
                  >
                    Next <span>→</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: THEME.primary }}
                  >
                    <span>✓</span> Submit Application
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Fee Challan Modal */}
        {showFeeChallan && formData.feeDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowFeeChallan(false)} />
            <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 rounded-t-2xl text-white cursor-pointer shadow-lg" style={{ background: `linear-gradient(to right, ${THEME.primary}, ${THEME.secondary})` }}>
                <div className="flex justify-between items-start">
                  <div><h2 className="text-2xl font-bold">Fee Challan</h2><p style={{ color: '#E6F7F5' }}>Application ID: {formData.feeDetails.applicationId}</p></div>
                  <button onClick={() => setShowFeeChallan(false)} className="text-white hover:text-gray-200 text-2xl cursor-pointer">×</button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><h3 className="font-semibold mb-2 cursor-pointer" style={{ color: THEME.text }}>Student Info</h3>
                    <div className="space-y-1 text-sm"><p><strong>Name:</strong> {formData.personalInfo.fullName}</p><p><strong>CNIC:</strong> {formData.personalInfo.cnic}</p></div>
                  </div>
                  <div><h3 className="font-semibold mb-2 cursor-pointer" style={{ color: THEME.text }}>Course Info</h3>
                    <div className="space-y-1 text-sm"><p><strong>Program:</strong> {formData.courseSelection.program}</p><p><strong>Duration:</strong> {formData.courseSelection.duration}</p></div>
                  </div>
                </div>
                <div className="border rounded-xl overflow-hidden cursor-pointer shadow-sm" style={{ borderColor: THEME.border }}>
                  <div className="px-4 py-3 border-b" style={{ backgroundColor: THEME.lightBg, borderColor: THEME.border }}>
                    <h3 className="font-semibold cursor-pointer" style={{ color: THEME.text }}>Fee Breakdown</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center"><span style={{ color: THEME.textMuted }}>Original Fee:</span><span className="font-medium">{formData.feeDetails.originalFee.toLocaleString()} PKR</span></div>
                    <div className="flex justify-between items-center"><span style={{ color: THEME.primary }}>Scholarship ({formData.feeDetails.scholarshipPercentage}%):</span><span className="font-medium" style={{ color: THEME.primary }}>-{formData.feeDetails.scholarshipAmount.toLocaleString()} PKR</span></div>
                    <div className="border-t pt-3" style={{ borderColor: THEME.border }}><div className="flex justify-between items-center text-lg font-bold"><span style={{ color: THEME.text }}>Final Payable:</span><span style={{ color: THEME.primary }}>{formData.feeDetails.finalFee.toLocaleString()} PKR</span></div></div>
                  </div>
                </div>
                <div className="rounded-xl p-4 cursor-pointer shadow-sm" style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B' }}>
                  <h3 className="font-semibold mb-2 cursor-pointer" style={{ color: '#92400E' }}>Payment Instructions</h3>
                  <ul className="text-sm space-y-1" style={{ color: '#92400E' }}>
                    <li>• Pay at any HBL, UBL, or MCB branch</li>
                    <li>• Use Application ID: {formData.feeDetails.applicationId}</li>
                    <li>• Payment must be made within 7 days</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button onClick={() => setShowFeeChallan(false)} className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer hover:shadow-md" style={{ backgroundColor: THEME.lightBg, color: THEME.text }}>Close</button>
                  <button onClick={handleDownloadChallan} className="flex-1 px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer hover:scale-105" style={{ backgroundColor: THEME.primary }}><span>📄</span> Download Challan</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}