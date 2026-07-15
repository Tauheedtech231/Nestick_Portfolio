/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock 
} from 'react-icons/fa';

interface FooterData {
  logo: string;
  collegeName: string;
  tagline: string;
  description: string;
  programs: Array<{ name: string; link: string }>;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    officeHours: string;
  };
  socialLinks: Array<{ name: string; url: string; icon: string }>;
  accentColor: string;
  darkBgColor: string;
}

const defaultFooterData: FooterData = {
  logo: '/logo.png',
  collegeName: 'Aspire College',
  tagline: 'Empowering Minds. Shaping Futures.',
  description: 'Aspire College is committed to academic excellence, innovation, and holistic development. We provide quality education that empowers students to become leaders, critical thinkers, and responsible citizens.',
  programs: [
    { name: "FSc Pre-Medical", link: "/Programms" },
    { name: "FSc Pre-Engineering", link: "/Programms" },
    { name: "ICS", link: "/Programms" },
    { name: "I.Com", link: "/Programms" },
    { name: "DAE", link: "/Programms" },
    { name: "DIT", link: "/Programms" },
  ],
  contactInfo: {
    address: '123 Education Boulevard, Lahore',
    phone: '+92-42-111-222-333',
    email: 'info@aspirecollege.edu.pk',
    officeHours: 'Mon-Fri: 8:00 AM - 6:00 PM'
  },
  socialLinks: [
    { name: 'Facebook', url: 'https://facebook.com/aspirecollege', icon: 'facebook' },
    { name: 'Twitter', url: 'https://twitter.com/aspirecollege', icon: 'twitter' },
    { name: 'Instagram', url: 'https://instagram.com/aspirecollege', icon: 'instagram' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/aspirecollege', icon: 'linkedin' },
    { name: 'YouTube', url: 'https://youtube.com/aspirecollege', icon: 'youtube' },
  ],
  accentColor: '#2f56fb', // ✅ Changed to match Navbar
  darkBgColor: '#0a0e1a'
};

// Icon mapping for social links
const socialIconMap: Record<string, any> = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [footerData, setFooterData] = useState<FooterData>(defaultFooterData);

  const collegeId = "8"; // ✅ Hardcoded college ID
  const SESSION_KEY = `footer_data_${collegeId}`;

  // ✅ Fetch footer data with session storage caching
  useEffect(() => {
    // ✅ Check session storage first
    const cachedData = sessionStorage.getItem(SESSION_KEY);
    
    if (cachedData) {
      try {
        console.log('📦 [Footer] Loading from session storage (instant)');
        const parsedData = JSON.parse(cachedData);
        setFooterData(parsedData);
        setLoading(false);
        return;
      } catch (e) {
        console.error('Error parsing cached data:', e);
      }
    }

    async function fetchFooterData() {
      try {
        setLoading(true);
        console.log('🔄 [Footer] Fetching from API...');
        const response = await fetch(`https://dynamic-section-api.vercel.app/api/public/sections?college_id=${collegeId}&section_name=Footer`);
        const result = await response.json();
        
        console.log('📦 [Footer] API Response:', result);

        let fetchedData;
        if (result.success && result.content) {
          const content = result.content;
          fetchedData = {
            logo: content.logo || defaultFooterData.logo,
            collegeName: content.collegeName || defaultFooterData.collegeName,
            tagline: content.tagline || defaultFooterData.tagline,
            description: content.description || defaultFooterData.description,
            programs: content.programs || defaultFooterData.programs,
            contactInfo: {
              address: content.contactInfo?.address || defaultFooterData.contactInfo.address,
              phone: content.contactInfo?.phone || defaultFooterData.contactInfo.phone,
              email: content.contactInfo?.email || defaultFooterData.contactInfo.email,
              officeHours: content.contactInfo?.officeHours || defaultFooterData.contactInfo.officeHours
            },
            socialLinks: content.socialLinks || defaultFooterData.socialLinks,
            accentColor: content.accentColor || defaultFooterData.accentColor,
            darkBgColor: content.darkBgColor || defaultFooterData.darkBgColor
          };
          console.log('✅ [Footer] Data loaded successfully');
        } else {
          console.log('⚠️ [Footer] No data, using default');
          fetchedData = defaultFooterData;
        }

        // ✅ Save to session storage
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(fetchedData));
        setFooterData(fetchedData);
      } catch (error) {
        console.error('❌ [Footer] Error fetching:', error);
        // ✅ Don't cache on error
        setFooterData(defaultFooterData);
      } finally {
        setLoading(false);
      }
    }

    fetchFooterData();
  }, [collegeId, SESSION_KEY]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  // ✅ Consistent colors - EXACTLY same as Navbar
  const PRIMARY_COLOR = '#2f56fb'; // Blue - Primary brand color (same as Navbar)
  const PRIMARY_DARK = '#1530b0'; // Darker blue for hover (same as Navbar)
  const ACCENT_COLOR = '#0D9488'; // Teal - Only for highlights
  const DARK_BG = footerData.darkBgColor || '#0a0e1a';

  // ✅ Show loading only on first visit (no cache)
  if (loading && !sessionStorage.getItem(SESSION_KEY)) {
    return (
      <footer className="relative text-white pt-[40px] px-[5%] overflow-hidden" style={{ backgroundColor: DARK_BG }}>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading footer...</p>
          </div>
        </div>
      </footer>
    );
  }

  // Get social icon component
  const getSocialIcon = (iconName: string) => {
    return socialIconMap[iconName?.toLowerCase()] || FaFacebook;
  };

  // ✅ Use accent color from API or default (now #2f56fb)
  const brandColor = footerData.accentColor || PRIMARY_COLOR;

  return (
    <footer className="relative text-white pt-[40px] px-[5%] overflow-hidden" style={{ backgroundColor: DARK_BG }}>
      {/* Footer Grid - Reduced gap */}
      <div className="relative z-[2] grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-6 max-w-[1200px] mx-auto pb-4">
        {/* Column 1 - Brand */}
        <div>
          <div className="flex items-center gap-[10px] mb-[10px]">
            <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200">
              <Image
                src={footerData.logo || '/logo.png'}
                alt={`${footerData.collegeName} Logo`}
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
            </div>
            <div>
              <div className="text-[1.4rem] font-bold text-white leading-tight">{footerData.collegeName}</div>
              <div className="text-[0.7rem] text-[#a89572]">{footerData.tagline}</div>
            </div>
          </div>
          <div className="w-10 h-[2px] mb-2" style={{ backgroundColor: brandColor }} />
          <p className="text-[#9ca3af] text-[0.85rem] leading-[1.6] max-w-[320px] mb-3">
            {footerData.description}
          </p>
        </div>

        {/* Column 2 - Programs */}
        <div>
          <div className="text-[0.75rem] font-bold tracking-[1.5px] mb-3" style={{ color: brandColor }}>
            PROGRAMS
          </div>
          <ul className="list-none space-y-[10px]">
            {footerData.programs.map((program) => (
              <li key={program.name}>
                <Link href={program.link} className="flex items-center gap-2 text-[#e5e7eb] no-underline text-[0.85rem] transition-colors duration-200 hover:text-[#2f56fb]">
                  <span className="text-[0.7rem]" style={{ color: brandColor }}>&#8250;</span> {program.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <div className="text-[0.75rem] font-bold tracking-[1.5px] mb-3" style={{ color: brandColor }}>
            CONTACT INFO
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: brandColor }} />
              <div>
                <p className="text-[#9ca3af] text-[0.7rem] font-medium">Address</p>
                <p className="text-[#e5e7eb] text-[0.85rem] leading-relaxed">
                  {footerData.contactInfo.address}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaPhone className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: brandColor }} />
              <div>
                <p className="text-[#9ca3af] text-[0.7rem] font-medium">Phone</p>
                <a href={`tel:${footerData.contactInfo.phone.replace(/\s/g, '')}`} className="text-[#e5e7eb] text-[0.85rem] hover:text-[#2f56fb] transition-colors">
                  {footerData.contactInfo.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaEnvelope className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: brandColor }} />
              <div>
                <p className="text-[#9ca3af] text-[0.7rem] font-medium">Email</p>
                <a href={`mailto:${footerData.contactInfo.email}`} className="text-[#e5e7eb] text-[0.85rem] hover:text-[#2f56fb] transition-colors break-all">
                  {footerData.contactInfo.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FaClock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: brandColor }} />
              <div>
                <p className="text-[#9ca3af] text-[0.7rem] font-medium">Office Hours</p>
                <p className="text-[#e5e7eb] text-[0.85rem]">
                  {footerData.contactInfo.officeHours}
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4 - Stay Connected */}
        <div>
          <div className="text-[0.75rem] font-bold tracking-[1.5px] mb-3" style={{ color: brandColor }}>
            STAY CONNECTED
          </div>
          <p className="text-[#9ca3af] text-[0.8rem] leading-[1.4] mb-3 max-w-[280px]">
            Subscribe to our newsletter for latest updates.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center bg-[#10162a] border border-[#232a40] rounded-[30px] p-[5px] pl-4 mb-4 max-w-[280px]">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#e5e7eb] text-[0.8rem] py-1"
              required
            />
            <button
              type="submit"
              className="w-[32px] h-[32px] rounded-full border-none flex items-center justify-center cursor-pointer flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ backgroundColor: brandColor }}
            >
              <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
              </svg>
            </button>
          </form>
          
          {/* Social Icons */}
          <div className="flex gap-2.5">
            {footerData.socialLinks.map((social, index) => {
              const IconComponent = getSocialIcon(social.icon);
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[34px] h-[34px] rounded-full bg-[#10162a] border border-[#232a40] flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:border-[#2f56fb]"
                  aria-label={social.name}
                >
                  <IconComponent className="w-[15px] h-[15px] fill-white hover:fill-[#2f56fb]" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wavy line separator - Now using brand color */}
      <div className="relative h-[30px] mt-1 w-screen -ml-[5vw]">
        <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={brandColor} stopOpacity="0.5" />
              <stop offset="50%" stopColor={brandColor} stopOpacity="1" />
              <stop offset="100%" stopColor={brandColor} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M0,15 C120,30 200,34 320,28 C460,22 520,8 650,4 C820,-2 950,10 1050,18 C1120,22 1160,20 1200,15"
            stroke="url(#waveGrad)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Bottom bar */}
      <div className="relative z-[2] flex items-center justify-center gap-3 py-2 pb-[16px]">
        <div className="h-[1px] bg-[#232a40] flex-1 max-w-[200px]" />
        <div className="text-center text-[#9ca3af] text-[0.75rem]">
          <span className="text-[0.8rem] block mb-0.5" style={{ color: brandColor }}>&#10022;</span>
          &copy; 2026 {footerData.collegeName}. All rights reserved.
        </div>
        <div className="h-[1px] bg-[#232a40] flex-1 max-w-[200px]" />
      </div>
    </footer>
  );
}