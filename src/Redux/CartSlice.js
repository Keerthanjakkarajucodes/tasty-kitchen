import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
};

const saveToLocalStorage = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const uniqueId = item.uniqueId;

      const existingItem = state.items.find((i) => i.uniqueId === uniqueId);

      if (existingItem) {
        if (existingItem.quantity < 10) existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      saveToLocalStorage(state.items);
    },

    increment: (state, action) => {
      const item = state.items.find((i) => i.uniqueId === action.payload);
      if (item && item.quantity < 10) item.quantity += 1;
      saveToLocalStorage(state.items);
    },

    decrement: (state, action) => {
      const item = state.items.find((i) => i.uniqueId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.uniqueId !== action.payload);
      }
      saveToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addItem, increment, decrement, clearCart } = cartSlice.actions;
export default cartSlice;
