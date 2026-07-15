"use client";

import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type ContactRow = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

interface ContactData {
  email: string;
  phone: string;
  address: string;
  website: string;
  mapLink: string;
  appointmentLink: string;
  contactImage: string;
  contactMobileImage: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  contactNumbers: {
    phone: string;
    whatsapp: string;
    office: string;
  };
}

export default function ContactSection() {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState<ContactData>({
    email: 'info@aspirecollege.edu.pk',
    phone: '+92 21 1234 5678',
    address: 'Aspire College, Main Campus,\nPlot # 45, Education City, Karachi, Pakistan.',
    website: 'https://www.aspirecollege.edu.pk',
    mapLink: '',
    appointmentLink: '',
    contactImage: 'https://images.pexels.com/photos/3855619/pexels-photo-3855619.jpeg?auto=compress&cs=tinysrgb&w=1000',
    contactMobileImage: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    workingHours: {
      weekdays: '9:00 AM – 5:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    contactNumbers: {
      phone: '+92 21 1234 5678',
      whatsapp: '',
      office: ''
    }
  });

  const collegeId = "8"; // ✅ Hardcoded college ID
  const SESSION_KEY = `contact_section_${collegeId}`;

  // ✅ Fetch contact data from API with session storage caching
  useEffect(() => {
    // ✅ Check session storage first (only in browser)
    if (typeof window !== 'undefined') {
      const cachedData = sessionStorage.getItem(SESSION_KEY);
      
      if (cachedData) {
        try {
          console.log('📦 [ContactSection] Loading from session storage (instant)');
          const parsedData = JSON.parse(cachedData);
          setContactData(parsedData);
          setLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing cached data:', e);
        }
      }
    }

    async function fetchContactData() {
      try {
        setLoading(true);
        console.log('🔄 [ContactSection] Fetching from API...');
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=Contact`);
        const result = await response.json();
        
        console.log('📦 [ContactSection] API Response:', result);

        let fetchedData;
        if (result.success && result.content) {
          const content = result.content;
          fetchedData = {
            email: content.email || contactData.email,
            phone: content.contactNumbers?.phone || content.phone || contactData.phone,
            address: content.address || contactData.address,
            website: content.website || contactData.website,
            mapLink: content.mapLink || contactData.mapLink,
            appointmentLink: content.appointmentLink || contactData.appointmentLink,
            contactImage: content.contactImage || contactData.contactImage,
            contactMobileImage: content.contactMobileImage || contactData.contactMobileImage,
            socialMedia: {
              facebook: content.socialMedia?.facebook || '',
              twitter: content.socialMedia?.twitter || '',
              linkedin: content.socialMedia?.linkedin || '',
              instagram: content.socialMedia?.instagram || ''
            },
            workingHours: {
              weekdays: content.workingHours?.weekdays || contactData.workingHours.weekdays,
              saturday: content.workingHours?.saturday || contactData.workingHours.saturday,
              sunday: content.workingHours?.sunday || contactData.workingHours.sunday
            },
            contactNumbers: {
              phone: content.contactNumbers?.phone || content.phone || contactData.phone,
              whatsapp: content.contactNumbers?.whatsapp || '',
              office: content.contactNumbers?.office || ''
            }
          };
          console.log('✅ [ContactSection] Data loaded successfully');
        } else {
          console.log('⚠️ [ContactSection] No data, using default');
          fetchedData = contactData;
        }

        // ✅ Save to session storage (only in browser)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        }
        setContactData(fetchedData);
      } catch (error) {
        console.error('❌ [ContactSection] Error fetching:', error);
        // ✅ Don't cache on error
        setContactData(contactData);
      } finally {
        setLoading(false);
      }
    }

    fetchContactData();
  }, [collegeId, SESSION_KEY]);

  // ✅ Build contact rows dynamically
  const getContactRows = (): ContactRow[] => {
    const rows: ContactRow[] = [
      {
        icon: <Mail className="h-[18px] w-[18px]" />,
        label: "Email",
        value: contactData.email,
      },
      {
        icon: <Phone className="h-[18px] w-[18px]" />,
        label: "Phone",
        value: contactData.contactNumbers.phone || contactData.phone,
      },
      {
        icon: <MapPin className="h-[18px] w-[18px]" />,
        label: "Address",
        value: (
          <>
            {contactData.address.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < contactData.address.split('\n').length - 1 && <br />}
              </span>
            ))}
          </>
        ),
      },
      {
        icon: <Clock className="h-[18px] w-[18px]" />,
        label: "Office Hours",
        value: (
          <>
            Monday – Friday
            <br />
            {contactData.workingHours.weekdays}
            {contactData.workingHours.saturday && contactData.workingHours.saturday !== 'Closed' && (
              <>
                <br />
                Saturday: {contactData.workingHours.saturday}
              </>
            )}
            {contactData.workingHours.sunday && contactData.workingHours.sunday !== 'Closed' && (
              <>
                <br />
                Sunday: {contactData.workingHours.sunday}
              </>
            )}
          </>
        ),
      },
    ];

    // Add WhatsApp if available
    if (contactData.contactNumbers.whatsapp) {
      rows.splice(2, 0, {
        icon: <Phone className="h-[18px] w-[18px]" />,
        label: "WhatsApp",
        value: contactData.contactNumbers.whatsapp,
      });
    }

    // Add Office if available
    if (contactData.contactNumbers.office) {
      rows.splice(3, 0, {
        icon: <Phone className="h-[18px] w-[18px]" />,
        label: "Office",
        value: contactData.contactNumbers.office,
      });
    }

    return rows;
  };

  const rows = getContactRows();

  // ✅ Show loading only on first visit (no cache)
  if (loading && typeof window !== 'undefined' && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center bg-white p-5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2f56fb] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading contact information...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center bg-white p-5">
      <div className="relative z-10 grid w-full max-w-full grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] md:grid-cols-2">
        {/* LEFT: image panel */}
        <div
          className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-[#dce3f5] via-[#e8edf8] to-[#f0f4ff] md:min-h-[640px]"
          style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)" }}
        >
          <Image
            src={contactData.contactImage || "https://images.pexels.com/photos/3855619/pexels-photo-3855619.jpeg?auto=compress&cs=tinysrgb&w=1000"}
            alt="Staff member ready to help with your inquiry"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            priority
          />
        </div>

        {/* RIGHT: info panel */}
        <div className="p-9 md:p-14">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#dce3f5] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#1c3fe0] shadow-sm">
            Get in touch
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-[#0a1240]">
            Contact <span className="text-[#2f56fb]">Us</span>
          </h1>

          <div className="my-4 flex items-center gap-1.5">
            <div className="h-1 w-[34px] rounded-full bg-[#2f56fb]" />
            <div className="h-[4px] w-[4px] rounded-full bg-[#2f56fb] opacity-55" />
            <div className="h-[4px] w-[4px] rounded-full bg-[#2f56fb] opacity-30" />
          </div>

          <p className="mb-7 max-w-[420px] text-[15px] leading-[1.8] text-[#3d4566]">
            We&apos;d love to hear from you! Reach out to us for admissions,
            inquiries, or any other information.
          </p>

          <div>
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-start gap-4 py-4 ${
                  i === rows.length - 1 ? "" : "border-b border-[#e8edf8]"
                }`}
              >
                <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full bg-[#2f56fb] text-white shadow-[0_8px_16px_-4px_rgba(47,86,251,0.3)]">
                  {row.icon}
                </div>
                <div>
                  <div className="mb-0.5 text-[13px] font-semibold text-[#2f56fb]">
                    {row.label}
                  </div>
                  <div className="text-[15px] font-medium leading-snug text-[#0a1240]">
                    {row.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/Contact"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#2f56fb] to-[#1530b0] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-8px_rgba(47,86,251,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(47,86,251,0.7)] cursor-pointer [&:hover>svg]:translate-x-1"
          >
            Contact Us
            <ArrowRight className="h-[18px] w-[18px] transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}