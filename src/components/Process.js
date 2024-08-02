import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const Process = ({ step }) => {
  const items = [1, 2, 3, 4, 5];
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
  //   useEffect(() => {
  //     let p = step * 18;
  //     document.getElementsByClassName("percent")[0].style.width = `${p}%`;
  //   }, []);
  return (
    <div className=" mx-[185px] py-10">
      <div className="w-full relative">
        <div className="progress top-[50%] translate-y-[-50%] absolute w-full border-solid border-[#ACACA6] z-0 transition-all">
          <div className="percent absolute w-full border-[1px] border-solid border-[#4B81BD] z-10"></div>
        </div>
        <div className="steps relative flex justify-between w-full">
          {items.map((item) => {
            return (
              <div className={`${getStepClass(step, item)} step`}>
                {isIcon === true ? (
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                ) : (
                  <p>{item}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
