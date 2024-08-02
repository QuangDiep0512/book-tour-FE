import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const Process = ({ step }) => {
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
  // 1, 2, 3, 4, 5];
  let isIcon = false;
  const getStepClass = (currentStep, targetStep) => {
    if (currentStep < targetStep) {
      return "";
    } else if (currentStep === targetStep) {
      isIcon = false;
      return "selected";
    } else {
      isIcon = true;
      return "completed selected";
    }
  };
  return (
    <div className=" mx-[185px] py-10">
      <div className="w-full relative">
        <div className="progress top-[50%] translate-y-[-50%] absolute w-full border-solid border-[#ACACA6] z-0 transition-all">
          <div className="percent absolute w-full border-[1px] border-solid border-[#4B81BD] z-10"></div>
        </div>
        <div className="steps relative flex justify-between w-full">
          {items.map((item) => {
            return (
              <>
                <div className={`${getStepClass(step, item.number)} step`}>
                  {isIcon === true ? (
                    <FontAwesomeIcon icon={faCheck} className="text-white" />
                  ) : (
                    <p>{item.number}</p>
                  )}
                  <div className="absolute top-full min-w-[100px]">
                    <p className="font-medium">{item.title}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
