import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Tour } from "../src/pages/tour/Tour";
import { Register } from "../src/pages/register/Register";
import { Login } from "../src/pages/login/Login";
import { Cart } from "../src/pages/cart/Cart";
import { LayoutDefault } from "./layoutDefault/LayoutDefault";
import { Category } from "./pages/categories/Category";
import { Booking } from "./pages/booking/Booking";
import { Payment } from "./pages/payment/Payment";
import { Checkout } from "./pages/checkout/Checkout";
import { Booked } from "./pages/booked/Booked";
import { LayoutNoFooter } from "./layoutDefault/LayoutNoFooter";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutDefault />}>
        <Route index element={<Home />} />
        <Route path="/tourList" element={<Tour />} />
        <Route path="/tourList/:id" element={<Tour />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/booked" element={<Booked />} />
      </Route>
      <Route path="/" element={<LayoutNoFooter />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
