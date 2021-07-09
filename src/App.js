import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import ReactGA from "react-ga";
import Routes from "./Routes";

import "./assets/scss/index.scss";

const App = () => {
  // useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
export default App;
