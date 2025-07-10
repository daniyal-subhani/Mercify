import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk, signUpThunk, signInThunk } from "../thunks/authThunk";

const initialState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
  role: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        state.user = user || null;
        state.accessToken = action.payload.accessToken;
        state.role = user?.role || null;
        state.isLoggedIn = !!user;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Signup failed";
      });
    builder
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        state.user = user || null;
        state.accessToken = action.payload.accessToken;
        state.role = user?.role || null;
        state.isLoggedIn = !!user;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Signin failed";
      });
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.role = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});



export default authSlice.reducer;
