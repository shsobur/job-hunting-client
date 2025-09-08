import "./UserProfile.css";

const UserProfile = () => {
  return (
    <>
      <section id="main_user_profile_container">
        <div className="user_profile_container">
          <div className="user_profile_grid">
            <aside className="user_profile_sidebar">
              <div className="profile_card">
                <h3 className="profile_card_title">Quick Stats</h3>
                <div className="stats_container">
                  <div className="stat_item">
                    <p className="stat_number">2</p>
                    <p className="stat_label">Projects</p>
                  </div>
                  <div className="stat_item">
                    <p className="stat_number">6</p>
                    <p className="stat_label">Skills</p>
                  </div>
                  <div className="stat_item">
                    <p className="stat_number">2</p>
                    <p className="stat_label">Certifications</p>
                  </div>
                </div>
                <div className="status_container">
                  <span className="status_badge">
                    <span className="status_indicator"></span>
                    Open to Work
                  </span>
                </div>
              </div>
              <div className="profile_card">
                <h3 className="profile_card_title">
                  Availability / Contact Info
                </h3>
                <div className="contact_info">
                  <div className="contact_item">
                    <span className="material-symbols-outlined contact_icon">
                      location_on
                    </span>
                    <span className="contact_text">London, UK</span>
                  </div>
                  <div className="contact_item">
                    <span className="material-symbols-outlined contact_icon">
                      mail
                    </span>
                    <a
                      className="contact_link"
                      href="mailto:ethan.carter@example.com"
                    >
                      ethan.carter@example.com
                    </a>
                  </div>
                  <div className="contact_item">
                    <span className="material-symbols-outlined contact_icon">
                      call
                    </span>
                    <a className="contact_link" href="tel:+442079460958">
                      +44 20 7946 0958
                    </a>
                  </div>
                </div>
                <div className="social_links">
                  <a className="social_link" href="#">
                    <svg
                      aria-hidden="true"
                      className="social_icon"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-2.16-1.57-2.16-1.05 0-1.43.72-1.67 1.37a2 2 0 00-.1.75V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.42C18.24 9.88 19 11.43 19 13.82z"></path>
                    </svg>
                  </a>
                  <a className="social_link" href="#">
                    <svg
                      aria-hidden="true"
                      className="social_icon"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.238 2.946 7.828 6.84 8.784.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.86.62-3.463-1.383-3.463-1.383-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.34 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.942 0-1.09.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.645 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.115 2.504.336 1.909-1.296 2.747-1.026 2.747-1.026.546 1.375.201 2.392.1 2.645.64.698 1.03 1.592 1.03 2.682 0 3.84-2.338 4.685-4.566 4.935.359.308.678.92.678 1.852 0 1.336-.012 2.414-.012 2.742 0 .268.18.578.688.48A9.997 9.997 0 0022 12c0-5.523-4.477-10-10-10z"></path>
                    </svg>
                  </a>
                  <a className="social_link" href="#">
                    <span className="material-symbols-outlined">link</span>
                  </a>
                </div>
              </div>
              <div className="profile_card">
                <h3 className="profile_card_title">Languages</h3>
                <div className="language_tags">
                  <span className="language_tag">English (Native)</span>
                  <span className="language_tag">French (Professional)</span>
                </div>
              </div>
              <div className="recommendation_card">
                <div className="recommendation_content">
                  <span className="material-symbols-outlined recommendation_icon">
                    lightbulb
                  </span>
                  <div>
                    <h4 className="recommendation_title">Recommended Action</h4>
                    <p className="recommendation_text">
                      Add more skills to your profile to attract more
                      opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
            <main className="user_profile_main">
              <div className="profile_header_card">
                <div className="header_edit_button">
                  <button className="edit_btn_transparent">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </div>

                <div
                  className="header_banner"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuIfwPFD1JIrtD5IMavuFqP_YXpU-HdtYPGXvUCp0V2bX5S9-4dq0mWuTkLeexSpqzwGnyizj_fG4w6PTTjz4nX1MQQ_SwqevkDQzZX8TwYzinu477HE3iCDgj-cB1kEoAYecMZRplkqJ4QPlNndYopeneCvPXmeJSuxNTFXhgxnXvnnJKNpQmRxk90uVjYgqZlF6EoInGPjjkNoFi8BJikIE_hYgYhjXMht4aX8JHjm-llqRkZrdS2MwdNJU7sZNStRxjghaKxXc')",
                  }}
                ></div>

                <div className="header_content">
                  <div className="header_edit_button_secondary">
                    <button className="edit_btn_gray">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </div>

                  <div className="profile_info_container">
                    <div className="profile_avatar_container">
                      <div
                        className="profile_avatar"
                        style={{
                          backgroundImage:
                            'url("https://i.postimg.cc/jSbwtz9X/IMG-20250703-173742.jpg")',
                        }}
                      ></div>
                    </div>

                    <div className="profile_details">
                      <div className="profile_details_content">
                        <div className="mobile_status_badge">
                          <span className="status_badge">
                            <span className="status_indicator"></span>
                            Open to Work
                          </span>
                        </div>

                        <h2 className="profile_name">Sobur Hossen</h2>

                        <div className="mobile_location">
                          <span className="material-symbols-outlined location_icon_sm">
                            location_on
                          </span>
                          <span>London, UK</span>
                        </div>

                        <p className="profile_title">
                          Front-End Developer | Skill In React | Focus on react
                          mystery
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile_card">
                <button className="card_edit_button">
                  <span className="material-symbols-outlined edit_icon">
                    edit
                  </span>
                </button>

                <h3 className="card_title_lg">About</h3>

                <p className="about_text">
                  I'm a British designer currently living in London, UK. I'm
                  huge fan of gothic typefaces and single shot espressos. I love
                  talking about comic books.
                </p>

                <div className="mobile_social_links">
                  <a className="social_link" href="#">
                    <svg
                      aria-hidden="true"
                      className="social_icon"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-2.16-1.57-2.16-1.05 0-1.43.72-1.67 1.37a2 2 0 00-.1.75V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.42C18.24 9.88 19 11.43 19 13.82z"></path>
                    </svg>
                  </a>
                  <a className="social_link" href="#">
                    <svg
                      aria-hidden="true"
                      className="social_icon"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.238 2.946 7.828 6.84 8.784.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.86.62-3.463-1.383-3.463-1.383-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.34 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.942 0-1.09.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.645 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.115 2.504.336 1.909-1.296 2.747-1.026 2.747-1.026.546 1.375.201 2.392.1 2.645.64.698 1.03 1.592 1.03 2.682 0 3.84-2.338 4.685-4.566 4.935.359.308.678.92.678 1.852 0 1.336-.012 2.414-.012 2.742 0 .268.18.578.688.48A9.997 9.997 0 0022 12c0-5.523-4.477-10-10-10z"></path>
                    </svg>
                  </a>
                  <a className="social_link" href="#">
                    <span className="material-symbols-outlined">link</span>
                  </a>
                </div>
              </div>
              <div className="profile_card">
                <button className="card_edit_button">
                  <span className="material-symbols-outlined edit_icon">
                    edit
                  </span>
                </button>
                <h3 className="card_title_lg">Experience</h3>

                <div className="timeline">
                  <div className="timeline_item">
                    <div className="timeline_dot_current"></div>
                    <p className="timeline_role">Product Designer at Figma</p>
                    <p className="timeline_period">2023 - Present</p>
                    <p className="timeline_description">
                      I worked on the reactions feature that allows anyone to
                      send cute emojis feature that allows anyone to send cute
                      emojis.
                    </p>
                  </div>

                  <div className="timeline_item">
                    <div className="timeline_dot"></div>
                    <p className="timeline_role">
                      Senior Product Designer at Slack
                    </p>
                    <p className="timeline_period">
                      2021 - 2023 • San Francisco, CA
                    </p>
                    <p className="timeline_description">
                      I worked on the reactions feature that allows anyone to
                      send cute emojis.
                    </p>
                  </div>
                </div>
              </div>
              <div className="profile_card">
                <button className="card_edit_button">
                  <span className="material-symbols-outlined edit_icon">
                    edit
                  </span>
                </button>

                <h3 className="card_title_lg">Education</h3>

                <div className="education_list">
                  <div className="education_item">
                    <h4 className="education_institution">
                      Stanford University
                    </h4>

                    <p className="education_department">
                      Department of Computer Science
                    </p>

                    <p className="education_period">2009 - 2013</p>
                  </div>

                  <div className="education_item">
                    <h4 className="education_institution">
                      London College of Communication
                    </h4>

                    <p className="education_department">Department of Design</p>

                    <p className="education_period">2007 - 2009</p>
                  </div>
                </div>
              </div>

              <div className="profile_card">
                <button className="card_edit_button">
                  <span className="material-symbols-outlined edit_icon">
                    edit
                  </span>
                </button>

                <h3 className="card_title_lg">Skills</h3>

                <div className="skill_tags">
                  <span className="skill_tag">UI Design</span>
                  <span className="skill_tag">UX Research</span>
                  <span className="skill_tag">Prototyping</span>
                  <span className="skill_tag">Figma</span>
                  <span className="skill_tag">React</span>
                  <span className="skill_tag">Tailwind CSS</span>
                </div>

                <div className="mobile_languages">
                  <h4 className="card_title_md">Languages</h4>

                  <div className="language_tags">
                    <span className="language_tag">English (Native)</span>
                    <span className="language_tag">French (Professional)</span>
                  </div>
                </div>
              </div>

              <div className="profile_card">
                <button className="card_edit_button">
                  <span className="material-symbols-outlined edit_icon">
                    edit
                  </span>
                </button>

                <h3 className="card_title_lg">Projects</h3>

                <div className="projects_grid">
                  <div className="project_card">
                    <h4 className="project_title">Reactions at Slack</h4>

                    <p className="project_description">
                      A feature to express emotions through emojis.
                    </p>

                    <div className="project_footer">
                      <div className="project_tags">
                        <span className="project_tag_blue">React</span>
                        <span className="project_tag_purple">GraphQL</span>
                      </div>

                      <a className="project_link" href="#">
                        View Project →
                      </a>
                    </div>
                  </div>

                  <div className="project_card">
                    <h4 className="project_title">Deep Comments at Slack</h4>
                    <p className="project_description">
                      Nested comment threads for better organization.
                    </p>
                    <div className="project_footer">
                      <div className="project_tags">
                        <span className="project_tag_blue">React</span>
                        <span className="project_tag_green">Node.js</span>
                      </div>
                      <a className="project_link" href="#">
                        View Project →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile_card">
                <button className="card_edit_button">
                  <span className="material-symbols-outlined edit_icon">
                    edit
                  </span>
                </button>

                <h3 className="card_title_lg">Certifications</h3>

                <ul className="certification_list">
                  <li className="certification_item">
                    <div>
                      <p className="certification_name">
                        Certified UX Designer
                      </p>
                      <p className="certification_issuer">
                        Nielsen Norman Group
                      </p>
                      <p className="certification_issuer">2023-2024</p>
                    </div>
                  </li>
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
