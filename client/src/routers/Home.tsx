import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewSletterBox from "../components/NewSletterBox";
import Policy from "../components/Policy";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Policy />
      <NewSletterBox />
    </div>
  );
};

export default Home;
