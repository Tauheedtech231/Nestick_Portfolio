'use client';

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top Section: Links + Social */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-6">

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-bold text-white">Aspire College</h3>
            <nav className="flex flex-col md:flex-row gap-4 text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/programs" className="hover:text-white transition-colors">Programs</Link>
              <Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="font-semibold text-white">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors">
                <FaFacebookF />
              </Link>
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-400 transition-colors">
                <FaTwitter />
              </Link>
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-700 transition-colors">
                <FaLinkedinIn />
              </Link>
              <Link href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 transition-colors">
                <FaInstagram />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
          &copy; {new Date().getFullYear()} Aspire College. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
