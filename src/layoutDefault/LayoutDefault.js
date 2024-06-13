import React from "react";
import { Fotter } from "../components/Fotter";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export const LayoutDefault = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Fotter />
    </div>
  );
};
