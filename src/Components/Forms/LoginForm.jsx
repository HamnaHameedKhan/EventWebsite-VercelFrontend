import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios/axios";
import { loginFailed, loginSuccess } from "../../redux/authSlice";
import login from "../../assets/images/login.png";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);


  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
          setLoading(true);

      const res = await axios.post("/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      dispatch(loginSuccess(user));

      toast.success("Login successful");

      setTimeout(() => {
        navigate(user.isAdmin ? "/admin" : "/");
      }, 1500);
    } catch (error) {
      dispatch(loginFailed(error?.response?.data?.msg));
      toast.error(error?.response?.data?.msg || "Login failed");
    } finally {
    setLoading(false);
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
          Welcome back
        </h3>

        <p className="text-gray-500 mb-8">
          Enter your credentials to access your account.
        </p>

        <form onSubmit={handleSubmit} className="text-left">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-secondary hover:text-black"
            >
              Forgot password?
            </Link>
          </div>

          <button
  type="submit"
  disabled={loading}
  className={`w-full py-3 rounded-lg transition 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-secondary text-white"}
  `}
>
  {loading ? "Signing in..." : "Sign in"}
</button>
        </form>

        {/* SIGN UP LINE */}
        <p className="mt-6 text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-semibold text-secondary">
            Sign up
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

export default LoginForm;
