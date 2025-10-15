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
  FaLink,
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
import VerifyMessage from "../../../Components/VerifyMessage/VerifyMessage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useLoaderData, useParams } from "react-router";

const RecruiterProfile = () => {
  const { user } = useContext(AuthContext);
  const { email } = useParams();
  const profileData = useLoaderData();
  const { profile } = useUserData();
  const [dynamicData, setDynamicData] = useState(null);

  useEffect(() => {
    if (user?.email !== email) {
      setDynamicData(profileData);
    }
  }, [profileData, user, email]);

  // Use dynamicData if available, otherwise use profile__
  const data = dynamicData || profile;

  // Check if current user can edit this profile__
  const canEdit = user?.email === data?.userEmail;

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

  // Check if social links exist__
  const hasSocialLinks =
    data?.social?.linkedin ||
    data?.social?.x ||
    Object.keys(data?.social?.additionalLinks || {}).length > 0;

  return (
    <>
      {/* All update modal components */}
      <ProfileModal />
      <AboutModal />
      <DepartmentModal />
      <CompanyDetailsModal />
      <People />
      <SocialLinksModal />
      <VerifyMessage />

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
                        data?.companyLogo || placeholderImage
                      }")`,
                    }}
                  ></div>
                </div>

                <div className="company-info">
                  <h1 className="company-name">
                    {data?.companyName || "Your Company Name"}
                  </h1>
                  <p className="company-meta">
                    {data?.bio || "Add a compelling bio about your company"}
                  </p>

                  <div className="status-badges">
                    {data?.activeHire && (
                      <span className="status-badge">
                        <FaRocket className="badge-icon" />
                        Active Hiring
                      </span>
                    )}

                    <span
                      className={`status-badge ${
                        data?.verified === "Pending" ||
                        data?.verified === "Unverified"
                          ? "status-badge-unverified"
                          : ""
                      }`}
                    >
                      <FaCheckCircle className="badge-icon" />
                      {data?.verified || "Not Verified"}
                    </span>

                    {data?.verified === "Unverified" && (
                      <span
                        onClick={() =>
                          document
                            .getElementById("verify_message_modal")
                            .showModal()
                        }
                        className="profile_verify_btn"
                      >
                        Verify now
                      </span>
                    )}
                  </div>
                </div>

                {canEdit && (
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
                )}
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
                    {canEdit && (
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
                    )}
                  </div>

                  <div className="about-content">
                    <p className="about-description">
                      {data?.description || (
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
                          {data?.mission || (
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
                          {data?.vision || (
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
                      {data?.departments?.length
                        ? `(${data.departments.length})`
                        : ""}
                    </h2>
                    {canEdit && (
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
                    )}
                  </div>

                  {data?.departments?.length > 0 ? (
                    <div className="departments-grid">
                      {data.departments.map((department, index) => (
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

                {/* Gallery Section */}
                <section className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Company Gallery</h2>
                    {canEdit && (
                      <button className="section-edit-btn">
                        <FiEdit className="edit-icon" />
                      </button>
                    )}
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
                    {canEdit && (
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
                    )}
                  </div>

                  <div className="details-list">
                    <div className="detail-item">
                      <span className="detail-label">
                        <FaGlobe className="detail-icon" />
                        Website
                      </span>
                      {data?.companyWebsite ? (
                        <a
                          href={data.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="detail-value link"
                        >
                          {data.companyWebsite.replace(/^https?:\/\//, "")}
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
                        {data?.industry || "Not specified"}
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">
                        <FaUsers className="detail-icon" />
                        Company size
                      </span>
                      <span className="detail-value">
                        {data?.companySize?.currentEmployees || "0"} /{" "}
                        {data?.companySize?.sizeRange || "0"}
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">
                        <FaCalendar className="detail-icon" />
                        Founded
                      </span>
                      <span className="detail-value">
                        {data?.foundedYear || "Not specified"}
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">
                        <FaMapMarkerAlt className="detail-icon" />
                        Headquarters
                      </span>
                      <span className="detail-value">
                        {data?.headquarters ? (
                          <>
                            {data.headquarters.country} /{" "}
                            {data.headquarters.city} / {data.headquarters.area}
                          </>
                        ) : (
                          "Not specified"
                        )}
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">
                        <FaCodeBranch className="detail-icon" />
                        Branches
                      </span>
                      <span className="detail-value">No Branch</span>
                    </div>
                  </div>
                </div>

                {/* Key People Card */}
                <div className="sidebar-card">
                  <div className="card-header">
                    <h3 className="card-title">
                      Key People{" "}
                      {data?.keyPeople?.length
                        ? `(${data.keyPeople.length})`
                        : ""}
                    </h3>
                    {canEdit && (
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
                    )}
                  </div>

                  {data?.keyPeople?.length > 0 ? (
                    <div className="people-list">
                      {data.keyPeople.map((person, index) => (
                        <div key={index} className="person-card">
                          <div
                            className="person-avatar"
                            style={{
                              backgroundImage: `url("${
                                person?.image || placeholderImage
                              }")`,
                            }}
                          ></div>
                          <div className="person-info">
                            <h4 className="person-name">
                              {person?.name || "Unknown"}
                            </h4>
                            <p className="person-role">
                              {person?.position || "No position"}
                            </p>
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
                    {canEdit && (
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
                    )}
                  </div>

                  {hasSocialLinks ? (
                    <div className="social-links">
                      {data?.social?.linkedin && (
                        <a
                          href={data.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {data?.social?.x && (
                        <a
                          href={data.social.x}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          aria-label="Twitter"
                        >
                          <FaTwitter />
                        </a>
                      )}
                      {Object.entries(data?.social?.additionalLinks || {}).map(
                        ([platform, url]) =>
                          url && (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="social-link"
                              aria-label={platform}
                            >
                              <FaLink />
                            </a>
                          )
                      )}
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