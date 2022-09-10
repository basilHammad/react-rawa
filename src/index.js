import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducers from "./store/reducers";

import App from "./App";

import "./index.css";

const store = createStore(reducers, applyMiddleware(thunk));
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
