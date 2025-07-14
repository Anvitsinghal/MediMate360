import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '@/Redux/authSlice';

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
   const {user}=useSelector(store=>store.auth)
  const setloginhandler = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post(
        'https://medimate360.onrender.com/user/login',
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
        dispatch(loginSuccess(res.data.user));
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Wrong email or password');
    }
  };
useEffect(()=>{
  if(user){
    navigate("/");
  }
},[])
  return (
   <div
  className="flex items-center justify-center min-h-screen bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  }}
>
     
      <form
        onSubmit={setloginhandler}
         className="bg-white/20 backdrop-blur-md shadow-xl rounded-xl px-8 pt-6 pb-8 w-full max-w-sm border border-white/30 text-gray-900"
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
