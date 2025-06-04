'use client'
import React, { useRef, useEffect, useState, lazy, Suspense } from "react";
import { FaMapMarkerAlt, FaUserFriends, FaHeart, FaSearch, FaUser, FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { MdDateRange, MdOutlineVerifiedUser, MdTouchApp, MdOutlineSupportAgent } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack as IoIosArrowBackIcon, IoIosArrowForward as IoIosArrowForwardIcon, IoMdClose } from "react-icons/io";
import { hotelsData } from '../../data/hotelsData';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

// Lazy load heavy components
const Footer = dynamic(() => import('@/components/Footer/Footer'), {
    loading: () => <div className="h-20 bg-gray-100 dark:bg-gray-800 animate-pulse" />
});

// Memoize static data
const destinations = [
    { country: "Japan", travelers: "200,000", image: "/images/d1.jpg" },
    { country: "Australia", travelers: "120,000", image: "/images/d2.jpg" },
    { country: "Canada", travelers: "175,000", image: "/images/d6.jpg" },
    { country: "Germany", travelers: "160,000", image: "/images/d7.jpg" },
    { country: "Brazil", travelers: "140,000", image: "/images/d8.jpg" },
    { country: "Italy", travelers: "180,000", image: "/images/d1.jpg" },
    { country: "Spain", travelers: "190,000", image: "/images/d2.jpg" },
    { country: "France", travelers: "210,000", image: "/images/d3.jpg" },
    { country: "India", travelers: "220,000", image: "/images/d4.jpg" },
    { country: "USA", travelers: "250,000", image: "/images/d5.jpg" },
];

// Memoize hotels data
const hotels = hotelsData;

// Performance optimized image component
const OptimizedImage = React.memo(({ src, alt, width, height, className }: any) => (
    <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
));

