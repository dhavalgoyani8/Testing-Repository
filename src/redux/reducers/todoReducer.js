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
} from "../actions/actionType";

const initialState = { todoList: [], display: "" };

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      let add = {
        id: Date.now(),
        task: action.payload,
        isComplete: false,
      };
      return {
        ...state,
        todoList: [...state.todoList, add],
      };
    }

    case DELETE_TODO: {
      let del = state.todoList.filter((e) => action.payload !== e.id);
      return {
        ...state,
        todoList: del,
      };
    }

    case CHECK_TODO: {
      let check = state.todoList.map((e) => {
        if (action.payload === e.id) {
          return {
            ...e,
            isComplete: !e.isComplete,
          };
        }
        return e;
      });
      return {
        ...state,
        todoList: check,
      };
    }

    case ALL_DELETE: {
      return {
        ...state,
        todoList: [],
      };
    }

    case EDIT_TODO: {
      console.log(action);
      let edit = state.todoList.map((e) => {
        if (action.payload.updateId === e.id) {
          return { ...e, task: action.payload.updateValue };
        }
        return e;
      });
      return {
        ...state,
        todoList: edit,
      };
    }

    case COMPLETE_ALL_DELETE: {
      return {
        ...state,
        todoList: state.todoList.filter((e) => !e.isComplete),
      };
    }

    case SHOW_All: {
      return {
        ...state,
        display: SHOW_All,
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

    case SELECT_ALL: {
      let t = state.todoList.map((e) => {
        if (state.todoList.some((e) => e.isComplete === true)) {
          return { ...e, isComplete: false };
        } else {
          return { ...e, isComplete: true };
        }
      });
      return {
        ...state,
        todoList: t,
      };
    }

    default: {
      return state;
    }
  }
};
