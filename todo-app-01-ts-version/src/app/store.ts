import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todosSlice";
import userReducer from "../features/users/userSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

