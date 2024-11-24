import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Dumbbell, ShieldCheck, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = (role: string) => {
    navigate(`/login/${role}`);
  };

  const features = [
    {
      icon: "🎯",
      title: "Track Progress",
      description: "Monitor your fitness journey with detailed analytics and insights"
    },
    {
      icon: "💪",
      title: "Expert Trainers",
      description: "Work with certified professionals to achieve your fitness goals"
    },
    {
      icon: "🥗",
      title: "Diet Plans",
      description: "Get personalized nutrition advice tailored to your needs"
    }
  ];

  const loginOptions = [
    {
      role: 'member',
      title: 'Member Access',
      description: 'Access your workout plans and track progress',
      icon: <Users size={24} />,
      color: 'bg-blue-600 hover:bg-blue-700',
      lightColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      role: 'trainer',
      title: 'Trainer Portal',
      description: 'Manage your clients and schedules',
      icon: <Dumbbell size={24} />,
      color: 'bg-purple-600 hover:bg-purple-700',
      lightColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      role: 'admin',
      title: 'Admin Dashboard',
      description: 'Complete system management and oversight',
      icon: <ShieldCheck size={24} />,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      lightColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">FitnessPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">About</button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Features</button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transform Your Fitness Journey
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Join our comprehensive fitness management platform designed to help you achieve
              your health and wellness goals with personalized guidance and support.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login Options Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Access Portal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loginOptions.map((option) => (
            <div 
              key={option.role}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`${option.lightColor} p-6`}>
                <div className={`${option.iconColor} mb-4`}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {option.description}
                </p>
                <button
                  onClick={() => handleLoginRedirect(option.role)}
                  className={`w-full ${option.color} text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 transition-colors duration-200`}
                >
                  <span>Access Portal</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FitnessPro</h3>
              <p className="text-gray-400">Your complete fitness management solution</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;