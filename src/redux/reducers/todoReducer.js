import {
  ADD_TODO,
  CHECK_TODO,
  CHECK_UNCHECK,
  CLEAR_COMPLETE,
  COMPLETE,
  DELETE_ALL,
  DELETE_TODO,
  EDIT_TODO,
  PENDING,
  SHOW_ALL,
} from "../actions/actionType";

const initialState = { todoList: [], display: "SHOW_ALL" };
export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const add = {
        id: Date.now(),
        todo: action.payload,
        complete: false,
      };
      return {
        ...state,
        todoList: [...state.todoList, add],
      };
    }

    case CHECK_TODO: {
      const edit = state.todoList.map((e) => {
        if (action.payload === e.id) {
          return { ...e, complete: !e.complete };
        }
        return e;
      });
      return {
        ...state,
        todoList: edit,
      };
    }

    case DELETE_TODO: {
      const del = state.todoList.filter((e) => {
        return action.payload !== e.id;
      });
      return {
        ...state,
        todoList: del,
      };
    }

    case EDIT_TODO: {
      const edit = state.todoList.map((e) => {
        if (action.payload.id === e.id) {
          return { ...e, todo: action.payload.value };
        }
        return e;
      });
      return {
        ...state,
        todoList: edit,
      };
    }

    case CLEAR_COMPLETE: {
      return {
        ...state,
        todoList: state.todoList.filter((e) => e.complete),
      };
    }

    case CHECK_UNCHECK: {
      let check = state.todoList.map((e) => {
        if (state.todoList.some((e) => e.complete)) {
          return { ...e, complete: false };
        } else {
          return { ...e, complete: true };
        }
      });
      return {
        ...state,
        todoList: check,
      };
    }

    case DELETE_ALL: {
      return {
        ...state,
        todoList: [],
      };
    }

    case SHOW_ALL: {
      return {
        ...state,
        display: SHOW_ALL,
      };
    }

    case PENDING: {
      return {
        ...state,
        display: PENDING,
      };
    }

    case COMPLETE: {
      return {
        ...state,
        display: COMPLETE,
      };
    }

    default:
      return state;
  }
};
