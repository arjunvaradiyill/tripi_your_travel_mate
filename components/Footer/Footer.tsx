'use client'

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useTheme } from '@/app/context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} text-gray-300`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-emerald-600">Tripi</span>
            </Link>
            <p className="text-sm">
              Your perfect travel companion for unforgettable adventures. Discover the world with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-500 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="hover:text-emerald-500 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="hover:text-emerald-500 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="hover:text-emerald-500 transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations" className="hover:text-emerald-500 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-emerald-500 transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/flights" className="hover:text-emerald-500 transition-colors">
                  Flights
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:text-emerald-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-emerald-500 transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaPhone className="text-emerald-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-emerald-500" />
                <span>support@tripi.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-emerald-500 mt-1" />
                <span>123 Travel Street, Adventure City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Tripi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 