import React from "react";

import HeroSection from "./hero/HeroSection";
import Feature from "./feature/Feature";
import About from "./aboutSection/About";
import Technology from "./buildingTecnology/Technology";

const Home = () => {
  return (
    <div className="bg-[#F9FBFF]">
      <HeroSection></HeroSection>
      <Feature></Feature>
      <About></About>
      <Technology></Technology>
    </div>
  );
};

export default Home;
