export const bookedReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BOOKED":
      return [...state, action.payload];
    default:
      return state;
  }
};
