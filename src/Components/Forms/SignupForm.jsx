import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerFailed, registerSuccess } from '../../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../axios/axios'
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { username, email, password,confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if(password!=confirmPassword){
      toast.error("Password do not match");
      return;
    }
    const config= {headers:{
      'Content-Type': 'application/json',
    }}
    const body=JSON.stringify({username,email,password,confirmPassword })
    console.log(body);

    try {
      const res= await axios.post('/signup',body,config)
      dispatch(registerSuccess(res.data))
      toast.success("Registration successful");
      setTimeout(()=>{
        navigate('/login');
      },2000)
      
    } catch (error) {
      const errorMsg =
    error.response?.data?.msg || "Something went wrong during signup.";
    
  dispatch(registerFailed(errorMsg));
  toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-circular-gradient">
    <ToastContainer />
      <div className="bg-tertiary p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-secondary">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
             
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            
            />
          </div>
          <button type="submit" className="w-full bg-secondary text-background py-2 rounded hover:bg-tertiary hover:text-secondary transition duration-200">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-background text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-secondary hover:text-yellow-200">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
