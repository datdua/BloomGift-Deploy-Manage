import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import accountReducer from "./accountReducer";
import orderReducer from "./orderReducer";
import promotionReducer from "./promotionReducer";
import storeReducer from "./storeReducer";
import paymentReducer from "./paymentReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  orders: orderReducer,
  compareData: compareReducer,
  seller: accountReducer,
  promotionData: promotionReducer,
  storeData: storeReducer,
  paymentData: paymentReducer,
});

export default rootReducer;
