import React, { useEffect } from "react";
import { ListTourItem } from "./ListTourItem";

export const ListTour = (props) => {
  const { data, title, des } = props;
  return (
    <>
      <div className="my-[60px] px-[100px]">
        <h2 className="font-bold text-2xl lg:text-4xl text-[#212529] my-4">
          {title}
        </h2>
        <h4 className=" font-normal text-lg lg:text-2xl text-[#383c3f]">
          {des}
        </h4>
        <div className="my-[40px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {data.map((item) => {
            return <ListTourItem item={item} key={item.id} />;
          })}
        </div>
      </div>
    </>
  );
};
