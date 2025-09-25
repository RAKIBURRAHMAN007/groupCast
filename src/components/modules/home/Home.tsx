import HeroSection from "./hero/HeroSection";
import Feature from "./feature/Feature";
import About from "./aboutSection/About";
import Technology from "./buildingTecnology/Technology";
import WorksSystem from "./howWorks/WorksSystem";
import WhyUs from "./whyUs/WhyUs";
import JobPlacement from "./jobPlacementSuit/JobPlacement";
import Pricing from "./pricing/Pricing";
import Review from "./review/Review";
import Faq from "./faq/Faq";

const Home = () => {
  return (
    <div className="bg-[#F9FBFF] pb-36">
      <HeroSection></HeroSection>
      <Feature></Feature>
      <About></About>
      <Technology></Technology>
      <WorksSystem></WorksSystem>
      <WhyUs></WhyUs>
      <JobPlacement></JobPlacement>
      <Pricing></Pricing>
      <Review></Review>
      <Faq></Faq>
    </div>
  );
};

export default Home;
