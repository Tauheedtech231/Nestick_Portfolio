/* eslint-disable @typescript-eslint/no-explicit-any */
// app/applicant_portal/dynamic-apply/page.tsx
"use client";

import { useState, useEffect } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useRouter } from "next/navigation";

// ============================================
// TYPES
// ============================================
interface FormField {
  id: number;
  field_key: string;
  field_label: string;
  field_type: string;
  field_placeholder: string | null;
  field_options: string[] | null;
  is_required: boolean;
  is_active: boolean;
  sort_order: number;
  section: string;
}

interface CollegeData {
  id: number;
  name: string;
  template_id: number;
}

interface FormDataState {
  [key: string]: any;
}

// ============================================
// THEME CONFIG - ✅ Updated with consistent brand colors
// ============================================
const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color (same as Navbar)
const PRIMARY_DARK = '#1530b0'; // Darker blue for hover
const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights

const THEME = {
  primary: PRIMARY_COLOR,
  primaryHover: PRIMARY_DARK,
  secondary: PRIMARY_COLOR,
  secondaryHover: PRIMARY_DARK,
  bg: '#FFFFFF',
  text: '#1E293B',
  textMuted: '#64748B',
  border: '#E2E8F0',
  lightBg: '#F8FAFC',
  white: '#FFFFFF',
  shadow: '0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
  shadowHover: '0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function DynamicApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [college, setCollege] = useState<CollegeData | null>(null);
  const [fields, setFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<FormDataState>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const COLLEGE_ID = 8;

  // ✅ Session storage keys
  const FORM_SESSION_KEY = `apply_form_data_${COLLEGE_ID}`;
  const FIELDS_SESSION_KEY = `apply_fields_${COLLEGE_ID}`;
  const COLLEGE_SESSION_KEY = `apply_college_${COLLEGE_ID}`;

  // ✅ Get unique sections from fields
  const getSections = () => {
    const sections = new Set<string>();
    fields.forEach(field => {
      if (field.section) sections.add(field.section);
    });
    return Array.from(sections);
  };

  const sections = getSections();
  const totalSteps = sections.length || 1;

  // ✅ Fetch form fields with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedFields = sessionStorage.getItem(FIELDS_SESSION_KEY);
      const cachedCollege = sessionStorage.getItem(COLLEGE_SESSION_KEY);
      
      if (cachedFields && cachedCollege) {
        try {
          console.log('📦 [DynamicApply] Loading from session storage (instant)');
          const parsedFields = JSON.parse(cachedFields);
          const parsedCollege = JSON.parse(cachedCollege);
          
          setCollege(parsedCollege);
          setFields(parsedFields);
          
          // Initialize form data
          const initialData: FormDataState = {};
          parsedFields.forEach((field: FormField) => {
            if (field.field_type === "file") {
              initialData[field.field_key] = null;
            } else if (field.field_type === "checkbox") {
              initialData[field.field_key] = [];
            } else {
              initialData[field.field_key] = "";
            }
          });
          setFormData(initialData);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    // If no cached data, fetch from API
    const fetchForm = async () => {
      try {
        setLoading(true);
        console.log('🔄 [DynamicApply] Fetching from API...');
        const response = await fetch(
          `https://dynamic-section-api.vercel.app/api/public/college/form?college_id=${COLLEGE_ID}`
        );
        const result = await response.json();

        if (result.success) {
          setCollege(result.data.college);
          setFields(result.data.fields);
          
          const initialData: FormDataState = {};
          result.data.fields.forEach((field: FormField) => {
            if (field.field_type === "file") {
              initialData[field.field_key] = null;
            } else if (field.field_type === "checkbox") {
              initialData[field.field_key] = [];
            } else {
              initialData[field.field_key] = "";
            }
          });
          setFormData(initialData);

          // ✅ Save to session storage (only in browser)
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(FIELDS_SESSION_KEY, JSON.stringify(result.data.fields));
            sessionStorage.setItem(COLLEGE_SESSION_KEY, JSON.stringify(result.data.college));
          }
        } else {
          alert("Failed to load form: " + result.message);
        }
      } catch (error) {
        console.error("Error fetching form:", error);
        alert("Error loading form");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [COLLEGE_ID, FIELDS_SESSION_KEY, COLLEGE_SESSION_KEY]);

  // ✅ Get fields for current section
  const getCurrentSectionFields = () => {
    if (!sections.length) return [];
    const currentSection = sections[currentStep];
    return fields.filter(field => field.section === currentSection);
  };

  const currentFields = getCurrentSectionFields();
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  // ✅ Handle input change - save to session storage
  const handleInputChange = (fieldKey: string, value: any) => {
    const newFormData = { ...formData, [fieldKey]: value };
    setFormData(newFormData);
    
    // ✅ Save form progress to session storage
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(FORM_SESSION_KEY, JSON.stringify(newFormData));
      } catch (e) {
        console.error('Error saving form data to session:', e);
      }
    }
    
    if (errors[fieldKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldKey];
        return newErrors;
      });
    }
  };

  // ✅ Handle file upload
  const handleFileChange = (fieldKey: string, file: File | null) => {
    if (file) {
      handleInputChange(fieldKey, file.name);
    } else {
      handleInputChange(fieldKey, null);
    }
  };

  // ✅ Validate current section
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    currentFields.forEach((field) => {
      if (field.is_required) {
        const value = formData[field.field_key];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[field.field_key] = `${field.field_label} is required`;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // ✅ Navigation
  const handleNext = () => {
    if (validateCurrentStep()) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(Math.max(currentStep - 1, 0));
      setIsAnimating(false);
    }, 300);
  };

  // ✅ Submit application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        college_id: COLLEGE_ID,
        form_data: formData,
        student_name: formData.fullName || formData.student_name || formData.name || "N/A",
        student_email: formData.email || formData.student_email || "N/A",
        student_phone: formData.phone || formData.student_phone || formData.mobile || "N/A",
      };

      const response = await fetch("https://dynamic-section-api.vercel.app/api/public/college/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setApplicationId(result.data.application_id);
        setSubmitSuccess(true);
        
        // ✅ Clear session storage on successful submission
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem(FORM_SESSION_KEY);
          sessionStorage.removeItem(FIELDS_SESSION_KEY);
          sessionStorage.removeItem(COLLEGE_SESSION_KEY);
        }
        
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        alert("Submission failed: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Error submitting application");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Render field based on type - Updated colors
  const renderField = (field: FormField) => {
    const value = formData[field.field_key] || "";
    const error = errors[field.field_key];
    const isRequired = field.is_required;

    switch (field.field_type) {
      case "text":
      case "email":
      case "number":
      case "tel":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.field_type}
              value={value}
              onChange={(e) => handleInputChange(field.field_key, e.target.value)}
              placeholder={field.field_placeholder || `Enter ${field.field_label}`}
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#2f56fb] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: error ? '#EF4444' : THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />
            {error && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {error}</p>}
          </div>
        );

      case "textarea":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleInputChange(field.field_key, e.target.value)}
              placeholder={field.field_placeholder || `Enter ${field.field_label}`}
              rows={4}
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#2f56fb] focus:border-transparent transition-all duration-200 resize-none cursor-pointer bg-white"
              style={{ 
                borderColor: error ? '#EF4444' : THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />
            {error && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {error}</p>}
          </div>
        );

      case "select":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(field.field_key, e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#2f56fb] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: error ? '#EF4444' : THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            >
              <option value="">Select {field.field_label}</option>
              {field.field_options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {error}</p>}
          </div>
        );

      case "radio":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {field.field_options?.map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name={field.field_key}
                    value={option}
                    checked={value === option}
                    onChange={(e) => handleInputChange(field.field_key, e.target.value)}
                    className="mr-3 w-4 h-4 accent-[#2f56fb] cursor-pointer"
                  />
                  <span style={{ color: THEME.text }}>{option}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {error}</p>}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {field.field_options?.map((option) => (
                <label key={option} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={option}
                    checked={Array.isArray(value) && value.includes(option)}
                    onChange={(e) => {
                      const current = Array.isArray(value) ? [...value] : [];
                      if (e.target.checked) {
                        current.push(option);
                      } else {
                        const index = current.indexOf(option);
                        if (index > -1) current.splice(index, 1);
                      }
                      handleInputChange(field.field_key, current);
                    }}
                    className="mr-3 w-4 h-4 accent-[#2f56fb] rounded cursor-pointer"
                  />
                  <span style={{ color: THEME.text }}>{option}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {error}</p>}
          </div>
        );

      case "date":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              value={value}
              onChange={(e) => handleInputChange(field.field_key, e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#2f56fb] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: error ? '#EF4444' : THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />
            {error && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {error}</p>}
          </div>
        );

      case "file":
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </label>
            <label className="block cursor-pointer">
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleFileChange(field.field_key, file);
                }}
                className="hidden"
              />
              <div 
                className={`w-full rounded-xl border-2 border-dashed px-4 py-6 text-center hover:border-[#2f56fb] transition-all duration-200 cursor-pointer bg-white hover:bg-gray-50 ${
                  value ? 'border-green-500 bg-green-50' : ''
                }`}
                style={{ borderColor: error ? '#EF4444' : (value ? '#22C55E' : THEME.border) }}
              >
                <span className="cursor-pointer" style={{ color: value ? '#22C55E' : THEME.textMuted }}>
                  {value ? `✓ ${value}` : `Click to upload ${field.field_label}`}
                </span>
              </div>
            </label>
            {error && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {error}</p>}
          </div>
        );

      default:
        return (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-2 cursor-pointer" style={{ color: THEME.text }}>
              {field.field_label}
              {isRequired && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(field.field_key, e.target.value)}
              placeholder={field.field_placeholder || `Enter ${field.field_label}`}
              className="w-full rounded-xl border px-4 py-3 text-base focus:ring-2 focus:ring-[#2f56fb] focus:border-transparent transition-all duration-200 cursor-pointer bg-white"
              style={{ 
                borderColor: error ? '#EF4444' : THEME.border,
                color: THEME.text,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
            />
            {error && <p className="text-red-500 text-sm mt-2 cursor-pointer">⚠ {error}</p>}
          </div>
        );
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-4 border-[#2f56fb] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application form...</p>
        </div>
      </div>
    );
  }

  // ✅ Success state
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-2xl border border-[#E2E8F0]">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ backgroundColor: '#E6F7F5' }}>
            <span className="text-3xl cursor-pointer" style={{ color: THEME.primary }}>✓</span>
          </div>
          <h1 className="text-2xl font-bold mb-4 cursor-pointer" style={{ color: THEME.text }}>Application Submitted!</h1>
          <p className="mb-6 leading-relaxed cursor-pointer" style={{ color: THEME.textMuted }}>Thank you for submitting your application. We will contact you shortly.</p>
          <div className="rounded-lg p-4 mb-6 cursor-pointer shadow-sm" style={{ backgroundColor: '#E6F7F5' }}>
            <p className="text-sm cursor-pointer" style={{ color: THEME.primary }}><strong>Application ID:</strong> {applicationId}</p>
          </div>
          <button 
            onClick={() => router.push("/applicant_portal")}
            className="w-full px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
            style={{ backgroundColor: THEME.primary }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main form
  return (
    <div className="min-h-screen bg-white pt-10">
      <div className="w-full px-0">
        {/* Header */}
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
                  {college?.name || "College"} Application
                </h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base cursor-pointer" style={{ color: THEME.textMuted }}>
                  Complete all {totalSteps} sections to submit your application
                </p>
              </div>
              <button 
                onClick={() => router.push("/applicant_portal")}
                className="px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base cursor-pointer hover:shadow-md"
                style={{ backgroundColor: THEME.lightBg, color: THEME.text }}
              >
                <span>←</span> Back
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 sm:mt-6">
              <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-medium mb-2 sm:mb-3" style={{ color: THEME.text }}>
                <span>Section {currentStep + 1} of {totalSteps}</span>
                <span>{Math.round(progressPercent)}% Complete</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden shadow-inner" style={{ backgroundColor: THEME.lightBg }}>
                <div className="h-3 rounded-full transition-all duration-500 ease-out shadow-sm" style={{ width: `${progressPercent}%`, background: `linear-gradient(to right, ${THEME.primary}, ${THEME.secondary})` }} />
              </div>
            </div>

            {/* ✅ Stepper - Mobile optimized: no scroll, smaller gap */}
            <div className="mt-4 sm:mt-6 overflow-hidden">
              <div className="flex items-center justify-between relative min-w-full">
                <div className="absolute top-4 left-0 right-0 h-0.5 -z-10" style={{ backgroundColor: THEME.lightBg }} />
                {sections.map((section, index) => (
                  <div key={index} className="flex flex-col items-center relative z-10 flex-1">
                    <button 
                      onClick={() => {
                        if (index <= currentStep) {
                          setIsAnimating(true);
                          setTimeout(() => {
                            setCurrentStep(index);
                            setIsAnimating(false);
                          }, 300);
                        }
                      }}
                      disabled={index > currentStep}
                      className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full font-medium transition-all duration-300 cursor-pointer text-[10px] sm:text-sm ${
                        index === currentStep ? 'scale-110' : ''
                      }`}
                      style={{ 
                        backgroundColor: 'transparent',
                        color: index <= currentStep ? THEME.primary : THEME.textMuted
                      }}
                    >
                      {index < currentStep ? "✓" : index + 1}
                    </button>
                    <p className={`mt-0.5 sm:mt-1 text-[7px] sm:text-[10px] font-medium text-center truncate max-w-[30px] sm:max-w-none cursor-pointer`} 
                       style={{ color: index <= currentStep ? THEME.primary : THEME.textMuted }}>
                      {section.replace(/_/g, " ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="w-full py-6 sm:py-8">
          <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div 
                className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 transition-all duration-300 hover:shadow-xl"
                style={{ 
                  boxShadow: THEME.shadow,
                  border: `1px solid ${THEME.border}`,
                }}
              >
                {/* Section Header */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-md" style={{ backgroundColor: '#E6F7F5' }}>
                    <span className="text-lg font-semibold cursor-pointer" style={{ color: THEME.primary }}>
                      {currentStep + 1}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold cursor-pointer" style={{ color: THEME.text }}>
                      {sections[currentStep]?.replace(/_/g, " ")}
                    </h2>
                    <p className="text-sm mt-1 cursor-pointer" style={{ color: THEME.textMuted }}>
                      Please fill out all required fields
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {currentFields.map(renderField)}

                  {currentFields.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No fields found in this section.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
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

              {currentStep < totalSteps - 1 ? (
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.secondaryHover})` }}
                >
                  Next <span>→</span>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 cursor-pointer"
                  style={{ 
                    background: submitting ? '#94A3B8' : `linear-gradient(135deg, ${THEME.primary}, ${THEME.secondaryHover})` 
                  }}
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span>✓</span> Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}