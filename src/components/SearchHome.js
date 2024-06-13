import React from "react";
import bannerTour from "../imgs/bannerTour.png";
import { SearchTrip } from "./SearchTrip";

export const SearchHome = () => {
  return (
    <div
      className="relative w-full min-h-[320px] flex justify-center items-center"
      style={{
        backgroundImage: `url(${bannerTour})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SearchTrip />
    </div>
  );
};
