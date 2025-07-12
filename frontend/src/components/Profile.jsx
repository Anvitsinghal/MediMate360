import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  const editprofilehandler = () => {
    navigate('/edit');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Your Profile</h2>

      
      {user.profilepicture?.url && (
        <div className="flex justify-center mb-6">
          <img
            src={user.profilepicture.url}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileItem label="Name" value={user.name} />
        <ProfileItem label="Email" value={user.email} />
        <ProfileItem label="Gender" value={user.gender || "N/A"} />
        <ProfileItem label="Age" value={user.age || "N/A"} />
        <ProfileItem label="State" value={user.state || "N/A"} />
        <ProfileItem label="Diseases" value={user.diseases?.join(", ") || "None"} />
        <ProfileItem label="Reminders" value={user.reminders?.length || 0} />
        <ProfileItem label="Matched Schemes" value={user.matchedSchemes?.length || 0} />
        <ProfileItem label="Admin" value={user.isAdmin ? "Yes" : "No"} />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={editprofilehandler}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

export default Profile;
