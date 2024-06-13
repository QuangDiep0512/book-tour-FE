export const addCheckout = (tour, payment) => {
  return {
    type: "ADD_TO_CHECKOUT",
    payload: tour,
    payment: payment,
  };
};
