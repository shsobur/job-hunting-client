import "./Banner.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

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
    if (screenSize.width < 640 && ! sessionStorage.getItem("mobileAlert")) {
      Swal.fire({
        title: "Hi there! 👋🏻",
        text: "Welcome! This website looks best on a tablet or desktop💻 for the full experience. Don’t worry—our app is coming soon so you can enjoy it on mobile📱 too!",
        icon: "info",
      });

      sessionStorage.setItem("mobileAlert", "shown")
    }
  }, [screenSize]);

  return (
    <>
      <section id="main_banner_container">
        <div className="banner_bg_image_container">
          <div className="banner_overlay_container">
            <div className="banner_content">
              <h1>Find the job that fits you life</h1>
              <p>
                Join over 10 million people finding careers with us. Explore
                opportunities that match you skill adn aspirations.
              </p>

              <div className="jon_search_input_container">
                <form>
                  <input
                    type="text"
                    name="job"
                    placeholder="🔍 Job title or keyword"
                  />
                  <button>Search</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
