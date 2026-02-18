import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const geminiApi = import.meta.env.VITE_API_URL;

export const getGeminiResponse = createAsyncThunk(
  "gemini/getResponse",
  async (command, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${geminiApi}/command`,
        { command },
        {
          withCredentials: true,
          timeout: 15000,
        }
      );

      return result.data;
    } catch (error) {
      console.error("❌ Gemini API error:", error);

      return rejectWithValue(
        error?.response?.data?.response ||
        error?.response?.data?.message ||
        "Server is not responding. Try again."
      );
    }
  }
);
