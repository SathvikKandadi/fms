import React from 'react';
import { 
  User, 
  Users, 
  DollarSign, 
  FileText, 
  Settings, 
  Bell, 
  LogOut,
  BarChart,
  TrendingUp,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const adminName = "Admin User"; // This would come from your auth state

  const navigationItems = [
    { icon: <User size={20} />, text: "Profile" },
    { icon: <Bell size={20} />, text: "Notifications" },
    { icon: <Settings size={20} />, text: "Settings" },
  ];

  const dashboardCards = [
    {
      title: "Member Management",
      description: "View and manage member accounts, subscriptions, and access",
      link: "/admin/members",
      bgColor: "bg-blue-500",
      icon: <Users size={24} className="text-blue-500" />
    },
    {
      title: "Trainer Management",
      description: "Manage trainer profiles, schedules, and assignments",
      link: "/admin/trainers",
      bgColor: "bg-purple-500",
      icon: <User size={24} className="text-purple-500" />
    },
    {
      title: "Payment Tracking",
      description: "Monitor payments, subscriptions, and financial reports",
      link: "/admin/payments",
      bgColor: "bg-green-500",
      icon: <DollarSign size={24} className="text-green-500" />
    },
    {
      title: "Reports",
      description: "Generate and view system-wide analytics and reports",
      link: "/admin/reports",
      bgColor: "bg-orange-500",
      icon: <FileText size={24} className="text-orange-500" />
    },
    {
      title: "System Settings",
      description: "Configure system preferences and global settings",
      link: "/admin/settings",
      bgColor: "bg-red-500",
      icon: <Settings size={24} className="text-red-500" />
    }
  ];

  const quickStats = [
    { 
      label: "Total Members", 
      value: "486",
      trend: "+12%",
      trendUp: true,
      icon: <Users size={20} className="text-blue-500" />
    },
    { 
      label: "Active Trainers", 
      value: "24",
      trend: "+2",
      trendUp: true,
      icon: <User size={20} className="text-purple-500" />
    },
    { 
      label: "Monthly Revenue", 
      value: "$42.5k",
      trend: "+8%",
      trendUp: true,
      icon: <DollarSign size={20} className="text-green-500" />
    },
    { 
      label: "System Status", 
      value: "98.9%",
      trend: "Uptime",
      trendUp: true,
      icon: <Activity size={20} className="text-orange-500" />
    }
  ];

  const recentActivity = [
    { action: "New member registration", time: "5 minutes ago" },
    { action: "Payment received", time: "15 minutes ago" },
    { action: "Trainer schedule updated", time: "1 hour ago" },
    { action: "System backup completed", time: "2 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">FitnessPro Admin</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System overview and management</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {stat.icon}
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
                <span className={`text-sm ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm mb-8 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-gray-600">{activity.action}</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
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

export default AdminDashboard;