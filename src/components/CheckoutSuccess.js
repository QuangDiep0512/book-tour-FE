import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addBooked } from "../actions/Booked";
import { useNavigate } from "react-router-dom";

export const CheckoutSuccess = ({ setStep }) => {
  const tourCheckout = useSelector((state) => state.checkoutReducer);
  const dispath = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispath(addBooked(tourCheckout));
    setStep(6);
  }, []);

  window.onpopstate = () => {
    navigate("/cart");
  };

  return (
    <div className="min-w-[600px] items-center bg-red flex flex-col">
      <div className="mb-2 p-4 bg-grey">
        <h3 className="text-center text-3xl text-cyan-500">
          Xác nhận thành công!
        </h3>
        <div className="text-lg leading-10">
          <p>Quý khách vui lòng kiểm tra email để biết thêm thông tin</p>
          <p>
            Quý khách có bất kì thắc mắc hoặc vấn để gì hãy liên hệ:{" "}
            <span className="text-purple font-bold">1900 1808</span> để được tư
            vấn
          </p>
          <p>Rất vui khi được phục vụ quý khách</p>
          <p>Xin cảm ơn!</p>
        </div>
      </div>
      <div className="flex justify-between gap-[150px]">
        <Link to={"/"}>
          <button className="p-3 bg-purple text-white rounded-md">
            Trở về trang chủ
          </button>
        </Link>
        <Link to={"/cart"}>
          <button className="p-3 bg-orange text-white rounded-md">
            Tiếp tục mua tour
          </button>
        </Link>
        <Link to={"/booked"}>
          <button className="p-3 bg-purple text-white rounded-md">
            Tour đã đặt
          </button>
        </Link>
      </div>
    </div>
  );
};
