import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../Thunk/UserThunk";

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: '',
        user: []
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
                state.error = action.error.message
            })

            //login
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export default UserSlice.reducer