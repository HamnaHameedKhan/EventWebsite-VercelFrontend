import React from 'react';
import { motion } from 'framer-motion';
import one from "../../assets/images/one.jpg"
import two from "../../assets/images/two.jpg"
import three from "../../assets/images/three.jpg"




const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Event Organizer',
    text: 'This platform made organizing events a breeze. The intuitive design and user-friendly features helped me reach a wider audience and manage everything effortlessly.',
    image: one
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Attendee',
    text: 'I had a fantastic experience attending events through this site. The seamless booking process and great selection of events made it my go-to choice!',
    image: two
  },
  {
    id: 3,
    name: 'Alice Johnson',
    position: 'Speaker',
    text: 'As a speaker, I found this platform incredibly helpful for scheduling and managing my sessions. The support team is also very responsive and helpful.',
    image: three
  }
];

const Testimonials = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-primary">What Our Users Say</h2>
        <motion.div
    initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-wrap justify-center">
          {testimonials.map(({ id, name, position, text, image }) => (
            <div key={id} className="bg-black rounded-lg shadow-lg p-6 m-4 max-w-sm">
              <div className="flex items-center mb-4">
                <img src={image} alt={name} className="w-16 h-16 rounded-full border-2 border-primary" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-secondary">{name}</h3>
                  <p className="text-sm text-gray-300">{position}</p>
                </div>
              </div>
              <p className="text-white">{text}</p>
            </div>
          ))}
        </div>
        </motion.div>
      </div>
      
    </div>
  );
};

export default Testimonials;
