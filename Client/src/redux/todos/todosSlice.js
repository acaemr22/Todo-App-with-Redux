import { createSlice } from "@reduxjs/toolkit";
import {
  removeTodoAsync,
  getTodosAsync,
  addTodoAsync,
  toggleTodoAsync
} from "./services";

export {
  removeTodoAsync,
  getTodosAsync,
  addTodoAsync,
  toggleTodoAsync
}

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    activeFilter: localStorage.getItem("activeFilter") ?? "all",
    isLoading: false,
    error: null,
    addNewTodo: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },
  extraReducers: (builder) => {
    builder
      // get todos
      .addCase(getTodosAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.items = action.payload; // return edilen dataya action.payload ile ulaşılır
        state.isLoading = false;
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      // addTodo
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.addNewTodoLoading = false;
      })
      .addCase(addTodoAsync.pending, (state, action) => {
        state.addNewTodoLoading = true;
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.addNewTodoLoading = false;
        state.addNewTodoError = action.error.message;
      })
      // toggle Todo
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const { id, completed } = action.payload;
        const index = state.items.findIndex((item) => item.id === id);
        state.items[index].completed = completed;
      })
      // remove todo
      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
  },
});

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }

  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active" ? !todo.completed : todo.completed
  );
};

export default todosSlice.reducer;
export const { destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
