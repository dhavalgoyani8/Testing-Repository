import {
  ADD_TODO,
  ALL_DELETE,
  CHECK_TODO,
  COMPLETE,
  COMPLETE_ALL_DELETE,
  DELETE_TODO,
  EDIT_TODO,
  PENDING,
  SELECT_ALL,
  SHOW_All,
} from "./actionType";

export const addTodo = (inputValue) => {
  return {
    type: ADD_TODO,
    payload: inputValue,
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const checkTodo = (id) => {
  return {
    type: CHECK_TODO,
    payload: id,
  };
};

export const editTodo = (updateValue, updateId) => {
  return {
    type: EDIT_TODO,
    payload: { updateValue: updateValue, updateId: updateId },
  };
};

export const showAllTodo = () => {
  return {
    type: SHOW_All,
  };
};

export const PendingTodo = () => {
  return {
    type: PENDING,
  };
};

export const CompleteTodo = () => {
  return {
    type: COMPLETE,
  };
};

export const CompleteAllDeleteTodo = () => {
  return {
    type: COMPLETE_ALL_DELETE,
  };
};

export const allDeleteTodo = () => {
  return {
    type: ALL_DELETE,
  };
};

export const SelectAllTodo = () => {
  return {
    type: SELECT_ALL,
  };
};
