import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  myOrders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};