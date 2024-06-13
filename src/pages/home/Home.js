import React from "react";
import { SearchHome } from "../../components/SearchHome";
import { HistoryTour } from "../../components/HistoryTour";
import { HomeCollection } from "../../components/HomeCollection";

export const Home = () => {
  return (
    <div className="">
      <SearchHome />
      <HistoryTour />
      <HomeCollection />
    </div>
  );
};
