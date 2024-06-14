import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faCalendarDay,
  faCar,
  faChild,
  faClock,
  faStar,
  faUserTie,
  faUsers,
  faCircleCheck as faSolidCheck,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck as faRegularCheck,
  faTrashCan as faRegularTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/format";

export const CartItem = (props) => {
  const { item, isActive, handleDeleteItemCart, handleClickChooseTour } = props;
  return (
    <div>
      <h3 className="font-bold text-purple">{item.name}</h3>
      <div
        className={
          isActive
            ? "bg-active grid grid-cols-5 lg:grid-cols-6 gap-3"
            : "grid grid-cols-5 lg:grid-cols-6"
        }
      >
        <Link to={`/tourList/${item.id}`} className="col-span-2">
          <img
            src={item.image}
            alt=""
            className="aspect-[1/1] object-cover w-[250px] rounded-lg  "
          />
        </Link>
        <div className="px-3 leading-8 col-span-2 md:text-base text-sm">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBarcode} className="text-purple" />
            <p>Mã tour:{item.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-purple" />
            <p>Thời gian: {item.quantity_date}</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDay} className="text-purple" />
            <p>Ngày khởi hành: {item.start_date}</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCar} className="text-purple" />
            Phương tiện:
            {item.vehicle.map((list, index) => (
              <React.Fragment key={list.id}>
                {list.nameVehicle}
                {item.vehicle.length - 1 > index ? " - " : ""}
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faStar} className="text-purple" />
            <p>Chất lượng: {item.star}</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUsers} className="text-purple" />
            <p>Số hành khách tối đa: {item.quantity}</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUserTie} className="text-purple" />
            <p>Số người lớn: {item.quantityAdult}</p>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faChild} className="text-purple" />
            <p>Số trẻ em: {item.quantityChildren}</p>
          </div>
          <div className="lg:hidden flex items-center gap-2">
            <FontAwesomeIcon icon={faDollarSign} className="text-purple" />
            <p>
              {formatMoney(item.price_adult)}
              đ/1
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-lg font-bold col-span-1 lg:col-span-2">
          <FontAwesomeIcon
            icon={isActive ? faSolidCheck : faRegularCheck}
            className="text-gray-800 text-xl"
            onClick={() => {
              handleClickChooseTour(item);
            }}
          />
          <p className="text-gray-800 lg:flex hidden">
            {formatMoney(item.price_adult)}
            đ/1
          </p>
          <FontAwesomeIcon
            icon={faRegularTrashCan}
            className="text-red-600 text-xl cursor-pointer"
            onClick={() => handleDeleteItemCart(item)}
          />
        </div>
      </div>
    </div>
  );
};
