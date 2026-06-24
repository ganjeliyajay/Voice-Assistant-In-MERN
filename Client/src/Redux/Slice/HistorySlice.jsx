import { createSlice } from "@reduxjs/toolkit";

import { fetchHistory, saveHistory } from "../Thunk/HistoryThunk";

const HistorySlice = createSlice({
  name: "history",

  initialState: {
    loading: false,
    error: null,
    history: [],
  },

  extraReducers: (builder) => {
    builder

      .addCase(saveHistory.pending, (state) => {
        state.loading = true;
      })

      .addCase(saveHistory.fulfilled, (state, action) => {
        state.loading = false;

        state.history.push(action.payload);
      })

      .addCase(saveHistory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export default HistorySlice.reducer;
