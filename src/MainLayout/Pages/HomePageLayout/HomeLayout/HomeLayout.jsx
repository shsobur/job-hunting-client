import Banner from "../Banner/Banner";
import LoadingScreen from "../../../../Components/LoadingScreen/LoadingScreen";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

const HomeLayout = () => {
  const { userLoading } = useContext(AuthContext);

  if (userLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section>
        <Banner></Banner>
      </section>
    </>
  );
};

export default HomeLayout;