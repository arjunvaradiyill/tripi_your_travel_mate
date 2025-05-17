"use client"

import React from "react";

const Hero1Video = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/images/hero1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-widest text-center mb-4 drop-shadow-lg uppercase">
          LETS ENJOY THE NATURE
        </h1>
        <p className="text-white text-lg md:text-xl text-center mb-8 drop-shadow-md">
          Get the best prices on 2,000,000+ properties, worldwide
        </p>
        {/* Search Card */}
        <div className="bg-white/95 rounded-xl shadow-xl px-6 py-6 flex flex-col md:flex-row items-center gap-6 md:gap-0 md:divide-x w-[95%] max-w-4xl">
          {/* Location */}
          <div className="flex flex-col items-center md:items-start px-6">
            <span className="font-bold text-lg flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Location
            </span>
            <span className="text-gray-700 text-base">kochi</span>
          </div>
          {/* Start Date */}
          <div className="flex flex-col items-center md:items-start px-6">
            <span className="font-bold text-lg flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Start Date
            </span>
            <span className="text-gray-700 text-base">08/05/2025</span>
          </div>
          {/* End Date */}
          <div className="flex flex-col items-center md:items-start px-6">
            <span className="font-bold text-lg flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              End Date
            </span>
            <span className="text-gray-700 text-base">23/05/2025</span>
          </div>
          {/* Guest */}
          <div className="flex flex-col items-center md:items-start px-6">
            <span className="font-bold text-lg flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
              Guest
            </span>
            <span className="text-gray-700 text-base">1 Guest 1 Room</span>
          </div>
          {/* Search Button */}
          <div className="flex items-center justify-center w-full md:w-auto mt-4 md:mt-0 md:ml-6">
            <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-12 py-3 rounded-lg shadow-md transition-all duration-150 text-lg">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero1Video; 