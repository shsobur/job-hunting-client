import {
  FaRocket,
  FaCheckCircle,
  FaFlag,
  FaEye,
  FaLinkedin,
  FaTwitter,
  FaWrench,
  FaCode,
  FaChartLine,
  FaBullhorn,
  FaBuilding,
  FaHeadset,
  FaGlobe,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendar,
} from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import AboutModal from "../../../Components/RecUpdateModal/AboutModal/AboutModal";
import DepartmentModal from "../../../Components/RecUpdateModal/DepartmentModal/DepartmentModal";
import CompanyDetailsModal from "../../../Components/RecUpdateModal/CompanyInfo/CompanyInfo";
import SocialLinksModal from "../../../Components/RecUpdateModal/SocialModal/SocialModal";
import "./RecruiterProfile.css";
import ProfileModal from "../../../Components/RecUpdateModal/ProfileModal/ProfileModal";
import useUserData from "../../../Hooks/userData";
import placeholderImage from "../../../assets/place_banner.png";
import People from "../../../Components/RecUpdateModal/People/People";

const RecruiterProfile = () => {
  const { profile } = useUserData();

  // Department icons mapping__
  const departmentIcons = {
    "Engineering / Development": <FaCode className="department-icon" />,
    "Human Resources (HR)": <FaHeadset className="department-icon" />,
    "Business Development": <FaChartLine className="department-icon" />,
    "Media & Communications": <FaBullhorn className="department-icon" />,
    "UX / UI Design": <FaWrench className="department-icon" />,
    "Data & Analytics": <FaChartLine className="department-icon" />,
    Sales: <FaChartLine className="department-icon" />,
    Marketing: <FaBullhorn className="department-icon" />,
    Finance: <FaBuilding className="department-icon" />,
    Administration: <FaBuilding className="department-icon" />,
    "Content / Editorial": <FaBullhorn className="department-icon" />,
    "Customer Support / Service": <FaHeadset className="department-icon" />,
    "Design / Creative": <FaWrench className="department-icon" />,
    "Digital Strategy / Innovation": (
      <FaChartLine className="department-icon" />
    ),
    "Facilities / Maintenance": <FaBuilding className="department-icon" />,
    "Finance / Accounting": <FaBuilding className="department-icon" />,
    "IT / Information Technology": <FaCode className="department-icon" />,
    "Legal / Compliance": <FaBuilding className="department-icon" />,
    Operations: <FaBuilding className="department-icon" />,
    "Procurement / Purchasing": <FaBuilding className="department-icon" />,
    "Product Management": <FaChartLine className="department-icon" />,
    "Production / Manufacturing": <FaWrench className="department-icon" />,
    "Project Management": <FaChartLine className="department-icon" />,
    "Public Relations (PR)": <FaBullhorn className="department-icon" />,
    "Quality Assurance (QA)": <FaWrench className="department-icon" />,
    "Research & Development (R&D)": <FaWrench className="department-icon" />,
    "Security / Risk Management": <FaBuilding className="department-icon" />,
    "Social Media / Community Management": (
      <FaBullhorn className="department-icon" />
    ),
    "Supply Chain / Logistics": <FaBuilding className="department-icon" />,
    "Training / Learning & Development": (
      <FaHeadset className="department-icon" />
    ),
  };

  // Get department icon or default__
  const getDepartmentIcon = (departmentName) => {
    return (
      departmentIcons[departmentName] || (
        <FaBuilding className="department-icon" />
      )
    );
  };

  // Format company size__
  const getCompanySize = () => {
    if (!profile?.companySize) return "Not specified";

    const { currentEmployees, sizeRange } = profile.companySize;

    if (currentEmployees && sizeRange) {
      return `${currentEmployees} employees (${sizeRange})`;
    } else if (currentEmployees) {
      return `${currentEmployees} employees`;
    } else if (sizeRange) {
      return sizeRange;
    }

    return "Not specified";
  };

  // Format headquarters__
  const getHeadquarters = () => {
    if (!profile?.headquarters) return "Not specified";

    const { country, city, area } = profile.headquarters;
    const parts = [area, city, country].filter(Boolean);

    return parts.length > 0 ? parts.join(", ") : "Not specified";
  };

  // Format branches__
  const getBranches = () => {
    if (!profile?.branchLocations || profile.branchLocations.length === 0) {
      return "No branches";
    }

    return `${profile.branchLocations.length} branch${
      profile.branchLocations.length > 1 ? "es" : ""
    }`;
  };

  // Check if social links exist__
  const hasSocialLinks = () => {
    return (
      profile?.social?.linkedin ||
      profile?.social?.x ||
      (profile?.social?.additionalLinks &&
        Object.keys(profile.social.additionalLinks).length > 0)
    );
  };

  return (
    <>
      {/* All update modal component__ */}
      <ProfileModal></ProfileModal>
      <AboutModal></AboutModal>
      <DepartmentModal></DepartmentModal>
      <CompanyDetailsModal></CompanyDetailsModal>
      <People></People>
      <SocialLinksModal></SocialLinksModal>

      <section id="recruiter_profile_container">
        <div className="recruiter-container">
          <div className="recruiter-content">
            {/* Header Section */}
            <div className="profile-header">
              <div className="header-content">
                <div className="company-avatar-container">
                  <div
                    className="company-avatar"
                    style={{
                      backgroundImage: `url("${
                        profile?.companyLogo || placeholderImage
                      }")`,
                    }}
                  ></div>
                </div>

                <div className="company-info">
                  <h1 className="company-name">
                    {profile?.companyName || "Your Company Name"}
                  </h1>
                  <p className="company-meta">
                    {profile?.bio || "Add a compelling bio about your company"}
                  </p>

                  <div className="status-badges">
                    {profile?.activeHire && (
                      <span className="status-badge">
                        <FaRocket className="badge-icon" />
                        Active Hiring
                      </span>
                    )}

                    <span
                      className={`status-badge ${
                        !profile?.verified ? "status-badge-unverified" : ""
                      }`}
                    >
                      <FaCheckCircle className="badge-icon" />
                      {profile?.verified ? "Verified" : "Unverified"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    document
                      .getElementById("rec_profile_update_modal")
                      .showModal()
                  }
                  className="header-edit-btn"
                >
                  <FiEdit className="edit-icon" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="profile-navigation">
              <nav className="nav-tabs">
                <a href="#" className="nav-tab active">
                  Overview
                </a>
                <a href="#" className="nav-tab">
                  Jobs
                </a>
                <a href="#" className="nav-tab">
                  Candidates
                </a>
                <a href="#" className="nav-tab">
                  Analytics
                </a>
              </nav>
            </div>

            {/* Main Content Grid */}
            <div className="profile-main-grid">
              {/* Left Column - Main Content */}
              <main className="profile-main-content">
                {/* About Us Section */}
                <section className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">About Us</h2>
                    <button
                      className="section-edit-btn"
                      onClick={() =>
                        document
                          .getElementById("rec_about_update_modal")
                          .showModal()
                      }
                    >
                      <FiEdit className="edit-icon" />
                    </button>
                  </div>

                  <div className="about-content">
                    <p className="about-description">
                      {profile?.description || (
                        <span className="text-gray-500 italic">
                          Tell us about your company's history, values, and what
                          makes it unique. This helps candidates understand your
                          culture and mission.
                        </span>
                      )}
                    </p>

                    <div className="mission-vision-grid">
                      <div className="mission-card">
                        <div className="card-icon-container">
                          <FaFlag className="card-icon" />
                        </div>
                        <h3 className="card-title">Mission</h3>
                        <p className="card-description">
                          {profile?.mission || (
                            <span className="text-gray-500 italic">
                              What's your company's core purpose and what it
                              aims to achieve?
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="vision-card">
                        <div className="card-icon-container">
                          <FaEye className="card-icon" />
                        </div>
                        <h3 className="card-title">Vision</h3>
                        <p className="card-description">
                          {profile?.vision || (
                            <span className="text-gray-500 italic">
                              Describe the future your company aspires to
                              create.
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Departments Section */}
                <section className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">
                      Departments{" "}
                      {profile?.departments &&
                        `(${profile.departments.length})`}
                    </h2>
                    <button
                      className="section-edit-btn"
                      onClick={() =>
                        document
                          .getElementById("rec_department_update_modal")
                          .showModal()
                      }
                    >
                      <FiEdit className="edit-icon" />
                    </button>
                  </div>

                  {profile?.departments && profile.departments.length > 0 ? (
                    <div className="departments-grid">
                      {profile.departments.map((department, index) => (
                        <div key={index} className="department-card">
                          {getDepartmentIcon(department)}
                          <span className="department-name">{department}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <FaBuilding className="empty-state-icon w-full" />
                      <p className="empty-state-text">
                        No departments added yet
                      </p>
                      <p className="empty-state-subtext">
                        Add your company departments to show candidates your
                        organizational structure
                      </p>
                    </div>
                  )}
                </section>

                {/* Gallery Section - Keeping static for now since no data in DB */}
                <section className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Company Gallery</h2>
                    <button className="section-edit-btn">
                      <FiEdit className="edit-icon" />
                    </button>
                  </div>

                  <div className="empty-state">
                    <FaEye className="empty-state-icon w-full" />
                    <p className="empty-state-text">Gallery coming soon</p>
                    <p className="empty-state-subtext">
                      Showcase your workplace and company culture through photos
                    </p>
                  </div>
                </section>
              </main>

              {/* Right Column - Sidebar */}
              <aside className="profile-sidebar">
                {/* Company Details Card */}
                <div className="sidebar-card">
                  <div className="card-header">
                    <h3 className="card-title">Company Details</h3>
                    <button
                      className="card-edit-btn"
                      onClick={() =>
                        document
                          .getElementById("res_company_details_modal")
                          .showModal()
                      }
                    >
                      <FiEdit className="edit-icon" />
                    </button>
                  </div>

                  <div className="details-list">
                    <div className="detail-item">
                      <span className="detail-label">
                        <FaGlobe className="detail-icon" />
                        Website
                      </span>
                      {profile?.companyWebsite ? (
                        <a
                          href={profile.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="detail-value link"
                        >
                          {profile.companyWebsite.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        <span className="detail-value text-gray-500">
                          Not added
                        </span>
                      )}
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">
                        <FaBuilding className="detail-icon" />
                        Industry
                      </span>
                      <span className="detail-value">
                        {profile?.industry || "Not specified"}
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">
                        <FaUsers className="detail-icon" />
                        Company size
                      </span>
                      <span className="detail-value">{getCompanySize()}</span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">
                        <FaCalendar className="detail-icon" />
                        Founded
                      </span>
                      <span className="detail-value">
                        {profile?.foundedYear || "Not specified"}
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">
                        <FaMapMarkerAlt className="detail-icon" />
                        Headquarters
                      </span>
                      <span className="detail-value">{getHeadquarters()}</span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">
                        <FaCodeBranch className="detail-icon" />
                        Branches
                      </span>
                      <span className="detail-value">{getBranches()}</span>
                    </div>
                  </div>
                </div>

                {/* Key People Card */}
                <div className="sidebar-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      Key People{" "}
                      {profile?.keyPeople && `(${profile.keyPeople.length})`}
                    </h3>
                    <button
                      onClick={() =>
                        document
                          .getElementById("rec_people_update_modal")
                          .showModal()
                      }
                      className="card-edit-btn"
                    >
                      <FiEdit className="edit-icon" />
                    </button>
                  </div>

                  {profile?.keyPeople && profile.keyPeople.length > 0 ? (
                    <div className="people-list">
                      {profile.keyPeople.map((person, index) => (
                        <div key={index} className="person-card">
                          <div
                            className="person-avatar"
                            style={{
                              backgroundImage: `url("${person.image}")`,
                            }}
                          ></div>
                          <div className="person-info">
                            <h4 className="person-name">{person.name}</h4>
                            <p className="person-role">{person.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state-small">
                      <FaUsers className="empty-state-icon w-full" />
                      <p className="empty-state-text">No key people added</p>
                      <p className="empty-state-subtext">
                        Add your leadership team members
                      </p>
                    </div>
                  )}
                </div>

                {/* Social Links Card */}
                <div className="sidebar-card">
                  <div className="card-header">
                    <h3 className="card-title">Social Links</h3>
                    <button
                      className="card-edit-btn"
                      onClick={() =>
                        document
                          .getElementById("res_social_links_modal")
                          .showModal()
                      }
                    >
                      <FiEdit className="edit-icon" />
                    </button>
                  </div>

                  {hasSocialLinks() ? (
                    <div className="social-links">
                      {profile?.social?.linkedin && (
                        <a
                          href={profile.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {profile?.social?.x && (
                        <a
                          href={profile.social.x}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          aria-label="Twitter"
                        >
                          <FaTwitter />
                        </a>
                      )}
                      {/* Additional social links can be added here */}
                    </div>
                  ) : (
                    <div className="empty-state-small">
                      <FaLinkedin className="empty-state-icon w-full" />
                      <p className="empty-state-text">No social links</p>
                      <p className="empty-state-subtext">
                        Add your social media profiles
                      </p>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecruiterProfile;