import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";
import Copyright from "./Copyright";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  //template, //
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
