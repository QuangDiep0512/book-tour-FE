import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { DepartureInfor } from "./DepartureInfor";
import { Comment } from "./Comment";

export const TourDetail = (props) => {
  const { tourDetail } = props;

  return (
    <div className="bg-grey py-5">
      {tourDetail.map((item) => {
        return (
          <div className="max-w-[1100px] mx-auto " key={item.id}>
            <h2 className="text-3xl text-purple font-bold">{item.name}</h2>
            <div className="my-4">
              <span className="bg-lightYellow p-2 rounded-md text-white text-lg">
                8.0
              </span>
              <span className="font-bold text-lg ml-2 text-lightYellow">
                Rất tốt
              </span>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-5">
              {/* grid-left */}
              <div className="col-span-2">
                {/* header-img */}
                <div>
                  <img
                    src={item.image}
                    className="aspect-[2/1] object-cover w-full"
                    alt=""
                  />
                  <div className="flex-center p-5 bg-[#E5E5E7] shadow-md shadow-slate-300 text-[#50535D] font-bold text-sm md:text-base">
                    <div className="flex-center">
                      <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                      <p>{item.end_location}</p>
                    </div>
                    <div className="flex-center">
                      <FontAwesomeIcon icon={faClock} className="mr-2" />
                      <p>{item.quantity_date}</p>
                    </div>
                    <div className="flex-center ">
                      <p>Phương tiện:&nbsp;</p>
                      <p className="text-base lg:text-lg  text-purple">
                        {item.vehicle
                          .map((list) => list.nameVehicle)
                          .join(" - ")}
                      </p>
                    </div>
                    <div>
                      Mã Tour:
                      <span className="text-purple text-base lg:text-lg">
                        &nbsp;2
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:hidden md:block max-w-[600px] mt-5 mx-auto">
                  <DepartureInfor item={item} />
                </div>
                {/* text-1 */}
                <div className="bg-white my-2 p-4">
                  <h2 className="text-3xl font-bold text-purple my-2">
                    {item.description.title}
                  </h2>
                  <p>{item.description.content}</p>
                </div>
                <div className="bg-white my-2 p-4">
                  <h2 className="text-3xl font-bold text-purple my-2">
                    {item.name}
                  </h2>
                  {item.tour_details.map((list, index) => {
                    return (
                      <div key={index}>
                        <div>
                          <h3 className="text-xl font-bold text-[#474545]">
                            {list.name}
                          </h3>
                          {list.timeline.map((item, index) => {
                            return (
                              <div key={index}>
                                <div className="my-3 flex">
                                  <p>
                                    {item.time}:&nbsp;{item.description}
                                  </p>
                                </div>
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt=""
                                    className="w-full"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Thông tin Visa */}
                <div className="bg-white my-2 p-4">
                  <h1 className="text-3xl font-bold text-purple my-2">
                    Thông tin Visa
                  </h1>
                  <ul className="flex flex-col gap-3">
                    <li>
                      - Quý khách chỉ cần hộ Việt Nam còn nguyên vẹn và có hạn
                      sử dụng ít nhất 6 tháng tính từ ngày kết thúc tour.
                    </li>
                    <li>- Miễn Visa cho khách Việt Nam.</li>
                  </ul>
                </div>
                {/* Hướng dẫn viên */}
                <div className="bg-white my-2 p-4">
                  <h2 className="text-3xl font-bold text-purple my-2">
                    Hướng dẫn viên
                  </h2>
                  <p>
                    Trước 1 ngày hoặc 2 ngày đi sẽ gửi thông tin họp đoàn cho
                    quý khách hàng, trước ngày khởi hành Hướng Dẫn Viên sẽ liên
                    hệ trao đổi một số thông tin trong chuyến hành trình.
                  </p>
                </div>
                {/* Đánh giá khách hàng  */}
                <div className="bg-white my-2 p-4">
                  <h3 className="text-base font-bold text-purple my-2">
                    Đánh giá khách hàng về {item.name}
                  </h3>
                  <Comment idTour={item.id} />
                </div>
              </div>
              {/* grid-right */}
              <div className="hidden lg:block">
                <DepartureInfor item={item} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
