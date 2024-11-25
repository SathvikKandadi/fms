import React, { useState } from 'react';
import { Phone, ArrowRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MemberLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handleLogin = async () => {
    setError('');
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    try {
      // Simulated API call
      console.log('Logging in with phone number:', phoneNumber);

    //   const response = await axios.post("http://localhost:3000/api/v1/member", {phoneNumber});
  
    // const member = response.data;
    navigate('/member/dashboard');
    //   if(member)
    //   {
    //     localStorage.setItem("member",JSON.stringify(member));
    //     navigate('/member/dashboard');
    //   }
    //   else if(response.data.message == "Member not found")
    //   {
    //     alert("No such Member exists with the particular phone number");
    //   }
      // Navigate to dashboard on success
      // navigate('/member/dashboard');
    } catch (err) {
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="p-4">
        <button 
          onClick={handleBackToHome}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </button>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* Logo and Branding */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">FitnessPro</h1>
            <p className="text-gray-600 mt-2">Welcome back! Please login to continue</p>
          </div>

          {/* Login Card */}
          <div className="bg-white shadow-xl rounded-2xl p-8 mx-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Member Login</h2>

            {/* Phone Number Input Group */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
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
                  className={`block w-full pl-10 pr-3 py-3 border ${error ? 'border-red-300' : 'border-gray-300'} 
                    rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    transition duration-200`}
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
              )}

              {/* Login Button */}
              <button 
                onClick={handleLogin}
                disabled={isLoading || !phoneNumber}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg
                  text-white font-medium transition duration-200
                  ${isLoading || !phoneNumber 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>

            {/* Additional Options */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  Need help logging in?
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  Create account
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <button className="text-blue-600 hover:text-blue-800">Terms of Service</button>
              {' '}and{' '}
              <button className="text-blue-600 hover:text-blue-800">Privacy Policy</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}