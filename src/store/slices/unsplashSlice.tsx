import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getImg } from "../../api/unsplash";
import type { ImgItem } from "../../api/model/unsplashType";

interface ImgState {
  results: ImgItem[];
  total_pages: number;
  page: number;
  loading: boolean;
  error: null | string;
  lastQuery: string | null;
  hasMore: boolean;
}

const unsplashSlice = createSlice({
  name: "unsplashImg",
  initialState: {
    results: [],
    total_pages: 1,
    page: 1,
    loading: false,
    error: null,
    lastQuery: null,
    hasMore: true,
  } as ImgState,
  reducers: {
    addPage(state) {
      if (state.page < state.total_pages) {
        state.page += 1;
      }
    },
    clearImg(state) {
      state.results = [];
      state.page = 1;
      state.total_pages = 1;
      state.lastQuery = null;
      state.hasMore = true;
    },
    setLastQuery(state, action) {
      state.lastQuery = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(asyncGetImgs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetImgs.fulfilled, (state, action) => {
        state.loading = false;

        // Only add new images if query has changed or we're on first page
        if (state.page === 1) {
          state.results = action.payload.results;
        } else {
          // Add only unique new images
          const newUniqueImgs = action.payload.results.filter((newImg) => {
            return !state.results.some((oldImg) => oldImg.id === newImg.id);
          });
          state.results.push(...newUniqueImgs);
        }

        state.total_pages = action.payload.total_pages;
        state.lastQuery = action.meta.arg.query;
        state.hasMore = state.page < state.total_pages;
      })
      .addCase(asyncGetImgs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const asyncGetImgs = createAsyncThunk(
  "unsplashImg/getimgs",
  async (payload: { query: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await getImg(payload.query, payload.page);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || "Search error";
      return rejectWithValue(message);
    }
  },
);

export default unsplashSlice.reducer;
export const { addPage, clearImg, setLastQuery } = unsplashSlice.actions;
