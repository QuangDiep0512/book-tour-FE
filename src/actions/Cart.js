export const addToCart = (data, quantityAdult = 1, quantityChildren = 0) => {
  return {
    type: "ADD_TO_CART",
    payload: data,
    quantityCart: 1,
    quantityAdult: quantityAdult,
    quantityChildren: quantityChildren,
  };
};

export const removeToCart = (id) => {
  return {
    type: "REMOVE_TO_CART",
    payload: id,
  };
};

export const updateQuantity = (id, quantityAdult, quantityChild) => {
  return {
    type: "UPDATE_QUANTITY",
    id: id,
    quantityAdult: quantityAdult,
    quantityChild: quantityChild,
  };
};

export const reduceQuantity = (id) => {
  return {
    type: "REDUCE_QUANTITY_CART",
    payload: id,
  };
};

export const selectedTour = (id) => {
  return {
    type: "SELECT_TOUR_TO_CHECKOUT",
    payload: id,
  };
};
