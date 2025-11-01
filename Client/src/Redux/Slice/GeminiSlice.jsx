import { createSlice } from "@reduxjs/toolkit";
import { getGeminiResponse } from '../Thunk/GeminiThunk'

const GeminiSlice = createSlice({
    name: 'gemini',
    initialState: {
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGeminiResponse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGeminiResponse.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getGeminiResponse.rejected, (state, action) => {
                state.loading = false;
                state.error = "Problem in getting Gemini response";
            });
    },
});

export default GeminiSlice.reducer;
