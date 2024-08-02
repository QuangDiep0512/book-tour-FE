import React, { useEffect, useState } from "react";
import { getPayment } from "../../service/TourService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { SelectedBooking } from "../../components/SelectedBooking";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addCheckout } from "../../actions/Checkout";
import { Process } from "../../components/Process";

export const Payment = () => {
  const [payment, setPayment] = useState([]);
  const [step, setStep] = useState(4);
  const [isContent, setIsContent] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const dispath = useDispatch();
  const selectedTour = useSelector((state) => state.cartReducer.selectedTour);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChoosePayment = (item) => {
    if (isContent === item.id) {
      // Nếu đang click vào div đã được chọn, ẩn nó đi
      setIsContent(null);
    } else {
      // Nếu không, hiển thị div mới và ẩn div trước đó
      setIsContent(item.id);
      setPaymentMethod(item);
    }
  };

  const handleClickPayment = () => {
    if (isChecked) {
      navigate("/checkout");
      dispath(addCheckout(selectedTour, paymentMethod));
    } else {
      acceptTerms();
    }
  };

  const acceptTerms = () => {
    Swal.fire({
      icon: "warning",
      text: "Click vào ô check để chấp nhận điều khoản!!",
    });
  };

  useEffect(() => {
    const getApiPayment = async () => {
      const result = await getPayment();
      setPayment(result.data);
    };
    getApiPayment();
  }, []);
  return (
    <div className="bg-grey">
      <Process step={step} />
      <div className="my-7 py-5 bg-white">
        <h2 className="text-3xl text-zinc-800 ml-[100px]">
          Chọn phương thức thanh toán:
        </h2>
        <div className="grid grid-cols-3 gap-5 mx-auto max-w-[1100px] text-slate-600">
          <div className="col-span-2">
            {payment.map((item) => {
              return (
                <div className="my-3" key={item.id}>
                  <div
                    className={`flex items-center gap-5 cursor-pointer border border-solid border-[#ccc] py-2 px-4 ${
                      isContent === item.id
                        ? "bg-blue-500 text-white"
                        : "bg-blue-100 "
                    }`}
                    onClick={() => handleChoosePayment(item)}
                  >
                    <div>
                      <h3 className="text-xl leading-10">{item.title}</h3>
                      <p className="">{item.description}</p>
                    </div>
                    {isContent === item.id ? (
                      <FontAwesomeIcon icon={faCheck} className="text-4xl" />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} />
                    )}
                  </div>
                  {isContent === item.id && (
                    <div className="border-2 border-neutral-400 p-5 border-dotted ">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="text-lg">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="text-black font-semibold">
                &nbsp;Tôi đã đọc và đồng ý&nbsp;
                <span className="text-blue-600 font-bold">điều khoản</span>
              </label>
            </div>
            <div className="overflow-auto max-h-[300px] border-2 border-solid border-[#aaa] p-3">
              <p>
                Điều khoản này là sự thoả thuận đồng ý của quý khách khi sử dụng
                dịch vụ thanh toán trên trang web{" "}
                <a
                  href="http://www.saigontourist.net"
                  className="text-blue-600 italic"
                >
                  www.saigontourist.net&nbsp;
                </a>
                của Công ty Dịch vụ Lữ hành Saigontourist (Lữ hành
                Saigontourist) và những trang web của bên thứ ba. Việc quý khách
                đánh dấu vào ô “Đồng ý” và nhấp chuột vào thanh “Chấp nhận”
                nghĩa là quý khách đồng ý tất cả các điều khoản thỏa thuận trong
                các trang web này.
              </p>
              <p>&nbsp;</p>
              <p>
                <strong>Giải thích từ ngữ</strong>
              </p>
              <p>
                Điều khoản: là những điều quy định giữa Lữ hành Saigontourist và
                quý khách
              </p>
              <p>
                Bên thứ ba: là những đơn vị liên kết với Lữ hành Saigontourist
                (OnePay, Vietcombank) nhằm hỗ trợ việc thanh toán qua mạng cho
                quý khách
              </p>
              <p>
                Vé điện tử: là những thông tin và hành trình của quý khách cho
                chuyến đi được thể hiện trên một trang giấy mà quý khách có thể
                in ra được
              </p>
              <p>
                <strong>Về sở hữu bản quyền</strong>
              </p>
              <p>
                Trang web
                <a
                  href="http://www.saigontourist.net"
                  className="text-blue-600 italic"
                >
                  &nbsp;www.saigontourist.net&nbsp;
                </a>
                thuộc quyền sở hữu của Lữ hành Saigontourist và được bảo vệ theo
                luật bản quyền, quý khách chỉ được sử dụng trang web này với mục
                đích xem thông tin và đăng ký thanh toán online cho cá nhân chứ
                không được sử dụng cho bất cứ mục đích thương mại nào khác.
              </p>
            </div>
            <button
              className={`p-2 uppercase rounded-md mt-5 w-full bg-purple text-white text-lg disabled:opacity-75
              ${isContent ? "" : "pointer-events-none opacity-[0.8]"}`}
              onClick={handleClickPayment}
            >
              Thanh toán
            </button>
          </div>
          <SelectedBooking />
        </div>
      </div>
      <hr />
    </div>
  );
};
