export const cartReducer = (
  state = { cart: [], selectedTour: null },
  action
) => {
  let newCart = [...state.cart];
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [
          ...newCart,
          {
            ...action.payload,
            quantityCart: action.quantityCart,
            quantityChildren: action.quantityChildren,
            quantityAdult: action.quantityAdult,
          },
        ],
      };
    case "REMOVE_TO_CART":
      const listCart = newCart.filter((item) => {
        return item.id !== action.payload;
      });
      return {
        ...state,
        cart: listCart,
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: newCart.map((item) => {
          return item.id === action.id
            ? {
                ...item,
                quantityAdult: action.quantityAdult,
                quantityChildren: action.quantityChild,
              }
            : item;
        }),
      };
    case "SELECT_TOUR_TO_CHECKOUT":
      const selectedTour = newCart.find((item) => {
        return item.id === action.payload;
      });
      return {
        ...state,
        selectedTour: selectedTour,
      };
    default:
      return state;
  }
};
