import React from 'react';

const NewsLetterSubscription = () => {
  return (
    <div className="py-8 bg-primary text-background text-center">
      <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
      <p className="mb-4">Subscribe to our newsletter for the latest event updates.</p>
      <div className="flex justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-l-full focus:outline-none w-1/2"
        />
        <button className="bg-secondary text-white py-2 px-6 rounded-r-full hover:bg-tertiary transition duration-300">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetterSubscription;
