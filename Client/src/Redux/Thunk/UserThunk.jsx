import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const auth = import.meta.env.VITE_API_URL


export const register = createAsyncThunk('register', async (data, { rejectwithValue }) => {
    try {
        const res = await axios.post(`${auth}/register`, data, { withCredentials: true })

    } catch (error) {
        console.log(error.response.data.message)
        return rejectwithValue(error.response.data.message)
    }
})
export const login = createAsyncThunk('login', async (data, { rejectwithValue }) => {
    try {
        const res = await axios.post(`${auth}/login`, data , { withCredentials: true })

    } catch (error) {
        console.log(error.response.data.message)
        return rejectwithValue(error.response.data.message)
    }
})