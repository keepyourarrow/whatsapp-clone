import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGoogleAuthData,
  signUp,
  signIn,
} from "../../../redux/actions/authActions";
import firebase from "firebase";
import { useForm } from "react-hook-form";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

function DefaultFields({ register, errors }) {
  return (
    <>
      <label className="mt-5 block w-full" htmlFor="email">
        <div className="font-medium text-sm"> Email</div>

        <input
          className="mt-2 form-input w-full"
          type="email"
          id="email"
          name="email"
          ref={register({
            required: { value: true, message: "This field is required" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        <span className="mt-2 text-red-600">{errors?.email?.message}</span>
      </label>
      <label className="mt-5 block w-full" htmlFor="password">
        <div className="font-medium text-sm"> Password</div>
        <input
          className="mt-2 form-input w-full"
          type="password"
          id="password"
          name="password"
          ref={register({
            required: { value: true, message: "This field is required" },
            minLength: { value: 5, message: "Min characters - 5" },
          })}
        />
        <span className="mt-2 text-red-600">{errors?.password?.message}</span>
      </label>
    </>
  );
}

function SignUpForm({ register, errors }) {
  return (
    <>
      <DefaultFields register={register} errors={errors} />
      <label className="mt-5 block w-full" htmlFor="name">
        <div className="font-medium text-sm">Username</div>
        <input
          className="mt-2 form-input w-full"
          type="text"
          id="name"
          name="name"
          ref={register({
            required: { value: true, message: "This field is required" },
            minLength: { value: 5, message: "Min characters - 5" },
            maxLength: { value: 25, message: "Max characters - 25" },
          })}
        />
        <span className="mt-2 text-red-600">{errors?.name?.message}</span>
      </label>
    </>
  );
}

function LogInForm({ register, errors }) {
  return <DefaultFields register={register} errors={errors} />;
}

export const SignUpModal = ({ setOpenModal }) => {
  const [active, setActive] = useState("signUp");
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.authError);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setOpenModal(false);

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
      <div className="flex items-center justify-center space-x-2 mt-4 font-bold text-xl">
        <span className="w-8 h-8">
          <WhatsAppIconSVG />
        </span>
        <span>Join Us Today</span>
      </div>
      <div className="mt-4 w-full border-b border-gray-300">
        <button
          type="button"
          className={
            "py-1 border-b border-transparent focus:outline-none " +
            (active === "logIn" && "border-blue-500 text-blue-500")
          }
          onClick={() => {
            dispatch({ type: "REMOVE_ERROR" });
            setActive("logIn");
          }}
        >
          Log In
        </button>
        <button
          type="button"
          className={
            "ml-4 py-1 border-b border-transparent focus:outline-none " +
            (active === "signUp" && "border-blue-500 text-blue-500")
          }
          onClick={() => {
            dispatch({ type: "REMOVE_ERROR" });
            setActive("signUp");
          }}
        >
          Sign Up
        </button>
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {active === "signUp" ? (
            <SignUpForm register={register} errors={errors} />
          ) : (
            <LogInForm register={register} errors={errors} />
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

function WhatsAppIconSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 640 640"
    >
      <path d="M546.704 91.89C486.526 31.584 406.482-1.582 321.229-1.582 145.609-1.583 2.67 141.368 2.67 317.118c0 56.139 14.705 111.05 42.567 159.297L.001 641.595l168.959-44.34c46.595 25.382 99.013 38.835 152.222 38.835h.13C496.944 636.09 640 493.14 640 317.401c0-85.182-33.166-165.179-93.344-225.463l.047-.047zM321.323 582.315c-47.599 0-94.218-12.827-134.895-36.957l-9.697-5.788-100.265 26.257 26.776-97.726-6.272-10.04C70.312 415.965 56.4 367.244 56.4 317.13c0-146.082 118.832-264.96 265.066-264.96 70.713 0 137.328 27.65 187.302 77.622 49.996 50.127 77.493 116.588 77.493 187.42-.118 146.187-118.95 265.066-264.96 265.066l.024.036zM466.541 383.85c-7.913-4.028-47.115-23.233-54.39-25.89-7.276-2.658-12.58-4.028-17.977 4.027-5.268 7.914-20.587 25.89-25.252 31.265-4.666 5.28-9.284 6.035-17.197 2.008-7.914-4.028-33.674-12.426-64.064-39.568-23.634-21.095-39.662-47.221-44.328-55.134-4.665-7.914-.52-12.308 3.532-16.193 3.661-3.544 7.925-9.284 11.941-13.95 4.028-4.665 5.28-7.925 7.925-13.31 2.658-5.28 1.359-9.946-.637-13.95-2.008-4.015-17.977-43.217-24.485-59.185-6.39-15.603-13.063-13.43-17.965-13.701-4.665-.237-9.945-.237-15.2-.237-5.257 0-13.95 1.996-21.225 9.933-7.276 7.914-27.898 27.26-27.898 66.45 0 39.201 28.512 77.009 32.516 82.407 4.027 5.267 56.162 85.784 136.029 120.238 18.98 8.161 33.803 13.063 45.355 16.854 19.098 6.024 36.425 5.15 50.126 3.13 15.32-2.256 47.115-19.229 53.788-37.831 6.662-18.615 6.662-34.536 4.666-37.831-1.89-3.544-7.158-5.504-15.201-9.58l-.06.048z"></path>
    </svg>
  );
}
