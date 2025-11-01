import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './Slice/UserSlice'
import GeminiSlice from './Slice/GeminiSlice'

export const store = configureStore({
    reducer: {
        users: UserSlice,
        gemini: GeminiSlice
    }
})