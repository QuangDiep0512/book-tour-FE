import React, { useEffect, useState } from "react";
import { SearchTrip } from "../../components/SearchTrip";
import { useParams } from "react-router-dom";
import { ListTourArea } from "../../components/ListTourArea";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryByID, getTour, sortedByDate } from "../../actions/Tour";
import { getAllTour } from "../../service/TourService";
import { MenuLocation } from "../../components/MenuLocation";

export const Category = () => {
  const [location, setLocation] = useState([]);
  const [menuLocation, setMeuLocation] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeSort, setActiveSort] = useState("duration");
  const dispath = useDispatch();
  const param = useParams();
  const data = useSelector((state) => state.tourReducer.tour);
  const categoryById = useSelector((state) => state.tourReducer.categoryById);
  const searchTrip = useSelector((state) => state.tourReducer.searchTour);
  console.log(searchTrip);

  const getEndLocationById = (id) => {
    const result = menuLocation.filter((item) => item.catagoryId === id);
    const newResult = [
      ...new Set(result.map((tour) => tour.end_location)),
    ].slice(0, 10);
    return newResult;
  };

  // Lọc các phần tử trong mảng data có catagoryId là 1 (trong nước)
  const newDomestic = getEndLocationById(1);
  // Lọc các phần tử trong mảng data có catagoryId là 2 (nước ngoài)
  const newForeign = getEndLocationById(2);

  const handleClickLocation = (location, index) => {
    const filteredTours = data.filter((item) => item.end_location === location);
    setLocation(filteredTours);
    setSelectedItem(index);
  };

  // Sắp xếp mảng tours theo giá tour tăng dần
  const handleSortedByPrice = () => {
    const sortedByPrice = [...location].sort(
      (a, b) => a.price_adult - b.price_adult
    );
    setActiveSort("price");
    setLocation(sortedByPrice);
  };

  // Chuyển các chuỗi ngày thành đối tượng Date và sắp xếp mảng theo ngày gần nhất
  const handleSortedByDate = () => {
    const sortedByDate = [...location].sort((a, b) => {
      const dateA = new Date(a.start_date.split("/").reverse().join("-"));
      const dateB = new Date(b.start_date.split("/").reverse().join("-"));
      return dateB - dateA;
    });
    // dispath(sortedByDate(data));
    setLocation(sortedByDate);
    setActiveSort("date");
  };

  // Sắp xếp mảng tours theo thời lượng tour giảm dần
  const handleSortedByDuration = () => {
    const sortedByDuration = [...location].sort((a, b) => {
      const daysA = parseInt(a.quantity_date.split(" ")[0]);
      const daysB = parseInt(b.quantity_date.split(" ")[0]);
      return daysB - daysA;
    });
    setLocation(sortedByDuration);
    setActiveSort("duration");
  };

  useEffect(() => {
    const fetchAllTour = async () => {
      const result = await getAllTour();
      setMeuLocation(result.data);
      dispath(getTour(result.data));
    };
    fetchAllTour();
  }, []);

  useEffect(() => {
    if (param && param.id) {
      dispath(getCategoryByID(param.id));
    }
  }, [param.id, dispath]);

  useEffect(() => {
    if (param && param.id && categoryById) {
      setLocation(categoryById);
    } else {
      setLocation(data);
    }
  }, [param.id, categoryById, data]);

  useEffect(() => {
    setLocation(searchTrip);
  }, [searchTrip]);

  return (
    <div className="bg-grey">
      <div className="max-w-[1024px] mx-auto">
        <div className="flex justify-center items-center relative w-full">
          <SearchTrip />
        </div>
        <div className=" md:grid md:grid-cols-4 my-4 gap-8 mx-4">
          {/* ==Categories left == */}
          <div className="col-span-1 flex flex-col gap-7">
            <MenuLocation
              newDomestic={newDomestic}
              newForeign={newForeign}
              handleClickLocation={handleClickLocation}
              selectedItem={selectedItem}
            />
          </div>

          {/* ==Categories right == */}
          <ListTourArea
            activeSort={activeSort}
            handleSortedByPrice={handleSortedByPrice}
            handleSortedByDate={handleSortedByDate}
            handleSortedByDuration={handleSortedByDuration}
            location={location}
          />
        </div>
      </div>
    </div>
  );
};
