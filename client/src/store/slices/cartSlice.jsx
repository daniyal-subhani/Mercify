import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, selectedSizeId, userId } = action.payload;
      
      // Check for existing item with same ID, size, and user
      const existingItem = state.cartItems.find(
        (item) =>
          item._id === _id &&
          item.selectedSizeId === selectedSizeId &&
          item.userId === userId
      );

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if exists
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 }); // Add new item
      }
    },

    removeFromCart: (state, action) => {
      // Filter out the exact item matching all conditions
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(item._id === action.payload._id &&
          item.userId === action.payload.userId &&
          item.selectedSizeId === action.payload.selectedSizeId)
      );
    },

    updateQuantity: (state, action) => {
      const { _id, quantity, userId, selectedSizeId } = action.payload;
      const existing = state.cartItems.find(
        (item) =>
          item._id === _id &&
          item.userId === userId &&
          item.selectedSizeId === selectedSizeId
      );

      if (existing) {
        existing.quantity = quantity;
      }
    },

    clearCart: (state, action) => {
      if (action.payload?.userId) {
        state.cartItems = state.cartItems.filter(
          (item) => item.userId !== action.payload.userId
        );
      } else {
        state.cartItems = [];
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;