import { cartReducer } from "./cartReducer";
import { tourReducer } from "./tourReducer";
import { checkoutReducer } from "./checkoutReducer";
import { bookedReducer } from "./bookedReducer";
import { combineReducers } from "redux";
export const allReducer = combineReducers({
  cartReducer,
  tourReducer,
  checkoutReducer,
  bookedReducer,
});
