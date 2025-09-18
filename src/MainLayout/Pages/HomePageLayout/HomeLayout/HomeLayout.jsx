import Banner from "../Banner/Banner";
import LoadingScreen from "../../../../Components/LoadingScreen/LoadingScreen";
import useUserData from "../../../../Hooks/userData";

const HomeLayout = () => {
  const { isLoading } = useUserData();

  if (isLoading) {
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