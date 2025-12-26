import React from 'react';
import { motion } from 'framer-motion';
import about from '../../src/assets/images/about.jpg'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="container mx-auto">
        {/* About Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden mb-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">About EventEase</h2>
            <p className="text-gray-600 mb-4">
              EventEase is your one-stop solution for managing and attending events seamlessly. From concerts to
              conferences, we make it easier for you to book and enjoy events with just a few clicks.
            </p>
            <p className="text-gray-600">
              Our platform offers a wide range of events and provides users with a smooth and hassle-free booking
              experience. Join us today and be a part of the EventEase community.
            </p>
          </div>
          <div className="md:w-1/2">
            <motion.img
              src={about}
              alt="EventEase"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
            />
          </div>
        </motion.div>

       
      </div>
    </div>
  );
};

export default AboutPage;
