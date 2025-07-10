import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const setloginhandler = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post(
        'http://localhost:8000/user/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success('Welcome back!');
        navigate('/');
        setemail("");
        setpassword("");
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Wrong email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
     
      <form
        onSubmit={setloginhandler}
        className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">MEDICARE360</h1>

        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          value={email}
          id="email"
          onChange={(e) => setemail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          value={password}
          id="password"
          onChange={(e) => setpassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-6 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300"
        >
          Login
        </button>
        <div className="text-sm text-gray-600 mt-4 text-center">
         Don't have an account?{' '}
         <Link
           to="/register"
           className="text-blue-600 hover:underline font-medium transition duration-200"
         >
           Register
         </Link>
       </div>
      </form>
    </div>
  );
};

export default Login;
