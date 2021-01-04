import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT
} from "../actions/actionTypes/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};
const authReducer = (state = initialState, action) => {
  if (action.type === AUTH_START) {
    return { ...state, error: null, loading: true };
  }

  if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      token: action.idToken,
      userId: action.userId,
      error: null,
      loading: false
    };
  }

  if (action.type === AUTH_FAIL) {
    return { ...state, error: action.error, loading: false };
  }

  if (action.type === AUTH_LOGOUT) {
    return { ...state, token: null, userId: null };
  }

  return state;
};

export default authReducer;
