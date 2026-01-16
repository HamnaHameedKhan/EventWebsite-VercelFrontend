import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerFailed, registerSuccess } from '../../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../axios/axios'
import { Link,useNavigate } from 'react-router-dom';
import login from "../../assets/images/login.png";


const SignupForm = () => {

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

    const [loading, setLoading] = useState(false);
  

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
      setLoading(true)
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
    } finally{
      setLoading(false)
    }
  };

 return (
  <div className="h-screen w-full flex">
    <ToastContainer />

    {/* LEFT SIDE — LOGIN FORM */}
    <div className="w-full md:w-1/2 flex items-center justify-center px-8">
      <div className="w-full max-w-md text-center">
        
        {/* LOGO / BRAND */}
        <Link to="/">
        <h2 className="text-4xl font-bold mb-2 text-secondary">EventEase</h2>
        </Link>
        {/* WELCOME TEXT */}
        <h3 className="text-xl font-semibold mt-6 mb-2">
          Sign Up
        </h3>

        <p className="text-gray-500 mb-8">
          Enter your details to create an account.
        </p>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-4">
             <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
  type="submit"
  disabled={loading}
  className={`w-full py-3 rounded-lg transition 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-secondary text-white"}
  `}
>
  {loading ? "Signing up..." : "Sign up"}
</button>
        </form>

        {/* SIGN UP LINE */}
        <p className="mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/signup" className="font-semibold text-secondary">
            Sign in
          </Link>
        </p>
      </div>
    </div>

    {/* RIGHT SIDE — IMAGE */}
    <div className="hidden md:block w-1/2 h-full">
      <img
        src={login}
        alt="Event Hall"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);
};

export default SignupForm;


// return (
//     <div className="min-h-screen flex items-center justify-center bg-circular-gradient">
//     <ToastContainer />
//       <div className="bg-tertiary p-8 rounded shadow-md w-full max-w-md">
//         <Link to="/">
//           <h2 className="text-4xl font-bold mb-6 text-secondary text-center">EventEase</h2>
//         </Link>
//         <h2 className="text-2xl mb-6 text-left text-secondary">Sign Up for an Account</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-secondary">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
              
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-secondary">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
              
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-secondary">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
             
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-secondary">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
            
//             />
//           </div>
//           <button type="submit" className="w-full bg-secondary text-background py-2 rounded hover:text-white hover:text-secondary transition duration-200">
//             Sign Up
//           </button>
//         </form>
//         <p className="mt-4 text-background text-sm">
//           Already have an account?{' '}
//           <a href="/login" className="text-secondary hover:text-yellow-200">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );