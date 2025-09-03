import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to profile if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
    }
    
    if (!formData.isAgency) {
      newErrors.isAgency = 'Please select if you are an agency';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await signup(formData);
      navigate('/profile');
    } catch (error) {
      if (error.message.includes('already exists')) {
        setErrors({ email: 'Email already exists. Please use a different email.' });
      } else {
        setErrors({ general: 'Signup failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every(value => value.toString().trim()) && 
                     Object.keys(errors).length === 0;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col p-6 h-[570px] w-[310px] bg-white overflow-y-auto">
        <h1 className='font-bold text-2xl'>Create your <br /> PopX account</h1>
        
        {errors.general && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative mt-4">
            <label
              htmlFor="fullName"
              className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-[#6C25FF]">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none ${
                errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-gray-400 focus:border-[#6C25FF]'
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          
          <div className="relative mt-4">
            <label
              htmlFor="phoneNumber"
              className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-[#6C25FF]">
              Phone number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none ${
                errors.phoneNumber ? 'border-red-400 focus:border-red-400' : 'border-gray-400 focus:border-[#6C25FF]'
              }`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>
          
          <div className="relative mt-4">
            <label
              htmlFor="email"
              className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-[#6C25FF]">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none ${
                errors.email ? 'border-red-400 focus:border-red-400' : 'border-gray-400 focus:border-[#6C25FF]'
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div className="relative mt-4">
            <label
              htmlFor="password"
              className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-[#6C25FF]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none ${
                errors.password ? 'border-red-400 focus:border-red-400' : 'border-gray-400 focus:border-[#6C25FF]'
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          
          <div className="relative mt-4">
            <label
              htmlFor="companyName"
              className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-[#6C25FF]">
              Company name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none ${
                errors.companyName ? 'border-red-400 focus:border-red-400' : 'border-gray-400 focus:border-[#6C25FF]'
              }`}
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium text-black mb-2">
              Are you an Agency?<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="isAgency" 
                  value="Yes"
                  checked={formData.isAgency === 'Yes'}
                  onChange={handleChange}
                  className="mr-2"
                /> 
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="isAgency" 
                  value="No"
                  checked={formData.isAgency === 'No'}
                  onChange={handleChange}
                  className="mr-2"
                /> 
                <span className="text-sm">No</span>
              </label>
            </div>
            {errors.isAgency && <p className="text-red-500 text-xs mt-1">{errors.isAgency}</p>}
          </div>

          <button 
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full mt-4 text-xs font-semibold px-10 py-2 rounded-sm transition-colors ${
              isFormValid && !isLoading 
                ? 'text-white bg-[#6C25FF] cursor-pointer hover:bg-[#5a1fd9]' 
                : 'text-white bg-[#CBCBCB] cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-xs text-center mt-4 text-gray-500">
          Already have an account?{' '}
          <span 
            onClick={() => navigate('/login')} 
            className="text-[#6C25FF] cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup