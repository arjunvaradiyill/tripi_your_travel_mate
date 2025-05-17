"use client"

import { navLinks } from '@/constant/constant'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'

interface MobileNavProps {
  setIsOpen: (isOpen: boolean) => void
}

const MobileNav = ({ setIsOpen }: MobileNavProps) => {
  // Auto close after 5 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [setIsOpen])

  // Auto close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.mobile-nav-content')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsOpen])

  return (
    <div>
      {/* Overlay */}
      <div 
        className="fixed inset-0 transform transition-all duration-200 z-[1002] bg-black/80 backdrop-blur-sm w-full h-screen"
        onClick={() => setIsOpen(false)}
      />

      {/* Navigation Links */}
      <div className="mobile-nav-content text-white fixed justify-center flex flex-col h-full transform transition-all duration-200 w-[80%] sm:w-[60%] bg-rose-900/95 backdrop-blur-sm space-y-6 z-[1050] right-0 shadow-2xl">
        {/* Left Close Button */}
        <div className="absolute top-4 left-4 group">
          <button 
            className="text-white text-2xl hover:text-yellow-300 transition-colors duration-150"
            onClick={() => setIsOpen(false)}
          >
            <IoClose className="w-8 h-8 group-hover:scale-110 transition-transform duration-150" />
          </button>
        </div>

        {navLinks.map((link, index) => (
          <Link 
            href={link.url} 
            key={link.id}
            onClick={() => setIsOpen(false)}
            className="group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <p className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white/30 sm:text-[30px] hover:text-yellow-300 transition-colors duration-150 group-hover:translate-x-3 transition-transform duration-150 hover:border-yellow-300">
              {link.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Right Close Button */}
      <div className="fixed top-4 right-4 z-[1001] group">
        <button 
          className="text-white text-2xl hover:text-yellow-300 transition-colors duration-150"
          onClick={() => setIsOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 group-hover:scale-110 transition-transform duration-150"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MobileNav
