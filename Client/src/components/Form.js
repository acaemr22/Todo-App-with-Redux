import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const addNewTodoLoading = useSelector(
    (state) => state.todos.addNewTodo.isLoading
  );
  const addNewTodoError = useSelector(
    (state) => state.todos.addNewTodo.error
  );

  const handleSubmit = (e) => {
    if (!title) return;
    e.preventDefault();
    dispatch(addTodoAsync({ title }));
    setTitle("");
  };


  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center", paddingRight: 10 }}
    >
      <input
        disabled={addNewTodoLoading}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />

      {addNewTodoLoading && <Loading/>}
      {addNewTodoError && <Error message={addNewTodoError} />}
    </form>
  );
};

export default Form;
