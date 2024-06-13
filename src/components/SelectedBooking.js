import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faCalendar,
  faChild,
  faClock,
  faPlaneDeparture,
  faStar,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { totalPriceTour } from "../utils/format";
import { useSelector } from "react-redux";

export const SelectedBooking = () => {
  const selectedTour = useSelector((state) => state.cartReducer.selectedTour);
  return (
    <div className="col-span-1 w-full">
      <div className="hover:text-003C71 transition-all bg-orange text-lg text-center text-white p-5 rounded-lg cursor-pointer">
        <span className="font-normal">Hỗ trợ giao dịch: </span>
        <span className="font-extrabold">1900 1008</span>
      </div>
      <div className="shadow-md shadow-slate-400 mt-3 rounded-md overflow-hidden">
        <Link to={`/tourList/${selectedTour.id}`}>
          <img
            src={selectedTour.image}
            alt=""
            className="object-cover aspect-[4/2] w-full"
          />
        </Link>
        <div className="p-4">
          <h3 className="font-medium text-2xl mb-3 text-[#494e53] min-h-[80px]">
            {selectedTour.name}
          </h3>
          <div className="min-h-[150px] text-base">
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon className="text-zinc-700 w-6" icon={faBarcode} />
              <p>Mã tour: {selectedTour.id} </p>
            </div>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon className="text-zinc-700 w-6" icon={faClock} />
              <p>Thời gian: {selectedTour.quantity_date} </p>
            </div>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon
                className="text-zinc-700 w-6"
                icon={faCalendar}
              />
              <p>Ngày khởi hành: {selectedTour.start_date} </p>
            </div>
            <div className="flex gap-2 items-baseline">
              <FontAwesomeIcon
                className="text-zinc-700 w-6"
                icon={faPlaneDeparture}
              />
              <p>
                Phương tiện:
                {selectedTour.vehicle.map((list, index) => (
                  <React.Fragment key={list.id}>
                    {list.nameVehicle}
                    {selectedTour.vehicle.length - 1 > index ? " - " : ""}
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faStar} className="text-zinc-700 w-6" />
              <p>Chất lượng: {selectedTour.star}</p>
            </div>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faUsers} className="text-zinc-700 w-6" />
              <p>Số hành khách tối đa: {selectedTour.quantity}</p>
            </div>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faUser} className="text-zinc-700 w-6" />
              <p>Số người lớn: {selectedTour.quantityAdult}</p>
            </div>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faChild} className="text-zinc-700 w-6" />
              <p>Số trẻ em: {selectedTour.quantityChildren}</p>
            </div>
            <span className="mt-4 block text-2xl">
              Tổng tiền:&nbsp;
              <span className="text-orange font-bold">
                {`${totalPriceTour(
                  selectedTour.price_adult,
                  selectedTour.price_child,
                  selectedTour.quantityAdult,
                  selectedTour.quantityChildren
                )} VNĐ`}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
