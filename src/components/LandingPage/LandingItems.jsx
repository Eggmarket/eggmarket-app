"use client";

import React from "react";
import LandingCalculator from "./LandingCalculator";
import LandingLastLoads from "./LandingLastLoads";
import LandingDayPrice from "./LandingDayPrice";

const LandingItems = () => {
  return (
    <div className="my-8 flex flex-col gap-8">
      <LandingLastLoads />
      <LandingDayPrice />
      <LandingCalculator />
    </div>
  );
};

export default LandingItems;
