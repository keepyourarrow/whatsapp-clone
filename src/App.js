import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  // const testError = useSelector();
  // const dispatch = useDispatch();

  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}

export default App;
