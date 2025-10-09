import { useState, useRef, useEffect } from "react";
import {
  FiHome,
  FiBriefcase,
  FiUser,
  FiBell,
  FiSettings,
  FiMenu,
  FiX,
  FiSearch,
  FiMessageSquare,
  FiBarChart2,
  FiCalendar,
  FiStar,
  FiTrendingUp,
  FiLogOut,
} from "react-icons/fi";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  const dropdownRef = useRef();

  // Close dropdown when clicking outside__
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="bg-[#f8fafc]">
      <div className="flex h-screen max-w-[1920px] m-auto">
        {/* SIDEBAR - Visually Separated */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r-2 border-gray-200 shadow-lg rounded-r-2xl m-2`}
        >
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="flex items-center justify-between h-20 px-6 border-b-2 border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3C8F63] rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">JH</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {[
                {
                  id: "dashboard",
                  label: "Dashboard",
                  icon: <FiHome size={20} />,
                },
                {
                  id: "jobs",
                  label: "Job Search",
                  icon: <FiBriefcase size={20} />,
                },
                {
                  id: "applications",
                  label: "Applications",
                  icon: <FiBarChart2 size={20} />,
                },
                {
                  id: "messages",
                  label: "Messages",
                  icon: <FiMessageSquare size={20} />,
                },
                {
                  id: "calendar",
                  label: "Calendar",
                  icon: <FiCalendar size={20} />,
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-left rounded-xl transition-all duration-200 border-2 ${
                    activeNav === item.id
                      ? "bg-[#3C8F63] text-white border-[#3C8F63] shadow-lg shadow-[#3C8F63]/20"
                      : "text-gray-600 border-transparent hover:border-gray-200 hover:bg-gray-50 hover:text-[#3C8F63]"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Settings Section */}
            <div className="p-4 border-t-2 border-gray-100">
              <button
                className={`flex items-center w-full px-4 py-3 text-left rounded-xl transition-all duration-200 border-2 ${
                  activeNav === "settings"
                    ? "bg-[#3C8F63] text-white border-[#3C8F63] shadow-lg"
                    : "text-gray-600 border-transparent hover:border-gray-200 hover:bg-gray-50 hover:text-[#3C8F63]"
                }`}
                onClick={() => setActiveNav("settings")}
              >
                <FiSettings size={20} className="mr-3" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col lg:ml-0 min-w-0">
          {/* TOP NAVBAR - Like your main site navbar */}
          <header className="bg-white border-b-2 border-gray-200 z-40 shadow-sm rounded-b-2xl m-2 mt-2 mb-0">
            <div className="flex items-center justify-between h-16 px-6">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 lg:hidden border-2 border-gray-200"
              >
                <FiMenu size={20} />
              </button>

              {/* Navigation Routes - Like your main navbar */}
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="/"
                  className="text-gray-700 hover:text-[#3C8F63] font-medium transition-colors duration-200"
                >
                  Home
                </a>
                <a
                  href="/community"
                  className="text-gray-700 hover:text-[#3C8F63] font-medium transition-colors duration-200"
                >
                  Community
                </a>
                <a
                  href="/about"
                  className="text-gray-700 hover:text-[#3C8F63] font-medium transition-colors duration-200"
                >
                  About Us
                </a>
              </div>

              {/* Right Section - Search, Notifications & User Dropdown */}
              <div className="flex items-center space-x-4">
                {/* Notification Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className="p-2 text-gray-600 hover:text-[#3C8F63] rounded-xl hover:bg-gray-50 relative transition-colors duration-200 border-2 border-gray-200"
                  >
                    <FiBell size={20} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>

                  {notificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border-2 border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b-2 border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700">
                          Notifications
                        </h3>
                      </div>
                      <div className="py-2">
                        <div className="px-4 py-3 hover:bg-gray-50 border-b-2 border-gray-100">
                          <p className="text-sm text-gray-700">
                            No new notifications
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Dropdown - Like your main navbar */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 border-2 border-gray-200"
                  >
                    <div className="w-8 h-8 bg-[#3C8F63] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        JD
                      </span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-800">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500">Job Seeker</p>
                    </div>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border-2 border-gray-200 py-2 z-50">
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b-2 border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#3C8F63] rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">JD</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              John Doe
                            </p>
                            <p className="text-xs text-gray-500">
                              john@example.com
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Items */}
                      <div className="py-2">
                        <a
                          href="/user-profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiUser className="mr-3" size={16} />
                          My Profile
                        </a>
                        <a
                          href="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <FiBarChart2 className="mr-3" size={16} />
                          Dashboard
                        </a>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <FiLogOut className="mr-3" size={16} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* CONTENT AREA - Completely Empty as Requested */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="border-2 border-gray-300 border-dashed rounded-2xl h-full flex items-center justify-center bg-white shadow-inner">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3C8F63]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBriefcase className="text-[#3C8F63]" size={24} />
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  Your dashboard content will appear here
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Start building your components
                </p>
              </div>
            </div>
          </main>
        </div>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
