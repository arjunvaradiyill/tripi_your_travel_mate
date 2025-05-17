'use client'
import React, { useState, useEffect } from 'react';
import { FaUser, FaPlane, FaHistory, FaCreditCard, FaCog, FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import Background from '@/components/Background';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 min-h-screen pt-[12vh]">
        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* Profile Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-emerald-600 flex items-center justify-center">
                <FaUser className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                <p className="text-gray-300">{user.email}</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors duration-150">
                  Edit Profile
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors duration-150">
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <FaPlane className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-300 text-sm">Upcoming Trips</h3>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <FaHistory className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-300 text-sm">Past Trips</h3>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <FaUser className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-300 text-sm">Reward Points</h3>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trips Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Trips</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-6 py-2 rounded-lg transition-colors duration-150 ${
                    activeTab === 'upcoming'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-6 py-2 rounded-lg transition-colors duration-150 ${
                    activeTab === 'past'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Past
                </button>
              </div>
            </div>
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg">No trips found. Start planning your next adventure!</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors duration-150">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaPlane className="text-white text-xl" />
              </div>
              <h3 className="text-white font-medium">Book New Trip</h3>
            </button>
            <button className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors duration-150">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaHistory className="text-white text-xl" />
              </div>
              <h3 className="text-white font-medium">View History</h3>
            </button>
            <button className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors duration-150">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaCreditCard className="text-white text-xl" />
              </div>
              <h3 className="text-white font-medium">Payment Methods</h3>
            </button>
            <button className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors duration-150">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FaCog className="text-white text-xl" />
              </div>
              <h3 className="text-white font-medium">Settings</h3>
            </button>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-150"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 