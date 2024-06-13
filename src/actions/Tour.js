export const getTour = (data) => {
  return {
    type: "GET_TOUR",
    payload: data,
  };
};

export const getCategoryByID = (id) => {
  return {
    type: "GET_CATEGORY_BY_ID",
    id: id,
  };
};

export const getCategoryEndLocation = (location) => {
  return {
    type: "GET_CATEGORY_BY_ENDLOCATION",
    end_location: location,
  };
};

export const searchTour = (departure, destination, date) => {
  return {
    type: "SEARCH_TOUR",
    departure: departure,
    destination: destination,
    date: date,
  };
};

export const sortedByDate = (data) => {
  return {
    type: "SORTED_BY_DATE",
    data: data,
  };
};
