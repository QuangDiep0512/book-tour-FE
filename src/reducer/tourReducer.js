export const tourReducer = (
  state = { tour: [], categoryById: [], searchTour: [] },
  action
) => {
  let newData = [...state.tour];
  switch (action.type) {
    case "GET_TOUR":
      return {
        ...state,
        tour: action.payload,
      };

    case "GET_CATEGORY_BY_ID":
      const getTourById = newData.filter((item) => {
        return item.catagoryId === parseInt(action.id);
      });
      return {
        ...state,
        categoryById: getTourById,
      };

    case "SEARCH_TOUR":
      return {
        ...state,
        searchTour: newData.filter((tour) => {
          if (action.departure && action.destination && action.date) {
            return (
              tour.start_location === action.departure &&
              tour.end_location === action.destination &&
              tour.start_date === action.date
            );
          } else if (
            (action.departure && action.date) ||
            (action.destination && action.date)
          ) {
            return (
              (tour.start_location === action.departure &&
                tour.start_date === action.date) ||
              (tour.destination === action.destination &&
                tour.start_date === action.date)
            );
          } else if (action.departure && action.destination) {
            return (
              tour.start_location === action.departure &&
              tour.end_location === action.destination
            );
          } else if (action.departure || action.destination || action.date) {
            return (
              tour.start_location === action.departure ||
              tour.end_location === action.destination ||
              tour.start_date === action.date
            );
          } else {
            return state;
          }
        }),
      };
    default:
      return state;
  }
};
