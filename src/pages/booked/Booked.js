import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faCalendar,
  faCalendarDay,
  faCar,
  faChild,
  faClock,
  faCreditCard,
  faDollarSign,
  faStar,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { totalPriceTour } from "../../utils/format";
import { useNavigate } from "react-router-dom";

export const Booked = () => {
  const booked = useSelector((state) => state.bookedReducer);
  const navigate = useNavigate();

  function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div>
      <div className="shadow-lg max-w-[1100px] mx-auto shadow-slate-400 mt-3 px-6 min-h-[400px] overflow-y-scroll">
        {booked && booked.length > 0 ? (
          booked.map((item, index) => {
            return (
              <div key={index} className="mb-7 py-4 border-b-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-purple">{item.name}</h3>
                    <div className="flex">
                      <img
                        src={item.image}
                        alt=""
                        className="aspect-[2/2] object-cover w-[250px] rounded-lg  "
                      />
                      <div className="px-3 leading-8 col-span-2 md:text-base text-sm">
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faBarcode}
                            className="text-purple w-5"
                          />
                          <p>Mã tour:{item.idTour}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="text-purple w-5"
                          />
                          <p>Thời gian: {item.quantity_date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faCalendarDay}
                            className="text-purple w-5"
                          />
                          <p>Ngày khởi hành: {item.start_date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faCar}
                            className="text-purple w-5"
                          />
                          Phương tiện:
                          {item.vehicle.map((list, index) => (
                            <React.Fragment key={list.id}>
                              {list.nameVehicle}
                              {item.vehicle.length - 1 > index ? " - " : ""}
                            </React.Fragment>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faStar}
                            className="text-purple w-5"
                          />
                          <p>Chất lượng: {item.star}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faUserTie}
                            className="text-purple w-5"
                          />
                          <p>Số người lớn: {item.quantityAdult}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faChild}
                            className="text-purple w-5"
                          />
                          <p>Số trẻ em: {item.quantityChildren}</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <FontAwesomeIcon
                            icon={faCreditCard}
                            className="text-purple w-5"
                          />
                          <p>Hình hức thanh toán: {item.title}</p>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-purple w-5"
                          />
                          <p>Ngày xác nhận thanh toán: {getCurrentDate()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faDollarSign}
                            className="text-purple w-5"
                          />
                          <p>
                            <span>Tổng tiền: </span>
                            <span className="text-orange font-bold">
                              {`${totalPriceTour(
                                item.price_adult,
                                item.price_child,
                                item.quantityAdult,
                                item.quantityChildren
                              )} VNĐ`}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-orange font-bold min-w-[150px] text-lg">
                    Chờ thanh toán...
                  </p>
                </div>
                <div className="flex justify-end">
                  <button className="min-w-[150px] text-lg py-1 text-white rounded-md bg-orange">
                    Đánh giá
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="mb-7 py-4 border-b-2 min-h-[200px] flex items-center justify-center text-3xl text-purple italic">
            Chưa có Tour nào được đặt
          </div>
        )}
      </div>
    </div>
  );
};
