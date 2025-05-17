'use client'
import React, { useRef, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaUserFriends, FaHeart, FaSearch } from "react-icons/fa";
import { MdDateRange, MdOutlineVerifiedUser, MdTouchApp, MdOutlineSupportAgent } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { hotelsData } from '../../data/hotelsData';
import { useTheme } from '@/app/context/ThemeContext';
import Footer from '@/components/Footer/Footer';

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

// Example hotel data (replace with your real data if needed)
const hotels = hotelsData;

const Home = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const hotelScrollRef = useRef<HTMLDivElement>(null);
    const [isHotelHovered, setIsHotelHovered] = useState(false);
    const [hotelSearch, setHotelSearch] = useState("");
    const { theme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);

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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(hotelSearch.toLowerCase()) ||
        hotel.location.toLowerCase().includes(hotelSearch.toLowerCase())
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
            </div>

            {/* Main Content Above Video */}
            <div className="relative z-20">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center w-full min-h-screen px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-wider mb-6 drop-shadow-2xl">
                            Discover Your Next
                            <span className="text-emerald-500 block mt-2">Adventure</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                            Explore the world's most beautiful destinations and create unforgettable memories
                        </p>
                    </div>

                    {/* Search Card */}
                    <div className={`w-full max-w-5xl ${theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'} rounded-2xl shadow-2xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} p-8 backdrop-blur-sm`}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Location */}
                            <div className="relative">
                                <label className={`block font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <FaMapMarkerAlt className="inline-block mr-2 text-emerald-500" />
                                    Where to?
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter destination"
                                    className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200`}
                                />
                            </div>

                            {/* Start Date */}
                            <div className="relative">
                                <label className={`block font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <MdDateRange className="inline-block mr-2 text-emerald-500" />
                                    Check In
                                </label>
                                <input
                                    type="date"
                                    className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200`}
                                />
                            </div>

                            {/* End Date */}
                            <div className="relative">
                                <label className={`block font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <MdDateRange className="inline-block mr-2 text-emerald-500" />
                                    Check Out
                                </label>
                                <input
                                    type="date"
                                    className={`w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200`}
                                />
                            </div>

                            {/* Search Button */}
                            <div className="flex items-end">
                                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 flex items-center justify-center gap-2">
                                    <FaSearch className="text-lg" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popular Destinations Section */}
                <section className="relative z-20 py-20 bg-gradient-to-b from-black/80 to-black">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Popular Destinations
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Discover the world's most beautiful places
                            </p>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => scroll("left")}
                                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} shadow-lg rounded-full p-3 hover:bg-emerald-100 transition-all duration-200`}
                            >
                                <IoIosArrowBack className={`text-2xl ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-900'}`} />
                            </button>

                            <div
                                ref={scrollRef}
                                className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar py-4 px-12"
                            >
                                {destinations.map((dest) => (
                                    <div
                                        key={dest.country}
                                        className="flex-shrink-0 w-72 rounded-2xl overflow-hidden group cursor-pointer"
                                    >
                                        <div className="relative h-96 w-full">
                                            <img
                                                src={dest.image}
                                                alt={dest.country}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <h3 className="text-2xl font-bold text-white mb-2">{dest.country}</h3>
                                                <p className="text-emerald-400 font-medium">
                                                    {dest.travelers} Travelers
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => scroll("right")}
                                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} shadow-lg rounded-full p-3 hover:bg-emerald-100 transition-all duration-200`}
                            >
                                <IoIosArrowForward className={`text-2xl ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-900'}`} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative z-20 py-24 bg-gradient-to-b from-black to-gray-900">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-emerald-500 font-semibold tracking-wider uppercase text-sm mb-4 block">
                                Why Choose Us
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Experience Travel Like Never Before
                            </h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                We're committed to making your travel experience exceptional with our unique features and dedicated service
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative">
                                    <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <MdOutlineVerifiedUser className="text-4xl text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                                        Best Price Guarantee
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        We guarantee the best prices for your perfect stay, with price matching and exclusive deals that you won't find anywhere else.
                                    </p>
                                    <div className="mt-6 flex items-center text-emerald-500 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                        Learn more
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative">
                                    <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <MdTouchApp className="text-4xl text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                                        Seamless Booking
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Book your stay in just a few simple clicks with our intuitive platform. Fast, secure, and hassle-free booking experience.
                                    </p>
                                    <div className="mt-6 flex items-center text-emerald-500 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                        Learn more
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative">
                                    <div className="w-16 h-16 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <MdOutlineSupportAgent className="text-4xl text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                                        24/7 Support
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Our dedicated support team is always here to help you with any questions or concerns, ensuring a smooth travel experience.
                                    </p>
                                    <div className="mt-6 flex items-center text-emerald-500 font-medium group-hover:translate-x-2 transition-transform duration-300">
                                        Learn more
                                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-emerald-500 mb-2">2M+</div>
                                <p className="text-gray-400">Happy Travelers</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-emerald-500 mb-2">150+</div>
                                <p className="text-gray-400">Destinations</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-emerald-500 mb-2">50K+</div>
                                <p className="text-gray-400">Hotels</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-emerald-500 mb-2">24/7</div>
                                <p className="text-gray-400">Support</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="relative z-20 py-24 bg-[#1a357e]">
                    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Left Side */}
                        <div className="flex-1 text-white max-w-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">What our customers are saying us?</h2>
                            <p className="text-lg text-blue-100 mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nesciunt fugiat praesentium dolores facilis delectus modi culpa aliquid deserunt ad!</p>
                            <div className="mt-8">
                                <div className="text-4xl font-extrabold mb-1">4.88</div>
                                <div className="text-blue-100 mb-2">Overall Rating</div>
                                <div className="flex text-2xl text-yellow-400">
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
                                    },
                                    {
                                        name: "Michael Brown",
                                        role: "Entrepreneur",
                                        image: "https://randomuser.me/api/portraits/men/85.jpg",
                                        review: "The user interface is beautiful and easy to use. I found the perfect hotel in minutes!",
                                        rating: 5
                                    },
                                    {
                                        name: "Sophia Lee",
                                        role: "Photographer",
                                        image: "https://randomuser.me/api/portraits/women/68.jpg",
                                        review: "Customer support was top-notch and the deals were unbeatable. Will use again!",
                                        rating: 5
                                    }
                                ].map((testimonial, idx) => (
                                    <div key={idx} className="relative bg-white rounded-3xl shadow-2xl p-10 z-10 max-w-xs w-full min-w-[300px] flex-shrink-0">
                                        <p className="text-lg text-gray-900 font-medium mb-6">
                                            {testimonial.review}
                                        </p>
                                        <div className="flex mb-6">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <span key={i} className="text-2xl text-yellow-400">★</span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4 mt-4">
                                            <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-200" />
                                            <div>
                                                <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                                                <div className="text-gray-400 text-sm">{testimonial.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Subscription Section */}
                <section className="bg-black py-20 flex flex-col items-center justify-center">
                    <div className="max-w-xl w-full text-center">
                        <div className="flex justify-center mb-6">
                            <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" /></svg>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Travel Journey Starts Here</h2>
                        <p className="text-gray-300 mb-8">Sign up and we'll send the best deals to you</p>
                        <form className="flex flex-col gap-4 items-center w-full">
                            <input type="email" placeholder="Email" className="w-full rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900" />
                            <button type="submit" className="w-full bg-[#223a8c] hover:bg-[#1a357e] text-white font-semibold py-3 rounded-md text-lg transition-colors">Subscribe</button>
                        </form>
                    </div>
                </section>

                {/* Modern Footer Section */}
                <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
                        {/* Company */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>About Us</li>
                                <li>Careers</li>
                                <li>Blogs</li>
                                <li>Gift Cards</li>
                                <li>Magazine</li>
                            </ul>
                        </div>
                        {/* Support */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>Contact</li>
                                <li>Legal Notice</li>
                                <li>Privacy Policy</li>
                                <li>Terms & Conditions</li>
                                <li>Sitemap</li>
                            </ul>
                        </div>
                        {/* Other Services */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Other Services</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>Car hire</li>
                                <li>Activity Finder</li>
                                <li>Tour List</li>
                                <li>Flight Finder</li>
                                <li>Travel Agents</li>
                            </ul>
                        </div>
                        {/* Contact Us */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                            <div className="mb-2 text-gray-600">Our Mobile Number</div>
                            <div className="font-bold text-[#223a8c] mb-4">+012 345 6788</div>
                            <div className="mb-2 text-gray-600">Our Email</div>
                            <div className="font-bold text-[#223a8c]">example@gmail.com</div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4">
                        <div className="text-gray-500 text-sm mb-4 md:mb-0">Copyright © 2024 Webdev. All rights reserved</div>
                        <div className="flex items-center gap-4 text-gray-400 text-lg">
                            <span>Social :</span>
                            <a href="#" className="hover:text-[#223a8c]"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.63 0-1.25-.04-1.86-.11A12.13 12.13 0 0 0 7.29 21.5c8.29 0 12.83-6.87 12.83-12.83 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.7z"/></svg></a>
                            <a href="#" className="hover:text-[#223a8c]"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.67a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm15.11 12.78h-3.56v-5.6c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.91 1.65-1.86 3.4-1.86 3.64 0 4.31 2.4 4.31 5.51v6.24z"/></svg></a>
                            <a href="#" className="hover:text-[#223a8c]"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.05.14 3 .4 2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.64-2.8 5.67-5.47 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.36 20.07 24 16.41 24 12c0-5.5-4.46-9.96-9.96-9.96z"/></svg></a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Home;
