'use client'
import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane, FaLinkedin, FaTwitter, FaInstagram, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Background from '@/components/Background';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('message');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    setSubmitSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

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
              Let's Connect
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto tracking-wide">
              Have a question or want to work together? We're here to help.
            </p>
          </motion.div>

          {/* Contact Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-none p-1 inline-flex">
              <button
                onClick={() => setActiveTab('message')}
                className={`px-8 py-3 text-lg font-medium transition-all duration-300 ${
                  activeTab === 'message' 
                    ? 'bg-white text-black' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Send Message
              </button>
              <button
                onClick={() => setActiveTab('visit')}
                className={`px-8 py-3 text-lg font-medium transition-all duration-300 ${
                  activeTab === 'visit' 
                    ? 'bg-white text-black' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Visit Us
              </button>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 mb-20"
          >
            {/* Contact Form */}
            <AnimatePresence mode="wait">
              {activeTab === 'message' ? (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-sm rounded-none p-8 md:p-12"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center">
                      <FaPaperPlane className="text-white text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white tracking-tight">Send us a Message</h2>
                      <p className="text-gray-400 mt-1">We'll get back to you as soon as possible</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="group"
                      >
                        <label htmlFor="name" className="block text-gray-300 mb-2 font-medium group-hover:text-white transition-colors duration-300">Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-white/5 text-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10 group-hover:border-white/20 transition-all duration-300"
                            required
                          />
                          <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-300 pointer-events-none"></div>
                        </div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="group"
                      >
                        <label htmlFor="email" className="block text-gray-300 mb-2 font-medium group-hover:text-white transition-colors duration-300">Email</label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-white/5 text-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10 group-hover:border-white/20 transition-all duration-300"
                            required
                          />
                          <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-300 pointer-events-none"></div>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="group"
                    >
                      <label htmlFor="subject" className="block text-gray-300 mb-2 font-medium group-hover:text-white transition-colors duration-300">Subject</label>
                      <div className="relative">
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-6 py-4 bg-white/5 text-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10 group-hover:border-white/20 transition-all duration-300"
                          required
                        />
                        <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="group"
                    >
                      <label htmlFor="message" className="block text-gray-300 mb-2 font-medium group-hover:text-white transition-colors duration-300">Message</label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="w-full px-6 py-4 bg-white/5 text-white rounded-none focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10 group-hover:border-white/20 transition-all duration-300 resize-none"
                          required
                        ></textarea>
                        <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </motion.div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-white text-black px-8 py-4 font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-100'
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : submitSuccess ? (
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Message Sent!
                        </div>
                      ) : (
                        <>
                          Send Message
                          <FaPaperPlane className="transform group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="visit"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-sm rounded-none p-8 md:p-12"
                >
                  <h2 className="text-3xl font-black text-white mb-8 tracking-tight">Visit Our Office</h2>
                  <div className="aspect-video mb-8">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647043087964!5m2!1sen!2s"
                      className="w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300">123 Travel Street</p>
                    <p className="text-gray-300">New York, NY 10001</p>
                    <p className="text-gray-300">United States</p>
                  </div>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-6 text-white font-medium flex items-center gap-2 hover:text-gray-300 transition-colors duration-300"
                  >
                    Get Directions
                    <FaArrowRight />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-none p-8 md:p-12">
                <h2 className="text-3xl font-black text-white mb-8 tracking-tight">Contact Information</h2>
                <div className="space-y-8">
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-6"
                  >
                    <div className="w-14 h-14 bg-white/10 rounded-none flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2 text-lg">Email</h3>
                      <p className="text-gray-300 hover:text-white transition-colors duration-300">support@tripi.com</p>
                      <p className="text-gray-300 hover:text-white transition-colors duration-300">info@tripi.com</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-6"
                  >
                    <div className="w-14 h-14 bg-white/10 rounded-none flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2 text-lg">Phone</h3>
                      <p className="text-gray-300 hover:text-white transition-colors duration-300">+1 (555) 123-4567</p>
                      <p className="text-gray-300 hover:text-white transition-colors duration-300">+1 (555) 987-6543</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-6"
                  >
                    <div className="w-14 h-14 bg-white/10 rounded-none flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2 text-lg">Business Hours</h3>
                      <p className="text-gray-300 hover:text-white transition-colors duration-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-300 hover:text-white transition-colors duration-300">Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </motion.div>
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-white font-bold mb-6 text-lg">Follow Us</h3>
                  <div className="flex gap-4">
                    <motion.a
                      href="#"
                      whileHover={{ y: -5 }}
                      className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
                    >
                      <FaLinkedin className="text-xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ y: -5 }}
                      className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
                    >
                      <FaTwitter className="text-xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ y: -5 }}
                      className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
                    >
                      <FaInstagram className="text-xl" />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white/5 backdrop-blur-sm rounded-none p-8 md:p-12">
                <h2 className="text-3xl font-black text-white mb-8 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-6">
                    <h3 className="text-white font-bold mb-2">How quickly will I receive a response?</h3>
                    <p className="text-gray-300">We typically respond to all inquiries within 24 hours during business days.</p>
                  </div>
                  <div className="border-b border-white/10 pb-6">
                    <h3 className="text-white font-bold mb-2">Do you offer emergency support?</h3>
                    <p className="text-gray-300">Yes, we provide 24/7 emergency support for all our clients.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">Can I schedule a meeting?</h3>
                    <p className="text-gray-300">Absolutely! You can schedule a meeting through our booking system or by contacting us directly.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 