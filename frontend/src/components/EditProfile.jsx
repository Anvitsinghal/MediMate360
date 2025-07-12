import { loginSuccess, updateProfile } from '@/Redux/authSlice';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const EditProfile = () => {
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
        'http://localhost:8000/user/profile/edit',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data.success) {
        dispatch(updateProfile(res.data.user));
        dispatch(loginSuccess(res.data.user));
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating profile. Try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Edit Profile</h2>
      <form onSubmit={submithandler} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-blue-400"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
