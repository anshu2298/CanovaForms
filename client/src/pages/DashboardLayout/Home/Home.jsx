import ActionCards from "../../../components/actionCards/ActionCards";
import RecentWorks from "../../../components/recentWorks/RecentWorks";
import SharedWorks from "../../../components/sharedWorks/SharedWorks";
import "./Home.css";
const Home = () => {
  return (
    <>
      <ActionCards />
      <RecentWorks />
      <SharedWorks />
    </>
  );
};

export default Home;
