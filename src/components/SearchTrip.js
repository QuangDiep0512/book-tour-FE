import React, { useEffect, useState } from "react";
import {
  faLocationDot,
  faPlaneDeparture,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { searchTour } from "../actions/Tour";
import { getAllTour } from "../service/TourService";
import { useNavigate } from "react-router-dom";
export const SearchTrip = (props) => {
  const [menuLocation, setMeuLocation] = useState([]);
  const [departure, setDeparture] = useState();
  const [destination, setDestination] = useState();
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const data = useSelector((state) => state.tourReducer.tour);
  const dispath = useDispatch();

  const start_location = [
    ...new Set(menuLocation.map((item) => item.start_location)),
  ];
  const end_location = [
    ...new Set(menuLocation.map((item) => item.end_location)),
  ];

  const handleChangeDeparture = (e) => {
    setDeparture(e.target.value);
  };

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleSearch = () => {
    let newDate;
    if (date) {
      let splitDate = date.split("-");
      newDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
    }
    dispath(searchTour(departure, destination, newDate));
    navigate("/category");
  };

  useEffect(() => {
    setMeuLocation(data);
  }, [data]);

  return (
    <div className="grid lg:grid-cols-4 text-sm md:text-base w-[500px] md:w-auto grid-cols-2 gap-[30px] justify-center bg-white lg:p-8 p-4 rounded-lg mx-4">
      {/* ==Điểm khởi hành== */}
      <div className="select_address px-4">
        <FontAwesomeIcon
          icon={faPlaneDeparture}
          className="text-[#495057] hidden md:block"
        />
        <div className=" ">
          <h3 className="text-[#92ACC2]">Điểm khởi hành</h3>
          <select
            defaultValue=""
            className="outline-none"
            onChange={handleChangeDeparture}
          >
            <option disabled hidden value="">
              Chọn điểm
            </option>
            {start_location.map((location, index) => {
              return (
                <option value={location} key={index}>
                  {location}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/* ==Điểm đến== */}
      <div className="select_address">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-[#495057] hidden md:block"
        />
        <div className="">
          <h3 className="text-[#92ACC2]">Điểm đến</h3>
          <select
            defaultValue=""
            className="outline-none w-[100px]  "
            onChange={handleChangeDestination}
          >
            <option disabled hidden value="">
              Chọn điểm đến
            </option>
            {end_location.map((location, index) => {
              return (
                <option value={location} key={index}>
                  {location}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/* ==Ngày đi== */}
      <div className="select_address">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-[#495057] hidden md:block"
        />
        <div>
          <h3 className="text-[#92ACC2]">Ngày đi</h3>
          <input
            type="date"
            className="outline-none w-[110px] md:w-auto"
            name="txtDate"
            id="txtDate"
            min="2000-01-01"
            onChange={handleChangeDate}
          />
        </div>
      </div>
      {/* ==Tìm kiếm== */}
      <div
        className="select_address bg-purple md:px-[80px]"
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faSearch} className="text-yellow-400 text-2xl" />
      </div>
    </div>
  );
};
