import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const Process = ({ step }) => {
  const [width, setWidth] = useState("0%");
  const items = [
    {
      number: 1,
      title: "Đăng nhập",
    },
    {
      number: 2,
      title: "Chọn tour",
    },
    {
      number: 3,
      title: "Nhập thông tin",
    },
    {
      number: 4,
      title: "Chọn phương thức thanh toán",
    },
    {
      number: 5,
      title: "Thanh toán",
    },
  ];
  let isIcon = false;

  useEffect(() => {
    setWidth(() => {
      return ((step - 1) / (items.length - 1)) * 100 + "%";
    });
  }, []);

  const getStepClass = (currentStep, targetStep) => {
    if (targetStep < currentStep) {
      return "completed selected";
    } else if (targetStep === currentStep) {
      return "selected";
    } else {
      return "";
    }
  };
  return (
    <div className="mx-[185px] py-10">
      <div className="progress-wrapper w-full relative">
        <div
          className="progress absolute w-0 h-[6px] content-none bg-[#4B81BD] top-[50%] z-10"
          style={{ width }}
        ></div>
        <div className="steps relative flex justify-between w-full z-20">
          {items.map((item) => {
            return (
              <div className={`${getStepClass(step, item.number)} step`}>
                {isIcon === true ? (
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                ) : (
                  <p>{item.number}</p>
                )}
                <div className="absolute top-full min-w-[100px]">
                  <p className="font-medium text-purple">{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
