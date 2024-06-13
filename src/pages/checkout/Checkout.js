import React, { useEffect, useState } from "react";
import { PaymentMethods } from "../../components/PaymentMethods";
import { useSelector } from "react-redux";
import { CheckoutSuccess } from "../../components/CheckoutSuccess";

export const Checkout = () => {
  const checkout = useSelector((state) => state.checkoutReducer);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  let id = 0;
  switch (checkout.idPayment) {
    case 1:
      id = 1;
      break;
    case 2:
      id = 2;
      break;
    case 3:
      id = 3;
      break;
    case 4:
      id = 4;
      break;
    case 5:
      id = 5;
      break;
    default:
      id = 0;
  }

  return (
    <div className="bg-grey">
      <div>Cac buoc thanh toan</div>
      <div className="my-7 bg-white py-5">
        {checkoutSuccess === false ? (
          <PaymentMethods id={id} setCheckoutSuccess={setCheckoutSuccess} />
        ) : (
          <CheckoutSuccess />
        )}
      </div>
    </div>
  );
};
