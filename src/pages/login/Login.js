import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../../service/UsersService";
import { ToastContainer, toast } from "react-toastify";

export const Login = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };

  const showErrLogin = () => {
    toast.error("Đăng nhập không thành công !!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    const fetchGetUsers = async () => {
      const users = await getUsers();
      setDataUsers(users.data);
    };
    fetchGetUsers();
  }, []);

  const handleLogin = () => {
    const user = dataUsers.find(
      (item) => item.email === email && item.password === password
    );
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      showErrLogin();
    }
  };

  return (
    <div className="relative  flex justify-center items-center h-[100vh] bg-bgLogin bg-cover bg-no-repeat bg-center">
      <div className="absolute inset-0 bg-slate-200 opacity-50"></div>
      <div className=" bg-white px-10 py-5 z-40 rounded-lg md:min-w-[600px]">
        <h2 className="text-3xl text-purple font-bold text-center mb-10">
          Đăng nhập
        </h2>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Email"
            className="input-config"
            name="email"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <input
            type="text"
            placeholder="Mật khẩu"
            className="input-config"
            name="password"
            value={password}
            onChange={handleOnchangePassword}
          />
          <button
            className="w-full p-3 text-white uppercase bg-purple rounded-md"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
          <div className="flex justify-between text-purple ">
            <Link>
              <span className="underline md:text-base text-sm mr-2">
                Quên mật khẩu
              </span>
            </Link>
            <Link to="/register">
              <span className="underline md:text-base text-sm ml-2">
                Tạo tài khoản mới
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
