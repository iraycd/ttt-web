import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../modules";

export function renderWithRedux(
  ui: JSX.Element,
  { initialState, store = createStore(rootReducer, initialState) }: any = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}
