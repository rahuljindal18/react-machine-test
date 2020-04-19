import {
  UPDATE_FORM_FIELDS,
  UPDATE_IMAGE_URL,
  IMAGE_VALIDATION_ERROR,
  ADD_NEW_HOBBY,
  UPDATE_HOBBIES,
  UPDATE_HOBBY_ERROR,
} from "../actionTypes";

export function updateForm(payload) {
  return {
    type: UPDATE_FORM_FIELDS,
    payload,
  };
}

export function updateImageUrl(imageUrl) {
  return {
    type: UPDATE_IMAGE_URL,
    payload: imageUrl,
  };
}

export function imageValidationError(msg) {
  return {
    type: IMAGE_VALIDATION_ERROR,
    payload: msg,
  };
}
export function addNewHobby() {
  return {
    type: ADD_NEW_HOBBY,
  };
}
export function updateHobbies(hobbies) {
  return {
    type: UPDATE_HOBBIES,
    payload: hobbies,
  };
}

export function updateHobbyError(msg) {
  return {
    type: UPDATE_HOBBY_ERROR,
    payload: msg,
  };
}
