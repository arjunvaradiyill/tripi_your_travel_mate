'use client'
import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';
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
    image: "/images/blog1.jpg",
    date: "March 15, 2024",
    author: "Sarah Johnson",
    category: "Destinations",
    readTime: "5 min read"
  },
  {
    title: "Budget Travel Tips for 2024",
    excerpt: "Learn how to make the most of your travel budget without compromising on experiences...",
    image: "/images/blog2.jpg",
    date: "March 12, 2024",
    author: "Mike Chen",
    category: "Travel Tips",
    readTime: "4 min read"
  },
  {
    title: "Sustainable Travel Guide",
    excerpt: "How to travel responsibly and make a positive impact on local communities...",
    image: "/images/blog3.jpg",
    date: "March 10, 2024",
    author: "Emma Wilson",
    category: "Sustainability",
    readTime: "6 min read"
  }
];

const categories: string[] = [
  "All Posts",
  "Destinations",
  "Travel Tips",
  "Sustainability",
  "Culture",
  "Adventure"
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
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 min-h-screen pt-[12vh]">
        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-widest">
              Travel Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover travel stories, tips, and inspiration for your next adventure
            </p>
          </div>

          {/* Search and Categories */}
          <div className="mb-16">
            <div className="relative max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-sm text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: BlogPost, index: number) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-emerald-400 text-sm font-medium">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                  <p className="text-gray-300 mb-4">{post.excerpt}</p>
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
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <FaTag />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-20 bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive offers.
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

export default BlogPage; 