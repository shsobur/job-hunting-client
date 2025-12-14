import "./UserChatLayout.css";

const UserChatLayout = () => {
  return (
    <>
      <div className="ucl-container">
        {/* Left Sidebar - Recruiters List */}
        <div className="ucl-sidebar">
          <div className="ucl-sidebar-header">
            <h2 className="ucl-title">👤 Your Conversations</h2>
            <div className="ucl-notification">
              <span className="ucl-notification-badge">3</span>
              <span className="ucl-notification-text">New messages</span>
            </div>
          </div>

          <div className="ucl-recruiters-list">
            {/* Recruiter Card - Selected */}
            <div className="ucl-recruiter-card ucl-selected">
              <div className="ucl-recruiter-avatar">TC</div>
              <div className="ucl-recruiter-info">
                <h4 className="ucl-recruiter-name">TechCorp Inc.</h4>
                <p className="ucl-recruiter-position">Senior Developer Role</p>
                <div className="ucl-last-message">
                  "We reviewed your resume and found it interesting..."
                </div>
              </div>
              <div className="ucl-message-info">
                <span className="ucl-time">10:30 AM</span>
                <div className="ucl-unread-badge">2</div>
              </div>
            </div>

            {/* Recruiter Card */}
            <div className="ucl-recruiter-card">
              <div className="ucl-recruiter-avatar">DI</div>
              <div className="ucl-recruiter-info">
                <h4 className="ucl-recruiter-name">Design Innovate</h4>
                <p className="ucl-recruiter-position">UI/UX Designer</p>
                <div className="ucl-last-message">
                  "When are you available for an interview?"
                </div>
              </div>
              <div className="ucl-message-info">
                <span className="ucl-time">Yesterday</span>
                <div className="ucl-unread-badge">0</div>
              </div>
            </div>

            {/* Recruiter Card */}
            <div className="ucl-recruiter-card">
              <div className="ucl-recruiter-avatar">SI</div>
              <div className="ucl-recruiter-info">
                <h4 className="ucl-recruiter-name">Startup Ideas</h4>
                <p className="ucl-recruiter-position">Frontend Developer</p>
                <div className="ucl-last-message">
                  "We'll send you the coding challenge soon."
                </div>
              </div>
              <div className="ucl-message-info">
                <span className="ucl-time">2 days ago</span>
                <div className="ucl-unread-badge">1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="ucl-chat-area">
          {/* Chat Header */}
          <div className="ucl-chat-header">
            <div className="ucl-chat-recruiter">
              <div className="ucl-chat-avatar">TC</div>
              <div>
                <h3 className="ucl-chat-name">TechCorp Inc.</h3>
                <p className="ucl-chat-position">Senior Developer Position</p>
              </div>
            </div>
            <div className="ucl-chat-status">
              <span className="ucl-permission-note">
                ⚠️ You can only reply to messages
              </span>
            </div>
          </div>

          {/* Permission Info */}
          <div className="ucl-permission-info">
            <p className="ucl-permission-text">
              You can only send messages to recruiters who have contacted you
              first. This prevents spam and ensures quality conversations.
            </p>
          </div>

          {/* Messages Container */}
          <div className="ucl-messages-container">
            {/* Received Message */}
            <div className="ucl-message ucl-received">
              <div className="ucl-message-sender">TechCorp HR</div>
              <div className="ucl-message-content">
                Hello! We reviewed your resume for the Senior Developer position
                and found it interesting. Are you available for an interview
                next week?
              </div>
              <div className="ucl-message-time">10:30 AM</div>
            </div>

            {/* Sent Message */}
            <div className="ucl-message ucl-sent">
              <div className="ucl-message-content">
                Yes, I'm available. Thank you for considering my application!
              </div>
              <div className="ucl-message-time">10:35 AM</div>
            </div>

            {/* Received Message */}
            <div className="ucl-message ucl-received">
              <div className="ucl-message-sender">TechCorp HR</div>
              <div className="ucl-message-content">
                Great! We'll send you the interview details via email. Please
                check your inbox.
              </div>
              <div className="ucl-message-time">10:40 AM</div>
            </div>

            {/* Sent Message */}
            <div className="ucl-message ucl-sent">
              <div className="ucl-message-content">
                Looking forward to it. I'll check my email.
              </div>
              <div className="ucl-message-time">10:42 AM</div>
            </div>
          </div>

          {/* Message Input */}
          <div className="ucl-input-area">
            <input
              type="text"
              placeholder="Type your reply..."
              className="ucl-message-input"
            />
            <button className="ucl-send-btn">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChatLayout;