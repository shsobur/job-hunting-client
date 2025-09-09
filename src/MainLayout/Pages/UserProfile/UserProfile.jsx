import "./UserProfile.css";
import placeholderBanner from "../../../assets/place_banner.png";

import { FaLinkedin, FaGithub, FaReact } from "react-icons/fa";
import {
  FiEdit,
  FiPhone,
  FiMapPin,
  FiLink,
  FiAward,
  FiMail,
} from "react-icons/fi";
import { SiNodedotjs, SiGraphql } from "react-icons/si";

const UserProfile = () => {
  return (
    <>
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
                  <p className="stat-number">2</p>
                  <p className="stat-label">Projects</p>
                </div>
                <div className="stat-item">
                  <p className="stat-number">6</p>
                  <p className="stat-label">Skills</p>
                </div>
                <div className="stat-item">
                  <p className="stat-number">2</p>
                  <p className="stat-label">Certifications</p>
                </div>
              </div>
            </div>

            {/* Open to Work status badge */}
            <div className="profile-card">
              <div className="status-container">
                <span className="status-badge">
                  <span className="status-indicator"></span>
                  Open to Work
                </span>
              </div>
            </div>

            {/* Contact information with edit button */}
            <div className="profile-card">
              <button className="card-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <h3 className="profile-card-title">Contact Info</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <FiMapPin className="contact-icon" />
                  <span className="contact-text">London, UK</span>
                </div>
                <div className="contact-item">
                  <FiMail className="contact-icon" />
                  <a
                    className="contact-link"
                    href="mailto:ethan.carter@example.com"
                  >
                    ethan.carter@example.com
                  </a>
                </div>
                <div className="contact-item">
                  <FiPhone className="contact-icon" />
                  <a className="contact-link" href="tel:+442079460958">
                    +44 20 7946 0958
                  </a>
                </div>
              </div>
              {/* Social media links */}
              <div className="social-links">
                <a className="social-link" href="#">
                  <FaLinkedin className="social-icon" />
                </a>
                <a className="social-link" href="#">
                  <FaGithub className="social-icon" />
                </a>
                <a className="social-link" href="#">
                  <FiLink className="social-icon" />
                </a>
              </div>
            </div>

            {/* Languages section with edit button */}
            <div className="profile-card">
              <button className="card-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <h3 className="profile-card-title">Languages</h3>
              <div className="language-tags">
                <span className="language-tag">English (Native)</span>
                <span className="language-tag">French (Professional)</span>
              </div>
            </div>
          </aside>

          {/* Main content area */}
          <main className="profile-main">
            {/* Profile header with banner and avatar */}
            <div className="profile-header-card">
              <button className="header-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <div
                className="header-banner"
                style={{
                  backgroundImage: `url("${placeholderBanner}")`,
                }}
              ></div>
              <div className="header-content">
                <button className="header-edit-button-secondary">
                  <FiEdit className="edit-icon" />
                </button>
                <div className="profile-info-container">
                  <div className="profile-avatar-container">
                    <div
                      className="profile-avatar"
                      style={{
                        backgroundImage: `url("${placeholderBanner}")`,
                      }}
                    ></div>
                  </div>
                  <div className="profile-details">
                    <div className="profile-details-content">
                      <div className="mobile-status-container">
                        <span className="status-badge">
                          <span className="status-indicator"></span>
                          Open to Work
                        </span>
                      </div>
                      <h2 className="profile-name">Ethan Carter, 28</h2>
                      <p className="profile-title">
                        Product Designer in London, UK, He/Him
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile contact info (visible only on small screens) */}
            <div className="profile-card mobile-contact-info">
              <button className="card-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <h3 className="card-title-lg">Contact Info</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <FiMapPin className="contact-icon" />
                  <span className="contact-text">London, UK</span>
                </div>
                <div className="contact-item">
                  <FiMail className="contact-icon" />
                  <a
                    className="contact-link"
                    href="mailto:ethan.carter@example.com"
                  >
                    ethan.carter@example.com
                  </a>
                </div>
                <div className="contact-item">
                  <FiPhone className="contact-icon" />
                  <a className="contact-link" href="tel:+442079460958">
                    +44 20 7946 0958
                  </a>
                </div>
              </div>
              <div className="social-links">
                <a className="social-link" href="#">
                  <FaLinkedin className="social-icon" />
                </a>
                <a className="social-link" href="#">
                  <FaGithub className="social-icon" />
                </a>
                <a className="social-link" href="#">
                  <FiLink className="social-icon" />
                </a>
              </div>
            </div>

            {/* About section */}
            <div className="profile-card">
              <button className="card-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <h3 className="card-title-lg">About</h3>
              <p className="about-text">
                I'm a British designer currently living in London, UK. I'm huge
                fan of gothic typefaces and single shot espressos. I love
                talking about comic books.
              </p>
            </div>

            {/* Experience section with timeline */}
            <div className="profile-card">
              <button className="card-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <h3 className="card-title-lg">Experience</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot-current"></div>
                  <p className="timeline-role">Product Designer at Figma</p>
                  <p className="timeline-period">2023 - Present</p>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <p className="timeline-role">
                    Senior Product Designer at Slack
                  </p>
                  <p className="timeline-period">
                    2021 - 2023 • San Francisco, CA
                  </p>
                  <p className="timeline-description">
                    I worked on the reactions feature that allows anyone to send
                    cute emojis.
                  </p>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <p className="timeline-role">Product Designer at Quip</p>
                  <p className="timeline-period">
                    2019 - 2021 • San Francisco, CA
                  </p>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <p className="timeline-role">Product Designer at Facebook</p>
                  <p className="timeline-period">
                    2013 - 2019 • Menlo Park, CA
                  </p>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <p className="timeline-role">
                    Product Design Intern at Facebook
                  </p>
                  <p className="timeline-period">
                    2010 - 2013 • Menlo Park, CA
                  </p>
                </div>
              </div>
            </div>

            {/* Education section */}
            <div className="profile-card">
              <button className="card-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <h3 className="card-title-lg">Education</h3>
              <div className="education-list">
                <div className="education-item">
                  <h4 className="education-institution">Stanford University</h4>
                  <p className="education-department">
                    Department of Computer Science
                  </p>
                  <p className="education-period">2009 - 2013</p>
                </div>
                <div className="education-item">
                  <h4 className="education-institution">
                    London College of Communication
                  </h4>
                  <p className="education-department">Department of Design</p>
                  <p className="education-period">2007 - 2009</p>
                </div>
              </div>
            </div>

            {/* Skills section */}
            <div className="profile-card">
              <button className="card-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <h3 className="card-title-lg">Skills</h3>
              <div className="skill-tags">
                <span className="skill-tag">UI Design</span>
                <span className="skill-tag">UX Research</span>
                <span className="skill-tag">Prototyping</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">React</span>
                <span className="skill-tag">Tailwind CSS</span>
              </div>
            </div>

            {/* Mobile languages section (visible only on small screens) */}
            <div className="profile-card mobile-languages">
              <button className="card-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <h3 className="card-title-lg">Languages</h3>
              <div className="language-tags">
                <span className="language-tag">English (Native)</span>
                <span className="language-tag">French (Professional)</span>
              </div>
            </div>

            {/* Projects section */}
            <div className="profile-card">
              <button className="card-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <h3 className="card-title-lg">Projects</h3>
              <div className="projects-grid">
                <div className="project-card">
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
                <div className="project-card">
                  <h4 className="project-title">Deep Comments at Slack</h4>
                  <p className="project-description">
                    Nested comment threads for better organization.
                  </p>
                  <div className="project-footer">
                    <div className="project-tags">
                      <span className="project-tag-blue">
                        <FaReact className="inline-icon" /> React
                      </span>
                      <span className="project-tag-green">
                        <SiNodedotjs className="inline-icon" /> Node.js
                      </span>
                    </div>
                    <a className="project-link" href="#">
                      View Project →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications section */}
            <div className="profile-card">
              <button className="card-edit-button">
                <FiEdit className="edit-icon" />
              </button>
              <h3 className="card-title-lg">Certifications</h3>
              <ul className="certification-list">
                <li className="certification-item">
                  <FiAward className="certification-icon" />
                  <div>
                    <p className="certification-name">Certified UX Designer</p>
                    <p className="certification-issuer">Nielsen Norman Group</p>
                  </div>
                </li>
                <li className="certification-item">
                  <FiAward className="certification-icon" />
                  <div>
                    <p className="certification-name">
                      Interaction Design Specialist
                    </p>
                    <p className="certification-issuer">
                      Interaction Design Foundation
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
