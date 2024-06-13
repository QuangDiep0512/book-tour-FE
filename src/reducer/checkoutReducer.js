export const checkoutReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CHECKOUT":
      let newCheckout = {
        ...action.payload,
        idTour: action.payload.id,
        ...action.payment,
        idPayment: action.payment.id,
      };
      delete newCheckout.id;
      return newCheckout;

    default:
      return state;
  }
};
