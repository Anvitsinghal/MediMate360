import { loginSuccess, updateProfile } from '../Redux/authSlice'; // Changed import path
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const EditProfile = () => {
  const navigate=useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [age, setAge] = useState(user?.age || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [state, setState] = useState(user?.state || '');
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const submithandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('state', state);
    if (file) formData.append('profilepicture', file);

    try {
      const res = await axios.post(
        'https://medimate360.onrender.com/user/profile/edit',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data.success) {
         navigate("/profile");
        dispatch(updateProfile(res.data.user));
        dispatch(loginSuccess(res.data.user)); 
        toast.success('Profile updated successfully');
       
      } else {
        toast.error(res.data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating profile. Try again later.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Edit Profile</h2>
        <form onSubmit={submithandler} className="space-y-6">
          <div>
            <label htmlFor="age" className="block mb-2 text-gray-700 font-medium">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block mb-2 text-gray-700 font-medium">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="state" className="block mb-2 text-gray-700 font-medium">State</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              placeholder="Enter your state"
            />
          </div>

          <div>
            <label htmlFor="profilePicture" className="block mb-2 text-gray-700 font-medium">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
