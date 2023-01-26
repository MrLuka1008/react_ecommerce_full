import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { useSelector } from "react-redux";
import { productReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReduces = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReduces);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export { authenticateUser, logoutUser } from "./slices/userSlice";
export {
  saveProduct,
  fetchHomePageProducts,
  fetchCategoryProducts,
  fetchQuertProducts,
  fetchSingleProductById,
  rateProduct,
  setSelectedProduct,
  setSearchResults,
} from "./slices/productSlice";

export { addToCart, removeFromCart, clearCart, fetchCart, saveCart } from "./slices/cartSlice";

export const useUserInfo = () => useSelector((state) => state.user.userData);

export const useSelectedProduct = () => useSelector((state) => state.product.selectedProduct);
export const useHomePageProducts = () => useSelector((state) => state.product.homePageProducts);
export const UseCategories = () => useSelector((state) => state.product.categories);
export const useCategoryProducts = () => useSelector((state) => state.product.categoryProducts);
export const useSearchResult = () => useSelector((state) => state.product.searchResult);
export const useSingleProduct = () => useSelector((state) => state.product.singleProduct);

export const useCartItems = () => useSelector((state) => state.cart.cartItems);
