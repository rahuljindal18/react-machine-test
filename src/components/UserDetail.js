import React from "react";
import { connect } from "react-redux";

function UserDetail({ user }) {
  return (
    <div className="container">
      <h1>User Details</h1>
      <div className="field-div-detail">
        <label>Username : </label>
        <h3>{user.username}</h3>
      </div>
      <div className="field-div-detail">
        <label>Email : </label>
        <h3>{user.email}</h3>
      </div>
      <div className="field-div-detail">
        <label>Image : </label>
        <img src={user.imageFile} alt="" height="200" width="200" />
      </div>
      <div className="field-div-detail">
        <label>Address : </label>
        <h3>{user.address}</h3>
      </div>
      <div className="field-div-detail">
        <label>Hobbies : </label>
        <h3>{user.hobbies.map((obj) => obj.name).join(",")}</h3>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.updateFormReducer,
});

export default connect(mapStateToProps, null)(UserDetail);
