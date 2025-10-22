import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaBriefcase,
  FaMoneyBillWave,
  FaStar,
  FaTimes,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Jobs = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    workType: [],
    salaryRange: "",
    experienceLevel: [],
  });

  // Sample job data
  const jobs = [
    {
      id: 1,
      position: "Front End Developer",
      company: "TechNova Solutions",
      logo: "💻",
      type: "Remote",
      experience: "Intermediate",
      salary: "15,000 - 20,000",
      salaryType: "month",
      posted: "2 days ago",
      featured: true,
    },
    {
      id: 2,
      position: "Senior React Developer",
      company: "DigitalCraft Inc",
      logo: "⚛️",
      type: "Hybrid",
      experience: "Senior",
      salary: "25,000 - 35,000",
      salaryType: "month",
      posted: "1 day ago",
      featured: false,
    },
    {
      id: 3,
      position: "UI/UX Designer",
      company: "CreativeMind Studio",
      logo: "🎨",
      type: "On-site",
      experience: "Junior",
      salary: "12,000 - 18,000",
      salaryType: "month",
      posted: "3 days ago",
      featured: true,
    },
  ];

  // Filter options
  const workTypes = ["Remote", "On-site", "Hybrid"];
  const salaryRanges = [
    "5,000 - 10,000",
    "10,000 - 20,000",
    "20,000 - 30,000",
    "30,000+",
  ];
  const experienceLevels = ["Junior", "Intermediate", "Senior", "Executive"];

  const handleWorkTypeChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      workType: prev.workType.includes(type)
        ? prev.workType.filter((t) => t !== type)
        : [...prev.workType, type],
    }));
  };

  const handleExperienceChange = (level) => {
    setFilters((prev) => ({
      ...prev,
      experienceLevel: prev.experienceLevel.includes(level)
        ? prev.experienceLevel.filter((l) => l !== level)
        : [...prev.experienceLevel, level],
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      workType: [],
      salaryRange: "",
      experienceLevel: [],
    });
  };

  return (
    <section className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-[1536px] mx-auto">
        {/* Mobile Filter Button */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-30">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-[#3c8f63] text-white rounded-lg font-semibold text-base"
          >
            <FaFilter className="text-sm" />
            Filters
          </button>
        </div>

        <div className="flex">
          {/* Filter Sidebar - Desktop - Fixed */}
          <div className="hidden lg:block w-[28%] sticky top-0 h-screen overflow-y-auto">
            <div className="p-6">
              <FilterSidebar
                filters={filters}
                workTypes={workTypes}
                salaryRanges={salaryRanges}
                experienceLevels={experienceLevels}
                onWorkTypeChange={handleWorkTypeChange}
                onExperienceChange={handleExperienceChange}
                onSalaryChange={(range) =>
                  setFilters((prev) => ({ ...prev, salaryRange: range }))
                }
                onClearFilters={clearAllFilters}
              />
            </div>
          </div>

          {/* Jobs List - Scrollable */}
          <div className="w-full lg:w-[72%]">
            <div className="p-4 lg:p-6">
              {/* Search Bar */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="text"
                      placeholder="Search jobs, companies, or keywords..."
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3c8f63] focus:border-transparent text-base"
                    />
                  </div>
                  <button className="px-8 py-4 bg-[#3c8f63] text-white rounded-lg font-semibold hover:bg-[#2a6b4a] transition-colors text-base whitespace-nowrap">
                    Search Jobs
                  </button>
                </div>
              </div>

              {/* Jobs Count and Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {jobs.length} Jobs Available
                </h2>
                <div className="text-gray-600 text-base">
                  Sorted by:{" "}
                  <span className="font-semibold text-[#3c8f63]">
                    Most Relevant
                  </span>
                </div>
              </div>

              {/* Jobs List */}
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsFilterOpen(false)}
            />

            {/* Filter Sidebar */}
            <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimes className="text-gray-600 text-lg" />
                </button>
              </div>

              <div className="p-4">
                <FilterSidebar
                  filters={filters}
                  workTypes={workTypes}
                  salaryRanges={salaryRanges}
                  experienceLevels={experienceLevels}
                  onWorkTypeChange={handleWorkTypeChange}
                  onExperienceChange={handleExperienceChange}
                  onSalaryChange={(range) =>
                    setFilters((prev) => ({ ...prev, salaryRange: range }))
                  }
                  onClearFilters={clearAllFilters}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Filter Sidebar Component__
const FilterSidebar = ({
  filters,
  workTypes,
  salaryRanges,
  experienceLevels,
  onWorkTypeChange,
  onExperienceChange,
  onSalaryChange,
  onClearFilters,
}) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
    {/* Header */}
    <div className="border-b border-gray-200 pb-4">
      <h3 className="text-xl font-bold text-gray-900">Filter Jobs</h3>
      <p className="text-gray-600 text-sm mt-1">Find your perfect job match</p>
    </div>

    {/* Work Type Filter */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
        <FaBriefcase className="text-[#3c8f63] text-xl" />
        Work Type
      </h4>
      <div className="space-y-3">
        {workTypes.map((type) => (
          <label
            key={type}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={filters.workType.includes(type)}
              onChange={() => onWorkTypeChange(type)}
              className="rounded border-gray-300 text-[#3c8f63] focus:ring-[#3c8f63] w-5 h-5"
            />
            <span className="text-gray-700 text-base group-hover:text-[#3c8f63] transition-colors">
              {type}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Salary Range Filter */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
        <FaMoneyBillWave className="text-[#3c8f63] text-xl" />
        Salary Range
      </h4>
      <div className="space-y-3">
        {salaryRanges.map((range) => (
          <button
            key={range}
            onClick={() => onSalaryChange(range)}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 text-base font-medium ${
              filters.salaryRange === range
                ? "border-[#3c8f63] bg-[#3c8f63] bg-opacity-10 text-[#3c8f63] shadow-sm"
                : "border-gray-200 text-gray-700 hover:border-[#3c8f63] hover:text-[#3c8f63] hover:bg-gray-50"
            }`}
          >
            ${range}
          </button>
        ))}
      </div>
    </div>

    {/* Experience Level Filter */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
        <FaStar className="text-[#3c8f63] text-xl" />
        Experience Level
      </h4>
      <div className="space-y-3">
        {experienceLevels.map((level) => (
          <label
            key={level}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={filters.experienceLevel.includes(level)}
              onChange={() => onExperienceChange(level)}
              className="rounded border-gray-300 text-[#3c8f63] focus:ring-[#3c8f63] w-5 h-5"
            />
            <span className="text-gray-700 text-base group-hover:text-[#3c8f63] transition-colors">
              {level}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Clear Filters */}
    <button
      onClick={onClearFilters}
      className="w-full py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-base"
    >
      Clear All Filters
    </button>
  </div>
);

// Job Card Component__
const JobCard = ({ job }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-[#3c8f63] hover:border-opacity-30">
    <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
      {/* Company Logo and Basic Info */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="flex-shrink-0 w-16 h-16 bg-[#3c8f63] bg-opacity-10 rounded-xl flex items-center justify-center">
          <span className="text-2xl">{job.logo}</span>
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                {job.position}
              </h3>
              <p className="text-lg text-gray-700 font-medium mb-2">
                {job.company}
              </p>
            </div>
          </div>

          {/* Job Meta - Improved spacing and typography */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2 text-gray-700">
              <FaBriefcase className="text-[#3c8f63] text-base" />
              <span className="text-base font-medium">{job.type}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaStar className="text-[#3c8f63] text-base" />
              <span className="text-base font-medium">{job.experience}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaMoneyBillWave className="text-[#3c8f63] text-base" />
              <span className="text-base font-medium">
                ${job.salary}/{job.salaryType}
              </span>
            </div>
          </div>

          {/* Posted Date */}
          <div className="flex items-center gap-2 text-gray-500 text-base">
            <FaClock className="text-sm" />
            <span>Posted {job.posted}</span>
          </div>
        </div>
      </div>

      {/* Apply Button - Improved responsiveness */}
      <div className="flex-shrink-0 lg:self-center">
        <button className="w-full lg:w-auto px-8 py-3 bg-[#3c8f63] text-white rounded-lg font-semibold hover:bg-[#2a6b4a] transition-colors text-base whitespace-nowrap shadow-sm hover:shadow-md">
          Apply Now
        </button>
      </div>
    </div>
  </div>
);

export default Jobs;