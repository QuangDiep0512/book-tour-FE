import React, { useEffect, useState } from "react";
import { getTour } from "../service/TourService";
import { ListTour } from "./ListTour";
import { useSelector } from "react-redux";

export const HomeCollection = () => {
  const [dataTourTrongNuoc, setDataTourTrongNuoc] = useState([]);
  const [dataTourNuocNgoai, setDataTourNuocNgoai] = useState([]);
  const [showAllTours, setShowAllTours] = useState(true);
  useEffect(() => {
    const fetchDataTrongNuoc = async () => {
      if (showAllTours === true) {
        const result = await getTour(1, 6);
        setDataTourTrongNuoc(result.data);
      }
      // else {
      //   const result = await getTour(6, 12); // Giả sử 100 là đủ để lấy tất cả tour
      //   setDataTourTrongNuoc(result.data);
      //   setShowAllTours(false);
      // }
    };
    fetchDataTrongNuoc();
  }, []);

  useEffect(() => {
    const fetchDataNgoaiNuoc = async () => {
      const result = await getTour(2, 6);
      setDataTourNuocNgoai(result.data);
    };
    fetchDataNgoaiNuoc();
  }, []);
  return (
    <>
      <ListTour
        title={"Điểm đến yêu thích trong nước"}
        des={"Lên rừng xuống biển. Trọn vẹn Việt Nam"}
        data={dataTourTrongNuoc}
        // setShowAllTours={setShowAllTours}
      />
      <ListTour
        title={"Điểm đến yêu thích nước ngoài"}
        des={"Bao la thế giới. Bốn bể là nhà"}
        data={dataTourNuocNgoai}
      />
    </>
  );
};
