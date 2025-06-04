'use client'
import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaUser, FaTag, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Background from '@/components/Background';

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

const posts: BlogPost[] = [
  {
    title: "10 Hidden Gems in Southeast Asia",
    excerpt: "Discover the lesser-known destinations that will take your breath away...",
    image: "https://i.pinimg.com/736x/98/6c/68/986c6822880fbe755de9da165104ab5e.jpg",
    date: "March 15, 2024",
    author: "Sarah Johnson",
    category: "Destinations",
    readTime: "5 min read"
  },
  {
    title: "Budget Travel Tips for 2024",
    excerpt: "Learn how to make the most of your travel budget without compromising on experiences...",
    image: "https://i.pinimg.com/736x/e4/24/10/e424107bec570f1c5089a265f669057f.jpg",
    date: "March 12, 2024",
    author: "Mike Chen",
    category: "Travel Tips",
    readTime: "4 min read"
  },
  {
    title: "Sustainable Travel Guide",
    excerpt: "How to travel responsibly and make a positive impact on local communities...",
    image: "https://i.pinimg.com/736x/e3/94/15/e39415a23a1dfbeef54647df385559c0.jpg",
    date: "March 10, 2024",
    author: "Emma Wilson",
    category: "Sustainability",
    readTime: "6 min read"
  }
];

const categories = [
  { name: "All Posts", icon: "📚" },
  { name: "Destinations", icon: "🌍" },
  { name: "Travel Tips", icon: "💡" },
  { name: "Sustainability", icon: "🌱" },
  { name: "Culture", icon: "🎭" },
  { name: "Adventure", icon: "🏔️" }
];

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Posts');

  const filteredPosts = posts.filter((post: BlogPost) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <Background />
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-[12vh] pb-20 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
              Travel Stories &<br />Insights
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto tracking-wide">
              Discover inspiring travel stories, expert tips, and insider guides for your next adventure
            </p>
          </motion.div>

          {/* Search and Categories */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 bg-white/5 backdrop-blur-sm text-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-6 py-4 bg-white/5 backdrop-blur-sm text-white rounded-none transition-all duration-300 whitespace-nowrap ${
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

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <div className="relative aspect-[21/9] bg-white/5 backdrop-blur-sm rounded-none overflow-hidden group">
                <img 
                  src={filteredPosts[0].image} 
                  alt={filteredPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <span className="text-emerald-400 text-sm font-medium mb-4 block">{filteredPosts[0].category}</span>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">{filteredPosts[0].title}</h2>
                  <p className="text-gray-300 text-lg mb-6 max-w-3xl">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      <span>{filteredPosts[0].date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUser />
                      <span>{filteredPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTag />
                      <span>{filteredPosts[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <AnimatePresence>
              {filteredPosts.slice(1).map((post: BlogPost, index: number) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-none overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3]">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="text-emerald-400 text-sm font-medium">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{post.title}</h3>
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUser />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <button className="bg-white text-black px-6 py-3 font-bold hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2">
                        Read More
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Newsletter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-sm rounded-none p-12 text-center mb-20"
          >
            <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive offers.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/5 text-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button className="bg-white text-black px-8 py-4 font-bold hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 