import React, { useState } from "react";
import { faCircleCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMoney } from "../utils/format";
import { ButtonAddToCart } from "./ButtonAddToCart";
export const DepartureInfor = (props) => {
  const { item } = props;
  const [changeQuantityAdult, setChangeQuantityAdult] = useState(1);
  const [changeQuantityChildren, setChangeQuantityChildren] = useState(0);
  const handleIncreaseAdult = () => {
    setChangeQuantityAdult((prev) => prev + 1);
  };

  const handleDecreaseAdult = () => {
    if (changeQuantityAdult > 1) {
      setChangeQuantityAdult((prev) => prev - 1);
    }
  };

  const handleIncreaseChidren = () => {
    setChangeQuantityChildren((prev) => prev + 1);
  };

  const handleDecreaseChidren = () => {
    if (changeQuantityChildren > 0) {
      setChangeQuantityChildren((prev) => prev - 1);
    }
  };

  const totalPrice = (price_adult, price_child) => {
    return (
      changeQuantityAdult * price_adult + changeQuantityChildren * price_child
    );
  };
  return (
    <div className="col-span-1  h-[100vh] sticky top-0">
      <div className="mb-3 bg-white  p-5">
        <h2 className="font-bold text-2xl text-purple">Lịch khởi hành & giá</h2>
        <p className="my-2">Chọn ngày khởi hành:</p>
        <div className="my-2">
          <div className="box-calendar">{item.start_date}</div>
          <div className="box-calendar flex-center my-5">
            <span>Người lớn</span>
            <span className="text-lightYellow">
              x {formatMoney(item.price_adult)}
            </span>
            <div>
              <span
                className="btn-inc_dec cursor-pointer"
                onClick={handleDecreaseAdult}
              >
                -
              </span>
              <span className="px-2">{changeQuantityAdult}</span>
              <span
                className="btn-inc_dec cursor-pointer"
                onClick={handleIncreaseAdult}
              >
                +
              </span>
            </div>
          </div>
          <div className="box-calendar flex-center">
            <span>Trẻ em</span>
            <span className="text-lightYellow">
              {changeQuantityChildren > 0 &&
                `x ${formatMoney(item.price_child)}`}
            </span>
            <div>
              <span
                className="btn-inc_dec cursor-pointer"
                onClick={handleDecreaseChidren}
              >
                -
              </span>
              <span className="px-2">{changeQuantityChildren}</span>
              <span
                className="btn-inc_dec cursor-pointer"
                onClick={handleIncreaseChidren}
              >
                +
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-purple">
          <FontAwesomeIcon icon={faCircleInfo} />
          <p className="ml-2 leading-10">Liên hệ để xác nhận chỗ</p>
        </div>
        <div className="flex items-center text-purple">
          <FontAwesomeIcon icon={faCircleInfo} />
          <p className="ml-2 leading-10">Trẻ em từ 2 đến 7 tuổi</p>
        </div>
        <div className="flex-center my-5">
          <p className="font-bold text-purple">Tổng cộng</p>
          <div className="flex-center">
            <span className="text-lightYellow font-bold text-2xl">
              {formatMoney(totalPrice(item.price_adult, item.price_child))}
            </span>
            <p className="text-sm text-lightYellow">&nbsp;VNĐ</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="border border-solid rounded-lg text-orange-500 p-2 bg-white border-orange-600 hover:bg-orange-500 hover:text-white transition-all">
            Liên hệ tư vấn
          </button>
          <ButtonAddToCart
            item={item}
            quantityChildren={changeQuantityChildren}
            quantityAdult={changeQuantityAdult}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 mb-3 bg-white p-5">
        {item.tour_services.map((list) => {
          return (
            <div className="flex items-center " key={list.id}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-orange-500"
              />
              <p className="ml-2">{list.nameService}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
