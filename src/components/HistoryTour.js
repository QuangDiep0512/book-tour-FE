import {
  faClose,
  faCreditCard,
  faMapLocation,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { formatMoney } from "../utils/format";
import { Link } from "react-router-dom";

export const HistoryTour = () => {
  const [viewedTour, setViewedTour] = useState([]);
  const [userLogin, setUserLogin] = useState("");

  const handleDeleteViewedTour = (item) => {
    const result = viewedTour.filter((list) => list.id !== item.id);
    setViewedTour(result);
    localStorage.setItem("tourViewed", JSON.stringify(result));
  };

  useEffect(() => {
    let dataViewedStorage = JSON.parse(localStorage.getItem("tourViewed"));
    if (dataViewedStorage) {
      setViewedTour(dataViewedStorage.slice(0, 3));
    }
  }, []);
  // const watched = false;
  const service = [
    {
      icon: faVoicemail,
      title: "Tư Vấn Chuyên Nghiệp",
      detail: "Hỗ trợ nhiệt tình, chăm sóc chu đáo",
    },
    {
      icon: faMapLocation,
      title: "Trải Nghiệm Đa Dạng",
      detail: "Chọn tour phù hợp, giá tour hợp lý",
    },
    {
      icon: faCreditCard,
      title: "Thanh Toán An Toàn",
      detail: "Linh hoạt, rõ ràng, bảo mật",
    },
  ];
  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("user"));
    if (userLogin) {
      setUserLogin(true);
    } else {
      setUserLogin(false);
    }
  }, [userLogin]);
  return (
    <div className="bg-grey px-[100px] pt-[40px]">
      <div className=" flex md:flex-row flex-col md:gap-[80px] gap-5 md:justify-between">
        {service.map((item, index) => {
          return (
            <div className="flex items-center gap-[10px]" key={index}>
              <FontAwesomeIcon
                icon={item.icon}
                className="md:text-3xl text-2xl text-003C71"
              />
              <div className="flex flex-col">
                <h3 className="md:text-xl text-lg text-[#2a3a41]">
                  {item.title}
                </h3>
                <p className="text-003C71 sm:text-sm">{item.detail}</p>
              </div>
            </div>
          );
        })}
        {/* Tours du lịch bạn đã xem gần đây */}
      </div>
      <div className="py-[30px]">
        <h2 className="text-[32px] text-003C71">
          Tours du lịch bạn đã xem gần đây
        </h2>
        <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {userLogin &&
            viewedTour.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex gap-[10px] bg-white shadow-lg shadow-indigo-500/40 mb-4 rounded-lg overflow-hidden"
                >
                  <Link to={`/tourList/${item.id}`} className="flex">
                    <img src={item.image} alt="" className="viewed_tour" />
                    <div className="flex flex-col text-sm py-2 pl-2">
                      <p className=" text-003C71 font-bold lg:min-h-[60px] min-h-[80px]">
                        {item.name}
                      </p>
                      <div className="mt-3">
                        <span className="p-1 bg-orange-600 rounded-md text-white bg-orange font-bold mr-2">
                          8.5
                        </span>
                        <span className="text-orange-600 font-bold  text-orange">
                          Rất tốt
                        </span>
                      </div>
                      <span className="text-end text-green-600 font-bold">
                        {`${formatMoney(item.price_adult)} VNĐ`}
                      </span>
                    </div>
                  </Link>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="mt-2 mr-1 cursor-pointer"
                    onClick={() => {
                      handleDeleteViewedTour(item);
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
