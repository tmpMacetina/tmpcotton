import React from "react";
import BestSelling from "../../container/BestSelling/BestSelling";
import ForThem from "./ForThem/ForThem";
import HomeHeader from "./HomeHeader/HomeHeader";
// homepage for user
const Home = () => {
  return (
    <>
      <HomeHeader />
      <BestSelling />
      <ForThem />
    </>
  );
};

export default Home;
