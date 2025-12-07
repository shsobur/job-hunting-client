import "./RecApplications.css";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaEye,
} from "react-icons/fa";

const RecApplications = () => {
  // Mock data with different statuses and timestamps__
  const applications = [
    {
      id: 1,
      seekerName: "Alex Johnson",
      seekerTitle: "Senior Frontend Developer",
      seekerLocation: "San Francisco, CA",
      appliedToJob: "Lead React Developer",
      appliedTime: "2023-10-27T14:30:00Z",
      status: "new",
      experience: "8 years",
      noticePeriod: "15 days",
    },
    {
      id: 2,
      seekerName: "Sam Rivera",
      seekerTitle: "UX/UI Designer",
      seekerLocation: "Remote",
      appliedToJob: "Product Designer",
      appliedTime: "2023-10-25T09:15:00Z",
      status: "reviewed",
      experience: "5 years",
      noticePeriod: "30 days",
    },
    {
      id: 3,
      seekerName: "Morgan Lee",
      seekerTitle: "Full Stack Engineer",
      seekerLocation: "New York, NY",
      appliedToJob: "Senior Software Engineer",
      appliedTime: "2023-10-20T11:45:00Z",
      status: "shortlisted",
      experience: "6 years",
      noticePeriod: "Immediate",
    },
  ];

  // Helper to format time
  const timeSince = (dateString) => {
    const appliedDate = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - appliedDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <section className="ra_section">
      <div className="ra_container">
        {/* Section Header */}
        <div className="ra_header">
          <h2 className="ra_header-title">
            Recent <span className="ra_highlighted-text">Applications</span>
          </h2>
          <p className="ra_header-description">
            Review and manage job applications from candidates. Stay updated
            with new submissions.
          </p>
        </div>

        {/* Applications List */}
        <div className="ra_applications-list">
          {applications.map((app) => (
            <div key={app.id} className="ra_application-card">
              {/* Status Badge */}
              <div className={`ra_status-badge ra_status-${app.status}`}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </div>

              {/* Card Header - Candidate Info */}
              <div className="ra_candidate-info">
                <div className="ra_candidate-avatar">
                  <FaUser className="ra_avatar-icon" />
                </div>
                <div className="ra_candidate-details">
                  <h3 className="ra_candidate-name">{app.seekerName}</h3>
                  <div className="ra_candidate-meta">
                    <span className="ra_candidate-title">
                      {app.seekerTitle}
                    </span>
                    <span className="ra_candidate-experience">
                      {app.experience} experience
                    </span>
                  </div>
                </div>
              </div>

              {/* Applied Job Info */}
              <div className="ra_job-applied">
                <h4 className="ra_applied-job-title">
                  <FaBriefcase className="ra_job-icon" />
                  Applied for: {app.appliedToJob}
                </h4>
              </div>

              {/* Application Details */}
              <div className="ra_application-details">
                <div className="ra_detail-item">
                  <FaMapMarkerAlt className="ra_detail-icon" />
                  <span>{app.seekerLocation}</span>
                </div>
                <div className="ra_detail-item">
                  <FaClock className="ra_detail-icon" />
                  <span>{timeSince(app.appliedTime)}</span>
                </div>
                <div className="ra_detail-item">
                  <span className="ra_detail-label">Notice Period:</span>
                  <span className="ra_detail-value">{app.noticePeriod}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="ra_card-footer">
                <button className="ra_view-btn">
                  View Full Application
                  <FaEye className="ra_btn-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: View All CTA */}
        <div className="ra_cta">
          <button className="ra_view-all-btn">
            View All Applications
            <FaEye className="ra_btn-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecApplications;