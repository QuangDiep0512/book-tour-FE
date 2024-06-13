import React from "react";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ButtonAddToCart } from "./ButtonAddToCart";
import { formatMoney } from "../utils/format";
import { faHotel, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
export const ListTourItem = (props) => {
  const { item } = props;

  //Đưa dữ liệu vào localStorage
  const handleTourViewed = () => {
    let dataStorage = JSON.parse(localStorage.getItem("tourViewed")) || [];
    let isExist = dataStorage.find((element) => {
      return element.id === item.id;
    });
    if (!isExist) {
      dataStorage.push(item);
      localStorage.setItem("tourViewed", JSON.stringify(dataStorage));
    }
  };
  return (
    <div className="shadow-md shadow-slate-400 rounded-md overflow-hidden">
      <Link to={`/tourList/${item.id}`}>
        <img
          src={item.image}
          alt=""
          className="object-cover aspect-[4/2] w-full"
          onClick={handleTourViewed}
        />
      </Link>
      <div className="p-4">
        <h3
          className={`${
            window.location.pathname === "/"
              ? "font-bold text-lg mb-3 text-[#494e53] min-h-[80px]"
              : "font-bold text-[15px] mb-3 text-[#494e53] h-16 line-clamp-3"
          }`}
        >
          {item.name}
        </h3>
        <div
          className={`min-h-[150px] ${
            window.location.pathname === "/" ? "text-base" : "text-[15px]"
          }`}
        >
          <div className="flex-center">
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon className="text-zinc-700 w-6" icon={faClock} />
              <p>{item.quantity_date} </p>
            </div>
            <span
              className={`${
                window.location.pathname === "/"
                  ? "text-orange font-bold"
                  : "hidden"
              }`}
            >
              {`${formatMoney(item.price_adult)} VNĐ`}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon className="text-zinc-700 w-6" icon={faCalendar} />
            <p>{item.start_date} </p>
          </div>
          <div className="flex gap-2 items-baseline">
            <FontAwesomeIcon
              className="text-zinc-700 w-6"
              icon={faPlaneDeparture}
            />
            {item.vehicle.map((list, index) => (
              <React.Fragment key={list.id}>
                {list.nameVehicle}
                {item.vehicle.length - 1 > index ? " - " : ""}
              </React.Fragment>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faHotel} className="text-zinc-700 w-6" />
            <p>{item.star}&nbsp;sao </p>
          </div>
          <span
            className={`${
              window.location.pathname === "/"
                ? "hidden"
                : "text-orange-500 font-bold text-right block my-2 text-orange"
            }`}
          >
            {`${formatMoney(item.price_adult)} VNĐ`}
          </span>
        </div>
        <div className="text-center">
          <ButtonAddToCart item={item} />
        </div>
      </div>
    </div>
  );
};
