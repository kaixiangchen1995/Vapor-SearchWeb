import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStories } from "../../api/hn";
import type { HitsItemsList } from "../../api/model/hnType";

interface SearchState {
  results: HitsItemsList;
  loading: boolean;
  error: null | string;
  lastQuery: string | null;
}

const hnSlice = createSlice({
  name: "hnSearch",
  initialState: {
    results: [],
    loading: false,
    error: null,
    lastQuery: null,
  } as SearchState,
  reducers: {
    clearHN(state) {
      state.results = [];
      state.lastQuery = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(asyncGetStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetStories.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
        state.lastQuery = action.meta.arg;
        state.error = null;
      })
      .addCase(asyncGetStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const asyncGetStories = createAsyncThunk(
  "hnSearch/getStories",
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await getStories(payload);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || "Search error";
      return rejectWithValue(message);
    }
  },
);

export default hnSlice.reducer;
export const { clearHN } = hnSlice.actions;
