import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store/configureStore";
import Routers from "./components/Routers/Routers";


ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
      <Routers/>
    </BrowserRouter>
  </Provider>,
    document.getElementById("root")
);