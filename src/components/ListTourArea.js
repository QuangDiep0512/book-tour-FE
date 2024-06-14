import React from "react";
import { ListTourItem } from "./ListTourItem";

export const ListTourArea = (props) => {
  const {
    activeSort,
    handleSortedByDate,
    handleSortedByDuration,
    handleSortedByPrice,
    location,
  } = props;
  return (
    <div className="col-span-3">
      <h2 className="lg:text-4xl md:text-3xl text-[24px]  font-bold text-purple">
        Tour Du Lịch giá tốt nhất trong năm nay
      </h2>
      <ul className="grid grid-cols-4 text-center text-sm md:text-base my-4 border border-solid border-[#c0bebe]">
        <li className="p-2 bg-white col-span-1 ">Sắp xếp theo:</li>
        <li
          className={`${
            activeSort === "duration" ? "bg-grey" : "bg-white"
          } p-2 col-span-1 cursor-pointer hover:bg-grey`}
          onClick={handleSortedByDuration}
        >
          Thời lượng tour
        </li>
        <li
          className={`${
            activeSort === "date" ? "bg-grey" : "bg-white"
          } p-2 col-span-1 cursor-pointer hover:bg-grey`}
          onClick={handleSortedByDate}
        >
          Ngày khởi hành
        </li>
        <li
          className={`${
            activeSort === "price" ? "bg-grey" : "bg-white"
          } p-2 col-span-1 cursor-pointer hover:bg-grey`}
          onClick={handleSortedByPrice}
        >
          Giá tour
        </li>
      </ul>
      {/* <div> */}
      <div className="my-[40px] grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {location.map((item) => {
          return <ListTourItem item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};
