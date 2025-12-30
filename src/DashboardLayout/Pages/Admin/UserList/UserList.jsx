import { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaEnvelope,
  FaUser,
  FaBriefcase,
  FaUserTie,
  FaSort,
  FaEye,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import AdminTableSkeleton from "../../../../Components/AdminTableSkeleton/AdminTableSkeleton";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  // Demo data matching your requirements
  const demoUsers = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "Job Seeker",
      image:
        "https://res.cloudinary.com/dmfsmcy2y/image/upload/v1759741106/Job%20Hunting/udfo2zthr1rydxzvekfb.jpg",
      bio: "Senior Frontend Developer",
      joinDate: "2023-05-15",
      status: "active",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@dev.com",
      role: "Job Seeker",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      bio: "Full Stack Developer",
      joinDate: "2023-08-10",
      status: "active",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@recruit.com",
      role: "Recruiter",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      bio: "Talent Acquisition Specialist",
      joinDate: "2023-01-05",
      status: "active",
    },
  ];

  // Simulate loading and set users
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(demoUsers);
      setFilteredUsers(demoUsers);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  });

  // Handle search and filter
  useEffect(() => {
    let results = users;

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      results = results.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(results);
  }, [searchTerm, roleFilter, users]);

  // Handle responsive view mode
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setViewMode("grid");
      } else {
        setViewMode("table");
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => {
    if (viewMode === "table") {
      return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    User
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Joined
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AdminTableSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="border rounded-xl p-4 bg-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="h-8 bg-gray-300 rounded w-16"></div>
                <div className="h-8 bg-gray-300 rounded w-8"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-[1920px] mx-auto p-4 md:p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Manage all registered users, recruiters, and job seekers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">248</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FaUser className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Job Seekers</p>
                <p className="text-2xl font-bold text-gray-900">184</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <FaBriefcase className="text-[#3c8f63] text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Recruiters</p>
                <p className="text-2xl font-bold text-gray-900">64</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <FaUserTie className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Today</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <FaEye className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or bio..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8f63] focus:border-transparent outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <select
                  className="appearance-none w-full sm:w-48 pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c8f63] focus:border-transparent outline-none bg-white"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="Recruiter">Recruiters Only</option>
                  <option value="Job Seeker">Job Seekers Only</option>
                </select>
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="hidden lg:flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className={`px-4 py-3 ${
                    viewMode === "table"
                      ? "bg-[#3c8f63] text-white"
                      : "bg-white text-gray-600"
                  }`}
                  onClick={() => setViewMode("table")}
                >
                  Table
                </button>
                <button
                  className={`px-4 py-3 ${
                    viewMode === "grid"
                      ? "bg-[#3c8f63] text-white"
                      : "bg-white text-gray-600"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filteredUsers.length}</span>{" "}
              users
              {searchTerm && ` for "${searchTerm}"`}
              {roleFilter !== "all" && ` • ${roleFilter}s only`}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* Table View (Desktop) */}
            {viewMode === "table" ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">
                          User
                        </th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">
                          Role
                        </th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">
                          Joined
                        </th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <img
                                  src={user.image}
                                  alt={user.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/40";
                                  }}
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {user.name}
                                </p>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                  <MdEmail className="text-xs" />
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              {user.role === "Recruiter" ? (
                                <>
                                  <FaUserTie className="text-purple-600" />
                                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                                    {user.role}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <FaBriefcase className="text-[#3c8f63]" />
                                  <span className="px-3 py-1 bg-emerald-50 text-[#3c8f63] rounded-full text-sm font-medium">
                                    {user.role}
                                  </span>
                                </>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {user.bio}
                            </p>
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  user.status === "active"
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              ></div>
                              <span
                                className={`font-medium ${
                                  user.status === "active"
                                    ? "text-green-700"
                                    : "text-gray-600"
                                }`}
                              >
                                {user.status.charAt(0).toUpperCase() +
                                  user.status.slice(1)}
                              </span>
                            </div>
                          </td>

                          <td className="py-4 px-6 text-gray-600">
                            {formatDate(user.joinDate)}
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <FaEnvelope className="text-lg" />
                              </button>
                              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <FaEye className="text-lg" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                  <div className="text-center py-16">
                    <FaSearch className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No users found
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Try adjusting your search or filter to find what you're
                      looking for.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Grid View (Mobile/Tablet) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/48";
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500">{user.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {user.bio}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MdEmail className="mr-1" />
                        <span className="truncate">{user.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            user.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <span className="text-xs font-medium">
                          {user.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <FaEnvelope />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <FaEye />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State for Grid */}
                {filteredUsers.length === 0 && (
                  <div className="col-span-full text-center py-16 border-2 border-dashed border-gray-300 rounded-xl">
                    <FaSearch className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No users found
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Try adjusting your search or filter to find what you're
                      looking for.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;
