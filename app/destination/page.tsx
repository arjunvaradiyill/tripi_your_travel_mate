'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaSearch, FaPlay, FaPause } from 'react-icons/fa';
import Background from '@/components/Background';

const destinations = [
  {
    name: "Bali, Indonesia",
    image: "/images/d1.jpg",
    description: "Tropical paradise with beautiful beaches and rich culture",
    rating: 4.8,
    reviews: 2500
  },
  {
    name: "Paris, France",
    image: "/images/d2.jpg",
    description: "City of love, art, and culinary delights",
    rating: 4.9,
    reviews: 3200
  },
  {
    name: "Tokyo, Japan",
    image: "/images/d6.jpg",
    description: "Where tradition meets futuristic innovation",
    rating: 4.7,
    reviews: 2800
  },
  {
    name: "New York, USA",
    image: "/images/d7.jpg",
    description: "The city that never sleeps",
    rating: 4.8,
    reviews: 3500
  },
  {
    name: "Sydney, Australia",
    image: "/images/d8.jpg",
    description: "Stunning harbor city with iconic landmarks",
    rating: 4.7,
    reviews: 2100
  },
  {
    name: "Rome, Italy",
    image: "/images/d9.jpg",
    description: "Ancient history and delicious cuisine",
    rating: 4.9,
    reviews: 2900
  }
];

const videos = [
  {
    id: 1,
    title: "Travel Experience 1",
    url: "https://www.youtube.com/embed/pPWj_BGQ2aM",
    thumbnail: "https://i.ytimg.com/vi/pPWj_BGQ2aM/maxresdefault.jpg"
  },
  {
    id: 2,
    title: "Travel Experience 2",
    url: "https://www.youtube.com/embed/4enaxe5NEP8",
    thumbnail: "https://i.ytimg.com/vi/4enaxe5NEP8/maxresdefault.jpg"
  },
  {
    id: 3,
    title: "Travel Experience 3",
    url: "https://www.youtube.com/embed/-eEAeYlFpKI",
    thumbnail: "https://i.ytimg.com/vi/-eEAeYlFpKI/maxresdefault.jpg"
  }
];

const DestinationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVideoClick = (index: number) => {
    setActiveVideo(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 min-h-screen pt-[12vh]">
        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-widest">
              Explore Destinations
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover amazing places around the world and plan your next adventure
            </p>
          </div>

          {/* Video Carousel Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Travel Videos</h2>
            <div className="relative">
              <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                <iframe
                  ref={videoRef}
                  src={`${videos[activeVideo].url}?autoplay=${isPlaying ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={videos[activeVideo].title}
                ></iframe>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeVideo === index ? 'bg-emerald-500 scale-125' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoClick(index)}
                  className="relative w-48 h-32 rounded-lg overflow-hidden cursor-pointer group"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaPlay className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white text-sm font-medium truncate">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-16">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-sm text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-64">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="font-bold">{destination.rating}</span>
                      <span className="text-sm">({destination.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 mb-4">{destination.description}</p>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors duration-150">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Categories */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Beach Getaways",
                "City Breaks",
                "Mountain Retreats",
                "Cultural Tours"
              ].map((category, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center cursor-pointer hover:bg-white/20 transition-colors duration-150"
                >
                  <h3 className="text-white font-semibold">{category}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-20 bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for travel tips, destination guides, and exclusive offers.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg transition-colors duration-150">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;
  