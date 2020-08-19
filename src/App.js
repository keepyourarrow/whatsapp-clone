import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TEST_ERROR, TEST_SUCCESS } from "./redux/actions/testAction";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const testError = useSelector((state) => state.test.testError);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto h-screen py-24">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={ErrorPage} />
      </Switch>
      <div className="bg-blue-500 w-48 h-48 flex items-center flex-col justify-center  text-gray-900 font-bold text-2xl rounded-full px-4 py-6 mx-auto">
        {testError ? (
          <span className="">Errrrrrrrrrrror</span>
        ) : (
          <span>SUCCESSSSSS</span>
        )}
        <button
          className="mt-2 bg-gray-500 text-white px-3 py-2 rounded-md focus:shadow-outline focus:outline-none hover:bg-gray-600 active:bg-gray-700 transition duration-75 linear"
          onClick={() => {
            let num = Math.round(Math.random());
            console.log("Randomly generated Number:", num);
            dispatch({ type: num === 0 ? TEST_SUCCESS : TEST_ERROR });
          }}
        >
          Dispatch
        </button>
      </div>
    </div>
  );
}

export default App;
