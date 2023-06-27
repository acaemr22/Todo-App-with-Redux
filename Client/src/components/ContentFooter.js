import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveFilter,
  clearCompleted,
  selectTodos,
  removeTodoAsync,
} from "../redux/todos/todosSlice";

const ContentFooter = () => {
  const items = useSelector(selectTodos);
  const itemsLeft = items.filter((item) => !item.completed).length;

  const activeFilter = useSelector((state) => state.todos.activeFilter);

  const dispatch = useDispatch();

  const handleRemoveAllCompleted = () => {
    const completedItems = items.filter((item) => item.completed === true);
    completedItems.forEach((element) => {
      dispatch(removeTodoAsync(element.id));
    });
  };

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft + " "}</strong>
        item{itemsLeft > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            onClick={() => dispatch(changeActiveFilter("all"))}
            className={activeFilter === "all" ? "selected" : ""}
          >
            All
          </a>
        </li>
        <li>
          <a
            onClick={() => dispatch(changeActiveFilter("active"))}
            className={activeFilter === "active" ? "selected" : ""}
            href="#/"
          >
            Active
          </a>
        </li>
        <li>
          <a
            onClick={() => dispatch(changeActiveFilter("completed"))}
            className={activeFilter === "completed" ? "selected" : ""}
            href="#/"
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={handleRemoveAllCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default ContentFooter;