const Home = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const hotelScrollRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const searchCardRef = useRef<HTMLDivElement>(null);
    const destinationsRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const testimonialsRef = useRef<HTMLDivElement>(null);
    const newsletterRef = useRef<HTMLDivElement>(null);
    const [isHotelHovered, setIsHotelHovered] = useState(false);
    const [hotelSearch, setHotelSearch] = useState("");
    const [showHotels, setShowHotels] = useState(false);
    const { theme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [notification, setNotification] = useState<{ message: string; type: 'add' | 'remove' } | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showHotelsModal, setShowHotelsModal] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState<number | null>(null);
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error('Error loading favorites:', error);
                setFavorites([]);
            }
        }
    }, []);

    // Save favorites to localStorage when they change
    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favorites]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    const hotelScroll = (direction: "left" | "right") => {
        if (hotelScrollRef.current) {
            const { scrollLeft, clientWidth } = hotelScrollRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;
            hotelScrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    // Auto-scroll hotels
    useEffect(() => {
        if (isHotelHovered) return; // Pause auto-scroll on hover
        const interval = setInterval(() => {
            hotelScroll("right");
        }, 2000); // Change every 2 seconds
        return () => clearInterval(interval);
    }, [isHotelHovered]);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Remove GSAP useEffect and replace with Framer Motion variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const staggerItem = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(hotelSearch.toLowerCase()) ||
        hotel.location.toLowerCase().includes(hotelSearch.toLowerCase())
    );

    const handleSearch = () => {
        if (!isLoggedIn) {
            setShowLoginPrompt(true);
            return;
        }

        if (hotelSearch.trim()) {
            setShowHotels(true);
            setIsModalOpen(true);
        }
    };

    const handleLogin = () => {
        try {
            setIsLoggedIn(true);
            setShowLoginPrompt(false);
            setShowHotelsModal(true);
        } catch (error) {
            console.error('Error during login:', error);
            // Show error notification
            setNotification({
                message: 'Error during login. Please try again.',
                type: 'remove'
            });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeLoginPrompt = () => {
        setShowLoginPrompt(false);
    };

    const toggleFavorite = (index: number) => {
        try {
            setFavorites(prev => {
                const isFavorite = prev.includes(index);
                const newFavorites = isFavorite
                    ? prev.filter(i => i !== index)
                    : [...prev, index];
                return newFavorites;
            });
            
            setNotification({
                message: favorites.includes(index) 
                    ? 'Removed from wishlist' 
                    : 'Added to wishlist',
                type: favorites.includes(index) ? 'remove' : 'add'
            });
        } catch (error) {
            console.error('Error toggling favorite:', error);
            setNotification({
                message: 'Error updating wishlist. Please try again.',
                type: 'remove'
            });
        }
    };

    const handleBookNow = (hotelIndex: number) => {
        try {
            if (!isLoggedIn) {
                setShowLoginPrompt(true);
                return;
            }
            setSelectedHotel(hotelIndex);
            setShowHotelsModal(true);
        } catch (error) {
            console.error('Error booking hotel:', error);
            setNotification({
                message: 'Error booking hotel. Please try again.',
                type: 'remove'
            });
        }
    };

    const handleNavBookNow = () => {
        if (!isLoggedIn) {
            setShowLoginPrompt(true);
            return;
        }
        setShowHotelsModal(true);
    };

    // Clear notification after 2 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // Login Prompt Modal with modern design
    const renderAuthModal = () => (
        <AnimatePresence>
            {showLoginPrompt && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowLoginPrompt(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className={`relative w-full max-w-md ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden`}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header with Gradient */}
                        <div className="relative h-32 bg-gradient-to-r from-emerald-500 to-blue-500">
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <h3 className="text-3xl font-black text-white mb-2">
                                        {isLoginView ? 'Welcome Back!' : 'Join Us'}
                                    </h3>
                                    <p className="text-white/80">
                                        {isLoginView ? 'Sign in to continue your journey' : 'Create your account to get started'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <FaGoogle className="text-red-500" />
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <FaGithub className="text-gray-900 dark:text-white" />
                                </button>
                                <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <FaFacebook className="text-blue-600" />
                                </button>
                            </div>

                            <div className="relative mb-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className={`px-2 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            {/* Form */}
                            <form className="space-y-6">
                                {!isLoginView && (
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className={`text-gray-400 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Full Name"
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                                                theme === 'dark' 
                                                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                                                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                            } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                        />
                                    </div>
                                )}

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <HiOutlineMail className={`text-gray-400 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email Address"
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                                            theme === 'dark' 
                                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                                                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <RiLockPasswordLine className={`text-gray-400 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                                            theme === 'dark' 
                                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                                                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                                        } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all`}
                                    />
                                </div>

                                {isLoginView && (
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                                            />
                                            <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Remember me
                                            </span>
                                        </label>
                                        <button
                                            type="button"
                                            className={`text-sm font-medium ${theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'}`}
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogin();
                                    }}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-lg"
                                >
                                    {isLoginView ? 'Sign In' : 'Create Account'}
                                </button>
                            </form>

                            {/* Toggle View */}
                            <div className="mt-6 text-center">
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {isLoginView ? "Don't have an account?" : "Already have an account?"}
                                    <button
                                        onClick={() => setIsLoginView(!isLoginView)}
                                        className={`ml-1 font-medium ${theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-500'}`}
                                    >
                                        {isLoginView ? 'Sign up' : 'Sign in'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="relative w-full min-h-screen">
            {/* Video Background with Gradient Overlay */}
            <div className="fixed inset-0 w-full h-full z-0">
                <div className="absolute inset-0 w-full h-full">
                    <iframe
                        className="absolute inset-0 w-full h-full object-cover"
                        src="https://www.youtube.com/embed/KLuTLF3x9sA?autoplay=1&mute=1&loop=1&playlist=KLuTLF3x9sA&controls=0&showinfo=0&rel=0&modestbranding=1"
                        title="Background Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
            </div>

            {/* Main Content Above Video */}
            <div className="relative z-20">
                {/* Hero Section */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="flex flex-col items-center justify-center w-full min-h-screen px-4"
                >
                    <div className="text-center max-w-5xl mx-auto">
                        <motion.h1 
                            variants={staggerItem}
                            className="text-white text-6xl md:text-8xl font-black tracking-tighter mb-8 drop-shadow-2xl"
                        >
                            Explore The
                            <span className="text-emerald-500 block mt-2">World</span>
                        </motion.h1>
                        <motion.p 
                            variants={staggerItem}
                            className="text-gray-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light tracking-wide"
                        >
                            Discover breathtaking destinations and create unforgettable memories with our curated travel experiences
                        </motion.p>
                    </div>

                    {/* Search Card */}
                    <motion.div 
                        variants={scaleIn}
                        className={`w-full max-w-6xl ${theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'} rounded-3xl shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} p-10 backdrop-blur-sm`}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Location */}
                            <div className="relative">
                                <label className={`block font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
                                    <FaMapMarkerAlt className="inline-block mr-2 text-emerald-500" />
                                    Where to?
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter destination"
                                    value={hotelSearch}
                                    onChange={(e) => setHotelSearch(e.target.value)}
                                    className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'} rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200`}
                                />
                            </div>

                            {/* Start Date */}
                            <div className="relative">
                                <label className={`block font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
                                    <MdDateRange className="inline-block mr-2 text-emerald-500" />
                                    Check In
                                </label>
                                <input
                                    type="date"
                                    className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'} rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200`}
                                />
                            </div>

                            {/* End Date */}
                            <div className="relative">
                                <label className={`block font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
                                    <MdDateRange className="inline-block mr-2 text-emerald-500" />
                                    Check Out
                                </label>
                                <input
                                    type="date"
                                    className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'} rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200`}
                                />
                            </div>

                            {/* Search Button */}
                            <div className="flex items-end">
                                <button 
                                    onClick={handleSearch}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 flex items-center justify-center gap-3 text-lg"
                                >
                                    <FaSearch className="text-xl" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Popular Destinations Section */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="relative z-20 py-32 bg-gradient-to-b from-black/80 to-black"
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm mb-4 block">
                                Popular Destinations
                            </span>
                            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                                Explore Our Top Picks
                            </h2>
                            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                                Discover the world's most beautiful places and start planning your next adventure
                            </p>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => scroll("left")}
                                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} shadow-lg rounded-full p-4 hover:bg-emerald-100 transition-all duration-200`}
                            >
                                <IoIosArrowBackIcon className={`text-2xl ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-900'}`} />
                            </button>

                            <div
                                ref={scrollRef}
                                className="flex gap-8 overflow-x-auto scroll-smooth hide-scrollbar py-4 px-12"
                            >
                                {destinations.map((dest) => (
                                    <div
                                        key={dest.country}
                                        className="flex-shrink-0 w-80 rounded-3xl overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300"
                                    >
                                        <div className="relative h-[500px] w-full">
                                            <OptimizedImage
                                                src={dest.image}
                                                alt={dest.country}
                                                width={320}
                                                height={500}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                                <h3 className="text-3xl font-black text-white mb-3">{dest.country}</h3>
                                                <p className="text-emerald-400 font-medium text-lg">
                                                    {dest.travelers} Travelers
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => scroll("right")}
                                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} shadow-lg rounded-full p-4 hover:bg-emerald-100 transition-all duration-200`}
                            >
                                <IoIosArrowForwardIcon className={`text-2xl ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-900'}`} />
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* Features Section */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="relative z-20 py-32 bg-gradient-to-b from-black to-gray-900"
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-20">
                            <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm mb-4 block">
                                Why Choose Us
                            </span>
                            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
                                Experience Travel Like Never Before
                            </h2>
                            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                                We're committed to making your travel experience exceptional with our unique features and dedicated service
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Feature 1 */}
                            <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 hover:bg-white/10 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative">
                                    <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                        <MdOutlineVerifiedUser className="text-5xl text-emerald-500" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-6 group-hover:text-emerald-400 transition-colors duration-300">
                                        Best Price Guarantee
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        We guarantee the best prices for your perfect stay, with price matching and exclusive deals that you won't find anywhere else.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 hover:bg-white/10 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative">
                                    <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                        <MdTouchApp className="text-5xl text-emerald-500" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-6 group-hover:text-emerald-400 transition-colors duration-300">
                                        Easy Booking
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        Book your perfect stay in just a few clicks with our intuitive and user-friendly booking system.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 hover:bg-white/10 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative">
                                    <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                        <MdOutlineSupportAgent className="text-5xl text-emerald-500" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-6 group-hover:text-emerald-400 transition-colors duration-300">
                                        24/7 Support
                                    </h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        Our dedicated support team is available around the clock to assist you with any questions or concerns.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Testimonials Section */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="relative z-20 py-32 bg-[#1a357e]"
                >
                    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-16">
                        {/* Left Side */}
                        <div className="flex-1 text-white max-w-xl">
                            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
                                Testimonials
                            </span>
                            <h2 className="text-5xl font-black mb-8 tracking-tight">What our customers are saying</h2>
                            <p className="text-xl text-blue-100 mb-12 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nesciunt fugiat praesentium dolores facilis delectus modi culpa aliquid deserunt ad!</p>
                            <div className="mt-8">
                                <div className="text-6xl font-black mb-2">4.88</div>
                                <div className="text-blue-100 text-xl mb-4">Overall Rating</div>
                                <div className="flex text-3xl text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Right Side - Testimonial Cards */}
                        <div className="flex-1 w-full">
                            <div className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar">
                                {[
                                    {
                                        name: "Jane Smith",
                                        role: "Web Developer",
                                        image: "https://randomuser.me/api/portraits/women/44.jpg",
                                        review: "I am thoroughly impressed with the attention to detail and quality. They truly understand customer needs and deliver outstanding results. Wonderful experience!",
                                        rating: 5
                                    },
                                    {
                                        name: "John Doe",
                                        role: "Travel Blogger",
                                        image: "https://randomuser.me/api/portraits/men/32.jpg",
                                        review: "Booking was seamless and the support team was always available. Highly recommend this platform for all your travel needs!",
                                        rating: 5
                                    },
                                    {
                                        name: "Emily Johnson",
                                        role: "Designer",
                                        image: "https://randomuser.me/api/portraits/women/65.jpg",
                                        review: "A fantastic experience from start to finish. The best prices and the best service!",
                                        rating: 5
                                    }
                                ].map((testimonial, idx) => (
                                    <div key={idx} className="relative bg-white rounded-3xl shadow-2xl p-10 z-10 max-w-sm w-full min-w-[320px] flex-shrink-0">
                                        <p className="text-xl text-gray-900 font-medium mb-8 leading-relaxed">
                                            {testimonial.review}
                                        </p>
                                        <div className="flex mb-8">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <span key={i} className="text-2xl text-yellow-400">★</span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Image src={testimonial.image} alt={testimonial.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover border-2 border-blue-200" />
                                            <div>
                                                <div className="font-black text-gray-900 text-xl">{testimonial.name}</div>
                                                <div className="text-gray-500 text-lg">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Newsletter Section */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="bg-black py-32 flex flex-col items-center justify-center"
                >
                    <div className="max-w-2xl w-full text-center">
                        <div className="flex justify-center mb-8">
                            <svg width="72" height="72" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-emerald-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" /></svg>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Your Travel Journey Starts Here</h2>
                        <p className="text-gray-300 text-xl mb-12">Sign up and we'll send the best deals to you</p>
                        <form className="flex flex-col gap-6 items-center w-full">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-900" 
                            />
                            <button 
                                type="submit" 
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl text-lg transition-colors"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </motion.section>

                {/* Footer */}
                <footer className="bg-white pt-20 pb-8 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        {/* Company */}
                        <div>
                            <h3 className="font-black text-xl mb-6">Company</h3>
                            <ul className="space-y-4 text-gray-600 text-lg">
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">About Us</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Careers</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Blogs</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Gift Cards</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Magazine</li>
                            </ul>
                        </div>
                        {/* Support */}
                        <div>
                            <h3 className="font-black text-xl mb-6">Support</h3>
                            <ul className="space-y-4 text-gray-600 text-lg">
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Contact</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Legal Notice</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Privacy Policy</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Terms & Conditions</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Sitemap</li>
                            </ul>
                        </div>
                        {/* Other Services */}
                        <div>
                            <h3 className="font-black text-xl mb-6">Other Services</h3>
                            <ul className="space-y-4 text-gray-600 text-lg">
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Car hire</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Activity Finder</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Tour List</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Flight Finder</li>
                                <li className="hover:text-emerald-600 transition-colors cursor-pointer">Travel Agents</li>
                            </ul>
                        </div>
                        {/* Contact Us */}
                        <div>
                            <h3 className="font-black text-xl mb-6">Contact Us</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-gray-600 text-lg mb-2">Our Mobile Number</div>
                                    <div className="font-black text-emerald-600 text-xl">+012 345 6788</div>
                                </div>
                                <div>
                                    <div className="text-gray-600 text-lg mb-2">Our Email</div>
                                    <div className="font-black text-emerald-600 text-xl">example@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4">
                        <div className="text-gray-500 text-lg mb-4 md:mb-0">Copyright © 2024 Webdev. All rights reserved</div>
                        <div className="flex items-center gap-6 text-gray-400 text-xl">
                            <span className="text-gray-600">Social :</span>
                            <a href="#" className="hover:text-emerald-600 transition-colors"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.63 0-1.25-.04-1.86-.11A12.13 12.13 0 0 0 7.29 21.5c8.29 0 12.83-6.87 12.83-12.83 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.7z"/></svg></a>
                            <a href="#" className="hover:text-emerald-600 transition-colors"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.67a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm15.11 12.78h-3.56v-5.6c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.86 3.4-1.86 3.64 0 4.31 2.4 4.31 5.51v6.24z"/></svg></a>
                            <a href="#" className="hover:text-emerald-600 transition-colors"><svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.05.14 3 .4 2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.64-2.8 5.67-5.47 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.36 20.07 24 16.41 24 12c0-5.5-4.46-9.96-9.96-9.96z"/></svg></a>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        className="fixed bottom-8 right-8 z-50"
                    >
                        <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg ${
                            notification.type === 'add' 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-red-500 text-white'
                        }`}>
                            <FaHeart className="text-xl text-white" />
                            <span className="font-medium">{notification.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Login Prompt Modal */}
            {renderAuthModal()}

            {/* Hotels Modal */}
            <AnimatePresence>
                {showHotelsModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowHotelsModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-3xl shadow-2xl`}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 z-10 flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700 bg-inherit">
                                <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    Available Hotels
                                </h3>
                                <button
                                    onClick={() => setShowHotelsModal(false)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <IoMdClose className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {hotels.map((hotel, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group`}
                                        >
                                            <div className="relative h-64">
                                                <Image
                                                    src={hotel.image}
                                                    alt={hotel.name}
                                                    width={400}
                                                    height={300}
                                                    className="object-cover w-full h-full"
                                                />
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => toggleFavorite(index)}
                                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                                                >
                                                    <FaHeart 
                                                        className={`text-xl transition-colors duration-300 ${
                                                            favorites.includes(index) 
                                                                ? 'text-red-500 fill-current' 
                                                                : 'text-white'
                                                        }`}
                                                    />
                                                </motion.button>
                                            </div>
                                            <div className="p-6">
                                                <h4 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-3`}>
                                                    {hotel.name}
                                                </h4>
                                                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-lg mb-4`}>
                                                    {hotel.location}
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-emerald-500 font-black text-xl">
                                                        ${hotel.price}/night
                                                    </span>
                                                    <button 
                                                        onClick={() => handleBookNow(index)}
                                                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors text-lg font-semibold"
                                                    >
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Add display name for better debugging
Home.displayName = 'Home';

export default React.memo(Home);
