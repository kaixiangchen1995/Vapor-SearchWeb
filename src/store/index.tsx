import { configureStore } from "@reduxjs/toolkit";
import hnSearch from "./slices/hnSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import unsplashImg from "./slices/unsplashSlice";

const store = configureStore({
  reducer: {
    hnSearch,
    unsplashImg,
  },
});

export default store;

//export RootState type
export type RootState = ReturnType<typeof store.getState>;
//export useAppSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//export AppDispatch type
export type AppDispatch = typeof store.dispatch;
//export useAppDispatch with type of AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
