import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { Reducers } from "./reducers";

export const mystore = createStore(Reducers, applyMiddleware(thunk));