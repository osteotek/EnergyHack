/* eslint-disable react/no-children-prop */
import React from "react";
import {render} from "react-dom";
import Dashboard from "./containers/Dashboard";

const renderApp = () => {
  render(<Dashboard />, document.getElementById("app"));
};

renderApp();
