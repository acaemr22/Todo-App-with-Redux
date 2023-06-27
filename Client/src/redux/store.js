import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/todosSlice.js"

export const store = configureStore({
  reducer: {
    todos: todosReducer
  },
});
