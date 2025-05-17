"use client"

import React, { useState } from 'react'
import Nav from './Nav'           // Adjust the path based on your folder structure
import MobileNav from './MobileNav'  // Adjust the path as needed

const ResponsiveNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && <MobileNav setIsOpen={setIsOpen} />}
    </div>
  )
}

export default ResponsiveNav
