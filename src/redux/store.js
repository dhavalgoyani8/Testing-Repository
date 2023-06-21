import { combineReducers, createStore } from "redux";
import { todoReducer } from "./reducers/todoReducer";

const rootReducer = combineReducers({ todoReducer });

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
