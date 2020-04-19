import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/reducers/rootReducer";
import UserRegistration from "./components/UserRegistration";
import UserDetail from "./components/UserDetail";

import "./index.css";

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route path="/user-detail" component={UserDetail} />
        <Route exact path="/" component={UserRegistration} />
      </Router>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
