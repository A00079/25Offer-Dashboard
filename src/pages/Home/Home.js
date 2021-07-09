import React, { useState, useEffect } from "react";
import { Stats, AllUserEarnings } from "./components";

const Home = () => {
  return (
    <div className="p-3 space-y-4 bg-white">
      <Stats />
      <AllUserEarnings />
    </div>
  );
};

export default Home;
