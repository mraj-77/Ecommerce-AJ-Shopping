import { createSlice } from "@reduxjs/toolkit";

/* =====================================================
   CART SLICE
===================================================== */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },

  reducers: {
    /* =================================================
       ADD TO CART
    ================================================= */

    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      // Check if product already exists
      const existingItem = state.cart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Increase existing quantity
        existingItem.quantity += quantity;
      } else {
        // Add new product
        state.cart.push({ product, quantity, });
      }
    },

    /* =================================================
       REMOVE SINGLE PRODUCT
    ================================================= */

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
    },

    /* =================================================
       UPDATE CART QUANTITY
    ================================================= */

    updateCartQuantity: (state, action) => {
      // Find product
      const item = state.cart.find(
        (item) => item.product.id === action.payload.id
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    /* =================================================
       CLEAR ENTIRE CART
    ================================================= */

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

/* =====================================================
   EXPORT ACTIONS
===================================================== */

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  removeDeletedProducts,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;