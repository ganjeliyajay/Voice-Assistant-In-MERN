import { createSlice } from "@reduxjs/toolkit";
import { autoLogin, login, logout, register } from "../Thunk/UserThunk";

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: '',
        user: [],
        success: false
    },
    extraReducers: (e) => {
        e
            //register
            .addCase(register.pending, (state) => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false

            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload
            })

            //login
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            //auto-login
            .addCase(autoLogin.pending, (state) => {
                state.loading = true
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.loading = false;

            })

            //logout
            .addCase(logout.pending, (state) => {
                state.loading = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false

            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export default UserSlice.reducer