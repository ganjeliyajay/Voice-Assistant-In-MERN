import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './Slice/UserSlice'
import GeminiSlice from './Slice/GeminiSlice'
import HistorySlice from './Slice/HistorySlice'

export const store = configureStore({
  reducer: {
    users: UserSlice,
    gemini: GeminiSlice,
    history: HistorySlice,
  },
});