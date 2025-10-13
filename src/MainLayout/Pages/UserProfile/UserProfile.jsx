import "./UserProfile.css";
import useUserData from "../../../Hooks/userData";
import placeholderImage from "../../../assets/place_banner.png";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";
import AboutModal from "../../../Components/UserUpdateModal/AboutModal/AboutModal";
import SkillModal from "../../../Components/UserUpdateModal/SkillModal/SkillModal";
import BannerModal from "../../../Components/UserUpdateModal/BannerModal/BannerModal";
import ContactModal from "../../../Components/UserUpdateModal/ContactModal/ContactModal";
import ProfileModal from "../../../Components/UserUpdateModal/ProfileModal/ProfileModal";
import ProjectModal from "../../../Components/UserUpdateModal/ProjectModal/ProjectModal";
import LanguageModal from "../../../Components/UserUpdateModal/LanguageModal/LanguageModal";
import EducationModal from "../../../Components/UserUpdateModal/EducationModal/EducationModal";
import ExperienceModal from "../../../Components/UserUpdateModal/ExperienceModal/ExperienceModal";
import CertificateModal from "../../../Components/UserUpdateModal/CertificateModal/CertificateModal";

// Package__
import { FaLinkedin, FaGithub, FaReact } from "react-icons/fa";
import {
  FiEdit,
  FiPhone,
  FiMapPin,
  FiLink,
  FiAward,
  FiMail,
} from "react-icons/fi";
import { SiGraphql } from "react-icons/si";
import { IoSchoolOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PiBuildingApartmentBold } from "react-icons/pi";
import LoadingScreen from "../../../Components/LoadingScreen/LoadingScreen";

