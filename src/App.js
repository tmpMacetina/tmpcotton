/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import "./App.scss";

import Page from "./page/Page";

export class App extends Component {
  render() {
    return (
      <div>
        <Page />
      </div>
    );
  }
}

export default App;
