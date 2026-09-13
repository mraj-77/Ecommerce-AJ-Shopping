import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const fetchMyOrders = createAsyncThunk(
  "order/orders/me",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/order/orders/me");
      return res.data.myOrders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "order/new",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/order/new", data);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to place order, try again."
      );
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// ✅ NEW: Razorpay checkout popup se payment success hone ke
// baad signature verify karwane ke liye backend ko call karta hai
export const verifyPayment = createAsyncThunk(
  "order/verifyPayment",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/payment/verify", data);
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Payment verification failed. Contact support if amount was deducted."
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    fetchingOrders: false,
    placingOrder: false,
    verifyingPayment: false,

    finalPrice: null,
    orderStep: 1,

    // ================================
    // ✅ FIX: Stripe ka `paymentIntent` (single string) hata
    // ke Razorpay ke actual response fields store kar rahe hain.
    // Ye sab "placeNewOrder" backend response se aate hain.
    // ================================
    orderId: null,        // hamara internal order id (orders table)
    razorpayOrderId: null,
    amount: null,
    currency: null,
    keyId: null,
  },
  reducers: {
    // Payment complete hone ke baad step 1 pe reset karo
    // (agla order start karne ke liye)
    toggleOrderStep(state) {
      state.orderStep = 1;
    },

    // ✅ NEW: ek naya order start karne se pehle purana
    // razorpay data saaf karo, warna stale data reuse ho sakta hai
    resetOrderState(state) {
      state.orderId = null;
      state.razorpayOrderId = null;
      state.amount = null;
      state.currency = null;
      state.keyId = null;
      state.finalPrice = null;
      state.orderStep = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMyOrders
      .addCase(fetchMyOrders.pending, (state) => {
        state.fetchingOrders = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.fetchingOrders = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state) => {
        state.fetchingOrders = false;
      })

      // placeOrder
      .addCase(placeOrder.pending, (state) => {
        state.placingOrder = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placingOrder = false;

        // ✅ FIX: backend jo actually bhejta hai wahi store karo
        state.finalPrice = action.payload.total_price;
        state.orderId = action.payload.orderId;
        state.razorpayOrderId = action.payload.razorpayOrderId;
        state.amount = action.payload.amount;
        state.currency = action.payload.currency;
        state.keyId = action.payload.keyId;

        state.orderStep = 2;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.placingOrder = false;
      })

      // verifyPayment
      .addCase(verifyPayment.pending, (state) => {
        state.verifyingPayment = true;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.verifyingPayment = false;
      })
      .addCase(verifyPayment.rejected, (state) => {
        state.verifyingPayment = false;
      });
  },
});

export default orderSlice.reducer;
export const { toggleOrderStep, resetOrderState } = orderSlice.actions;