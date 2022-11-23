import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Header from "./Header";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import AuthBtn from "./AuthBtn";

import {
  getGoogleAuthData,
  signUp,
  signIn,
} from "redux/actions/authActions";

const Auth = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.authError);
  const { handleSubmit, register, errors } = useForm();

  const [active, setActive] = useState("signUp");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        toggleModal();
        dispatch(getGoogleAuthData(user));
      }
    });
  }, []);

  const onSubmit = (data) => {
    let user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    if (active === "signUp") {
      dispatch(signUp(user));
    } else {
      dispatch(signIn(user));
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Header/>
      <div className="mt-4 w-full border-b border-gray-300">
        <AuthBtn
          active={active}
          className="mr-2"
          text="Log In"
          type="logIn"
          setActive={setActive}
        />

        <AuthBtn
          active={active}
          text="Sign Up"
          type="signUp"
          setActive={setActive}
        />
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {active === "signUp" ? (
            <SignUpForm register={register} errors={errors} />
          ) : (
            <LoginForm register={register} errors={errors} />
          )}
          {authError && <div className="mt-2 text-red-500">{authError}</div>}
          <button className="submit-btn">Submit</button>
        </form>
      </div>

      {/* google auth */}
      <div className="mt-4 mx-auto">
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: "popup",
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
            callbacks: {
              signInSuccessWithAuthResult: () => false,
            },
          }}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
};

export default Auth;