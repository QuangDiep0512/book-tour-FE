import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeToCart, selectedTour, updateQuantity } from "../../actions/Cart";
import { CartItem } from "../../components/CartItem";
import Swal from "sweetalert2";
import { formatMoney } from "../../utils/format";

export const Cart = () => {
  const [check, setCheck] = useState(null);
  const [totalCartAdult, setTotalCartAdult] = useState(0);
  const [totalCartChild, setTotalCartChild] = useState(0);
  const quantityAdultRef = useRef("");
  const quantityChildRef = useRef("");
  const dataCart = useSelector((state) => state.cartReducer.cart);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const showSwal = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Vui lòng tick chọn tour để thay đổi số lượng!",
      icon: "info",
    });
  };

  const showSwalQuantity = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Chỉ còn 10 vé để đặt !!!!",
      icon: "warning",
    });
  };

  const handleDeleteItemCart = (item) => {
    dispatch(removeToCart(item.id));
  };

  const handleClickChooseTour = (item) => {
    if (item.id === check) {
      setCheck(null);
    } else {
      setCheck(item.id);
    }
  };

  const handleChangeQuantityAdult = () => {
    const quantityAdult = parseInt(quantityAdultRef.current.value);
    dispatch(
      updateQuantity(
        check,
        quantityAdult,
        parseInt(quantityChildRef.current.value)
      )
    );
  };

  const handleChangeQuantityChild = () => {
    const quantityChild = parseInt(quantityChildRef.current.value);
    dispatch(
      updateQuantity(
        check,
        parseInt(quantityAdultRef.current.value),
        quantityChild
      )
    );
  };

  const totalTour = totalCartAdult + totalCartChild;

  const totalCart = dataCart.reduce((sum, item) => {
    return sum + parseInt(item.price_adult);
  }, 0);

  const handleNavigatePayment = () => {
    const user = localStorage.getItem("user");
    if (user) {
      if (check) {
        navigate("/booking");
      } else {
        Swal.fire({
          title: "Thông báo",
          text: "Vui lòng chọn tour để thanh toán!",
          icon: "info",
        });
      }
    } else {
      Swal.fire({
        title: "Thông báo",
        text: "Vui lòng đăng nhập trước khi thanh toán!",
        icon: "info",
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    const itemCart = dataCart.find((item) => item.id === check);
    if (itemCart) {
      dispatch(selectedTour(itemCart.id));
      quantityAdultRef.current.value = itemCart.quantityAdult;
      quantityChildRef.current.value = itemCart.quantityChildren;
      const newQuantityAdult = parseInt(quantityAdultRef.current.value);
      const newQuantityChild = parseInt(quantityChildRef.current.value);
      const totalQuantity = newQuantityAdult + newQuantityChild;

      if (totalQuantity <= itemCart.quantity) {
        dispatch(updateQuantity(check, newQuantityAdult, newQuantityChild));
      } else {
        showSwalQuantity();
        quantityAdultRef.current.value = 10 - newQuantityChild; // Giảm giá trị người lớn để tổng bằng 10
        dispatch(
          updateQuantity(
            check,
            10 - newQuantityChild, // Cập nhật giá trị người lớn
            newQuantityChild
          )
        );
      }
      setTotalCartAdult(
        parseInt(quantityAdultRef.current.value) *
          parseInt(itemCart.price_adult)
      );
      setTotalCartChild(
        parseInt(quantityChildRef.current.value) *
          parseInt(itemCart.price_child)
      );
    } else {
      quantityAdultRef.current.value = "";
      quantityChildRef.current.value = "";
    }
  }, [
    check,
    quantityAdultRef.current.value,
    quantityChildRef.current.value,
    dispatch,
  ]);

  return (
    <div className="lg:px-[90px] px-[20px] py-7">
      <div className="flex items-center py-5 border-b border-l-neutral-600">
        <FontAwesomeIcon icon={faArrowLeft} />
        <Link to={"/"}>
          <p className="ml-2 text-teal-500 font-semibold">Tiếp tục thêm</p>
        </Link>
      </div>
      <div className="py-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Cart left */}
        <div className="col-span-2">
          <h2 className="font-md text-3xl text-003C71">Giỏ hàng</h2>

          <div className="shadow-lg  shadow-slate-400 mt-3 p-4 max-h-[350px] overflow-y-scroll">
            {dataCart.length > 0 ? (
              dataCart.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    handleDeleteItemCart={handleDeleteItemCart}
                    handleClickChooseTour={handleClickChooseTour}
                    isActive={item.id === check}
                  />
                );
              })
            ) : (
              <div className="text-2xl text-center p-10">
                Chưa có gì trong giỏ!
              </div>
            )}
          </div>
        </div>
        {/* Cart right */}
        <div className="">
          <h2 className="font-md text-3xl text-003C71">Chi tiết</h2>
          <div className="bg-003C71 p-5 mt-3 text-white leading-7 ">
            <input
              ref={quantityAdultRef}
              onClick={check ? null : showSwal}
              onChange={handleChangeQuantityAdult}
              min="1"
              type="number"
              placeholder="x số người lớn"
              className="p-2 rounded-lg text-slate-800 w-full mb-2"
            />
            <input
              ref={quantityChildRef}
              onChange={handleChangeQuantityChild}
              onClick={check ? null : showSwal}
              min="0"
              type="number"
              placeholder="x số trẻ em từ 2 đến 7 tuổi"
              className="p-2 rounded-lg text-slate-800 w-full"
            />
            <div className="flex-center ">
              <p>Tổng tiền giỏ hàng:</p>
              <p>{`${formatMoney(totalCart)} VNĐ`}</p>
            </div>
            {check && (
              <div>
                <div className="flex-center">
                  <p>Giá vé cho người lớn:</p>
                  <p>{`${formatMoney(totalCartAdult)} VNĐ`}</p>
                </div>
                <div className="flex-center">
                  <p>Giá vé cho trẻ em:</p>
                  <p>{`${formatMoney(totalCartChild)} VNĐ`}</p>
                </div>
                <div className="flex-center">
                  <p>Tổng tiền tour được chọn:</p>
                  <p>{`${formatMoney(totalTour)} VNĐ`}</p>
                </div>
              </div>
            )}

            <button
              className="text-lg bg-orange p-4 w-full rounded-xl font-bold mt-5"
              onClick={handleNavigatePayment}
            >
              Tiến hành thanh toán <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
