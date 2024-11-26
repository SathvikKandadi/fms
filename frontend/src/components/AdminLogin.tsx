import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, ChevronLeft, Shield, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const validatePassword = (pwd: string) => {
    return pwd.length >= 8;
  };

  const handleLogin = async () => {
    setError('');
    
    // Validation
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Attempting admin login...');
      navigate("/admin/dashboard");
      
      
      // Simulated failed attempt (remove in production)
      setAttempts(prev => {
        const newAttempts = prev + 1;
        if (newAttempts >= 3) {
          throw new Error('Maximum login attempts exceeded');
        }
        return newAttempts;
      });
      
      // Navigate to dashboard on success
      // navigate('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="p-4">
        <button 
          onClick={handleBackToHome}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </button>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* Logo and Security Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500 mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
            <p className="text-gray-400 mt-2">Secure access for authorized personnel only</p>
          </div>

          {/* Login Card */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 mx-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Login</h2>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="tel"
                    placeholder="Enter your 10-digit number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10));
                      setError('');
                    }}
                    className={`block w-full pl-10 pr-3 py-3 border ${error && !password ? 'border-red-300' : 'border-gray-300'} 
                      rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
                      transition duration-200`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className={`block w-full pl-10 pr-10 py-3 border ${error && password ? 'border-red-300' : 'border-gray-300'} 
                      rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
                      transition duration-200`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <button 
                onClick={handleLogin}
                disabled={isLoading || !phoneNumber || !password || attempts >= 3}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
                  text-white font-medium transition duration-200
                  ${isLoading || !phoneNumber || !password || attempts >= 3
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700'}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Secure Login</span>
                    {attempts < 3 && <Shield size={20} />}
                  </>
                )}
              </button>
            </div>

            {/* Additional Security Notice */}
            {attempts > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Remaining attempts: {3 - attempts}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Access restricted to authorized personnel only.
                <br />
                All login attempts are monitored and logged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}