import { User, Bell, Settings, LogOut } from 'lucide-react';

const MemberDashboard = () => {
  const memberName = "John Doe"; // This would come from your auth state

  const navigationItems = [
    { icon: <User size={20} />, text: "Profile" },
    { icon: <Bell size={20} />, text: "Notifications" },
    { icon: <Settings size={20} />, text: "Settings" },
  ];

  const dashboardCards = [
    {
      title: "View Profile",
      description: "Update your personal information and preferences",
      link: "/member/profile",
      bgColor: "bg-blue-500",
    },
    {
      title: "Book Session",
      description: "Schedule your next fitness session with a trainer",
      link: "/member/book-session",
      bgColor: "bg-purple-500",
    },
    {
      title: "Workout Logs",
      description: "Track your fitness progress and achievements",
      link: "/member/workout-logs",
      bgColor: "bg-green-500",
    },
    {
      title: "Diet Plan",
      description: "View and follow your personalized nutrition plan",
      link: "/member/diet-plan",
      bgColor: "bg-orange-500",
    },
    {
      title: "Payments",
      description: "Manage your membership and payment details",
      link: "/member/payments",
      bgColor: "bg-red-500",
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {memberName}</h1>
          <p className="text-gray-600 mt-2">Track your fitness journey and achieve your goals</p>
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
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
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

export default MemberDashboard;