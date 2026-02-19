import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const auth = import.meta.env.VITE_API_URL;
console.log(auth)

export const register = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${auth}/register`, data, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Register failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${auth}/login`, data, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
    }
  }
);

export const autoLogin = createAsyncThunk(
  "autologin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${auth}/login/me`, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Auto login failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${auth}/logout`, {}, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const addAssistantName = createAsyncThunk(
  "assistantName",
  async (assistantName, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${auth}/assistant`, assistantName, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Assistant name error"
      );
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${auth}/user`, { withCredentials: true });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get user"
      );
    }
  }
);
