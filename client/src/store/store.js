// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import popupReducer from "./slices/popupSlice";
// import cartReducer from "./slices/cartSlice";
// import productReducer from "./slices/productSlice";
// import orderReducer from "./slices/orderSlice";
// import wishlistReducer from "./slices/wishlistSlice"; // ← add

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     popup: popupReducer,
//     cart: cartReducer,
//     product: productReducer,
//     order: orderReducer,
//     wishlist: wishlistReducer, // ← add
//   },
// });












import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import popupReducer from "./slices/popupSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import wishlistReducer from "./slices/wishlistSlice";

// ==========================================
// CART PERSIST CONFIG
// ==========================================
const cartPersistConfig = {
  key: "cart",
  storage,
};

// ==========================================
// WISHLIST PERSIST CONFIG
// ==========================================
const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

// ==========================================
// PERSIST REDUCERS
// ==========================================
const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer
);

const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);

// ==========================================
// STORE
// ==========================================
export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    cart: persistedCartReducer,
    product: productReducer,
    order: orderReducer,
    wishlist: persistedWishlistReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ==========================================
// PERSISTOR
// ==========================================
export const persistor = persistStore(store);