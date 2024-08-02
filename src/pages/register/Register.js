import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { post } from "../../utils/request";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    rePassword: "",
  });

  const [err, setErr] = useState({});

  const inputFields = [
    {
      name: "username",
      type: "text",
      placeholder: "Tên đăng nhập",
    },
    {
      name: "fullName",
      type: "text",
      placeholder: "Họ tên",
    },
    {
      name: "email",
      type: "text",
      placeholder: "Email",
    },
    {
      name: "phoneNumber",
      type: "text",
      placeholder: "Số điện thoại",
    },
    {
      name: "password",
      type: "text",
      placeholder: "Mật khẩu",
    },
    {
      name: "rePassword",
      type: "text",
      placeholder: "Nhập lại mật khẩu",
    },
  ];

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = "";
    switch (fieldName) {
      case "username":
        errorMessage = /^[a-zà-ỹA-ZÀ-Ỹ\s]*$/.test(value)
          ? ""
          : "Tên chỉ được chứa chữ cái";
        break;
      case "fullName":
        errorMessage = /^([A-ZÀ-Ỹ][a-zà-ỹ]*\s?)+$/.test(value)
          ? ""
          : "Nhập họ tên và chữ cái đầu viết hoa ";
        break;
      case "email":
        errorMessage = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)
          ? ""
          : "Email không hợp lệ.";
        break;
      case "phoneNumber":
        errorMessage = /^0\d{10}$/.test(value)
          ? ""
          : "SĐT phải là số và gồm 10 chữ số.";
        break;
      case "rePassword":
        errorMessage =
          formData.password === value ? "" : "Mật khẩu không đúng.";
        break;
      default:
        break;
    }
    setErr({ ...err, [fieldName]: errorMessage });
  };

  const handleRegister = () => {
    const isErrWithData = Object.values(err).some((error) => error !== "");
    const isFormDataEmpty = Object.values(formData).some(
      (value) => value === ""
    );
    if (isErrWithData && isFormDataEmpty) {
      Swal.fire({
        icon: "warning",
        text: "Vui lòng điền thông tin đầy đủ!!",
      });
      return;
    } else {
      const listInfo = {
        username: formData.username,
        fullname: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        password: formData.password,
      };

      const postUser = async () => {
        const result = await post("/users", listInfo);
        return result;
      };
      postUser();

      Swal.fire({
        icon: "success",
        text: "Đăng kí tài khoản mới thành công!!",
      });
      navigate("/login");
    }
  };

  return (
    <div className="relative  flex justify-center items-center h-[100vh] bg-bgLogin bg-cover bg-no-repeat bg-center">
      <div className="absolute inset-0 bg-slate-200 opacity-50"></div>
      <div className=" bg-white px-10 py-5 z-40 rounded-lg max-w-[600px]">
        <h2 className="text-3xl text-purple font-bold text-center mb-10">
          Tạo tài khoản
        </h2>
        <div className="flex place-items-end flex-wrap gap-x-5 gap-y-7">
          {inputFields.map((item, index) => {
            return (
              <div className="w-[48%] relative" key={index}>
                {err[item.name] && (
                  <span className="text-red-600 text-sm absolute bottom-[100%]">
                    *{err[item.name]}
                  </span>
                )}
                <input
                  value={formData[item.name]}
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  className="input-config w-full"
                  onChange={handleChangeInput}
                />
              </div>
            );
          })}
          <p className="text-center">
            Bằng việc đăng ký, bạn đã đồng ý với XYZ về Điều khoản sử dụng và
            Chính sách bảo mật
          </p>
          <button
            className="w-full p-3 text-white uppercase bg-purple rounded-md"
            onClick={handleRegister}
          >
            Tạo tài khoản
          </button>
          <div className="flex mx-auto">
            <p>Bạn đã có tài khoản?&nbsp;</p>
            <Link to="/login">
              <p className="text-purple font-bold">Đăng nhập</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
