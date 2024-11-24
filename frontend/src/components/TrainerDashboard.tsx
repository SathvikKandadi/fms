import React from 'react';
import { User, Calendar, Users, ClipboardList, Apple, LineChart, Bell, Settings, LogOut } from 'lucide-react';

const TrainerDashboard = () => {
  const trainerName = "Sarah Smith"; // This would come from your auth state

  const navigationItems = [
    { icon: <User size={20} />, text: "Profile" },
    { icon: <Bell size={20} />, text: "Notifications" },
    { icon: <Settings size={20} />, text: "Settings" },
  ];

  const dashboardCards = [
    {
      title: "Schedule",
      description: "View and manage your weekly training sessions",
      link: "/trainer/schedule",
      bgColor: "bg-blue-500",
      icon: <Calendar size={24} className="text-blue-500" />
    },
    {
      title: "Members",
      description: "View and manage your client list",
      link: "/trainer/members",
      bgColor: "bg-purple-500",
      icon: <Users size={24} className="text-purple-500" />
    },
    {
      title: "Workout Logs",
      description: "Create and track member workout plans",
      link: "/trainer/workout-logs",
      bgColor: "bg-green-500",
      icon: <ClipboardList size={24} className="text-green-500" />
    },
    {
      title: "Diet Plans",
      description: "Create and manage member diet plans",
      link: "/trainer/diet-plans",
      bgColor: "bg-orange-500",
      icon: <Apple size={24} className="text-orange-500" />
    },
    {
      title: "Progress Tracking",
      description: "Monitor member fitness progress and goals",
      link: "/trainer/progress-tracking",
      bgColor: "bg-red-500",
      icon: <LineChart size={24} className="text-red-500" />
    }
  ];

  const quickStats = [
    { label: "Active Members", value: "24" },
    { label: "Sessions Today", value: "8" },
    { label: "This Week", value: "42" },
    { label: "Completion Rate", value: "95%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">FitnessPro</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {navigationItems.map((item, index) => (
                <button key={index} className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                  {item.icon}
                  <span>{item.text}</span>
                </button>
              ))}
              <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {trainerName}</h1>
          <p className="text-gray-600 mt-2">Manage your sessions and track member progress</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              className="block group"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className={`${card.bgColor} h-2`}></div>
                <div className="p-6">
                  <div className="flex items-center space-x-3">
                    {card.icon}
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-gray-600">
                    {card.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;