'use client'
import React from 'react';
import Profile from '@/components/Profile/Profile';
import { useTheme } from '@/context/ThemeContext';

const ProfilePage = () => {
    const { theme } = useTheme();
    // In a real application, this would come from your authentication system
    const favorites = [0, 2, 4]; // Example favorites indices

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <Profile favorites={favorites} />
        </div>
    );
};

export default ProfilePage; 