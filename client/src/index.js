import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { Provider } from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';


const store = new createStore(reducers, {}, applyMiddleware(thunk));



ReactDOM.render(
  <Provider store={store}>
    <App ref={(ourComponent) => {window.ourComponent = ourComponent}}/>
  </Provider>,
  document.getElementById("root")
);
