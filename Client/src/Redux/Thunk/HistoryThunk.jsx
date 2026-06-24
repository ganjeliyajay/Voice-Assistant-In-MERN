import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const saveHistory = createAsyncThunk(
  "history/save",

  async (historyData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${api}/history/save`, historyData, {
        withCredentials: true,
      });
      console.log(res);

      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

export const fetchHistory = createAsyncThunk(
  "history/fetch",

  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${api}/history/getHistory`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
