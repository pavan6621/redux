import { createStore, combineReducers, applyMiddleware } from "redux";
import firstReducer from "./firstReducer";
import secondReducer from "./secondReducer";
import { thunk } from "redux-thunk";
import reducer from "./reducer";

const rootReducer = combineReducers({
  firstState: firstReducer,
  secondState: secondReducer,
  reducerState: reducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
