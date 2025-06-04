"use client"

import { navLinks } from '@/constant/constant'
import React, { useState, useEffect } from 'react'
import { TbAirBalloon } from 'react-icons/tb'
import Link from 'next/link'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { usePathname, useRouter } from 'next/navigation'
import LoginModal from '@/components/LoginModal/LoginModal'
import RegisterModal from '@/components/LoginModal/RegisterModal'
import { useAuth } from '@/context/AuthContext'
import { FaUser, FaSignOutAlt, FaHeart, FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'
import { MdLightMode, MdDarkMode } from 'react-icons/md'

interface NavLink {
  id: number
  url: string
  label: string
}

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    }
    return [];
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
    setIsMenuOpen(false);
  };

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[12vh]">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <TbAirBalloon className="w-8 h-8 text-white" />
              <span className="text-white text-2xl font-bold">Tripi</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link: NavLink) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className={`text-white hover:text-white/80 transition-colors duration-150 ${
                    pathname === link.url ? 'font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons and Theme Toggle */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors duration-150"
                  >
                    <FaUser className="text-lg" />
                    <span>{user.name}</span>
                    {favorites.length > 0 && (
                      <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors duration-150"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="text-white hover:text-white/80 transition-colors duration-150 font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleRegisterClick}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-150"
                  >
                    Sign Up
                  </button>
                </>
              )}
              <button className={`md:px-12 md:py-2.5 px-8 py-2 text-base rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 font-bold transition-all duration-150 ${
                isScrolled 
                  ? 'bg-white text-blue-600 hover:bg-blue-50' 
                  : 'bg-white text-black hover:bg-yellow-300'
              }`}>
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <HiBars3BottomRight 
                className="w-8 h-8 cursor-pointer text-white hover:text-white/80 transition-colors duration-150 hover:scale-110 transition-transform duration-150" 
                onClick={toggleMenu}
              />
            </div> 
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[12vh] left-0 right-0 bg-black/80 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link: NavLink) => (
              <Link
                key={link.id}
                href={link.url}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  <FaUser className="text-lg" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="bg-emerald-600 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700 transition-colors duration-150"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Nav;
