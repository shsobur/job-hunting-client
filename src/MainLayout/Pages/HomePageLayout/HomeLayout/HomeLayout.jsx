import "./HomeLayout.css";
import Banner from "../Banner/Banner";
import LoadingScreen from "../../../../Components/LoadingScreen/LoadingScreen";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import FeaturedJobs from "../FeaturedJobs/FeaturedJobs";
import Footer from "../../../../Shared/Footer/Footer";

const HomeLayout = () => {
  const { userLoading } = useContext(AuthContext);

  if (userLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="main_sections_container">
        {/* Background Layer */}
        <div className="sections_bg_layer">
          <div className="bg_gradient"></div>
          <div className="bg_circles">
            <div className="bg_circle circle1"></div>
            <div className="bg_circle circle2"></div>
            <div className="bg_circle circle3"></div>
            <div className="bg_circle circle4"></div>
          </div>
        </div>

        {/* Content Layer */}
        <div className="sections_content_layer">
          <Banner />
          <WhyChooseUs />
          <FeaturedJobs />
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
