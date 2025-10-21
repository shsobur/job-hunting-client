import "./HomeLayout.css";
import Banner from "../Banner/Banner";
import LoadingScreen from "../../../../Components/LoadingScreen/LoadingScreen";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const HomeLayout = () => {
  const { userLoading } = useContext(AuthContext);

  if (userLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section>
        <Banner />
        <WhyChooseUs />
      </section>
    </>
  );
};

export default HomeLayout;
