import React, { useEffect, useState } from "react";
import { SelectedBooking } from "./SelectedBooking";
import logo from "../imgs/payment.png";
import Swal from "sweetalert2";
import axios from "axios";

export const PaymentMethods = (props) => {
  const { id, setCheckoutSuccess } = props;
  const [countries, setCountries] = useState([]);
  const [valueCartNumber, setValueCardNumber] = useState("");
  const [valueCVC, setValueCVC] = useState("");
  const [valueExpiration, setValueExpiration] = useState("");

  const [errors, setErrors] = useState({
    cardNumber: "",
    cvc: "",
  });

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    switch (fieldName) {
      case "cardNumber":
        errorMessage =
          /^[0-9\s]*$/.test(value) && value.replace(/\s/g, "").length === 16
            ? ""
            : "Số thẻ tín dụng phải là số và đủ 16 số";
        break;
      case "cvc":
        errorMessage =
          /^[0-9]*$/.test(value) && value.replace(/\s/g, "").length === 3
            ? ""
            : "Số CVC phải là số và đủ 3 chữ số.";
        break;
      default:
        break;
    }
    setErrors({ ...errors, [fieldName]: errorMessage });
  };

  const handleChangeCardNumber = (e) => {
    const { name, value } = e.target;

    let newValue = value.replace(/\s/g, ""); // Loại bỏ tất cả ký tự không phải là số
    if (newValue.length > 16) {
      newValue = newValue.slice(0, 16); // Giới hạn tối đa 16 chữ số
    }
    const formattedValue = newValue.match(/.{1,4}/g)?.join(" ");
    setValueCardNumber(formattedValue);
    validateField(name, value);
  };

  const handleChangeCVC = (e) => {
    const { name, value } = e.target;
    let newValue = value.replace(/\s/g, ""); // Loại bỏ tất cả ký tự không phải là số
    if (newValue.length > 3) {
      newValue = newValue.slice(0, 3); // Giới hạn tối đa 3 chữ số
    }
    setValueCVC(newValue);
    validateField(name, value);
  };

  const SwalSuccessfulTransaction = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận giao dịch thành công!.Quý khách vui lòng kiểm tra email để biết thêm thông tin!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handlePaymentConfirm = () => {
    if (id === 1) {
      if (
        valueCVC !== "" &&
        valueCartNumber !== "" &&
        Object.values(errors).every((error) => error === "") &&
        valueExpiration !== ""
      ) {
        setCheckoutSuccess(true);
        SwalSuccessfulTransaction();
      } else {
        Swal.fire({
          title: "Thông báo",
          text: "Vui lòng nhập đầy đủ thông tin liên hệ!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      setCheckoutSuccess(true);
      SwalSuccessfulTransaction();
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div>
      <div className=" grid grid-cols-3 gap-5 max-w-[1100px] mx-auto text-slate-600">
        <div className="col-span-2">
          {/* THANH TOÁN BẰNG THẺ NỘI ĐỊA ATM */}
          {id === 1 && (
            <div className="flex flex-col gap-5 mb-4">
              <div className="w-full flex flex-col">
                <label>
                  Card number <span className="text-red-600">*</span>{" "}
                  {errors.cardNumber && (
                    <span className="text-red-600">{errors.cardNumber}</span>
                  )}
                </label>

                <div className="flex">
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className="flex-1 input-config"
                    onChange={handleChangeCardNumber}
                    name="cardNumber"
                    value={valueCartNumber}
                  />
                  <img
                    src={logo}
                    alt=""
                    className="w-[150px] object-cover bg-[#ccc] p-2 rounded-e-md"
                  />
                </div>
              </div>
              <div className="w-full flex gap-5">
                <div className="flex flex-col flex-1">
                  <label>Expiration</label>
                  <input
                    type="date"
                    className="flex-1 input-config "
                    value={valueExpiration}
                    onChange={(e) => setValueExpiration(e.target.value)}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label>
                    CVC <span className="text-red-600">*</span>{" "}
                    {errors.cvc && (
                      <span className="text-red-600">{errors.cvc}</span>
                    )}
                  </label>

                  <input
                    type="text"
                    placeholder="000"
                    className="input-config"
                    onChange={handleChangeCVC}
                    name="cvc"
                    value={valueCVC}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>Country</label>
                <select className="input-config">
                  {countries.map((item) => {
                    return (
                      <option value={item.name.common}>
                        {item.name.common}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}

          {/* THANH TOÁN BẰNG THẺ NỘI ĐỊA ATM */}
          {id === 2 && (
            <div className="flex flex-col gap-y-5 text-lg self-start bg-grey mb-4 p-3">
              <p>Quý khách vui lòng đến trạm ATM gần nhất để thanh toán</p>
              <p>
                Thời gian hết hạn thanh toán: Sau 3 ngày kể từ ngày xác nhận
                thanh toán!
              </p>
              <p>
                Sau khi thanh toán xong. Chúng tôi sẽ gửi mail xác nhận đến bạn!
              </p>
              <p>
                Chúc bạn có những khoảnh khắc vui vẻ khi trải nghiệm dịch vụ của
                chúng tôi!
              </p>
            </div>
          )}

          {/* THANH TOÁN CHUYỂN KHOẢN QUA NGÂN HÀNG */}
          {id === 3 && (
            <div className="flex flex-col gap-y-5 text-lg self-start bg-grey mb-4 p-3">
              <p>
                Quý khách vui lòng chuyển khoản đến số tài khoản ngân hàng BIDV:
                <span className="italic text-blue-400">
                  &nbsp;3141 000 111 134&nbsp;
                </span>
                để thanh toán
              </p>
              <p>
                Thời gian hết hạn thanh toán: Sau 7 ngày kể từ ngày xác nhận
                thanh toán!
              </p>
              <p>
                Sau khi thanh toán xong. Chúng tôi sẽ gửi mail xác nhận đến bạn!
              </p>
              <p>
                Chúc bạn có những khoảnh khắc vui vẻ khi trải nghiệm dịch vụ của
                chúng tôi!
              </p>
            </div>
          )}

          {/* THANH TOÁN BẰNG TIỀN MẶT TẠI VĂN PHÒNG LỮ HÀNH SAIGONTOURIST */}
          {id === 4 && (
            <div className="flex flex-col gap-y-5 text-lg self-start bg-grey mb-4 p-3">
              <p>
                Quý khách vui lòng đến địa chỉ:
                <span className="italic text-blue-400">
                  &nbsp;177 - Đường số 20 - phường 5 - Quận Gò Vấp - Tp Hồ Chí
                  Minh&nbsp;
                </span>
                để thanh toán
              </p>
              <p>
                Thời gian hết hạn thanh toán: Sau 7 ngày kể từ ngày xác nhận
                thanh toán!
              </p>
              <p>
                Sau khi thanh toán xong. Chúng tôi sẽ gửi mail xác nhận đến bạn!
              </p>
              <p>
                Chúc bạn có những khoảnh khắc vui vẻ khi trải nghiệm dịch vụ của
                chúng tôi!
              </p>
            </div>
          )}

          <button
            className="bg-003C71 p-3 text-white uppercase w-full rounded-lg"
            onClick={handlePaymentConfirm}
          >
            Xác nhận
          </button>
        </div>
        <SelectedBooking />
      </div>
    </div>
  );
};
