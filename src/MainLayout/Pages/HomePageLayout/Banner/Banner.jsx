// File path__
import "./Banner.css";
import bannerImage from "../../../../assets/bannerImage.webp";

// From react__
import { useEffect, useState } from "react";

// Package__
import Swal from "sweetalert2";

const Banner = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  // Get use screen size__
  useEffect(() => {
    const handleScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleScreenSize);

    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  // Massage for mobile user__
  useEffect(() => {
    if (screenSize.width < 640 && !sessionStorage.getItem("mobileAlert")) {
      Swal.fire({
        title: "Hi there! 👋🏻",
        text: "Welcome! This website looks best on a tablet or desktop💻 for the full experience. Don't worry—our app is coming soon so you can enjoy it on mobile📱 too!",
        icon: "info",
      });

      sessionStorage.setItem("mobileAlert", "shown");
    }
  }, [screenSize]);

  return (
    <>
      <section id="main_banner_container">
        {/* Floating background circles */}
        <div className="floating_circles">
          <div className="circle circle_1"></div>
          <div className="circle circle_2"></div>
          <div className="circle circle_3"></div>
          <div className="circle circle_4"></div>
        </div>

        <div className="banner_content_container">
          <div className="banner_content">
            <div className="text_section">
              <div className="content_wrapper">
                <div className="badge">
                  <span className="badge_icon">🚀</span>
                  Start Your Journey Today
                </div>

                <h1 className="banner_title">
                  Find The Job That
                  <span className="highlighted_text"> Fits Your Life</span>
                </h1>

                <p className="description">
                  Join over 10 million professionals who found their dream
                  careers with us. Discover opportunities that match your skills
                  and lifestyle aspirations.
                </p>

                <div className="cta_section">
                  <button className="cta_btn primary">
                    <span className="btn_text">Explore Jobs</span>
                    <span className="btn_icon">→</span>
                  </button>
                  <button className="cta_btn secondary">
                    <span className="btn_text">News Feed</span>
                  </button>
                </div>

                <div className="stats_section">
                  <div className="stat_item">
                    <div className="stat_number">10M+</div>
                    <div className="stat_label">Job Seekers</div>
                  </div>
                  <div className="stat_divider"></div>
                  <div className="stat_item">
                    <div className="stat_number">50K+</div>
                    <div className="stat_label">Companies</div>
                  </div>
                  <div className="stat_divider"></div>
                  <div className="stat_item">
                    <div className="stat_number">120+</div>
                    <div className="stat_label">Countries</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="image_section">
              <div className="image_container">
                <div className="main_image_wrapper">
                  <img
                    src={bannerImage}
                    alt="Professional Career Success"
                    className="main_image"
                  />
                  <div className="image_overlay"></div>
                </div>

                {/* Floating achievement cards */}
                <div className="floating_card experience">
                  <div className="card_icon">⭐</div>
                  <div className="card_content">
                    <div className="card_value">95%</div>
                    <div className="card_label">Success Rate</div>
                  </div>
                </div>

                <div className="floating_card jobs">
                  <div className="card_icon">💼</div>
                  <div className="card_content">
                    <div className="card_value">1,234+</div>
                    <div className="card_label">New Jobs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;