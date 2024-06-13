import React, { useEffect, useState } from "react";
import logo from "../imgs/logo_travel.png";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faChevronDown,
  faCartShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import { getAllTour, getCategory } from "../service/TourService";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const data = useSelector((state) => state.cartReducer.cart);
  const [categoryName, setCategoryName] = useState([]);

  const total = data.reduce((sum, item) => {
    return sum + parseInt(item.quantityCart);
  }, 0);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveAccount = () => {
    localStorage.removeItem("user");
    setUser();
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const resultCategory = await getCategory();
      setCategoryName(resultCategory.data);
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));

    if (userLocalStorage) {
      setUser(userLocalStorage);
    }
  }, []);

  return (
    <div className="flex-center bg-003C71 text-white px-[20px] lg:px-[100px] py-[10px] sticky top-0 z-20">
      {/* ==Header=left==  */}
      <div className="flex-center gap-[30px]">
        <NavLink to="/">
          <img
            src={logo}
            className="aspect-[4/3] object-cover lg:w-[75px] w-[50px]"
            alt="abc"
          />
        </NavLink>
        <ul
          className={`${
            isOpen ? "show" : "hide"
          } md:flex-center md:gap-[30px] lg:text-2xl md:flex`}
        >
          {categoryName.map((item) => {
            return (
              <li className="py-3 hover:text-lightYellow" key={item.id}>
                <NavLink to={`/category/${item.id}`}>{item.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ==Header=right==  */}
      <div className="flex-center">
        <Tippy
          interactive
          placement="bottom-end"
          render={(attrs) => (
            <div
              className="bg-white text-lg w-[200px] px-3 py-3 flex flex-col text-white justify-center "
              tabIndex={-1}
              {...attrs}
            >
              {user ? (
                <>
                  <button className="my-4 btn-header">
                    <Link to="/booked">Tour đã đặt</Link>
                  </button>
                  <button className="btn-header" onClick={handleRemoveAccount}>
                    Đăng suất
                  </button>
                </>
              ) : (
                <>
                  <button className="btn-header">
                    <Link to="/login">Đăng nhập</Link>
                  </button>
                  <span className="text-zinc-700 text-sm">
                    Chưa có tài khoản?
                    <span>
                      <Link to="/register" className="text-blue-600 text-base">
                        &nbsp;đăng kí&nbsp;
                      </Link>
                      ngay
                    </span>
                  </span>
                </>
              )}
            </div>
          )}
        >
          {/* ==avatar== */}
          <div className="flex-center mx-6 cursor-pointer">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="lg:text-2xl text-xl"
            />
            {user ? (
              <p className="ml-1 mr-2">{user.email}</p>
            ) : (
              <p className="ml-1 mr-2">Tài khoản</p>
            )}

            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </Tippy>

        {/* ==Cart== */}
        <Link to="/cart">
          <div className="relative">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="cursor-pointer lg:text-2xl text-xl"
            />
            <span className="text-xs absolute bg-red-600 lg:h-[22px] h-[16px] rounded-full lg:w-[22px] w-[16px] top-[-10px] left-[15px] font-bold flex justify-center items-center">
              {total}
            </span>
          </div>
        </Link>
        {/* ==Menu== */}
        <div className="block md:hidden ml-6 cursor-pointer">
          <FontAwesomeIcon icon={faBars} onClick={handleOpenMenu} />
        </div>
      </div>
    </div>
  );
};
