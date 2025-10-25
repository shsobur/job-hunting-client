import { RiProfileLine } from "react-icons/ri";
import { TfiWorld } from "react-icons/tfi";
import "./JobDetails.css";
import { Link } from "react-router";
import { IoLocationOutline } from "react-icons/io5";
import { FcMindMap } from "react-icons/fc";

const JobDetails = () => {
  return (
    <section className="job-details-section">
      <div className="job-details-container">
        {/* Breadcrumb */}
        <div className="job-breadcrumb">
          <Link to="/jobs" className="breadcrumb-link">
            Jobs
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Digital Marketing Manager</span>
        </div>

        {/* Main Job Card */}
        <div className="job-main-card">
          <div className="job-header">
            <div className="company-info">
              <div className="company-logo">
                <img
                  src="https://res.cloudinary.com/dmfsmcy2y/image/upload/v1759735602/Job%20Hunting/ukebaoz1xkwr99h1qlv0.jpg"
                  alt="LogIc Nactor"
                />
              </div>
              <div className="company-details">
                <h1 className="job-title">Digital Marketing Manager</h1>
                <div className="company-name">LogIc Nactor</div>
                <div className="job-location">
                  <span className="location-icon"><IoLocationOutline size={25} /></span>
                  Mirpur 12, Dhaka, Bangladesh
                </div>
              </div>
            </div>

            <div className="job-actions">
              <button className="apply-btn primary-btn">
                <span className="btn-text">Apply Now</span>
                <span className="btn-icon">→</span>
              </button>
              <div className="secondary-actions">
                <button className="action-btn company-profile-btn">
                  <span className="action-icon"><RiProfileLine /></span>
                  <span className="action-text">Company Profile</span>
                </button>
                <a
                  href="https://ollyo.com/"
                  className="action-btn website-btn"
                  target="_blank"
                >
                  <span className="action-icon"><TfiWorld /></span>
                  <span className="action-text">Visit Website</span>
                </a>
              </div>
            </div>
          </div>

          {/* Job Meta Info */}
          <div className="job-meta-grid">
            <div className="meta-item">
              <div className="meta-label">Job Type</div>
              <div className="meta-value badge">Full-time</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Workplace</div>
              <div className="meta-value badge">On-site</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Experience</div>
              <div className="meta-value">Intermediate Level</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Salary</div>
              <div className="meta-value salary">€45,000 - €60,000 / year</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Deadline</div>
              <div className="meta-value deadline">November 30, 2025</div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Open Positions</div>
              <div className="meta-value">1 Position</div>
            </div>
          </div>

          {/* Job Description */}
          <div className="job-content">
            <div className="content-section">
              <h3 className="section-title">Job Description</h3>
              <p className="section-text">
                We are seeking an experienced Digital Marketing Manager to lead
                our marketing efforts and drive brand awareness. You will be
                responsible for developing and executing digital marketing
                strategies across various channels including SEO, SEM, social
                media, and email marketing. The ideal candidate is data-driven
                and has a proven track record of successful marketing campaigns.
              </p>
            </div>

            {/* Responsibilities */}
            <div className="content-section">
              <h3 className="section-title">Key Responsibilities</h3>
              <ul className="section-list">
                {[
                  "Develop and implement digital marketing strategies",
                  "Manage SEO and SEM campaigns",
                  "Create and analyze marketing performance reports",
                  "Lead social media marketing efforts",
                  "Collaborate with content and design teams",
                ].map((item, index) => (
                  <li key={index} className="list-item">
                    <span className="list-icon">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="content-section">
              <h3 className="section-title">Required Skills</h3>
              <div className="skills-container">
                <div className="skills-header">
                  <p className="skills-description">
                    Essential technical and professional skills required for
                    this position
                  </p>
                </div>
                <div className="skills-grid">
                  {[
                    "Digital marketing strategy",
                    "SEO/SEM optimization",
                    "Google Analytics",
                    "Social media marketing",
                    "Content marketing",
                    "Email marketing campaigns",
                    "Data analysis",
                  ].map((skill, index) => (
                    <div key={index} className="skill-badge primary-skill">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nice to Have */}
            <div className="content-section">
              <h3 className="section-title">Nice to Have</h3>
              <div className="skills-grid">
                {[
                  "Marketing automation tools",
                  "CRM software experience",
                  "Graphic design skills",
                  "Video editing knowledge",
                ].map((skill, index) => (
                  <div key={index} className="skill-badge secondary-skill">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Who Can Apply */}
            <div className="content-section">
              <h3 className="section-title">Who Can Apply</h3>
              <ul className="section-list">
                {[
                  "3+ years of digital marketing experience",
                  "Bachelor's degree in Marketing or related field",
                  "Strong analytical and communication skills",
                ].map((item, index) => (
                  <li key={index} className="list-item">
                    <span className="list-icon">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="content-section">
              <h3 className="section-title">Benefits & Perks</h3>
              <div className="benefits-grid">
                {[
                  "Competitive salary package",
                  "Hybrid work model",
                  "Health and wellness benefits",
                  "Career development opportunities",
                  "Team building events",
                  "Modern office space",
                ].map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <div><FcMindMap size={25} /></div>
                    <span className="benefit-text">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="job-cta">
            <div className="cta-content">
              <h3 className="cta-title">Ready to Apply?</h3>
              <p className="cta-description">
                Don't miss this opportunity to join LogIc Nactor as their
                Digital Marketing Manager.
              </p>
            </div>
            <button className="apply-btn-large primary-btn">
              <span className="btn-text">Apply for This Position</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
