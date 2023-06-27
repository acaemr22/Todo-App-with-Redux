import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggle,
  destroy,
  selectFilteredTodos,
  getTodosAsync,
} from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";
import { toggleTodoAsync, removeTodoAsync } from "../redux/todos/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const filtered = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleDestroy = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(removeTodoAsync(id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} r />;
  }

  return (
    <ul className="todo-list">
      {filtered.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              onChange={() =>
                dispatch(
                  toggleTodoAsync({ id: item.id, data: {completed: !item.completed} })
                )
              }
              checked={item.completed}
              className="toggle"
              type="checkbox"
            />
            <label>{item.title}</label>
            <button
              onClick={() => handleDestroy(item.id)}
              className="destroy"
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
