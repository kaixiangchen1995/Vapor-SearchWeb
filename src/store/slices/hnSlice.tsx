import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStories } from "../../api/hn";
import type { HitsItemsList } from "../../api/model/hnType";

interface SearchState {
  results: HitsItemsList;
  loading: boolean;
  error: null | string;
}

const hnSlice = createSlice({
  name: "hnSearch",
  initialState: {
    results: [],
    loading: false,
    error: null,
  } as SearchState,
  reducers: {
    clearHN(state) {
      state.results = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(asyncGetStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncGetStories.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(asyncGetStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch stories";
      });
  },
});

export const asyncGetStories = createAsyncThunk(
  "hnSearch/getStories",
  async (payload: string) => {
    const response = await getStories(payload);
    return response;
  },
);

export default hnSlice.reducer;
export const { clearHN } = hnSlice.actions;
