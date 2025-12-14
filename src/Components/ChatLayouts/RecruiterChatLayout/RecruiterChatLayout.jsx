import "./RecruiterChatLayout.css";

const RecruiterChatLayout = () => {
  return (
    <>
      <div className="rcl-container">
      {/* Left Sidebar - Applicants List */}
      <div className="rcl-sidebar">
        <div className="rcl-sidebar-header">
          <h2 className="rcl-title">💼 Job Applicants</h2>
          <div className="rcl-stats">
            <span className="rcl-stat-item">Total: 12</span>
            <span className="rcl-stat-item">New: 3</span>
          </div>
        </div>

        <div className="rcl-applicants-list">
          {/* Applicant Card - Selected */}
          <div className="rcl-applicant-card rcl-selected">
            <div className="rcl-applicant-avatar">JD</div>
            <div className="rcl-applicant-info">
              <h4 className="rcl-applicant-name">John Doe</h4>
              <p className="rcl-applicant-job">Senior Developer</p>
              <div className="rcl-applicant-meta">
                <span className="rcl-applicant-skills">React, Node.js</span>
                <span className="rcl-applicant-experience">5 yrs</span>
              </div>
            </div>
            <div className="rcl-applicant-actions">
              <button className="rcl-accept-btn">Accept</button>
              <div className="rcl-unread-count">2</div>
            </div>
          </div>

          {/* Applicant Card */}
          <div className="rcl-applicant-card">
            <div className="rcl-applicant-avatar">SA</div>
            <div className="rcl-applicant-info">
              <h4 className="rcl-applicant-name">Sarah Ahmed</h4>
              <p className="rcl-applicant-job">UI/UX Designer</p>
              <div className="rcl-applicant-meta">
                <span className="rcl-applicant-skills">Figma, Adobe XD</span>
                <span className="rcl-applicant-experience">3 yrs</span>
              </div>
            </div>
            <div className="rcl-applicant-actions">
              <button className="rcl-accept-btn">Accept</button>
              <div className="rcl-unread-count">0</div>
            </div>
          </div>

          {/* Applicant Card */}
          <div className="rcl-applicant-card">
            <div className="rcl-applicant-avatar">MR</div>
            <div className="rcl-applicant-info">
              <h4 className="rcl-applicant-name">Mike Rahim</h4>
              <p className="rcl-applicant-job">DevOps Engineer</p>
              <div className="rcl-applicant-meta">
                <span className="rcl-applicant-skills">AWS, Docker</span>
                <span className="rcl-applicant-experience">4 yrs</span>
              </div>
            </div>
            <div className="rcl-applicant-actions">
              <button className="rcl-accept-btn">Accept</button>
              <div className="rcl-unread-count">1</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="rcl-chat-area">
        {/* Chat Header */}
        <div className="rcl-chat-header">
          <div className="rcl-chat-applicant">
            <div className="rcl-chat-avatar">JD</div>
            <div>
              <h3 className="rcl-chat-name">John Doe</h3>
              <p className="rcl-chat-job">Senior Developer Applicant</p>
            </div>
          </div>
          <div className="rcl-chat-status">
            <span className="rcl-status-dot"></span>
            <span className="rcl-status-text">Not contacted</span>
          </div>
        </div>

        {/* Auto Message Section */}
        <div className="rcl-auto-message-section">
          <h4 className="rcl-auto-title">First Contact Message</h4>
          <div className="rcl-auto-message-preview">
            "Hello John, we reviewed your resume and found it interesting for 
            the Senior Developer position. We'd like to schedule an interview. 
            Please check your email for details."
          </div>
          <button className="rcl-send-auto-btn">Send Auto Message</button>
        </div>

        {/* Messages Container */}
        <div className="rcl-messages-container">
          <div className="rcl-no-messages">
            <p>No messages yet. Send the auto message to start conversation.</p>
          </div>
        </div>

        {/* Message Input */}
        <div className="rcl-input-area">
          <input 
            type="text" 
            placeholder="Type your message..."
            className="rcl-message-input"
          />
          <button className="rcl-send-btn">Send</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default RecruiterChatLayout