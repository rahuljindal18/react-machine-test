import {
  UPDATE_FORM_FIELDS,
  UPDATE_IMAGE_URL,
  IMAGE_VALIDATION_ERROR,
  ADD_NEW_HOBBY,
  UPDATE_HOBBIES,
  UPDATE_HOBBY_ERROR,
} from "../actionTypes";

const initialState = {
  username: "",
  email: "",
  imageFile: "",
  address: "",
  hobbies: [{ name: "" }],
  imageError: "",
  hobbyError: "",
};

export default function updateFormReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORM_FIELDS:
      return {
        ...state,
        ...action.payload,
        imageError: "",
        hobbyError: "",
      };
    case UPDATE_IMAGE_URL:
      return {
        ...state,
        imageFile: action.payload,
        imageError: "",
        hobbyError: "",
      };
    case IMAGE_VALIDATION_ERROR:
      return {
        ...state,
        imageError: action.payload,
        hobbyError: "",
      };
    case ADD_NEW_HOBBY:
      return {
        ...state,
        hobbies: [...state.hobbies, { name: "" }],
        imageError: "",
        hobbyError: "",
      };
    case UPDATE_HOBBIES:
      return {
        ...state,
        hobbies: [...action.payload],
        imageError: "",
        hobbyError: "",
      };
    case UPDATE_HOBBY_ERROR:
      return {
        ...state,
        imageError: "",
        hobbyError: action.payload,
      };
    default:
      return state;
  }
}
