'use client'
import React, { useEffect, useRef } from 'react';
import { FaPlane, FaUsers, FaGlobe, FaAward, FaMapMarkedAlt, FaHeart } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const containerRef = useRef(null);

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
    <div className="relative min-h-screen bg-[#0A0A0A]">
      {/* Hero Section with Parallax */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/images/h2.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center px-4 z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-black text-white mb-8 uppercase tracking-tighter"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto font-light tracking-wide"
          >
            Creating unforgettable travel experiences since 2008
          </motion.p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-32">
        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-40"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block bg-white text-black px-12 py-5 rounded-none text-xl font-bold mb-12 tracking-wider"
          >
            Our Mission
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-12 tracking-tight leading-tight">
            Making Travel Accessible<br />to Everyone
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed tracking-wide">
            We believe that travel has the power to transform lives. Our mission is to make travel accessible, enjoyable, and meaningful for everyone, while promoting sustainable tourism practices.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-40">
          {[
            { icon: <FaPlane />, number: "50K+", label: "Happy Travelers" },
            { icon: <FaMapMarkedAlt />, number: "100+", label: "Destinations" },
            { icon: <FaUsers />, number: "25+", label: "Team Members" },
            { icon: <FaAward />, number: "15+", label: "Years Experience" }
          ].map((stat, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-none p-12 text-center hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-24 h-24 bg-white rounded-none flex items-center justify-center mx-auto mb-8">
                <span className="text-black text-4xl">{stat.icon}</span>
              </div>
              <p className="text-5xl font-black text-white mb-4 tracking-tight">{stat.number}</p>
              <p className="text-gray-400 font-medium text-lg tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mb-40" ref={containerRef}>
          <h2 className="text-5xl font-black text-white text-center mb-20 tracking-tight">Our Journey</h2>
          <div className="relative flex flex-col items-center">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/20" />
            <div className="space-y-32 w-full">
              {milestones.map((milestone, index) => (
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="md:w-1/2 w-full px-8">
                    <div className="bg-white/5 backdrop-blur-sm rounded-none p-12 hover:bg-white/10 transition-all duration-300">
                      <div className="text-white font-bold mb-4 text-2xl tracking-wide">{milestone.year}</div>
                      <h3 className="text-4xl font-black text-white mb-6 tracking-tight">{milestone.title}</h3>
                      <p className="text-gray-400 text-xl leading-relaxed tracking-wide">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-40">
          <h2 className="text-5xl font-black text-white text-center mb-20 tracking-tight">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm rounded-none overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative flex flex-col items-center p-8">
                  <div className="relative w-full aspect-square mb-8">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover border-4 border-white group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full text-center">
                    <h3 className="font-black text-white text-2xl tracking-tight mb-2">{member.name}</h3>
                    <p className="text-gray-400 text-base tracking-wide mb-6">{member.role}</p>
                    <div className="h-px w-16 bg-white/20 mx-auto mb-6" />
                    <p className="text-gray-300 text-lg italic leading-relaxed tracking-wide">"{member.quote}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-none p-20"
        >
          <h2 className="text-5xl font-black text-white text-center mb-20 tracking-tight">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-20">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="text-center group"
              >
                <div className="w-32 h-32 bg-white rounded-none flex items-center justify-center mx-auto mb-12">
                  <span className="text-black text-6xl">{value.icon}</span>
                </div>
                <h3 className="text-4xl font-black text-white mb-8 tracking-tight">{value.title}</h3>
                <p className="text-gray-400 text-xl leading-relaxed tracking-wide">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;

