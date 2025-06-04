'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
    const { theme } = useTheme();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrorMessage('');
        try {
            await login(formData.email, formData.password);
            toast.success('Login successful!');
            onClose();
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.message || 'Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            await login(null, null, provider);
            toast.success('Login successful!');
            onClose();
        } catch (error) {
            console.error(`${provider} login error:`, error);
            setErrorMessage(`Failed to login with ${provider}. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 overflow-y-auto"
                >
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <IoMdClose className="text-2xl" />
                            </button>

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Welcome Back</h2>

                            {errorMessage && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <HiOutlineMail className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                                errors.email
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500'
                                            } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <RiLockPasswordLine className="text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                                                errors.password
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500'
                                            } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-sm text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                                        isLoading
                                            ? 'bg-emerald-400 cursor-not-allowed'
                                            : 'bg-emerald-600 hover:bg-emerald-700'
                                    } transition-colors duration-200`}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleSocialLogin('google')}
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <FcGoogle className="text-xl" />
                                        Google
                                    </button>
                                    <button
                                        onClick={() => handleSocialLogin('github')}
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <FaGithub className="text-gray-900 dark:text-white mr-2" />
                                        GitHub
                                    </button>
                                </div>
                            </div>

                            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{' '}
                                <button
                                    onClick={onSwitchToRegister}
                                    className="text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 font-medium"
                                >
                                    Sign up
                                </button>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal; 