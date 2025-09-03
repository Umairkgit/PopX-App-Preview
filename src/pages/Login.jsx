import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate();
  const { login, authenticateUser, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = authenticateUser(formData.email, formData.password);
      
      if (user) {
        login(user);
        navigate('/profile');
      } else {
        setErrors({ general: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password && Object.keys(errors).length === 0;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex flex-col p-6 h-[570px] w-[310px] bg-white">
        <h1 className='font-bold text-2xl'>Signin to your <br /> PopX account</h1>
        <p className='text-sm text-gray-500 mt-2'>Lorem ipsum dolor, sit amet <br /> consectetur adipisicing elit.</p>

        {errors.general && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 text-xs rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative mt-4">
            <label
              htmlFor="email"
              className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-[#6C25FF]">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
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

          <button 
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full mt-4 text-xs font-bold px-10 py-2 rounded-sm mb-2 transition-colors ${
              isFormValid && !isLoading 
                ? 'text-white bg-[#6C25FF] cursor-pointer hover:bg-[#5a1fd9]' 
                : 'text-white bg-[#CBCBCB] cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="text-xs text-center mt-4 text-gray-500">
          Don't have an account?{' '}
          <span 
            onClick={() => navigate('/signup')} 
            className="text-[#6C25FF] cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login