'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaUser, FaTrash, FaCalendarAlt, FaStar, FaEnvelope, FaPhone, FaEdit, FaCamera, FaTimes } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import { hotelsData } from '@/data/hotelsData';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { useAuth } from '@/context/AuthContext';
import gsap from 'gsap';

interface ProfileProps {
    favorites: number[];
}

const Profile: React.FC<ProfileProps> = ({ favorites: initialFavorites }) => {
    const { theme } = useTheme();
    const router = useRouter();
    const [favorites, setFavorites] = useState<number[]>(initialFavorites);
    const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
    const [activeTab, setActiveTab] = useState<'wishlist' | 'bookings'>('wishlist');
    const favoriteHotels = favorites.map(index => ({ ...hotelsData[index], originalIndex: index }));
    const [isEditOpen, setIsEditOpen] = useState(false);
    const defaultProfile = {
        name: '',
        email: '',
        phone: '',
        location: '',
        avatar: '',
    };
    const [profile, setProfile] = useState(defaultProfile);
    const [editForm, setEditForm] = useState(defaultProfile);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [editError, setEditError] = useState('');
    const { user } = useAuth();
    const [loadingProfile, setLoadingProfile] = useState(true);
    const heroRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        fetch('/api/me')
            .then(res => res.json())
            .then(data => setProfile({ ...defaultProfile, ...data }))
            .catch(() => setProfile(defaultProfile))
            .finally(() => setLoadingProfile(false));
    }, []);

    useEffect(() => {
        // Animate hero section
        gsap.from(heroRef.current, {
            opacity: 0,
            y: -50,
            duration: 1,
            ease: 'power3.out'
        });

        // Animate cards with stagger
        gsap.from(cardsRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }, []);

    const removeFromWishlist = (index: number) => {
        const newFavorites = favorites.filter(i => i !== index);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const handleBooking = async (hotel: any) => {
        try {
            setLoading(prev => ({ ...prev, [hotel.originalIndex]: true }));
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert(`Booking confirmed for ${hotel.name}! We'll contact you shortly with more details.`);
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to process booking. Please try again.');
        } finally {
            setLoading(prev => ({ ...prev, [hotel.originalIndex]: false }));
        }
    };

    const openEdit = () => {
        setEditForm(profile);
        setAvatarPreview(profile.avatar || '');
        setEditError('');
        setIsEditOpen(true);
    };
    const closeEdit = () => setIsEditOpen(false);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setAvatarPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };
    const handleEditSave = () => {
        if (!editForm.name.trim() || !editForm.email.trim()) {
            setEditError('Name and email are required.');
            return;
        }
        setProfile({ ...editForm, avatar: avatarPreview || '' });
        setIsEditOpen(false);
    };

    if (loadingProfile) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Edit Profile Modal */}
            <Dialog open={isEditOpen} onClose={closeEdit} className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                    <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-auto p-8 z-10">
                        <button onClick={closeEdit} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white">
                            <FaTimes className="text-xl" />
                        </button>
                        <Dialog.Title className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Edit Profile</Dialog.Title>
                        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
                            <div className="flex flex-col items-center gap-2">
                                <label htmlFor="avatar-upload" className="cursor-pointer relative">
                                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                        {avatarPreview ? (
                                            <img src={avatarPreview} alt="Avatar" className="object-cover w-full h-full" />
                                        ) : (
                                            <FaUser className="text-4xl text-emerald-500" />
                                        )}
                                    </div>
                                    <span className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full p-1">
                                        <FaCamera className="text-xs" />
                                    </span>
                                    <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                                </label>
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleEditChange}
                                placeholder="Name"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <input
                                type="email"
                                name="email"
                                value={editForm.email}
                                onChange={handleEditChange}
                                placeholder="Email"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editForm.phone}
                                onChange={handleEditChange}
                                placeholder="Phone"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <input
                                type="text"
                                name="location"
                                value={editForm.location}
                                onChange={handleEditChange}
                                placeholder="Location"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            {editError && <p className="text-red-500 text-sm">{editError}</p>}
                            <div className="flex gap-4 mt-4">
                                <button type="button" onClick={closeEdit} className="flex-1 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">Cancel</button>
                                <button type="submit" className="flex-1 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>

            {/* Profile Header with Background */}
            <div className="relative h-64 bg-gradient-to-r from-emerald-500 to-teal-500 flex flex-col justify-end">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
                    <div className="flex items-end gap-6 w-full">
                        <div className="relative group z-10" style={{ marginBottom: '-72px' }}>
                            <div className="w-36 h-36 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-900">
                                {profile?.avatar ? (
                                    <img src={profile.avatar} alt="Avatar" className="object-cover w-full h-full rounded-2xl" />
                                ) : (
                                    <FaUser className="text-6xl text-emerald-500" />
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors" onClick={openEdit}>
                                        <FaCamera className="text-white text-xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 flex-1">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-4xl font-bold text-white">{user?.name || 'Guest'}</h1>
                                <button className="p-2 text-white/80 hover:text-white transition-colors" onClick={openEdit}>
                                    <FaEdit className="text-xl" />
                                </button>
                            </div>
                            <p className="text-white/80 text-lg">Welcome back to your travel dashboard</p>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-2 text-white/80">
                                    <FaMapMarkerAlt />
                                    <span>{profile?.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/80">
                                    <FaStar className="text-yellow-400" />
                                    <span>Premium Member</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaHeart className="text-2xl text-emerald-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Wishlist Items</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{favorites.length}</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaCalendarAlt className="text-2xl text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Upcoming Trips</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FaStar className="text-2xl text-purple-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Reviews</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8">
                    <div className="flex border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setActiveTab('wishlist')}
                            className={`flex-1 py-4 px-6 text-center font-medium focus:outline-none transition-colors ${
                                activeTab === 'wishlist'
                                    ? 'text-emerald-500 border-b-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            My Wishlist
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`flex-1 py-4 px-6 text-center font-medium focus:outline-none transition-colors ${
                                activeTab === 'bookings'
                                    ? 'text-emerald-500 border-b-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            My Bookings
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'wishlist' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favoriteHotels.length === 0 ? (
                                    <div className="col-span-full text-center py-12">
                                        <FaHeart className="text-4xl mx-auto mb-4 text-gray-400" />
                                        <p className="text-lg text-gray-500 dark:text-gray-400">Your wishlist is empty</p>
                                        <p className="text-sm mt-2 text-gray-400 dark:text-gray-500">
                                            Start adding hotels to your wishlist to see them here
                                        </p>
                                    </div>
                                ) : (
                                    favoriteHotels.map((hotel) => (
                                        <motion.div
                                            key={hotel.originalIndex}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative group h-full flex flex-col min-h-[340px]"
                                        >
                                            <div className="relative h-48 flex-shrink-0">
                                                {hotel.image ? (
                                                    <Image
                                                        src={hotel.image}
                                                        alt={hotel.name}
                                                        width={400}
                                                        height={300}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                                                        <FaMapMarkerAlt className="text-4xl text-gray-400" />
                                                    </div>
                                                )}
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        removeFromWishlist(hotel.originalIndex);
                                                    }}
                                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-red-500/80 transition-colors group-hover:bg-red-500/80"
                                                >
                                                    <FaTrash className="text-white text-lg" />
                                                </button>
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                    {hotel.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                                                    <FaMapMarkerAlt className="text-emerald-500 flex-shrink-0" />
                                                    <span className="truncate">{hotel.location}</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-auto">
                                                    <span className="text-emerald-500 font-bold">
                                                        ${hotel.price}/night
                                                    </span>
                                                    <button 
                                                        onClick={() => handleBooking(hotel)}
                                                        disabled={loading[hotel.originalIndex]}
                                                        className={`bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors ${
                                                            loading[hotel.originalIndex] ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                    >
                                                        {loading[hotel.originalIndex] ? 'Processing...' : 'Book Now'}
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FaCalendarAlt className="text-4xl mx-auto mb-4 text-gray-400" />
                                <p className="text-lg text-gray-500 dark:text-gray-400">No bookings yet</p>
                                <p className="text-sm mt-2 text-gray-400 dark:text-gray-500">
                                    Your upcoming trips will appear here
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaEnvelope className="text-emerald-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                <p className="text-gray-900 dark:text-white truncate">{profile?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FaPhone className="text-emerald-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                <p className="text-gray-900 dark:text-white">{profile?.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 