import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SelectedBooking } from "../../components/SelectedBooking";
import { Process } from "../../components/Process";

export const Booking = () => {
  const navigate = useNavigate();
  const step = 3;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const inputFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Nhập tên",
      label: "Tên",
      pattern: /^[a-zA-Z\s]*$/, // Regex pattern for only letters and spaces
      errorMessage: "Tên chỉ được chứa chữ cái.",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Nhập email",
      label: "Email",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex pattern for email format
      errorMessage: "Email không hợp lệ.",
    },
    {
      name: "phoneNumber",
      type: "text",
      placeholder: "Nhập sdt",
      label: "Số điện thoại",
      pattern: /^\d{10,11}$/, // Regex pattern for email format
      errorMessage: "Số điện thoại không hợp lệ.",
    },
    {
      name: "address",
      type: "text",
      placeholder: "Nhập địa chỉ",
      label: "Địa chỉ",
      pattern: /^.{1,100}$/, // Regex pattern for email format
      errorMessage: "Địa chỉ không hợp lệ.",
    },
  ];

  const selectedTour = useSelector((state) => state.cartReducer.selectedTour);

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    switch (fieldName) {
      case "name":
        errorMessage = /^[a-zA-Z\s]*$/.test(value)
          ? ""
          : "Tên chỉ được chứa chữ cái và khoảng trắng.";
        break;
      case "email":
        errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Email không hợp lệ.";
        break;
      case "phoneNumber":
        errorMessage = /^0\d{9,10}$/.test(value)
          ? ""
          : "Số điện thoại không hợp lệ.";
        break;
      case "address":
        errorMessage = /^.{1,100}$/.test(value) ? "" : "Địa chỉ không hợp lệ.";
        break;
      default:
        break;
    }
    setErrors({ ...errors, [fieldName]: errorMessage });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    validateField(name, value);
  };

  const errCustomerInfor = () => {
    Swal.fire({
      icon: "warning",
      text: "Vui lòng điền thông tin đầy đủ!!",
    });
  };

  const handleSubmitFormTour = (e) => {
    e.preventDefault();
    // Kiểm tra xem formData có chứa chỉ kí tự khoảng trắng không
    const isFormDataValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    // Kiểm tra xem có lỗi nào trong errors không
    const hasError = Object.values(errors).some((error) => error !== "");
    if (isFormDataValid && !hasError) {
      navigate("/payment");
    } else {
      errCustomerInfor();
    }
  };

  return (
    <div className="bg-grey">
      <Process step={step} />
      <div className="mb-7 bg-white">
        <div className="grid grid-cols-3 gap-5 max-w-[1149px] mx-auto text-zinc-900 py-7">
          <div className="col-span-2">
            {[
              ...Array(
                selectedTour.quantityAdult + selectedTour.quantityChildren
              ),
            ].map((_, index) => (
              <div key={index} className="  flex flex-col mb-6">
                <h2 className="text-[26px] pb-3">
                  Thông tin du khách: #{index + 1}
                </h2>
                <div className="grid grid-cols-2 gap-5 mb-4">
                  {inputFields.map((field, index) => (
                    <div key={index}>
                      <div className="flex flex-col">
                        <label>
                          {field.label} (<span className="text-red-600">*</span>
                          ):
                          {errors[field.name] && (
                            <span className="text-red-600">
                              {errors[field.name]}
                            </span>
                          )}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          placeholder={field.placeholder}
                          className="input-config"
                          onChange={handleChange}
                          pattern={field.pattern} // Set pattern attribute for regex validation
                          title={field.errorMessage} // Set title attribute for error message
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              className="bg-purple p-3 w-full text-white font-bold rounded-lg"
              onClick={handleSubmitFormTour}
            >
              Tiếp tục
            </button>
          </div>
          <SelectedBooking />
        </div>
      </div>
      <hr />
    </div>
  );
};
