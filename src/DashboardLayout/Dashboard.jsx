// File path__
import useUserData from "../Hooks/userData";
import { AuthContext } from "../Context/AuthContext";
import TopNavbar from "../Shared/TopNavbar/TopNavbar";
import SidebarNav from "../Shared/SidebarNav/SidebarNav";
import DashboardContent from "../Shared/DashboardMain/DashboardContent";

// From react__
import { useState, useRef, useEffect, useContext } from "react";

const Dashboard = () => {
  const { profile } = useUserData();
  const { user, userLoading } = useContext(AuthContext);
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
        <SidebarNav
          user={user}
          profile={profile}
          userLoading={userLoading}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        ></SidebarNav>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col lg:ml-0 min-w-0">
          <TopNavbar
            user={user}
            profile={profile}
            userLoading={userLoading}
            dropdownRef={dropdownRef}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            notificationOpen={notificationOpen}
            setNotificationOpen={setNotificationOpen}
            profileDropdownOpen={profileDropdownOpen}
            setProfileDropdownOpen={setProfileDropdownOpen}
          ></TopNavbar>

          {/* CONTENT AREA - Completely Empty as Requested */}
          <DashboardContent userLoading={userLoading}></DashboardContent>
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