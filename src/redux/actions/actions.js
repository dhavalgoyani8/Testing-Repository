import {
  ADD_TODO,
  CHECK_TODO,
  CLEAR_COMPLETE,
  COMPLETE,
  DELETE_TODO,
  DELETE_ALL,
  EDIT_TODO,
  PENDING,
  SHOW_ALL,
  CHECK_UNCHECK,
} from "./actionType";

export const addTodo = (inputTodo) => {
  return {
    type: ADD_TODO,
    payload: inputTodo,
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const editTodo = (updateValue, updateId) => {
  return {
    type: EDIT_TODO,
    payload: { value: updateValue, id: updateId },
  };
};

export const checkTodo = (id) => {
  return {
    type: CHECK_TODO,
    payload: id,
  };
};

export const showAllTodo = () => {
  return {
    type: SHOW_ALL,
  };
};

export const pendingTodo = () => {
  return {
    type: PENDING,
  };
};

export const completeTodo = () => {
  return {
    type: COMPLETE,
  };
};

export const clearComplete = () => {
  return {
    type: CLEAR_COMPLETE,
  };
};

export const deleteAll = () => {
  return {
    type: DELETE_ALL,
  };
};

export const checkUncheck = () => {
  return {
    type: CHECK_UNCHECK,
  };
};
