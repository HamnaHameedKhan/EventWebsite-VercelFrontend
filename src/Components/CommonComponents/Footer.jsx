import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-tertiary py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center">
          <Link to="/" className="text-2xl font-bold text-secondary mb-2 md:mb-0">EventEase</Link>
          <p className="text-background text-sm md:ml-4 font-bold">&copy; {new Date().getFullYear()} EventEase. All rights reserved.</p>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0 font-bold">
          <Link to="/privacy" className="text-background text-sm hover:text-secondary">Privacy Policy</Link>
          <Link to="/terms" className=" text-background text-sm hover:text-secondary">Terms of Service</Link>
          <Link to="/contact" className=" text-background text-sm hover:text-secondary">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
