'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaSearch, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStar, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Background from '@/components/Background';
import Footer from '@/components/Footer/Footer';

// Add YouTube API type declarations
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: any) => any;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

const destinations = [
  {
    name: "Bali, Indonesia",
    image: "/images/d1.jpg",
    description: "Tropical paradise with beautiful beaches and rich culture",
    rating: 4.8,
    reviews: 2500,
    category: "Beach Getaways",
    price: "From $899"
  },
  {
    name: "Paris, France",
    image: "/images/d2.jpg",
    description: "City of love, art, and culinary delights",
    rating: 4.9,
    reviews: 3200,
    category: "City Breaks",
    price: "From $1,299"
  },
  {
    name: "Tokyo, Japan",
    image: "/images/d6.jpg",
    description: "Where tradition meets futuristic innovation",
    rating: 4.7,
    reviews: 2800,
    category: "Cultural Tours",
    price: "From $1,499"
  },
  {
    name: "New York, USA",
    image: "/images/d7.jpg",
    description: "The city that never sleeps",
    rating: 4.8,
    reviews: 3500,
    category: "City Breaks",
    price: "From $1,199"
  },
  {
    name: "Sydney, Australia",
    image: "/images/d8.jpg",
    description: "Stunning harbor city with iconic landmarks",
    rating: 4.7,
    reviews: 2100,
    category: "Beach Getaways",
    price: "From $1,599"
  },
  {
    name: "Rome, Italy",
    image: "/images/d9.jpg",
    description: "Ancient history and delicious cuisine",
    rating: 4.9,
    reviews: 2900,
    category: "Cultural Tours",
    price: "From $999"
  }
];

const categories = [
  { name: "Beach Getaways", icon: "🏖️" },
  { name: "City Breaks", icon: "🌆" },
  { name: "Mountain Retreats", icon: "⛰️" },
  { name: "Cultural Tours", icon: "🏛️" }
];

const videos = [
  {
    id: 1,
    title: "Costa Rica Adventure",
    url: "https://www.youtube.com/embed/R83BlU5nnbs?autoplay=1&mute=1&loop=1&playlist=R83BlU5nnbs&controls=0&showinfo=0&rel=0&modestbranding=1",
    thumbnail: "https://i.ytimg.com/vi/R83BlU5nnbs/maxresdefault.jpg",
    description: "Experience the lush rainforests and pristine beaches of Costa Rica"
  },
  {
    id: 2,
    title: "Travel Experience 2",
    url: "https://www.youtube.com/embed/m8qf5bSmlQQ?autoplay=1&mute=1&loop=1&playlist=m8qf5bSmlQQ&controls=0&showinfo=0&rel=0&modestbranding=1",
    thumbnail: "https://i.ytimg.com/vi/m8qf5bSmlQQ/maxresdefault.jpg",
    description: "Discover hidden gems and local experiences around the world"
  },
  {
    id: 3,
    title: "Travel Experience 3",
    url: "https://www.youtube.com/embed/VE75g0frvr4?autoplay=1&mute=1&loop=1&playlist=VE75g0frvr4&controls=0&showinfo=0&rel=0&modestbranding=1",
    thumbnail: "https://i.ytimg.com/vi/VE75g0frvr4/maxresdefault.jpg",
    description: "Journey through breathtaking landscapes and cultural wonders"
  }
];

const DestinationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [player, setPlayer] = useState<any>(null);

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (destinationName: string) => {
    setFavorites(prev => 
      prev.includes(destinationName) 
        ? prev.filter(name => name !== destinationName)
        : [...prev, destinationName]
    );
  };

  const handleVideoClick = (index: number) => {
    setActiveVideo(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player('yt-player', {
        events: {
          onReady: (event: any) => setPlayer(event.target),
        },
      });
    };
    // If API is already loaded
    if (window.YT && window.YT.Player) {
      const ytPlayer = new window.YT.Player('yt-player', {
        events: {
          onReady: (event: any) => setPlayer(event.target),
        },
      });
    }
  }, [activeVideo]);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <Background />
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {/* Featured Videos Section - Now at the top */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="pt-[12vh] pb-20"
          >
            <div className="relative">
              <div className="aspect-video bg-white/5 backdrop-blur-sm rounded-none overflow-hidden">
                <iframe
                  id="yt-player"
                  src={videos[activeVideo].url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Travel Experience"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoClick(index)}
                    className={`w-3 h-3 transition-all duration-300 ${
                      activeVideo === index ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Video Thumbnails Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleVideoClick(index)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video mb-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <FaPlay className="text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-400">{video.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => player && player.isMuted() ? player.unMute() : player.mute()}
                className="bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 hover:bg-white/20 transition-colors duration-300 flex items-center gap-3"
              >
                {player && player.isMuted() ? <FaVolumeUp className="text-xl" /> : <FaVolumeMute className="text-xl" />}
                {player && player.isMuted() ? 'Unmute' : 'Mute'}
              </button>
            </div>
          </motion.div>

          {/* Hero Section - Now below videos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
              Discover Your Next<br />Adventure
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto tracking-wide">
              Explore our curated collection of extraordinary destinations and create unforgettable memories
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 bg-white/5 backdrop-blur-sm text-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                    className={`px-6 py-4 bg-white/5 backdrop-blur-sm text-white rounded-none transition-all duration-300 ${
                      selectedCategory === category.name ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-none overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3]">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <button
                      onClick={() => toggleFavorite(destination.name)}
                      className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300"
                    >
                      <FaHeart className={`text-xl ${
                        favorites.includes(destination.name) ? 'text-red-500' : 'text-white'
                      }`} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        <FaStar />
                        <span className="font-bold">{destination.rating}</span>
                        <span className="text-sm text-gray-300">({destination.reviews} reviews)</span>
                      </div>
                      <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{destination.name}</h3>
                      <p className="text-gray-300 text-lg">{destination.price}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">{destination.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-medium">{destination.category}</span>
                      <button className="bg-white text-black px-8 py-3 font-bold hover:bg-gray-100 transition-colors duration-300">
                        Explore
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results Message */}
          {filteredDestinations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">No destinations found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;
  