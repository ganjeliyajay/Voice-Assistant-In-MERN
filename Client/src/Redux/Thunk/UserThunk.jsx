import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const auth = import.meta.env.VITE_API_URL


export const register = createAsyncThunk('register', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${auth}/register`, data, { withCredentials: true })

    } catch (error) {
        console.log(error.response.data.message)
        return rejectWithValue(error.response.data.message)
    }
})
export const login = createAsyncThunk('login', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${auth}/login`, data, { withCredentials: true })

    } catch (error) {
        console.log(error.response.data.message)
        return rejectWithValue(error.response.data.message)
    }
})

export const autoLogin = createAsyncThunk('autologin', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${auth}/login/me`, { withCredentials: true })
        return res.data
    } catch (error) {
        console.log(error.response.data.message)
        // return rejectWithValue(error.response.data.message)
    }
})