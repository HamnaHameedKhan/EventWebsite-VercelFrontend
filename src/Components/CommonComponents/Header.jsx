import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const user=useSelector((state)=> state.auth.user)
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const dashBoard=()=>{
    console.log("User Object: ", user);
    if(user.isAdmin){
      console.log(user.isAdmin)
      navigate('/admin', { replace: true })
    }
    else{
      navigate('/user', { replace: true })
    }
    
  }
  return (
    <header className="bg-primary text-background">
      <ToastContainer />

      <nav className="container mx-auto p-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-secondary">EventEase</Link>
        <div className="hidden md:flex space-x-6 text-xl">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <Link to="/events" className="hover:text-secondary">Events</Link>
          <Link to="/about" className="hover:text-secondary">About</Link>
          <Link to="/contact" className="hover:text-secondary">Contact</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
            <button onClick={handleLogout} className="py-2 px-4 bg-secondary text-background rounded hover:bg-tertiary hover:text-secondary">
              Logout
            </button>

            <button onClick={dashBoard} className="block w-full py-2 px-4 bg-secondary text-background text-sm hover:bg-tertiary hover:text-secondary">
             DashBoard
            </button>

            </>
          ) : (
            <>
              <Link to="/login" className="py-2 px-4 bg-secondary text-background rounded hover:bg-tertiary hover:text-secondary">
                Login
              </Link>
              <Link to="/signup" className="py-2 px-4 bg-background text-tertiary rounded hover:bg-secondary hover:text-tertiary">
                Sign Up
              </Link>
            </>
          )}
        </div>
        <button onClick={toggleMenu} className="block md:hidden focus:outline-none">
          <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden">
          <Link to="/" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-tertiary">Home</Link>
          <Link to="/events" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-tertiary">Events</Link>
          <Link to="/about" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-tertiary">About</Link>
          <Link to="/contact" className="block py-2 px-4 text-sm hover:bg-secondary hover:text-tertiary">Contact</Link>
          {isAuthenticated ? (
            <>
            <button onClick={handleLogout} className="block w-full py-2 px-4 bg-secondary text-tertiary text-sm hover:bg-tertiary hover:text-secondary">
              Logout
            </button>

            <button onClick={dashBoard} className="block w-full py-2 px-4 bg-secondary text-tertiary text-sm hover:bg-tertiary hover:text-secondary">
             DashBoard
            </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 px-4 bg-secondary text-tertiary text-sm hover:bg-tertiary hover:text-secondary">
                Login
              </Link>
              <Link to="/signup" className="block py-2 px-4 bg-background text-tertiary text-sm hover:bg-secondary hover:text-tertiary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
