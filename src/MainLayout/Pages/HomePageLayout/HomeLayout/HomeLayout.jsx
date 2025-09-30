import Banner from "../Banner/Banner";
import LoadingScreen from "../../../../Components/LoadingScreen/LoadingScreen";
import useUserData from "../../../../Hooks/userData";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

const HomeLayout = () => {
  const { isLoading } = useUserData();
  const { userLoading } = useContext(AuthContext);

  if (isLoading || userLoading) {
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