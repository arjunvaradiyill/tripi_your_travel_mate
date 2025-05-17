'use client'
import React from 'react';
import { FaPlane, FaUsers, FaGlobe, FaAward, FaMapMarkedAlt, FaHeart } from 'react-icons/fa';

const AboutPage = () => {
  const milestones = [
    {
      year: "2008",
      title: "Our Beginning",
      description: "Started with a small team of passionate travelers"
    },
    {
      year: "2012",
      title: "Global Expansion",
      description: "Reached 50+ destinations worldwide"
    },
    {
      year: "2016",
      title: "Digital Innovation",
      description: "Launched our mobile app and online booking platform"
    },
    {
      year: "2023",
      title: "Community Milestone",
      description: "Celebrated 50,000+ happy travelers"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/images/u1.jpg",
      quote: "Travel is the only thing you buy that makes you richer."
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/images/u2.jpg",
      quote: "Adventure is worthwhile."
    },
    {
      name: "Emma Rodriguez",
      role: "Travel Experience Director",
      image: "/images/u3.jpg",
      quote: "The world is a book, and those who do not travel read only one page."
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364]">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/h2.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover absolute inset-0 scale-110"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative text-center px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-widest">
            Our Journey
            <span className="block h-1 w-32 mx-auto mt-4 bg-gradient-to-r from-emerald-400 via-blue-500 to-emerald-400 rounded-full animate-pulse" />
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-semibold">
            Creating unforgettable travel experiences since 2008
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Mission Statement */}
        <div className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-bold mb-6 shadow-lg">
            Our Mission
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Making Travel Accessible to Everyone
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We believe that travel has the power to transform lives. Our mission is to make travel accessible, enjoyable, and meaningful for everyone, while promoting sustainable tourism practices.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: <FaPlane />, number: "50K+", label: "Happy Travelers" },
            { icon: <FaMapMarkedAlt />, number: "100+", label: "Destinations" },
            { icon: <FaUsers />, number: "25+", label: "Team Members" },
            { icon: <FaAward />, number: "15+", label: "Years Experience" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-extrabold text-white mb-2 drop-shadow">{stat.number}</p>
              <p className="text-gray-200 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12 tracking-wide">Our Journey</h2>
          <div className="relative flex flex-col items-center">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-400 via-blue-500 to-emerald-400 animate-pulse" />
            <div className="space-y-16 w-full">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 w-full px-8">
                    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                      <div className="text-emerald-400 font-bold mb-2 text-lg">{milestone.year}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-200 text-lg">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full border-4 border-white shadow-lg animate-bounce" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12 tracking-wide">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-lg rounded-2xl overflow-hidden group shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                <div className="relative flex flex-col items-center mt-8">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-emerald-400 shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="bg-white/80 rounded-xl px-4 py-2 mt-6 shadow text-center">
                    <h3 className="font-bold text-gray-900 text-xl">{member.name}</h3>
                    <p className="text-emerald-500 text-base">{member.role}</p>
                  </div>
                  <div className="italic text-gray-600 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">“{member.quote}”</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-br from-emerald-400/30 via-blue-500/10 to-emerald-400/30 rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12 tracking-wide">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <FaPlane />,
                title: "Adventure",
                description: "We believe in pushing boundaries and exploring the unknown, creating unforgettable experiences for our travelers."
              },
              {
                icon: <FaHeart />,
                title: "Passion",
                description: "Our love for travel drives us to create exceptional experiences and share the joy of discovery with others."
              },
              {
                icon: <FaGlobe />,
                title: "Sustainability",
                description: "Committed to responsible tourism and preserving the beauty of our destinations for future generations."
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-4xl">{value.icon}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-4 tracking-wide">{value.title}</h3>
                <p className="text-gray-200 text-lg leading-relaxed font-medium">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
