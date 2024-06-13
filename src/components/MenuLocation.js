import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export const MenuLocation = (props) => {
  const { newDomestic, newForeign, handleClickLocation, selectedItem } = props;
  const [openMenuRight, setOpenMenuRight] = useState(false);
  const [openMenuLeft, setOpenMenuLeft] = useState(false);
  const [isLGScreen, setIsLGScreen] = useState(false);
  const handleClickMenuLocationRight = () => {
    setOpenMenuRight(!openMenuRight);
    setOpenMenuLeft(false);
  };

  const handleClickMenuLocationLeft = () => {
    setOpenMenuLeft(!openMenuLeft);
    setOpenMenuRight(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLGScreen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mb-5">
      <div className="bg-white border border-[#c0bebe] border-solid">
        <div
          className="bg-[#cfcfcf] p-2 cursor-pointer text-003C71 text-lg font-semibold flex-center  "
          onClick={handleClickMenuLocationLeft}
        >
          <h3 className="">Địa điểm hot trong nước</h3>
          {openMenuLeft ? (
            <FontAwesomeIcon icon={faAngleUp} className="md:hidden" />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} className="md:hidden" />
          )}
        </div>
        {(openMenuLeft || isLGScreen) && (
          <ul className="">
            {newDomestic.map((domestic, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    selectedItem === index ? "text-orange" : ""
                  } p-3 cursor-pointer hover:text-orange`}
                  onClick={() => handleClickLocation(domestic, index)}
                >
                  {domestic}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {/* ==Categories left-bottom == */}
      <div className="bg-white border border-[#c0bebe] border-solid">
        <div
          className="bg-[#cfcfcf] p-2 text-003C71 text-lg font-semibold flex-center cursor-pointer"
          onClick={handleClickMenuLocationRight}
        >
          <h3 className="">Địa điểm hot ngoài nước</h3>
          {openMenuRight ? (
            <FontAwesomeIcon icon={faAngleUp} className="md:hidden" />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} className="md:hidden" />
          )}
        </div>
        {(openMenuRight || isLGScreen) && (
          <ul className="">
            {newForeign.map((foreign, index) => {
              return (
                <li
                  className={`${
                    selectedItem === index ? "text-orange" : ""
                  } p-3 cursor-pointer hover:text-orange`}
                  key={index}
                  onClick={() => handleClickLocation(foreign, index)}
                >
                  {foreign}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
