// File path__
import "./JobDetails.css";

// Package__
import { TfiWorld } from "react-icons/tfi";
import { FcMindMap } from "react-icons/fc";
import { RiProfileLine } from "react-icons/ri";
import { Link, useLoaderData } from "react-router";
import { IoLocationOutline } from "react-icons/io5";

const JobDetails = () => {
  const jobData = useLoaderData();

  // Format total apply count__
  const formatTotalApply = (count) => {
    if (!count && count !== 0) return "0";
    if (count >= 100) return "100+";
    if (count >= 50) return `${Math.floor(count / 5) * 5}+`;
    return count.toString();
  };

  // Format salary range__
  const formatSalary = (salaryRange) => {
    if (!salaryRange?.min || !salaryRange?.max) return "Salary not specified";

    const min = salaryRange.min?.toLocaleString() || "";
    const max = salaryRange.max?.toLocaleString() || "";
    const currency = salaryRange.currency || "";
    const period = salaryRange.period || "year";

    return `${min} - ${max} ${currency} / ${period}`;
  };

  // Format date__
  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  // Format location__
  const formatLocation = (job) => {
    const locationParts = [job?.area, job?.city, job?.country].filter(
      (part) => part && part.trim() !== ""
    );

    return locationParts.length > 0
      ? locationParts.join(", ")
      : "Location not specified";
  };

  return (
    <section className="job-details-section">
      <div className="job-details-container">
        {/* Breadcrumb */}
        <div className="job-breadcrumb">
          <Link to="/jobs" className="breadcrumb-link">
            Jobs
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">
            {jobData?.jobTitle || "Job Details"}
          </span>
        </div>

        {/* Main Job Card */}
        <div className="job-main-card">
          <div className="job-header">
            <div className="company-info">
              <div className="company-logo">
                <img
                  src={jobData?.companyLogo || "/default-company-logo.png"}
                  alt={jobData?.companyName || "Company Logo"}
                  onError={(e) => {
                    e.target.src = "/default-company-logo.png";
                  }}
                />
              </div>
              <div className="company-details">
                <h1 className="job-title">
                  {jobData?.jobTitle || "Job Title Not Available"}
                </h1>
                <div className="company-name">
                  {jobData?.companyName || "Company Name Not Available"}
                </div>
                <div className="job-location">
                  <span className="location-icon">
                    <IoLocationOutline size={25} />
                  </span>
                  {formatLocation(jobData)}
                </div>
              </div>
            </div>

            <div className="job-actions">
              <button className="apply-btn primary-btn">
                <span className="btn-text">Apply Now</span>
                <span className="btn-icon">→</span>
              </button>
              <div className="secondary-actions">
                <Link to={`/recruiter-profile/${jobData.companyEmail}`}>
                  <button className="action-btn company-profile-btn">
                    <span className="action-icon">
                      <RiProfileLine />
                    </span>
                    <span className="action-text">Company Profile</span>
                  </button>
                </Link>
                <a
                  href={jobData?.companyWebsite || "#"}
                  className="action-btn website-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="action-icon">
                    <TfiWorld />
                  </span>
                  <span className="action-text">Visit Website</span>
                </a>
              </div>
            </div>
          </div>

          {/* Job Meta Info */}
          <div className="job-meta-grid">
            <div className="meta-item">
              <div className="meta-label">Job Type</div>
              <div className="meta-value badge">
                {jobData?.jobType || "Not specified"}
              </div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Workplace</div>
              <div className="meta-value badge">
                {jobData?.workplaceType || "Not specified"}
              </div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Experience</div>
              <div className="meta-value">
                {jobData?.experienceLevel || "Experience not specified"}
              </div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Salary</div>
              <div className="meta-value salary">
                {formatSalary(jobData?.salaryRange)}
              </div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Deadline</div>
              <div className="meta-value deadline">
                {formatDate(jobData?.applicationDeadline)}
              </div>
            </div>
            <div className="meta-item">
              <div className="meta-label">Open Positions</div>
              <div className="meta-value">
                {jobData?.openPositions || 0} Position
                {jobData?.openPositions !== 1 ? "s" : ""}
              </div>
            </div>
            {/* Total Apply - New Section */}
            <div className="meta-item">
              <div className="meta-label">Total Applications</div>
              <div className="meta-value apply-count">
                {formatTotalApply(jobData?.totalApply)}
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="job-content">
            <div className="content-section">
              <h3 className="section-title">Job Description</h3>
              <p className="section-text">
                {jobData?.jobDescription || "No job description available."}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="content-section">
              <h3 className="section-title">Key Responsibilities</h3>
              {jobData?.responsibilities?.length > 0 ? (
                <ul className="section-list">
                  {jobData.responsibilities.map((item, index) => (
                    <li key={index} className="list-item">
                      <span className="list-icon">✓</span>
                      {item || "Responsibility not specified"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="section-text">No responsibilities listed.</p>
              )}
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
                {jobData?.requirementSkills?.length > 0 ? (
                  <div className="skills-grid">
                    {jobData.requirementSkills.map((skill, index) => (
                      <div key={index} className="skill-badge primary-skill">
                        {skill || "Skill not specified"}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="section-text">No required skills listed.</p>
                )}
              </div>
            </div>

            {/* Nice to Have */}
            <div className="content-section">
              <h3 className="section-title">Nice to Have</h3>
              {jobData?.niceToHave?.length > 0 ? (
                <div className="skills-grid">
                  {jobData.niceToHave.map((skill, index) => (
                    <div key={index} className="skill-badge secondary-skill">
                      {skill || "Skill not specified"}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="section-text">No additional skills listed.</p>
              )}
            </div>

            {/* Who Can Apply */}
            <div className="content-section">
              <h3 className="section-title">Who Can Apply</h3>
              {jobData?.whoCanApply?.length > 0 ? (
                <ul className="section-list">
                  {jobData.whoCanApply.map((item, index) => (
                    <li key={index} className="list-item">
                      <span className="list-icon">•</span>
                      {item || "Requirement not specified"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="section-text">No specific requirements listed.</p>
              )}
            </div>

            {/* Benefits */}
            <div className="content-section">
              <h3 className="section-title">Benefits & Perks</h3>
              {jobData?.benefits?.length > 0 ? (
                <div className="benefits-grid">
                  {jobData.benefits.map((benefit, index) => (
                    <div key={index} className="benefit-item">
                      <div>
                        <FcMindMap size={25} />
                      </div>
                      <span className="benefit-text">
                        {benefit || "Benefit not specified"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="section-text">No benefits listed.</p>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="job-cta">
            <div className="cta-content">
              <h3 className="cta-title">Ready to Apply?</h3>
              <p className="cta-description">
                {jobData?.openPositions > 0
                  ? `Don't miss this opportunity to join ${
                      jobData?.companyName || "this company"
                    } as ${jobData?.jobTitle || "their team member"}.`
                  : "This position is currently not accepting applications."}
              </p>
            </div>
            <button
              className="apply-btn-large primary-btn"
              disabled={!jobData?.openPositions || jobData?.openPositions === 0}
            >
              <span className="btn-text">
                {jobData?.openPositions > 0
                  ? "Apply for This Position"
                  : "No Open Positions"}
              </span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
