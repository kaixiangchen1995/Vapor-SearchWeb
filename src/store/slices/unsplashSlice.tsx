import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getImg } from "../../api/unsplash";
import type { ImgItem } from "../../api/model/unsplashType";

interface ImgState {
  results: ImgItem[];
  total_pages: number;
  page: number;
  loading: boolean;
  error: null | string;
}

const unsplashSlice = createSlice({
  name: "unsplashImg",
  initialState: {
    results: [],
    total_pages: 1,
    page: 1,
    loading: false,
    error: null,
  } as ImgState,
  reducers: {
    addPage(state) {
      state.page += 1;
    },
    clearImg(state) {
      state.results = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(asyncGetImgs.pending, (state) => {
        state.loading = true;
      })
      .addCase(asyncGetImgs.fulfilled, (state, action) => {
        state.loading = false;
        const newUniqueImgs = action.payload.results.filter((newImg) => {
          return !state.results.some((oldImg) => {
            oldImg.id === newImg.id;
          });
        });
        state.results.push(...newUniqueImgs);
        state.total_pages = action.payload.total_pages;
      })
      .addCase(asyncGetImgs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch stories";
      });
  },
});

export const asyncGetImgs = createAsyncThunk(
  "unsplashImg/getimgs",
  async (payload: { query: string; page: number }) => {
    const response = await getImg(payload.query, payload.page);
    return response;
  },
);

export default unsplashSlice.reducer;
export const { addPage, clearImg } = unsplashSlice.actions;
