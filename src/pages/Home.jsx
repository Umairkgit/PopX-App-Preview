import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col justify-end p-6 h-[570px] w-[310px] bg-white">
        <h1 className='font-bold text-2xl'>Welcome to PopX</h1>
        <p className='text-sm text-gray-500'>Lorem ipsum dolor, sit amet <br /> consectetur adipisicing elit.</p>
        <button 
          onClick={() => navigate('/signup')}
          className='bg-[#6C25FF] text-white cursor-pointer text-xs font-semibold px-10 py-2 rounded-sm mt-5 mb-2 hover:bg-[#5a1fd9] transition-colors'
        >
          Create Account
        </button>
        <button 
          onClick={() => navigate('/login')}
          className='bg-[#6C25FF4B] text-gray-800 cursor-pointer text-xs font-bold px-10 py-2 rounded-sm mb-2 hover:bg-[#6C25FF66] transition-colors'
        >
          Already Registered? Login
        </button>
      </div>
    </div>
  )
}

export default Home