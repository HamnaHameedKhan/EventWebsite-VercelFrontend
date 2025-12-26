import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const backgroundImage =
    'https://cdn.pixabay.com/photo/2015/12/05/19/49/bridge-1078671_1280.jpg'
  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
      <motion.div
       initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center text-white max-w-xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover and Book Amazing Events
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Join us to explore a variety of events, from concerts to tech conferences.
          </p>
          <Link to="/signup">
            <button className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-secondary transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
