import React, { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  checkTodo,
  checkUncheck,
  clearComplete,
  completeTodo,
  deleteAll,
  deleteTodo,
  editTodo,
  pendingTodo,
  showAllTodo,
} from "../actions/actions";
import { COMPLETE, PENDING } from "../actions/actionType";

function TodoList() {
  const [inputTodo, setInputTodo] = useState("");
  const [updateTodoId, setUpdateTodoId] = useState(null);
  const [updateTodoValue, setUpdateTodoValue] = useState("");

  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoReducer.todoList);
  const display = useSelector((state) => state.todoReducer.display);

  const handleAddTodo = () => {
    if (inputTodo === "") {
      alert("Entre your Todo");
    } else {
      dispatch(addTodo(inputTodo));
      setInputTodo("");
    }
  };

  const handleCheckTodo = (id) => {
    dispatch(checkTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (value, id) => {
    setUpdateTodoValue(value);
    setUpdateTodoId(id);
  };

  const handleEditTodo = (e) => {
    if (updateTodoValue !== "") {
      if (e.key === "Enter") {
        dispatch(editTodo(updateTodoValue, updateTodoId));
        setUpdateTodoValue("");
        setUpdateTodoId(null);
      }
    }
  };

  const handleClearComplete = () => {
    if (window.confirm("Are you sure you want to clear all todo?")) {
      dispatch(clearComplete());
      alert("your completed todo has been cleared");
    } else {
      alert("your completed todo has been not cleared");
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all todo?")) {
      dispatch(deleteAll());
      alert("your all todo has been deleted");
    } else {
      alert("your all todo has been not deleted");
    }
  };

  const newTodoList = useMemo(() => {
    switch (display) {
      case PENDING: {
        return todoList.filter((e) => !e.complete);
      }

      case COMPLETE: {
        return todoList.filter((e) => e.complete);
      }

      default: {
        return todoList;
      }
    }
  }, [todoList, display]);

  return (
    <>
      <div className="head">
        <header className="header">
          <h1>TODO LIST</h1>
        </header>

        <div className="div1">
          <button
            className="selectBtn"
            title="Check / Uncheck All Todo"
            onClick={() => dispatch(checkUncheck())}>
            {todoList.some((e) => e.complete) ? "UnCheck All" : "Check All"}
          </button>

          <input
            title="Click to input and Enter your todo"
            className="inputTodo"
            type="text"
            value={inputTodo}
            onChange={(e) => setInputTodo(e.target.value)}
            placeholder="Enter your Todo Here...!"
          />

          <button
            className="AddBtn"
            title="Click to Add Todo"
            onClick={handleAddTodo}>
            Add
          </button>

          <p className="total">Total: {newTodoList.length}</p>
        </div>

        <div className="div2">
          <button
            title="Click to Show All Todo"
            className="ShowAllBtn"
            onClick={() => dispatch(showAllTodo())}>
            Show All
          </button>

          <button
            title="Click to Pending All Todo"
            className="pendingBtn"
            onClick={() => dispatch(pendingTodo())}>
            Pending
          </button>

          <button
            title="Click to Complete All Todo"
            className="completeBtn"
            onClick={() => dispatch(completeTodo())}>
            Complete
          </button>

          <button
            title="Click to  Clear All Completed Todo"
            className="clrComBtn"
            onClick={handleClearComplete}>
            Clear Complete
          </button>

          <button
            title="Click to  Delete All Todo"
            className="clrAllBtn"
            onClick={handleDeleteAll}>
            Delete All
          </button>
        </div>
      </div>

      <div className="mainData">
        {newTodoList.map((e) => {
          return (
            <div key={e.id}>
              <div className="todoData">
                <input
                  title="Click to Complete"
                  className="todoCheck"
                  type="checkbox"
                  checked={e.complete}
                  onChange={() => handleCheckTodo(e.id)}
                />

                <span
                  style={{
                    textDecoration: e.complete ? "line-through" : "none",
                  }}
                  onDoubleClick={() => handleUpdateTodo(e.todo, e.id)}>
                  {updateTodoId === e.id ? (
                    <input
                      title="Edit and Enter To Save Todo"
                      className="todoEdit"
                      type="text"
                      value={updateTodoValue}
                      onChange={(e) => setUpdateTodoValue(e.target.value)}
                      onKeyPress={(e) => handleEditTodo(e)}
                    />
                  ) : (
                    <h1 className="todoValue" title="Double Click to Edit">
                      {e.todo}
                    </h1>
                  )}
                </span>

                <button
                  title="Delete Todo"
                  className="todoDelete"
                  onClick={() => handleDeleteTodo(e.id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {/* <p className="footer">Hello Friends this is my Todo List and Thankyou for used my Todo Project</p> */}
      </div>
    </>
  );
}

export default TodoList;
