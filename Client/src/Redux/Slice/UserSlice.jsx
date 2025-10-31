import { createSlice } from "@reduxjs/toolkit";
import { register } from "../Thunk/UserThunk";

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: '',
        user: []
    },
    extraReducers: (e) => {
        e
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
    }
})

export default UserSlice.reducer