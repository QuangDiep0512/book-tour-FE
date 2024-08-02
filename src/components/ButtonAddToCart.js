import React, { useEffect, useState } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeToCart } from "../actions/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ButtonAddToCart = (props) => {
  const { item, quantityChildren, quantityAdult } = props;
  const [addCart, setAddCart] = useState(false);
  const dataCart = useSelector((state) => state.cartReducer.cart);
  const dispatch = useDispatch();
  // const dataStorage = JSON.parse(localStorage.getItem("cart"));
  // console.log(dataCart);

  const handleAddToCart = (item) => {
    setAddCart(true);
    dispatch(addToCart(item, quantityAdult, quantityChildren));
  };

  useEffect(() => {
    if (dataCart && dataCart.find((list) => list.id === item.id)) {
      setAddCart(true);
    }
    const dataStorage = JSON.parse(localStorage.getItem("cart"));
    if (dataStorage && dataStorage.find((list) => list.id === item.id)) {
      setAddCart(true);
    } else {
      setAddCart(false);
    }
  }, []);

  useEffect(() => {
    dataCart && localStorage.setItem("cart", JSON.stringify(dataCart));
  }, [dataCart]);

  const handleRemoveToCart = (item) => {
    setAddCart(false);
    dispatch(removeToCart(item.id));
    localStorage.setItem("cart", JSON.stringify(dataCart));
  };

  return (
    <button
      className={`${
        addCart ? "bg-red-500 hover:bg-orange" : "bg-orange hover:bg-red-500"
      } py-2 min-w-[100px] px-2 text-white rounded-lg`}
      onClick={() => {
        addCart ? handleRemoveToCart(item) : handleAddToCart(item);
      }}
    >
      <FontAwesomeIcon icon={faShoppingCart} className="mr-3" />
      {addCart === true ? "Xoá khỏi giỏ hàng" : "Thêm vào giỏ hàng"}
    </button>
  );
};
