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
              <div className="profile-card">
                <h3 className="profile-card-title">Quick Stats</h3>
                <div className="stats-container">
                  <div className="stat-item">
                    <p className="stat-number">{profile?.projects.length}</p>
                    <p className="stat-label">Projects</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-number">{profile?.skills.length}</p>
                    <p className="stat-label">Skills</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-number">
                      {profile?.certifications.length}
                    </p>
                    <p className="stat-label">Certifications</p>
                  </div>
                </div>
              </div>

              {/* Open to Work status badge */}
              <div className="profile-card">
                {profile?.openToWork === true ? (
                  <span className="status-badge">Open to Work</span>
                ) : (
                  "No"
                )}
                <div className="status-container"></div>
              </div>

              {/* Contact information with edit button */}

              <div className="profile-card">
                <button
                  onClick={() =>
                    document.getElementById("contact_update_modal").showModal()
                  }
                  className="card-edit-button"
                >
                  <FiEdit className="edit-icon" />
                </button>
                <h3 className="profile-card-title">Contact Info</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <FiMapPin className="contact-icon" />
                    <span className="contact-text">
                      {profile?.location.city === "" &&
                      profile?.location.country === ""
                        ? "N/A"
                        : `${profile?.location.city}, ${profile?.location.country}`}
                    </span>
                  </div>
                  <div className="contact-item">
                    <FiMail className="contact-icon" />
                    <a className="contact-link" href={profile?.userEmail}>
                      {profile?.userEmail}
                    </a>
                  </div>
                  <div className="contact-item">
                    <FiPhone className="contact-icon" />
                    <a className="contact-link" href="tel:+442079460958">
                      {profile?.number === "" ? "N/A" : profile?.number}
                    </a>
                  </div>
                </div>

                {/* Social media links */}
                <div className="social-links">
                  {profile?.social?.linkedin === "" ? (
                    <FaLinkedin
                      title="No link"
                      style={{ opacity: 0.08 }}
                      size={25}
                    ></FaLinkedin>
                  ) : (
                    <a
                      className="social-link"
                      href={profile?.social?.linkedin}
                      target="main"
                    >
                      <FaLinkedin size={30} className="social-icon" />
                    </a>
                  )}

                  {profile?.social?.github === "" ? (
                    <FaGithub
                      title="No link"
                      style={{ opacity: 0.08 }}
                      size={25}
                    ></FaGithub>
                  ) : (
                    <a
                      className="social-link"
                      href={profile?.social?.github}
                      target="main"
                    >
                      <FaGithub size={30} className="social-icon" />
                    </a>
                  )}

                  {profile?.social?.portfolio == "" ? (
                    <FiLink
                      title="No link"
                      style={{ opacity: 0.08 }}
                      size={25}
                    ></FiLink>
                  ) : (
                    <a
                      className="social-link"
                      href={profile?.social?.portfolio}
                      target="main"
                    >
                      <FiLink size={30} className="social-icon" />
                    </a>
                  )}
                </div>
              </div>

              {/* Languages section with edit button */}
              <div className="profile-card">
                <button className="card-edit-button">
                  <FiEdit
                    onClick={() =>
                      document
                        .getElementById("language_update_modal")
                        .showModal()
                    }
                    className="edit-icon"
                  />
                </button>
                <h3 className="profile-card-title">Languages</h3>
                <div className="language-tags">
                  {profile?.languages.length === 0
                    ? "N/A"
                    : profile?.languages.map((lang) => (
                        <span key={lang.id} className="language-tag">
                          <ul className="language-text-content">
                            <li>{lang.name}</li>
                            <li>{lang.proficiency}</li>
                          </ul>
                        </span>
                      ))}
                </div>
              </div>
            </aside>

            {/* Main content area */}
            <main className="profile-main">
              {/* Profile header with banner and avatar */}
              <div className="profile-header-card">
                <button className="header-edit-button">
                  <FiEdit
                    onClick={() =>
                      document.getElementById("banner_update_modal").showModal()
                    }
                    className="edit-icon"
                  />
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
                <div className="header-content">
                  <button className="header-edit-button-secondary">
                    <FiEdit
                      onClick={() =>
                        document
                          .getElementById("profile_update_modal")
                          .showModal()
                      }
                      className="edit-icon"
                    />
                  </button>
                  <div className="profile-info-container">
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
                          <span className="status-badge">Open to Work</span>
                        </div>
                        <h2 className="profile-name">{profile?.userName}</h2>
                        <p className="profile-title">{profile?.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile contact info (visible only on small screens) */}
              <div className="profile-card mobile-contact-info">
                <button className="card-edit-button">
                  <FiEdit
                    onClick={() =>
                      document
                        .getElementById("contact_update_modal")
                        .showModal()
                    }
                    className="edit-icon"
                  />
                </button>
                <h3 className="card-title-lg">Contact Info</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <FiMapPin className="contact-icon" />
                    <span className="contact-text">
                      {profile?.location.city === "" &&
                      profile?.location.country === ""
                        ? "N/A"
                        : `${profile?.location.city}, ${profile?.location.country}`}
                    </span>
                  </div>
                  <div className="contact-item">
                    <FiMail className="contact-icon" />
                    <a className="contact-link" href={profile?.userEmail}>
                      {profile?.userEmail}
                    </a>
                  </div>
                  <div className="contact-item">
                    <FiPhone className="contact-icon" />
                    <a className="contact-link">
                      {profile?.number === "" ? "N/A" : profile?.number}
                    </a>
                  </div>
                </div>

                <div className="social-links">
                  {profile?.social?.linkedin === "" ? (
                    <FaLinkedin
                      title="No link"
                      style={{ opacity: 0.08 }}
                      size={25}
                    ></FaLinkedin>
                  ) : (
                    <a className="social-link" href="#">
                      <FaLinkedin size={30} className="social-icon" />
                    </a>
                  )}

                  {profile?.social?.github === "" ? (
                    <FaGithub
                      title="No link"
                      style={{ opacity: 0.08 }}
                      size={25}
                    ></FaGithub>
                  ) : (
                    <a className="social-link" href="#">
                      <FaGithub size={30} className="social-icon" />
                    </a>
                  )}

                  {profile?.social?.portfolio == "" ? (
                    <FiLink
                      title="No link"
                      style={{ opacity: 0.08 }}
                      size={25}
                    ></FiLink>
                  ) : (
                    <a className="social-link" href="#">
                      <FiLink size={30} className="social-icon" />
                    </a>
                  )}
                </div>
              </div>

              {/* About section */}
              <div className="profile-card">
                <button className="card-edit-button">
                  <FiEdit
                    onClick={() =>
                      document.getElementById("about_update_modal").showModal()
                    }
                    className="edit-icon"
                  />
                </button>
                <h3 className="card-title-lg">About</h3>
                <p className="about-text whitespace-pre-line">
                  {profile?.headline === ""
                    ? "Tell us about yourself!"
                    : profile?.headline}
                </p>
              </div>

              {/* Experience section with timeline */}
              <div className="profile-card">
                <button className="card-edit-button">
                  <FiEdit
                    onClick={() =>
                      document
                        .getElementById("experience_update_modal")
                        .showModal()
                    }
                    className="edit-icon"
                  />
                </button>

                <h3 className="card-title-lg border-b-2 pb-2">Experience</h3>

                {profile?.experience.length === 0 ? (
                  <span className="mt-2 text-lg text-[#4B5563]">
                    No experience. I am fresher!
                  </span>
                ) : (
                  profile?.experience.map((exp) => (
                    <div key={exp.position} className="mt-10 timeline">
                      <div className="timeline-item">
                        <div
                          className={
                            exp?.isCurrent ? "timeline-dot" : "timeline-dot-two"
                          }
                        ></div>

                        <p className="flex items-center gap-2 text-[1.5em] font-semibold">
                          <PiBuildingApartmentBold size={27} /> {exp?.company}
                        </p>
                        <p className="timeline-role mb-3">{exp?.position}</p>
                        <p className="timeline-period">
                          • {exp?.startDate} - {exp?.endDate}
                        </p>
                        <p className="timeline-period">• {exp?.location}</p>

                        <p className="timeline-description mb-2 pl-3">
                          {exp?.description}
                        </p>
                        {exp?.isCurrent ? (
                          <p className="inline-block mt-2 px-2 py-1 bg-[#eef5f1] text-[#3C8F63] text-sm rounded">
                            {exp?.status}
                          </p>
                        ) : (
                          <p className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-500 text-sm rounded">
                            {exp?.status}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Education section */}
              <div className="profile-card">
                <button className="card-edit-button">
                  <FiEdit
                    onClick={() =>
                      document
                        .getElementById("education_update_modal")
                        .showModal()
                    }
                    className="edit-icon"
                  />
                </button>
                <h3 className="card-title-lg border-b-2 pb-2">Education</h3>
                <div className="education-list">
                  {profile?.education.length === 0
                    ? "N/A"
                    : profile?.education.map((edu) => (
                        <div key={edu.level} className="education-item">
                          <h2 className="flex items-center gap-2 mt-2 mb-5 text-2xl font-semibold">
                            <IoSchoolOutline size={28} />
                            {edu?.level}
                          </h2>
                          <h4 className="education-institution flex items-center gap-2">
                            <HiOutlineBuildingOffice2 size={22} />
                            {edu?.institute}
                          </h4>
                          <p className="education-department">
                            {edu?.department}
                          </p>
                          <p className="education-period">
                            {edu?.startYear} - {edu?.endYear}
                          </p>
                        </div>
                      ))}
                </div>
              </div>

              {/* Skills section */}
              <div className="profile-card">
                <button className="card-edit-button">
                  <FiEdit
                    onClick={() =>
                      document.getElementById("skill_update_modal").showModal()
                    }
                    className="edit-icon"
                  />
                </button>

                <h3 className="card-title-lg">Skills</h3>

                <div className="skill-tags">
                  {profile?.skills.length === 0
                    ? "N/A"
                    : profile?.skills.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                </div>
              </div>

              {/* Mobile languages section (visible only on small screens) */}
              <div className="profile-card mobile-languages">
                <button className="card-edit-button">
                  <FiEdit
                    onClick={() =>
                      document
                        .getElementById("language_update_modal")
                        .showModal()
                    }
                    className="edit-icon"
                  />
                </button>
                <h3 className="card-title-lg">Languages</h3>

                <div className="language-tags">
                  {profile?.languages.length === 0
                    ? "N/A"
                    : profile?.languages.map((lang) => (
                        <span key={lang.id} className="language-tag">
                          {lang.name} {lang.proficiency}
                        </span>
                      ))}
                </div>
              </div>

              {/* Projects section */}
              <div className="profile-card">
                <button className="card-edit-button">
                  <FiEdit
                    onClick={() =>
                      document
                        .getElementById("project_update_modal")
                        .showModal()
                    }
                    className="edit-icon"
                  />
                </button>
                <h3 className="card-title-lg">Projects</h3>
                <div className="project-grid">
                  {profile?.projects.length === 0
                    ? "N/A"
                    : profile?.projects.map((project) => (
                        <div key={project.name} className="project-card mb-3">
                          <h4 className="project-title">Reactions at Slack</h4>
                          <p className="project-description">
                            A feature to express emotions through emojis.
                          </p>
                          <div className="project-footer">
                            <div className="project-tags">
                              <span className="project-tag-blue">
                                <FaReact className="inline-icon" /> React
                              </span>
                              <span className="project-tag-purple">
                                <SiGraphql className="inline-icon" /> GraphQL
                              </span>
                            </div>
                            <a className="project-link" href="#">
                              View Project →
                            </a>
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              {/* Certifications section */}
              <div className="profile-card">
                <button className="card-edit-button">
                  <FiEdit
                    onClick={() =>
                      document
                        .getElementById("certificate_update_modal")
                        .showModal()
                    }
                    className="edit-icon"
                  />
                </button>
                <h3 className="card-title-lg">Certifications</h3>
                <ul className="certification-list">
                  {profile?.certifications.length === 0
                    ? "N/A"
                    : profile?.certifications.map((cert) => (
                        <li key={cert.name} className="certification-item">
                          <FiAward className="certification-icon" />
                          <div>
                            <p className="certification-name">
                              Certified UX Designer
                            </p>
                            <p className="certification-issuer">
                              Nielsen Norman Group
                            </p>
                          </div>
                        </li>
                      ))}
                </ul>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;