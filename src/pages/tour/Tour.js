import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTourId } from "../../service/TourService";

import { TourDetail } from "../../components/TourDetail";

export const Tour = () => {
  const [tourDetail, setTourDetail] = useState([]);
  const param = useParams();
  useEffect(() => {
    const getTourDetails = async () => {
      const result = await getTourId(param.id);
      setTourDetail(result.data);
    };
    getTourDetails();
  }, []);
  return <TourDetail tourDetail={tourDetail} />;
};
