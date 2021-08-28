import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "../features/roomSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    room: roomReducer,
    user: userReducer,
  },
});
