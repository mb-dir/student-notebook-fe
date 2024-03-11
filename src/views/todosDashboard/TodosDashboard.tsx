import { Collapse } from "react-collapse";
import { useState } from "react";
import "./styles.scss";

import { FC } from "react";

const TodosDashboard: FC = () => {
  const [isAddNewTodoOpen, setIsAddNewTodoOpen] = useState(false);
  const [isShowAllTodosOpen, setIsShowAllTodosOpen] = useState(false);

  const onAddNewTodoClick = () => {
    setIsAddNewTodoOpen((prev) => !prev);
    setIsShowAllTodosOpen(false);
  };
  const onShowAllTodosClick = () => {
    setIsShowAllTodosOpen((prev) => !prev);
    setIsAddNewTodoOpen(false);
  };
  return (
    <>
      <h2 className="todosHeader">
        Here you can manage all your todos and add new one as well!
      </h2>
      <div className="collapseWrapper">
        <div className="collapseWrapper__buttons">
          <button
            onClick={onAddNewTodoClick}
            className="collapseWrapper__optionButton"
          >
            Add new todo
          </button>
          <button
            onClick={onShowAllTodosClick}
            className="collapseWrapper__optionButton"
          >
            Show all notes
          </button>
        </div>
        <Collapse isOpened={isAddNewTodoOpen}>dodawanie todos</Collapse>
        <Collapse isOpened={isShowAllTodosOpen}>lista todos</Collapse>
      </div>
    </>
  );
};

export default TodosDashboard;
