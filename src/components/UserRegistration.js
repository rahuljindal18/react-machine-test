import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import {
  updateForm,
  updateImageUrl,
  imageValidationError,
  addNewHobby,
  updateHobbies,
  updateHobbyError,
} from "../redux/actions/updateform";

const FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/svg", "image/png"];

class UserRegistration extends Component {
  state = {
    hobbies: [{ name: "" }],
  };
  handleChangeHobby = (event) => {
    let hobbies = [...this.props.user.hobbies];
    hobbies[event.target.dataset.id][event.target.className] =
      event.target.value;
    this.props.updateHobbies(hobbies);
  };
  addHobby = () => {
    if (
      this.props.user.hobbies[this.props.user.hobbies.length - 1].name === ""
    ) {
      this.props.updateHobbyError("Please add a hobby to continue");
      return;
    }
    this.props.addNewHobby();
  };
  handleImageChange = (event) => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    if (file.size > FILE_SIZE) {
      this.props.imageError(
        "File size is greater than 2MB. Please select file less than 2MB."
      );
      return;
    } else if (!SUPPORTED_FORMATS.includes(file.type)) {
      this.props.imageError(
        "Please select image in .jpg, .jpeg, .png, .svg format only"
      );
      return;
    }

    reader.onloadend = () => {
      this.props.updateImage(reader.result);
    };

    reader.readAsDataURL(file);
  };
  render() {
    const { hobbies, imageError, hobbyError } = this.props.user;
    const { updateUser, history } = this.props;
    const UserSchema = yup.object({
      username: yup
        .string()
        .required()
        .min(8)
        .matches(/^[A-Za-z0-9]+$/, {
          message: "Username must not contain special characters",
        }),
      email: yup.string().required().email(),
      address: yup.string().required().max(200),
      acceptTerms: yup
        .bool()
        .oneOf([true], "Please accept terms and conditions to continue"),
    });
    return (
      <div>
        <Formik
          initialValues={{
            username: "",
            email: "",
            address: "",
            acceptTerms: false,
          }}
          validationSchema={UserSchema}
          onSubmit={(values, actions) => {
            if (hobbies.length === 1 && hobbies[0].name === "") {
              this.props.updateHobbyError(
                "Please add atleast one hobby to continue"
              );
              return;
            }
            updateUser(values);
            actions.resetForm();
            history.push("/user-detail");
          }}
        >
          {(props) => (
            <div className="container">
              <h1>User Registrations</h1>
              <div className="field-div">
                <label>Username</label>
                <input
                  type="text"
                  onChange={props.handleChange("username")}
                  value={props.values.username}
                  onBlur={props.handleBlur("username")}
                />
                <p>{props.touched.username && props.errors.username}</p>
              </div>
              <div className="field-div">
                <label>Email</label>
                <input
                  type="email"
                  onChange={props.handleChange("email")}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
                <p>{props.touched.email && props.errors.email}</p>
              </div>
              <div className="field-div">
                <label>Image</label>
                <input
                  type="file"
                  onChange={this.handleImageChange}
                  accept="image/png, image/jpeg, image/svg, image/jpg"
                />
                <p>{imageError && imageError}</p>
              </div>
              <div className="field-div">
                <label>Address</label>
                <textarea
                  rows="4"
                  cols="50"
                  onChange={props.handleChange("address")}
                  value={props.values.address}
                  onBlur={props.handleBlur("address")}
                />
                <p>{props.touched.address && props.errors.address}</p>
              </div>
              <div className="field-div-hobby">
                <label>Hobbies</label>
                {hobbies.map((hobby, idx) => {
                  let hobbyId = `hobby-${idx}`;
                  console.log(hobby);
                  return (
                    <div key={idx}>
                      <input
                        type="text"
                        name={hobbyId}
                        data-id={idx}
                        id={hobbyId}
                        onChange={this.handleChangeHobby}
                        value={hobby.name}
                        className="name"
                      />
                    </div>
                  );
                })}
                <p>{hobbyError && hobbyError}</p>
                <button
                  className="add-more"
                  type="button"
                  onClick={this.addHobby}
                >
                  Add More Hobbies
                </button>
                <div className="terms">
                  <input
                    type="checkbox"
                    onChange={props.handleChange("acceptTerms")}
                    value={props.values.acceptTerms}
                    onBlur={props.handleBlur("acceptTerms")}
                  />
                  <span>Terms &amp; Conditions</span>
                  <p>{props.touched.acceptTerms && props.errors.acceptTerms}</p>
                </div>

                <button
                  type="submit"
                  className="submit"
                  onClick={props.handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.updateFormReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (obj) => {
      dispatch(updateForm(obj));
    },
    updateImage: (imageUrl) => {
      dispatch(updateImageUrl(imageUrl));
    },
    imageError: (msg) => {
      dispatch(imageValidationError(msg));
    },
    addNewHobby: () => {
      dispatch(addNewHobby());
    },
    updateHobbies: (hobbies) => {
      dispatch(updateHobbies(hobbies));
    },
    updateHobbyError: (msg) => {
      dispatch(updateHobbyError(msg));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserRegistration)
);
