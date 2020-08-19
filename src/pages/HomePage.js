import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

const HomePage = ({ ordered: { quizes } }) => {
  return (
    <div>
      Home page
      {quizes && quizes.map((item) => <p>{item.title}</p>)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.firestore;
};

export default compose(
  firestoreConnect([{ collection: "quizes" }]),
  connect(mapStateToProps)
)(HomePage);
