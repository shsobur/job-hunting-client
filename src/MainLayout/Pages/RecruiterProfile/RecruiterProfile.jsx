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
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import AboutModal from "../../../Components/RecUpdateModal/AboutModal/AboutModal";
import DepartmentModal from "../../../Components/RecUpdateModal/DepartmentModal/DepartmentModal";
import CompanyDetailsModal from "../../../Components/RecUpdateModal/CompanyInfo/CompanyInfo";
import SocialLinksModal from "../../../Components/RecUpdateModal/SocialModal/SocialModal";
import "./RecruiterProfile.css";
import ProfileModal from "../../../Components/RecUpdateModal/ProfileModal/ProfileModal";
import useUserData from "../../../Hooks/userData";
import placeholderImage from "../../../assets/place_banner.png";

const RecruiterProfile = () => {
  const { profile } = useUserData();

  return (
    <>
      {/* All update modal component__ */}
      <ProfileModal></ProfileModal>
      <AboutModal></AboutModal>
      <DepartmentModal></DepartmentModal>
      <CompanyDetailsModal></CompanyDetailsModal>
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
                        profile?.companyLogo === ""
                          ? placeholderImage
                          : profile?.companyLogo
                      }")`,
                    }}
                  ></div>
                </div>

                <div className="company-info">
                  <h1 className="company-name">{profile?.companyName}</h1>
                  <p className="company-meta">{profile?.bio}</p>

                  <div className="status-badges">
                    {profile?.activeHire && (
                      <span className="status-badge">
                        <FaRocket className="badge-icon" />
                        ActiveHire
                      </span>
                    )}

                    <span className="status-badge">
                      <FaCheckCircle className="badge-icon" />
                      Verified
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
                      {profile?.description || "Tell us about you company"}
                    </p>

                    <div className="mission-vision-grid">
                      <div className="mission-card">
                        <div className="card-icon-container">
                          <FaFlag className="card-icon" />
                        </div>
                        <h3 className="card-title">Mission</h3>
                        <p className="card-description">
                          {profile?.mission || "What's you company mission?"}
                        </p>
                      </div>

                      <div className="vision-card">
                        <div className="card-icon-container">
                          <FaEye className="card-icon" />
                        </div>
                        <h3 className="card-title">Vision</h3>
                        <p className="card-description">
                          {profile?.vision || "What's you company vision?"}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Departments Section */}
                <section className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Departments</h2>
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

                  <div className="departments-grid">
                    <div className="department-card">
                      <FaWrench className="department-icon" />
                      <span className="department-name">Engineering</span>
                    </div>
                    <div className="department-card">
                      <FaCode className="department-icon" />
                      <span className="department-name">Product</span>
                    </div>
                    <div className="department-card">
                      <FaChartLine className="department-icon" />
                      <span className="department-name">Sales</span>
                    </div>
                    <div className="department-card">
                      <FaBullhorn className="department-icon" />
                      <span className="department-name">Marketing</span>
                    </div>
                    <div className="department-card">
                      <FaBuilding className="department-icon" />
                      <span className="department-name">Finance</span>
                    </div>
                    <div className="department-card">
                      <FaHeadset className="department-icon" />
                      <span className="department-name">HR</span>
                    </div>
                  </div>
                </section>

                {/* Gallery Section */}
                <section className="profile-section">
                  <div className="section-header">
                    <h2 className="section-title">Company Gallery</h2>
                    <button className="section-edit-btn">
                      <FiEdit className="edit-icon" />
                    </button>
                  </div>

                  <div className="gallery-grid">
                    <div className="gallery-item featured">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnhk5Pc25LFOAYMMYnei2UMpIZfpAtNWs4OwIJwEDNkLCN0A9N903eEv4ZC2YwlCXUncF6GZKJC1JNh5L_UpwEYfH7kQDd4dHp-blKUPnbkFIXbsYMN2aA71HvQE_6-8EZI2TD3K1yHxG2ieMFyv9qG_E2aQmJxolCm0AOiON0ymQx4AVCW_AMwdnG5P9TrbynSPcZsHbJZZLXMJe7grGsgo6C8zwOxeRdYjx-_-4k_SKbxAH5qmCmsq-i77FAN7MD9svTYBayec2q"
                        alt="Company event 1"
                      />
                    </div>
                    <div className="gallery-item">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyc8P_guSKqUTUjT0Fzyb9Cm9-kOts-PwdJncnBNE0ezvmdrbg0pu4k6eg-ryOfA9pb6-hEHeTsZvakIi4SNWyGwBRzKHwBCqWr_1QYaKpJT9RZ7RqOKMSF8NTkH4pXGDe2wOwHhrznJESWBqHcPsUWF0diIyquzeReMFCES7sT6AMVSlMiH05uQscXL0ZetlJ17lpy7yzLaj5yJtG6C0LMMaj2mNjgNL2cBomnXBO92kSNrfVPI-BdwvdxcyUMp7HNSbt9KCmhUte"
                        alt="Company event 2"
                      />
                    </div>
                    <div className="gallery-item">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwBD6ZEKyydpwswGDQzA40z0jADWfSy-ZZSgw8ehP5Ttn9OyIPvb5by067gKeM3PBL8koDY-jA7Op2vfttEy3cCYziKCVz5nd7OHC8A3PS2pt8G56FCSteWyDRQ2i9iHCJh3GTElpWULXma5L7fXX-YWFbiabfsmcjOgL7JD4xwO1R_1ZLJ9hfJtD2y-6DVN5EcbIKjOZ5wooCJeqWUliiB1-C82xNC8epIVC8NVelbg-GR_UMclzzb8a0JmuDwB_PX10PsWg-POWD"
                        alt="Company event 3"
                      />
                    </div>
                    <div className="gallery-item">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxsIV8D5Q6oMWy-Xi3hbeqC90422eCRShMrrqMWmLjJ4jP489qb9WNfXbKcBkqYlMthvr0pqLR2E0VyhEQsjS1Iq7NwowCRH6LedJWe-2HILQF9N6EMUT3beP2-0iK0gHBA1Jb9v6bfWFjc-tEjGZJuR9eORHh_ak3dLSiIc6Rakdi_JWMsuGDFlL2ustUEjqgJ8HKdy1CFls5G5jWyOskuUUrdAP3p8ecfXQOwCTKp-a7yUCABE5QO1Ox-mdr_WLbklgJHaCmxpMV"
                        alt="Company event 4"
                      />
                    </div>
                    <div className="gallery-item more-items">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqclP6ydWJ8KWTejeq2rkEUZjHYXOZMk1ABGGA_Q18-cb-Vpn96UhBTA07giYayjDhUMyZQ8MSNkRLLrsPdZKkJh1rQj1arIN7YLKaHDkHxoHIcM_ytma4CFUEARTxDAlA8l8i5c8iHJJPzEOWnvXXMQ0kJm1evqSiyhnR3NMyrpkqvYo1W_4rO0T77fzGN8FapJc88SvY8l_YO8GPvH4h_f8fetS5EBTRhB-Dk3Uymd92e-SQKXLJX2LjkIfwDlIytkCh0rzbVhiN"
                        alt="Company event 5"
                      />
                      <div className="more-overlay">
                        <span className="more-text">5+ More</span>
                      </div>
                    </div>
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
                      <span className="detail-label">Website</span>
                      <a href="#" className="detail-value link">
                        techinnovators.com
                      </a>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Industry</span>
                      <span className="detail-value">Technology</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Company size</span>
                      <span className="detail-value">500-1000</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Founded</span>
                      <span className="detail-value">2005</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Headquarters</span>
                      <span className="detail-value">New York City, NY</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Branches</span>
                      <span className="detail-value">NYC, San Francisco</span>
                    </div>
                  </div>
                </div>

                {/* Key People Card */}
                <div className="sidebar-card">
                  <div className="card-header">
                    <h3 className="card-title">Key People</h3>
                    <button className="card-edit-btn">
                      <FiEdit className="edit-icon" />
                    </button>
                  </div>

                  <div className="people-list">
                    <div className="person-card">
                      <div
                        className="person-avatar"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBayWUlvMBTLiUf0DeYX2cjVXw-EhfMrKqINqxQAI1s4ts0OYCrKg_63ueN61qMW68FIZQUIgqdU1xYhOuKfGUfbryIY08-ggXMOGkBWPwG1snMjCHEj4tW5qfU6As1fGtHWMQteCMYhnXTXZfwU8Mc5Pb_VF3f6tDSVc-gh4ETgnGt42EdvPV_RmHoOPe9UfcOa2FAMYQZtxKfCFTCOmqwZV9sao4iGjgLKG5M7jAdKGxBMZ_KSoCopv3AfAxCrr7OsC_4Pwo9F840")',
                        }}
                      ></div>
                      <div className="person-info">
                        <h4 className="person-name">Ethan Carter</h4>
                        <p className="person-role">CEO</p>
                      </div>
                    </div>

                    <div className="person-card">
                      <div
                        className="person-avatar"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTSqdRxN-ly486ZUGAYT_4FERjezs4XEL74J64QQLo5_v7gJEUhW8XyySAcMbjclEAjHDWRpu9gNqFvISoquWh7MHuvs4CrPLlLBiCHxeuxZANPU7gvxaz9yatCNbT5GdwYMLt3izlfFIsS7W4huCMZGJglJcamG7lkD7pfqtD9AeB6eamg3SGNOszwqucNmTWUheSFyl0UmTofHINhFX-xT-jXNQUvDVlYBm6QUG1n77v8sd3j7__PYS0zpZphsQSNWl9ajH0EoYf")',
                        }}
                      ></div>
                      <div className="person-info">
                        <h4 className="person-name">Olivia Bennett</h4>
                        <p className="person-role">Founder</p>
                      </div>
                    </div>
                  </div>
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

                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="LinkedIn">
                      <FaLinkedin />
                    </a>
                    <a href="#" className="social-link" aria-label="Twitter">
                      <FaTwitter />
                    </a>
                  </div>
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
