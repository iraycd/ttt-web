import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as reducers from "./modules";
import { Operations } from "./modules/game";

const configureStore = (state = {}) => {
  const rootReducer = combineReducers(reducers);
  const middleware = [thunk];
  const store = createStore(rootReducer, state, applyMiddleware(...middleware));
  return store;
};

export const initialState: {} = {};
const store = configureStore(initialState);

if (!Object.entries(initialState).length) {
  // since we don't have any persisted state, we should start a new game when the game loads

  // our new game operation returns an action object that we can use in the
  // redux store to dispatch
  const newGame = Operations.newGame();

  store.dispatch(newGame);
}

export default store;
