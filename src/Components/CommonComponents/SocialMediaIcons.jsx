import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';


const SocialMediaIcons = () => {
  return (
    <motion.div
              
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    
  >
    <div className="flex justify-center space-x-6 py-8">
    
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-secondary transition duration-300"
      >
        <FaFacebookF size={24} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-secondary transition duration-300"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-secondary transition duration-300"
      >
        <FaInstagram size={24} />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-secondary transition duration-300"
      >
        <FaLinkedinIn size={24} />
      </a>
     
    </div>
    </motion.div>
  );
};

export default SocialMediaIcons;
