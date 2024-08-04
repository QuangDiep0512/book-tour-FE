import React from "react";
import { Fotter } from "../components/Fotter";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export const LayoutDefault = () => {
  return (
    <div className="h-[100vh]">
      <Header />
      <Outlet />
      <Fotter />
    </div>
  );
};