const UserProfile = () => {
  const { profile, isLoading } = useUserData();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <section id="main_profile_container">
        {/* All modals__ */}
        <ContactModal></ContactModal>
        <LanguageModal></LanguageModal>
        <BannerModal></BannerModal>
        <ProfileModal></ProfileModal>
        <AboutModal></AboutModal>
        <ExperienceModal></ExperienceModal>
        <EducationModal></EducationModal>
        <SkillModal></SkillModal>
        <ProjectModal></ProjectModal>
        <CertificateModal></CertificateModal>

        {/* Main container with max width and padding */}
        <div className="profile-container">
          {/* Grid layout for sidebar and main content */}
          <div className="profile-grid">
            {/* Sidebar - hidden on mobile, visible on large screens */}
            <aside className="profile-sidebar">
              {/* Quick Stats section without edit button */}
              <div className="profile-card desktop-view-only">
                <h3 className="profile-card-title section-title-line">
                  Quick Stats
                </h3>
                <div className="stats-container">
                  <div className="stat-item">
                    <p className="stat-number">
                      {profile?.projects?.length || 0}
                    </p>
                    <p className="stat-label">Projects</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-number">
                      {profile?.skills?.length || 0}
                    </p>
                    <p className="stat-label">Skills</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-number">
                      {profile?.certifications?.length || 0}
                    </p>
                    <p className="stat-label">Certifications</p>
                  </div>
                </div>
              </div>

              {/* Open to Work status badge */}
              <div className="profile-card tab-view-only">
                <div className="status-section">
                  <h3 className="profile-card-title section-title-line">
                    Availability
                  </h3>
                  {profile?.openToWork === true ? (
                    <span className="status-badge open-status">
                      <span className="status-dot"></span>
                      Open to Work
                    </span>
                  ) : (
                    <span className="status-badge closed-status">
                      <span className="status-dot closed"></span>
                      Not Available
                    </span>
                  )}
                </div>
              </div>

              {/* Contact information with edit button */}
              <div className="profile-card desktop-view-only">
                <button
                  onClick={() =>
                    document.getElementById("contact_update_modal").showModal()
                  }
                  className="card-edit-button"
                >
                  <FiEdit className="edit-icon" />
                </button>
                <h3 className="profile-card-title section-title-line">
                  Contact Info
                </h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <FiMapPin className="contact-icon" />
                    <span className="contact-text">
                      {!profile?.location?.city && !profile?.location?.country
                        ? "Location not set"
                        : `${profile?.location?.city || ""}${
                            profile?.location?.city &&
                            profile?.location?.country
                              ? ", "
                              : ""
                          }${profile?.location?.country || ""}`}
                    </span>
                  </div>
                  <div className="contact-item">
                    <FiMail className="contact-icon" />
                    <a
                      className="contact-link"
                      href={`mailto:${profile?.userEmail}`}
                    >
                      {profile?.userEmail || "Email not set"}
                    </a>
                  </div>
                  <div className="contact-item">
                    <FiPhone className="contact-icon" />
                    <span className="contact-text">
                      {profile?.number || "Phone not set"}
                    </span>
                  </div>
                </div>

                {/* Social media links */}
                <div className="social-links">
                  <a
                    className={`social-link ${
                      !profile?.social?.linkedin ? "disabled" : ""
                    }`}
                    href={profile?.social?.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={24} className="social-icon" />
                  </a>

                  <a
                    className={`social-link ${
                      !profile?.social?.github ? "disabled" : ""
                    }`}
                    href={profile?.social?.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={24} className="social-icon" />
                  </a>

                  <a
                    className={`social-link ${
                      !profile?.social?.portfolio ? "disabled" : ""
                    }`}
                    href={profile?.social?.portfolio || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiLink size={24} className="social-icon" />
                  </a>
                </div>
              </div>

              {/* Languages section with edit button */}
              <div className="profile-card desktop-view-only">
                <button
                  className="card-edit-button"
                  onClick={() =>
                    document.getElementById("language_update_modal").showModal()
                  }
                >
                  <FiEdit className="edit-icon" />
                </button>
                <h3 className="profile-card-title section-title-line">
                  Languages
                </h3>
                <div className="language-tags">
                  {!profile?.languages || profile.languages.length === 0 ? (
                    <span className="no-data-text">No languages added</span>
                  ) : (
                    profile.languages.map((lang) => (
                      <div key={lang.id} className="language-item">
                        <span className="language-name">{lang.name}</span>
                        <span className="language-proficiency">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </aside>

            {/* Main content area */}
            <main className="profile-main">
              {/* Profile header with banner and avatar */}
              <div className="profile-header-card">
                <button
                  className="header-edit-button"
                  onClick={() =>
                    document.getElementById("banner_update_modal").showModal()
                  }
                >
                  <FiEdit className="edit-icon" />
                </button>
                <div
                  className="header-banner"
                  style={{
                    backgroundImage: `url("${
                      profile?.profileBanner === ""
                        ? placeholderImage
                        : profile?.profileBanner
                    }")`,
                  }}
                ></div>
                <div className="header-content ">
                  <div className="profile-info-container w-full">
                    <button
                      className="mt-[60px] card-edit-button"
                      onClick={() =>
                        document
                          .getElementById("profile_update_modal")
                          .showModal()
                      }
                    >
                      <FiEdit className="edit-icon" />
                    </button>
                    <div className="profile-avatar-container">
                      <div
                        className="profile-avatar"
                        style={{
                          backgroundImage: `url("${
                            profile?.profilePhoto === ""
                              ? placeholderImage
                              : profile?.profilePhoto
                          }")`,
                        }}
                      ></div>
                    </div>

                    <div className="profile-details">
                      <div className="profile-details-content">
                        <div className="mobile-status-container">
                          {profile?.openToWork === true ? (
                            <span className="status-badge open-status">
                              <span className="status-dot"></span>
                              Open to Work
                            </span>
                          ) : (
                            <span className="status-badge closed-status">
                              <span className="status-dot closed"></span>
                              Not Available
                            </span>
                          )}
                        </div>
                        <h2 className="profile-name">
                          {profile?.userName || "Your Name"}
                        </h2>
                        <p className="profile-title">
                          {profile?.bio || "Your professional bio"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile contact info (visible only on small screens) */}
              <div className="profile-card mobile-contact-info">
                <button
                  className="card-edit-button"
                  onClick={() =>
                    document.getElementById("contact_update_modal").showModal()
                  }
                >
                  <FiEdit className="edit-icon" />
                </button>
                <h3 className="card-title-lg">Contact Info</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <FiMapPin className="contact-icon" />
                    <span className="contact-text">
                      {!profile?.location?.city && !profile?.location?.country
                        ? "Location not set"
                        : `${profile?.location?.city || ""}${
                            profile?.location?.city &&
                            profile?.location?.country
                              ? ", "
                              : ""
                          }${profile?.location?.country || ""}`}
                    </span>
                  </div>
                  <div className="contact-item">
                    <FiMail className="contact-icon" />
                    <a
                      className="contact-link"
                      href={`mailto:${profile?.userEmail}`}
                    >
                      {profile?.userEmail || "Email not set"}
                    </a>
                  </div>
                  <div className="contact-item">
                    <FiPhone className="contact-icon" />
                    <span className="contact-text">
                      {profile?.number || "Phone not set"}
                    </span>
                  </div>
                </div>

                <div className="social-links">
                  <a
                    className={`social-link ${
                      !profile?.social?.linkedin ? "disabled" : ""
                    }`}
                    href={profile?.social?.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={24} className="social-icon" />
                  </a>

                  <a
                    className={`social-link ${
                      !profile?.social?.github ? "disabled" : ""
                    }`}
                    href={profile?.social?.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={24} className="social-icon" />
                  </a>

                  <a
                    className={`social-link ${
                      !profile?.social?.portfolio ? "disabled" : ""
                    }`}
                    href={profile?.social?.portfolio || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiLink size={24} className="social-icon" />
                  </a>
                </div>
              </div>

              {/* About section */}
              <div className="profile-card">
                <button
                  className="card-edit-button"
                  onClick={() =>
                    document.getElementById("about_update_modal").showModal()
                  }
                >
                  <FiEdit className="edit-icon" />
                </button>
                <h3 className="card-title-lg  section-title-line">About</h3>
                <p className="about-text">
                  {profile?.headline ||
                    "Tell us about yourself! Share your professional journey, passions, and what drives you in your career."}
                </p>
              </div>

              {/* Experience section with timeline */}
              <div className="profile-card">
                <button
                  className="card-edit-button"
                  onClick={() =>
                    document
                      .getElementById("experience_update_modal")
                      .showModal()
                  }
                >
                  <FiEdit className="edit-icon" />
                </button>

                <h3 className="card-title-lg section-title-line">Experience</h3>

                {!profile?.experience || profile.experience.length === 0 ? (
                  <div className="empty-state">
                    <HiOutlineBuildingOffice2
                      size={48}
                      className="empty-icon w-full"
                    />
                    <p className="empty-text">No experience added yet</p>
                    <p className="empty-subtext">
                      Share your professional journey to showcase your expertise
                    </p>
                  </div>
                ) : (
                  <div className="timeline">
                    {profile.experience.map((exp, index) => (
                      <div key={index} className="timeline-item">
                        <div
                          className={
                            exp?.isCurrent
                              ? "timeline-dot current"
                              : "timeline-dot past"
                          }
                        ></div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <h4 className="timeline-company">
                              <PiBuildingApartmentBold className="inline-icon" />
                              {exp?.company}
                            </h4>
                            <span
                              className={`timeline-status ${
                                exp?.isCurrent ? "current" : "past"
                              }`}
                            >
                              {exp?.status}
                            </span>
                          </div>
                          <p className="timeline-role">{exp?.position}</p>
                          <div className="timeline-meta">
                            <span className="timeline-period">
                              {exp?.startDate} - {exp?.endDate}
                            </span>
                            <span className="timeline-location">
                              {exp?.location}
                            </span>
                          </div>
                          {exp?.description && (
                            <p className="timeline-description">
                              {exp?.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Education section */}
              <div className="profile-card">
                <button
                  className="card-edit-button"
                  onClick={() =>
                    document
                      .getElementById("education_update_modal")
                      .showModal()
                  }
                >
                  <FiEdit className="edit-icon" />
                </button>
                <h3 className="card-title-lg section-title-line">Education</h3>
                <div className="education-list">
                  {!profile?.education || profile.education.length === 0 ? (
                    <div className="empty-state">
                      <IoSchoolOutline
                        size={48}
                        className="empty-icon w-full"
                      />
                      <p className="empty-text">No education added yet</p>
                      <p className="empty-subtext">
                        Add your educational background
                      </p>
                    </div>
                  ) : (
                    profile.education.map((edu, index) => (
                      <div key={index} className="education-item">
                        <div className="education-header">
                          <IoSchoolOutline className="education-icon" />
                          <div>
                            <h4 className="education-level">{edu?.level}</h4>
                            <p className="education-institution">
                              <HiOutlineBuildingOffice2 className="inline-icon" />
                              {edu?.institute}
                            </p>
                          </div>
                        </div>
                        <div className="education-details">
                          <p className="education-department">
                            {edu?.department}
                          </p>
                          <p className="education-period">
                            {edu?.startYear} - {edu?.endYear}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Skills section */}
              <div className="profile-card">
                <button
                  className="card-edit-button"
                  onClick={() =>
                    document.getElementById("skill_update_modal").showModal()
                  }
                >
                  <FiEdit className="edit-icon" />
                </button>

                <h3 className="card-title-lg section-title-line">Skills</h3>

                <div className="skill-tags">
                  {!profile?.skills || profile.skills.length === 0 ? (
                    <span className="no-data-text">No skills added yet</span>
                  ) : (
                    profile.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Mobile languages section (visible only on small screens) */}
              <div className="profile-card mobile-languages">
                <button
                  className="card-edit-button"
                  onClick={() =>
                    document.getElementById("language_update_modal").showModal()
                  }
                >
                  <FiEdit className="edit-icon" />
                </button>
                <h3 className="card-title-lg section-title-line">Languages</h3>

                <div className="language-tags">
                  {!profile?.languages || profile.languages.length === 0 ? (
                    <span className="no-data-text">No languages added</span>
                  ) : (
                    profile.languages.map((lang) => (
                      <div key={lang.id} className="language-item">
                        <span className="language-name">{lang.name}</span>
                        <span className="language-proficiency">
                          {lang.proficiency}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Projects section */}
              <div className="profile-card">
                <button
                  className="card-edit-button"
                  onClick={() =>
                    document.getElementById("project_update_modal").showModal()
                  }
                >
                  <FiEdit className="edit-icon" />
                </button>

                <h3 className="card-title-lg section-title-line">Projects</h3>

                <div className="project-grid">
                  {!profile?.projects || profile.projects.length === 0 ? (
                    <>
                      <div className="empty-state">
                        <FaReact size={48} className="empty-icon w-full" />
                        <p className="empty-text">No projects added yet</p>
                        <p className="empty-subtext">
                          Showcase your work and achievements
                        </p>
                      </div>
                      <div className="empty-state">
                        <FaReact size={48} className="empty-icon w-full" />
                        <p className="empty-text">No projects added yet</p>
                        <p className="empty-subtext">
                          Showcase your work and achievements
                        </p>
                      </div>
                    </>
                  ) : (
                    profile.projects.map((project, index) => (
                      <div key={index} className="project-card">
                        <h4 className="project-title">{project?.title}</h4>
                        <p className="project-description">
                          {project?.description}
                        </p>
                        <div className="project-footer">
                          <div className="project-tags">
                            {project?.skills?.map((skill, skillIndex) => (
                              <span key={skillIndex} className="project-tag">
                                <SiGraphql className="inline-icon" />
                                {skill}
                              </span>
                            ))}
                          </div>
                          <a className="project-link" href="#">
                            View Project →
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Certifications section */}
              <div className="profile-card">
                <button
                  className="card-edit-button"
                  onClick={() =>
                    document
                      .getElementById("certificate_update_modal")
                      .showModal()
                  }
                >
                  <FiEdit className="edit-icon" />
                </button>
                <h3 className="card-title-lg section-title-line">
                  Certifications
                </h3>
                <div className="certification-list">
                  {!profile?.certifications ||
                  profile.certifications.length === 0 ? (
                    <div className="empty-state">
                      <FiAward size={48} className="empty-icon w-full" />
                      <p className="empty-text">No certifications added yet</p>
                      <p className="empty-subtext">
                        Add your professional certifications
                      </p>
                    </div>
                  ) : (
                    profile.certifications.map((cert, index) => (
                      <div key={index} className="certification-item">
                        <FiAward className="certification-icon" />
                        <div className="certification-details">
                          <p className="certification-name">{cert.name}</p>
                          <p className="certification-issuer">{cert.issuer}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
