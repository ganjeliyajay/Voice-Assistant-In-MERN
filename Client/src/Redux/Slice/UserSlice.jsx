import { createSlice } from "@reduxjs/toolkit";
import { addAssistantName, autoLogin, getUser, login, logout, register } from "../Thunk/UserThunk";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // auto login
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      // assistant name
      .addCase(addAssistantName.fulfilled, (state) => {
        state.loading = false;
      })

      // get user
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { clearError } = UserSlice.actions;
export default UserSlice.reducer;
