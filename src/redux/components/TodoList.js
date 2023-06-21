import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CompleteAllDeleteTodo,
  CompleteTodo,
  PendingTodo,
  SelectAllTodo,
  addTodo,
  allDeleteTodo,
  checkTodo,
  deleteTodo,
  editTodo,
  showAllTodo,
} from "../actions/actions";
import { COMPLETE, PENDING } from "../actions/actionType";

function TodoList() {
  const [inputTodo, setInputTodo] = useState("");
  const [updateTodoValue, setUpdateTodoValue] = useState("");
  const [updateTodoId, setUpdateTodoId] = useState(null);

  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoReducer.todoList);
  const filterList = useSelector((state) => state.todoReducer.display);

  const handleAddTodo = (e) => {
    if (e.key === "Enter") {
      if (inputTodo === "") {
        alert("add task first");
      } else {
        dispatch(addTodo(inputTodo));
        setInputTodo("");
      }
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCheckTodo = (id) => {
    dispatch(checkTodo(id));
  };

  const handleEditTodo = (task, id) => {
    setUpdateTodoValue(task);
    setUpdateTodoId(id);
  };

  const handleUpdateTodo = (e) => {
    if (updateTodoValue !== "") {
      if (e.key === "Enter") {
        dispatch(editTodo(updateTodoValue, updateTodoId));
        setUpdateTodoId(null);
        setUpdateTodoValue("");
      }
    }
  };

  const handleCompletedDeleteAll = () => {
    if (window.confirm("Are you sure ???")) {
      dispatch(CompleteAllDeleteTodo());
    }
  };

  const handleDeleteAllTask = () => {
    if (window.confirm("ARE YOU SURE ???")) {
      dispatch(allDeleteTodo());
    }
  };

  const newTodoList = useMemo(() => {
    switch (filterList) {
      case COMPLETE: {
        return todoList.filter((e) => e.isComplete);
      }

      case PENDING: {
        return todoList.filter((e) => !e.isComplete);
      }

      default: {
        return todoList;
      }
    }
  }, [todoList, filterList]);

  const handleSelectAll = () => {
    dispatch(SelectAllTodo());
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleSelectAll}>
        {todoList.some((e) => e.isComplete === true)
          ? "Uncheck All"
          : "Check All"}
      </button>
      &nbsp;&nbsp;
      <input
        type="text"
        value={inputTodo}
        onChange={(e) => setInputTodo(e.target.value)}
        onKeyPress={handleAddTodo}
      />
      <hr />
      <div>
        {newTodoList?.map((element) => {
          return (
            <div key={element.id}>
              <input
                type="CheckBox"
                checked={element.isComplete}
                onChange={() => handleCheckTodo(element.id)}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span
                style={{
                  textDecoration: element.isComplete ? "line-through" : "none",
                }}
                onDoubleClick={() => handleEditTodo(element.task, element.id)}>
                {updateTodoId === element.id ? (
                  <input
                    type="text"
                    value={updateTodoValue}
                    onChange={(e) => setUpdateTodoValue(e.target.value)}
                    onKeyPress={(e) => handleUpdateTodo(e, element.id)}
                  />
                ) : (
                  <span>{element.task}</span>
                )}
              </span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={() => handleDeleteTodo(element.id)}>
                delete
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <h1>Total - {newTodoList.length}</h1>
        <button onClick={() => dispatch(showAllTodo())}>Show All</button>
        &nbsp;&nbsp;
        <button onClick={() => dispatch(PendingTodo())}>Pending</button>
        &nbsp;&nbsp;
        <button onClick={() => dispatch(CompleteTodo())}>Complete</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleCompletedDeleteAll}>
          Completed Delete All Completed
        </button>
        &nbsp;&nbsp;
        <button onClick={handleDeleteAllTask}>Delete All Task</button>
      </div>
    </div>
  );
}

export default TodoList;
