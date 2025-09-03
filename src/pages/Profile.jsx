import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditProfile = () => {
    // You can implement edit profile functionality here
    alert('Edit profile functionality can be implemented here');
  };

  // Show loading or redirect if user is not available
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col h-[570px] w-[310px] bg-white">
        {/* Header with logout button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold">Account Settings</h1>
          <button
            onClick={handleLogout}
            className="text-xs text-red-500 hover:text-red-700 cursor-pointer font-medium"
          >
            Logout
          </button>
        </div>

        {/* Profile Information */}
        <div className='bg-gray-200 p-4 mt-4 mx-4 rounded-lg'>
          <div className='flex gap-3 items-start relative'>
            {/* Profile Avatar */}
            <div className="relative">
              <div className="w-12 h-12 bg-[#6C25FF] rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              {/* Camera icon placeholder */}
              <div className="w-4 h-4 bg-gray-600 rounded-full absolute bottom-0 right-0 flex items-center justify-center">
                <span className="text-white text-xs">📷</span>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h4 className='text-base font-medium'>{user.fullName}</h4>
              <p className='text-xs text-gray-500'>{user.email}</p>
            </div>
          </div>

          {/* Additional User Details */}
          <div className='mt-4 space-y-2'>
            <div className='text-xs'>
              <span className="font-medium text-gray-700">Phone:</span> 
              <span className="ml-2 text-gray-600">{user.phoneNumber}</span>
            </div>
            <div className='text-xs'>
              <span className="font-medium text-gray-700">Company:</span> 
              <span className="ml-2 text-gray-600">{user.companyName}</span>
            </div>
            <div className='text-xs'>
              <span className="font-medium text-gray-700">Agency:</span> 
              <span className="ml-2 text-gray-600">{user.isAgency}</span>
            </div>
            {user.createdAt && (
              <div className='text-xs'>
                <span className="font-medium text-gray-700">Joined:</span> 
                <span className="ml-2 text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
          
          {/* Bio/Description */}
          <div className='mt-4 text-xs text-gray-600'>
            <p>Welcome to your PopX account! You can manage your account settings and preferences here. Update your profile information anytime.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 mt-4 space-y-3">
          <button
            onClick={handleEditProfile}
            className="w-full bg-[#6C25FF] text-white text-xs font-semibold py-2 px-4 rounded-sm hover:bg-[#5a1fd9] transition-colors"
          >
            Edit Profile
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-100 text-gray-700 text-xs font-semibold py-2 px-4 rounded-sm hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 text-center">
          <p className="text-xs text-gray-400">PopX Account Dashboard</p>
        </div>
      </div>
    </div>
  )
}

export default Profile