import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../axios/axios'
import { loginFailed, loginSuccess } from '../../redux/authSlice';

const LoginForm = () => {

  const dispatch=useDispatch()

 const [FormData,setFormData]=useState({
   email:'',
   password:''
 })

 const {email,password}=FormData

 const handleChange=(e)=>{
    setFormData({...FormData,[e.target.name]:e.target.value})
 }

 const navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    
   
    if(!email || !password){
      toast.error("All fields are required");
      return;
    }

    const config={headers:{
      'Content-Type': 'application/json'
    }}

    const body=JSON.stringify({email,password})
    
    
  try {
    const res = await axios.post('/login', body, config);
    const { token, user } = res.data;

    // Store token and user data
    localStorage.setItem('token', token);
    dispatch(loginSuccess(user));

    if (user.isAdmin) {
      toast.success('Admin Login Successfully');
      setTimeout(()=>{
        navigate('/admin');
      },2000)
      
    } else {
      toast.success('Login Successfully');
      setTimeout(()=>{
        navigate('/');
      },2000)
      
    }

    
  } catch (error) {
        dispatch(loginFailed(error.response.data.msg))
        toast.error(error.response.data.msg)
    }

  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-circular-gradient">
    <ToastContainer/>
      <div className="bg-tertiary p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-secondary text-center">Login to EventEase</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-secondary text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name='email'
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
           
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-secondary text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name='password'
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            
            />
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-tertiary py-2 rounded-lg hover:bg-primary hover:text-background transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-background text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-secondary hover:text-yellow-200">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
